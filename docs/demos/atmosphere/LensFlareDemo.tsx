import { LensFlare } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

/** Shows a source-anchored flare and its optical ghosts. */
export const LensFlareDemo = () => (
  <AtmosphereDemoScene>
    <LensFlare
      source={{ x: 0.08, y: 0.08 }}
      color="#ffe8bd"
      intensity={0.7}
      anamorphic
    />
  </AtmosphereDemoScene>
)
