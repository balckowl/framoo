import { AbsoluteFill } from 'remotion'
import { useContext, type CSSProperties, type ReactNode } from 'react'
import type { CameraState } from '../camera/types'
import { SceneStageContext } from './scene-context'

export type SceneLayerProps = {
  /**
   * Whether this layer moves with the stage camera. `false` pins it to the video frame.
   */
  readonly followsCamera: boolean
  /**
   * Scales how strongly this layer follows the camera. Defaults to `1`.
   * Use values below `1` for distant layers and above `1` for foreground layers.
   * This has no effect when `followsCamera` is `false`.
   */
  readonly depth?: number
  readonly children: ReactNode
}

const cameraTransform = (
  pose: CameraState,
  width: number,
  height: number,
  depth: number,
): CSSProperties => {
  const zoom = 1 + (pose.zoom - 1) * depth
  const rotation = pose.rotation * depth
  const radians = (rotation * Math.PI) / 180
  // Move the chosen focal point to the frame center after rotation and zoom.
  const focusOffsetX = (pose.x - 0.5) * width * depth
  const focusOffsetY = (pose.y - 0.5) * height * depth
  const rotatedFocusOffsetX =
    Math.cos(radians) * focusOffsetX - Math.sin(radians) * focusOffsetY
  const rotatedFocusOffsetY =
    Math.sin(radians) * focusOffsetX + Math.cos(radians) * focusOffsetY
  const translateX = -zoom * rotatedFocusOffsetX + pose.translateX * depth
  const translateY = -zoom * rotatedFocusOffsetY + pose.translateY * depth

  return {
    transformOrigin: 'center center',
    transform: [
      `translate(${translateX}px, ${translateY}px)`,
      `scale(${zoom})`,
      `rotate(${rotation}deg)`,
    ].join(' '),
    filter: pose.blur > 0 ? `blur(${pose.blur * depth}px)` : undefined,
  }
}

export const SceneLayer = ({
  followsCamera,
  depth = 1,
  children,
}: SceneLayerProps) => {
  const stage = useContext(SceneStageContext)

  if (stage === null) {
    throw new Error('SceneLayer must be rendered inside a SceneStage.')
  }
  if (!Number.isFinite(depth) || depth < 0) {
    throw new Error('SceneLayer depth must be a finite, non-negative number.')
  }

  const layerStyle: CSSProperties = {
    // Each layer gets its own stacking context; later layers render above earlier ones.
    zIndex: 0,
    ...(followsCamera
      ? cameraTransform(stage.cameraPose, stage.width, stage.height, depth)
      : {}),
  }

  return <AbsoluteFill style={layerStyle}>{children}</AbsoluteFill>
}
