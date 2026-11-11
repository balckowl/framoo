export const client = 'only'

import { useState } from 'react'
import type { ComponentType } from 'react'
import {
  ColorOverlayDemo,
  ColorOverlayTintDemo,
} from '../demos/atmosphere/ColorOverlayDemo'
import { ColorPulseDemo } from '../demos/atmosphere/ColorPulseDemo'
import { ColorWashDemo } from '../demos/atmosphere/ColorWashDemo'
import { ColorWashSequenceDemo } from '../demos/atmosphere/ColorWashSequenceDemo'
import { FogDemo } from '../demos/atmosphere/FogDemo'
import { FrameOverlayDemo } from '../demos/atmosphere/FrameOverlayDemo'
import { GodRaysDemo } from '../demos/atmosphere/GodRaysDemo'
import { LensFlareDemo } from '../demos/atmosphere/LensFlareDemo'
import { LightSweepDemo } from '../demos/atmosphere/LightSweepDemo'
import { SmokeDemo } from '../demos/atmosphere/SmokeDemo'
import { PARTICLE_FIELD_DEMOS } from '../demos/atmosphere/ParticleFieldDemo'
import { PATTERN_OVERLAY_DEMOS } from '../demos/atmosphere/PatternOverlayDemo'
import { LivePlayer } from '../src/LivePlayer'

const demos: Record<string, ComponentType> = {
  ColorOverlayDemo,
  ColorOverlayTintDemo,
  ColorPulseDemo,
  ColorWashDemo,
  ColorWashSequenceDemo,
  FogDemo,
  FrameOverlayDemo,
  GodRaysDemo,
  LensFlareDemo,
  LightSweepDemo,
  SmokeDemo,
  ...Object.fromEntries(
    PARTICLE_FIELD_DEMOS.map(({ id, component }) => [id, component]),
  ),
  ...Object.fromEntries(
    PATTERN_OVERLAY_DEMOS.map(({ id, component }) => [id, component]),
  ),
}

const collections = {
  patterns: [
    { id: 'PatternStripesDemo', label: '縞模様' },
    { id: 'PatternDotsDemo', label: 'ドット' },
    { id: 'PatternGridDemo', label: '格子' },
    { id: 'PatternHalftoneDemo', label: '網点' },
    { id: 'PatternRingsDemo', label: '同心円' },
    { id: 'PatternWavesDemo', label: '波線' },
  ],
  particles: [
    { id: 'ParticleDustDemo', label: '埃' },
    { id: 'ParticlePetalsDemo', label: '花びら' },
    { id: 'ParticleSparksDemo', label: '火花' },
    { id: 'ParticleSnowDemo', label: '雪' },
    { id: 'ParticleRainDemo', label: '雨' },
  ],
} as const

type AtmospherePreviewProps = {
  readonly demo?: string
  readonly collection?: keyof typeof collections
}

export default function AtmospherePreview({
  demo,
  collection,
}: AtmospherePreviewProps) {
  const options = collection ? collections[collection] : undefined
  const [selectedDemo, setSelectedDemo] = useState(
    demo ?? options?.[0].id ?? '',
  )
  const activeDemo = collection ? selectedDemo : (demo ?? '')
  const component = demos[activeDemo]

  if (!component) {
    return <p>Atmosphere preview not found: {activeDemo}</p>
  }

  return (
    <div>
      {options ? (
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <span>種類</span>
          <select
            aria-label="演出の種類"
            value={selectedDemo}
            onChange={(event) => setSelectedDemo(event.currentTarget.value)}
            style={{ padding: '6px 10px', font: 'inherit' }}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <LivePlayer component={component} durationInFrames={180} />
    </div>
  )
}
