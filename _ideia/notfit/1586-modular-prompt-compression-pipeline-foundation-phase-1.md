# Feature: [Feature] Modular Prompt Compression Pipeline — Foundation (Phase 1)

> GitHub Issue: #1586 — opened by @oyi77 on 2026-04-25T11:51:38Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem / Use Case

OmniRoute currently has a reactive context manager (`open-sse/services/contextManager.ts`) that only compresses prompts when they **exceed** a model's context window. This means:

1. **Zero savings on normal requests** — if a prompt fits the window, no optimization happens at all, even though 10-40% of tokens are wasted on filler, repetition, and verbose phrasing.
2. **Destructive overflow handling** — when context does overflow, the current approach drops messages entirely (purify history) or truncates tool outputs (2000 char limit), losing information irreversibly.
3. **No per-combo control** — different combos (free-tier vs premium) have different cost sensitivities, but there's no way to apply different compression levels.
4. **Free quota is wasted** — free tier users hit rate limits constantly; reducing token consumption by 25-40% would effectively increase their usable quota by the same amount.

**The proxy layer is the perfect place for compression.** Every request passes through OmniRoute. No individual SDK or client can achieve this — it requires a centralized interception point.

## Proposed Solution

Introduce a **modular compression pipeline** that runs **before** the existing context manager, with four compression modes on a speed/savings/quality tradeoff spectrum:

```
Full Prompt ──→ [Strategy Selector] ──→ Compressed Prompt ──→ Upstream Provider
                       │
                       ├── 🟢 Lite (instant, ~10-15% savings)
                       │     Structural dedup, whitespace normalization, system prompt dedup
                       │
                       ├── 🟡 Standard / Caveman (~25-40% savings, <5ms)
                       │     Rule-based NLP: strip filler, compress instructions, condense context
                       │
                       ├── 🟠 Aggressive (~40-60% savings, <50ms)
                       │     History summarization, tool result compression, progressive aging
                       │
                       └── 🔴 Ultra (up to 80% savings, LLM-assisted)
                             LLMLingua-style perplexity-based token pruning via local SLM
```

### Pipeline Placement

```
Client Request
  → API Route (auth, guardrails)
  → [NEW: Compression Pipeline]  ← INSERT HERE, before context manager
  │   ├── Strategy selection (based on config + context size)
  │   ├── Compression execution (lite/caveman/aggressive/ultra)
  │   └── Stats logging (tokens saved, technique used)
  → [EXISTING: Context Manager (overflow handling)]
  → [EXISTING: Memory Injection]
  → [EXISTING: System Prompt Injection]
  → [EXISTING: Thinking Budget]
  → chatCore → Executor → Upstream
```

Key design: **Compression runs before context manager.** Compression reduces the base token count proactively. Context manager still handles overflow cases. Together they provide both proactive savings AND reactive overflow protection.

### Phase 1 Scope — Foundation

This issue covers **Phase 1 only**: the pipeline framework, strategy selector, lite compression, and integration into `chatCore.ts`.

| Component | File | Description |
|---|---|---|
| **Compression config** | `src/lib/db/compression.ts` | DB schema for compression settings (enabled, defaultMode, autoTriggerTokens, cacheMinutes, preserveSystemPrompt, comboOverrides) |
| **Strategy selector** | `open-sse/services/compression/strategySelector.ts` | Mode selection logic: check config → check combo override → estimate tokens → decide mode |
| **Lite compression** | `open-sse/services/compression/lite.ts` | Structural optimizations: whitespace collapse, system prompt dedup, tool result structural compression, duplicate message removal, image URL → placeholder for non-vision models |
| **Compression stats** | `open-sse/services/compression/stats.ts` | Track original tokens, compressed tokens, savings %, technique used per request |
| **Pipeline integration** | `open-sse/handlers/chatCore.ts` | Insert compression call before `compressContext()` |
| **Settings API** | `src/app/api/v1/settings/compression/route.ts` | CRUD for compression config (GET/PUT) |
| **Unit tests** | `tests/unit/compression/` | Tests for strategy selector, lite compression, stats |

### Lite Compression Techniques

| Technique | What It Does | Est. Savings |
|---|---|---|
| Whitespace collapse | Reduce 3+ newlines to 2, trim trailing spaces | 3-5% |
| System prompt dedup | Detect repeated system instructions across messages | 5-10% |
| Tool result structural compression | Replace verbose JSON keys with shorter aliases | 5-15% |
| Redundant content removal | Remove duplicate messages (common in multi-turn) | 2-5% |
| Image URL → placeholder | Replace base64 images with `[image: WxH, format]` for non-vision models | 80-95% on that message |

## Alternatives Considered

1. **Only compress on overflow** (current approach) — Misses 90%+ of requests that fit but waste tokens. Rejected as insufficient.
2. **LLM-based compression only** (send to cheap model, get summary back) — Adds latency and cost. Not practical as the only mode. Kept as optional "Ultra" tier.
3. **Client-side compression** — Requires every SDK/client to implement compression. Defeats the purpose of a centralized proxy.

## Acceptance Criteria

- [ ] `src/lib/db/compression.ts` — DB module with settings schema (enabled, mode, overrides, thresholds)
- [ ] `open-sse/services/compression/strategySelector.ts` — Strategy selection logic with config lookup
- [ ] `open-sse/services/compression/lite.ts` — All 5 lite compression techniques implemented
- [ ] `open-sse/services/compression/stats.ts` — Per-request compression stats tracking
- [ ] `open-sse/handlers/chatCore.ts` — Compression pipeline called before `compressContext()`
- [ ] `src/app/api/v1/settings/compression/route.ts` — GET/PUT compression settings
- [ ] `tests/unit/compression/` — Unit tests for all new modules with 60%+ coverage
- [ ] Existing request flow unchanged when compression mode is `off`
- [ ] Compression stats logged to detailed logs (optional per-request)
- [ ] No regression in existing `compressContext()` behavior
- [ ] Lite mode adds <1ms latency on average requests

## Area

- [x] Proxy / Routing
- [ ] Dashboard / UI
- [ ] Provider Support
- [ ] CLI Tools Integration
- [ ] OAuth / Authentication
- [x] Analytics / Usage Tracking

## Related Provider(s)

All providers — this is a cross-cutting optimization that applies to every upstream request.

## Additional Context

### Token Savings Estimates

| Mode | Per-Request Savings | Latency Impact | Quality Impact | Best For |
|---|---|---|---|---|
| Off | 0% | 0ms | None | Premium providers, sensitive tasks |
| Lite | 10-15% | <1ms | Imperceptible | All requests (recommended default) |
| Standard (Caveman) | 25-40% | <5ms | Minimal | Chat, coding, general Q&A |
| Aggressive | 40-60% | <50ms | Moderate | Long conversations, tool-heavy flows |
| Ultra | 60-80% | 100-500ms | Noticeable | Batch processing, rate-limited quotas |

### Why This Matters for OmniRoute

1. **Free tier multiplier**: 40% compression = 40% more free usage. Directly improves "never stop coding" value prop.
2. **Competitive moat**: No other AI proxy/router offers prompt compression.
3. **Combo routing synergy**: When falling back to cheap providers (smaller context windows), compression makes them more effective.
4. **Zero-cost Lite mode**: <1ms overhead, 10-15% savings. No reason not to enable it by default.

### Compatibility with Provider-Side Prompt Caching

Anthropic and OpenAI offer prompt caching where repeated prompts cost less. Compression should **skip** when provider-side caching is active (a cached prompt costs less than a compressed uncached one). The strategy selector must be provider-aware.

## Expected Test Plan

- Unit tests for `strategySelector.ts` — all mode selection paths
- Unit tests for `lite.ts` — each compression technique independently
- Unit tests for `stats.ts` — token counting accuracy
- Integration test: full request flow with compression enabled/disabled
- Integration test: compression + context manager interaction (compress first, then handle overflow)
- Test coverage: 60%+ for all new modules
- Run `npm run test:all` — no regressions in existing tests

## 💬 Community Discussion

**@kilo-code-bot** (2026-04-25T11:51:43Z):
This issue appears to be a duplicate of https://github.com/diegosouzapw/OmniRoute/issues/813.

> **\[Feature\] Prompt Caching & Provider-Specific Caching Support** (#813)

Similarity score: 90%

*This comment was generated by Kilo Auto-Triage.*
---
**@oyi77** (2026-04-25T12:06:53Z):
**Not a duplicate of #813.** These are complementary but distinct features:

- **#813 (Prompt Caching)**: Leverages *provider-side* caching (Anthropic `cache_control`, Gemini `cachedContent`, OpenAI `prompt_cache_key`) to reduce costs on **repeated identical prefixes**. The savings come from the provider reusing KV cache across requests.

- **This issue (Prompt Compression)**: Reduces the *token count* of prompts **before** sending them upstream. The savings come from making each request physically smaller — fewer tokens = lower cost, regardless of whether the provider caches anything.

**Key difference**: Caching saves money when the *same* prompt repeats. Compression saves money on *every* request, even unique ones. They're complementary — compression reduces the base token count, caching saves on repetition. In fact, #1591 specifically addresses the interaction between compression and caching (deterministic compression preserves cache hits).

Our full proposal spans 6 issues as a phased rollout:
- #1586 — Pipeline framework + Lite mode (Phase 1)
- #1587 — Caveman compression (Phase 2)
- #1588 — Aggressive compression with history summarization (Phase 3)
- #1589 — Ultra compression with LLMLingua-style pruning (Phase 4)
- #1590 — Dashboard UI + Analytics
- #1591 — MCP tools + provider-aware caching integration (specifically builds on #813's work)
---
**@diegosouzapw** (2026-04-25T15:02:50Z):
Thank you for this well-structured, phased proposal, @oyi77! We've reviewed the full 6-issue series (#1586–#1591) and agree these are **not duplicates** — each phase adds a distinct compression module with different algorithms and savings profiles.

The Kilo bot's auto-triage incorrectly flagged these based on surface keyword similarity. We're removing the `kilo-duplicate` labels.

This is a great feature direction that complements our existing proactive context compression (introduced in v3.6.6). We'll track these for a future release cycle. Phase 1 (pipeline framework + Lite mode) is the natural starting point and would integrate cleanly with the existing `contextManager.ts` infrastructure.

Keeping all 6 issues open as a tracked feature series.
---


### Participants

- @oyi77
- @diegosouzapw
- @kilo-code-bot

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Feature needs manual refinement and interpretation to fill logical gaps and outline high-level technical scope.

### What it solves

- TBD

### How it should work (high level)

1. TBD
2. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
