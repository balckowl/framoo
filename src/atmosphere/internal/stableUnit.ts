/** Returns a well-distributed stable value between 0 and 1. */
export const stableUnit = (seed: string | number): number => {
  const text = String(seed)
  let hash = 2166136261

  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  hash ^= hash >>> 16
  hash = Math.imul(hash, 0x85ebca6b)
  hash ^= hash >>> 13
  hash = Math.imul(hash, 0xc2b2ae35)
  hash ^= hash >>> 16

  return (hash >>> 0) / 4294967296
}
