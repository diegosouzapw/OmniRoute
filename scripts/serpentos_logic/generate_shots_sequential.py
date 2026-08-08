#!/usr/bin/env python3
"""
🎬 777LADIES — SEQUENTIAL VEO 3.1 SHOT GENERATOR
- Real Veo 3.1 on Vertex AI (no FFmpeg fake motion)
- 80% visual match to original late-1990s NYC rom-com opening
- NO film borders, NO Kodak edge vignette in FFmpeg concat
- Shots generated one by one: S01→S02→S03→S04→S05→S06
- Clean concat: no eq/noise/grain filter added (Veo handles cinematic look)
"""

import json, os, sys, time, subprocess, shutil
from pathlib import Path
from google import genai
from google.genai import types

PROJECT   = "project-f91a723f-af1b-4dd2-ba3"
LOCATION  = "us-central1"
OUTPUT    = Path("/Users/work/Movies/sex new/last veo")
OUTPUT.mkdir(parents=True, exist_ok=True)
MOVIES    = OUTPUT  # same dir

client = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)

# ─────────────────────────────────────────────────────
# PROMPTS — 80% match to original 1998 NYC rom-com look
# All prompts are text-to-video (no image input)
# veo-prompt-builder structured format
# ─────────────────────────────────────────────────────
SHOTS = [
    {
        "id": "S01",
        "duration": 8,
        "prompt": """[SHOT TYPE & CAMERA] Smooth backward dolly tracking shot, Super-16mm Arriflex SR3 camera, Panavision 28mm spherical prime T2.8, handheld-steadicam hybrid feel, slight natural camera breathing.

[SUBJECT] An elegant, charismatic woman in her early 30s — light strawberry-blonde wavy hair to her shoulders, wearing a powder-pink silk sleeveless blouse and an airy white tulle midi skirt — walks briskly and confidently toward the camera down a Manhattan avenue. Her hair and skirt catch the breeze naturally.

[ENVIRONMENT] Fifth Avenue, Manhattan, late 1990s spring morning. Wide sidewalk with ornate stone paving, luxury boutique storefronts with awnings, classic New York lamp posts, yellow taxis moving in traffic lane. Depth: pedestrians in background, shop windows reflecting sunlight.

[LIGHTING] Soft overcast Manhattan daylight (5500K), diffused high-key fill, gentle warm bounce from boutique windows. No harsh shadows. Even, flattering light — classic 1990s romantic comedy cinematography.

[COLOR & STYLE] Warm 1990s New York palette: cream highlights, subtle golden midtones, soft desaturated shadows. Organic Super-16mm film grain embedded in the image — NO added borders, NO vignette on edges, NO Kodak film sprocket holes. Clean full frame 1920x1080.

[MOTION] Camera dollies smoothly backward maintaining distance from heroine. She walks toward camera continuously. Yellow taxis roll past in background. No pause, no freeze frame, continuous fluid motion every second.

[TECH] Video: 8s, 24fps, 1920x1080, continuous motion every frame, no freeze-frames, no static shots, no embedded text, no letters, no watermarks, no title cards, no film borders.

[ANTI-STATIC] Start motion from frame 1. Every second must contain visible camera and subject movement."""
    },
    {
        "id": "S02",
        "duration": 8,
        "prompt": """[SHOT TYPE & CAMERA] Medium tracking shot, Super-16mm Arriflex SR3, Panavision 35mm spherical prime T2.8, camera moves laterally alongside subject at walking pace.

[SUBJECT] Same heroine — early 30s, strawberry-blonde wavy hair, powder-pink silk blouse, white tulle midi skirt — walks past a cheerful male city electrician in a yellow hardhat and orange safety vest who is working at the base of a classic Manhattan iron street lamp. The worker turns, grins and tips his hardhat warmly. The heroine glances back over her shoulder with a playful, amused smile — never breaking her confident stride.

[ENVIRONMENT] Manhattan midtown sidewalk. Classic cast-iron ornamental street lamp. NYC Department of Transportation truck partially visible. Sunny day reflections on windows behind. Other pedestrians in soft background.

[LIGHTING] Bright overcast 1990s NYC daylight. Worker's hardhat picks up soft highlight. Warm bounce fill from building facades. Even, airy rom-com lighting — no harsh shadows.

[COLOR & STYLE] Warm 1990s romantic comedy palette — creamy highlights, golden midtones. Organic Super-16mm grain. NO film borders, NO edge vignette, NO sprocket holes. Full clean frame.

[MOTION] Camera tracks laterally, keeping both subjects in mid-shot. Heroine walking forward, worker gesturing — both in continuous motion. No freeze-frame, no static.

[TECH] Video: 8s, 24fps, 1920x1080, continuous motion, no text, no watermarks, no borders.

[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement."""
    },
    {
        "id": "S03",
        "duration": 8,
        "prompt": """[SHOT TYPE & CAMERA] Smooth rightward pan tracking shot, Super-16mm Arriflex SR3, Panavision 35mm spherical prime T2.8, camera pans continuously following action along sidewalk.

[SUBJECT] Same heroine — early 30s, strawberry-blonde wavy hair, powder-pink silk blouse, white tulle midi skirt — strides past a vibrant colorful corner fruit market. An enthusiastic Latino vendor in a white apron tosses a bright red apple up in the air with a flourish; the heroine catches it effortlessly in one hand mid-stride, takes a confident bite, and keeps walking — shooting the vendor a charming smile.

[ENVIRONMENT] Manhattan corner fruit stand overflowing with produce: stacked red apples, oranges, bananas, green grapes. Hand-painted price signs on cardboard. Flowers in buckets. A busy street intersection in background with yellow taxis.

[LIGHTING] Warm midday overcast Manhattan light. Produce colors vibrant and saturated — yellows, reds, oranges popping against soft background. Airy, cheerful 1990s rom-com lighting.

[COLOR & STYLE] Vivid saturated produce colors, warm golden highlights. Super-16mm organic film grain. NO film borders, NO vignette, NO Kodak edge effects. Full clean 1920x1080 frame.

[MOTION] Continuous rightward pan following heroine and apple toss action. Heroine never stops walking. No pause, no freeze-frame.

[TECH] Video: 8s, 24fps, continuous motion every frame, no text, no watermarks, no borders.

[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement."""
    },
    {
        "id": "S04",
        "duration": 8,
        "prompt": """[SHOT TYPE & CAMERA] Dynamic low-angle tracking shot, Super-16mm Arriflex SR3, Panavision 35mm spherical prime T2.8, camera at hip-height moves alongside heroine crossing intersection.

[SUBJECT] Same heroine — early 30s, strawberry-blonde wavy hair, powder-pink silk blouse, white tulle midi skirt, nude pumps — steps confidently off the curb and crosses a bustling Manhattan intersection. Her skirt swirls and hair bounces naturally. A cheerful NYPD traffic officer waves her through with a smile.

[ENVIRONMENT] Classic Manhattan intersection. Pedestrian crosswalk markings. Stream of yellow taxis and period-correct 1990s NYC sedans halted at the intersection. Brick and glass skyscrapers in background. City pigeons scatter.

[LIGHTING] Bright overcast 1990s NYC street light. Reflections on wet asphalt. Warm bounce from taxi hoods. High-key romantic-comedy lighting — no deep shadows.

[COLOR & STYLE] Classic 1990s NYC street palette: yellow taxis, grey asphalt, cream buildings. Organic Super-16mm grain. NO film borders, NO vignette, NO sprocket holes. Full clean frame.

[MOTION] Heroine strides across intersection continuously. Camera moves with her at hip-level. Taxis and pedestrians in continuous background motion. No freeze-frame, no pause.

[TECH] Video: 8s, 24fps, 1920x1080, continuous motion, no text, no watermarks, no borders.

[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement."""
    },
    {
        "id": "S05",
        "duration": 8,
        "prompt": """[SHOT TYPE & CAMERA] Wide rightward pan shot, Super-16mm Arriflex SR3, Panavision 28mm spherical prime T2.8, camera pans right following a passing bus.

[SUBJECT] Same heroine — early 30s, strawberry-blonde hair, powder-pink blouse, white tulle skirt — visible on sidewalk in foreground walking left-to-right. A large New York City Transit MTA bus drives smoothly across the background intersection.

[ENVIRONMENT] Manhattan avenue intersection. Classic 1990s MTA bus — white/blue livery. The bus has a large rectangular advertising panel on its side that is COMPLETELY EMPTY AND BLANK — white/cream rectangle with zero text, zero imagery, zero graphics of any kind. Behind the bus: midtown Manhattan skyline. Yellow taxis in traffic. Classic street furniture.

[LIGHTING] Bright overcast Manhattan daylight. Sunlight glints off bus windows. Heroine lit by soft diffused fill.

[COLOR & STYLE] 1990s NYC transit colors. Warm overcast light. Organic Super-16mm grain. NO film borders, NO vignette. Full clean frame. Bus advertising panel MUST be completely blank white/cream.

[MOTION] Camera pans right continuously with the bus movement. Bus moves continuously across frame. Heroine walks in foreground. No freeze-frame.

[TECH] Video: 8s, 24fps, 1920x1080, continuous motion, no text anywhere in frame, no watermarks, no borders. Bus panel is blank.

[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement."""
    },
    {
        "id": "S06",
        "duration": 8,
        "prompt": """[SHOT TYPE & CAMERA] Intimate slow dolly push-in, Super-16mm Arriflex SR3, Panavision 50mm spherical prime T2.0, camera slowly moves toward subject over 8 seconds creating a gentle rack-focus bokeh reveal.

[SUBJECT] Same heroine — early 30s, strawberry-blonde wavy hair, powder-pink silk blouse, white tulle midi skirt — holds a late-1990s Nokia-style mobile phone or small planner notebook at chest height. She glances down briefly then looks directly into the camera lens with a warm, enchanting, confident smile — the signature breaking-of-the-fourth-wall moment.

[ENVIRONMENT] Manhattan avenue sidewalk. Soft bokeh of avenue traffic, yellow taxis, and shopfronts behind her. The phone/planner screen or cover shows ONLY abstract geometric color shapes — absolutely no text, no readable content.

[LIGHTING] Soft overcast 1990s daylight with gentle warm fill bounce from nearby shop window. Beautiful even light on her face. Warm golden bokeh in background.

[COLOR & STYLE] Warm creamy highlights with deep golden bokeh. Maximum cinematic depth-of-field from 50mm T2.0 at Super-16mm sensor size. Organic film grain. NO film borders, NO vignette, NO sprocket holes. Full clean 1920x1080 frame.

[MOTION] Camera slowly pushes in continuously. Subject breathes naturally, glances down then into camera. Her hair moves gently. No freeze-frame — continuous subtle motion every second.

[TECH] Video: 8s, 24fps, 1920x1080, continuous motion, no text or readable content anywhere, no watermarks, no borders.

[ANTI-STATIC] Start motion from frame 1. Every second must contain visible movement."""
    },
]


def log(msg): print(msg, flush=True)


def poll_op(op, shot_id):
    """Poll Veo 3.1 — client.operations.get(op) confirmed working (debug 2026-07-10)."""
    log(f"  ⏳ Polling op {op.name.split('/')[-1]}...")
    while not op.done:
        time.sleep(20)
        op = client.operations.get(op)
        state = (op.metadata or {}).get("state", "RUNNING") if op.metadata else "polling"
        log(f"     [{shot_id}] {state}")
    return op


def save_video(op, out_path: Path, shot_id: str) -> bool:
    """
    CONFIRMED structure (debug verified 2026-07-10):
      op.response.generated_videos[i].video.video_bytes  ← raw MP4 bytes
    Uses get_videos_operation so response is always typed GenerateVideosResponse.
    """
    response = op.response  # GenerateVideosResponse
    if not response or not response.generated_videos:
        log(f"  ❌ [{shot_id}] No generated_videos. rai_filtered={getattr(response,'rai_media_filtered_count',0)}")
        return False

    for i, gen_video in enumerate(response.generated_videos):
        video_obj = gen_video.video          # google.genai.types.Video
        raw = video_obj.video_bytes          # bytes — confirmed from debug
        if raw:
            out_path.write_bytes(raw)
            mb = out_path.stat().st_size // 1024 // 1024
            log(f"  💾 [{shot_id}] Saved clip #{i} → {out_path.name} ({mb}MB)")
            return True
        # fallback: GCS URI if output_gcs_uri was used
        uri = getattr(video_obj, "uri", None)
        if uri and uri.startswith("gs://"):
            subprocess.run(["gsutil", "cp", uri, str(out_path)], check=True)
            log(f"  💾 [{shot_id}] Downloaded from GCS → {out_path.name}")
            return True

    log(f"  ❌ [{shot_id}] video_bytes is empty and no GCS uri.")
    return False


def concat_clean(clip_paths):
    """Concat all clips — NO grain/noise/vignette/border filters."""
    concat_txt = OUTPUT / "concat_v2.txt"
    with open(concat_txt, "w") as f:
        for p in clip_paths:
            f.write(f"file '{Path(p).absolute()}'\n")

    final_out  = OUTPUT / "777ladies_50s_FINAL.mp4"

    log(f"\n🔗 Concatenating {len(clip_paths)} clips — clean, no borders...")
    subprocess.run([
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0",
        "-i", str(concat_txt),
        # NO eq, NO noise, NO vignette — clean output, Veo handles the look
        "-c:v", "libx264", "-preset", "slow", "-crf", "14",
        "-r", "24", "-an",
        "-movflags", "+faststart",
        str(final_out)
    ], check=True, stderr=subprocess.DEVNULL)

    # Verify
    r = subprocess.run(
        ["ffprobe", "-v", "error",
         "-show_entries", "format=duration:stream=r_frame_rate,width,height",
         "-of", "json", str(final_out)],
        capture_output=True, text=True
    )
    meta = json.loads(r.stdout)
    dur = float(meta["format"]["duration"])
    fps = meta["streams"][0].get("r_frame_rate", "?")
    log(f"\n🎉 FINAL → {final_out}")
    log(f"   Duration: {dur:.2f}s | FPS: {fps} | {meta['streams'][0]['width']}x{meta['streams'][0]['height']}")
    log(f"   Saved to: /Users/work/Movies/sex new/last veo/")
    subprocess.Popen(["open", str(final_out)])
    return str(final_out)


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "all"
    shots_to_run = SHOTS if target == "all" else [s for s in SHOTS if s["id"] == target]

    log("🚀 777LADIES — SEQUENTIAL VEO 3.1 GENERATOR")
    log(f"📌 {PROJECT} | {LOCATION} | veo-3.1-generate-001")
    log(f"🎬 Shots: {[s['id'] for s in shots_to_run]}")
    log(f"✨ 80% original match | Clean frame | No borders | No grain overlay")

    completed = []

    for shot in shots_to_run:
        sid = shot["id"]
        out = OUTPUT / f"{sid}_veo3.mp4"

        if out.exists() and out.stat().st_size > 2_000_000:
            log(f"\n✅ [{sid}] Already exists ({out.stat().st_size//1024//1024}MB) — skipping")
            completed.append(str(out))
            continue

        log(f"\n{'='*55}")
        log(f"🎥 [{sid}] Veo 3.1 | {shot['duration']}s | us-central1")
        log(f"{'='*55}")
        log(f"📝 {shot['prompt'][:200]}...")

        op = client.models.generate_videos(
            model="veo-3.1-generate-001",
            prompt=shot["prompt"],
            config=types.GenerateVideosConfig(
                aspect_ratio="16:9",
                person_generation="allow_adult",
                number_of_videos=1,
            )
        )
        log(f"⚡ Operation: {op.name.split('/')[-1]}")

        op = poll_op(op, sid)
        log(f"✅ [{sid}] Generation complete!")

        if save_video(op, out, sid):
            completed.append(str(out))
            # Auto-open each clip for review
            subprocess.Popen(["open", str(out)])
            log(f"👁️  [{sid}] Opened for review")
        else:
            log(f"❌ [{sid}] Failed to save")

    log(f"\n{'='*55}")
    log(f"✅ {len(completed)}/{len(shots_to_run)} shots generated")

    if target == "all" and len(completed) == len(SHOTS):
        concat_clean(completed)
    else:
        for c in completed:
            sz = Path(c).stat().st_size // 1024 // 1024
            log(f"   📁 {Path(c).name} ({sz}MB)")

    manifest = OUTPUT / "v2_manifest.json"
    with open(manifest, "w") as f:
        json.dump({"completed": completed, "target": target}, f, indent=2)

if __name__ == "__main__":
    main()
