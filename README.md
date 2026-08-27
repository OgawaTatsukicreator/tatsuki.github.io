# Tatsuki Portfolio

IT業界を志望する専門学生、Tatsukiのポートフォリオサイトです。学習中の技術、制作したWebアプリ、資格、ボディコンテストの経験、チームで考えた事業案を掲載しています。

サイト本体はHTML、CSS、JavaScriptだけで構成しています。ビルド作業や外部ライブラリのインストールは不要です。

- リポジトリ: [OgawaTatsukicreator/tatsuki.github.io](https://github.com/OgawaTatsukicreator/tatsuki.github.io)
- エントリーページ: `index.html`
- 公開URL: リポジトリ内にGitHub Pagesの公開先は記録されていません

## ページ一覧

| ファイル | 内容 | 現在の状態 |
| --- | --- | --- |
| `index.html` | 自己紹介、スキル、制作物、経験、資格、連絡先 | トップページ |
| `pages/work-shift-system.html` | Google Apps Scriptで作成したシフト提出システム | 画面画像と公開URLは準備中 |
| `pages/work-training-diary.html` | 筋トレ記録と2Dキャラクター育成を組み合わせた「マソ君の日常」 | アプリ本体はローカル開発中 |
| `pages/body-contest.html` | マッスルゲート静岡県大会への挑戦 | 新人の部優勝実績を掲載。一部は追記予定 |
| `pages/business-model.html` | 失敗や不満を企業へ届ける事業案「Feilink」 | 企画時点の試算と検証課題を掲載 |
| `pages/work-coming-soon.html` | 次の制作物用ページ | 内容は準備中 |

## 制作物

このリポジトリに含まれるのは、各制作物の紹介ページです。シフト提出システムと「マソ君の日常」のアプリ本体のソースコードは含まれていません。

### シフト提出システム

約30名の従業員がスマートフォンからシフト希望を提出するWebアプリです。Googleスプレッドシートへ直接入力していた運用を見直し、1回の入力時間を約2分から約30秒へ短縮しました。

従業員IDによるログイン、初回パスワード登録、下書き保存、希望の再提出、PT申請履歴の確認に対応しています。管理者は従来どおりGoogleスプレッドシートで調整できます。

紹介ページに記載している使用技術は次のとおりです。

- Google Apps Script
- Google Sheets
- HTML、CSS、JavaScript
- `google.script.run`

### マソ君の日常

筋トレの重量、回数、セット数からトータルボリュームを計算し、育成ポイントへ変換するWebアプリです。記録を続けると2Dキャラクターの見た目が50段階で変化します。

ホーム、記録カレンダー、トレーニング入力、履歴分析の4画面を用意しています。現在はブラウザ内へ記録を保存しており、Supabaseへの保存処理とWeb公開は今後の作業です。

紹介ページに記載している使用技術は次のとおりです。

- Next.js 16、React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- Zod
- Vitest

これらは「マソ君の日常」本体の技術です。このポートフォリオサイト自体の動作には必要ありません。

## サイトの実装

### 使用技術

- HTML5
- CSS3
- Vanilla JavaScript
- Git、GitHub

`package.json`やビルド設定はありません。トップページの動きは`js/script.js`、全ページの見た目は`css/style.css`で管理しています。

### 画面の動き

トップページには次の動きを実装しています。

- ページを開いたときのイントロ表示
- 紹介文のタイプライター表示
- `IntersectionObserver`を使ったスクロール表示
- ページ内リンクのスムーズスクロール

`IntersectionObserver`を使えないブラウザーや、利用者が動きを減らす設定にしている場合は、内容を最初から表示します。

### レスポンシブ対応

画面幅に応じてレイアウトを切り替えます。

- 820px以下: 複数列の内容を1列または2列へ変更
- 520px以下: ボタン、詳細ページ、制作物一覧をスマートフォン向けに変更

トップページの背景画像には`images/back.png`を使用しています。

## アクセシビリティ

現在の実装には次の対応が入っています。

- コンテンツ量の多いページの先頭に、本文へのスキップリンクを設置
- キーボード操作時にフォーカス枠を表示
- `header`、`nav`、`main`、`section`、`footer`を使った文書構造
- ナビゲーションや実績欄への`aria-label`
- 装飾用の文字や図形への`aria-hidden="true"`
- タイプライター表示と同じ文章をスクリーンリーダー向けに用意
- `prefers-reduced-motion: reduce`が有効な場合はイントロ、アニメーション、スムーズスクロールを停止

内容を追加するときも、見出しの順番、リンクの名前、キーボード操作、色の判別しやすさを確認してください。

## ファイル構成

```text
tatsuki.github.io/
├─ .vscode/
│  └─ settings.json
├─ css/
│  └─ style.css
├─ images/
│  └─ back.png
├─ js/
│  └─ script.js
├─ pages/
│  ├─ body-contest.html
│  ├─ business-model.html
│  ├─ work-shift-system.html
│  ├─ work-training-diary.html
│  └─ work-coming-soon.html
├─ index.html
└─ README.md
```

`index.html`をルートへ置き、CSS、JavaScript、画像、詳細ページを種類ごとに分けています。このサイトの規模では、場所が見つけやすく、GitHub Pagesでも扱いやすい構成です。`.vscode`はLive Serverの開発用設定で、公開ページからは参照しません。

今後ファイル数が大きく増えた場合は、`css`、`js`、`images`を`assets`配下へまとめる方法もあります。現時点では階層が一段増えるだけなので採用していません。`style.css`も、ページごとの変更が増えてから`base.css`と各ページ用CSSへ分ける方が管理しやすくなります。

この変更により、従来の`/Mypage/`を含むURLは使えなくなります。公開済みのURLやブックマークがある場合は、新しいルートURLへ更新してください。

## ローカル確認

VS CodeのLive Serverを使う場合は、`index.html`を開いてLive Serverを起動します。`.vscode/settings.json`でポート`5501`を指定しています。

Pythonの簡易HTTPサーバーを使う場合は、リポジトリのルートで次を実行します。

```powershell
python -m http.server 5501
```

起動後は[http://localhost:5501/](http://localhost:5501/)を開きます。HTML、CSS、JavaScriptを保存してブラウザーを再読み込みすれば変更を確認できます。

## 更新手順

1. トップページの文章や一覧は`index.html`で変更します。
2. 制作物や経験の詳しい内容は、`pages`内の対応するHTMLファイルで変更します。
3. 色、余白、配置、スマートフォン表示は`css/style.css`で調整します。
4. イントロ、タイプライター、スクロール表示は`js/script.js`で変更します。
5. 新しい詳細ページを追加した場合は、`index.html`のリンクと詳細ページ間の前後リンクを更新します。
6. PC幅、820px以下、520px以下で表示を確認します。
7. Tabキーだけでリンクを移動できるか確認します。
8. OSの「アニメーションを減らす」設定を有効にし、内容が欠けないことを確認します。

相対パスは、次の基準で記述します。

- トップページから詳細ページ: `pages/ファイル名.html`
- 詳細ページからトップページ: `../index.html`
- トップページからCSS: `css/style.css`
- 詳細ページからCSS: `../css/style.css`
- CSSから背景画像: `../images/back.png`

制作物ページには準備中の画像とURLがあります。公開するときは、実データや個人情報をダミー情報へ置き換えてから掲載してください。

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
