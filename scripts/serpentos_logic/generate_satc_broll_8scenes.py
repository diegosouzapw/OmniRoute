#!/usr/bin/env python3
"""Generate 8 character-free SATC B-roll scenes via Veo 3.1.

Auth: GOOGLE_API_KEY (Gemini API) if set, else Vertex AI ADC.
Run:  doppler run --project serpent --config prd -- python3 scripts/generate_satc_broll_8scenes.py
"""
import json
import os
import shutil
import sys
import time
from pathlib import Path

from google import genai
from google.genai import types

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "veo_prompts_satc_broll_8scenes.json"
OUT_DIR = ROOT / "outputs" / "satc_broll_8"
MIRROR = Path("/Users/work/Movies/sex new/last veo")
MODEL_FULL = os.environ.get("VEO_MODEL_FULL", "veo-3.1-generate-001")
MODEL_LITE = os.environ.get("VEO_MODEL_LITE", "veo-3.1-fast-generate-001")
# Complex motion/light scenes → full Veo 3.1; simpler texture plates → lite/fast
FULL_SCENES = {"02", "09", "19", "22"}

STYLE_LOCK = (
    " [CONSISTENCY] Same New York City across all shots: warm cinematic grade, "
    "Super-16 film grain, lifted blacks, HBO prestige TV aesthetic. "
    "[PROPS] yellow NYC cabs, city buses, brownstones, street lamps, crosswalk stripes, wet asphalt. "
    "[PHYSICS] natural gravity, realistic water spray and puddle reflections, "
    "real-world vehicle speeds, wind-driven leaves and steam, believable crowd locomotion."
)

from serpent_genai import setup_logging, get_genai_client
import argparse

logger = setup_logging(__name__)

def main():
    parser = argparse.ArgumentParser(description="Generate 8 character-free SATC B-roll scenes via Veo 3.1")
    parser.add_argument("--dry-run", action="store_true", help="Inspect configuration without generating")
    args = parser.parse_args()

    if not DATA.exists():
        logger.warning(f"Data file missing: {DATA}")
        return

    raw_data = json.loads(DATA.read_text())
    if isinstance(raw_data, list):
        scenes = raw_data
        header = ""
    else:
        scenes = raw_data.get("b_roll_scenes", raw_data.get("scenes", []))
        header = raw_data.get("anti_text_header", "")

    client = get_genai_client()
    if not client:
        logger.error("Failed to initialize GenAI client.")
        return

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    try:
        MIRROR.mkdir(parents=True, exist_ok=True)
    except Exception as e:
        logger.warning(f"Could not create mirror dir: {e}")

    failed = []
    for sc in scenes:
        model = MODEL_FULL if sc.get("scene_id") in FULL_SCENES else MODEL_LITE
        tier = "v31" if sc.get("scene_id") in FULL_SCENES else "lite"
        clip_id = f"broll_{sc.get('scene_id', 'X')}_{sc.get('timecode', '').replace('.', '_')}_{tier}"
        out_path = OUT_DIR / f"{clip_id}.mp4"
        if out_path.exists():
            logger.info(f"[skip] {clip_id} exists")
            continue
        prompt = header + sc.get("prompt", "") + STYLE_LOCK
        logger.info(f"[gen ] {clip_id} ({model}): {sc.get('title', clip_id)}")
        if args.dry_run:
            continue
        try:
            operation = client.models.generate_videos(
                model=model,
                prompt=prompt,
                config=types.GenerateVideosConfig(
                    aspect_ratio="16:9",
                    number_of_videos=1,
                    duration_seconds=4,
                    person_generation="allow_all",
                    generate_audio=False,
                    seed=0,
                ),
            )
            while not operation.done:
                time.sleep(15)
                operation = client.operations.get(operation)
            if operation.error:
                raise RuntimeError(operation.error)
            videos = operation.result.generated_videos
            if not videos:
                raise RuntimeError("no videos in result")
            video = videos[0]
            client.files.download(file=video.video)
            video.video.save(str(out_path))
            shutil.copy2(out_path, MIRROR / out_path.name)
            logger.info(f"[ ok ] {out_path} ({out_path.stat().st_size // 1024} KB) → mirrored")
        except Exception as e:
            logger.error(f"[FAIL] {clip_id}: {e}")
            failed.append(clip_id)

    logger.info(f"Done. {len(scenes) - len(failed)}/{len(scenes)} ok. Failed: {failed or 'none'}")
    if failed:
        sys.exit(1)

if __name__ == "__main__":
    main()

