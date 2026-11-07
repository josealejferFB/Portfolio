#!/usr/bin/env node
/**
 * Script de preparación y optimización para la rama 'despliegue' (Cloudflare Pages).
 * 
 * Este script:
 * 1. Verifica que el build pase limpiamente (0 errores).
 * 2. Prepara la rama 'despliegue' conteniendo ÚNICAMENTE lo estrictamente necesario:
 *    - src/
 *    - public/ (con _headers, robots.txt, sitemap.xml y assets optimizados)
 *    - astro.config.mjs (configurado para Cloudflare)
 *    - tsconfig.json
 *    - package.json optimizado (sin Playwright, sin scripts de auditoría/capturas)
 *    - package-lock.json ligero
 *    - README.md de despliegue
 * 3. Excluye todo archivo redundante:
 *    - explorations/
 *    - reference/
 *    - shots/ (8.5 MB de capturas de auditoría)
 *    - scripts de auditoría y capturas pesadas
 *    - notas y borradores de diseño
 * 4. Deja la rama lista para Cloudflare Pages (Build: `npm run build`, Output: `dist`).
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

function run(cmd, options = {}) {
  console.log(`\x1b[36m➜\x1b[0m ${cmd}`);
  return execSync(cmd, { stdio: "inherit", cwd: rootDir, ...options });
}

function runSilent(cmd, options = {}) {
  return execSync(cmd, { encoding: "utf-8", cwd: rootDir, ...options }).trim();
}

console.log("\n\x1b[1m🚀 Preparando rama de despliegue optimizada para Cloudflare...\x1b[0m\n");

// 1. Verificar estado actual de git
const currentBranch = runSilent("git branch --show-current") || "main";
const status = runSilent("git status --porcelain");

if (status) {
  console.error("\x1b[31m✖ Error: Hay cambios sin confirmar en el árbol de trabajo. Confirma o descarta tus cambios antes de continuar.\x1b[0m");
  process.exit(1);
}

// 2. Ejecutar chequeo y compilación previa en la rama actual
console.log("\x1b[32m✔ 1. Verificando integridad del código y compilación...\x1b[0m");
run("npm run check");
run("npm run build");

// 3. Crear directorio temporal para el árbol limpio de despliegue
const deployTmpDir = path.join(rootDir, ".deploy_staging");
if (fs.existsSync(deployTmpDir)) {
  fs.rmSync(deployTmpDir, { recursive: true, force: true });
}
fs.mkdirSync(deployTmpDir, { recursive: true });

console.log("\x1b[32m✔ 2. Empaquetando archivos estrictamente necesarios...\x1b[0m");

// Copiar src/ y public/
fs.cpSync(path.join(rootDir, "src"), path.join(deployTmpDir, "src"), { recursive: true });
fs.cpSync(path.join(rootDir, "public"), path.join(deployTmpDir, "public"), { recursive: true });

// Copiar configs
fs.copyFileSync(path.join(rootDir, "astro.config.mjs"), path.join(deployTmpDir, "astro.config.mjs"));
fs.copyFileSync(path.join(rootDir, "tsconfig.json"), path.join(deployTmpDir, "tsconfig.json"));
if (fs.existsSync(path.join(rootDir, ".node-version"))) {
  fs.copyFileSync(path.join(rootDir, ".node-version"), path.join(deployTmpDir, ".node-version"));
}
if (fs.existsSync(path.join(rootDir, ".nvmrc"))) {
  fs.copyFileSync(path.join(rootDir, ".nvmrc"), path.join(deployTmpDir, ".nvmrc"));
}

// .gitignore para despliegue
const deployGitignore = `node_modules/
dist/
.astro/
.npm-cache/
.DS_Store
*.log
.env
.env.*
`;
fs.writeFileSync(path.join(deployTmpDir, ".gitignore"), deployGitignore, "utf-8");

// package.json optimizado para producción en Cloudflare
const originalPkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf-8"));
const deployPkg = {
  name: originalPkg.name,
  type: originalPkg.type,
  version: originalPkg.version,
  private: true,
  scripts: {
    dev: "ASTRO_TELEMETRY_DISABLED=1 astro dev",
    build: "ASTRO_TELEMETRY_DISABLED=1 astro build",
    preview: "ASTRO_TELEMETRY_DISABLED=1 astro preview",
    check: "ASTRO_TELEMETRY_DISABLED=1 astro check"
  },
  dependencies: {
    astro: originalPkg.dependencies.astro,
    gsap: originalPkg.dependencies.gsap,
    lenis: originalPkg.dependencies.lenis
  },
  devDependencies: {
    "@astrojs/check": originalPkg.devDependencies?.["@astrojs/check"] || "^0.9.4",
    "@tailwindcss/vite": originalPkg.devDependencies?.["@tailwindcss/vite"] || "4.3.5",
    tailwindcss: originalPkg.devDependencies?.tailwindcss || "4.3.5",
    typescript: originalPkg.devDependencies?.typescript || "^6.0.3"
  }
};
fs.writeFileSync(path.join(deployTmpDir, "package.json"), JSON.stringify(deployPkg, null, 2) + "\n", "utf-8");

// README específico para la rama de despliegue
const deployReadme = `# José Fernández — Portafolio (Rama de Despliegue)

Esta rama (\`despliegue\`) contiene exclusivamente el código fuente optimizado y minimalista listo para compilarse y servirse en **Cloudflare Pages**.

## Configuración en Cloudflare Pages

| Parámetro | Valor |
|---|---|
| **Framework preset** | Astro |
| **Build command** | \`npm run build\` |
| **Build output directory** | \`dist\` |
| **Node.js Version** | \`20\` o superior (recomendado \`20.x\` / \`22.x\`) |

## Optimizaciones incluidas
- **Cabeceras HTTP (\`public/_headers\`)**: Caché inmutable (1 año) para bundles \`_astro/*\` y fuentes, cabeceras estrictas de seguridad (HSTS, nosniff, SAMEORIGIN, CSP y Permissions-Policy).
- **SEO**: \`robots.txt\` y \`sitemap.xml\` configurados para indexación rápida.
- **Rendimiento**: Dependencias de desarrollo pesadas (como Playwright y scripts de auditoría) eliminadas para builds ultrarrápidos en Cloudflare.
`;
fs.writeFileSync(path.join(deployTmpDir, "README.md"), deployReadme, "utf-8");

// Usar el package-lock.json existente del proyecto
console.log("\x1b[32m✔ 3. Copiando lockfile verificado...\x1b[0m");
fs.copyFileSync(path.join(rootDir, "package-lock.json"), path.join(deployTmpDir, "package-lock.json"));

// 4. Cambiar a o crear la rama despliegue
console.log("\x1b[32m✔ 4. Sincronizando rama 'despliegue'...\x1b[0m");

const localBranchExists = runSilent("git branch --list despliegue");
const remoteBranchExists = runSilent("git branch -r --list origin/despliegue");

if (localBranchExists) {
  run("git checkout despliegue");
} else if (remoteBranchExists) {
  run("git checkout -B despliegue origin/despliegue");
} else {
  run("git checkout --orphan despliegue");
}

// Limpiar el índice y el árbol de trabajo actual en la rama despliegue
run("git rm -rf .", { stdio: "pipe" });

// Copiar los archivos limpios desde deployTmpDir a la raíz
const filesToCopy = fs.readdirSync(deployTmpDir);
for (const file of filesToCopy) {
  const srcPath = path.join(deployTmpDir, file);
  const destPath = path.join(rootDir, file);
  fs.cpSync(srcPath, destPath, { recursive: true });
}

// Limpiar carpeta temporal
fs.rmSync(deployTmpDir, { recursive: true, force: true });

// Agregar cambios a git
run("git add .");

// Compilar en la rama despliegue para asegurar 100% éxito
console.log("\x1b[32m✔ 5. Verificando compilación en la rama 'despliegue'...\x1b[0m");
run("npm run check");
run("npm run build");

// Confirmar commit en despliegue
const hasStagedChanges = runSilent("git status --porcelain");
if (hasStagedChanges) {
  run('git commit -m "deploy: rama optimizada para Cloudflare Pages (cero redundancia, assets y headers listos)"');
  console.log("\x1b[32m✔ Commit de despliegue creado con éxito.\x1b[0m");
} else {
  console.log("\x1b[33mℹ Rama 'despliegue' ya estaba al día.\x1b[0m");
}

const shouldPush = process.argv.includes("--push");

if (shouldPush) {
  console.log("\x1b[32m✔ 6. Subiendo rama 'despliegue' a GitHub...\x1b[0m");
  run("git push origin despliegue");
}

// Volver a la rama original
run(`git checkout ${currentBranch}`);

if (shouldPush) {
  console.log(`\x1b[32m✔ 7. Subiendo rama '${currentBranch}' a GitHub...\x1b[0m`);
  run(`git push origin ${currentBranch}`);
}

console.log("\n\x1b[32;1m✨ ¡Proceso completado con éxito!\x1b[0m\n");
if (!shouldPush) {
  console.log("Para subir ambas ramas a GitHub ejecuta:");
  console.log("  git push origin main");
  console.log("  git push origin despliegue\n");
  console.log("O directamente ejecuta: npm run deploy\n");
}
