---
title: "Free Provider Rankings (Arena ELO)"
version: 3.8.24
lastUpdated: 2026-06-13
---

# Free Provider Rankings (Arena ELO)

> **TL;DR**: OmniRoute ranks its **free** providers by model quality using **Arena AI
> (LMArena-style) ELO scores**. Open the **Free Provider Rankings** page in the
> dashboard to see which free providers ship the strongest models for your task —
> overall, or filtered by category (coding, review, documentation, debugging).

---

## What It Is

OmniRoute aggregates 160+ providers, many of which expose a **free tier** (no-auth,
free-tier OAuth, or free-tier API key — see the
[Free Tiers Guide](../getting-started/FREE-TIERS-GUIDE.md) and the full
[Free Tiers directory](../reference/FREE_TIERS.md)). The catch: free providers vary
wildly in model quality. A no-auth provider serving a frontier model is far more useful
than one serving a small legacy model.

**Free Provider Rankings** answers "**which free provider gives me the best model?**" by
joining each free provider's catalog with **crowd-sourced quality scores** from the
**Arena AI leaderboard** (human-preference ELO, the same idea behind the LMArena
chatbot arena). Providers are then ranked by the strength of their **best free model**.

The ranking is computed from three real sources:

1. The free-provider lists — `NOAUTH_PROVIDERS`, plus `OAUTH_PROVIDERS` /
   `APIKEY_PROVIDERS` entries flagged `hasFree`
   (`src/shared/constants/providers.ts`).
2. Each provider's model catalog from the provider registry
   (`open-sse/config/providerRegistry.ts`).
3. ELO-derived task-fit scores stored in the `model_intelligence` DB table by the
   Arena ELO sync engine (`src/lib/arenaEloSync.ts`).

The join logic lives in `src/lib/freeProviderRankings.ts`.

---

## How to Access

### Dashboard page

Open the dashboard and go to **Costs → Free Provider Rankings**, or navigate directly to:

```
/dashboard/free-provider-rankings
```

The page (`src/app/(dashboard)/dashboard/free-provider-rankings/page.tsx`) shows:

- A **top-3 podium** (🥇 🥈 🥉) of the best-ranked free providers.
- A full **ranking table** with columns: **Rank**, **Provider**, **Top Model**,
  **Score**, **Avg Score**, **Models**, **Type**.
- **Category filter buttons**: _All Categories_, _Default_, _Coding_, _Review_,
  _Documentation_, _Debugging_.

Each provider's **Type** badge tells you how it is free:

| Badge    | Meaning                                       |
| -------- | --------------------------------------------- |
| `NOAUTH` | Always free, no credentials needed            |
| `OAUTH`  | OAuth provider with a free tier (`hasFree`)   |
| `APIKEY` | API-key provider with a free tier (`hasFree`) |

Scores are shown as human-readable labels (e.g. _Elite_, _Excellent_, _Very Good_,
_Good_, _Average_) rather than raw numbers, because the underlying value is a relative
ranking quality, not a percentage.

### API endpoint

The page is backed by a public read endpoint
(`src/app/api/free-provider-rankings/route.ts`):

```
GET /api/free-provider-rankings
GET /api/free-provider-rankings?category=coding
GET /api/free-provider-rankings?category=coding&limit=20
```

Query parameters (validated with Zod):

| Param      | Type   | Default | Notes                                                                                              |
| ---------- | ------ | ------- | -------------------------------------------------------------------------------------------------- |
| `category` | string | (none)  | One of `default`, `coding`, `review`, `documentation`, `debugging`. Omit for the combined ranking. |
| `limit`    | number | `50`    | Clamped to the range `1–100`.                                                                      |

Response shape:

```json
{
  "rankings": [
    {
      "id": "<provider-id>",
      "name": "<provider name>",
      "icon": "<icon>",
      "color": "<hex color>",
      "textIcon": "<short label>",
      "category": "noauth | oauth | apikey",
      "topModel": {
        "modelId": "<registry model id>",
        "modelName": "<model display name>",
        "score": 0.0,
        "eloRaw": 0,
        "confidence": "high | medium | low",
        "category": "<task category>"
      },
      "averageScore": 0.0,
      "modelCount": 0
    }
  ]
}
```

`eloRaw` is the original Arena ELO value; `score` is the normalized task-fit value
(see below). Providers with no scored models are omitted from the response.

---

## How the Scores Work

### Source: Arena AI leaderboard

The Arena ELO sync engine (`src/lib/arenaEloSync.ts`) fetches two leaderboards — `text`
and `code` — from the Arena AI leaderboard API
(`https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard`). Each leaderboard entry
carries a model name, vendor, ELO `score`, confidence interval, and vote count.

Leaderboard categories map to OmniRoute task categories:

| Arena leaderboard | OmniRoute task categories                         |
| ----------------- | ------------------------------------------------- |
| `text`            | `default`, `review`, `documentation`, `debugging` |
| `code`            | `coding`                                          |

### Normalization (task-fit score)

Raw ELO scores are normalized per leaderboard into a **task-fit value in `[0.4, 0.98]`**:

```
taskFit = 0.4 + 0.58 * ((elo - minElo) / (maxElo - minElo))
```

The score never reaches `0` or `1`, leaving headroom for user overrides. This is the
`score` field you see in the API response and the label shown on the dashboard.

### Confidence

Each entry gets a confidence level based on Arena vote count:

| Confidence | Votes   |
| ---------- | ------- |
| `high`     | ≥ 5,000 |
| `medium`   | ≥ 1,000 |
| `low`      | < 1,000 |

### Storage and freshness

Normalized entries are written to the `model_intelligence` DB table with
`source = "arena_elo"` (`src/lib/db/modelIntelligence.ts`). Entries **expire after
7 days**, so a provider that stops syncing eventually drops out rather than serving
stale data.

The sync runs **on by default**:

- It runs once at server startup and then on a periodic timer
  (`src/lib/arenaEloSync.ts`, wired from `src/instrumentation-node.ts`).
- It is **non-blocking and never fatal** — if the upstream fetch fails, OmniRoute keeps
  running and the rankings simply show the last good data (or an empty state).

Two environment variables control it (documented in
[`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md)):

| Variable                  | Default       | Purpose                                         |
| ------------------------- | ------------- | ----------------------------------------------- |
| `ARENA_ELO_SYNC_ENABLED`  | `true`        | Set to `false` to opt out of the outbound sync. |
| `ARENA_ELO_SYNC_INTERVAL` | `86400` (24h) | Sync interval, in seconds.                      |

### Manual sync / status / clear

For operators, an authenticated management endpoint exposes manual control
(`src/app/api/intelligence/sync/route.ts` — requires management auth):

```
GET    /api/intelligence/sync          # current sync status (enabled, lastSync, nextSync, intervalMs)
POST   /api/intelligence/sync          # trigger a manual sync; body: { "dryRun": true } to preview without writing
DELETE /api/intelligence/sync          # clear all synced arena_elo intelligence entries
```

If the rankings page is empty, a manual `POST /api/intelligence/sync` (or simply
restarting the server) repopulates it.

### Matching models to the leaderboard

Registry model IDs and Arena model names don't always match exactly. The ranking uses
flexible matching (`findMatchingIntelligence` in `src/lib/freeProviderRankings.ts`):

1. Exact match on the normalized model ID.
2. Match after stripping a trailing version suffix (e.g. `kimi-k2.6` → `kimi-k2`).
3. Prefix match (a leaderboard model name is a prefix of the registry ID).

On the sync side, known vendor prefixes (`anthropic/`, `openai/`, `google/`, …) are
stripped and a small alias map expands canonical names into the variants OmniRoute uses
internally, so models stay findable under any name.

### How a provider is ranked

For each free provider, the engine scores every model in its catalog, then:

- **Top Model** = the provider's highest-scoring model.
- **Avg Score** = the mean score across all of that provider's scored models.
- **Models** = how many of the provider's models had an Arena score.

Providers are sorted by **top-model score** first, then by average score. This rewards a
provider that ships at least one strong free model.

---

## Using It to Choose Free Providers

1. **Pick the right category.** Use the **Coding** filter for agentic/code workloads, or
   leave it on **All Categories** / **Default** for general chat. The same provider can
   rank differently across categories because its top model differs per leaderboard.
2. **Prefer the podium for one-shot setups.** If you only want to connect one or two free
   providers, start with the top-ranked ones for your category.
3. **Check the Type badge.** `NOAUTH` providers are the fastest to connect (no
   credentials). `OAUTH` / `APIKEY` free tiers need a quick sign-up but often expose
   stronger models. See [Free Tiers Guide](../getting-started/FREE-TIERS-GUIDE.md) for
   connection steps.
4. **Connect several and let Auto-Combo decide.** The same Arena ELO data that powers
   this page also feeds the **task-fitness factor** of the Auto-Combo scoring engine
   (`open-sse/services/autoCombo/taskFitness.ts`, resolution order
   `user_override → arena_elo → models_dev_tier → static table`). So after you connect
   the top free providers, routing with `model: "auto"` (e.g. `auto/coding`) will
   automatically prefer the higher-quality free models per request. See
   [Auto-Combo](../routing/AUTO-COMBO.md) for the full 9-factor scoring.

---

## Related Documentation

- [Free Tiers Guide](../getting-started/FREE-TIERS-GUIDE.md) — how to connect free
  providers, no credit card required.
- [Free Tiers directory](../reference/FREE_TIERS.md) — full catalog of free providers
  and their limits.
- [Auto-Combo](../routing/AUTO-COMBO.md) — the 9-factor routing engine that consumes the
  same Arena ELO task-fitness data.
- [Environment variables](../reference/ENVIRONMENT.md) — `ARENA_ELO_SYNC_ENABLED` /
  `ARENA_ELO_SYNC_INTERVAL` reference.
