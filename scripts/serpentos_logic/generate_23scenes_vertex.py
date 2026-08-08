#!/usr/bin/env python3
"""
generate_23scenes_vertex.py — All 23 SATC HBO scenes via Vertex AI Agent Platform.
No titles, no text overlays. Pure cinematic footage.
Auto-copies each clip to /Users/work/Movies/sex new/last veo/
"""

import json
import shutil
import sys
import time
from pathlib import Path
from google import genai
from google.genai import types

OUTPUT_DIR = Path("/Users/work/serpentos/outputs/satc_hbo_23scenes")
MIRROR_DIR = Path("/Users/work/Movies/sex new/last veo")

PROJECT = "project-f91a723f-af1b-4dd2-ba3"
LOCATION = "us-central1"
MODELS = ["veo-3.1-fast-generate-001", "veo-3.0-fast-generate-001"]

ANTI_TEXT = "[ANTI-TEXT] ABSOLUTELY NO text overlays, NO titles, NO credits, NO logos, NO watermarks, NO written words on screen. Pure clean cinematic live-action footage only.\n\n"

CHARACTER_LOCK = """[CHARACTER LOCK — apply identically to EVERY shot]
The woman: iconic New York female writer/columnist character, late 30s, slender athletic posture, oval face with high defined cheekbones, subtle knowing confident smile.
HAIR: Sun-kissed multi-tonal honey-blonde hair with platinum highlights, naturally wavy and loosely curly, voluminous, slightly tousled and windblown, falling past shoulders.
EYES: Expressive hazel-brown almond eyes, direct self-assured gaze.
OUTFIT (fixed across ALL scenes, exact match to original reference):
- Vibrant bubblegum-pink fitted scoop-neck tank top
- Iconic voluminous multi-layered white tulle tutu skirt (ballet style, airy and flouncy)
- Strappy nude heels
- Small cream leather shoulder bag
MANNER: walks with effortless New York street elegance, confident stride, natural grace, sophisticated urban chic.
seed: 42001

"""

DECORATION_LOCK = """[LOCATION & DECORATION CONSISTENCY]
Setting: Manhattan, New York City — real NYC architecture and street life.
Time progression across scenes: Midday golden sun → Late afternoon → Golden hour → Dusk → Night.
Recurring visual anchors: yellow NYC taxis, glass skyscraper facades, brownstone stoops, tree-lined side streets, neon-lit avenues at night, wet asphalt reflections.
No fantasy elements. No futuristic. No suburban. Strictly recognisable NYC Midtown/Downtown geography.

"""

SCENE_STYLE = """[CINEMATIC STYLE LOCK — apply to ALL shots]
Film stock: Super-16mm / 35mm Kodak Vision3 aesthetic.
Colour grade: Lifted blacks, warm golden midtones, neutral-cool shadows, high saturation.
Grain: Visible organic film grain on every frame.
Lighting: Natural available light with cinematic key/fill. Golden hour rim light where applicable.
Aspect ratio: 16:9 (1920x1080). Frame rate: 24fps. No audio.
Tone: HBO prestige romantic comedy — warm, confident, intimate, never vulgar.

"""

SCENES = {
    1: {
        "tc": "t01_00s", "dur": 4,
        "prompt": """Cinematic romantic comedy opening, Full HD 1920x1080, no audio, 24fps.
Daytime Manhattan, wide establishing shot. A stylish woman in a voluminous pink tulle midi skirt and nude kitten heels walks confidently toward camera on a broad Midtown sidewalk. Camera: 28mm backward tracking, hip height, Steadicam smooth. Yellow taxis and warm-lit storefronts flank both sides, creating deep perspective. Tulle skirt catches air with each step, natural movement. Super-16 film grain, lifted blacks, warm golden midtones, neutral-cool city shadows, high saturation. HBO prestige TV aesthetic."""
    },
    2: {
        "tc": "t12_48s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Midtown Manhattan sidewalk, late afternoon soft overcast light. Same stylish woman walks left-to-right in frame, pink tulle skirt, nude pumps. Camera: 35mm medium tracking shot, chest height, slight arc. A large bright yellow city bus passes behind her from left to right, momentarily obscuring the background buildings. The bus creates a dynamic colour contrast against the muted urban grey. Motion blur on bus wheels, reflections on wet pavement. Warm tones, film grain, lifted blacks."""
    },
    3: {
        "tc": "t17_35s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan street. The woman in pink tulle skirt stops mid-step, looks down in mild surprise. Camera: 35mm medium shot, eye level, slight push-in. The front of her skirt is visibly splashed — a wet patch spreads across the tulle fabric. She glances back over her shoulder toward the passing bus with an amused, resigned expression. Soft comedic beat. Warm side light, shallow DoF, city bokeh background, 35mm film grain."""
    },
    4: {
        "tc": "t19_88s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan sidewalk, bright midday. Wide shot. The woman walks on, now past the bus stop. Background: busy crosswalk, pedestrians blurred in bokeh, classic NYC yellow cabs, glass building facades reflecting sky. Camera: 28mm wide tracking backward at her pace. The city feels alive and energetic around her solitary confident figure. Warm saturated palette, lifted shadows, airy and glamorous."""
    },
    5: {
        "tc": "t21_64s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, golden afternoon light. Medium two-shot. The woman walks on the left of frame. An attractive athletic man in his mid-30s enters from the right — rolled-up sleeves, work trousers, relaxed posture. Camera: 35mm, slight arc tracking both figures. Their eyes meet briefly as they pass each other. He gives a subtle, genuine smile. She glances back with a half-smile, keeps walking. Natural easy chemistry, no exaggeration. Warm rim light catches her hair. Film grain, lifted blacks."""
    },
    6: {
        "tc": "t23_71s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Lower Manhattan street corner, warm soft daylight. Medium shot. The woman pauses near a vibrant open-air fruit stand — wooden crates stacked with red apples, oranges, green limes, bright colour pops against the grey urban background. Camera: 40mm, static with slight handheld drift. The cheerful vendor in a casual vest nods at her. She browses, picks up a red apple, examines it with a thoughtful, amused expression. Rich warm tones, natural market textures."""
    },
    7: {
        "tc": "t24_92s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan sidewalk, midday. Medium shot, chest height. The woman walks forward, the fruit vendor behind her casually tosses a red apple underhand toward her. Camera: 35mm, gentle follow-track. Without breaking stride, she catches the apple one-handed, smooth and natural, doesn't look back. Subtle comedic confidence. Shallow DoF, bokeh of street and pedestrians behind. Warm golden tones, film grain."""
    },
    8: {
        "tc": "t26_19s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Midtown Manhattan, afternoon. Wide shot. The woman walks along a busy avenue. To her right, a large glass-fronted building reflects the sky and passing traffic. Camera: 28mm, low angle, backward tracking. Scale of city towers around her emphasises her small figure but confident presence. Warm golden backlight halos her silhouette, dramatic contrast with blue-grey building glass. Super-16 grain, high contrast."""
    },
    9: {
        "tc": "t28_40s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, busy crosswalk, golden hour. Medium shot. The woman stands at a pedestrian crossing among a flowing crowd of New Yorkers — all moving purposefully, she is the only one still for a half-beat, looking off-frame left with a knowing smile. Camera: 50mm, eye level, static. Crowd streams past her in motion blur, she remains sharp. Warm backlight, film grain, rich shadows."""
    },
    10: {
        "tc": "t30_35s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan boutique district, daylight. Medium two-shot. The woman walks past a sleek shop window. Reflected in the glass: the attractive man from earlier, now on the opposite side of the street, also walking. Their reflections overlap briefly in the glass as real paths diverge. Camera: 35mm, tracking shot alongside the window. Romantic visual metaphor. Warm tones, shallow DoF, film grain."""
    },
    11: {
        "tc": "t31_05s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, afternoon. Close-up on the woman's face. She has clocked the man's reflection in the window. Camera: 85mm, very shallow DoF, city bokeh behind. Her expression: caught between amusement and genuine interest, a micro-smile forms. Eyes light up. Warm side key light, natural fill, lifted blacks, film grain."""
    },
    12: {
        "tc": "t31_79s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, afternoon light. Medium shot. The woman turns the corner onto a quieter side street. The energy shifts — fewer pedestrians, tree-lined block, dappled light through urban tree canopy. Camera: 35mm, gentle arc from behind. She exhales, relaxed, drops her shoulders, bites into the red apple she caught earlier. Warm dappled natural light, bokeh trees, film grain."""
    },
    13: {
        "tc": "t33_01s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan side street, dappled afternoon sun. Wide shot. The woman strolling alone, apple in hand, relaxed pace. Three or four other stylishly dressed women walk at distance behind her, slightly out of focus, adding depth and a sense of the city's fashionable world. Camera: 28mm backward tracking. Warm late-afternoon golden tones, natural bokeh, light tree shadow patterns on pavement, film grain."""
    },
    14: {
        "tc": "t35_11s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, late afternoon. Medium shot. The woman passes in front of a classic brownstone stoop. An older elegant woman sits on the steps reading a paperback, looks up over her glasses and gives the woman a slow, approving once-over, then returns to her book with the faintest nod. Camera: 40mm static with slight push-in. Warm amber brownstone tones, gentle soft light, film grain, lifted shadows."""
    },
    15: {
        "tc": "t37_12s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, golden hour. Low-angle medium shot. The woman walks past a row of parked luxury cars, their polished surfaces reflecting distorted warm city light. Camera: 35mm, very low angle, following at wheel height then rising to mid-body. Her tulle skirt billows beautifully against the graphic line of car roofs. Glamorous cinematic composition, high contrast golden side-light, deep shadows, film grain."""
    },
    16: {
        "tc": "t38_83s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan avenue, early evening light. Wide shot. The city is transitioning to dusk — streetlights beginning to glow warm amber, sky shifting to deep blue above warm building tops. The woman walks toward the camera on an empty stretch of pavement, city glowing behind her. Camera: 28mm backward tracking, gradually slowing. Epic urban romantic atmosphere. Lifted blacks, warm neon and streetlight tones mixing with cool sky, film grain, long subtle lens flare."""
    },
    17: {
        "tc": "t40_81s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, early evening. Medium shot. The woman rounds a corner and stops with a spontaneous laugh — something off-camera amuses her. Camera: 50mm, static. She steadies herself, one hand on a lamppost. Her laughter is genuine, unguarded. Pink tulle skirt sways with the movement. Warm lamppost backlight, city dusk bokeh behind. Film grain, lifted blacks."""
    },
    18: {
        "tc": "t41_77s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, early evening. Close-up. The woman's hand on the lamppost — cream leather crossbody bag strap visible, gold clasp catching warm streetlight. Camera: macro-close 100mm, static. Slow rise from hand up her arm to three-quarter profile of her face — she's still smiling, looking ahead. Intimate and cinematic. Warm orange-gold streetlight, soft cool fill, shallow DoF, film grain."""
    },
    19: {
        "tc": "t42_50s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan dusk. Wide shot, from elevated angle across an intersection. The woman is small in frame, crossing the street alone, city lights beginning to sparkle around her. Camera: high static 35mm, slowly pulling back to reveal the vast glittering city. Urban romantic scale. Deep blue dusk sky, warm amber and gold city lights below, high contrast, film grain."""
    },
    20: {
        "tc": "t43_82s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, dusk. Medium shot. The man from earlier appears across the street, walking the same direction but opposite sidewalk. He spots her — stops for a beat. She spots him — pauses. Both slightly smile. City flows between them. Camera: 50mm two-axis split — each on opposite thirds of the frame with blurred street traffic in between. Warm evening tones, blue dusk sky, film grain."""
    },
    21: {
        "tc": "t46_38s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, night. Wide shot. The woman back on a busy lit avenue, energy restored — city fully alive with neon and headlights. She walks with renewed confidence, tulle skirt lit pink-amber by neon signage. Camera: 28mm backward tracking, fast pace matching her energy. City fully in frame — iconic Manhattan nightscape. High contrast neon palette, electric blues and warm ambers, film grain."""
    },
    22: {
        "tc": "t50_22s", "dur": 4,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan, night. Climactic wide shot. The woman in the centre of a grand intersection — Times Square-adjacent energy, glowing billboards behind (no legible text), streams of yellow cab headlights, neon reflections on wet asphalt. Camera: low angle 28mm, slow dolly-in toward her. She faces camera directly, takes a breath, fully at home in this city. Triumphant, warm, cinematic. Film grain, high contrast, rich neon palette, deep shadows."""
    },
    23: {
        "tc": "t53_75s", "dur": 6,
        "prompt": """Cinematic romantic comedy, Full HD 1920x1080, no audio, 24fps.
Manhattan night, calm side street. Final shot. Close-up on the woman's face — three-quarter angle, soft warm streetlight from the left, deep cool blue shadow on the right. She looks directly into the camera for one long beat, a quiet knowing smile. Then glances away, back to the city. Camera: 85mm, perfectly static, very shallow DoF, bokeh city lights behind. Hold for 2 seconds. Slow fade to black. Film grain, warm-cool split tone, lifted blacks."""
    },
}


def generate_scene(client, scene_num, scene, model):
    fname = f"scene_{scene_num:02d}_{scene['tc']}.mp4"
    out = OUTPUT_DIR / fname
    if out.exists() and out.stat().st_size > 10000:
        mb = out.stat().st_size / 1024 / 1024
        print(f"   ⏭️  Exists: {fname} ({mb:.1f}MB)")
        mirror = MIRROR_DIR / fname
        if not mirror.exists():
            shutil.copy2(out, mirror)
        return out

    prompt = ANTI_TEXT + CHARACTER_LOCK + DECORATION_LOCK + SCENE_STYLE + scene["prompt"]
    dur = scene.get("dur", 4)

    config = types.GenerateVideosConfig(
        aspect_ratio="16:9",
        number_of_videos=1,
        duration_seconds=dur,
        person_generation="allow_all",
        seed=42001,
        enhance_prompt=False,
        negative_prompt="different woman, changed clothes, wrong outfit, dark black hair, red hair, short hair, blue dress, jeans only without tutu, pants, red dress, text, subtitles, watermark, title, credits, blurry face, deformed hands, morphed face, celebrity likeness",
    )

    try:
        op = client.models.generate_videos(model=model, prompt=prompt, config=config)
        op_id = op.name.split("/")[-1][:12]
        print(f"   ⏳ Op {op_id}...")
        elapsed = 0
        while not op.done:
            time.sleep(15)
            elapsed += 15
            print(f"      [{elapsed}s]...")
            op = client.operations.get(op)

        if op.error:
            msg = op.error.get("message", str(op.error))[:120]
            print(f"   ❌ {msg}")
            return None

        result = op.result
        if not result or not result.generated_videos:
            print(f"   ❌ Empty result")
            return None

        video = result.generated_videos[0]
        v = video.video
        saved = False
        if getattr(v, "video_bytes", None):
            out.write_bytes(v.video_bytes)
            saved = True
        elif getattr(v, "uri", None):
            uri = v.uri
            if uri.startswith("gs://"):
                import subprocess
                subprocess.run(["gcloud", "storage", "cp", uri, str(out)], check=True)
                saved = True
            elif uri.startswith("http://") or uri.startswith("https://"):
                import urllib.request
                urllib.request.urlretrieve(uri, str(out))
                saved = True
            else:
                content = client.files.download(file=uri)
                out.write_bytes(content)
                saved = True
        if not saved or not out.exists() or out.stat().st_size == 0:
            print(f"   ❌ Failed to save video from object: {v}")
            return None

        mb = out.stat().st_size / 1024 / 1024
        print(f"   ✅ {fname} ({mb:.1f}MB)")

        mirror = MIRROR_DIR / fname
        shutil.copy2(out, mirror)
        print(f"   📁 → last veo/{fname}")
        return out

    except Exception as e:
        print(f"   ❌ {str(e)[:150]}")
        return None


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", type=int, default=1, help="Start scene number")
    parser.add_argument("--end", type=int, default=23, help="End scene number")
    parser.add_argument("--only", type=int, nargs="*", help="Generate only these scenes")
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    MIRROR_DIR.mkdir(parents=True, exist_ok=True)

    client = genai.Client(vertexai=True, project=PROJECT, location=LOCATION)

    if args.only:
        scene_nums = [n for n in args.only if n in SCENES]
    else:
        scene_nums = [n for n in range(args.start, args.end + 1) if n in SCENES]

    total = len(scene_nums)
    print("=" * 60)
    print(f"🎬 SATC HBO 23 SCENES — VERTEX AI AGENT PLATFORM")
    print(f"   Scenes: {scene_nums[0]}–{scene_nums[-1]} ({total} total)")
    print(f"   Project: {PROJECT} | Region: {LOCATION}")
    print(f"   Output: {OUTPUT_DIR}")
    print(f"   Mirror: {MIRROR_DIR}")
    print("=" * 60)

    done, failed = 0, 0
    for idx, num in enumerate(scene_nums, 1):
        scene = SCENES[num]
        print(f"\n[{idx}/{total}] 🎬 Scene {num:02d} ({scene['tc']})")
        result = None
        for model in MODELS:
            print(f"   🚀 {model}")
            result = generate_scene(client, num, scene, model)
            if result:
                done += 1
                break
            time.sleep(3)
        if not result:
            failed += 1

    print(f"\n{'=' * 60}")
    print(f"📊 {done}/{total} OK | {failed} failed")
    print(f"   {OUTPUT_DIR}")
    print(f"   {MIRROR_DIR}")

    # List all files in mirror
    files = sorted(MIRROR_DIR.glob("scene_*.mp4"))
    if files:
        total_mb = sum(f.stat().st_size for f in files) / 1024 / 1024
        print(f"   📁 {len(files)} clips in last veo/ ({total_mb:.0f}MB total)")
    print("=" * 60)


if __name__ == "__main__":
    main()
