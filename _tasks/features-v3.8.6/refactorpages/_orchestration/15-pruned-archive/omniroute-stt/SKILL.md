---
name: omniroute-stt
description: Speech-to-text via OmniRoute using OpenAI /v1/audio/transcriptions format with auto-fallback across Whisper, AssemblyAI, Deepgram, Azure STT. Use when the user wants transcription of audio files or real-time speech recognition.
---

# OmniRoute — Speech-to-Text

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Endpoints

- `POST $OMNIROUTE_URL/v1/audio/transcriptions` — multipart upload, returns text
- `POST $OMNIROUTE_URL/v1/audio/translations` — transcribe + translate to English

## Discover

```bash
curl $OMNIROUTE_URL/v1/models/stt | jq '.data[]'
```

## Example

```bash
curl -X POST $OMNIROUTE_URL/v1/audio/transcriptions \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -F "file=@audio.mp3" \
  -F "model=whisper-1" \
  -F "response_format=verbose_json"
```

Response: `{ text, language, duration, segments?:[{ start, end, text }] }`

## Supported formats

Audio: `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `wav`, `webm`.
Response formats: `json`, `text`, `srt`, `verbose_json`, `vtt`.

## Errors

- `400 invalid_file_format` → unsupported audio format
- `400 file_too_large` → exceeds provider limit (usually 25MB)
- `503` → provider unavailable; try another model in `/v1/models/stt`
