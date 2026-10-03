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

  // Timeline line: progress is measured against a trigger line 60% down the viewport. On tall screens the
  // timeline's end never gets that low before the page runs out, so the trigger slides to the viewport
  // bottom as the page bottom approaches and the line always finishes.
  const timeline = document.querySelector(".lp-tl");
  if (!timeline) return;
  const steps = [...timeline.children];
  let ticking = false;

  const updateTimeline = () => {
    ticking = false;
    const rect = timeline.getBoundingClientRect();
    const viewport = window.innerHeight;
    const remaining = Math.max(0, document.documentElement.scrollHeight - (window.scrollY + viewport));
    const nearEnd = Math.min(1, Math.max(0, 1 - remaining / (viewport * 0.6)));
    const trigger = viewport * (0.6 + 0.4 * nearEnd);
    const reached = Math.min(rect.height, Math.max(0, trigger - rect.top));
    timeline.style.setProperty("--tl", (reached / rect.height).toFixed(4));
    steps.forEach((step) => step.classList.toggle("is-lit", step.getBoundingClientRect().top + 10 <= trigger));
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateTimeline);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", onScroll);
  updateTimeline();
})();
