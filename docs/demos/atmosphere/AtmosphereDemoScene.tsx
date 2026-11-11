import { AbsoluteFill } from 'remotion'
import type { ReactNode } from 'react'
import { SceneLayer, SceneStage } from '../library'
import { XmasArtwork } from '../shared/XmasArtwork'

export type AtmosphereDemoSceneProps = {
  readonly children: ReactNode
}

/** Shared artwork for inspecting one atmosphere effect at a time. */
export const AtmosphereDemoScene = ({ children }: AtmosphereDemoSceneProps) => (
  <SceneStage>
    <SceneLayer followsCamera>
      <XmasArtwork />
      <AbsoluteFill
        style={{
          backgroundColor: 'rgba(15, 20, 30, 0.18)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </SceneLayer>
  </SceneStage>
)
