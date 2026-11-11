import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricFragmentAssembly } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricFragmentAssemblyDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricFragmentAssembly
        from={15}
        durationInFrames={135}
        position={{ x: 0.5, y: 0.76 }}
        anchor="center"
        size="base"
        motion={{
          fragmentCount: 5,
          settleDurationInFrames: 22,
          staggerInFrames: 1,
          spreadEm: 0.4,
          seed: 11,
          easing: 'ease-out',
        }}
      >
        散らばった夢のかけらを
      </LyricFragmentAssembly>
    </LyricsLayout>
  </AbsoluteFill>
)
