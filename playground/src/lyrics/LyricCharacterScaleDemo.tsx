import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricCharacterScale } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricCharacterScaleDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricCharacterScale
        from={15}
        durationInFrames={135}
        position={{ x: 0.5, y: 0.76 }}
        anchor="center"
        size="base"
        motion={{
          scaleDurationInFrames: 10,
          staggerInFrames: 2,
          easing: 'ease-out',
        }}
      >
        この瞬間もひとつのピース
      </LyricCharacterScale>
    </LyricsLayout>
  </AbsoluteFill>
)
