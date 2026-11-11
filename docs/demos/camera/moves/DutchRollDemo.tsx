import { dutchRoll, secondsToFrames } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    dutchRoll({
      from: 0,
      durationInFrames: secondsToFrames(4.2, DEMO_FPS),
      peakDegrees: 6,
    }),
  ],
}

export const DutchRollDemo = () => <CameraDemoScene camera={camera} />
