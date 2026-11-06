# BRIEF · Portafolio José Fernández

> Léelo completo antes de escribir una línea. Es el ADN del proyecto en 40 líneas.

## Autor y tesis
José Fernández · Ingeniero de Sistemas · Desarrollador Móvil · Diseñador UI/UX & Gráfico
San Juan de los Morros, VE · UTC−4 · Fuente de contenido: `reference/jose-cv-2026.txt` y NotiFast.
Dos capas, un criterio: **la capa verde es la lógica; el ribete coral es la empatía**.
Tono: primera persona, frases cortas, cero épica. Nada inventado.

## Las seis leyes del estilo
1. **Duotono estricto.** Verde `#215C50` + coral `#FF6D4D` sobre blanco. Nada más.
2. **Panel squircle con ribete desplazado.** Radio enorme; detrás, una copia coral del contorno desplazada hacia arriba. El ribete respira solo en la parte superior y las curvas.
3. **Círculos apilados.** Dos círculos desfasados, coral debajo, verde encima. Siempre en esquinas, nunca centrados.
4. **Montserrat única.** Mayúsculas, tracking amplio en títulos, `-0.045em` en display. Contraste por escala y aire, no por familias.
5. **Aire como material.** Márgenes grandes, bloques que respiran; el vacío es deliberado.
6. **Asimetría editorial.** Panel al 40.5 %, texto desde el 44 %; nada centrado. La tensión entre columnas es el layout.

## Paleta (solo tokens de `tokens.css`)
`--verde` #215C50 · `--verde-900` #0E2F28 · `--coral` #FF6D4D · `--coral-600` #E8552F · `--coral-700` #CC3F1C · `--tinta` #141414 · `--mute` #5C5C57 · `--papel` #FFFFFF · `--crema` #FBF7F2.
**Nunca texto blanco sobre coral.** Sobre coral va tinta. Todo texto coral sobre claro usa `--coral-700`.

## Tipografía
Montserrat 400/500/700/800. Display: mayúsculas, `line-height .86`, `letter-spacing -.045em`.
Kickers: 11 px, mayúsculas, `letter-spacing .24em`, 700. Cuerpo: 17–18 px, `line-height 1.65`, máx. 62 ch. Sin segunda familia; mono solo en etiquetas de 10–11 px.

## Layout y ritmo
Rejilla 12 columnas · `max-width 1440` · margen `clamp(20px,5vw,80px)` · gutter `clamp(16px,2vw,32px)`.
`padding-block: clamp(80px,10vw,160px)` en todas las secciones. Escala 4: 4 8 12 16 24 32 48 64 96 128 160.

## Movimiento
Solo `transform` y `opacity`. Scroll nativo. Máx. dos secciones pinned. `prefers-reduced-motion` elimina pinning, parallax y marquesina. Hover 160 ms; revelado 420 ms `cubic-bezier(.16,1,.3,1)`.

## Copy
Español. Prohibidas: «apasionado», «sinergia», «soluciones innovadoras», «llevar al siguiente nivel», «transformar ideas en realidad».
Cero lorem ipsum, cero placeholder visible, cero datos inventados. El copy aprobado vive en `src/content/site.ts`.

## Reglas de construcción
- Un agente, sus archivos. Nadie edita archivos ajenos.
- `src/styles/tokens.css`, `src/content/site.ts` y `src/layouts/Base.astro` están congelados: si falta un token, se pide.
- El sitio debe verse completo sin JavaScript. Las animaciones son mejora progresiva.
- Sin librerías de iconos, sin frameworks de UI, sin CSS-in-JS, sin CDN.
- Antes de declarar algo listo: captura revisada. Si no se vio renderizado, no se sabe.
