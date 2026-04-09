# TASK-07: AI/ML API Provider

## Priority: 🟡 MEDIUM
## Status: [ ] TODO

## Overview

Add **AI/ML API** (`aiml/`) as an API Key provider. AI/ML API is an aggregator (similar to
OpenRouter) that provides access to 200+ models including GPT-4o, Claude, Gemini, and Llama
through a single OpenAI-compatible endpoint. Has a free daily credit allowance.

## API Details

| Field | Value |
|-------|-------|
| Base URL | `https://api.aimlapi.com/v1` |
| Auth | `Authorization: Bearer {API_KEY}` |
| Format | ✅ OpenAI Chat Completions compatible |
| Free Tier | $0.025/day credits (~50K tokens/day) = ~$0.75/month free |
| Rate Limit | 10 requests per hour (free tier) |
| Model Count | 200+ models |
| Signup | https://aimlapi.com |
| Docs | https://docs.aimlapi.com |

## Notable Models Available via AI/ML API

| Model | Category |
|-------|----------|
| `gpt-4o` | OpenAI |
| `claude-3-5-sonnet-20241022` | Anthropic |
| `gemini-1.5-pro` | Google |
| `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo` | Meta |
| `deepseek-chat` | DeepSeek |
| `mistral-large-latest` | Mistral |

## Implementation Steps

### 1. `src/shared/constants/providers.ts`

Add to `APIKEY_PROVIDERS`:

```typescript
aimlapi: {
  id: "aimlapi",
  alias: "aiml",
  name: "AI/ML API",
  icon: "hub",
  color: "#6366F1",
  textIcon: "AI",
  website: "https://aimlapi.com",
  hasFree: true,
  freeNote: "Free $0.025/day credits — 200+ models via single endpoint (GPT-4o, Claude, Gemini, Llama)",
  passthroughModels: true,
},
```

### 2. `open-sse/config/constants.ts`

```javascript
aimlapi: {
  baseUrl: "https://api.aimlapi.com/v1/chat/completions",
  headers: {},
},
```

### 3. No new executor needed

Standard Bearer auth handled by DefaultExecutor.

### 4. Test

```bash
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <omniroute-key>" \
  -d '{"model":"aiml/gpt-4o","messages":[{"role":"user","content":"Hello!"}]}'
```

## Verification Checklist

- [ ] Provider in dashboard, API key field
- [ ] `aiml/gpt-4o` routes correctly
- [ ] `aiml/claude-3-5-sonnet-20241022` routes correctly (via AIML API)
- [ ] Free tier badge visible
- [ ] Model list browsable (passthroughModels: true)

## Notes

- 10 RPH is very low for free tier — useful as supplemental, not primary provider
- `passthroughModels: true` lets users type in any model ID
- Good for accessing premium models at very low cost via free credits
