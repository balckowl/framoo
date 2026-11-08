import { AbsoluteFill } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'

export type ColorOverlayProps = {
  /** Solid CSS color placed over the current layer. Defaults to black. */
  readonly color?: string
  /** Overlay opacity from 0 to 1. Defaults to 0.28. */
  readonly opacity?: number
}

/** Places a static, translucent solid-color layer over the current layer. */
export const ColorOverlay = ({
  color = '#000000',
  opacity = 0.28,
}: ColorOverlayProps) => {
  assertRange('ColorOverlay opacity', opacity, 0, 1)

  assertNonEmptyString('ColorOverlay color', color)

  return (
    <AbsoluteFill
      aria-hidden
      style={{
        backgroundColor: color,
        opacity,
        pointerEvents: 'none',
      }}
    />
  )
}
