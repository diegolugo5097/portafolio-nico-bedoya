import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` genera un sitio normal en /dist.
// `npm run build:single` genera un único index.html con todo embebido.
export default defineConfig(({ mode }) => ({
  plugins: mode === 'single' ? [react(), viteSingleFile()] : [react()],
  build: mode === 'single' ? { assetsInlineLimit: 100000000, outDir: 'dist-single' } : {},
}))
