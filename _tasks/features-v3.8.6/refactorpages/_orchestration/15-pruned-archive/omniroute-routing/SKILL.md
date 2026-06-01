---
name: omniroute-routing
description: Create and configure OmniRoute routing combos, choose from 14 strategies (priority, weighted, auto, round-robin, cost-optimized, etc.), activate Auto-combo 9-factor scoring, and set up fallback chains. Use when the user wants to configure multi-provider routing, load balancing, or cost-optimized model selection.
---

# OmniRoute — Routing & Combos

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

## What is a combo?

A combo is a named group of providers/models with a routing strategy. All requests through a combo are automatically distributed, failed-over, and load-balanced — the caller uses a single model ID like `my-combo`.

## List existing combos

```bash
curl $OMNIROUTE_URL/api/combos \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Response includes `id`, `name`, `strategy`, `enabled`, and per-target stats.

## Create a combo

```bash
curl -X POST $OMNIROUTE_URL/api/combos \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-combo",
    "strategy": "priority",
    "targets": [
      { "provider": "anthropic", "model": "claude-opus-4-7", "weight": 1 },
      { "provider": "openai",    "model": "gpt-4o",           "weight": 1 }
    ]
  }'
```

## 14 routing strategies

| Strategy            | Description                                        |
| ------------------- | -------------------------------------------------- |
| `priority`          | Always use target[0]; fall back on error           |
| `weighted`          | Distribute by weight percentage                    |
| `round-robin`       | Rotate targets in order                            |
| `fill-first`        | Fill quota of target[0] before spilling            |
| `least-used`        | Route to target with fewest active requests        |
| `cost-optimized`    | Pick cheapest target for the token estimate        |
| `auto`              | 9-factor scoring: cost + latency + quota + circuit |
| `random`            | Uniform random selection                           |
| `strict-random`     | Random without repeating until all used            |
| `p2c`               | Power-of-2-choices: sample 2, pick better          |
| `reset-aware`       | Prefer targets near quota reset time               |
| `lkgp`              | Last-known-good-provider sticky routing            |
| `context-optimized` | Pick best model for context length                 |
| `context-relay`     | Chain models for very long contexts                |

## Auto-combo (recommended for production)

Auto-combo scores each candidate on 9 factors every request:

```bash
curl -X POST $OMNIROUTE_URL/api/combos \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "prod-auto",
    "strategy": "auto",
    "targets": [
      { "provider": "anthropic", "model": "claude-sonnet-4-6" },
      { "provider": "openai",    "model": "gpt-4o-mini" },
      { "provider": "google",    "model": "gemini-2.0-flash" }
    ]
  }'
```

Then call it with:

```bash
curl -X POST $OMNIROUTE_URL/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "model": "prod-auto", "messages": [{ "role": "user", "content": "Hello" }] }'
```

## Activate / deactivate a combo

```bash
# Activate
curl -X PUT $OMNIROUTE_URL/api/combos/{id}/toggle \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -d '{ "enabled": true }'
```

## Get combo metrics

```bash
curl $OMNIROUTE_URL/api/combos/{id}/metrics \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Returns p50/p95/p99 latency, success rate, cost, and per-target breakdown.

## Simulate routing (dry run)

```bash
curl -X POST $OMNIROUTE_URL/api/routing/simulate \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "comboId": "{id}", "messages": [{ "role": "user", "content": "test" }] }'
```

Returns which provider would be selected and why — no actual API call is made.

## Via MCP (if OmniRoute is your MCP server)

```
omniroute_list_combos     → list all combos
omniroute_switch_combo    → enable/disable a combo
omniroute_set_routing_strategy → change strategy at runtime
omniroute_simulate_route  → dry-run routing decision
omniroute_best_combo_for_task → get recommendation by task type
```

## Errors

- `404 combo not found` → check `id` from `/api/combos`
- `400 invalid strategy` → use one of the 14 strategies above
- `409 name conflict` → combo name already exists
