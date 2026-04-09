# TASK-01: LongCat AI Provider

## Priority: 🔴 HIGH
## Status: [ ] TODO

## Overview

Add **LongCat AI** (`lc/`) as a new API Key provider. LongCat offers the most generous
free tier of any LLM API: **50M tokens/day** for Flash-Lite and 500K/day for other models.
OpenAI-compatible endpoint. Currently in public beta — 100% free.

## API Details

| Field | Value |
|-------|-------|
| Base URL | `https://longcat.chat/api/v1` |
| Auth | Bearer API key |
| Format | OpenAI Chat Completions (`/chat/completions`) |
| Signup | https://longcat.chat — email or phone |
| API Keys | https://longcat.chat/platform |
| Docs | https://longcat.chat/platform/docs |

## Models (alias: `lc/`)

| Model ID | Free Quota/day | Notes |
|----------|---------------|-------|
| `LongCat-Flash-Chat` | 500K tokens | Multi-turn chat |
| `LongCat-Flash-Thinking` | 500K tokens | Reasoning/CoT |
| `LongCat-Flash-Thinking-2601` | 500K tokens | Jan 2026 version |
| `LongCat-Flash-Omni-2603` | 500K tokens | Multimodal capable |
| `LongCat-Flash-Lite` | **50M tokens** 🤯 | Lightweight, ultra-fast |

## Implementation Steps

### 1. `src/shared/constants/providers.ts`

Add to `APIKEY_PROVIDERS`:

```typescript
longcat: {
  id: "longcat",
  alias: "lc",
  name: "LongCat AI",
  icon: "auto_awesome",
  color: "#FF6B9D",
  textIcon: "LC",
  website: "https://longcat.chat",
  hasFree: true,
  freeNote: "50M tokens/day (Flash-Lite), 500K/day (Thinking/Chat) — free forever while beta",
},
```

### 2. `open-sse/config/constants.ts`

Add LongCat to PROVIDERS map:

```javascript
longcat: {
  baseUrl: "https://longcat.chat/api/v1/chat/completions",
  headers: {},
},
```

### 3. No new executor needed

LongCat uses standard OpenAI Bearer auth. `DefaultExecutor` handles it via the `default:` case
which uses `Authorization: Bearer <apiKey>`.

### 4. Model registry — `open-sse/config/constants.ts` or model catalog

Add default models that OmniRoute auto-suggests:

```javascript
// In PROVIDER_MODELS or equivalent
longcat: [
  "LongCat-Flash-Lite",
  "LongCat-Flash-Chat",
  "LongCat-Flash-Thinking",
  "LongCat-Flash-Thinking-2601",
  "LongCat-Flash-Omni-2603",
]
```

### 5. Test

```bash
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <omniroute-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"lc/LongCat-Flash-Lite","messages":[{"role":"user","content":"Hello!"}]}'
```

## Verification Checklist

- [ ] Provider appears in Dashboard → Providers
- [ ] API key can be added and saved
- [ ] Test connection passes (green check)
- [ ] `lc/LongCat-Flash-Lite` routes correctly
- [ ] `lc/LongCat-Flash-Chat` routes correctly
- [ ] Free tier badge shown in provider card
- [ ] Model list auto-populated

## Notes

- Public beta: no paid plans exist, 100% free now
- Supports Anthropic-compatible endpoint too (`/api/anthropic/v1/messages`) but implement OpenAI first
- Daily quota resets at 00:00 UTC
- Rate limit is `1 RPS` (1 request per second) for all models
