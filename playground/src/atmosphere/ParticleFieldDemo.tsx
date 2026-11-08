import { ParticleField, type ParticlePreset } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

const createParticleDemo = (preset: ParticlePreset, title: string) => () => (
  <AtmosphereDemoScene
    category="ATMOSPHERE / PARTICLES"
    title={title}
    description="A deterministic particle field adds motion to the artwork"
  >
    <ParticleField preset={preset} density={0.58} sizeScale={1} depth="mixed" />
  </AtmosphereDemoScene>
)

export const PARTICLE_FIELD_DEMOS = [
  { id: 'ParticleDustDemo', component: createParticleDemo('dust', 'Dust') },
  {
    id: 'ParticlePetalsDemo',
    component: createParticleDemo('petals', 'Petals'),
  },
  {
    id: 'ParticleSparksDemo',
    component: createParticleDemo('sparks', 'Sparks'),
  },
  { id: 'ParticleSnowDemo', component: createParticleDemo('snow', 'Snow') },
  { id: 'ParticleRainDemo', component: createParticleDemo('rain', 'Rain') },
] as const
