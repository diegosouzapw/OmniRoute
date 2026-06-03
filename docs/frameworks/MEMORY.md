---
title: "Memory System"
version: 3.8.6
lastUpdated: 2026-05-28
---

# Memory System

> **Source of truth:** `src/lib/memory/` and `src/app/api/memory/`
> **Last updated:** 2026-05-28 — v3.8.6 (plan 21 — Memory Engine Redesign)

OmniRoute provides persistent conversational memory keyed by API key (and
optionally session id). Memories are extracted automatically from LLM responses
via lightweight regex pattern matching and injected back into subsequent
requests as a leading system message (or first user message for providers that
reject the system role).

Memory is **scoped per API key**, not per user — every request authenticated
with the same API key shares the same memory pool, with optional further
scoping by `sessionId`.

## Architecture

```
Client → /v1/chat/completions (apiKeyInfo resolved upstream)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extracts id
    → getMemorySettings()                     # cached settings
    → shouldInjectMemory(body, {enabled})     # gate
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + optional vector
    → injectMemory(body, memories, provider)  # system or user message
  → upstream provider call
  → on response: extractFacts(text, apiKeyId, sessionId)  # non-blocking
    → setImmediate → createMemory(fact) per match
                   → embed(content) + upsertVector(id, vec)
```

The injection and extraction call-sites are wired in
`open-sse/handlers/chatCore.ts` (look for `retrieveMemories`, `injectMemory`,
and `extractFacts`).

## Engine architecture (3-tier resolution)

The Memory Engine resolves the retrieval path at runtime based on available
infrastructure and settings. Three tiers exist, applied in priority order:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 0 — Keyword (FTS5)                                     │
  │  Always available. SQLite FTS5 full-text search over         │
  │  content + key. Used when strategy = "exact" or as fallback. │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 1 — Embedded Vector (sqlite-vec)                       │
  │  sqlite-vec v0.1.9 loaded via db.loadExtension().            │
  │  KNN brute-force over Float32 vectors. Active when:          │
  │   • sqlite-vec loadExtension succeeds                        │
  │   • An embedding source is available (remote | static |      │
  │     transformers) that can produce a Float32Array            │
  │   • vec_memories table exists (created on first ready())     │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  TIER 2 — Qdrant (opt-in external vector database)           │
  │  When enabled, replaces sqlite-vec for semantic/hybrid.      │
  │  Requires running Qdrant instance + configured host/port.    │
  └─────────────────────────────────────────────────────────────┘
```

Degradation is automatic and transparent:
- If sqlite-vec fails to load, tier 1 is unavailable → falls back to tier 0.
- If embedding source returns an error, tier 1 falls back to tier 0.
- If Qdrant is unhealthy, tier 2 falls back to tier 1 (or tier 0 if tier 1
  is also unavailable).

## Embedding sources

The embedding layer (`src/lib/memory/embedding/`) resolves which source to use
based on `MemorySettingsExtended.embeddingSource`:

| Source         | Description                                                                     | Key required | Cold start |
| -------------- | ------------------------------------------------------------------------------- | ------------ | ---------- |
| `remote`       | Uses a configured provider's embedding API (OpenAI, Cohere, etc.)               | Yes          | None       |
| `static`       | Local lookup-table embedding via `potion-base-8M` (WordPiece + mean pooling)    | No           | ~200ms     |
| `transformers` | Local ONNX inference via `@huggingface/transformers` v4, `all-MiniLM-L6-v2`     | No           | ~3s + ~400MB RAM |
| `auto`         | Runtime resolution: remote (if key exists) → static → transformers → null       | Depends      | Depends    |

**Resolution order for `auto`:**
1. Find first provider in `listEmbeddingProviders()` with `hasKey === true` → `remote`.
2. If `settings.staticEnabled === true` → `static`.
3. If `settings.transformersEnabled === true` → `transformers`.
4. Otherwise → `null` (degrades to FTS5 keyword search).

The embedding cache (`src/lib/memory/embedding/cache.ts`) uses an in-memory
LRU map keyed by `${source}:${model}:${dim}:${sha256(text)}`, capped at
`MEMORY_EMBEDDING_CACHE_MAX` entries (default 1000) with a TTL of
`MEMORY_EMBEDDING_CACHE_TTL_MS` (default 5 min). Shared across all callers
per process lifecycle.

## Hybrid RRF (k=60)

When `strategy = "hybrid"` and the vector store is available, retrieval uses
Reciprocal Rank Fusion to merge FTS5 and vector results:

```
RRF(d) = Σ  1 / (k + rank_i(d))      where k = 60 (configurable via MEMORY_RRF_K)
          i
```

Concretely:
1. Run FTS5 search → ranked list `R_fts` (position 1..N).
2. Run KNN vector search → ranked list `R_vec` (position 1..M).
3. For each unique `memoryId`:  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 if not in list).
4. Sort by `rrf_score` DESC, apply token budget walk.

RRF is well-known to be effective without needing score normalization across
heterogeneous retrieval systems. The default `k=60` is from the original
Cormack et al. paper and works well for small corpora (<10k memories).

## Backfill (lazy + reindex)

When the embedding model changes (detected via `embedding_signature`), the
vector store is rebuilt and all existing memories are marked
`needs_reindex = 1` in the `memories` table.

**Lazy backfill**: On the next retrieval, any memory missing a vector entry is
embedded and inserted into `vec_memories` before the search runs. This
amortizes the backfill cost across real requests without blocking startup.

**Explicit reindex**: The Engine tab in `/dashboard/memory` provides a
"Reindex Now" button that calls `POST /api/memory/reindex`. The handler calls
`runReindexBatch()` from `src/lib/memory/reindex.ts`, which processes up to
`limit` pending entries per request. Progress can be polled via
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

The `memory_vec_meta` table (migration `073_memory_vec.sql`) stores:
- `active_dim` — current vector dimension (null = not yet calibrated).
- `embedding_signature` — `${source}:${model}:${dim}` used to detect changes.
- `last_reset_at` — timestamp of last full reset.
- `vec_loaded` — 0/1 flag whether sqlite-vec loaded successfully.

## Settings extension

Seven new fields were added to `MemorySettingsExtended` (plan 21, D9) in
`src/shared/schemas/memory.ts`, persisted via `src/lib/db/settings.ts`:

| Field                  | Type                                          | Default      | Description                                   |
| ---------------------- | --------------------------------------------- | ------------ | --------------------------------------------- |
| `embeddingSource`      | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Which embedding source to use              |
| `embeddingProviderModel` | `string \| null`                            | `null`       | Provider/model in `provider/model` format     |
| `transformersEnabled`  | `boolean`                                     | `false`      | Opt-in for Transformers.js (MiniLM, ~400MB)   |
| `staticEnabled`        | `boolean`                                     | `false`      | Opt-in for static potion-base-8M local model  |
| `rerankEnabled`        | `boolean`                                     | `false`      | Enable reranking step (adds +200-500ms/req)   |
| `rerankProviderModel`  | `string \| null`                              | `null`       | Rerank provider/model in `provider/model` format |
| `vectorStore`          | `"sqlite-vec" \| "qdrant" \| "auto"`          | `"auto"`     | Which vector backend to use                   |

These are exposed via `GET /PUT /api/settings/memory` (schema `MemorySettingsExtendedSchema`).

> **TODO (D20):** Scope `global` (sharing memories across all API keys) is not
> implemented in this release. It requires schema changes and a global retrieval
> path. Track separately.

## Storage Layers

### Primary: SQLite (`memories` table)

Created by migration `015_create_memories.sql`:

| Column                      | Type               | Notes                                                                |
| --------------------------- | ------------------ | -------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID generated via `crypto.randomUUID()`                             |
| `api_key_id`                | `TEXT NOT NULL`    | Owning API key                                                       |
| `session_id`                | `TEXT`             | Optional per-conversation scope                                      |
| `type`                      | `TEXT NOT NULL`    | One of `factual`, `episodic`, `procedural`, `semantic`               |
| `key`                       | `TEXT`             | Stable upsert key, e.g. `preference:i_prefer_python`                 |
| `content`                   | `TEXT NOT NULL`    | The actual fact text                                                 |
| `metadata`                  | `TEXT`             | JSON blob (category, extractedAt, source, ...)                       |
| `created_at` / `updated_at` | `TEXT`             | ISO 8601 strings                                                     |
| `expires_at`                | `TEXT`             | Optional expiry; `NULL` means permanent                              |
| `memory_id`                 | `INTEGER UNIQUE`   | Added by `023_fix_memory_fts_uuid.sql` to bridge UUIDs ↔ FTS5 rowids |

Indexes: `api_key_id`, `session_id`, `type`, `expires_at`, plus the unique
`memory_id` index.

**Upsert semantics**: `createMemory()` looks for an existing row with the same
`(api_key_id, key)` and updates it in place when found (merging `metadata` via
shallow spread). This keeps the table from growing unbounded for repeated
preference statements.

### Full-text Search (`memory_fts` virtual table)

`022_add_memory_fts5.sql` creates an FTS5 virtual table over `content` and
`key`. `023_fix_memory_fts_uuid.sql` fixes a real-world bug where the UUID
primary key did not join to FTS5's integer rowid — the migration adds the
`memory_id` column, recreates the FTS table, and wires triggers
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) that keep FTS in sync on
INSERT, DELETE, and UPDATE.

Used by `retrieval.ts` for the `semantic` and `hybrid` strategies (see below).
The retrieval code guards with `hasTable("memory_fts")` and falls back to
chronological order if the FTS table is missing or the FTS query throws.

### Optional: Qdrant (vector store tier 2)

`src/lib/memory/qdrant.ts` implements an optional Qdrant integration as tier 2
vector store. Enabled via `qdrantEnabled` in settings / toggle in Engine tab.

- `upsertSemanticMemoryPoint()` — embed `key + content` with the configured
  embedding model, ensure the collection exists (creates cosine-distance
  vectors on first use), and upsert a point with payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — embed the query, search the
  collection filtered by `kind = "omniroute_memory"` and optionally by
  `apiKeyId` / `sessionId`. Caps `topK` to `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — single point delete. Called by
  `deleteMemory()` after the SQLite row is removed (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — bulk delete points whose
  `expiresAtUnix` is in the past or whose `createdAtUnix` is older than the
  retention cutoff. Counts first so the dashboard can show actual numbers.
- `checkQdrantHealth()` — `GET /readyz` health probe with latency.

The settings UI exposes Qdrant config, health check, semantic search test,
and cleanup in the **Engine tab** of `/dashboard/memory`. The corresponding
routes under `src/app/api/settings/qdrant/` are all wired as of v3.8.6:

| Route | Method | Description |
| ----- | ------ | ----------- |
| `/api/settings/qdrant` | `GET` / `PUT` | Read / update Qdrant settings |
| `/api/settings/qdrant/health` | `GET` | Liveness probe + latency |
| `/api/settings/qdrant/search` | `POST` | Semantic search test |
| `/api/settings/qdrant/cleanup` | `POST` | Remove expired / old points |
| `/api/settings/qdrant/embedding-models` | `GET` | List available embedding models |

## Memory Types

`MemoryType` (`src/lib/memory/types.ts`):

| Type         | Used for                                                     |
| ------------ | ------------------------------------------------------------ |
| `factual`    | Preferences, stable user facts, behavioral patterns          |
| `episodic`   | Decisions tied to a specific moment ("I chose Postgres")     |
| `procedural` | Workflow / how-to memory (reserved; no auto-extractor today) |
| `semantic`   | Reserved for vector-store entries                            |

`MemoryConfig` retrieval strategy is one of `exact`, `semantic`, or `hybrid`,
and scope is one of `session`, `apiKey`, or `global`. The default scope from
`getMemorySettings()` is `apiKey`.

## Fact Extraction (`extraction.ts`)

Extraction is **regex-based**, not LLM-based — it runs in-process with
`setImmediate()` so it never blocks the response stream:

- **Preference patterns** → `MemoryType.FACTUAL`
  (e.g. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Decision patterns** → `MemoryType.EPISODIC`
  (e.g. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Pattern patterns** → `MemoryType.FACTUAL`
  (e.g. `I usually …`, `I always …`, `I tend to …`)

Each match is sanitised (`trim`, whitespace-collapse, capped at 500 chars),
deduplicated within the batch via a stable `factKey(category, content)`, and
stored via `createMemory()` with metadata
`{category, extractedAt, source: "llm_response"}`. Input text is capped at
64 KiB (`MAX_EXTRACTION_TEXT_LENGTH`) — when longer, the **tail** of the text
is used so the most recent assistant content always participates.

`extractFactsFromText(text)` is exported for tests and returns the structured
facts without storing them.

## Retrieval (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` is the main entry point. It:

1. Normalises and validates the config through `MemoryConfigSchema`.
2. Returns `[]` immediately when `enabled` is false or `maxTokens <= 0`.
3. Clamps `maxTokens` to `[1, 8000]`.
4. Detects whether the modern `memories` table exists (vs the legacy `memory`
   table) so older databases keep working.
5. Builds the base query with expiry guard
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), optional
   session scope, and optional `retentionDays` cutoff.
6. Branches on strategy:
   - **`exact`** (default): chronological `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`**: if `config.query` and `memory_fts` exists, JOIN
     `memory_fts MATCH ?` and order by FTS rank; fall back to chronological
     when FTS returns 0 rows.
   - **`hybrid`**: union of FTS results (higher relevance) and the
     chronological set, deduplicated by id.
7. Computes a keyword relevance score (`getRelevanceScore`) over
   `content`, `key`, and `metadata` JSON when a query is provided. Rows with
   zero score are filtered out.
8. Sorts by score desc, then `createdAt` desc.
9. Walks the ranked list and accepts entries while a running
   `estimateTokens(content)` (≈ `length / 4`) stays under the budget. Always
   returns at least one entry when any matched.

`estimateTokens` is exported and used by retrieval, summarisation, and the MCP
`omniroute_memory_search` tool.

## Injection (`injection.ts`)

`injectMemory(request, memories, provider)`:

1. Joins all memory contents into a single `Memory context: …` string.
2. Picks a strategy by provider name:
   - **System message** (default for OpenAI, Anthropic, Gemini, …) — prepends
     a `{role: "system", content: memoryText}` ahead of any existing system
     messages so user system prompts still take precedence.
   - **User message** (fallback) — for providers in
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE`: `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. These reject the system role
     and would 400 otherwise (cf. issue #1701 for GLM/Zhipu).
3. Logs the count, strategy, and model under `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` is exported for callers that need to
make routing decisions of their own. Unknown providers default to `true`
(system role allowed) for safety.

## Settings (`settings.ts`)

Memory configuration is **stored in the DB settings table**, not in env vars.
`getMemorySettings()` reads from `getSettings()` and caches the result
in-process; `invalidateMemorySettingsCache()` is called by the settings PUT
route after writes.

### Legacy fields (all versions)

| DB key                | Type    | Default                                            | UI control                                      |
| --------------------- | ------- | -------------------------------------------------- | ----------------------------------------------- |
| `memoryEnabled`       | boolean | `true`                                             | Memory on/off                                   |
| `memoryMaxTokens`     | integer | `2000` (range `0–16000`)                           | Token budget for injection                      |
| `memoryRetentionDays` | integer | `30` (range `1–365`)                               | Retention window                                |
| `memoryStrategy`      | enum    | `"hybrid"` (one of `recent`, `semantic`, `hybrid`) | Retrieval strategy                              |
| `skillsEnabled`       | boolean | `false`                                            | Toggles per-key skill injection (see SKILLS.md) |

Note: the UI strategy `"recent"` maps to the internal `"exact"` retrieval
strategy via `toMemoryRetrievalConfig()` (chronological order).

### New fields (v3.8.6, plan 21 D9)

See also the "Settings extension" section above for field descriptions.

| DB key                    | API field              | Default       |
| ------------------------- | ---------------------- | ------------- |
| `memoryEmbeddingSource`   | `embeddingSource`      | `"auto"`      |
| `memoryEmbeddingModel`    | `embeddingProviderModel` | `null`      |
| `memoryTransformersEnabled` | `transformersEnabled` | `false`      |
| `memoryStaticEnabled`     | `staticEnabled`        | `false`       |
| `memoryRerankEnabled`     | `rerankEnabled`        | `false`       |
| `memoryRerankModel`       | `rerankProviderModel`  | `null`        |
| `memoryVectorStore`       | `vectorStore`          | `"auto"`      |

Qdrant-related DB keys (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` default `"omniroute_memory"`,
`qdrantEmbeddingModel` default `"openai/text-embedding-3-small"`) are read by
`normalizeQdrantConfig()` in `qdrant.ts`.

### Environment variables (v3.8.6)

Six optional env vars tune the engine's runtime behaviour (documented in `.env.example`):

| Variable                        | Default | Description                                        |
| ------------------------------- | ------- | -------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000` | Embedding cache TTL (5 min)                       |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`  | Max entries in embedding LRU cache                 |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2` | HF repo for Transformers.js model    |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF repo for static potion model      |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings` | Where to store downloaded models     |
| `MEMORY_VEC_TOP_K`              | `20`    | Default top-K for vector search                    |
| `MEMORY_RRF_K`                  | `60`    | RRF k constant for hybrid search                   |

## Summarisation (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` compacts older
content when the running token total over a key's memories exceeds the
budget. It iterates rows DESC by `created_at`, keeps rows that fit, and for
the rest replaces `content` in place with the first three sentences of the
original. `tokensSaved` is the difference in `estimateTokens` between old and
new content.

This routine is **available but not called automatically** in the current
chat pipeline — call it from a cron, an admin action, or
`MemoryConfig.autoSummarize` glue if you need ongoing compaction. The data
loss is one-way: original text is overwritten.

## REST API

All endpoints require management auth (`requireManagementAuth`).

### Core memory endpoints (existing + updated)

| Method     | Path                              | Description                                                                                                                                                                  |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`      | `/api/memory`                     | Paginated list with filters: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Response includes `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` |
| `POST`     | `/api/memory`                     | Create entry (Zod-validated: `content`, `key`, optional `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Calls `createMemory()` which upserts on `(apiKeyId, key)` |
| `GET`      | `/api/memory/[id]`                | Fetch a single entry by UUID                                                                                                                                                 |
| `PUT`      | `/api/memory/[id]`                | Update entry fields (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Also syncs vector if embedding source available. |
| `DELETE`   | `/api/memory/[id]`                | Delete an entry; also deletes from `vec_memories` (D15) and Qdrant best-effort. Returns 404 when missing. |
| `GET`      | `/api/memory/health`              | Runs `verifyExtractionPipeline("health-check")` — round-trip create→list→delete. Returns `{working, latencyMs, error?}` |

### New memory engine endpoints (plan 21)

| Method   | Path                               | Description                                                                             |
| -------- | ---------------------------------- | --------------------------------------------------------------------------------------- |
| `POST`   | `/api/memory/retrieve-preview`     | Dry-run of `retrieveMemories` — returns ranked results with score, tier, tokens. Body: `RetrievePreviewSchema`. Does NOT inject or modify memories. |
| `GET`    | `/api/memory/embedding-providers`  | Lists providers with embedding models, indicating which have a configured API key.       |
| `GET`    | `/api/memory/engine-status`        | Returns full engine status: keyword tier, embedding resolution, vector store stats, Qdrant health, rerank config. Shape: `MemoryEngineStatusSchema`. |
| `POST`   | `/api/memory/summarize`            | Manually trigger memory compaction. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Returns `{candidates, tokensSaved}`. |
| `POST`   | `/api/memory/reindex`              | Trigger vector reindex for memories with `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Returns `{started, pending}`. |

### Settings endpoints

| Method   | Path                               | Description                                                              |
| -------- | ---------------------------------- | ------------------------------------------------------------------------ |
| `GET`    | `/api/settings/memory`             | Current normalised `MemorySettingsExtended` (7 new fields + legacy)      |
| `PUT`    | `/api/settings/memory`             | Update any field from `MemorySettingsExtendedSchema` (12 total fields)   |
| `GET`    | `/api/settings/qdrant`             | Current Qdrant settings (`QdrantSettingsSchema`)                          |
| `PUT`    | `/api/settings/qdrant`             | Update Qdrant settings. Body: `QdrantSettingsUpdateSchema`. `apiKey` = empty string removes key. |
| `GET`    | `/api/settings/qdrant/health`      | Liveness probe against configured Qdrant instance. Returns `QdrantHealthResultSchema`. |
| `POST`   | `/api/settings/qdrant/search`      | Semantic search test against Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`). |
| `POST`   | `/api/settings/qdrant/cleanup`     | Remove Qdrant points for expired / old memories.                          |
| `GET`    | `/api/settings/qdrant/embedding-models` | List embedding models available for Qdrant.                          |

The `/api/memory` list query supports either `page`-based pagination
(`parsePaginationParams`) **or** raw `offset` — when `offset` is present it
takes precedence and a derived `page` is computed for the response shape.

## MCP Tools (`open-sse/mcp-server/tools/memoryTools.ts`)

When the MCP server is enabled, three memory tools are registered:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → wraps `retrieveMemories()`. As of v3.8.6 (D16), the `strategy` is read
  from `getMemorySettings()` instead of being hardcoded to `"exact"`. If
  `query` is provided and `strategy` is `semantic` or `hybrid`, the vector
  store is used when available.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → wraps `createMemory()`. Accepts only the 4 canonical types:
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → lists matching
  entries, optionally filters by created-before timestamp, then deletes each
  via `deleteMemory()` (which also removes vectors from sqlite-vec + Qdrant).

See [MCP-SERVER.md](./MCP-SERVER.md) for transport and scope details.

## Dashboard (Memory Studio)

`src/app/(dashboard)/dashboard/memory/page.tsx` is now a **3-tab Studio**:

### Tab: Memórias / Memories
- Concept card (collapsible "How it works" explainer).
- Real-time list, search, and pagination (debounced 300 ms).
- Type filter (`factual` / `episodic` / `procedural` / `semantic` / all).
- Add-memory modal (key, content, type).
- Inline edit (pencil button → `PUT /api/memory/[id]`).
- Delete per row (with confirmation dialog).
- JSON export of the current page; JSON import via file picker.
- Stat cards: `totalEntries`, `tokensUsed`, `hitRate`.
- "Compact old" button → `POST /api/memory/summarize` (dry-run first shows
  candidate count, then confirms).
- A green/red health dot driven by `GET /api/memory/health`.

### Tab: Playground
- Query input + strategy selector (Exact / Semantic / Hybrid) + token budget.
- "Simulate" → `POST /api/memory/retrieve-preview` — shows ranked results with
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Resolution panel showing which embedding source / vector store was used and
  whether a fallback occurred.

### Tab: Engine
- Engine status panel (keyword FTS5 chip, embedding chip, vector store chip,
  Qdrant health chip, rerank chip).
- "Reindex Now" button → `POST /api/memory/reindex`.
- Embedding source selector (auto / remote / static / transformers + toggles).
- Qdrant config card (enable toggle, host/port/collection/key, test connection,
  semantic search test, cleanup).
- Rerank config card (enable toggle, provider/model selector).

Memory and Qdrant settings also live under
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) for
the legacy/global settings surface.

## Caching

`src/lib/memory/store.ts` keeps an in-process LRU-ish cache
(`MEMORY_CACHE_TTL = 5 min`, `MEMORY_MAX_CACHE_SIZE = 10 000`, with 20 %
oldest eviction) for `getMemory(id)` reads, plus a generic key/value
`memoryCache` layer (`src/lib/memory/cache.ts`) with `get`/`set`/`invalidate`
methods used by callers that want their own scoped cache (1 000-entry LRU,
default TTL 5 min).

## Privacy & Lifecycle

- Memory ownership is the API key id (`resolveMemoryOwnerId` in
  `chatCore.ts`). Without an `apiKeyInfo.id` neither retrieval nor injection
  nor extraction runs.
- Entries with a future `expires_at` are filtered out of retrieval; old
  entries beyond `retentionDays` are excluded by the
  `created_at >= cutoff` clause in `retrieveMemories`.
- For hard deletion, use `DELETE /api/memory/[id]` or `omniroute_memory_clear`.
- Extraction is fire-and-forget via `setImmediate`; failures are logged under
  `memory.extraction.background.failed` and never surface to the caller.
- Verification round-trips (`verifyExtractionPipeline`) clean up their own
  test entries in a `finally` block.

## See Also

- [SKILLS.md](./SKILLS.md) — the `skillsEnabled` setting injects tool
  definitions alongside memory.
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP transport / scopes.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — broader API surface.
- Source modules:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + hybrid RRF
  - `src/lib/memory/embedding/index.ts` — multi-source embedding layer
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — Zod schemas for all memory API bodies
  - `src/shared/schemas/qdrant.ts` — Zod schemas for Qdrant settings/ops
  - `src/lib/db/memoryVec.ts` — CRUD for `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `073_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + sub-routes
  - `src/app/(dashboard)/dashboard/memory/` — Studio UI (page + components +
    tabs + hooks)
  - `open-sse/handlers/chatCore.ts` (injection / extraction wiring)
  - `open-sse/mcp-server/tools/memoryTools.ts`
