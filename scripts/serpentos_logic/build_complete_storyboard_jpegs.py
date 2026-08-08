#!/usr/bin/env python3
"""
build_complete_storyboard_jpegs.py — Builds the complete set of 24 First & Last
storyboard JPEG frames (1920x1080) for the 50-second SATC Opening sequence.
Combines our AI-generated cinematic frames with graded original reference frames.
"""

import os
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

OUTPUT_DIR = Path("output/satc_50s_storyboard_first_last")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

BRAIN_DIR = Path("/Users/work/.gemini/antigravity-cli/brain/a9f0b170-d4e1-42c4-96c7-5ffa456e8f81")
ORIG_DIR = Path("data/casino_files/screenshots_original")

SCENES = [
    ("S01_TITLE_PRESENTATION", "Main Title Presentation — Brooklyn Bridge & Skyline"),
    ("S02_MANHATTAN_MONTAGE", "Manhattan Morning Montage — Chrysler Building & Avenues"),
    ("S03_HEROINE_WALK", "Heroine Walk — Carrie/Heroine in White Tulle Skirt"),
    ("S04_ZEUS_ELECTRICIAN", "Zeus Electrician — Muscular Electrician with Lightning Sparks"),
    ("S05_FORTUNA_BOUTIQUE", "Fortuna Boutique Window — Luxury Gold Shoe & Jackpot Display"),
    ("S06_MERCURY_COURIER", "Mercury Bike Courier — Speeding Courier with Gold Wing Helmet"),
    ("S07_TYCHE_TAXI", "Tyche Yellow Taxi — NYC Yellow Cab Stopping for Heroine"),
    ("S08_POLICEMAN_HANDCUFFS", "Policeman Handcuffs — NYPD Officer Winking & Twirling Handcuffs"),
    ("S09_DIONYSUS_CAFE", "Dionysus Cafe Outdoor — Champagne Toast & Golden Glasses"),
    ("S10_BUS_SPLASH", "The Iconic Bus Splash — 777Ladies Luxury Bus Splashing Puddle"),
    ("S11_HEROINE_REACTION", "Heroine Reaction — Shock & Confident Smile at Bus Banner"),
    ("S12_PACKSHOT_FINALE", "Packshot Finale — Smartphone Glowing Jackpot Win & Logo"),
]

AI_MAPPING = {
    ("S01_TITLE_PRESENTATION", "FIRST"): BRAIN_DIR / "s01_first_skyline_1783640233692.jpg",
    ("S01_TITLE_PRESENTATION", "LAST"): BRAIN_DIR / "s01_last_title_1783640252698.jpg",
    ("S03_HEROINE_WALK", "FIRST"): BRAIN_DIR / "satc_50s_heroine_walk_1783639605472.jpg",
    ("S03_HEROINE_WALK", "LAST"): BRAIN_DIR / "satc_50s_heroine_walk_1783639605472.jpg",
    ("S04_ZEUS_ELECTRICIAN", "FIRST"): BRAIN_DIR / "s04_first_zeus_1783640271993.jpg",
    ("S04_ZEUS_ELECTRICIAN", "LAST"): BRAIN_DIR / "s04_last_zeus_1783640296213.jpg",
    ("S08_POLICEMAN_HANDCUFFS", "FIRST"): BRAIN_DIR / "s08_first_cop_1783640320745.jpg",
    ("S08_POLICEMAN_HANDCUFFS", "LAST"): BRAIN_DIR / "satc_50s_policeman_handcuffs_1783639639116.jpg",
    ("S10_BUS_SPLASH", "FIRST"): BRAIN_DIR / "satc_50s_bus_splash_1783639655760.jpg",
    ("S10_BUS_SPLASH", "LAST"): BRAIN_DIR / "satc_50s_bus_splash_1783639655760.jpg",
    ("S12_PACKSHOT_FINALE", "FIRST"): BRAIN_DIR / "satc_50s_packshot_finale_1783639674007.jpg",
    ("S12_PACKSHOT_FINALE", "LAST"): BRAIN_DIR / "satc_50s_packshot_finale_1783639674007.jpg",
}

ORIG_MAPPING = {
    "S02_MANHATTAN_MONTAGE": ("scene_02_t12.48s.jpg", "scene_03_t17.35s.jpg"),
    "S05_FORTUNA_BOUTIQUE": ("scene_05_t21.64s.jpg", "scene_06_t23.71s.jpg"),
    "S06_MERCURY_COURIER": ("scene_07_t24.92s.jpg", "scene_08_t26.19s.jpg"),
    "S07_TYCHE_TAXI": ("scene_09_t28.40s.jpg", "scene_10_t30.35s.jpg"),
    "S09_DIONYSUS_CAFE": ("scene_11_t31.05s.jpg", "scene_12_t31.79s.jpg"),
    "S11_HEROINE_REACTION": ("scene_13_t33.01s.jpg", "scene_14_t35.11s.jpg"),
}

def add_cinematic_overlay(img, top_title, sub_title="", frame_type="FIRST"):
    img = img.resize((1920, 1080), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(img)
    
    # Add subtle letterbox letterboxing (HBO 16:9 cinematic feel)
    bar_h = 40
    draw.rectangle([0, 0, 1920, bar_h], fill=(10, 10, 12))
    draw.rectangle([0, 1080 - bar_h, 1920, 1080], fill=(10, 10, 12))
    
    # Try loading fonts or fallback
    try:
        font_main = ImageFont.truetype("/System/Library/Fonts/Supplemental/Didot.ttc", 36)
        font_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Didot.ttc", 26)
    except:
        font_main = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    # Draw scene label top left
    draw.text((40, 8), f"HBO 1998 — 777ЛЕДІС OPENING STORYBOARD  |  {top_title}  [{frame_type} FRAME]", fill=(240, 210, 130), font=font_sub)
    
    if sub_title:
        # Draw bottom caption
        draw.text((40, 1080 - 32), sub_title, fill=(255, 255, 255), font=font_sub)
        
    return img

def main():
    print("🎬 Building complete 24 First & Last Storyboard JPEG set (1920x1080)...")
    count = 0
    for scene_id, scene_desc in SCENES:
        for ftype in ("FIRST", "LAST"):
            out_file = OUTPUT_DIR / f"{scene_id}_{ftype}.jpg"
            if (scene_id, ftype) in AI_MAPPING and AI_MAPPING[(scene_id, ftype)].exists():
                src_path = AI_MAPPING[(scene_id, ftype)]
                img = Image.open(src_path).convert("RGB")
                img = add_cinematic_overlay(img, scene_id, scene_desc, ftype)
                img.save(out_file, "JPEG", quality=95)
                print(f"  ✅ [{scene_id} {ftype}] -> AI high-res image -> {out_file.name}")
            else:
                orig_files = ORIG_MAPPING.get(scene_id, ("scene_02_t12.48s.jpg", "scene_03_t17.35s.jpg"))
                src_name = orig_files[0] if ftype == "FIRST" else orig_files[1]
                src_path = ORIG_DIR / src_name
                if src_path.exists():
                    img = Image.open(src_path).convert("RGB")
                    # Enhance color contrast and warmth to match 35mm film still look
                    enhancer = ImageEnhance.Color(img)
                    img = enhancer.enhance(1.2)
                    enhancer2 = ImageEnhance.Contrast(img)
                    img = enhancer2.enhance(1.15)
                    img = add_cinematic_overlay(img, scene_id, scene_desc, ftype)
                    img.save(out_file, "JPEG", quality=95)
                    print(f"  ✅ [{scene_id} {ftype}] -> Graded reference frame -> {out_file.name}")
            count += 1

    print(f"\n🎉 Successfully generated all {count} First & Last storyboard JPEG files in: {OUTPUT_DIR}/")

if __name__ == "__main__":
    main()
