#!/usr/bin/env python3
"""
Qwen Alibaba 4K UHD Director's Cut Prompt Rewriter & Optimizer
Based on technical spec: /Users/work/Documents/casino files/new/gemini-code-1783659010041.md
Rewrites all 9 Director's Cut scenes into 4K UHD (3840x2160) specifications:
  - Arri Alexa LF / 65mm Anamorphic Cinema Glass
  - Ultra-High Dynamic Range 10-bit colorimetry
  - Qwen Alibaba Luxury aesthetic accents
  - English generative prompt + Ukrainian 1998 HBO Didot typography overlay specification
"""

import json
from pathlib import Path
from datetime import datetime, timezone

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "output" / "production_7x"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
MOVIES_4K_DIR = Path("/Users/work/Movies/777LADIES_MANHATTAN_MASTERS_MAX_QUALITY_2026/07_4K_UHD_Directors_Cut_Masters")
MOVIES_4K_DIR.mkdir(parents=True, exist_ok=True)

DIRECTOR_CUT_SCENES_4K = [
    {
        "id": "SHOT_01_4K_ANALOG_LOGO_GLITCH",
        "storyboard_frame": "Кадр 1 (0:00-0:02)",
        "duration_s": 2.0,
        "eng_prompt_4k": "4K UHD 3840x2160 master shot filmed on Arri Alexa LF 65mm anamorphic glass. Deep navy-obsidian television static transition into velvet champagne-gold atmosphere. Ultra-sharp micro-contrast. Absolutely zero built-in text or letters.",
        "ukr_overlay": "777 ЛЕДІС — ПЕРШЕ ОНЛАЙН-КАЗИНО ДЛЯ ЛЕДІ"
    },
    {
        "id": "SHOT_02_4K_HEROINE_LIONESS_LOOK",
        "storyboard_frame": "Кадр 2 (0:02-0:04)",
        "duration_s": 2.0,
        "eng_prompt_4k": "4K UHD 3840x2160 handheld close-up portrait of a glamorous, confident woman in Manhattan looking around like a fierce lioness. Layered white tulle skirt, golden hour lighting, shallow depth of field f/1.4 bokeh. Absolutely no text.",
        "ukr_overlay": "РОЗКІШ, ВПЕВНЕНІСТЬ, СТИЛЬ"
    },
    {
        "id": "SHOT_03_4K_ZEUS_ELECTRICIAN_EYELINE",
        "storyboard_frame": "Кадр 3 (0:04-0:06)",
        "duration_s": 2.0,
        "eng_prompt_4k": "4K UHD 3840x2160 medium close-up low angle shot of a highly muscular modern Zeus electrician with glowing bare chest and yellow tool belt working on a Manhattan lamp post. Subtle electrical sparks dancing around fingers. Eyeline match looking down at heroine. Absolutely no text.",
        "ukr_overlay": "ЕНЕРГІЯ ТА АЗАРТ ПЕРЕМОГ"
    },
    {
        "id": "SHOT_04_4K_BROLL_SKYLINE_TEXT",
        "storyboard_frame": "Кадр 4 (0:06-0:07)",
        "duration_s": 1.0,
        "eng_prompt_4k": "4K UHD 3840x2160 architectural insert shot of Manhattan skyline and Brooklyn Bridge cables at sunset in shallow bokeh focus. Warm gold and emerald reflections. Absolutely zero text.",
        "ukr_overlay": "ПЕРШЕ І ЄДИНЕ ОНЛАЙН КАЗИНО ТІЛЬКИ ДЛЯ ЛЕДІ"
    },
    {
        "id": "SHOT_05_4K_FRUIT_SELLER_APPLE_TOSS",
        "storyboard_frame": "Кадр 5 (0:07-0:10)",
        "duration_s": 3.0,
        "eng_prompt_4k": "4K UHD 3840x2160 medium shot of a rugged sea-fisherman style fruit vendor standing behind a vibrant luxury fruit stand in Little Italy. He playfully tosses a glowing red apple into the air and catches it. Slow motion 120fps, sharp cherries and lemons. Absolutely no text.",
        "ukr_overlay": "ЯСКРАВА ЕСТЕТИКА ВЕЛИКИХ ВИГРАШІВ"
    },
    {
        "id": "SHOT_06_4K_BROLL_EXCITEMENT_TEXT",
        "storyboard_frame": "Кадр 6 (0:10-0:11)",
        "duration_s": 1.0,
        "eng_prompt_4k": "4K UHD 3840x2160 tracking shot of yellow checker cabs gliding through wet Manhattan asphalt reflecting neon lights. Crisp cinematic atmosphere. Absolutely zero text.",
        "ukr_overlay": "БЕЗЛІЧ РОЗВАГ, ЩОБ СХОВАТИСЬ ВІД БУДЕННОЇ НУДЬГИ."
    },
    {
        "id": "SHOT_07_4K_NYPD_OFFICER_WINK_HANDCUFFS",
        "storyboard_frame": "Кадр 7 (0:11-0:15)",
        "duration_s": 4.0,
        "eng_prompt_4k": "4K UHD 3840x2160 close-up portrait of a charismatic NYPD police officer spinning stainless steel handcuffs playfully on his finger, looking directly into the lens and winking smoothly (breaking the 4th wall). Golden hour rim light. Absolutely no text.",
        "ukr_overlay": "ГРАЙЛИВИЙ РИТМ ВЕЛИКОГО МІСТА"
    },
    {
        "id": "SHOT_08_4K_BUS_SPLASH_OR_PASS",
        "storyboard_frame": "Кадр 8 (0:15-0:17)",
        "duration_s": 2.0,
        "eng_prompt_4k": "4K UHD 3840x2160 tracking pan shot of a yellow and silver Manhattan transit bus passing rapidly through an intersection spraying crystal water droplets. High shutter speed cinematic clarity. Absolutely zero text.",
        "ukr_overlay": "777ЛЕДІС — ТВІЙ НЕПЕРЕВЕРШЕНИЙ ВИБІР"
    },
    {
        "id": "SHOT_09_4K_PACKSHOT_SMARTPHONE_CTA",
        "storyboard_frame": "Кадр 9 (0:17-0:20)",
        "duration_s": 3.0,
        "eng_prompt_4k": "4K UHD 3840x2160 luxury commercial dolly-in shot of a titanium smartphone hovering against a heavily blurred golden Manhattan bokeh. The OLED screen radiates emerald and champagne luxury lighting. Absolutely zero rendered text.",
        "ukr_overlay": "777ЛЕДІС. ПЕРШЕ І ЄДИНЕ ОНЛАЙН КАЗИНО ТІЛЬКИ ДЛЯ ЛЕДІ"
    }
]

def generate_director_4k_prompts():
    print("==============================================================================")
    print("✨ REWRITING 9 DIRECTOR'S CUT SCENES INTO 4K UHD QWEN ALIBABA LUXURY SPEC")
    print("==============================================================================")

    doc_content = f"""# 🌟 777Ladies Manhattan Title Sequence — 4K UHD Director's Cut Prompts (9 Scenes)

**Основание:** Техническое задание `/Users/work/Documents/casino files/new/gemini-code-1783659010041.md`  
**Дата создания:** `{datetime.now(timezone.utc).isoformat()}`  
**Разрешение:** `3840x2160 (4K UHD / 16:9)`  
**Кадровая частота:** `23.976 FPS (NTSC CFR Lock)`  
**Кодирование:** `10-bit YUV420P10LE (ProRes 422 HQ / CRF 16)`  

---

## Таблица 9 сцен режиссерского сценария 4K UHD

| Раскадровка | ID Сцены | Длит. | 4K UHD Generative Prompt (ENG / Arri Alexa LF 65mm) | Украинский титр HBO Didot (UKR) |
|---|---|---|---|---|
"""
    for sc in DIRECTOR_CUT_SCENES_4K:
        doc_content += f"| **{sc['storyboard_frame']}** | `{sc['id']}` | `{sc['duration_s']}s` | {sc['eng_prompt_4k']} | **{sc['ukr_overlay']}** |\n"
        print(f"  • {sc['storyboard_frame']} -> {sc['id']} ({sc['duration_s']}s) rewritten for 4K UHD.")

    doc_path = OUTPUT_DIR / "777LADIES_4K_UHD_DIRECTORS_CUT_PROMPTS.md"
    movies_path = MOVIES_4K_DIR / "777LADIES_4K_UHD_DIRECTORS_CUT_PROMPTS.md"

    with open(doc_path, "w", encoding="utf-8") as f:
        f.write(doc_content)
    with open(movies_path, "w", encoding="utf-8") as f:
        f.write(doc_content)

    print(f"\n✅ Saved 4K UHD Director's Cut Prompt Book to:\n   • {doc_path}\n   • {movies_path}")

if __name__ == "__main__":
    generate_director_4k_prompts()
