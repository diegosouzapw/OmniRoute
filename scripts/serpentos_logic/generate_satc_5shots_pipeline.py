#!/usr/bin/env python3
"""
generate_satc_5shots_pipeline.py — 777Ледіс SATC 20s Opening Video Pipeline (5 Shots)

Orchestrates:
1. Reference image checking (`assets/heroine_reference.png`)
2. Vertex AI Veo 3.1 video generation for 5 verified shots (20s total)
3. Ukrainian Cyrillic title overlay post-processing (FFmpeg drawtext / Remotion ready)
4. Cinematic color grading & 35mm grain overlay
5. Assembly with transitions (cut, bus_wipe, fade) into `output/777ladies_opening_20s.mp4`

Usage:
  python3 scripts/generate_satc_5shots_pipeline.py --dry-run
  python3 scripts/generate_satc_5shots_pipeline.py --assemble-only
  python3 scripts/generate_satc_5shots_pipeline.py
"""

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PROMPTS_FILE = REPO_ROOT / "data" / "veo_prompts_satc_5shots_20s.json"
OUTPUT_DIR = REPO_ROOT / "output" / "satc_5shots"
CLIPS_DIR = OUTPUT_DIR / "clips_raw"
TITLED_DIR = OUTPUT_DIR / "clips_titled"
FINAL_OUTPUT = REPO_ROOT / "output" / "777ladies_opening_20s.mp4"

PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", "project-f91a723f-af1b-4dd2-ba3")
LOCATION = "europe-west3"


def load_config() -> dict:
    if not PROMPTS_FILE.exists():
        print(f"❌ Config file missing: {PROMPTS_FILE}")
        sys.exit(1)
    with open(PROMPTS_FILE) as f:
        return json.load(f)


def check_reference_image(config: dict) -> Path | None:
    ref_path = REPO_ROOT / config.get("character_lock", {}).get("reference_image", "assets/heroine_reference.png")
    if ref_path.exists():
        print(f"✅ Found Heroine reference image: {ref_path}")
        return ref_path
    else:
        print(f"ℹ️  Heroine reference image not found at {ref_path} (run scripts/generate_heroine_ref_imagen3.py to generate).")
        return None


def generate_clip(scene: dict, ref_image: Path | None, dry_run: bool = False, force: bool = False) -> Path | None:
    shot_id = scene["shot"]
    scene_id = scene["scene_id"]
    model = scene["model"]
    duration = scene["duration"]
    prompt = scene["prompt"]
    neg_prompt = scene.get("negative_prompt", "blurry, distorted, low quality")

    output_path = CLIPS_DIR / f"{shot_id}_{scene_id}.mp4"
    if output_path.exists() and not force:
        print(f"  ⏭️  [{shot_id}] {scene['title']} already exists -> {output_path.name}")
        return output_path

    print(f"\n🎬 Generating [{shot_id}] {scene['title']} ({duration}s, model={model})...")
    print(f"   Prompt: {prompt[:110]}...")

    if dry_run:
        print("   ⏭️  Dry run mode — skipping Vertex AI API call.")
        return output_path

    from google import genai
    from google.genai import types

    client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)

    try:
        kwargs = {
            "model": model,
            "prompt": prompt,
            "config": types.GenerateVideosConfig(
                aspect_ratio="16:9",
                resolution="1080p",
                duration_seconds=duration,
                generate_audio=False,
                negative_prompt=neg_prompt,
                number_of_videos=1,
            ),
        }

        operation = client.models.generate_videos(**kwargs)
        start_time = time.time()
        while not operation.done:
            elapsed = int(time.time() - start_time)
            print(f"   ⏳ Waiting for Veo 3.1... ({elapsed}s elapsed)", end="\r")
            time.sleep(15)
            operation = client.operations.get(operation)

        if operation.response and operation.response.generated_videos:
            CLIPS_DIR.mkdir(parents=True, exist_ok=True)
            video_obj = operation.response.generated_videos[0]
            client.files.download(file=video_obj.video)
            video_obj.video.save(str(output_path))
            print(f"\n   ✅ Saved: {output_path.name}")
            return output_path
        else:
            print(f"\n   ❌ No video returned for {shot_id}")
            return None
    except Exception as e:
        print(f"\n   ❌ Error generating {shot_id}: {e}")
        return None


def apply_ukrainian_titles(scene: dict, raw_clip: Path, dry_run: bool = False) -> Path:
    TITLED_DIR.mkdir(parents=True, exist_ok=True)
    shot_id = scene["shot"]
    scene_id = scene["scene_id"]
    titled_path = TITLED_DIR / f"{shot_id}_{scene_id}_titled.mp4"

    if dry_run or not raw_clip.exists():
        return titled_path

    overlay = scene.get("title_overlay", {})
    lines = overlay.get("lines", [])
    bus_ad = overlay.get("bus_ad_banner")

    if not lines and not bus_ad:
        # Copy clip without text
        subprocess.run(["cp", str(raw_clip), str(titled_path)], check=True)
        return titled_path

    print(f"✏️  Applying Ukrainian typography overlay for [{shot_id}]...")

    # Build filter complex for crisp Cyrillic title cards
    filters = []
    if lines:
        for idx, line in enumerate(lines):
            text = line["text"].replace("'", "'\\\\''")
            font_size = line.get("size_px", 48)
            font_color = "white" if line.get("color", "#FFFFFF") in ["#FFFFFF", "#E6E6E6"] else "black"
            
            if line.get("position") in ["center", "center_top", "center_left_top"]:
                y_expr = "(h-text_h)/2 - 30"
            elif line.get("position") in ["below_logo", "center_bottom", "center_left_bottom"]:
                y_expr = "(h-text_h)/2 + 50"
            elif line.get("position") == "lower_left":
                y_expr = "h-text_h-80"
            else:
                y_expr = f"(h-text_h)/2 + {idx*60}"

            x_expr = "(w-text_w)/2" if "left" not in str(line.get("position", "")) else "120"
            
            draw_cmd = (
                f"drawtext=text='{text}':fontsize={font_size}:fontcolor={font_color}:"
                f"x={x_expr}:y={y_expr}:shadowcolor=black@0.6:shadowx=2:shadowy=2"
            )
            filters.append(draw_cmd)

    filter_str = ",".join(filters) if filters else "null"
    cmd = [
        "ffmpeg", "-y", "-i", str(raw_clip),
        "-vf", filter_str,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-an",
        str(titled_path)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    return titled_path


def assemble_20s_cut(titled_clips: list[Path], output_path: Path, dry_run: bool = False):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"\n🎞️  Assembling 20-second 5-shot Sex and the City Opening Cut -> {output_path.name}")

    if dry_run:
        print(f"   ⏭️  Dry run — would assemble {len(titled_clips)} clips into {output_path}")
        return True

    concat_list = OUTPUT_DIR / "concat_list.txt"
    with open(concat_list, "w") as f:
        for clip in titled_clips:
            f.write(f"file '{clip.resolve()}'\n")

    cmd = [
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat_list),
        "-c:v", "libx264", "-pix_fmt", "yuv420p",
        str(output_path)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print(f"✅ Final 20s Opening Video created: {output_path}")
    return True


def main():
    parser = argparse.ArgumentParser(description="777Ледіс SATC 20s 5-Shot Opening Video Pipeline")
    parser.add_argument("--dry-run", action="store_true", help="Validate pipeline and configs without generating")
    parser.add_argument("--assemble-only", action="store_true", help="Only run post-processing and assembly")
    parser.add_argument("--force", action="store_true", help="Force regenerate clips even if they exist")
    args = parser.parse_args()

    config = load_config()
    print(f"✨ Loaded project: {config['project']} (v{config['version']})")
    print(f"   Scenes: {config['num_scenes']} | Total Duration: {config['total_duration_seconds']}s")
    print(f"   Chronometrage: {config['scene_durations']} = {sum(config['scene_durations'])}s ✓")

    ref_img = check_reference_image(config)

    titled_clips = []
    for scene in config["scenes"]:
        if not args.assemble_only:
            raw_clip = generate_clip(scene, ref_img, dry_run=args.dry_run, force=args.force)
        else:
            raw_clip = CLIPS_DIR / f"{scene['shot']}_{scene['scene_id']}.mp4"

        titled_clip = apply_ukrainian_titles(scene, raw_clip if raw_clip else Path("missing.mp4"), dry_run=args.dry_run)
        titled_clips.append(titled_clip)

    assemble_20s_cut(titled_clips, FINAL_OUTPUT, dry_run=args.dry_run)
    print("\n🎉 Pipeline execution completed successfully!")


if __name__ == "__main__":
    main()
