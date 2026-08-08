#!/usr/bin/env python3
"""
🎬 SERPENTOS PRODUCTION AI VIDEO PIPELINE (ALL-IN-ONE)
Architecture: Claude Opus (Vertex AI) -> Storyboard JSON -> Veo 3.1 (Vertex AI LRO + GCS) -> Download -> FFmpeg Concat

Features:
1. Phase 1: Prompt Director via Vertex AI (AnthropicVertex / Gemini) generating schema-locked storyboard JSON.
2. Phase 2: Video Generation via Google Gen AI SDK (`client.models.generate_videos`) saving LRO directly to GCS.
3. Phase 3: Manifest & GCS Download (`gcloud storage cp`) with prompt_hash, model_id, request_time telemetry.
4. Phase 4: Production FFmpeg Assembly (`ffmpeg concat`) into final broadcast-ready MP4.
"""

import hashlib
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

try:
    from google import genai
    from google.genai.types import GenerateVideosConfig
except ImportError:
    genai = None

# Default Production Configuration
DEFAULT_PROJECT_ID = os.getenv("GCP_PROJECT_ID", "project-f91a723f-af1b-4dd2-ba3")
DEFAULT_REGION = os.getenv("GCP_REGION", "europe-west3")
DEFAULT_GCS_BUCKET = os.getenv("GCS_BUCKET", f"gs://{DEFAULT_PROJECT_ID}-veo-output")
MODEL_ID = os.getenv("VEO_MODEL_ID", "veo-3.1-generate-preview")

PROJECT_DIR = Path(".")
OUTPUT_DIR = PROJECT_DIR / "output"
DOWNLOADS_DIR = OUTPUT_DIR / "downloads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)


def compute_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:12]


def run_prompt_director(brief_path: Path, output_json: Path):
    """Phase 1: Generate structured storyboard JSON using Claude Opus on Vertex AI."""
    print("==================================================")
    print("🧠 PHASE 1: PROMPT DIRECTOR (CLAUDE OPUS VERTEX AI)")
    print("==================================================")

    try:
        from anthropic import AnthropicVertex
        client = AnthropicVertex(project_id=DEFAULT_PROJECT_ID, region="us-east5")
        print(f"✅ Connected to AnthropicVertex ({DEFAULT_PROJECT_ID})")
    except Exception as e:
        print(f"⚠️ AnthropicVertex SDK fallback: {e}")
        return False

    if not brief_path.exists():
        print(f"❌ Brief file not found: {brief_path}")
        return False

    brief = brief_path.read_text(encoding="utf-8")
    system_prompt = (
        "You are a Cinematic Prompt Director. Output strictly valid JSON matching the schema:\n"
        '{"project": "urban_opening", "shots": [{"id": "S01", "duration_seconds": 4, "aspect_ratio": "16:9", "prompt": "..."}]}'
    )

    response = client.messages.create(
        model="claude-3-5-sonnet-v2@20241022",
        max_tokens=4096,
        system=system_prompt,
        messages=[{"role": "user", "content": brief}],
    )

    raw = response.content[0].text.strip()
    if raw.startswith("```json"):
        raw = raw[7:]
    if raw.endswith("```"):
        raw = raw[:-3]

    data = json.loads(raw.strip())
    output_json.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✅ Storyboard JSON successfully generated -> {output_json}")
    return True


def run_veo_generation(storyboard_file: Path, manifest_file: Path, gcs_prefix: str):
    """Phase 2: Execute Veo Long-Running Operations (LRO) to GCS and poll for completion."""
    print("==================================================")
    print("🎬 PHASE 2: VEO VIDEO GENERATION (VERTEX AI LRO -> GCS)")
    print("==================================================")

    if genai is None:
        print("❌ google-genai library not installed. Run: pip install google-genai")
        return False

    with open(storyboard_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    from serpent_genai import get_genai_client
    client = get_genai_client()
    if not client:
        print("❌ Could not initialize GenAI client with ADC fallback compliance.")
        return False

    manifest = {
        "project": data.get("project", "veo_production"),
        "model_id": MODEL_ID,
        "gcs_bucket_prefix": gcs_prefix,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "shots": []
    }


    for shot in data["shots"]:
        shot_id = shot["id"]
        prompt = shot["prompt"]
        duration = shot.get("duration_seconds", 4)
        aspect_ratio = shot.get("aspect_ratio", "16:9")
        prompt_hash = compute_hash(prompt)
        output_gcs_uri = f"{gcs_prefix.rstrip('/')}/{shot_id}/"

        print(f"\n🚀 Launching LRO for Shot {shot_id} ({duration}s)...")
        request_time = datetime.now(timezone.utc).isoformat()

        try:
            operation = client.models.generate_videos(
                model=MODEL_ID,
                prompt=prompt,
                config=GenerateVideosConfig(
                    aspect_ratio=aspect_ratio,
                    duration_seconds=duration,
                    output_gcs_uri=output_gcs_uri,
                    number_of_videos=1,
                    person_generation="allow_adult"
                ),
            )

            print(f"  ⏳ LRO initiated: {operation.name} -> Polling...")
            while not operation.done:
                time.sleep(15)
                operation = client.operations.get(operation)

            result_uri = None
            status = "failed"
            if operation.response and operation.result.generated_videos:
                result_uri = operation.result.generated_videos[0].video.uri
                status = "completed"
                print(f"  ✅ Shot {shot_id} COMPLETED -> {result_uri}")
            else:
                print(f"  ❌ Shot {shot_id} FAILED.")

        except Exception as e:
            print(f"  ❌ Exception generating {shot_id}: {e}")
            result_uri = None
            status = "failed"

        manifest["shots"].append({
            "id": shot_id,
            "prompt": prompt,
            "prompt_hash": prompt_hash,
            "duration_seconds": duration,
            "aspect_ratio": aspect_ratio,
            "request_time": request_time,
            "output_gcs_uri": result_uri,
            "status": status
        })

    with open(manifest_file, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"\n📋 Production manifest written -> {manifest_file}")
    return True


def download_from_gcs(manifest_file: Path, downloads_dir: Path):
    """Phase 3: Download completed MP4 clips from GCS to local output/downloads directory."""
    print("==================================================")
    print("📦 PHASE 3: DOWNLOADING SHOTS FROM GCS")
    print("==================================================")

    manifest = json.loads(manifest_file.read_text(encoding="utf-8"))
    downloaded_clips = []

    for shot in manifest["shots"]:
        if shot["status"] != "completed" or not shot.get("output_gcs_uri"):
            print(f"  ⚠️ Skipping {shot['id']} (status: {shot['status']})")
            continue

        target_mp4 = downloads_dir / f"{shot['id']}.mp4"
        print(f"  ⬇️ Copying {shot['output_gcs_uri']} -> {target_mp4}...")
        res = subprocess.run(
            ["gcloud", "storage", "cp", shot["output_gcs_uri"], str(target_mp4)],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if res.returncode == 0 and target_mp4.exists():
            downloaded_clips.append(target_mp4)
            print(f"  ✅ Downloaded {shot['id']}.mp4")
        else:
            print(f"  ❌ Download failed for {shot['id']}: {res.stderr.decode()[:150]}")

    return downloaded_clips


def assemble_final_video(clips_dir: Path, final_output: Path):
    """Phase 4: Seamless ffmpeg concat assembly of all clips in storyboard order."""
    print("==================================================")
    print("🎞️ PHASE 4: FFMPEG PRODUCTION CONCAT ASSEMBLY")
    print("==================================================")

    clips = sorted(clips_dir.glob("S*.mp4"))
    if not clips:
        print("❌ No downloaded clips found in", clips_dir)
        return False

    concat_file = OUTPUT_DIR / "clips.txt"
    concat_file.write_text(
        "\n".join([f"file '{clip.resolve()}'" for clip in clips]),
        encoding="utf-8"
    )

    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_file),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        str(final_output)
    ]

    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        print(f"🎉 FINAL VIDEO ASSEMBLED -> {final_output}")
        return True
    else:
        print(f"❌ FFmpeg assembly failed: {res.stderr.decode()[:200]}")
        return False


def main():
    import argparse
    parser = argparse.ArgumentParser(description="SerpentOS Production AI Video Pipeline")
    parser.add_argument("--dry-run", action="store_true", help="Run without executing generation API")
    args = parser.parse_args()

    print("🎬 SERPENTOS PRODUCTION AI VIDEO PIPELINE")
    storyboard_file = Path("data/veo_prompts_20s.json")
    manifest_file = OUTPUT_DIR / "manifest.json"
    final_video = OUTPUT_DIR / "final_production_video.mp4"
    gcs_prefix = f"{DEFAULT_GCS_BUCKET}/urban_fashion_20s/"

    if not storyboard_file.exists():
        print(f"❌ Storyboard JSON not found at {storyboard_file}")
        return

    if args.dry_run:
        print("Dry run requested. Exiting cleanly.")
        return

    # Execute Phase 2 (or use offline dry-run if API unauthenticated)
    run_veo_generation(storyboard_file, manifest_file, gcs_prefix)

    # Execute Phase 3 & 4
    if manifest_file.exists():
        download_from_gcs(manifest_file, DOWNLOADS_DIR)
        assemble_final_video(DOWNLOADS_DIR, final_video)


if __name__ == "__main__":
    main()

