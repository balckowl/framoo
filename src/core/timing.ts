/** Converts a source time in seconds to the nearest composition frame. */
export const secondsToFrames = (seconds: number, fps: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    throw new Error('seconds must be a finite non-negative number.')
  }

  if (!Number.isFinite(fps) || fps <= 0) {
    throw new Error('fps must be a positive finite number.')
  }

  return Math.round(seconds * fps)
}

/** Converts a seconds-based source range into one frame-based Remotion range. */
export const secondsToFrameRange = (
  startSeconds: number,
  endSeconds: number,
  fps: number,
) => {
  if (
    !Number.isFinite(startSeconds) ||
    startSeconds < 0 ||
    !Number.isFinite(endSeconds) ||
    endSeconds <= startSeconds
  ) {
    throw new Error('Frame ranges need a finite endSeconds after startSeconds.')
  }

  const from = secondsToFrames(startSeconds, fps)
  const endFrame = secondsToFrames(endSeconds, fps)
  if (endFrame <= from) {
    throw new Error(
      'The seconds range must span at least one frame at this fps.',
    )
  }

  return {
    from,
    durationInFrames: endFrame - from,
  }
}
