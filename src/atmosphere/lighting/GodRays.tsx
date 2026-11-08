import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'
import { stableUnit } from '../internal/stableUnit'
import type { NormalizedPoint } from '../types'

export type GodRaysProps = {
  /** Light source position in normalized composition coordinates. */
  readonly source?: NormalizedPoint
  /** Direction of the rays in CSS degrees: 0 points right, 90 points down. */
  readonly angleDegrees?: number
  readonly spreadDegrees?: number
  readonly rayCount?: number
  /** Overall strength from 0 to 1. */
  readonly intensity?: number
  readonly color?: string
  /** Ray length relative to the composition diagonal. */
  readonly length?: number
  /** Blur radius in pixels. */
  readonly softness?: number
}

/** Emits soft, slowly breathing beams from a chosen light source. */
export const GodRays = ({
  source = { x: 0.1, y: 0.08 },
  angleDegrees = 38,
  spreadDegrees = 34,
  rayCount = 11,
  intensity = 0.12,
  color = '#fff1c7',
  length = 1.25,
  softness = 14,
}: GodRaysProps) => {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  assertRange('GodRays source.x', source.x, 0, 1)
  assertRange('GodRays source.y', source.y, 0, 1)
  assertRange('GodRays angleDegrees', angleDegrees, -360, 360)
  assertRange('GodRays spreadDegrees', spreadDegrees, 0, 150)
  assertRange('GodRays rayCount', rayCount, 1, 32)
  assertRange('GodRays intensity', intensity, 0, 1)
  assertRange('GodRays length', length, 0.1, 3)
  assertRange('GodRays softness', softness, 0, 80)
  assertNonEmptyString('GodRays color', color)

  const count = Math.round(rayCount)
  const diagonal = Math.hypot(width, height)
  const rayLength = diagonal * length
  const baseWidth = Math.max(2, diagonal * 0.007)
  const time = frame / fps
  const breathe = 0.9 + 0.1 * Math.sin(time / 3.8)

  return (
    <AbsoluteFill
      aria-hidden
      style={{
        overflow: 'hidden',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${source.x * 100}%`,
          top: `${source.y * 100}%`,
          width: diagonal * 0.2,
          height: diagonal * 0.2,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, transparent 72%)`,
          opacity: intensity * 0.75 * breathe,
          filter: `blur(${softness * 1.5}px)`,
        }}
      />
      {Array.from({ length: count }, (_, index) => {
        const spreadPosition = count === 1 ? 0 : index / (count - 1) - 0.5
        const jitter =
          (stableUnit(`god-rays-angle:${index}`) - 0.5) *
          (spreadDegrees / count)
        const angle = angleDegrees + spreadPosition * spreadDegrees + jitter
        const rayWidth =
          baseWidth * (0.55 + stableUnit(`god-rays-width:${index}`) * 1.25)
        const pulse =
          0.75 + 0.25 * Math.sin(time / (3 + index * 0.08) + index * 1.9)
        const rayOpacity =
          intensity *
          breathe *
          pulse *
          (0.35 + stableUnit(`god-rays-opacity:${index}`) * 0.45)

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${source.x * 100}%`,
              top: `${source.y * 100}%`,
              width: rayLength,
              height: rayWidth,
              transformOrigin: '0 50%',
              transform: `rotate(${angle}deg)`,
              background: `linear-gradient(90deg, ${color} 0%, ${color} 4%, transparent 100%)`,
              filter: `blur(${softness}px)`,
              opacity: rayOpacity,
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}
