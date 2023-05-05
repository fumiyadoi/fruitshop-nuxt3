import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["@/assets/styles/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },
});
