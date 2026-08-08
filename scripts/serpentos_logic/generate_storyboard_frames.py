#!/usr/bin/env python3
"""
Generate Static Storyboard Keyframes (Start/End or First Frame) for User Approval
Uses Google Vertex AI Imagen 3 to render 16:9 1080p static keyframes before running Veo 3.1 video generation.
"""

import argparse
import json
import os
import sys
from pathlib import Path
from datetime import datetime, timezone

from google import genai
from google.genai import types

REPO_ROOT = Path(__file__).resolve().parent.parent
PROMPTS_FILE = REPO_ROOT / "data" / "veo_prompts_preroll_20s.json"
STORYBOARD_DIR = REPO_ROOT / "output" / "satc_ua" / "storyboard"

PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", "project-f91a723f-af1b-4dd2-ba3")
LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION", "europe-west3")


def main():
    parser = argparse.ArgumentParser(description="Generate static storyboard images for approval")
    parser.add_argument("--prompts", type=str, default=str(PROMPTS_FILE))
    parser.add_argument("--out", type=str, default=str(STORYBOARD_DIR))
    parser.add_argument("--model", type=str, default="imagen-3.0-generate-002")
    parser.add_argument("--project", type=str, default="project-f91a723f-af1b-4dd2-ba3")
    args = parser.parse_args()

    project_id = args.project

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    with open(args.prompts) as f:
        data = json.load(f)

    scenes = data.get("scenes", [])
    print(f"🎨 Storyboard Keyframe Generator — {len(scenes)} scenes")
    print(f"   Project: {project_id} | Location: {LOCATION}")
    print(f"   Output:  {out_dir}")
    print("=" * 60)

    client = genai.Client(vertexai=True, project=project_id, location=LOCATION)

    for idx, scene in enumerate(scenes, 1):
        scene_id = scene["scene_id"]
        title = scene["title"]
        prompt_text = scene["prompt"]

        target_file = out_dir / f"{scene_id}_start_frame.png"
        if target_file.exists():
            print(f"   ⏭️ [{idx}/{len(scenes)}] {scene_id} start frame already exists: {target_file.name}")
            continue

        print(f"   🖌️ [{idx}/{len(scenes)}] Generating static keyframe for {scene_id}: {title}...")

        try:
            response = client.models.generate_images(
                model=args.model,
                prompt=prompt_text,
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                    aspect_ratio="16:9",
                    output_mime_type="image/png",
                    person_generation="ALLOW_ADULT",
                )
            )

            for generated_image in response.generated_images:
                image_bytes = generated_image.image.image_bytes
                with open(target_file, "wb") as img_file:
                    img_file.write(image_bytes)
                print(f"      ✅ Saved static keyframe: {target_file.name}")
                break
        except Exception as e:
            print(f"      ❌ Error generating image for {scene_id}: {e}")

    print("\n🏁 Storyboard generation complete!")
    print(f"   Review static frames in: {out_dir}")


if __name__ == "__main__":
    main()
