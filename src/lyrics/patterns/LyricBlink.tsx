import { useCurrentFrame } from 'remotion'
import type { LyricPatternProps } from '../internal/LyricPatternProps'
import { LyricPatternLayout } from '../internal/LyricPatternLayout'
import { withLyricStudioPosition } from '../internal/lyricStudioEditing'
import {
  assertNonNegativeInteger,
  assertPositiveInteger,
} from '../internal/lyricAnimationUtils'

export type LyricBlinkMotion = {
  /** Delay before the first blink, in frames. */
  readonly delayInFrames?: number
  /** Visible time before each blink, in frames. */
  readonly visibleDurationInFrames?: number
  /** Time the lyric stays hidden per blink, in frames. */
  readonly hiddenDurationInFrames?: number
}

export type LyricBlinkProps = Omit<LyricPatternProps, 'children'> & {
  readonly children: LyricPatternProps['children']
  /** Number of brief disappear-and-return cycles. Defaults to 2. */
  readonly blinkCount?: number
  /** Blink timing. */
  readonly motion?: LyricBlinkMotion
}

const DEFAULT_MOTION = {
  delayInFrames: 0,
  visibleDurationInFrames: 4,
  hiddenDurationInFrames: 2,
} as const satisfies Required<LyricBlinkMotion>

/** Briefly hides the full lyric phrase, then restores it after each blink. */
const LyricBlinkView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  blinkCount = 2,
  motion = {},
}: LyricBlinkProps) => {
  const frame = useCurrentFrame()
  const {
    delayInFrames = DEFAULT_MOTION.delayInFrames,
    visibleDurationInFrames = DEFAULT_MOTION.visibleDurationInFrames,
    hiddenDurationInFrames = DEFAULT_MOTION.hiddenDurationInFrames,
  } = motion

  assertPositiveInteger(blinkCount, 'LyricBlink blinkCount')
  assertNonNegativeInteger(delayInFrames, 'LyricBlink delayInFrames')
  assertPositiveInteger(
    visibleDurationInFrames,
    'LyricBlink visibleDurationInFrames',
  )
  assertPositiveInteger(
    hiddenDurationInFrames,
    'LyricBlink hiddenDurationInFrames',
  )

  const elapsed = frame - delayInFrames
  const blinkCycleInFrames = visibleDurationInFrames + hiddenDurationInFrames
  const finished = elapsed >= blinkCount * blinkCycleInFrames
  const isVisible =
    elapsed < 0 ||
    finished ||
    elapsed % blinkCycleInFrames < visibleDurationInFrames
  const opacity = isVisible ? 1 : 0

  return (
    <LyricPatternLayout
      position={position}
      anchor={anchor}
      safeArea={safeArea}
      size={size}
      orientation={orientation}
      rotationDegrees={rotationDegrees}
      backdropOpacity={opacity}
      autoWrap={autoWrap}
    >
      <span style={{ opacity }}>{children}</span>
    </LyricPatternLayout>
  )
}

export const LyricBlink = withLyricStudioPosition(LyricBlinkView, 'LyricBlink')
