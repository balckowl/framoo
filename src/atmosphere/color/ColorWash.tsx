import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'

export type ColorWashProps = {
  /** First and second colors of the moving gradient. */
  readonly from: string
  readonly to: string
  /** Overlay opacity from 0 to 1. */
  readonly opacity?: number
  /** Duration of one smooth back-and-forth cycle, in frames. Defaults to 12 seconds. */
  readonly cycleDurationInFrames?: number
  /** CSS blend mode used to combine the wash with the layer below. */
  readonly blendMode?: React.CSSProperties['mixBlendMode']
}

/** Places a slowly shifting two-color gradient over the current layer. */
export const ColorWash = ({
  from,
  to,
  opacity = 0.32,
  cycleDurationInFrames,
  blendMode = 'normal',
}: ColorWashProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const actualCycleDurationInFrames = cycleDurationInFrames ?? 12 * fps

  assertRange('ColorWash opacity', opacity, 0, 1)
  assertRange(
    'ColorWash cycleDurationInFrames',
    actualCycleDurationInFrames,
    0.01,
    Number.MAX_SAFE_INTEGER,
  )

  assertNonEmptyString('ColorWash from', from)
  assertNonEmptyString('ColorWash to', to)

  const cyclePosition = frame / actualCycleDurationInFrames
  const progress = (Math.sin(cyclePosition * Math.PI * 2) + 1) / 2
  const angle = 135 + progress * 90

  return (
    <AbsoluteFill
      aria-hidden
      style={{
        background: `linear-gradient(${angle}deg, ${from}, ${to})`,
        opacity,
        mixBlendMode: blendMode,
        pointerEvents: 'none',
      }}
    />
  )
}
