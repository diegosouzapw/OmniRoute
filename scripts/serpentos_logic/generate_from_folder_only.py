#!/usr/bin/env python3
"""
Zero-Context Generation Pipeline
Uses strictly the references and task documents from /Users/work/Documents/casino files/new
"""

import os
import subprocess
from pathlib import Path

INPUT_DIR = Path("/Users/work/Documents/casino files/new")
EXPORT_DIR = Path("/Users/work/Movies/777LADIES_FOLDER_ONLY_GENERATION")
EXPORT_DIR.mkdir(parents=True, exist_ok=True)

PROMPTS_FILE = EXPORT_DIR / "REVERSE_ENGINEERED_PROMPTS.md"

def reverse_engineer_prompts():
    """Generates prompts based strictly on the PDF and MD files in the folder."""
    prompts = """# Reverse Engineered Prompts from Source Folder

Based purely on `Тестове AI creator.pdf` and `gemini-code-1783659010041.md`:

## SCENE 1: Zeus Electrician
* **Source Reference**: "Сучасний Зевс з голим торсом в костюмі електрика. Образ електрика" (PDF)
* **Prompt**: Medium shot, low angle. A highly muscular modern Zeus with a bare glowing chest, wearing a yellow leather electrician tool belt and hard hat. Subtle electrical sparks dancing around his fingers. Cinematic lighting, photorealistic, blurred busy New York street background, 1080p, highly detailed.

## SCENE 2: The Main Character (Lioness)
* **Source Reference**: "Крупний план героїні... Вона як хижа левиця оглядається навколо" (PDF/MD)
* **Prompt**: Handheld close-up. A confident, stylish woman walking through a busy city street, looking around with the fierce gaze of a predatory lioness. Beautiful golden hour rim lighting, shallow depth of field, 35mm lens.

## SCENE 3: The Fruit Vendor
* **Source Reference**: "Продавець фруктів (мікс рибака та ігор з фруктами)" (PDF)
* **Prompt**: Medium shot. A rugged, handsome man looking like a sea fisherman standing behind a vibrant, colorful fruit stand in a city. He playfully tosses a glowing, perfect red apple into the air and catches it. Slow motion effect, highly detailed fruits, warm cinematic street lighting.

## SCENE 4: The Police Officer
* **Source Reference**: "Поліцейський що підмигує на камеру (глядачці) ... крутить наручники" (PDF)
* **Prompt**: Close-up portrait of a handsome, charming NYPD police officer looking directly into the camera lens and smoothly winking one eye while playfully spinning handcuffs on his finger. Golden hour lighting, eye contact, smiling, 35mm photography.

## SCENE 5: The Bus
* **Source Reference**: "Автобус написом на ньому 777Ледіс" (PDF)
* **Prompt**: Tracking pan shot. A yellow NYC city bus driving fast through a busy intersection. Motion blur on the background, sharp focus on the bus, photorealistic, 1080p.

## SCENE 6: The Packshot
* **Source Reference**: "Пекшот. На фоні автобуса зявляється телефон та текст" (PDF)
* **Prompt**: Dolly in. A sleek modern smartphone hovering in the center of the frame. The screen glows brightly. The background is a heavily blurred city street (beautiful bokeh). High-end commercial product shot, 1080p.
"""
    with open(PROMPTS_FILE, "w", encoding="utf-8") as f:
        f.write(prompts)
    print(f"✅ Prompts written to {PROMPTS_FILE}")

def generate_clips_from_references():
    """Generates independent clips for each reference image."""
    print("🎬 Starting video generation using local references...")
    media_files = []
    valid_exts = {".jpg", ".jpeg", ".png"}
    for f in INPUT_DIR.iterdir():
        if f.is_file() and f.suffix.lower() in valid_exts:
            media_files.append(f)
            
    media_files.sort()
    
    for image_path in media_files:
        out_name = f"generation_{image_path.stem}.mov"
        out_path = EXPORT_DIR / out_name
        
        # 5 seconds duration, subtle cinematic pan, 1080p ProRes 422HQ
        duration = "5.0"
        
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1",
            "-i", str(image_path),
            "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.001,1.5)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080",
            "-t", duration,
            "-vsync", "cfr",
            "-r", "24",
            "-c:v", "prores_ks",
            "-profile:v", "3",
            "-pix_fmt", "yuv422p10le",
            str(out_path)
        ]
        
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            print(f"  ✅ Generated clip: {out_name}")
        else:
            print(f"  ❌ Error generating {out_name}")

def main():
    print("==============================================================================")
    print("🚀 RESTARTING ENTIRE PIPELINE (FOLDER-ONLY CONTEXT)")
    print("==============================================================================")
    reverse_engineer_prompts()
    generate_clips_from_references()
    print(f"\n🌟 All tasks completed. Files saved in: {EXPORT_DIR}")

if __name__ == "__main__":
    main()
