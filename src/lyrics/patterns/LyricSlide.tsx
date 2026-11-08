import type { CSSProperties } from 'react'
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

export type LyricSlideDirection = 'left' | 'right'

export type LyricSlideMotion = {
  /** Travel distance from the entry side, measured in em. */
  readonly distanceEm?: number
  /** Time for the lyric to reach its final position, in frames. */
  readonly durationInFrames?: number
  /** Delay before the slide begins, in frames. */
  readonly delayInFrames?: number
  readonly easing?: LyricAnimationEasing
}

export type LyricSlideProps = Omit<LyricPatternProps, 'children'> & {
  /** Side the lyric enters from. Defaults to left. */
  readonly enterFrom?: LyricSlideDirection
  readonly children: LyricPatternProps['children']
  /** Slide timing and distance. */
  readonly motion?: LyricSlideMotion
}

const DEFAULT_MOTION = {
  distanceEm: 1.25,
  durationInFrames: 14,
  delayInFrames: 0,
  easing: 'ease-out',
} as const satisfies Required<LyricSlideMotion>

/** Slides the complete lyric phrase in from one side, then holds it in place. */
const LyricSlideView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  enterFrom = 'left',
  motion = {},
}: LyricSlideProps) => {
  const frame = useCurrentFrame()
  const {
    distanceEm = DEFAULT_MOTION.distanceEm,
    durationInFrames = DEFAULT_MOTION.durationInFrames,
    delayInFrames = DEFAULT_MOTION.delayInFrames,
    easing = DEFAULT_MOTION.easing,
  } = motion

  assertFiniteNonNegative(distanceEm, 'LyricSlide distanceEm')
  assertFinitePositive(durationInFrames, 'LyricSlide durationInFrames')
  assertFiniteNonNegative(delayInFrames, 'LyricSlide delayInFrames')

  const progress = getLyricAnimationProgress(
    frame - delayInFrames,
    durationInFrames,
    easing,
  )
  const direction = enterFrom === 'left' ? -1 : 1
  const slideStyle: CSSProperties = {
    display: 'inline-block',
    opacity: progress,
    translate: `${direction * distanceEm * (1 - progress)}em 0`,
  }

  return (
    <LyricPatternLayout
      position={position}
      anchor={anchor}
      safeArea={safeArea}
      size={size}
      orientation={orientation}
      rotationDegrees={rotationDegrees}
      backdropOpacity={progress}
      autoWrap={autoWrap}
      wrapperStyle={slideStyle}
    >
      {children}
    </LyricPatternLayout>
  )
}

export const LyricSlide = withLyricStudioPosition(LyricSlideView, 'LyricSlide')
