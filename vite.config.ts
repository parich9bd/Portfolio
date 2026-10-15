import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) {
            return 'three-core'
          }

          if (id.includes('node_modules/@react-three/')) {
            return 'react-three'
          }
        },
      },
    },
    modulePreload: {
      resolveDependencies(_filename, deps) {
        return deps.filter(
          (dep) =>
            !dep.includes('three-core-') &&
            !dep.includes('react-three-'),
        )
      },
    },
  },
})