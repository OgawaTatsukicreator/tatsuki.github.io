# Tatsuki Portfolio

小川樹の自己紹介、使用技術、制作物・活動経験、資格、連絡先を紹介するポートフォリオです。サイトは静的なHTML、CSS、JavaScriptで作られており、ビルドは不要です。

- リポジトリ：[OgawaTatsukicreator/tatsuki.github.io](https://github.com/OgawaTatsukicreator/tatsuki.github.io)
- 改修の要件：[ポートフォリオ改修 要件定義書](Mypage/portfolio-renewal-requirements.md)
- エントリーページ：`index.html`

## 画面構成

| ページ | 役割 |
| --- | --- |
| `index.html` | 5領域の概要と各詳細ページへの入口 |
| `pages/about.html` | 基本情報、経歴、人生設計、キャリアプラン |
| `pages/skills.html` | 技術領域別のスキルと利用状況 |
| `pages/achievements.html` | 制作物・経験・インターンを切り替える実績一覧 |
| `pages/qualification.html` | 取得年月順の資格・免許一覧 |
| `pages/contact.html` | メールとGitHubへのリンク |

実績の個別ページとして `pages/work-shift-system.html`、`pages/work-training-diary.html`、`pages/body-contest.html`、`pages/business-model.html` を使用します。`pages/work-coming-soon.html` は既存ファイルとして残していますが、現在の画面からはリンクしていません。

PCでは5つの主要項目をヘッダーに常時表示し、項目を押すと対応する詳細ページへ直接移動します。狭い画面では同じ項目をメニューにまとめます。Achievementsの副メニューは、`#works`、`#experience`、`#internships` をURLに持つタブとして動作します。

## 掲載している制作物

- **シフト提出システム**：勤務先のシフト提出をスマートフォンから行えるようにした個人開発。Google Apps ScriptとGoogle Sheetsを使用し、2026年8月に完成。現在は自店舗で検証中です。
- **マソ君の日常**：筋トレ記録と2Dキャラクター育成を組み合わせたWebアプリ。[公開アプリ](https://masodiary.vercel.app/)と[ソースコード](https://github.com/OgawaTatsukicreator/Muscle-Training-Diary-Raising-Game)を参照できます。ポートフォリオの個別ページでは現在のブラウザ内保存と、今後のクラウド保存の課題を区別して説明しています。

作品の実装コードはこのリポジトリには含まれません。各作品ページには本人が担当した範囲、設計上の判断、現在の状態を記載しています。
ハッカソンとインターンは、公開可能な担当内容を確認できるまで、参加先と年月など確認済みの事実だけを掲載しています。

## サイトの実装

新しいHomeと5つの詳細ページは `css/portfolio-v2.css` と `js/portfolio-v2.js` を使用します。実績タブの切替は `js/achievements.js` に分けています。既存の作品・経験ページは `css/style.css` を使い続け、共通ヘッダーを重ねています。
Skillsの技術・サービスアイコンは `assets/icons/` に保存し、[出典と利用条件](assets/icons/README.md)を記録しています。

画面の主な仕様は次のとおりです。

- 共通ヘッダーにはHomeへのロゴと5つの詳細ページへのリンクを配置し、現在のページを示します。
- モバイルメニューはEscキーと背景のクリックでも閉じられ、開いている間は背後の本文へキーボードフォーカスが移りません。
- 実績のタブはキーボードの左右キー・Home・End・Enter・Spaceに対応し、ブラウザの戻る・進むでも選択を復元します。
- すべてのページに本文へのスキップリンクを置き、キーボードフォーカスを表示します。動きを減らす設定では画面遷移の動きを抑えます。

この改修ではページ間の言語を日本語に統一しました。旧Homeだけにあった英語切替は新しい画面では表示していません。

## ローカル確認

静的サイトなので、リポジトリのルートをローカルサーバーで公開して `index.html` を開きます。VS CodeのLive Serverを使う場合、`.vscode/settings.json` のポートは `5501` です。

変更後はPCとスマートフォンの幅で、Homeの5つの「詳しく見る」、ヘッダー、モバイルメニュー、Achievementsの3タブ、既存作品から実績一覧への戻りを確認してください。外部リンクは本人が指定した実URLだけを掲載し、個人情報を含む画像は公開前に点検します。

## 主なファイル

```text
tatsuki.github.io/
├─ assets/icons/       （SkillsのSVGアイコンと出典）
├─ css/
│  ├─ portfolio-v2.css
│  └─ style.css
├─ js/
│  ├─ portfolio-v2.js
│  └─ achievements.js
├─ pages/
│  ├─ about.html
│  ├─ skills.html
│  ├─ achievements.html
│  ├─ qualification.html
│  ├─ contact.html
│  └─ （作品・経験の個別ページ）
├─ Mypage/
│  └─ portfolio-renewal-requirements.md
├─ index.html
└─ README.md
```

---

## 付録: ローカルCodexスキルのWindows対応

更新日: 2026-08-18

ここからはポートフォリオサイトのソースコードとは別のメモです。Windows上のCodexで使う個人スキルを`%USERPROFILE%\.codex\skills`以下で調整しました。このリポジトリを別のPCへ複製しても、これらの変更は自動では引き継がれません。

### `pdf-latex`

更新前は図版の作成に未導入の`diagram-design`スキルを求めていました。更新後は導入済みの`drawio`スキルを使います。

主な変更は次のとおりです。

- `diagram-design`への依存を削除
- 編集用の`.drawio`、`.spec.yaml`、`.arch.json`と確認用のSVGを保持
- LaTeXへ挿入する図はDraw.io Desktopで出力したPDFを優先
- Draw.io Desktopがない場合は、単体SVGをEdgeまたはChromiumで3倍解像度のPNGへ変換
- SVGをLaTeXへ直接挿入するのは、対象のTeXにSVG用の処理が既にある場合だけ
- WindowsではCodex同梱の`python.exe`を優先し、`py`はPython本体が登録されている場合だけ使用

2026年8月18日の検証環境ではDraw.io Desktopを検出できなかったため、Edgeを使った代替手順を確認しました。320×180pxのSVGから960×540pxのPNGを出力し、表示も確認済みです。

### `guided-learning`

更新前の進捗保存処理はUnix専用の`fcntl`を使っていたため、Windowsでは自動テストを実行できませんでした。

更新後はOSごとにロック処理を切り替えます。

| 環境 | ロック処理 |
| --- | --- |
| Unix系OS | `fcntl.flock` |
| Windows | `LockFileEx`、`UnlockFileEx`、`threading.RLock` |

Windowsでは、固定したディレクトリハンドルを基準に保存先の作成、ファイルのオープン、一時ファイルの作成、置換、削除を行います。`NtCreateFile`と`NtSetInformationFile`を使い、保存中に対象フォルダがジャンクションや再解析ポイントへ差し替えられても、別の場所へ進捗データを書き込みません。

進捗の更新では一時ファイルへ書き込み、内容を同期してから元のファイルと置き換えます。中断後の復旧に使うトランザクション情報も維持しています。

WindowsではUnixの所有者IDやパーミッション値を使えないため、保存先の保護にはユーザープロファイルから継承したNTFSアクセス権を使います。共有フォルダや、ほかの利用者が書き換えられるフォルダを`--state-dir`へ指定しないでください。

### 確認結果

`guided-learning`のWindowsテストスイートは47件で結果はOKでした。5件はPOSIXの権限モードまたはWindowsのシンボリックリンク作成権限に関するテストのため、想定どおりスキップしています。

Windows上で次を確認しました。

- 進捗の作成、一覧、更新、読み込み
- 改訂番号の更新と競合検出
- 複数プロセス間のロック
- 原子的なファイル置換
- 中断後の復旧
- ジャンクション差し替えの拒否
- 構造化したエラー応答

`pdf-latex`のLaTeX生成スモークテストと、ファイル反映後のハッシュ一致も確認済みです。

Codexはタスク開始時にスキル定義を読み込むため、更新後の内容は新しく開始したタスクから確実に反映されます。
