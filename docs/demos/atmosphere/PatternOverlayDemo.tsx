import { PatternOverlay, type PatternKind } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

const createPatternDemo = (kind: PatternKind) => () => (
  <AtmosphereDemoScene>
    <PatternOverlay
      kind={kind}
      color="rgba(255, 255, 255, 0.28)"
      size={58}
      opacity={0.68}
      speed={16}
    />
  </AtmosphereDemoScene>
)

export const PATTERN_OVERLAY_DEMOS = [
  {
    id: 'PatternStripesDemo',
    component: createPatternDemo('stripes'),
  },
  { id: 'PatternDotsDemo', component: createPatternDemo('dots') },
  { id: 'PatternGridDemo', component: createPatternDemo('grid') },
  {
    id: 'PatternHalftoneDemo',
    component: createPatternDemo('halftone'),
  },
  { id: 'PatternRingsDemo', component: createPatternDemo('rings') },
  { id: 'PatternWavesDemo', component: createPatternDemo('waves') },
] as const
