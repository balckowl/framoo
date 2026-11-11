import { handheldDrift, secondsToFrames } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  effects: [
    handheldDrift({
      from: 0,
      durationInFrames: secondsToFrames(4.85, DEMO_FPS),
      intensity: 7,
      rotation: 0.55,
      frequencyHz: 1.15,
    }),
  ],
}

export const HandheldDriftDemo = () => <CameraDemoScene camera={camera} />
