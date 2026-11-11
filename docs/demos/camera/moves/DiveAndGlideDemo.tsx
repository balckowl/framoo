import { diveAndGlide, secondsToFrames } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    diveAndGlide({
      from: 0,
      durationInFrames: secondsToFrames(4.5, DEMO_FPS),
      path: [
        { x: 0.68, y: 0.34 },
        { x: 0.7, y: 0.65 },
        { x: 0.34, y: 0.66 },
        { x: 0.3, y: 0.36 },
      ],
      zoom: 1.65,
    }),
  ],
}

export const DiveAndGlideDemo = () => <CameraDemoScene camera={camera} />
