import { ColorWash, secondsToFrames } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'
import { PLAYGROUND_FPS } from '../config'

/** Shows one two-color wash with a continuous, slow change in direction. */
export const ColorWashDemo = () => (
  <AtmosphereDemoScene>
    <ColorWash
      from="#e66d75"
      to="#4038a8"
      opacity={0.28}
      cycleDurationInFrames={secondsToFrames(8, PLAYGROUND_FPS)}
    />
  </AtmosphereDemoScene>
)
