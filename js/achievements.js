(() => {
    "use strict";

    const tabList = document.querySelector(".achievement-tabs");
    if (!tabList) return;

    const tabs = [...tabList.querySelectorAll("[data-achievement-tab]")];
    const panels = [...document.querySelectorAll("[data-achievement-panel]")];
    const validKeys = new Set(tabs.map((tab) => tab.dataset.achievementTab));
    const tabShell = document.querySelector(".achievement-tabs-shell");
    const carousels = new Map();

    panels.forEach((panel) => {
        const track = panel.querySelector(".achievement-grid");
        const cards = [...(track?.querySelectorAll(".achievement-card") ?? [])];
        const heading = panel.querySelector(".achievement-panel-heading");
        const count = heading?.querySelector(".achievement-panel-count");
        if (!track || !cards.length || !heading || !count) return;

        const tools = document.createElement("div");
        tools.className = "achievement-panel-tools";
        const controls = document.createElement("div");
        controls.className = "achievement-controls";
        controls.setAttribute("role", "group");
        const previous = document.createElement("button");
        previous.type = "button";
        previous.className = "achievement-slide-button";
        previous.dataset.slide = "previous";
        previous.innerHTML = '<span aria-hidden="true">←</span>';
        const progress = document.createElement("span");
        progress.className = "achievement-progress";
        progress.setAttribute("role", "status");
        progress.setAttribute("aria-live", "polite");
        progress.setAttribute("aria-atomic", "true");
        const next = document.createElement("button");
        next.type = "button";
        next.className = "achievement-slide-button";
        next.dataset.slide = "next";
        next.innerHTML = '<span aria-hidden="true">→</span>';
        controls.append(previous, progress, next);
        count.replaceWith(tools);
        tools.append(count, controls);

        const metrics = () => {
            const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
            const step = cards[0].getBoundingClientRect().width + gap;
            const visible = step > 0
                ? Math.max(1, Math.min(cards.length, Math.round((track.clientWidth + gap) / step)))
                : 1;
            return { step, visible, max: Math.max(0, track.scrollWidth - track.clientWidth) };
        };

        const firstIndex = (step) => step > 0
            ? Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / step)))
            : 0;

        const updateCopy = () => {
            const english = document.documentElement.lang === "en";
            controls.setAttribute("aria-label", english ? "Card slide controls" : "カードのスライド操作");
            previous.setAttribute("aria-label", english ? "Show previous cards" : "前のカードを表示");
            next.setAttribute("aria-label", english ? "Show next cards" : "次のカードを表示");
        };

        const refresh = () => {
            if (panel.hidden || !track.clientWidth) return;
            const { step, visible, max } = metrics();
            const scrollable = max > 2;
            controls.hidden = !scrollable;
            track.tabIndex = scrollable ? 0 : -1;
            if (!scrollable) {
                track.removeAttribute("role");
                track.removeAttribute("aria-label");
                return;
            }

            const english = document.documentElement.lang === "en";
            const title = heading.querySelector("h2")?.textContent.trim() || "";
            track.setAttribute("role", "region");
            track.setAttribute("aria-label", english
                ? `${title} cards, scroll horizontally`
                : `${title}のカード。左右にスクロールできます`);
            const first = firstIndex(step);
            const last = Math.min(cards.length, first + visible);
            const position = visible > 1 ? `${first + 1}–${last}` : String(first + 1);
            const text = `${position} / ${cards.length}`;
            if (progress.textContent !== text) progress.textContent = text;
            previous.disabled = track.scrollLeft <= 2;
            next.disabled = track.scrollLeft >= max - 2;
        };

        const jumpTo = (index) => {
            const { step, visible, max } = metrics();
            const first = Math.max(0, Math.min(cards.length - visible, index));
            track.scrollTo({
                left: Math.min(max, first * step),
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
            });
        };

        const advance = (direction) => {
            const { step, visible } = metrics();
            jumpTo(firstIndex(step) + direction * visible);
        };

        previous.addEventListener("click", () => advance(-1));
        next.addEventListener("click", () => advance(1));
        track.addEventListener("keydown", (event) => {
            if (event.target !== track) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                advance(event.key === "ArrowRight" ? 1 : -1);
            } else if (event.key === "Home" || event.key === "End") {
                event.preventDefault();
                jumpTo(event.key === "Home" ? 0 : cards.length - 1);
            }
        });
        track.addEventListener("scroll", refresh, { passive: true });
        updateCopy();
        carousels.set(panel, { refresh, updateCopy });
    });

    const keyFromHash = () => {
        const key = window.location.hash.slice(1);
        return validKeys.has(key) ? key : "works";
    };

    const showPanelStart = (panel) => {
        window.requestAnimationFrame(() => {
            const header = document.querySelector(".v2-header, .site-header, header");
            const coveredHeight = (header?.getBoundingClientRect().height ?? 0)
                + (tabShell?.getBoundingClientRect().height ?? 0) + 16;
            const panelTop = panel.getBoundingClientRect().top;

            if (panelTop < coveredHeight || panelTop > window.innerHeight - 120) {
                window.scrollTo({
                    top: Math.max(0, window.scrollY + panelTop - coveredHeight),
                    behavior: "auto"
                });
            }
        });
    };

    const activate = (key, { recordHistory = false, focus = false, reveal = false } = {}) => {
        if (!validKeys.has(key)) return;

        const focusedPanel = panels.find((panel) => panel.contains(document.activeElement));
        let activeTab;
        let activePanel;

        tabs.forEach((tab) => {
            const selected = tab.dataset.achievementTab === key;
            tab.setAttribute("aria-selected", String(selected));
            tab.tabIndex = selected ? 0 : -1;
            tab.classList.toggle("is-active", selected);
            if (selected) activeTab = tab;
        });

        panels.forEach((panel) => {
            const selected = panel.dataset.achievementPanel === key;
            panel.hidden = !selected;
            if (selected) activePanel = panel;
        });

        if (activePanel) {
            window.requestAnimationFrame(() => carousels.get(activePanel)?.refresh());
        }

        if (recordHistory && window.location.hash !== `#${key}`) {
            window.history.pushState(null, "", `#${key}`);
        }

        if (focus || (focusedPanel && focusedPanel !== activePanel)
            || (tabList.contains(document.activeElement) && document.activeElement !== activeTab)) {
            activeTab?.focus();
        }
        if (reveal && activePanel) showPanelStart(activePanel);
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            activate(tab.dataset.achievementTab, { recordHistory: true, reveal: true });
        });

        tab.addEventListener("keydown", (event) => {
            let nextIndex;

            switch (event.key) {
                case "ArrowRight":
                    nextIndex = (index + 1) % tabs.length;
                    break;
                case "ArrowLeft":
                    nextIndex = (index - 1 + tabs.length) % tabs.length;
                    break;
                case "Home":
                    nextIndex = 0;
                    break;
                case "End":
                    nextIndex = tabs.length - 1;
                    break;
                case "Enter":
                case " ":
                    event.preventDefault();
                    activate(tab.dataset.achievementTab, { recordHistory: true, reveal: true });
                    return;
                default:
                    return;
            }

            event.preventDefault();
            activate(tabs[nextIndex].dataset.achievementTab, {
                recordHistory: true,
                focus: true,
                reveal: true
            });
        });
    });

    const syncFromLocation = () => activate(keyFromHash());
    window.addEventListener("resize", () => {
        window.requestAnimationFrame(() => {
            panels.forEach((panel) => carousels.get(panel)?.refresh());
        });
    });
    window.addEventListener("portfolio-language-change", () => {
        carousels.forEach(({ updateCopy, refresh }) => {
            updateCopy();
            refresh();
        });
    });
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    syncFromLocation();
})();
