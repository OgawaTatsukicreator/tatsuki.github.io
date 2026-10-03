(() => {
  "use strict";

  // Home-page motion: scroll reveal and the timeline line. Skipped entirely for reduced motion.
  const root = document.documentElement;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

  // ?motion=bold switches to the stronger variant so both can be compared side by side.
  const variant = new URLSearchParams(location.search).get("motion");
  root.dataset.motion = variant === "bold" ? "bold" : "subtle";

  const mark = (selector, kind = "up", stagger = false) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.dataset.mo = kind;
      if (stagger) element.style.setProperty("--i", String(index));
      targets.push(element);
    });
  };
  const targets = [];

  mark(".lp-section > .v2-container > .v2-eyebrow, .lp-section > .v2-container > h2, .lp-lede, .lp-legend");
  mark(".lp-social li", "up", true);
  mark(".lp-works-head > div, .lp-hint");
  mark(".lp-work", "card");
  mark(".lp-skill-group h3");
  document.querySelectorAll(".lp-icons").forEach((list) => {
    list.querySelectorAll("li").forEach((item, index) => {
      item.dataset.mo = "icon";
      item.style.setProperty("--i", String(index));
      targets.push(item);
    });
  });
  mark(".lp-tl li", "step");
  mark(".lp-more");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add("is-in");
      observer.unobserve(target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  targets.forEach((element) => observer.observe(element));
  document.body.classList.add("mo-ready");
})();
