import type { CSSProperties, ReactNode } from 'react'
import { useVideoConfig } from 'remotion'

const DESIGN_HEIGHT = 1080
const MINCHO_FONT_FAMILY =
  '"Hiragino Mincho ProN", "Yu Mincho", YuMincho, "Noto Serif JP", "Source Han Serif JP", serif'
const BACKDROP_GRADIENT =
  'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.04) 48%, rgba(0, 0, 0, 0) 78%)'
const BACKDROP_BLUR_AT_DESIGN_HEIGHT = 24
export const DEFAULT_LETTER_SPACING_EM = 0.055

/** Preset font sizes in pixels at a 1080px composition height. */
export type LyricTypographySize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'base'
  | 'xl'
  | '2xl'
  | '4xl'

/** Direction in which lyric characters are typeset. */
export type LyricTextOrientation = 'horizontal' | 'vertical'

const SIZE_PIXELS = {
  xs: 56,
  sm: 72,
  md: 92,
  base: 124,
  xl: 164,
  '2xl': 216,
  '4xl': 360,
} satisfies Record<LyricTypographySize, number>

export type LyricTypographyProps = {
  readonly children: ReactNode
  /** Scales with composition height. Defaults to base. */
  readonly size?: LyricTypographySize
  /** Japanese writing direction. Defaults to horizontal. */
  readonly orientation?: LyricTextOrientation
  /** Rotates the complete lyric group in degrees. Defaults to 0. */
  readonly rotationDegrees?: number
  /** Opacity of the soft backdrop. Defaults to 1. */
  readonly backdropOpacity?: number
  /** Letter spacing in em. Defaults to the library's Mincho spacing. */
  readonly letterSpacingEm?: number
  /** Allow automatic line wrapping. Explicit line breaks are always preserved. */
  readonly autoWrap?: boolean
}

/** White Mincho text with a very soft, phrase-wide dark haze for readability. */
export const LyricTypography = ({
  children,
  size = 'base',
  orientation = 'horizontal',
  rotationDegrees = 0,
  backdropOpacity = 1,
  letterSpacingEm = DEFAULT_LETTER_SPACING_EM,
  autoWrap = false,
}: LyricTypographyProps) => {
  if (!Number.isFinite(letterSpacingEm)) {
    throw new Error('LyricTypography letterSpacingEm must be finite.')
  }
  if (!Number.isFinite(rotationDegrees)) {
    throw new Error('LyricTypography rotationDegrees must be finite.')
  }

  const { height } = useVideoConfig()
  const fontSize = Math.round((SIZE_PIXELS[size] * height) / DESIGN_HEIGHT)
  const backdropBlur = Math.max(
    1,
    Math.round((BACKDROP_BLUR_AT_DESIGN_HEIGHT * height) / DESIGN_HEIGHT),
  )

  const rootStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    isolation: 'isolate',
    transform:
      rotationDegrees === 0 ? undefined : `rotate(${rotationDegrees}deg)`,
    transformOrigin: 'center center',
  }

  const backdropStyle: CSSProperties = {
    position: 'absolute',
    zIndex: -1,
    inset: '-35% -14%',
    background: BACKDROP_GRADIENT,
    filter: 'blur(' + backdropBlur + 'px)',
    opacity: Math.max(0, Math.min(1, backdropOpacity)),
    pointerEvents: 'none',
  }

  const textStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    color: '#fff',
    fontFamily: MINCHO_FONT_FAMILY,
    fontSize,
    fontWeight: 500,
    letterSpacing: `${letterSpacingEm}em`,
    lineHeight: 1.4,
    whiteSpace: autoWrap ? 'pre-wrap' : 'pre',
    writingMode: orientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
    textOrientation: orientation === 'vertical' ? 'mixed' : undefined,
  }

  return (
    <span style={rootStyle}>
      <span aria-hidden="true" style={backdropStyle} />
      <span style={textStyle}>{children}</span>
    </span>
  )
}
