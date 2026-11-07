/**
 * FUENTE ÚNICA DE COPY Y DATOS DE CONTENIDO.
 * Actualizado con el CV 2026 y los activos reales de NotiFast. Nada inventado:
 * lo que no está en reference/jose-cv-2026.txt se marca en CONTENT_TODO.md.
 * Las etiquetas de control (saltar, capítulos, pausar) viven con su componente.
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

export type CoverVariant = "plataforma" | "nativa" | "educativa" | "iot";

export interface CaseMedia {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly logo: { readonly src: string; readonly width: number; readonly height: number };
}

export interface CaseLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface FeaturedCase {
  readonly index: string;
  readonly title: string;
  readonly category: string;
  readonly status: string;
  readonly live: boolean;
  readonly note: string;
  readonly tagline: string;
  readonly summary: string;
  readonly facts?: readonly Stat[];
  readonly stack: readonly string[];
  readonly media: CaseMedia;
  readonly link?: CaseLink;
}

export interface CaseSlot {
  readonly index: string;
  readonly title: string;
  readonly category: string;
  readonly status: string;
  readonly live: boolean;
  readonly note?: string;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly cover: CoverVariant;
  /** Marcado interno: los datos vienen del CV pero aún no hay capturas reales. */
  readonly draft: boolean;
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
  role: "Ingeniero de Sistemas · Desarrollador Móvil · Diseñador UI/UX & Gráfico",
  roleDisplay:
    "INGENIERO DE SISTEMAS · DESARROLLADOR MÓVIL\nDISEÑADOR UI/UX & GRÁFICO",
  email: "josealejfer@gmail.com",
  phone: "0412-442-0728",
  handle: "@josealejfer",
  website: { label: "notifast.pages.dev", href: "https://notifast.pages.dev" },
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
    body: "Cinco años diseñando y nueve meses llevando ese diseño a código móvil nativo y multiplataforma. Estoy en el último semestre de Ingeniería de Sistemas. He construido sistemas Zero Trust, control de acceso IoT y una app educativa propia. No elijo bando: la app tiene que sentirse bien y sostenerse. Cada pantalla que entrego tiene una razón, y cada razón tiene una pantalla.",
    stats: [
      { value: "+5", label: "años diseñando" },
      { value: "+9", label: "meses programando" },
      { value: "10.º", label: "semestre en curso" },
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
        title: "Desarrollador móvil y diseñador UI/UX",
        org: "Sistemas Tecnológicos Alcaraván",
        meta: "Feb 2026 — presente",
        points: [
          "Arquitecté y desarrollé una app multiplataforma (React Native) con Zero Trust y Odoo: asistencia con geocercas para más de 200 empleados a nivel nacional.",
          "Construí un sistema de control de acceso físico: app administrativa, app Android nativa y firmware ESP32 en C++ para la apertura automatizada de compuertas.",
          "Desarrollé una app Android de robótica educativa para el Ministerio de Ciencia y Tecnología, con compilación y flasheo remoto en tiempo real vía WebSockets y Arduino CLI.",
          "Implementé una solución móvil de monitoreo atmosférico IoT con telemetría de temperatura, humedad y presión visualizada con Vico.",
        ],
      },
      {
        index: "02",
        kind: "Experiencia",
        title: "Diseñador gráfico y UI/UX independiente",
        org: "Freelance",
        meta: "2021 — presente",
        points: [
          "Lideré y ejecuté briefs y directrices de diseño para más de 10 proyectos.",
          "Gestioné las redes sociales de tres empresas con identidad corporativa propia, edición de vídeo y estrategia de retención de audiencia.",
          "Creé identidades visuales, piezas gráficas digitales e interfaces centradas en el usuario en Figma.",
          "Estructuré Design Systems, flujos de navegación y prototipos de alta fidelidad listos para implementar en código.",
        ],
      },
    ] satisfies readonly Milestone[],
    education: [
      {
        index: "03",
        kind: "Formación",
        title: "Ingeniería de Sistemas",
        org: "UNERG",
        meta: "10.º semestre · en curso",
        points: [],
      },
      {
        index: "04",
        kind: "Formación",
        title: "Especialización y Desarrollo Móvil con React Native",
        org: "Udemy",
        meta: "2025 – 2026",
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
      {
        index: "06",
        kind: "Formación",
        title: "React Native para Principiantes",
        org: "Midudev",
        meta: "2025",
        points: [],
      },
      {
        index: "07",
        kind: "Formación",
        title: "English B2 Full Route",
        org: "Platzi",
        meta: "2022",
        points: [],
      },
    ] satisfies readonly Milestone[],
  },

  craft: {
    kicker: "CRAFT",
    title: "La caja de herramientas, en orden.",
    line: "No colecciono frameworks. Elijo la herramienta que el problema pide.",
    groups: [
      {
        label: "Móvil",
        skills: [
          "Kotlin 2.0+",
          "Jetpack Compose",
          "Material 3",
          "XML",
          "Android SDK 26–36",
          "Dagger Hilt",
          "Room",
          "Coroutines & Flow",
          "Vico Charts",
        ],
      },
      {
        label: "Web",
        skills: [
          "React Native",
          "React",
          "JavaScript",
          "HTML",
          "CSS",
          "Tailwind",
          "Cloudflare Pages",
        ],
      },
      {
        label: "IoT",
        skills: [
          "C++ · ESP32",
          "Arduino CLI",
          "WebSockets",
          "Odoo",
          "Firebase",
          "Google Drive API",
        ],
      },
      {
        label: "Arquitectura",
        skills: [
          "Clean Architecture",
          "MVI",
          "Offline-First",
          "Zero Trust",
          "JUnit",
          "Scrum",
          "Gitflow",
          "IA asistida",
        ],
      },
      {
        label: "Diseño",
        skills: [
          "Figma",
          "Design Systems",
          "Prototipado",
          "Wireframing",
          "UI móvil",
          "Identidad visual",
        ],
      },
      {
        label: "Herramientas",
        skills: ["Android Studio", "Git", "GitHub"],
      },
    ] satisfies readonly SkillGroup[],
    strengths: [
      "Aplicaciones IoT",
      "Desarrollo móvil nativo",
      "Multiplataforma",
      "Sistemas Zero Trust",
      "Clean Architecture",
      "Design Systems",
      "Producto educativo",
    ],
    marqueeLabel: "HERRAMIENTAS",
    marquee: [
      "Kotlin",
      "Jetpack Compose",
      "React Native",
      "React",
      "Tailwind",
      "JavaScript",
      "C++",
      "ESP32",
      "Arduino CLI",
      "WebSockets",
      "Odoo",
      "Firebase",
      "Room",
      "Hilt",
      "Clean Architecture",
      "Zero Trust",
      "Figma",
      "Design Systems",
      "Cloudflare",
      "Gitflow",
    ],
  },

  work: {
    kicker: "TRABAJO",
    title: "Seis proyectos. Del diseño al código.",
    body: "Seis proyectos construidos: un producto educativo publicado, una app universitaria, sistemas empresariales y soluciones IoT. Lo que sigue es el mapa: categoría, estado y el stack confirmado. Sin métricas que no pueda demostrar.",
    cta: "Pedir el caso completo",
    featured: [
      {
        index: "01",
        title: "NotiFast",
        category: "App móvil nativa",
        status: "Publicada · v1.0 RC",
        live: true,
        note: "Autoría propia",
        tagline: "Hub educativo y cuaderno académico inteligente.",
        summary:
          "Diseñé y desarrollé la app completa: importación de horarios DACE desde PDF, apuntes con LaTeX, voz y pizarra, simulador de notas multipaís y portadas APA/IEEE.",
        facts: [
          { value: "26", label: "pantallas" },
          { value: "805", label: "pruebas unitarias" },
          { value: "100 %", label: "offline" },
        ] satisfies readonly Stat[],
        stack: [
          "Kotlin 2.0",
          "Jetpack Compose",
          "Room",
          "Hilt",
          "Clean Architecture",
          "MVI",
          "Offline-First",
        ],
        media: {
          src: "/projects/notifast-landing.jpg",
          alt: "Landing de NotiFast con el titular «Todo tu semestre, en calma y sin conexión» y una vista de la app en Android.",
          width: 1400,
          height: 782,
          logo: {
            src: "/projects/notifast-logo.webp",
            width: 750,
            height: 750,
          },
        },
        link: {
          label: "Ver landing",
          href: "https://notifast.pages.dev",
          external: true,
        },
      },
      {
        index: "02",
        title: "Krizo",
        category: "App móvil en React Native",
        status: "Proyecto universitario",
        live: false,
        note: "Diseño y desarrollo",
        tagline: "Tu aliado en carretera.",
        summary:
          "Diseñé y desarrollé en React Native una app que conecta en tiempo real a conductores varados con grúas, mecánicos y tiendas de repuesto. Nació como proyecto universitario y conserva identidad propia.",
        stack: ["React Native", "Figma", "Identidad visual"],
        media: {
          src: "/projects/krizo-promo.jpg",
          alt: "Pieza publicitaria de Krizo: «¡No te quedes varado!» y «Tu aliado en carretera», con el logo, la app en Android y los servicios de grúas, mecánicos y repuestos.",
          width: 774,
          height: 259,
          logo: {
            src: "/projects/krizo-logo.webp",
            width: 628,
            height: 344,
          },
        },
      },
    ] satisfies readonly FeaturedCase[],
    cases: [
      {
        index: "03",
        title: "Asistencia y geocercas",
        category: "App multiplataforma",
        status: "En producción",
        live: true,
        note: "Empresa: Sistemas Tecnológicos Alcaraván",
        summary:
          "App React Native con seguridad Zero Trust e integración con Odoo: rastreo de asistencia con geocercas para más de 200 empleados a nivel nacional.",
        stack: ["React Native", "Zero Trust", "Odoo", "Geocercas"],
        cover: "plataforma",
        draft: true,
      },
      {
        index: "04",
        title: "Control de acceso",
        category: "Sistema IoT",
        status: "En producción",
        live: true,
        note: "Empresa: Sistemas Tecnológicos Alcaraván",
        summary:
          "App administrativa, app Android y firmware ESP32 para la apertura automatizada de compuertas.",
        stack: ["Kotlin", "ESP32", "C++", "WebSockets"],
        cover: "nativa",
        draft: true,
      },
      {
        index: "05",
        title: "Robótica educativa",
        category: "App educativa",
        status: "Desarrollada",
        live: false,
        note: "Empresa: Alcaraván · Ministerio de Ciencia y Tecnología",
        summary:
          "App Android para robótica educativa con compilación y flasheo remoto en tiempo real vía WebSockets y Arduino CLI.",
        stack: ["Kotlin", "Jetpack Compose", "Arduino CLI", "WebSockets"],
        cover: "educativa",
        draft: true,
      },
      {
        index: "06",
        title: "Monitoreo atmosférico",
        category: "Aplicación IoT",
        status: "Implementada",
        live: false,
        note: "Empresa: Sistemas Tecnológicos Alcaraván",
        summary:
          "Telemetría IoT de temperatura, humedad y presión, visualizada con Vico Charts.",
        stack: ["Kotlin", "Vico", "IoT"],
        cover: "iot",
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
    title:
      "José Fernández — Ingeniero de Sistemas · Desarrollador Móvil · Diseñador UI/UX & Gráfico",
    description:
      "Ingeniero de Sistemas en último semestre y desarrollador móvil. Apps nativas y multiplataforma, sistemas Zero Trust, IoT y NotiFast. Portafolio de José Fernández, San Juan de los Morros, Venezuela.",
  },
} as const;

export type Site = typeof site;

/** mailto honesto: el asunto identifica el caso sin inventar su contenido. */
export const caseMailto = (subject: string): string =>
  `mailto:${site.email}?subject=${encodeURIComponent(`Caso completo — ${subject}`)}`;

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Hola José — hablemos de una app"
)}`;
