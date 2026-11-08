import { dutchRoll, secondsToFrames } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    dutchRoll({
      from: 0,
      durationInFrames: secondsToFrames(4.2, DEMO_FPS),
      peakDegrees: 10,
    }),
  ],
}

export const DutchRollDemo = () => (
  <CameraDemoScene
    category="MOVES"
    title="Dutch Roll"
    description="左右に傾け、揺り戻しながら水平へ戻る"
    camera={camera}
  />
)
