import { secondsToFrames, whipBlur } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  effects: [
    whipBlur({
      atFrame: secondsToFrames(1.3, DEMO_FPS),
      durationInFrames: secondsToFrames(0.8, DEMO_FPS),
      amount: 18,
    }),
  ],
}

export const WhipBlurDemo = () => (
  <CameraDemoScene
    category="EFFECTS"
    title="Whip Blur"
    description="短いブラーで、素早いカメラ移動の勢いを加える"
    camera={camera}
  />
)
