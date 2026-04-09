# Feature: Image Generation for Custom OpenAI-Compatible Providers

> GitHub Issue: #973 — opened by @hralamin6 on 2026-04-04
> Status: 📋 Cataloged | Priority: Medium

## 📝 Original Request

Custom OpenAI-compatible providers support text completions but image generation doesn't work. Returns "Unknown embedding provider" errors. Requests full compatibility for image generation with custom providers.

## 💬 Community Discussion

### Participants
- @hralamin6 — Original requester (followed up asking for update)

### Key Points
- Text completions work correctly with custom providers
- Image generation fails with unknown provider errors
- User expects `/v1/images/generations` to route through custom providers

## 🎯 Refined Feature Description

Extend the image generation handler to support routing requests to custom OpenAI-compatible providers, not just hardcoded providers.

### What it solves
- Custom providers with image generation capabilities can't be used for image tasks
- Users running local image generation servers (e.g., ComfyUI, SD WebUI) behind an OpenAI-compatible wrapper

### How it should work
1. When `/v1/images/generations` receives a request with a custom provider model
2. Look up the custom provider's base URL
3. Forward the request to `{baseUrl}/v1/images/generations`
4. Return the response unchanged

### Affected areas
- `open-sse/handlers/imageGeneration.ts` — add custom provider routing
- `open-sse/config/providerRegistry.ts` — image capability flag
- Custom provider node configuration — add image generation toggle

## 🔗 Related Ideas
- Related to [960-openrouter-embedding-image](./960-openrouter-embedding-image.md) — same pattern for embeddings
