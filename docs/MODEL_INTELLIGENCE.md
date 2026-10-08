# Model Intelligence — How It Works

> Summary of the `model_intelligence` system: sourcing, schedule, storage, and consumption.
> Codebase: `v3.8.52` · Last verified: 2026-10-07

## 1. What "AA Intelligence Score" Actually Is

"AA" = **Arena AI** (LMArena-style human-preference ELO), **not** "Artificial Intelligence".

It is a crowd-sourced quality signal. Humans compare two model outputs, pick the better one, and the result updates an ELO rating per model. OmniRoute fetches those ELO ratings, normalizes them to a task-fit score in `[0.4, 0.98]`, and uses them to rank providers and to bias routing.

## 2. External Sources

| Source | Upstream | Module |
|---|---|---|
| `arena_elo` | `https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard` | `src/lib/arenaEloSync.ts` |
| `models_dev_tier` | `https://models.dev/api.json` (via capabilities sync) | `src/lib/db/modelIntelligence.ts` |
| `user_override` | Operator API (`POST /api/intelligence/overrides`) | `src/lib/db/modelIntelligence.ts` |

## 3. Schedule — How Often

| Setting | Default | Env var |
|---|---|---|
| Interval | `86400` s (24 h) | `ARENA_ELO_SYNC_INTERVAL` |
| Enabled | `true` | `ARENA_ELO_SYNC_ENABLED` (also dashboard feature flag) |
| First sync | Immediately at server boot (`src/instrumentation-node.ts` → `initArenaEloSync()`) | non-blocking, never fatal |
| Freshness guard | If last sync is younger than interval, skip fetch | `getLatestSyncedAt("arena_elo")` |
| Failure backoff | After failure, skip for `interval/4` (6 h default) | `key_value[arena_elo/lastFailedAt]` |
| Manual trigger | `POST /api/intelligence/sync` (management auth) | `dryRun: true` previews without writing; `rebuildTier: true` triggers tier rebuild; `syncArenaElo: true` triggers arena sync |
| Status + health | `GET /api/intelligence/sync` | returns `enabled`, `lastSync`, `nextSync`, `intervalMs`, `sources`, plus `sourcesDetail` with per-source `count/lastSync/oldestExpiresAt` |
| Clear | `DELETE /api/intelligence/sync` | deletes all `arena_elo` rows |

Failure never crashes the server. Rankings simply show last good data or empty state.

### models_dev_tier rebuild

`models_dev_tier` rows are rebuilt automatically at the end of every successful capabilities save:
- `saveModelsDevCapabilities()` in `src/lib/modelsDevSync.ts` (full replace)
- `upsertSyncedCapabilities()` in `src/lib/modelsDevSync.ts` (incremental upsert)

Errors are swallowed with `console.warn` so the capabilities save is never rolled back.

Manual rebuild: `POST /api/intelligence/sync { "rebuildTier": true }`.

## 4. Transform — ELO to Task-Fit (arena_elo)

```
taskFit = 0.4 + 0.58 * ((elo - minElo) / (maxElo - minElo || 1))
```

- Computed per leaderboard (min/max of that leaderboard).
- Range `[0.4, 0.98]` — never 0 or 1, leaves headroom for user overrides.
- Rounded to 4 decimals.

Category mapping:

| Arena leaderboard | OmniRoute task categories |
|---|---|
| `text` | `default`, `review`, `documentation`, `debugging` |
| `code` | `coding` |

Other steps:
- Strip vendor prefixes (`anthropic/`, `openai/`, `google/`, ... 18 total) and harness annotations (` (codex-harness)`).
- Lowercase.
- Confidence from votes: `high` >=5000, `medium` >=1000, `low` <1000.
- Synthesize base rows for effort-suffix variants via `resolveScoresAs()` (best variant score becomes base score).

TTL: `expires_at = now + 7 days`. Reader filters `expires_at IS NULL OR expires_at > now()`.

### Transform — Tier to Task-Fit (models_dev_tier)

`buildModelsDevTierEntries()` reads aggregated `model_capabilities` (capability-maximal booleans + max `limit_context` across providers for the same model id), derives tier via `deriveTierFromCapabilities()`, then maps tier → score via `TIER_TASK_FITNESS`:

| Tier | Confidence | Scores (coding/review/planning/analysis/debugging/documentation/default) |
|---|---|---|
| `premium` | `high` | 0.92/0.88/0.85/0.95/0.90/0.85/0.88 |
| `standard` | `medium` | 0.85/0.80/0.75/0.82/0.80/0.75/0.78 |
| `fast` | `low` | 0.72/0.68/0.65/0.70/0.68/0.65/0.68 |
| `budget` | `low` | 0.60/0.55/0.52/0.58/0.55/0.52/0.55 |

`eloRaw = null`, `expiresAt = null` (never expires — rebuilt on next capabilities sync).
Lifecycle veto: ids marked `status: "retired"` in `config/quality/model-lifecycle.json` are excluded.

### User Overrides (user_override)

`user_override` entries are written via `POST /api/intelligence/overrides`:

```json
{ "model": "gpt-4o", "category": "coding", "score": 0.95 }
```

- `score` clamped to `[0, 1]`.
- `category` must be one of: `coding | review | planning | analysis | debugging | documentation | default`.
- `expiresAt = null` (never expires until explicitly deleted).
- `DELETE /api/intelligence/overrides?model=gpt-4o&category=coding` removes the entry idempotently.
- Both routes require management authentication.

## 5. Storage — DB Table

Migration `097_model_intelligence.sql`:

```sql
CREATE TABLE model_intelligence (
  model TEXT NOT NULL,
  source TEXT NOT NULL,       -- arena_elo | models_dev_tier | user_override
  category TEXT NOT NULL,     -- coding | review | planning | analysis | debugging | documentation | default
  score REAL NOT NULL,        -- [0..1]
  elo_raw INTEGER,            -- original ELO if arena_elo
  confidence TEXT,            -- high | medium | low
  synced_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT,            -- NULL = never expires
  PRIMARY KEY (model, source, category)
) WITHOUT ROWID;
```

Indexes: `(model, category)`, `(source)`, `(expires_at) WHERE NOT NULL`.

Domain module: `src/lib/db/modelIntelligence.ts`.

| Function | Role | Production caller |
|---|---|---|
| `applyArenaEloRefresh(entries)` | Atomic upsert+prune in one tx | `arenaEloSync.ts` |
| `buildModelsDevTierEntries(caps?)` | Derive tier rows from capabilities | `rebuildModelsDevTierIntelligence()` |
| `applyModelsDevTierRefresh(entries)` | Atomic upsert+prune for tier source | `rebuildModelsDevTierIntelligence()` |
| `rebuildModelsDevTierIntelligence()` | Full tier rebuild (read caps → derive → persist) | `modelsDevSync.ts`, `POST /api/intelligence/sync` |
| `getIntelligenceSourcesHealth()` | Per-source count/lastSync/oldestExpiresAt | `GET /api/intelligence/sync` |
| `setUserFitnessOverrideEntry` | Write user_override | `POST /api/intelligence/overrides` |
| `deleteUserFitnessOverrideEntry` | Delete user_override | `DELETE /api/intelligence/overrides` |
| `listModelIntelligence({source, category})` | List/filter | `freeProviderRankings.ts`, `GET /api/provider-intelligence` |
| `getModelIntelligence(model, category)` | Priority-ordered lookup (override > elo > tier) | `GET /api/provider-intelligence` |
| `getModelIntelligenceBySource` | Single-source lookup | `taskFitness.ts::queryModelIntelligence` |
| `getLatestSyncedAt(source)` | Freshness guard | `arenaEloSync.ts`, `rebuildModelsDevTierIntelligence()` |

## 6. Deployed Sources

| Source | Written by | Persisted rows | Notes |
|---|---|---|---|
| `arena_elo` | 24 h periodic Arena sync | Yes — TTL 7 days | ELO + confidence per model/category |
| `models_dev_tier` | Capabilities sync success hook | Yes — no TTL | Rebuilt atomically; prunes stale rows |
| `user_override` | `POST /api/intelligence/overrides` | Yes — no TTL | Operator-set; persists until DELETEd |

## 7. Consumption — Three Surfaces

### 7a. Free Provider Rankings

`src/lib/freeProviderRankings.ts::computeFreeProviderRankings()`

- Iterates `getFreeProviders()` = all `NOAUTH_PROVIDERS` + `OAUTH_PROVIDERS`/`APIKEY_PROVIDERS` where `providerHasFreeModels(id)`.
- For each provider, loads `REGISTRY[provider].models` + custom models, then `findMatchingIntelligence()` per model:
  1. Exact match on lowercased id
  2. Strip trailing version suffix (`kimi-k2.6` -> `kimi-k2`)
  3. Prefix match (`intel model` is prefix of `registry id`)
- Keeps only models with a match; sorts models by score; provider ranked by `topModel.score` then `averageScore`.
- Exposed at `GET /api/free-provider-rankings?category=&limit=` and dashboard `/dashboard/free-provider-rankings`.

### 7b. Auto-Combo Task Fitness (Routing)

`open-sse/services/autoCombo/taskFitness.ts::getTaskFitnessWithSource(model, taskType)`

Resolution chain per request (highest priority first):

1. `user_override` DB hit
2. `arena_elo` DB hit
3. Inherited retry of 1-2 via `resolveScoresAs()` base id (`:inherited`)
4. `models_dev_tier` DB hit — now populated on capabilities sync
5. Static `FITNESS_TABLE` (small, versioned ids only)
6. Wildcard boosts (`coder`, `code`, `fast`, `thinking`) over 0.5 baseline

Retired ids (via `model-lifecycle.json`) veto layers 1-4 and return neutral 0.5.

Consumed by `scoring.ts::scorePool()` (16-factor auto-combo scoring) and `comboScoringInspector`.

### 7c. Provider Intelligence Panel

`GET /api/provider-intelligence?provider=<id>` (management auth)

Returns per-model resolved intelligence for a provider's catalog, with the winning `source` per entry. Used by `ModelIntelligencePanel.tsx` on the provider detail page to render score bars with source badges.

Resolution: `getModelIntelligence(model, category)` applies the same priority chain as routing (override > arena_elo > models_dev_tier). Fuzzy matching via `findMatchingIntelligence()` for models without exact hits.

## 8. Provider Binding — Model-Keyed, Not Provider-Keyed

`model_intelligence.model` is a **bare model name** (`claude-opus-4-6`), not `provider/model`. The Arena sync strips vendor prefixes before storing. Matching is by model id, so the same score applies regardless of which provider serves that model.

### Aggregators / Upstream Proxies

- `UPSTREAM_PROXY_PROVIDERS` (`cliproxyapi`, `9router`) are **not** iterated by `getFreeProviders()`.
- `AGGREGATOR_PROVIDER_IDS` (~50 ids) **are** in `REGISTRY` and eligible for rankings and routing. Their registry model ids are matched against bare Arena/tier names via `findMatchingIntelligence` / `resolveScoresAs`.

## 9. Health API

`GET /api/intelligence/sync` now returns an additional `sourcesDetail` field:

```json
{
  "enabled": true,
  "lastSync": "2026-10-07T12:00:00Z",
  "nextSync": "2026-10-08T12:00:00Z",
  "intervalMs": 86400000,
  "sources": ["arena_elo"],
  "sourcesDetail": {
    "arena_elo":       { "count": 1842, "lastSync": "2026-10-07T12:00:00Z", "oldestExpiresAt": "2026-10-14T12:00:00Z" },
    "models_dev_tier": { "count": 4312, "lastSync": "2026-10-07T11:00:00Z", "oldestExpiresAt": null },
    "user_override":   { "count": 3,    "lastSync": "2026-10-07T10:00:00Z", "oldestExpiresAt": null }
  }
}
```

## 10. Related Files

- `src/lib/arenaEloSync.ts` — fetch, transform, schedule, status
- `src/lib/db/modelIntelligence.ts` — table + CRUD + tier rebuild + health
- `src/lib/db/migrations/097_model_intelligence.sql` — schema
- `src/lib/freeProviderRankings.ts` — rankings join + matching
- `src/lib/modelsDevSync.ts` — models.dev capabilities (tier rebuild wiring)
- `open-sse/services/autoCombo/taskFitness.ts` — routing fitness chain
- `open-sse/services/autoCombo/scoresAs.ts` — variant->base resolution
- `src/app/api/intelligence/sync/route.ts` — manual sync/status/clear + rebuildTier + sourcesDetail
- `src/app/api/intelligence/overrides/route.ts` — POST/DELETE user_override entries
- `src/app/api/provider-intelligence/route.ts` — GET resolved scores per provider with source field
- `src/app/(dashboard)/dashboard/providers/[id]/components/ModelIntelligencePanel.tsx` — source badge UI
- `src/app/api/free-provider-rankings/route.ts` — rankings API
- `docs/guides/FREE_PROVIDER_RANKINGS.md` — user-facing guide
