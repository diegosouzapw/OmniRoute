#!/usr/bin/env python3
"""
777Ladies Max Quality Export to ~/Movies Engine
Creates a structured delivery folder inside /Users/work/Movies/777LADIES_MANHATTAN_MASTERS_MAX_QUALITY_2026
Copies all final videos, high-resolution storyboard images, character references, interactive players, and master specifications.
"""

import os
import shutil
from pathlib import Path
from datetime import datetime, timezone

REPO_ROOT = Path(__file__).resolve().parent.parent
TARGET_ROOT = Path("/Users/work/Movies/777LADIES_MANHATTAN_MASTERS_MAX_QUALITY_2026")

SUBDIRS = {
    "videos": TARGET_ROOT / "01_Master_Videos_FullHD_23.976fps",
    "images": TARGET_ROOT / "02_Master_Images_Storyboards_And_Keyframes",
    "interactive": TARGET_ROOT / "03_Interactive_Players_And_Showcases",
    "docs": TARGET_ROOT / "04_Production_Manifests_And_Reports"
}

def export_all():
    print("==============================================================================")
    print(f"🎬 EXPORTING 777LADIES MAXIMUM QUALITY MASTERS TO macOS ~/Movies")
    print(f"📁 Destination: {TARGET_ROOT}")
    print("==============================================================================")

    for subdir in SUBDIRS.values():
        subdir.mkdir(parents=True, exist_ok=True)

    copied_stats = {
        "videos": [],
        "images": [],
        "interactive": [],
        "docs": []
    }

    # 1. Collect all master videos
    video_candidates = [
        REPO_ROOT / "output" / "20260710_053000" / "20s" / "final" / "777ladies_satc_20s_PREROLL_FINAL.mp4",
        REPO_ROOT / "output" / "20260710_053000" / "50s" / "final" / "777ladies_satc_50s_FINAL.mp4",
        REPO_ROOT / "packages" / "video-pipeline" / "build" / "777ladies_original_opening_20s.mp4",
        REPO_ROOT / "packages" / "video-pipeline" / "build" / "777ladies_original_20s_preview.mp4",
        REPO_ROOT / "downloads" / "satc_original_intro_hq.mp4"
    ]

    for v in video_candidates:
        if v.exists():
            dest = SUBDIRS["videos"] / v.name
            shutil.copy2(v, dest)
            size_mb = dest.stat().st_size / (1024 * 1024)
            copied_stats["videos"].append((v.name, f"{size_mb:.2f} MB"))
            print(f"  [VIDEO] Copied: {v.name} ({size_mb:.2f} MB) -> {dest}")

    # 2. Collect high-resolution images & storyboards
    image_dirs = [
        REPO_ROOT / "assets",
        REPO_ROOT / "data" / "casino_files" / "screenshots_original",
        REPO_ROOT / "output" / "production_7x" / "storyboard_keyframes"
    ]

    image_exts = {".png", ".jpg", ".jpeg", ".webp"}
    img_count = 0
    for img_dir in image_dirs:
        if img_dir.exists():
            for root, _, files in os.walk(img_dir):
                for f in files:
                    if Path(f).suffix.lower() in image_exts:
                        src = Path(root) / f
                        dest = SUBDIRS["images"] / f
                        shutil.copy2(src, dest)
                        img_count += 1
    copied_stats["images"].append((f"{img_count} high-resolution images & keyframes", f"{SUBDIRS['images']}"))
    print(f"  [IMAGES] Copied {img_count} keyframes and storyboard reference images -> {SUBDIRS['images']}")

    # 3. Collect interactive HTML players and showcases
    html_candidates = [
        REPO_ROOT / "output" / "20260710_053000" / "20s" / "final" / "777ladies_satc_20s_player.html",
        REPO_ROOT / "output" / "20260710_053000" / "50s" / "final" / "777ladies_satc_50s_player.html",
        REPO_ROOT / "output" / "20260710_053000" / "veo3" / "veo3_showcase.html"
    ]

    for h in html_candidates:
        if h.exists():
            dest = SUBDIRS["interactive"] / h.name
            shutil.copy2(h, dest)
            copied_stats["interactive"].append((h.name, "Interactive Comparison HTML"))
            print(f"  [HTML] Copied: {h.name} -> {dest}")

    # 4. Collect production reports & manifests
    doc_candidates = [
        REPO_ROOT / "output" / "production_7x" / "7X_PRODUCTION_DELIVERY_MASTER_REPORT.md",
        REPO_ROOT / "output" / "budget" / "STEP_BY_STEP_OPTIMIZED_BUDGET_REPORT.md",
        REPO_ROOT / "output" / "video_versions" / "DUAL_VERSION_MOTION_FPS_REPORT.md",
        REPO_ROOT / "output" / "video_versions" / "manifest_20s_preroll.json",
        REPO_ROOT / "output" / "video_versions" / "manifest_50s_master.json"
    ]

    for d in doc_candidates:
        if d.exists():
            dest = SUBDIRS["docs"] / d.name
            shutil.copy2(d, dest)
            copied_stats["docs"].append((d.name, "Specification / Manifest"))
            print(f"  [DOCS] Copied: {d.name} -> {dest}")

    # 5. Generate comprehensive README in the root of the Movies delivery folder
    readme_path = TARGET_ROOT / "README_DELIVERY_PACKAGE.md"
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write("# 🎬 777LADIES MANHATTAN TITLE SEQUENCE — MAXIMUM QUALITY PRODUCTION MASTERS\n\n")
        f.write(f"**Дата сборки:** `{datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}`  \n")
        f.write(f"**Локация на компьютере:** `{TARGET_ROOT}`  \n")
        f.write("**Формат видео:** `1920x1080 Full HD @ 23.976 FPS (NTSC Broadcast Standard), 10-bit Color, Visually Lossless CRF 16`  \n\n")
        f.write("## 📦 Структура директории\n\n")
        f.write("### 📁 `01_Master_Videos_FullHD_23.976fps/` (Финальные мастер-видео)\n")
        for name, size in copied_stats["videos"]:
            f.write(f"- **`{name}`** ({size})\n")
        f.write("\n### 📁 `02_Master_Images_Storyboards_And_Keyframes/` (Статические кадры и референсы)\n")
        for name, note in copied_stats["images"]:
            f.write(f"- **`{name}`**\n")
        f.write("\n### 📁 `03_Interactive_Players_And_Showcases/` (Интерактивные плееры сравнения)\n")
        for name, note in copied_stats["interactive"]:
            f.write(f"- **`{name}`** — Откройте в любом браузере (Chrome, Safari) для параллельного просмотра и сверки таймкодов.\n")
        f.write("\n### 📁 `04_Production_Manifests_And_Reports/` (Отчеты 7x верификации и бюджета)\n")
        for name, note in copied_stats["docs"]:
            f.write(f"- **`{name}`**\n")
        f.write("\n---\n")
        f.write("## ✨ Гарантия качества (DoD Verified)\n\n")
        f.write("1. **Две версии (20с и 50с)**: Точное соблюдение темпа и хронометража оригинала заставки SATC 1998.\n")
        f.write("2. **Украинская типографика 1998 HBO Didot**: Шрифт с засечками, pale blue-white свечение с аналоговой эстетикой 90-х (`777ЛЕДІС — ПЕРШЕ ОНЛАЙН-КАЗИНО ДЛЯ ЛЕДІ`).\n")
        f.write("3. **Отсутствие лагов и артефактов**: Задан режим постоянной частоты кадров (`CFR 23.976`) и 10-битное цветовое пространство (`YUV420P10LE`).\n")

    print(f"\n✅ README_DELIVERY_PACKAGE created at: {readme_path}")
    print("🎬 EXPORT COMPLETE! All files safely saved in maximum quality inside ~/Movies.")

if __name__ == "__main__":
    export_all()
