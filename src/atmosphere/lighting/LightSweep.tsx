import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { assertNonEmptyString } from '../internal/assertNonEmptyString'
import { assertRange } from '../internal/assertRange'

export type LightSweepProps = {
  /** Light color. Defaults to a warm white. */
  readonly color?: string
  /** Time for the beam to cross the composition, in frames. Defaults to 5 seconds. */
  readonly durationInFrames?: number
  /** Peak beam opacity from 0 to 1. Defaults to 0.16. */
  readonly opacity?: number
  /** Angle of the beam itself in CSS degrees. Defaults to 25. */
  readonly angleDegrees?: number
}

/** Sweeps a soft, diagonal band of light across the layer once. */
export const LightSweep = ({
  color = '#ffe5b5',
  durationInFrames,
  opacity = 0.16,
  angleDegrees = 25,
}: LightSweepProps) => {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()
  const actualDurationInFrames = durationInFrames ?? 5 * fps

  assertNonEmptyString('LightSweep color', color)
  if (!Number.isFinite(actualDurationInFrames) || actualDurationInFrames <= 0) {
    throw new Error(
      'LightSweep durationInFrames must be a positive finite number.',
    )
  }
  assertRange('LightSweep opacity', opacity, 0, 1)
  if (!Number.isFinite(angleDegrees)) {
    throw new Error('LightSweep angleDegrees must be a finite number.')
  }

  const progress = interpolate(frame, [0, actualDurationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const radians = (angleDegrees * Math.PI) / 180
  const normalX = -Math.sin(radians)
  const normalY = Math.cos(radians)
  const diagonal = Math.hypot(width, height)
  const beamLength = diagonal * 1.75
  const beamWidth = diagonal * 0.2
  const viewportHalfSpan =
    (Math.abs(normalX) * width + Math.abs(normalY) * height) / 2
  const travelDistance = viewportHalfSpan + beamWidth / 2 + diagonal * 0.04
  const offset = (progress * 2 - 1) * travelDistance
  const left = `calc(50% + ${normalX * offset}px)`
  const top = `calc(50% + ${normalY * offset}px)`

  const beamStyle: React.CSSProperties = {
    position: 'absolute',
    left,
    top,
    width: beamLength,
    marginLeft: -beamLength / 2,
    rotate: `${angleDegrees}deg`,
    background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
    pointerEvents: 'none',
  }

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
          ...beamStyle,
          height: beamWidth,
          marginTop: -beamWidth / 2,
          opacity: opacity * 0.38,
        }}
      />
      <div
        style={{
          ...beamStyle,
          height: beamWidth * 0.38,
          marginTop: -(beamWidth * 0.38) / 2,
          opacity: opacity * 0.72,
        }}
      />
    </AbsoluteFill>
  )
}
