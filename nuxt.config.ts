// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'reset-css',
    'assets/css/default.css'
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  googleFonts: {
    families: {
      'Quicksand': '300..700',
      'Nunito': '200..900'
    }
  },
  modules: [
    '@nuxtjs/google-fonts', // https://google-fonts.nuxtjs.org
    '@nuxtjs/i18n', // https://i18n.nuxtjs.org
    '@vite-pwa/nuxt', // https://vite-pwa-org.netlify.app
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'French', file: 'fr.json' }
    ]
  },
  ssr: false,
  typescript: {
    tsConfig: {
      vueCompilerOptions: {
        plugins: ['@vue/language-plugin-pug']
      }
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Slowdo',
      short_name: 'slowdo',
      theme_color: '#4a7c6f',
      background_color: '#4a7c6f',
      description: 'Slow todo list',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      screenshots: [
        {
          src: '/screenshots/desktop.png',
          sizes: '1920x1080',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Vue desktop'
        },
        {
          src: '/screenshots/mobile.png',
          sizes: '390x844',
          type: 'image/png',
          label: 'Vue mobile'
        }
      ]
    },
    client: {
      installPrompt: true,
    }
  }
})
