// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/entity-manager/",
    buildAssetsDir: "assets",
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content:
            "Transform how you manage data with this visually intuitive alternative to traditional Excel cells and JSON strings. Easily add, manipulate, and manage your files for a fresh approach to data handling.",
        },
      ],
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
      isCustomElement: (tag: any) => tag.includes("tool-tip"),
    },
  },
});