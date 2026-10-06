---
title: "Embeddings client runbook"
lastUpdated: 2026-08-17
---

# Embeddings client runbook

Operator notes for `POST /v1/embeddings` when OmniRoute sits in front of
Hindsight 0.9.1 (text-only `encode(list[str])`) and Memorix 1.6.0 (Jina media
gate). Live-verified 2026-08-17 against OmniRoute 3.8.49 at
`https://omniroute.jaguar-fish.ts.net/v1`. No secrets below.

## Working model ids

| Client id | HTTP | Vectors | Dim | Notes |
| --- | --- | --- | --- | --- |
| `openrouter/google/gemini-embedding-2` | 200 | batch 2 → 2 | 3072 | Works without a native Gemini key |
| `openrouter/google/gemini-embedding-2-preview` | 200 | batch 2 → 2 | 3072 | Same space as the non-preview id |
| `openrouter/google/gemini-embedding-001` | 200 | batch 2 → 2 | 3072 | Listed in `GET /v1/embeddings` |
| `jina-ai/jina-embeddings-v5-omni-small` | 200 | batch 2 → 2 | 1024 | Canonical Jina omni id |
| `jina/jina-embeddings-v5-omni-small` | 200 | batch 2 → 2 | 1024 | Alias; response `model` is `jina-ai/...` |
| `jina-embeddings-v5-omni-small` | 200 | batch 2 → 2 | 1024 | Bare id also resolves |
| `jina-ai/jina-embeddings-v5-omni-nano` | 200 | 1 → 1 | **768** | Different vector space from small |

`GET /v1/models` and `GET /v1/embeddings` listed
`jina-ai/jina-embeddings-v5-omni-small` (1024) and
`jina-ai/jina-embeddings-v5-omni-nano` (768) and
`openrouter/google/gemini-embedding-001`. They did **not** list
`openrouter/google/gemini-embedding-2` even though that id already serves.

Do not mix nano (768-d) and small (1024-d) in one index. They are not
comparable.

## Broken / misleading ids

### Native Gemini Embedding 2

Request:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Actual (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` returns the same 400. `google/gemini-embedding-2`
returns HTTP **400** `Unknown embedding provider: google` unless a custom
provider node uses the `google` prefix.

Expected: either a native Gemini embed with a Google AI Studio key on the
`gemini` provider, or a 400 that names the working OpenRouter id.

Repro (redact the bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Working substitute:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Native `gemini-embedding-2` cannot succeed from GitOps alone. A Google AI
Studio key must be added as a `gemini` provider connection (dashboard or
`GEMINI_API_KEY` imported into OmniRoute). That secret is not in this repo.

### Jina multimodal path

`POST /v1/multimodal-embeddings` → HTTP **404**

```json
{
  "error": {
    "message": "Unknown API route: /v1/multimodal-embeddings",
    "type": "not_found",
    "code": "unknown_route",
    "path": "/v1/multimodal-embeddings"
  }
}
```

Use `POST /v1/embeddings` until an alias exists.

### Jina / Memorix image object

OmniRoute canonical image item (28×28 PNG, 784 pixels — Jina rejects 1×1):

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [
    {
      "type": "image",
      "source": {
        "type": "base64",
        "data": "<base64-png>",
        "media_type": "image/png"
      }
    }
  ]
}
```

Actual: HTTP **200**, 1 vector, 1024-d.

Memorix 1.6.0 / Jina native shape:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Actual: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` mixed with `{ "image": "data:..." }` is the same 400.

## Client notes

### Hindsight 0.9.1

Hindsight embeddings are text-only (`encode(list[str])`). It does not send
image objects. Point Hindsight's OpenAI-compatible embeddings base URL at
OmniRoute `/v1` and use a working id from the table above
(`jina-ai/jina-embeddings-v5-omni-small` or
`openrouter/google/gemini-embedding-2`). Do not set the model to bare
`gemini-embedding-2` unless a `gemini` API key exists on the gateway.

### Memorix 1.6.0

Memorix only treats `baseUrl` matching `/jina\.ai/i` as native media. An
OmniRoute URL stays on the text-only path even when the model is Jina omni.
That gate is a Memorix client issue. Independently, OmniRoute still rejects
the Jina `{image: "data:..."}` body that Memorix would send if the gate
opened, so Jina-compatible clients cannot embed images through OmniRoute
without the canonical `{type,source}` schema.

Use `jina-ai/jina-embeddings-v5-omni-small` for text. Do not point Memorix
`base_url` at `https://api.jina.ai` — keep OmniRoute as the only hop.
