import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'] },
      manifest: {
        name: 'Relevamiento Emergencia Hidrica',
        short_name: 'EmergenciaHidrica',
        description: 'App de relevamiento puerta a puerta para emergencia hidrica',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f2b46',
        theme_color: '#0f2b46',
        icons: [
          { src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
          { src: '/icons/icon-maskable.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
