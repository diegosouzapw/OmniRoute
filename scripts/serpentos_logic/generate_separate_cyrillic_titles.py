#!/usr/bin/env python3
"""
Separate Cyrillic Titles Generator (ProRes 4444 with Alpha Channel)
Generates standalone video files with transparent backgrounds for each Ukrainian title.
Ensures correct Cyrillic encoding and font rendering.
"""

import os
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

EXPORT_DIR = Path("/Users/work/Movies/777LADIES_SEPARATE_CYRILLIC_TITLES")
EXPORT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR = EXPORT_DIR / "temp_pngs"
TEMP_DIR.mkdir(parents=True, exist_ok=True)

TITLES_UKR = [
    {"id": "TITLE_01", "text": "777 ЛЕДІС — ПЕРШЕ ОНЛАЙН-КАЗИНО ДЛЯ ЛЕДІ", "dur": 4.0},
    {"id": "TITLE_02", "text": "РОЗКІШ, ВПЕВНЕНІСТЬ, СТИЛЬ", "dur": 4.0},
    {"id": "TITLE_03", "text": "ЕНЕРГІЯ ТА АЗАРТ ПЕРЕМОГ", "dur": 4.0},
    {"id": "TITLE_04", "text": "ПЕРШЕ І ЄДИНЕ ОНЛАЙН КАЗИНО ТІЛЬКИ ДЛЯ ЛЕДІ", "dur": 4.0},
    {"id": "TITLE_05", "text": "ЯСКРАВА ЕСТЕТИКА ВЕЛИКИХ ВИГРАШІВ", "dur": 4.0},
    {"id": "TITLE_06", "text": "БЕЗЛІЧ РОЗВАГ, ЩОБ СХОВАТИСЬ ВІД БУДЕННОЇ НУДЬГИ", "dur": 4.0},
    {"id": "TITLE_07", "text": "ГРАЙЛИВИЙ РИТМ ВЕЛИКОГО МІСТА", "dur": 4.0},
    {"id": "TITLE_08", "text": "777ЛЕДІС — ТВІЙ НЕПЕРЕВЕРШЕНИЙ ВИБІР", "dur": 4.0},
    {"id": "TITLE_09", "text": "777ЛЕДІС. ПЕРШЕ І ЄДИНЕ ОНЛАЙН КАЗИНО ТІЛЬКИ ДЛЯ ЛЕДІ", "dur": 4.0}
]

def get_cyrillic_font(size):
    # macOS fonts that definitely support Cyrillic characters
    font_paths = [
        "/System/Library/Fonts/Times.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf"
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def create_title_png_with_alpha(title_obj):
    # Create 1920x1080 transparent image (RGBA)
    img = Image.new("RGBA", (1920, 1080), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    font = get_cyrillic_font(64)
    text = title_obj["text"]
    
    # Calculate text size for centering
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    x = (1920 - text_w) // 2
    y = (1080 - text_h) // 2
    
    # Draw drop shadow for contrast against any background
    draw.text((x + 4, y + 4), text, font=font, fill=(0, 0, 0, 200))
    # Draw main text in gold/champagne color
    draw.text((x, y), text, font=font, fill=(212, 175, 55, 255))
    
    png_path = TEMP_DIR / f"{title_obj['id']}.png"
    img.save(png_path, "PNG")
    return png_path

def render_alpha_video(title_obj, png_path):
    print(f"🎬 Rendering Alpha Title: {title_obj['id']} -> {title_obj['text']}")
    
    # Render using ProRes 4444 (profile 4444) to support Alpha Channel transparency!
    mp4_out = EXPORT_DIR / f"{title_obj['id']}_CYRILLIC_ALPHA.mov"
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", str(png_path),
        "-t", str(title_obj["dur"]),
        "-c:v", "prores_ks",
        "-profile:v", "4444",
        "-bits_per_mb", "8000",
        "-pix_fmt", "yuva444p10le",
        str(mp4_out)
    ]
    
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        size_mb = mp4_out.stat().st_size / (1024 * 1024)
        print(f"  ✅ Generated ProRes 4444 Alpha: {mp4_out.name} ({size_mb:.2f} MB)")
    else:
        print(f"  ❌ Error rendering {mp4_out.name}: {res.stderr.decode()[:200]}")

def main():
    print("==============================================================================")
    print("🚀 GENERATING SEPARATE CYRILLIC TITLES WITH ALPHA CHANNEL (PRORES 4444)")
    print("==============================================================================")
    
    for t in TITLES_UKR:
        png_p = create_title_png_with_alpha(t)
        render_alpha_video(t, png_p)
        
    print(f"\n🌟 All standalone Cyrillic titles generated in: {EXPORT_DIR}")

if __name__ == "__main__":
    main()
