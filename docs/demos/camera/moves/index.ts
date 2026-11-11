import { CutToDemo } from './CutToDemo'
import { DiveAndGlideDemo } from './DiveAndGlideDemo'
import { DutchRollDemo } from './DutchRollDemo'
import { MoveToDemo } from './MoveToDemo'
import { SnapZoomDemo } from './SnapZoomDemo'
import { StutterDemo } from './StutterDemo'
import { TiltRevealDemo } from './TiltRevealDemo'
import { TracePathDemo } from './TracePathDemo'
import { WhipPanDemo } from './WhipPanDemo'

export const MOVE_DEMOS = [
  { id: 'MoveTo', component: MoveToDemo },
  { id: 'SnapZoom', component: SnapZoomDemo },
  { id: 'WhipPan', component: WhipPanDemo },
  { id: 'TracePath', component: TracePathDemo },
  { id: 'DiveAndGlide', component: DiveAndGlideDemo },
  { id: 'TiltReveal', component: TiltRevealDemo },
  { id: 'DutchRoll', component: DutchRollDemo },
  { id: 'CutTo', component: CutToDemo },
  { id: 'Stutter', component: StutterDemo },
] as const
