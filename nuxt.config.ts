// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  }
})
