---
name: omniroute-chat
description: Chat / code generation via OmniRoute using OpenAI /v1/chat/completions or Anthropic /v1/messages format with SSE streaming, auto-fallback combos, RTK token saver, and 207+ providers. Use when the user wants to ask an LLM, generate code, summarize text, or run prompts through OmniRoute.
---

# OmniRoute — Chat

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## Endpoints

- `POST $OMNIROUTE_URL/v1/chat/completions` — OpenAI format
- `POST $OMNIROUTE_URL/v1/messages` — Anthropic Messages format
- `POST $OMNIROUTE_URL/v1/responses` — OpenAI Responses API

## Discover

```bash
curl $OMNIROUTE_URL/v1/models | jq '.data[].id'
```

Combos (e.g. `auto`, `cost-optimized`, `subscription`) auto-fallback through multiple providers.

## OpenAI format example

```bash
curl -X POST $OMNIROUTE_URL/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-opus-4-7",
    "messages": [{"role": "user", "content": "Refactor this function"}],
    "stream": true
  }'
```

## Anthropic format example

```bash
curl -X POST $OMNIROUTE_URL/v1/messages \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-opus-4-7",
    "max_tokens": 4096,
    "messages": [{"role": "user", "content": "Hi"}]
  }'
```

## Tool use

Supports OpenAI `tools` array and Anthropic `tools` block. Tool results
auto-compressed via RTK (47 filters: git-diff, grep, test-jest, terraform-plan,
docker-logs, etc.) — 20-40% token savings. Disable per-request with
`X-Omniroute-Rtk: off` header.

## Reasoning / thinking

Anthropic extended thinking and OpenAI Responses reasoning blocks are forwarded
verbatim. Cached automatically via reasoning cache.

## Errors

- `401` → invalid API key
- `400 invalid_model` → model not in registry; check `/v1/models`
- `503 circuit_open` → provider circuit breaker tripped; retry later or use combo
- `429 rate_limited` → honor `Retry-After`; consider using a combo for auto-fallback
