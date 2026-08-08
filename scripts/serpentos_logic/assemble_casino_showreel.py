#!/usr/bin/env python3
# =============================================================================
# Casino Showreel Assembler & Timeline Generator
# SerpentOS | 2026-06-28
# =============================================================================
import os
import sys
import subprocess
import xml.etree.ElementTree as ET
import xml.dom.minidom

# ── Paths ────────────────────────────────────────────────────────────────────
INPUT_DIR = "/Users/work/Documents/showreel/casino"
OUTPUT_DIR = "/Users/work/Documents/showreel"
LUT_PATH = "/Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT/Film Looks/Rec709 Kodak 2383 D65.cube"

CLIPS = [
    "01_casino_entrance.mp4",
    "02_roulette_spin.mp4",
    "03_poker_deal.mp4",
    "04_slot_machine.mp4",
    "05_craps_victory.mp4",
    "antigravity_shot_01_identity.mp4",
    "antigravity_shot_02_skills.mp4",
    "antigravity_shot_03_output.mp4",
    "antigravity_shot_04_cta.mp4"
]

def check_audio_stream(file_path):
    cmd = [
        "ffprobe", "-v", "error", 
        "-select_streams", "a", 
        "-show_entries", "stream=codec_name", 
        "-of", "default=noprint_wrappers=1:nokey=1", 
        file_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    return bool(res.stdout.strip())

def ensure_audio_stream(file_path):
    if check_audio_stream(file_path):
        return file_path
    
    # Generate silent audio track
    temp_path = file_path.replace(".mp4", "_with_audio.mp4")
    print(f"   🔊 Clip {os.path.basename(file_path)} has no audio. Injecting silent audio...")
    cmd = [
        "ffmpeg", "-y",
        "-i", file_path,
        "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
        "-c:v", "copy", "-c:a", "aac", "-shortest",
        temp_path
    ]
    subprocess.run(cmd, capture_output=True)
    return temp_path

def clean_lut(lut_abs_path, temp_lut):
    if not os.path.exists(lut_abs_path):
        return None
    try:
        with open(lut_abs_path, "r", encoding="utf-8", errors="ignore") as infile:
            lines = infile.readlines()
        
        cleaned_lines = [line for line in lines if "LUT_3D_INPUT_RANGE" not in line]
        
        with open(temp_lut, "w", encoding="utf-8") as outfile:
            outfile.writelines(cleaned_lines)
            
        print(f"✅ Prepared clean LUT: {temp_lut}")
        return temp_lut
    except Exception as e:
        print(f"⚠️ Failed to clean LUT: {e}")
        return None

def get_clip_duration(file_path):
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        file_path
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    try:
        return float(res.stdout.strip())
    except ValueError:
        return 6.0

def build_ffmpeg_filter(n, clip_durations, transition_dur=0.5):
    # n is number of clips
    # Scale and format inputs to 1920x1080, 24fps
    filter_parts = []
    for i in range(n):
        filter_parts.append(f"[{i}:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p,fps=24[v{i}];")
        filter_parts.append(f"[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo[a{i}];")
        
    # Crossfades
    last_v = "v0"
    last_a = "a0"
    current_offset = clip_durations[0]
    
    for i in range(1, n):
        next_v = f"v{i}"
        next_a = f"a{i}"
        out_v = f"x{i}v"
        out_a = f"x{i}a"
        
        current_offset -= transition_dur
        
        # Video crossfade
        filter_parts.append(f"[{last_v}][{next_v}]xfade=transition=fade:duration={transition_dur}:offset={current_offset}[{out_v}];")
        # Audio crossfade
        filter_parts.append(f"[{last_a}][{next_a}]acrossfade=d={transition_dur}:c1=tri:c2=tri[{out_a}];")
        
        last_v = out_v
        last_a = out_a
        current_offset += clip_durations[i]
        
    # Final styling filters on top of the crossfaded video stream
    # 1. Vignette
    # 2. Film Grain (noise)
    # 3. Kodak 2383 LUT
    # 4. Audio Loudness Normalization
    filter_parts.append(f"[{last_v}]vignette=angle=0.15,noise=alls=12:allf=t+u[styled_v];")
    
    return "".join(filter_parts), last_a

from serpent_genai import setup_logging
import argparse

logger = setup_logging(__name__)

def main():
    parser = argparse.ArgumentParser(description="Casino Showreel Assembler & Timeline Generator")
    parser.add_argument("--dry-run", action="store_true", help="Inspect configuration without assembling")
    args = parser.parse_args()

    logger.info("=== Casino Showreel Assembler ===")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # 1. Resolve and check input clips
    clip_paths = []
    for c in CLIPS:
        p = os.path.join(INPUT_DIR, c)
        if not os.path.exists(p):
            logger.warning(f"Clip not found at {p}")
            if not args.dry_run:
                logger.error("Cannot proceed without all clips.")
                return
        clip_paths.append(p)

    if args.dry_run:
        logger.info(f"Dry run complete. Found {len(clip_paths)} clips.")
        return

        
    # 2. Process audio
    processed_paths = []
    print("🔊 Verifying audio streams...")
    for path in clip_paths:
        processed_paths.append(ensure_audio_stream(path))
        
    # 3. Retrieve durations
    clip_durations = [get_clip_duration(p) for p in processed_paths]
    print(f"🎬 Loaded {len(processed_paths)} clips. Durations: {clip_durations}")
    
    # 4. Generate LUT
    temp_lut = os.path.join(OUTPUT_DIR, "temp_kodak_lut.cube")
    lut_ready = clean_lut(LUT_PATH, temp_lut)
    
    # 5. Build FFmpeg command
    cmd = ["ffmpeg", "-y"]
    for p in processed_paths:
        cmd.extend(["-i", p])
        
    filter_complex, last_a = build_ffmpeg_filter(len(processed_paths), clip_durations)
    
    # Apply LUT filter if ready
    if lut_ready:
        filter_complex += f"[styled_v]lut3d='{lut_ready}'[final_v];"
        v_stream = "final_v"
    else:
        v_stream = "styled_v"
        
    # Add audio normalization
    filter_complex += f"[{last_a}]loudnorm=I=-14:LRA=7:tp=-2[final_a]"
    
    output_mp4 = os.path.join(OUTPUT_DIR, "showreel_casino_ffmpeg.mp4")
    
    cmd.extend([
        "-filter_complex", filter_complex,
        "-map", f"[{v_stream}]",
        "-map", "[final_a]",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "24",
        "-c:a", "aac", "-b:a", "192k",
        "-t", "60.00",
        output_mp4
    ])
    
    print("🎬 Running video compilation via FFmpeg (this might take a moment)...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"❌ FFmpeg failed: {res.stderr}")
        sys.exit(1)
        
    print(f"✅ Final Showreel compiled: {output_mp4}")
    
    # 6. Generate FCP XML Timeline
    generate_xml(clip_paths, clip_durations)
    
    # 7. Generate Import Guide
    generate_import_guide()
    
    # Clean up temp files
    if lut_ready and os.path.exists(temp_lut):
        os.remove(temp_lut)
    for p in processed_paths:
        if "_with_audio.mp4" in p and os.path.exists(p):
            os.remove(p)
            
    print("🎉 Done! All assets successfully generated.")

def generate_xml(clip_paths, clip_durations):
    output_xml_path = os.path.join(OUTPUT_DIR, "showreel_casino_timeline.xml")
    print("📝 Generating FCP XML timeline...")
    
    timebase = 24
    
    xmeml = ET.Element("xmeml", version="5")
    sequence = ET.SubElement(xmeml, "sequence", id="sequence-casino")
    ET.SubElement(sequence, "name").text = "Casino_Showreel_Timeline"
    ET.SubElement(sequence, "duration").text = "1440" # 60 seconds * 24 fps
    
    s_rate = ET.SubElement(sequence, "rate")
    ET.SubElement(s_rate, "timebase").text = str(timebase)
    ET.SubElement(s_rate, "ntsc").text = "FALSE"
    
    media = ET.SubElement(sequence, "media")
    video = ET.SubElement(media, "video")
    v_track = ET.SubElement(video, "track")
    
    audio = ET.SubElement(media, "audio")
    a_track_1 = ET.SubElement(audio, "track")
    a_track_2 = ET.SubElement(audio, "track")
    
    current_start = 0
    transition_frames = 12 # 0.5s transition at 24fps
    
    for idx, (path, duration) in enumerate(zip(clip_paths, clip_durations)):
        name = os.path.basename(path)
        frames_dur = int(duration * timebase)
        
        # Calculate start/end frames taking transition overlaps into account
        if idx > 0:
            current_start -= transition_frames
            
        current_end = current_start + frames_dur
        
        # Video Track ClipItem
        clip_id_video = f"clip-{idx+1}-video"
        file_id = f"file-{idx+1}"
        
        clipitem = ET.SubElement(v_track, "clipitem", id=clip_id_video)
        ET.SubElement(clipitem, "name").text = name
        ET.SubElement(clipitem, "duration").text = str(frames_dur)
        
        c_rate = ET.SubElement(clipitem, "rate")
        ET.SubElement(c_rate, "timebase").text = str(timebase)
        ET.SubElement(c_rate, "ntsc").text = "FALSE"
        
        ET.SubElement(clipitem, "in").text = "0"
        ET.SubElement(clipitem, "out").text = str(frames_dur)
        ET.SubElement(clipitem, "start").text = str(current_start)
        ET.SubElement(clipitem, "end").text = str(current_end)
        
        # File subelement
        file_el = ET.SubElement(clipitem, "file", id=file_id)
        ET.SubElement(file_el, "name").text = name
        ET.SubElement(file_el, "pathurl").text = f"file://localhost{path}"
        f_rate = ET.SubElement(file_el, "rate")
        ET.SubElement(f_rate, "timebase").text = str(timebase)
        
        # Audio Track ClipItems
        for a_track, track_idx in [(a_track_1, 1), (a_track_2, 2)]:
            clip_id_audio = f"clip-{idx+1}-audio-{track_idx}"
            
            clipitem_a = ET.SubElement(a_track, "clipitem", id=clip_id_audio)
            ET.SubElement(clipitem_a, "name").text = name
            ET.SubElement(clipitem_a, "duration").text = str(frames_dur)
            
            ca_rate = ET.SubElement(clipitem_a, "rate")
            ET.SubElement(ca_rate, "timebase").text = str(timebase)
            ET.SubElement(ca_rate, "ntsc").text = "FALSE"
            
            ET.SubElement(clipitem_a, "in").text = "0"
            ET.SubElement(clipitem_a, "out").text = str(frames_dur)
            ET.SubElement(clipitem_a, "start").text = str(current_start)
            ET.SubElement(clipitem_a, "end").text = str(current_end)
            
            ET.SubElement(clipitem_a, "file", id=file_id)
            
            sourcetrack = ET.SubElement(clipitem_a, "sourcetrack")
            ET.SubElement(sourcetrack, "tracktype").text = "audio"
            ET.SubElement(sourcetrack, "trackindex").text = str(track_idx)
            
        current_start = current_end
        
    xml_str = ET.tostring(xmeml, encoding="utf-8")
    dom = xml.dom.minidom.parseString(xml_str)
    pretty_xml = dom.toprettyxml(indent="  ")
    
    if pretty_xml.startswith('<?xml version="1.0" ?>'):
        pretty_xml = pretty_xml.replace('<?xml version="1.0" ?>', '<?xml version="1.0" encoding="UTF-8"?>', 1)
        
    with open(output_xml_path, "w", encoding="utf-8") as f:
        f.write(pretty_xml)
    print(f"✅ Generated timeline XML: {output_xml_path}")

def generate_import_guide():
    guide_path = os.path.join(OUTPUT_DIR, "davinci_import_guide.md")
    content = """# DaVinci Resolve Timeline Import Guide (Casino Showreel)

Follow these steps to import the generated XML timeline into DaVinci Resolve Studio 21:

1. Launch **DaVinci Resolve Studio**.
2. Create a new project or open an existing one.
3. Select **File -> Import -> Timeline...** (or press `Cmd + Shift + I`).
4. Select the generated file [showreel_casino_timeline.xml](file:///Users/work/Documents/showreel/showreel_casino_timeline.xml).
5. In the import settings dialog:
   - Ensure the frame rate matches **24 fps**.
   - Make sure **"Automatically import source clips into media pool"** is checked.
6. The timeline will be loaded, matching your local graded clips perfectly!
"""
    with open(guide_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Generated import guide: {guide_path}")

if __name__ == "__main__":
    main()
