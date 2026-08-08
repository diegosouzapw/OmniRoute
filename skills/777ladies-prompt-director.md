# Skill: 777ladies-prompt-director

## Purpose

Direct and generate production-ready prompts for ALL 777ladies content:
video shots, images, music, typography — all through the 777ladies lens.

## Trigger

Any content creation request tagged with `#777ladies` or routed to `777ladies-director-agent`.

## The Director's Vocabulary

### For Video (Veo3 / Wan2.1 / Kling)

```
CINEMATIC FORMULA:
"[camera move], [subject description], [environment: Manhattan/luxury interior/street],
[lighting: golden hour/evening tungsten/soft window light],
[texture detail], [mood: confident/intimate/nostalgic],
[technical: 24fps, 85mm, f/1.8, analog grain, Kodak Portra 400 LUT]"
```

### For Images (Imagen3 / Midjourney / Flux)

```
EDITORIAL FORMULA:
"fashion editorial photograph, [subject], [location: Upper East Side/Central Park/Plaza Hotel],
[styling: [season] collection, designer pieces],
[lighting: [direction] soft light], [color grade: Portra 400 film],
[publication: Vogue/Harper's Bazaar aesthetic], --ar 4:5 --style raw"
```

### For Music (Suno / Udio)

```
SOUNDTRACK FORMULA:
"[era: late 90s/early 2000s] [genre: orchestral pop/jazz-influenced/string quartet],
Manhattan sophistication, [mood] energy,
cosmo cocktail atmosphere, Carrie Bradshaw walks into the party,
no vocals, 110-125 BPM, elegant, timeless"
```

### For Typography (Remotion)

```
TYPO FORMULA:
Font: Didot or Bodoni
Weight: Light or Regular
Color: Champagne gold on black, or Ivory on burgundy
Animation: Slow fade-in, letter-spacing expand
Timing: 0.8s per word, generous pauses
```

## Shot Library (6 canonical 777ladies shots)

| Shot | Duration | Description                                  | Camera           | Veo3 Config                     |
| ---- | -------- | -------------------------------------------- | ---------------- | ------------------------------- |
| S01  | 3s       | Establishing Manhattan skyline at dusk       | Aerial slow push | `configs/shot_01_skyline.json`  |
| S02  | 3s       | Protagonist walks out of Plaza Hotel         | 35mm tracking    | `configs/shot_02_plaza.json`    |
| S03  | 4s       | Close-up: champagne glass, silk dress detail | 85mm macro       | `configs/shot_03_detail.json`   |
| S04  | 3s       | Street fashion editorial, Madison Ave        | 50mm             | `configs/shot_04_street.json`   |
| S05  | 4s       | Interior: luxury apartment, golden light     | 35mm dolly       | `configs/shot_05_interior.json` |
| S06  | 3s       | Title card: "777ladies" in Bodoni            | Static           | `configs/shot_06_title.json`    |

## Workflow

1. Receive brief → classify as video/image/music/type
2. Apply 777ladies-visual-style validation
3. Generate prompt using correct formula
4. Score with style_score (must be ≥ 85 for production)
5. If score < 85 → iterate max 3 times
6. Output final prompt + style_score + production notes

## Input Format

```json
{
  "brief": "string",
  "content_type": "video | image | music | typography",
  "shot_reference": "S01-S06 (optional)",
  "custom_elements": "string (optional)"
}
```

## Output Format

```json
{
  "final_prompt": "string",
  "style_score": "number (0-100)",
  "content_type": "string",
  "model_recommendation": "Veo3 | Wan2.1 | Imagen3 | Suno | Remotion",
  "production_notes": "string",
  "ready_for_production": "boolean"
}
```
