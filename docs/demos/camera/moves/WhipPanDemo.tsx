import { moveTo, secondsToFrames, whipPan } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const setupDurationInFrames = secondsToFrames(0.35, DEMO_FPS)

const camera: CameraTrack = {
  moves: [
    moveTo({
      from: 0,
      durationInFrames: setupDurationInFrames,
      to: { x: 0.42, y: 0.5 },
    }),
    whipPan({
      from: setupDurationInFrames,
      durationInFrames: secondsToFrames(1.85, DEMO_FPS),
      to: { x: 0.58, y: 0.5 },
      overshoot: { x: 0.01, y: 0 },
    }),
  ],
}

export const WhipPanDemo = () => <CameraDemoScene camera={camera} />
