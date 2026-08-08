# Skill: music-composer

## Purpose

Generate AI music prompts for Suno, Udio, Stable Audio, MusicGen.

## Trigger

When user needs background music, theme song, or audio for video.

## Input Format

```json
{
  "mood": "string",
  "genre": "string",
  "duration": "number (seconds)",
  "reference_artist": "string (optional)",
  "video_context": "string (optional — describe the video)",
  "bpm_target": "number (optional)"
}
```

## Output Format

```json
{
  "suno_prompt": "string",
  "udio_prompt": "string",
  "stable_audio_prompt": "string",
  "style_tags": [...],
  "instruments": [...],
  "bpm_suggestion": "number",
  "key_suggestion": "string"
}
```

## Prompt Engineering Rules

1. **Suno**: use [verse], [chorus], [bridge] structure tags
2. **Udio**: focus on genre + mood + decade (e.g., "2010s dark synth")
3. **Stable Audio**: be technical — BPM, key, instruments, FX
4. Always suggest 3 variants: energetic / neutral / ambient
5. For sync to video: mention "no sudden tempo changes", "constant groove"

## Example

**Input:** mood=dark, genre=synth-wave, duration=60s, video=cyberpunk Berlin night walk

**Suno prompt:**

```
[Instrumental] dark synthwave, Berlin underground, driving bass line,
arpeggiated synth, industrial percussion, cyberpunk atmosphere,
Night Drive aesthetic, 128 BPM, no vocals, cinematic tension
```

**Udio prompt:**

```
"Dark synthwave instrumental, 2015s aesthetic, Perturbator-inspired,
driving rhythm, cold reverb, tension building, Berlin industrial"
```

**Stable Audio prompt:**

```
"Synthwave instrumental, 128 BPM, F minor, analog bass synth,
LFO arpeggio, TR-808 drums, reverb hall, chorus effect,
60 seconds, no vocals, cinematic feel"
```
