#!/usr/bin/env python3
"""
generate_satc_master_veo3.py

Generates 4-second cinematic video clips from data/veo_prompts_satc_master_with_refs.json
using Google Agent Platform (Vertex AI via genai.Client(vertexai=True)).
Enforces [ANTI-TEXT] to prevent text overlays/titles.
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path
from google import genai
from google.genai import types

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
JSON_PATH = REPO_ROOT / "data" / "veo_prompts_satc_master_with_refs.json"
OUTPUT_DIR = REPO_ROOT / "outputs" / "satc_master_clips"


def main():
    parser = argparse.ArgumentParser(description="Generate SATC Master Veo 3.1 Clips")
    parser.add_argument("--mode", choices=["b_roll", "preroll", "all"], default="preroll",
                        help="Which set of scenes to generate")
    parser.add_argument("--model", default="veo-3.1-fast-generate-001",
                        help="Model name (default: veo-3.1-fast-generate-001)")
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if not JSON_PATH.exists():
        print(f"❌ Master JSON not found at {JSON_PATH}")
        sys.exit(1)

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    project = data.get("project", "project-f91a723f-af1b-4dd2-ba3")
    location = data.get("location", "us-central1")
    anti_text = data.get("anti_text_header", "")

    print("==================================================")
    print(f"🎬 SATC MASTER VEO 3.1 GENERATOR (Mode: {args.mode})")
    print(f"   Project: {project} | Region: {location} | Model: {args.model}")
    print(f"   Output folder: {OUTPUT_DIR}")
    print("==================================================")

    client = genai.Client(vertexai=True, project=project, location=location)

    scenes_to_run = []
    if args.mode in ["b_roll", "all"]:
        for item in data.get("b_roll_scenes", []):
            scenes_to_run.append({
                "id": f"broll_{item['scene_id']}_{item['timecode'].replace('.', '_')}",
                "title": item["title"],
                "prompt": anti_text + item["prompt"],
                "ref": item.get("reference_image")
            })

    if args.mode in ["preroll", "all"]:
        for item in data.get("preroll_9shots", []):
            scenes_to_run.append({
                "id": f"preroll_shot_{item['shot_num']:02d}",
                "title": item["title"],
                "prompt": anti_text + item["prompt"],
                "ref": item.get("reference_image")
            })

    print(f"📋 Total scenes to process: {len(scenes_to_run)}\n")

    for idx, scene in enumerate(scenes_to_run, 1):
        out_file = OUTPUT_DIR / f"{scene['id']}.mp4"
        print(f"[{idx}/{len(scenes_to_run)}] 🎬 Generating `{scene['id']}`: {scene['title']}...")
        if out_file.exists():
            print(f"   ⏭️ Already exists ({out_file}), skipping.\n")
            continue

        config = types.GenerateVideosConfig(
            aspect_ratio="16:9",
            number_of_videos=1,
            duration_seconds=4,
            person_generation="allow_all"
        )

        try:
            operation = client.models.generate_videos(
                model=args.model,
                prompt=scene["prompt"],
                config=config,
            )
            print(f"   ⏳ Operation created: {operation.name}")
            elapsed = 0
            while not operation.done:
                time.sleep(15)
                elapsed += 15
                print(f"      ⏳ Polling ({elapsed}s elapsed)...")
                operation = client.operations.get(operation)

            if operation.error:
                print(f"   ❌ Operation error: {operation.error}\n")
                continue

            response = operation.result
            if not response or not response.generated_videos:
                print(f"   ❌ No video returned.\n")
                continue

            video = response.generated_videos[0]
            video_bytes = client.files.download(file=video.video.name)
            out_file.write_bytes(video_bytes)
            print(f"   ✅ Saved -> {out_file} ({len(video_bytes):,} bytes)")

            # Auto-mirror to user's target folder
            import shutil
            mirror_dir = Path("/Users/work/Movies/sex new/last veo")
            mirror_dir.mkdir(parents=True, exist_ok=True)
            mirror_file = mirror_dir / out_file.name
            shutil.copy2(out_file, mirror_file)
            print(f"   📁 Copied -> {mirror_file}\n")

        except Exception as e:
            print(f"   ❌ Exception generating {scene['id']}: {e}\n")

if __name__ == "__main__":
    main()
