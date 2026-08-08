#!/usr/bin/env python3
"""
generate_satc_opening.py — 777Ladies SATC Opening Video Generator (Veo 3.1)

Reads veo_prompts_satc_ua.json, generates video clips via Vertex AI Veo 3.1,
and assembles them into a final showreel with FFmpeg crossfade transitions.

Usage:
  python3 scripts/generate_satc_opening.py --dry-run          # Validate only
  python3 scripts/generate_satc_opening.py --scenes 1,2,3     # Specific scenes
  python3 scripts/generate_satc_opening.py --tier economy      # Override tier
  python3 scripts/generate_satc_opening.py                     # Full pipeline
  python3 scripts/generate_satc_opening.py --assemble-only     # FFmpeg only

Environment:
  GOOGLE_CLOUD_PROJECT  (default: project-f91a723f-af1b-4dd2-ba3)
  GOOGLE_CLOUD_LOCATION (forced: us-central1 for Veo 3.1)

Author: Antigravity GSD Pipeline (2026-07-10)
"""

import argparse
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

# ── Constants ────────────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).resolve().parent.parent
PROMPTS_FILE = REPO_ROOT / "data" / "veo_prompts_preroll_20s.json"
OUTPUT_DIR = REPO_ROOT / "output" / "satc_ua"
CLIPS_DIR = OUTPUT_DIR / "clips"
LEDGER_FILE = OUTPUT_DIR / "generation_ledger.json"
FINAL_OUTPUT = OUTPUT_DIR / "777ladies_satc_opening.mp4"
DAVINCI_XML = OUTPUT_DIR / "777ladies_timeline.xml"

PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", "project-f91a723f-af1b-4dd2-ba3")
LOCATION = "us-central1"  # Veo 3.1 ONLY supports us-central1

# Cost per second of generated video (no audio)
COST_MAP = {
    "veo-3.1-generate-001": 0.40,
    "veo-3.1-fast-generate-preview": 0.20,
    "veo-3.1-lite-generate-preview": 0.05,
}

POLL_INTERVAL_SEC = 20
MAX_RETRIES = 3
RETRY_BACKOFF_BASE = 30  # seconds


def load_prompts() -> dict:
    """Load and validate the prompts JSON file."""
    if not PROMPTS_FILE.exists():
        print(f"❌ Prompts file not found: {PROMPTS_FILE}")
        sys.exit(1)
    with open(PROMPTS_FILE) as f:
        data = json.load(f)
    print(f"✅ Loaded {len(data['scenes'])} scenes from {PROMPTS_FILE.name} (v{data['version']})")
    return data


def load_ledger() -> dict:
    """Load generation ledger for resume support."""
    if LEDGER_FILE.exists():
        with open(LEDGER_FILE) as f:
            return json.load(f)
    return {"generated": {}, "failed": {}, "skipped": {}}


def save_ledger(ledger: dict):
    """Save generation ledger."""
    LEDGER_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LEDGER_FILE, "w") as f:
        json.dump(ledger, f, indent=2, ensure_ascii=False)


def estimate_cost(scenes: list[dict], tier_override: str | None = None) -> float:
    """Calculate estimated cost for generating all scenes."""
    total = 0.0
    for scene in scenes:
        model = tier_override_model(tier_override) if tier_override else scene["model"]
        duration = scene.get("duration", 8)
        cost_per_sec = COST_MAP.get(model, 0.40)
        total += cost_per_sec * duration
    return total


def tier_override_model(tier: str) -> str:
    """Map tier name to model ID."""
    return {
        "hero": "veo-3.1-generate-001",
        "standard": "veo-3.1-fast-generate-preview",
        "economy": "veo-3.1-lite-generate-preview",
    }.get(tier, "veo-3.1-fast-generate-preview")


def generate_single_video(scene: dict, tier_override: str | None = None) -> str | None:
    """
    Generate a single video clip using Vertex AI Veo 3.1.
    Returns the output file path on success, None on failure.
    """
    # Import here to allow --dry-run without SDK
    from google import genai
    from google.genai import types

    scene_id = scene["scene_id"]
    model = tier_override_model(tier_override) if tier_override else scene["model"]
    duration = scene.get("duration", 8)
    prompt = scene["prompt"]
    negative_prompt = scene.get("negative_prompt", "blurry, distorted, low quality")

    output_path = CLIPS_DIR / f"{scene_id.lower()}.mp4"
    if output_path.exists():
        print(f"  ⏭️  {scene_id}: already exists at {output_path.name}, skipping")
        return str(output_path)

    print(f"  🎬 {scene_id} [{scene['title']}]")
    print(f"     Model: {model} | Duration: {duration}s | Cost: ~${COST_MAP.get(model, 0.4) * duration:.2f}")
    print(f"     Prompt: {prompt[:100]}...")

    # Initialize Vertex AI client
    os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
    os.environ["GOOGLE_CLOUD_LOCATION"] = LOCATION
    client = genai.Client(vertexai=True)

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            print(f"     ⏳ Attempt {attempt}/{MAX_RETRIES} — submitting to Vertex AI...")
            operation = client.models.generate_videos(
                model=model,
                prompt=prompt,
                config=types.GenerateVideosConfig(
                    aspect_ratio="16:9",
                    resolution="1080p",
                    duration_seconds=duration,
                    generate_audio=False,
                    negative_prompt=negative_prompt,
                    number_of_videos=1,
                ),
            )

            # Poll for completion
            start_time = time.time()
            while not operation.done:
                elapsed = int(time.time() - start_time)
                print(f"     ⏳ Waiting... ({elapsed}s elapsed)", end="\r")
                time.sleep(POLL_INTERVAL_SEC)
                operation = client.operations.get(operation)

            elapsed = int(time.time() - start_time)

            if operation.response and operation.response.generated_videos:
                generated_video = operation.response.generated_videos[0]
                client.files.download(file=generated_video.video)
                generated_video.video.save(str(output_path))
                file_size = output_path.stat().st_size / (1024 * 1024)
                print(f"     ✅ Saved: {output_path.name} ({file_size:.1f} MB, {elapsed}s)")
                return str(output_path)
            else:
                print(f"     ⚠️  No video returned for {scene_id} (attempt {attempt})")
                if attempt < MAX_RETRIES:
                    backoff = RETRY_BACKOFF_BASE * attempt
                    print(f"     ⏳ Retrying in {backoff}s...")
                    time.sleep(backoff)

        except Exception as e:
            error_str = str(e)
            print(f"     ❌ Error (attempt {attempt}): {error_str[:200]}")

            # Rate limit → backoff
            if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                backoff = RETRY_BACKOFF_BASE * (2 ** attempt)
                print(f"     ⏳ Rate limited. Backing off {backoff}s...")
                time.sleep(backoff)
            elif attempt < MAX_RETRIES:
                backoff = RETRY_BACKOFF_BASE * attempt
                print(f"     ⏳ Retrying in {backoff}s...")
                time.sleep(backoff)

    print(f"     ❌ FAILED: {scene_id} after {MAX_RETRIES} attempts")
    return None


def assemble_showreel(clips: list[str], output_path: Path, crossfade_duration: float = 0.5):
    """
    Assemble individual clips into a final showreel using FFmpeg with crossfade transitions.
    """
    if not clips:
        print("❌ No clips to assemble")
        return False

    print(f"\n🎞️  Assembling showreel from {len(clips)} clips...")

    if len(clips) == 1:
        # Single clip — just copy
        subprocess.run(["cp", clips[0], str(output_path)], check=True)
        print(f"✅ Single clip copied to {output_path}")
        return True

    # Build FFmpeg complex filter for crossfade transitions
    inputs = []
    filter_parts = []
    
    for i, clip in enumerate(clips):
        inputs.extend(["-i", clip])

    # For crossfade: chain xfade filters
    n = len(clips)
    cf = crossfade_duration

    if n == 2:
        # Simple case: just one crossfade
        filter_parts.append(f"[0:v][1:v]xfade=transition=fade:duration={cf}:offset=7.5[outv]")
        filter_str = ";".join(filter_parts)
        map_label = "[outv]"
    else:
        # Chain crossfades: [0]+[1]→[v01], [v01]+[2]→[v012], etc.
        prev = "0:v"
        for i in range(1, n):
            curr = f"{i}:v"
            out = f"v{i}" if i < n - 1 else "outv"
            # Offset = end of accumulated duration minus crossfade overlap
            offset = (8.0 * i) - (cf * i) + (8.0 - cf) * 0  # simplified
            # Actually: each clip is 8s, crossfade removes cf seconds
            # Total duration after i clips with crossfades = 8*i - cf*(i-1)
            # Next crossfade offset = total_so_far - cf
            total_so_far = 8.0 * i - cf * (i - 1)
            offset = total_so_far - cf
            
            filter_parts.append(
                f"[{prev}][{curr}]xfade=transition=fade:duration={cf}:offset={offset:.2f}[{out}]"
            )
            prev = out
        filter_str = ";".join(filter_parts)
        map_label = "[outv]"

    cmd = [
        "ffmpeg", "-y",
        *inputs,
        "-filter_complex", filter_str,
        "-map", map_label,
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-r", "24",
        str(output_path),
    ]

    print(f"  Running FFmpeg ({len(clips)} inputs)...")
    log_path = OUTPUT_DIR / "ffmpeg_assembly.log"
    with open(log_path, "w") as log_f:
        result = subprocess.run(cmd, stdout=log_f, stderr=subprocess.STDOUT)

    if result.returncode == 0:
        file_size = output_path.stat().st_size / (1024 * 1024)
        total_duration = 8.0 * n - cf * (n - 1)
        print(f"✅ Showreel assembled: {output_path.name} ({file_size:.1f} MB, ~{total_duration:.1f}s)")
        return True
    else:
        print(f"❌ FFmpeg failed (exit {result.returncode}). See {log_path}")
        return False


def generate_davinci_xml(clips: list[str], xml_path: Path, fps: int = 24):
    """Generate FCPXML timeline for DaVinci Resolve import."""
    n = len(clips)
    total_frames = n * 8 * fps  # 8 seconds per clip

    xml_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.11">
  <resources>
    <format id="r1" name="FFVideoFormat1080p24" frameDuration="1/{fps}s"
            width="1920" height="1080"/>
"""

    for i, clip in enumerate(clips):
        clip_name = Path(clip).stem
        xml_content += f'    <asset id="a{i+1}" name="{clip_name}" src="file://{clip}" '
        xml_content += f'start="0s" duration="{8 * fps}/{fps}s" format="r1"/>\n'

    xml_content += f"""  </resources>
  <library>
    <event name="777Ladies SATC Opening">
      <project name="777Ladies_SATC_Opening_v3">
        <sequence format="r1" duration="{total_frames}/{fps}s">
          <spine>
"""

    offset = 0
    for i, clip in enumerate(clips):
        clip_name = Path(clip).stem
        xml_content += f'            <asset-clip name="{clip_name}" ref="a{i+1}" '
        xml_content += f'offset="{offset}/{fps}s" duration="{8 * fps}/{fps}s"/>\n'
        offset += 8 * fps

    xml_content += """          </spine>
        </sequence>
      </project>
    </event>
  </library>
</fcpxml>
"""

    xml_path.parent.mkdir(parents=True, exist_ok=True)
    with open(xml_path, "w") as f:
        f.write(xml_content)
    print(f"✅ DaVinci XML timeline: {xml_path.name}")


def print_cost_breakdown(scenes: list[dict], tier_override: str | None = None):
    """Print detailed cost breakdown by tier."""
    tiers = {"hero": [], "standard": [], "economy": []}
    for scene in scenes:
        tier = scene.get("cost_tier", "standard")
        if tier_override:
            tier = tier_override
        tiers[tier].append(scene)

    print("\n" + "=" * 60)
    print("💰 COST BREAKDOWN (estimated, video-only, no audio)")
    print("=" * 60)

    total = 0.0
    for tier_name, tier_scenes in tiers.items():
        if not tier_scenes:
            continue
        model = tier_override_model(tier_name if not tier_override else tier_override)
        cost_per_sec = COST_MAP.get(model, 0.40)
        tier_cost = sum(s.get("generation_duration_seconds", s.get("duration", 4)) * cost_per_sec for s in tier_scenes)
        total += tier_cost
        avg_dur = sum(s.get("generation_duration_seconds", s.get("duration", 4)) for s in tier_scenes) / len(tier_scenes)
        print(f"  {tier_name.upper():10s}: {len(tier_scenes):2d} clips × {avg_dur:.0f}s × ${cost_per_sec:.2f}/s = ${tier_cost:.2f}")
        for s in tier_scenes:
            lock = "🔒" if s.get("character_lock_applied") else "  "
            print(f"    {lock} {s['scene_id']}: {s['title']}")

    total_dur = sum(s.get("generation_duration_seconds", s.get("duration", 4)) for s in scenes)
    edit_dur = sum(s.get("edit_duration_seconds", s.get("generation_duration_seconds", 4)) for s in scenes)
    print(f"  {'─' * 48}")
    print(f"  {'TOTAL':10s}: {len(scenes):2d} clips, {total_dur}s raw video = ${total:.2f}")
    print(f"  {'DURATION':10s}: {total_dur}s raw → {edit_dur}s final preroll edit")
    print("=" * 60)
    return total


def main():
    parser = argparse.ArgumentParser(
        description="777Ladies SATC Opening Video Generator (Veo 3.1)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="Validate prompts and show cost estimate without generating")
    parser.add_argument("--scenes", type=str, default=None,
                        help="Comma-separated scene numbers to generate (e.g., 1,2,3)")
    parser.add_argument("--tier", type=str, default=None, choices=["hero", "standard", "economy"],
                        help="Override cost tier for all scenes")
    parser.add_argument("--assemble-only", action="store_true",
                        help="Skip generation, only assemble existing clips")
    parser.add_argument("--no-assemble", action="store_true",
                        help="Generate clips but don't assemble showreel")
    parser.add_argument("--crossfade", type=float, default=0.5,
                        help="Crossfade duration in seconds (default: 0.5)")
    args = parser.parse_args()

    # Print header
    print("\n" + "=" * 60)
    print("🎬 777LADIES SATC OPENING — Veo 3.1 Generator")
    print(f"   Project: {PROJECT_ID}")
    print(f"   Region:  {LOCATION}")
    print(f"   Time:    {datetime.now(timezone.utc).isoformat()}")
    print("=" * 60)

    # Load prompts
    data = load_prompts()
    all_scenes = data["scenes"]

    # Filter scenes if requested
    if args.scenes:
        scene_nums = [int(x.strip()) for x in args.scenes.split(",")]
        scenes = [s for s in all_scenes if int(s["scene_id"].split("_")[1]) in scene_nums]
        print(f"📋 Selected {len(scenes)} of {len(all_scenes)} scenes: {args.scenes}")
    else:
        scenes = all_scenes
        print(f"📋 All {len(scenes)} scenes selected")

    # Cost breakdown
    total_cost = print_cost_breakdown(scenes, args.tier)

    if args.dry_run:
        print("\n🔍 DRY RUN — no videos generated. Review cost estimate above.")
        print(f"   To generate: remove --dry-run flag")
        print(f"   To generate specific scenes: --scenes 6,7,12,20")
        print(f"   To use cheapest tier: --tier economy (${estimate_cost(scenes, 'economy'):.2f})")
        return

    # Create output directories
    CLIPS_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if not args.assemble_only:
        # Generate clips
        print(f"\n🚀 Starting video generation ({len(scenes)} clips)...\n")
        ledger = load_ledger()
        successful_clips = []
        failed_scenes = []

        for i, scene in enumerate(scenes, 1):
            scene_id = scene["scene_id"]
            print(f"\n[{i}/{len(scenes)}] ──────────────────────────────────────")

            # Check if already generated (resume support)
            clip_path = CLIPS_DIR / f"{scene_id.lower()}.mp4"
            if clip_path.exists() and scene_id in ledger.get("generated", {}):
                print(f"  ⏭️  {scene_id}: already in ledger, skipping")
                successful_clips.append(str(clip_path))
                continue

            result = generate_single_video(scene, args.tier)
            if result:
                successful_clips.append(result)
                ledger["generated"][scene_id] = {
                    "path": result,
                    "model": args.tier and tier_override_model(args.tier) or scene["model"],
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "cost_estimate": COST_MAP.get(scene["model"], 0.40) * scene.get("duration", 8),
                }
            else:
                failed_scenes.append(scene_id)
                ledger["failed"][scene_id] = {
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "attempts": MAX_RETRIES,
                }

            save_ledger(ledger)

            # Rate limit protection: wait between generations
            if i < len(scenes):
                wait = 5
                print(f"  ⏳ Cooling down {wait}s before next scene...")
                time.sleep(wait)

        # Summary
        print("\n" + "=" * 60)
        print(f"📊 GENERATION SUMMARY")
        print(f"   ✅ Success: {len(successful_clips)}/{len(scenes)}")
        if failed_scenes:
            print(f"   ❌ Failed:  {', '.join(failed_scenes)}")
        print("=" * 60)
    else:
        # Assemble-only mode: collect existing clips
        successful_clips = sorted(
            [str(p) for p in CLIPS_DIR.glob("scene_*.mp4")],
            key=lambda x: int(Path(x).stem.split("_")[1])
        )
        print(f"\n📂 Found {len(successful_clips)} existing clips in {CLIPS_DIR}")

    # Assemble showreel
    if not args.no_assemble and successful_clips:
        assemble_showreel(successful_clips, FINAL_OUTPUT, args.crossfade)
        generate_davinci_xml(successful_clips, DAVINCI_XML)

    print(f"\n🏁 Pipeline complete!")
    print(f"   Clips:    {CLIPS_DIR}")
    print(f"   Showreel: {FINAL_OUTPUT}")
    print(f"   Timeline: {DAVINCI_XML}")
    print(f"   Ledger:   {LEDGER_FILE}")


if __name__ == "__main__":
    main()
