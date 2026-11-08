import { useCurrentFrame } from 'remotion'
import type { LyricPatternProps } from '../internal/LyricPatternProps'
import { LyricPatternLayout } from '../internal/LyricPatternLayout'
import { withLyricStudioPosition } from '../internal/lyricStudioEditing'
import {
  assertFiniteNonNegative,
  assertFinitePositive,
  getLyricCharacterIndices,
  getLyricScaleProgress,
  getStaggeredFrame,
  hasLyricCharacters,
  splitLyricGraphemes,
  type LyricAnimationEasing,
} from '../internal/lyricAnimationUtils'

export type LyricCharacterScaleEasing = LyricAnimationEasing

export type LyricCharacterScaleMotion = {
  /** Time for each character to scale from 0 to 100%, in frames. */
  readonly scaleDurationInFrames?: number
  /** Delay between consecutive characters beginning to scale, in frames. */
  readonly staggerInFrames?: number
  /** Delay before the first character begins, in frames. */
  readonly delayInFrames?: number
  readonly easing?: LyricCharacterScaleEasing
}

export type LyricCharacterScaleProps = Omit<LyricPatternProps, 'children'> & {
  /** Text that scales in one grapheme at a time. */
  readonly children: string
  /** Per-character scale settings. */
  readonly motion?: LyricCharacterScaleMotion
}

const DEFAULT_MOTION = {
  scaleDurationInFrames: 10,
  staggerInFrames: 2,
  delayInFrames: 0,
  easing: 'ease-out',
} as const satisfies Required<LyricCharacterScaleMotion>

/** Scales each character from 0 to its final size, in reading order. */
const LyricCharacterScaleView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  motion = {},
}: LyricCharacterScaleProps) => {
  const frame = useCurrentFrame()
  const {
    scaleDurationInFrames = DEFAULT_MOTION.scaleDurationInFrames,
    staggerInFrames = DEFAULT_MOTION.staggerInFrames,
    delayInFrames = DEFAULT_MOTION.delayInFrames,
    easing = DEFAULT_MOTION.easing,
  } = motion

  assertFinitePositive(
    scaleDurationInFrames,
    'LyricCharacterScale scaleDurationInFrames',
  )
  assertFiniteNonNegative(
    staggerInFrames,
    'LyricCharacterScale staggerInFrames',
  )
  assertFiniteNonNegative(delayInFrames, 'LyricCharacterScale delayInFrames')

  const graphemes = splitLyricGraphemes(children)
  const characterIndices = getLyricCharacterIndices(graphemes)
  const hasCharacters = hasLyricCharacters(graphemes)
  const firstCharacterProgress = hasCharacters
    ? getLyricScaleProgress(
        getStaggeredFrame(frame, delayInFrames, 0, staggerInFrames),
        scaleDurationInFrames,
        easing,
      )
    : 0

  const text = graphemes.map((grapheme, index) => {
    const characterIndex = characterIndices[index]
    if (characterIndex === null) {
      return (
        <span key={`space-${index}`} style={{ whiteSpace: 'pre' }}>
          {grapheme}
        </span>
      )
    }

    const scale = getLyricScaleProgress(
      getStaggeredFrame(frame, delayInFrames, characterIndex, staggerInFrames),
      scaleDurationInFrames,
      easing,
    )
    return (
      <span
        key={`character-${index}`}
        style={{
          display: 'inline-block',
          scale,
          transformOrigin: 'center',
          whiteSpace: 'pre',
        }}
      >
        {grapheme}
      </span>
    )
  })

  return (
    <LyricPatternLayout
      position={position}
      anchor={anchor}
      safeArea={safeArea}
      size={size}
      orientation={orientation}
      rotationDegrees={rotationDegrees}
      backdropOpacity={firstCharacterProgress}
      autoWrap={autoWrap}
    >
      <span style={{ whiteSpace: autoWrap ? 'pre-wrap' : 'pre' }}>{text}</span>
    </LyricPatternLayout>
  )
}

export const LyricCharacterScale = withLyricStudioPosition(
  LyricCharacterScaleView,
  'LyricCharacterScale',
)
