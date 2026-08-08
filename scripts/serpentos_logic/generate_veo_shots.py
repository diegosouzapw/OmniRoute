#!/usr/bin/env python3
"""
🎬 VEO VERTEX AI — GENERATE INDIVIDUAL SHOTS ONE BY ONE
Uses confirmed working: veo-2.0-generate-001 @ us-central1 (Vertex AI with billing)
Falls back to Free Tier API Key for Veo 3 if available.
"""

import json
import os
import time
import sys
from pathlib import Path
from google import genai
from google.genai import types

PROJECT = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "us-central1"
OUTPUT_DIR = Path("output/veo_vertex_shots")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Storyboard shots
SHOTS = [
    {
        "id": "A01",
        "duration": 8,
        "prompt": (
            "[MOTION] Camera dollies smoothly backward ahead of a charismatic 30+ strawberry-blonde heroine "
            "walking forward with a confident, breezy stride down Manhattan Fifth Avenue. Her curls flutter "
            "naturally in the breeze, her white tulle midi skirt flows rhythmically, yellow taxis move "
            "continuously in background perspective.\n"
            "[TECH] Video: 8s, 24fps, continuous motion every frame, no freeze-frames, no static shots. "
            "No embedded text, no letters, no watermarks.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement.\n"
            "[SCENE DETAIL] Super-16mm Arriflex, Panavision 28mm T2.8. Kodak Vision 200T 7274 film grain. "
            "Heroine: blush pink sleeveless top, airy white tulle skirt."
        )
    },
    {
        "id": "A02",
        "duration": 8,
        "prompt": (
            "[MOTION] Continuous tracking shot alongside heroine as she walks past a cheerful city electrician "
            "working near a classic Manhattan street lamp. Worker turns and tips his hardhat with a warm smile; "
            "heroine glances back with amused confidence without breaking stride.\n"
            "[TECH] Video: 8s, 24fps, continuous motion every frame, no freeze-frames. No embedded text.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement.\n"
            "[SCENE DETAIL] Super-16mm Arriflex, Panavision 35mm T2.8. Kodak Vision 200T warm skin tones."
        )
    },
    {
        "id": "A03",
        "duration": 8,
        "prompt": (
            "[MOTION] Camera pans right tracking heroine walking past a colorful corner fruit stall on a Manhattan "
            "sidewalk. Vendor tosses a bright red apple in the air; heroine catches it fluidly in one hand and "
            "takes a bite while continuing her energetic stride.\n"
            "[TECH] Video: 8s, 24fps, continuous motion every frame, no freeze-frames. No embedded text.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement.\n"
            "[SCENE DETAIL] Super-16mm Arriflex, Panavision 35mm T2.8. Kodak Vision 200T vivid natural colors."
        )
    },
    {
        "id": "A04",
        "duration": 8,
        "prompt": (
            "[MOTION] Dynamic low-angle tracking shot alongside heroine stepping off the curb crossing a bustling "
            "Manhattan intersection. City pedestrians walk naturally around her, yellow taxis glide across "
            "background, heroine's skirt and curls sway with her continuous walking pace.\n"
            "[TECH] Video: 8s, 24fps, continuous motion every frame, no freeze-frames. No embedded text.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement.\n"
            "[SCENE DETAIL] Super-16mm Arriflex, Panavision 35mm T2.8. Kodak Vision 200T authentic 1990s NYC texture."
        )
    },
    {
        "id": "A05",
        "duration": 8,
        "prompt": (
            "[MOTION] Camera pans rightward smoothly as a pastel cream-pink city transit bus drives past the "
            "avenue intersection. Bus wheels rotate with natural motion blur, sunlight gleams across its clean "
            "side panel, heroine walks along the foreground sidewalk.\n"
            "[TECH] Video: 8s, 24fps, continuous motion every frame, no freeze-frames. No embedded text.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement.\n"
            "[SCENE DETAIL] Super-16mm Arriflex, Panavision 28mm T2.8. Kodak Vision 200T."
        )
    },
    {
        "id": "A06",
        "duration": 10,
        "prompt": (
            "[MOTION] Slow continuous cinematic camera dolly push-in on heroine holding a modern smartphone "
            "with a clean minimalist screen. She looks up from her screen directly into camera lens with a "
            "captivating confident smile while city avenue traffic blurs into warm background bokeh.\n"
            "[TECH] Video: 10s, 24fps, continuous motion every frame, no freeze-frames. No embedded text.\n"
            "[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement.\n"
            "[SCENE DETAIL] Super-16mm Arriflex, Panavision 50mm T2.0. Kodak EXR 100T 7248 creamy bokeh."
        )
    },
]


def generate_shot(shot: dict, client_vertex, client_free=None):
    shot_id = shot["id"]
    prompt = shot["prompt"]
    out_path = OUTPUT_DIR / f"{shot_id}_veo.mp4"

    print(f"\n{'='*50}")
    print(f"🎥 Генерация {shot_id} ({shot['duration']}s) | Veo 2 Vertex AI")
    print(f"{'='*50}")
    print(f"📝 Промт: {prompt[:120]}...")

    # Try Veo 2 on Vertex AI (confirmed working)
    op = client_vertex.models.generate_videos(
        model="veo-3.1-generate-001",
        prompt=prompt,
        config=types.GenerateVideosConfig(
            aspect_ratio="16:9",
            person_generation="allow_adult",
            number_of_videos=1,
        )
    )
    print(f"⚡ Operation started: {op.name}")
    print(f"⏳ Ожидание завершения (обычно 2-5 мин)...")

    # Poll until done
    while not op.done:
        time.sleep(15)
        op = client_vertex.operations.get(op)
        print(f"   ... ещё ждём ({op.metadata.get('state', 'RUNNING') if op.metadata else 'RUNNING'})")

    print(f"✅ Операция завершена!")

    # Save video — Vertex AI returns GCS URI, use gcloud storage to download
    for video in op.response.generated_videos:
        gcs_uri = video.video.uri if hasattr(video.video, "uri") else str(video.video)
        print(f"☁️  GCS URI: {gcs_uri}")

        if gcs_uri and gcs_uri.startswith("gs://"):
            # Download via gsutil
            import subprocess
            subprocess.run(["gsutil", "cp", gcs_uri, str(out_path)], check=True)
        elif gcs_uri and gcs_uri.startswith("http"):
            import urllib.request
            urllib.request.urlretrieve(gcs_uri, str(out_path))
        else:
            # Fallback: try raw bytes if available
            raw = getattr(video.video, "video_bytes", None) or getattr(video, "video_bytes", None)
            if raw:
                with open(out_path, "wb") as f:
                    f.write(raw)
            else:
                print(f"⚠️  Неизвестный формат ответа: {video.video}")
                print(f"   Полный объект: {dir(video.video)}")
                return None

        size_mb = out_path.stat().st_size // 1024 // 1024 if out_path.exists() else 0
        print(f"💾 Сохранено: {out_path} ({size_mb}MB)")
        return str(out_path)

    return None


def main():
    # Which shot to run (default A01 for test, pass shot ID as arg)
    target_id = sys.argv[1] if len(sys.argv) > 1 else "A01"
    run_all = target_id == "all"

    client_vertex = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)
    free_key = os.environ.get("GEMINI_API_KEY", "AIzaSyBL6hl0I-7UEV_q3rvGbw-fARhCSPiZ63w")
    client_free = genai.Client(api_key=free_key)

    print("🚀 VEO VERTEX AI SHOT GENERATOR")
    print(f"📌 Project: {PROJECT} | Region: {LOCATION}")
    print(f"🎬 Target: {'ALL SHOTS' if run_all else target_id}")

    shots_to_run = SHOTS if run_all else [s for s in SHOTS if s["id"] == target_id]
    results = []

    for shot in shots_to_run:
        result = generate_shot(shot, client_vertex, client_free)
        if result:
            results.append(result)
        if not run_all:
            break

    print(f"\n{'='*50}")
    print(f"✅ Готово! Сгенерировано клипов: {len(results)}")
    for r in results:
        print(f"   📁 {r}")

    # Save manifest
    manifest = OUTPUT_DIR / "shots_manifest.json"
    with open(manifest, "w") as f:
        json.dump({"completed": results}, f, indent=2)
    print(f"📋 Манифест: {manifest}")


if __name__ == "__main__":
    main()
