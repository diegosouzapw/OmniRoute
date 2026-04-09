# TASK-05: Together AI Free Models

## Priority: 🟡 MEDIUM
## Status: [ ] TODO

## Overview

Together AI (`together/`) already exists in OmniRoute. This task:
1. Adds `hasFree: true` and `freeNote` to highlight the free tier
2. Documents the **3 permanently free models** with suffix `-Free`
3. Adds $25 signup credit note
4. Enhances the provider UI to show free models more prominently

## Current State

Together AI is in `APIKEY_PROVIDERS` with:
```typescript
together: {
  id: "together",
  alias: "together",
  name: "Together AI",
  ...
  // NO hasFree or freeNote
}
```

## Free Models Available (no credit usage)

| Model ID | Type | Notes |
|----------|------|-------|
| `meta-llama/Llama-3.3-70B-Instruct-Turbo-Free` | Chat | Llama 70B free |
| `meta-llama/Llama-Vision-Free` | Vision | Multimodal free |
| `deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free` | Reasoning | R1 distill free |

Plus $25 in signup credits for 200+ other models.

## Implementation Steps

### 1. `src/shared/constants/providers.ts`

Update existing `together` entry:

```typescript
together: {
  id: "together",
  alias: "together",
  name: "Together AI",
  icon: "group_work",
  color: "#0F6FFF",
  textIcon: "TG",
  website: "https://www.together.ai",
  hasFree: true,
  freeNote: "$25 signup credits + 3 permanently free models (Llama 70B, Vision, DeepSeek R1 distill)",
},
```

### 2. Model catalog update

The 3 free models should be documented with suffix `-Free` so users know they don't consume credits:

```javascript
// In model suggestions for together provider
"meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",  // 🆓 free forever
"meta-llama/Llama-Vision-Free",                    // 🆓 free forever
"deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free", // 🆓 free forever
```

### 3. README documentation

Update Together AI entry in README free models section to highlight the 3 always-free models.

## Verification Checklist

- [ ] `hasFree: true` and `freeNote` added to together provider
- [ ] Free tier badge visible in provider card
- [ ] `together/meta-llama/Llama-3.3-70B-Instruct-Turbo-Free` routes correctly
- [ ] `together/meta-llama/Llama-Vision-Free` routes correctly
- [ ] `together/deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free` routes correctly (reasoning)

## Notes

- Together API is already OpenAI compatible — no code change needed, only metadata update
- Rate limits on free models are reduced but unspecified (lower than paid)
- $25 credits do NOT expire for accounts that signed up recently (verify current policy)
