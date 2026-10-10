"""Build the site's local WOFF2 subsets without sending site text to a service.

Development only: python -m pip install 'fonttools[woff]'
Run after adding Japanese text: python scripts/build_fonts.py
Check committed subsets without dependencies/network: python scripts/build_fonts.py --check
"""

import argparse
import hashlib
import html
import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request

FONT_COMMIT = "bd8f81ddb5c74d5c8897b36ad88b440266245103"
FONT_ROOT = f"https://raw.githubusercontent.com/google/fonts/{FONT_COMMIT}/ofl"
EXCLUDED_FEATURES = {
    # Match the original Google Fonts distribution for the features used by css/style.css.
    "ibmplexsansjp": {"ss01"},
    "shipporimincho": {"palt", "ss01"},
    "spacegrotesk": {"ss01"},
}
FONT_UNICODE_RANGES = {
    # Same Vietnamese, Latin-ext and Latin coverage as the original Google Fonts CSS.
    # In particular, left/right/diagonal arrows must keep using the original fallback font.
    "spacegrotesk": ", ".join((
        "U+102-103, U+110-111, U+128-129, U+168-169, U+1A0-1A1, U+1AF-1B0, U+300-301, U+303-304, U+308-309, U+323, U+329, U+1EA0-1EF9, U+20AB",
        "U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
        "U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    )),
}
FAMILIES = [
    ("caveat", "Caveat", [("Caveat[wght].ttf", "700")]),
    ("ibmplexsansjp", "Portfolio Sans JP", [(f"IBMPlexSansJP-{style}.ttf", str(weight))
        for style, weight in [("Regular", 400), ("Medium", 500), ("SemiBold", 600), ("Bold", 700)]]),
    ("shipporimincho", "Shippori Mincho", [(f"ShipporiMincho-{style}.ttf", str(weight))
        for style, weight in [("Regular", 400), ("Medium", 500), ("SemiBold", 600), ("Bold", 700)]]),
    ("spacegrotesk", "Space Grotesk", [("SpaceGrotesk[wght].ttf", "500 700")]),
]


def site_characters(root):
    pages = [root / "index.html", *sorted((root / "pages").glob("*.html"))]
    shared = [*sorted((root / "css").glob("*.css")), *sorted((root / "js").glob("*.js"))]
    # Include attributes, CSS-generated content and JS labels, plus printable ASCII for dates/URLs.
    shared_text = "".join(path.read_text(encoding="utf-8-sig") for path in shared)
    characters = {}
    names = set()
    for path in pages:
        source = html.unescape(path.read_text(encoding="utf-8-sig"))
        characters[path.stem] = set(range(32, 127)) | {ord(char) for char in source + shared_text if char.isprintable()}
        for name in re.findall(r'<span[^>]*class="[^\"]*\bv2-brand-name\b[^\"]*"[^>]*>(.*?)</span>', source, re.S):
            names.update(map(ord, html.unescape(re.sub(r"<[^>]+>", "", name))))
    if not names:
        raise ValueError("Header wordmark not found")
    return characters, names


def source_file(cache, family, filename):
    target = cache / family / filename
    if not target.exists():
        target.parent.mkdir(parents=True, exist_ok=True)
        url = f"{FONT_ROOT}/{family}/{urllib.parse.quote(filename)}"
        with urllib.request.urlopen(url, timeout=60) as response:
            target.write_bytes(response.read())
    return target


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--source-dir", type=Path,
                        default=Path(tempfile.gettempdir()) / "portfolio-font-sources" / FONT_COMMIT)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    assets = root / "assets" / "fonts"
    pages, names = site_characters(root)
    general = set().union(*pages.values())
    manifest_path = assets / "manifest.json"
    if args.check:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        if manifest.get("excludedFeatures") != {family: sorted(features) for family, features in EXCLUDED_FEATURES.items()}:
            raise SystemExit("Regenerate fonts to match the original typography features.")
        if manifest.get("unicodeRanges") != FONT_UNICODE_RANGES:
            raise SystemExit("Regenerate font CSS to preserve the original fallback fonts.")
        missing = set()
        for page, characters in pages.items():
            missing |= characters - set(manifest["pages"].get(page, []))
            css = (root / "css" / f"fonts-{page}.css").read_text(encoding="utf-8")
            for coverage in FONT_UNICODE_RANGES.values():
                if f"  unicode-range: {coverage};" not in css:
                    raise SystemExit(f"Font CSS coverage differs: {page}")
        missing_names = names - set(manifest["wordmarkCodepoints"])
        if missing or missing_names:
            raise SystemExit("Regenerate fonts for: " + ", ".join(f"U+{value:04X}" for value in sorted(missing | missing_names)))
        for font in manifest["fonts"]:
            data = (assets / font["file"]).read_bytes()
            if hashlib.sha256(data).hexdigest() != font["sha256"]:
                raise SystemExit(f"Font hash differs: {font['file']}")
        print("Font coverage and file hashes match the current site.")
        subprocess.run([sys.executable, str(root / "scripts/build_home_styles.py"), "--check"], check=True)
        return

    from fontTools import subset
    from fontTools.ttLib import TTFont
    from fontTools.varLib.instancer import instantiateVariableFont

    assets.mkdir(parents=True, exist_ok=True)
    declarations = {page: ["/* Generated by scripts/build_fonts.py; preserve the site's typefaces and weights. */"] for page in pages}
    previous = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {"fonts": []}
    manifest = {"sourceCommit": FONT_COMMIT,
                "excludedFeatures": {family: sorted(features) for family, features in EXCLUDED_FEATURES.items()},
                "unicodeRanges": FONT_UNICODE_RANGES,
                "pages": {page: sorted(characters) for page, characters in pages.items()},
                "wordmarkCodepoints": sorted(names), "fonts": []}
    for slug, family, sources in FAMILIES:
        license_path = source_file(args.source_dir, slug, "OFL.txt")
        (assets / f"LICENSE-{slug}.txt").write_bytes(license_path.read_bytes())
        for filename, weight in sources:
            for page, page_characters in ([(None, names if slug == "caveat" else general)] if slug in ("caveat", "spacegrotesk") else pages.items()):
                font = TTFont(source_file(args.source_dir, slug, filename), recalcTimestamp=False)
                if slug == "caveat":
                    font = instantiateVariableFont(font, {"wght": 700}, inplace=True)
                if slug == "ibmplexsansjp":
                    # OFL reserves "Plex". Rename the subset while retaining the source's copyright/license.
                    style = font["name"].getDebugName(2)
                    replacements = {1: family, 3: f"PortfolioSansJP-{weight};{FONT_COMMIT}",
                                    4: f"{family} {style}", 6: f"PortfolioSansJP-{style.replace(' ', '')}",
                                    16: family, 18: f"{family} {style}", 21: family}
                    for record in font["name"].names:
                        if record.nameID in replacements:
                            record.string = replacements[record.nameID].encode(record.getEncoding())
                characters = page_characters
                options = subset.Options()
                options.flavor = "woff2"
                excluded = EXCLUDED_FEATURES.get(slug, set())
                options.layout_features = sorted({record.FeatureTag
                    for table in ("GSUB", "GPOS") if table in font and font[table].table.FeatureList
                    for record in font[table].table.FeatureList.FeatureRecord
                    if record.FeatureTag not in excluded}) if excluded else ["*"]
                options.name_IDs = ["*"]
                options.name_languages = ["*"]
                options.name_legacy = True
                subsetter = subset.Subsetter(options=options)
                subsetter.populate(unicodes=characters)
                subsetter.subset(font)
                font.flavor = "woff2"
                label = weight.replace(" ", "-")
                temporary_path = assets / f"{slug}-{label}.woff2"
                font.save(temporary_path)
                data = temporary_path.read_bytes()
                digest = hashlib.sha256(data).hexdigest()
                output_name = f"{slug}-{label}-{digest[:12]}.woff2"
                temporary_path.replace(assets / output_name)
                manifest["fonts"].append({"family": family, "weight": weight, "file": output_name,
                                           "sha256": digest, "bytes": len(data), "source": filename,
                                           "pages": [page] if page else list(pages)})
                declaration = "\n".join([
                    "@font-face {", f'  font-family: "{family}";', "  font-style: normal;",
                    f"  font-weight: {weight};", "  font-display: swap;",
                    *([f"  unicode-range: {FONT_UNICODE_RANGES[slug]};"] if slug in FONT_UNICODE_RANGES else []),
                    f'  src: url("../assets/fonts/{output_name}") format("woff2");', "}"])
                for target in ([page] if page else pages):
                    declarations[target].append(declaration)
                print(f"{page or 'shared'} / {family} {weight}: {len(data):,} bytes", flush=True)
    for page, rules in declarations.items():
        (root / "css" / f"fonts-{page}.css").write_text("\n\n".join(rules) + "\n", encoding="utf-8")
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    # Refresh Home's inline font URLs before removing any superseded files.
    subprocess.run([sys.executable, str(root / "scripts/build_home_styles.py")], check=True)
    current_files = {font["file"] for font in manifest["fonts"]}
    for old in previous["fonts"]:
        if old["file"] not in current_files:
            path = assets / old["file"]
            if path.resolve().parent != assets.resolve() or path.suffix != ".woff2":
                raise ValueError(f"Invalid generated font path: {path}")
            path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
