import type { CSSProperties } from 'react'
import { useCurrentFrame } from 'remotion'
import type { LyricPatternProps } from '../internal/LyricPatternProps'
import { LyricPatternLayout } from '../internal/LyricPatternLayout'
import { withLyricStudioPosition } from '../internal/lyricStudioEditing'
import {
  assertFiniteNonNegative,
  assertFinitePositive,
  getLyricCharacterIndices,
  getLyricAnimationProgress,
  getLyricScaleProgress,
  getStaggeredFrame,
  hasLyricCharacters,
  splitLyricGraphemes,
  type LyricAnimationEasing,
} from '../internal/lyricAnimationUtils'

export type LyricCharacterUnderlineEasing = LyricAnimationEasing

export type LyricCharacterUnderlineMotion = {
  /** Duration for each character to appear and its underline to draw, in frames. */
  readonly durationInFrames?: number
  /** Delay between consecutive characters, in frames. */
  readonly staggerInFrames?: number
  /** Delay before the first character begins, in frames. */
  readonly delayInFrames?: number
  readonly easing?: LyricCharacterUnderlineEasing
}

export type LyricCharacterUnderlineProps = Omit<
  LyricPatternProps,
  'children'
> & {
  /** Text that appears one grapheme at a time with a matching underline. */
  readonly children: string
  /** Per-character timing settings. */
  readonly motion?: LyricCharacterUnderlineMotion
}

const DEFAULT_MOTION = {
  durationInFrames: 8,
  staggerInFrames: 2,
  delayInFrames: 0,
  easing: 'ease-out',
} as const satisfies Required<LyricCharacterUnderlineMotion>

/** Reveals each character and draws a short underline beneath it in sync. */
const LyricCharacterUnderlineView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation = 'horizontal',
  rotationDegrees,
  autoWrap,
  motion = {},
}: LyricCharacterUnderlineProps) => {
  const frame = useCurrentFrame()
  const {
    durationInFrames = DEFAULT_MOTION.durationInFrames,
    staggerInFrames = DEFAULT_MOTION.staggerInFrames,
    delayInFrames = DEFAULT_MOTION.delayInFrames,
    easing = DEFAULT_MOTION.easing,
  } = motion

  assertFinitePositive(
    durationInFrames,
    'LyricCharacterUnderline durationInFrames',
  )
  assertFiniteNonNegative(
    staggerInFrames,
    'LyricCharacterUnderline staggerInFrames',
  )
  assertFiniteNonNegative(
    delayInFrames,
    'LyricCharacterUnderline delayInFrames',
  )

  const graphemes = splitLyricGraphemes(children)
  const characterIndices = getLyricCharacterIndices(graphemes)
  const hasCharacters = hasLyricCharacters(graphemes)
  const firstProgress = hasCharacters
    ? getLyricAnimationProgress(
        getStaggeredFrame(frame, delayInFrames, 0, staggerInFrames),
        durationInFrames,
        easing,
      )
    : 0

  const text = graphemes.map((grapheme, index) => {
    const characterIndex = characterIndices[index]
    if (grapheme === '\n' || grapheme === '\r\n') {
      return <br key={`line-break-${index}`} />
    }

    if (characterIndex === null) {
      return (
        <span key={`space-${index}`} style={{ whiteSpace: 'pre' }}>
          {grapheme}
        </span>
      )
    }

    const characterFrame = getStaggeredFrame(
      frame,
      delayInFrames,
      characterIndex,
      staggerInFrames,
    )
    const characterProgress = getLyricAnimationProgress(
      characterFrame,
      durationInFrames,
      easing,
    )
    const underlineProgress = getLyricScaleProgress(
      characterFrame,
      durationInFrames,
      easing,
    )
    const underlineStyle: CSSProperties =
      orientation === 'vertical'
        ? {
            position: 'absolute',
            top: 0,
            right: '-0.16em',
            bottom: 0,
            width: '0.025em',
            borderRadius: '999px',
            backgroundColor: '#fff',
            scale: `1 ${underlineProgress}`,
            transformOrigin: 'center top',
            pointerEvents: 'none',
          }
        : {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '0.16em',
            height: '0.025em',
            borderRadius: '999px',
            backgroundColor: '#fff',
            scale: `${underlineProgress} 1`,
            transformOrigin: 'left center',
            pointerEvents: 'none',
          }

    return (
      <span
        key={`character-${index}`}
        style={{
          display: 'inline-block',
          position: 'relative',
          opacity: characterProgress,
          whiteSpace: 'pre',
        }}
      >
        {grapheme}
        <span aria-hidden="true" style={underlineStyle} />
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
      backdropOpacity={firstProgress}
      autoWrap={autoWrap}
    >
      <span style={{ whiteSpace: autoWrap ? 'pre-wrap' : 'pre' }}>{text}</span>
    </LyricPatternLayout>
  )
}

export const LyricCharacterUnderline = withLyricStudioPosition(
  LyricCharacterUnderlineView,
  'LyricCharacterUnderline',
)
