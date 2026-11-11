import { defineConfig } from 'blume'

const remotionRuntime = {
  name: 'remotion-singleton',
  hooks: {
    'astro:config:setup': ({ updateConfig }) => {
      updateConfig({
        vite: {
          resolve: {
            dedupe: ['react', 'react-dom', 'remotion'],
          },
        },
      })
    },
  },
}

export default defineConfig({
  title: 'Framoo',
  integrations: [remotionRuntime],
  agents: {
    contentSignals: { search: false },
  },
  description:
    'Camera motion, lyric animation, and atmospheric overlays for Remotion.',
  content: {
    root: 'content',
  },
  seo: {
    sitemap: false,
  },
  navigation: {
    sidebar: { display: 'group' },
  },
  github: {
    owner: 'balckowl',
    repo: 'framoo',
    dir: 'docs',
  },
  theme: {
    accent: 'violet',
    radius: 'md',
    mode: 'system',
  },
})
