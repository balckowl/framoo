import { ColorWashSequence, secondsToFrames } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'
import { PLAYGROUND_FPS } from '../config'

/** Shows color treatments changing at set cue times. */
export const ColorWashSequenceDemo = () => (
  <AtmosphereDemoScene
    category="ATMOSPHERE / COLOR"
    title="Color Wash Sequence"
    description="Color treatments crossfade with the musical sections"
  >
    <ColorWashSequence
      cues={[
        {
          atFrame: secondsToFrames(0, PLAYGROUND_FPS),
          wash: 'linear-gradient(135deg, #0f2d53, #170a27)',
          opacity: 0.2,
        },
        {
          atFrame: secondsToFrames(2.4, PLAYGROUND_FPS),
          wash: 'linear-gradient(135deg, #ff705e, #2e125b)',
          opacity: 0.34,
        },
        {
          atFrame: secondsToFrames(5, PLAYGROUND_FPS),
          wash: 'linear-gradient(135deg, #11607e, #0b143a)',
          opacity: 0.3,
        },
      ]}
      transitionInFrames={secondsToFrames(1.5, PLAYGROUND_FPS)}
    />
  </AtmosphereDemoScene>
)
