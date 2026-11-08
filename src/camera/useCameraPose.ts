import { useMemo } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import {
  compileCameraTrack,
  evaluateCompiledCameraPose,
} from './evaluateCamera'
import type { CameraTrack } from './types'

export const useCameraPose = ({
  initial,
  moves,
  effects,
}: CameraTrack = {}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const track = useMemo(
    () => compileCameraTrack(initial, moves),
    [initial, moves],
  )
  return evaluateCompiledCameraPose(frame, fps, track, effects)
}
