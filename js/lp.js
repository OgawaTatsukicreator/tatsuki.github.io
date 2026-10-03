(() => {
  "use strict";

  // Slider sections: vertical scroll drives a horizontal slide (desktop, motion allowed).
  // A section is pinned only when its cards overflow; otherwise it stays a plain row.
  const sections = [...document.querySelectorAll(".lp-works")].map((section) => ({
    section,
    pin: section.querySelector(".lp-works-pin"),
    viewport: section.querySelector(".lp-works-viewport"),
    track: section.querySelector(".lp-works-track"),
    maxShift: 0
  })).filter((item) => item.pin && item.viewport && item.track);
  if (!sections.length) return;

  const query = window.matchMedia("(min-width: 761px) and (prefers-reduced-motion: no-preference)");
  let ticking = false;

  const reset = (item) => {
    item.maxShift = 0;
    item.section.classList.remove("is-pinned", "is-end");
    item.section.style.height = "";
    item.track.style.transform = "";
  };

  const measure = (item) => {
    reset(item);
    if (!query.matches) return;
    const overflow = item.track.scrollWidth - item.viewport.clientWidth;
    if (overflow <= 1) return;
    item.maxShift = overflow;
    item.section.classList.add("is-pinned");
    item.section.style.height = `${item.pin.offsetHeight + overflow}px`;
  };

  const update = () => {
    ticking = false;
    sections.forEach((item) => {
      if (!item.maxShift) return;
      const range = item.section.offsetHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -item.section.getBoundingClientRect().top / range)) : 0;
      item.track.style.transform = `translate3d(${-item.maxShift * progress}px, 0, 0)`;
      item.section.classList.toggle("is-end", progress > 0.92);
    });
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  const layout = () => {
    sections.forEach(measure);
    update();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", layout);
  // Pinned sections add scroll height after the browser's own anchor jump, so land on the hash target again.
  const settleHash = () => {
    layout();
    const id = decodeURIComponent(location.hash.slice(1));
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
  };
  window.addEventListener("load", settleHash, { once: true });
  query.addEventListener("change", layout);
  layout();
})();
