import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'

export type ColorWashCue = {
  /** Cue start frame. */
  readonly atFrame: number
  /** Any valid CSS background value, including a gradient. */
  readonly wash: string
  /** Cue opacity from 0 to 1. Defaults to 0.32. */
  readonly opacity?: number
}

export type ColorWashSequenceProps = {
  /** Ordered color treatments to show over the existing layer. */
  readonly cues: readonly ColorWashCue[]
  /** Crossfade duration before each next cue, in frames. Defaults to 0. */
  readonly transitionInFrames?: number
  /** CSS blend mode used to combine the washes with the layer below. */
  readonly blendMode?: React.CSSProperties['mixBlendMode']
}

/** Shows color treatments at cue times and crossfades between them. */
export const ColorWashSequence = ({
  cues,
  transitionInFrames = 0,
  blendMode = 'normal',
}: ColorWashSequenceProps) => {
  const frame = useCurrentFrame()

  assertRange(
    'ColorWashSequence transitionInFrames',
    transitionInFrames,
    0,
    Number.MAX_SAFE_INTEGER,
  )

  for (let index = 0; index < cues.length; index++) {
    const cue = cues[index]
    assertRange(
      `ColorWashSequence cues[${index}].atFrame`,
      cue.atFrame,
      0,
      Number.MAX_SAFE_INTEGER,
    )
    assertNonEmptyString(`ColorWashSequence cues[${index}].wash`, cue.wash)
    if (cue.opacity !== undefined) {
      assertRange(`ColorWashSequence cues[${index}].opacity`, cue.opacity, 0, 1)
    }
    if (index > 0) {
      const previous = cues[index - 1]
      if (cue.atFrame <= previous.atFrame) {
        throw new Error(
          'ColorWashSequence cue frames must be strictly increasing.',
        )
      }
      if (cue.atFrame - previous.atFrame < transitionInFrames) {
        throw new Error(
          'ColorWashSequence cues must be at least transitionInFrames apart.',
        )
      }
    }
  }

  let activeIndex = -1
  for (let index = 0; index < cues.length; index++) {
    if (cues[index].atFrame <= frame) activeIndex = index
    else break
  }

  if (activeIndex < 0) return null

  const current = cues[activeIndex]
  const next = cues[activeIndex + 1]
  const transitionStart = next
    ? next.atFrame - transitionInFrames
    : Number.POSITIVE_INFINITY
  const progress =
    next && transitionInFrames > 0 && frame >= transitionStart
      ? interpolate(frame, [transitionStart, next.atFrame], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0

  return (
    <AbsoluteFill
      aria-hidden
      style={{ mixBlendMode: blendMode, pointerEvents: 'none' }}
    >
      <AbsoluteFill
        style={{
          background: current.wash,
          opacity: (current.opacity ?? 0.32) * (1 - progress),
        }}
      />
      {next && progress > 0 ? (
        <AbsoluteFill
          style={{
            background: next.wash,
            opacity: (next.opacity ?? 0.32) * progress,
          }}
        />
      ) : null}
    </AbsoluteFill>
  )
}
