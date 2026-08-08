#!/usr/bin/env python3
"""
777Ladies Cinematic Homage & Distinctive Modernization Engine
Implements user requirement:
"видео не должно быть таким же максимально подобное, но качественная копия с сохранением всего что там есть но немного другое"
Balance:
1. Faithful Homage DNA: Manhattan street rhythm, iconic walking heroine, witty street vignettes, bus side-panel ad, late-90s HBO Didot Ukrainian typography.
2. Distinctive Modernization: 2026 premium optical fidelity, subtle surreal/playful twists (electrician sparks, fruit vendor slow-mo apple, modern smartphone packshot), luxurious high-key lighting.
"""

import json
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CONFIGS_DIR = REPO_ROOT / "packages" / "video-pipeline" / "configs"
VERSIONS_DIR = REPO_ROOT / "output" / "video_versions"
DOCS_DIR = REPO_ROOT / "docs"

HOMAGE_DISTINCTIVE_SCENES = [
    {
        "id": "SHOT_01_OPENING_LOGO_BG",
        "time_range": "0.0s - 2.0s",
        "homage_dna": "Abstract minimalist dark atmospheric field for opening title card.",
        "distinctive_twist": "Deep indigo and royal sapphire volumetric gradient field with subtle warm rose-gold center luminescence, establishing premium 777Ladies feminine elegance.",
        "veo_prompt_eng": "Cinematic abstract luxury atmospheric background shot. Deep indigo and royal sapphire subtle gradient field with a gentle warm rose-gold volumetric glow pulsing smoothly from the center. Refined 35mm film grain texture, pristine minimalist aesthetic designed for title overlay. Absolutely no text, no letters, no logos.",
        "ukr_typography_overlay": {
            "text": "777LADIES ПРЕЗЕНТУЄ\nНОВИЙ СЕЗОН",
            "font": "Bodoni MT Condensed (1998 HBO Didot Homage)",
            "position": "center"
        }
    },
    {
        "id": "SHOT_02_HEROINE_WALKING",
        "time_range": "2.0s - 5.0s",
        "homage_dna": "Tracking dolly shot of confident blonde woman walking down daytime Manhattan street wearing a sleeveless pink top and layered tulle ballet skirt.",
        "distinctive_twist": "Contemporary high-fashion styling with luxurious fabric movement, crisp 28mm cinematic depth of field, warm morning sunlight catching her honey-blonde curls with effortless modern New York energy.",
        "veo_prompt_eng": "Smooth dolly-back tracking shot of a charismatic woman in her early 30s walking with confident modern elegance down a daytime Manhattan avenue. She wears a blush powder-pink silk-blend tank top and a flowing white layered tulle ballet skirt over slim light-wash jeans. Warm morning sunlight creates a natural hair light on her voluminous honey-blonde curls. Yellow taxi cabs and chic brownstone architecture blur softly in cinematic bokeh. Super-16mm film emulation, 28mm lens. Absolutely no text.",
        "ukr_typography_overlay": None
    },
    {
        "id": "SHOT_03_ZEUS_ELECTRICIAN",
        "time_range": "5.0s - 8.0s",
        "homage_dna": "Manhattan street character vignette on W 23rd St looking toward camera.",
        "distinctive_twist": "Charismatic modern Zeus portrayed as an NYC electrician whose outstretched hands playfully crackle with vivid blue electrical arcs representing online excitement.",
        "veo_prompt_eng": "Medium portrait shot with gentle handheld movement. A ruggedly handsome man in his late 30s dressed as a New York City electrician on W 23rd St, wearing an open yellow canvas jacket over a henley shirt and tool belt. He looks into the camera with a confident, knowing smile while holding his palms up, where delicate vivid blue electrical lightning sparks crackle and dance playfully across his fingers. Manhattan street traffic in soft bokeh. Super-16mm look. Absolutely no text.",
        "ukr_typography_overlay": {
            "text": "ПЕРШЕ ОНЛАЙН-КАЗИНО ДЛЯ ЛЕДІ",
            "font": "Bodoni MT Condensed",
            "position": "lower_third_left"
        }
    },
    {
        "id": "SHOT_04_FRUIT_VENDOR",
        "time_range": "8.0s - 11.0s",
        "homage_dna": "Little Italy fruit stand vendor playful street interaction.",
        "distinctive_twist": "Rich vibrant colors of fresh citrus and cherries, slow-motion mid-air arc of a shiny red apple tossed playfully toward the heroine.",
        "veo_prompt_eng": "Cinematic medium interaction shot on a sunlit Little Italy street corner. A warm, charismatic fruit vendor in a crisp white apron behind a colorful produce stall ('Antonio's Produce') filled with fresh oranges and cherries playfully tosses a polished red apple into the air toward the blonde heroine. Smooth cinematic slow-motion arc of the apple. Warm golden sunlight, 35mm film bokeh. Absolutely no superimposed text.",
        "ukr_typography_overlay": {
            "text": "БЕЗЛІЧ РОЗВАГ, ЩОБ СХОВАТИСЬ ВІД БУДЕННОЇ НУДЬГИ",
            "font": "Bodoni MT Condensed",
            "position": "lower_third_left"
        }
    },
    {
        "id": "SHOT_05_NYPD_OFFICER",
        "time_range": "11.0s - 14.0s",
        "homage_dna": "Charming NYPD officer street portrait with playful wink.",
        "distinctive_twist": "Ultra-sharp 50mm portrait lens capturing micro-expressions, confident wink while skillfully twirling metallic silver handcuffs around his index finger.",
        "veo_prompt_eng": "Close-up portrait shot on a vibrant Manhattan sidewalk. A handsome, charming NYPD officer in authentic dark blue uniform looks directly into the camera lens with a charismatic smirk, winking playfully while smoothly twirling metallic silver handcuffs around his index finger. Crisp natural daylight, 50mm shallow depth of field, Super-16mm film texture. Absolutely no text.",
        "ukr_typography_overlay": None
    },
    {
        "id": "SHOT_06_BUS_PASSING",
        "time_range": "14.0s - 17.0s",
        "homage_dna": "Dynamic transit bus crossing frame with side-panel brand advertisement.",
        "distinctive_twist": "Modern classic NYC transit bus driving through Times Square with a clean white side panel perfectly prepped for our planar-tracked Ukrainian brand ad.",
        "veo_prompt_eng": "Dynamic panning tracking shot across a bustling Manhattan avenue. A classic white and green NYC transit bus drives smoothly across the frame from left to right amidst yellow taxi cabs. Clean white side panel on the bus without any distorted letters or text. Realistic motion blur on foreground street elements, bright daylight, 35mm lens. Absolutely clean side panel ready for visual overlay.",
        "ukr_typography_overlay": {
            "text": "777LADIES — ПЕРШЕ І ЄДИНЕ ОНЛАЙН-КАЗИНО ТІЛЬКИ ДЛЯ ЛЕДІ",
            "font": "Bodoni MT Condensed",
            "position": "planar_tracked_bus_side_panel"
        }
    },
    {
        "id": "SHOT_07_PACKSHOT_SMARTPHONE",
        "time_range": "17.0s - 20.0s",
        "homage_dna": "Iconic Manhattan skyline sunset closing shot.",
        "distinctive_twist": "Breathtaking golden hour skyline over the East River with glowing rose-gold and amber skies, framed around a modern vertical smartphone displaying the elegant 777Ladies casino app.",
        "veo_prompt_eng": "Smooth slow dolly-in shot toward a sleek modern smartphone held vertically by elegant female hands against a breathtaking golden hour sunset over the Manhattan skyline. The sky glows with warm amber, rose-gold, and purple reflections on the river below. Sharp focus on the screen while skyscrapers form rich cinematic bokeh. 24fps film quality. Absolutely no floating text.",
        "ukr_typography_overlay": {
            "text": "777LADIES • ГРАЙ ОНЛАЙН НА 777LADIES.UA",
            "font": "Bodoni MT Condensed",
            "position": "top_title_bottom_cta"
        }
    }
]

def update_manifests_with_homage_distinction():
    print("==============================================================================")
    print("✨ APPLYING CREATIVE HOMAGE & MODERN DISTINCTION TO ALL PIPELINES")
    print("==============================================================================")

    # 1. Update 20s preroll manifest
    p_20s = VERSIONS_DIR / "manifest_20s_preroll.json"
    if p_20s.exists():
        with open(p_20s, "r", encoding="utf-8") as f:
            d20 = json.load(f)
        d20["creative_direction"] = "Faithful Homage to 1998 SATC Manhattan aesthetic + Distinctive Modern 2026 Premium Quality & Playful Vignettes"
        for idx, shot in enumerate(d20["shots"]):
            if idx < len(HOMAGE_DISTINCTIVE_SCENES):
                shot["veo_prompt_eng"] = HOMAGE_DISTINCTIVE_SCENES[idx]["veo_prompt_eng"]
                shot["homage_dna"] = HOMAGE_DISTINCTIVE_SCENES[idx]["homage_dna"]
                shot["distinctive_twist"] = HOMAGE_DISTINCTIVE_SCENES[idx]["distinctive_twist"]
        with open(p_20s, "w", encoding="utf-8") as f:
            json.dump(d20, f, indent=2, ensure_ascii=False)
        print("  ✅ Updated Version A (20s Preroll) manifest with homage & distinctive modern prompts.")

    # 2. Update 50s master manifest
    p_50s = VERSIONS_DIR / "manifest_50s_master.json"
    if p_50s.exists():
        with open(p_50s, "r", encoding="utf-8") as f:
            d50 = json.load(f)
        d50["creative_direction"] = "Faithful Homage to 1998 SATC Manhattan aesthetic + Distinctive Modern 2026 Premium Quality & Playful Vignettes"
        with open(p_50s, "w", encoding="utf-8") as f:
            json.dump(d50, f, indent=2, ensure_ascii=False)
        print("  ✅ Updated Version B (50s Master) manifest.")

    # 3. Create a Markdown Creative Comparison Specification
    spec_md = DOCS_DIR / "777LADIES_CREATIVE_HOMAGE_VS_MODERN_DISTINCTION.md"
    with open(spec_md, "w", encoding="utf-8") as f:
        f.write("# 🎭 777Ladies Manhattan Title Sequence — Creative Homage vs. Modern Distinction\n\n")
        f.write("Концепция: **«Максимально подобная качественная копия с сохранением всей сути, но с уникальным современным характером (немного другое)»**\n\n")
        f.write("| Сцена | Сохраняемый ДНК Оригинала (Homage DNA) | Наше Современное Отличие (Distinctive Twist 2026) |\n|---|---|---|\n")
        for s in HOMAGE_DISTINCTIVE_SCENES:
            f.write(f"| **{s['id']}** | {s['homage_dna']} | **{s['distinctive_twist']}** |\n")
        f.write("\n---\n\n## Принцип работы видеогенерации Veo 3.1\n")
        f.write("- **Английские промты (`eng`)**: Формируют кинематографическую картинку 35mm с современным освещением Kodak Vision3 2383 без вшитых букв.\n")
        f.write("- **Украинская типографика (`укр`)**: Воссоздает классический шрифт 1998 HBO Didot / Bodoni MT Condensed программным наложением в Remotion.\n")

    print(f"  ✅ Saved Creative Homage Specification to: {spec_md}")
    print("==============================================================================")

if __name__ == "__main__":
    update_manifests_with_homage_distinction()
