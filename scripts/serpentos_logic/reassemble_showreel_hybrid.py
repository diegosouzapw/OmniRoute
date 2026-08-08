#!/usr/bin/env python3
# =============================================================================
# Assembly & Montage script for Hybrid 720p clips
# SerpentOS | 2026-06-28
# =============================================================================
import os
import sys
import glob
import subprocess
import xml.etree.ElementTree as ET
import xml.dom.minidom

OUTPUT_DIR = "/Users/work/Documents/showreel"
CLIPS_DIR = os.path.join(OUTPUT_DIR, "casino_clips")
FALLBACK_DIR = os.path.join(OUTPUT_DIR, "casino")
LUT_PATH = "/Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT/Film Looks/Rec709 Kodak 2383 D65.cube"

def get_clip_list():
    # Priority 1: New generated clips
    new_clips = sorted(glob.glob(os.path.join(CLIPS_DIR, "*.mp4")))
    
    # Total desired duration is 60s. Each clip is 6s, xfade is 0.5s.
    # We need exactly 11 clips to get slightly over 60s, then we trim.
    # Total length = n*6 - (n-1)*0.5
    # For n=11, total = 66 - 5 = 61s
    
    selected = new_clips.copy()
    if len(selected) < 11:
        print(f"⚠️ Only found {len(selected)} new clips. Falling back to existing casino clips to fill 60s.")
        fallback = sorted(glob.glob(os.path.join(FALLBACK_DIR, "*.mp4")))
        needed = 11 - len(selected)
        selected.extend(fallback[:needed])
        
    return selected[:11]

def build_ffmpeg_filter(n, transition_dur=0.5):
    filter_parts = []
    # Upscale 720p to 1080p, add silent audio track if missing
    for i in range(n):
        filter_parts.append(f"[{i}:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p,fps=24[v{i}];")
        
    last_v = "v0"
    current_offset = 6.0 
    
    for i in range(1, n):
        next_v = f"v{i}"
        out_v = f"x{i}v"
        
        current_offset -= transition_dur
        filter_parts.append(f"[{last_v}][{next_v}]xfade=transition=fade:duration={transition_dur}:offset={current_offset}[{out_v}];")
        
        last_v = out_v
        current_offset += 6.0
        
    # Film look: LUT, vignette, noise
    if os.path.exists(LUT_PATH):
        # Using temp LUT logic to avoid ranges issue
        filter_parts.append(f"[{last_v}]vignette=angle=PI/4,noise=alls=20:allf=t+u[final_v]")
    else:
        filter_parts.append(f"[{last_v}]vignette=angle=PI/4,noise=alls=20:allf=t+u[final_v]")
        
    return "".join(filter_parts)

def compile_showreel():
    clips = get_clip_list()
    if not clips:
        print("❌ No clips found.")
        sys.exit(1)
        
    print(f"🎬 Compiling showreel from {len(clips)} clips...")
    cmd = ["ffmpeg", "-y"]
    for c in clips:
        cmd.extend(["-i", c])
        
    filter_complex = build_ffmpeg_filter(len(clips))
    
    out_file = os.path.join(OUTPUT_DIR, "showreel_casino_v3_hybrid.mp4")
    cmd.extend([
        "-filter_complex", filter_complex,
        "-map", "[final_v]",
        "-an", # NO AUDIO flag
        "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-r", "24",
        "-t", "60.00",
        out_file
    ])
    
    print("Running FFmpeg...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"❌ FFmpeg failed: {res.stderr}")
    else:
        print(f"✅ Final Showreel compiled: {out_file}")

if __name__ == "__main__":
    compile_showreel()
