import type { CameraMove, CameraMoveEasing, CameraPoint } from '../types'
import { createCameraMove } from './createCameraMove'

const FIRST_POINT_REACHED_AT = 0.18

export type TracePathOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Duration in frames. */
  readonly durationInFrames: number
  /** Focal points visited in order. */
  readonly path: readonly CameraPoint[]
  /** Camera zoom maintained along the path. */
  readonly zoom: number
  /** Easing used while traveling between path points. */
  readonly easing?: CameraMoveEasing
}

/** Moves to the first focal point, then follows the remaining points in order. */
export const tracePath = ({
  from,
  durationInFrames,
  path,
  zoom,
  easing = 'smooth',
}: TracePathOptions): CameraMove => {
  if (path.length === 0) {
    throw new Error('Trace path needs at least one focal point.')
  }

  if (!Number.isFinite(zoom) || zoom <= 0) {
    throw new Error("Trace path 'zoom' must be greater than zero.")
  }

  const approachDurationInFrames = durationInFrames * FIRST_POINT_REACHED_AT
  const travelDurationInFrames = durationInFrames - approachDurationInFrames
  const keyframes = path.map((point, index) => {
    const offset =
      path.length === 1
        ? durationInFrames
        : approachDurationInFrames +
          (travelDurationInFrames * index) / (path.length - 1)

    return {
      offsetInFrames: offset,
      pose: { ...point, zoom },
      easing: index === 0 ? ('smooth' as const) : easing,
    }
  })

  return createCameraMove(from, durationInFrames, keyframes)
}
