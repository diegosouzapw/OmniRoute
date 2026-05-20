---
issue: 1980
last_synced_at: 2026-05-19T12:26:25Z
last_synced_comment_id: IC_kwDORPf6ys8AAAABB05zyA
snapshot:
  thumbs: 0
  commenters: 3
  age_days: 14
  labels: [enhancement]
  state: open
  classified_at: 2026-05-19T12:26:25Z
---

# Feature: [Feature] Please add llama.cpp to Local Providers

> GitHub Issue: #1980 — opened by @woutercoppens on 2026-05-05
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

Current local providers are: LM Studio, vLLM, Lemonade Server, Llamafile, Nvidia Triton, Docker Model Runner, XInterference, oobabooga, SD WebUI, ComfyUI

### Proposed Solution

Please add support for Please add llama.cpp

### Alternatives Considered

_No response_

### Acceptance Criteria

Llama.cpp is added to local providers

### Area

Provider Support

### Related Provider(s)

_No response_

### Additional Context

_No response_

### Expected Test Plan

_No response_

## 💬 Community Discussion

Three participants: @woutercoppens (OP), @hartmark (contributor), @soyelmismo, @rshinde-asapp.

- **@hartmark** (2026-05-08): Pointed out that llama.cpp supports OpenAI style, so users can just add it as an "OpenAI compatible" provider and suffix `/v1` on the URL — suggesting the feature is low-effort and already partially achievable via the generic OpenAI-compatible provider path.
- **@soyelmismo** (2026-05-11): Reported that the workaround does NOT work for them — OmniRoute's dashboard shows errors finding the models endpoint and chat completions endpoint despite correct configuration. They confirmed testing from inside the Docker container that the llama-server is reachable.
- **@rshinde-asapp** (2026-05-11): Suggested setting `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS=true` in `.env` and restarting, as this enables private/local URLs for OpenAI-style providers.

Key takeaway: there is both user demand for a first-class named provider entry and a real usability gap — users struggle to configure llama.cpp as a generic OpenAI-compatible provider due to the `ALLOW_PRIVATE_PROVIDER_URLS` requirement not being obvious.

## 🎯 Refined Feature Description

Add `llama-cpp` (id: `llama-cpp`, alias: `llamacpp`) as a named local provider in OmniRoute, following the exact same pattern as `llamafile`, `lm-studio`, `vllm`, and the other self-hosted chat providers. The llama.cpp project (`ggml-org/llama.cpp`) ships a built-in HTTP server (`llama-server`) that exposes a fully OpenAI-compatible API at `/v1/chat/completions`, `/v1/models`, and `/v1/embeddings` by default on port `8080`.

The benefit of a named provider over the generic "OpenAI compatible" workaround is:
1. Auto-discovery in the dashboard without manual URL configuration.
2. Clear `authHint` directing users to the correct default endpoint.
3. No need to set `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS=true` manually.
4. `passthroughModels: true` so users can type any model name.
5. Inclusion in `SELF_HOSTED_CHAT_PROVIDER_IDS`, which gates circuit breaker thresholds appropriately (local threshold = 2, reset 15s).

### What it solves

- Users who run `llama-server` locally have no obvious first-class route in OmniRoute.
- Reduces friction vs. the generic OpenAI-compatible workaround that requires env flag + manual URL.
- Aligns the provider list with llama.cpp's widespread adoption (the most popular local inference C++ runtime with ~80k GitHub stars).

### How it should work (high level)

1. Register `llama-cpp` in `LOCAL_PROVIDERS` inside `src/shared/constants/providers.ts` with `localDefault: "http://127.0.0.1:8080/v1"` and `passthroughModels: true`.
2. Add `"llama-cpp"` to `SELF_HOSTED_CHAT_PROVIDER_IDS` (same set as llamafile, vllm, etc.).
3. No new executor needed — the default OpenAI-compatible executor handles llama-server's `/v1/chat/completions` endpoint perfectly.
4. No registry entry needed in `providerRegistry.ts` (same as other local providers that use passthroughModels).
5. Add test coverage matching the existing `llamafile`/`lm-studio` test patterns.

### Affected areas

- `src/shared/constants/providers.ts` — add provider entry + SELF_HOSTED_CHAT_PROVIDER_IDS
- `tests/unit/providers-route-managed-catalog.test.ts` — add llama-cpp test case
- `tests/unit/provider-validation-specialty.test.ts` — add optional-key validation test
- Potentially `open-sse/config/providerRegistry.ts` — only if explicit model list or custom defaults are desired (likely not needed for passthroughModels)

## 📎 Attachments & References

- llama.cpp GitHub: https://github.com/ggml-org/llama.cpp
- llama-server README: https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md

## 🔗 Related Ideas

None identified
