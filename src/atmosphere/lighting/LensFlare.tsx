import { useCurrentFrame, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'
import type { NormalizedPoint } from '../types'

export type LensFlareProps = {
  /** Position of the light source in normalized composition coordinates. */
  readonly source?: NormalizedPoint
  /** Flare color. Defaults to warm white. */
  readonly color?: string
  /** Overall strength from 0 to 1. Defaults to 0.28. */
  readonly intensity?: number
  /** Optional activation frames. Without cues, the flare stays gently visible. */
  readonly cueFrames?: readonly number[]
  /** How quickly a cue-triggered flare decays, in frames. Defaults to about 0.9 seconds. */
  readonly decayInFrames?: number
  /** Adds a horizontal anamorphic streak through the light source. */
  readonly anamorphic?: boolean
}

/** A restrained source-anchored flare with ghosts and an optional anamorphic streak. */
export const LensFlare = ({
  source = { x: 0.08, y: 0.08 },
  color = '#ffe8bd',
  intensity = 0.28,
  cueFrames,
  decayInFrames,
  anamorphic = true,
}: LensFlareProps) => {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  assertRange('LensFlare source.x', source.x, 0, 1)
  assertRange('LensFlare source.y', source.y, 0, 1)
  assertRange('LensFlare intensity', intensity, 0, 1)
  const actualDecayInFrames = decayInFrames ?? 0.9 * fps
  assertRange(
    'LensFlare decayInFrames',
    actualDecayInFrames,
    0.05,
    Number.MAX_SAFE_INTEGER,
  )
  assertNonEmptyString('LensFlare color', color)

  if (
    cueFrames &&
    !cueFrames.every((atFrame) => Number.isFinite(atFrame) && atFrame >= 0)
  ) {
    throw new Error(
      'LensFlare cueFrames must be non-negative finite frame values.',
    )
  }

  const timeSeconds = frame / fps
  const cueStrength = cueFrames
    ? cueFrames.reduce((maximum, atFrame) => {
        const ageInFrames = frame - atFrame
        if (ageInFrames < 0 || ageInFrames > actualDecayInFrames * 4) {
          return maximum
        }

        return Math.max(maximum, Math.exp(-ageInFrames / actualDecayInFrames))
      }, 0)
    : 0.82 + 0.18 * Math.sin(timeSeconds * 0.36)

  if (cueStrength <= 0) {
    return null
  }

  const vectorX = 0.5 - source.x
  const vectorY = 0.5 - source.y
  const axisDegrees =
    (Math.atan2(vectorY * height, vectorX * width) * 180) / Math.PI
  const diagonal = Math.hypot(width, height)
  const ghosts = [0.35, 0.7, 1.12, 1.42]
    .map((distance, index) => ({
      x: source.x + vectorX * distance,
      y: source.y + vectorY * distance,
      size: diagonal * (0.014 + index * 0.006),
      opacity: 0.38 - index * 0.055,
    }))
    .filter(
      (ghost) =>
        ghost.x > -0.1 && ghost.x < 1.1 && ghost.y > -0.1 && ghost.y < 1.1,
    )

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
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
          width: diagonal * 0.095,
          height: diagonal * 0.095,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,255,255,.95) 0%, ${color} 12%, transparent 72%)`,
          filter: 'blur(7px)',
          opacity: intensity * cueStrength,
        }}
      />
      {anamorphic ? (
        <div
          style={{
            position: 'absolute',
            left: `${source.x * 100}%`,
            top: `${source.y * 100}%`,
            width: diagonal * 0.72,
            height: Math.max(2, diagonal * 0.004),
            transform: `translate(-50%, -50%) rotate(${axisDegrees}deg)`,
            background: `linear-gradient(90deg, transparent, ${color} 35%, rgba(255,255,255,.8) 50%, ${color} 65%, transparent)`,
            filter: 'blur(4px)',
            opacity: intensity * cueStrength * 0.48,
          }}
        />
      ) : null}
      {ghosts.map((ghost, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${ghost.x * 100}%`,
            top: `${ghost.y * 100}%`,
            width: ghost.size,
            height: ghost.size,
            transform: 'translate(-50%, -50%)',
            borderRadius: index % 2 ? '50% 38% 50% 38%' : '50%',
            border: `1px solid ${color}`,
            background: `radial-gradient(circle, transparent 35%, ${color} 48%, transparent 70%)`,
            boxShadow: `0 0 ${ghost.size * 0.24}px ${color}`,
            filter: 'blur(2px)',
            opacity: intensity * cueStrength * ghost.opacity,
          }}
        />
      ))}
    </div>
  )
}
