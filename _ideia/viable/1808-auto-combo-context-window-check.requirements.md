# Requirements: 1808 — Auto-combo context window pre-filter

> Status: VIABLE
> Branch: `release/v3.8.0`

---

## 1. Problem Statement

The `auto` combo strategy in `open-sse/services/combo.ts` selects candidates based on a 9-factor scoring function but does not pre-filter candidates whose context window is too small to fit the request. This causes at least one guaranteed-fail attempt before the combo falls back to a larger-context model, adding latency and consuming retry budget.

---

## 2. Existing Infrastructure (no new utilities needed)

| Utility | Location | Purpose |
|---|---|---|
| `estimateTokens(text)` | `open-sse/services/contextManager.ts:53` | Estimates token count via `Math.ceil(str.length / 4)`. Currently used only after model selection for context compression. |
| `getModelContextLimit(provider, model)` | `src/lib/modelCapabilities.ts:313` | Returns `contextWindow` from synced capabilities + model specs. Returns `null` when unknown. |
| `getModelContextLimitForModelString(modelStr)` | `open-sse/services/combo.ts:676` | Parses a `"provider/model"` string and delegates to `getModelContextLimit`. Already used for `context-optimized` and `sortTargetsByContextSize`. |
| `RoutingContext.estimatedInputTokens` | `open-sse/services/autoCombo/routerStrategy.ts:19` | Field already declared on the interface; never populated. |

---

## 3. Where to Add the Check

### 3.1 Primary change: `open-sse/services/combo.ts`

**Location**: inside the `if (strategy === "auto")` block, immediately after the existing tool-calling filter (around line 1711), before the `buildAutoCandidates()` call.

**Pattern to follow** (tool-calling filter at lines 1702–1711):

```ts
if (requestHasTools) {
  const filtered = eligibleTargets.filter((target) => supportsToolCalling(target.modelStr));
  if (filtered.length > 0) {
    eligibleTargets = filtered;
  } else {
    log.warn(
      "COMBO",
      "Auto strategy: all candidates filtered by tool-calling policy, falling back to full pool"
    );
  }
}
```

**New block to add after the tool-calling filter**:

```ts
// Context-window pre-filter (issue #1808)
// Estimate input tokens once; exclude candidates whose known context limit is too small.
const estimatedInputTokens = estimateTokens(JSON.stringify(body?.messages ?? []));
if (estimatedInputTokens > 0) {
  const filtered = eligibleTargets.filter((target) => {
    const limit = getModelContextLimitForModelString(target.modelStr);
    if (limit === null || limit === undefined) return true; // unknown limit — include to be safe
    return limit >= estimatedInputTokens;
  });
  if (filtered.length > 0) {
    eligibleTargets = filtered;
    log.debug(
      "COMBO",
      `Auto strategy: context-window filter kept ${filtered.length}/${eligibleTargets.length + (eligibleTargets.length - filtered.length)} candidates (estimated ${estimatedInputTokens} tokens)`
    );
  } else {
    log.warn(
      "COMBO",
      `Auto strategy: all candidates filtered by context-window policy (estimated ${estimatedInputTokens} tokens), falling back to full pool`
    );
  }
}
```

**Required imports** (already imported in combo.ts — verify):
- `estimateTokens` from `./contextManager.ts` — **not yet imported**, must be added to the import block.
- `getModelContextLimitForModelString` — already a local function in `combo.ts` (line 676), no import needed.

Import line to add near the top of `combo.ts`:

```ts
import { estimateTokens } from "./contextManager.ts";
```

### 3.2 Secondary change: `open-sse/services/combo.ts` — pass `estimatedInputTokens` to `RoutingContext`

At the `selectWithStrategy()` call site (~line 1766), populate the already-declared field:

```ts
const decision = selectWithStrategy(
  candidates,
  { taskType, requestHasTools, lastKnownGoodProvider, estimatedInputTokens },
  routingStrategy
);
```

This makes the token count available to custom `RouterStrategy` implementations without any interface changes.

---

## 4. Token Estimation Strategy

`estimateTokens()` uses a 4-chars-per-token heuristic (`Math.ceil(str.length / 4)`). This deliberately over-estimates on average (real BPE rates are closer to 3.5–4 for English prose, lower for code). An over-estimate means:

- **Safe side**: models are more likely to be excluded than included when the input is near the limit.
- **Not a correctness issue**: the fallback (revert to full pool if all filtered) ensures routing never silently breaks.
- **No tokenizer dependency**: avoids adding a heavy tokenizer library to the hot request path.

The estimation is applied to `JSON.stringify(body.messages)`, which includes role fields and JSON syntax overhead — consistent with how `contextManager.ts::compressContext()` uses it.

---

## 5. Fallback Contract

If all candidates are excluded by the context-window filter:
1. Log a `warn`-level message with estimated token count.
2. Restore `eligibleTargets` to the pre-filter set (identical to tool-calling fallback behavior).
3. Do NOT throw or return an error — this is a best-effort heuristic, not a hard gate.

The upstream provider will still return a "prompt too long" error if the estimation was accurate; the existing fallback/retry machinery handles that case as before.

---

## 6. Test Plan

**File**: `tests/unit/combo-context-window-filter.test.ts`

| Test case | Scenario | Expected outcome |
|---|---|---|
| TC-1 | 3 candidates with limits [8K, 32K, 128K]; estimated tokens = 20K | Only 32K and 128K candidates survive the filter |
| TC-2 | All candidates have limit 4K; estimated tokens = 20K | Filter falls back to full 3-candidate pool (fallback contract) |
| TC-3 | Mix of null-limit and small-limit candidates; large input | Null-limit candidates are always included; small-limit ones excluded |
| TC-4 | `body.messages` is empty or missing | `estimatedInputTokens = 0` → filter is skipped entirely (no-op) |
| TC-5 | `estimatedInputTokens` is propagated in `RoutingContext` | Value matches the estimation result |

---

## 7. Out of Scope

- Replacing `estimateTokens()`'s 4-char heuristic with a proper BPE tokenizer — tracked separately if needed.
- Applying this filter to non-`auto` strategies — other strategies (e.g., `context-optimized`, `priority`) have their own ordering/selection logic that already accounts for context size differently.
- Changing `contextManager.ts` or `modelCapabilities.ts` — both are used as-is.

---

## 8. Acceptance Criteria

- [ ] Context-window filter block added in `combo.ts` after the tool-calling filter, using `estimateTokens` + `getModelContextLimitForModelString`.
- [ ] `estimateTokens` imported in `combo.ts`.
- [ ] `estimatedInputTokens` populated in the `RoutingContext` passed to `selectWithStrategy()`.
- [ ] Fallback (revert to full pool) triggers when all candidates are filtered.
- [ ] Unit tests pass covering TC-1 through TC-5.
- [ ] No regressions in `npm run test:unit`.
- [ ] Coverage gate (`npm run test:coverage`) remains >= 75/75/75/70.
