import { secondsToFrames, tracePath } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    tracePath({
      from: 0,
      durationInFrames: secondsToFrames(4.5, DEMO_FPS),
      path: [
        { x: 0.3, y: 0.36 },
        { x: 0.7, y: 0.34 },
        { x: 0.72, y: 0.68 },
        { x: 0.35, y: 0.66 },
      ],
      zoom: 1.45,
    }),
  ],
}

export const TracePathDemo = () => (
  <CameraDemoScene
    category="MOVES"
    title="Trace Path"
    description="複数の注目点を順番になぞる"
    camera={camera}
  />
)
