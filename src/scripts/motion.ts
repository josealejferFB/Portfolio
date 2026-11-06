/**
 * Capa de movimiento. Aislada del layout a propósito: si este archivo no carga,
 * el sitio sigue completo y legible. La entrada del hero es CSS puro y respeta
 * `prefers-reduced-motion` sin depender de este bundle.
 */
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

/* --------------------------------------------------------------------------
   UI funcional: riel, contador, copiar email. Vive con y sin animación.
   -------------------------------------------------------------------------- */
const railLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>("[data-rail-link]")
);
const sections = railLinks
  .map((link) => {
    const id = link.dataset.railLink;
    return id ? document.getElementById(id) : null;
  })
  .filter((section): section is HTMLElement => section !== null);

const railFill = document.querySelector<HTMLElement>("[data-rail-fill]");
const trajectoryCurrent = document.querySelector<HTMLElement>("[data-traj-current]");
const milestones = Array.from(document.querySelectorAll<HTMLElement>("[data-milestone]"));

let lastActive = -1;
let frame = 0;

function updateScrollUi(): void {
  frame = 0;
  const middle = window.innerHeight * 0.5;

  let active = -1;
  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= middle) active = index;
  });

  if (active !== lastActive) {
    lastActive = active;
    railLinks.forEach((link, index) => {
      if (index === active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if (railFill && sections.length > 0) {
    const first = sections[0];
    const last = sections[sections.length - 1];
    if (first && last) {
      const start = first.getBoundingClientRect().top + window.scrollY;
      const end = last.getBoundingClientRect().bottom + window.scrollY;
      const progress = clamp01(
        (window.scrollY + window.innerHeight * 0.5 - start) / Math.max(1, end - start)
      );
      railFill.style.transform = `scaleY(${progress})`;
    }
  }

  if (trajectoryCurrent && milestones.length > 0) {
    const line = window.innerHeight * 0.5;
    let index = 0;
    milestones.forEach((milestone, i) => {
      if (milestone.getBoundingClientRect().top <= line) index = i;
    });
    const text = String(index + 1).padStart(2, "0");
    if (trajectoryCurrent.textContent !== text) trajectoryCurrent.textContent = text;
  }
}

function requestScrollUi(): void {
  if (!frame) frame = requestAnimationFrame(updateScrollUi);
}

window.addEventListener("scroll", requestScrollUi, { passive: true });
window.addEventListener("resize", requestScrollUi);
requestScrollUi();

/* Copiar el email: el ancla conserva el mailto como fallback sin JavaScript. */
const copyLink = document.querySelector<HTMLAnchorElement>("[data-copy-email]");
const copyStatus = document.querySelector<HTMLElement>("[data-copy-status]");
const copyEmail = copyLink?.dataset.copyEmail;
const copyConfirm = copyLink?.dataset.copyConfirm ?? "Copiado";
let copyTimer = 0;

if (copyLink && copyStatus && copyEmail) {
  copyLink.addEventListener("click", (event) => {
    if (!navigator.clipboard?.writeText) return;
    event.preventDefault();
    navigator.clipboard
      .writeText(copyEmail)
      .then(() => {
        copyStatus.textContent = copyConfirm;
        window.clearTimeout(copyTimer);
        copyTimer = window.setTimeout(() => {
          copyStatus.textContent = "";
        }, 1200);
      })
      .catch(() => {
        window.location.href = copyLink.href;
      });
  });
}

/* --------------------------------------------------------------------------
   Movimiento: solo si el usuario no pide reducirlo.
   -------------------------------------------------------------------------- */
function initMotion(): void {
  document.documentElement.classList.add("motion");
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    autoRaf: false,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* Anclas: scroll suave con Lenis, foco correcto en el skip link. */
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.1 });
      if (anchor.classList.contains("skip")) {
        target.focus({ preventScroll: true });
      } else {
        history.pushState(null, "", href);
      }
    });
  });

  /* Marquesina: pausa real, no solo hover. */
  const marquee = document.querySelector<HTMLElement>("[data-marquee]");
  const marqueeToggle = marquee?.querySelector<HTMLButtonElement>("[data-marquee-toggle]");
  const marqueeLabel = marquee?.querySelector<HTMLElement>("[data-marquee-label]");
  if (marquee && marqueeToggle) {
    marqueeToggle.addEventListener("click", () => {
      const paused = marqueeToggle.getAttribute("aria-pressed") !== "true";
      marquee.classList.toggle("is-paused", paused);
      marqueeToggle.setAttribute("aria-pressed", String(paused));
      marqueeToggle.setAttribute(
        "aria-label",
        paused ? "Reanudar la marquesina de herramientas" : "Pausar la marquesina de herramientas"
      );
      if (marqueeLabel) marqueeLabel.textContent = paused ? "Reanudar" : "Pausar";
    });
  }

  /* Revelado estándar: una sola línea para todas las secciones. */
  const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  if (reveals.length > 0) {
    gsap.set(reveals, { y: 18, opacity: 0 });
    ScrollTrigger.batch(reveals, {
      start: "top 92%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          duration: 0.42,
          ease: "power3.out",
          stagger: 0.055,
          overwrite: true,
        }),
    });
  }

  /* Hero: el panel se comprime y el ribete se separa. */
  const heroFill = document.querySelector<HTMLElement>(".panel--hero .panel__fill");
  const heroRim = document.querySelector<HTMLElement>(".panel--hero .panel__rim");
  if (heroFill && heroRim) {
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    heroTl.to(heroFill, { scaleY: 0.955, transformOrigin: "bottom center", ease: "none" }, 0);
    heroTl.to(
      heroRim,
      { scaleY: 0.955, y: -12, transformOrigin: "bottom center", ease: "none" },
      0
    );
  }

  /* 01: las dos capas vienen de lados opuestos y terminan casi alineadas. */
  const stage = document.querySelector<HTMLElement>("[data-criterion-stage]");
  const layerCoral = stage?.querySelector<HTMLElement>("[data-layer-coral]");
  const layerGreen = stage?.querySelector<HTMLElement>("[data-layer-green]");
  if (stage && layerCoral && layerGreen) {
    const separation = (): number => (window.innerWidth > 1024 ? 44 : 18);
    const layersTl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top 92%",
        end: "top 25%",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    layersTl.fromTo(
      layerCoral,
      { x: () => -separation(), y: () => -separation() },
      { x: 0, y: -6, ease: "none" },
      0
    );
    layersTl.fromTo(layerGreen, { x: () => separation() }, { x: 0, ease: "none" }, 0);
  }

  /* 02: la línea se dibuja con scaleY. */
  const timelineProgress = document.querySelector<HTMLElement>("[data-timeline-progress]");
  const timeline = document.querySelector<HTMLElement>(".timeline");
  if (timelineProgress && timeline) {
    gsap.fromTo(
      timelineProgress,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 74%",
          end: "bottom 58%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      }
    );
  }

  /* 04: el arte de cada tarjeta se revela con clip-path. */
  document.querySelectorAll<HTMLElement>(".case").forEach((card) => {
    const art = card.querySelector<HTMLElement>(".cover");
    if (!art) return;
    gsap.fromTo(
      art,
      { clipPath: "inset(0% 0% 100% 0% round 34px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 34px)",
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true },
        onComplete: () => {
          art.style.clipPath = "none";
        },
      }
    );
  });

  /* 05: HABLEMOS entra en máscara. */
  const contactWord = document.querySelector<HTMLElement>("[data-contact-word]");
  if (contactWord) {
    gsap.fromTo(
      contactWord,
      { clipPath: "inset(110% 0% -12% 0%)" },
      {
        clipPath: "inset(-22% 0% -12% 0%)",
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: contactWord, start: "top 86%", once: true },
        onComplete: () => {
          contactWord.style.clipPath = "none";
        },
      }
    );
  }

  /* 05: botón magnético sutil (±6 px), solo en punteros finos. */
  if (copyLink && window.matchMedia("(pointer: fine)").matches) {
    let magneticFrame = 0;
    copyLink.addEventListener(
      "pointermove",
      (event) => {
        const rect = copyLink.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
        cancelAnimationFrame(magneticFrame);
        magneticFrame = requestAnimationFrame(() => {
          gsap.to(copyLink, { x, y, duration: 0.3, ease: "power2.out" });
        });
      },
      { passive: true }
    );
    copyLink.addEventListener("pointerleave", () => {
      cancelAnimationFrame(magneticFrame);
      gsap.to(copyLink, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    });
  }

  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

if (reducedMotion) {
  document.documentElement.classList.remove("motion");
} else {
  initMotion();
}
