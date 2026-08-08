#!/usr/bin/env python3
"""
generate_satc_vertex_all.py — Generate all SATC clips via Vertex AI Agent Platform.
Uses veo-3.1-fast-generate-001 with vertexai=True (ADC auth).
Auto-copies to /Users/work/Movies/sex new/last veo/
"""

import json
import shutil
import sys
import time
from pathlib import Path
from google import genai
from google.genai import types

REPO_ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = REPO_ROOT / "data" / "veo_prompts_satc_master_with_refs.json"
OUTPUT_DIR = REPO_ROOT / "outputs" / "satc_master_clips"
MIRROR_DIR = Path("/Users/work/Movies/sex new/last veo")

PROJECT = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "us-central1"
MODELS = [
    "veo-3.1-fast-generate-001",
    "veo-3.0-fast-generate-001",
]


def generate_one(client, scene_id, prompt, model):
    out_file = OUTPUT_DIR / f"{scene_id}.mp4"
    if out_file.exists() and out_file.stat().st_size > 10000:
        print(f"   ⏭️  Exists: {out_file.name} ({out_file.stat().st_size/1024/1024:.1f}MB)")
        mirror = MIRROR_DIR / out_file.name
        if not mirror.exists():
            shutil.copy2(out_file, mirror)
        return out_file

    config = types.GenerateVideosConfig(
        aspect_ratio="16:9",
        number_of_videos=1,
        duration_seconds=4,
        person_generation="allow_all",
    )

    try:
        operation = client.models.generate_videos(
            model=model, prompt=prompt, config=config,
        )
        print(f"   ⏳ Op: {operation.name.split('/')[-1][:12]}...")
        elapsed = 0
        while not operation.done:
            time.sleep(15)
            elapsed += 15
            print(f"      [{elapsed}s]...")
            operation = client.operations.get(operation)

        if operation.error:
            print(f"   ❌ {operation.error.get('message','unknown')[:100]}")
            return None

        result = operation.result
        if not result or not result.generated_videos:
            print(f"   ❌ Empty result")
            return None

        video = result.generated_videos[0]
        video_bytes = client.files.download(file=video.video.name)
        out_file.write_bytes(video_bytes)
        mb = len(video_bytes) / 1024 / 1024
        print(f"   ✅ {out_file.name} ({mb:.1f}MB)")

        mirror = MIRROR_DIR / out_file.name
        shutil.copy2(out_file, mirror)
        print(f"   📁 → {MIRROR_DIR.name}/{out_file.name}")
        return out_file

    except Exception as e:
        print(f"   ❌ {str(e)[:150]}")
        return None


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    MIRROR_DIR.mkdir(parents=True, exist_ok=True)

    with open(JSON_PATH) as f:
        data = json.load(f)

    anti_text = data.get("anti_text_header", "")

    scenes = []
    for item in data.get("b_roll_scenes", []):
        scenes.append({
            "id": f"broll_{item['scene_id']}_{item['timecode'].replace('.','_')}",
            "title": item["title"],
            "prompt": anti_text + item["prompt"],
        })
    for item in data.get("preroll_9shots", []):
        scenes.append({
            "id": f"preroll_shot_{item['shot_num']:02d}",
            "title": item["title"],
            "prompt": anti_text + item["prompt"],
        })

    total = len(scenes)
    print("=" * 60)
    print(f"🎬 VERTEX AI AGENT PLATFORM — ALL {total} SCENES")
    print(f"   Project: {PROJECT} | Region: {LOCATION}")
    print(f"   Output: {OUTPUT_DIR}")
    print(f"   Mirror: {MIRROR_DIR}")
    print("=" * 60)

    client = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)
    done, failed = 0, 0

    for idx, scene in enumerate(scenes, 1):
        print(f"\n[{idx}/{total}] 🎬 {scene['id']}: {scene['title']}")
        result = None
        for model in MODELS:
            print(f"   🚀 {model}")
            result = generate_one(client, scene["id"], scene["prompt"], model)
            if result:
                done += 1
                break
            time.sleep(3)
        if not result:
            failed += 1

    print(f"\n{'='*60}")
    print(f"📊 {done}/{total} OK | {failed} failed")
    print(f"   {OUTPUT_DIR}")
    print(f"   {MIRROR_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
