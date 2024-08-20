import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";


// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/styles/main.scss"],
  devtools: { enabled: true },

  build: {
    transpile: ["vuetify"],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },

  modules: [
    '@nuxt/content',
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
      },
    ],
    "@pinia/nuxt",
    '@vite-pwa/nuxt',
  ],
  // nuxt content
  content: {
    // ... options
  },
  pwa: {
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],  // Removed **/_payload.json
      globIgnores: [
        '**/node_modules/**/*',
        'sw.js',
        'workbox-*.js',
      ],
    },
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'images/apple-touch-icon.png'],
    manifest: {
      name: 'Глазов-есть!',
      short_name: 'Глазов-есть!',
      description: 'Кафе, рестораны, доставки, qr-меню, бронирование столиков',
      theme_color: '#ffffff',
      background_color: "#ffffff",
      display: "standalone",
      icons: [
        {
          src: 'android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },

        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        }
      ]
    }
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  devServer: {
    port: 3038,
  },
  

  compatibilityDate: "2024-07-27",
});
