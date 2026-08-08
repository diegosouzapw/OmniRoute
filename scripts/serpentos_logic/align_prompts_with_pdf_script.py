#!/usr/bin/env python3
"""
align_prompts_with_pdf_script.py

Aligns all reference prompts and the 19-Card Reference Storyboard Deck
strictly with the official PDF specification in:
  /Users/work/Documents/casino files/new/Тестове AI creator.pdf

Specifically integrates:
1. Modern Zeus Electrician (Сучасний Зевс з голим торсом в костюмі електрика)
2. Fruit Seller / Fisherman mix tossing an apple (Продавець фруктів, який підкидає їй яблуко)
3. Flirting Policeman spinning handcuffs (Поліцейський, який показує наручники і крутить на пальці)
4. 777Ladies Bus & Packshot with smartphone
5. Text Interstitials placeholders ([ANTI-TEXT] clean backgrounds for graphic overlay)
"""

import json
from pathlib import Path

JSON_PATH = Path("/Users/work/Movies/777Ladies_Title_Sequence/REVERSE_ENGINEERED_REFERENCE_PROMPTS.json")
MD_PATH = Path("/Users/work/Movies/777Ladies_Title_Sequence/REVERSE_ENGINEERED_REFERENCE_PROMPTS.md")

PDF_SCENE_MAPPINGS = {
    "scene_01": {
        "character": "Carrie Bradshaw / SJP Likeness (Heroine)",
        "action": "Heroine walks confidently down Manhattan avenue looking around like a fierce lioness (Вона як хижа левиця оглядається навколо)",
        "prompt": "1998 HBO 35mm film still. Full-length 28mm tracking shot of slender late 30s Manhattan female columnist with voluminous natural curly golden-blonde hair, walking confidently down Fifth Avenue looking around boldly. She wears a vibrant bubblegum-pink sleeveless tank top and a multi-layered white tulle ballet skirt. Soft golden afternoon sunlight, shallow depth of field, authentic Kodak Vision motion picture film grain. Absolutely no text, no letters, no titles."
    },
    "scene_04": {
        "character": "Zeus Electrician (Сучасний Зевс електрика)",
        "action": "Heroine locks eyes with a handsome modern Zeus electrician shirtless with work suspenders and toolbelt (Зустрічається поглядом з Зевсом електриком)",
        "prompt": "1998 HBO 35mm film still. Cinematic 50mm medium shot on Manhattan street at twilight. A muscular modern Zeus electrician with bare torso, rugged beard, work suspenders, and toolbelt standing amidst subtle electrical sparks. Intense eye contact with camera. Warm practical streetlamp glow, authentic Kodak Vision 500T 35mm film texture. Absolutely no text, no letters, no titles."
    },
    "scene_06": {
        "character": "Fruit Seller / Fisherman Mix (Продавець фруктів)",
        "action": "Heroine encounters a charismatic outdoor fruit stand seller who playfully tosses a polished red apple to her (Зустрічається з продавцем фруктів, який підкидає їй яблуко)",
        "prompt": "1998 HBO 35mm film still. Medium dynamic shot at a vibrant outdoor New York fruit market at dusk. Charismatic fruit seller wearing rugged fisherman apron playfully tosses a bright red apple upward toward the blonde heroine. Practical incandescent bulb lighting, rich cinematic contrast, 1998 35mm film grain. Absolutely no text, no letters, no titles."
    },
    "scene_08": {
        "character": "Flirting Policeman with Handcuffs (Поліцейський з наручниками)",
        "action": "Heroine steps forward and meets eyes with a handsome NYC policeman who winks and playfully spins metal handcuffs on his finger (Поліцейський показує їй наручники і крутить на пальці)",
        "prompt": "1998 HBO 35mm film still. Medium close-up over-the-shoulder shot on Manhattan street. A charismatic handsome NYC policeman in navy uniform winks and playfully spins metal handcuffs around his finger while looking at the heroine. Shallow depth of field, twilight city bokeh, authentic 1998 35mm film texture. Absolutely no text, no letters, no titles."
    },
    "scene_09": {
        "character": "777Ladies Transit Bus (Автобус 777Ледіс)",
        "action": "Cinematic transit bus drives past with brand colors and energy (Проїжджає автобус 777Ледіс)",
        "prompt": "1998 HBO 35mm film still. Dynamic 35mm panning shot of an iconic New York transit bus driving past illuminated city streets at twilight. Cinematic motion blur, vivid pink and neon reflections on polished metal and glass. Authentic Kodak Vision film grain. Absolutely no text, no letters, no titles."
    },
    "scene_10": {
        "character": "Brand Packshot & Smartphone Interstitial (Пекшот з телефоном)",
        "action": "Clean cinematic packshot background ready for smartphone graphic and brand typography (Пекшот на фоні автобуса з'являється телефон)",
        "prompt": "1998 HBO 35mm film still. Cinematic luxury packshot background featuring soft out-of-focus Manhattan city bokeh and subtle pink atmospheric lighting. Clean composition designed for smartphone UI graphic overlay. Authentic 35mm film grain. Absolutely no text, no letters, no titles."
    }
}

def align_prompts():
    if not JSON_PATH.exists():
        print(f"Error: {JSON_PATH} not found.")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    updated_count = 0
    for scene_id, mapping in PDF_SCENE_MAPPINGS.items():
        if scene_id in data:
            data[scene_id]["pdf_character"] = mapping["character"]
            data[scene_id]["pdf_action"] = mapping["action"]
            data[scene_id]["reverse_engineered_prompt"] = mapping["prompt"]
            updated_count += 1

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ Successfully updated {updated_count} scenes in {JSON_PATH} to match official PDF specification.")

if __name__ == "__main__":
    align_prompts()
