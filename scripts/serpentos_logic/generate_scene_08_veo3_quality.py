#!/usr/bin/env python3
"""
🎬 Veo 3 Quality Generator for Scene 08 (Opus-Level Text-to-Video Prompt)
Generates high-end cinematic video using Google Veo 3.1 Quality (`veo-3.1-generate-001`)
based on the exact visual composition of `/Users/work/Movies/sex new/storybord/scene_08_start_frame.jpg`.
"""

import os
import sys
import time
import argparse
from pathlib import Path

STORYBOARD_DIR = Path("/Users/work/Movies/sex new/storybord")
OUTPUT_DIR = STORYBOARD_DIR / "veo3_generated"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUT_FILE = OUTPUT_DIR / "scene_08_veo3_quality.mp4"

# Opus-crafted Text-to-Video prompt adhering strictly to mandatory rules
OPUS_VEO3_PROMPT = """A cinematic 1998 daytime street scene on bustling Broadway near Times Square in New York City, shot on 35mm Kodak Vision3 500T film with warm, sun-drenched organic film grain. A classic white NYC transit bus (#712, route M42 CROSSTOWN) with green and blue waistline stripes drives smoothly down the avenue. On the side of the bus is a prominent magenta advertisement banner reading '777Ladies - First Online Casino for Ladies'. Several yellow NYC checker cabs roll dynamically alongside and behind the bus in traffic. Pedestrians dressed in late-90s casual attire walk briskly along the sidewalk near a GAP storefront. In the bright background, iconic 1998 Broadway billboards (The Lion King, Panasonic, Kodak, MTV) rise against a clear blue summer sky.

[MOTION] Cinematic slow forward dolly camera tracking the moving M42 city bus as its wheels rotate smoothly on the asphalt. Yellow NYC taxi cabs drive dynamically forward in adjacent lanes. Pedestrians walk naturally on the sidewalk with realistic secondary clothing motion. Bright sunlight glints realistically off windshields and chrome bumpers.
[TECH] Video: 5s, 24fps, continuous motion every frame, no freeze-frames, no static shots, no cinematic pause, high-end Hollywood commercial cinematography, 35mm film grain.
[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement. No establishing still frame at start."""


def run_generation(client, model_name="veo-3.1-generate-001", use_image=False):
    from google.genai import types

    print(f"\n🎬 [Veo 3 Quality] Launching generation on model: {model_name}")
    print(f"📋 Opus Prompt:\n{OPUS_VEO3_PROMPT}\n")

    config = types.GenerateVideosConfig(
        aspect_ratio="16:9",
        person_generation="allow_adult",
    )

    kwargs = {
        "model": model_name,
        "prompt": OPUS_VEO3_PROMPT,
        "config": config,
    }

    if use_image:
        img_path = STORYBOARD_DIR / "scene_08_start_frame.jpg"
        print(f"🖼️ Attaching reference frame: {img_path}")
        kwargs["image"] = types.Image.from_file(location=str(img_path))

    operation = client.models.generate_videos(**kwargs)
    print(f"⏳ Operation created: {operation.name}")

    start_t = time.time()
    poll = 0
    while not operation.done:
        poll += 1
        elapsed = time.time() - start_t
        print(f"   ⏳ Polling #{poll} ({elapsed:.0f}s elapsed)...")
        time.sleep(15)
        operation = client.operations.get(operation)

    elapsed = time.time() - start_t
    print(f"✅ Generation finished in {elapsed:.0f}s")

    if operation.response and operation.response.generated_videos:
        video = operation.response.generated_videos[0]
        video.video.save(str(OUT_FILE))
        mb = OUT_FILE.stat().st_size / (1024 * 1024)
        print(f"💾 Saved Veo 3 Quality video -> {OUT_FILE} ({mb:.2f} MB)")
        return OUT_FILE
    else:
        print("❌ Generation completed without video output.")
        if hasattr(operation, "error") and operation.error:
            print(f"Error: {operation.error}")
        return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--api-key", type=str, help="Gemini API Key")
    parser.add_argument("--vertex", action="store_true", help="Use Vertex AI")
    parser.add_argument("--project", type=str, default="project-f91a723f-af1b-4dd2-ba3")
    parser.add_argument("--location", type=str, default="us-central1")
    parser.add_argument("--model", type=str, default="veo-3.1-generate-001")
    parser.add_argument("--i2v", action="store_true", help="Use image-to-video mode")
    args = parser.parse_args()

    from google import genai

    if args.vertex:
        print(f"🌍 Connecting to Vertex AI ({args.project} @ {args.location})...")
        client = genai.Client(vertexai=True, project=args.project, location=args.location)
    else:
        key = args.api_key or os.environ.get("GEMINI_API_KEY")
        if not key:
            print("❌ Please provide --api-key or use --vertex")
            sys.exit(1)
        client = genai.Client(api_key=key)

    try:
        run_generation(client, model_name=args.model, use_image=args.i2v)
    except Exception as e:
        print(f"\n❌ Veo 3 Quality API Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
