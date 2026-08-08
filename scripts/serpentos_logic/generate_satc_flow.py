#!/usr/bin/env python3
"""
generate_satc_flow.py — Generate SATC clips via Google AI Studio Flow (free API key).
Uses veo-3.1-generate-preview / veo-3.1-fast-generate-preview models.
Auto-copies results to /Users/work/Movies/sex new/last veo/
"""

import json
import os
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

API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyBL6hl0I-7UEV_q3rvGbw-fARhCSPiZ63w")

MODELS = [
    "veo-3.1-generate-preview",
    "veo-3.1-fast-generate-preview",
]


def generate_one(client: genai.Client, scene_id: str, title: str, prompt: str, model: str) -> Path | None:
    """Generate a single clip, return path or None."""
    out_file = OUTPUT_DIR / f"{scene_id}.mp4"
    if out_file.exists():
        print(f"   ⏭️  Already exists: {out_file.name}, skipping.")
        # Still mirror if missing
        mirror = MIRROR_DIR / out_file.name
        if not mirror.exists():
            shutil.copy2(out_file, mirror)
        return out_file

    config = types.GenerateVideosConfig(aspect_ratio="16:9")

    try:
        operation = client.models.generate_videos(
            model=model,
            prompt=prompt,
            config=config,
        )
        print(f"   ⏳ Operation: {operation.name}")

        elapsed = 0
        while not operation.done:
            time.sleep(15)
            elapsed += 15
            print(f"      ⏳ [{elapsed}s] generating...")
            operation = client.operations.get(operation)

        if operation.error:
            print(f"   ❌ Error: {operation.error}")
            return None

        result = operation.result
        if not result or not result.generated_videos:
            print(f"   ❌ No video returned.")
            return None

        video = result.generated_videos[0]
        video_bytes = client.files.download(file=video.video.name)
        out_file.write_bytes(video_bytes)
        size_mb = len(video_bytes) / (1024 * 1024)
        print(f"   ✅ Saved: {out_file.name} ({size_mb:.1f} MB)")

        # Mirror
        mirror = MIRROR_DIR / out_file.name
        shutil.copy2(out_file, mirror)
        print(f"   📁 Copied → {mirror}")
        return out_file

    except Exception as e:
        err = str(e)
        if "429" in err or "RESOURCE_EXHAUSTED" in err:
            print(f"   ⚠️  Quota hit on {model}: {err[:120]}")
            return None
        elif "400" in err or "INVALID" in err:
            print(f"   ⚠️  Invalid request on {model}: {err[:120]}")
            return None
        else:
            print(f"   ❌ Exception: {err[:200]}")
            return None


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    MIRROR_DIR.mkdir(parents=True, exist_ok=True)

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    anti_text = data.get("anti_text_header", "")

    # Build scene list: B-roll + preroll
    scenes = []
    for item in data.get("b_roll_scenes", []):
        scenes.append({
            "id": f"broll_{item['scene_id']}_{item['timecode'].replace('.', '_')}",
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
    print(f"🎬 SATC FLOW GENERATOR (Google AI Studio Free API)")
    print(f"   Models: {', '.join(MODELS)}")
    print(f"   Scenes: {total} | Output: {OUTPUT_DIR}")
    print(f"   Mirror: {MIRROR_DIR}")
    print("=" * 60)

    client = genai.Client(api_key=API_KEY)
    done = 0
    failed = 0

    for idx, scene in enumerate(scenes, 1):
        print(f"\n[{idx}/{total}] 🎬 {scene['id']}: {scene['title']}")

        result = None
        for model in MODELS:
            print(f"   🚀 Trying model: {model}")
            result = generate_one(client, scene["id"], scene["title"], scene["prompt"], model)
            if result:
                done += 1
                break
            # Small delay before trying next model
            time.sleep(2)

        if not result:
            failed += 1
            print(f"   ⛔ All models failed for {scene['id']}")

        # Rate limit pause between scenes
        if idx < total:
            time.sleep(5)

    print(f"\n{'=' * 60}")
    print(f"📊 DONE: {done}/{total} succeeded, {failed} failed")
    print(f"   Files in: {OUTPUT_DIR}")
    print(f"   Copies in: {MIRROR_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
