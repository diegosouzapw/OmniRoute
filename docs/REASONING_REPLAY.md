# Reasoning Replay Cache

> **Source of truth:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Last updated:** 2026-05-13 — v3.8.0

OmniRoute captures assistant `reasoning_content` produced by thinking-mode models and replays it transparently on multi-turn requests when the upstream provider requires it. This eliminates the HTTP 400 errors that strict providers raise when a client's conversation history is missing the prior turn's reasoning.

## Why This Exists

Several thinking-mode providers reject a follow-up turn unless the **previous assistant message includes the original `reasoning_content`**. The upstream returns 400 with messages like:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

But typical clients (Cursor, Cline, Roo Code, OpenAI SDK) strip `reasoning_content` from the history they replay. OmniRoute restores it from a server-side cache so the request the upstream sees is consistent. Issue #1628 introduced the hybrid memory/SQLite persistence so the cache survives process restarts.

## Architecture

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → cacheReasoningFromAssistantMessage() writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Capture happens in `open-sse/handlers/chatCore.ts` (two sites, around lines 4093 and 4380). Replay happens in `open-sse/translator/index.ts` after schema coercion but before dispatch.

## Storage — Hybrid Memory + SQLite

The hot path uses an in-memory `Map` (LRU-by-creation) backed by a SQLite table for crash recovery and dashboard visibility.

| Layer  | Implementation                                 | Purpose                                |
| ------ | ---------------------------------------------- | -------------------------------------- |
| Memory | `Map` in `open-sse/services/reasoningCache.ts` | Fast lookups, evicts oldest at 2000    |
| DB     | `reasoning_cache` table (`src/lib/db/`)        | Persists across restarts, drives stats |

Writes go to both. Reads consult memory first, then fall back to DB (DB hits are promoted back into memory). DB failures are non-fatal — the in-memory cache continues to serve the hot path.

**Defaults:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Max memory entries: `2000` (`MAX_MEMORY_ENTRIES`)
- Eviction: oldest `createdAt` first

## Database Schema

Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indexes: `expires_at`, `provider`, `model`, `created_at`. `expires_at` is stored as Unix epoch seconds; the SELECT layer normalizes legacy text values via `EXPIRES_AT_EPOCH_SQL`.

## Provider / Model Detection

Replay is enabled when `requiresReasoningReplay(provider, model)` returns `true`. The function checks two lists in `open-sse/services/reasoningCache.ts`.

**Provider IDs (exact match, case-insensitive):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `xiaomi-mimo`

**Model regex patterns (case-insensitive):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/kimi-k2/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Adding a new strict provider/model means appending to one of these lists and writing a unit test asserting replay injection. The PR description should cite the exact upstream 400 string that motivated the change.

## REST API

The cache exposes two endpoints under `src/app/api/cache/reasoning/route.ts`. Both require management authentication (`isAuthenticated` from `@/shared/utils/apiAuth`).

| Method | Endpoint                                                  | Description                                              |
| ------ | --------------------------------------------------------- | -------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Stats + paginated entries                                |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtered listing (`limit` clamped to `[1, 200]`)         |
| DELETE | `/api/cache/reasoning`                                    | Clear everything (memory + DB) and reset hit/miss counts |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Clear only entries for one provider                      |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Delete a single entry                                    |

**GET response shape:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Operational Notes

- **Cleanup:** `cleanupReasoningCache()` purges expired memory entries and runs `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Health-check workers call this periodically.
- **Crash recovery:** After a restart, memory is empty but the DB still holds unexpired entries. The first lookup for a given `tool_call_id` is a DB hit; subsequent lookups are memory hits.
- **No reasoning, no cache:** `cacheReasoningFromAssistantMessage` returns `0` when the assistant message has no `reasoning_content` / `reasoning` field, so non-thinking responses cost nothing.
- **Non-strict providers:** When `requiresReasoningReplay` is `false` and the target format is OpenAI, the translator **strips** any `reasoning_content` field from outgoing messages — OpenAI Chat Completions does not accept it.

## See Also

- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — circuit breakers, cooldowns, model lockouts
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) — diagnosing upstream 400s
- Source: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API route: `src/app/api/cache/reasoning/route.ts`
- Original issue: #1628
