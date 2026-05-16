---
title: "OmniRoute Tiers — User Guide"
version: 3.8.0
lastUpdated: 2026-05-15
---

# OmniRoute Tiers — User Guide

OmniRoute organizes the 207+ supported providers into 3 economic tiers. Each
request travels through them in order until one returns successfully — you
get the cheapest viable response without ever writing fallback code.

## Tier 1 — Subscription

**Providers you already pay for.** OmniRoute uses every drop of quota before
it expires.

| Provider                            | Why Tier 1                                   |
| ----------------------------------- | -------------------------------------------- |
| Claude Code OAuth                   | Anthropic Pro/Team — flat-rate, often unused |
| OpenAI Codex (ChatGPT subscription) | Plus/Team includes Codex quota               |
| GitHub Copilot                      | Per-seat — quota resets monthly              |
| Cursor IDE                          | Pro plan quota                               |
| Antigravity / Windsurf              | Built-in quotas                              |

**Strategy**: route here first for every request that fits the model's
strengths. Quota tracker monitors approaching reset; combo strategies
`reset-aware` and `subscription` prioritize accordingly.

## Tier 2 — Cheap

**Pay-per-token providers under $1/1M tokens.** Reserved for high-volume work
or after Tier 1 quotas hit limits.

| Provider                     | Price (input/output) | Strengths            |
| ---------------------------- | -------------------- | -------------------- |
| DeepSeek V4 Pro              | $0.27 / $1.10 per 1M | Code, reasoning      |
| GLM-4.5                      | $0.60 / $2.20 per 1M | Long context         |
| MiniMax M1                   | $0.20 / $1.10 per 1M | Speed                |
| Qwen Coder                   | $0.30 / $1.20 per 1M | Code                 |
| OpenRouter (price-optimized) | varies               | 100+ models, dynamic |

**Strategy**: combo `cost-optimized` picks lowest $/token model that meets
the task's capability filter (vision, JSON mode, tools, max-context).

## Tier 3 — Free

**Zero-cost providers** — free tiers, credit programs, OAuth daily quotas.

| Provider         | Free quota / credits                 |
| ---------------- | ------------------------------------ |
| Kiro AI          | Free Claude tier (generous fair-use) |
| OpenCode Free    | No auth, generous rate limits        |
| Qoder            | Free OAuth                           |
| Gemini CLI OAuth | Generous daily quota                 |
| Google Vertex AI | $300 new-account credits             |
| Amazon Q         | Free tier for AWS users              |
| Pollinations     | Open public API                      |
| Cloudflare AI    | Workers AI free tier                 |

**Strategy**: combo `auto` with budget cap routes here when Tier 1+2 fail
or when `useFreeOnly=true` is set. Free providers often have weaker
rate limits — circuit breaker recovers them on backoff.

## Configuring tiers

Dashboard → **Tiers** → assign your providers. Defaults (from `tierDefaults.json`) are
sensible; edit when you have specific subscriptions to prioritize or providers to exclude.

Auto-Combo's 9-factor scoring also considers tier. See
[`docs/routing/AUTO-COMBO.md`](../routing/AUTO-COMBO.md).

## Telemetry

Dashboard → **Usage** shows tokens spent per tier per day. Use this to:

- Confirm Tier 1 is utilized fully (otherwise you're wasting subscription value)
- Identify which Tier 2 models are picked most (consolidate to 1-2)
- Verify Tier 3 saves money on test/exploration workloads

## Common patterns

### Pure-free workload

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "costInv": 0.5, "tierPriority": 0.3 } } }
}
```

Forces strongly towards Tier 3; only uses Tier 2 if Tier 3 is unavailable.

### Subscription-first with cheap fallback

```json
{
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code-oauth", "weight": 1 },
    { "provider": "deepseek", "weight": 1 },
    { "provider": "kiro", "weight": 1 }
  ]
}
```

Explicit ordered list matching Tier 1 → Tier 2 → Tier 3.
