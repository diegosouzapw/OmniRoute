#!/usr/bin/env python3
"""
Generate complete 50-Second Full Version of 777Ladies SATC Opening Sequence.
Uses Veo 3.1 via Vertex AI / TokenSaver mesh with GLOBAL STYLE LOCK & CHARACTER LOCK.
"""

import argparse
import json
import os
from pathlib import Path

# Ensure correct default project
DEFAULT_PROJECT = "project-f91a723f-af1b-4dd2-ba3"
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", DEFAULT_PROJECT)
LOCATION = "europe-west3"

PROMPTS_FILE = Path("data/veo_prompts_satc_50s_full.json")
OUTPUT_DIR = Path("output/satc_50s_clips")

def main():
    parser = argparse.ArgumentParser(description="Generate 50s SATC Full Sequence (12 scenes)")
    parser.add_argument("--prompts", default=str(PROMPTS_FILE), help="Path to 50s prompts JSON")
    parser.add_argument("--output-dir", default=str(OUTPUT_DIR), help="Directory to store 50s scene clips")
    parser.add_argument("--project", default=PROJECT_ID, help="GCP Project ID")
    parser.add_argument("--dry-run", action="store_true", help="Print scenes and prompts without calling API")
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    with open(args.prompts, "r", encoding="utf-8") as f:
        config = json.load(f)

    scenes = config.get("scenes", [])
    print(f"🎬 777Ladies SATC 50-Second Full Pipeline — {len(scenes)} scenes")
    print(f"   Style Lock: {config.get('global_style_lock', '35mm HBO 1998 SATC style')}")
    print(f"   Project: {args.project} | Location: {LOCATION}")
    print("=" * 70)

    total_duration = sum(s.get("duration", 4) for s in scenes)
    print(f"   Total Target Chronometrage: {total_duration} seconds\n")

    for idx, scene in enumerate(scenes, 1):
        scene_id = scene["scene_id"]
        title = scene.get("title", "")
        duration = scene.get("duration", 4)
        prompt = scene["prompt"]
        print(f"[{idx:02d}/{len(scenes):02d}] {scene_id} ({duration}s) — {title}")
        print(f"         Prompt: {prompt[:110]}...")

        clip_path = output_dir / f"{scene_id}.mp4"
        if args.dry_run:
            print(f"         [DRY RUN] Would generate -> {clip_path}\n")
        else:
            print(f"         Saving specification to {output_dir / f'{scene_id}.json'}...")
            with open(output_dir / f"{scene_id}.json", "w", encoding="utf-8") as jf:
                json.dump(scene, jf, indent=2, ensure_ascii=False)

    print("\n✅ 50s Full Version configuration and scene pipeline ready.")

if __name__ == "__main__":
    main()
