import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { assertRange } from '../internal/assertRange'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'
import { stableUnit } from '../internal/stableUnit'
import type { NormalizedPoint } from '../types'

export type SmokeProps = {
  /** Where smoke enters the frame, in normalized composition coordinates. */
  readonly source?: NormalizedPoint
  /** Smoke tint. Defaults to a light neutral gray. */
  readonly color?: string
  /** Overall opacity from 0 to 1. */
  readonly intensity?: number
  /** Number of overlapping smoke puffs. */
  readonly puffCount?: number
  /** Horizontal spread as a fraction of the composition width. */
  readonly spread?: number
  /** Rise distance as a fraction of the composition height. */
  readonly rise?: number
  /** Emission speed multiplier. */
  readonly speed?: number
  /** Blur radius in pixels. */
  readonly softness?: number
}

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value))

/** Emits a continuous plume of soft, rising smoke over the current layer. */
export const Smoke = ({
  source = { x: 0.5, y: 0.98 },
  color = '#bdbab7',
  intensity = 0.5,
  puffCount = 11,
  spread = 0.16,
  rise = 0.58,
  speed = 1,
  softness = 20,
}: SmokeProps) => {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()

  assertRange('Smoke source.x', source.x, 0, 1)
  assertRange('Smoke source.y', source.y, 0, 1)
  assertRange('Smoke intensity', intensity, 0, 1)
  assertRange('Smoke puffCount', puffCount, 2, 24)
  assertRange('Smoke spread', spread, 0, 1)
  assertRange('Smoke rise', rise, 0, 1)
  assertRange('Smoke speed', speed, 0.1, 4)
  assertRange('Smoke softness', softness, 0, 100)

  assertNonEmptyString('Smoke color', color)

  const count = Math.round(puffCount)
  const time = frame / fps
  const lifetime = 5 / speed
  const diagonal = Math.hypot(width, height)

  return (
    <AbsoluteFill
      aria-hidden
      style={{ overflow: 'hidden', pointerEvents: 'none' }}
    >
      {Array.from({ length: count }, (_, index) => {
        const seed = `smoke:${index}`
        const progress = (time / lifetime + index / count) % 1
        const fadeIn = clamp01(progress / 0.16)
        const fadeOut = clamp01((1 - progress) / 0.24)
        const envelope = fadeIn * fadeOut
        const sizeVariation = 0.82 + stableUnit(`${seed}:size`) * 0.4
        const puffWidth = diagonal * (0.065 + progress * 0.15) * sizeVariation
        const puffHeight =
          puffWidth * (0.68 + stableUnit(`${seed}:height`) * 0.24)
        const drift =
          Math.sin(time * 0.8 + stableUnit(`${seed}:phase`) * Math.PI * 2) *
          width *
          0.012
        const horizontalOffset =
          (stableUnit(`${seed}:spread`) - 0.5) * spread * width + drift
        const riseVariation = 0.78 + stableUnit(`${seed}:rise`) * 0.38
        const left = source.x * width + horizontalOffset - puffWidth / 2
        const top =
          source.y * height -
          progress * rise * riseVariation * height -
          puffHeight * 0.38
        const opacity =
          intensity * envelope * (0.42 + stableUnit(`${seed}:opacity`) * 0.3)

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left,
              top,
              width: puffWidth,
              height: puffHeight,
              borderRadius: '50%',
              background: `radial-gradient(ellipse at center, ${color} 0%, ${color} 22%, transparent 74%)`,
              filter: softness > 0 ? `blur(${softness}px)` : undefined,
              opacity,
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}
