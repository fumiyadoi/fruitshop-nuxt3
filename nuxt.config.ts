import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["~/assets/styles/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "フルーツショップ",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
