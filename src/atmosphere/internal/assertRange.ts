/** Throws when a numeric option falls outside its documented range. */
export const assertRange = (
  name: string,
  value: number,
  min: number,
  max: number,
): void => {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(
      `${name} must be a finite number between ${min} and ${max}.`,
    )
  }
}
