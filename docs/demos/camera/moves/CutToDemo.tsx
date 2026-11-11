import { secondsToFrameRange, cutTo } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    cutTo({
      ...secondsToFrameRange(1.5, 4, DEMO_FPS),
      to: { x: 0.7, y: 0.36, zoom: 1.55, rotation: 5 },
    }),
  ],
}

export const CutToDemo = () => <CameraDemoScene camera={camera} />
