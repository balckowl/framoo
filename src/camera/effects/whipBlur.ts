import type { CameraEffect } from '../types'

const DEFAULT_DURATION_SECONDS = 0.24

export type WhipBlurOptions = {
  /** Start frame within the composition. */
  readonly atFrame: number
  /** Duration of the blur pulse in frames. Defaults to about 0.24 seconds. */
  readonly durationInFrames?: number
  /** Peak blur radius, in pixels. Defaults to 7. */
  readonly amount?: number
}

/** Adds a brief blur pulse to sell a fast camera pan. */
export const whipBlur = ({
  atFrame,
  durationInFrames,
  amount = 7,
}: WhipBlurOptions): CameraEffect => {
  if (!Number.isFinite(atFrame) || atFrame < 0) {
    throw new Error("Whip blur 'atFrame' must be a non-negative frame.")
  }

  if (
    durationInFrames !== undefined &&
    (!Number.isFinite(durationInFrames) ||
      durationInFrames <= 0 ||
      !Number.isFinite(atFrame + durationInFrames))
  ) {
    throw new Error("Whip blur 'durationInFrames' must be greater than zero.")
  }

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Whip blur 'amount' must be a finite non-negative number.")
  }

  return {
    sample(frame, fps) {
      if (!Number.isFinite(frame) || !Number.isFinite(fps) || fps <= 0)
        return {}

      const actualDurationInFrames =
        durationInFrames ?? DEFAULT_DURATION_SECONDS * fps
      const progress = (frame - atFrame) / actualDurationInFrames
      if (progress < 0 || progress > 1) return {}

      const pulse = Math.sin(Math.PI * progress) ** 1.5
      return { blur: amount * pulse }
    },
  }
}
