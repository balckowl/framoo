import { ColorPulse, secondsToFrames } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'
import { PLAYGROUND_FPS } from '../config'

/** Shows brief warm flashes aligned with recurring cue times. */
export const ColorPulseDemo = () => (
  <AtmosphereDemoScene
    title="Color Pulse"
    description="A warm flash lands on each musical cue"
  >
    <ColorPulse
      cueFrames={[0, 1.6, 3.2, 4.8].map((seconds) =>
        secondsToFrames(seconds, PLAYGROUND_FPS),
      )}
      color="#ff9d36"
      intensity={0.2}
      decayInFrames={secondsToFrames(0.36, PLAYGROUND_FPS)}
    />
  </AtmosphereDemoScene>
)
