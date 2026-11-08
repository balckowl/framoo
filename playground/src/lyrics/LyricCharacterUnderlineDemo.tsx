import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricCharacterUnderline } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricCharacterUnderlineDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricCharacterUnderline
        from={15}
        durationInFrames={135}
        position={{ x: 0.5, y: 0.76 }}
        anchor="center"
        size="base"
        motion={{
          durationInFrames: 8,
          staggerInFrames: 2,
          easing: 'ease-out',
        }}
      >
        ひとつずつ拾い集めた
      </LyricCharacterUnderline>
    </LyricsLayout>
  </AbsoluteFill>
)
