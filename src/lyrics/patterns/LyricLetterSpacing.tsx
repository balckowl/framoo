import { useCurrentFrame } from 'remotion'
import type { LyricPatternProps } from '../internal/LyricPatternProps'
import { LyricPatternLayout } from '../internal/LyricPatternLayout'
import { withLyricStudioPosition } from '../internal/lyricStudioEditing'
import { DEFAULT_LETTER_SPACING_EM } from '../internal/LyricTypography'
import {
  assertFiniteNonNegative,
  assertFinitePositive,
  getLyricAnimationProgress,
  type LyricAnimationEasing,
} from '../internal/lyricAnimationUtils'

export type LyricLetterSpacingDirection = 'expand' | 'contract'
export type LyricLetterSpacingEasing = LyricAnimationEasing

export type LyricLetterSpacingMotion = {
  /** Additional spacing at the wide end, in em. Defaults to 0.25. */
  readonly extraSpacingEm?: number
  /** Time to reach the expanded or standard spacing, in frames. */
  readonly durationInFrames?: number
  /** Delay before the spacing changes, in frames. */
  readonly delayInFrames?: number
  readonly easing?: LyricLetterSpacingEasing
}

export type LyricLetterSpacingProps = Omit<LyricPatternProps, 'children'> & {
  readonly children: LyricPatternProps['children']
  /** Expand from standard spacing or contract back to standard spacing. */
  readonly direction?: LyricLetterSpacingDirection
  /** Spacing animation settings. */
  readonly motion?: LyricLetterSpacingMotion
}

const DEFAULT_MOTION = {
  extraSpacingEm: 0.25,
  durationInFrames: 20,
  delayInFrames: 0,
  easing: 'ease-out',
} as const satisfies Required<LyricLetterSpacingMotion>

/** Animates the spacing between characters while keeping the lyric centered. */
const LyricLetterSpacingView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  direction = 'expand',
  motion = {},
}: LyricLetterSpacingProps) => {
  const frame = useCurrentFrame()
  const {
    extraSpacingEm = DEFAULT_MOTION.extraSpacingEm,
    durationInFrames = DEFAULT_MOTION.durationInFrames,
    delayInFrames = DEFAULT_MOTION.delayInFrames,
    easing = DEFAULT_MOTION.easing,
  } = motion

  assertFiniteNonNegative(extraSpacingEm, 'LyricLetterSpacing extraSpacingEm')
  assertFinitePositive(durationInFrames, 'LyricLetterSpacing durationInFrames')
  assertFiniteNonNegative(delayInFrames, 'LyricLetterSpacing delayInFrames')

  const progress = getLyricAnimationProgress(
    frame - delayInFrames,
    durationInFrames,
    easing,
  )
  const standardSpacing = DEFAULT_LETTER_SPACING_EM
  const wideSpacing = standardSpacing + extraSpacingEm
  const letterSpacingEm =
    direction === 'expand'
      ? standardSpacing + (wideSpacing - standardSpacing) * progress
      : wideSpacing - (wideSpacing - standardSpacing) * progress

  return (
    <LyricPatternLayout
      position={position}
      anchor={anchor}
      safeArea={safeArea}
      size={size}
      orientation={orientation}
      rotationDegrees={rotationDegrees}
      autoWrap={autoWrap}
      letterSpacingEm={letterSpacingEm}
    >
      {children}
    </LyricPatternLayout>
  )
}

export const LyricLetterSpacing = withLyricStudioPosition(
  LyricLetterSpacingView,
  'LyricLetterSpacing',
)
