import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'
import { stableUnit } from '../internal/stableUnit'

export type ParticlePreset = 'dust' | 'petals' | 'sparks' | 'snow' | 'rain'
export type ParticleDepth = 'near' | 'mixed' | 'far'

export type ParticleFieldProps = {
  /** Particle behavior and shape. */
  readonly preset?: ParticlePreset
  /** Overall particle population from 0 to 1. The field is capped at 80 particles. */
  readonly density?: number
  /** Multiplies particle dimensions. Defaults to 1. */
  readonly sizeScale?: number
  /** Optional shared tint. Defaults to a preset-specific color. */
  readonly color?: string
  /** Relative size and speed of particles in front of or behind the scene. */
  readonly depth?: ParticleDepth
}

const PRESET_COLORS: Record<ParticlePreset, string> = {
  dust: '#fff4d8',
  petals: '#f2aaba',
  sparks: '#ffd99a',
  snow: '#eef8ff',
  rain: 'rgba(190, 220, 255, 0.62)',
}

const BASE_SIZE: Record<ParticlePreset, number> = {
  dust: 9.28,
  petals: 28.8,
  sparks: 12.8,
  snow: 14.4,
  rain: 4.48,
}

const PARTICLE_COUNT_LIMIT = 80

/** Renders a deterministic field of drifting dust, petals, sparks, snow, or rain. */
export const ParticleField = ({
  preset = 'dust',
  density = 0.18,
  sizeScale = 1,
  color,
  depth = 'mixed',
}: ParticleFieldProps) => {
  const frame = useCurrentFrame()
  const { width, height, fps } = useVideoConfig()

  assertRange('ParticleField density', density, 0, 1)
  assertRange('ParticleField sizeScale', sizeScale, 0.25, 4)

  const particleColor = color ?? PRESET_COLORS[preset]
  assertNonEmptyString('ParticleField color', particleColor)

  const count = Math.min(PARTICLE_COUNT_LIMIT, Math.round(density * 100))
  const travelHeight = height + 64

  return (
    <AbsoluteFill
      aria-hidden
      style={{ overflow: 'hidden', pointerEvents: 'none' }}
    >
      {Array.from({ length: count }, (_, index) => {
        const seed = `particle:${preset}:${index}`
        const randomDepth = stableUnit(`${seed}:depth`)
        const depthScale =
          depth === 'near'
            ? 1.35
            : depth === 'far'
              ? 0.62
              : 0.55 + randomDepth * 0.9
        const sizeVariation = 0.7 + stableUnit(`${seed}:size`) * 0.65
        const size = BASE_SIZE[preset] * depthScale * sizeVariation * sizeScale
        const initialX = stableUnit(`${seed}:x`) * width
        const initialY = stableUnit(`${seed}:y`) * travelHeight - 32
        const phase = stableUnit(`${seed}:phase`) * Math.PI * 2

        const speed =
          preset === 'rain'
            ? 8 + stableUnit(`${seed}:speed`) * 12
            : preset === 'sparks'
              ? 1.8 + stableUnit(`${seed}:speed`) * 2.6
              : preset === 'snow'
                ? 0.35 + stableUnit(`${seed}:speed`) * 0.75
                : preset === 'petals'
                  ? 0.28 + stableUnit(`${seed}:speed`) * 0.55
                  : 0.12 + stableUnit(`${seed}:speed`) * 0.35

        const direction = preset === 'dust' || preset === 'sparks' ? -1 : 1
        const offsetY =
          ((((initialY + frame * speed * depthScale * direction + 32) %
            travelHeight) +
            travelHeight) %
            travelHeight) -
          32 -
          initialY
        const swayAmplitude =
          preset === 'petals'
            ? 40
            : preset === 'snow'
              ? 24
              : preset === 'rain'
                ? 4
                : 12
        const sway =
          Math.sin(
            frame / (fps * (0.8 + stableUnit(`${seed}:period`) * 1.4)) + phase,
          ) *
          swayAmplitude *
          depthScale
        const flicker =
          preset === 'sparks'
            ? 0.35 + 0.65 * ((Math.sin(frame * 0.48 + phase) + 1) / 2)
            : 0.55 + 0.35 * ((Math.sin(frame / (fps * 2.4) + phase) + 1) / 2)
        const rotation =
          preset === 'petals'
            ? (frame * (0.5 + stableUnit(`${seed}:rotation`) * 1.2) +
                phase * 25) %
              360
            : preset === 'rain'
              ? 9
              : preset === 'sparks'
                ? (stableUnit(`${seed}:rotation`) - 0.5) * 50 +
                  Math.sin(frame * 0.04 + phase) * 10
                : 0
        const opacity =
          flicker * (depth === 'far' ? 0.62 : depth === 'near' ? 0.95 : 0.75)

        return (
          <i
            key={index}
            style={{
              position: 'absolute',
              left: initialX,
              top: initialY,
              width: size,
              height:
                preset === 'rain'
                  ? (34 + stableUnit(`${seed}:length`) * 30) *
                    depthScale *
                    sizeScale
                  : preset === 'sparks'
                    ? size * (1.6 + stableUnit(`${seed}:length`) * 1.8)
                    : preset === 'petals'
                      ? size * 1.5
                      : size,
              borderRadius: preset === 'petals' ? '80% 0 80% 0' : '50%',
              background:
                preset === 'rain'
                  ? `linear-gradient(180deg, transparent, ${particleColor})`
                  : preset === 'sparks'
                    ? `linear-gradient(180deg, transparent 0%, ${particleColor} 35%, ${particleColor} 72%, transparent 100%)`
                    : particleColor,
              opacity: preset === 'rain' ? 0.45 : opacity,
              transform: `translate3d(${sway}px, ${offsetY}px, 0) rotate(${rotation}deg)`,
              boxShadow:
                preset === 'sparks'
                  ? `0 0 ${size * 3.5}px ${particleColor}`
                  : preset === 'snow'
                    ? `0 0 ${size}px ${particleColor}`
                    : preset === 'dust'
                      ? `0 0 ${size * 1.2}px ${particleColor}`
                      : undefined,
              filter: depth === 'far' ? 'blur(0.6px)' : undefined,
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}
