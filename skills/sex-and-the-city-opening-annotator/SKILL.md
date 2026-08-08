---
name: sex-and-the-city-opening-annotator
description: Downloads the Sex and the City opening credits from YouTube, splits into shots via scene-boundary detection, sends 1fps frames to Gemini 2.5 Pro Vision for cinematic annotation (composition, camera, lighting, color, blocking, fonts, editing rhythm, semantic content), merges PDF directives per shot, and builds generation_prompt for each shot. Outputs /data/opening_shots.json with 18 shots, 1920x1080 / 24fps / Rec.709 / H.264 / audio:false metadata.
version: "1.0"
author: huivrotiki/serpentos
tags: [video, cinema, shotdeck, hollywood, satc, gcp, gemini-vision]
---

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `video_url` | string | `https://www.youtube.com/watch?v=X453aKQgob4` |
| `pdf_directives_path` | string | `/data/pdf_directives.json` (output of pdf-directives-integrator) |
| `output_path` | string | `/data/opening_shots.json` |

## Output Schema (per shot)

```json
{
  "shot_id": "SATC_001", "sequence_order": 1,
  "timestamp_range": "00:00:00-00:00:03",
  "composition": "Wide establishing shot. Manhattan at golden hour...",
  "camera": {"lens": "85mm equiv, shallow DoF", "movement": "slow push-in handheld", "angle": "eye level"},
  "lighting": {"key_light": "golden hour sun side-back rim", "fill": "building glass bounce 4500K", "contrast": "high", "color_temperature": "4200K"},
  "color_palette": {"dominant": ["#F4A460","#1C1C2E","#FFD700"], "saturation": "High +30%", "contrast": "High", "grain": "light 35mm"},
  "blocking_and_motion": "Carrie walks confidently, hip sway. Bus splashes puddle — comedic beat. Pink tutu dress.",
  "font_and_titles": {"family": "Didot-inspired serif", "text": "SEX AND THE CITY", "animation": "fade-in letter-by-letter 1.2s", "color": "#FFFFFF soft drop-shadow", "position": "center lower-third"},
  "editing_rhythm": {"duration_seconds": 3.2, "transition_in": "Cut", "transition_out": "Cut", "tempo": "moderate, matches musical downbeat"},
  "semantic_content": "Establishes glamour + comedy + NYC. Carrie = protagonist guide.",
  "constraints_from_pdf": [],
  "generation_prompt": "Cinematic Full HD 1920x1080, no audio. Golden hour NYC Fifth Avenue. Stylish woman pink tutu dress walks confidently toward camera, 85mm shallow DoF, slow push-in handheld, warm 4200K side-back rim, high contrast, light 35mm grain, vibrant colors. Title 'SEX AND THE CITY' fades letter-by-letter white Didot serif lower-center. Bus splashes puddle — comedic beat. HBO prestige TV, Hollywood quality, 1998-2004 NYC fashion. Duration 3.2s."
}
```

Top-level metadata: `source_url`, `resolution_target: 1920x1080`, `fps_target: 24`, `color_space: Rec.709`, `codec: H.264`, `audio: false`, `total_shots: 18`.

## Steps

1. Download via `yt-dlp $video_url -o /tmp/satc_ref.mp4`
2. Extract 1fps frames: `ffmpeg -i /tmp/satc_ref.mp4 -vf fps=1 /tmp/frames/%04d.jpg`
3. Scene boundary detection → group frames into shots
4. Send each shot's frames to Gemini 2.5 Pro Vision → fill all schema fields
5. Load `pdf_directives.json` → map directives to shots via semantic similarity → populate `constraints_from_pdf`
6. Build `generation_prompt` per shot: start with technical params (Full HD, no audio, fps, codec) → composition, light, camera, color, blocking, fonts → close with style anchors (HBO, Hollywood, 1998 NYC aesthetic)
7. Write `/data/opening_shots.json`

## Environment

```bash
GOOGLE_API_KEY=   # via Doppler serpent/prd
YOUTUBE_API_KEY=  # optional
```

## Run

```bash
agy run skill sex-and-the-city-opening-annotator \
  --video_url="https://www.youtube.com/watch?v=X453aKQgob4" \
  --pdf_directives_path=./data/pdf_directives.json \
  --output_path=./data/opening_shots.json
```
