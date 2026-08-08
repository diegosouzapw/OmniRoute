#!/usr/bin/env python3
"""
🎬 Doppler-Driven Veo 3 Quality Video Generator
Executes `veo-3.1-generate-001` generation using secrets injected via Doppler (`doppler run --project serpent --config prd`).
Reads parameters and Opus prompt from JSON manifest (`data/veo3_scene_08_manifest.json`).
"""

import os
import sys
import json
import time
import argparse
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MANIFEST = REPO_ROOT / "data" / "veo3_scene_08_manifest.json"


def load_manifest(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def check_doppler_secrets():
    """Verify API keys are present either via Doppler injection or os.environ."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("🔑 GEMINI_API_KEY not found in direct env. Checking Doppler (`serpent/prd`)...")
        try:
            res = subprocess.run(
                ["doppler", "secrets", "get", "GEMINI_API_KEY", "--plain", "--project", "serpent", "--config", "prd"],
                capture_output=True,
                text=True,
                check=True
            )
            api_key = res.stdout.strip()
            if api_key:
                os.environ["GEMINI_API_KEY"] = api_key
                print("✅ Successfully retrieved GEMINI_API_KEY from Doppler (`serpent/prd`).")
        except Exception as e:
            print(f"⚠️ Could not fetch key via Doppler CLI: {e}")
    return api_key


def generate_video_from_manifest(manifest_path: Path, use_vertex: bool = False, i2v: bool = False):
    manifest = load_manifest(manifest_path)
    scene = manifest["scene"]
    model_name = scene.get("model", "veo-3.1-generate-preview")
    if not use_vertex and model_name == "veo-3.1-generate-001":
        model_name = "veo-3.1-generate-preview"
    elif use_vertex and model_name == "veo-3.1-generate-preview":
        model_name = "veo-3.1-generate-001"
    prompt = scene["prompt"]
    output_path = Path(scene["output_video"])
    output_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"\n==================================================")
    print(f"🎬 VEO 3 QUALITY GENERATOR — {scene['scene_id']}: {scene['title']}")
    print(f"   Model: {model_name} | Mode: {'Image-to-Video' if i2v else 'Text-to-Video'}")
    print(f"   Target Output: {output_path}")
    print(f"==================================================\n")

    from google import genai
    from google.genai import types

    if use_vertex:
        project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "project-f91a723f-af1b-4dd2-ba3")
        location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
        print(f"🌍 Connecting to Vertex AI (`{project_id}` @ `{location}`)...")
        client = genai.Client(vertexai=True, project=project_id, location=location)
    else:
        api_key = check_doppler_secrets()
        if not api_key:
            print("❌ Error: GEMINI_API_KEY not found. Please run under `doppler run --project serpent --config prd -- ...` or provide key.")
            sys.exit(1)
        # NEVER use GOOGLE_API_KEY env var — it conflicts. Clear it per user_global rules.
        os.environ.pop("GOOGLE_API_KEY", None)
        print("🔐 Connecting to Google GenAI Studio with authenticated API Key...")
        client = genai.Client(api_key=api_key)

    config_kwargs = {
        "aspect_ratio": scene["config"].get("aspectRatio", "16:9"),
    }
    if use_vertex:
        config_kwargs["person_generation"] = scene["config"].get("personGeneration", "allow_adult")
    config = types.GenerateVideosConfig(**config_kwargs)

    kwargs = {
        "model": model_name,
        "prompt": prompt,
        "config": config,
    }

    if i2v and scene.get("reference_frame") and Path(scene["reference_frame"]).exists():
        print(f"🖼️ Attaching reference frame: {scene['reference_frame']}")
        kwargs["image"] = types.Image.from_file(location=str(scene["reference_frame"]))

    print(f"🚀 Dispatching Veo 3 generation request...")
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
    print(f"✅ Generation completed in {elapsed:.0f}s")

    if operation.response and operation.response.generated_videos:
        video = operation.response.generated_videos[0]
        video.video.save(str(output_path))
        mb = output_path.stat().st_size / (1024 * 1024)
        print(f"🎉 Saved Veo 3 Quality video -> {output_path} ({mb:.2f} MB)")
        return output_path
    else:
        print("❌ Generation finished without video output.")
        if hasattr(operation, "error") and operation.error:
            print(f"Error: {operation.error}")
        return None


def main():
    parser = argparse.ArgumentParser(description="Run Veo 3 Quality Generation via Doppler/JSON Manifest")
    parser.add_argument("--manifest", type=str, default=str(DEFAULT_MANIFEST), help="Path to JSON manifest")
    parser.add_argument("--vertex", action="store_true", help="Use Vertex AI instead of Gemini API Studio")
    parser.add_argument("--i2v", action="store_true", help="Enable Image-to-Video mode using reference frame")
    args = parser.parse_args()

    manifest_path = Path(args.manifest)
    if not manifest_path.exists():
        print(f"❌ Manifest not found: {manifest_path}")
        sys.exit(1)

    generate_video_from_manifest(manifest_path, use_vertex=args.vertex, i2v=args.i2v)


if __name__ == "__main__":
    main()
