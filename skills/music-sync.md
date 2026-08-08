# Skill: music-sync

## Purpose

Analyze music mood/BPM and generate sync points for video editing.

## Trigger

When video pipeline needs audio-visual synchronization.

## Input Format

```json
{
  "track_description": "string (genre, mood, tempo)",
  "bpm": "number (optional)",
  "duration": "number (seconds)",
  "scenes": "array from storyboard skill"
}
```

## Output Format

```json
{
  "sync_points": [
    { "timecode": "00:04", "event": "beat drop", "visual_action": "smash-cut to wide" },
    { "timecode": "00:08", "event": "verse start", "visual_action": "slow push-in" }
  ],
  "energy_curve": "low→high→peak→resolution",
  "recommended_cut_frequency": "every 2-4 seconds",
  "color_grade_suggestion": "string"
}
```

## Rules

1. Beat drops → always smash-cut or hard cut
2. Verses → slower camera moves, longer shots
3. Chorus → fast cuts, wider shots, high energy
4. Outro → long dissolves, aerial shots
5. BPM 120+ → cuts every 2s max
6. BPM <90 → cuts every 5-8s
