export const client = 'only'

import type { ComponentType } from 'react'
import { LivePlayer } from '../src/LivePlayer'
import { LyricBlinkDemo } from '../demos/lyrics/LyricBlinkDemo'
import { LyricCharacterRevealDemo } from '../demos/lyrics/LyricCharacterRevealDemo'
import { LyricCharacterScaleDemo } from '../demos/lyrics/LyricCharacterScaleDemo'
import { LyricCharacterUnderlineDemo } from '../demos/lyrics/LyricCharacterUnderlineDemo'
import { LyricFadeDemo } from '../demos/lyrics/LyricFadeDemo'
import { LyricFragmentAssemblyDemo } from '../demos/lyrics/LyricFragmentAssemblyDemo'
import { LyricGatherDemo } from '../demos/lyrics/LyricGatherDemo'
import { LyricLetterSpacingDemo } from '../demos/lyrics/LyricLetterSpacingDemo'
import { LyricSlideDemo } from '../demos/lyrics/LyricSlideDemo'

const demos: Record<string, ComponentType> = {
  LyricBlink: LyricBlinkDemo,
  LyricCharacterReveal: LyricCharacterRevealDemo,
  LyricCharacterScale: LyricCharacterScaleDemo,
  LyricCharacterUnderline: LyricCharacterUnderlineDemo,
  LyricFade: LyricFadeDemo,
  LyricFragmentAssembly: LyricFragmentAssemblyDemo,
  LyricGather: LyricGatherDemo,
  LyricLetterSpacing: LyricLetterSpacingDemo,
  LyricSlide: LyricSlideDemo,
}

export default function LyricsPreview({ demo }: { readonly demo: string }) {
  const component = demos[demo]

  if (!component) {
    return <p>Lyrics preview not found: {demo}</p>
  }

  return <LivePlayer component={component} durationInFrames={180} />
}
