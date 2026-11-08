import type { CameraMove, CameraPoint } from '../types'
import { createCameraMove } from './createCameraMove'

const DEFAULT_DIVE_DURATION_CAP_IN_FRAMES = 24
const DEFAULT_DIVE_DURATION_RATIO = 0.2
const MAX_DIVE_DURATION_RATIO = 0.5
const SETTLE_DURATION_RATIO = 0.08

export type DiveAndGlideOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Total duration, including the dive and glide, in frames. */
  readonly durationInFrames: number
  /** Focal points visited in order, starting with the dive target. */
  readonly path: readonly CameraPoint[]
  /** Zoom scale reached during the dive. */
  readonly zoom: number
  /** Dive duration in frames; defaults to 20% of the move, capped at 24 frames and half its duration. */
  readonly diveDurationInFrames?: number
  /** Amount the dive passes the target zoom before settling, e.g. 0.05 for 5%. */
  readonly overshoot?: number
}

/** Dives to the first point, settles, then glides through the remaining path. */
export const diveAndGlide = ({
  from,
  durationInFrames,
  path,
  zoom,
  diveDurationInFrames,
  overshoot = 0.05,
}: DiveAndGlideOptions): CameraMove => {
  if (path.length === 0) {
    throw new Error('Dive and glide needs at least one focal point.')
  }

  if (!Number.isFinite(zoom) || zoom <= 0) {
    throw new Error("Dive and glide 'zoom' must be greater than zero.")
  }

  if (
    diveDurationInFrames !== undefined &&
    (!Number.isFinite(diveDurationInFrames) || diveDurationInFrames <= 0)
  ) {
    throw new Error(
      "Dive and glide 'diveDurationInFrames' must be greater than zero.",
    )
  }

  if (!Number.isFinite(overshoot) || overshoot < 0) {
    throw new Error(
      "Dive and glide 'overshoot' must be a finite non-negative number.",
    )
  }

  const requestedDiveDurationInFrames =
    diveDurationInFrames ??
    Math.min(
      DEFAULT_DIVE_DURATION_CAP_IN_FRAMES,
      durationInFrames * DEFAULT_DIVE_DURATION_RATIO,
    )
  const actualDiveDurationInFrames = Math.min(
    durationInFrames * MAX_DIVE_DURATION_RATIO,
    requestedDiveDurationInFrames,
  )
  const firstPoint = path[0]
  const settledAtInFrames =
    actualDiveDurationInFrames + durationInFrames * SETTLE_DURATION_RATIO
  const keyframes = [
    {
      offsetInFrames: actualDiveDurationInFrames,
      pose: { ...firstPoint, zoom: zoom * (1 + overshoot) },
      easing: 'rush' as const,
    },
    {
      offsetInFrames: settledAtInFrames,
      pose: { ...firstPoint, zoom },
      easing: 'smooth' as const,
    },
    ...path.slice(1).map((point, index) => {
      const pathProgress = (index + 1) / (path.length - 1)

      return {
        offsetInFrames:
          settledAtInFrames +
          (durationInFrames - settledAtInFrames) * pathProgress,
        pose: { ...point, zoom },
        easing: 'smooth' as const,
      }
    }),
  ]

  return createCameraMove(from, durationInFrames, keyframes)
}
