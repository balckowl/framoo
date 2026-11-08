import type { CameraMove, CameraPose } from '../types'
import { createCameraMove } from './createCameraMove'

export type StutterOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Hold time for each pose, in frames. */
  readonly holdDurationInFrames: number
  /** Poses played in order, then repeated as a group. */
  readonly poses: readonly CameraPose[]
  /** Number of times to repeat the pose sequence. Defaults to one. */
  readonly repeats?: number
}

/** Builds repeated instant pose changes as one camera move. */
export const stutter = ({
  from,
  holdDurationInFrames,
  poses,
  repeats = 1,
}: StutterOptions): CameraMove => {
  if (!Number.isFinite(from) || from < 0) {
    throw new Error("Stutter 'from' must be a non-negative frame.")
  }

  if (!Number.isFinite(holdDurationInFrames) || holdDurationInFrames <= 0) {
    throw new Error("Stutter 'holdDurationInFrames' must be greater than zero.")
  }

  if (!Number.isInteger(repeats) || repeats < 1) {
    throw new Error("Stutter 'repeats' must be a positive integer.")
  }

  if (poses.length === 0) {
    throw new Error('Stutter needs at least one camera pose.')
  }

  const stepCount = poses.length * repeats
  const durationInFrames = stepCount * holdDurationInFrames
  const keyframes = Array.from({ length: stepCount }, (_, index) => ({
    offsetInFrames: index * holdDurationInFrames,
    pose: poses[index % poses.length],
    easing: 'cut' as const,
  }))

  return createCameraMove(from, durationInFrames, keyframes)
}
