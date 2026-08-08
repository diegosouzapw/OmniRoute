#!/usr/bin/env python3
# =============================================================================
# Image-to-Video Hybrid Generator (AI Studio -> Vertex)
# SerpentOS | 2026-06-28
# =============================================================================
import os
import sys
import json
import time
import asyncio
from google import genai
from google.genai import types

# Config
PROJECT_ID = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "europe-west3"
MODEL_VEO_VERTEX = "publishers/google/models/veo-2.0-generate-001"
MODEL_CRITIC = "gemini-2.5-flash"

PROMPTS_FILE = "/Users/work/Documents/showreel/casino_refs_prompts.json"
OUTPUT_DIR = "/Users/work/Documents/showreel"
CLIPS_DIR = os.path.join(OUTPUT_DIR, "casino_clips")
LOGS_DIR = os.path.join("/Users/work/serpentos/logs")

os.makedirs(CLIPS_DIR, exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)
gen_log_path = os.path.join(LOGS_DIR, "generation_log.jsonl")
critic_log_path = os.path.join(LOGS_DIR, "film_critic_scores.jsonl")

# Init clients
# 1. Google AI Studio Client (Fallback)
studio_key = os.environ.get("GEMINI_API_KEY")
client_studio = genai.Client(api_key=studio_key) if studio_key else None

# 2. Vertex AI Client
os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
os.environ["GOOGLE_CLOUD_LOCATION"] = LOCATION
client_vertex = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)

def get_image_bytes(image_path):
    if not os.path.exists(image_path):
        # Fallback to the main casino refs folder
        basename = os.path.basename(image_path)
        alt_path = os.path.join("/Users/work/Documents/showreel/casino refs", basename)
        if os.path.exists(alt_path):
            image_path = alt_path
        else:
            print(f"❌ Image not found: {image_path}")
            return None
    with open(image_path, "rb") as f:
        return f.read()

def run_film_critic(client, clip_id, file_path):
    print(f"🔍 Running Film Critic (gemini-2.5-flash-lite) on {clip_id}...")
    try:
        with open(file_path, "rb") as f:
            video_bytes = f.read()
            
        video_part = types.Part.from_bytes(data=video_bytes, mime_type="video/mp4")
            
        system_instruction = """
        You are an expert Film Critic. Evaluate this generated video based on:
        1. color_match
        2. composition
        3. motion_quality
        4. grain_match
        Output JSON: {"scores": {"color_match": 4, "composition": 5, "motion_quality": 4, "grain_match": 5}}
        """
        response = client.models.generate_content(
            model=MODEL_CRITIC,
            contents=["Evaluate this video.", video_part],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json"
            )
        )
        
        result = json.loads(response.text)
        
        scores = result.get("scores", {})
        avg_score = sum(scores.values()) / max(len(scores), 1)
        
        with open(critic_log_path, "a") as f:
            log_entry = {"clip_id": clip_id, "scores": scores, "average": avg_score}
            f.write(json.dumps(log_entry) + "\n")
            
        print(f"   Score: {avg_score:.1f}/5.0")
        return avg_score >= 4.0
    except Exception as e:
        print(f"⚠️ Film Critic failed for {clip_id}: {e}")
        return True # Default to pass if critic fails

async def generate_clip(clip_data):
    clip_id = clip_data["clip_id"]
    local_path = os.path.join(CLIPS_DIR, f"{clip_id}.mp4")
    
    if os.path.exists(local_path):
        print(f"   ⏭️  {clip_id} already exists. Skipping.")
        return local_path
        
    prompt_text = clip_data.get("veo_prompt")
    if not prompt_text:
        prompt_text = ", ".join(filter(None, [
            clip_data.get("description"), clip_data.get("style"),
            clip_data.get("camera"), clip_data.get("lighting")
        ]))
    
    prompt_text += ". STRICT NEGATIVE CONSTRAINT: DO NOT include any color palette, color swatches, color names, or hex codes inside the video frame. The video must be purely cinematic without any UI or graphical artifacts overlaying it."
        
    image_path = clip_data.get("original_file", "")
    image_bytes = get_image_bytes(image_path)
    
    if not image_bytes:
        with open(gen_log_path, "a") as f:
            f.write(json.dumps({"clip_id": clip_id, "status": "FAILED", "reason": "Missing image"}) + "\n")
        return None
        
    img_type = types.Image(image_bytes=image_bytes, mime_type="image/png")
    
    max_retries = 3
    backoff = 30.0
    
    for attempt in range(max_retries):
        # Hybrid Routing strategy:
        # Attempt 1: Try AI Studio if available
        # Attempt >1 or AI Studio fails: Fallback to Vertex AI
        current_client = client_vertex
        model_name = MODEL_VEO_VERTEX
        
        print(f"🎬 Generating {clip_id} (Attempt {attempt+1}) via Vertex AI...")
        
        try:
            op = current_client.models.generate_videos(
                model=model_name,
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
                op = current_client.operations.get(op)
                
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
                
                # Film Critic Phase L (Verification Sub-bot)
                passed = run_film_critic(current_client, clip_id, local_path)
                if passed:
                    with open(gen_log_path, "a") as f:
                        f.write(json.dumps({"clip_id": clip_id, "status": "SUCCESS"}) + "\n")
                    return local_path
                else:
                    print(f"   ⚠️ {clip_id} failed critic evaluation (Score < 4.0). Forcing regeneration (Attempt {attempt+1}/{max_retries}).")
                    os.rename(local_path, f"{local_path}.rejected_attempt{attempt+1}")
                    continue
                
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e).upper():
                print(f"⚠️ [429] Rate limit hit. Backing off for {backoff}s...")
                await asyncio.sleep(backoff)
                backoff *= 2
            else:
                print(f"❌ Error generating {clip_id}: {e}")
                
    with open(gen_log_path, "a") as f:
        f.write(json.dumps({"clip_id": clip_id, "status": "FAILED", "reason": "Max retries exceeded"}) + "\n")
    return None

async def main():
    print("=== Hybrid Image-to-Video Generation Pipeline ===")
    
    with open(PROMPTS_FILE, "r") as f:
        data = json.load(f)
        
    clips = data.get("clips", [])
    print(f"Found {len(clips)} reference clips in library.")
    
    # Process in batches of 4
    batch_size = 4
    for i in range(0, len(clips), batch_size):
        batch = clips[i:i+batch_size]
        print(f"\n📦 Processing Batch {(i//batch_size)+1}...")
        
        tasks = [generate_clip(clip) for clip in batch]
        results = await asyncio.gather(*tasks)
        
        if i + batch_size < len(clips):
            print("⏳ 10-second cooldown between batches...")
            await asyncio.sleep(10)

if __name__ == "__main__":
    asyncio.run(main())
