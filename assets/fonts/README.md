# 配信フォント

Google Fontsで使用していた4書体を、同じ字形・太さのローカルWOFF2で配信します。日本語の書体はページごとに使用する文字を含め、欧文の2書体は全ページで共有します。フォントの形、サイズ、行間、表示の役割は変更しません。

| 配信上の名前 | 元の書体・版 | 太さ | ライセンス |
| --- | --- | --- | --- |
| Caveat | Caveat 2.000 | 700 | [OFL](LICENSE-caveat.txt) |
| Portfolio Sans JP | IBM Plex Sans JP 1.001 | 400 / 500 / 600 / 700 | [OFL](LICENSE-ibmplexsansjp.txt) |
| Shippori Mincho | Shippori Mincho 3.110 | 400 / 500 / 600 / 700 | [OFL](LICENSE-shipporimincho.txt) |
| Space Grotesk | Space Grotesk 2.000 | 500–700 | [OFL](LICENSE-spacegrotesk.txt) |

IBMのOFLは「Plex」を予約名に指定しているため、使用文字を絞ったファイルの内部名とCSS上の名前には「Portfolio Sans JP」を使います。字形は元のIBM Plex Sans JPです。著作権とライセンスの記載は保持しています。

文字幅と字形も元の配信に合わせます。元のGoogle Fontsで省かれていた `ss01`（IBM Plex Sans JP・Shippori Mincho・Space Grotesk）と `palt`（Shippori Mincho）をサブセットから除きます。IBMの `palt` とSpace Groteskのカーニングなどは保持します。これにより、既存のCSSを変えずに詳細ページの改行位置を保ちます。

Space Groteskの `unicode-range` も元配信の範囲に合わせ、左右・斜めの矢印は元と同じフォールバック書体で表示します。上下の矢印は従来どおりSpace Groteskの対象です。

配布元は[google/fontsの固定コミット](https://github.com/google/fonts/tree/bd8f81ddb5c74d5c8897b36ad88b440266245103)です。各ファイルの配布元、ハッシュ、容量、対象ページは [manifest.json](manifest.json) に記録しています。文字一覧はローカルで処理し、外部サービスには送信しません。

## 文章を更新するとき

HTMLの本文・画像の代替テキスト、CSSの表示文字、JavaScriptのラベルに新しい日本語を追加した場合は、次の確認を行います。確認だけなら追加パッケージとネットワークは不要です。

```bash
python scripts/build_fonts.py --check
```

不足する文字があれば、開発用の依存関係を入れて再生成します。サイトを見るためのインストールやビルドは不要です。

```bash
python -m pip install 'fonttools[woff]'
python scripts/build_fonts.py
python scripts/build_fonts.py --check
```

再生成時は固定版の元フォントを一時フォルダーに取得します。元フォントをキャッシュ済みなら、ネットワーク通信は行いません。HTMLが参照する `css/fonts-*.css` の版番号も更新し、全ページの表示を確認してください。内容ハッシュを含むWOFF2のファイル名は自動で更新されます。
