(() => {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const initializeIntro = () => {
        const intro = document.querySelector(".page-intro");

        if (!intro) {
            return 0;
        }

        if (prefersReducedMotion.matches || window.location.hash) {
            intro.remove();
            return 0;
        }

        document.body.classList.add("intro-active");

        window.setTimeout(() => {
            document.body.classList.remove("intro-active");
            intro.remove();
        }, 1450);

        return 1350;
    };

    const initializeTypewriter = (startDelay) => {
        const visualText = document.querySelector(".typewriter-visual");
        const readableText = document.querySelector(".typewriter .sr-only");

        if (!visualText || !readableText) {
            return;
        }

        const fullText = readableText.textContent.trim();

        if (prefersReducedMotion.matches || window.location.hash) {
            visualText.textContent = fullText;
            visualText.classList.add("is-complete");
            return;
        }

        const characters = Array.from(fullText);
        let currentIndex = 0;
        visualText.textContent = "";

        window.setTimeout(() => {
            const timer = window.setInterval(() => {
                visualText.textContent += characters[currentIndex];
                currentIndex += 1;

                if (currentIndex >= characters.length) {
                    window.clearInterval(timer);
                    visualText.classList.add("is-complete");
                }
            }, 34);
        }, startDelay + 120);
    };

    const initializeScrollReveal = () => {
        const revealGroups = [
            "#about > div",
            "#skills > .label, #skills > h2, #skills .skill-card",
            "#portfolio > .label, #portfolio > h2, #portfolio .work-card",
            "#experience > div, #experience .experience-option",
            "#qualification > .label, #qualification > h2, #qualification .qualification-list li",
            "#contact > *",
            "footer > *"
        ];

        const targets = [];

        revealGroups.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.add("reveal-target");
                element.style.setProperty("--reveal-delay", `${Math.min(index * 65, 260)}ms`);
                targets.push(element);
            });
        });

        if (!("IntersectionObserver" in window) || prefersReducedMotion.matches) {
            targets.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("is-visible", entry.isIntersecting);
            });
        }, {
            rootMargin: "0px 0px -8% 0px",
            threshold: 0.08
        });

        targets.forEach((element) => observer.observe(element));
    };

    document.addEventListener("DOMContentLoaded", () => {
        const introDuration = initializeIntro();
        initializeTypewriter(introDuration);
        initializeScrollReveal();
    });
})();
