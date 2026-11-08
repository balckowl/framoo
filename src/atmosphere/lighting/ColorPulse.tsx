import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'

export type ColorPulseProps = {
  /** Pulse start frames, usually aligned with musical accents. */
  readonly cueFrames: readonly number[]
  /** Pulse color. Defaults to warm white. */
  readonly color?: string
  /** Peak strength from 0 to 1. Defaults to 0.18. */
  readonly intensity?: number
  /** Frames for the pulse to decay. Defaults to about 0.24 seconds. */
  readonly decayInFrames?: number
}

/** Adds a brief full-layer color flash at each supplied cue. */
export const ColorPulse = ({
  cueFrames,
  color = '#ffe3b4',
  intensity = 0.18,
  decayInFrames,
}: ColorPulseProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  assertRange('ColorPulse intensity', intensity, 0, 1)
  const actualDecayInFrames = decayInFrames ?? 0.24 * fps
  assertRange(
    'ColorPulse decayInFrames',
    actualDecayInFrames,
    0.01,
    Number.MAX_SAFE_INTEGER,
  )
  assertNonEmptyString('ColorPulse color', color)

  if (cueFrames.some((atFrame) => !Number.isFinite(atFrame) || atFrame < 0)) {
    throw new Error(
      'ColorPulse cueFrames must be non-negative finite frame values.',
    )
  }

  const pulse = cueFrames.reduce((maximum, atFrame) => {
    const ageInFrames = frame - atFrame
    if (ageInFrames < 0 || ageInFrames > actualDecayInFrames * 5) {
      return maximum
    }

    return Math.max(maximum, Math.exp(-ageInFrames / actualDecayInFrames))
  }, 0)

  if (pulse <= 0 || intensity <= 0) {
    return null
  }

  return (
    <AbsoluteFill
      aria-hidden
      style={{
        backgroundColor: color,
        opacity: intensity * pulse,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}
    />
  )
}
