#!/usr/bin/env python3
import os
import glob
import json
import time
import vertexai
from vertexai.generative_models import GenerativeModel, Part

# Config
PROJECT_ID = "project-f91a723f-af1b-4dd2-ba3"
REGION = "europe-west3"
CLIPS_DIR = "/Users/work/Documents/showreel/casino_clips"
REPORT_PATH = "/Users/work/.gemini/antigravity-cli/brain/d378ad95-fd02-43ed-a491-c96e0078dc8a/film_critic_report.md"

os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
os.environ["GOOGLE_CLOUD_REGION"] = REGION

def main():
    print("Initializing Vertex AI...")
    vertexai.init(project=PROJECT_ID, location=REGION)
    model = GenerativeModel("gemini-2.5-flash")

    clips = sorted(glob.glob(os.path.join(CLIPS_DIR, "*.mp4")))
    if not clips:
        print("No clips found.")
        return

    print(f"Found {len(clips)} clips for evaluation.")

    prompt = """
    You are an expert Film Critic and Quality Assurance AI.
    Evaluate the provided generated video based on the following criteria. Score each from 1 to 5.
    
    1. color_match: Does it look like a cohesive cinematic grade?
    2. composition: Is the framing cinematic and aesthetically pleasing?
    3. motion_quality: Is the motion fluid and free of AI morphing artifacts?
    4. grain_match: Does it have a natural texture without excessive digital noise?
    5. palette_artifact: CRITICAL RULE. Look at the frame carefully. Are there explicit color palette boxes, hex code text, or color swatches painted/generated directly inside the video? If yes, score 1. If no, score 5.

    Return EXACTLY valid JSON in this format:
    {"scores": {"color_match": 4, "composition": 5, "motion_quality": 4, "grain_match": 5, "palette_artifact": 5}, "reasoning": "Short explanation"}
    """

    results = []
    
    for clip in clips:
        filename = os.path.basename(clip)
        print(f"\nEvaluating {filename}...")
        
        try:
            with open(clip, "rb") as f:
                video_bytes = f.read()
                
            video_part = Part.from_data(data=video_bytes, mime_type="video/mp4")
            
            response = model.generate_content(
                [video_part, prompt],
                generation_config={
                    "temperature": 0.1,
                    "response_mime_type": "application/json"
                }
            )
            
            resp_text = response.text.strip()
            # Handle potential markdown wrappers
            if resp_text.startswith("```json"):
                resp_text = resp_text[7:-3]
            
            data = json.loads(resp_text)
            scores = data.get("scores", {})
            
            avg_score = sum(scores.values()) / max(len(scores), 1)
            
            # If palette_artifact is < 5, it automatically fails the clip by capping the avg_score artificially low
            if scores.get("palette_artifact", 5) < 5:
                avg_score = 1.0
                data["reasoning"] = "FAILED: Color palette artifact detected in frame! " + data.get("reasoning", "")
                
            data["filename"] = filename
            data["average"] = avg_score
            data["passed"] = avg_score >= 4.0
            
            results.append(data)
            print(f" -> Score: {avg_score:.2f}/5.0 | Passed: {data['passed']} | {data.get('reasoning')}")
            
        except Exception as e:
            print(f" -> Error analyzing {filename}: {e}")
            results.append({
                "filename": filename,
                "scores": {"color_match": 0, "composition": 0, "motion_quality": 0, "grain_match": 0, "palette_artifact": 0},
                "average": 0.0,
                "passed": False,
                "reasoning": f"Error: {e}"
            })
            
        # Small delay to avoid API rate limits
        time.sleep(2)

    # Generate Markdown Report
    with open(REPORT_PATH, "w") as f:
        f.write("# Film Critic Evaluation Report\\n\\n")
        f.write("| Clip | Average Score | Palette Artifact? | Passed? | Reasoning |\\n")
        f.write("|---|---|---|---|---|\\n")
        for res in results:
            pal_score = res.get("scores", {}).get("palette_artifact", 0)
            pal_warn = "🚨 YES" if pal_score < 5 else "✅ NO"
            passed_emoji = "✅ Pass" if res["passed"] else "❌ Fail"
            f.write(f"| {res['filename']} | {res['average']:.2f} | {pal_warn} | {passed_emoji} | {res.get('reasoning')} |\\n")
            
    print(f"\\nEvaluation complete! Report saved to {REPORT_PATH}")

if __name__ == "__main__":
    main()
