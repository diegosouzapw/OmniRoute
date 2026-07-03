---
title: "Memory System"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Memory System

> **Source of truth:** `src/lib/memory/` and `src/app/api/memory/`
> **Last updated:** 2026-06-28 — v3.8.40 (off-by-default + int8 quantization catch-up)

OmniRoute provides persistent conversational memory keyed by API key (and
optionally session id). Memories are extracted automatically from LLM responses
via lightweight regex pattern matching and injected back into subsequent
requests as a leading system message (or first user message for providers that
reject the system role).

> **Memory is OFF by default (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled` is
> now `false` (`src/lib/memory/settings.ts`). Enabling memory injects up to
> `maxTokens` (~2k) of retrieved context into **every** chat request, which is
> billed — a surprising cost for new installs and for clients that manage their
> own context. Opt in explicitly under **Settings → Memory** (the
> `MemorySkillsTab` shows a token-cost warning callout when memory is enabled).
> A client can opt a single request out with the `x-omniroute-no-memory`
> request header (`true`/`1`/`yes`) — see the request-header table in
> [API_REFERENCE.md](../reference/API_REFERENCE.md). A no-memory request sets
> `memoryOwnerId = null`, which disables **both** memory and skill injection for
> that request (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

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

| Source         | Description                                                                  | Key required | Cold start       |
| -------------- | ---------------------------------------------------------------------------- | ------------ | ---------------- |
| `remote`       | Uses a configured provider's embedding API (OpenAI, Cohere, etc.)            | Yes          | None             |
| `static`       | Local lookup-table embedding via `potion-base-8M` (WordPiece + mean pooling) | No           | ~200ms           |
| `transformers` | Local ONNX inference via `@huggingface/transformers` v4, `all-MiniLM-L6-v2`  | No           | ~3s + ~400MB RAM |
| `auto`         | Runtime resolution: remote (if key exists) → static → transformers → null    | Depends      | Depends          |

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

| Field                    | Type                                               | Default  | Description                                      |
| ------------------------ | -------------------------------------------------- | -------- | ------------------------------------------------ |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"` | Which embedding source to use                    |
| `embeddingProviderModel` | `string \| null`                                   | `null`   | Provider/model in `provider/model` format        |
| `transformersEnabled`    | `boolean`                                          | `false`  | Opt-in for Transformers.js (MiniLM, ~400MB)      |
| `staticEnabled`          | `boolean`                                          | `false`  | Opt-in for static potion-base-8M local model     |
| `rerankEnabled`          | `boolean`                                          | `false`  | Enable reranking step (adds +200-500ms/req)      |
| `rerankProviderModel`    | `string \| null`                                   | `null`   | Rerank provider/model in `provider/model` format |
| `vectorStore`            | `"sqlite-vec" \| "qdrant" \| "auto"`               | `"auto"` | Which vector backend to use                      |

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
vector store. Retrieval only routes to Qdrant when the engine selector
`memoryVectorStore === "qdrant"` — the default `"auto"` (and `"sqlite-vec"`)
**never** select Qdrant. The Engine-tab toggle sets **both** `qdrantEnabled` and
`memoryVectorStore` together: enabling makes Qdrant the primary store, disabling
resets to `"auto"` (#5597 — before that fix, enabling was inert because nothing
wrote the engine selector). If Qdrant is unreachable or returns nothing, retrieval
falls back to sqlite-vec → FTS5.

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

| Route                                   | Method        | Description                     |
| --------------------------------------- | ------------- | ------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Read / update Qdrant settings   |
| `/api/settings/qdrant/health`           | `GET`         | Liveness probe + latency        |
| `/api/settings/qdrant/search`           | `POST`        | Semantic search test            |
| `/api/settings/qdrant/cleanup`          | `POST`        | Remove expired / old points     |
| `/api/settings/qdrant/embedding-models` | `GET`         | List available embedding models |

**Behavior notes (what to expect):**

- **Engine selection** — enabling Qdrant in the Engine tab makes it the primary
  store (sets `memoryVectorStore="qdrant"`); disabling resets to `"auto"` (#5597).
- **No back-fill** — only memories created/updated **after** Qdrant is enabled are
  written to it (fire-and-forget dual-write). Pre-existing SQLite memories are **not**
  migrated; "Reindex Now" rebuilds the sqlite-vec index only, not Qdrant.
- **Vector dimension is auto-detected** from the actual embedding on first use — there
  is no dimension field to fill in. Changing the embedding model after a collection
  exists is **not** auto-handled: the existing collection is left untouched, dimension-
  mismatched writes/searches fail and fall back to sqlite-vec. Recreate the collection
  (new name, or delete it in Qdrant) to switch embedders.
- **Distance metric** — always **Cosine** (hardcoded on collection creation; not
  configurable).
- **Auth** — API key only (sent as the `api-key` header; optional for unauthenticated
  local Docker). JWT/RBAC are not used.
- **Config fields** — the UI exposes `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` are env/DB only and `vectorSize` is not
  used for collection creation (dimension comes from the embedding).

### Vector quantization (int8 — opt-in, both backends)

Both vector backends support **opt-in int8 quantization** to cut the memory
footprint of stored vectors (~4× smaller than Float32) at a small recall cost.
Default is **off** on both — vectors stay full-precision unless explicitly
enabled.

| Backend    | Setting                         | Type                           | Default  | Where read                                                  |
| ---------- | ------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (DB key)   | `"none" \| "int8" \| "binary"` | `"none"` | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"` | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** is configured per-instance via the `qdrantQuantization` setting
  key (exposed as the `quantization` field on `PUT /api/settings/qdrant`). When
  `"int8"`, `buildQuantizationConfig()` requests scalar quantization
  (`always_ram`, quantile `0.99`) and searches enable `rescore: true` so the
  full-precision vectors refine the int8 candidate set.
- **sqlite-vec** quantization is **environment-only** (not a DB setting): set
  `MEMORY_VEC_QUANTIZATION=int8` to store the local vectors as an `int8[dim]`
  column via `vec_quantize_int8(?, 'unit')`. The chosen mode is folded into the
  `embedding_signature` (an `:int8` suffix), so switching modes triggers a full
  reindex of the `vec_memories` table — the same lazy-backfill path used when
  the embedding model changes.

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
| `memoryEnabled`       | boolean | `false` (off by default since v3.8.30)             | Memory on/off                                   |
| `memoryMaxTokens`     | integer | `2000` (range `0–16000`)                           | Token budget for injection                      |
| `memoryRetentionDays` | integer | `30` (range `1–365`)                               | Retention window                                |
| `memoryStrategy`      | enum    | `"hybrid"` (one of `recent`, `semantic`, `hybrid`) | Retrieval strategy                              |
| `skillsEnabled`       | boolean | `false`                                            | Toggles per-key skill injection (see SKILLS.md) |

Note: the UI strategy `"recent"` maps to the internal `"exact"` retrieval
strategy via `toMemoryRetrievalConfig()` (chronological order).

### New fields (v3.8.6, plan 21 D9)

See also the "Settings extension" section above for field descriptions.

| DB key                      | API field                | Default  |
| --------------------------- | ------------------------ | -------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"` |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`   |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`  |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`  |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`  |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`   |
| `memoryVectorStore`         | `vectorStore`            | `"auto"` |

Qdrant-related DB keys (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` default `"omniroute_memory"`,
`qdrantEmbeddingModel` default `"openai/text-embedding-3-small"`) are read by
`normalizeQdrantConfig()` in `qdrant.ts`.

### Environment variables (v3.8.6)

Six optional env vars tune the engine's runtime behaviour (documented in `.env.example`):

| Variable                        | Default                    | Description                                                                                                    |
| ------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Embedding cache TTL (5 min)                                                                                    |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Max entries in embedding LRU cache                                                                             |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | HF repo for Transformers.js model                                                                              |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | HF repo for static potion model                                                                                |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Where to store downloaded models                                                                               |
| `MEMORY_VEC_TOP_K`              | `20`                       | Default top-K for vector search                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | RRF k constant for hybrid search                                                                               |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Set to `int8` to store local sqlite-vec vectors quantized (~4× smaller; opt-in). Mode change forces a reindex. |

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

| Method   | Path                 | Description                                                                                                                                                                      |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Paginated list with filters: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Response includes `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats` |
| `POST`   | `/api/memory`        | Create entry (Zod-validated: `content`, `key`, optional `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Calls `createMemory()` which upserts on `(apiKeyId, key)`     |
| `GET`    | `/api/memory/[id]`   | Fetch a single entry by UUID                                                                                                                                                     |
| `PUT`    | `/api/memory/[id]`   | Update entry fields (`type`, `key`, `content`, `metadata`). Body: `MemoryUpdatePutSchema`. Also syncs vector if embedding source available.                                      |
| `DELETE` | `/api/memory/[id]`   | Delete an entry; also deletes from `vec_memories` (D15) and Qdrant best-effort. Returns 404 when missing.                                                                        |
| `GET`    | `/api/memory/health` | Runs `verifyExtractionPipeline("health-check")` — round-trip create→list→delete. Returns `{working, latencyMs, error?}`                                                          |

### New memory engine endpoints (plan 21)

| Method | Path                              | Description                                                                                                                                          |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/memory/retrieve-preview`    | Dry-run of `retrieveMemories` — returns ranked results with score, tier, tokens. Body: `RetrievePreviewSchema`. Does NOT inject or modify memories.  |
| `GET`  | `/api/memory/embedding-providers` | Lists providers with embedding models, indicating which have a configured API key.                                                                   |
| `GET`  | `/api/memory/engine-status`       | Returns full engine status: keyword tier, embedding resolution, vector store stats, Qdrant health, rerank config. Shape: `MemoryEngineStatusSchema`. |
| `POST` | `/api/memory/summarize`           | Manually trigger memory compaction. Body: `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Returns `{candidates, tokensSaved}`.     |
| `POST` | `/api/memory/reindex`             | Trigger vector reindex for memories with `needs_reindex=1`. Body: `MemoryReindexSchema` (`force`). Returns `{started, pending}`.                     |

### Settings endpoints

| Method | Path                                    | Description                                                                                      |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/settings/memory`                  | Current normalised `MemorySettingsExtended` (7 new fields + legacy)                              |
| `PUT`  | `/api/settings/memory`                  | Update any field from `MemorySettingsExtendedSchema` (12 total fields)                           |
| `GET`  | `/api/settings/qdrant`                  | Current Qdrant settings (`QdrantSettingsSchema`)                                                 |
| `PUT`  | `/api/settings/qdrant`                  | Update Qdrant settings. Body: `QdrantSettingsUpdateSchema`. `apiKey` = empty string removes key. |
| `GET`  | `/api/settings/qdrant/health`           | Liveness probe against configured Qdrant instance. Returns `QdrantHealthResultSchema`.           |
| `POST` | `/api/settings/qdrant/search`           | Semantic search test against Qdrant. Body: `QdrantSearchSchema` (`query`, `topK`).               |
| `POST` | `/api/settings/qdrant/cleanup`          | Remove Qdrant points for expired / old memories.                                                 |
| `GET`  | `/api/settings/qdrant/embedding-models` | List embedding models available for Qdrant.                                                      |

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

---

## Choosing an Embedding Provider (v3.8.16+)

OmniRoute's memory engine supports **four embedding sources** (`src/lib/memory/embedding/`). Each has different trade-offs in **latency, cost, model quality, and setup complexity**.

### The Four Providers

| Provider       | Source                                     | Latency                         | Cost                 | Quality                    | Setup              |
| -------------- | ------------------------------------------ | ------------------------------- | -------------------- | -------------------------- | ------------------ |
| `transformers` | Local ONNX model (Xenova/all-MiniLM-L6-v2) | ~50-150ms (CPU)                 | Free                 | Good                       | `npm install` only |
| `static`       | Pre-computed vectors (cached)              | <1ms                            | Free                 | N/A (depends on cache hit) | None               |
| `remote`       | OpenAI / Cohere / Voyage API               | ~100-300ms                      | $0.02-0.10/1M tokens | Excellent                  | API key            |
| `cache`        | In-memory LRU layer over any source        | <1ms (hit), full latency (miss) | Free                 | Same as underlying         | None               |

### Decision Tree

```
                  What's your deployment context?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DEV/TEST    SMALL PROD   LARGE PROD    EDGE / OFFLINE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (free, no API)            (best quality)   (no internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            ALWAYS add `cache` layer on top
            (LruCache wraps any provider)
```

### Database & API Configuration

Memory embedding options are configured via the Settings API/UI, not environment variables. The relevant settings database keys under Settings (`normalizeMemorySettings` in `src/lib/memory/settings.ts`) are:

- `memoryEmbeddingSource`: `"transformers"` (local), `"remote"` (API-based, e.g. OpenAI), `"static"` (external store), or `"auto"`
- `memoryEmbeddingProviderModel`: Model identifier for remote/static sources (e.g., `"text-embedding-3-small"`)
- `memoryTransformersEnabled`: `true` | `false`
- `memoryStaticEnabled`: `true` | `false`
- `memoryVectorStore`: `"sqlite-vec"`, `"qdrant"`, or `"auto"`

#### Local Model (`transformers`)

Uses transformers.js internally to run local models:

```bash
# Env vars read in code (src/lib/memory/embedding/index.ts):
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # HF model repo
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # HF static potion model
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Cache directory
```

#### LRU Embedding Cache

The cache is always on by default and configured via env vars:

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Max cached items
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Performance Numbers

Benchmark on a typical 4-core x86 server (texts ~100 tokens each):

| Provider             | p50   | p95   | p99   | Cost / 1M embeddings               |
| -------------------- | ----- | ----- | ----- | ---------------------------------- |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Free                               |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large) |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Depends on Qdrant hosting          |
| `cache` (hit)        | <1ms  | <1ms  | 2ms   | Free                               |

---

## Fact Extraction Patterns (v3.8.16+)

The `extraction.ts` module (`src/lib/memory/extraction.ts`) uses **regex pattern matching** to extract structured facts from conversation messages. Understanding these patterns helps you tune extraction quality for your use case.

### Default Pattern Categories

| Category            | Example pattern                                             | Captures                       |
| ------------------- | ----------------------------------------------------------- | ------------------------------ |
| PREFERENCE_PATTERNS | `"I prefer <X>"`, `"I like <X>"`, `"I hate <X>"`            | User preferences               |
| DECISION_PATTERNS   | `"I'll use <X>"`, `"I decided to <X>"`, `"I went with <X>"` | User decisions (episodic)      |
| PATTERN_PATTERNS    | `"I usually <X>"`, `"I always <X>"`, `"I never <X>"`        | Persistent behavioral patterns |

### Example Patterns (Simplified)

```ts
// From src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### What Gets Extracted

When a user says:

> "I prefer TypeScript. I'll use Postgres for this project. I always commit before pushing. I don't like Python."
> Extraction produces 4 memories:
> | Key | Category | Type | Content |
> |-----|----------|------|---------|
> | `preference:typescript` | preference | factual | "TypeScript" |
> | `decision:postgres_for_this_project` | decision | episodic | "Postgres for this project" |
> | `pattern:commit_before_pushing` | pattern | factual | "commit before pushing" |
> | `preference:python` | preference | factual | "Python" |

### Extraction Limits

To prevent runaway extraction, the following limits apply:

| Min content length | 3 chars |
| Max content length | 500 chars |

### When to Disable Extraction

Extraction runs automatically whenever memory is enabled; there is no separate
extraction-only toggle. To turn it off, disable memory entirely (`enabled: false`
via `PUT /api/settings/memory`). Consider doing so when:

- You have high message volume and the extraction cost is non-trivial
- Your conversations are mostly transient (chat, debugging) with no long-term value
- You're already capturing context via custom plugins

---

## Hybrid RRF Tuning (v3.8.16+)

The **Reciprocal Rank Fusion (RRF)** algorithm combines FTS5 (keyword) and vector (semantic) results. The `k` parameter controls how much weight is given to lower-ranked results.

### The Formula

For each candidate memory, the RRF score is:

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Where:

- `k` is the constant (default 60)
- `rank_i(d)` is the rank of document `d` in the i-th retrieval system (FTS, vector)
- The sum runs over all retrieval systems

### How `k` Affects Results

| `k` value            | Effect                                                                          | Best for                               |
| -------------------- | ------------------------------------------------------------------------------- | -------------------------------------- |
| `k=0`                | Pure rank fusion (no smoothing)                                                 | Theoretical baseline                   |
| `k=10-30`            | Heavily weights top results, low-rank barely contributes                        | When top-3 results are usually correct |
| **`k=60`** (default) | Balanced — top-10 results all contribute meaningfully                           | General-purpose retrieval              |
| `k=100+`             | Flatter — even low-rank results can dominate if they appear in multiple systems | When recall > precision is critical    |

### Tuning `k` in Practice

```bash
# Default
MEMORY_RRF_K=60

# Aggressive precision (small memory, few docs)
MEMORY_RRF_K=20

# Maximum recall (large memory, varied queries)
MEMORY_RRF_K=120
```

**Example with `k=20`:**

- FTS rank 1 → contribution `1/21 = 0.048`
- FTS rank 10 → contribution `1/30 = 0.033`
- Vector rank 1 → contribution `0.048`
- Combined max: `0.096`

**Example with `k=60`:**

- FTS rank 1 → contribution `1/61 = 0.016`
- FTS rank 10 → contribution `1/70 = 0.014`
- Vector rank 1 → contribution `0.016`
- Combined max: `0.033`

With higher `k`, the **relative difference** between top-1 and rank-10 is smaller, so the algorithm relies more on **consensus across retrieval systems** than on top-rank confidence.

### When to Change `k`

| Symptom                                | Try                                                          |
| -------------------------------------- | ------------------------------------------------------------ |
| Top result always wins, but it's wrong | **Lower** k (e.g., 20) — top-rank confidence matters more    |
| Right answer is in top-5 but not top-1 | **Higher** k (e.g., 100) — flatter scoring rewards consensus |
| Recall is high but precision is low    | **Lower** k — sharpen the ranking                            |
| Recall is low (missing relevant docs)  | **Higher** k — give lower-ranked docs a chance               |

### RRF Weighting

The reciprocal rank fusion uses equal weights for semantic vector rank and full-text search rank:

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

There are no environment variables to adjust individual weights (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` do not exist).

---

## Summarization Strategy (v3.8.16+)

The `summarization.ts` module (`src/lib/memory/summarization.ts`) compresses older memories to keep the active set small while preserving recall.

### When Summarization Triggers

| Trigger                | Threshold (default) |
| ---------------------- | ------------------- |
| Manual trigger via API | n/a                 |

### What Gets Summarized

Two entry points are exported from `summarization.ts`:

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — condenses the
  memories for a session into a single summary text bounded by a token budget.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — the age-based
  compaction used by the API: it selects every memory older than `days`, builds
  one condensed summary memory from them, and (when `dryRun` is `false`) deletes
  the originals. Pass `dryRun: true` to preview the candidate set and token total
  without modifying anything.

There is no tag/key clustering pass or per-memory "core vs summarizable" scoring —
selection is purely the age cutoff, and the summary text is a condensed,
type-prefixed line per candidate.

### Triggering Summarization

Summarization is **manual / opt-in** — the `autoSummarize` setting is `false` by
default, so nothing is compacted automatically. Trigger it via the API:

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

To leave it off, simply keep `autoSummarize` at its default (`false`).

### Summarization Quality Tips

- **Preview first with `dryRun`** — `summarizeMemoriesOlderThan(..., true)` returns
  the candidate list and total token count so you can confirm what would be merged
  before deleting the originals.
- **Run summarization during low-traffic hours** if you have a large memory corpus — the LLM call is the slow part

```bash
# Cron-style: summarize at 3am daily
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```
