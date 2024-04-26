// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  css: ["@/assets/css/styles.css"],
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes("tool-tip"),
    },
  },
});
