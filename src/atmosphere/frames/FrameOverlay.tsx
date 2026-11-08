import { AbsoluteFill, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'

export type FrameOverlayProps = {
  /** Distance from the composition edges to the frame, in pixels. */
  readonly inset?: number
  /** Frame line thickness in pixels. */
  readonly thickness?: number
  /** Frame color. Defaults to white. */
  readonly color?: string
  /** Frame opacity from 0 to 1. */
  readonly opacity?: number
  /** Corner radius in pixels. Defaults to a square frame. */
  readonly radius?: number
}

/** Draws a static border inside the current layer's composition bounds. */
export const FrameOverlay = ({
  inset = 56,
  thickness = 2,
  color = '#ffffff',
  opacity = 0.9,
  radius = 0,
}: FrameOverlayProps) => {
  const { width, height } = useVideoConfig()
  const minimumDimension = Math.min(width, height)

  assertRange('FrameOverlay inset', inset, 0, minimumDimension / 2)
  assertRange('FrameOverlay thickness', thickness, 0.5, 40)
  assertRange('FrameOverlay opacity', opacity, 0, 1)
  assertRange('FrameOverlay radius', radius, 0, minimumDimension / 2)

  if (inset * 2 + thickness > minimumDimension) {
    throw new Error(
      'FrameOverlay inset and thickness leave no room for the frame.',
    )
  }
  assertNonEmptyString('FrameOverlay color', color)

  return (
    <AbsoluteFill aria-hidden style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          inset,
          boxSizing: 'border-box',
          border: `${thickness}px solid ${color}`,
          borderRadius: radius,
          opacity,
        }}
      />
    </AbsoluteFill>
  )
}
