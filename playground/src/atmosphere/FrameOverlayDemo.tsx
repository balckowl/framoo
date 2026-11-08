import { FrameOverlay } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

/** Shows a simple static border inset from the edge of the image. */
export const FrameOverlayDemo = () => (
  <AtmosphereDemoScene
    category="ATMOSPHERE / FRAME"
    title="Frame Overlay"
    description="A clean white border sits inside the composition edges"
  >
    <FrameOverlay inset={56} thickness={3} opacity={0.9} />
  </AtmosphereDemoScene>
)
