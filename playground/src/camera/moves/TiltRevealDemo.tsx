import { secondsToFrames, tiltReveal } from '../../library'
import type { CameraTrack } from '../../library'
import { CameraDemoScene, DEMO_FPS } from '../CameraDemoScene'

const camera: CameraTrack = {
  moves: [
    tiltReveal({
      from: 0,
      durationInFrames: secondsToFrames(3.4, DEMO_FPS),
      focus: { x: 0.64, y: 0.4 },
      zoom: 1.32,
      tiltDegrees: -9,
    }),
  ],
}

export const TiltRevealDemo = () => (
  <CameraDemoScene
    category="MOVES"
    title="Tilt Reveal"
    description="傾いた画面から、水平に戻りながら主題を見せる"
    camera={camera}
  />
)
