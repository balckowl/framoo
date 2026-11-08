import { useCurrentFrame } from 'remotion'
import type { LyricPatternProps } from '../internal/LyricPatternProps'
import { LyricPatternLayout } from '../internal/LyricPatternLayout'
import { withLyricStudioPosition } from '../internal/lyricStudioEditing'
import {
  assertFiniteNonNegative,
  assertFinitePositive,
  assertIntegerInRange,
  getLyricCharacterIndices,
  getLyricAnimationProgress,
  getLyricScatterValue,
  getStaggeredFrame,
  hasLyricCharacters,
  splitLyricGraphemes,
  type LyricAnimationEasing,
} from '../internal/lyricAnimationUtils'

export type LyricFragmentAssemblyEasing = LyricAnimationEasing

export type LyricFragmentAssemblyMotion = {
  /** Number of horizontal fragments used to build each character. */
  readonly fragmentCount?: number
  /** Time for each character's fragments to align, in frames. */
  readonly settleDurationInFrames?: number
  /** Delay between neighboring characters beginning to assemble, in frames. */
  readonly staggerInFrames?: number
  /** Delay before the first character begins, in frames. */
  readonly delayInFrames?: number
  /** Maximum distance each fragment starts from its final position, in em. */
  readonly spreadEm?: number
  /** Stable seed for the starting fragment positions. */
  readonly seed?: number
  readonly easing?: LyricFragmentAssemblyEasing
}

export type LyricFragmentAssemblyProps = Omit<LyricPatternProps, 'children'> & {
  /** Text whose fragmented characters assemble into complete glyphs. */
  readonly children: string
  /** Fragment assembly settings. */
  readonly motion?: LyricFragmentAssemblyMotion
}

const DEFAULT_MOTION = {
  fragmentCount: 5,
  settleDurationInFrames: 20,
  staggerInFrames: 1,
  delayInFrames: 0,
  spreadEm: 0.35,
  seed: 0,
  easing: 'ease-out',
} as const satisfies Required<LyricFragmentAssemblyMotion>

/** Builds complete lyrics by aligning several moving slices of each glyph. */
const LyricFragmentAssemblyView = ({
  children,
  position,
  anchor,
  safeArea,
  size,
  orientation,
  rotationDegrees,
  autoWrap,
  motion = {},
}: LyricFragmentAssemblyProps) => {
  const frame = useCurrentFrame()
  const {
    fragmentCount = DEFAULT_MOTION.fragmentCount,
    settleDurationInFrames = DEFAULT_MOTION.settleDurationInFrames,
    staggerInFrames = DEFAULT_MOTION.staggerInFrames,
    delayInFrames = DEFAULT_MOTION.delayInFrames,
    spreadEm = DEFAULT_MOTION.spreadEm,
    seed = DEFAULT_MOTION.seed,
    easing = DEFAULT_MOTION.easing,
  } = motion

  assertIntegerInRange(
    fragmentCount,
    2,
    12,
    'LyricFragmentAssembly fragmentCount',
  )
  assertFinitePositive(
    settleDurationInFrames,
    'LyricFragmentAssembly settleDurationInFrames',
  )
  assertFiniteNonNegative(
    staggerInFrames,
    'LyricFragmentAssembly staggerInFrames',
  )
  assertFiniteNonNegative(delayInFrames, 'LyricFragmentAssembly delayInFrames')
  assertFiniteNonNegative(spreadEm, 'LyricFragmentAssembly spreadEm')

  const graphemes = splitLyricGraphemes(children)
  const characterIndices = getLyricCharacterIndices(graphemes)
  const hasVisibleCharacters = hasLyricCharacters(graphemes)

  const text = graphemes.map((grapheme, graphemeIndex) => {
    const characterIndex = characterIndices[graphemeIndex]
    if (characterIndex === null) {
      return (
        <span key={`space-${graphemeIndex}`} style={{ whiteSpace: 'pre' }}>
          {grapheme}
        </span>
      )
    }

    const currentCharacterIndex = characterIndex
    const progress = getLyricAnimationProgress(
      getStaggeredFrame(
        frame,
        delayInFrames,
        currentCharacterIndex,
        staggerInFrames,
      ),
      settleDurationInFrames,
      easing,
    )
    const fragments = Array.from(
      { length: fragmentCount },
      (_, fragmentIndex) => {
        const top = (fragmentIndex / fragmentCount) * 100
        const bottom = 100 - ((fragmentIndex + 1) / fragmentCount) * 100
        const stableIndex =
          currentCharacterIndex * fragmentCount + fragmentIndex
        const offsetX = getLyricScatterValue(stableIndex, seed, 0) * spreadEm
        const offsetY = getLyricScatterValue(stableIndex, seed, 1) * spreadEm

        return (
          <span
            key={`fragment-${fragmentIndex}`}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'block',
              clipPath: `inset(${top}% 0 ${bottom}% 0)`,
              translate: `${offsetX * (1 - progress)}em ${offsetY * (1 - progress)}em`,
              lineHeight: 'inherit',
              whiteSpace: 'pre',
            }}
          >
            {grapheme}
          </span>
        )
      },
    )

    return (
      <span
        key={`character-${graphemeIndex}`}
        style={{
          position: 'relative',
          display: 'inline-block',
          lineHeight: 'inherit',
          whiteSpace: 'pre',
        }}
      >
        <span aria-hidden="true" style={{ visibility: 'hidden' }}>
          {grapheme}
        </span>
        {fragments}
      </span>
    )
  })

  const backdropProgress = hasVisibleCharacters
    ? getLyricAnimationProgress(
        getStaggeredFrame(frame, delayInFrames, 0, staggerInFrames),
        settleDurationInFrames,
        easing,
      )
    : 0

  return (
    <LyricPatternLayout
      position={position}
      anchor={anchor}
      safeArea={safeArea}
      size={size}
      orientation={orientation}
      rotationDegrees={rotationDegrees}
      backdropOpacity={backdropProgress}
      autoWrap={autoWrap}
    >
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        style={{ whiteSpace: autoWrap ? 'pre-wrap' : 'pre' }}
      >
        {text}
      </span>
    </LyricPatternLayout>
  )
}

export const LyricFragmentAssembly = withLyricStudioPosition(
  LyricFragmentAssemblyView,
  'LyricFragmentAssembly',
)
