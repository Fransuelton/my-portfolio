import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://fransuelton.dev",

  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "pt",
        locales: {
          pt: "pt-BR",
          en: "en-US",
          es: "es-ES",
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: cloudflare()
});