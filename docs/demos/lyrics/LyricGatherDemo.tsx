import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricGather } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricGatherDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricGather
        from={15}
        durationInFrames={135}
        motion={{
          settleDurationInFrames: 22,
          staggerInFrames: 2,
          spreadEm: 1.8,
          rotationDegrees: 12,
          seed: 4,
          easing: 'ease-out',
        }}
        position={{
          x: 0.5,
          y: 0.745,
        }}
      >
        散らばった夢のかけらを
      </LyricGather>
    </LyricsLayout>
  </AbsoluteFill>
)
