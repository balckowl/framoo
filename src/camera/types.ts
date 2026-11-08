/** A camera's view of the composition at one point in time. */
export type CameraPose = {
  /** Horizontal focal point in composition coordinates. 0.5 is the center. */
  readonly x: number
  /** Vertical focal point in composition coordinates. 0.5 is the center. */
  readonly y: number
  /** Scale factor. 1 keeps the composition at its original size. */
  readonly zoom: number
  /** Rotation in degrees. */
  readonly rotation: number
}

/** A point in composition coordinates; `(0.5, 0.5)` is the frame center. */
export type CameraPoint = Pick<CameraPose, 'x' | 'y'>

export type CameraEasing = 'linear' | 'smooth' | 'rush' | 'cut'

/** Easing options for animated camera moves; `cut` is reserved for instant changes. */
export type CameraMoveEasing = Exclude<CameraEasing, 'cut'>

export type CameraKeyframe = {
  /** Absolute frame within the composition. */
  readonly atFrame: number
  /** Values to change at this keyframe; omitted values keep their current value. */
  readonly pose: Partial<CameraPose>
  /** Extra rotation, in degrees, added to the current rotation. */
  readonly rotationBy?: number
  /** Easing used on the segment leading into this keyframe. */
  readonly easing?: CameraEasing
}

export type CameraMove = {
  /** Start frame within the composition. */
  readonly from: number
  /** Number of frames in which this move's keyframes must fall. */
  readonly durationInFrames: number
  /** Ordered by frame; at a shared frame, the later keyframe takes precedence. */
  readonly keyframes: readonly CameraKeyframe[]
}

export type CameraEffectSample = {
  /** Additional horizontal offset in pixels. */
  readonly translateX?: number
  /** Additional vertical offset in pixels. */
  readonly translateY?: number
  /** Additional rotation in degrees. */
  readonly rotation?: number
  /** Additional blur in pixels. */
  readonly blur?: number
}

/** An additive camera effect sampled at the current composition frame. */
export type CameraEffect = {
  readonly sample: (frame: number, fps: number) => CameraEffectSample
}

/** Camera pose plus the additive values produced by camera effects. */
export type CameraState = CameraPose & {
  /** Additive horizontal offset from camera effects, in pixels. */
  readonly translateX: number
  /** Additive vertical offset from camera effects, in pixels. */
  readonly translateY: number
  /** Additive blur from camera effects, in pixels. */
  readonly blur: number
}

/** Complete camera configuration accepted by SceneStage. */
export type CameraTrack = {
  /** Starting view; defaults to centered, unrotated, and unzoomed. */
  readonly initial?: CameraPose
  /** Non-overlapping camera moves, sorted automatically by start frame. */
  readonly moves?: readonly CameraMove[]
  /** Additive effects such as shake, evaluated alongside the move track. */
  readonly effects?: readonly CameraEffect[]
}
