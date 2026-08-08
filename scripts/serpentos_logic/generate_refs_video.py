#!/usr/bin/env python3
# =============================================================================
# Autonomous Video Generator & Montage Agent (Vertex AI Veo + FFmpeg)
# SerpentOS | 2026-06-28
# =============================================================================
import os
import sys
import json
import asyncio
import subprocess
import xml.etree.ElementTree as ET
import xml.dom.minidom
from PIL import Image
from google import genai
from google.genai import types

# ── Config ───────────────────────────────────────────────────────────────────
PROJECT_ID = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "europe-west3"
MODEL_VEO = "publishers/google/models/veo-2.0-generate-001"

os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
os.environ["GOOGLE_CLOUD_LOCATION"] = LOCATION
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"

PROMPTS_FILE = "/Users/work/Documents/showreel/casino_refs_prompts.json"
OUTPUT_DIR = "/Users/work/Documents/showreel"
CLIPS_DIR = os.path.join(OUTPUT_DIR, "generated_clips")
LUT_PATH = "/Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT/Film Looks/Rec709 Kodak 2383 D65.cube"

# Top 10 clips selected for a cohesive 60s showreel (6s per clip)
SELECTED_CLIPS = [
    "clip_01_01_card_shuffle",
    "clip_02_01_casino_intoxicated",
    "clip_03_01_casino_chip_insert",
    "clip_04_01_casino_craps",
    "clip_05_01_slot_machine_jackpot",
    "clip_06_01_las_vegas_showgirl_night",
    "clip_07_01_casino_poker",
    "clip_09_01_bar_scene_red_dress",
    "clip_13_01_casino_entrance",
    "clip_19_01_whiskey_pour"
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

async def generate_clip(client, clip, idx, total_count):
    clip_id = clip["clip_id"]
    local_path = os.path.join(CLIPS_DIR, f"{clip_id}.mp4")
    
    if os.path.exists(local_path):
        print(f"   [Clip {idx}/{total_count}] {clip_id} already exists. Skipping.")
        return local_path
        
    prompt_text = clip["veo_prompt"]
    neg_prompt = clip.get("negative", "low quality, blurry, distorted, logos")
    duration = 6
    
    print(f"🎬 [Clip {idx}/{total_count}] Requesting Veo generation for {clip_id}...")
    
    max_retries = 3
    backoff = 4.0
    
    for attempt in range(max_retries):
        try:
            op = client.models.generate_videos(
                model=MODEL_VEO,
                prompt=prompt_text,
                config=types.GenerateVideosConfig(
                    aspect_ratio="16:9",
                    duration_seconds=duration,
                    resolution="720p", # Fast & cost-efficient resolution
                    negative_prompt=neg_prompt,
                    generate_audio=False
                )
            )
            
            print(f"   Operation: {op.name}. Polling...")
            while not op.done:
                await asyncio.sleep(10)
                op = client.operations.get(op)
                
            if op.error:
                raise RuntimeError(f"Operation error: {op.error}")
                
            result = op.result
            if result and result.generated_videos:
                video_obj = result.generated_videos[0].video
                
                # Write to disk
                if video_obj.video_bytes:
                    with open(local_path, "wb") as f:
                        f.write(video_obj.video_bytes)
                elif video_obj.uri:
                    if video_obj.uri.startswith("gs://"):
                        subprocess.run(["gcloud", "storage", "cp", video_obj.uri, local_path], check=True)
                    else:
                        import urllib.request
                        urllib.request.urlretrieve(video_obj.uri, local_path)
                print(f"✅ Saved generated video for {clip_id} to {local_path}")
                return local_path
            else:
                raise RuntimeError("No generated video found in response.")
                
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e).upper():
                print(f"⚠️ [429 Rate Limit] Attempt {attempt+1}/{max_retries}. Backoff {backoff}s...")
                await asyncio.sleep(backoff)
                backoff *= 2
            else:
                print(f"❌ Error generating {clip_id}: {e}")
                return None
                
    print(f"❌ Failed to generate {clip_id} after {max_retries} attempts.")
    return None

def build_ffmpeg_filter(n, transition_dur=0.5):
    # Scale and format inputs to 1920x1080, 24fps
    filter_parts = []
    for i in range(n):
        filter_parts.append(f"[{i}:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p,fps=24[v{i}];")
        filter_parts.append(f"[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo[a{i}];")
        
    last_v = "v0"
    last_a = "a0"
    current_offset = 6.0 # All clips are exactly 6 seconds
    
    for i in range(1, n):
        next_v = f"v{i}"
        next_a = f"a{i}"
        out_v = f"x{i}v"
        out_a = f"x{i}a"
        
        current_offset -= transition_dur
        
        filter_parts.append(f"[{last_v}][{next_v}]xfade=transition=fade:duration={transition_dur}:offset={current_offset}[{out_v}];")
        filter_parts.append(f"[{last_a}][{next_a}]acrossfade=d={transition_dur}:c1=tri:c2=tri[{out_a}];")
        
        last_v = out_v
        last_a = out_a
        current_offset += 6.0
        
    # Styled filters
    filter_parts.append(f"[{last_v}]vignette=angle=0.15,noise=alls=12:allf=t+u[styled_v];")
    return "".join(filter_parts), last_a

def compile_final_video(processed_paths):
    print("🎬 Compiling showreel via FFmpeg...")
    
    temp_lut = os.path.join(OUTPUT_DIR, "temp_kodak_lut_refs.cube")
    lut_ready = clean_lut(LUT_PATH, temp_lut)
    
    cmd = ["ffmpeg", "-y"]
    for p in processed_paths:
        cmd.extend(["-i", p])
        
    filter_complex, last_a = build_ffmpeg_filter(len(processed_paths))
    
    if lut_ready:
        filter_complex += f"[styled_v]lut3d='{lut_ready}'[final_v];"
        v_stream = "final_v"
    else:
        v_stream = "styled_v"
        
    filter_complex += f"[{last_a}]loudnorm=I=-14:LRA=7:tp=-2[final_a]"
    
    output_mp4 = os.path.join(OUTPUT_DIR, "showreel_refs_final.mp4")
    
    cmd.extend([
        "-filter_complex", filter_complex,
        "-map", f"[{v_stream}]",
        "-map", "[final_a]",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "24",
        "-c:a", "aac", "-b:a", "192k",
        "-t", "60.00",
        output_mp4
    ])
    
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"❌ FFmpeg failed: {res.stderr}")
        return None
        
    if lut_ready and os.path.exists(temp_lut):
        os.remove(temp_lut)
        
    print(f"✅ Final Showreel compiled: {output_mp4}")
    return output_mp4

def generate_xml(clip_paths):
    output_xml_path = os.path.join(OUTPUT_DIR, "showreel_refs_timeline.xml")
    print("📝 Generating FCP XML timeline...")
    timebase = 24
    
    xmeml = ET.Element("xmeml", version="5")
    sequence = ET.SubElement(xmeml, "sequence", id="sequence-refs")
    ET.SubElement(sequence, "name").text = "Refs_Showreel_Timeline"
    ET.SubElement(sequence, "duration").text = str(len(clip_paths) * 144 - (len(clip_paths)-1)*12)
    
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
    transition_frames = 12 # 0.5s transition
    
    for idx, path in enumerate(clip_paths):
        name = os.path.basename(path)
        frames_dur = 144 # 6s * 24fps
        
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

async def main():
    print("=== Video Generation & Montage Agent ===")
    os.makedirs(CLIPS_DIR, exist_ok=True)
    
    # 1. Load prompts
    if not os.path.exists(PROMPTS_FILE):
        print(f"❌ Prompts file not found: {PROMPTS_FILE}")
        sys.exit(1)
        
    with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    all_clips = {c["clip_id"].replace("clip_", ""): c for c in data.get("clips", [])}
    
    # Select target prompts
    target_clips = []
    for sel in SELECTED_CLIPS:
        key = sel.replace("clip_", "")
        if key in all_clips:
            target_clips.append(all_clips[key])
        else:
            # Fallback exact match
            matched = False
            for k, val in all_clips.items():
                if sel in k or k in sel:
                    target_clips.append(val)
                    matched = True
                    break
            if not matched:
                print(f"⚠️ Selected clip not found in library: {sel}")
                
    if not target_clips:
        print("❌ No matching clips found for generation.")
        sys.exit(1)
        
    print(f"Selected {len(target_clips)} clips for the 1-minute showreel.")
    
    # Initialize genai client
    try:
        client = genai.Client(
            vertexai=True, 
            project=PROJECT_ID, 
            location=LOCATION
        )
    except Exception as e:
        print(f"❌ Failed to initialize genai Client: {e}")
        sys.exit(1)
        
    # 2. Run video generation (Batch of 2 at a time to stay within preview rate limits)
    batch_size = 2
    generated_paths = []
    
    for i in range(0, len(target_clips), batch_size):
        batch = target_clips[i:i+batch_size]
        print(f"\n📦 Processing Generation Batch {(i//batch_size)+1}...")
        
        tasks = [
            generate_clip(client, clip, i + idx + 1, len(target_clips))
            for idx, clip in enumerate(batch)
        ]
        
        batch_results = await asyncio.gather(*tasks)
        for r in batch_results:
            if r:
                generated_paths.append(r)
                
        if i + batch_size < len(target_clips):
            print("⏳ 10-second cooldown between generation batches...")
            await asyncio.sleep(10)
            
    print(f"\n🎥 Generated {len(generated_paths)} / {len(target_clips)} clips successfully.")
    
    # 3. Add audio streams (silent) to raw clips
    processed_paths = []
    print("\n🔊 Preparing audio streams...")
    for p in generated_paths:
        processed_paths.append(ensure_audio_stream(p))
        
    # 4. Compile final video
    if len(processed_paths) > 0:
        compile_final_video(processed_paths)
        generate_xml(generated_paths)
        
        # Clean up temp audio clips
        for p in processed_paths:
            if "_with_audio.mp4" in p and os.path.exists(p):
                os.remove(p)
    else:
        print("❌ No clips were compiled because generation failed.")

if __name__ == "__main__":
    asyncio.run(main())
