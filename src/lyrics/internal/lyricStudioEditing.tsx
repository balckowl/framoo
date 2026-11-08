import {
  createContext,
  forwardRef,
  useContext,
  type ComponentType,
  type CSSProperties,
  type Ref,
  type ReactNode,
} from 'react'
import { Interactive, type InteractivitySchema } from 'remotion'
import type { LyricPatternProps } from './LyricPatternProps'

type StudioPositionLayerOptions<Props extends object> = {
  readonly Component: ComponentType<Props>
  readonly componentName: string
  readonly schema: InteractivitySchema
  readonly supportsEffects: false
  readonly layout: 'none'
}

const createStudioPositionLayer = Interactive.create as unknown as <
  Props extends object,
>(
  options: StudioPositionLayerOptions<Props>,
) => ComponentType<Props>

const LYRIC_INSPECTOR_SCHEMA = {
  'position.x': {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
    hiddenFromList: false,
    description: 'Horizontal position',
  },
  'position.y': {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.5,
    hiddenFromList: false,
    description: 'Vertical position',
  },
  anchor: {
    type: 'enum',
    default: 'center',
    description: 'Position anchor',
    variants: {
      'top-left': {},
      'top-center': {},
      'top-right': {},
      'center-left': {},
      center: {},
      'center-right': {},
      'bottom-left': {},
      'bottom-center': {},
      'bottom-right': {},
    },
  },
  size: {
    type: 'enum',
    default: 'base',
    description: 'Text size',
    variants: {
      xs: {},
      sm: {},
      md: {},
      base: {},
      xl: {},
      '2xl': {},
      '4xl': {},
    },
  },
  orientation: {
    type: 'enum',
    default: 'horizontal',
    description: 'Writing direction',
    variants: {
      horizontal: {},
      vertical: {},
    },
  },
  rotationDegrees: {
    type: 'rotation-degrees',
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    description: 'Text rotation',
  },
} as const satisfies InteractivitySchema

type LyricPositionAdjustment = {
  readonly style?: Pick<
    CSSProperties,
    'translate' | 'scale' | 'rotate' | 'transformOrigin' | 'opacity'
  >
  readonly ref?: Ref<HTMLDivElement>
}

const LyricPositionAdjustmentContext = createContext<
  LyricPositionAdjustment | undefined
>(undefined)

const LyricPositionAdjustmentProvider = ({
  adjustment,
  children,
}: {
  readonly adjustment?: LyricPositionAdjustment
  readonly children: ReactNode
}) => (
  <LyricPositionAdjustmentContext.Provider value={adjustment}>
    {children}
  </LyricPositionAdjustmentContext.Provider>
)

export const useLyricPositionAdjustment = () =>
  useContext(LyricPositionAdjustmentContext)

/**
 * Adds a Studio-editable position layer to a lyric pattern.
 * Interactive.create consumes the timeline props and supplies the sequence,
 * so a lyric pattern is one timed item in the Studio timeline.
 */
export const withLyricStudioPosition = <Props extends LyricPatternProps>(
  Component: ComponentType<Props>,
  componentName: string,
) => {
  type StudioEditableProps = Props & {
    readonly style?: CSSProperties
  }

  const StudioEditablePattern = forwardRef<HTMLDivElement, StudioEditableProps>(
    (propsWithStyle, ref) => {
      const { style, ...props } = propsWithStyle as StudioEditableProps
      const adjustment: LyricPositionAdjustment = {
        style: style
          ? {
              translate: style.translate,
              scale: style.scale,
              rotate: style.rotate,
              transformOrigin: style.transformOrigin,
              opacity: style.opacity,
            }
          : undefined,
        ref,
      }

      return (
        <LyricPositionAdjustmentProvider adjustment={adjustment}>
          <Component {...(props as unknown as Props)} />
        </LyricPositionAdjustmentProvider>
      )
    },
  )
  StudioEditablePattern.displayName = `${componentName} Studio layer`
  const InteractivePattern =
    StudioEditablePattern as unknown as ComponentType<Props>

  return createStudioPositionLayer({
    Component: InteractivePattern,
    componentName: `${componentName} position`,
    schema: LYRIC_INSPECTOR_SCHEMA,
    supportsEffects: false,
    layout: 'none',
  }) as ComponentType<Props>
}
