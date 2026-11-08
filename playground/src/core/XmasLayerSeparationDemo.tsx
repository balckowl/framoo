import { CanvasImage, staticFile } from 'remotion'
import {
  moveTo,
  SceneLayer,
  SceneStage,
  secondsToFrames,
  type CameraTrack,
} from '../library'
import { PLAYGROUND_FPS } from '../config'

const camera: CameraTrack = {
  moves: [
    moveTo({
      from: 0,
      durationInFrames: secondsToFrames(4.8, PLAYGROUND_FPS),
      to: { x: 0.53, y: 0.43, zoom: 1.12 },
    }),
  ],
}

export const XmasLayerSeparationDemo = () => (
  <SceneStage camera={camera}>
    <SceneLayer followsCamera depth={0.78}>
      <CanvasImage
        src={staticFile('xmas-bg.png')}
        fit="cover"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </SceneLayer>
    <SceneLayer followsCamera depth={1.12}>
      <CanvasImage
        src={staticFile('xmas-girl.png')}
        fit="cover"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </SceneLayer>
  </SceneStage>
)
