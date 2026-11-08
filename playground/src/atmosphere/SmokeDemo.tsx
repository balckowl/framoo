import { Smoke } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

/** Shows a rising, continuously replenished plume. */
export const SmokeDemo = () => (
  <AtmosphereDemoScene
    category="ATMOSPHERE / AIR"
    title="Smoke"
    description="A soft plume rises and disperses over the artwork"
  >
    <Smoke
      source={{ x: 0.2, y: 1 }}
      color="#f1f0ed"
      intensity={0.84}
      puffCount={13}
      spread={0.18}
      rise={0.68}
      speed={1.1}
      softness={30}
    />
  </AtmosphereDemoScene>
)
