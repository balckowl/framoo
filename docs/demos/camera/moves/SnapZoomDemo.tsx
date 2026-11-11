import { secondsToFrames, snapZoom } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    snapZoom({
      from: 0,
      durationInFrames: secondsToFrames(2.5, DEMO_FPS),
      focus: { x: 0.68, y: 0.34 },
      zoom: 2.1,
      holdBeforeInFrames: secondsToFrames(0.35, DEMO_FPS),
    }),
  ],
}

export const SnapZoomDemo = () => <CameraDemoScene camera={camera} />
