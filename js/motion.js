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
  const elements = [...document.querySelectorAll(".lp-tl, .about-timeline")];
  if (!elements.length) return;
  const active = new Set();
  const pending = new Set();
  let initialized = false;
  let ticking = false;
  let timelineObserver;
  let lastScrollY = null;

  const refreshObservations = () => {
    if (!timelineObserver) return;
    elements.forEach((element) => {
      timelineObserver.unobserve(element);
      timelineObserver.observe(element);
    });
  };

  const applyTimeline = (timeline) => {
    if (timeline.nextProgress !== timeline.progress) {
      timeline.element.style.setProperty("--tl", timeline.nextProgress);
      timeline.progress = timeline.nextProgress;
    }
    timeline.steps.forEach((step) => {
      if (step.nextLit === step.lit) return;
      step.element.classList.toggle("is-lit", step.nextLit);
      step.lit = step.nextLit;
    });
  };

  const updateTimelines = () => {
    ticking = false;
    // Leave the document's layout alone while every timeline is far from the viewport.
    if (active.size) {
      const viewport = window.innerHeight;
      const remaining = Math.max(0, document.documentElement.scrollHeight - (window.scrollY + viewport));
      const nearEnd = Math.min(1, Math.max(0, 1 - remaining / (viewport * 0.6)));
      const trigger = viewport * (0.6 + 0.4 * nearEnd);
      // Measure active timelines before changing any styles or classes, including offscreen states.
      active.forEach((timeline) => {
        const rect = timeline.element.getBoundingClientRect();
        const reached = Math.min(rect.height, Math.max(0, trigger - rect.top));
        timeline.nextProgress = (reached / rect.height).toFixed(4);
        const offscreenLit = rect.top >= viewport ? false : rect.bottom <= 0 && rect.bottom + 10 <= trigger ? true : null;
        timeline.steps.forEach((step) => {
          step.nextLit = offscreenLit ?? (step.element.getBoundingClientRect().top + 10 <= trigger);
        });
        pending.add(timeline);
      });
    }
    pending.forEach(applyTimeline);
    pending.clear();
  };
  const onScroll = () => {
    if (!initialized) {
      requestAnimationFrame(initializeTimelines);
      return;
    }
    const scrollY = window.scrollY;
    // A jump can skip the observer's entire root while staying non-intersecting at both ends.
    // Re-observe after those jumps to receive fresh bounds without a synchronous layout read.
    if (lastScrollY !== null && Math.abs(scrollY - lastScrollY) > window.innerHeight) refreshObservations();
    lastScrollY = scrollY;
    if (!active.size && !pending.size) return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateTimelines);
  };

  const initializeTimelines = () => {
    if (initialized) return;
    initialized = true;
    const timelines = new Map(elements.map((element) => [element, {
      element,
      steps: [...element.children].map((step) => ({
        element: step,
        lit: step.classList.contains("is-lit"),
        nextLit: false
      })),
      progress: null,
      nextProgress: null
    }]));
    timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const timeline = timelines.get(entry.target);
        if (entry.isIntersecting) {
          active.add(timeline);
        } else {
          active.delete(timeline);
          // The observer supplies already-measured bounds. A timeline outside the expanded viewport
          // is wholly before or after the trigger, even after an anchor jump or reverse scroll.
          const passed = entry.boundingClientRect.bottom <= 0;
          timeline.nextProgress = passed ? "1.0000" : "0.0000";
          timeline.steps.forEach((step) => { step.nextLit = passed; });
          pending.add(timeline);
        }
      });
      onScroll();
    }, { rootMargin: "256px 0px" });
    elements.forEach((element) => timelineObserver.observe(element));
  };
  const onLayout = () => {
    refreshObservations();
    onScroll();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onLayout);
  window.addEventListener("load", onLayout);
  window.addEventListener("hashchange", onLayout);
  window.addEventListener("pageshow", onLayout);
  // Allow an initial paint before setting up timeline tracking. Scroll/hash events can bring this
  // forward to the next frame; neither path synchronously measures the document during startup.
  requestAnimationFrame(() => requestAnimationFrame(initializeTimelines));
})();
