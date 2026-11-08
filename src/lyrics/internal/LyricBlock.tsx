import type { CSSProperties, ReactNode } from 'react'
import { useLyricsLayout } from '../LyricsLayout'
import { useLyricPositionAdjustment } from './lyricStudioEditing'

/** A normalized point in the selected area. Coordinates outside 0–1 are clamped. */
export type LyricPosition = {
  readonly x: number
  readonly y: number
}

/** The point on the block aligned to position. */
export type LyricAnchor =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

type AnchorPoint = {
  readonly x: number
  readonly y: number
}

export type LyricSafeAreaMode = 'respect' | 'ignore'

export type LyricBlockProps = {
  readonly children: ReactNode
  /** Position within the safe area, or the full composition when ignored. */
  readonly position: LyricPosition
  /** Defaults to the center of the block. */
  readonly anchor?: LyricAnchor
  /** Defaults to respect; ignore positions against the full frame. */
  readonly safeArea?: LyricSafeAreaMode
}

const ANCHOR_POINTS = {
  'top-left': { x: 0, y: 0 },
  'top-center': { x: 0.5, y: 0 },
  'top-right': { x: 1, y: 0 },
  'center-left': { x: 0, y: 0.5 },
  center: { x: 0.5, y: 0.5 },
  'center-right': { x: 1, y: 0.5 },
  'bottom-left': { x: 0, y: 1 },
  'bottom-center': { x: 0.5, y: 1 },
  'bottom-right': { x: 1, y: 1 },
} satisfies Record<LyricAnchor, AnchorPoint>

const clampCoordinate = (value: number | undefined) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 0.5
  }

  return Math.max(0, Math.min(1, value))
}

/**
 * Places children absolutely by normalized composition coordinates.
 * It does not style text, animate, constrain, or clip the children.
 */
export const LyricBlock = ({
  children,
  position,
  anchor = 'center',
  safeArea = 'respect',
}: LyricBlockProps) => {
  // Studio can briefly write a partial nested object while an Inspector value
  // is being edited. Keep the preview renderable until both values are present.
  const x = clampCoordinate(position?.x)
  const y = clampCoordinate(position?.y)

  const { frame, safeArea: insets } = useLyricsLayout()
  const area =
    safeArea === 'respect'
      ? insets
      : { left: 0, top: 0, width: frame.width, height: frame.height }
  const anchorPoint = ANCHOR_POINTS[anchor]
  const adjustment = useLyricPositionAdjustment()

  const style: CSSProperties = {
    position: 'absolute',
    left: area.left + x * area.width,
    top: area.top + y * area.height,
    transform:
      'translate(' + -anchorPoint.x * 100 + '%, ' + -anchorPoint.y * 100 + '%)',
    ...adjustment?.style,
  }

  return (
    <div ref={adjustment?.ref} style={style}>
      {children}
    </div>
  )
}
