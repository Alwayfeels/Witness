import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    base: '/',

    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.js',
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Witness',
      short_name: 'Witness',
      display: 'standalone',
      display_override: ["minimal-ui"],
      id: '/',
      start_url: '/',
      // start_url: 'http://10.0.0.55:5173/',
      description: '\u0016\u0016Habit-forming apps',
      theme_color: '#ffffff',
      background_color: '#000000',
      icons: [
        {
          src: './public/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: './public/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|svg|ico|webp)$/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /.*\.html.*/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /.*\.css.*/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /.*\.js.*/,
          handler: 'CacheFirst',
        },
      ],
    },
  })],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})