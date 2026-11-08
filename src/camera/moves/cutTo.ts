import type { CameraMove, CameraPose } from '../types'
import { createCameraMove } from './createCameraMove'

export type CutToOptions = {
  /** Start frame within the composition. */
  readonly from: number
  /** How long to hold the new view, in frames. */
  readonly durationInFrames: number
  /** Camera pose to switch to immediately. */
  readonly to: CameraPose
}

/** Cuts instantly to a camera pose, then holds that view for the duration. */
export const cutTo = ({
  from,
  durationInFrames,
  to,
}: CutToOptions): CameraMove =>
  createCameraMove(from, durationInFrames, [
    { offsetInFrames: 0, pose: to, easing: 'cut' },
    { offsetInFrames: durationInFrames, pose: to, easing: 'linear' },
  ])
