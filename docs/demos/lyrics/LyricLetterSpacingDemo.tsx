import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricLetterSpacing } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricLetterSpacingDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricLetterSpacing
        name="LyricLetterSpacing · expand"
        from={15}
        durationInFrames={135}
        position={{ x: 0.5, y: 0.38 }}
        anchor="center"
        size="base"
        direction="expand"
        motion={{
          extraSpacingEm: 0.22,
          durationInFrames: 24,
          easing: 'ease-out',
        }}
      >
        昨日より少し遠くへ
      </LyricLetterSpacing>
      <LyricLetterSpacing
        name="LyricLetterSpacing · contract"
        from={15}
        durationInFrames={135}
        position={{ x: 0.5, y: 0.72 }}
        anchor="center"
        size="base"
        direction="contract"
        motion={{
          extraSpacingEm: 0.22,
          durationInFrames: 24,
          easing: 'ease-out',
        }}
      >
        昨日より少し遠くへ
      </LyricLetterSpacing>
    </LyricsLayout>
  </AbsoluteFill>
)
