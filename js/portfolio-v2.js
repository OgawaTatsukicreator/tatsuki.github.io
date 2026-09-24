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
})();
