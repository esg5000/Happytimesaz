import { createRequire } from 'node:module'
import { defineConfig } from 'vite'

const require = createRequire(import.meta.url)

/**
 * Pin `react/jsx-runtime` for pnpm / Vercel. Avoid aliasing the `react` package root
 * — that breaks React 19 subpaths like `react/compiler-runtime` used by Sanity.
 */
export default defineConfig({
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime']
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      'react/jsx-runtime': require.resolve('react/jsx-runtime')
    }
  },
  ssr: {
    noExternal: ['react', 'react-dom']
  }
})
