#!/usr/bin/env python3
"""
Clean Ukrainian SATC 50s Prompts (Text-to-Video 95% Fidelity to X453aKQgob4)
Removes unnecessary intermediate title cards, enforces Ukrainian Didot typography,
and embeds 95% compositional/lighting/prop fidelity to original 1998 SATC intro.
"""

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = REPO_ROOT / "data"

UKRAINIAN_DIDOT_TYPOGRAPHY = "777ЛЕДІС — ПЕРШЕ ОНЛАЙН-КАЗИНО ДЛЯ ЛЕДІ"


def clean_prompts():
    manifest_path = DATA_DIR / "veo_prompts_satc_50s_reverse_engineered.json"
    if not manifest_path.exists():
        print(f"❌ Manifest not found: {manifest_path}")
        return

    with open(manifest_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    cleaned_scenes = []
    for sc in data.get("scenes", []):
        slug = sc.get("slug", "")
        sc_id = sc.get("scene_id", "")

        # Remove unnecessary interrupting title cards (convert them to pure cinematic B-roll matching original intro flow)
        if "TITLE_CARD_01" in slug or "TITLE_CARD_02" in slug or "TITLE_CARD_03" in slug:
            sc["typography_overlay"] = ""
            sc["typography_style"] = None
            sc["slug"] = slug.replace("TITLE_CARD_", "MANHATTAN_BROLL_")

        # For the main presentation or bus splash, use canonical Ukrainian
        if sc_id == "S17" or "BUS" in slug:
            sc["typography_overlay"] = "777ЛЕДІС"
            sc["typography_style"] = {
                "font": "Didot Serif Capitals 1998 HBO Style",
                "language": "Ukrainian (Українська)",
                "placement": "Side banner on vintage NYC MTA bus"
            }
        elif sc_id == "S22" or "MAIN" in slug:
            sc["typography_overlay"] = UKRAINIAN_DIDOT_TYPOGRAPHY
            sc["typography_style"] = {
                "font": "Didot Serif Capitals 1998 HBO Style",
                "language": "Ukrainian (Українська)",
                "color": "Pale Ice-Blue Luminescence (#EBF4FA) with Pure White Core",
                "effect": "Analogue CRT television jitter + subtle 35mm halation"
            }
        elif sc_id == "S23" or "FINALE" in slug:
            sc["typography_overlay"] = "777ЛЕДІС — ТВІЙ ЩАСЛИВИЙ БІЛЕТ"
            sc["typography_style"] = {
                "font": "Didot Serif Capitals 1998 HBO Style",
                "language": "Ukrainian (Українська)"
            }

        # Ensure text prompt has 95% fidelity to original X453aKQgob4 composition, lighting, wardrobe & props
        base_prompt = sc.get("visual_prompt", "")
        if "Kodak Vision3 500T" not in base_prompt:
            base_prompt += (
                " Authentic 1998 Manhattan New York City aesthetics matching Sex and the City opening sequence (95% compositional & lighting fidelity). "
                "Iconic heroine wardrobe (cream tulle tutu skirt & pink top), vintage yellow taxicabs, warm golden-hour Kodak Vision3 500T 35mm film stock, "
                "shallow depth of field, natural organic grain. Text-to-Video generation. NO AUDIO."
            )
        sc["visual_prompt"] = base_prompt
        sc["generation_mode"] = "text_to_video_pure"
        sc["fidelity_target"] = "95% match to original SATC intro X453aKQgob4"

        cleaned_scenes.append(sc)

    data["scenes"] = cleaned_scenes
    data["language"] = "uk-UA (Ukrainian)"
    data["generation_engine"] = "Vertex AI Veo 3.1 Text-to-Video (pure prompt execution without image conditioning)"

    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ Cleaned 23 scenes in {manifest_path.relative_to(REPO_ROOT)}: removed unnecessary titles, enforced Ukrainian language & 95% SATC fidelity.")


if __name__ == "__main__":
    clean_prompts()
