#!/usr/bin/env python3
# scripts/generate_storyboard_i2v.py — Image-to-Video, ANTI-STATIC fix v2.1
# SerpentOS | [MOTION] from frame 1 | No freeze | zoompan corrected

import os
import sys
import subprocess
from pathlib import Path

STORYBOARD_DIR = Path("/Users/work/Movies/sex new/storybord")
CLIPS_DIR = STORYBOARD_DIR / "generated_clips"
CLIPS_DIR.mkdir(parents=True, exist_ok=True)

FRAMES = [
    {
        "id": "scene_08",
        "file": STORYBOARD_DIR / "scene_08_start_frame.jpg",
        "motion": "Cinematic forward dolly push-in",
        # ✅ FIX: используем 'on' (output frame number) вместо n
        "filter": (
            "scale=3840:2160:force_original_aspect_ratio=increase,"
            "crop=3840:2160,"
            "zoompan="
            "z='min(1.0+0.00125*on,1.15)':"
            "d=120:"
            "x='iw/2-(iw/zoom/2)':"
            "y='ih/2-(ih/zoom/2)':"
            "s=1920x1080:"
            "fps=24"
        ),
        "duration": 5.0,
    },
    {
        "id": "scene_05",
        "file": STORYBOARD_DIR / "scene_05_start_frame.jpg",
        "motion": "Right-to-left tracking pan",
        # ✅ FIX: 'on' вместо n
        "filter": (
            "scale=3840:2160:force_original_aspect_ratio=increase,"
            "crop=3840:2160,"
            "zoompan="
            "z='1.08':"
            "d=120:"
            "x='(iw-iw/zoom)*(1-on/119)':"
            "y='ih/2-(ih/zoom/2)':"
            "s=1920x1080:"
            "fps=24"
        ),
        "duration": 5.0,
    },
    {
        "id": "scene_07",
        "file": STORYBOARD_DIR / "scene_07_start_frame.jpg",
        "motion": "Dramatic slow pull-out reveal",
        # ✅ FIX: 'on' вместо n
        "filter": (
            "scale=3840:2160:force_original_aspect_ratio=increase,"
            "crop=3840:2160,"
            "zoompan="
            "z='max(1.0,1.15-0.00125*on)':"
            "d=120:"
            "x='iw/2-(iw/zoom/2)':"
            "y='ih/2-(ih/zoom/2)':"
            "s=1920x1080:"
            "fps=24"
        ),
        "duration": 5.0,
    },
]


def generate_clip(frame_spec):
    in_path = frame_spec["file"]
    out_path = CLIPS_DIR / f"{frame_spec['id']}_clip.mp4"

    if not in_path.exists():
        print(f"❌ Input frame not found: {in_path}")
        return None

    print(f"🎬 [{frame_spec['id']}] {frame_spec['motion']}")

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-framerate", "24",
        "-i", str(in_path),
        "-vf", frame_spec["filter"],
        "-t", str(frame_spec["duration"]),
        "-fps_mode", "cfr",
        "-r", "24",
        "-c:v", "libx264",
        "-profile:v", "high",
        "-pix_fmt", "yuv420p",
        "-crf", "16",
        "-movflags", "+faststart",
        str(out_path),
    ]

    res = subprocess.run(cmd, capture_output=True)
    if res.returncode == 0:
        mb = out_path.stat().st_size / 1024 / 1024
        print(f"   ✅ {out_path.name} ({mb:.2f} MB)")
        return out_path
    else:
        print(f"   ⚠️  fps_mode failed, retrying with -vsync cfr...")
        cmd_fallback = list(cmd)
        if "-fps_mode" in cmd_fallback:
            idx = cmd_fallback.index("-fps_mode")
            cmd_fallback[idx] = "-vsync"
        res2 = subprocess.run(cmd_fallback, capture_output=True)
        if res2.returncode == 0:
            mb = out_path.stat().st_size / 1024 / 1024
            print(f"   ✅ fallback OK: {out_path.name} ({mb:.2f} MB)")
            return out_path
        print(f"   ❌ FFMPEG Error: {res2.stderr.decode()[:400]}")
        return None


def main():
    print("=" * 60)
    print("🎬 STORYBOARD I2V — ANTI-STATIC v2.1 (freeze fix)")
    print("=" * 60)

    v = subprocess.run(["ffmpeg", "-version"], capture_output=True)
    ver_line = v.stdout.decode().split("\n")[0]
    print(f"📦 {ver_line}")

    clips = [generate_clip(s) for s in FRAMES]
    clips = [c for c in clips if c]

    if len(clips) != len(FRAMES):
        print(f"❌ Only {len(clips)}/{len(FRAMES)} clips generated")
        sys.exit(1)

    concat_txt = CLIPS_DIR / "concat_list.txt"
    concat_txt.write_text(
        "\n".join(f"file '{c.resolve()}'" for c in clips) + "\n"
    )

    master = STORYBOARD_DIR / "storyboard_sequence_08_05_07_v2.mp4"
    print(f"\n🎞️  Assembling master → {master.name}")

    res = subprocess.run([
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0",
        "-i", str(concat_txt),
        "-c", "copy",
        str(master)
    ], capture_output=True)

    if res.returncode == 0:
        mb = master.stat().st_size / 1024 / 1024
        print(f"✅ Master rendered: {master} ({mb:.2f} MB)")
    else:
        print(f"❌ Concat error: {res.stderr.decode()[:300]}")


if __name__ == "__main__":
    main()
