---
name: veo-hybrid-orchestrator
description: Orchestrates Google Flow and Vertex AI Veo 3.1 video generation with tiered fallbacks, image conditioning, FFmpeg assembly, and DaVinci Resolve timeline export.
---

# Veo Hybrid Orchestrator Skill

## Purpose
Manages end-to-end video production for multi-scene trailers and prerolls using a hybrid routing strategy: primary generation via Google AI Studio Flow (`veo-3-fast`) with automatic fallback to Vertex AI (`veo-3.1-generate-001` / `veo-3.1-fast-generate-preview` in `us-central1`).

## Capabilities
1. **Fallback Routing**: Monitors credit thresholds and seamlessly fails over from Flow to Vertex AI when credits drop below threshold.
2. **Image-to-Video Continuity**: Accepts static start frames (`conditioning_image`) to anchor character and style consistency across cuts.
3. **Post-Processing & Timeline Export**:
   - Concatenates clips via FFmpeg (`filter_complex` with crossfades).
   - Renders crisp text/typography overlays post-generation using `drawtext` to avoid AI text hallucinations.
   - Generates DaVinci Resolve FCPXML timelines (`.xml`) for professional color grading and fine-tuning.

## Usage Pattern
```bash
python3 scripts/generate_satc_opening.py --prompts ./data/veo_prompts_preroll_20s.json
```
