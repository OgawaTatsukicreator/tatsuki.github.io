# トップページの背景写真

構図、背景位置、表示サイズはCSS側で管理し、写真の内容は変更していません。

| ファイル | 用途 | 容量 | 画像の寸法 |
| --- | --- | ---: | --- |
| `back.png` | 元画像 | 660,306 B | 985 × 791 |
| `back.webp` | 可逆圧縮版・保管用 | 380,532 B | 985 × 791 |
| `back-optimized.webp` | 配信する高品質WebP | 67,982 B | 985 × 791 |

配信版はPillowのWebPエンコーダーで `quality=95, method=6` を指定しています。可逆版より82.1%小さく、構図と寸法は同じです。画素は完全一致ではありません。元画像との輝度SSIMは0.9936、PSNRは46.86dBで、サイトと同じ暗いグラデーションを重ねたPC・スマートフォン表示でも比較しています。これらの値は画質の確認材料で、ブラウザー表示の検証も必要です。

再生成するときは、元PNGから行います。既に圧縮したWebPを繰り返し圧縮しないでください。開発時だけPillowが必要で、サイトの表示には不要です。

```python
from PIL import Image

with Image.open("images/back.png") as image:
    image.convert("RGB").save(
        "images/back-optimized.webp", format="WEBP", quality=95, method=6
    )
```

画像を差し替えた場合は、先読みURLとCSSの背景URLを揃え、`python scripts/build_home_styles.py` でトップページの初期スタイルも更新してください。
