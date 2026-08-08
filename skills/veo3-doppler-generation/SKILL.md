---
name: veo3-doppler-generation
description: Production-ready Veo 3 Quality (`veo-3.1-generate-001`) video generation skill powered by Doppler secrets (`serpent/prd`) and JSON manifests.
---

# Veo 3 Quality Doppler Generation Skill

Use this skill whenever you need to execute high-quality cinematic video generation via Google Veo 3.1 (`veo-3.1-generate-001`) or Veo 3.0 (`veo-3.0-generate-001`) using secrets injected directly from Doppler (`serpent/prd`) or Vertex AI ADC credentials.

## 1. Core Architecture
- **Manifest-Driven**: All prompt parameters, camera motion (`[MOTION]`), cinematography (`[TECH]`), anti-static rules (`[ANTI-STATIC]`), seed, and output paths are defined in JSON manifests (e.g. `data/veo3_scene_08_manifest.json`).
- **Secret Management**: Never hardcode API keys. Secrets (`GEMINI_API_KEY`, `OMNIROUTE_API_KEY`) are fetched via `doppler run --project serpent --config prd`.

## 2. Usage Commands

### Run via Doppler wrapper (Gemini API Studio Key):
```bash
./scripts/run_veo3_doppler.sh --manifest data/veo3_scene_08_manifest.json
```

### Run in Image-to-Video Mode (`--i2v`):
```bash
./scripts/run_veo3_doppler.sh --manifest data/veo3_scene_08_manifest.json --i2v
```

### Run via Vertex AI (`europe-west3` / `us-central1` ADC):
```bash
python3 scripts/run_veo3_doppler.py --manifest data/veo3_scene_08_manifest.json --vertex
```

## 3. Manifest Specification
Manifests adhere to the following schema:
```json
{
  "project": "serpentos",
  "doppler": {
    "project": "serpent",
    "config": "prd"
  },
  "scene": {
    "scene_id": "S08",
    "title": "Scene Title",
    "prompt": "Cinematic prompt with [MOTION], [TECH], and [ANTI-STATIC] blocks...",
    "model": "veo-3.1-generate-001",
    "output_video": "/absolute/path/to/output.mp4"
  }
}
```
