#!/usr/bin/env python3
"""
==============================================================================
VERTEX AI VEO 3 PRODUCTION PIPELINE & BATCH GENERATOR (SATC 777LADIES)
Supports Google Veo 3.0 / Veo 3.1 (`veo-3.0-generate-001` / `veo-3.1-generate-001`)
==============================================================================
Executes Text-to-Video production for 777Ladies Casino App opening sequence
with 35mm Kodak Vision3 500T aesthetic and Ukrainian Didot typography specs.
"""

import os
import sys
import json
import argparse
from datetime import datetime

RUN_ID = "20260710_053000"
PROJECT_ID = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "europe-west3"  # Primary Serpent OS GCP location
DEFAULT_VEO_MODEL = "veo-3.0-generate-001"

VEO3_NEGATIVE_PROMPT = (
    "watermark, text overlay, subtitle, blurry, low resolution, CGI, 3D render, "
    "modern smartphone, modern cars post-1998, digital noise, oversharpened, distorted hands"
)

VEO3_CINEMATIC_PREFIX = (
    "Cinematic 35mm film shot on Kodak Vision3 500T, professional Panavision prime lenses, "
    "shallow depth of field, natural organic film grain, authentic 1998 Manhattan atmosphere: "
)

def build_veo3_payload(scene):
    """
    Constructs an official Google Vertex AI Veo 3 Text-to-Video generation request payload.
    """
    scene_id = scene.get("scene_id", "S00")
    raw_prompt = scene.get("veo_prompt") or scene.get("prompt_text") or ""
    duration = float(scene.get("duration_sec", 4.0))

    # Veo 3 API supports duration intervals (e.g., 5s or 8s)
    api_duration = 5 if duration <= 5.0 else 8

    full_prompt = f"{VEO3_CINEMATIC_PREFIX} {raw_prompt}"

    payload = {
        "model": DEFAULT_VEO_MODEL,
        "contents": {
            "prompt": full_prompt,
            "negativePrompt": VEO3_NEGATIVE_PROMPT,
        },
        "generationConfig": {
            "aspectRatio": "16:9",
            "resolution": "1080p",
            "fps": 24,
            "durationSeconds": api_duration,
            "personGeneration": "allow_adult",
            "seed": int(scene_id.replace("S", "")) * 777 if scene_id.replace("S", "").isdigit() else 777
        },
        "metadata": {
            "scene_id": scene_id,
            "project_id": PROJECT_ID,
            "location": LOCATION,
            "typography_overlay_ukr": scene.get("typography_overlay_ukr", "None"),
            "target_exact_duration_sec": duration
        }
    }
    return payload

def run_veo3_pipeline(dry_run=True):
    print("===========================================================================")
    print(f"🚀 GOOGLE VERTEX AI VEO 3 PRODUCTION PIPELINE (MODEL: {DEFAULT_VEO_MODEL})")
    print(f"   Project: {PROJECT_ID} | Region: {LOCATION} | RUN_ID: {RUN_ID}")
    print("===========================================================================\n")

    manifest_path = "data/veo_prompts_satc_50s_reverse_engineered.json"
    if not os.path.exists(manifest_path):
        print(f"❌ Manifest {manifest_path} not found.")
        return

    with open(manifest_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    scenes = data.get("scenes", [])
    print(f"📋 Loaded {len(scenes)} scenes for Veo 3 generation formatting...")

    out_dir = f"output/{RUN_ID}/veo3"
    os.makedirs(out_dir, exist_ok=True)

    veo3_jobs = []
    for s in scenes:
        payload = build_veo3_payload(s)
        veo3_jobs.append(payload)

    batch_manifest_file = f"{out_dir}/veo3_satc_50s_batch_payloads.json"
    with open(batch_manifest_file, "w", encoding="utf-8") as f:
        json.dump({"project_id": PROJECT_ID, "model": DEFAULT_VEO_MODEL, "jobs": veo3_jobs}, f, indent=2, ensure_ascii=False)

    print(f"✅ Generated {len(veo3_jobs)} official Google Veo 3 API request payloads: {batch_manifest_file}")

    # Generate interactive HTML dashboard for Veo 3 prompts & specs
    html_file = f"{out_dir}/veo3_showcase.html"
    html_rows = []
    for job in veo3_jobs:
        meta = job["metadata"]
        cfg = job["generationConfig"]
        html_rows.append(f"""
            <tr>
                <td><strong>{meta['scene_id']}</strong></td>
                <td><code>{meta['target_exact_duration_sec']}s</code> (Veo3 API: {cfg['durationSeconds']}s)</td>
                <td>{job['contents']['prompt'][:120]}...</td>
                <td style="color: #4cd98b;"><strong>{meta['typography_overlay_ukr']}</strong></td>
                <td><span class="badge">VEO-3.0-GENERATE-001</span></td>
            </tr>
        """)

    html_content = f"""<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Google Vertex AI Veo 3 — 777ЛЕДІС Production Dashboard</title>
    <style>
        body {{ background: #0c0e12; color: #ebf4fa; font-family: -apple-system, sans-serif; padding: 30px; }}
        .container {{ max-width: 1300px; margin: 0 auto; }}
        h1 {{ font-family: 'Didot', serif; font-size: 2.4rem; color: #fff; }}
        .badge {{ background: #1f3a52; color: #6db3f2; padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }}
        table {{ width: 100%; border-collapse: collapse; background: #161a20; margin-top: 20px; border-radius: 8px; overflow: hidden; }}
        th, td {{ padding: 12px 16px; border-bottom: 1px solid #252c36; text-align: left; }}
        th {{ background: #1f252d; color: #8fa0b5; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🎬 Google Vertex AI Veo 3 (`{DEFAULT_VEO_MODEL}`) — 777ЛЕДІС Production Spec</h1>
        <p>GCP Project: <code>{PROJECT_ID}</code> • Region: <code>{LOCATION}</code> • Resolution: <code>1920x1080 @ 24fps</code></p>
        <table>
            <thead>
                <tr>
                    <th>Сцена</th>
                    <th>Длительность</th>
                    <th>Veo 3 Cinematic Prompt (Kodak Vision3 500T)</th>
                    <th>Украинские титры 1998 Didot</th>
                    <th>Модель Vertex AI</th>
                </tr>
            </thead>
            <tbody>
                {"".join(html_rows)}
            </tbody>
        </table>
    </div>
</body>
</html>
"""
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"🌐 Created Veo 3 Production Spec Showcase: {html_file}")
    print("\n🎉 VEO 3 PIPELINE SPECIFICATIONS READY!")

if __name__ == "__main__":
    run_veo3_pipeline()
