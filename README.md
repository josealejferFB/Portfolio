# José Fernández — Portafolio

Sitio de una sola página para José Fernández, desarrollador móvil y diseñador UI/UX
venezolano. El punto de partida no es una plantilla: es su currículum, usado como
sistema de diseño.

> **La capa verde es la lógica. El ribete coral es la empatía.**
> El scroll las separa y las vuelve a tocar.

## Stack

| Pieza | Versión instalada | Por qué |
|---|---|---|
| Astro | 7.4.7 | Salida estática, cero JS por defecto, islas de movimiento |
| TypeScript | 7.0.2 (strict) | Contratos entre datos y componentes |
| Tailwind CSS + `@tailwindcss/vite` | 4.3.5 | Preflight y utilidades; el sistema vive en CSS |
| GSAP + ScrollTrigger | 3.15.1 | Scrub, timelines y revelados |
| Lenis | 1.3.27 | Solo suavizado; scroll nativo, teclado y barra intactos |
| `@fontsource-variable/montserrat` | 5.3.0 | Montserrat variable auto-hospedada, subset latin |
| Playwright | 1.65.0 | Capturas y verificación visual |

El sitio no usa frameworks de UI, librería de iconos, CSS-in-JS, CMS ni fuentes por CDN.
Los cinco glifos SVG están dibujados a mano en `src/components/icon-paths.ts`.

## Cómo correrlo

```bash
npm install                 # dependencias (en este entorno, npm + caché local)
npm run dev                 # desarrollo en http://localhost:4321
npm run build               # build de producción en dist/
npm run preview             # sirve dist/ en http://localhost:4321
npm run shots               # capturas en shots/ (requiere preview levantado)
npm run audit               # contraste + presupuesto/LCP/CLS/foco/no-JS
```

El preview del entregable está levantado como job en segundo plano en
**http://localhost:4321**.

## Estructura

```
/
├── reference/                 # CV y recortes originales (no se tocan)
├── explorations/              # tres direcciones de arte + notas + capturas
├── src/
│   ├── components/            # Panel, SectionHeader, Disc, Button, Chip, Marquee,
│   │                          # TimelineItem, CaseCard, ChapterRail, Footer, Icon…
│   ├── layouts/Base.astro     # meta, fuentes, skip-link, OG
│   ├── pages/index.astro      # los cinco actos + hero
│   ├── content/site.ts        # fuente única de copy y datos
│   ├── styles/tokens.css      # paleta, tipo, geometría, espacio, movimiento
│   ├── styles/site.css        # sistema completo y responsive
│   └── scripts/motion.ts      # capa GSAP + Lenis, aislada
├── public/                    # favicon.svg, og.png, fonts/
├── scripts/                   # shots, og, auditorías y captura de exploraciones
├── shots/                     # 320, 390, 768, 1024, 1440, 1920, reduced-motion,
│                              # no-js, un acto por sección a 1440 y dos estados
│                              # intermedios del scroll (hero y El criterio)
├── DESIGN.md                  # las seis leyes, tokens y decisiones
├── CONTENT_TODO.md            # lo que José debe enviar para cerrar los casos reales
└── README.md
```

## Decisiones de diseño

1. **El ribete es el sistema de movimiento.** El hero comprime el panel y separa el
   ribete al hacer scroll; «El criterio» hace que las dos capas lleguen desde lados
   opuestos y terminen alineadas. No hay animación que no cuente esa relación. El
   ribete aparece en el hero, en el panel de El criterio y en las cinco portadas de
   Trabajo; los círculos apilados, en la esquina superior derecha del hero.
2. **El sitio se lee completo sin JavaScript.** El 100 % del layout y del contenido está
   en HTML y CSS. GSAP y Lenis solo añaden movimiento: si el bundle no carga, los
   revelados no ocultan nada, la marquesina queda estática y el email sigue siendo un
   `mailto:`. `shots/no-js.png` lo demuestra.
3. **Los cinco casos son slots honestos.** No hay nombres, clientes, capturas ni
   métricas inventadas. Cada tarjeta muestra categoría, estado y stack reales del CV,
   con una portada abstracta compuesta solo con CSS. El CTA pide el caso completo por
   email y `CONTENT_TODO.md` dice exactamente qué falta.

### Decisiones tomadas sin consultar

- **JOSÉ en verde y FERNANDEZ en `--coral-700`.** El CV parte el nombre en dos colores;
  se recupera esa firma con coral-700 (4.89:1), no con el coral puro (2.78:1).
- **«Ver el trabajo» apunta a Trabajo (04), no a 01.** El copy del botón promete el
  trabajo; el índice 01 del brief era un desliz de numeración. El botón no miente.
- **Los discos usan `--coral-700`, no `--coral-600`.** El numeral de 12 px blanco sobre
  coral-600 daba 3.64:1; sobre coral-700 da 4.89:1 y pasa AA. `--coral-600` queda para
  puntos gráficos de 4–7 px (separadores, hitos), donde el requisito es 3:1.
- **El ritmo de sección no cambia de tamaño entre secciones.** `--seccion` es el mismo
  en las cinco; la diferencia la hace el contenido, no el padding.
- **Sin selector de idioma ni modo oscuro a medias.** No hay segunda versión que traducir
  ni tema oscuro que mantener; añadirlos a medias sería peor que no tenerlos.
- **El copy de Trabajo dice «categoría, estado y el stack confirmado», no «rol».** El
  brief pedía «rol» en el párrafo pero las tarjetas muestran estado; se alineó la promesa
  con lo que la tarjeta enseña, sin inventar roles ni stacks. El caso 01 no muestra stack
  porque no está confirmado.
- **Alcaraván aparece como «Empresa: …» en el caso 01, no como cliente.** Es el empleador
  del CV; el nombre del proyecto/cliente queda pendiente de permiso en `CONTENT_TODO.md`.
- **El email es un botón real de copiar cuando existe Clipboard API.** Sin JavaScript (o si
  la API falla) el mismo hueco vuelve a ser un enlace `mailto:` real, no un botón inerte.
- **El sitio se queda en local.** No hay dominio de producción todavía; `astro.config.mjs`
  usa `http://localhost:4321` como origen canónico y OG. El dominio real está en
  `CONTENT_TODO.md`.

## Verificación (medida, no estimada)

Con el build de producción servido en local:

| Comprobación | Resultado | Límite |
|---|---|---|
| JS inicial gzip | **49.5 KB** | ≤ 110 KB |
| CSS gzip | **8.6 KB** | ≤ 45 KB |
| Fuentes | **1 archivo, 37.1 KB** | ≤ 2 archivos, ≤ 70 KB |
| HTML gzip | 4.7 KB | — |
| LCP (4G 1.6 Mbps, RTT 150 ms, CPU ×4) | **0.76 s** | ≤ 2.0 s |
| CLS | **0.0009** | ≤ 0.02 |
| Tareas largas durante el scroll | **ninguna** | ninguna > 80 ms |
| Frames durante scroll programático | **p50 16.7 ms · p95 16.8 ms** | 60 fps |
| Contraste | **18/18 pares pasan** (coral-700/blanco 4.89, tinta/coral 6.62, verde-900/coral 5.18…) | AA 2.2 |
| Scroll horizontal | **0 px a 320/390/768/1024/1440/1920** | 0 |
| Zoom de texto 200 % | **0 px de desborde a 390/720/1440** | sin pérdida |
| Errores de consola / red | **0** | 0 |
| `prefers-reduced-motion` | sin marquesina, sin pinning, 0 revelados ocultos | — |
| Sin JavaScript | nombre, contacto, experiencia y `mailto:` presentes | — |

El detalle reproducible está en `scripts/audit-contrast.mjs`,
`scripts/audit-runtime.mjs` y `scripts/audit-zoom.mjs`. Dos matices honestos: el LCP
mide el nombre aún recortado por su entrada de 720 ms (el nombre completo se pinta a
~1.25 s bajo 4G + CPU ×4, dentro del límite), y el arranque deja dos tareas de
135–285 ms (≈35–70 ms en tiempo real). El presupuesto de §6 solo acota las tareas
largas durante el scroll, donde no queda ninguna. Deuda conocida: con movimiento
reducido el bundle de GSAP/Lenis (≈50 KB gzip) se descarga igualmente, aunque no se
inicia ni anima nada.

## Accesibilidad

- Un solo `h1`, un `h2` por acto, `h3` en hitos y tarjetas; `main`, `nav` y `footer`.
- Skip-link que aparece al primer Tab, mueve el foco a `main` y usa un anillo doble
  (blanco + coral) legible tanto sobre el blanco como sobre el panel verde.
- Foco visible en el 100 % de los interactivos: coral-700 sobre claro, verde-900 sobre
  coral, blanco sobre verde. Los enlaces del riel miden 24×24 px y, cuando el riel cae
  sobre el coral del cierre, invierten sus tintas y su anillo a verde-900.
- Zoom de texto 200 %: los nombres, HABLEMOS, las tarjetas y el email se reajustan sin
  scroll horizontal ni texto cortado.
- La marquesina tiene botón real de pausa con `aria-pressed`; se detiene en hover y
  desaparece por completo con movimiento reducido.
- El copiado del email es un `<button>` real con nombre «Copiar email»; anuncia «Copiado»
  en una región `aria-live="polite"` durante 1.2 s. Sin JavaScript (o sin Clipboard API)
  se renderiza un enlace `mailto:` con el nombre «Escribir a José Fernández», de modo que
  rol, nombre y acción coinciden en ambos modos.
- Los números de los discos pasan AA después del cambio a coral-700; los puntos
  decorativos no comunican información por sí solos.
- Cero texto blanco sobre coral. Sobre coral, tinta (6.62:1) o verde-900 (5.18:1).

## Cómo actualizar un caso real

1. Edita el objeto `site.work.cases` en `src/content/site.ts`: nombre real, stack
   confirmado, estado y (si existe) nota.
2. En `src/components/Cover.astro`/`site.css`, la portada abstracta se mantiene salvo que
   José envíe capturas reales con permiso; en ese caso se sustituye el arte, no se
   inventan mockups.
3. Actualiza `CONTENT_TODO.md` marcando lo recibido.
4. `npm run build && npm run shots` y revisa las capturas antes de decir que está listo.

## Créditos

Diseñado y construido por José Fernández. Montserrat, `#215C50`, `#FF6D4D` y demasiadas
revisiones. El copy y los datos provienen del CV y del brief aprobado; lo que falta está
en `CONTENT_TODO.md`.
