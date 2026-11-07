// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// The portfolio is a single static page: no adapters, no server runtime.
// Canonical production domain: prevents ephemeral preview hash subdomains from polluting canonical SEO.
const siteUrl = process.env.SITE_URL || "https://josealejfer.pages.dev";

export default defineConfig({
  site: siteUrl,
  compressHTML: true,
  build: { inlineStylesheets: "auto" },
  vite: {
    plugins: [tailwindcss()],
  },
});
