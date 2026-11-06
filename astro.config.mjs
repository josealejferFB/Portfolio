// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// The portfolio is a single static page: no adapters, no server runtime.
export default defineConfig({
  site: "http://localhost:4321",
  compressHTML: true,
  build: { inlineStylesheets: "auto" },
  vite: {
    plugins: [tailwindcss()],
  },
});
