import { useCurrentFrame } from 'remotion'
import type { LyricPatternProps } from '../internal/LyricPatternProps'
import { LyricPatternLayout } from '../internal/LyricPatternLayout'
import { withLyricStudioPosition } from '../internal/lyricStudioEditing'
import {
  assertFiniteNonNegative,
  assertFinitePositive,
  getLyricAnimationProgress,
  type LyricAnimationEasing,
} from '../internal/lyricAnimationUtils'

export type LyricFadeMotion = {
  /** Time for the full phrase to become visible, in frames. Defaults to 18. */
  readonly durationInFrames?: number
  /** Delay before the fade begins, in frames. Defaults to 0. */
  readonly delayInFrames?: number
  readonly easing?: LyricAnimationEasing
}

export type LyricFadeProps = Omit<LyricPatternProps, 'children'> & {
  readonly children: LyricPatternProps['children']
  /** Timing for the phrase-wide fade. */
  readonly motion?: LyricFadeMotion
}

const DEFAULT_MOTION = {
  durationInFrames: 18,
  delayInFrames: 0,
  easing: 'ease-out',
} as const satisfies Required<LyricFadeMotion>

/** Fades the complete lyric phrase in, then keeps it visible. */
const LyricFadeView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  motion = {},
}: LyricFadeProps) => {
  const frame = useCurrentFrame()
  const {
    durationInFrames = DEFAULT_MOTION.durationInFrames,
    delayInFrames = DEFAULT_MOTION.delayInFrames,
    easing = DEFAULT_MOTION.easing,
  } = motion

  assertFinitePositive(durationInFrames, 'LyricFade durationInFrames')
  assertFiniteNonNegative(delayInFrames, 'LyricFade delayInFrames')

  const opacity = getLyricAnimationProgress(
    frame - delayInFrames,
    durationInFrames,
    easing,
  )

  return (
    <LyricPatternLayout
      position={position}
      anchor={anchor}
      safeArea={safeArea}
      size={size}
      orientation={orientation}
      rotationDegrees={rotationDegrees}
      autoWrap={autoWrap}
      backdropOpacity={opacity}
    >
      <span style={{ opacity }}>{children}</span>
    </LyricPatternLayout>
  )
}

export const LyricFade = withLyricStudioPosition(LyricFadeView, 'LyricFade')
