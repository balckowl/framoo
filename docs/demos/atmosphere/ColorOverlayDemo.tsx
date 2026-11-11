import { ColorOverlay } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

/** Shows a restrained black tint over the image. */
export const ColorOverlayDemo = () => (
  <AtmosphereDemoScene>
    <ColorOverlay color="#000000" opacity={0.28} />
  </AtmosphereDemoScene>
)

/** Shows that the same overlay can use a color tint instead of black. */
export const ColorOverlayTintDemo = () => (
  <AtmosphereDemoScene>
    <ColorOverlay color="#426b9b" opacity={0.28} />
  </AtmosphereDemoScene>
)
