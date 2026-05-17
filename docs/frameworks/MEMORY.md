---
title: "Memory System"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Memory System

> **Source of truth:** `src/lib/memory/` and `src/app/api/memory/`
> **Last updated:** 2026-05-13 — v3.8.0

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
    → retrieveMemories(apiKeyId, config)      # SQL + optional FTS5
    → injectMemory(body, memories, provider)  # system or user message
  → upstream provider call
  → on response: extractFacts(text, apiKeyId, sessionId)  # non-blocking
    → setImmediate → createMemory(fact) per match
```

The injection and extraction call-sites are wired in
`open-sse/handlers/chatCore.ts` (look for `retrieveMemories`, `injectMemory`,
and `extractFacts`).

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

### Optional: Qdrant (vector store)

`src/lib/memory/qdrant.ts` implements an optional Qdrant integration for true
semantic memory:

- `upsertSemanticMemoryPoint()` — embed `key + content` with the configured
  embedding model, ensure the collection exists (creates cosine-distance
  vectors on first use), and upsert a point with payload `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — embed the query, search the
  collection filtered by `kind = "omniroute_memory"` and optionally by
  `apiKeyId` / `sessionId`. Caps `topK` to `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — single point delete.
- `cleanupSemanticMemoryPoints({retentionDays})` — bulk delete points whose
  `expiresAtUnix` is in the past or whose `createdAtUnix` is older than the
  retention cutoff. Counts first so the dashboard can show actual numbers.
- `checkQdrantHealth()` — `GET /readyz` health probe with latency.

> **TODO**: The chat pipeline (`chatCore.ts`) and the in-tree `retrieveMemories()`
> implementation do not currently call `upsertSemanticMemoryPoint` or
> `searchSemanticMemory`. The Qdrant integration is feature-flagged via
> `qdrantEnabled` in settings, but at the time of writing the
> `searchSemanticMemory` results are not fused into retrieval — the
> `semantic`/`hybrid` retrieval strategies use SQLite FTS5 only. The settings UI
> in `dashboard/settings → MemorySkillsTab` exposes Qdrant config, health,
> search test, and cleanup, but the corresponding `/api/settings/qdrant`,
> `/api/settings/qdrant/health`, `/api/settings/qdrant/search`, and
> `/api/settings/qdrant/cleanup` routes are referenced from the UI but **not
> present** under `src/app/api/settings/qdrant/` (only `embedding-models/` is
> wired). Treat Qdrant as preview/optional plumbing.

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

| DB key                | Type    | Default                                            | UI control                                      |
| --------------------- | ------- | -------------------------------------------------- | ----------------------------------------------- |
| `memoryEnabled`       | boolean | `true`                                             | Memory on/off                                   |
| `memoryMaxTokens`     | integer | `2000` (range `0–16000`)                           | Token budget for injection                      |
| `memoryRetentionDays` | integer | `30` (range `1–365`)                               | Retention window                                |
| `memoryStrategy`      | enum    | `"hybrid"` (one of `recent`, `semantic`, `hybrid`) | Retrieval strategy                              |
| `skillsEnabled`       | boolean | `false`                                            | Toggles per-key skill injection (see SKILLS.md) |

Note: the UI strategy `"recent"` maps to the internal `"exact"` retrieval
strategy via `toMemoryRetrievalConfig()` (chronological order).

Qdrant-related DB keys (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` default `"omniroute_memory"`,
`qdrantEmbeddingModel` default `"openai/text-embedding-3-small"`) are read by
`normalizeQdrantConfig()` in `qdrant.ts`.

No `MEMORY_*` or `QDRANT_*` env vars exist today — everything is per-instance
DB settings. `OMNIROUTE_MEMORY_MB` (commented out in `.env.example`) is
unrelated and refers to Node heap sizing.

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

| Method   | Path                   | Description                                                                                                                                                                  |
| -------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`          | Paginated list with filters: `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. Response includes `stats.total` and `stats.byType`                             |
| `POST`   | `/api/memory`          | Create entry (Zod-validated: `content`, `key`, optional `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Calls `createMemory()` which upserts on `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`     | Fetch a single entry by UUID                                                                                                                                                 |
| `DELETE` | `/api/memory/[id]`     | Delete an entry; returns 404 when missing                                                                                                                                    |
| `GET`    | `/api/memory/health`   | Runs `verifyExtractionPipeline("health-check")` — round-trip create→list→delete to confirm the store is alive. Returns `{working, latencyMs, error?}`                        |
| `GET`    | `/api/settings/memory` | Current normalised `MemorySettings`                                                                                                                                          |
| `PUT`    | `/api/settings/memory` | Update one or more of `enabled`, `maxTokens`, `retentionDays`, `strategy`, `skillsEnabled`                                                                                   |

The `/api/memory` list query supports either `page`-based pagination
(`parsePaginationParams`) **or** raw `offset` — when `offset` is present it
takes precedence and a derived `page` is computed for the response shape.

## MCP Tools (`open-sse/mcp-server/tools/memoryTools.ts`)

When the MCP server is enabled, three memory tools are registered:

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → wraps `retrieveMemories()` with `retrievalStrategy: "exact"`, optionally
  filters by `type`, and reports `totalTokens`.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → wraps `createMemory()`.
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → lists matching
  entries, optionally filters by created-before timestamp, then deletes each
  via `deleteMemory()`.

See [MCP-SERVER.md](./MCP-SERVER.md) for transport and scope details.

## Dashboard

`src/app/(dashboard)/dashboard/memory/page.tsx` provides:

- Real-time list, search, and pagination (debounced 300 ms).
- Type filter (`factual` / `episodic` / `procedural` / `semantic` / all).
- Add-memory modal (key, content, type).
- Delete per row.
- JSON export of the current page; JSON import via file picker.
- A green/red health dot driven by `GET /api/memory/health`.
- Stat cards: `totalEntries`, `tokensUsed`, `hitRate` (the latter two come
  from the API stats payload).

Memory and Qdrant settings live under
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`).

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
- [Tuto_Qdrant.md](../../Tuto_Qdrant.md) — repository-root Qdrant setup tutorial (integration currently dormant — see status banner at top of that file).
- Source modules:
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `open-sse/handlers/chatCore.ts` (injection / extraction wiring)
  - `open-sse/mcp-server/tools/memoryTools.ts`
