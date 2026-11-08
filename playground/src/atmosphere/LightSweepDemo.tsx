import { LightSweep, secondsToFrames } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'
import { PLAYGROUND_FPS } from '../config'

/** Shows one warm light sweep crossing the sample artwork. */
export const LightSweepDemo = () => (
  <AtmosphereDemoScene
    title="Light Sweep"
    description="A soft beam of light crosses the artwork"
  >
    <LightSweep
      color="#fff0cb"
      durationInFrames={secondsToFrames(5, PLAYGROUND_FPS)}
      opacity={0.78}
      angleDegrees={25}
    />
  </AtmosphereDemoScene>
)
