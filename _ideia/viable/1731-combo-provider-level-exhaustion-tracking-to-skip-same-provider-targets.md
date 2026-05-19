---
issue: 1731
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 20
  labels: []
  state: open
  classified_at: 2026-05-01T10:54:56Z
---

# Feature: [Feature] (combo): provider-level exhaustion tracking to skip same-provider targets

> GitHub Issue: #1731 — opened by @matteoantoci on 2026-04-28T15:31:43Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

## Problem

When a combo uses the `auto` strategy, targets are reordered by score. If the top-scored targets all share the same provider (e.g., 4 opencode-go models), a single provider quota exhaustion forces the combo to burn through every same-provider target one by one — each cycling through all accounts getting 429 — before reaching a cross-provider fallback (e.g., glm).

Observed behavior: opencode-go quota exhausted → combo spent ~5 minutes cycling through mimo → kimi → qwen → deepseek (all opencode-go), each spending 30-60s on account fallback loops returning 429, before finally trying glm.

The auto-selection algorithm has no awareness that all top-scored targets share the same provider, so cross-provider diversity is zero in the fallback chain.

## Expected Behavior

Before: opencode-go/mimo (429) → opencode-go/kimi (429) → opencode-go/qwen (429) → opencode-go/deepseek (429) → glm/glm-5.1 (success) — **~5 minutes**

After: opencode-go/mimo (429) → skip kimi/qwen/deepseek → glm/glm-5.1 (success) — **~10 seconds**

## Root Cause

Two issues compound:

1. **`isModelAvailable` pre-check doesn't catch quota exhaustion** — when all accounts return 429 "Subscription quota exceeded", the account-level cooldown is only 3-5s (base cooldown for OAuth/API key profiles). By the time the next combo target is evaluated, the cooldown has expired and the account appears available again.

2. **429 is excluded from the provider circuit breaker** — `PROVIDER_FAILURE_ERROR_CODES = {408, 500, 502, 503, 504}` at `accountFallback.ts:59`. Even hundreds of consecutive 429s won't open the provider breaker, so there's no durable cross-request backoff for rate-limited providers.

<details><summary>Log evidence (14:00-14:02 UTC, 2026-04-28)</summary>

```
14:00:30 Model opencode-go/mimo-v2.5-pro failed, trying next (429)
14:00:31 Trying model 2/5: opencode-go/kimi-k2.6
14:01:18 Model opencode-go/kimi-k2.6 failed, trying next (429)
14:01:18 Trying model 3/5: opencode-go/qwen3.6-plus
14:02:10 Model opencode-go/qwen3.6-plus succeeded (146978ms, 1 fallbacks)
```

All accounts returned 429 "Subscription quota exceeded" for each model in sequence. Total cascade: ~2 minutes before a working path was found.

</details>

<details><summary>Additional evidence: overnight harness (2026-04-29)</summary>

```
03:40:50 429 mimo-v2.5-pro "Subscription quota exceeded"
03:40:56 429 mimo-v2.5-pro "Subscription quota exceeded"
03:51:03 429 mimo-v2.5-pro "Subscription quota exceeded"
03:51:09 429 mimo-v2.5-pro "Subscription quota exceeded"
03:51:15 429 mimo-v2.5-pro "Subscription quota exceeded"
...
06:48:39 429 mimo-v2.5-pro "Subscription quota exceeded"
```

All 429s are from the same provider. The combo never reached the cross-provider fallback (glm). Every request cycled through all 3 accounts × all opencode-go targets before giving up.

</details>

## 💬 Community Discussion

*No comments.*

### Participants

- @matteoantoci

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Refined and scoped for implementation.

### What it solves

- Combo routing wastes significant time retrying multiple targets from the same provider when the entire provider is rate-limited or quota-exhausted.

### How it should work (high level)

1. Track 429 quota exhaustion errors at the provider level.
2. In `combo.ts`, before attempting a target, check if its provider is currently marked as exhausted.
3. If exhausted, skip the target and move to the next provider.

### Affected areas

- open-sse/services/combo.ts, open-sse/services/accountFallback.ts

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
