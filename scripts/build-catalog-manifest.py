#!/usr/bin/env python3
"""Build scripts/catalog.json from the two client Excel sheets + image folders.

Reads:  <repo-parent>/images/stones_data.xlsx     (+ stone folders)
        <repo-parent>/images_2/stones_data.xlsx   (+ stone folders)
Writes: culturestone/scripts/catalog.json

Run once; the JSON is the human review checkpoint before importing.
No network access.
"""
import json
import os
import re
import sys
import unicodedata

import openpyxl

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_PARENT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
OUT_PATH = os.path.join(SCRIPT_DIR, "catalog.json")
SOURCES = ["images", "images_2"]

# Header label (row 1) -> manifest key
COLS = {
    "Folder_Name": "folder",
    "Category": "category",
    "Name": "name",
    "Alias": "alias",
    "Subhead": "subhead",
    "Description": "description",
    "Origin": "origin",
    "Finish": "finish",
    "Thickness": "thickness",
    "Applications": "applications",
    "Price": "price",
}


def slugify(name):
    n = unicodedata.normalize("NFD", name.lower())
    n = "".join(c for c in n if unicodedata.category(c) != "Mn")
    n = re.sub(r"[^a-z0-9]+", "-", n)
    return n.strip("-")


def norm_price(raw):
    s = str(raw or "").strip()
    s = re.sub(r"-{2,}", "-", s)          # 300--500 -> 300-500
    return s.strip("- ").strip()


def norm_thickness(raw):
    m = re.search(r"\d+", str(raw or ""))
    return f"{m.group(0)}mm" if m else str(raw or "").strip()


def find_hero(files):
    for f in files:
        if re.match(r"(?i)^hero\.", f):
            return f
    return None


def gallery_sorted(files):
    g = [f for f in files if re.match(r"(?i)^gallery", f)]
    def key(f):
        m = re.search(r"\d+", f)
        return int(m.group(0)) if m else 0
    return sorted(g, key=key)


def main():
    out = []
    warnings = []
    for src in SOURCES:
        xlsx = os.path.join(REPO_PARENT, src, "stones_data.xlsx")
        wb = openpyxl.load_workbook(xlsx, data_only=True)
        ws = wb.worksheets[0]
        rows = list(ws.iter_rows(values_only=True))
        header = [str(c).strip() if c is not None else "" for c in rows[0]]
        idx = {COLS[h]: i for i, h in enumerate(header) if h in COLS}
        # rows[0] = English headers, rows[1] = Chinese header labels -> skip both
        for row in rows[2:]:
            def cell(key):
                i = idx.get(key)
                v = row[i] if i is not None and i < len(row) else None
                return str(v).strip() if v is not None else ""

            folder = cell("folder")
            name = cell("name")
            if not folder or not name:
                continue

            category = cell("category")
            # Decision: keep only the images/ "Prada Green" (Sintered Stone);
            # drop the images_2/ "Prada Green" (Marble).
            if name == "Prada Green" and src == "images_2":
                warnings.append(f"DROPPED duplicate: {src}/{folder} (Prada Green Marble)")
                continue

            folder_path = os.path.join(REPO_PARENT, src, folder)
            if not os.path.isdir(folder_path):
                warnings.append(f"MISSING folder: {src}/{folder}")
                continue
            files = os.listdir(folder_path)
            hero = find_hero(files)
            gallery = gallery_sorted(files)
            if not hero:
                warnings.append(f"NO hero in {src}/{folder}")
            if not gallery:
                warnings.append(f"NO gallery in {src}/{folder}")

            description = cell("description")
            # Auto-fix client copy-paste error in the Exotic Green entry.
            if name == "Exotic Green" and description.startswith("Amazon Green Marble"):
                description = "Exotic Green Marble" + description[len("Amazon Green Marble"):]
                warnings.append(f"FIXED description prefix for {src}/{folder} (Exotic Green)")

            out.append({
                "slug": slugify(name),
                "name": name,
                "alias": cell("alias"),
                "category": category,
                "subhead": cell("subhead"),
                "description": description,
                "origin": cell("origin"),
                "finish": cell("finish"),
                "thickness": norm_thickness(cell("thickness")),
                "applications": cell("applications"),
                "price": norm_price(cell("price")),
                "sourceDir": f"{src}/{folder}",
                "hero": hero,
                "gallery": gallery,
            })

    # Guard against slug collisions in the final set.
    slugs = {}
    for e in out:
        slugs.setdefault(e["slug"], []).append(e["sourceDir"])
    dupes = {s: dirs for s, dirs in slugs.items() if len(dirs) > 1}
    if dupes:
        for s, dirs in dupes.items():
            warnings.append(f"SLUG COLLISION '{s}': {dirs}")

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(out)} stones -> {OUT_PATH}")
    cats = {}
    for e in out:
        cats[e["category"]] = cats.get(e["category"], 0) + 1
    print("Categories:", dict(cats))
    if warnings:
        print("\nWarnings/notices:", file=sys.stderr)
        for w in warnings:
            print("  -", w, file=sys.stderr)
    if dupes:
        sys.exit(1)


if __name__ == "__main__":
    main()
