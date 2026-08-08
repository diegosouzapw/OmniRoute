#!/usr/bin/env python3
"""
🎬 777Ladies "Sex and the City" Homage — Veo 3.1 Prompt Generator
Generates clean cinematic prompts strictly from:
- /Users/work/Movies/sex new/gemini-code-1783659010041.md
- And the specified storyboard frame images (Scene 02, 03, 05, 07, 08, 09 + Screenshots)
Enforces ZERO text overlays/titles in generation and includes full camera physics + MOTION blocks.
"""

import json
from pathlib import Path

PROMPTS = [
    {
        "id": "scene_02_heroine",
        "title": "Сцена 02 — Главная Героиня на улице Нью-Йорка",
        "source_files": [
            "/Users/work/Movies/sex new/storybord/scene_02_start_frame.jpg"
        ],
        "shot_type": "Handheld medium close-up shot, tracking motion, Arri Alexa Mini LF, 50mm Master Prime anamorphic lens",
        "subject": "A stylish, confident woman walking through a bustling New York City street, looking around with a commanding, charismatic gaze",
        "environment": "Authentic NYC avenue in daytime, soft steam rising from a street grate in the background, bustling crowd softly blurred",
        "lighting": "Natural overcast daylight diffusion, gentle rim lighting on hair, soft skin tone rendering",
        "color_style": "90s television cinematic film print, Kodak 2383 LUT, subtle grain, realistic contrast",
        "audio_mood": "MUTE / No audio required",
        "technical_specs": "Aspect ratio: 16:9. Duration: 6 seconds. Photorealistic. NO TEXT, NO TITLES, NO WATERMARKS.",
        "motion": "Handheld tracking camera moving alongside the stylish heroine as she turns her head slightly, surveying the vibrant city street.",
        "tech": "Video: 6s, 24fps, Arri Alexa 50mm anamorphic, shallow depth of field, NO TEXT, NO TITLES, NO SUBTITLES.",
        "anti_static": "Start motion from frame 1. Continuous natural walk and eye movement every frame."
    },
    {
        "id": "scene_03_zeus",
        "title": "Сцена 03 — Современный Зевс-электрик",
        "source_files": [
            "/Users/work/Movies/sex new/storybord/scene_03_start_frame.jpg",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.31.17.png"
        ],
        "shot_type": "Low-angle medium portrait shot, smooth dolly movement, RED V-Raptor XL, 35mm Master Prime lens",
        "subject": "A ruggedly handsome, muscular modern Zeus with a glowing bare chest, wearing a yellow leather electrician tool belt and hard hat",
        "environment": "Busy city street intersection with softly blurred yellow taxis and urban architecture in bokeh",
        "lighting": "Warm golden daylight with subtle electric glow accents on his fingers",
        "color_style": "Cinematic high-contrast commercial grade, warm golden tones against cool urban asphalt",
        "audio_mood": "MUTE / No audio required",
        "technical_specs": "Aspect ratio: 16:9. Duration: 6 seconds. Photorealistic. NO TEXT, NO TITLES, NO WATERMARKS.",
        "motion": "Slow forward camera push-in as the electrician turns and locks confident eye contact directly into the lens.",
        "tech": "Video: 6s, 24fps, RED V-Raptor 35mm, cinematic depth of field, NO TEXT, NO TITLES.",
        "anti_static": "Continuous movement from frame 1. Subtle breathing, eye contact shift, and camera dolly throughout."
    },
    {
        "id": "scene_05_fruit_vendor",
        "title": "Сцена 05 — Продавец фруктов подбрасывает яблоко",
        "source_files": [
            "/Users/work/Movies/sex new/storybord/scene_05_start_frame.jpg",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.32.14.png"
        ],
        "shot_type": "Medium slow-motion action shot, Arri Alexa LF, 65mm Master Prime lens",
        "subject": "A charismatic, ruggedly handsome man resembling a sea fisherman standing behind a vibrant, colorful urban fruit stand",
        "environment": "Lively street fruit market filled with glowing red apples, bright lemons, and fresh cherries",
        "lighting": "Warm late afternoon sunlight catching the skin of the fruit and natural specular highlights",
        "color_style": "Rich saturated cinematic color grading, vibrant reds and yellows, cinematic contrast",
        "audio_mood": "MUTE / No audio required",
        "technical_specs": "Aspect ratio: 16:9. Duration: 6 seconds. Photorealistic. NO TEXT, NO TITLES, NO WATERMARKS.",
        "motion": "The vendor playfully tosses a glowing, perfect red apple up into the air and catches it smoothly in slow motion.",
        "tech": "Video: 6s, 24fps, Arri Alexa 65mm macro/medium, high-speed fluid motion, NO TEXT, NO TITLES.",
        "anti_static": "Start motion from frame 1. Apple toss begins immediately without static pause."
    },
    {
        "id": "scene_07_policeman",
        "title": "Сцена 07 — Полицейский крутит наручники и подмигивает",
        "source_files": [
            "/Users/work/Movies/sex new/storybord/scene_07_start_frame.jpg",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.32.37.png"
        ],
        "shot_type": "Close-up cinematic portrait shot, Arri Alexa Mini LF, 85mm Master Prime portrait lens",
        "subject": "A charming, attractive NYPD police officer in sharp uniform twirling metal handcuffs smoothly around his finger",
        "environment": "City sidewalk during golden hour, softly out-of-focus pedestrians and street bokeh behind him",
        "lighting": "Warm golden hour backlight with soft front fill lighting",
        "color_style": "Kodak 2383 cinematic film look, natural skin tones, warm highlights",
        "audio_mood": "MUTE / No audio required",
        "technical_specs": "Aspect ratio: 16:9. Duration: 6 seconds. Photorealistic. NO TEXT, NO TITLES, NO WATERMARKS.",
        "motion": "Officer looks directly into the camera lens, spins handcuffs on one finger, and smoothly winks with a confident smile.",
        "tech": "Video: 6s, 24fps, Arri Alexa 85mm, sharp facial focus, NO TEXT, NO TITLES.",
        "anti_static": "Continuous motion from frame 1. Handcuff spin and micro-expressions active every frame."
    },
    {
        "id": "scene_08_bus",
        "title": "Сцена 08 — Городской автобус в трафике (Без титров)",
        "source_files": [
            "/Users/work/Movies/sex new/storybord/scene_08_start_frame.jpg",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.32.49.png"
        ],
        "shot_type": "Tracking pan shot across city avenue, Arri Alexa LF, 40mm anamorphic lens",
        "subject": "A sleek public transit bus driving smoothly through daytime city traffic surrounded by yellow taxi cabs",
        "environment": "Classic New York avenue surrounded by tall brick and glass architecture under bright sun",
        "lighting": "Bright midday sun with crisp shadows and natural reflections on vehicle glass",
        "color_style": "Cinematic street realism, natural film grain, deep contrast",
        "audio_mood": "MUTE / No audio required",
        "technical_specs": "Aspect ratio: 16:9. Duration: 6 seconds. Photorealistic. STRICTLY NO TEXT, NO TITLES, NO WATERMARKS ON THE VIDEO.",
        "motion": "Smooth camera pan tracking the bus as it drives through the intersection amidst yellow cabs and pedestrians.",
        "tech": "Video: 6s, 24fps, Arri Alexa 40mm anamorphic, motion blur on background, STRICTLY NO TEXT OR TITLES.",
        "anti_static": "Continuous vehicle movement from frame 1. No freeze-frames."
    },
    {
        "id": "scene_09_packshot",
        "title": "Сцена 09 — Пэкшот со смартфоном (Без титров)",
        "source_files": [
            "/Users/work/Movies/sex new/storybord/scene_09_start_frame.jpg",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.33.08.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.33.17.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.33.28.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.33.39.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.33.49.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.34.08.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.34.39.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.34.52.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.35.04.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.35.14.png",
            "/Users/work/Movies/sex new/storybord/Screenshot 2026-07-10 at 06.35.26.png"
        ],
        "shot_type": "Smooth slow forward dolly product shot, RED V-Raptor XL, 50mm macro cinema lens",
        "subject": "A sleek modern flagship smartphone hovering gracefully at a slight angle in the center of the frame with a glowing display",
        "environment": "Heavily blurred evening city street background featuring rich golden and emerald bokeh lights",
        "lighting": "Clean commercial studio rim light highlighting the polished metallic edge of the smartphone",
        "color_style": "High-end luxury tech commercial aesthetic, deep obsidian contrast, luminous display glow",
        "audio_mood": "MUTE / No audio required",
        "technical_specs": "Aspect ratio: 16:9. Duration: 6 seconds. Photorealistic. NO TEXT, NO TITLES, NO WATERMARKS.",
        "motion": "Slow, cinematic push-in toward the hovering smartphone as subtle light reflections glide across its glass screen.",
        "tech": "Video: 6s, 24fps, RED V-Raptor 50mm macro, product commercial cinematography, NO TEXT, NO TITLES.",
        "anti_static": "Continuous subtle rotation and dolly push from frame 1. No static pause."
    }
]

def main():
    out_dir = Path("output")
    out_dir.mkdir(exist_ok=True)
    out_md = out_dir / "SEX_AND_THE_CITY_777LADIES_PROMPTS.md"
    out_json = out_dir / "sex_and_the_city_prompts.json"

    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(PROMPTS, f, indent=2, ensure_ascii=False)

    with open(out_md, "w", encoding="utf-8") as f:
        f.write("# 🎬 777Ladies: Омаж «Секс в большом городе» — Промты для Veo 3.1\n\n")
        f.write("Сгенерировано строго на основе `gemini-code-1783659010041.md` и раскадровки сцен 02, 03, 05, 07, 08, 09 + скриншотов.\n")
        f.write("**Правило:** Полное отсутствие титров, текста и водяных знаков в генерации (титры накладываются на монтаже).\n\n---\n\n")

        for p in PROMPTS:
            f.write(f"## {p['title']}\n")
            f.write(f"**Файлы-источники:**\n")
            for sf in p['source_files']:
                f.write(f"- `{sf}`\n")
            f.write("\n```text\n")
            f.write(f"**Shot Type & Camera:** {p['shot_type']}\n")
            f.write(f"**Subject:** {p['subject']}\n")
            f.write(f"**Environment:** {p['environment']}\n")
            f.write(f"**Lighting:** {p['lighting']}\n")
            f.write(f"**Color & Style:** {p['color_style']}\n")
            f.write(f"**Audio/Mood:** {p['audio_mood']}\n")
            f.write(f"**Technical Specs:** {p['technical_specs']}\n\n")
            f.write(f"[MOTION] {p['motion']}\n")
            f.write(f"[TECH] {p['tech']}\n")
            f.write(f"[ANTI-STATIC] {p['anti_static']}\n")
            f.write("```\n\n---\n\n")

    print(f"✅ Созданы чистые промты Veo 3.1 -> {out_md}")
    print(f"📦 JSON с промтами -> {out_json}")

if __name__ == "__main__":
    main()
