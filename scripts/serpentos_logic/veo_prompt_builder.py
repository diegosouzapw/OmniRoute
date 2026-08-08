#!/usr/bin/env python3
"""
🎬 VEO-PROMPT-BUILDER — 777ladies Opening Sequence
Reads all storyboard images, generates structured Veo 3.1 cinema prompts
using the veo-prompt-builder pattern:
  Shot Type & Camera | Subject | Environment | Lighting | Color & Style | Technical Specs
"""

import os, json
from pathlib import Path
from google import genai
from google.genai import types

PROJECT = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "us-central1"
STORYBORD = Path("/Users/work/Movies/sex new/storybord")
OUTPUT_FILE = Path("output/veo_prompts_v2.json")
OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

client = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)

BUILDER_INSTRUCTION = """You are a senior cinematographer writing Veo 3.1 video generation prompts for a 1990s-era New York City romantic comedy opening sequence. The style is original — NOT a copy of SATC.

Analyze this storyboard frame and output a structured Veo 3.1 prompt with EXACTLY these blocks:

[SHOT TYPE & CAMERA] (camera movement, lens mm, sensor brand — e.g. Arriflex Super-16mm, Panavision 28mm T2.8, dolly backward / pan right / push in)
[SUBJECT] (heroine or subjects: action, clothing, expression — heroine is: early 30s woman, strawberry-blonde wavy hair, powder-pink silk blouse, white tulle midi skirt)
[ENVIRONMENT] (Manhattan location, background elements, props, depth layers)
[LIGHTING] (light source, quality, color temperature — 1998 overcast Manhattan daylight, Kodak Vision 200T color science)
[COLOR & STYLE] (film stock color rendering, grain, contrast, highlight rolloff)
[MOTION] (camera operator move + subject movement — continuous from frame 1, no freeze-frames, no static shots)
[TECH] Video: 8s, 24fps, continuous motion every frame, no freeze-frames, no embedded text, no watermarks, no titles.
[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement.

CONSTRAINTS:
- Duration: 8s (or 6s for close-ups)
- No CGI descriptors, no cartoon, no animation
- No HBO, no SATC, no real person names
- No text, no watermarks, no titles in frame
- Bus advertising panel and phone screen must be completely BLANK"""

def build_prompt_for_image(img_path: Path) -> dict:
    with open(img_path, "rb") as f:
        data = f.read()
    ext = "jpeg" if img_path.suffix.lower() in (".jpg", ".jpeg") else "png"

    resp = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            types.Part.from_bytes(data=data, mime_type=f"image/{ext}"),
            BUILDER_INSTRUCTION
        ]
    )
    return resp.text.strip()

def main():
    images = sorted(STORYBORD.glob("*.jpg")) + sorted(STORYBORD.glob("*.png"))
    print(f"🎬 VEO-PROMPT-BUILDER — Processing {len(images)} storyboard frames")
    print(f"📌 Project: {PROJECT} | Model: gemini-2.5-flash (Vertex AI)")
    print("=" * 60)

    results = []
    for i, img in enumerate(images):
        print(f"\n[{i+1}/{len(images)}] {img.name}")
        try:
            prompt = build_prompt_for_image(img)
            print(prompt[:300] + "..." if len(prompt) > 300 else prompt)
            results.append({"file": img.name, "veo_prompt": prompt})
        except Exception as e:
            print(f"  ❌ Error: {e}")
            results.append({"file": img.name, "veo_prompt": None, "error": str(e)})

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*60}")
    print(f"✅ Saved {len(results)} prompts → {OUTPUT_FILE}")

    # Also write human-readable .md
    md_path = Path("output/veo_prompts_v2.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write("# 777ladies Opening Sequence — Veo 3.1 Prompts (built via veo-prompt-builder)\n\n")
        for r in results:
            f.write(f"## {r['file']}\n\n")
            f.write(f"```\n{r['veo_prompt']}\n```\n\n---\n\n")
    print(f"📄 Markdown: {md_path}")

if __name__ == "__main__":
    main()
