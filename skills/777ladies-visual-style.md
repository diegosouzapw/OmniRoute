# Skill: 777ladies-visual-style

## Purpose

Analyze, preserve and replicate the 777ladies visual DNA across all generated content.

## The 777ladies Visual DNA

### Color Palette

- **Primary**: Deep burgundy (#4A0E1A), champagne gold (#D4AF37), ivory white (#F5F0E8)
- **Accent**: Midnight black (#0A0A0A), dusty rose (#C4847A)
- **Forbidden**: Bright neon, pure white backgrounds, RGB primaries

### Aesthetic Pillars

1. **Fashion editorial** — high-fashion magazine quality, not commercial
2. **Manhattan nostalgia** — SATC-era NYC energy, pre-digital warmth
3. **Luxury texture** — silk, velvet, marble, aged leather
4. **Feminine power** — confident, not vulnerable; elegant, not cute
5. **Cinematic grain** — always 24fps, analog warmth, slight halation

### Typography Style

- Serif fonts only: Didot, Bodoni, Cormorant
- Thin weight preferred
- Generous white space
- No sans-serif, no bold weight

### Shot Language

- **Hero shots**: 85mm equivalent, f/1.8, subject isolation
- **Context shots**: 35mm equivalent, environmental storytelling
- **Detail shots**: macro, texture emphasis
- **Motion**: slow dolly push-in, never handheld shake

### Mood Keywords

`luxury` `intimate` `nostalgic` `confident` `editorial` `analog` `manhattan` `evening` `champagne` `velvet`

## Input Format

```json
{
  "asset_type": "video | image | title_card | color_grade",
  "scene_context": "string",
  "reference_check": "boolean (validate against 777ladies DNA)"
}
```

## Output Format

```json
{
  "style_score": "0-100 (777ladies alignment)",
  "color_palette": [...],
  "mood_tags": [...],
  "camera_spec": "string",
  "violations": [...],
  "corrections": [...],
  "approved": "boolean"
}
```

## Validation Rules

- style_score < 70 → reject and provide corrections
- Any neon color → auto-reject
- Missing grain/film texture → -20 points
- Wrong font → auto-reject for typography assets
- Handheld camera movement → -30 points

## Reference: 777ladies Opening Sequence (SATC-style, 20s, 6 shots)

See: `packages/video-pipeline/configs/777ladies_satc_opening_pipeline.json`
