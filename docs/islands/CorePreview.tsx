export const client = 'only'

import { LivePlayer } from '../src/LivePlayer'
import { XmasLayerSeparationDemo } from '../demos/core/XmasLayerSeparationDemo'

export default function CorePreview() {
  return (
    <LivePlayer component={XmasLayerSeparationDemo} durationInFrames={150} />
  )
}
