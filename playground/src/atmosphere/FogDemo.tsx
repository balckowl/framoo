import { Fog } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

/** Shows broad, slow-moving layers of mist across the artwork. */
export const FogDemo = () => (
  <AtmosphereDemoScene
    category="ATMOSPHERE / AIR"
    title="Fog"
    description="Soft layers of mist drift across the scene"
  >
    <Fog color="#f3f4f2" density={0.88} speed={0.07} softness={14} />
  </AtmosphereDemoScene>
)
