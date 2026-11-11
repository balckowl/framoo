import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricSlide } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricSlideDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricSlide
        from={15}
        durationInFrames={135}
        enterFrom="right"
        position={{ x: 0.5, y: 0.76 }}
        anchor="center"
        size="base"
        motion={{
          distanceEm: 1.25,
          durationInFrames: 14,
          easing: 'ease-out',
        }}
      >
        風を切って走り出した
      </LyricSlide>
    </LyricsLayout>
  </AbsoluteFill>
)
