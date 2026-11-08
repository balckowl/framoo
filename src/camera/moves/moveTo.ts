import type { CameraMove, CameraMoveEasing, CameraPose } from '../types'
import { createCameraMove } from './createCameraMove'

export type MoveToOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Duration in frames. */
  readonly durationInFrames: number
  /** Camera values to reach. Omitted values keep their current value. */
  readonly to: Partial<CameraPose>
  readonly easing?: CameraMoveEasing
}

/** Moves the camera from its current view to the requested view. */
export const moveTo = ({
  from,
  durationInFrames,
  to,
  easing = 'smooth',
}: MoveToOptions): CameraMove =>
  createCameraMove(from, durationInFrames, [
    {
      offsetInFrames: durationInFrames,
      pose: to,
      easing,
    },
  ])
