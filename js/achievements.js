(() => {
    "use strict";

    const tabList = document.querySelector(".achievement-tabs");
    if (!tabList) return;

    const tabs = [...tabList.querySelectorAll("[data-achievement-tab]")];
    const panels = [...document.querySelectorAll("[data-achievement-panel]")];
    const validKeys = new Set(tabs.map((tab) => tab.dataset.achievementTab));
    const tabShell = document.querySelector(".achievement-tabs-shell");

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
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    syncFromLocation();
})();
