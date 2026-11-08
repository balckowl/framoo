import { moveTo, secondsToFrames } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    moveTo({
      from: 0,
      durationInFrames: secondsToFrames(4.4, DEMO_FPS),
      to: { x: 0.68, y: 0.38, zoom: 1.28, rotation: -2 },
    }),
  ],
}

export const MoveToDemo = () => (
  <CameraDemoScene
    category="MOVES"
    title="Move To"
    description="指定した構図へ、カメラをなめらかに移動"
    camera={camera}
  />
)
