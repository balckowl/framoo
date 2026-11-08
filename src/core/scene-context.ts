import { createContext } from 'react'
import type { CameraState } from '../camera/types'

export type SceneStageContextValue = {
  readonly cameraPose: CameraState
  /** Remotion composition dimensions used by the camera transform. */
  readonly width: number
  readonly height: number
}

/** Shares one evaluated camera pose with all layers in the stage. */
export const SceneStageContext = createContext<SceneStageContextValue | null>(
  null,
)
