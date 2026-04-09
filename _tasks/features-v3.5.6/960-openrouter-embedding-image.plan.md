# Implementation Plan: OpenRouter Embedding and Image Models

> Issue: #960
> Idea: [_ideia/viable/960-openrouter-embedding-image.md](../../_ideia/viable/960-openrouter-embedding-image.md)
> Branch: `release/v3.5.6`

## Overview

Register OpenRouter and GitHub in the embedding and image provider registries so their models can be used through the standard UI flow.

## Pre-Implementation Checklist

- [x] Read `open-sse/config/embeddingRegistry.ts` — OpenRouter NOT present
- [x] Read `open-sse/config/imageRegistry.ts` — OpenRouter NOT present
- [x] User @keith8496 has a working fork for reference

## Implementation Steps

### Step 1: Add OpenRouter to embeddingRegistry

**Files:**
- `open-sse/config/embeddingRegistry.ts` — MODIFY

**Details:**
Add to `EMBEDDING_PROVIDERS`:
```typescript
openrouter: {
  id: "openrouter",
  baseUrl: "https://openrouter.ai/api/v1/embeddings",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "openai/text-embedding-3-small", name: "Text Embedding 3 Small", dimensions: 1536 },
    { id: "openai/text-embedding-3-large", name: "Text Embedding 3 Large", dimensions: 3072 },
    { id: "openai/text-embedding-ada-002", name: "Text Embedding Ada 002", dimensions: 1536 },
  ],
},
```

### Step 2: Add OpenRouter to imageRegistry

**Files:**
- `open-sse/config/imageRegistry.ts` — MODIFY

**Details:**
Add to `IMAGE_PROVIDERS`:
```typescript
openrouter: {
  id: "openrouter",
  baseUrl: "https://openrouter.ai/api/v1/images/generations",
  authType: "apikey",
  authHeader: "bearer",
  format: "openai",
  models: [
    { id: "openai/dall-e-3", name: "DALL-E 3 (via OpenRouter)" },
    { id: "openai/gpt-image-1", name: "GPT Image 1 (via OpenRouter)" },
  ],
  supportedSizes: ["1024x1024", "1024x1792", "1792x1024"],
},
```

### Step 3: Add GitHub to embeddingRegistry

**Files:**
- `open-sse/config/embeddingRegistry.ts` — MODIFY

**Details:**
```typescript
github: {
  id: "github",
  baseUrl: "https://models.inference.ai.azure.com/embeddings",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "text-embedding-3-small", name: "Text Embedding 3 Small", dimensions: 1536 },
    { id: "text-embedding-3-large", name: "Text Embedding 3 Large", dimensions: 3072 },
  ],
},
```

### Step 4: Tests

**Test cases:**
- [ ] OpenRouter embedding provider resolves correctly
- [ ] OpenRouter image provider resolves correctly
- [ ] GitHub embedding provider resolves correctly

## Verification Plan

1. Run `npm run build` — must pass
2. Run tests — all pass

## Commit Plan

```
feat: add OpenRouter and GitHub to embedding/image registries (#960)
```
