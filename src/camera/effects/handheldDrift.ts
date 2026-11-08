import type { CameraEffect } from '../types'

const EDGE_FADE_SECONDS = 0.8
const TAU = Math.PI * 2

export type HandheldDriftOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** Duration in frames. The drift fades in and out at the edges. */
  readonly durationInFrames: number
  /** Translation amplitude scale, in pixels. Defaults to 1.4. */
  readonly intensity?: number
  /** Rotation amplitude scale, in degrees. Defaults to 0.12. */
  readonly rotation?: number
  /** Drift cycles per second (Hz). Set to zero to disable the motion. Defaults to 1.1. */
  readonly frequencyHz?: number
}

/** Adds gentle, deterministic handheld movement during a time range. */
export const handheldDrift = ({
  from,
  durationInFrames,
  intensity = 1.4,
  rotation = 0.12,
  frequencyHz = 1.1,
}: HandheldDriftOptions): CameraEffect => {
  if (
    !Number.isFinite(from) ||
    from < 0 ||
    !Number.isFinite(durationInFrames) ||
    durationInFrames <= 0 ||
    !Number.isFinite(from + durationInFrames)
  ) {
    throw new Error(
      'Handheld drift needs a non-negative start frame and a positive durationInFrames.',
    )
  }

  if (!Number.isFinite(intensity) || intensity < 0) {
    throw new Error(
      "Handheld drift 'intensity' must be a finite non-negative number.",
    )
  }

  if (!Number.isFinite(rotation)) {
    throw new Error("Handheld drift 'rotation' must be a finite number.")
  }

  if (!Number.isFinite(frequencyHz) || frequencyHz < 0) {
    throw new Error(
      "Handheld drift 'frequencyHz' must be a finite non-negative number.",
    )
  }

  return {
    sample(frame, fps) {
      if (
        !Number.isFinite(frame) ||
        !Number.isFinite(fps) ||
        fps <= 0 ||
        frequencyHz === 0
      )
        return {}

      const localFrame = frame - from
      if (localFrame < 0 || localFrame > durationInFrames) return {}
      const edgeFadeInFrames = EDGE_FADE_SECONDS * fps

      const edgeProgress = Math.min(
        1,
        localFrame / edgeFadeInFrames,
        (durationInFrames - localFrame) / edgeFadeInFrames,
      )
      const envelope = Math.max(0, edgeProgress)
      const phase = (localFrame / fps) * frequencyHz * TAU

      return {
        translateX:
          envelope *
          intensity *
          (Math.sin(phase * 0.71) + Math.sin(phase * 1.31) * 0.38),
        translateY:
          envelope *
          intensity *
          0.7 *
          (Math.sin(phase * 0.53 + 1.4) + Math.sin(phase * 1.17) * 0.3),
        rotation: envelope * rotation * Math.sin(phase * 0.43),
      }
    },
  }
}
