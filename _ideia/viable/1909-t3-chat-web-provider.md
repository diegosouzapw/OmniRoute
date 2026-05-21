---
issue: 1909
last_synced_at: 2026-05-19T00:00:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  commenters: 0
  age_days: 16
  labels: ["provider-support"]
  state: open
  classified_at: 2026-05-19T00:00:00Z
---

# Feature: Add t3.chat web provider

> GitHub Issue: #1909 — opened by @aartzz on 2026-05-03T09:19:28Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

OmniRoute currently supports API-key-based providers like OpenRouter and Ollama, but lacks integration for [t3.chat](https://t3.chat) — a popular multi-model AI platform by Theo Browne that provides access to 50+ models (Claude, GPT-4o/5, Gemini, DeepSeek, Grok, Llama, etc.) under a single $8/month subscription. Users who rely on t3.chat for cost-effective model access have no way to route those requests through OmniRoute's unified proxy, forcing them to manage a separate client and authentication outside of their existing infrastructure.

### Proposed Solution

Add [t3.chat](https://t3.chat) as a new provider in OmniRoute. Due to the platform's architecture, this would likely require cookie/session-based authentication rather than a standard API key. Key implementation points:
- Authenticate using convex-session-id and browser cookies _(similar to how unofficial clients like [T3Router](https://github.com/vibheksoni/t3router) and [t3-python-client](https://github.com/thethereza/t3-python-client) operate)_.
- Support chat completions for major models.
- Support model discovery/listing.
- Handle session refresh automatically where possible.

### Alternatives Considered

- Using third-party reverse-engineered clients directly — this bypasses OmniRoute's routing, load balancing, logging, and rate-limiting features.
- Using individual official APIs for each model provider — this requires managing multiple API keys and subscriptions, which defeats the cost-efficiency of [t3.chat](https://t3.chat).

### Acceptance Criteria

- [t3.chat](https://t3.chat) appears as a selectable provider in the OmniRoute dashboard.
- Chat completion requests can be proxied to [t3.chat](https://t3.chat) successfully.
- Available models are discoverable and listed.
- Cookie-based authentication is configurable in provider settings.
- Existing providers and integrations remain unaffected.

### Area

Provider Support

### Related Provider(s)

t3.chat

### Additional Context

- Pricing: $8/month Pro subscription _(free tier with limited models also exists)_.
- Authentication: No official public API key; uses browser cookies + `convex-session-id`.
- Reference implementations: [T3Router (Rust)](https://github.com/vibheksoni/t3router), [t3-python-client](https://github.com/thethereza/t3-python-client).

### Expected Test Plan

- Unit tests for the [t3.chat](https://t3.chat) provider adapter.
- Integration tests for chat completion routing.
- Verify model discovery endpoint.
- Ensure no regressions in existing provider tests.

## 💬 Community Discussion

No comments yet.

### Participants

- @aartzz — Original requester

### Key Points

- No community discussion recorded at this time.

## 🎯 Refined Feature Description

t3.chat is a multi-model AI chat platform built by Theo Browne (of T3 Stack fame) using Convex as its real-time backend. It exposes 50+ models (Claude, GPT, Gemini, DeepSeek, Grok, Llama, etc.) under a $8/month Pro subscription with a limited free tier. There is no official public API — the platform operates via browser session authentication using `cookies` (including a `convex-session-id`) extracted from an authenticated browser session, which is the same mechanism employed by the reference implementations T3Router (Rust) and t3-python-client (Python).

The t3.chat backend is Convex-powered. Convex typically uses a WebSocket-based sync protocol; however, t3.chat also performs standard HTTP fetch calls for chat actions. Research confirms the authentication flow requires two credentials: full browser cookie string (from t3.chat) and the `convex-session-id` value. The unofficial Rust client (T3Router) shows model IDs use simple lower-case strings (e.g. `claude-3.7`, `gpt-4o`, `gemini-2.5-pro`). Streaming support is not yet confirmed in reference implementations — the Rust library notes "streaming planned," suggesting the current HTTP action may return a full response or use Convex's persistent text streaming component.

### What it solves

- Gives OmniRoute users access to 50+ models via a single $8/month t3.chat subscription, avoiding per-model API key overhead.
- Brings t3.chat requests into OmniRoute's routing, fallback, rate-limiting, and logging pipeline.
- Complements existing web-session providers (deepseek-web, claude-web, copilot-web, chatgpt-web) with a multi-model aggregator.

### How it should work (high level)

1. User configures a `t3-web` connection by providing browser cookies + `convex-session-id` (extracted from browser DevTools — same UX as other web providers).
2. On each request, `T3ChatWebExecutor` sends an authenticated HTTP POST to t3.chat's Convex action endpoint with the model name and message history (mapped from OpenAI format).
3. Response (likely Convex polling or HTTP streaming action) is collected and translated back to OpenAI SSE or JSON format.
4. Errors (expired session: 401/403, rate limit: 429) are mapped to standard OmniRoute error codes and connection cooldown.
5. Model list is statically registered in `providerRegistry.ts` (50+ model entries) since no public model-discovery endpoint exists.

### Affected areas

- `open-sse/executors/t3-chat-web.ts` — new executor (cookie auth + Convex action dispatch + SSE/JSON translation)
- `open-sse/executors/index.ts` — register executor
- `open-sse/config/providerRegistry.ts` — register provider + model list
- `src/shared/constants/providers.ts` — add `t3-web` to provider enum
- `tests/unit/t3-chat-web.test.ts` — unit tests

## 📎 Attachments & References

- [T3Router (Rust) — vibheksoni/t3router](https://github.com/vibheksoni/t3router)
- [t3-python-client — thethereza/t3-python-client](https://github.com/thethereza/t3-python-client)
- [t3.chat FAQ](https://t3.chat/faq)
- [Convex auth docs](https://docs.convex.dev/auth)
- [Convex persistent text streaming](https://github.com/get-convex/persistent-text-streaming)

## 🔗 Related Ideas

- Existing web providers: deepseek-web, claude-web, copilot-web, chatgpt-web — same cookie-auth pattern
