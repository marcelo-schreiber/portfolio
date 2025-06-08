import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  image: {
    service: sharpImageService(),
  },
  integrations: [tailwind(), react()],
});
