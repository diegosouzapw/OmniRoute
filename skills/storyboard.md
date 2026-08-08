# Skill: storyboard

## Purpose

Break down a video concept into structured scenes with visual direction.

## Trigger

When user provides a video brief, song, or concept.

## Input Format

```json
{
  "concept": "string (video idea or song lyrics)",
  "duration_total": "number (seconds)",
  "style": "string",
  "mood": "string"
}
```

## Output Format

Array of scenes:

```json
[
  {
    "scene_id": 1,
    "timecode": "00:00-00:05",
    "description": "string",
    "visual_type": "close-up | wide | medium | aerial | macro",
    "emotion": "string",
    "transition": "cut | dissolve | fade | smash-cut",
    "audio_cue": "string"
  }
]
```

## Rules

1. Divide total duration into 3-10 second chunks
2. Vary visual types — never 3 same shots in a row
3. Match emotion arc: intro → build → climax → resolution
4. Add audio_cue hints for music-sync agent
5. Output minimum 5 scenes for any concept

## Example

**Input:** "dark synth music video, 60 seconds, cyberpunk Berlin"

**Output:**

```
Scene 1 (0-5s): Aerial shot over Berlin at night → wide → mysterious → hard cut
Scene 2 (5-10s): Close-up neon sign reflection in puddle → macro → tense → dissolve
Scene 3 (10-18s): Protagonist walks toward camera in fog → medium → determined → smash-cut
Scene 4 (18-25s): Rapid montage of city lights → extreme wide → euphoric → rhythmic cuts
Scene 5 (25-35s): Close-up face, dramatic lighting → close-up → intense → fade
...
```
