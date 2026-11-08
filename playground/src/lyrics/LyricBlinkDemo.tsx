import { AbsoluteFill } from 'remotion'
import { LyricsLayout, LyricBlink } from '../library'
import { XmasCanvasArtwork } from '../shared/XmasArtwork'

export const LyricBlinkDemo = () => (
  <AbsoluteFill style={{ backgroundColor: '#17191f' }}>
    <XmasCanvasArtwork />
    <LyricsLayout>
      <LyricBlink
        from={15}
        durationInFrames={135}
        position={{ x: 0.5, y: 0.76 }}
        anchor="center"
        size="base"
        blinkCount={2}
        motion={{
          visibleDurationInFrames: 4,
          hiddenDurationInFrames: 2,
        }}
      >
        この瞬間もひとつのピース
      </LyricBlink>
    </LyricsLayout>
  </AbsoluteFill>
)
