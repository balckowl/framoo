/** Throws when a required string option contains no visible characters. */
export const assertNonEmptyString = (name: string, value: string): void => {
  if (!value.trim()) {
    throw new Error(`${name} must not be empty.`)
  }
}
