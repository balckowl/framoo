import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricFade } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricFadeDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricFade
        from={15}
        durationInFrames={135}
        position={{ x: 0.5, y: 0.76 }}
        anchor="center"
        size="base"
        motion={{ durationInFrames: 24, easing: 'ease-out' }}
      >
        まだ足りない今日のままで
      </LyricFade>
    </LyricsLayout>
  </AbsoluteFill>
)
