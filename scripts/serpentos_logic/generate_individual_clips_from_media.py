#!/usr/bin/env python3
"""
Individual Image-to-Video Clip Generator
Uses ONLY media files from /Users/work/Documents/casino files/new.
Generates each video file separately without montage.
Applies a cinematic slow-zoom (Ken Burns) to simulate AI generative motion.
"""

import os
import subprocess
from pathlib import Path

INPUT_DIR = Path("/Users/work/Documents/casino files/new")
EXPORT_DIR = Path("/Users/work/Movies/777LADIES_INDIVIDUAL_CLIPS_ONLY")
EXPORT_DIR.mkdir(parents=True, exist_ok=True)

def generate_clip(image_path):
    print(f"🎬 Processing: {image_path.name}")
    out_name = f"generated_clip_{image_path.stem}.mp4"
    out_path = EXPORT_DIR / out_name
    
    # 4 seconds duration, cinematic slow zoom in, 24000/1001 FPS, 10-bit ProRes-like x264
    duration = "4.0"
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", str(image_path),
        "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.001,1.5)':d=96:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080",
        "-t", duration,
        "-vsync", "cfr",
        "-r", "24000/1001",
        "-c:v", "libx264",
        "-profile:v", "high10",
        "-pix_fmt", "yuv420p10le",
        "-crf", "16",
        str(out_path)
    ]
    
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode == 0:
        size_mb = out_path.stat().st_size / (1024 * 1024)
        print(f"  ✅ Generated: {out_name} ({size_mb:.2f} MB)")
    else:
        print(f"  ❌ Error generating {out_name}: {res.stderr.decode()[:200]}")

def main():
    print("==============================================================================")
    print("🚀 GENERATING INDIVIDUAL VIDEO CLIPS FROM MEDIA FILES")
    print("==============================================================================")
    
    media_files = []
    valid_exts = {".jpg", ".jpeg", ".png"}
    for f in INPUT_DIR.iterdir():
        if f.is_file() and f.suffix.lower() in valid_exts:
            media_files.append(f)
            
    media_files.sort()
    
    if not media_files:
        print("❌ No media files (.jpg, .png) found in the input directory.")
        return

    for img in media_files:
        generate_clip(img)
        
    print(f"\n🌟 All individual clips generated in: {EXPORT_DIR}")

if __name__ == "__main__":
    main()
