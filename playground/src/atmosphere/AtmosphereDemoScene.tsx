import { AbsoluteFill } from 'remotion'
import type { ReactNode } from 'react'
import { SceneLayer, SceneStage } from '../library'
import { XmasArtwork } from '../shared/XmasArtwork'

export type AtmosphereDemoSceneProps = {
  readonly category?: string
  readonly title: string
  readonly description: string
  readonly children: ReactNode
}

/** Shared artwork and fixed label used to inspect one atmosphere effect at a time. */
export const AtmosphereDemoScene = ({
  category = 'ATMOSPHERE / LIGHT',
  title,
  description,
  children,
}: AtmosphereDemoSceneProps) => (
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
    <SceneLayer followsCamera={false}>
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          boxSizing: 'border-box',
          padding: '64px 76px',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          background:
            'linear-gradient(180deg, transparent 54%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            opacity: 0.82,
          }}
        >
          {category}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: '-0.035em',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 27,
            textShadow: '0 2px 14px rgba(0,0,0,0.55)',
          }}
        >
          {description}
        </div>
      </AbsoluteFill>
    </SceneLayer>
  </SceneStage>
)
