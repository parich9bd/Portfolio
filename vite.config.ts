import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths valid on any static host (Chabokan, Netlify, subfolders).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { target: 'es2022', chunkSizeWarningLimit: 900 },
})
