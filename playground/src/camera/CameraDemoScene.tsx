import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { SceneLayer, SceneStage } from '../library'
import type { CameraTrack } from '../library'
import { PLAYGROUND_FPS } from '../config'
import { XmasArtwork } from '../shared/XmasArtwork'

export const DEMO_FPS = PLAYGROUND_FPS
export const DEMO_DURATION_IN_FRAMES = DEMO_FPS * 5

export type CameraDemoSceneProps = {
  readonly category: 'MOVES' | 'EFFECTS'
  readonly title: string
  readonly description: string
  readonly camera: CameraTrack
}

export const CameraDemoScene = ({
  category,
  title,
  description,
  camera,
}: CameraDemoSceneProps) => {
  const frame = useCurrentFrame()
  const progress = Math.min(1, frame / (DEMO_DURATION_IN_FRAMES - 1))

  return (
    <SceneStage camera={camera}>
      <SceneLayer followsCamera>
        <XmasArtwork overscanPercent={10} />
      </SceneLayer>
      <SceneLayer followsCamera={false}>
        <AbsoluteFill
          style={{
            justifyContent: 'space-between',
            padding: '64px 76px',
            boxSizing: 'border-box',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.46), transparent 32%, transparent 58%, rgba(0,0,0,0.62))',
            pointerEvents: 'none',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.82,
              }}
            >
              CAMERA / {category}
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 62,
                fontWeight: 700,
                letterSpacing: '-0.035em',
                textShadow: '0 2px 20px rgba(0,0,0,0.35)',
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 27,
                letterSpacing: '0.015em',
                textShadow: '0 2px 14px rgba(0,0,0,0.55)',
              }}
            >
              {description}
            </div>
          </div>
          <div
            style={{
              width: 360,
              height: 3,
              backgroundColor: 'rgba(255,255,255,0.32)',
              alignSelf: 'flex-end',
            }}
          >
            <div
              style={{
                width: (progress * 100).toFixed(2) + '%',
                height: '100%',
                backgroundColor: 'white',
              }}
            />
          </div>
        </AbsoluteFill>
      </SceneLayer>
    </SceneStage>
  )
}
