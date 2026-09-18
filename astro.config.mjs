import { defineConfig, sharpImageService } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: sharpImageService(),
  },
  integrations: [react()],
});
