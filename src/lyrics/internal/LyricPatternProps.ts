import type { ReactNode } from 'react'
import type {
  LyricAnchor,
  LyricPosition,
  LyricSafeAreaMode,
} from './LyricBlock'
import type {
  LyricTextOrientation,
  LyricTypographySize,
} from './LyricTypography'

/** Shared props for the curated lyric animation patterns. */
export type LyricPatternProps = {
  readonly children: ReactNode
  /** Start frame on the parent timeline. Defaults to 0. */
  readonly from?: number
  /** How long the lyric is present on the composition timeline. */
  readonly durationInFrames?: number
  /** Optional label shown for this lyric in Remotion Studio. */
  readonly name?: string
  readonly position: LyricPosition
  readonly anchor?: LyricAnchor
  readonly safeArea?: LyricSafeAreaMode
  readonly size?: LyricTypographySize
  readonly orientation?: LyricTextOrientation
  readonly rotationDegrees?: number
  readonly autoWrap?: boolean
}
