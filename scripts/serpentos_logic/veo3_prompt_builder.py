#!/usr/bin/env python3
"""
🎬 Veo 3.1 Cinematic Prompt Builder (/veo-prompt-builder)
Simulates high-end cinema camera physics (Arri Alexa / RED, Master Prime anamorphic lenses,
specific color grading palettes, lighting sources, and camera mechanics) merged with
strictly required [MOTION], [TECH], and [ANTI-STATIC] blocks.
"""

import json
import sys
from pathlib import Path

TEMPLATES = {
    "hero_casino": {
        "Shot Type & Camera": "Wide establishing shot, smooth orbital camera movement, Arri Alexa LF, 35mm Master Prime anamorphic optics",
        "Subject": "Elegant high-society patrons around polished mahogany gaming tables and spinning roulette wheels",
        "Environment": "Grand Las Vegas-style casino atrium with towering crystal chandeliers and plush emerald velvet curtains",
        "Lighting": "Warm golden rim lighting, soft overhead amber diffusion, specular reflections on crystal",
        "Color & Style": "Kodak 2383 Film Print LUT, rich gold and deep emerald contrast, natural film grain",
        "Audio/Mood": "Sophisticated ambient casino murmur, subtle jazz rhythm",
        "Technical Specs": "Aspect ratio: 16:9. Duration: 8 seconds. Photorealistic. NO TEXT, NO TITLES, NO WATERMARKS.",
        "MOTION": "Continuous orbital dolly shot circling the main roulette table as the ball orbits smoothly along the mahogany rim.",
        "TECH": "Video: 8s, 24fps, Arri Alexa LF 35mm anamorphic, continuous motion every frame, no freeze-frames, NO TEXT, NO TITLES.",
        "ANTI-STATIC": "Start motion from frame 1. Every second must contain visible movement. No establishing still frame at start."
    },
    "jackpot_macro": {
        "Shot Type & Camera": "Extreme close-up macro tracking shot, high-speed phantom flex camera style, 85mm Master Prime lens",
        "Subject": "Glittering cascade of gold chips and crystal tokens showering across green gaming felt",
        "Environment": "Luxury VIP gaming table surface with deep out-of-focus background bokeh",
        "Lighting": "Teal/amber volumetric highlights, sharp specular reflections on falling chips",
        "Color & Style": "Blade Runner 2049 split-toning, warm golden highlights against deep teal shadows",
        "Audio/Mood": "Crisp crystalline clinking, deep cinematic bass hum",
        "Technical Specs": "Aspect ratio: 16:9. Duration: 6 seconds. Photorealistic. NO TEXT, NO TITLES, NO WATERMARKS.",
        "MOTION": "Dynamic slow-motion tracking shot following chips as they cascade and bounce across the felt surface.",
        "TECH": "Video: 6s, 24fps, extreme macro 85mm optics, high contrast highlights, NO TEXT, NO TITLES.",
        "ANTI-STATIC": "Continuous falling motion from frame 1. No static pause."
    },
    "live_dealer_vip": {
        "Shot Type & Camera": "Medium lateral dolly shot, RED V-Raptor XL, 50mm Master Prime lens, smooth Steadicam operator",
        "Subject": "Sophisticated croupier in tailored tuxedo smoothly sliding cards across pristine baccarat table",
        "Environment": "Exclusive penthouse VIP gaming salon with floor-to-ceiling night skyline view",
        "Lighting": "Soft key light on croupier hands, warm city light bokeh filtering through background glass",
        "Color & Style": "High-end commercial color grade, deep blacks, warm skin tones, crisp highlights",
        "Audio/Mood": "Subtle cards sliding on velvet, quiet evening luxury ambience",
        "Technical Specs": "Aspect ratio: 16:9. Duration: 8 seconds. Photorealistic. NO TEXT, NO TITLES, NO WATERMARKS.",
        "MOTION": "Steadicam lateral slide tracking the croupier's hands as cards are gracefully distributed across the table.",
        "TECH": "Video: 8s, 24fps, RED V-Raptor 50mm, cinematic commercial lighting, NO TEXT, NO TITLES.",
        "ANTI-STATIC": "Start motion from frame 1. Ongoing hand and camera movement every frame."
    }
}

def format_prompt(scene_key: str) -> str:
    t = TEMPLATES[scene_key]
    sections = [
        f"**Shot Type & Camera:** {t['Shot Type & Camera']}",
        f"**Subject:** {t['Subject']}",
        f"**Environment:** {t['Environment']}",
        f"**Lighting:** {t['Lighting']}",
        f"**Color & Style:** {t['Color & Style']}",
        f"**Audio/Mood:** {t['Audio/Mood']}",
        f"**Technical Specs:** {t['Technical Specs']}",
        "",
        f"[MOTION] {t['MOTION']}",
        f"[TECH] {t['TECH']}",
        f"[ANTI-STATIC] {t['ANTI-STATIC']}"
    ]
    return "\n".join(sections)

def main():
    out_dir = Path("output")
    out_dir.mkdir(exist_ok=True)
    out_file = out_dir / "VEO3_MASTER_CINEMATIC_PROMPTS.md"
    
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("# 🎬 Veo 3.1 Master Cinematic Prompts (/veo-prompt-builder Goal)\n\n")
        f.write("Strictly built with Arri Alexa / RED Master Prime camera physics + `[MOTION]`/`[TECH]`/`[ANTI-STATIC]` blocks.\n\n")
        for key in TEMPLATES:
            f.write(f"## 🎥 Scene: {key.upper()}\n```text\n")
            f.write(format_prompt(key))
            f.write("\n```\n\n---\n\n")
            
    print(f"✅ Generated master cinematic prompts -> {out_file}")

if __name__ == "__main__":
    main()
