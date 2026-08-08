---
name: pdf-directives-integrator
description: Extracts artistic, technical and editing requirements from a PDF brief (e.g. Testove-AI-creator.pdf) and builds a structured JSON directive layer for enriching per-shot generation prompts. Categories: aesthetic, technical, lighting, typography, narrative, editing. Scopes: global, shot-level, sequence-level. Outputs /data/pdf_directives.json ready for sex-and-the-city-opening-annotator.
version: "1.0"
author: huivrotiki/serpentos
tags: [pdf, directives, satc, cinema, preprocessing]
---

## Inputs

| Parameter | Type | Description |
|---|---|---|
| `pdf_path` | string | Path to PDF: `./Testove-AI-creator.pdf` (passed at runtime — not in repo) |
| `shots_schema_path` | string | Optional: `/data/opening_shots.json` for semantic shot mapping |
| `output_path` | string | `/data/pdf_directives.json` |

## Output Schema

```json
{
  "global_directives": [
    {"id": "GD_001", "scope": "global", "category": "aesthetic",
     "description": "Maintain HBO prestige TV visual quality throughout all shots",
     "impact": ["composition", "lighting", "color_palette"], "linked_shots": "all"}
  ],
  "shot_level_directives": [
    {"id": "SD_001", "scope": "shot-level", "category": "typography",
     "description": "Title card: Didot-inspired serif, white on dark, letter-by-letter fade",
     "impact": ["font_and_titles"], "linked_shots": ["SATC_001", "SATC_018"]}
  ],
  "sequence_directives": [
    {"id": "SQD_001", "scope": "sequence-level", "category": "editing",
     "description": "Tempo syncs with musical downbeats — preserve timing even without audio",
     "impact": ["editing_rhythm"], "linked_shots": "all"}
  ],
  "metadata": {"pdf_source": "Testove-AI-creator.pdf", "extracted_at": "ISO8601", "total_directives": 12}
}
```

## Steps

1. Parse PDF via `pdfplumber` or Gemini Document AI (OCR + structural parse)
2. Classify each requirement: `aesthetic` | `technical` | `lighting` | `typography` | `narrative` | `editing`
3. Assign scope: `global` / `shot-level` / `sequence-level`
4. If `shots_schema_path` provided — map directives to `shot_id` via Gemini embeddings semantic similarity
5. Write `/data/pdf_directives.json`

## Environment

```bash
GOOGLE_API_KEY=   # via Doppler serpent/prd
```

## Run

```bash
agy run skill pdf-directives-integrator \
  --pdf_path=./Testove-AI-creator.pdf \
  --output_path=./data/pdf_directives.json
```
