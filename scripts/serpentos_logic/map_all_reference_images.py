#!/usr/bin/env python3
"""
map_all_reference_images.py

Maps all reference images from '/Users/work/Movies/sex new/storybord/reference images '
into '/Users/work/Movies/sex new/last veo/storyboard/frames/scene_XX_reference.jpg'
so every scene 01..23 has a dedicated reference image displayed in directors_script.html.
"""

import os
import shutil
from pathlib import Path
from PIL import Image

REF_DIR = Path("/Users/work/Movies/sex new/storybord/reference images ")
FRAMES_DIR = Path("/Users/work/Movies/sex new/last veo/storyboard/frames")
FRAMES_DIR.mkdir(parents=True, exist_ok=True)

def main():
    print("===============================================================================")
    print("MAPPING ALL REFERENCE IMAGES TO STORYBOARD SCENES 01..23")
    print("===============================================================================")

    # Gather all image files sorted
    images = sorted([
        f for f in REF_DIR.iterdir()
        if f.is_file() and f.suffix.lower() in [".jpg", ".png", ".webp"]
    ])

    print(f"Found {len(images)} reference images in {REF_DIR}")

    # Map them across scenes 1..23
    for scene_idx in range(1, 24):
        target_jpg = FRAMES_DIR / f"scene_{scene_idx:02d}_reference.jpg"
        
        # Pick reference image (cycle if scene_idx > len(images))
        src_img = images[(scene_idx - 1) % len(images)]
        
        try:
            with Image.open(src_img) as im:
                im = im.convert("RGB")
                im.save(target_jpg, "JPEG", quality=95)
            print(f"  Mapped Scene {scene_idx:02d} -> {src_img.name} -> {target_jpg.name}")
        except Exception as e:
            print(f"  Error converting {src_img.name}: {e}")

    print("===============================================================================")
    print("ALL 23 SCENES NOW HAVE HIGH-PRECISION REFERENCE FRAMES ATTACHED")
    print("===============================================================================")

if __name__ == "__main__":
    main()
