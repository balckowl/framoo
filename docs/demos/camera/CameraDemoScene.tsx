import { SceneLayer, SceneStage } from '../library'
import type { CameraTrack } from '../library'
import { PLAYGROUND_FPS } from '../config'
import { XmasArtwork } from '../shared/XmasArtwork'

export const DEMO_FPS = PLAYGROUND_FPS

export type CameraDemoSceneProps = {
  readonly camera: CameraTrack
}

export const CameraDemoScene = ({ camera }: CameraDemoSceneProps) => (
  <SceneStage camera={camera}>
    <SceneLayer followsCamera>
      <XmasArtwork overscanPercent={10} />
    </SceneLayer>
  </SceneStage>
)
