import type { CameraKeyframe, CameraPose } from './types'

export const validateCameraPose = (
  pose: Partial<CameraPose>,
  description: string,
) => {
  for (const [property, value] of Object.entries(pose)) {
    if (!Number.isFinite(value)) {
      throw new Error(`${description} '${property}' must be a finite number.`)
    }
  }

  if (pose.zoom !== undefined && pose.zoom <= 0) {
    throw new Error('Camera zoom must be greater than zero.')
  }
}

export const validateCameraMoveTiming = (
  from: number,
  durationInFrames: number,
) => {
  if (
    !Number.isFinite(from) ||
    from < 0 ||
    !Number.isFinite(durationInFrames) ||
    durationInFrames <= 0 ||
    !Number.isFinite(from + durationInFrames)
  ) {
    throw new Error(
      'Camera moves need a non-negative start frame and a positive durationInFrames.',
    )
  }
}

export const validateCameraKeyframeValues = (
  keyframe: Pick<CameraKeyframe, 'pose' | 'rotationBy'>,
  description: string,
) => {
  validateCameraPose(keyframe.pose, description)

  if (
    keyframe.rotationBy !== undefined &&
    !Number.isFinite(keyframe.rotationBy)
  ) {
    throw new Error(`${description} rotationBy must be a finite number.`)
  }
}
