#!/usr/bin/env python3
"""
🎬 777LADIES OPENING SEQUENCE — v2.0 FULL PIPELINE
Steps:
  0. CHARACTER LOCK (appended to all prompts)
  1. Imagen3 → heroine_reference.png (seed=42001)
  2. Veo 3.1 i2v shots S01–S06 (image-to-video with heroine ref)
  3. FFmpeg concat + color grade
  (4. Remotion overlay — separate step)
"""

import json, os, sys, time, subprocess, shutil
from pathlib import Path
from google import genai
from google.genai import types

PROJECT = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "us-central1"
FREE_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyBL6hl0I-7UEV_q3rvGbw-fARhCSPiZ63w")

OUTPUT_DIR = Path("output/veo_v2")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
MOVIES_DIR = Path("/Users/work/Movies/sex new")

PIPELINE_FILE = Path("data/shots_pipeline_v2.json")

def log(msg): print(msg, flush=True)


# ─────────────────────────────────────────────
# STEP 1: Imagen3 → heroine_reference.png
# ─────────────────────────────────────────────
def generate_reference_image(client_vertex, pipeline):
    ref_path = OUTPUT_DIR / "heroine_reference.png"
    if ref_path.exists():
        log(f"✅ Referenece image already exists: {ref_path}")
        return ref_path

    cfg = pipeline["step_1_imagen3"]
    log(f"\n{'='*55}")
    log(f"🖼️  STEP 1: Imagen3 — Generating heroine reference (seed={cfg['seed']})")
    log(f"{'='*55}")

    # Imagen3 with seed requires Vertex AI client (not Free Tier)
    resp = client_vertex.models.generate_images(
        model=cfg["model"],
        prompt=cfg["prompt"],
        config=types.GenerateImagesConfig(
            number_of_images=1,
            seed=cfg["seed"],
            aspect_ratio="9:16",
            safety_filter_level="BLOCK_ONLY_HIGH",
            person_generation="ALLOW_ADULT",
        )
    )
    img_bytes = resp.generated_images[0].image.image_bytes
    with open(ref_path, "wb") as f:
        f.write(img_bytes)
    log(f"✅ Saved heroine_reference.png ({ref_path.stat().st_size // 1024}KB)")
    return ref_path


# ─────────────────────────────────────────────
# STEP 2: Veo 3.1 — generate individual shot
# ─────────────────────────────────────────────
def generate_veo_shot(shot, client_vertex, ref_image_path=None):
    shot_id = shot["id"]
    out_path = OUTPUT_DIR / f"{shot_id}_veo3.mp4"

    if out_path.exists() and out_path.stat().st_size > 1_000_000:
        log(f"✅ [{shot_id}] Already exists ({out_path.stat().st_size // 1024 // 1024}MB), skipping.")
        return str(out_path)

    prompt = shot["prompt"]
    duration = shot.get("duration_seconds", 8)

    log(f"\n{'='*55}")
    log(f"🎥 [{shot_id}] Veo 3.1-generate-001 | {duration}s | us-central1")
    log(f"{'='*55}")
    log(f"📝 {prompt[:140]}...")

    # Build config
    veo_config = types.GenerateVideosConfig(
        aspect_ratio="16:9",
        person_generation="allow_adult",
        number_of_videos=1,
    )

    # image-to-video if reference available
    if ref_image_path and Path(ref_image_path).exists():
        with open(ref_image_path, "rb") as f:
            img_bytes = f.read()
        image = types.Image(image_bytes=img_bytes, mime_type="image/png")
        op = client_vertex.models.generate_videos(
            model="veo-3.1-generate-001",
            prompt=prompt,
            image=image,
            config=veo_config,
        )
        log(f"🖼️  Mode: image-to-video with heroine_reference.png")
    else:
        op = client_vertex.models.generate_videos(
            model="veo-3.1-generate-001",
            prompt=prompt,
            config=veo_config,
        )
        log(f"📝 Mode: text-to-video")

    log(f"⚡ Op started: {op.name.split('/')[-1]}")
    log(f"⏳ Polling (usually 2-5 min)...")

    while not op.done:
        time.sleep(15)
        op = client_vertex.operations.get(op)
        state = op.metadata.get("state", "RUNNING") if op.metadata else "RUNNING"
        log(f"   [{shot_id}] {state}")

    log(f"✅ [{shot_id}] Done!")

    # --- Extract video bytes from Vertex AI response ---
    for vid in op.response.generated_videos:
        v = vid.video

        # Try video_bytes directly
        raw = getattr(v, "video_bytes", None)
        if raw:
            with open(out_path, "wb") as f:
                f.write(raw)
            log(f"💾 Saved via video_bytes: {out_path} ({out_path.stat().st_size // 1024 // 1024}MB)")
            return str(out_path)

        # Try GCS URI via gsutil
        uri = getattr(v, "uri", None)
        if uri and uri.startswith("gs://"):
            subprocess.run(["gsutil", "cp", uri, str(out_path)], check=True)
            log(f"💾 Saved via gsutil: {out_path} ({out_path.stat().st_size // 1024 // 1024}MB)")
            return str(out_path)

        # Try signed HTTP URL
        if uri and uri.startswith("http"):
            import urllib.request
            urllib.request.urlretrieve(uri, str(out_path))
            log(f"💾 Saved via HTTP: {out_path}")
            return str(out_path)

        # Debug: show all available fields
        log(f"⚠️  Response fields: {[a for a in dir(v) if not a.startswith('_')]}")
        log(f"   Full video obj: {v}")

    log(f"❌ [{shot_id}] No video data extracted.")
    return None


# ─────────────────────────────────────────────
# STEP 3: FFmpeg concat + grade
# ─────────────────────────────────────────────
def ffmpeg_concat_and_grade(clip_paths):
    concat_txt = OUTPUT_DIR / "concat_v2.txt"
    with open(concat_txt, "w") as f:
        for p in clip_paths:
            f.write(f"file '{Path(p).absolute()}'\n")

    raw_out = OUTPUT_DIR / "777ladies_concat_raw.mp4"
    log(f"\n🔗 Concatenating {len(clip_paths)} clips...")
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat_txt),
        "-c:v", "libx264", "-preset", "ultrafast", "-crf", "16",
        "-r", "24", "-an", "-movflags", "+faststart",
        str(raw_out)
    ], check=True, stderr=subprocess.DEVNULL)

    graded_out = OUTPUT_DIR / "777ladies_graded.mp4"
    final_movies = MOVIES_DIR / "777ladies_v2_FINAL.mp4"
    log(f"🎨 Applying Kodak Vision 200T color grade + film grain...")
    subprocess.run([
        "ffmpeg", "-y", "-i", str(raw_out),
        "-vf", "eq=contrast=1.06:brightness=0.015:saturation=1.12,noise=alls=4:allf=t",
        "-c:v", "libx264", "-preset", "slow", "-crf", "14",
        "-r", "24", "-an", "-movflags", "+faststart",
        str(graded_out)
    ], check=True, stderr=subprocess.DEVNULL)

    shutil.copy2(graded_out, final_movies)

    # Verify
    res = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration:stream=r_frame_rate,width,height",
         "-of", "json", str(graded_out)],
        capture_output=True, text=True
    )
    meta = json.loads(res.stdout)
    log(f"\n🎉 FINAL: {graded_out}")
    log(f"📁 Movies: {final_movies}")
    log(f"📊 {json.dumps(meta, indent=2)}")
    return str(graded_out)


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "all"

    client_vertex = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)
    client_free = genai.Client(api_key=FREE_KEY)

    with open(PIPELINE_FILE) as f:
        pipeline = json.load(f)

    shots = pipeline["step_2_veo3_shots"]

    log("🚀 777LADIES v2.0 PIPELINE")
    log(f"📌 Project: {PROJECT} | Region: {LOCATION}")
    log(f"📌 Target: {target}")

    # STEP 1: Imagen3 reference
    ref_path = None
    try:
        ref_path = generate_reference_image(client_vertex, pipeline)
    except Exception as e:
        log(f"⚠️  Imagen3 failed (will use text-to-video): {e}")

    # STEP 2: Veo 3.1 shots
    if target == "all":
        shots_to_run = shots
    elif target == "test":
        shots_to_run = shots[:1]
    else:
        shots_to_run = [s for s in shots if s["id"] == target]

    completed = []
    for shot in shots_to_run:
        result = generate_veo_shot(shot, client_vertex, ref_path)
        if result:
            completed.append(result)

    log(f"\n✅ Generated {len(completed)}/{len(shots_to_run)} shots")

    # STEP 3: Assemble if all done
    if target == "all" and len(completed) == len(shots):
        ffmpeg_concat_and_grade(completed)
    elif completed:
        log(f"📁 Clips saved in: {OUTPUT_DIR}")
        for c in completed:
            sz = Path(c).stat().st_size // 1024 // 1024
            log(f"   {Path(c).name} ({sz}MB)")

    manifest = OUTPUT_DIR / "v2_manifest.json"
    with open(manifest, "w") as f:
        json.dump({"completed": completed, "target": target}, f, indent=2)
    log(f"📋 Manifest: {manifest}")


if __name__ == "__main__":
    main()
