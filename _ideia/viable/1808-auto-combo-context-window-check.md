---
issue: 1808
last_synced_at: 2026-05-19T00:00:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  commenters: 0
  age_days: 19
  labels: []
  state: open
  classified_at: 2026-05-19T00:00:00Z
---

# Feature: Auto-combo context window pre-filter

> GitHub Issue: #1808 — opened by @matteoantoci on 2026-04-30
> Status: ✅ VIABLE | Priority: Medium

## 📝 Original Request

### Problem

When auto-combo scores and selects candidates, it doesn't consider whether each model's context window can fit the request. A large request can be routed to a model with a small context window, which immediately fails and wastes a retry slot before falling back.

### Details

- The auto strategy already filters candidates by tool-calling support (when the request includes tools), falling back to the full pool if all are filtered out
- Token estimation (`estimateTokens()` in `contextManager.ts`) and context limit lookup (`getModelContextLimit()` in `modelCapabilities.ts`) already exist but are only used during context compression after a model is chosen
- The `estimatedInputTokens` field exists in `routerStrategy.ts` but is never populated
- When this happens, the user sees extra latency from the failed attempt plus the fallback retry

### Reproduction

1. Configure a combo with models that have different context window sizes (e.g., 16K and 128K)
2. Send a request with a large prompt that exceeds the smaller model's context window
3. Observe: the request is routed to the small model, fails with "input too long", then falls back to the larger model
4. Expected: the small model is excluded from candidates before scoring runs

### Environment

Observed on v3.7.5. The context window information is available but not used during auto-combo candidate selection.

## 💬 Community Discussion

No comments yet.

### Participants

- @matteoantoci — Original requester

### Key Points

- The infrastructure (token estimator + context limit lookup) is already in place — the gap is purely that it isn't wired into the pre-selection filter step.
- The tool-calling filter is the correct precedent: filter first, fall back to full pool if nothing survives.

## 🎯 Refined Feature Description

Before the auto-combo strategy scores and orders candidates, add a context-window pre-filter that removes any candidate whose known context limit is smaller than the estimated input token count. This mirrors the existing tool-calling filter (lines 1702–1711 of `combo.ts`) and follows the same fallback contract: if all candidates are filtered out, revert to the unfiltered pool to avoid a silent 0-candidate state.

The estimation path already exists in `open-sse/services/contextManager.ts::estimateTokens()`. The limit lookup already exists in `src/lib/modelCapabilities.ts::getModelContextLimit()` (re-exported via `open-sse/services/combo.ts::getModelContextLimitForModelString()`). The `RoutingContext.estimatedInputTokens` field already exists in `routerStrategy.ts` but is never set.

### What it solves

- Eliminates guaranteed-fail routing attempts that consume retry budget and add latency.
- Makes auto-combo candidate selection aware of an input property (prompt length) it currently ignores entirely.
- Surfaces the estimated token count to `RouterStrategy` implementations that may want to act on it.

### How it should work (high level)

1. After the tool-calling filter and before `buildAutoCandidates()`, estimate input tokens from the request body using `estimateTokens(JSON.stringify(body.messages))`.
2. Filter `eligibleTargets` to those whose context limit (via `getModelContextLimitForModelString`) is either unknown (null → include to be safe) or >= estimated input tokens.
3. If the filtered set is empty, log a warning and revert to the pre-filter set (same pattern as tool-calling fallback).
4. Pass `estimatedInputTokens` into `RoutingContext` so `RouterStrategy` implementations can also act on it.
5. Add a unit test covering: (a) small-context candidates are excluded, (b) if all candidates are excluded the fallback restores them, (c) candidates with null context limit are included.

### Affected areas

- `open-sse/services/combo.ts` — add the context-window filter block in the `strategy === "auto"` branch (~line 1712, after tool-calling filter)
- `open-sse/services/autoCombo/routerStrategy.ts` — `RoutingContext.estimatedInputTokens` is already declared; populate it at the `selectWithStrategy()` call site
- `open-sse/services/contextManager.ts` — `estimateTokens()` is the token estimator to reuse (no changes needed)
- `src/lib/modelCapabilities.ts` — `getModelContextLimit()` is the limit lookup to reuse (no changes needed)
- `tests/unit/combo-context-window-filter.test.ts` — new unit test file

## 📎 Attachments & References

None.

## 🔗 Related Ideas

- `_ideia/1812-auto-combo-output-token-cost.md` — related auto-combo scoring improvement; both involve better use of model metadata during candidate selection.
