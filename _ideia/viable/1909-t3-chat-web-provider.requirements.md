# Requirements: Add t3.chat web provider

> Feature Idea: [#1909](./1909-t3-chat-web-provider.md)
> Research Date: 2026-05-19
> Verdict: ✅ VIABLE

## 🔍 Research Summary

t3.chat is a multi-model AI chat platform (Theo Browne / T3 Stack) built on Convex. It exposes 50+ models under a $8/month Pro subscription. There is no official API — authentication relies on browser session cookies plus a `convex-session-id` value extracted from browser DevTools. Two reference implementations exist: T3Router (Rust, `vibheksoni/t3router`) and t3-python-client (Python, `thethereza/t3-python-client`). Both confirm the two-credential pattern. Model IDs are simple lowercase strings (`claude-3.7`, `gpt-4o`, `gemini-2.5-pro`, etc.).

The t3.chat backend uses Convex's WebSocket sync protocol but chat submissions go through Convex HTTP actions. Convex's persistent-text-streaming pattern is likely used for response delivery. Streaming support is not yet confirmed in the reference implementations (T3Router notes "streaming planned"), so the initial executor may need to poll or collect a full response from the Convex HTTP action.

**ToS risk**: t3.chat's terms of service could not be fetched during research (rate-limited). Reference implementations include explicit disclaimers that the tool is a technical demonstration, not endorsed by t3.chat, and accounts may be actioned. This is consistent with other web providers in OmniRoute (claude-web, chatgpt-web) which carry the same inherent ToS ambiguity. OmniRoute should surface this risk in UI documentation but proceed with the implementation per the established web-provider precedent.

## 📚 Reference Implementations

| # | Repository | Stars | Last Updated | Approach | Relevance |
|---|------------|-------|--------------|----------|-----------|
| 1 | [vibheksoni/t3router](https://github.com/vibheksoni/t3router) | ~N/A | 2025 | Rust library; cookie + convex-session-id → HTTP action → full response | High |
| 2 | [thethereza/t3-python-client](https://github.com/thethereza/t3-python-client) | ~N/A | 2025 | Python library; same cookie + session ID; bookmarklet extraction UX | High |
| 3 | [get-convex/persistent-text-streaming](https://github.com/get-convex/persistent-text-streaming) | ~N/A | 2025 | Convex component for HTTP-streaming text while persisting server-side | Medium |

### Key Patterns Found

- **Credential extraction**: Both clients use a bookmarklet or manual DevTools copy to extract `document.cookie` + `convex-session-id` value from an authenticated t3.chat browser tab. OmniRoute should provide the same instructions in provider setup documentation.
- **Auth headers**: HTTP requests carry `Cookie: <full_cookie_string>` and a custom header (or request body field) for `convex-session-id`. The exact header name (`convex-session-id` or body field) needs to be confirmed against network traffic capture.
- **Model IDs**: Simple lowercase strings, e.g. `claude-3.7`, `gpt-4o`, `gemini-2.5-pro`, `deepseek-r1`, `llama-3.3-70b`. Must be registered statically; no public discovery endpoint.
- **Streaming**: Not yet confirmed. Likely Convex HTTP action with persistent text streaming (chunked transfer encoding). Implementation should attempt streaming, fall back to polling if not available.
- **DeepSeek-web precedent**: The `deepseek-web` executor (which handles a custom non-OpenAI JSON streaming protocol) is the closest structural analog. `claude-web` provides a more complex session-management example. `t3-chat-web` will be simpler than both since there is no PoW challenge and no sub-org routing.

## 📐 Proposed Solution Architecture

### Approach

Create a new `T3ChatWebExecutor` that authenticates via browser cookies + convex-session-id, submits chat requests to t3.chat's Convex HTTP action endpoint, and transforms the response (streaming chunks or full JSON) back to OpenAI SSE format. Model list is statically registered. The executor follows the established web-provider pattern in OmniRoute.

The Convex HTTP action endpoint is not yet confirmed from public sources. It likely follows the pattern:
```
POST https://t3.chat/api/chat  (or Convex deployment action URL)
Content-Type: application/json
Cookie: <full_browser_cookies>
convex-session-id: "<session_id>"

{ "model": "claude-3.7", "messages": [...], "stream": true }
```

The implementer will need to capture a real network request via browser DevTools to confirm the exact endpoint and request/response format before coding the executor.

### New Files

| File | Purpose |
|------|---------|
| `open-sse/executors/t3-chat-web.ts` | New executor: cookie auth, Convex action dispatch, SSE/JSON response translation to OpenAI format |
| `tests/unit/t3-chat-web.test.ts` | Unit tests: credential validation, model mapping, SSE transform, error handling |

### Modified Files

| File | Changes |
|------|---------|
| `open-sse/executors/index.ts` | Import and register `T3ChatWebExecutor` under key `"t3-web"` |
| `open-sse/config/providerRegistry.ts` | Add `t3-web` provider entry with 50+ model definitions |
| `src/shared/constants/providers.ts` | Add `"t3-web"` to the provider Zod enum |

### Database Changes

- None. Credentials stored as connection `credentials` JSON with `cookies` and `convexSessionId` fields (same pattern as other web providers).

### API Changes

- None. The new provider plugs into the existing executor dispatch layer transparently.

### UI Changes

- Provider setup page: add connection instructions explaining how to extract `cookies` + `convex-session-id` from browser DevTools (consistent with deepseek-web and claude-web setup instructions).

## ⚙️ Implementation Effort

- **Estimated complexity**: Medium
- **Estimated files changed**: ~5
- **Dependencies needed**: None (uses native `fetch`, same as all other web executors)
- **Breaking changes**: No
- **i18n impact**: ~2-4 new provider label keys
- **Test coverage needed**: Credential validation, request construction, SSE stream transform (mocked), error code mapping (401/403/429)

## ⚠️ Open Questions

1. **Exact Convex HTTP action endpoint** — needs to be confirmed via browser DevTools network capture on a real t3.chat session. The T3Router Rust source (not fully accessible) may contain the URL; the implementer should read the actual source code before writing the executor.
2. **Streaming availability** — does t3.chat's Convex action return streaming chunks or a single full response? If non-streaming, the executor can return a plain JSON response, but streaming is strongly preferred for UX parity with other providers.
3. **Free tier models** — the issue states a free tier exists with limited models. The provider registry should note which models require Pro; credential validation could attempt a lightweight request to detect account tier.
4. **Session refresh** — unlike deepseek-web (which has `ds_session_id` as a stable cookie), Convex session IDs may expire. The issue requests auto-refresh; this may require a separate `t3-chat-web-with-auto-refresh.ts` variant (consistent with `deepseek-web-with-auto-refresh.ts`).
5. **ToS compliance** — same ambiguity as all other web providers. Should be documented in provider description but not block implementation per established OmniRoute precedent.

## 🔗 External References

- [T3Router (Rust)](https://github.com/vibheksoni/t3router)
- [t3-python-client (Python)](https://github.com/thethereza/t3-python-client)
- [Convex HTTP streaming pattern](https://stack.convex.dev/ai-chat-with-http-streaming)
- [Convex persistent-text-streaming component](https://github.com/get-convex/persistent-text-streaming)
- [t3.chat FAQ](https://t3.chat/faq)
- [deepseek-web executor (reference)](open-sse/executors/deepseek-web.ts)
- [copilot-web executor (reference)](open-sse/executors/copilot-web.ts)
