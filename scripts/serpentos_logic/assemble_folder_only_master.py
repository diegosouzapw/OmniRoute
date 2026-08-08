#!/usr/bin/env python3
"""
Assemble Final Master from Folder-Only Generation and Separate Cyrillic Titles
Overlays Alpha titles on ProRes 422HQ video clips and concatenates into final master.
Ensures Sequential-only processing (RAM Guard).
"""

import os
import subprocess
from pathlib import Path

VIDEO_DIR = Path("/Users/work/Movies/777LADIES_FOLDER_ONLY_GENERATION")
TITLE_DIR = Path("/Users/work/Movies/777LADIES_SEPARATE_CYRILLIC_TITLES")
EXPORT_DIR = Path("/Users/work/Movies/777LADIES_FINAL_ASSEMBLED_MASTER")
EXPORT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR = EXPORT_DIR / "temp_overlays"
TEMP_DIR.mkdir(parents=True, exist_ok=True)

SCENES = [
    {"id": "SCENE_01", "vid": "generation_Screenshot 2026-07-10 at 06.31.17.mov", "title": "TITLE_01_CYRILLIC_ALPHA.mov", "dur": 2.0},
    {"id": "SCENE_02", "vid": "generation_scene_02_start_frame.mov", "title": "TITLE_02_CYRILLIC_ALPHA.mov", "dur": 2.0},
    {"id": "SCENE_03", "vid": "generation_scene_03_start_frame.mov", "title": "TITLE_03_CYRILLIC_ALPHA.mov", "dur": 2.0},
    {"id": "SCENE_04", "vid": "generation_Screenshot 2026-07-10 at 06.32.14.mov", "title": "TITLE_04_CYRILLIC_ALPHA.mov", "dur": 1.5},
    {"id": "SCENE_05", "vid": "generation_scene_05_start_frame.mov", "title": "TITLE_05_CYRILLIC_ALPHA.mov", "dur": 2.5},
    {"id": "SCENE_06", "vid": "generation_Screenshot 2026-07-10 at 06.32.37.mov", "title": "TITLE_06_CYRILLIC_ALPHA.mov", "dur": 1.5},
    {"id": "SCENE_07", "vid": "generation_scene_07_start_frame.mov", "title": "TITLE_07_CYRILLIC_ALPHA.mov", "dur": 3.0},
    {"id": "SCENE_08", "vid": "generation_scene_08_start_frame.mov", "title": "TITLE_08_CYRILLIC_ALPHA.mov", "dur": 2.0},
    {"id": "SCENE_09", "vid": "generation_scene_09_start_frame.mov", "title": "TITLE_09_CYRILLIC_ALPHA.mov", "dur": 3.0},
]

def overlay_title_on_video(scene):
    print(f"🎬 Processing Overlay: {scene['id']}")
    bg_vid = VIDEO_DIR / scene["vid"]
    fg_title = TITLE_DIR / scene["title"]
    out_file = TEMP_DIR / f"{scene['id']}_composite.mov"
    
    if not bg_vid.exists() or not fg_title.exists():
        print(f"❌ Missing source files for {scene['id']}: {bg_vid} or {fg_title}")
        return None

    # We use filter_complex overlay with shortest to overlay the title.
    # Output is ProRes 422HQ to maintain quality.
    cmd = [
        "ffmpeg", "-y",
        "-i", str(bg_vid),
        "-i", str(fg_title),
        "-filter_complex", "[0:v][1:v]overlay=format=auto,fade=t=in:st=0:d=0.3,fade=t=out:st=4.7:d=0.3[outv]",
        "-map", "[outv]",
        "-t", str(scene["dur"]),
        "-c:v", "prores_ks",
        "-profile:v", "3",
        "-pix_fmt", "yuv422p10le",
        str(out_file)
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        print(f"  ✅ Overlay Success: {out_file.name}")
        return out_file
    else:
        print(f"  ❌ Error overlaying {scene['id']}: {res.stderr.decode()[:200]}")
        return None

def concat_scenes(files, output_file):
    print(f"\n🔗 Concatenating {len(files)} scenes into Master...")
    concat_list = TEMP_DIR / "concat_list.txt"
    with open(concat_list, "w") as f:
        for p in files:
            f.write(f"file '{p}'\n")
            
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_list),
        "-c:v", "copy",
        str(output_file)
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        size_mb = output_file.stat().st_size / (1024 * 1024)
        print(f"✅ Final Master Created: {output_file} ({size_mb:.2f} MB)")
    else:
        print(f"❌ Error concatenating: {res.stderr.decode()[:200]}")

def main():
    print("==============================================================================")
    print("🚀 ASSEMBLING FINAL MASTER (BACKGROUNDS + ALPHA TITLES)")
    print("==============================================================================")
    
    processed_files = []
    # Sequential processing (RAM Guard enforcement)
    for scene in SCENES:
        out_f = overlay_title_on_video(scene)
        if out_f:
            processed_files.append(out_f)
            
    if len(processed_files) == len(SCENES):
        master_file = EXPORT_DIR / "777LADIES_FINAL_ASSEMBLED_MASTER_FROM_FOLDER.mov"
        concat_scenes(processed_files, master_file)
    else:
        print("\n⚠️ Not all scenes were successfully processed. Skipping concatenation.")

if __name__ == "__main__":
    main()
