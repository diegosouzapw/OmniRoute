# Skill: video-prompt-gen

## Purpose

Generate cinematic video prompts for AI video models: Wan2.1, Kling, Hailuo, Sora, Veo3

## 🔇 AUDIO RULE — CRITICAL

**ALL generated video must be SILENT (no embedded audio).**

- Veo3 API: always pass `generate_audio=False`
- Wan2.1: silent by design (no flag needed)
- Kling/Hailuo: pass `audio=false` in API params
- ALWAYS append to negative prompt: `"no sound, no audio, mute, silent"`
- Music is generated separately by `music-agent` and mixed in post

## Trigger

When user provides a scene description, mood, or visual reference.

## Input Format

```json
{
  "scene_description": "string",
  "style": "cinematic | anime | documentary | music_video | fashion",
  "duration": "number (3-10 seconds)",
  "aspect_ratio": "16:9 | 9:16 | 1:1",
  "reference_image": "optional base64 or URL",
  "generate_audio": false
}
```

## Output Format

```json
{
  "model_prompt": "...",
  "negative_prompt": "..., no sound, no audio, silent, mute",
  "style_tags": [...],
  "camera_motion": "dolly | pan | static | orbit",
  "lighting": "string",
  "generate_audio": false,
  "api_params": {
    "veo3":  { "generate_audio": false },
    "kling": { "audio": false },
    "wan21": "silent by design"
  },
  "estimated_tokens": 0
}
```

## Prompt Engineering Rules

1. Always start with camera motion: "cinematic dolly shot", "slow pan"
2. Describe subject → environment → lighting → atmosphere
3. End with technical tags: `"24fps film grain, shallow DOF, anamorphic lens, silent"`
4. Always include in negative prompt: `"no sound, no audio, mute, silent video"`
5. Max 150 words for Wan2.1 / 200 words for Kling
6. **NEVER include audio-related content in visual prompt** (no "sound of", "heard", "music playing")

## Model Routing + Audio Policy

| Model             | Audio flag             | Silent by design?               | Fallback if audio detected |
| ----------------- | ---------------------- | ------------------------------- | -------------------------- |
| **Veo 3.1**       | `generate_audio=False` | No — generates audio by default | → Wan2.1                   |
| **Veo 3.0**       | `generate_audio=False` | No                              | → Wan2.1                   |
| **Wan2.1**        | not needed             | ✅ Yes                          | —                          |
| **Kling 2.0**     | `audio=false`          | No                              | → Wan2.1                   |
| **Hailuo**        | `audio=false`          | No                              | → Wan2.1                   |
| **Veo3 (Vertex)** | `generate_audio=False` | No                              | → Wan2.1                   |

## Example

**Input:** "girl walks through neon-lit Berlin street at night, 777ladies aesthetic"

**Output:**

```json
{
  "model_prompt": "Cinematic dolly tracking shot, young woman silhouette walking through neon-drenched Berlin Mitte alley at night, reflections on wet cobblestone, cyberpunk fashion editorial, purple and cyan neon, shallow DOF, 24fps film grain, anamorphic lens flare, atmospheric fog, silent",
  "negative_prompt": "blurry, overexposed, cartoon, static camera, daytime, audio, sound, music, mute",
  "generate_audio": false,
  "api_params": {
    "veo3": { "generate_audio": false },
    "kling": { "audio": false },
    "wan21": "silent by design"
  }
}
```
