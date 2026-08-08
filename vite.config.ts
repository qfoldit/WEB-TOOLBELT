import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  optimizeDeps: {
    exclude: ['@dimforge/rapier3d'], // WASM module must not be pre-bundled
  },
  build: {
    target: 'esnext',
  },
});
