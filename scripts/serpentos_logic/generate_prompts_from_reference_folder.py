#!/usr/bin/env python3
"""
generate_prompts_from_reference_folder.py

Scans '/Users/work/Movies/sex new/storybord/reference images ' for images/screenshots,
and generates authentic 1998 HBO 35mm cinematic prompts mapped to each reference image.
Enforces strict [ANTI-TEXT] rules and Sarah Jessica Parker / Carrie Bradshaw 1998 character consistency lock.
"""

import os
import json
from pathlib import Path

REFERENCE_DIR = Path("/Users/work/Movies/sex new/storybord/reference images ")
OUTPUT_MD = Path("/Users/work/Movies/777Ladies_Title_Sequence/REFERENCE_FOLDER_PROMPTS.md")
OUTPUT_JSON = Path("/Users/work/Movies/777Ladies_Title_Sequence/REFERENCE_FOLDER_PROMPTS.json")

# Mapping rules / detailed prompt templates for known reference frames & screenshots
PROMPT_TEMPLATES = {
    "scene_02_start_frame.jpg": {
        "title": "Scene 02 Reference — Bus Passing Behind Hero",
        "prompt": "1998 HBO 35mm film still. Slender late 30s Manhattan female columnist with curly golden-honey blonde hair, wearing bubblegum pink tank top and white tulle ballet skirt. She walks along a Manhattan sidewalk as a bright yellow transit bus passes directly behind her on wet asphalt. Dynamic color contrast, motion blur on bus wheels, Kodak Vision3 500T film grain. Absolutely no text, no letters, no titles."
    },
    "scene_03_start_frame.jpg": {
        "title": "Scene 03 Reference — Skirt Splash Reaction",
        "prompt": "1998 HBO 35mm film still. Medium close-up of slender late 30s Manhattan female columnist looking over her shoulder with an amused surprised smile after her white tulle skirt is splashed on a New York sidewalk at dusk. City bokeh lights in background, warm film grain aesthetic. Absolutely no text, no letters, no titles."
    },
    "scene_05_start_frame.jpg": {
        "title": "Scene 05 Reference — Encountering Athletic Man",
        "prompt": "1998 HBO 35mm film still. Manhattan sidewalk at twilight. Hero woman in pink tank top and white tulle skirt passes an attractive athletic man jogging opposite direction. Brief eye contact, knowing New York energy. High contrast Kodak film grain, rich amber streetlights. Absolutely no text, no letters, no titles."
    },
    "scene_07_start_frame.jpg": {
        "title": "Scene 07 Reference — Puddle Jump / Curb Step",
        "prompt": "1998 HBO 35mm film still. Hero woman in strappy nude heels gracefully steps over a shimmering curb puddle reflecting neon Manhattan signs. Low angle camera tracking her movement, pink top and white tulle skirt catching city lights. Natural film grain, lifted shadows. Absolutely no text, no letters, no titles."
    },
    "scene_08_start_frame.jpg": {
        "title": "Scene 08 Reference — Nighttime Avenue Strides",
        "prompt": "1998 HBO 35mm film still. Nighttime Fifth Avenue. Hero woman walking with lively confidence toward camera surrounded by glowing yellow NYC taxi headlights and blurred urban crowd. 28mm lens tracking backward, cinematic grain, deep blues and ambers. Absolutely no text, no letters, no titles."
    },
    "scene_09_start_frame.jpg": {
        "title": "Scene 09 Reference — Looking Up at City Lights",
        "prompt": "1998 HBO 35mm film still. Close-up profile of hero blonde columnist tilting head upward toward Manhattan skyscrapers at night. Soft neon glow illuminating her cheekbones and curly hair. Shallow depth of field, romantic city bokeh. Absolutely no text, no letters, no titles."
    }
}

DEFAULT_SCREENSHOT_PROMPT = (
    "1998 HBO 35mm cinematic film still from television series opening sequence. "
    "Authentic late 1990s New York City street scene featuring a slender stylish female columnist in pink sleeveless top "
    "and white layered tulle skirt. Rich Kodak Vision motion picture film grain, authentic 1998 lighting, "
    "shallow depth of field. Strictly no text, no letters, no titles anywhere in the image."
)

def main():
    if not REFERENCE_DIR.exists():
        print(f"Error: Directory not found: {REFERENCE_DIR}")
        return

    images = sorted([
        f for f in REFERENCE_DIR.iterdir()
        if f.is_file() and f.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]
    ])

    print(f"Found {len(images)} reference images in '{REFERENCE_DIR}'. Generating prompts...")

    catalog = []
    md_lines = [
        "# 🎬 777LADIES — REFERENCE FOLDER PROMPTS CATALOG",
        "**Generated from Reference Folder**: `/Users/work/Movies/sex new/storybord/reference images `",
        "**Strict Rules**: `[ANTI-TEXT]` Active (No Titles/Letters) | `[CHARACTER LOCK]` 1998 HBO SATC Look",
        "",
        "---",
        ""
    ]

    for idx, img_path in enumerate(images, 1):
        filename = img_path.name
        if filename in PROMPT_TEMPLATES:
            info = PROMPT_TEMPLATES[filename]
            title = info["title"]
            prompt = info["prompt"]
        else:
            title = f"Reference Frame #{idx:02d} — {filename}"
            prompt = f"1998 HBO 35mm film still based on {filename}. " + DEFAULT_SCREENSHOT_PROMPT

        entry = {
            "index": idx,
            "filename": filename,
            "filepath": str(img_path),
            "title": title,
            "prompt": prompt,
            "anti_text": True,
            "style_lock": "1998 HBO 35mm Kodak Vision"
        }
        catalog.append(entry)

        md_lines.extend([
            f"## {idx:02d}. {title}",
            f"- **Source Image**: `{filename}`",
            f"- **Path**: `file://{img_path}`",
            f"- **Style Lock**: `1998 HBO 35mm Kodak Vision` | **Anti-Text**: `Active`",
            "```text",
            prompt,
            "```",
            ""
        ])

    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_MD.write_text("\n".join(md_lines), encoding="utf-8")
    OUTPUT_JSON.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding="utf-8")

    print(f"✅ Successfully generated prompts for {len(catalog)} reference images!")
    print(f"📄 Markdown saved to: {OUTPUT_MD}")
    print(f"📦 JSON saved to: {OUTPUT_JSON}")

if __name__ == "__main__":
    main()
