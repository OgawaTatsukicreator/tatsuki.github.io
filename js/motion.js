(() => {
  "use strict";

  // Site-wide motion: scroll reveal and timeline lines. Skipped entirely for reduced motion.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

  const targets = [];
  const mark = (selector, kind = "up", stagger = false) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.dataset.mo = kind;
      if (stagger) element.style.setProperty("--i", String(index));
      targets.push(element);
    });
  };

  // Top page and shared sections
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
  mark(".lp-tl li, .about-timeline-item", "step");
  mark(".lp-more, .lp-back .v2-button");

  // About page
  mark(".v2-page-hero .v2-eyebrow, .v2-page-hero h1, .v2-page-hero p");
  mark(".v2-section-heading > *");
  mark(".about-profile-item", "up", true);
  mark(".about-purpose-copy");
  mark(".about-career-item", "up", true);

  // Case-study pages
  mark(".project-hero-copy .project-subtitle, .project-hero-copy .project-lead");
  mark(".project-section h2, .project-section > p:not(.project-section-number)");
  mark(".project-visual-heading h3, .project-visual-heading > p");
  mark(".case-flow h3, .case-flow p, .feature-list h3, .feature-list p");
  mark(".tech-item, .shift-usecase-card, .shift-decision-card, .shift-architecture-node", "up", true);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add("is-in");
      observer.unobserve(target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  targets.forEach((element) => observer.observe(element));
  document.body.classList.add("mo-ready");

  // Timeline lines: progress is measured against a trigger line 60% down the viewport. On tall screens the
  // timeline's end never gets that low before the page runs out, so the trigger slides to the viewport
  // bottom as the page bottom approaches and the line always finishes.
  const timelines = [...document.querySelectorAll(".lp-tl, .about-timeline")];
  if (!timelines.length) return;
  let ticking = false;

  const updateTimelines = () => {
    ticking = false;
    const viewport = window.innerHeight;
    const remaining = Math.max(0, document.documentElement.scrollHeight - (window.scrollY + viewport));
    const nearEnd = Math.min(1, Math.max(0, 1 - remaining / (viewport * 0.6)));
    const trigger = viewport * (0.6 + 0.4 * nearEnd);
    timelines.forEach((timeline) => {
      const rect = timeline.getBoundingClientRect();
      const reached = Math.min(rect.height, Math.max(0, trigger - rect.top));
      timeline.style.setProperty("--tl", (reached / rect.height).toFixed(4));
      [...timeline.children].forEach((step) => step.classList.toggle("is-lit", step.getBoundingClientRect().top + 10 <= trigger));
    });
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateTimelines);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", onScroll);
  updateTimelines();
})();
