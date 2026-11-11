import { GodRays } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

/** Shows a fan of soft beams spreading from the upper-left light source. */
export const GodRaysDemo = () => (
  <AtmosphereDemoScene>
    <GodRays
      source={{ x: 0.08, y: 0.08 }}
      angleDegrees={34}
      spreadDegrees={46}
      rayCount={13}
      intensity={0.48}
      color="#fff0c8"
      length={1.45}
      softness={9}
    />
  </AtmosphereDemoScene>
)
