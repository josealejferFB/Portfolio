// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// The portfolio is a single static page: no adapters, no server runtime.
// Automatically adapts canonical URLs to Cloudflare Pages or custom domain environment variable.
const siteUrl = process.env.SITE_URL || process.env.CF_PAGES_URL || "https://josealejfer.pages.dev";

export default defineConfig({
  site: siteUrl,
  compressHTML: true,
  build: { inlineStylesheets: "auto" },
  vite: {
    plugins: [tailwindcss()],
  },
});
