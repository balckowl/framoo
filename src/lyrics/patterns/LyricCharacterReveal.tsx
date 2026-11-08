import { useCurrentFrame } from 'remotion'
import type { LyricPatternProps } from '../internal/LyricPatternProps'
import { LyricPatternLayout } from '../internal/LyricPatternLayout'
import { withLyricStudioPosition } from '../internal/lyricStudioEditing'
import {
  assertFiniteNonNegative,
  assertFinitePositive,
  getLyricAnimationProgress,
  getLyricCharacterIndices,
  getStaggeredFrame,
  hasLyricCharacters,
  splitLyricGraphemes,
  type LyricAnimationEasing,
} from '../internal/lyricAnimationUtils'

export type LyricCharacterRevealEasing = LyricAnimationEasing

export type LyricCharacterRevealMotion = {
  /** Fade duration for each character, in frames. */
  readonly fadeDurationInFrames?: number
  /** Delay between consecutive characters, in frames. */
  readonly staggerInFrames?: number
  /** Delay before the first character begins, in frames. */
  readonly delayInFrames?: number
  readonly easing?: LyricCharacterRevealEasing
}

export type LyricCharacterRevealProps = Omit<LyricPatternProps, 'children'> & {
  /** Text revealed one grapheme at a time. */
  readonly children: string
  /** Per-character reveal settings. */
  readonly motion?: LyricCharacterRevealMotion
}

/** Fades each character in at its final position, in reading order. */
const LyricCharacterRevealView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  motion = {},
}: LyricCharacterRevealProps) => {
  const frame = useCurrentFrame()
  const {
    fadeDurationInFrames = 8,
    staggerInFrames = 2,
    delayInFrames = 0,
    easing = 'ease-out',
  } = motion

  assertFinitePositive(
    fadeDurationInFrames,
    'LyricCharacterReveal fadeDurationInFrames',
  )
  assertFiniteNonNegative(
    staggerInFrames,
    'LyricCharacterReveal staggerInFrames',
  )
  assertFiniteNonNegative(delayInFrames, 'LyricCharacterReveal delayInFrames')

  const graphemes = splitLyricGraphemes(children)
  const characterIndices = getLyricCharacterIndices(graphemes)
  const hasCharacters = hasLyricCharacters(graphemes)
  const firstCharacterProgress = hasCharacters
    ? getLyricAnimationProgress(
        getStaggeredFrame(frame, delayInFrames, 0, staggerInFrames),
        fadeDurationInFrames,
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

    const progress = getLyricAnimationProgress(
      getStaggeredFrame(frame, delayInFrames, characterIndex, staggerInFrames),
      fadeDurationInFrames,
      easing,
    )
    return (
      <span
        key={`character-${index}`}
        style={{
          display: 'inline-block',
          opacity: progress,
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

export const LyricCharacterReveal = withLyricStudioPosition(
  LyricCharacterRevealView,
  'LyricCharacterReveal',
)
