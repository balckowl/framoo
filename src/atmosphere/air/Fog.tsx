import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'

export type FogProps = {
  /** Fog tint. Defaults to a soft neutral white. */
  readonly color?: string
  /** Overall fog density from 0 to 1. */
  readonly density?: number
  /** Drift cycles per second. Set to 0 for still fog. */
  readonly speed?: number
  /** Blur radius in pixels. */
  readonly softness?: number
}

const FOG_LAYERS = [
  {
    phase: 0.2,
    speed: 1,
    travel: 0.035,
    opacity: 0.38,
    background:
      'radial-gradient(ellipse 34% 55% at 12% 78%, COLOR 0%, transparent 76%), radial-gradient(ellipse 40% 50% at 48% 70%, COLOR 0%, transparent 78%), radial-gradient(ellipse 36% 48% at 86% 76%, COLOR 0%, transparent 78%)',
  },
  {
    phase: 2.1,
    speed: 0.72,
    travel: 0.026,
    opacity: 0.28,
    background:
      'radial-gradient(ellipse 38% 49% at 8% 39%, COLOR 0%, transparent 78%), radial-gradient(ellipse 45% 55% at 54% 42%, COLOR 0%, transparent 78%), radial-gradient(ellipse 35% 47% at 92% 46%, COLOR 0%, transparent 78%)',
  },
  {
    phase: 4.2,
    speed: 0.48,
    travel: 0.02,
    opacity: 0.2,
    background:
      'radial-gradient(ellipse 39% 50% at 20% 57%, COLOR 0%, transparent 80%), radial-gradient(ellipse 42% 47% at 76% 60%, COLOR 0%, transparent 80%)',
  },
] as const

/** Adds several softly drifting sheets of mist over the current layer. */
export const Fog = ({
  color = '#f2f4f3',
  density = 0.34,
  speed = 0.055,
  softness = 24,
}: FogProps) => {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  assertRange('Fog density', density, 0, 1)
  assertRange('Fog speed', speed, 0, 1)
  assertRange('Fog softness', softness, 0, 100)

  assertNonEmptyString('Fog color', color)

  const time = frame / fps
  const cycle = time * speed * Math.PI * 2

  return (
    <AbsoluteFill
      aria-hidden
      style={{ overflow: 'hidden', pointerEvents: 'none' }}
    >
      {FOG_LAYERS.map((layer, index) => {
        const layerCycle = cycle * layer.speed + layer.phase
        const driftX = Math.sin(layerCycle) * width * layer.travel
        const driftY = Math.cos(layerCycle * 0.72) * height * 0.012
        const scale = 1 + Math.sin(layerCycle + 1.4) * 0.025

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: '-12%',
              background: layer.background.replaceAll('COLOR', color),
              opacity: density * layer.opacity,
              filter: softness > 0 ? `blur(${softness}px)` : undefined,
              transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale})`,
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}
