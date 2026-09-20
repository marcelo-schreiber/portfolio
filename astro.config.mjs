import { defineConfig, sharpImageService } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  i18n: {
    locales: ["en", "pt"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    optimizeDeps: {
      force: true,
    },
    plugins: [tailwindcss()],
  },
  image: {
    service: sharpImageService(),
  },
  integrations: [react()],
});
