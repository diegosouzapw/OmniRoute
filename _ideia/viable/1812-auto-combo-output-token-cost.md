---
issue: 1812
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

# Feature: Auto-combo scoring ignores output token cost

> GitHub Issue: #1812 — opened by @matteoantoci on 2026-04-30
> Status: 📋 Cataloged | Priority: High (correctness bug)

## Original Request

## Problem

In `buildAutoCandidates()` (combo.ts), `costPer1MTokens` is set to only the input token price from `getPricingForModel()`. The output token price is read from pricing data but never used.

## Details

This matters because many reasoning models (e.g., o3, DeepSeek R1) have cheap input tokens but expensive output tokens. Without factoring in output cost, these models appear artificially cheap in the scoring pool.

For example:
- Model A: $3/M input, $15/M output → scored as $3
- Model B: $5/M input, $5/M output → scored as $5
- Router picks Model A as cheaper, but with a typical 40% output ratio, Model A actually costs $3 + $15×0.4 = $9 vs Model B's $5 + $5×0.4 = $7

## Expected Behavior

The cost scoring factor should account for both input and output token pricing. A blended cost using an estimated output/input ratio would give more accurate cost comparisons between models.

## Community Discussion

No comments yet. Issue is self-contained and technically precise.

### Participants

- @matteoantoci — Original requester

### Key Points

- The bug is narrow and well-scoped: only `buildAutoCandidates()` in `combo.ts` is directly affected
- The fix requires introducing a blended cost formula: `inputPrice * (1 - outputRatio) + outputPrice * outputRatio`
- A sensible default output ratio is ~0.4 (40% output tokens), matching the example in the issue
- The `getPricingForModel()` already returns an object with both `pricing.input` and `pricing.output` fields — the output field is simply never read in `buildAutoCandidates()`

## Refined Feature Description

The auto-combo `costInv` scoring factor currently uses only the input token price as a proxy for total request cost. This systematically underestimates the real cost of reasoning-heavy models (o3, DeepSeek R1, Claude 3.7 thinking, etc.) that have cheap input but expensive output tokens, causing the router to incorrectly prefer them in cost-sensitive routing decisions.

The fix introduces a **blended cost** formula:

```
costPer1MTokens = inputPrice * (1 - OUTPUT_RATIO) + outputPrice * OUTPUT_RATIO
```

where `OUTPUT_RATIO` is a configurable constant (default `0.4`) representing the expected fraction of tokens that are output. This mirrors how `costCalculator.ts` already handles both `pricing.input` and `pricing.output` fields for actual invoice calculations.

### What it solves

- Reasoning models (o3, DeepSeek R1, Gemini Thinking) are no longer artificially ranked as "cheap" candidates
- Cost-optimized routing (`auto/cheap`, `cost-saver` mode pack) produces economically accurate selections
- Parity with `costCalculator.ts` which already uses both input and output pricing for real cost accounting

### How it should work (high level)

1. In `buildAutoCandidates()`, after reading `pricing.input`, also read `pricing.output`
2. If both values are finite and non-negative, compute blended cost using a constant output ratio (default 0.4)
3. If only input is available (output is missing/zero), fall back to input-only cost (current behavior) to avoid regressions for providers without output pricing data
4. Export `OUTPUT_TOKEN_RATIO` as a named constant in `open-sse/config/constants.ts` so it is discoverable and overridable in tests
5. Add unit tests asserting the blended cost is used when both prices are present, and the fallback when output is absent

### Affected areas

- `open-sse/services/combo.ts` — `buildAutoCandidates()` function (~lines 1218–1227)
- `open-sse/config/constants.ts` — new `OUTPUT_TOKEN_RATIO` constant
- `tests/unit/auto-combo-engine.test.ts` or a new `tests/unit/combo-cost-blending.test.ts`

## Attachments & References

- No external attachments.

## Related Ideas

- `_ideia/viable/1731-combo-provider-level-exhaustion-tracking-to-skip-same-provider-targets.md` — also touches combo candidate selection logic; coordinate to avoid merge conflicts in `buildAutoCandidates()`
