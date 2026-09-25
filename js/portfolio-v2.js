(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector(".v2-header");
  const nav = document.querySelector(".v2-nav");
  const toggle = document.querySelector(".v2-menu-toggle");
  const backdrop = document.querySelector(".v2-menu-backdrop");
  if (!header || !nav || !toggle || !backdrop) return;

  const page = body.dataset.page;
  const active = page === "home" ? document.querySelector(".v2-brand") : nav.querySelector(`[data-nav="${page}"]`);
  if (active) active.setAttribute("aria-current", "page");
  if (page === "home") nav.querySelector(".v2-nav-home")?.setAttribute("aria-current", "page");

  const mobile = window.matchMedia("(max-width: 1040px)");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const secondaryHeader = document.querySelector(".project-header, .detail-header");
  const brand = document.querySelector(".v2-brand");
  const skipLink = document.querySelector(".v2-skip-link, .skip-link");
  const languageSwitcher = document.querySelector(".v2-language-switcher");
  let returnFocus = null;

  const menuLabel = (open) => document.documentElement.lang === "en"
    ? (open ? "Close menu" : "Open menu")
    : (open ? "メニューを閉じる" : "メニューを開く");

  const setBackgroundInert = (value) => {
    [main, footer, secondaryHeader, brand, skipLink].forEach((element) => {
      if (element) element.inert = value;
    });
  };

  const closeMenu = (restoreFocus = false) => {
    if (!body.classList.contains("v2-menu-open")) return;
    body.classList.remove("v2-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", menuLabel(false));
    nav.setAttribute("aria-hidden", mobile.matches ? "true" : "false");
    nav.inert = mobile.matches;
    setBackgroundInert(false);
    if (restoreFocus && returnFocus instanceof HTMLElement) returnFocus.focus();
  };

  const openMenu = () => {
    if (!mobile.matches) return;
    returnFocus = document.activeElement;
    body.classList.add("v2-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", menuLabel(true));
    nav.setAttribute("aria-hidden", "false");
    nav.inert = false;
    setBackgroundInert(true);
    nav.querySelector("a")?.focus();
  };

  const syncMenu = () => {
    closeMenu(false);
    nav.inert = mobile.matches;
    nav.setAttribute("aria-hidden", mobile.matches ? "true" : "false");
  };

  toggle.addEventListener("click", () => {
    if (body.classList.contains("v2-menu-open")) closeMenu(true);
    else openMenu();
  });
  backdrop.addEventListener("click", () => closeMenu(true));
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (!body.classList.contains("v2-menu-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key !== "Tab") return;
    // Follow the same order as the header: links, language choices, then menu toggle.
    const focusables = [...nav.querySelectorAll("a"), ...(languageSwitcher?.querySelectorAll("button") ?? []), toggle];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && (document.activeElement === first || !focusables.includes(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !focusables.includes(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });

  mobile.addEventListener("change", syncMenu);
  syncMenu();

  // Reveal prose when it enters the viewport, while keeping it visible without JS or motion support.
  const revealSelectors = [
    ".v2-home-intro > h2", ".v2-home-intro > p",
    ".v2-preview h3", ".v2-preview-content > p",
    ".v2-section-heading > h2", ".v2-section-heading > p:not(.v2-eyebrow)",
    ".about-timeline-item h3", ".about-timeline-content > p",
    ".about-purpose-copy", ".about-career-item h3", ".about-career-item > p",
    ".v2-skill-card h3", ".v2-skill-card > p",
    ".achievement-panel-heading h2", ".achievement-card h3",
    ".achievement-card > p:not(.achievement-meta)", ".v2-qualification-name",
    ".project-page .project-hero-copy .project-subtitle", ".project-page .project-hero-copy .project-lead",
    ".project-page .project-section h2", ".project-page .project-section > p:not(.project-section-number)",
    ".project-page .project-visual-heading h3", ".project-page .project-visual-heading > p",
    ".project-page .case-flow h3", ".project-page .case-flow p",
    ".project-page .feature-list h3", ".project-page .feature-list p",
    ".project-page .tech-item h3", ".project-page .tech-item p"
  ];
  const revealTargets = [...document.querySelectorAll(revealSelectors.join(", "))]
    .filter((element) => !element.querySelector("a, button, input, select, textarea"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!revealTargets.length || reduceMotion.matches || !("IntersectionObserver" in window)) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add("is-visible");
      revealObserver.unobserve(target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  revealTargets.forEach((element, index) => {
    element.classList.add("v2-reveal-target");
    element.style.setProperty("--v2-reveal-delay", `${(index % 3) * 65}ms`);
    revealObserver.observe(element);
  });
  body.classList.add("v2-motion-ready");

  reduceMotion.addEventListener?.("change", (event) => {
    if (!event.matches) return;
    revealObserver.disconnect();
    body.classList.remove("v2-motion-ready");
  });
})();
