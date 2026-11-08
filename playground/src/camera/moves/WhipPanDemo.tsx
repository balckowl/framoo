import { secondsToFrames, whipPan } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    whipPan({
      from: 0,
      durationInFrames: secondsToFrames(2.2, DEMO_FPS),
      to: { x: 0.76, y: 0.4 },
      overshoot: { x: 0.1, y: -0.03 },
    }),
  ],
}

export const WhipPanDemo = () => (
  <CameraDemoScene
    category="MOVES"
    title="Whip Pan"
    description="勢いよく振り、目標を越えてから止まる"
    camera={camera}
  />
)
