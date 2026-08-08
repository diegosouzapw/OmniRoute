#!/usr/bin/env python3
"""
🎬 Neural Image-To-Video Generator (Veo 3.1) for Storyboard Scenes
Generates true AI cinematic videos from storyboard start frames using Google Veo 3.1
(Exactly matching the showreel pipeline in /Users/work/Documents/showreel).

Usage:
  # Using Gemini API Key (Studio mode):
  python3 scripts/generate_storyboard_veo3.py --api-key "YOUR_API_KEY"

  # Using Vertex AI (GCP mode):
  python3 scripts/generate_storyboard_veo3.py --vertex --project "project-f91a723f-af1b-4dd2-ba3" --location "us-central1"
"""

import os
import sys
import time
import argparse
from pathlib import Path

STORYBOARD_DIR = Path("/Users/work/Movies/sex new/storybord")
OUTPUT_DIR = STORYBOARD_DIR / "veo3_generated"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SCENES = [
    {
        "id": "veo_scene_08",
        "image": STORYBOARD_DIR / "scene_08_start_frame.jpg",
        "prompt": (
            "[MOTION] Cinematic slow camera dolly forward into the scene with natural realistic subject motion.\n"
            "[TECH] Video: 5s, continuous motion every frame, no freeze-frames, no static shots, cinematic lighting, 35mm film grain.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement."
        ),
    },
    {
        "id": "veo_scene_05",
        "image": STORYBOARD_DIR / "scene_05_start_frame.jpg",
        "prompt": (
            "[MOTION] Smooth cinematic tracking pan across the scene with natural organic subject movement.\n"
            "[TECH] Video: 5s, continuous motion every frame, no freeze-frames, high-end Hollywood commercial cinematography.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement."
        ),
    },
    {
        "id": "veo_scene_07",
        "image": STORYBOARD_DIR / "scene_07_start_frame.jpg",
        "prompt": (
            "[MOTION] Dramatic slow camera pull-out revealing the full atmosphere and dynamic movement within the scene.\n"
            "[TECH] Video: 5s, continuous motion every frame, no static establishing shot, rich color grading.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement."
        ),
    },
]


def generate_scene(client, scene, model_name="veo-3.1-fast-generate-preview"):
    from google.genai import types

    out_path = OUTPUT_DIR / f"{scene['id']}.mp4"
    if out_path.exists() and out_path.stat().st_size > 100_000:
        print(f"   ℹ️ Video already exists, skipping: {out_path.name}")
        return out_path

    if not scene["image"].exists():
        print(f"   ❌ Image not found: {scene['image']}")
        return None

    print(f"\n🎬 [Veo 3.1] Generating video for {scene['id']}...")
    print(f"   Input Frame: {scene['image'].name}")
    print(f"   Prompt: {scene['prompt'].splitlines()[0]}")

    image_obj = types.Image.from_file(location=str(scene["image"]))

    config = types.GenerateVideosConfig(
        aspect_ratio="16:9",
        person_generation="allow_adult",
    )

    operation = client.models.generate_videos(
        model=model_name,
        prompt=scene["prompt"],
        image=image_obj,
        config=config,
    )

    print("   ⏳ Operation created:", operation.name)
    start_t = time.time()
    poll = 0

    while not operation.done:
        poll += 1
        elapsed = time.time() - start_t
        print(f"   ⏳ Polling #{poll} ({elapsed:.0f}s elapsed)...")
        time.sleep(15)
        operation = client.operations.get(operation)

    elapsed = time.time() - start_t
    print(f"   ✅ Veo generation completed in {elapsed:.0f}s")

    if operation.response and operation.response.generated_videos:
        video = operation.response.generated_videos[0]
        video.video.save(str(out_path))
        size_mb = out_path.stat().st_size / (1024 * 1024)
        print(f"   💾 Saved neural video: {out_path} ({size_mb:.2f} MB)")
        return out_path
    else:
        print("   ❌ Video generation returned no output.")
        if hasattr(operation, "error") and operation.error:
            print("   Error:", operation.error)
        return None


def main():
    parser = argparse.ArgumentParser(description="Veo 3.1 Storyboard Video Generator")
    parser.add_argument("--api-key", type=str, help="Gemini API key for AI Studio")
    parser.add_argument("--vertex", action="store_true", help="Use Vertex AI")
    parser.add_argument("--project", type=str, default="project-f91a723f-af1b-4dd2-ba3")
    parser.add_argument("--location", type=str, default="us-central1")
    parser.add_argument("--model", type=str, default="veo-3.1-fast-generate-preview")
    args = parser.parse_args()

    from google import genai

    if args.vertex:
        print(f"🌍 Initializing Vertex AI client ({args.project} @ {args.location})...")
        client = genai.Client(vertexai=True, project=args.project, location=args.location)
    else:
        key = args.api_key or os.environ.get("GEMINI_API_KEY")
        if not key:
            print("❌ Error: Please provide --api-key or set GEMINI_API_KEY environment variable.")
            sys.exit(1)
        client = genai.Client(api_key=key)

    generated_paths = []
    for scene in SCENES:
        p = generate_scene(client, scene, model_name=args.model)
        if p:
            generated_paths.append(p)

    print("\n==================================================================")
    print(f"🎯 Completed {len(generated_paths)}/{len(SCENES)} neural video generations.")
    print("==================================================================")


if __name__ == "__main__":
    main()
