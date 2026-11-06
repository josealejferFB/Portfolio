# CONTENT_TODO · lo que falta para cerrar el portafolio

El sitio no inventa proyectos, clientes, métricas ni capturas. Los cinco casos de
**Trabajo** son slots honestos marcados `draft: true` en `src/content/site.ts`; muestran
categoría, estado y el stack confirmado del CV. Para convertirlos en casos reales, José debe
enviar lo siguiente. Todo lo marcado como «confirmar» es un dato que hoy no está en el
CV y que no se ha rellenado por suposición.

---

## 1 · Los cinco casos

Para **cada** slot, enviar este bloque rellenado (copiar/pegar cinco veces):

```
Caso 01 · App multiplataforma
Nombre real del proyecto:
Una frase de qué hace (máx. 140 caracteres):
Rol exacto de José:
Stack confirmado:
Estado: en producción / en desarrollo / pausado
Año o periodo (opcional, solo si es exacto):
Enlace público o tienda (si existe):
Métricas demostrables (opcional; si no hay, se omite):
Permiso para nombrar al cliente: sí / no
Capturas reales (2–3, 16:10 o 4:3, sin contraseñas ni datos personales):
¿Se puede usar el nombre «Sistemas Tecnológicos Alcaraván»? (solo caso 01):
```

Estado actual de cada slot y lo que falta:

| # | Categoría | Estado actual | Stack actual | Falta |
|---|---|---|---|---|
| 01 | App multiplataforma | En producción | **Por confirmar** | Nombre, stack, descripción; confirmar la publicación de «Empresa: Sistemas Tecnológicos Alcaraván»; capturas |
| 02 | App móvil nativa | En producción | Kotlin · Jetpack Compose · XML | Nombre, descripción, capturas |
| 03 | Apps educativas | En desarrollo | React Native · IoT | Nombre, descripción, estado real, capturas |
| 04 | Aplicación IoT | En desarrollo | Arduino · C++ | Nombre, descripción, estado real, capturas |
| 05 | Interfaz / sistema | En desarrollo | Figma · Inkscape | Nombre, descripción, estado real, capturas |

> **Caso 01:** el CV solo dice «Sistemas Tecnológicos Alcaraván · 7 meses». No hay stack,
> nombre de producto ni descripción. Se dejó el stack vacío a propósito; no se inventó.
> La tarjeta lo presenta como «Empresa: …» (dato del CV), no como cliente del proyecto.
> Si no se puede publicar el nombre, se retira la nota.

**Capturas:** si no hay capturas usables, se conserva la portada abstracta en CSS. Nunca
se simulan pantallas de apps reales. Si hay capturas, que sean propias, sin datos de
terceros y con permiso de publicación.

---

## 2 · Trayectoria

El CV solo da duraciones y años, no fechas exactas:

- [ ] Experiencia en Sistemas Tecnológicos Alcaraván: mes/año de inicio y fin (hoy dice
      «7 meses»). ¿Sigue activa?
- [ ] Ingeniería en Informática (UNERG): ¿sigue en 9.º semestre? ¿Fecha estimada de
      graduación? (hoy dice «9.º semestre · en curso»).
- [ ] English B2 Full Route (Platzi, 2022), React Native para Principiantes (Midudev,
      2025), Android/Kotlin/Jetpack Compose Avanzado (Udemy, 2026): confirmar años.
- [ ] Semestre exacto si se quiere mostrar; hoy se usa el del CV.

No se añadirán fechas, cargos ni empresas que no estén confirmados.

---

## 3 · Contacto y datos personales

- [ ] Confirmar que el email `josealejfer@gmail.com` es el público y actual.
- [ ] Confirmar que el teléfono `0412-442-0728` se puede publicar tal cual.
- [ ] Confirmar el handle `@josealejfer` y, si hay, URL de LinkedIn/GitHub/Behance.
- [ ] Confirmar la ubicación pública: «San Juan de los Morros, Guárico, Venezuela ·
      UTC−4».
- [ ] ¿Se quiere añadir una foto de retrato? El diseño actual no la necesita; si entra,
      debe ser una foto propia con encuadre vertical y fondo neutro.

---

## 4 · Producción y metadatos

- [ ] **Dominio real** para el sitio. Hoy `astro.config.mjs` usa
      `http://localhost:4321` como `site`, y por tanto el canonical y `og:image`
      apuntan a localhost. Con el dominio se actualiza una línea.
- [ ] ¿Se publica en Vercel/Netlify/GitHub Pages? El build es estático; solo hace falta
      el destino.
- [ ] Revisar `public/og.png` (1200×630). Si se cambia el copy del hero, se regenera con
      `node scripts/og.mjs`.
- [ ] Favicon: se usa el squircle verde/coral en `public/favicon.svg`. ¿Se quiere un
      monograma «JF»?

---

## 5 · Copy y estilo

- [ ] **FERNANDEZ sin tilde** en el hero: es la estilización del CV. Confirmar que se
      mantiene; si se prefiere «FERNÁNDEZ», se cambia en `site.nameDisplay` (una línea)
      y se regenera la OG.
- [ ] Revisar que las palabras «Prompt» (herramienta) y «Gitflow» se mantengan tal cual
      aparecen en el CV. Hoy sí.
- [ ] ¿Se quiere una versión en inglés? Hoy no hay selector de idioma; añadirlo sin
      traducir todo sería un antipatrón. Si hay versión inglesa completa, se integra.
- [ ] ¿Testimonios? No se usan. Si existen, deben ser reales, con nombre, cargo, permiso
      y cita textual; no se inventarán.
- [ ] ¿Métricas de impacto? Solo si son demostrables y con contexto. Hoy no hay ninguna
      y no se muestran contadores de humo.
- [ ] ¿Son exactamente cinco proyectos o «+5»? El CV dice «+5 proyectos trabajados»; el
      brief usa «5» y la página titula «Cinco proyectos. Dos en producción.». Si son más,
      se corrige el titular y el stat.
- [ ] ¿Las tutorías de matemática fueron parte del rol en Alcaraván o una actividad
      independiente? El CV las agrupa en el mismo bloque; hoy se leen como parte del rol.
      Si fueron independientes, se etiquetan aparte sin inventar fechas ni empresa.

---

## 6 · Plantilla de email para enviarlo

```
Asunto: Material para el portafolio — José Fernández

Hola José:

Para cerrar los cinco casos del portafolio necesito esto, en el orden que puedas:

1. Por cada proyecto: nombre real, una frase de qué hace, tu rol, stack confirmado,
   estado, enlace si existe y 2–3 capturas propias (sin datos de terceros).
2. El stack y el nombre del caso 01 (Alcaraván) y si puedo nombrar al cliente.
3. Fechas exactas de la experiencia y de la formación (hoy solo tengo duraciones/años).
4. Confirmación del email, teléfono, handle, ubicación y enlaces sociales.
5. Dominio y destino de despliegue.
6. Confirmación de «FERNANDEZ» sin tilde en el hero.

Lo que no llegue se queda como slot honesto o se omite; no se rellena con suposiciones.
```

---

## Estado del repositorio

- Los cinco casos siguen `draft: true`.
- El sitio se entrega sin despliegue externo, en local.
- `README.md` documenta stack, comandos, estructura y decisiones.
- Las capturas de `shots/` son la evidencia visual de la entrega actual.
