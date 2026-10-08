---
title: "Reasoning Replay Cache"
version: 3.8.40
lastUpdated: 2026-06-28
---

> **Source of truth:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Last updated:** 2026-06-28 — v3.8.40

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
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Capture happens in `open-sse/handlers/chatCore.ts` (two sites, at the two `cacheReasoningFromAssistantMessage` call sites). Replay happens in `open-sse/translator/index.ts` after schema coercion but before dispatch.

Plain (non-tool-call) assistant turns are keyed differently: `buildAssistantMessageCacheKey()` digests the session scope plus the normalized OpenAI-format transcript up to that turn, because DeepSeek requires the reasoning of _every_ prior turn once `tools` is present. For Responses-API targets (for example `opencode-go/deepseek-v4-flash`, routed to `/responses`) the upstream body carries `input`, not `messages`, so `translateRequest()` (`open-sse/translator/index.ts`) reports the pivot transcript it digested through a callback option and the capture sites digest that same transcript. The Responses replay pass runs on the OpenAI pivot for every source format, so Anthropic Messages clients (Claude → OpenAI → Responses) are replayed too.

## Storage — Hybrid Memory + SQLite

The hot path uses an in-memory `Map` (LRU-by-creation) backed by a SQLite table for crash recovery and dashboard visibility.

| Layer  | Implementation                                 | Purpose                                |
| ------ | ---------------------------------------------- | -------------------------------------- |
| Memory | `Map` in `open-sse/services/reasoningCache.ts` | Fast lookups, evicts oldest at 200     |
| DB     | `reasoning_cache` table (`src/lib/db/`)        | Persists across restarts, drives stats |

Writes go to both. Reads consult memory first, then fall back to DB (DB hits are promoted back into memory). DB failures are non-fatal — the in-memory cache continues to serve the hot path.

**Defaults:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Max memory entries: `200` (`MAX_MEMORY_ENTRIES`)
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
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Model regex patterns (case-insensitive):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` and `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, optional `-free` suffix)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
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
- **Write is gated too:** both call sites in `chatCore.ts` (non-streaming and streaming) only call `cacheReasoningFromAssistantMessage()` when `requiresReasoningReplay(provider, model)` is `true` — the same predicate the read side checks. Installs that never touch a replay provider stop paying for the write, the index update, and the try/catch on every reasoning-bearing response.
- **Non-strict providers:** When `requiresReasoningReplay` is `false` and the target format is OpenAI, the translator **strips** any `reasoning_content` field from outgoing messages — OpenAI Chat Completions does not accept it.

## Muse Opaque-Reasoning Ownership

Muse (`muse-code`) returns caller-bound opaque reasoning (`encrypted_content`). Replaying it under a different account or reminted credential fails upstream, so native OAuth requests use session-level ownership instead of per-request rotation (`src/sse/services/museSessionOwnership.ts`, enforced in `src/sse/handlers/chat.ts`). Explicitly selected API-key connections and API-key-only configurations retain their existing routing without this ownership mode.

- Supply a stable session ID on every turn: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id`, or `x-codex-session-id`; alternatively use `prompt_cache_key`, `session_id`, `conversation_id`, or `metadata.session_id` in the body (in that precedence order). Missing or blank IDs return 400 when two or more native OAuth accounts are active; with a single OAuth account there is nothing to rotate to, so such a request keeps unpinned routing. The scope includes the caller's OmniRoute API-key ID.
- Fresh independent sessions round-robin across active native OAuth accounts permitted by the API-key connection policy, ordered by connection ID. Round-robin skips accounts in connection cooldown, with a terminal status (`banned`, `expired`, `credits_exhausted`), or model-locked for the requested model; Muse upstream failures record cooldown and breaker state like other providers. An explicitly forced connection bypasses round-robin for a new session but cannot override an existing owner.
- Until the owner serves a successful response, a session whose owner has become unavailable is re-claimed onto a healthy account. After the first successful response, the session stays pinned to that owner until it has been idle for 30 days (`MUSE_SESSION_IDLE_TTL_MS`).
- Every continuation and tool-result turn stays pinned to the session owner: connection, account identity, and inference-credential generation, checked again before upstream attempts, including credential-refresh retries. Responses call IDs/item references and Chat Completions tool-call IDs must have been recorded for that session and generation.
- SQLite `key_value` records in the `muse_session_ownership` namespace (`src/lib/db/museSessionOwnership.ts`) persist ownership and the rotation cursor across restarts. Each claim and served response refreshes the session's activity stamp; a session idle longer than `MUSE_SESSION_IDLE_TTL_MS` is pruned (owner pin, served flag and recorded opaque/reference hashes), at most once every 10 minutes and in bounded batches, so a later replay of its history fails closed as an unknown owner. Records contain connection IDs and hashes of account identity, credentials, opaque content, and continuation references, not secrets or conversation history. Clients must retain and send their full history and opaque reasoning.
- Unknown or foreign opaque reasoning, a missing owner, an unavailable owner account, or a generation change with recorded history fails closed with an explicit 4xx/503 — never silent cross-account failover and never dropped reasoning.
- A reminted same-account key is adopted only when the session recorded no replayable history; recorded sessions keep failing closed until started fresh.
- An empty upstream response (`upstream_empty_response` / `empty_response`, nothing emitted to the caller) is retried at most twice on the same owner, after 0.5 s then 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). If all attempts are empty, the original 502 is returned without cooldown or breaker marking, so a flaky reply never locks out the owner.
- All `muse-code` requests bypass semantic-cache reads and writes, including streaming writes, so cached opaque output cannot acquire a different session owner.

Regression guards: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts`, and `tests/unit/chatcore-semantic-cache.test.ts`.

## See Also

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakers, cooldowns, model lockouts
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnosing upstream 400s
- Source: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API route: `src/app/api/cache/reasoning/route.ts`
- Original issue: #1628
