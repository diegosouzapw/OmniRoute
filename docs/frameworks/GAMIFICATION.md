---
title: "Gamification & Leaderboard System"
version: 3.8.1
lastUpdated: 2026-05-19
---

# Gamification & Leaderboard System

> **Source of truth:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Last updated:** 2026-05-19 — v3.8.0

OmniRoute includes a local-first gamification layer that rewards users for
engaging with the platform — making requests, switching providers, creating
combos, sharing tokens, and contributing to the community. All state lives in
SQLite; federation with community servers is opt-in and push-based.

The system is designed to be **zero-latency on the hot path** — gamification
events are dispatched fire-and-forget from the request pipeline and never block
an LLM response.

---

## Overview

### Purpose

Increase user engagement and retention by providing visible progress (XP,
levels, badges), social proof (leaderboards), and economic incentives (token
sharing, invite rewards).

### Scope

| Feature           | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| XP & Levels       | Earn XP per action; level up along a polynomial curve           |
| Badges            | 20+ achievements across 5 categories with 4 rarity tiers        |
| Streaks           | Daily active usage tracking with current/longest streak         |
| Leaderboards      | Global, weekly, monthly, token-sharing, and contribution scopes |
| Token Sharing     | Transfer credits between users via double-entry ledger          |
| Invite & Redeem   | Referral codes with SHA-256 hashed storage                      |
| Community Servers | Federate with external OmniRoute instances                      |
| Anti-Cheat        | Server-side scoring, rate limiting, z-score anomaly detection   |

### Design Principles

1. **Local-first** — all state in SQLite, no external services required.
2. **Non-blocking** — events are fire-and-forget; the LLM response path is
   never delayed by gamification logic.
3. **Server-authoritative** — XP is computed server-side only; clients cannot
   inflate scores.
4. **Privacy-respecting** — leaderboard participation is opt-in; users can
   hide their profile.
5. **Federation-ready** — community servers can push scores via signed API;
   sync is overwrite, not additive.

---

## Architecture

### High-Level Flow

```
Client Request
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (existing pipeline) ...
      → upstream response sent to client
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

The event emitter is the single integration point. `chatCore.ts` calls
`emitGamificationEvent()` after the response is sent; the event module fans
out to XP, streak, badge, leaderboard, and anti-cheat subsystems.

### Module Dependency Graph

```
src/lib/gamification/
  events.ts          ← entry point (called from chatCore.ts)
    ├── xp.ts        ← XP calculation & level resolution
    ├── streaks.ts   ← daily active streak tracking
    ├── badges.ts    ← badge criteria evaluation
    ├── leaderboard.ts ← rank computation & SSE broadcasting
    ├── antiCheat.ts ← rate limiting & anomaly detection
    ├── sharing.ts   ← token transfer ledger
    ├── invites.ts   ← invite/redeem code management
    ├── servers.ts   ← community server federation
    └── notifications.ts ← SSE notification stream

src/lib/db/
  gamification.ts    ← all CRUD operations (8 tables)

src/app/api/gamification/
  leaderboard/       ← GET rankings, POST manual refresh
  leaderboard/stream ← SSE real-time updates
  transfer/          ← GET history, POST send tokens
  invite/            ← GET/POST codes, DELETE revoke
  invite/redeem/     ← POST redeem a code
  servers/           ← GET/POST/DELETE community servers
  federation/score/  ← POST push score to server
  federation/leaderboard/ ← GET pull leaderboard from server
  notifications/     ← SSE badge/level-up notifications
  anomalies/         ← GET anomaly reports (admin)
  rotate/            ← POST rotate invite token secrets
```

---

## Data Layer

### Database Tables

All tables live in the main OmniRoute SQLite database, created by migration
`060_create_gamification.sql`. WAL journaling is inherited from the singleton
`getDbInstance()` in `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Domain Module: `src/lib/db/gamification.ts`

Follows the standard OmniRoute pattern — imports `getDbInstance()` from
`core.ts`, exports typed CRUD functions. No raw SQL in route handlers.

Key functions:

| Function                   | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `upsertLeaderboardEntry()` | Insert or update score for (api_key_id, scope, period) |
| `getLeaderboard()`         | Paginated rankings for a given scope/period            |
| `getUserLevel()`           | Get or create user level record                        |
| `updateUserLevel()`        | Set XP, level, and title atomically                    |
| `getBadgeDefinitions()`    | All badge definitions (optionally filtered)            |
| `getUserBadges()`          | Badges earned by a user                                |
| `awardBadge()`             | Insert badge earn (idempotent on badge_id)             |
| `logXpAction()`            | Append to xp_audit_log                                 |
| `getXpAuditLog()`          | Paginated audit history for a user                     |
| `insertLedgerEntry()`      | Double-entry transfer (in transaction)                 |
| `getBalance()`             | Sum of received minus sent for a user                  |
| `getTransferHistory()`     | Paginated transfer log                                 |
| `createInviteToken()`      | Insert invite code + hashed token                      |
| `redeemInviteToken()`      | Look up by code, validate, increment uses              |
| `upsertCommunityServer()`  | Register or update a federation server                 |
| `getCommunityServers()`    | List servers for a user                                |
| `deleteCommunityServer()`  | Remove a server registration                           |

---

## XP / Level System

**File:** `src/lib/gamification/xp.ts`

### Level Curve

The XP required to reach level `n` follows a polynomial curve:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Level | XP to Next | Cumulative XP | Title    |
| ----- | ---------- | ------------- | -------- |
| 1     | 100        | 100           | Beginner |
| 5     | 1,118      | 2,415         | Beginner |
| 10    | 3,162      | 10,523        | Explorer |
| 25    | 12,500     | 86,024        | Explorer |
| 50    | 35,355     | 345,529       | Expert   |
| 75    | 64,952     | 948,683       | Master   |
| 100   | 100,000    | 2,050,000     | Legend   |

### Titles

| Level Range | Title    |
| ----------- | -------- |
| 1 – 9       | Beginner |
| 10 – 24     | Explorer |
| 25 – 49     | Expert   |
| 50 – 74     | Master   |
| 75 – 100    | Legend   |

### XP Rewards

| Action             | XP  | Description                                               |
| ------------------ | --- | --------------------------------------------------------- |
| `request`          | 1   | Per successful LLM request                                |
| `provider_switch`  | 5   | Switching to a different provider                         |
| `combo_create`     | 10  | Creating a new combo configuration                        |
| `combo_use`        | 2   | Using a combo (per target hit)                            |
| `badge_earned`     | 25  | Earning any badge                                         |
| `streak_milestone` | 15  | Reaching a streak milestone (7, 14, 30, 60, 90, 180, 365) |
| `referral`         | 50  | Successfully referring a new user                         |
| `token_share`      | 5   | Sharing tokens with another user                          |
| `daily_login`      | 3   | First request of the day                                  |
| `model_diversity`  | 3   | Using a model not used in the past 7 days                 |
| `compression_use`  | 2   | Using prompt compression                                  |
| `skill_use`        | 2   | Executing a skill via MCP                                 |

### Award Flow

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Look up `XP_REWARDS[action]` to get the XP amount.
2. Pass through `checkRateLimit()` (anti-cheat: max 1000 XP/min per key).
3. Open a transaction:
   - Read current `user_levels` row.
   - Add XP; recompute level via `levelFromXp(totalXp)`.
   - If level changed, set `levelUp = true`.
   - Update `user_levels` row.
   - Insert into `xp_audit_log`.
4. Return the result. Caller handles notifications.

### Helper: `levelFromXp(totalXp)`

Iterates level 1..100, summing `xp_for_level(n)` until the cumulative XP
exceeds `totalXp`. Returns the highest level whose threshold is met.
This is O(100) — acceptable since levels cap at 100.

---

## Badge System

**File:** `src/lib/gamification/badges.ts`

### Categories

| Category       | Description                        | Example Badges                    |
| -------------- | ---------------------------------- | --------------------------------- |
| `usage`        | Volume-based milestones            | First Request, 1K Requests, 100K  |
| `sharing`      | Token sharing and referrals        | First Share, Generous (10 shares) |
| `contribution` | Community engagement               | Combo Creator, Provider Explorer  |
| `streak`       | Consistency over time              | Week Warrior, Monthly Devoted     |
| `rare`         | Hard-to-get or hidden achievements | Early Adopter, Bug Reporter       |

### Rarities

| Rarity      | Color | Probability Hint |
| ----------- | ----- | ---------------- |
| `common`    | Gray  | Most users       |
| `uncommon`  | Green | Active users     |
| `rare`      | Blue  | Dedicated users  |
| `legendary` | Gold  | Top 1%           |

### Criteria Types

| Type           | Field        | Description                                     |
| -------------- | ------------ | ----------------------------------------------- |
| `action_count` | `count`      | Perform action N times (e.g., 1000 requests)    |
| `streak`       | `days`       | Maintain streak for N consecutive days          |
| `unique_count` | `field`, `n` | Use N unique values (e.g., 10 different models) |
| `rank`         | `scope`, `n` | Reach rank N on a leaderboard scope             |
| `first`        | —            | Be the first to perform an action               |
| `hidden`       | (varies)     | Criteria not shown until earned                 |

Badge definitions are stored in `badge_definitions` as JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Evaluation Flow

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # all definitions
    → getUserBadges(apiKeyId)         # already earned (skip)
    → for each unearned badge:
       → matchesCriteria(badge, event, userState)
       → if match: awardBadge(apiKeyId, badgeId)
         → return notification payload
```

Evaluation is **event-driven** — it runs after every gamification event, but
only checks badges whose `criteria.type` aligns with the event action. This
keeps evaluation fast (< 5ms for most events).

### `matchesCriteria(badge, event, userState)`

| Criteria Type  | Check                                              |
| -------------- | -------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`        |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`               |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`             |
| `rank`         | `getRank(apiKeyId, scope) <= n`                    |
| `first`        | No prior `xp_audit_log` entry for this action type |
| `hidden`       | Delegates to the appropriate sub-check             |

### Built-in Badges (20+)

<details>
<summary>Full badge list</summary>

| Badge               | Category     | Rarity    | Criteria                     |
| ------------------- | ------------ | --------- | ---------------------------- |
| First Steps         | usage        | common    | 1 request                    |
| Getting Warmed Up   | usage        | common    | 100 requests                 |
| Power User          | usage        | uncommon  | 1,000 requests               |
| Centurion           | usage        | rare      | 10,000 requests              |
| OmniPower           | usage        | legendary | 100,000 requests             |
| Provider Hopper     | contribution | common    | Use 5 different providers    |
| Provider Master     | contribution | uncommon  | Use 20 different providers   |
| Combo Architect     | contribution | uncommon  | Create 5 combos              |
| Combo Grandmaster   | contribution | rare      | Create 25 combos             |
| First Share         | sharing      | common    | 1 token transfer             |
| Generous            | sharing      | uncommon  | 10 token transfers           |
| Philanthropist      | sharing      | rare      | Transfer 10,000 tokens total |
| Referrer            | sharing      | common    | 1 successful referral        |
| Network Builder     | sharing      | uncommon  | 10 successful referrals      |
| Week Warrior        | streak       | uncommon  | 7-day streak                 |
| Monthly Devoted     | streak       | rare      | 30-day streak                |
| Unstoppable         | streak       | legendary | 365-day streak               |
| Early Adopter       | rare         | legendary | Join during beta period      |
| Compression Pioneer | rare         | uncommon  | Use compression 100 times    |
| Skill Collector     | rare         | rare      | Use 10 different skills      |
| Model Explorer      | contribution | uncommon  | Use 15 different models      |

</details>

---

## Streak Tracker

**File:** `src/lib/gamification/streaks.ts`

### Data Model

Streaks are stored in the `key_value` table (shared utility table) under
namespaced keys:

| Key                           | Value                            | Description        |
| ----------------------------- | -------------------------------- | ------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Active streak data |

### Logic

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Read streak record from `key_value`.
2. Parse `{current}`, `{longest}`, `{lastDate}` (ISO date string).
3. If `lastDate === today` — no change (already counted today).
4. If `lastDate === yesterday` — increment `current`; update `longest` if needed.
5. If `lastDate < yesterday` — reset `current = 1` (streak broken).
6. Write updated record.
7. Check milestones: 7, 14, 30, 60, 90, 180, 365 days. If crossed, set
   `milestone = true` (caller awards XP and checks badges).

### Edge Cases

- **Timezone**: streaks use UTC dates (`new Date().toISOString().slice(0, 10)`).
  This is intentional — a single canonical timezone prevents gaming via
  timezone hopping.
- **New users**: no streak record exists; first request creates it with
  `current=1, longest=1, lastDate=today`.
- **Multiple requests per day**: only the first request of the UTC day
  increments the streak.

---

## Leaderboard

**File:** `src/lib/gamification/leaderboard.ts`

### Scopes

| Scope           | Period  | Description                                   |
| --------------- | ------- | --------------------------------------------- |
| `global`        | `all`   | All-time cumulative XP                        |
| `weekly`        | `week`  | XP earned in current UTC week (Mon-Sun)       |
| `monthly`       | `month` | XP earned in current UTC month                |
| `tokens_shared` | `all`   | Total tokens transferred to others            |
| `contributions` | `all`   | Combos created + providers used + skills used |

### Rank Computation

Ranks are **computed at read time**, not stored. This avoids stale rank data
and eliminates the need for periodic rank recalculation jobs.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Query pattern:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Period Rotation

Weekly and monthly leaderboards rotate automatically:

1. **Archive**: at period boundary, copy current entries to
   `leaderboard_archive` with the period label.
2. **Reset**: delete entries for the expired period.
3. **Trigger**: checked on every `updateLeaderboard()` call; the first request
   of a new period triggers the rotation.

This ensures weekly boards reset every Monday 00:00 UTC and monthly boards
reset on the 1st of each month.

### SSE Real-Time Updates

**Endpoint:** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → SSE connection established
  → Server sends top-10 leaderboard snapshot immediately
  → Every 5 seconds: push updated top-10 if changed
  → Every 15 seconds: heartbeat comment (": heartbeat\n\n")
  → Client disconnects → cleanup (remove listener)
```

Event format:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

The SSE manager tracks connected clients per scope and only sends updates
when the leaderboard data has actually changed since the last push.

---

## Token Sharing

**File:** `src/lib/gamification/sharing.ts`

### Double-Entry Ledger

Every transfer creates two rows in `token_ledger`:

| Row    | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debit  | sender        | receiver    | +amount  |
| Credit | receiver      | sender      | -amount  |

Wait — the convention is:

| Row     | `from_key_id` | `to_key_id` | `amount` | Meaning             |
| ------- | ------------- | ----------- | -------- | ------------------- |
| Send    | sender        | receiver    | +amount  | Outflow from sender |
| Receive | receiver      | sender      | +amount  | Inflow to receiver  |

Balance is computed as:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Transfer Flow

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validate**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotency**: check if `idempotency_key` already exists in ledger.
   If yes, return cached result.
3. **Transaction** (single SQLite transaction):
   a. Compute sender balance.
   b. If `balance < amount`, abort (insufficient funds).
   c. Insert send row (`from=sender, to=receiver, amount`).
   d. Insert receive row (`from=receiver, to=sender, amount`).
4. **Rate limit**: check transfer rate for sender (max 10 transfers/min).
5. **Event**: emit `token_share` gamification event for XP + badge evaluation.
6. Return `{ success: true, balance: newBalance }`.

### Rate Limiting

- Max 10 transfers per minute per API key.
- Max 10,000 tokens per single transfer.
- Max 100,000 tokens transferred per day per API key.

---

## Invite & Redeem Tokens

**File:** `src/lib/gamification/invites.ts`

### Code Format

- **Code**: 8-character alphanumeric (e.g., `A3K9-X7M2`), human-readable,
  displayed to the user.
- **Token**: 32-byte random token, stored as SHA-256 hash. Used for
  programmatic redemption (e.g., URL links).

### Storage

| Column       | Value                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (unique, indexed) |
| `token_hash` | SHA-256(raw_token)           |

The raw token is returned to the user exactly once at creation time. OmniRoute
never stores or displays it again — only the hash persists.

### Self-Referral Prevention

When a user redeems a code, the system checks:

1. The code belongs to a different `api_key_id`.
2. The redeeming user has not previously redeemed any code from the same
   referrer (joins on `invite_tokens` + redemption log).

If either check fails, the redemption is rejected with a clear error message.

### Expiry & Limits

- Default `max_uses`: 10 (configurable at creation).
- Default `expires_at`: 30 days from creation.
- Expired or exhausted codes return HTTP 410 Gone.

---

## Community Server Federation

**File:** `src/lib/gamification/servers.ts`

### Connect

A community server is registered via an invite token issued by the remote
server. The local instance:

1. Receives the invite token (e.g., pasted into dashboard).
2. Calls `POST /api/gamification/federation/leaderboard` on the remote server
   to validate the token and fetch the current leaderboard.
3. Stores the server record with `status: connected`.

### Sync Model

Federation uses **overwrite sync**, not additive:

```
Local Instance                Community Server
     │                              │
     ├── push score ───────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server validates token hash)
     │                              │
     ├── pull leaderboard ─────────►│  GET /federation/leaderboard
     │◄── top-N entries ────────────┤  (overwrites local cache)
     │                              │
     └── health check ─────────────►│  GET /federation/health
         (every 60s, timeout 5s)    │
```

### Auth

Federation requests include:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

The remote server hashes the token and looks up the matching
`community_servers` row. This avoids transmitting the stored hash.

### Health Monitoring

Each server record tracks:

| Field       | Description                            |
| ----------- | -------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable` |
| `last_sync` | ISO timestamp of last successful sync  |
| `failures`  | Consecutive health check failures      |

After 5 consecutive failures, status changes to `unreachable` and sync is
paused until a manual health check succeeds.

---

## Anti-Cheat

**File:** `src/lib/gamification/antiCheat.ts`

### Server-Side Scoring

All XP calculations happen in `src/lib/gamification/xp.ts`. Clients never
submit a score — they submit actions, and the server computes XP. The
`leaderboard.score` column is only writable by server-side code.

### Rate Limiting

| Limit                 | Value   | Scope        |
| --------------------- | ------- | ------------ |
| Max XP per minute     | 1,000   | Per API key  |
| Max transfers per min | 10      | Per API key  |
| Max transfer amount   | 10,000  | Per transfer |
| Max daily transfers   | 100,000 | Per API key  |

Rate limits use an in-memory sliding window (same pattern as
`RateLimitManager` in `open-sse/services/`). Falls back to SQLite-backed
counters if the process restarts.

### Z-Score Anomaly Detection

For each API key, the system maintains a rolling 7-day window of XP earned per
hour. On each XP award:

1. Compute the user's current hourly XP rate.
2. Compute the population mean and standard deviation.
3. Calculate `z = (user_rate - mean) / stddev`.
4. If `z > 3.0` (3 standard deviations), flag as anomaly.

Anomalies are logged to `xp_audit_log` with `action = 'anomaly_detected'`
and surfaced on the admin dashboard.

### Audit Trail

Every XP award, transfer, badge earn, and anomaly detection is logged to
`xp_audit_log` with:

| Field        | Description                                    |
| ------------ | ---------------------------------------------- |
| `api_key_id` | Who                                            |
| `action`     | What happened (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Amount (0 for non-XP events)                   |
| `metadata`   | JSON with context (action type, target, …)     |
| `created_at` | When (ISO 8601)                                |

Admins can query the full audit trail via `GET /api/gamification/anomalies`.

---

## API Routes

All routes follow the standard OmniRoute pattern:

```
Route → CORS preflight → Body validation (Zod) → Auth (extractApiKey)
  → Handler
```

### Endpoints

| Method | Path                                       | Description                                 | Auth       |
| ------ | ------------------------------------------ | ------------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | Get leaderboard (scope, period, pagination) | Optional   |
| POST   | `/api/gamification/leaderboard`            | Force refresh leaderboard cache             | Required   |
| GET    | `/api/gamification/stream`                 | SSE real-time leaderboard updates           | Optional   |
| GET    | `/api/gamification/transfer`               | Get transfer history (pagination)           | Required   |
| POST   | `/api/gamification/transfer`               | Send tokens to another user                 | Required   |
| GET    | `/api/gamification/invite`                 | List my invite codes                        | Required   |
| POST   | `/api/gamification/invite`                 | Generate a new invite code                  | Required   |
| DELETE | `/api/gamification/invite`                 | Revoke an invite code                       | Required   |
| POST   | `/api/gamification/invite/redeem`          | Redeem an invite code                       | Required   |
| GET    | `/api/gamification/servers`                | List community servers                      | Required   |
| POST   | `/api/gamification/servers`                | Connect to a community server               | Required   |
| DELETE | `/api/gamification/servers`                | Disconnect from a community server          | Required   |
| POST   | `/api/gamification/federation/score`       | Push score to remote server                 | Federation |
| GET    | `/api/gamification/federation/leaderboard` | Pull leaderboard from remote                | Federation |
| GET    | `/api/gamification/notifications`          | SSE badge/level-up notifications            | Required   |
| GET    | `/api/gamification/anomalies`              | View anomaly reports (admin)                | Admin      |
| POST   | `/api/gamification/rotate`                 | Rotate invite token secrets                 | Required   |

### Request/Response Examples

**POST /api/gamification/transfer**

```json
// Request
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Response 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Response 400 (insufficient funds)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP Tools (8)

Registered in `open-sse/mcp-server/` alongside existing tools. Scoped under
the `gamification` permission scope.

| Tool                       | Description                           | Input Schema                 |
| -------------------------- | ------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Get leaderboard for a scope/period    | `{ scope, period?, limit? }` |
| `gamification_rank`        | Get caller's rank and neighbors       | `{ scope }`                  |
| `gamification_profile`     | Get XP, level, title, streak summary  | `{}`                         |
| `gamification_badges`      | List earned badges or all definitions | `{ earned?: boolean }`       |
| `gamification_transfer`    | Send tokens to another user           | `{ to, amount }`             |
| `gamification_invite`      | Generate or list invite codes         | `{ action: "create"          | "list" }` |
| `gamification_servers`     | List or connect community servers     | `{ action, token? }`         |
| `gamification_anomalies`   | View anomaly reports (admin scope)    | `{ limit?, since? }`         |

---

## Dashboard Pages

### `/dashboard/leaderboard`

- Podium display (top 3 with avatars and XP).
- Scope selector: Global / Weekly / Monthly / Tokens Shared / Contributions.
- Paginated table (25 per page) with rank, name, score, level, title.
- SSE real-time updates — rank changes animate in.
- Current user highlighted in the table with a "Your Rank" sticky row.

### `/dashboard/profile`

- XP progress bar with current level and next-level threshold.
- Title badge displayed prominently.
- Badge gallery — earned badges with earn date, unearned badges grayed out
  (hidden badges show "???" until earned).
- Streak counter with flame icon; streak calendar (last 30 days).
- XP history chart (daily XP over last 30 days).

### `/dashboard/tokens`

- Token balance (prominent, top of page).
- Transfer form: recipient, amount, confirm dialog.
- Transfer history table with filters (sent/received/all).
- Invite section: active codes, generate new, share link.
- Community servers: list with health status, connect/disconnect.

### `/dashboard/gamification/admin`

- Anomaly list with severity, user, timestamp, z-score.
- Audit log viewer with filters (action type, user, date range).
- System stats: total XP awarded, active users, badge earn rates.
- Federation server health overview.

---

## Pipeline Integration

### Integration Point

Gamification hooks into the request pipeline at a single point in
`open-sse/handlers/chatCore.ts`:

```typescript
// After response is sent to client:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Fire-and-forget: log but never propagate to client
  });
});
```

### Event Types

| Event Type          | When Emitted                             |
| ------------------- | ---------------------------------------- |
| `request.completed` | Successful LLM response sent             |
| `provider.switch`   | Provider changed (combo fallback counts) |
| `combo.created`     | New combo configuration saved            |
| `combo.used`        | Combo target successfully hit            |
| `badge.earned`      | Badge evaluation found a match           |
| `streak.milestone`  | Streak threshold crossed                 |
| `transfer.sent`     | Token transfer completed                 |
| `referral.redeemed` | Invite code successfully redeemed        |
| `compression.used`  | Prompt compression applied               |
| `skill.executed`    | Skill execution completed                |
| `model.first_use`   | Model not used in past 7 days            |

### Non-Blocking Guarantee

The `setImmediate` + `.catch(() => {})` pattern ensures:

1. The response is fully sent before gamification runs.
2. Gamification errors never surface to the client.
3. The event processing runs in the next microtask, not inline.

---

## Security

### Threat Model

| Threat                   | Mitigation                                                          |
| ------------------------ | ------------------------------------------------------------------- |
| Score inflation          | Server-side XP computation only; clients submit actions, not scores |
| Replay attacks           | Idempotency keys on transfers; audit log dedup                      |
| Transfer fraud           | Double-entry ledger; atomic transactions; rate limits               |
| Self-referral            | Cross-check `api_key_id` on redemption                              |
| Leaderboard manipulation | Z-score anomaly detection; admin anomaly dashboard                  |
| Federation token theft   | SHA-256 hashed storage; raw token shown once only                   |
| Brute force invite codes | Rate limiting on redemption endpoint; 8-char entropy                |
| XSS in display names     | Display names sanitized; leaderboard entries escaped                |
| Timing attacks on hashes | `crypto.timingSafeEqual` for token hash comparison                  |

### Auth Requirements

- **Public** (no auth): `GET /leaderboard`, `GET /stream` (read-only
  leaderboards).
- **API key required**: all write operations, profile, transfers, invites.
- **Admin only**: anomaly dashboard, audit log viewer.
- **Federation**: separate auth path using raw token in `Authorization`
  header, validated against stored SHA-256 hash.

---

## Testing

### Test Files

All tests use the Node.js native test runner (`node --import tsx/esm --test`).

| Test File                                     | Covers                                  | Tests |
| --------------------------------------------- | --------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | XP calculation, level curve, titles     | 8     |
| `tests/unit/gamification/badges.test.ts`      | Badge criteria matching, awarding       | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Streak logic, milestones, edge cases    | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Rank computation, pagination, rotation  | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Transfers, balance, idempotency         | 9     |
| `tests/unit/gamification/invites.test.ts`     | Create, redeem, expiry, self-referral   | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Rate limits, z-score, audit logging     | 6     |
| `tests/unit/gamification/events.test.ts`      | Event emission, fan-out, error handling | 5     |

### Running Tests

```bash
# All gamification tests
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Single test file
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Coverage Requirements

Per `CONTRIBUTING.md` — all new modules must have:

- Branch coverage >= 80%.
- Every public function tested at least once.
- Error paths tested (insufficient balance, expired codes, rate limits).

---

## File Structure

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # All 8 tables + indexes
      gamification.ts                  # Domain CRUD module
    gamification/
      xp.ts                           # XP calculation, level curve, titles
      badges.ts                       # Badge definitions, criteria, evaluation
      streaks.ts                      # Daily streak tracking
      leaderboard.ts                  # Rank computation, SSE, rotation
      antiCheat.ts                    # Rate limiting, z-score, audit
      sharing.ts                      # Token transfer ledger
      invites.ts                      # Invite/redeem codes
      servers.ts                      # Community server federation
      events.ts                       # Event emitter (integration point)
      notifications.ts                # SSE notification stream
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST leaderboard
        leaderboard/stream/route.ts   # SSE real-time updates
        transfer/route.ts             # GET/POST transfers
        invite/route.ts               # GET/POST/DELETE invite codes
        invite/redeem/route.ts        # POST redeem code
        servers/route.ts              # GET/POST/DELETE servers
        federation/score/route.ts     # POST push score
        federation/leaderboard/route.ts # GET pull leaderboard
        notifications/route.ts        # SSE notifications
        anomalies/route.ts            # GET anomaly reports
        rotate/route.ts               # POST rotate secrets
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Rankings page
        profile/page.tsx               # XP/badges/streaks page
        tokens/page.tsx                # Balance/transfers/invites page
        gamification/admin/page.tsx    # Admin anomaly monitoring
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # This document
```

---

## Migration Strategy

### Phase 1: Backend Core (PR 1)

- Migration `060_create_gamification.sql` (8 tables).
- `src/lib/db/gamification.ts` (domain module).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integration point in `chatCore.ts`.
- Unit tests for XP, streaks, events.

### Phase 2: Badges & Leaderboard (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Badge definitions in constants.
- Leaderboard API routes + SSE stream.
- Unit tests for badges, leaderboard.

### Phase 3: Sharing & Invites (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Transfer + invite API routes.
- Unit tests for sharing, invites, anti-cheat.

### Phase 4: Federation & Dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Federation API routes.
- Dashboard pages (leaderboard, profile, tokens, admin).
- MCP tools registration.

---

## Future Considerations

- **Seasonal events**: time-limited badge sets and leaderboard seasons.
- **Team leaderboards**: group users by organization or combo.
- **XP multipliers**: boost XP during promotional periods.
- **Achievement sharing**: generate shareable badge cards (OpenGraph images).
- **Mobile push**: webhook-based notifications for badge/level events.
- **Leaderboard API**: public API for third-party integrations.
