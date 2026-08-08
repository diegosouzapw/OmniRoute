---
name: 777ladies-opening-v2
description: Generate 20s and 50s original cinematic opening sequence for 777ladies (Veo 3 + Qwen QA + Remotion/FFmpeg)
---

# 777ladies-opening-v2 (Production Skill)

## Purpose
Generate original 20-second or 50-second cinematic opening sequences for `777Ladies` styled after late-1990s NYC romantic comedy television openings (Super-16 film aesthetic, 24 fps cadence).

## Key Directives
1. **No Hallucination / No Copyright Clones**: Fictional heroine 30+, strawberry-blonde curly hair, light pink sleeveless top, white tulle skirt. No HBO logos, no SJP likenesses.
2. **Pure Video Generation**: Generates video strictly without embedded titles and without audio (`-an`). All titles (`777Ladies presents`, `Перше онлайн-казино для леді`, CTA) are applied in post-production via Remotion / FFmpeg.
3. **Qwen Sub-Bot Verification**: Runs `scripts/qwen_prompt_image_qa.py` to verify prompt-to-image correspondence and ensure zero hallucinations before rendering.
4. **FPS & Motion Cadence**: Strictly `24 fps` (`23.976 fps` film cadence) with continuous camera tracking (`[MOTION]` block in every prompt).

## Execution Commands
- Single-shot test & 20s generation:
  ```bash
  python3 scripts/generate_777ladies_opening.py
  ```
- Qwen Prompt-to-Image QA verification:
  ```bash
  python3 scripts/qwen_prompt_image_qa.py
  ```
