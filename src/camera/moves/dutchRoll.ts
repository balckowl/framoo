import type { CameraMove } from '../types'
import { createCameraMove } from './createCameraMove'

export type DutchRollOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Duration in frames. */
  readonly durationInFrames: number
  /** Peak roll angle relative to the starting horizon. Defaults to 5 degrees. */
  readonly peakDegrees?: number
}

/** Rolls left and right, then returns to the starting horizon. */
export const dutchRoll = ({
  from,
  durationInFrames,
  peakDegrees = 5,
}: DutchRollOptions): CameraMove =>
  createCameraMove(from, durationInFrames, [
    {
      offsetInFrames: durationInFrames / 3,
      pose: {},
      rotationBy: peakDegrees,
      easing: 'smooth',
    },
    {
      offsetInFrames: (durationInFrames * 2) / 3,
      pose: {},
      rotationBy: -peakDegrees * 2,
      easing: 'smooth',
    },
    {
      offsetInFrames: durationInFrames,
      pose: {},
      rotationBy: peakDegrees,
      easing: 'smooth',
    },
  ])
