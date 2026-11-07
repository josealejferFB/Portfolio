# Instrucciones para Agentes de IA — Portafolio de José Fernández

Este archivo proporciona el contexto técnico, la arquitectura, las directrices de diseño y el flujo de despliegue necesario para que cualquier agente de IA opere de manera profesional en este repositorio.

---

## 1. Visión General del Proyecto

* **Propietario**: José Fernández (Ingeniero de Sistemas, Desarrollador Móvil y Diseñador UI/UX & Gráfico venezolano).
* **URL de Producción**: [https://josealejfer.pages.dev/](https://josealejfer.pages.dev/)
* **Repositorio GitHub**: [https://github.com/josealejferFB/Portfolio](https://github.com/josealejferFB/Portfolio)
* **Objetivo**: Sitio de una sola página, rápido, accesible, tipográfico y con movimiento expresivo basado en el currículum 2026 de José.

---

## 2. Stack Tecnológico

| Pieza | Versión / Herramienta | Rol en el Proyecto |
|---|---|---|
| **Astro** | 7.4.x (Static output) | Salida estática HTML/CSS pura, cero JS por defecto en el cliente. |
| **TypeScript** | ^6.0.3 (Strict) + `@astrojs/check` | Contratos tipados en datos (`src/content/site.ts`) y componentes. |
| **Tailwind CSS** | 4.3.x + `@tailwindcss/vite` | Utilidades de layout; el sistema de diseño vive en variables CSS. |
| **GSAP + ScrollTrigger** | 3.15.x | Timelines, scrub de scroll y revelado progresivo (`src/scripts/motion.ts`). |
| **Lenis** | 1.3.x | Suavizado de scroll respetando scroll nativo y accesibilidad. |
| **Tipografía** | Montserrat Variable (WOFF2) | Auto-hospedada en `public/fonts/` (no usar CDNs ni `@fontsource`). |
| **Iconografía** | SVG nativos en código | Definidos a mano en `src/components/icon-paths.ts` (sin librerías pesadas de iconos). |

---

## 3. Fuente Única de Verdad (Copy y Datos)

* Todo el contenido textual, datos de contacto, métricas, experiencia y proyectos vive en **`src/content/site.ts`**.
* **Regla estricta**: Nunca inventes experiencia, proyectos ni métricas. Si algo falta o requiere confirmación, consulta `reference/jose-cv-2026.txt` o anótalo en `CONTENT_TODO.md`.

---

## 4. Filosofía de Diseño y Accesibilidad

1. **La metáfora gráfica**: El verde (`#215C50`) representa la lógica técnica; el ribete coral (`#FF6D4D` / `--coral-700` `#D94528`) representa la empatía visual. El scroll separa ambas capas y las vuelve a unir.
2. **Resiliencia sin JavaScript (No-JS)**: El 100 % del contenido, fichas de trabajo, estructura semántica y contacto debe funcionar y ser legible con JavaScript deshabilitado. GSAP y Lenis solo añaden capa visual y deben aislarse en `src/scripts/motion.ts`.
3. **Contraste accesible (WCAG AA)**:
   * **Nunca usar texto blanco sobre coral**: Sobre coral se usa `--tinta` (`#18221E`, ratio 6.62:1) o `--verde-900` (`#0C2B24`, ratio 5.18:1).
   * Los números de los discos usan `--coral-700` (`#D94528`, ratio 4.89:1 sobre blanco) para cumplir AA.
4. **Respeto a `prefers-reduced-motion`**: Si el usuario solicita reducir movimiento, no se ejecutan timelines de GSAP ni parallax.

---

## 5. Estrategia de Ramas y Despliegue (Cloudflare Pages)

El proyecto cuenta con una separación estricta de ramas:

* **Rama `main`**:
  * Es la rama de trabajo diaria.
  * Contiene todo el código fuente, suite de pruebas, capturas de auditoría (`shots/`), exploraciones (`explorations/`), CVs de referencia (`reference/`) y documentación.
* **Rama `despliegue`**:
  * **Conectada a Cloudflare Pages**.
  * Contiene únicamente los 39 archivos estrictamente requeridos para compilar en producción (sin Playwright, sin capturas pesadas, sin notas).
  * **NUNCA hagas commits manuales en la rama `despliegue`**: se sincroniza mediante el script automatizado.

### Requisito Crítico de Entorno
* **Node.js >= 22.23.4**: Astro 7 y Tailwind 4 requieren Node 22. Esto está fijado en `.node-version` y `.nvmrc` para que Cloudflare Pages use Node 22 automáticamente.

---

## 6. Flujo de Trabajo y Comandos

### Desarrollo y Verificación
```bash
npm run dev        # Levanta el servidor local en http://localhost:4321
npm run check      # Verificación de tipos con @astrojs/check (DEBE reportar 0 errores)
npm run build      # Compila la salida estática en dist/
npm run preview    # Previsualiza la carpeta dist/ localmente
```

### Proceso de Despliegue

Cualquier cambio que se suba a producción debe seguir una de estas dos vías:

1. **Vía Automática por CI/CD (GitHub Actions)**:
   * Trabaja en `main`, haz tu commit y ejecuta:
     ```bash
     git push origin main
     ```
   * El workflow `.github/workflows/deploy.yml` validará los tipos, compilará y actualizará la rama `despliegue` de manera automática en la nube. Cloudflare Pages desplegará en ~20 segundos.

2. **Vía Local Directa (Un solo comando)**:
   * Si deseas validar y publicar directamente desde la terminal:
     ```bash
     npm run deploy
     ```
   * Ejecuta `scripts/prepare-deploy.mjs --push`, validando `main`, empaquetando `despliegue` y subiendo ambas ramas a GitHub.

---

## 7. Checklist para Agentes antes de dar una tarea por completada

- [ ] ¿Ejecutaste `npm run check` y el resultado fue **0 errores, 0 warnings, 0 hints**?
- [ ] ¿Ejecutaste `npm run build` y la compilación terminó con código de salida 0?
- [ ] ¿Los enlaces, botones y formularios tienen nombres accesibles y foco visible?
- [ ] ¿Las cabeceras HTTP de Cloudflare (`public/_headers`) y los archivos SEO (`robots.txt`, `sitemap.xml`) se mantienen íntegros?
- [ ] ¿Si hubo cambios de dependencias o configuraciones, se ejecutó `npm run deploy` o se probó `npm run prepare:deploy`?
- [ ] ¿Se preservó la integridad de la documentación (`README.md`, `DEPLOY.md`, `DESIGN.md`)?
