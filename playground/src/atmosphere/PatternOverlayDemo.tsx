import { PatternOverlay, type PatternKind } from '../library'
import { AtmosphereDemoScene } from './AtmosphereDemoScene'

const createPatternDemo = (kind: PatternKind, title: string) => () => (
  <AtmosphereDemoScene
    category="ATMOSPHERE / GRAPHIC"
    title={title}
    description="A light graphic texture drifts over the still image"
  >
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
    component: createPatternDemo('stripes', 'Stripes'),
  },
  { id: 'PatternDotsDemo', component: createPatternDemo('dots', 'Dots') },
  { id: 'PatternGridDemo', component: createPatternDemo('grid', 'Grid') },
  {
    id: 'PatternHalftoneDemo',
    component: createPatternDemo('halftone', 'Halftone'),
  },
  { id: 'PatternRingsDemo', component: createPatternDemo('rings', 'Rings') },
  { id: 'PatternWavesDemo', component: createPatternDemo('waves', 'Waves') },
] as const
