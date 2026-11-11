import { secondsToFrames, stutter } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    stutter({
      from: 0,
      holdDurationInFrames: secondsToFrames(0.5, DEMO_FPS),
      repeats: 2,
      poses: [
        { x: 0.5, y: 0.5, zoom: 1.05, rotation: 0 },
        { x: 0.68, y: 0.34, zoom: 1.55, rotation: -2 },
        { x: 0.32, y: 0.65, zoom: 1.55, rotation: 2 },
        { x: 0.5, y: 0.5, zoom: 1.05, rotation: 0 },
      ],
    }),
  ],
}

export const StutterDemo = () => <CameraDemoScene camera={camera} />
