import { ParticleField, type ParticlePreset } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

const createParticleDemo = (preset: ParticlePreset) => () => (
  <AtmosphereDemoScene>
    <ParticleField preset={preset} density={0.58} sizeScale={1} depth="mixed" />
  </AtmosphereDemoScene>
)

export const PARTICLE_FIELD_DEMOS = [
  { id: 'ParticleDustDemo', component: createParticleDemo('dust') },
  {
    id: 'ParticlePetalsDemo',
    component: createParticleDemo('petals'),
  },
  {
    id: 'ParticleSparksDemo',
    component: createParticleDemo('sparks'),
  },
  { id: 'ParticleSnowDemo', component: createParticleDemo('snow') },
  { id: 'ParticleRainDemo', component: createParticleDemo('rain') },
] as const
