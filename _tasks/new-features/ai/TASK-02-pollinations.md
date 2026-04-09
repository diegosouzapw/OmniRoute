# TASK-02: Pollinations AI Provider

## Priority: 🔴 HIGH
## Status: [ ] TODO

## Overview

Add **Pollinations AI** (`pol/`) as a free provider. Pollinations is unique: **no API key, no
signup required** for basic usage. OpenAI-compatible endpoint routing multiple frontier models
(GPT-5, Claude, Gemini, DeepSeek V3, Llama 4). Truly zero-friction free access.

## API Details

| Field | Value |
|-------|-------|
| Base URL | `https://text.pollinations.ai/openai` |
| Auth | **None required** for basic use. Optional key from `enter.pollinations.ai` |
| Format | OpenAI Chat Completions (`/chat/completions`) |
| Rate Limit | 1 request per 15 seconds (no key) / higher with key |
| Signup | Not required |
| Docs | https://pollinations.ai/docs |

## Models (alias: `pol/`)

| Model ID | Provider Behind | Notes |
|----------|----------------|-------|
| `openai` | OpenAI GPT-5 | Latest GPT |
| `claude` or `claude-sonnet` | Anthropic | Via Pollinations proxy |
| `gemini` | Google | Gemini access |
| `deepseek` | DeepSeek V3 | Open-weight |
| `llama` | Meta Llama 4 | FB model |
| `mistral` | Mistral | European AI |
| `unity` | Custom Pollinations | Uncensored |

## Implementation Steps

### 1. `src/shared/constants/providers.ts`

Add to `FREE_PROVIDERS` (since no key required):

```typescript
pollinations: {
  id: "pollinations",
  alias: "pol",
  name: "Pollinations AI",
  icon: "local_florist",
  color: "#4CAF50",
  textIcon: "PO",
  website: "https://pollinations.ai",
  hasFree: true,
  freeNote: "No API key needed — unlimited access (1 req/15s) to GPT-5, Claude, Gemini, DeepSeek, Llama 4",
},
```

### 2. `open-sse/config/constants.ts`

```javascript
pollinations: {
  baseUrl: "https://text.pollinations.ai/openai/chat/completions",
  headers: {},  // no auth needed
},
```

### 3. Custom executor: `open-sse/executors/pollinations.ts`

Pollinations doesn't require an Authorization header for no-key mode:

```typescript
import { BaseExecutor } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";

export class PollinationsExecutor extends BaseExecutor {
  constructor() {
    super("pollinations", PROVIDERS.pollinations);
  }

  buildHeaders(credentials, stream = true) {
    const headers = { "Content-Type": "application/json" };
    // Optional: use key if provided, no-key if not
    if (credentials?.apiKey) {
      headers["Authorization"] = `Bearer ${credentials.apiKey}`;
    }
    if (stream) headers["Accept"] = "text/event-stream";
    return headers;
  }

  buildUrl() {
    return this.config.baseUrl;
  }

  transformRequest(model, body, stream, credentials) {
    // Pollinations uses model name directly like "openai", "claude", etc.
    return body;
  }
}

export default PollinationsExecutor;
```

### 4. Register executor in `open-sse/executors/index.ts`

```typescript
import PollinationsExecutor from "./pollinations.ts";
// Add to executorMap:
pollinations: PollinationsExecutor,
```

### 5. Test

```bash
# No API key provider test
curl http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <omniroute-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"pol/openai","messages":[{"role":"user","content":"Hello!"}]}'
```

## Special Considerations

- Provider added with no API key configured should still work (send no Authorization header)
- In the provider form, API key field should be marked as OPTIONAL with note "No key needed for basic access"
- Rate limit: 1 req/15s without key, higher with optional key from enter.pollinations.ai
- Pollinations also supports image generation at `https://image.pollinations.ai` — out of scope for this task

## Verification Checklist

- [ ] Provider visible in Dashboard → Providers
- [ ] Works WITHOUT any API key configured
- [ ] Works WITH optional API key (different rate limit)
- [ ] `pol/openai` routes to GPT-5 via Pollinations
- [ ] `pol/claude` routes to Claude via Pollinations
- [ ] `pol/deepseek` routes to DeepSeek via Pollinations
- [ ] `pol/llama` routes to Llama 4 via Pollinations
- [ ] No auth error when key field is empty
