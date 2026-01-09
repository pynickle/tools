// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/tools/',
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['bulma/css/bulma.css', '~/assets/css/main.css'],
  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'zh',
        name: '中文',
        file: 'zh.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  },
});
