import type { CameraMove, CameraMoveEasing, CameraPoint } from '../types'
import { createCameraMove, type CameraMoveKeyframe } from './createCameraMove'
import { validateCameraMoveTiming } from '../validation'

const OVERSHOOT_REACHED_AT = 0.72

export type SnapZoomOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Total duration, including any hold before the zoom, in frames. */
  readonly durationInFrames: number
  /** Image point to place at the center of the frame. */
  readonly focus: CameraPoint
  /** Final zoom scale. */
  readonly zoom: number
  /** Frames to hold the current view before starting the zoom. */
  readonly holdBeforeInFrames?: number
  /** Amount the zoom passes its target before settling, e.g. 0.06 for 6%. */
  readonly overshoot?: number
  /** Easing for the fast approach. */
  readonly easing?: CameraMoveEasing
}

/** Quickly zooms to a focal point, overshoots it, then settles at the target. */
export const snapZoom = ({
  from,
  durationInFrames,
  focus,
  zoom,
  holdBeforeInFrames = 0,
  overshoot = 0.06,
  easing = 'rush',
}: SnapZoomOptions): CameraMove => {
  validateCameraMoveTiming(from, durationInFrames)

  if (
    !Number.isFinite(holdBeforeInFrames) ||
    holdBeforeInFrames < 0 ||
    holdBeforeInFrames >= durationInFrames
  ) {
    throw new Error(
      "Snap zoom 'holdBeforeInFrames' must be non-negative and shorter than durationInFrames.",
    )
  }

  if (!Number.isFinite(overshoot) || overshoot < 0) {
    throw new Error(
      "Snap zoom 'overshoot' must be a finite non-negative number.",
    )
  }

  if (!Number.isFinite(zoom) || zoom <= 0) {
    throw new Error("Snap zoom 'zoom' must be greater than zero.")
  }

  const zoomDurationInFrames = durationInFrames - holdBeforeInFrames
  const overshootZoom = zoom * (1 + overshoot)
  const keyframes: CameraMoveKeyframe[] = []

  if (holdBeforeInFrames > 0) {
    keyframes.push({
      offsetInFrames: holdBeforeInFrames,
      pose: {},
    })
  }

  keyframes.push(
    {
      offsetInFrames:
        holdBeforeInFrames + zoomDurationInFrames * OVERSHOOT_REACHED_AT,
      pose: { ...focus, zoom: overshootZoom },
      easing,
    },
    {
      offsetInFrames: durationInFrames,
      pose: { ...focus, zoom },
      easing: 'smooth',
    },
  )

  return createCameraMove(from, durationInFrames, keyframes)
}
