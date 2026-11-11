import { HandheldDriftDemo } from './HandheldDriftDemo'
import { ShakeOnBeatDemo } from './ShakeOnBeatDemo'
import { WhipBlurDemo } from './WhipBlurDemo'

export const EFFECT_DEMOS = [
  { id: 'HandheldDrift', component: HandheldDriftDemo },
  { id: 'ShakeOnBeat', component: ShakeOnBeatDemo },
  { id: 'WhipBlur', component: WhipBlurDemo },
] as const
