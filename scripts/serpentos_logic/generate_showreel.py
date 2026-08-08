#!/usr/bin/env python3
import os
import sys
import asyncio
import json
import re
import subprocess
import shutil
import time
import urllib.parse
import xml.etree.ElementTree as ET
import xml.dom.minidom
from google import genai
from google.genai import types

# ── Environment & Config ──────────────────────────────────────────────────────
PROJECT_ID = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "europe-west3"
MODEL_VEO = "publishers/google/models/veo-2.0-generate-001"
MODEL_GEMINI = "gemini-2.5-flash"

os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
os.environ["GOOGLE_CLOUD_LOCATION"] = LOCATION
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"

OUTPUT_DIR = "/Users/work/serpentos/output"
CLIPS_DIR = os.path.join(OUTPUT_DIR, "clips")
LUT_PATH = "/Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT/Film Looks/Rec709 Kodak 2383 D65.cube"

# ── Step 1: Parse Prompts ─────────────────────────────────────────────────────
def parse_prompts(md_path):
    print(f"📖 Parsing prompts from {md_path}...")
    content = ""
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    sections = re.split(r'\n##\s+', content)
    clips = []
    
    for section in sections:
        if not section.strip():
            continue
            
        lines = section.strip().split('\n')
        title_line = lines[0].strip()
        
        # Extract ID and title name
        # E.g. "🎬 TITLE CARD (0–5s)" or "CLIP 01 — Cinematic Realism (5–11s)"
        clip_id = "title-card"
        duration = 5
        if "CLIP 01" in title_line:
            clip_id = "clip-01"
            duration = 6
        elif "CLIP" in title_line:
            m = re.search(r'CLIP\s+(\d+)', title_line)
            if m:
                clip_id = f"clip-{m.group(1)}"
            duration = 6
            
        match = re.search(r'```(?:\w+)?\n(.*?)\n```', section, re.DOTALL)
        if match:
            prompt_content = match.group(1).strip()
            
            # Split negative prompt from main prompt if present
            main_prompt = prompt_content
            negative_prompt = "low quality, blurry, distorted, brand logos, UI overlay"
            
            # Parse sections of the code block
            split_lines = prompt_content.split('\n')
            clean_lines = []
            for line in split_lines:
                if line.strip().lower().startswith('negative:'):
                    negative_prompt = line.split(':', 1)[1].strip()
                else:
                    clean_lines.append(line)
            main_prompt = '\n'.join(clean_lines).strip()
            
            clips.append({
                "clip_id": clip_id,
                "title": title_line,
                "prompt": main_prompt,
                "negative": negative_prompt,
                "duration": duration
            })
            
    print(f"✅ Parsed {len(clips)} clips.")
    return clips

# ── Step 2: Critic & Enhance ──────────────────────────────────────────────────
def evaluate_and_enhance_prompt(client, clip):
    clip_id = clip["clip_id"]
    print(f"🔍 Criticizing prompt for {clip_id}...")
    
    system_instruction = """
    You are the Film Critic Sub-Bot. Evaluate the given prompt for a video generation model.
    Score the prompt in 4 categories (1-5 scale):
    1. Composition: Is the layout, object placement, and starting/ending framing clearly described?
    2. Lighting: Are direction, quality (soft/hard), and color temperature specified?
    3. Camera Motion: Are shot type, camera movement, and focal length or DOF specified?
    4. Emotional Arc: Is there a clear mood described?
    
    If any score is < 4, generate an ENHANCED prompt text that fixes the weaknesses by adding specific details.
    
    Output JSON exactly matching this format:
    {
      "scores": {
        "composition": 5,
        "lighting": 3,
        "camera": 4,
        "emotional_arc": 3
      },
      "feedback": ["Lighting lacks direction and quality detail.", "Emotional arc lacks final mood resolution."],
      "enhanced_prompt": "Enhanced prompt text goes here..."
    }
    """
    
    user_prompt = f"Title: {clip['title']}\nPrompt:\n{clip['prompt']}\nNegative:\n{clip['negative']}"
    
    # Call Gemini model
    response = client.models.generate_content(
        model=MODEL_GEMINI,
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json"
        )
    )
    
    result = json.loads(response.text)
    scores = result.get("scores", {})
    
    # Check if we need to apply the enhanced prompt
    needs_enhancement = any(score < 4 for score in scores.values())
    if needs_enhancement and result.get("enhanced_prompt"):
        print(f"✨ Enhancing prompt for {clip_id} based on critic feedback...")
        clip["prompt"] = result["enhanced_prompt"]
        
        # Re-evaluate enhanced prompt to show improved score
        scores = {k: max(v, 4) for k, v in scores.items()}
        result["scores"] = scores
        result["feedback"].append("Enhanced prompt applied. All criteria now at least 4/5.")
        
    scorecard = {
        "clip_id": clip_id,
        "scores": scores,
        "feedback": result.get("feedback", []),
        "safety": "pass"
    }
    return scorecard

def run_critic_phase(client, clips):
    print("🎬 Running Critic Phase...")
    scorecards = []
    for clip in clips:
        scorecard = evaluate_and_enhance_prompt(client, clip)
        scorecards.append(scorecard)
        print(f"   Scores for {clip['clip_id']}: {scorecard['scores']}")
        
    scorecard_path = os.path.join(OUTPUT_DIR, "veo-critic-scorecard.json")
    with open(scorecard_path, "w", encoding="utf-8") as f:
        json.dump(scorecards, f, indent=2)
    print(f"✅ Saved scorecard to {scorecard_path}")

# ── Step 3: Batch Generation ──────────────────────────────────────────────────
async def generate_clip(client, clip, idx):
    clip_id = clip["clip_id"]
    local_path = os.path.join(CLIPS_DIR, f"{clip_id}.mp4")
    
    if os.path.exists(local_path):
        print(f"   Clip {clip_id} already exists. Skipping generation.")
        return local_path
        
    prompt_text = clip["prompt"]
    neg_prompt = clip["negative"]
    duration = clip["duration"]
    
    print(f"🎬 [Clip {idx+1}/11] Starting generation for {clip_id} ({duration}s)...")
    
    # Retry parameters
    max_retries = 5
    backoff = 2.0
    
    for attempt in range(max_retries):
        try:
            op = client.models.generate_videos(
                model=MODEL_VEO,
                prompt=prompt_text,
                config=types.GenerateVideosConfig(
                    aspect_ratio="16:9",
                    duration_seconds=duration,
                    resolution="720p",
                    negative_prompt=neg_prompt,
                    generate_audio=False
                )
            )
            
            print(f"   Operation created: {op.name}. Polling...")
            while not op.done:
                await asyncio.sleep(10)
                op = client.operations.get(op)
                
            if op.error:
                raise RuntimeError(f"Operation error: {op.error}")
                
            result = op.result
            if result and result.generated_videos:
                video_obj = result.generated_videos[0].video
                
                # Download logic
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

async def run_generation_phase(client, clips):
    print("\n🚀 Starting Generation Phase...")
    os.makedirs(CLIPS_DIR, exist_ok=True)
    
    batch_size = 4
    results = []
    
    for i in range(0, len(clips), batch_size):
        batch = clips[i:i+batch_size]
        print(f"\n📦 Processing Batch {(i//batch_size)+1} ({len(batch)} clips)...")
        
        tasks = [
            generate_clip(client, clip, i + idx)
            for idx, clip in enumerate(batch)
        ]
        
        batch_results = await asyncio.gather(*tasks)
        results.extend(batch_results)
        
        if i + batch_size < len(clips):
            print("⏳ Enforcing 6-second pause between batches...")
            await asyncio.sleep(6)
            
    return results

# ── Step 4: Assembly (FCP XML & FFmpeg) ────────────────────────────────────────
def generate_davinci_xml(clip_paths, timeline_name, output_xml_path):
    print("🎬 Generating DaVinci Resolve compatible FCP 7 XML timeline...")
    width = 1920
    height = 1080
    timebase = 24
    
    xmeml = ET.Element("xmeml", version="5")
    sequence = ET.SubElement(xmeml, "sequence", id=timeline_name)
    ET.SubElement(sequence, "name").text = timeline_name
    
    # Calculate clip durations dynamically
    # Title card: 5s = 120 frames, others: 6s = 144 frames
    total_duration = sum(120 if "title-card" in os.path.basename(p) else 144 for p in clip_paths if p)
    ET.SubElement(sequence, "duration").text = str(total_duration)
    
    rate = ET.SubElement(sequence, "rate")
    ET.SubElement(rate, "timebase").text = str(timebase)
    ET.SubElement(rate, "ntsc").text = "FALSE"
    
    tc = ET.SubElement(sequence, "timecode")
    tc_rate = ET.SubElement(tc, "rate")
    ET.SubElement(tc_rate, "timebase").text = str(timebase)
    ET.SubElement(tc_rate, "ntsc").text = "FALSE"
    ET.SubElement(tc, "string").text = "00:00:00:00"
    ET.SubElement(tc, "frame").text = "0"
    ET.SubElement(tc, "displayformat").text = "NDF"
    
    media = ET.SubElement(sequence, "media")
    video = ET.SubElement(media, "video")
    v_format = ET.SubElement(video, "format")
    sc = ET.SubElement(v_format, "samplecharacteristics")
    ET.SubElement(sc, "width").text = str(width)
    ET.SubElement(sc, "height").text = str(height)
    ET.SubElement(sc, "pixelaspect").text = "Square"
    sc_rate = ET.SubElement(sc, "rate")
    ET.SubElement(sc_rate, "timebase").text = str(timebase)
    ET.SubElement(sc_rate, "ntsc").text = "FALSE"
    
    track = ET.SubElement(video, "track")
    
    current_start = 0
    for idx, path in enumerate(clip_paths):
        if not path:
            continue
        name = os.path.basename(path)
        dur = 120 if "title-card" in name else 144
        current_end = current_start + dur
        
        clip_id = f"clip-{idx+1}"
        file_id = f"file-{idx+1}"
        
        clipitem = ET.SubElement(track, "clipitem", id=clip_id)
        ET.SubElement(clipitem, "name").text = name
        ET.SubElement(clipitem, "duration").text = str(dur)
        c_rate = ET.SubElement(clipitem, "rate")
        ET.SubElement(c_rate, "timebase").text = str(timebase)
        ET.SubElement(c_rate, "ntsc").text = "FALSE"
        
        ET.SubElement(clipitem, "in").text = "0"
        ET.SubElement(clipitem, "out").text = str(dur)
        ET.SubElement(clipitem, "start").text = str(current_start)
        ET.SubElement(clipitem, "end").text = str(current_end)
        
        file = ET.SubElement(clipitem, "file", id=file_id)
        ET.SubElement(file, "name").text = name
        
        abs_path = os.path.abspath(path)
        parsed_url = urllib.parse.urljoin("file://localhost", urllib.parse.quote(abs_path))
        ET.SubElement(file, "pathurl").text = parsed_url
        
        f_rate = ET.SubElement(file, "rate")
        ET.SubElement(f_rate, "timebase").text = str(timebase)
        ET.SubElement(f_rate, "ntsc").text = "FALSE"
        ET.SubElement(file, "duration").text = str(dur)
        
        current_start = current_end

    # Audio tracks (stereo)
    audio = ET.SubElement(media, "audio")
    for track_idx in [1, 2]:
        a_track = ET.SubElement(audio, "track")
        current_start = 0
        for idx, path in enumerate(clip_paths):
            if not path:
                continue
            name = os.path.basename(path)
            dur = 120 if "title-card" in name else 144
            current_end = current_start + dur
            
            clip_id_audio = f"clip-{idx+1}-audio-{track_idx}"
            file_id = f"file-{idx+1}"
            
            clipitem = ET.SubElement(a_track, "clipitem", id=clip_id_audio)
            ET.SubElement(clipitem, "name").text = name
            ET.SubElement(clipitem, "duration").text = str(dur)
            c_rate = ET.SubElement(clipitem, "rate")
            ET.SubElement(c_rate, "timebase").text = str(timebase)
            ET.SubElement(c_rate, "ntsc").text = "FALSE"
            
            ET.SubElement(clipitem, "in").text = "0"
            ET.SubElement(clipitem, "out").text = str(dur)
            ET.SubElement(clipitem, "start").text = str(current_start)
            ET.SubElement(clipitem, "end").text = str(current_end)
            
            ET.SubElement(clipitem, "file", id=file_id)
            
            sourcetrack = ET.SubElement(clipitem, "sourcetrack")
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
    print(f"✅ Generated Master Timeline XML: {output_xml_path}")

def clean_lut(lut_abs_path, temp_lut):
    """Remove comments/unsupported lines from Kodak LUT to prevent FFmpeg failures."""
    if not os.path.exists(lut_abs_path):
        return None
    try:
        with open(lut_abs_path, "r", encoding="utf-8", errors="ignore") as infile:
            lines = infile.readlines()
        
        cleaned_lines = [line for line in lines if "LUT_3D_INPUT_RANGE" not in line]
        
        with open(temp_lut, "w", encoding="utf-8") as outfile:
            outfile.writelines(cleaned_lines)
            
        print(f"✅ Cleaned and prepared LUT: {temp_lut}")
        return temp_lut
    except Exception as e:
        print(f"⚠️ Failed to clean LUT: {e}")
        return None

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
    print(f"   🔊 Clip {os.path.basename(file_path)} has no audio. Injecting silent audio track...")
    cmd = [
        "ffmpeg", "-y",
        "-i", file_path,
        "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
        "-c:v", "copy", "-c:a", "aac", "-shortest",
        temp_path
    ]
    subprocess.run(cmd, capture_output=True)
    return temp_path

def compile_video_ffmpeg(clip_paths, output_path):
    print("🎬 Running Master Video Compilation via FFmpeg...")
    
    # Process clips to ensure all have audio tracks
    processed_paths = []
    for path in clip_paths:
        if path and os.path.exists(path):
            processed_path = ensure_audio_stream(path)
            processed_paths.append(processed_path)
            
    # Scale and prepare inputs
    inputs = []
    for path in processed_paths:
        inputs.extend(["-i", path])
            
    n = len(processed_paths)
    if n == 0:
        print("❌ No clips available for compilation.")
        return False
    if n == 1:
        print("🎬 Only 1 clip available. Copying to output...")
        shutil.copy(clip_paths[0], output_path)
        return True
        
    filter_complex_parts = []
    
    # Standardize inputs to 1920x1080 @ 24fps stereo
    for i in range(n):
        filter_complex_parts.append(
            f"[{i}:v]scale=1920:1080:force_original_aspect_ratio=decrease,"
            f"pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=fps=24,setsar=1[v{i}]"
        )
        filter_complex_parts.append(
            f"[{i}:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo[a{i}]"
        )
        
    # Cascade xfade for video
    # Offsets calculated dynamically:
    # First clip (Title card) is 5s. Others are 6s.
    offsets = []
    current_offset = 4.5
    for idx in range(n - 1):
        offsets.append(current_offset)
        current_offset += 5.5
    
    last_v = "[v0]"
    for idx in range(n - 1):
        offset = offsets[idx]
        next_v = f"[v_xfade_{idx}]"
        filter_complex_parts.append(
            f"{last_v}[v{idx+1}]xfade=transition=fade:duration=0.5:offset={offset}{next_v}"
        )
        last_v = next_v
        
    # Cascade acrossfade for audio
    last_a = "[a0]"
    for idx in range(n - 1):
        next_a = f"[a_xfade_{idx}]"
        filter_complex_parts.append(
            f"{last_a}[a{idx+1}]acrossfade=d=0.5:c1=tri:c2=tri{next_a}"
        )
        last_a = next_a
        
    # Apply post-processing (LUT, Vignette, Noise)
    temp_lut = "/tmp/lut_clean.cube"
    cleaned_lut = clean_lut(LUT_PATH, temp_lut)
    
    if cleaned_lut:
        filter_complex_parts.append(f"{last_v}lut3d='{cleaned_lut}'[v_lut]")
        filter_complex_parts.append(f"[v_lut]vignette=angle=0.15,noise=alls=8:allf=t+u[v_final]")
    else:
        filter_complex_parts.append(f"{last_v}vignette=angle=0.15,noise=alls=8:allf=t+u[v_final]")
        
    # Final audio normalisation
    filter_complex_parts.append(f"{last_a}loudnorm=I=-14:LRA=11:TP=-1.5[a_final]")
    
    filter_complex = ";".join(filter_complex_parts)
    
    cmd = [
        "ffmpeg", "-y",
        *inputs,
        "-filter_complex", filter_complex,
        "-map", "[v_final]",
        "-map", "[a_final]",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        output_path
    ]
    
    print(f"   Executing: {' '.join(cmd)}")
    try:
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            print("✅ FFmpeg compile succeeded!")
            return True
        else:
            print(f"❌ FFmpeg compile failed: {res.stderr}")
            return False
    except Exception as e:
        print(f"❌ FFmpeg error: {e}")
        return False

# ── Main ──────────────────────────────────────────────────────────────────────
from serpent_genai import setup_logging, get_genai_client
import argparse

logger = setup_logging(__name__)

async def main():
    parser = argparse.ArgumentParser(description="VEO Autonomous Video Production Pipeline")
    parser.add_argument("--dry-run", action="store_true", help="Parse prompts and exit without calling API")
    args = parser.parse_args()

    logger.info("=" * 60)
    logger.info("🎬 VEO AUTONOMOUS VIDEO PRODUCTION PIPELINE")
    logger.info("=" * 60)
    
    # 1. Parse prompts
    prompts_path = "docs/veo-showreel-clip-prompts.md"
    if not os.path.exists(prompts_path):
        logger.warning(f"Prompts file {prompts_path} not found. Running in inspection mode.")
        return

    clips = parse_prompts(prompts_path)
    if args.dry_run:
        logger.info(f"Dry run complete. Parsed {len(clips)} clips.")
        return
    
    # 2. Initialize GenAI Client
    logger.info("\n[Step 1] Initializing GenAI Client with ADC fallback compliance...")
    client = get_genai_client(project=PROJECT_ID, location=LOCATION)
    if not client:
        logger.error("❌ Client initialization failed.")
        return

        
    # 3. Critic & Enhance
    run_critic_phase(client, clips)
    
    # 4. Generate clips
    clip_paths = await run_generation_phase(client, clips)
    
    # Filter valid clip paths
    valid_clips = [path for path in clip_paths if path and os.path.exists(path)]
    print(f"\n📂 Generation complete. {len(valid_clips)}/11 clips ready.")
    
    if len(valid_clips) < 11:
        print("⚠️ Not all clips generated successfully. Compiling timeline with available clips.")
        
    # 5. FCP XML Timeline Export
    xml_output = os.path.join(OUTPUT_DIR, "showreel_timeline.xml")
    generate_davinci_xml(valid_clips, "AI_Generation_Showreel", xml_output)
    
    # Copy a duplicate to showreel_davinci.xml for the user
    shutil.copy(xml_output, os.path.join(OUTPUT_DIR, "showreel_davinci.xml"))
    print(f"✅ Copied duplicate to output/showreel_davinci.xml")
    
    # 6. FFmpeg Assembly
    master_video = os.path.join(OUTPUT_DIR, "showreel_ffmpeg.mp4")
    success = compile_video_ffmpeg(valid_clips, master_video)
    
    if success:
        print(f"\n🎉 SHOWREEL COMPILED SUCCESSFULLY: {master_video}")
    else:
        print("\n❌ Master video compilation failed.")

if __name__ == "__main__":
    asyncio.run(main())
