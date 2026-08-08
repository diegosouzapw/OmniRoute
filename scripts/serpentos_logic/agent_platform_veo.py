#!/usr/bin/env python3
"""
🎬 AGENT PLATFORM (VERTEX AI) VEO 3 GENERATOR
Generates SATC HBO-style cinematic scenes using Google GenAI SDK on Agent Platform (Vertex AI).
Strictly adheres to mandatory prompt tags: [MOTION], [TECH], [ANTI-STATIC].
"""

import argparse
import os
import sys
import time
from pathlib import Path

from google import genai
from google.genai import types

OUTPUT_DIR = Path("/Users/work/serpentos/outputs/satc_hbo_23scenes")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SCENES = {
    1: {
        "timecode": "t01.00s",
        "title": "Daytime Manhattan establishing walk",
        "prompt": """[MOTION] A stylish woman in a voluminous pink tulle midi skirt and nude kitten heels walks confidently toward camera on a broad Midtown sidewalk. Camera: 28mm backward tracking, Steadicam smooth.
[TECH] Video: 4s, 24fps, continuous motion every frame, no freeze-frames, no static shots, no cinematic pause.
[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement. No establishing still frame at start.
[ANTI-TEXT] ABSOLUTELY NO text overlays, NO titles, NO credits, NO logos, NO watermarks, NO written words on screen. Pure clean cinematic live-action footage only.

Cinematic romantic comedy opening, Full HD 1920x1080, no audio, 24fps. Pure visual footage without any title cards or typography.
Daytime Manhattan, wide establishing shot. A stylish woman in a voluminous
pink tulle midi skirt and nude kitten heels walks confidently toward camera
on a broad Midtown sidewalk. Camera: 28mm backward tracking, hip height,
Steadicam smooth. Yellow taxis and warm-lit storefronts flank both sides,
creating deep perspective. Tulle skirt catches air with each step, natural
movement. Super-16 film grain, lifted blacks, warm golden midtones,
neutral-cool city shadows, high saturation. HBO prestige TV aesthetic."""
    },
    2: {
        "timecode": "t12.48s",
        "title": "Woman walking past bright yellow city bus",
        "prompt": """[MOTION] Stylish woman walks left-to-right in frame, pink tulle skirt, nude pumps. 35mm medium tracking shot, chest height, slight arc. A large bright yellow city bus passes behind her from left to right with motion blur on wheels.
[TECH] Video: 4s, 24fps, continuous motion every frame, no freeze-frames, no static shots, no cinematic pause.
[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement. No establishing still frame at start.
[ANTI-TEXT] ABSOLUTELY NO text overlays, NO titles, NO credits, NO logos, NO watermarks, NO written words on screen. Pure clean cinematic live-action footage only.

Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps. Pure visual footage without any title cards or typography.
Midtown Manhattan sidewalk, late afternoon soft overcast light. Same
stylish woman walks left-to-right in frame, pink tulle skirt, nude pumps.
Camera: 35mm medium tracking shot, chest height, slight arc. A large bright
yellow city bus passes behind her from left to right, momentarily obscuring
the background buildings. The bus creates a dynamic colour contrast against
the muted urban grey. Motion blur on bus wheels, reflections on wet
pavement. Warm tones, film grain, lifted blacks. HBO prestige TV aesthetic."""
    }
}

def run_agent_platform_veo(scene_num: int, model_name: str = "veo-3.1-lite-generate-001", gcs_uri: str = "gs://gamb"):
    if scene_num not in SCENES:
        print(f"❌ Scene {scene_num} not in definitions.")
        return False

    scene = SCENES[scene_num]
    out_file = OUTPUT_DIR / f"scene_{scene_num:02d}_{scene['timecode'].replace('.', '_')}.mp4"

    print("==================================================")
    print(f"🎬 AGENT PLATFORM GENERATING SCENE #{scene_num:02d} ({scene['timecode']}): {scene['title']}")
    print(f"   Model: {model_name} | Project: project-f91a723f-af1b-4dd2-ba3 | Region: us-central1")
    print(f"   Target Output: {out_file}")
    print("==================================================")

    # Initialize Agent Platform (Vertex AI) client
    client = genai.Client(
        vertexai=True,
        project="project-f91a723f-af1b-4dd2-ba3",
        location="us-central1",
    )

    source = types.GenerateVideosSource(
        prompt=scene["prompt"],
    )

    config_kwargs = {
        "aspect_ratio": "16:9",
        "number_of_videos": 1,
        "duration_seconds": 4,
        "person_generation": "allow_all",
        "generate_audio": False,
        "resolution": "1080p",
        "seed": 0,
    }
    if gcs_uri:
        config_kwargs["output_gcs_uri"] = gcs_uri

    config = types.GenerateVideosConfig(**config_kwargs)

    print("🚀 Dispatching request to Agent Platform...")
    operation = client.models.generate_videos(
        model=model_name,
        source=source,
        config=config
    )

    print(f"⏳ Operation created: {operation.name}")
    start_time = time.time()
    while not operation.done:
        elapsed = int(time.time() - start_time)
        print(f"   ⏳ [{elapsed}s] Video generation in progress... checking again in 10s...")
        time.sleep(10)
        operation = client.operations.get(operation)

    if operation.error:
        print(f"❌ Operation error: {operation.error}")

    response = operation.result
    if not response:
        print(f"❌ Error occurred while generating video. Full operation dump:\n{operation}")
        return False

    generated_videos = response.generated_videos
    if not generated_videos:
        print("❌ No videos were generated.")
        return False

    print(f"✅ Generated {len(generated_videos)} video(s) successfully!")
    for idx, generated_video in enumerate(generated_videos):
        vid = generated_video.video
        if vid:
            # Save local MP4
            try:
                if hasattr(vid, "video_bytes") and vid.video_bytes:
                    with open(out_file, "wb") as f:
                        f.write(vid.video_bytes)
                    print(f"🎯 Saved MP4 locally: {out_file} ({out_file.stat().st_size} bytes)")
                elif hasattr(vid, "uri") and vid.uri:
                    print(f"📦 Video saved to GCS URI: {vid.uri}")
                    # Attempt to download from GCS via gcloud
                    import subprocess
                    print(f"⬇️ Downloading from GCS to {out_file}...")
                    subprocess.run(["gcloud", "storage", "cp", vid.uri, str(out_file)], check=False)
                    if out_file.exists():
                        print(f"🎯 Downloaded MP4 locally: {out_file} ({out_file.stat().st_size} bytes)")
                else:
                    print(f"INFO: Video object attributes: {dir(vid)}")
            except Exception as e:
                print(f"⚠️ Warning saving local file: {e}")

    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Agent Platform Veo 3 Generator")
    parser.add_argument("--scene", type=int, default=2, help="Scene number to generate (default: 2)")
    parser.add_argument("--model", type=str, default="veo-3.1-lite-generate-001", help="Model name")
    parser.add_argument("--gcs", type=str, default="gs://gamb", help="GCS URI bucket")
    args = parser.parse_args()

    run_agent_platform_veo(args.scene, model_name=args.model, gcs_uri=args.gcs)
