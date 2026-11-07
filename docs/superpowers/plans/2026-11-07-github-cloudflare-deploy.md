# GitHub Upload & Cloudflare Deployment Preparation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean and optimize the portfolio project, create a GitHub repository for `josealejferFB`, establish `main` and `despliegue` branches, and provide an automated deployment preparation script optimized for Cloudflare Pages.

**Architecture:** Astro static site with Tailwind CSS v4, GSAP, and Lenis. `main` contains the full codebase, tests, documentation, and tooling. `despliegue` contains strictly the minimal, production-optimized codebase stripped of development artifacts, heavy audit media, and playwright, preconfigured with Cloudflare `_headers`, SEO files, and environment-aware build.

**Tech Stack:** Astro 7.4, TypeScript 6.0, Tailwind CSS 4.3, GSAP 3.15, Lenis 1.3, Cloudflare Pages, Git / GitHub API.

**Spec:** Direct user request to upload to GitHub (`josealejferFB`), create `main` and `despliegue` branches, optimize redundancy, and script Cloudflare deployment preparation.

## Global Constraints

- Keep Astro static generation with zero breaking changes to existing design or animation.
- Do not lose any source code or assets in `main`.
- `despliegue` branch must be lightweight, fast to install in CI/CD (no Playwright, no test media), and strictly contain what Cloudflare needs.
- Add standard HTTP caching and security headers via Cloudflare `_headers`.

## Review Focus

1. `astro check` must pass with 0 errors and 0 warnings.
2. Build output in `dist/` must include `_headers`, `robots.txt`, `sitemap.xml`, and valid HTML/CSS/JS bundles.
3. Git remote must be properly configured with HTTPS credentials and both `main` and `despliegue` pushed.
4. Deployment script must be idempotent and reproducible.

---

### Task 1: Project Optimization, Cleanup & Dependency Hardening

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Modify: `astro.config.mjs`
- Modify: `.gitignore`

**Interfaces:**
- Produces: Cleaned dependencies without `@fontsource-variable/montserrat`, working `@astrojs/check` with `typescript@^6.0.3`, dynamic `site` configuration in Astro.

- [ ] **Step 1: Verify dependencies in `package.json` and remove redundant `@fontsource-variable/montserrat`**
- [ ] **Step 2: Ensure `tsconfig.json` has modern paths alias and no deprecated `baseUrl`**
- [ ] **Step 3: Update `astro.config.mjs` to support dynamic deployment URLs (`CF_PAGES_URL` / `SITE_URL`)**
- [ ] **Step 4: Update `.gitignore` to prevent generated artifacts or cache files from cluttering git**
- [ ] **Step 5: Run `npm run check` and `npm run build` to verify clean build**
- [ ] **Step 6: Commit changes to `master`**

---

### Task 2: Cloudflare Optimizations, SEO & Security Assets

**Files:**
- Create: `public/_headers`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

**Interfaces:**
- Produces: Cloudflare Pages caching rules (immutable long-term cache for `/_astro/*`, `/fonts/*`, `/projects/*`), HTTP security headers (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, permissions policy), and crawler directives.

- [ ] **Step 1: Create `public/_headers` with cache-control and security headers**
- [ ] **Step 2: Create `public/robots.txt` with Sitemap directive**
- [ ] **Step 3: Create `public/sitemap.xml` with canonical homepage entry**
- [ ] **Step 4: Run `npm run build` and verify that `dist/_headers`, `dist/robots.txt`, and `dist/sitemap.xml` exist in `dist/`**
- [ ] **Step 5: Commit changes**

---

### Task 3: Cloudflare Deployment Preparation Script

**Files:**
- Create: `scripts/prepare-deploy.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: Node.js automation script executable via `npm run prepare:deploy` that prepares and synchronizes the `despliegue` branch with only the strictly needed, optimized files for Cloudflare Pages.

- [ ] **Step 1: Implement `scripts/prepare-deploy.mjs`**
  - Validates repository state.
  - Builds the site and verifies zero errors.
  - Prepares the lean `despliegue` branch:
    - Retains: `src/`, `public/`, `astro.config.mjs`, `tsconfig.json`, `package.json` (production-optimized without `playwright`), `package-lock.json`, and deployment README.
    - Excludes: `explorations/`, `reference/`, `shots/`, `scripts/`, internal `.md` notes.
  - Updates the `despliegue` branch cleanly without touching `main`'s history.
- [ ] **Step 2: Add `"prepare:deploy"` and `"deploy:build"` scripts to `package.json`**
- [ ] **Step 3: Test `npm run prepare:deploy` in dry/local mode to verify output**
- [ ] **Step 4: Commit changes to `main`**

---

### Task 4: GitHub Repository Creation & Branch Setup

**Files:**
- Git repository state

**Interfaces:**
- Produces: Remote GitHub repository `Portfolio` under `josealejferFB`, default branch renamed from `master` to `main`, branch `despliegue` created and populated, both pushed to GitHub origin.

- [ ] **Step 1: Rename local branch `master` to `main`**
- [ ] **Step 2: Check or create GitHub repository `Portfolio` for user `josealejferFB` via GitHub API**
- [ ] **Step 3: Add git remote `origin` pointing to `https://github.com/josealejferFB/Portfolio.git`**
- [ ] **Step 4: Push `main` to `origin/main`**
- [ ] **Step 5: Run `npm run prepare:deploy` to generate and sync `despliegue` branch**
- [ ] **Step 6: Push `despliegue` to `origin/despliegue`**

---

### Task 5: Verification & Delivery

- [ ] **Step 1: Verify remote branches on GitHub via API (`GET /repos/josealejferFB/Portfolio/branches`)**
- [ ] **Step 2: Verify `npm run check` and `npm run build` in both `main` and `despliegue`**
- [ ] **Step 3: Provide clear Cloudflare Pages configuration instructions (Framework: Astro, Build: `npm run build`, Output: `dist`)**
