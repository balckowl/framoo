import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'

export type PatternKind =
  | 'stripes'
  | 'dots'
  | 'grid'
  | 'halftone'
  | 'rings'
  | 'waves'

export type PatternOverlayProps = {
  /** Graphic pattern to repeat over the current layer. */
  readonly kind?: PatternKind
  /** CSS color used by the pattern. */
  readonly color?: string
  /** Distance between repeated pattern cells, in pixels. */
  readonly size?: number
  /** Overall pattern opacity from 0 to 1. */
  readonly opacity?: number
  /** Pattern drift in pixels per second. Negative values reverse it. */
  readonly speed?: number
}

const getPatternBackground = (
  kind: PatternKind,
  color: string,
  size: number,
) => {
  const lineWidth = Math.max(1, size * 0.025)
  const dotRadius = Math.max(1, size * 0.035)

  switch (kind) {
    case 'stripes':
      return {
        image: `repeating-linear-gradient(135deg, ${color} 0 ${size / 8}px, transparent ${size / 8}px ${size}px)`,
        size: `${size}px ${size}px`,
      }
    case 'dots':
      return {
        image: `radial-gradient(circle, ${color} ${dotRadius}px, transparent ${dotRadius * 1.5}px)`,
        size: `${size}px ${size}px`,
      }
    case 'grid':
      return {
        image: `linear-gradient(${color} ${lineWidth}px, transparent ${lineWidth}px), linear-gradient(90deg, ${color} ${lineWidth}px, transparent ${lineWidth}px)`,
        size: `${size}px ${size}px`,
      }
    case 'halftone':
      return {
        image: `radial-gradient(circle, ${color} 0 ${size * 0.13}px, transparent ${size * 0.16}px)`,
        size: `${size}px ${size}px`,
      }
    case 'rings':
      return {
        image: `repeating-radial-gradient(circle, ${color} 0 ${lineWidth}px, transparent ${lineWidth * 1.5}px ${size * 0.22}px)`,
        size: `${size * 2}px ${size * 2}px`,
      }
    case 'waves':
      return {
        image: `repeating-radial-gradient(ellipse at 50% 100%, transparent 0 ${size * 0.2}px, ${color} ${size * 0.22}px ${size * 0.25}px, transparent ${size * 0.27}px ${size * 0.48}px)`,
        size: `${size * 2}px ${size * 2}px`,
      }
  }
}

/** Adds a gently scrolling, repeating graphic pattern over the current layer. */
export const PatternOverlay = ({
  kind = 'dots',
  color = 'rgba(255, 255, 255, 0.2)',
  size = 36,
  opacity = 0.8,
  speed = 10,
}: PatternOverlayProps) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  assertRange('PatternOverlay size', size, 4, 300)
  assertRange('PatternOverlay opacity', opacity, 0, 1)
  assertRange('PatternOverlay speed', speed, -500, 500)

  assertNonEmptyString('PatternOverlay color', color)

  const pattern = getPatternBackground(kind, color, size)
  const offset = (frame / fps) * speed

  return (
    <AbsoluteFill
      aria-hidden
      style={{
        inset: 0,
        backgroundImage: pattern.image,
        backgroundSize: pattern.size,
        backgroundPosition: `${offset}px ${offset * 0.6}px`,
        backgroundRepeat: 'repeat',
        opacity,
        pointerEvents: 'none',
      }}
    />
  )
}
