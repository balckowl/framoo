import { AbsoluteFill, useVideoConfig } from 'remotion'
import type { ReactNode } from 'react'
import { useCameraPose } from '../camera/useCameraPose'
import type { CameraMove, CameraTrack } from '../camera/types'
import { SceneStageContext } from './scene-context'

/** A full camera track or a shorthand list of camera moves. */
export type SceneCamera = readonly CameraMove[] | CameraTrack

export type SceneStageProps = {
  /** Camera motion applied to every layer with `followsCamera` enabled. */
  readonly camera?: SceneCamera
  readonly children: ReactNode
}

const isMoveList = (camera: SceneCamera): camera is readonly CameraMove[] =>
  Array.isArray(camera)

const toCameraTrack = (camera?: SceneCamera): CameraTrack => {
  if (camera == null) return {}
  return isMoveList(camera) ? { moves: camera } : camera
}

export const SceneStage = ({ camera, children }: SceneStageProps) => {
  const { width, height } = useVideoConfig()
  const cameraPose = useCameraPose(toCameraTrack(camera))

  // The stage clips transformed world layers to the composition frame.
  return (
    <AbsoluteFill style={{ overflow: 'hidden', isolation: 'isolate' }}>
      <SceneStageContext.Provider value={{ cameraPose, width, height }}>
        {children}
      </SceneStageContext.Provider>
    </AbsoluteFill>
  )
}
