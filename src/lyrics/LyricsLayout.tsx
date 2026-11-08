import { createContext, useContext, type ReactNode } from 'react'
import { useVideoConfig } from 'remotion'

const DESIGN_FRAME = {
  width: 1920,
  height: 1080,
} as const

const DEFAULT_SAFE_AREA = {
  horizontal: 50,
  vertical: 100,
} as const

type SafeAreaInsets = {
  readonly horizontal: number
  readonly vertical: number
}

export type LyricsSafeArea = {
  /** Horizontal inset in design pixels at 1920x1080. Defaults to 50. */
  readonly horizontal?: number
  /** Vertical inset in design pixels at 1920x1080. Defaults to 100. */
  readonly vertical?: number
}

export type LyricsLayoutProps = {
  readonly children: ReactNode
  /** Shared safe area for lyric blocks inside this layout. */
  readonly safeArea?: LyricsSafeArea
}

export type LyricsLayoutMetrics = {
  readonly frame: {
    readonly width: number
    readonly height: number
  }
  /** Safe-area edges and dimensions in composition pixels. */
  readonly safeArea: {
    readonly left: number
    readonly right: number
    readonly top: number
    readonly bottom: number
    readonly width: number
    readonly height: number
  }
}

const LyricsSafeAreaContext = createContext<SafeAreaInsets>(DEFAULT_SAFE_AREA)

const validateInset = (axis: 'horizontal' | 'vertical', value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(
      'LyricsLayout safeArea.' +
        axis +
        ' must be a finite non-negative number.',
    )
  }
}

const resolveSafeArea = (safeArea: LyricsSafeArea = {}): SafeAreaInsets => {
  const resolved = {
    horizontal: safeArea.horizontal ?? DEFAULT_SAFE_AREA.horizontal,
    vertical: safeArea.vertical ?? DEFAULT_SAFE_AREA.vertical,
  }

  validateInset('horizontal', resolved.horizontal)
  validateInset('vertical', resolved.vertical)

  return resolved
}

/**
 * Shares safe-area settings without adding a DOM wrapper.
 * Insets are scaled from the 1920x1080 design frame to the composition size.
 */
export const LyricsLayout = ({ children, safeArea }: LyricsLayoutProps) => (
  <LyricsSafeAreaContext.Provider value={resolveSafeArea(safeArea)}>
    {children}
  </LyricsSafeAreaContext.Provider>
)

/** Internal geometry used by LyricBlock; coordinates are composition pixels. */
export const useLyricsLayout = (): LyricsLayoutMetrics => {
  const insets = useContext(LyricsSafeAreaContext)
  const { width, height } = useVideoConfig()

  const horizontal = insets.horizontal * (width / DESIGN_FRAME.width)
  const vertical = insets.vertical * (height / DESIGN_FRAME.height)
  const safeWidth = width - horizontal * 2
  const safeHeight = height - vertical * 2

  if (safeWidth <= 0 || safeHeight <= 0) {
    throw new Error(
      'LyricsLayout safe area must leave a positive area inside the composition.',
    )
  }

  return {
    frame: { width, height },
    safeArea: {
      left: horizontal,
      right: width - horizontal,
      top: vertical,
      bottom: height - vertical,
      width: safeWidth,
      height: safeHeight,
    },
  }
}
