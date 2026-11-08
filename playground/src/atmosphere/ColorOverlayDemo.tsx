import { ColorOverlay } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

/** Shows a restrained black tint over the image. */
export const ColorOverlayDemo = () => (
  <AtmosphereDemoScene
    category="ATMOSPHERE / COLOR"
    title="Color Overlay"
    description="A translucent solid color tones down the image"
  >
    <ColorOverlay color="#000000" opacity={0.28} />
  </AtmosphereDemoScene>
)

/** Shows that the same overlay can use a color tint instead of black. */
export const ColorOverlayTintDemo = () => (
  <AtmosphereDemoScene
    category="ATMOSPHERE / COLOR"
    title="Color Overlay / Tint"
    description="The same solid layer can shift the scene's color"
  >
    <ColorOverlay color="#426b9b" opacity={0.28} />
  </AtmosphereDemoScene>
)
