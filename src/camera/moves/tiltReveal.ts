import type { CameraMove, CameraPoint } from '../types'
import { createCameraMove } from './createCameraMove'

const TILT_REVEAL_PHASE = 0.22

export type TiltRevealOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Duration in frames. */
  readonly durationInFrames: number
  /** Focal point to settle on as the camera levels. */
  readonly focus: CameraPoint
  /** Optional final zoom scale. */
  readonly zoom?: number
  /** Initial tilt relative to the current camera rotation. Defaults to -6 degrees. */
  readonly tiltDegrees?: number
}

/** Tilts into the shot, then levels while settling on the focal point. */
export const tiltReveal = ({
  from,
  durationInFrames,
  focus,
  zoom,
  tiltDegrees = -6,
}: TiltRevealOptions): CameraMove => {
  const targetPose = {
    ...focus,
    ...(zoom === undefined ? {} : { zoom }),
  }

  return createCameraMove(from, durationInFrames, [
    {
      offsetInFrames: durationInFrames * TILT_REVEAL_PHASE,
      pose: {},
      rotationBy: tiltDegrees,
      easing: 'rush',
    },
    {
      offsetInFrames: durationInFrames,
      pose: targetPose,
      rotationBy: -tiltDegrees,
      easing: 'smooth',
    },
  ])
}
