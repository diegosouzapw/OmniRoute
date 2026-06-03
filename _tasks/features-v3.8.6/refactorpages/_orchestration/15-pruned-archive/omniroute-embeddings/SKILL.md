---
name: omniroute-embeddings
description: Embeddings via OmniRoute using OpenAI /v1/embeddings format with auto-fallback across text-embedding-3-large, Voyage, Cohere, Gemini embeddings, Jina. Use when the user needs vector embeddings for RAG, similarity search, or clustering.
---

# OmniRoute — Embeddings

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Endpoint

- `POST $OMNIROUTE_URL/v1/embeddings`

## Discover

```bash
curl $OMNIROUTE_URL/v1/models/embedding | jq '.data[]'
```

Each entry: `{ id, owned_by, dimensions, max_input_tokens }`.

## Example

```bash
curl -X POST $OMNIROUTE_URL/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "text-embedding-3-large",
    "input": ["first text", "second text"],
    "encoding_format": "float"
  }'
```

Response: `{ data:[{ embedding:[...], index }], usage:{ prompt_tokens, total_tokens } }`

## Batch input

`input` accepts a string or array of strings (up to provider batch limit, typically 2048 items).

## Errors

- `400 input_too_long` → input exceeds `max_input_tokens` for this model
- `400 invalid_encoding_format` → use `float` or `base64`
- `503` → provider unavailable; try another model in `/v1/models/embedding`
