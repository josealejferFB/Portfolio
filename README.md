# José Fernández — Portafolio (Rama de Despliegue)

Esta rama (`despliegue`) contiene exclusivamente el código fuente optimizado y minimalista listo para compilarse y servirse en **Cloudflare Pages**.

## Configuración en Cloudflare Pages

| Parámetro | Valor |
|---|---|
| **Framework preset** | Astro |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js Version** | `20` o superior (recomendado `20.x` / `22.x`) |

## Optimizaciones incluidas
- **Cabeceras HTTP (`public/_headers`)**: Caché inmutable (1 año) para bundles `_astro/*` y fuentes, cabeceras estrictas de seguridad (HSTS, nosniff, SAMEORIGIN, CSP y Permissions-Policy).
- **SEO**: `robots.txt` y `sitemap.xml` configurados para indexación rápida.
- **Rendimiento**: Dependencias de desarrollo pesadas (como Playwright y scripts de auditoría) eliminadas para builds ultrarrápidos en Cloudflare.
