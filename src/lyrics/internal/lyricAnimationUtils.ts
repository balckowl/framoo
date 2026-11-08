import { Easing, interpolate } from 'remotion'

export type LyricAnimationEasing =
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'

const EASINGS = {
  linear: Easing.linear,
  'ease-in': Easing.in(Easing.cubic),
  'ease-out': Easing.out(Easing.cubic),
  'ease-in-out': Easing.inOut(Easing.cubic),
} satisfies Record<LyricAnimationEasing, (progress: number) => number>

export const getLyricAnimationProgress = (
  frame: number,
  durationInFrames: number,
  easing: LyricAnimationEasing,
) =>
  interpolate(frame, [0, Math.max(1, durationInFrames)], [0, 1], {
    easing: EASINGS[easing],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

export const getLyricScaleProgress = (
  frame: number,
  durationInFrames: number,
  easing: LyricAnimationEasing,
) =>
  interpolate(frame, [0, Math.max(1, durationInFrames)], [0, 1], {
    easing: EASINGS[easing],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    output: 'perceptual-scale',
  })

/** Frame for a staggered item, such as one character in a lyric. */
export const getStaggeredFrame = (
  frame: number,
  delayInFrames: number,
  itemIndex: number,
  staggerInFrames: number,
) => frame - delayInFrames - itemIndex * staggerInFrames

export const isLyricWhitespace = (grapheme: string) => /^\s+$/u.test(grapheme)

/** Character index for each grapheme; whitespace entries do not animate. */
export const getLyricCharacterIndices = (graphemes: readonly string[]) => {
  let characterIndex = 0

  return graphemes.map((grapheme) => {
    if (isLyricWhitespace(grapheme)) return null

    const index = characterIndex
    characterIndex += 1
    return index
  })
}

export const hasLyricCharacters = (graphemes: readonly string[]) =>
  graphemes.some((grapheme) => !isLyricWhitespace(grapheme))

export const assertFinitePositive = (value: number, label: string) => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${label} must be greater than 0.`)
  }
}

export const assertFiniteNonNegative = (value: number, label: string) => {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be non-negative.`)
  }
}

export const assertPositiveInteger = (value: number, label: string) => {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error(`${label} must be a positive integer.`)
  }
}

export const assertNonNegativeInteger = (value: number, label: string) => {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer.`)
  }
}

export const assertIntegerInRange = (
  value: number,
  minimum: number,
  maximum: number,
  label: string,
) => {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(
      `${label} must be an integer from ${minimum} to ${maximum}.`,
    )
  }
}

export const splitLyricGraphemes = (text: string) => {
  if (typeof Intl.Segmenter !== 'undefined') {
    return Array.from(
      new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text),
      ({ segment }) => segment,
    )
  }

  return Array.from(text)
}

/** Stable pseudo-random value in [-1, 1], derived from an item and channel. */
export const getLyricScatterValue = (
  index: number,
  seed: number,
  channel: number,
) => {
  let value =
    (seed ^
      Math.imul(index + 1, 0x9e3779b1) ^
      Math.imul(channel + 1, 0x85ebca77)) >>>
    0
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d)
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b)
  value ^= value >>> 16
  return ((value >>> 0) / 0x100000000) * 2 - 1
}
