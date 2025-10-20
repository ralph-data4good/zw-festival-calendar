import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/zw-festival-calendar/',
  server: {
    port: 3005
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
