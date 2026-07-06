// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "manifest",
          href: "/manifest.webmanifest"
        }
      ]
    }
  },
  css: [
    "reset-css",
    "@vuepic/vue-datepicker/dist/main.css",
    "assets/css/default.css",
    "assets/transitions/bounce-in.css"
  ],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  googleFonts: {
    families: {
      Quicksand: "300..700",
      Nunito: "200..900",
    },
  },
  modules: [
    "@nuxtjs/google-fonts", // https://google-fonts.nuxtjs.org
    "@nuxtjs/i18n", // https://i18n.nuxtjs.org
    "@vite-pwa/nuxt", // https://vite-pwa-org.netlify.app
    "@regle/nuxt", // https://reglejs.dev
    "@vueuse/nuxt", // https://vueuse.org
  ],
  i18n: {
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    },
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "French", file: "fr.json" },
    ],
  },
  regle: {
    setupFile: '~/regle-config.ts'
  },
  typescript: {
    tsConfig: {
      vueCompilerOptions: {
        plugins: ["@vue/language-plugin-pug"],
      },
    },
  },
  pwa: {
    client: {
      installPrompt: true,
    },
    pwaAssets: {
      image: 'logo.svg',
      // https://vite-pwa-org.netlify.app/assets-generator/integrations.html
      disabled: false,
    },
    registerType: "autoUpdate",
    manifest: {
      name: "Slowdo",
      start_url: '/app',
      id: '/app',
      short_name: "Slow todo list",
      theme_color: "#4a8a96",
      background_color: "#4a8a96",
      description: "Anti-productive application that allows you to complete the task without overloading your mind. Do it at your own pace.",
      screenshots: [
        {
          src: "/screenshots/desktop.png",
          sizes: "1920x1080",
          type: "image/png",
          form_factor: "wide",
          label: "Vue desktop",
        },
        {
          src: "/screenshots/mobile.png",
          sizes: "390x844",
          type: "image/png",
          label: "Vue mobile",
        },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
  routeRules: {
    '/app/**': { ssr: false },
    '/*/app/**': { ssr: false }
  }
});
