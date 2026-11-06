# CONTENT_TODO · actualización CV 2026 + NotiFast

El sitio ya usa el **CV 2026** (`reference/jose-cv-2026.txt`) y los activos reales de
**NotiFast** (`public/projects/notifast-logo.webp` y `notifast-landing.jpg`). NotiFast es
el caso destacado con logo, captura de landing, métricas del CV y enlace público. Los
otros cinco proyectos salen del CV, pero varios usan **títulos descriptivos** y **portadas
abstractas** hasta recibir el material definitivo. Nada de esto se inventa: lo que falta
se pide aquí.

---

## 1 · NotiFast · ya integrado, falta confirmar

Recibido y publicado:

- [x] Logo real → `public/projects/notifast-logo.webp` (750×750).
- [x] Captura de la landing → `public/projects/notifast-landing.jpg` (1400×782, recortada
      de la PNG original de 1836×1026; 921 KB → 109 KB).
- [x] Stack, 26 pantallas, 805 pruebas unitarias, 100 % offline, autoría propia, APK v1.0 RC
      y `notifast.pages.dev`, tomados del CV y de la propia landing.
- [x] Enlace del proyecto a https://notifast.pages.dev.

Confirmar:

- [ ] ¿El logo y la captura son de tu autoría y se pueden publicar en el portafolio?
      (Entiendo que sí: NotiFast es autoría propia).
- [ ] ¿El estado correcto es **«Publicada · v1.0 RC»** o prefieres «En producción» /
      «Beta» / «En desarrollo»?
- [ ] ¿Las **26 pantallas**, las **805 pruebas** y el **100 % offline** siguen siendo
      exactos? ¿Hay una versión posterior a la v1.0 RC?
- [ ] ¿La URL `https://notifast.pages.dev` es la definitiva?
- [ ] Si actualizas la landing, envíame una captura 1400×782 (o la PNG original) y la
      sustituyo; el CSS ya está preparado.

---

## 2 · Los otros cinco proyectos

Todos salen del CV 2026, pero algunos **no tienen nombre de producto** en el CV y usan un
título descriptivo. No inventé nombres de cliente ni capturas. Completar por ficha:

```
Proyecto:
Nombre real del producto (o confirmar el descriptivo):
Cliente / empresa / institución y permiso para nombrarlo:
Una frase de qué hace:
Rol exacto de José:
Stack confirmado:
Estado: en producción / en desarrollo / entregado / implementado / pausado
Enlace público o tienda (si existe):
Capturas reales (2–3, 16:10 o 4:3, sin datos de terceros):
Métricas demostrables (opcional; si no hay, se omite):
```

| # | Título actual (descriptivo) | Categoría | Estado actual | Stack | Falta |
|---|---|---|---|---|---|
| 02 | Asistencia y geocercas | App multiplataforma | En producción* | React Native · Zero Trust · Odoo · Geocercas | Nombre real, confirmar estado, permiso Alcaraván, capturas |
| 03 | Asistencia Vial | App móvil nativa | Desarrollada | Kotlin · Android · Figma | Confirmar «Ecosistema de Asistencia Vial», estado, capturas |
| 04 | Control de acceso | Sistema IoT | En producción* | Kotlin · ESP32 · C++ · WebSockets | Nombre real, confirmar estado, permiso, capturas |
| 05 | Robótica educativa | App educativa | Desarrollada | Kotlin · Jetpack Compose · Arduino CLI · WebSockets | Nombre real, confirmar estado, permiso del Ministerio, capturas |
| 06 | Monitoreo atmosférico | Aplicación IoT | Implementada | Kotlin · Vico · IoT | Nombre real, confirmar estado, capturas |

\* **«En producción»** en 02 y 04 viene del brief anterior y del hecho de que Alcaraván es
tu empleo actual; el CV 2026 no lo dice con esas palabras. Confírmalo o cámbialo por
«Desarrollada» / «Implementada». Los estados 03/05/06 usan los verbos del propio CV
(«desarrolló», «implementó»).

- [ ] ¿Son **seis** los proyectos que quieres mostrar o hay más? El titular dice «Seis
      proyectos. Del diseño al código.». Si hay más, se actualiza el titular.
- [ ] ¿La nota «Empresa: Sistemas Tecnológicos Alcaraván» se puede mantener en 02, 04, 05
      y 06? El nombre ya está en Trayectoria desde el CV; en las tarjetas identifica a la
      empresa, no a un cliente.
- [ ] ¿La nota «Empresa: Alcaraván · Ministerio de Ciencia y Tecnología» de 05 es correcta?
      Si no hay permiso del Ministerio, se deja solo Alcaraván o se retira.
- [ ] ¿Quieres que Asistencia Vial lleve alguna nota de autoría o cliente? Hoy no lleva.

---

## 3 · Trayectoria, fechas y educación

- [ ] **Alcaraván:** el CV dice «Febrero 2026 – Presente»; el resumen dice 9 meses. ¿Son
      correctos? ¿La fecha de inicio es febrero de 2026?
- [ ] **Freelance:** «2021 – Presente (5 años)». ¿Es correcto?
- [ ] **Ingeniería de Sistemas (10.º semestre):** confirmar el nombre exacto del grado
      (el CV anterior decía «Ingeniería en Informática») y si sigue en curso.
- [ ] **«Ingeniero de Sistemas»** aparece en tu cabecera, pero el resumen te describe como
      estudiante de último semestre. ¿Prefieres «Ingeniero de Sistemas en formación»,
      «Estudiante de Ingeniería de Sistemas» o mantener el título tal cual?
- [ ] **Especialización y Desarrollo Móvil con React Native (Udemy, 2025–2026):** ¿sigue
      en curso o ya terminó?
- [ ] Fechas de graduación estimadas, si quieres mostrarlas.

---

## 4 · Contacto, sitio y foto

- [ ] El CV 2026 no incluye **@josealejfer**; el sitio lo conserva del CV anterior.
      ¿Sigue activo? ¿Lo dejo, lo cambio o lo quito?
- [ ] Confirmar que `josealejfer@gmail.com`, `0412-442-0728`, «San Juan de los Morros,
      Guárico, Venezuela · UTC−4» y `notifast.pages.dev` son los datos públicos.
- [ ] **Dominio propio** para el portafolio: hoy el canonical y el OG apuntan a
      `http://localhost:4321`. Con el dominio se actualiza una línea de
      `astro.config.mjs` y se regenera la OG.
- [ ] ¿Se publica en Cloudflare Pages, Vercel, Netlify o GitHub Pages? El build es
      estático.
- [ ] ¿Quieres una **foto de retrato**? El diseño no la necesita; si entra, que sea propia,
      vertical y con fondo neutro.
- [ ] ¿LinkedIn, GitHub, Behance u otro enlace que quieras añadir junto al email?

---

## 5 · Copy y coherencia

- [ ] El titular de Trabajo pasó de «Cinco proyectos. Dos en producción.» a **«Seis
      proyectos. Del diseño al código.»**. Confirmar el número y el tono.
- [ ] El párrafo de Trabajo dice «categoría, estado y el stack confirmado» (el brief
      anterior decía «rol»). Se alineó con lo que muestran las tarjetas; confirmar.
- [ ] Las tarjetas 02–06 usan títulos descriptivos. Si tienes los nombres reales, se
      sustituyen en `src/content/site.ts` sin tocar el diseño.
- [ ] La ficha de NotiFast muestra **26 pantallas · 805 pruebas unitarias · 100 % offline**.
      Son datos del CV; confirmar que se pueden publicar.
- [ ] ¿Hay algún cliente, premio, certificación o testimonio que quieras añadir? Solo con
      permiso y cita textual; no se inventará nada.
- [ ] ¿Versión en inglés? Hoy no hay selector de idioma porque no hay traducción completa.

---

## 6 · Plantilla de email

```
Asunto: Material para el portafolio — CV 2026 y proyectos

Hola José:

El portafolio ya está actualizado con el CV 2026 y NotiFast (logo + landing). Para cerrar
las otras cinco fichas necesito:

1. Por cada proyecto: nombre real del producto, cliente/institución y permiso para
   nombrarlo, una frase de qué hace, tu rol, stack confirmado, estado real, enlace si
   existe y 2–3 capturas propias (sin datos de terceros).
2. Confirmar si son seis proyectos o hay más.
3. Confirmar fechas de Alcaraván (febrero 2026–presente) y del freelance (2021–presente).
4. Confirmar el grado exacto, el 10.º semestre y si quieres el título «Ingeniero de
   Sistemas» o «en formación».
5. Confirmar @josealejfer, teléfono, email, ubicación, notifast.pages.dev y dominio propio.
6. Confirmar que puedo publicar el logo y la landing de NotiFast, y las métricas 26 / 805 /
   100 % offline.

Lo que no llegue se queda como ficha con portada abstracta o se omite; no se rellena con
suposiciones.
```

---

## Estado del repositorio

- **NotiFast**: integrado con activos reales y enlace; `draft: false` en `site.ts`.
- **02–06**: datos del CV 2026, títulos descriptivos y portadas abstractas; `draft: true`.
- **Imágenes**: 2 archivos (109 KB + 52 KB), lazy, con `width`/`height` para no mover el
  layout.
- **Fuente de verdad**: `reference/jose-cv-2026.txt` y `src/content/site.ts`.
- **Pendiente técnico**: dominio de producción, canonical/OG absolutos, foto opcional y
  confirmaciones de esta lista.
- Las capturas actualizadas están en `shots/`.
