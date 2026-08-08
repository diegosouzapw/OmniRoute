#!/usr/bin/env python3
# =============================================================================
# Multi-image Reference Analyzer using google-genai (Vertex AI)
# SerpentOS | 2026-06-28
# =============================================================================
import os
import sys
import json
import time
from PIL import Image
from google import genai
from google.genai import types

REFS_DIR = "/Users/work/Documents/showreel/casino refs"
OUTPUT_FILE = "/Users/work/Documents/showreel/casino_refs_prompts.json"

system_prompt = """You are an expert film director, cinematographer, and prompt engineer for advanced generative video models (like Veo 2.0, Veo 3.0, and Google Flow).
Your task is to analyze the user-provided screenshot from a film and write a highly detailed, professional cinematic prompt to regenerate a matching video scene.

Match the reference scene exactly in terms of:
- Composition and Framing (camera lens, shot size, angle, symmetry)
- Lighting (direction, color temperature, shadows, bounce, light sources)
- Colors and Grading (color palette, tint, grade style)
- Actor Positioning and Action (pose, facial expression, wardrobe, gaze)
- Motion and Camera Movement (pans, tilts, tracks, zoom, or static hold)

Rules for output:
- Write the prompt in English.
- Output MUST be valid JSON matching the schema below.
- Do NOT include any audio, music, or sound references (the user wants mute generation).
- Focus on photorealism, professional cinema grade, and physical consistency.

Output JSON Schema:
{
  "clip_id": "string (e.g., clip_01_casino_entrance)",
  "original_file": "string (original filename)",
  "description": "1-2 sentences summarizing the shot contents",
  "style": "genre, camera look, grade style",
  "camera": "lens focal length, camera position, angle, DOF, shot size",
  "lighting": "lighting style, color temperature, key/fill directions",
  "environment": "setting description, details, props, background details",
  "elements": ["list", "of", "visual", "elements"],
  "motion": "detailed description of actor movement and camera movement",
  "ending": "how the shot ends or settles",
  "negative": "unwanted details, artifacts, noise, distorted features",
  "veo_prompt": "A single continuous master prompt string combining all the fields above into a single paragraph for Google Flow (150-200 words max, no sound)"
}
"""

def main():
    print("=== Multi-image Reference Analyzer (Vertex AI) ===")
    
    # Initialize client
    try:
        client = genai.Client(
            vertexai=True, 
            project="project-f91a723f-af1b-4dd2-ba3", 
            location="europe-west3"
        )
    except Exception as e:
        print(f"❌ Failed to initialize genai Client: {e}")
        sys.exit(1)
        
    # List images
    files = sorted([f for f in os.listdir(REFS_DIR) if f.lower().endswith((".png", ".jpg", ".jpeg"))])
    if not files:
        print(f"❌ No images found in {REFS_DIR}")
        sys.exit(1)
        
    print(f"Found {len(files)} reference screenshots to analyze.")
    
    results = []
    for idx, f in enumerate(files):
        path = os.path.join(REFS_DIR, f)
        print(f"📸 Analyzing {f}...")
        try:
            img = Image.open(path)
            
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[
                    img, 
                    f"Analyze this film screenshot. Follow system instructions and output a single JSON matching the schema. Original file: {f}"
                ],
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                    temperature=0.2,
                    response_mime_type="application/json"
                )
            )
            
            data = json.loads(response.text.strip())
            data["clip_id"] = f"clip_{idx+1:02d}_{data.get('clip_id', 'scene').replace('clip_', '')}"
            results.append(data)
            print(f"✅ Analyzed: {data['clip_id']}")
        except Exception as e:
            print(f"⚠️ Error analyzing {f}: {e}")
            
        time.sleep(1.0)
        
    # Write output
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        json.dump({"clips": results}, out, indent=2, ensure_ascii=False)
        
    print(f"\n🎉 Finished analysis! Prompts for all {len(results)} clips saved to: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
