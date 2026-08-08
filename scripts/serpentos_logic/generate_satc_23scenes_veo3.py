#!/usr/bin/env python3
"""
🎬 Veo 3 Video Pipeline — SATC HBO Style 23 Scenes Generator
Generates clean cinematic video clips for each of the 23 scenes using Veo 3 API.
Includes mandatory [MOTION], [TECH], and [ANTI-STATIC] blocks per VIDEO PIPELINE rules.
"""

import os
import sys
import time
import argparse
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = REPO_ROOT / "outputs" / "satc_hbo_23scenes"

SCENES = {
    1: {
        "timecode": "t01.00s",
        "title": "Daytime Manhattan establishing walk",
        "prompt": """[MOTION] Continuous Steadicam backward tracking at hip height. Pink tulle midi skirt catches air with each step, natural fabric movement.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots, no cinematic pause. Super-16 film aesthetic.
[ANTI-STATIC] Start motion immediately from frame 1. Every second must contain visible movement.
Cinematic romantic comedy opening, Full HD 1920x1080, no audio, 24fps.
Daytime Manhattan, wide establishing shot. A stylish woman in a voluminous pink tulle midi skirt and nude kitten heels walks confidently toward camera on a broad Midtown sidewalk. Yellow taxis and warm-lit storefronts flank both sides, creating deep perspective. Super-16 film grain, lifted blacks, warm golden midtones, neutral-cool city shadows, high saturation. HBO prestige TV aesthetic."""
    },
    2: {
        "timecode": "t12.48s",
        "title": "Yellow bus passing behind woman",
        "prompt": """[MOTION] 35mm medium tracking shot, chest height. Bright yellow city bus passes left-to-right behind her with motion blur on bus wheels.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots, no cinematic pause.
[ANTI-STATIC] Start motion immediately from frame 1. Continuous walking and vehicular movement.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Midtown Manhattan sidewalk, late afternoon soft overcast light. Stylish woman walks left-to-right in frame, pink tulle skirt, nude pumps. A large bright yellow city bus passes behind her from left to right, creating a dynamic colour contrast against muted urban grey. Reflections on wet pavement. Warm tones, film grain, lifted blacks."""
    },
    3: {
        "timecode": "t17.35s",
        "title": "Skirt splashed reaction",
        "prompt": """[MOTION] Woman stops mid-step and looks down in surprise, glances back over shoulder toward passing bus. Slight push-in camera movement.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots, no cinematic pause.
[ANTI-STATIC] Start motion immediately from frame 1. Natural facial expression and head turning.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan street. The woman in pink tulle skirt stops mid-step, looks down in mild surprise. The front of her skirt is visibly splashed — a wet patch spreads across the tulle fabric. She glances back over her shoulder toward the passing bus with an amused, resigned expression. Soft comedic beat. Warm side light, shallow DoF, city bokeh background, 35mm film grain."""
    },
    4: {
        "timecode": "t19.88s",
        "title": "Walking past bus stop",
        "prompt": """[MOTION] 28mm wide tracking backward at her pace. Busy crosswalk and flowing yellow cabs in background.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Active background city traffic.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan sidewalk, bright midday. Wide shot. The woman walks on, now past the bus stop. Background: busy crosswalk, pedestrians blurred in bokeh, classic NYC yellow cabs, glass building facades reflecting sky. The city feels alive and energetic around her solitary confident figure. Warm saturated palette, lifted shadows, airy and glamorous."""
    },
    5: {
        "timecode": "t21.64s",
        "title": "Passing athletic man glance",
        "prompt": """[MOTION] 35mm arc tracking both figures as they pass each other. Subtle eye contact and natural smiles.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Both characters walking continuously.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, golden afternoon light. Medium two-shot. The woman walks on the left of frame. An attractive athletic man in his mid-30s enters from the right — rolled-up sleeves, work trousers, relaxed posture. Their eyes meet briefly as they pass each other. He gives a subtle, genuine smile. She glances back with a half-smile, keeps walking. Natural easy chemistry, no exaggeration. Warm rim light catches her hair. Film grain, lifted blacks."""
    },
    6: {
        "timecode": "t23.71s",
        "title": "Fruit stand browsing apple",
        "prompt": """[MOTION] Static camera with subtle handheld drift. Woman picks up a red apple and examines it.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Natural hand and facial movement.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Lower Manhattan street corner, warm soft daylight. Medium shot. The woman pauses near a vibrant open-air fruit stand — wooden crates stacked with red apples, oranges, green limes, bright colour pops against the grey urban background. The cheerful vendor in a casual vest nods at her. She browses, picks up a red apple, examines it with a thoughtful, amused expression. Rich warm tones, natural market textures."""
    },
    7: {
        "timecode": "t24.92s",
        "title": "Catching tossed apple mid-stride",
        "prompt": """[MOTION] 35mm gentle follow-track. Fruit vendor tosses red apple underhand; woman catches it one-handed without breaking stride.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Fluid walking and catching motion.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan sidewalk, midday. Medium shot, chest height. The woman walks forward, the fruit vendor behind her casually tosses a red apple underhand toward her. Without breaking stride, she catches the apple one-handed, smooth and natural, doesn't look back. Subtle comedic confidence. Shallow DoF, bokeh of street and pedestrians behind. Warm golden tones, film grain."""
    },
    8: {
        "timecode": "t26.19s",
        "title": "Low angle avenue towers",
        "prompt": """[MOTION] 28mm low angle backward tracking shot along busy avenue. Traffic and sky reflections moving on glass facade.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Continuous character walk and background traffic.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Midtown Manhattan, afternoon. Wide shot. The woman walks along a busy avenue. To her right, a large glass-fronted building reflects the sky and passing traffic. Scale of city towers around her emphasises her small figure but confident presence. Warm golden backlight halos her silhouette, dramatic contrast with blue-grey building glass. Super-16 grain, high contrast."""
    },
    9: {
        "timecode": "t28.40s",
        "title": "Crowd flow crosswalk",
        "prompt": """[MOTION] Static 50mm eye level shot. Crowd streaming past in motion blur while heroine pauses briefly looking off-frame left.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Flowing crowd movement around subject.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, busy crosswalk, golden hour. Medium shot. The woman stands at a pedestrian crossing among a flowing crowd of New Yorkers — all moving purposefully, she looks off-frame left with a knowing smile. Crowd streams past her in motion blur, she remains sharp. Warm backlight, film grain, rich shadows."""
    },
    10: {
        "timecode": "t30.35s",
        "title": "Shop window reflection intersection",
        "prompt": """[MOTION] 35mm tracking shot alongside sleek shop window. Woman walking while man's reflection walks on opposite side.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Continuous camera track and moving reflection.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan boutique district, daylight. Medium two-shot. The woman walks past a sleek shop window. Reflected in the glass: the attractive man from earlier, now on the opposite side of the street, also walking. Their reflections overlap briefly in the glass as real paths diverge. Romantic visual metaphor. Warm tones, shallow DoF, film grain."""
    },
    11: {
        "timecode": "t31.05s",
        "title": "Close up micro smile reaction",
        "prompt": """[MOTION] 85mm close-up with subtle organic breathing/movement. Eyes light up and micro-smile forms naturally.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Living facial expression and bokeh movement.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, afternoon. Close-up on the woman's face. She has clocked the man's reflection in the window. Her expression: caught between amusement and genuine interest, a micro-smile forms. Eyes light up. Warm side key light, natural fill, lifted blacks, film grain."""
    },
    12: {
        "timecode": "t31.79s",
        "title": "Turning corner quiet side street biting apple",
        "prompt": """[MOTION] 35mm gentle arc around corner. Woman exhales, relaxes shoulders, and bites into red apple.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Smooth character turn and biting motion.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, afternoon light. Medium shot. The woman turns the corner onto a quieter side street. The energy shifts — fewer pedestrians, tree-lined block, dappled light through urban tree canopy. She exhales, relaxed, drops her shoulders, bites into the red apple she caught earlier. Warm dappled natural light, bokeh trees, film grain."""
    },
    13: {
        "timecode": "t33.01s",
        "title": "Strolling side street fashionable background",
        "prompt": """[MOTION] 28mm backward tracking shot. Woman strolling with apple, stylish pedestrians walking in background bokeh.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Continuous walking and dappled light play.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan side street, dappled afternoon sun. Wide shot. The woman strolling alone, apple in hand, relaxed pace. Three or four other stylishly dressed women walk at distance behind her, slightly out of focus, adding depth and a sense of the city's fashionable world. Warm late-afternoon golden tones, natural bokeh, light tree shadow patterns on pavement, film grain."""
    },
    14: {
        "timecode": "t35.11s",
        "title": "Brownstone stoop nod",
        "prompt": """[MOTION] 40mm slight push-in. Woman walks past brownstone stoop while seated reader looks up over glasses and nods.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Continuous walking and natural head movement.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, late afternoon. Medium shot. The woman passes in front of a classic brownstone stoop. An older elegant woman sits on the steps reading a paperback, looks up over her glasses and gives the woman a slow, approving once-over, then returns to her book with the faintest nod. Warm amber brownstone tones, gentle soft light, film grain, lifted shadows."""
    },
    15: {
        "timecode": "t37.12s",
        "title": "Luxury car reflections tulle billowing",
        "prompt": """[MOTION] 35mm very low angle following at wheel height rising to mid-body. Tulle skirt billows in evening breeze.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Camera rise and flowing fabric movement.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, golden hour. Low-angle medium shot. The woman walks past a row of parked luxury cars, their polished surfaces reflecting distorted warm city light. Her tulle skirt billows beautifully against the graphic line of car roofs. Glamorous cinematic composition, high contrast golden side-light, deep shadows, film grain."""
    },
    16: {
        "timecode": "t38.83s",
        "title": "Dusk transition glowing avenue",
        "prompt": """[MOTION] 28mm backward tracking slowing down. Woman walking toward camera on pavement with glowing streetlights.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Continuous walk and cinematic dusk atmosphere.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan avenue, early evening light. Wide shot. The city is transitioning to dusk — streetlights beginning to glow warm amber, sky shifting to deep blue above warm building tops. The woman walks toward the camera on an empty stretch of pavement, city glowing behind her. Epic urban romantic atmosphere. Lifted blacks, warm neon and streetlight tones mixing with cool sky, film grain, long subtle lens flare."""
    },
    17: {
        "timecode": "t40.81s",
        "title": "Spontaneous laugh at lamppost",
        "prompt": """[MOTION] 50mm static camera. Woman rounds corner, stops holding lamppost, laughing spontaneously with skirt swaying.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Lively spontaneous laughter and skirt motion.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, early evening. Medium shot. The woman rounds a corner and stops with a spontaneous laugh — something off-camera amuses her. She steadies herself, one hand on a lamppost. Her laughter is genuine, unguarded. Pink tulle skirt sways with the movement. Warm lamppost backlight, city dusk bokeh behind. Film grain, lifted blacks."""
    },
    18: {
        "timecode": "t41.77s",
        "title": "Lamppost hand tilt up to smiling profile",
        "prompt": """[MOTION] 100mm macro-close slow tilt up from hand on lamppost along arm to smiling three-quarter profile.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Smooth upward camera movement and expressive smile.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, early evening. Close-up. The woman's hand on the lamppost — cream leather crossbody bag strap visible, gold clasp catching warm streetlight. Slow rise from hand up her arm to three-quarter profile of her face — she's still smiling, looking ahead. Intimate and cinematic. Warm orange-gold streetlight, soft cool fill, shallow DoF, film grain."""
    },
    19: {
        "timecode": "t42.50s",
        "title": "Elevated wide dusk crossing",
        "prompt": """[MOTION] High static 35mm slowly pulling back to reveal vast glittering Manhattan dusk city lights.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Smooth pull-back and walking figure crossing street.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan dusk. Wide shot, from elevated angle across an intersection. The woman is small in frame, crossing the street alone, city lights beginning to sparkle around her. Camera slowly pulling back to reveal the vast glittering city. Urban romantic scale. Deep blue dusk sky, warm amber and gold city lights below, high contrast, film grain."""
    },
    20: {
        "timecode": "t43.82s",
        "title": "Across street recognition smile",
        "prompt": """[MOTION] 50mm two-axis split frame. Both characters walking on opposite sidewalks pause briefly and smile across traffic.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Dynamic street traffic between two figures.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, dusk. Medium shot. The man appears across the street, walking the same direction but opposite sidewalk. He spots her — stops for a beat. She spots him — pauses. Both slightly smile. City flows between them. Warm evening tones, blue dusk sky, film grain."""
    },
    21: {
        "timecode": "t46.38s",
        "title": "Night energetic neon avenue walk",
        "prompt": """[MOTION] Fast 28mm backward tracking matching her energetic walk. Neon signs reflecting on pink tulle skirt.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Fast confident walking cadence and moving city lights.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, night. Wide shot. The woman back on a busy lit avenue, energy restored — city fully alive with neon and headlights. She walks with renewed confidence, tulle skirt lit pink-amber by neon signage. Iconic Manhattan nightscape. High contrast neon palette, electric blues and warm ambers, film grain."""
    },
    22: {
        "timecode": "t50.22s",
        "title": "Grand intersection dolly-in climax",
        "prompt": """[MOTION] Low angle 28mm slow dolly-in toward heroine facing camera in grand Times Square-adjacent intersection.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Continuous dolly movement and active background headlights.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, night. Climactic wide shot. The woman in the centre of a grand intersection — Times Square-adjacent energy, glowing billboards behind (no legible text), streams of yellow cab headlights, neon reflections on wet asphalt. She faces camera directly, takes a breath, fully at home in this city. Triumphant, warm, cinematic. Film grain, high contrast, rich neon palette, deep shadows."""
    },
    23: {
        "timecode": "t53.75s",
        "title": "Final intimate look into camera",
        "prompt": """[MOTION] Static 85mm close-up. Quiet knowing smile looking into camera, then glancing away back toward city lights.
[TECH] Video: 24fps, continuous motion every frame, no freeze-frames, no static shots.
[ANTI-STATIC] Start motion immediately from frame 1. Subtle natural breathing and gaze shift.
Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan night, calm side street. Final shot. Close-up on the woman's face — three-quarter angle, soft warm streetlight from the left, deep cool blue shadow on the right. She looks directly into the camera for one long beat, a quiet knowing smile. Then glances away, back to the city. Perfectly static camera, very shallow DoF, bokeh city lights behind. Film grain, warm-cool split tone, lifted blacks."""
    }
}


def get_all_api_keys():
    keys = ["AIzaSyBL6hl0I-7UEV_q3rvGbw-fARhCSPiZ63w"]
    try:
        res = subprocess.run(
            ["doppler", "secrets", "get", "GEMINI_API_KEY", "--plain", "--project", "serpent", "--config", "prd"],
            capture_output=True, text=True, check=False
        )
        k = res.stdout.strip()
        if k and k not in keys:
            keys.append(k)
    except Exception:
        pass
    try:
        res = subprocess.run(
            ["doppler", "secrets", "get", "GEMINI_API_KEYS", "--plain", "--project", "serpent", "--config", "prd"],
            capture_output=True, text=True, check=False
        )
        if res.stdout.strip():
            for k in res.stdout.replace("\n", ",").split(","):
                k = k.strip()
                if k and k not in keys:
                    keys.append(k)
    except Exception:
        pass
    return keys


def generate_scene(scene_num: int, model_name: str = "veo-3.1-generate-preview", use_vertex: bool = False):
    if scene_num not in SCENES:
        print(f"❌ Scene {scene_num} not found. Must be 1..23")
        return None

    scene = SCENES[scene_num]
    output_path = OUTPUT_DIR / f"scene_{scene_num:02d}_{scene['timecode'].replace('.', '_')}.mp4"
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"\n==================================================")
    print(f"🎬 VEO 3 GENERATING SCENE #{scene_num:02d} ({scene['timecode']}): {scene['title']}")
    print(f"   Output: {output_path}")
    print(f"==================================================")

    from google import genai
    from google.genai import types

    if use_vertex:
        project_id = "project-f91a723f-af1b-4dd2-ba3"
        location = "us-central1"
        print(f"🌍 Connecting to Vertex AI (`{project_id}` @ `{location}`)...")
        client = genai.Client(vertexai=True, project=project_id, location=location)
        if "-001" not in model_name:
            model_name = "veo-3.1-fast-generate-001"
        models_to_try = [model_name, "veo-3.1-generate-001", "veo-3.0-fast-generate-001"]
        keys = [None]
    else:
        keys = get_all_api_keys()
        if not keys:
            print("❌ Error: No GEMINI_API_KEY found in Doppler.")
            return None

        # NEVER use GOOGLE_API_KEY env var
        os.environ.pop("GOOGLE_API_KEY", None)

        models_to_try = [model_name]
        if model_name == "veo-3.1-generate-preview":
            models_to_try.append("veo-3.1-fast-generate-preview")

    config = types.GenerateVideosConfig(aspect_ratio="16:9")

    anti_text = "[ANTI-TEXT] ABSOLUTELY NO text overlays, NO titles, NO credits, NO logos, NO watermarks, NO written words on screen. Pure clean cinematic live-action footage only.\n\n"
    full_prompt = anti_text + scene["prompt"]

    operation = None
    client_instance = None
    for m_name in models_to_try:
        for idx, api_key in enumerate(keys):
            if use_vertex:
                print(f"🚀 Trying Vertex AI model `{m_name}`...")
                client_instance = client
            else:
                print(f"🚀 Trying Studio model `{m_name}` with API Key #{idx+1}/{len(keys)}...")
                client_instance = genai.Client(api_key=api_key)
            try:
                operation = client_instance.models.generate_videos(
                    model=m_name,
                    prompt=full_prompt,
                    config=config,
                )
                break
            except Exception as e:
                err_str = str(e)
                if not use_vertex and ("429" in err_str or "RESOURCE_EXHAUSTED" in err_str):
                    print(f"   ⚠️ Key #{idx+1} hit 429 quota on `{m_name}`. Trying next...")
                    continue
                elif not use_vertex and ("400" in err_str or "INVALID_ARGUMENT" in err_str or "API_KEY_INVALID" in err_str):
                    print(f"   ⚠️ Key #{idx+1} invalid (400). Skipping...")
                    continue
                else:
                    print(f"   ⚠️ Error on `{m_name}`: {e}")
                    continue
        if operation:
            break

    if not operation and not use_vertex:
        print("⚠️ All API Studio keys hit quota limit. Automatic failover to Vertex AI (us-central1)...")
        return generate_scene(scene_num, model_name="veo-3.1-fast-generate-001", use_vertex=True)

    if not operation:
        print("❌ All generation attempts failed.")
        return None

    print(f"⏳ Operation created: {operation.name}")

    start_t = time.time()
    poll = 0
    while not operation.done:
        poll += 1
        elapsed = time.time() - start_t
        print(f"   ⏳ Polling #{poll} ({elapsed:.0f}s elapsed)...")
        time.sleep(15)
        operation = client.operations.get(operation)

    elapsed = time.time() - start_t
    print(f"✅ Generation completed in {elapsed:.0f}s")

    if operation.response and operation.response.generated_videos:
        video = operation.response.generated_videos[0]
        video.video.save(str(output_path))
        mb = output_path.stat().st_size / (1024 * 1024)
        print(f"🎉 Saved Scene #{scene_num:02d} -> {output_path} ({mb:.2f} MB)")
        return output_path
    else:
        print(f"❌ Generation finished without video output for Scene #{scene_num:02d}")
        if hasattr(operation, "error") and operation.error:
            print(f"Error: {operation.error}")
        return None


def main():
    parser = argparse.ArgumentParser(description="Generate 23 SATC HBO Scenes with Veo 3")
    parser.add_argument("--scene", type=int, default=1, help="Scene number (1 to 23)")
    parser.add_argument("--all", action="store_true", help="Generate all 23 scenes sequentially")
    parser.add_argument("--model", type=str, default="veo-3.1-generate-preview", help="Veo model name")
    parser.add_argument("--vertex", action="store_true", help="Use Vertex AI instead of Studio API Key")
    args = parser.parse_args()

    if args.all:
        for num in sorted(SCENES.keys()):
            generate_scene(num, model_name=args.model, use_vertex=args.vertex)
    else:
        generate_scene(args.scene, model_name=args.model, use_vertex=args.vertex)


if __name__ == "__main__":
    main()
