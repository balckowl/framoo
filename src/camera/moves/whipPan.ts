import type { CameraMove, CameraMoveEasing, CameraPoint } from '../types'
import { createCameraMove } from './createCameraMove'

const OVERSHOOT_REACHED_AT = 0.68
const SETTLE_REACHED_AT = 0.82

export type WhipPanOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Duration in frames. */
  readonly durationInFrames: number
  /** Focal point where the pan should settle. */
  readonly to: CameraPoint
  /** Offset beyond the target before settling. Defaults to no overshoot. */
  readonly overshoot?: CameraPoint
  readonly easing?: CameraMoveEasing
}

/** Whips the camera toward a focal point, then settles there. */
export const whipPan = ({
  from,
  durationInFrames,
  to,
  overshoot = { x: 0, y: 0 },
  easing = 'rush',
}: WhipPanOptions): CameraMove => {
  const overshootPoint = {
    x: to.x + overshoot.x,
    y: to.y + overshoot.y,
  }

  return createCameraMove(from, durationInFrames, [
    {
      offsetInFrames: durationInFrames * OVERSHOOT_REACHED_AT,
      pose: overshootPoint,
      easing,
    },
    {
      offsetInFrames: durationInFrames * SETTLE_REACHED_AT,
      pose: to,
      easing: 'rush',
    },
    {
      offsetInFrames: durationInFrames,
      pose: to,
      easing: 'smooth',
    },
  ])
}
