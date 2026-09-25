(() => {
  "use strict";

  // The HTML is the Japanese source of truth. Keep translations here so the
  // same copy is restored exactly when visitors switch back to Japanese.
  const common = {
    "本文へ移動": "Skip to main content",
    "小川樹のポートフォリオ・Home": "Tatsuki Ogawa's portfolio · Home",
    "主なページ": "Main navigation",
    "トップ": "Home",
    "自己紹介": "About me",
    "使用技術": "Skills",
    "実績": "Achievements",
    "資格": "Qualifications",
    "連絡先": "Contact",
    "メニューを開く": "Open menu",
    "メニューを閉じる": "Close menu",
    "表示言語": "Display language",
    "日本語で表示": "View in Japanese",
    "英語で表示": "View in English",
    "詳しく見る": "View details",
    "制作物": "Projects",
    "経験": "Experience",
    "インターン": "Internships",
    "参加": "Participated",
    "使用": "Used",
    "学習中": "Learning",
    "導入予定": "Planned",
    "名前": "Name",
    "年齢": "Age",
    "出身": "Hometown",
    "学校": "School",
    "趣味": "Hobby",
    "小川 樹": "Tatsuki Ogawa",
    "21歳": "21 years old",
    "21歳（2026年9月時点）": "21 years old (as of September 2026)",
    "（2026年9月時点）": "(as of September 2026)",
    "静岡県伊東市": "Ito, Shizuoka",
    "日本工学院八王子専門学校": "Nippon Kogakuin Hachioji College",
    "筋力トレーニング": "Strength training",
    "メール": "Email",
    "Homeへ戻る": "Back to Home",
    "連絡先を見る": "View contact",
    "連絡先を見る →": "View contact →",
    "使用技術を見る": "View skills",
    "資格を見る": "View qualifications",
    "次に見るページ": "Explore next",
    "新しいタブ": "new tab",
    "（新しいタブ）": "(opens in a new tab)",
    "ポートフォリオのコードを見る（外部サイト）": "View portfolio source code (external site)",
    "マソ君の日常での利用を見る": "See how it was used in Maso-kun's Daily Life",
    "シフト提出システムでの利用を見る": "See how it was used in the shift submission system",
    "実績を見る": "View achievements",
    "小川樹 | Portfolio": "Tatsuki Ogawa | Portfolio",
    "About | 小川樹のポートフォリオ": "About | Tatsuki Ogawa Portfolio",
    "Skills｜使用技術 | Tatsuki Portfolio": "Skills | Tatsuki Portfolio",
    "Achievements | 小川樹": "Achievements | Tatsuki Ogawa",
    "Qualification｜資格 | Tatsuki Portfolio": "Qualifications | Tatsuki Portfolio",
    "Contact | 小川樹": "Contact | Tatsuki Ogawa"
  };

  const home = {
    "現場の課題を、": "Turning problems into",
    "使える仕組みに。": "practical tools.",
    "小川樹です。日本工学院八王子専門学校でITを学びながら、身近な課題からシフト提出システムや筋トレ日記アプリを制作しています。": "I'm Tatsuki Ogawa. While studying IT at Nippon Kogakuin Hachioji College, I build practical tools for problems close to home, including a shift submission system and a workout diary app.",
    "制作物・実績を見る": "View projects and achievements",
    "自己紹介を見る": "Read about me",
    "プロフィール概要": "Profile summary",
    "知りたいところから、": "Start with what",
    "ご覧ください。": "interests you.",
    "人物像から制作物まで、5つのページにまとめました。各項目の概要から詳しい内容へ進めます。": "Five pages introduce my background, work, and experience. Browse each summary and open the details that interest you.",
    "静岡県伊東市出身。サッカーを12年間続け、現在はITを学びながら筋力トレーニングとパーソナルトレーナーの活動にも取り組んでいます。": "I am from Ito, Shizuoka. After playing soccer for 12 years, I now study IT while pursuing strength training and working as a personal trainer.",
    "Web制作とアプリ開発で使った技術を、用途ごとに整理しました。実際に使ったものと、現在学んでいるものを区別して紹介します。": "Explore the technologies I have used in web and app development, grouped by purpose and separated from those I am currently learning.",
    "シフト提出システムや「マソ君の日常」に加え、ハッカソンで制作した京都観光アプリとインターンで取り組んだ画像処理アプリを紹介します。": "Explore my shift submission system, Maso-kun's Daily Life, a Kyoto travel app built at a hackathon, and an image-processing app developed during an internship.",
    "ITとビジネスの学習を重ね、基本情報技術者試験、情報検定、ビジネス能力検定などを取得しました。年月順に確認できます。": "I have earned qualifications in IT and business, including the Fundamental Information Technology Engineer Examination. View them by date.",
    "制作物や活動についてのご連絡はこちらから。メールとGitHubのリンクを掲載しています。": "Get in touch about my projects or activities. Email and GitHub links are available here.",
    "制作物": "Projects",
    "基本情報技術者試験": "Fundamental Information Technology Engineer Examination",
    "J検": "J-Ken",
    "B検2級": "Business Kentei, Grade 2",
    "小川樹のポートフォリオ。自己紹介、使用技術、制作物と経験、資格、連絡先を紹介します。": "Tatsuki Ogawa's portfolio: background, skills, projects, experience, qualifications, and contact information.",
    "Aboutを詳しく見る": "Read more about me",
    "Skillsを詳しく見る": "Explore my skills",
    "Achievementsを詳しく見る": "Explore my achievements",
    "Qualificationを詳しく見る": "Explore my qualifications",
    "Contactを詳しく見る": "Open contact details"
  };

  const about = {
    "About / 自己紹介": "About / Profile",
    "小川 樹について": "About Tatsuki Ogawa",
    "静岡県伊東市出身。専門学校でITを学びながら、身近な課題を解決するアプリの開発と、パーソナルトレーナーの活動に取り組んでいます。": "I'm from Ito, Shizuoka. I study IT at a vocational college, develop apps that address everyday problems, and work as a personal trainer.",
    "基本情報": "Profile",
    "これまでの経歴": "My journey",
    "学び、開発、トレーニングに取り組んできた歩みです。": "Key milestones in my studies, development work, and training.",
    "12年間続けたサッカーを引退。": "Finished playing soccer after 12 years.",
    "IT未経験で日本工学院八王子専門学校に入学。同月から本格的に筋力トレーニングを始めました。": "Enrolled at Nippon Kogakuin Hachioji College with no prior IT experience and began strength training in earnest that same month.",
    "基本情報技術者試験に合格。": "Passed the Fundamental Information Technology Engineer Examination.",
    "マッスルゲート静岡大会のフィジーク172cm以下級で、新人の部優勝、一般の部4位に入賞。": "Won the novice division and placed fourth in the open division of the under-172 cm physique category at Muscle Gate Shizuoka.",
    "パーソナルトレーナーとして活動を開始。": "Started working as a personal trainer.",
    "勤務先のシフト提出で感じた課題をきっかけに、初の個人開発を始めました。同月、学内ビジネスコンテストのプロジェクトも始動。": "Began my first independent software project after noticing problems with shift submissions at work. I also started a project for a school business competition.",
    "学内ビジネスコンテストで9チーム中2位。": "Placed second out of nine teams in a school business competition.",
    "シフト提出システムが完成し、自店舗で検証を開始。RIZAPテクノロジーズ株式会社のインターンに参加し、関西ビギナーズハッカソンにも初めて参加しました。": "Completed the shift submission system and began testing it at my workplace. I joined an internship at RIZAP Technologies and participated in the Kansai Beginners Hackathon for the first time.",
    "ウェブフロンティア株式会社のインターンに参加。": "Joined an internship at Web Frontier.",
    "取り組みの詳細を見る": "Explore these activities",
    "人生設計": "Personal goal",
    "周りの人が幸せだと言える状態をつくりたい。そのために、自分もやりたいことを先延ばしにせず、目の前の仕事や挑戦に向き合いたいと考えています。": "I want to help create a life in which the people around me can say they are happy. I also want to face the work and challenges in front of me without putting off what matters to me.",
    "キャリアプラン": "Career plan",
    "役割を広げながら、周囲の人が力を発揮できる仕事に取り組みたいと考えています。": "As my responsibilities grow, I want to help others do their best work.",
    "5年後": "In five years",
    "メンバー一人ひとりの強みや希望を理解し、挑戦と小さな成功を重ねられるチームをつくるリーダーを目指します。自分から提案し、行動することも大切にします。": "I aim to lead a team where each person's strengths and goals are understood and where small successes build confidence. I will contribute ideas and take action myself.",
    "10年後": "In ten years",
    "顧客が喜ぶ体験と事業としての成果の両方に向き合い、長く選ばれる事業づくりを担いたいと考えています。": "I hope to help build a lasting business by focusing on both customer experience and measurable results.",
    "20年後": "In twenty years",
    "同じ思いを持つリーダーを育て、人が育ち、価値を生み続ける仕組みを広げたいと考えています。": "I want to develop leaders who share this outlook and expand systems that help people grow and create lasting value.",
    "小川樹のプロフィール、これまでの経歴、人生設計とキャリアプランを紹介します。": "Learn about Tatsuki Ogawa's background, experience, personal goals, and career plan."
  };

  const skills = {
    "Skills / 使用技術": "Skills / Technologies",
    "技術と使った場面": "Technologies in practice",
    "制作で使った技術と、現在学んでいる技術を分けて紹介します。各カードから、実際に使った制作物も確認できます。": "I distinguish technologies I have used in projects from those I am currently learning. Each card links to a related project where available.",
    "フロントエンド": "Front-end",
    "Webページとアプリの画面づくりで使った技術です。": "Technologies I have used to build web pages and app interfaces.",
    "ページ構造と、見出しやリンクの意味が伝わるマークアップ。": "Semantic markup that gives structure and meaning to headings and links.",
    "スマートフォンにも対応するレイアウトと画面表現。": "Layouts and visual styles that adapt to smartphones.",
    "入力画面の操作、確認表示、サーバーとのやり取り。": "Form interactions, confirmation states, and communication with the server.",
    "筋トレ記録アプリの画面を部品に分けて実装。": "Built the workout app interface from reusable components.",
    "画面構成とページ間の移動を実装。": "Implemented page structure and navigation.",
    "記録データとキャラクターの育成状態を型で管理。": "Used types for workout records and character progression state.",
    "アプリの画面と、幅に合わせた表示を構築。": "Built the app interface and responsive layouts.",
    "バックエンド・データ": "Back-end and data",
    "入力内容の処理や保存に関わる技術です。": "Technologies for processing and storing submitted data.",
    "シフト提出システムの認証、入力確認、保存処理。": "Authentication, input validation, and saving data in the shift system.",
    "シフト希望や従業員情報を、運用担当者が扱える形で管理。": "Organized shift requests and employee information for workplace staff.",
    "授業で文法とプログラムの基礎を学習。": "Studying syntax and programming fundamentals in class.",
    "筋トレ記録アプリの認証とクラウド保存に向けて準備中。": "Preparing authentication and cloud storage for the workout app.",
    "開発・品質管理": "Development and quality",
    "ソース管理と、入力や計算の確かさを支える技術です。": "Tools for source control and checking inputs and calculations.",
    "変更履歴を管理しながらポートフォリオを制作。": "Built this portfolio while tracking changes in version control.",
    "ソースコードの公開とバージョン管理に使用。": "Used to publish code and manage versions.",
    "筋トレ記録の入力値を確認するために使用。": "Used to validate workout record inputs.",
    "記録量や育成ポイントの計算処理をテスト。": "Tested calculations for workout volume and progression points.",
    "ネットワーク": "Networking",
    "通信の仕組みとネットワーク構成の基礎を学んでいます。": "Learning the fundamentals of communication and network design.",
    "ネットワーク / CCNA": "Networking / CCNA",
    "授業と資格学習を通じて、構成と通信の基礎を学習。": "Studying network structure and communication through classes and certification preparation.",
    "小川樹が制作と学習で触れた技術を、分野と経験段階ごとに紹介します。": "Explore the technologies Tatsuki Ogawa has used and is learning, grouped by field and experience level."
  };

  const achievements = {
    "実績の分類": "Achievement categories",
    "表示する実績を選択": "Select an achievement category",
    "制作物、これまでの経験、インターンへの参加をまとめました。上の項目から内容を切り替えられます。": "Explore my projects, experiences, and internships. Use the tabs above to switch categories.",
    "2件": "2 items",
    "4件": "4 items",
    "インターン制作": "Internship project",
    "顔マスク処理アプリ": "Face Mask App",
    "インターンで取り組んだ、画像内の顔を検出して絵文字スタンプを重ねるWebアプリです。最大10枚の一括処理と画像ごとの結果表示に対応します。": "An internship web app that detects faces in uploaded images and overlays emoji masks. It processes up to 10 images in one batch and shows results for each image.",
    "制作の場": "Project context",
    "ウェブフロンティア株式会社のインターン": "Internship at Web Frontier",
    "Next.js、React、TypeScript、Tailwind CSS": "Next.js, React, TypeScript, Tailwind CSS",
    "ハッカソン制作": "Hackathon project",
    "訪問済みの場所を選び、京都でまだ知らないスポットを探す試作アプリです。関西ビギナーズハッカソン vol.8で制作し、公開デモには一部サンプルデータを使用しています。": "A prototype for finding new places in Kyoto after selecting spots already visited. Built at Kansai Beginners Hackathon vol. 8; the public demo includes some sample data.",
    "関西ビギナーズハッカソン vol.8": "Kansai Beginners Hackathon vol. 8",
    "デモを開く": "Open demo",
    "自店舗で検証中": "Being tested at my workplace",
    "シフト提出システム": "Shift submission system",
    "勤務先のシフト提出で感じた課題をきっかけに、Google Apps Scriptを使って個人開発しました。2026年8月に完成し、自店舗で検証しています。": "I developed this system with Google Apps Script after noticing problems with shift submissions at work. Completed in August 2026, it is now being tested at my workplace.",
    "取り組み": "Approach",
    "業務課題からの個人開発": "Independent project based on a workplace problem",
    "使用技術": "Technologies",
    "シフト提出システムの詳細を見る": "Read about the shift submission system",
    "Web公開中": "Available online",
    "マソ君の日常": "Maso-kun's Daily Life",
    "筋トレの記録と2Dキャラクターの育成を組み合わせたWebアプリです。重量・回数・セット数から成果を見える形にし、記録の継続につなげます。": "A web app combining workout logging with a growing 2D character. It turns weights, repetitions, and sets into visible progress to make logging more rewarding.",
    "役割": "Role",
    "個人開発": "Independent development",
    "現状": "Current status",
    "Web公開中・記録はブラウザ内に保存": "Available online; records are stored in the browser",
    "Next.js、React、TypeScript": "Next.js, React, TypeScript",
    "マソ君の日常の詳細を見る": "Read about Maso-kun's Daily Life",
    "アプリを開く": "Open app",
    "GitHubでコードを見る": "View code on GitHub",
    "関西ビギナーズハッカソン": "Kansai Beginners Hackathon",
    "初めてハッカソンに参加しました。": "Participated in my first hackathon.",
    "9チーム中2位": "2nd of 9 teams",
    "学内ビジネスコンテスト": "School business competition",
    "5人のチームで、失敗や不満を企業の改善につなげる事業案「Feilink」を企画しました。学内ビジネスコンテストで9チーム中2位となりました。": "As part of a five-person team, I developed Feilink, a business idea that turns complaints and setbacks into company improvements. We placed second out of nine teams in a school business competition.",
    "事業構想の詳細を見る": "Read about the business concept",
    "活動開始": "Started working",
    "パーソナルトレーナー": "Personal trainer",
    "これまでの筋力トレーニングの経験を生かし、パーソナルトレーナーとして活動を始めました。": "I began working as a personal trainer, drawing on my strength training experience.",
    "受賞": "Awarded",
    "マッスルゲート静岡大会": "Muscle Gate Shizuoka",
    "フィジーク172cm以下級で、新人の部優勝、一般の部4位入賞。大会に向けて継続して取り組みました。": "Won the novice division and placed fourth in the open division of the under-172 cm physique category after sustained preparation.",
    "大会への取り組みを見る": "Read about the competition",
    "公開可能な担当内容を確認しているため、現在は参加先と年月を掲載しています。": "Details of my work are being checked for publication. For now, the organizations and dates are listed.",
    "ウェブフロンティア株式会社": "Web Frontier Co., Ltd.",
    "RIZAPテクノロジーズ株式会社": "RIZAP Technologies, Inc.",
    "小川樹の制作物、活動経験、インターン参加歴を紹介します。": "Explore Tatsuki Ogawa's projects, experiences, and internships."
  };

  const qualification = {
    "Qualification / 資格": "Qualifications",
    "取得した資格": "Qualifications earned",
    "学習や活動を通じて取得した資格と免許を、取得年月の新しい順に掲載しています。": "Qualifications and licenses earned through study and experience, listed from newest to oldest.",
    "資格・免許一覧": "Qualifications and licenses",
    "取得年月の新しい順": "Newest first",
    "ビジネス能力検定ジョブパス（B検）2級": "Business Kentei Job Pass (B-Ken), Grade 2",
    "情報検定（J検）情報システム試験 システムエンジニア認定": "J-Ken Information Systems Examination: Systems Engineer certification",
    "情報検定（J検）情報システム試験 プログラマ認定": "J-Ken Information Systems Examination: Programmer certification",
    "基本情報技術者試験 合格": "Passed the Fundamental Information Technology Engineer Examination",
    "情報検定（J検）情報活用試験 2級": "J-Ken Information Literacy Examination, Grade 2",
    "普通自動車第一種運転免許": "Japanese Class 1 ordinary driver's license",
    "小川樹が取得した資格と免許を、取得年月の新しい順に紹介します。": "Qualifications and licenses earned by Tatsuki Ogawa, listed from newest to oldest."
  };

  const contact = {
    "制作物や活動についてのご連絡はメールからお願いします。公開しているコードはGitHubでご覧いただけます。": "Please contact me by email about my projects or activities. You can browse my public code on GitHub.",
    "連絡方法": "Ways to contact me",
    "メールを作成する": "Compose an email",
    "プロフィールを開く（新しいタブ）": "Open profile (new tab)",
    "小川樹への連絡先とGitHubプロフィールをご案内します。": "Email Tatsuki Ogawa or visit his GitHub profile."
  };

  const byPage = { home, about, skills, achievements, qualification, contact };
  const page = document.body.dataset.page || "";
  const dictionary = { ...common, ...(byPage[page] || {}) };
  const secondaryLabels = {
    "トップ": "Start",
    "自己紹介": "Profile",
    "使用技術": "Technologies",
    "実績": "Projects",
    "資格": "Credentials",
    "連絡先": "Get in touch"
  };
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();
  const titleSource = document.title;
  const description = document.querySelector('meta[name="description"]');
  const descriptionSource = description?.getAttribute("content") || "";
  const buttons = [...document.querySelectorAll("[data-language]")];
  const menuToggle = document.querySelector(".v2-menu-toggle");
  const siteHeader = document.querySelector(".v2-header");
  const siteFooter = document.querySelector(".v2-footer");
  const legacyPage = Boolean(document.body.classList.contains("detail-page"));
  const main = document.querySelector("main");

  const readLanguage = () => {
    try {
      return window.localStorage.getItem("portfolio-language") === "en" ? "en" : "ja";
    } catch {
      return "ja";
    }
  };

  let language = readLanguage();

  const translateText = (value, override) => {
    if (language === "ja") return value;
    const trimmed = value.trim();
    const translated = override || dictionary[trimmed];
    if (!translated) return value;
    const leading = value.match(/^\s*/u)?.[0] || "";
    const trailing = value.match(/\s*$/u)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  };

  const translateNodes = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim() || node.parentElement?.closest("script, style, noscript, textarea, .v2-language-switcher, #language-status, .v2-language-notice")) {
          return NodeFilter.FILTER_REJECT;
        }
        if (legacyPage && !node.parentElement?.closest(".v2-header, .v2-footer, .v2-skip-link, .skip-link")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!textSources.has(node)) textSources.set(node, node.nodeValue);
      const original = textSources.get(node);
      const secondary = node.parentElement?.matches(".v2-nav a span, .v2-preview h3 span")
        ? secondaryLabels[original.trim()]
        : undefined;
      node.nodeValue = translateText(original, secondary);
    }
  };

  const translateAttributes = () => {
    document.querySelectorAll("[aria-label], [title], [placeholder], [alt]").forEach((element) => {
      if (legacyPage && !element.closest(".v2-header, .v2-footer, .v2-skip-link, .skip-link")) return;
      if (!attributeSources.has(element)) attributeSources.set(element, new Map());
      const source = attributeSources.get(element);
      ["aria-label", "title", "placeholder", "alt"].forEach((name) => {
        if (!element.hasAttribute(name) || (element === menuToggle && name === "aria-label")) return;
        if (!source.has(name)) source.set(name, element.getAttribute(name));
        element.setAttribute(name, translateText(source.get(name)));
      });
    });
    if (!legacyPage) {
      document.title = translateText(titleSource);
      if (description) description.setAttribute("content", translateText(descriptionSource));
    }
  };

  const updateMenuLabel = () => {
    if (!menuToggle) return;
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", language === "en"
      ? (open ? "Close menu" : "Open menu")
      : (open ? "メニューを閉じる" : "メニューを開く"));
  };

  const updateLegacyNotice = () => {
    if (!legacyPage || !main) return;
    let notice = document.querySelector(".v2-language-notice");
    if (!notice) {
      notice = document.createElement("p");
      notice.className = "v2-language-notice";
      notice.lang = "en";
      notice.textContent = "This project detail is available in Japanese. Return to a main page to change the display language.";
      main.prepend(notice);
    }
    notice.hidden = language !== "en";
    if (language === "en") {
      document.body.lang = "ja";
      if (siteHeader) siteHeader.lang = "en";
      if (siteFooter) siteFooter.lang = "en";
    } else {
      document.body.removeAttribute("lang");
      siteHeader?.removeAttribute("lang");
      siteFooter?.removeAttribute("lang");
    }
  };

  const apply = (nextLanguage, announce = false) => {
    language = nextLanguage === "en" ? "en" : "ja";
    document.documentElement.lang = language;
    translateNodes();
    translateAttributes();
    updateMenuLabel();
    updateLegacyNotice();
    buttons.forEach((button) => {
      const selected = button.dataset.language === language;
      button.setAttribute("aria-pressed", String(selected));
      button.classList.toggle("is-active", selected);
      if (button.dataset.language === "ja") {
        button.setAttribute("aria-label", language === "en" ? "View in Japanese" : "日本語で表示");
      } else if (button.dataset.language === "en") {
        button.setAttribute("aria-label", language === "en" ? "View in English" : "英語で表示");
      }
    });
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {
      // The current page can still switch languages without browser storage.
    }
    if (announce) {
      const status = document.querySelector("#language-status");
      if (status) status.textContent = language === "en" ? "Switched to English" : "日本語に切り替えました";
    }
    window.dispatchEvent(new CustomEvent("portfolio-language-change", { detail: { language } }));
  };

  buttons.forEach((button) => button.addEventListener("click", () => apply(button.dataset.language, true)));
  if (menuToggle) {
    new MutationObserver(updateMenuLabel).observe(menuToggle, { attributes: true, attributeFilter: ["aria-expanded"] });
  }
  apply(language);
})();
