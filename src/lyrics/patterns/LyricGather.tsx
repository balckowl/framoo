import { useCurrentFrame } from 'remotion'
import type { LyricPatternProps } from '../internal/LyricPatternProps'
import { LyricPatternLayout } from '../internal/LyricPatternLayout'
import { withLyricStudioPosition } from '../internal/lyricStudioEditing'
import {
  assertFiniteNonNegative,
  assertFinitePositive,
  getLyricCharacterIndices,
  getLyricAnimationProgress,
  getLyricScatterValue,
  getStaggeredFrame,
  hasLyricCharacters,
  splitLyricGraphemes,
  type LyricAnimationEasing,
} from '../internal/lyricAnimationUtils'

export type LyricGatherEasing = LyricAnimationEasing

export type LyricGatherMotion = {
  /** Settling duration for each character, in frames. */
  readonly settleDurationInFrames?: number
  /** Delay between characters beginning to gather, in frames. */
  readonly staggerInFrames?: number
  /** Delay before the first character starts, in frames. */
  readonly delayInFrames?: number
  /** Maximum starting displacement from the final position, in em. */
  readonly spreadEm?: number
  /** Maximum starting rotation in either direction, in degrees. */
  readonly rotationDegrees?: number
  /** Stable seed for the starting positions. */
  readonly seed?: number
  readonly easing?: LyricGatherEasing
}

export type LyricGatherProps = Omit<LyricPatternProps, 'children'> & {
  /** Text to gather. Each grapheme is animated independently. */
  readonly children: string
  /** Character gathering settings. */
  readonly motion?: LyricGatherMotion
}

/**
 * Fades each glyph in from a stable scattered position and settles it into
 * the final typeset line. Set `from` and `durationInFrames` on this component
 * to control its timeline interval; `motion` controls only the gathering.
 */
const LyricGatherView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  motion = {},
}: LyricGatherProps) => {
  const frame = useCurrentFrame()
  const {
    settleDurationInFrames = 20,
    staggerInFrames = 2,
    delayInFrames = 0,
    spreadEm = 1.8,
    rotationDegrees: scatterRotationDegrees = 18,
    seed = 0,
    easing = 'ease-out',
  } = motion

  assertFinitePositive(
    settleDurationInFrames,
    'LyricGather settleDurationInFrames',
  )
  assertFiniteNonNegative(staggerInFrames, 'LyricGather staggerInFrames')
  assertFiniteNonNegative(delayInFrames, 'LyricGather delayInFrames')
  assertFiniteNonNegative(spreadEm, 'LyricGather spreadEm')
  assertFiniteNonNegative(
    scatterRotationDegrees,
    'LyricGather motion.rotationDegrees',
  )

  const graphemes = splitLyricGraphemes(children)
  const characterIndices = getLyricCharacterIndices(graphemes)
  const hasCharacters = hasLyricCharacters(graphemes)

  const text = graphemes.map((grapheme, index) => {
    const characterIndex = characterIndices[index]
    if (characterIndex === null) {
      return (
        <span key={`space-${index}`} style={{ whiteSpace: 'pre' }}>
          {grapheme}
        </span>
      )
    }

    const progress = getLyricAnimationProgress(
      getStaggeredFrame(frame, delayInFrames, characterIndex, staggerInFrames),
      settleDurationInFrames,
      easing,
    )
    const offsetX = getLyricScatterValue(characterIndex, seed, 0) * spreadEm
    const offsetY = getLyricScatterValue(characterIndex, seed, 1) * spreadEm
    const rotation =
      getLyricScatterValue(characterIndex, seed, 2) * scatterRotationDegrees

    return (
      <span
        key={`glyph-${index}`}
        style={{
          display: 'inline-block',
          opacity: progress,
          translate: `${offsetX * (1 - progress)}em ${offsetY * (1 - progress)}em`,
          rotate: `${rotation * (1 - progress)}deg`,
          transformOrigin: 'center',
          whiteSpace: 'pre',
        }}
      >
        {grapheme}
      </span>
    )
  })

  const backdropProgress = hasCharacters
    ? getLyricAnimationProgress(
        getStaggeredFrame(frame, delayInFrames, 0, staggerInFrames),
        settleDurationInFrames,
        easing,
      )
    : 0

  return (
    <LyricPatternLayout
      position={position}
      anchor={anchor}
      safeArea={safeArea}
      size={size}
      orientation={orientation}
      rotationDegrees={rotationDegrees}
      backdropOpacity={backdropProgress}
      autoWrap={autoWrap}
    >
      <span style={{ whiteSpace: autoWrap ? 'pre-wrap' : 'pre' }}>{text}</span>
    </LyricPatternLayout>
  )
}

export const LyricGather = withLyricStudioPosition(
  LyricGatherView,
  'LyricGather',
)
