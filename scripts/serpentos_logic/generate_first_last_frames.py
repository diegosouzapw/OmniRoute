#!/usr/bin/env python3
"""
Generate First (Start) and Last (End) storyboard frames in JPEG format for every scene.
Uses Vertex AI Imagen 3 (imagen-3.0-generate-002) with project project-f91a723f-af1b-4dd2-ba3.
"""

import argparse
import io
import json
import os
from pathlib import Path
from PIL import Image

try:
    from google import genai
    from google.genai import types
except ImportError:
    raise RuntimeError("Please install google-genai package: pip install google-genai")

DEFAULT_PROJECT = "project-f91a723f-af1b-4dd2-ba3"
DEFAULT_LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION", "europe-west3")
PROMPTS_FILE = Path("data/veo_prompts_satc_50s_full.json")
OUTPUT_DIR = Path("output/satc_50s_storyboard_first_last")

def generate_jpeg_frame(client: genai.Client, prompt: str, out_path: Path, model: str = "imagen-3.0-generate-002"):
    """Generate image using Imagen 3 and save as JPEG."""
    print(f"      Generating: {out_path.name}...")
    response = client.models.generate_images(
        model=model,
        prompt=prompt,
        config=types.GenerateImagesConfig(
            number_of_images=1,
            aspect_ratio="16:9",
            output_mime_type="image/jpeg",
            person_generation="ALLOW_ADULT",
        )
    )
    if not response.generated_images:
        raise RuntimeError("No image returned from model.")

    img_bytes = response.generated_images[0].image.image_bytes
    # Save directly or convert via PIL to ensure crisp high-quality JPEG
    img = Image.open(io.BytesIO(img_bytes))
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(out_path, "JPEG", quality=95)
    print(f"      ✅ Saved JPEG -> {out_path}")

def build_first_frame_prompt(scene: dict) -> str:
    """Build prompt for the starting frame of the scene."""
    base = scene["prompt"]
    return (
        f"Cinematic 35mm film still, HBO 1998 Sex and the City opening sequence style. "
        f"STARTING FRAME of scene (beginning of camera action): {base} "
        f"Shallow depth of field, natural urban afternoon sunlight, visible 35mm film grain."
    )

def build_last_frame_prompt(scene: dict) -> str:
    """Build prompt for the ending frame of the scene."""
    base = scene["prompt"]
    return (
        f"Cinematic 35mm film still, HBO 1998 Sex and the City opening sequence style. "
        f"FINAL FRAME of scene (culmination of camera action): {base} "
        f"Shallow depth of field, natural urban afternoon sunlight, visible 35mm film grain."
    )

def main():
    parser = argparse.ArgumentParser(description="Generate First & Last JPEG Storyboard Frames")
    parser.add_argument("--prompts", default=str(PROMPTS_FILE), help="Path to prompts JSON")
    parser.add_argument("--out", default=str(OUTPUT_DIR), help="Output directory for JPEG frames")
    parser.add_argument("--project", default=DEFAULT_PROJECT, help="GCP Project ID")
    parser.add_argument("--location", default=DEFAULT_LOCATION, help="GCP Location")
    parser.add_argument("--scenes", nargs="*", help="Specific scene IDs to generate (default: all)")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    with open(args.prompts, "r", encoding="utf-8") as f:
        config = json.load(f)

    scenes = config.get("scenes", [])
    if args.scenes:
        scenes = [s for s in scenes if s["scene_id"] in args.scenes]

    print(f"🎨 Storyboard First/Last JPEG Generator — {len(scenes)} scenes ({len(scenes)*2} frames)")
    print(f"   Project: {args.project} | Location: {args.location}")
    print(f"   Output directory: {out_dir}")
    print("=" * 70)

    client = genai.Client(vertexai=True, project=args.project, location=args.location)

    for idx, scene in enumerate(scenes, 1):
        scene_id = scene["scene_id"]
        title = scene.get("title", "")
        print(f"\n🎬 [{idx:02d}/{len(scenes):02d}] {scene_id} — {title}")

        first_path = out_dir / f"{scene_id}_FIRST.jpg"
        last_path = out_dir / f"{scene_id}_LAST.jpg"

        # 1. First Frame
        try:
            p_first = build_first_frame_prompt(scene)
            generate_jpeg_frame(client, p_first, first_path)
        except Exception as e:
            print(f"      ❌ Error generating FIRST frame for {scene_id}: {e}")

        # 2. Last Frame
        try:
            p_last = build_last_frame_prompt(scene)
            generate_jpeg_frame(client, p_last, last_path)
        except Exception as e:
            print(f"      ❌ Error generating LAST frame for {scene_id}: {e}")

    print("\n🏁 First/Last JPEG storyboard generation completed!")

if __name__ == "__main__":
    main()
