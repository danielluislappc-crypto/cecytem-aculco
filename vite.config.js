import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    open: true,
    hot: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'assets')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // ← ESTO ES LO IMPORTANTE (usa esbuild en lugar de terser)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['bootstrap']
        }
      }
    }
  }
});