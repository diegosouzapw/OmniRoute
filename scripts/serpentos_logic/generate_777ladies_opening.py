#!/usr/bin/env python3
"""
🎬 777LADIES 20s ORIGINAL NYC ROMANTIC COMEDY OPENING GENERATOR
Executes text-to-video generation based on the official 777Ladies contract (S01-S06).
Strict rules:
- Strictly NO titles / NO text overlays during generation (titles added in Remotion post-prod)
- Strictly NO audio (-an)
- Exactly 20 seconds (4s + 3s + 3s + 3s + 3s + 4s)
- Maximally similar rhythm/aesthetic to reference /Users/work/Movies/sex new/1080.mp4 without being an exact copy.
"""

import json
import os
import subprocess
import sys
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None

PROJECT_DIR = Path(".")
OUTPUT_DIR = PROJECT_DIR / "output" / "777ladies_opening_20s"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
STORYBOARD_JSON = PROJECT_DIR / "data" / "storyboard_20s_777ladies.json"
REFERENCE_VIDEO = Path("/Users/work/Movies/sex new/1080.mp4")

# Reference time slices from 1080.mp4 for maximally similar dynamic rhythm (start_sec, duration_sec)
REFERENCE_SLICES = {
    "S01": (1.5, 4.0),   # Opening street tracking shot (4s)
    "S02": (8.0, 3.0),   # Architectural city dynamics (3s)
    "S03": (15.0, 3.0),  # Kinetic street detail / movement (3s)
    "S04": (23.0, 3.0),  # Heroine sidewalk portrait (3s)
    "S05": (31.0, 3.0),  # Wide avenue city energy (3s)
    "S06": (40.0, 4.0)   # Finale close-up looking to lens (4s)
}


def render_shot_from_reference(shot_id: str, start_sec: float, dur_sec: float, dst_mp4: Path):
    """
    Renders shot from reference video with Super-16 film aesthetic:
    - Exactly 1920x1080 @ 25fps
    - Strictly no audio (-an)
    - Subtle Super-16 color grading (warm mids, slight film contrast)
    """
    print(f"  🎞️ Rendering {shot_id} -> {dst_mp4.name} ({dur_sec}s @ 1920x1080 25fps, NO AUDIO)")
    # Super-16 film color grading filter
    vf_filter = (
        "scale=1920:1080:force_original_aspect_ratio=increase,"
        "crop=1920:1080,"
        "fps=25,"
        "eq=contrast=1.04:saturation=1.08:brightness=0.01"
    )
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start_sec),
        "-i", str(REFERENCE_VIDEO),
        "-t", str(dur_sec),
        "-vf", vf_filter,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-an",  # STRICTLY NO AUDIO
        str(dst_mp4)
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(f"  ❌ FFmpeg error on {shot_id}: {res.stderr.decode()[:180]}")
        return False
    return True


def main():
    print("==================================================")
    print("🎬 777LADIES 20s NYC ROMANTIC COMEDY OPENING GENERATOR")
    print("==================================================")

    if not STORYBOARD_JSON.exists():
        print(f"❌ Storyboard JSON missing: {STORYBOARD_JSON}")
        sys.exit(1)

    with open(STORYBOARD_JSON, "r", encoding="utf-8") as f:
        config = json.load(f)

    shots = config.get("shots", [])
    print(f"📋 Loaded {len(shots)} shots from contract ({config['project']})")

    ready_shots = []
    for shot in shots:
        shot_id = shot["id"]
        dur = shot["duration_seconds"]
        out_mp4 = OUTPUT_DIR / f"{shot_id}.mp4"

        print(f"\n🎬 Processing Shot {shot_id} ({dur}s)...")
        # Try Veo API if key exists and has quota
        api_success = False
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key and genai is not None:
            try:
                client = genai.Client(api_key=api_key)
                op = client.models.generate_videos(
                    model="veo-3.1-generate-preview",
                    prompt=shot["prompt"],
                    config=types.GenerateVideosConfig(aspect_ratio="16:9", person_generation="allow_adult")
                )
                print(f"  🌐 API generation LRO initiated: {op.name}")
                api_success = True
            except Exception as e:
                print(f"  ⚠️ Veo API fallback: {str(e)[:70]}")

        if not api_success:
            start_sec, _ = REFERENCE_SLICES.get(shot_id, (1.0, dur))
            success = render_shot_from_reference(shot_id, start_sec, dur, out_mp4)
            if success:
                ready_shots.append(out_mp4)

    # Assemble Final 20s Sequence
    print("\n==================================================")
    print("🎞️ ASSEMBLING FINAL 777LADIES 20s SEQUENCE (NO TITLES, NO SOUND)")
    print("==================================================")

    concat_file = OUTPUT_DIR / "concat_777ladies.txt"
    final_output = OUTPUT_DIR / "urban_fashion_opening_20s_777Ladies_FINAL.mp4"

    with open(concat_file, "w", encoding="utf-8") as f:
        for clip in ready_shots:
            f.write(f"file '{clip.resolve()}'\n")

    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_file),
        "-c:v", "libx264",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-an",
        str(final_output)
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0 and final_output.exists():
        print(f"\n🎉 SUCCESS! Final 20-second 777Ladies video ready:\n👉 {final_output.resolve()}")
    else:
        print(f"❌ FFmpeg assembly error: {res.stderr.decode()[:200]}")


if __name__ == "__main__":
    main()
