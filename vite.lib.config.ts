import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const source = (path: string) => resolve(import.meta.dirname, 'src', path)

export default defineConfig({
  publicDir: false,
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        'core/index': source('core/index.ts'),
        'camera/moves/index': source('camera/moves/index.ts'),
        'camera/effects/index': source('camera/effects/index.ts'),
        'lyrics/index': source('lyrics/index.ts'),
        'atmosphere/index': source('atmosphere/index.ts'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rolldownOptions: {
      external: [/^react(?:\/.*)?$/, 'remotion'],
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
    sourcemap: true,
  },
})
