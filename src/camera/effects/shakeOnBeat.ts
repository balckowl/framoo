import type { CameraEffect } from '../types'

const SHAKE_ANGULAR_SPEED = 85
const VERTICAL_SHAKE_RATIO = 0.58
const VERTICAL_SHAKE_FREQUENCY_RATIO = 1.13
const ROTATION_SHAKE_FREQUENCY_RATIO = 0.78

const DEFAULT_DECAY_SECONDS = 0.22

export type ShakeOnBeatOptions = {
  /** Beat frames from the start of the composition. */
  readonly beatsInFrames: readonly number[]
  /** Translation intensity per beat, in pixels. Defaults to 8. */
  readonly intensity?: number
  /** Rotation amplitude per beat, in degrees. Defaults to 0.45. */
  readonly rotation?: number
  /** Frames for each shake to decay. Defaults to about 0.22 seconds. */
  readonly decayInFrames?: number
}

/** Adds a short, deterministic shake after each listed beat. */
export const shakeOnBeat = ({
  beatsInFrames,
  intensity = 8,
  rotation = 0.45,
  decayInFrames,
}: ShakeOnBeatOptions): CameraEffect => {
  if (
    decayInFrames !== undefined &&
    (!Number.isFinite(decayInFrames) || decayInFrames <= 0)
  ) {
    throw new Error("Shake 'decayInFrames' must be greater than zero.")
  }

  if (!Number.isFinite(intensity) || intensity < 0) {
    throw new Error("Shake 'intensity' must be a finite non-negative number.")
  }

  if (!Number.isFinite(rotation)) {
    throw new Error("Shake 'rotation' must be a finite number.")
  }

  if (beatsInFrames.some((beat) => !Number.isFinite(beat) || beat < 0)) {
    throw new Error('Shake beat frames must be finite non-negative numbers.')
  }

  const orderedBeats = [...beatsInFrames].sort((left, right) => left - right)

  return {
    sample(frame, fps) {
      if (!Number.isFinite(frame) || !Number.isFinite(fps) || fps <= 0)
        return {}

      const decay = decayInFrames ?? DEFAULT_DECAY_SECONDS * fps

      const firstActiveBeat = findFirstBeatAtOrAfter(
        orderedBeats,
        frame - decay,
      )
      let translateX = 0
      let translateY = 0
      let shakeRotation = 0

      for (let index = firstActiveBeat; index < orderedBeats.length; index++) {
        const beat = orderedBeats[index]
        if (beat > frame) break

        const age = frame - beat
        if (age >= decay) continue

        const strength = 1 - age / decay
        const phase = (age / fps) * SHAKE_ANGULAR_SPEED
        translateX += Math.sin(phase) * intensity * strength
        translateY +=
          Math.cos(phase * VERTICAL_SHAKE_FREQUENCY_RATIO) *
          intensity *
          VERTICAL_SHAKE_RATIO *
          strength
        shakeRotation +=
          Math.sin(phase * ROTATION_SHAKE_FREQUENCY_RATIO) * rotation * strength
      }

      return {
        translateX,
        translateY,
        rotation: shakeRotation,
      }
    },
  }
}

const findFirstBeatAtOrAfter = (beats: readonly number[], time: number) => {
  let start = 0
  let end = beats.length

  while (start < end) {
    const middle = Math.floor((start + end) / 2)
    if (beats[middle] < time) {
      start = middle + 1
    } else {
      end = middle
    }
  }

  return start
}
