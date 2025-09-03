import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              return 'vendor_react-dom';
            }
            if (id.includes('react-router-dom')) {
              return 'vendor_react-router-dom';
            }
            if (id.includes('@reduxjs/toolkit')) {
              return 'vendor_redux-toolkit';
            }
            if (id.includes('zod')) {
              return 'vendor_zod';
            }
            if (id.includes('react-hook-form')) {
              return 'vendor_react-hook-form';
            }
            // Catch-all for other node_modules
            return 'vendor';
          }
        },
      },
    },
  },
});