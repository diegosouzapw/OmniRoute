---
name: veo-storyboard-validator
description: Generates static keyframe storyboard images (first & last frame / style concept) for user approval prior to expensive video generation in Vertex AI Veo 3.1.
---

# Veo Storyboard Validator Skill

## Purpose
Before running expensive video generation jobs (Veo 3.1), this skill generates high-resolution (16:9, 1080p) static keyframe images for each scene so the user can inspect and approve character consistency, lighting, framing, and typography.

## Capabilities
1. **Static Keyframe Generation**: Uses Vertex AI Imagen 3 (`imagen-3.0-generate-001`) to render the initial frame (`start_frame`) and closing frame (`end_frame`) concept for a scene prompt.
2. **Character & Style Lock Enforcement**: Automatically prepends `HEROINE (locked)` descriptors and SATC 1998 35mm film grain aesthetic to every generated image prompt.
3. **Approval Gate**: Saves storyboard PNGs/JPGs into `./output/satc_ua/storyboard/` and pauses pipeline execution until the user explicitly confirms (`я утверждаю`).

## Usage Pattern
```bash
python3 scripts/generate_storyboard_frames.py --prompts ./data/veo_prompts_preroll_20s.json --out ./output/satc_ua/storyboard
```

## Best Practices
- Never trigger full Veo video generation before static frames have been reviewed if `--require-approval` is active.
- Feed approved start frames into Vertex AI Veo 3.1 as `conditioning_image` for seamless image-to-video motion continuity.
