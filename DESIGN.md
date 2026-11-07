# DESIGN · Dos capas, un criterio

El CV de José no se usa como referencia de contenido: se usa como sistema de diseño.
Todo lo de este sitio tiene que poder reconocerse como el mismo autor.

## Las seis leyes, con mis palabras

1. **Duotono estricto.** Verde profundo y coral sobre blanco. No hay tercer color, ni
   siquiera «casi negro azulado». El coral nunca decora: sostiene la estructura
   (ribete, discos, capas). Cuando el coral tiene que decir algo, baja a `--coral-700`
   para que se pueda leer.
2. **El panel y su ribete.** Una forma de esquinas exageradas y, detrás, la misma forma
   en coral desplazada hacia arriba. El ribete solo asoma arriba y en las curvas; si se
   viera entero sería un borde, no un ribete. Es la firma.
3. **Círculos apilados.** Dos círculos desfasados, coral detrás, verde delante. Siempre
   en una esquina, siempre cortados por un borde. Nunca centrados, nunca simétricos.
4. **Una sola tipografía.** Montserrat para todo. El contraste viene del tamaño y del
   aire, no de mezclar familias. Mayúsculas y tracking cerrado en display; tracking
   abierto solo en etiquetas pequeñas.
5. **El aire es material.** Los bloques respiran y hay vacíos deliberados. El tercio
   superior del panel verde está vacío porque es parte de la composición, no un hueco
   por rellenar.
6. **Asimetría editorial.** Panel a la izquierda, texto desplazado a la derecha, margen
   derecho generoso. Nada centrado por defecto. La tensión entre las dos columnas es
   el layout; si se centra, se pierde.

## Tokens

La paleta, la escala tipográfica, la geometría del ribete, el espacio y las curvas de
movimiento viven en `src/styles/tokens.css`, y solo ahí. Regla operativa: `grep -n
"#[0-9a-fA-F]\{3,6\}" src/styles --include=*.css` devuelve únicamente `tokens.css`.

| Rol | Token | Uso |
|---|---|---|
| Verde de marca | `--verde` | Texto principal, panel, superficies |
| Verde profundo | `--verde-900` | Cierre y profundidad |
| Coral superficie | `--coral` | Ribete, capas, sección de cierre. Nunca texto |
| Coral disco | `--coral-600` | Discos con glifo blanco (gráfico, 3.64:1) |
| Coral tinta | `--coral-700` | Todo texto coral sobre claro (4.89:1) |
| Tinta | `--tinta` | Párrafo; también sobre coral (6.62:1) |
| Mute | `--mute` | Metadatos y pies (6.72:1) |
| Papel / crema | `--papel`, `--crema` | Lienzo y alternancia |

Geometría clave: `--r-panel` (radio del squircle), `--rim` (desplazamiento del ribete),
`--panel` (ancho de la columna de color), `--seccion` (ritmo vertical), `--e-out` y
`--stagger` (movimiento).

## Tipografía

Montserrat Variable, subset latin, auto-hospedada (37 KB, un archivo, `font-display:
swap`, preload). Pesos 400/500/700/800. Display en mayúsculas con `line-height .86` y
`letter-spacing -.045em`; el nombre del hero se dimensiona con `cqw` sobre su propia
columna para que siempre llene el ancho disponible sin desbordar ni encoger de más.
La mono solo aparece en etiquetas de 10–11 px (numeración, años, índices).

## Dirección de arte

**Elegida: A · Cartel editorial, sintetizada con el vocabulario de capas de C.**

El CV ya es un cartel: una hoja con un panel de color a sangre y un nombre enorme. La
web no lo reinterpreta: lo pone en movimiento. La dirección A gana porque conserva la
proporción 40.5 / 46.5, el ribete y la jerarquía tipográfica sin añadir un lenguaje
nuevo. De C se toma solo una cosa: los círculos apilados y las capas que se cruzan,
siempre en esquinas, para que el scroll pueda separar el ribete del panel y volver a
tocarlo. B se archiva porque su retícula fría diluía la firma del autor.

De A se conserva también la firma del CV que casi se pierde: **JOSÉ en verde y
FERNANDEZ en `--coral-700`**. El nombre entero es la tesis: dos capas, un criterio.
En Trabajo, NotiFast y Krizo entran como casos destacados: la captura de la landing de
NotiFast y la pieza publicitaria de Krizo, cada una en un marco neutro, con su logo y su
copy. Las fichas de Alcaraván —Asistencia, Control y Robótica— usan sus imágenes reales
y no ofrecen CTA por confidencialidad; Monitoreo atmosférico conserva la portada abstracta
y el CTA. NotiFast alterna imagen izquierda/texto derecha; Krizo invierte el orden y usa
su logo como título visible.
Las tres exploraciones están en `explorations/`; la elegida se reconstruye en
`src/` con el sistema real, no se copia el prototipo.

## Accesibilidad del sistema

El coral puro (2.78:1) no se usa como tinta. Sobre blanco, todo coral es `--coral-700`
(4.89:1); sobre crema, 4.58:1; sobre coral, tinta (6.62:1) o verde-900 (5.18:1). El
blanco al 72 % sobre verde queda en 4.90:1 para las etiquetas de 11 px. **Los discos de
capítulo bajaron de `--coral-600` a `--coral-700`**: el numeral blanco de 12 px sobre
coral-600 daba 3.64:1 y no pasaba AA; sobre coral-700 da 4.89:1. `--coral-600` queda
reservado para puntos gráficos de 4–7 px (separadores, hitos), donde el requisito es
3:1. Medición reproducible: `node scripts/audit-contrast.mjs` (18/18 pares). El riel mide
24×24 px, invierte sus tintas sobre el coral del cierre y su anillo de foco pasa a
verde-900; el skip-link usa un anillo doble (blanco + coral) para no perderse ni sobre
blanco ni sobre el panel verde. El email del cierre es un botón de copiar con nombre y
rol correctos, y conserva un `mailto:` real como fallback sin JavaScript. La captura de
NotiFast lleva alt descriptivo; su logo es decorativo junto al título; «Ver landing» y
«notifast.pages.dev» avisan en su nombre accesible que abren pestaña nueva. Krizo lleva
alt en la pieza publicitaria y el logo es el título visible con alt «Krizo»; sin enlace
público, su único CTA es el email. Las imágenes de Alcaraván llevan alt descriptivo y sus
fichas, por confidencialidad, no ofrecen CTA; Monitoreo atmosférico conserva el suyo.

## Tres decisiones explicadas

1. **El ribete es el sistema de movimiento, no un adorno.** En el hero el panel verde se
   comprime y el ribete se separa al hacer scroll; en «El criterio» las dos capas llegan
   desde lados opuestos y terminan alineadas. El movimiento cuenta la tesis (lógica +
   empatía) y se apaga por completo con `prefers-reduced-motion`. No hay animación que
   no responda a esa relación.
2. **El sitio funciona sin JavaScript.** El HTML y el CSS resuelven el 100 % del layout y
   del contenido; GSAP y Lenis solo añaden la capa de movimiento. Si el JS falla, no hay
   huecos ni texto invisible: la página se lee completa. Esto también protege el LCP y
   permite que el scroll sea siempre nativo.
3. **NotiFast, Krizo y las fichas de Alcaraván tienen material real; Monitoreo
   atmosférico conserva la portada abstracta.** NotiFast tiene logo, captura de landing,
   métricas del CV y enlace público. Krizo tiene logo, pieza publicitaria y copy de
   proyecto universitario en React Native para grúas, mecánicos y tiendas de repuesto.
   Asistencia y geocercas lleva la ficha del App Store; Control de acceso y Robótica
   educativa llevan sus portadas de producto. Las tres, al ser de empresa, no ofrecen
   CTA. Monitoreo atmosférico mantiene título descriptivo, portada abstracta y CTA hasta
   que José envíe su imagen y confirme el permiso. No hay capturas falsas ni clientes
   inventados; `CONTENT_TODO.md` dice qué falta. Prefiero cinco materiales reales y una
   portada honesta a seis ficciones bien maquetadas.

## Antipatrones que este sistema evita

Degradados y glassmorphism; coral como texto claro; emojis; dos familias; rejilla de
tres tarjetas como página entera; contadores de métricas inventadas; scroll secuestrado;
formularios que no envían; `href="#"`.
