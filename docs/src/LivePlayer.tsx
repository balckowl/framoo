import { Player } from '@remotion/player'
import type { ComponentType } from 'react'

type LivePlayerProps = {
  readonly component: ComponentType
  readonly durationInFrames: number
}

export const LivePlayer = ({
  component,
  durationInFrames,
}: LivePlayerProps) => (
  <figure style={{ margin: 0 }}>
    <div
      style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        borderRadius: 12,
        background: '#0b0b10',
      }}
    >
      <Player
        component={component}
        durationInFrames={durationInFrames}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        controls
        loop
        showVolumeControls={false}
        style={{
          display: 'block',
          width: '100%',
          aspectRatio: '16 / 9',
        }}
      />
    </div>
  </figure>
)
