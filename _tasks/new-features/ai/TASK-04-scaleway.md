# TASK-04: Scaleway Generative APIs Provider

## Priority: 🟡 MEDIUM
## Status: [ ] TODO

## Overview

Add **Scaleway Generative APIs** (`scw/`) as an API Key provider with free tier.
Scaleway provides 1M free tokens for new accounts (no credit card if under limit),
hosted in 🇫🇷 EU/GDPR-compliant data centers. Notable: Qwen3 235B and Llama 3.1 70B are available.

## API Details

| Field | Value |
|-------|-------|
| Base URL | `https://api.scaleway.ai/v1` |
| Auth | `Authorization: Bearer {API_KEY}` |
| Format | ✅ OpenAI Chat Completions compatible |
| Free Tier | **1M tokens** for new accounts (no credit card) |
| Paid | ~$0.20/1M tokens after free tier |
| Data Center | Paris, France (EU) |
| Signup | https://scaleway.com |
| API Keys | https://console.scaleway.com/iam/api-keys |
| Docs | https://developers.scaleway.com/generative-apis |

## Models (alias: `scw/`)

| Model ID | Category | Context | Notes |
|----------|----------|---------|-------|
| `llama-3.1-70b-instruct` | Chat | 128K | Best quality |
| `llama-3.1-8b-instruct` | Chat | 128K | Fast |
| `mistral-small-3.2-24b-instruct-2506` | Chat | 128K | Mistral latest |
| `qwen3-235b-a22b-instruct-2507` | Chat | 128K | Largest model |
| `deepseek-v3-0324` | Chat | 128K | DeepSeek |
| `qwen3-embedding-8b` | Embeddings | — | For RAG |

## Implementation Steps

### 1. `src/shared/constants/providers.ts`

Add to `APIKEY_PROVIDERS`:

```typescript
scaleway: {
  id: "scaleway",
  alias: "scw",
  name: "Scaleway AI",
  icon: "cloud",
  color: "#4F0599",
  textIcon: "SCW",
  website: "https://scaleway.com/en/ai/generative-apis/",
  hasFree: true,
  freeNote: "1M free tokens for new accounts — EU/GDPR compliant, Qwen3 235B, Llama 70B",
},
```

### 2. `open-sse/config/constants.ts`

```javascript
scaleway: {
  baseUrl: "https://api.scaleway.ai/v1/chat/completions",
  headers: {},
},
```

### 3. No new executor needed

Standard Bearer auth handled by DefaultExecutor. Works out of the box.

### 4. Test

```bash
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <omniroute-key>" \
  -d '{
    "model": "scw/llama-3.1-70b-instruct",
    "messages": [{"role": "user", "content": "Bonjour!"}]
  }'
```

## Verification Checklist

- [ ] Provider in Dashboard → Providers → API Key tab
- [ ] API key saved and test connection works
- [ ] `scw/llama-3.1-70b-instruct` routes correctly
- [ ] `scw/qwen3-235b-a22b-instruct-2507` routes correctly
- [ ] Free tier badge visible
- [ ] Embeddings route (`scw/qwen3-embedding-8b`) works via /v1/embeddings

## Notes

- Scaleway is based in France — good addition for GDPR-sensitive users
- Models update frequently, expose `passthroughModels: true` or document known model IDs
- The Batches API (50% cheaper) could be a future enhancement
