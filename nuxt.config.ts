// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    foodFinderApiKey: '',
    googleMapsApiKey: ''
  },
  css: [
    '@/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
