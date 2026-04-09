# TASK-06: Google AI Studio (API Key Provider)

## Priority: 🟡 MEDIUM
## Status: [ ] TODO

## Overview

Add **Google AI Studio** (`gai/`) as a separate API Key provider — distinct from the existing
`gemini-cli` (deprecated OAuth) and `gemini` (API key, already exists). 

Wait — need to verify: the existing `gemini` provider in providers.ts uses
`website: "https://ai.google.dev"` which IS Google AI Studio. This task is to:
1. Verify current `gemini` provider already works for Google AI Studio API keys
2. Add `hasFree: true` and `freeNote` to highlight the generous free tier
3. Document the OpenAI-compatible endpoint variant

## Current `gemini` Provider State

```typescript
gemini: {
  id: "gemini",
  alias: "gemini",
  name: "Gemini",
  icon: "diamond",
  color: "#4285F4",
  website: "https://ai.google.dev",
  // NO hasFree or freeNote
}
```

## Google AI Studio Free Tier (2025/2026)

| Model | Free RPM | Free RPD | Notes |
|-------|---------|---------|-------|
| Gemini 2.5 Flash | 15 RPM | 1,500 RPD | Best free model |
| Gemini 2.5 Pro | 5 RPM | 100 RPD | Limited free |
| Gemini 2.0 Flash | 30 RPM | 1,500 RPD | Stable |
| Gemini 1.5 Flash | 30 RPM | 50 RPD | Legacy |
| Gemini Embedding | 15 RPM | 1,500 RPD | Embeddings |

**OpenAI-compatible URL:** `https://generativelanguage.googleapis.com/v1beta/openai/`

## Implementation Steps

### 1. Update existing `gemini` in `providers.ts`

```typescript
gemini: {
  id: "gemini",
  alias: "gemini",
  name: "Gemini (Google AI Studio)",
  icon: "diamond",
  color: "#4285F4",
  textIcon: "GE",
  website: "https://ai.google.dev",
  hasFree: true,
  freeNote: "Free forever: 15 RPM / 1,500 RPD for Gemini 2.5 Flash — api.google.dev",
},
```

### 2. Verify `open-sse/config/constants.ts` Gemini config

Check if the `gemini` provider baseUrl supports the OpenAI-compatible endpoint:
- Standard: `https://generativelanguage.googleapis.com/v1beta`
- OpenAI-compat: `https://generativelanguage.googleapis.com/v1beta/openai`

The openai-compat endpoint avoids needing a custom Gemini translator (no `generateContent` format).
Consider adding the OpenAI-compat endpoint as the default for the `gemini` provider.

### 3. Model suggestions

```javascript
// Gemini 2.5 Flash — best free model
"gemini-2.5-flash",
"gemini-2.5-pro",
"gemini-2.0-flash",
"gemini-embedding-exp",
```

## Verification Checklist

- [ ] `gemini` provider shows `hasFree` badge in dashboard
- [ ] `gemini/gemini-2.5-flash` routes correctly with API key
- [ ] `gemini/gemini-2.5-pro` routes correctly
- [ ] Free quota info visible in provider card tooltip
- [ ] Embeddings work via `gemini/gemini-embedding-exp`

## Notes

- Getting API key: https://aistudio.google.com/app/apikey (free, no credit card)
- Google AI Studio is different from Google Cloud Vertex AI (which is paid)
- The `gemini-cli` provider is already marked deprecated (Mar 2026)
