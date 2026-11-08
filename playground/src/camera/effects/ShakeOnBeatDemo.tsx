import { shakeOnBeat, secondsToFrames } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  effects: [
    shakeOnBeat({
      beatsInFrames: [0.7, 1.5, 2.3, 3.1, 3.9].map((seconds) =>
        secondsToFrames(seconds, DEMO_FPS),
      ),
      intensity: 16,
      rotation: 0.85,
      decayInFrames: secondsToFrames(0.28, DEMO_FPS),
    }),
  ],
}

export const ShakeOnBeatDemo = () => (
  <CameraDemoScene
    category="EFFECTS"
    title="Shake On Beat"
    description="指定した拍に合わせて、短いカメラの揺れを加える"
    camera={camera}
  />
)
