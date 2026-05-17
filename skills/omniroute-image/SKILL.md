---
name: omniroute-image
description: Image generation via OmniRoute using OpenAI /v1/images/generations format with auto-fallback across DALL-E, Stable Diffusion, Flux, Imagen providers. Use when the user wants to generate, edit, or vary images.
---

# OmniRoute — Image Generation

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Endpoints

- `POST $OMNIROUTE_URL/v1/images/generations` — Text-to-image
- `POST $OMNIROUTE_URL/v1/images/edits` — Image edit (mask)
- `POST $OMNIROUTE_URL/v1/images/variations` — Variations

## Discover

```bash
curl $OMNIROUTE_URL/v1/models/image | jq '.data[]'
```

Returns `{ id, owned_by, sizes:[...], capabilities:[...] }` per model.

## Generate example

```bash
curl -X POST $OMNIROUTE_URL/v1/images/generations \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "dall-e-3",
    "prompt": "a red bicycle on a wet street, photoreal",
    "n": 1,
    "size": "1024x1024",
    "response_format": "b64_json"
  }'
```

Response: `{ created, data: [{ url? or b64_json, revised_prompt }] }`

## Errors

- `400 invalid_size` → not supported by this model; check `/v1/models/image`
- `400 content_policy_violation` → blocked by provider safety
- `503` → provider unavailable; try another model in `/v1/models/image`
