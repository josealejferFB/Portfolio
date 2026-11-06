/**
 * FUENTE ÚNICA DE COPY Y DATOS DE CONTENIDO.
 * Nada inventado: el texto proviene del brief aprobado y de reference/jose-cv.txt.
 * Lo que falta se marca en CONTENT_TODO.md, no se rellena. Las etiquetas de
 * control (saltar, capítulos, pausar) viven con su componente, no aquí.
 */

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface Milestone {
  readonly index: string;
  readonly kind: "Experiencia" | "Formación";
  readonly title: string;
  readonly org: string;
  readonly meta: string;
  readonly points: readonly string[];
}

export interface SkillGroup {
  readonly label: string;
  readonly skills: readonly string[];
}

export interface CaseSlot {
  readonly index: string;
  readonly category: string;
  readonly status: "En producción" | "En desarrollo";
  readonly stack: readonly string[];
  readonly note?: string;
  readonly cover: "plataforma" | "nativa" | "educativa" | "iot" | "sistema";
  /** Los cinco casos son slots honestos: José debe enviar el material real. */
  readonly draft: true;
}

export interface Chapter {
  readonly number: string;
  readonly id: string;
  readonly label: string;
}

export const site = {
  lang: "es",
  name: "José Fernández",
  nameDisplay: ["JOSÉ", "FERNANDEZ"],
  role: "Desarrollador móvil & diseñador UI/UX",
  roleDisplay: "DESARROLLADOR MÓVIL & DISEÑADOR UI/UX",
  email: "josealejfer@gmail.com",
  phone: "0412-442-0728",
  handle: "@josealejfer",
  location: {
    city: "San Juan de los Morros",
    region: "Guárico",
    country: "Venezuela",
    short: "San Juan de los Morros, VE",
    timezone: "UTC−4",
  },
  tesis: "Mantengo un equilibrio entre la lógica y la experiencia de usuario.",
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Intermedio · B2" },
  ],
  chapters: [
    { number: "01", id: "criterio", label: "El criterio" },
    { number: "02", id: "trayectoria", label: "Trayectoria" },
    { number: "03", id: "craft", label: "Craft" },
    { number: "04", id: "trabajo", label: "Trabajo" },
    { number: "05", id: "contacto", label: "Contacto" },
  ] satisfies readonly Chapter[],

  hero: {
    kicker: "PORTAFOLIO — 2026",
    headline: "Diseño la experiencia. Escribo el código que la sostiene.",
    support:
      "Apps nativas y multiplataforma. Interfaces que se sienten antes de entenderse.",
    ctaPrimary: { label: "Ver el trabajo", href: "#trabajo" },
    ctaSecondary: { label: "Hablemos", href: "#contacto" },
    panelKicker: "TESIS",
    languagesLabel: "IDIOMAS",
  },

  criterion: {
    kicker: "EL CRITERIO",
    title: "La lógica y la empatía no compiten: se afinan.",
    body: "Más de cinco años diseñando y siete meses llevando ese diseño a código móvil nativo y multiplataforma. No elijo bando: la app tiene que sentirse bien y sostenerse. Cada pantalla que entrego tiene una razón, y cada razón tiene una pantalla.",
    stats: [
      { value: "+5", label: "años diseñando" },
      { value: "+7", label: "meses programando" },
      { value: "5", label: "proyectos, 2 en producción" },
    ] satisfies readonly Stat[],
    foot: "La capa verde es la lógica. El ribete coral es la empatía. Aquí se tocan.",
    layerLabel: "LÓGICA",
  },

  trajectory: {
    kicker: "TRAYECTORIA",
    title: "Lo que he hecho, sin adornos.",
    counterHint: "Hitos · experiencia y formación",
    experience: [
      {
        index: "01",
        kind: "Experiencia",
        title: "Desarrollador móvil multiplataforma",
        org: "Sistemas Tecnológicos Alcaraván",
        meta: "7 meses",
        points: [
          "Diseño de imágenes y vectores para la página web.",
          "Edición de vídeos de usabilidad.",
          "Tutorías de matemática en aulas universitarias.",
        ],
      },
    ] satisfies readonly Milestone[],
    education: [
      {
        index: "02",
        kind: "Formación",
        title: "Ingeniería en Informática",
        org: "UNERG",
        meta: "9.º semestre · en curso",
        points: [],
      },
      {
        index: "03",
        kind: "Formación",
        title: "English B2 Full Route",
        org: "Platzi",
        meta: "2022",
        points: [],
      },
      {
        index: "04",
        kind: "Formación",
        title: "React Native para Principiantes",
        org: "Midudev",
        meta: "2025",
        points: [],
      },
      {
        index: "05",
        kind: "Formación",
        title: "Android, Kotlin y Jetpack Compose Avanzado",
        org: "Udemy",
        meta: "2026",
        points: [],
      },
    ] satisfies readonly Milestone[],
  },

  craft: {
    kicker: "CRAFT",
    title: "La caja de herramientas, en orden.",
    line: "No colecciono frameworks. Elijo la herramienta que el problema pide.",
    strengthsLabel: "Fortalezas",
    marqueeLabel: "HERRAMIENTAS",
    groups: [
      { label: "Móvil", skills: ["Kotlin", "Jetpack Compose", "React Native", "XML"] },
      { label: "Web", skills: ["HTML", "Tailwind", "JavaScript", "React"] },
      { label: "Diseño", skills: ["Figma", "Inkscape"] },
      { label: "Proceso", skills: ["Gitflow", "Planificación activa", "Prompt"] },
      { label: "Extras", skills: ["Arduino", "C++"] },
    ] satisfies readonly SkillGroup[],
    strengths: [
      "Aplicaciones IoT",
      "Desarrollo móvil nativo",
      "Multiplataforma",
      "Apps educativas",
      "Gitflow y planificación activa",
    ],
    marquee: [
      "Kotlin",
      "Jetpack Compose",
      "React Native",
      "XML",
      "HTML",
      "Tailwind",
      "JavaScript",
      "React",
      "Figma",
      "Inkscape",
      "Gitflow",
      "Prompt",
      "Arduino",
      "C++",
    ],
  },

  work: {
    kicker: "TRABAJO",
    title: "Cinco proyectos. Dos en producción.",
    body: "Cinco proyectos trabajados, dos ya viven en producción. Lo que sigue es el mapa: categoría, estado y el stack confirmado. Sin métricas que no pueda demostrar.",
    cta: "Pedir el caso completo",
    cases: [
      {
        index: "01",
        category: "App multiplataforma",
        status: "En producción",
        stack: [],
        note: "Empresa: Sistemas Tecnológicos Alcaraván",
        cover: "plataforma",
        draft: true,
      },
      {
        index: "02",
        category: "App móvil nativa",
        status: "En producción",
        stack: ["Kotlin", "Jetpack Compose", "XML"],
        cover: "nativa",
        draft: true,
      },
      {
        index: "03",
        category: "Apps educativas",
        status: "En desarrollo",
        stack: ["React Native", "IoT"],
        cover: "educativa",
        draft: true,
      },
      {
        index: "04",
        category: "Aplicación IoT",
        status: "En desarrollo",
        stack: ["Arduino", "C++"],
        cover: "iot",
        draft: true,
      },
      {
        index: "05",
        category: "Interfaz / sistema",
        status: "En desarrollo",
        stack: ["Figma", "Inkscape"],
        cover: "sistema",
        draft: true,
      },
    ] satisfies readonly CaseSlot[],
  },

  contact: {
    kicker: "CONTACTO",
    title: "HABLEMOS",
    line: "¿Tienes una app que merece sentirse bien? Escríbeme.",
    action: "Copiar email",
    copied: "Copiado",
  },

  footer: {
    madeBy: "Diseñado y construido por José Fernández.",
    system: "Montserrat, #215C50, #FF6D4D y demasiadas revisiones.",
    copyright: "© 2026",
    backToTop: "Volver arriba",
  },

  seo: {
    title: "José Fernández — Desarrollador Móvil & Diseñador UI/UX",
    description:
      "Apps nativas y multiplataforma. Interfaces que se sienten antes de entenderse. Portafolio de José Fernández, desarrollador móvil y diseñador UI/UX venezolano.",
  },
} as const;

export type Site = typeof site;

/** mailto honesto: el asunto identifica el caso sin inventar su contenido. */
export const caseMailto = (category: string): string =>
  `mailto:${site.email}?subject=${encodeURIComponent(
    `Caso completo — ${category}`
  )}`;

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Hola José — hablemos de una app"
)}`;
