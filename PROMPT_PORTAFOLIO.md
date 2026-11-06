# PORTAFOLIO JOSÉ FERNÁNDEZ — Brief de arranque para la próxima sesión

> **Cómo usarlo:** pega este archivo completo como primer mensaje de la próxima sesión, con el directorio de trabajo en `/home/p0xd/Documentos/proyectos/Portfolio`. No requiere contexto previo: todo lo necesario está aquí dentro y en `reference/`.

---

## 0 · ROL Y MISIÓN

Actúa como **orquestador multiagente y desarrollador front-end de punta, con obsesión por el diseño de interfaces**. No eres un generador de plantillas: eres director de arte, ingeniero del sistema de diseño y responsable final de la calidad.

Construye el **portafolio web de José Fernández**, desarrollador móvil y diseñador UI/UX venezolano, a partir del ADN visual de su currículum. El CV está en `reference/` y es la **fuente de verdad del estilo**.

El éxito se mide en tres sensaciones, en este orden:

1. **A los 3 segundos** — «esto no es una plantilla».
2. **A los 30 segundos** — «está todo en su sitio, no sobra ni falta nada».
3. **A los 2 minutos** — «quiero ver el resto de la página y escribirle».

Regla de jerarquía, por encima de cualquier otra: **el estilo manda**. Si una decisión de contenido, de librería o de layout rompe el sistema visual, se cambia la decisión, no el sistema.

---

## 1 · REGLAS DE OPERACIÓN

- **Autonomía total.** No pidas confirmación para decidir. Decide, ejecuta, documenta el supuesto en una línea del `README.md`. Las aprobaciones interactivas están deshabilitadas: no uses escalado de sandbox ni comandos que las requieran.
- **No inventes hechos.** Ni proyectos, ni clientes, ni métricas, ni testimonios, ni logos. Lo que no esté en este brief o en `reference/jose-cv.txt` es un `TODO` honesto, no una invención.
- **Nada de lorem ipsum** en ningún estado del proyecto, ni siquiera temporal: el copy real está en el Anexo A.
- **Verifica con evidencia.** No declares nada «listo», «impecable» o «responsive» sin capturas propias revisadas con `read_image`. La regla es: **si no lo viste renderizado, no lo sabes**.
- **Mira antes de escribir.** Tu primera acción de diseño es abrir `reference/cv-render.png`, `reference/detail-panel-rim.png`, `reference/detail-icons.png` y `reference/detail-circles.png` con `read_image`. El estilo hay que verlo, no deducirlo.
- **Idioma:** copy del sitio en español; código, nombres de archivos y commits en inglés.
- **Sin despliegue externo** salvo petición expresa. El entregable corre en local.
- **Sin dependencias innecesarias.** Cada librería que entre debe justificarse en una frase o no entra.
- **Nada de trabajo a medias.** Si el tiempo aprieta, recorta alcance (menos secciones, mejor hechas), nunca calidad. Una sección perfecta vale más que cinco tibias.

---

## 2 · CONTEXTO DEL ENTORNO (verificado)

| Dato | Valor |
|---|---|
| Directorio de trabajo | `/home/p0xd/Documentos/proyectos/Portfolio` (vacío salvo `reference/`, sin git) |
| Node / pnpm | `v22.23.4` / `12.16.1` |
| Playwright | `1.65.0` con Chromium ya descargado en caché |
| Registro npm | accesible |
| Referencias visuales | `reference/cv-render.png`, `detail-panel-rim.png`, `detail-icons.png`, `detail-circles.png`, `jose-cv.pdf`, `jose-cv.txt` |

Inicializa git (`git init`) y haz un commit inicial limpio. Trabaja con commits pequeños y descriptivos.

---

## 3 · ADN VISUAL (extraído del CV, no interpretado)

El currículum no es una referencia de contenido: es el **sistema de diseño**. Todo lo que construyas debe poder reconocerse como el mismo autor.

### 3.1 Las seis leyes del estilo

1. **Duotono estricto.** Solo dos colores de marca: verde profundo `#215C50` y coral `#FF6D4D`, sobre blanco puro. Nada más. El coral nunca es decoración: es estructura (ribetes, discos, capas).
2. **Panel *squircle* con ribete desplazado.** Una forma de esquinas exageradamente redondeadas, y detrás una copia del mismo contorno en coral, desplazada hacia arriba. El ribete visible solo en la parte superior y en las curvas es la firma gráfica del autor.
3. **Círculos apilados.** Dos círculos que se solapan con desplazamiento, uno coral debajo y uno verde encima. Aparición siempre en esquinas, nunca en el centro.
4. **Tipografía única y mayúsculas generosas.** Montserrat en todo. Nombres y títulos de sección en mayúsculas, tracking amplio, peso 700–800. El contraste se logra con **escala y aire**, no con familias distintas.
5. **Aire como material.** Márgenes grandes, bloques que respiran, vacíos deliberados (el tercio superior del panel verde está vacío a propósito). La densidad nunca sube.
6. **Asimetría editorial.** Columna de color al 40.5 %, columna de texto al 46.5 % con margen derecho generoso. Nada está centrado. La tensión entre las dos columnas es el layout.

### 3.2 Proporciones del CV y su traducción a web

Medidas sobre el render (A4, 1241 px de ancho):

| Elemento | En el CV | Traducción web |
|---|---|---|
| Panel lateral | 40.5 % del ancho, alto completo | `clamp(320px, 34vw, 40.5%)`, full-bleed izquierda/arriba/abajo |
| Radio del panel | ≈ 0.40 × ancho del panel (200 px de 503) | `clamp(40px, 12vw, 180px)` solo en esquinas superiores |
| Ribete coral | ≈ 5.5 % del ancho (69 px), desplazado hacia arriba | `clamp(10px, 1.1vw, 18px)` de offset |
| Columna de texto | empieza en 44 %, termina en 90.5 % | 46.5 % de ancho, `padding-right` generoso |
| Nombre | alto de mayúscula ≈ 7.7 % del ancho | `font-size: clamp(4rem, 10.5vw, 9.5rem)`, `line-height: .86`, `letter-spacing: -.045em` |
| Título de sección | ≈ 3.5 % del ancho | `clamp(1.75rem, 3.1vw, 2.75rem)`, mayúsculas |
| Disco de icono | ≈ 5.2 % del ancho (64 px) | 40–56 px, coral, glifo blanco |
| Cuerpo | ≈ 18 px | 17–18 px, `line-height 1.65`, máx. 62 ch |

### 3.3 Paleta y reglas de contraste

Contrastes calculados (WCAG 2.2). **El coral puro falla como texto: 2.78:1.** Por eso el sistema separa coral-superficie de coral-tinta.

| Token | Hex | Sobre blanco | Uso permitido |
|---|---|---|---|
| `--verde` | `#215C50` | 7.75:1 ✅ | Texto principal, superficies oscuras |
| `--verde-900` | `#0E2F28` | 14.4:1 ✅ | Fondos de cierre, profundidad |
| `--coral` | `#FF6D4D` | 2.78:1 ❌ texto | **Solo forma/superficie grande.** Nunca texto sobre blanco, nunca texto blanco encima |
| `--coral-600` | `#E8552F` | 3.64:1 | Discos de icono y numerales con glifo blanco (gráfico ≥ 3:1 ✅) |
| `--coral-700` | `#CC3F1C` | 4.89:1 ✅ | **Todo texto coral sobre fondo claro.** Links, kickers, acentos tipográficos |
| `--tinta` | `#141414` | 18.4:1 ✅ | Texto de párrafo sobre blanco y sobre coral (6.62:1) |
| `--mute` | `#5C5C57` | 6.72:1 ✅ | Metadatos, años, pies |
| `--papel` | `#FFFFFF` | — | Lienzo base |
| `--crema` | `#FBF7F2` | — | Solo para alternar secciones, nunca junto a blanco puro en el mismo bloque |

Regla dura: **ningún texto blanco sobre coral**. Sobre coral va `--tinta`. Sobre verde va blanco (7.75:1 ✅).

### 3.4 Tipografía

```css
--fuente: "Montserrat Variable", "Montserrat", system-ui, sans-serif;
--mono: ui-monospace, "SF Mono", Menlo, monospace; /* solo etiquetas técnicas de 10–11px */
```

- Montserrat **exclusivamente** para display y texto. Pesos 400 / 500 / 700 / 800.
- Display: mayúsculas, `letter-spacing: -.045em`, `line-height: .86`.
- Kickers y etiquetas: 11 px, mayúsculas, `letter-spacing: .24em`, peso 700.
- Cuerpo: 17–18 px, `line-height: 1.65`, `max-width: 62ch`, `text-wrap: pretty`.
- Titulares: `text-wrap: balance`.
- Sin segunda familia tipográfica. La mono entra solo como susurro técnico (numeración, stacks, años), máximo 11 px, nunca en párrafos.
- Auto-hospedado con `@fontsource-variable/montserrat` (subset latin). Prohibido Google Fonts por CDN.

### 3.5 Motivos gráficos (el vocabulario propio)

- **Panel con ribete:** `border-radius` grande + `::before` coral desplazado. El ribete *respira* en scroll (ver §5).
- **Discos de capítulo:** círculo coral `--coral-600`, numeral blanco, 40–44 px. Sustituyen a los iconos del CV en los encabezados de sección.
- **Iconos de glifo:** trazo 1.5 px, `stroke-linecap: round`, viewBox 24, dibujados a mano en SVG (maletín, persona, engranaje, globo, birrete). Sin librería de iconos.
- **Círculos apilados:** siempre en una esquina, siempre con desplazamiento, nunca simétricos.
- **Línea de regla:** 1 px `rgba(33,92,80,.14)` para separar sin ruido.

### 3.6 Rejilla y ritmo

- Rejilla de 12 columnas, `max-width: 1440px`, márgenes `clamp(20px, 5vw, 80px)`, gutter `clamp(16px, 2vw, 32px)`.
- Escala de espacio base 4: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.
- **Ritmo de sección fijo:** `padding-block: clamp(80px, 10vw, 160px)`. Todas las secciones empiezan igual. La consistencia es lo que hace que se sienta «ordenado».
- Alineación auditada: kicker, título y primer párrafo comparten el mismo eje izquierdo en todas las secciones.

---

## 4 · CONCEPTO Y NARRATIVA

### 4.1 Concepto rector: **«Dos capas, un criterio»**

José es dos disciplinas en una persona. El CV ya lo dice gráficamente: un panel verde con un ribete coral detrás. El portafolio convierte esa forma en el argumento:

> **La capa verde es la lógica. El ribete coral es la empatía. Durante todo el scroll, se separan y se vuelven a tocar.**

Esto no es un adorno: es la tesis del sitio, el sistema de movimiento y el hilo conductor de las cinco secciones. Cada acto es un momento de esa relación.

### 4.2 Arquitectura de la página

Una sola página, cinco actos numerados, sin menú hamburguesa y sin subpáginas en la v1. La navegación es un **riel de capítulos** fijo a la derecha (01–05) con progreso coral.

| Acto | Sección | Función narrativa |
|---|---|---|
| — | **Hero** | Quién es, qué hace, qué sigue. En 3 segundos. |
| 01 | **El criterio** | La tesis: lógica + empatía. Aquí las dos capas se tocan. |
| 02 | **Trayectoria** | La prueba: experiencia y formación, sin adornos. |
| 03 | **Craft** | Las herramientas, ordenadas por oficio, no por moda. |
| 04 | **Trabajo** | Cinco proyectos, dos en producción. Honesto y abstracto. |
| 05 | **Contacto** | Cierre coral a sangre. Una sola acción. |

### 4.3 Copy aprobado (Anexo A tiene el texto completo)

- Tono: primera persona, frases cortas, cero épica. **Prohibidas** las palabras «apasionado», «sinergia», «soluciones innovadoras», «llevar al siguiente nivel», «transformar ideas en realidad».
- El sitio habla como José escribe: directo, con criterio, sin relleno.
- Cada sección tiene **una** idea. Si un párrafo no la sostiene, se corta.

### 4.4 Qué NO se puede inventar

- Nombres de proyectos, clientes, empresas o personas.
- Métricas («+40 % retención»), fechas exactas de inicio, años de fundación.
- Testimonios, logos, premios, certificaciones no listadas.
- Capturas de apps reales.

Los cinco proyectos serán **slots honestos** derivados del CV (IoT, educativa, multiplataforma, nativa, en producción), marcados internamente como borrador, con un `CONTENT_TODO.md` que liste exactamente qué datos y capturas debe enviar José para completarlos.

---

## 5 · SCROLL STORYTELLING

### 5.1 Principios

- **Scroll nativo siempre.** Prohibido el secuestro de rueda, el snap obligatorio y el scroll horizontal forzado. Lenis es opcional y, si entra, es solo suavizado: la rueda, el trackpad, el teclado y la barra siguen funcionando igual.
- **Máximo dos secciones pinned** en toda la página. El resto se revela.
- **Solo `transform` y `opacity`.** Nunca `top`, `height`, `filter` ni `backdrop-filter` en animación.
- **El movimiento explica, no decora.** Cada animación debe responder «¿qué me está contando?».
- **`prefers-reduced-motion` es un modo de primera clase**, no un parche: sin pinning, sin marquesina, sin parallax, revelados instantáneos.

### 5.2 Guion de movimiento, acto por acto

| Acto | Movimiento | Intención |
|---|---|---|
| Entrada | El nombre se revela por líneas con máscara (`clip-path`), 720 ms. El ribete coral «se dibuja» de izquierda a derecha. Sin pantalla de carga. | Llegada limpia; el sistema se presenta solo. |
| Hero → 01 | Al hacer scroll, el panel verde se comprime verticalmente y el ribete se separa 12 px más. Duración atada al scroll (`scrub: .8`). | Las dos capas empiezan a separarse: la tesis se abre. |
| 01 Criterio | Dos paneles superpuestos (verde y coral) entran desde lados opuestos y **terminan exactamente alineados**, con el ribete convertido en costura. | La lógica y la empatía se tocan. Es el clímax conceptual. |
| 02 Trayectoria | Columna izquierda sticky con el año/contador; la línea vertical se dibuja con `scaleY`; cada hito entra con stagger de 55 ms. | Progreso, sin prisa. |
| 03 Craft | Chips con ribete que crece en hover; marquesina lenta de herramientas con separadores coral, `pause` en hover. | Oficio, no vitrina. |
| 04 Trabajo | Tarjetas con revelado por `clip-path`; el ribete de cada tarjeta se desplaza 8 px al hover. Portadas abstractas compuestas en CSS. | Trabajo real, sin mockups de stock. |
| 05 Contacto | Sección coral a sangre. «HABLEMOS» entra en máscara, palabra por palabra. Botón magnético sutil (±6 px). | Cierre rotundo, una sola acción. |

### 5.3 Tokens de movimiento

```css
--e-out: cubic-bezier(.16, 1, .3, 1);
--e-inout: cubic-bezier(.65, 0, .35, 1);
--d-1: 160ms; --d-2: 240ms; --d-3: 420ms; --d-4: 720ms; --d-5: 1100ms;
--stagger: 55ms;
```

- Revelado estándar: `translateY(18px) + opacity 0→1`, 420 ms, `--e-out`.
- `scrub: 0.8`, `invalidateOnRefresh: true`, `ScrollTrigger.batch()` para listas.
- Micro-interacciones: hover de 160 ms, presión de 120 ms, foco visible inmediato.
- Nada de animaciones en bucle salvo la marquesina, y siempre pausable.

### 5.4 Micro-interacciones que suman sin ruido

- Copiar el email con confirmación de 1.2 s («copiado») y `aria-live="polite"`.
- Riel de capítulos que marca el acto activo con un punto coral y una línea de progreso de 1 px.
- Botones con desplazamiento de ribete de 3 px al hover (eco del panel).
- Cursor personalizado **solo** en punteros finos, y solo como mejora progresiva; nunca se oculta el cursor nativo en táctil ni con teclado.

---

## 6 · STACK TECNOLÓGICO

### Decisión

**Astro + TypeScript + Tailwind CSS v4 + GSAP (ScrollTrigger) + Lenis + Montserrat auto-hospedada.**

| Pieza | Versión objetivo | Por qué |
|---|---|---|
| `astro` | 7.x (última estable; verificar en el registro antes de instalar) | Salida estática, cero JS por defecto, LCP excelente, `content` collections para casos. |
| `typescript` | strict | Contratos claros entre componentes y datos. |
| `tailwindcss` + `@tailwindcss/vite` | 4.x | Tokens como CSS variables + utilidades; el sistema vive en CSS, no en un theme de librería. |
| `gsap` | 3.13+ | ScrollTrigger y SplitText (gratuitos desde 3.13). Estándar de facto para storytelling. |
| `lenis` | 1.x | Suavizado opcional, desactivable y desactivado bajo `prefers-reduced-motion`. |
| `@fontsource-variable/montserrat` | 5.x | Auto-hospedaje, subset latin, sin CDN. |
| `playwright` | ya instalado | Capturas y verificación visual. |

**Sin** frameworks de UI, sin librería de iconos, sin CSS-in-JS, sin CMS, sin animaciones de terceros.

**Por qué no Next.js:** el sitio es contenido estático con islas de movimiento; Next añade hidratación y peso sin beneficio aquí. **Por qué no Framer Motion:** GSAP resuelve mejor el scroll scrub y el timeline; elegir una sola herramienta de animación evita duplicidad.

> ⚠️ No asumas APIs de memoria: la versión instalada puede diferir de lo que recuerdas. Verifica contra `node_modules` o la documentación local y **compila temprano** (`pnpm build` en la primera hora, no al final).

### Fallback admitido

Si en 45 minutos el scaffold con framework no compila limpio, baja a **HTML + CSS + JS vanilla** con Vite y las mismas reglas de diseño. Es preferible un sitio impecable sin framework que un framework a medio andar. El diseño no se negocia; el stack sí.

### Estructura esperada

```
/
├── reference/                 # CV y recortes (no se toca)
├── src/
│   ├── components/            # Panel, SectionHeader, Disc, Button, Chip, Marquee, TimelineItem, CaseCard, ChapterRail, Footer
│   ├── layouts/               # Base.astro (meta, fuentes, skip-link)
│   ├── pages/                 # index.astro, og.png.ts (imagen OG)
│   ├── content/site.ts        # FUENTE ÚNICA de copy y datos (Anexo A)
│   ├── styles/tokens.css      # variables del sistema
│   └── scripts/motion.ts      # capa GSAP + Lenis, aislada
├── public/                    # favicon.svg, og-image
├── scripts/shots.mjs          # capturas Playwright
├── DESIGN.md                  # tokens, leyes, decisiones
├── CONTENT_TODO.md            # datos que faltan de José
└── README.md
```

### Presupuesto de rendimiento (gate duro)

| Métrica | Límite |
|---|---|
| JS inicial (gzip) | ≤ 110 KB |
| CSS (gzip) | ≤ 45 KB |
| Fuentes | ≤ 2 archivos, ≤ 70 KB total |
| LCP (4G simulada) | ≤ 2.0 s |
| CLS | ≤ 0.02 |
| Tareas largas durante scroll | ninguna > 80 ms |
| 60 fps | durante todo el scroll en desktop |

---

## 7 · PROTOCOLO DE ORQUESTACIÓN MULTIAGENTE

Trabaja en **cuatro fases con puertas de calidad**. No abras una fase hasta cerrar la anterior.

### Fase 0 — Lectura y sistema (tú, en solitario · 30 min)

1. Abre las cuatro imágenes de `reference/` con `read_image`. Escribe en `DESIGN.md` las seis leyes con tus palabras.
2. Confirma versiones reales del registro (`pnpm view <pkg> version`).
3. Escribe `src/styles/tokens.css` y `src/content/site.ts` completos.
4. Crea `BRIEF.md`: el ADN condensado en 40 líneas, que **todo subagente leerá primero**.
5. **Puerta:** paleta, tipografía y layout resueltos; cero decisiones visuales abiertas.

> Todo subagente nace sin contexto. `BRIEF.md` es el mecanismo para repartir el ADN sin repetirlo en cada prompt. Su primera línea, en cada prompt de delegación, es: «Lee `BRIEF.md` antes de escribir una línea».

### Fase 1 — Direcciones de arte (workflow · 3 agentes en paralelo · 40 min)

Tres prototipos **estáticos e independientes** del hero, en `explorations/a|b|c/index.html`, HTML+CSS puro, sin dependencias, sin tocar `src/`:

- **A · Cartel editorial:** tipografía enorme, panel lateral dominante, ribete como protagonista. La lectura más fiel al CV.
- **B · Lámina suiza:** retícula estricta, numeración, aire extremo, coral reducido a un solo gesto.
- **C · Escultura en capas:** círculos apilados, profundidad, paneles que se cruzan. La lectura más audaz.

Cada agente entrega: `index.html` autocontenido + 2 capturas (390 y 1440) + 5 líneas de intención. Tú las revisas con `read_image`, comparas y **eliges una o sintetizas**. Documenta la decisión en `DESIGN.md` en una frase.

**Puerta:** una dirección elegida; las otras dos se archivan, no se mezclan a medias.

### Fase 2 — Construcción (secuencial, con apoyo en paralelo · el grueso)

Construye tú la base (shell, tokens, `Panel`, `SectionHeader`, `Button`) y luego avanza acto por acto. En paralelo, y **solo para entregables de solo lectura**, lanza:

- un agente de **copy** que pula el Anexo A en `site.ts` (misma voz, sin inventar),
- un agente de **iconografía** que dibuje los cinco SVG en un archivo aislado.

Regla de propiedad: **un agente, sus archivos**. `tokens.css`, `site.ts` y `Base.astro` quedan congelados; ningún subagente los edita. Si alguien necesita un token nuevo, lo pide y lo aplicas tú.

Orden de construcción: shell → hero → 01 → 02 → 03 → 04 → 05 → footer → capa de movimiento. **Compila después de cada acto.** La capa GSAP se escribe al final, cuando el layout ya es sólido sin JS (el sitio debe verse completo con JS desactivado, solo sin animación).

**Puerta:** `pnpm build` limpio, sin warnings de tipos, capturas de los seis anchos revisadas por ti.

### Fase 3 — Auditoría adversarial (workflow · 4 agentes en paralelo · solo lectura)

Cuatro auditores independientes, cada uno devuelve hallazgos con severidad (`blocker | major | minor`) y evidencia (captura o selector):

1. **Accesibilidad y semántica** — contraste real medido, orden de foco, `aria`, landmarks, `lang`, teclado, zoom 200 %, `prefers-reduced-motion`.
2. **Rendimiento y movimiento** — presupuesto de §6, jank en scroll, `will-change` olvidados, listeners sin limpiar, CLS por fuentes.
3. **Visual y responsive** — 320 / 390 / 768 / 1024 / 1440 / 1920, alineación, ritmo vertical, desbordes horizontales, estados hover/focus/active.
4. **Copy y honestidad** — tono, clichés prohibidos, datos inventados, coherencia con el CV.

Tú corriges. **Un blocker sin resolver impide la entrega.**

### Fase 4 — Pulido y cierre (tú + 1 verificador)

Aplica correcciones, regenera capturas, pide a un verificador independiente que confirme cada blocker cerrado. Genera favicon, imagen OG, `README.md`, `CONTENT_TODO.md`. Arranca `pnpm preview` como job en segundo plano y entrega la URL local.

### Uso de la herramienta `workflow`

```js
phase('Direcciones');
const [a, b, c] = await parallel([
  () => agent(`${BRIEF}\n\nConstruye la dirección A ...`, { label: 'Dirección A', phase: 'Direcciones' }),
  () => agent(`${BRIEF}\n\nConstruye la dirección B ...`, { label: 'Dirección B', phase: 'Direcciones' }),
  () => agent(`${BRIEF}\n\nConstruye la dirección C ...`, { label: 'Dirección C', phase: 'Direcciones' }),
]);
```

- Un `agent()` por entregable autocontenido; el prompt incluye ruta, reglas y formato de salida exacto.
- No lances más de 4 agentes a la vez.
- Ningún subagente escribe en archivos de otro. Ninguno toca `src/styles` ni `src/content`.
- Los auditores **no arreglan nada**: solo reportan.

---

## 8 · BARRA DE CALIDAD (definición de hecho)

Todo lo siguiente debe ser verificable. Si algo no se puede comprobar, no cuenta.

**Diseño**
- [ ] La paleta no sale de los tokens en ningún punto (`grep` de hex fuera de `tokens.css` = 0).
- [ ] Solo una familia tipográfica.
- [ ] Ritmo vertical idéntico en las cinco secciones.
- [ ] El ribete coral aparece al menos en tres lugares distintos del recorrido.
- [ ] Ninguna sección parece «de otra web».

**Interacción**
- [ ] Scroll nativo intacto; teclado y barra funcionan.
- [ ] `prefers-reduced-motion: reduce` elimina pinning, parallax y marquesina.
- [ ] Foco visible en el 100 % de los interactivos (anillo `--coral-700` sobre claro, blanco sobre oscuro).
- [ ] Sin salto de layout en la carga de fuentes.

**Contenido**
- [ ] Cero lorem, cero placeholder visible, cero dato inventado.
- [ ] Cada sección sostiene una idea y una sola.
- [ ] `CONTENT_TODO.md` lista lo que falta, con formato exacto de lo que José debe enviar.

**Técnica**
- [ ] `pnpm build` limpio; sin `console.log` ni código muerto.
- [ ] Presupuesto de §6 cumplido y medido, no estimado.
- [ ] `git log` con commits legibles.
- [ ] `README.md` explica cómo correr, cómo construir y tres decisiones de diseño.

**Responsive**
- [ ] Sin scroll horizontal a 320 px.
- [ ] Capturas revisadas a 320 / 390 / 768 / 1024 / 1440 / 1920.
- [ ] El panel lateral se convierte en banda superior en móvil sin perder el ribete.

---

## 9 · ANTI-PATRONES (prohibidos de forma explícita)

- Degradados morados/azules tipo SaaS, glassmorphism, neón, sombras difusas grandes.
- Emojis como iconos. Iconos mezclados de dos librerías distintas.
- Grid de tres tarjetas como toda la página. Carruseles automáticos. Acordeones para ocultar contenido principal.
- Texto centrado por defecto. Simetría total. Secciones de altura fija que recortan contenido.
- «Scroll-jacking», snap obligatorio, parallax sobre texto de lectura.
- Contadores animados de métricas inventadas. Logos de clientes falsos. Testimonios ficticios.
- Pantalla de carga de más de 400 ms. Cursor personalizado en táctil.
- Formularios que no envían nada. Botones que no hacen nada. Enlaces `href="#"`.
- Copy con «apasionado por la tecnología», «soluciones innovadoras», «sinergia».
- Modo oscuro a medias. Selector de idioma que no traduce.
- Dependencias que se instalan «por si acaso».

---

## 10 · ENTREGABLES

1. **Sitio funcionando** en `http://localhost:4321` (job en segundo plano, `pnpm preview` sobre build de producción).
2. **Capturas** en `shots/`: 320, 390, 768, 1024, 1440, 1920, más una con `reduced-motion` y una de cada acto a 1440. Preséntalas.
3. **`DESIGN.md`** — tokens, seis leyes, decisión de dirección de arte, tres decisiones explicadas.
4. **`CONTENT_TODO.md`** — qué datos y capturas reales faltan, en formato copiable.
5. **`README.md`** — stack, comandos, estructura, decisiones.
6. **Informe final de 10 líneas** en el chat: qué se construyó, qué se midió, qué falta y qué decidiste sin consultar.

Cierre del mensaje final: una frase de qué hace único al sitio. Sin superlativos vacíos.

---

## 11 · PRIMER MOVIMIENTO

No respondas con un plan y te detengas. En tu primer turno:

1. Abre las cuatro imágenes de `reference/` con `read_image` (30 s).
2. Responde en **6 líneas máximo**: dirección de arte propuesta, stack confirmado con versiones reales, y el mayor riesgo.
3. Inicia la Fase 0 de inmediato: `git init`, scaffold, `tokens.css`, `site.ts`, `DESIGN.md`.

Sin preguntas de confirmación. Sin esperar permiso. Sin pedir aprobación de sandbox.

---

## ANEXO A · COPY Y DATOS (fuente de verdad)

Todo dato aquí es literal del CV. Lo que no está, no se inventa.

### Identidad

```
Nombre:      José Fernández
Rol:         Desarrollador Móvil & Diseñador UI/UX
Ubicación:   San Juan de los Morros, Guárico, Venezuela · UTC−4
Email:       josealejfer@gmail.com
Teléfono:    0412-442-0728
Handle:      @josealejfer
Idiomas:     Español (nativo) · Inglés (intermedio, B2)
Perfil:      +5 años en diseño · +7 meses en desarrollo móvil · +5 proyectos, 2 en producción
Tesis:       «Mantengo un equilibrio entre la lógica y la experiencia de usuario.»
```

### Hero

```
Kicker:    PORTAFOLIO — 2026
Nombre:    JOSÉ FERNANDEZ
Rol:       DESARROLLADOR MÓVIL & DISEÑADOR UI/UX
Titular:   Diseño la experiencia. Escribo el código que la sostiene.
Apoyo:     Apps nativas y multiplataforma. Interfaces que se sienten antes de entenderse.
CTA 1:     Ver el trabajo      → 01
CTA 2:     Hablemos            → 05
Meta:      San Juan de los Morros, VE · UTC−4
```

### 01 · El criterio

```
Kicker:   EL CRITERIO
Título:   La lógica y la empatía no compiten: se afinan.
Cuerpo:   Más de cinco años diseñando y siete meses llevando ese diseño a código
          móvil nativo y multiplataforma. No elijo bando: la app tiene que sentirse
          bien y sostenerse. Cada pantalla que entrego tiene una razón, y cada
          razón tiene una pantalla.
Stats:    +5 años diseñando · +7 meses programando · 5 proyectos, 2 en producción
Pie:      La capa verde es la lógica. El ribete coral es la empatía. Aquí se tocan.
```

### 02 · Trayectoria

```
Kicker:   TRAYECTORIA
Título:   Lo que he hecho, sin adornos.

Experiencia
  Desarrollador Móvil Multiplataforma — Sistemas Tecnológicos Alcaraván · 7 meses
   · Diseño de imágenes y vectores para la página web.
   · Edición de vídeos de usabilidad.
   · Tutorías de matemática en aulas universitarias.

Educación
  Ingeniería en Informática — UNERG · 9.º semestre, en curso
  English B2 Full Route — Platzi · 2022
  React Native para Principiantes — Midudev · 2025
  Android, Kotlin y Jetpack Compose Avanzado — Udemy · 2026
```

### 03 · Craft

```
Kicker:   CRAFT
Título:   La caja de herramientas, en orden.
Línea:    No colecciono frameworks. Elijo la herramienta que el problema pide.

Móvil     Kotlin · Jetpack Compose · React Native · XML
Web       HTML · Tailwind · JavaScript · React
Diseño    Figma · Inkscape
Proceso   Gitflow · Planificación activa · Prompt
Extras    Arduino · C++

Fortalezas: Aplicaciones IoT · Desarrollo móvil nativo · Multiplataforma ·
            Apps educativas · Gitflow y planificación activa
```

> En el CV, «Prompt» aparece como herramienta junto a Gitflow. Respétalo tal cual: es parte de su stack real y un guiño honesto a cómo trabaja.

### 04 · Trabajo

```
Kicker:   TRABAJO
Título:   Cinco proyectos. Dos en producción.
Cuerpo:   Cinco proyectos trabajados, dos ya viven en producción. Lo que sigue es
          el mapa: categoría, rol y stack. Sin métricas que no pueda demostrar.
```

Slots (contenido a completar, marcados como borrador en `site.ts`):

| # | Categoría | Estado | Nota |
|---|---|---|---|
| 1 | App multiplataforma | En producción | Sistemas Tecnológicos Alcaraván |
| 2 | App móvil nativa | En producción | Kotlin · Jetpack Compose · XML |
| 3 | Apps educativas | En desarrollo | React Native · IoT |
| 4 | Aplicación IoT | En desarrollo | Arduino · C++ |
| 5 | Interfaz / sistema | En desarrollo | Figma · Inkscape |

Cada tarjeta muestra: categoría, estado, stack y una portada **abstracta compuesta en CSS** (círculos apilados, paneles, retícula). Nada de capturas falsas. CTA: «Pedir el caso completo» → email con asunto prellenado.

### 05 · Contacto

```
Kicker:   CONTACTO
Titular:  HABLEMOS
Línea:    ¿Tienes una app que merece sentirse bien? Escríbeme.
Botón:    josealejfer@gmail.com  (copiar)
Meta:     0412-442-0728 · @josealejfer · San Juan de los Morros, VE
```

### Footer

```
Diseñado y construido por José Fernández.
Montserrat, #215C50, #FF6D4D y demasiadas revisiones.
© 2026 · Volver arriba
```

---

## ANEXO B · TOKENS LISTOS PARA PEGAR

```css
:root {
  /* Marca */
  --verde:        #215C50;
  --verde-700:    #17453B;
  --verde-900:    #0E2F28;
  --coral:        #FF6D4D;  /* solo superficies grandes */
  --coral-600:    #E8552F;  /* discos con glifo blanco */
  --coral-700:    #CC3F1C;  /* texto coral sobre claro — AA */
  --tinta:        #141414;
  --mute:         #5C5C57;
  --papel:        #FFFFFF;
  --crema:        #FBF7F2;
  --linea:        rgba(33, 92, 80, .14);
  --linea-oscura: rgba(255, 255, 255, .16);

  /* Tipografía */
  --fuente:  "Montserrat Variable", "Montserrat", system-ui, sans-serif;
  --mono:    ui-monospace, "SF Mono", Menlo, monospace;

  --t-display: clamp(4rem, 10.5vw, 9.5rem);
  --t-h1:      clamp(2.5rem, 5.2vw, 4.5rem);
  --t-h2:      clamp(1.5rem, 2.4vw, 2rem);
  --t-h3:      clamp(1.125rem, 1.5vw, 1.375rem);
  --t-lead:    clamp(1.0625rem, 1.35vw, 1.3125rem);
  --t-body:    1.0625rem;
  --t-small:   .875rem;
  --t-label:   .6875rem;

  --track-display: -.045em;
  --track-label:    .24em;

  /* Geometría */
  --r-xs: 8px;  --r-sm: 14px; --r-md: 22px;
  --r-lg: 34px; --r-xl: 52px;
  --r-panel: clamp(40px, 12vw, 180px);
  --rim: clamp(10px, 1.1vw, 18px);

  /* Espacio */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px;
  --s-6: 24px; --s-8: 32px; --s-12: 48px; --s-16: 64px;
  --s-24: 96px; --s-32: 128px; --s-40: 160px;
  --seccion: clamp(80px, 10vw, 160px);

  /* Layout */
  --ancho: 1440px;
  --margen: clamp(20px, 5vw, 80px);
  --gutter: clamp(16px, 2vw, 32px);
  --panel: clamp(320px, 34vw, 40.5%);

  /* Movimiento */
  --e-out: cubic-bezier(.16, 1, .3, 1);
  --e-inout: cubic-bezier(.65, 0, .35, 1);
  --d-1: 160ms; --d-2: 240ms; --d-3: 420ms; --d-4: 720ms; --d-5: 1100ms;
  --stagger: 55ms;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## ANEXO C · SCRIPT DE CAPTURAS

```js
// scripts/shots.mjs — node scripts/shots.mjs
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const URL = process.env.URL ?? 'http://localhost:4321';
await mkdir('shots', { recursive: true });

const browser = await chromium.launch();
const viewports = [320, 390, 768, 1024, 1440, 1920];

for (const width of viewports) {
  const page = await browser.newPage({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `shots/${width}.png`, fullPage: true });
  await page.close();
}

const reduced = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
await reduced.goto(URL, { waitUntil: 'networkidle' });
await reduced.screenshot({ path: 'shots/reduced-motion.png', fullPage: true });

await browser.close();
console.log('Capturas listas en shots/');
```

Uso: `pnpm preview --port 4321` en segundo plano, luego `node scripts/shots.mjs`, y **revisar cada PNG con `read_image`**. Ancho de 320 px: mirar explícitamente que no haya scroll horizontal.

---

## ANEXO D · MEDICIÓN DE CONTRASTE (para no autoengañarse)

```js
const lum = h => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
    .map(c => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return ((x + .05) / (y + .05)).toFixed(2);
};
// ratio('#CC3F1C', '#FFFFFF') → '4.89' ✅
// ratio('#FF6D4D', '#FFFFFF') → '2.78' ❌ no usar como texto
```

Si un par de colores no pasa, se cambia el color, no el requisito.

---

**Fin del brief.** Empieza por mirar `reference/cv-render.png`. El resto es ejecución.
