import type { CSSProperties, ReactNode } from 'react'
import type { LyricPatternProps } from './LyricPatternProps'
import { LyricBlock } from './LyricBlock'
import { LyricTypography } from './LyricTypography'

type LyricPatternLayoutProps = Pick<
  LyricPatternProps,
  | 'position'
  | 'anchor'
  | 'safeArea'
  | 'size'
  | 'orientation'
  | 'rotationDegrees'
  | 'autoWrap'
> & {
  readonly children: ReactNode
  readonly backdropOpacity?: number
  readonly letterSpacingEm?: number
  readonly wrapperStyle?: CSSProperties
}

/** Shared placement and typography shell for the lyric animation patterns. */
export const LyricPatternLayout = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  backdropOpacity,
  letterSpacingEm,
  wrapperStyle,
}: LyricPatternLayoutProps) => {
  const typography = (
    <LyricTypography
      size={size}
      orientation={orientation}
      rotationDegrees={rotationDegrees}
      autoWrap={autoWrap}
      backdropOpacity={backdropOpacity}
      letterSpacingEm={letterSpacingEm}
    >
      {children}
    </LyricTypography>
  )

  return (
    <LyricBlock position={position} anchor={anchor} safeArea={safeArea}>
      {wrapperStyle ? (
        <span style={wrapperStyle}>{typography}</span>
      ) : (
        typography
      )}
    </LyricBlock>
  )
}
