export const client = 'only'

import type { ComponentType } from 'react'
import { EFFECT_DEMOS } from '../demos/camera/effects'
import { MOVE_DEMOS } from '../demos/camera/moves'
import { LivePlayer } from '../src/LivePlayer'

const cameraDemos = [...MOVE_DEMOS, ...EFFECT_DEMOS]

export default function CameraPreview({ demo }: { readonly demo: string }) {
  const entry = cameraDemos.find((candidate) => candidate.id === demo)

  if (!entry) {
    return <p>Camera preview not found: {demo}</p>
  }

  return (
    <LivePlayer
      component={entry.component as ComponentType}
      durationInFrames={150}
    />
  )
}
