import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricCharacterReveal } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricCharacterRevealDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricCharacterReveal
        from={15}
        durationInFrames={135}
        position={{ x: 0.5, y: 0.76 }}
        anchor="center"
        size="base"
        motion={{
          fadeDurationInFrames: 8,
          staggerInFrames: 2,
          easing: 'ease-out',
        }}
      >
        まだ足りない今日のままで
      </LyricCharacterReveal>
    </LyricsLayout>
  </AbsoluteFill>
)
