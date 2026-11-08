import type { CameraKeyframe, CameraMove } from '../types'
import {
  validateCameraKeyframeValues,
  validateCameraMoveTiming,
} from '../validation'

export type CameraMoveKeyframe = Omit<CameraKeyframe, 'atFrame'> & {
  /** Frame offset relative to the move's start. */
  readonly offsetInFrames: number
}

/** Converts readable move-relative keyframes into the absolute timeline format. */
export const createCameraMove = (
  from: number,
  durationInFrames: number,
  keyframes: readonly CameraMoveKeyframe[],
): CameraMove => {
  validateCameraMoveTiming(from, durationInFrames)

  let previousOffsetInFrames = 0

  const absoluteKeyframes = keyframes.map(({ offsetInFrames, ...keyframe }) => {
    if (
      !Number.isFinite(offsetInFrames) ||
      offsetInFrames < previousOffsetInFrames ||
      offsetInFrames > durationInFrames
    ) {
      throw new Error(
        'Camera move keyframe offsets must be ordered and within durationInFrames.',
      )
    }

    validateCameraKeyframeValues(keyframe, 'Camera move keyframe')

    previousOffsetInFrames = offsetInFrames

    return {
      ...keyframe,
      atFrame: from + offsetInFrames,
    }
  })

  return {
    from,
    durationInFrames,
    keyframes: absoluteKeyframes,
  }
}
