#!/usr/bin/env python3
# =============================================================================
# Image-to-Video Generator Phase 2 (Gemini Analysis -> Vertex Veo)
# SerpentOS | 2026-06-28
# =============================================================================
import os
import sys
import json
import asyncio
import subprocess
from pathlib import Path
from google import genai
from google.genai import types

# Config
PROJECT_ID = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "europe-west3"
MODEL_VEO = "publishers/google/models/veo-2.0-generate-001"
MODEL_ANALYSIS = "gemini-2.5-flash"

INPUT_DIR = "/Users/work/Documents/showreel/casino refs/2"
OUTPUT_DIR = "/Users/work/Documents/showreel/casino_clips_phase2"
LOGS_DIR = "/Users/work/serpentos/logs"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)
log_path = os.path.join(LOGS_DIR, "phase2_generation_log.jsonl")

# Init Vertex AI Client
os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
os.environ["GOOGLE_CLOUD_LOCATION"] = LOCATION
client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)

def get_image_bytes(image_path):
    with open(image_path, "rb") as f:
        return f.read()

async def analyze_image_and_get_prompt(image_bytes, mime_type):
    print("🧠 Analyzing image with Gemini 2.5 Flash to generate prompt...")
    img_part = types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
    
    system_instruction = """
    You are an expert cinematic prompt engineer for video generation models (like Veo 2.0).
    Analyze the provided image focusing on light, camera angle, and composition.
    Generate a highly descriptive prompt to animate this image into a 6-second cinematic video.
    
    STRICT NEGATIVE CONSTRAINT: DO NOT include any color palette, color swatches, color names, hex codes, or UI elements in the prompt. The resulting video must be purely cinematic.
    Output ONLY the final prompt text, without any conversational filler or quotes.
    """
    
    try:
        response = client.models.generate_content(
            model=MODEL_ANALYSIS,
            contents=["Analyze this image and provide the cinematic prompt.", img_part],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7
            )
        )
        return response.text.strip()
    except Exception as e:
        print(f"❌ Gemini Analysis failed: {e}")
        return None

async def generate_clip(image_path):
    basename = os.path.basename(image_path)
    clip_id = os.path.splitext(basename)[0]
    local_path = os.path.join(OUTPUT_DIR, f"{clip_id}.mp4")
    
    if os.path.exists(local_path):
        print(f"   ⏭️  {clip_id} already exists. Skipping.")
        return
        
    image_bytes = get_image_bytes(image_path)
    mime_type = "image/png" if image_path.lower().endswith(".png") else "image/jpeg"
    
    prompt_text = await analyze_image_and_get_prompt(image_bytes, mime_type)
    if not prompt_text:
        return
        
    print(f"📝 Generated Prompt for {clip_id}: {prompt_text}")
    
    img_type = types.Image(image_bytes=image_bytes, mime_type=mime_type)
    
    max_retries = 3
    backoff = 30.0
    
    for attempt in range(max_retries):
        print(f"🎬 Generating video for {clip_id} (Attempt {attempt+1}) via Vertex AI...")
        
        try:
            op = client.models.generate_videos(
                model=MODEL_VEO,
                prompt=prompt_text,
                image=img_type,
                config=types.GenerateVideosConfig(
                    aspect_ratio="16:9",
                    duration_seconds=6,
                    resolution="720p",
                    enhance_prompt=True,
                    generate_audio=False
                )
            )
            
            while not op.done:
                await asyncio.sleep(10)
                op = client.operations.get(op)
                
            if op.error:
                raise RuntimeError(f"Operation error: {op.error}")
                
            result = op.result
            if result and result.generated_videos:
                video_obj = result.generated_videos[0].video
                if video_obj.video_bytes:
                    with open(local_path, "wb") as f:
                        f.write(video_obj.video_bytes)
                elif video_obj.uri:
                    if video_obj.uri.startswith("gs://"):
                        subprocess.run(["gcloud", "storage", "cp", video_obj.uri, local_path], check=True)
                    else:
                        import urllib.request
                        urllib.request.urlretrieve(video_obj.uri, local_path)
                        
                print(f"✅ Generated {clip_id} -> {local_path}")
                
                with open(log_path, "a") as f:
                    f.write(json.dumps({"clip_id": clip_id, "prompt": prompt_text, "status": "SUCCESS"}) + "\n")
                return
                
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e).upper() or "Quota" in str(e):
                print(f"⚠️ [429] Rate limit hit. Backing off for {backoff}s...")
                await asyncio.sleep(backoff)
                backoff *= 2
            else:
                print(f"❌ Error generating {clip_id}: {e}")
                break
                
    with open(log_path, "a") as f:
        f.write(json.dumps({"clip_id": clip_id, "status": "FAILED", "reason": "Max retries exceeded or fatal error"}) + "\n")

async def main():
    print("=== Phase 2: Gemini Analysis + Veo 2.0 Generation ===")
    
    valid_exts = {".png", ".jpg", ".jpeg"}
    images = [os.path.join(INPUT_DIR, f) for f in os.listdir(INPUT_DIR) 
              if os.path.splitext(f)[1].lower() in valid_exts]
              
    print(f"Found {len(images)} images in {INPUT_DIR}.")
    
    batch_size = 2
    for i in range(0, len(images), batch_size):
        batch = images[i:i+batch_size]
        print(f"\n📦 Processing Batch {(i//batch_size)+1}...")
        
        tasks = [generate_clip(img) for img in batch]
        await asyncio.gather(*tasks)
        
        if i + batch_size < len(images):
            print("⏳ 15-second cooldown between batches...")
            await asyncio.sleep(15)

if __name__ == "__main__":
    asyncio.run(main())
