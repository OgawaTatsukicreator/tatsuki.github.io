(() => {
    "use strict";

    const translations = {
        ja: {
            skipToContent: "本文へ移動",
            languageSelector: "表示言語",
            languageEnglish: "英語で表示",
            languageJapanese: "日本語で表示",
            mainNavigation: "メインナビゲーション",
            languageChanged: "日本語に切り替えました",
            menuOpen: "メニューを開く",
            menuClose: "メニューを閉じる",
            navAbout: "自己紹介",
            navSkills: "技術スタック",
            navWorks: "制作物",
            navExperience: "経験",
            navContact: "連絡先",
            heroStatement: "挑戦を楽しみ、ITで価値を生み出す。将来はITとfitnessを掛け合わせた事業で、fitness人口の拡大に貢献することを目指しています。",
            heroViewProjects: "制作物を見る",
            heroContact: "連絡する",
            aboutTitle: "自己紹介",
            aboutDescription1: "IT業界を志望している専門学生です。学業でWeb制作やPython、ネットワークを学びながら、学外ではトレーナーとして活動しています。",
            aboutDescription2: "IT技術が社会に大きな影響を与えていることに魅力を感じ、人の行動や健康を支えるサービスづくりに関わりたいと考えています。",
            skillsTitle: "技術スタック",
            skillsIntro: "このサイトで実際に使った技術と、制作物で使った技術、現在学んでいる技術を分けて掲載しています。",
            skillsPortfolioTitle: "ポートフォリオ制作",
            skillsPortfolioDescription: "外部フレームワークを使わず、HTML、CSS、JavaScriptで制作しています。",
            statusUsed: "使用",
            skillsHtmlDescription: "セマンティックなページ構造と複数ページの導線",
            skillsCssDescription: "Grid、Flexbox、レスポンシブ対応、アニメーション",
            skillsJavascriptDescription: "イントロ、タイプライター、スクロール表示",
            skillsGitDescription: "ソースコードのバージョン管理",
            skillsApplicationTitle: "アプリ開発",
            skillsApplicationDescription: "シフト提出システムと育成型筋トレ日記の開発で使用しています。",
            skillsGasDescription: "認証、入力検証、Google Sheetsへの保存",
            skillsNextDescription: "筋トレ記録アプリの画面とルーティング",
            skillsTypescriptDescription: "記録データと育成状態の型定義",
            skillsToolingDescription: "画面構築、入力検証、計算処理のテスト",
            skillsLearningTitle: "学習・導入中",
            skillsLearningDescription: "次の制作や機能追加へ向けて、基礎と実装方法を学んでいます。",
            statusLearning: "学習中",
            skillsPythonDescription: "授業を通じた文法とプログラムの基礎",
            statusPlanned: "導入予定",
            skillsSupabaseDescription: "筋トレ記録アプリの認証とデータ保存",
            skillsNetworkName: "ネットワーク / CCNA",
            skillsNetworkDescription: "ネットワーク構成と通信の基礎",
            worksTitle: "制作物",
            worksShiftTitle: "シフト提出システム",
            worksShiftDescription: "バイト先のシフト提出用システムをGASを活用して制作しました。",
            worksTrainingTitle: "育成型筋トレ日記",
            worksTrainingDescription: "従来にはない筋トレ日記×育成ゲームの融合アプリケーションです。",
            viewDetails: "詳しく見る",
            experienceTitle: "学生時代に力を入れたこと",
            experienceInstruction: "詳しく見たいテーマを選択してください。",
            experienceBodyContest: "ボディコンテスト",
            experienceBusinessModel: "ビジネスモデル",
            qualificationsTitle: "資格",
            qualificationDriversLicense: "普通自動車第一種運転免許",
            qualificationFeExam: "基本情報技術者試験",
            qualificationJkenGrade2: "J検 2級",
            qualificationJkenSePg: "J検（SE,PG認定）",
            contactTitle: "お問い合わせ",
            contactThanks: "ポートフォリオをご覧いただきありがとうございます。",
            contactLinksLabel: "連絡先リンク",
            contactGmailLabel: "Gmailで新規メール画面を開く",
            contactGithubLabel: "GitHubプロフィールを新しいタブで開く",
            contactInstagramLabel: "Instagramを新しいタブで開く"
        },
        en: {
            skipToContent: "Skip to main content",
            languageSelector: "Display language",
            languageEnglish: "View in English",
            languageJapanese: "View in Japanese",
            mainNavigation: "Main navigation",
            languageChanged: "Switched to English",
            menuOpen: "Open menu",
            menuClose: "Close menu",
            navAbout: "About",
            navSkills: "Technology Stack",
            navWorks: "Projects",
            navExperience: "Experience",
            navContact: "Contact",
            heroStatement: "I enjoy taking on challenges and creating value through IT. In the future, I aim to combine IT and fitness to help more people embrace fitness.",
            heroViewProjects: "View Projects",
            heroContact: "Contact Me",
            aboutTitle: "About Me",
            aboutDescription1: "I am a vocational school student pursuing a career in IT. I study web development, Python, and networking while also working as a fitness trainer outside school.",
            aboutDescription2: "I am inspired by the impact IT has on society and hope to build services that support people's daily habits and health.",
            skillsTitle: "Technology Stack",
            skillsIntro: "The technologies are grouped by those used to build this site, those used in my projects, and those I am currently learning.",
            skillsPortfolioTitle: "Portfolio Development",
            skillsPortfolioDescription: "This site is built with HTML, CSS, and JavaScript without external frameworks.",
            statusUsed: "Used",
            skillsHtmlDescription: "Semantic page structure and navigation across multiple pages",
            skillsCssDescription: "Grid, Flexbox, responsive design, and animations",
            skillsJavascriptDescription: "Intro, typewriter, and scroll-reveal animations",
            skillsGitDescription: "Source code version control",
            skillsApplicationTitle: "Application Development",
            skillsApplicationDescription: "Used to develop a shift submission system and a gamified workout diary.",
            skillsGasDescription: "Authentication, input validation, and saving data to Google Sheets",
            skillsNextDescription: "Interface and routing for the workout logging app",
            skillsTypescriptDescription: "Type definitions for workout records and progression state",
            skillsToolingDescription: "UI development, input validation, and calculation tests",
            skillsLearningTitle: "Currently Learning & Implementing",
            skillsLearningDescription: "I am learning the fundamentals and implementation methods needed for future projects and features.",
            statusLearning: "Learning",
            skillsPythonDescription: "Programming syntax and fundamentals through coursework",
            statusPlanned: "Planned",
            skillsSupabaseDescription: "Authentication and data storage for the workout logging app",
            skillsNetworkName: "Networking / CCNA",
            skillsNetworkDescription: "Fundamentals of network architecture and communication",
            worksTitle: "Projects",
            worksShiftTitle: "Shift Submission System",
            worksShiftDescription: "I built a shift submission system for my part-time workplace using Google Apps Script (GAS).",
            worksTrainingTitle: "Gamified Workout Diary",
            worksTrainingDescription: "A unique app combining a workout diary with a character-development game.",
            viewDetails: "View Details",
            experienceTitle: "Key Experiences During My Studies",
            experienceInstruction: "Select a topic to learn more.",
            experienceBodyContest: "Body Contest",
            experienceBusinessModel: "Business Model",
            qualificationsTitle: "Qualifications",
            qualificationDriversLicense: "Japanese Class 1 Ordinary Driver's License",
            qualificationFeExam: "Fundamental Information Technology Engineer Examination (FE)",
            qualificationJkenGrade2: "J-Ken, Grade 2",
            qualificationJkenSePg: "J-Ken (SE / PG Certified)",
            contactTitle: "Contact",
            contactThanks: "Thank you for viewing my portfolio.",
            contactLinksLabel: "Contact links",
            contactGmailLabel: "Open Gmail to compose a new email",
            contactGithubLabel: "Open my GitHub profile in a new tab",
            contactInstagramLabel: "Open Instagram in a new tab"
        }
    };

    const readStoredLanguage = () => {
        try {
            return window.localStorage.getItem("portfolio-language") === "en" ? "en" : "ja";
        } catch (error) {
            return "ja";
        }
    };

    let currentLanguage = readStoredLanguage();
    let refreshMenuButton = null;

    const translate = (key) => translations[currentLanguage][key] ?? key;

    const applyLanguage = (language, announce = false) => {
        currentLanguage = language === "en" ? "en" : "ja";
        document.documentElement.lang = currentLanguage;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const value = translations[currentLanguage][element.dataset.i18n];

            if (typeof value === "string") {
                element.textContent = value;
            }
        });

        document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
            const value = translations[currentLanguage][element.dataset.i18nAriaLabel];

            if (typeof value === "string") {
                element.setAttribute("aria-label", value);
            }
        });

        document.querySelectorAll("[data-language]").forEach((button) => {
            const isActive = button.dataset.language === currentLanguage;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        try {
            window.localStorage.setItem("portfolio-language", currentLanguage);
        } catch (error) {
            // Language switching still works when browser storage is unavailable.
        }

        if (refreshMenuButton) {
            refreshMenuButton();
        }

        window.dispatchEvent(new CustomEvent("portfolio-language-change"));

        if (announce) {
            const status = document.querySelector("#language-status");

            if (status) {
                status.textContent = translate("languageChanged");
            }
        }
    };

    const initializeLanguageSwitcher = () => {
        document.querySelectorAll("[data-language]").forEach((button) => {
            button.addEventListener("click", () => {
                applyLanguage(button.dataset.language, true);
            });
        });

        applyLanguage(currentLanguage);
    };

    const initializeMenu = () => {
        const toggle = document.querySelector(".menu-toggle");
        const panel = document.querySelector("#site-menu");
        const backdrop = document.querySelector("[data-menu-dismiss]");
        const links = panel ? [...panel.querySelectorAll("a")] : [];
        const logo = document.querySelector(".logo");
        const pageRegions = [
            document.querySelector(".skip-link"),
            document.querySelector(".hero"),
            document.querySelector("main"),
            document.querySelector("footer")
        ].filter(Boolean);

        if (!toggle || !panel || !backdrop) {
            return;
        }

        let isOpen = false;

        refreshMenuButton = () => {
            toggle.setAttribute("aria-label", translate(isOpen ? "menuClose" : "menuOpen"));
        };

        const setMenuState = (open, restoreFocus = false) => {
            isOpen = open;
            document.body.classList.toggle("menu-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
            panel.setAttribute("aria-hidden", String(!isOpen));
            pageRegions.forEach((region) => region.toggleAttribute("inert", isOpen));
            refreshMenuButton();

            if (isOpen) {
                window.requestAnimationFrame(() => links[0]?.focus());
            } else if (restoreFocus) {
                toggle.focus({ preventScroll: true });
            }
        };

        const getFocusableElements = () => [
            logo,
            ...document.querySelectorAll(".language-option"),
            toggle,
            ...links
        ].filter((element) => element && element.offsetParent !== null);

        const focusHashTarget = (link) => {
            const target = link.hash ? document.querySelector(link.hash) : null;

            if (!target) {
                return;
            }

            window.setTimeout(() => {
                const focusTarget = target.matches("h1, h2")
                    ? target
                    : target.querySelector("h1, h2") || target;
                const hadTabindex = focusTarget.hasAttribute("tabindex");

                if (!hadTabindex) {
                    focusTarget.setAttribute("tabindex", "-1");
                }

                focusTarget.focus({ preventScroll: true });

                if (!hadTabindex) {
                    focusTarget.addEventListener("blur", () => {
                        focusTarget.removeAttribute("tabindex");
                    }, { once: true });
                }
            }, 0);
        };

        toggle.addEventListener("click", () => {
            setMenuState(!isOpen, isOpen);
        });

        backdrop.addEventListener("click", () => setMenuState(false, true));
        links.forEach((link) => link.addEventListener("click", () => {
            setMenuState(false);
            focusHashTarget(link);
        }));
        logo?.addEventListener("click", () => {
            if (isOpen) {
                setMenuState(false);
            }

            focusHashTarget(logo);
        });

        document.addEventListener("keydown", (event) => {
            if (!isOpen) {
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                setMenuState(false, true);
                return;
            }

            if (event.key !== "Tab") {
                return;
            }

            const focusableElements = getFocusableElements();
            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        refreshMenuButton();
    };

    document.addEventListener("DOMContentLoaded", () => {
        initializeLanguageSwitcher();
        initializeMenu();
    });
})();
