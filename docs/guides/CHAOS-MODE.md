---
title: "Chaos Mode"
version: 3.8.51
lastUpdated: 2026-09-01
---

# Chaos Mode

> **Dashboard:** **Chaos Mode** (sidebar) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (dashboard session) · `POST /api/skills/collect/chaos` (API key)  
> **Source:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode sends **one task to several providers at once** — every participating provider
contributes one model instance, and you get all the answers side by side (or chained). It is a
multi-model execution surface, not a routing strategy: your normal `/v1/chat/completions`
traffic is never affected by it.

**Disambiguation — three different things ship with "chaos" in the name:**

| Thing              | What it is                                                                                                                                           | Where documented                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**     | The dashboard page + API described here: fan one task out to many providers (parallel or collaborative).                                             | This guide                                   |
| `auto/chaos`       | Auto-Combo model id: parallel fan-out, one model per provider, one upstream call each. Not fault injection ([details](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo config | A persisted combo with `config.chaos.enabled` fans out the same way (API-only); `judgeModel` only picks the final answer, no synthesis call.         | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: parallel fan-out

`auto/chaos` is **not** a fault-injection or resilience-testing knob. Requesting
`model: "auto/chaos"` on `/v1/chat/completions`:

1. Builds a panel of **one model per provider**: the first candidate of each
   connected provider, in candidate-pool order, up to 5 members
   (`OMNIROUTE_CHAOS_MAX_PANEL`, capped at 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). The `chaos-mode` weight
   pack only sets each member's `weight`; the fan-out does not read it.
2. Sends the same request to every panel member **in parallel**, so one request
   costs one upstream call per panel member
   (`open-sse/services/autoCombo/chaosEngine.ts`, dispatched from
   `open-sse/services/combo.ts`).
3. Streams one status line per panel member as it lands: an SSE comment
   (`: chaos <index> ok|fail <model>`) by default, plus an `omni-chaos-part`
   event (`model`, `index`, `ok`, `error`) when the request sets
   `stream_options.include_chaos_parts: true`. These carry no answer text.
4. Sends **one** panel answer as the final OpenAI-style chunk: the first panel
   member's (`auto/chaos` sets it as `judgeModel`) when it succeeds, otherwise
   the last successful member's. The other panel answers are not returned, so
   you pay for N calls and receive one completion.

## Setup

1. Open **Dashboard → Chaos Mode** (`/dashboard/chaos`).
2. Turn it **on** — Chaos Mode ships **disabled by default** (`enabled: false` in
   `src/lib/chaos/chaosConfig.ts`). While disabled, `POST /api/chaos/run` answers
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Pick the participants and defaults (persisted per instance via the settings store):

   | Field               | Meaning                                                             | Default / limits                        |
   | ------------------- | ------------------------------------------------------------------- | --------------------------------------- |
   | `enabled`           | Master switch                                                       | `false`                                 |
   | `defaultMode`       | `parallel` or `collaborative` (see below)                           | `parallel`                              |
   | `providerOverrides` | Per-provider participation (`providerId`, optional `modelId`, `enabled`) | empty = every active provider, max 200 |
   | `systemPrompt`      | Override for the built-in Chaos system prompt                       | optional, max 10 000 chars              |
   | `timeoutMs`         | Max time per model call                                             | `120000` (5 000–600 000)                |
   | `maxTokens`         | `max_tokens` per model call                                         | `4096` (256–128 000)                    |

4. Run a **test from the page itself** — the results panel shows each provider's answer,
   status and duration.

## Execution modes

- **`parallel`** — every model gets the same task simultaneously; you receive all answers
  independently.
- **`collaborative`** — models run **in a chain**: each one sees the previous model's output and
  is asked to refine, extend, critique or offer an alternative. The response's `summary` field
  concatenates the successful outputs in chain order (parallel runs have no `summary`).

## API

### `POST /api/chaos/run` — dashboard session

Cookie-authenticated (the management session — see
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); used by the dashboard page.

```jsonc
// body
{
  "task": "Compare approaches to X",   // required
  "providers": ["glm", "kimi"],         // optional filter
  "mode": "parallel",                   // optional — overrides defaultMode
  "systemPrompt": "…",                  // optional override
  "maxTokens": 4096                      // optional override
}
```

### `POST /api/skills/collect/chaos` — API key

Bearer-token variant for external callers. The key must carry the **Chaos Mode permission**
(`chaosModeEnabled`), which is **off by default** — enable it per key in
**Dashboard → API Manager → edit key → permissions → Chaos Mode**. Same body as above.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Both endpoints return the same shape:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    { "providerId": "glm", "providerName": "GLM", "modelId": "glm-4.7",
      "status": "success", "content": "…", "durationMs": 3210 }
  ],
  "summary": "…" // collaborative mode only
}
```

## Troubleshooting

- **`400 Chaos Mode is not enabled`** — step 2 above: the global switch is off.
- **API key gets rejected on `/api/skills/collect/chaos`** — the key lacks the per-key
  `chaosModeEnabled` permission (off by default; this is a setting, not an error).
- **A provider you expected is missing from the results** — check `providerOverrides` on the
  Chaos Mode page (a disabled override excludes it) and whether the provider connection is
  active.
