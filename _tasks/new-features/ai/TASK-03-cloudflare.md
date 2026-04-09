# TASK-03: Cloudflare Workers AI Provider

## Priority: 🔴 HIGH
## Status: [ ] TODO

## Overview

Add **Cloudflare Workers AI** (`cf/`) as a free API Key provider. Cloudflare gives 10,000 free
Neurons/day which equals ~100-200 LLM responses, 500 translations, 500s of audio (Whisper), or
1500-15000 embeddings. 50+ models including Llama, Gemma, Mistral, Qwen. Notable: free Whisper
access for audio transcription.

## API Details

| Field | Value |
|-------|-------|
| Base URL | `https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/v1` |
| Auth | `Authorization: Bearer {API_TOKEN}` |
| Format | OpenAI-compatible (via `/chat/completions`) |
| Rate Limit | 10,000 Neurons/day (resets 00:00 UTC) |
| Signup | https://dash.cloudflare.com (free account) |
| API Token | https://dash.cloudflare.com/profile/api-tokens |
| Account ID | Found in Cloudflare dashboard right sidebar |
| Docs | https://developers.cloudflare.com/workers-ai/ |

## Special Requirement: ACCOUNT_ID in URL

Cloudflare's base URL includes the `{ACCOUNT_ID}`. This requires a custom setup:
- Store `accountId` in `providerSpecificData` of the provider credential
- Build URL dynamically: `https://api.cloudflare.com/client/v4/accounts/{accountId}/ai/v1/chat/completions`

## Models (alias: `cf/`)

| Model ID | Category | Notes |
|----------|----------|-------|
| `@cf/meta/llama-3.3-70b-instruct` | Chat | Best quality |
| `@cf/meta/llama-3.1-8b-instruct` | Chat | Fast/lightweight |
| `@cf/google/gemma-3-12b-it` | Chat | Google |
| `@cf/mistral/mistral-7b-instruct-v0.2-lora` | Chat | Mistral |
| `@cf/qwen/qwen2.5-coder-15b-instruct` | Code | Coding |
| `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b` | Reasoning | R1 distill |
| `@cf/openai/whisper-large-v3-turbo` | Transcription | FREE audio! |
| `@cf/black-forest-labs/flux-1-schnell` | Image Gen | Fast image |

## Implementation Steps

### 1. `src/shared/constants/providers.ts`

```typescript
"cloudflare-ai": {
  id: "cloudflare-ai",
  alias: "cf",
  name: "Cloudflare Workers AI",
  icon: "cloud",
  color: "#F48120",
  textIcon: "CF",
  website: "https://developers.cloudflare.com/workers-ai/",
  hasFree: true,
  freeNote: "Free 10K Neurons/day: ~150 LLM responses, 500s Whisper audio, edge inference globally",
  authHint: "Requires API Token AND Account ID (found in Cloudflare dashboard)",
},
```

### 2. `open-sse/config/constants.ts`

```javascript
"cloudflare-ai": {
  // baseUrl is dynamic — account ID comes from credentials
  baseUrl: "https://api.cloudflare.com/client/v4/accounts",
  headers: {},
},
```

### 3. Custom executor: `open-sse/executors/cloudflare-ai.ts`

```typescript
import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

export class CloudflareAIExecutor extends BaseExecutor {
  constructor() {
    super("cloudflare-ai", PROVIDERS["cloudflare-ai"]);
  }

  buildUrl(model, stream, urlIndex = 0, credentials = null) {
    const accountId = credentials?.providerSpecificData?.accountId || credentials?.accountId;
    if (!accountId) {
      throw new Error("Cloudflare Workers AI requires an Account ID in provider settings");
    }
    return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/v1/chat/completions`;
  }

  buildHeaders(credentials, stream = true) {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${credentials.apiKey}`,
    };
    if (stream) headers["Accept"] = "text/event-stream";
    return headers;
  }

  transformRequest(model, body, stream, credentials) {
    // Cloudflare uses full model path like @cf/meta/llama-3.3-70b-instruct
    return body;
  }
}

export default CloudflareAIExecutor;
```

### 4. Provider form: accountId field

In the provider credentials form, add an extra field for `accountId` alongside the API key.
Check if there's an existing `providerSpecificData` mechanism (see Alibaba/custom endpoint providers).

### 5. Register executor in `open-sse/executors/index.ts`

```typescript
import CloudflareAIExecutor from "./cloudflare-ai.ts";
"cloudflare-ai": CloudflareAIExecutor,
```

### 6. Test

```bash
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <omniroute-key>" \
  -d '{
    "model": "cf/@cf/meta/llama-3.3-70b-instruct",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Verification Checklist

- [ ] Provider in dashboard, shows Account ID field
- [ ] API token + Account ID saved correctly
- [ ] `cf/@cf/meta/llama-3.3-70b-instruct` routes correctly
- [ ] `cf/@cf/openai/whisper-large-v3-turbo` works for audio
- [ ] Error displayed if accountId missing
- [ ] Free tier badge visible in provider card
