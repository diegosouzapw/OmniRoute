---
name: omniroute-tts
description: Text-to-speech via OmniRoute using OpenAI /v1/audio/speech format with auto-fallback across OpenAI TTS, ElevenLabs, Azure Neural, Google Cloud TTS. Use when the user wants spoken audio output from text.
---

# OmniRoute — Text-to-Speech

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Endpoint

- `POST $OMNIROUTE_URL/v1/audio/speech` — returns binary audio (mp3/opus/wav/flac)

## Discover

```bash
curl $OMNIROUTE_URL/v1/models/tts | jq '.data[]'
```

Each entry includes `voices:[...]` for the available voice names per provider.

## Example

```bash
curl -X POST $OMNIROUTE_URL/v1/audio/speech \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "tts-1",
    "input": "Hello from OmniRoute.",
    "voice": "alloy",
    "response_format": "mp3"
  }' --output speech.mp3
```

## Voices

Voice names vary by provider. Check `/v1/models/tts` — each entry has `voices:[...]`.
Common OpenAI voices: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`.

## Errors

- `400 invalid_voice` → voice not supported by this model
- `400 input_too_long` → input exceeds model character limit
- `503` → provider unavailable; try another model in `/v1/models/tts`
