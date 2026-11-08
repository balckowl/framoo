import { Easing } from 'remotion'
import type {
  CameraEffect,
  CameraEffectSample,
  CameraEasing,
  CameraKeyframe,
  CameraMove,
  CameraPose,
  CameraState,
  CameraTrack,
} from './types'
import {
  validateCameraKeyframeValues,
  validateCameraMoveTiming,
  validateCameraPose,
} from './validation'

const DEFAULT_POSE: CameraPose = {
  x: 0.5,
  y: 0.5,
  zoom: 1,
  rotation: 0,
}

type CameraEffectOffset = Required<CameraEffectSample>

const ZERO_EFFECT: CameraEffectOffset = {
  translateX: 0,
  translateY: 0,
  rotation: 0,
  blur: 0,
}

const EASING_FUNCTIONS: Record<CameraEasing, (progress: number) => number> = {
  linear: (progress) => progress,
  smooth: Easing.bezier(0.45, 0, 0.55, 1),
  rush: Easing.bezier(0.68, 0, 0.88, 0.36),
  cut: () => 0,
}

type CompiledCameraKeyframe = {
  readonly atFrame: number
  readonly pose: CameraPose
  readonly easing?: CameraEasing
}

type CompiledCameraTrack = readonly CompiledCameraKeyframe[]

const validateMove = (move: CameraMove, previousMoveEnd: number) => {
  validateCameraMoveTiming(move.from, move.durationInFrames)

  if (!Array.isArray(move.keyframes) || move.keyframes.length === 0) {
    throw new Error('A camera move must include at least one keyframe.')
  }

  if (move.from < previousMoveEnd) {
    throw new Error(
      `Camera moves overlap at frame ${move.from}. Use effects for additive motion such as shake.`,
    )
  }
}

const validateKeyframe = (
  keyframe: CameraKeyframe,
  move: CameraMove,
  previousKeyframeAt: number,
) => {
  if (
    !Number.isFinite(keyframe.atFrame) ||
    keyframe.atFrame < previousKeyframeAt
  ) {
    throw new Error('Camera keyframes must be ordered by frame.')
  }

  if (
    keyframe.atFrame < move.from ||
    keyframe.atFrame > move.from + move.durationInFrames
  ) {
    throw new Error(
      "Camera keyframes must fall within their move's frame range.",
    )
  }

  validateCameraKeyframeValues(keyframe, 'Camera keyframe pose')
}

const interpolateNumber = (from: number, to: number, progress: number) =>
  from + (to - from) * progress

const sampleTrack = (track: CompiledCameraTrack, frame: number): CameraPose => {
  const firstKeyframe = track[0]
  if (!firstKeyframe) {
    throw new Error('A compiled camera track must contain an initial pose.')
  }

  let fromKeyframe = firstKeyframe

  for (let index = 1; index < track.length; index++) {
    const toKeyframe = track[index]

    if (frame < toKeyframe.atFrame) {
      const segmentProgress =
        (frame - fromKeyframe.atFrame) /
        (toKeyframe.atFrame - fromKeyframe.atFrame)
      const clampedProgress = Math.max(0, Math.min(1, segmentProgress))
      const easing = EASING_FUNCTIONS[toKeyframe.easing ?? 'smooth']
      const progress = easing(clampedProgress)

      return {
        x: interpolateNumber(fromKeyframe.pose.x, toKeyframe.pose.x, progress),
        y: interpolateNumber(fromKeyframe.pose.y, toKeyframe.pose.y, progress),
        zoom: interpolateNumber(
          fromKeyframe.pose.zoom,
          toKeyframe.pose.zoom,
          progress,
        ),
        rotation: interpolateNumber(
          fromKeyframe.pose.rotation,
          toKeyframe.pose.rotation,
          progress,
        ),
      }
    }

    fromKeyframe = toKeyframe
  }

  return fromKeyframe.pose
}

const removeDuplicateTimes = (
  keyframes: readonly CompiledCameraKeyframe[],
): CompiledCameraTrack => {
  const sorted = [...keyframes].sort((a, b) => a.atFrame - b.atFrame)
  const unique: CompiledCameraKeyframe[] = []

  for (const keyframe of sorted) {
    const previous = unique[unique.length - 1]

    if (previous?.atFrame === keyframe.atFrame) {
      // When keyframes share a frame, the later entry takes precedence.
      unique[unique.length - 1] = keyframe
    } else {
      unique.push(keyframe)
    }
  }

  return unique
}

export const compileCameraTrack = (
  initial: CameraPose = DEFAULT_POSE,
  moves: readonly CameraMove[] = [],
): CompiledCameraTrack => {
  validateCameraPose(initial, 'Camera pose')

  const orderedMoves = [...moves].sort((a, b) => a.from - b.from)
  const keyframes: CompiledCameraKeyframe[] = [{ atFrame: 0, pose: initial }]
  let previousMoveEnd = 0

  for (const move of orderedMoves) {
    validateMove(move, previousMoveEnd)

    keyframes.push({
      atFrame: move.from,
      pose: sampleTrack(keyframes, move.from),
    })

    let previousKeyframeAt = move.from

    for (const keyframe of move.keyframes) {
      validateKeyframe(keyframe, move, previousKeyframeAt)

      const inheritedPose = sampleTrack(keyframes, keyframe.atFrame)
      const nextPose: CameraPose = {
        ...inheritedPose,
        ...keyframe.pose,
        rotation:
          (keyframe.pose.rotation ?? inheritedPose.rotation) +
          (keyframe.rotationBy ?? 0),
      }

      keyframes.push({
        atFrame: keyframe.atFrame,
        pose: nextPose,
        easing: keyframe.easing,
      })
      previousKeyframeAt = keyframe.atFrame
    }

    previousMoveEnd = move.from + move.durationInFrames
  }

  return removeDuplicateTimes(keyframes)
}

const sumEffects = (
  frame: number,
  fps: number,
  effects: readonly CameraEffect[],
): CameraEffectOffset =>
  effects.reduce((total, effect) => {
    const sample = effect.sample(frame, fps)

    return {
      translateX: total.translateX + (sample.translateX ?? 0),
      translateY: total.translateY + (sample.translateY ?? 0),
      rotation: total.rotation + (sample.rotation ?? 0),
      blur: total.blur + (sample.blur ?? 0),
    }
  }, ZERO_EFFECT)

export const evaluateCompiledCameraPose = (
  frame: number,
  fps: number,
  track: CompiledCameraTrack,
  effects: readonly CameraEffect[] = [],
): CameraState => {
  const pose = sampleTrack(track, frame)
  const effect = sumEffects(frame, fps, effects)

  return {
    ...pose,
    translateX: effect.translateX,
    translateY: effect.translateY,
    rotation: pose.rotation + effect.rotation,
    blur: effect.blur,
  }
}

export const evaluateCameraPose = (
  frame: number,
  fps: number,
  { initial = DEFAULT_POSE, moves = [], effects = [] }: CameraTrack = {},
): CameraState => {
  const track = compileCameraTrack(initial, moves)
  return evaluateCompiledCameraPose(frame, fps, track, effects)
}
