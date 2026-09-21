/**
 * gamification.ts — DB domain module for the Gamification & Leaderboard system.
 *
 * Manages leaderboards, XP/levels, badges, token ledger, invite tokens,
 * and community server connections.
 */

import { getDbInstance } from "./core";
import { calculateLevel } from "../gamification/xp";

// ──────────────── Types ────────────────

export interface LeaderboardRow {
  apiKeyId: string;
  scope: string;
  score: number;
  updatedAt: string;
}

export interface UserLevelRow {
  apiKeyId: string;
  totalXp: number;
  currentLevel: number;
  updatedAt: string;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  rarity: string;
  criteria: string | null;
  hidden: number;
  createdAt: string;
}

export interface UserBadge {
  apiKeyId: string;
  badgeId: string;
  unlockedAt: string;
  badgeName?: string;
  badgeDescription?: string | null;
  badgeIcon?: string | null;
  badgeCategory?: string | null;
  badgeRarity?: string;
}
export interface TokenLedgerEntry {
  id: number;
  fromApiKeyId: string;
  toApiKeyId: string;
  amount: number;
  reason: string | null;
  idempotencyKey: string | null;
  createdAt: string;
}

export interface InviteToken {
  id: string;
  code: string;
  tokenHash: string;
  createdBy: string;
  usedBy: string | null;
  serverUrl: string | null;
  maxUses: number;
  useCount: number;
  expiresAt: string | null;
  revokedAt: string | null;
  createdAt: string;
}

export interface CommunityServer {
  id: string;
  name: string;
  url: string;
  apiKeyHash: string;
  connectedAt: string;
  lastSyncAt: string | null;
  status: string;
  errorMessage: string | null;
}

// ──────────────── Helper ────────────────

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function db(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

// ──────────────── Leaderboard ────────────────

export function updateScore(apiKeyId: string, scope: string, points: number): void {
  db()
    .prepare(
      `INSERT INTO leaderboard (api_key_id, scope, score, updated_at)
     VALUES (?, ?, ?, datetime('now'))
     ON CONFLICT(api_key_id, scope)
     DO UPDATE SET score = score + excluded.score, updated_at = datetime('now')`
    )
    .run(apiKeyId, scope, points);
}

export function getRank(apiKeyId: string, scope: string): number {
  const row = db()
    .prepare(`SELECT score FROM leaderboard WHERE api_key_id = ? AND scope = ?`)
    .get(apiKeyId, scope) as { score: number } | undefined;
  if (!row) return 0;
  const rankRow = db()
    .prepare(`SELECT COUNT(*) + 1 AS rank FROM leaderboard WHERE scope = ? AND score > ?`)
    .get(scope, row.score) as { rank: number };
  return rankRow.rank;
}

export const LEADERBOARD_MAX_LIMIT = 200;

export function getTopN(scope: string, limit: number, offset: number = 0): LeaderboardRow[] {
  // Guard the SQLite LIMIT/OFFSET bind. A negative LIMIT means "no limit" in
  // SQLite (returns the whole table), and a non-integer throws a datatype
  // mismatch, so an unvalidated `?limit` on a caller route (e.g. the leaderboard
  // endpoints) could read the entire leaderboard or 500. Clamp to a coherent
  // range here as a defense-in-depth backstop, independent of route validation.
  const safeLimit = Number.isFinite(limit)
    ? Math.min(Math.max(Math.trunc(limit), 0), LEADERBOARD_MAX_LIMIT)
    : 0;
  const safeOffset = Number.isFinite(offset) ? Math.max(Math.trunc(offset), 0) : 0;
  const rows = db()
    .prepare(
      `SELECT api_key_id, scope, score, updated_at FROM leaderboard
     WHERE scope = ? ORDER BY score DESC LIMIT ? OFFSET ?`
    )
    .all(scope, safeLimit, safeOffset) as Array<{
    api_key_id: string;
    scope: string;
    score: number;
    updated_at: string;
  }>;
  return rows.map((r) => ({
    apiKeyId: r.api_key_id,
    scope: r.scope,
    score: r.score,
    updatedAt: r.updated_at,
  }));
}

// ──────────────── XP & Levels ────────────────

export function addXp(apiKeyId: string, action: string, amount: number, metadata?: string): void {
  db()
    .prepare(
      `INSERT INTO xp_audit_log (api_key_id, action, xp_earned, metadata)
     VALUES (?, ?, ?, ?)`
    )
    .run(apiKeyId, action, amount, metadata ?? null);

  // Durable per-key/per-action counter (#12546). xp_audit_log is pruned by
  // retention.xpAuditLog (default 30 days), so counting action-count badge
  // progress directly off that table silently reset every "lifetime" milestone.
  // Increment a durable counter here, alongside the audit insert, using the same
  // per-row weight getActionCount() reads: the metadata `amount` when present
  // (token_share stores the shared amount there), otherwise 1.
  db()
    .prepare(
      `INSERT INTO xp_action_counts (api_key_id, action, count, updated_at)
     VALUES (?, ?, COALESCE(CAST(json_extract(?, '$.amount') AS INTEGER), 1), datetime('now'))
     ON CONFLICT(api_key_id, action)
     DO UPDATE SET count = count + excluded.count, updated_at = datetime('now')`
    )
    .run(apiKeyId, action, metadata ?? null);

  db()
    .prepare(
      `INSERT INTO user_levels (api_key_id, total_xp, current_level, updated_at)
     VALUES (?, ?, ?, datetime('now'))
     ON CONFLICT(api_key_id)
     DO UPDATE SET total_xp = total_xp + excluded.total_xp, updated_at = datetime('now')`
    )
    .run(apiKeyId, amount, calculateLevel(amount));
}

export function getXp(apiKeyId: string): UserLevelRow | null {
  const row = db()
    .prepare(
      `SELECT api_key_id, total_xp, current_level, updated_at FROM user_levels WHERE api_key_id = ?`
    )
    .get(apiKeyId) as
    | {
        api_key_id: string;
        total_xp: number;
        current_level: number;
        updated_at: string;
      }
    | undefined;
  if (!row) return null;
  return {
    apiKeyId: row.api_key_id,
    totalXp: row.total_xp,
    currentLevel: row.current_level,
    updatedAt: row.updated_at,
  };
}

export function updateLevel(apiKeyId: string, level: number): void {
  db()
    .prepare(
      `INSERT INTO user_levels (api_key_id, total_xp, current_level, updated_at)
     VALUES (?, 0, ?, datetime('now'))
     ON CONFLICT(api_key_id)
     DO UPDATE SET current_level = ?, updated_at = datetime('now')`
    )
    .run(apiKeyId, level, level);
}

// ──────────────── Badges ────────────────

/**
 * Award a badge to an API key. Idempotent on the `(api_key_id, badge_id)` primary key.
 *
 * @returns `true` when this call inserted the badge, `false` when it was already earned.
 *   Callers that pay the `badge_unlock` XP reward key off this so a badge is paid once.
 */
export function unlockBadge(apiKeyId: string, badgeId: string): boolean {
  const result = db()
    .prepare(`INSERT OR IGNORE INTO user_badges (api_key_id, badge_id) VALUES (?, ?)`)
    .run(apiKeyId, badgeId);
  return result.changes > 0;
}

/**
 * Whether a specific badge has already been awarded to an API key.
 *
 * Reads `user_badges` directly (no JOIN), so the "already unlocked?" check is correct even
 * when `badge_definitions` is unpopulated. `getBadges()` INNER-JOINs `badge_definitions`, so
 * it returns nothing until the definitions are seeded — using it as a dedup guard caused
 * badge-unlock events to re-fire on every request (#3472).
 */
export function hasBadge(apiKeyId: string, badgeId: string): boolean {
  const row = db()
    .prepare(`SELECT 1 FROM user_badges WHERE api_key_id = ? AND badge_id = ? LIMIT 1`)
    .get(apiKeyId, badgeId);
  return !!row;
}

/**
 * Whether `xp_audit_log` already holds an entry for this action on the current UTC day.
 *
 * `created_at` is written by the table default `datetime('now')` as
 * `"YYYY-MM-DD HH:MM:SS"` (UTC), so a lexical compare against `date('now')` selects
 * today's rows. Used as the once-per-day guard for daily rewards such as `streak_bonus`.
 */
export function hasXpActionToday(apiKeyId: string, action: string): boolean {
  const row = db()
    .prepare(
      `SELECT 1 FROM xp_audit_log
       WHERE api_key_id = ? AND action = ? AND created_at >= date('now')
       LIMIT 1`
    )
    .get(apiKeyId, action);
  return !!row;
}

export function getBadges(apiKeyId: string): UserBadge[] {
  const rows = db()
    .prepare(
      `SELECT ub.api_key_id, ub.badge_id, ub.unlocked_at,
            bd.name, bd.description, bd.icon, bd.category, bd.rarity
     FROM user_badges ub
     JOIN badge_definitions bd ON bd.id = ub.badge_id
     WHERE ub.api_key_id = ?`
    )
    .all(apiKeyId) as Array<{
    api_key_id: string;
    badge_id: string;
    unlocked_at: string;
    name: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    rarity: string;
  }>;
  return rows.map((r) => ({
    apiKeyId: r.api_key_id,
    badgeId: r.badge_id,
    unlockedAt: r.unlocked_at,
    badgeName: r.name,
    badgeDescription: r.description,
    badgeIcon: r.icon,
    badgeCategory: r.category,
    badgeRarity: r.rarity,
  }));
}

export function getBadgeDefinitions(category?: string): BadgeDefinition[] {
  const sql = category
    ? `SELECT * FROM badge_definitions WHERE category = ?`
    : `SELECT * FROM badge_definitions`;
  const rows = (category ? db().prepare(sql).all(category) : db().prepare(sql).all()) as Array<{
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    rarity: string;
    criteria: string | null;
    hidden: number;
    created_at: string;
  }>;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    icon: r.icon,
    category: r.category,
    rarity: r.rarity,
    criteria: r.criteria,
    hidden: r.hidden,
    createdAt: r.created_at,
  }));
}

/**
 * Aggregate XP across every API key (the operator-wide profile view used by the
 * dashboard profile page, which is not scoped to a single key). The aggregate
 * level must be derived from the same summed XP displayed by the profile. (#3484)
 */
export function getAggregateXp(): UserLevelRow {
  const row = db()
    .prepare(
      `SELECT COALESCE(SUM(total_xp), 0) AS total_xp,
              MAX(updated_at) AS updated_at
       FROM user_levels`
    )
    .get() as { total_xp: number; updated_at: string | null };
  const totalXp = row?.total_xp ?? 0;
  return {
    apiKeyId: "*",
    totalXp,
    currentLevel: calculateLevel(totalXp),
    updatedAt: row?.updated_at ?? "",
  };
}

/**
 * Distinct badges earned by any API key (operator-wide earned set for the profile
 * page). Deduplicated by badge id, keeping the earliest unlock. (#3484)
 */
export function getAllEarnedBadges(): UserBadge[] {
  const rows = db()
    .prepare(
      `SELECT ub.badge_id, MIN(ub.unlocked_at) AS unlocked_at,
              bd.name, bd.description, bd.icon, bd.category, bd.rarity
       FROM user_badges ub
       JOIN badge_definitions bd ON bd.id = ub.badge_id
       GROUP BY ub.badge_id`
    )
    .all() as Array<{
    badge_id: string;
    unlocked_at: string;
    name: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    rarity: string;
  }>;
  return rows.map((r) => ({
    apiKeyId: "*",
    badgeId: r.badge_id,
    unlockedAt: r.unlocked_at,
    badgeName: r.name,
    badgeDescription: r.description,
    badgeIcon: r.icon,
    badgeCategory: r.category,
    badgeRarity: r.rarity,
  }));
}

// ──────────────── Token Ledger ────────────────

export function transferTokens(
  fromId: string,
  toId: string,
  amount: number,
  reason: string,
  idempotencyKey: string
): { success: boolean; error?: string } {
  // Atomic transaction: balance check + insert
  const instance = getDbInstance();
  const txn = instance.transaction(() => {
    // Check for duplicate
    const existing = instance
      .prepare(`SELECT id FROM token_ledger WHERE idempotency_key = ?`)
      .get(idempotencyKey) as { id: number } | undefined;
    if (existing) return { success: true };

    // Balance check (inside transaction to prevent race)
    const balance = getBalance(fromId);
    if (balance < amount) {
      return { success: false, error: "insufficient_balance" };
    }

    instance
      .prepare(
        `INSERT INTO token_ledger (from_api_key_id, to_api_key_id, amount, reason, idempotency_key)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(fromId, toId, amount, reason, idempotencyKey);

    return { success: true };
  });

  return txn();
}

export function getBalance(apiKeyId: string): number {
  const received = db()
    .prepare(`SELECT COALESCE(SUM(amount), 0) AS total FROM token_ledger WHERE to_api_key_id = ?`)
    .get(apiKeyId) as { total: number };
  const sent = db()
    .prepare(`SELECT COALESCE(SUM(amount), 0) AS total FROM token_ledger WHERE from_api_key_id = ?`)
    .get(apiKeyId) as { total: number };
  return received.total - sent.total;
}

export function getHistory(apiKeyId: string, limit: number): TokenLedgerEntry[] {
  const rows = db()
    .prepare(
      `SELECT * FROM token_ledger
     WHERE from_api_key_id = ? OR to_api_key_id = ?
     ORDER BY created_at DESC LIMIT ?`
    )
    .all(apiKeyId, apiKeyId, limit) as Array<{
    id: number;
    from_api_key_id: string;
    to_api_key_id: string;
    amount: number;
    reason: string | null;
    idempotency_key: string | null;
    created_at: string;
  }>;
  return rows.map((r) => ({
    id: r.id,
    fromApiKeyId: r.from_api_key_id,
    toApiKeyId: r.to_api_key_id,
    amount: r.amount,
    reason: r.reason,
    idempotencyKey: r.idempotency_key,
    createdAt: r.created_at,
  }));
}

// ──────────────── Invite Tokens ────────────────

export function createInviteToken(
  id: string,
  code: string,
  tokenHash: string,
  createdBy: string,
  serverUrl?: string,
  maxUses?: number
): void {
  db()
    .prepare(
      `INSERT INTO invite_tokens (id, code, token_hash, created_by, server_url, max_uses)
     VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(id, code, tokenHash, createdBy, serverUrl ?? null, maxUses ?? 1);
}

export function getInviteByCode(code: string): InviteToken | null {
  const row = db().prepare(`SELECT * FROM invite_tokens WHERE code = ?`).get(code) as
    | {
        id: string;
        code: string;
        token_hash: string;
        created_by: string;
        used_by: string | null;
        server_url: string | null;
        max_uses: number;
        use_count: number;
        expires_at: string | null;
        revoked_at: string | null;
        created_at: string;
      }
    | undefined;
  if (!row) return null;
  return {
    id: row.id,
    code: row.code,
    tokenHash: row.token_hash,
    createdBy: row.created_by,
    usedBy: row.used_by,
    serverUrl: row.server_url,
    maxUses: row.max_uses,
    useCount: row.use_count,
    expiresAt: row.expires_at,
    revokedAt: row.revoked_at,
    createdAt: row.created_at,
  };
}

export function redeemInvite(code: string, usedBy: string): boolean {
  const result = db()
    .prepare(
      `UPDATE invite_tokens
     SET use_count = use_count + 1, used_by = ?
     WHERE code = ? AND revoked_at IS NULL
       AND use_count < max_uses
       AND (expires_at IS NULL OR expires_at > datetime('now'))`
    )
    .run(usedBy, code);
  return result.changes > 0;
}

export function revokeInvite(id: string): void {
  db().prepare(`UPDATE invite_tokens SET revoked_at = datetime('now') WHERE id = ?`).run(id);
}

// ──────────────── Community Servers ────────────────

/**
 * Look up a connected community server by its API key hash.
 * Returns the server id if the key hash matches a 'connected' server, or undefined.
 * Used by federation routes to authenticate bearer tokens.
 */
export function getConnectedServerByKeyHash(apiKeyHash: string): { id: string } | undefined {
  return db()
    .prepare("SELECT id FROM community_servers WHERE api_key_hash = ? AND status = 'connected'")
    .get(apiKeyHash) as { id: string } | undefined;
}

export function connectServer(id: string, name: string, url: string, apiKeyHash: string): void {
  db()
    .prepare(
      `INSERT OR REPLACE INTO community_servers (id, name, url, api_key_hash)
     VALUES (?, ?, ?, ?)`
    )
    .run(id, name, url, apiKeyHash);
}

export function disconnectServer(id: string): void {
  db().prepare(`UPDATE community_servers SET status = 'disconnected' WHERE id = ?`).run(id);
}

/** List community servers (excludes api_key_hash for security). */
export function listServers(): Omit<CommunityServer, "apiKeyHash">[] {
  const rows = db()
    .prepare(
      `SELECT id, name, url, connected_at, last_sync_at, status, error_message FROM community_servers`
    )
    .all() as Array<{
    id: string;
    name: string;
    url: string;
    connected_at: string;
    last_sync_at: string | null;
    status: string;
    error_message: string | null;
  }>;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    url: r.url,
    connectedAt: r.connected_at,
    lastSyncAt: r.last_sync_at,
    status: r.status,
    errorMessage: r.error_message,
  }));
}

/**
 * Get neighbors around a user on the leaderboard.
 */
export function getLeaderboardNeighbors(
  apiKeyId: string,
  scope: string,
  radius: number = 5
): {
  above: Array<{ apiKeyId: string; score: number }>;
  below: Array<{ apiKeyId: string; score: number }>;
} {
  const d = db();

  const scoreRow = d
    .prepare("SELECT score FROM leaderboard WHERE api_key_id = ? AND scope = ?")
    .get(apiKeyId, scope) as { score: number } | undefined;

  if (!scoreRow) return { above: [], below: [] };

  const above = d
    .prepare(
      `SELECT api_key_id, score FROM leaderboard
       WHERE scope = ? AND score > ?
       ORDER BY score ASC LIMIT ?`
    )
    .all(scope, scoreRow.score, radius) as Array<{ api_key_id: string; score: number }>;

  const below = d
    .prepare(
      `SELECT api_key_id, score FROM leaderboard
       WHERE scope = ? AND score < ?
       ORDER BY score DESC LIMIT ?`
    )
    .all(scope, scoreRow.score, radius) as Array<{ api_key_id: string; score: number }>;

  return {
    above: above.reverse().map((r) => ({ apiKeyId: r.api_key_id, score: r.score })),
    below: below.map((r) => ({ apiKeyId: r.api_key_id, score: r.score })),
  };
}

/**
 * Rotate weekly/monthly scopes. Archive old data, reset current.
 * Uses two-step approach (SELECT then parameterized INSERT) to avoid SQL injection.
 * Skips if archive scope already has data for this period (double-run protection).
 */
export function rotateLeaderboardScope(scope: "weekly" | "monthly"): void {
  const d = db();
  const archiveSuffix =
    scope === "weekly"
      ? `week_${new Date().toISOString().slice(0, 10)}`
      : `month_${new Date().toISOString().slice(0, 7)}`;

  // Double-run protection: skip if archive scope already has data
  const existing = d
    .prepare("SELECT COUNT(*) AS cnt FROM leaderboard WHERE scope = ?")
    .get(archiveSuffix) as { cnt: number };
  if (existing.cnt > 0) return;

  // Step 1: SELECT rows into memory
  const rows = d
    .prepare("SELECT api_key_id, score, updated_at FROM leaderboard WHERE scope = ?")
    .all(scope) as Array<{ api_key_id: string; score: number; updated_at: string }>;

  // Step 2: INSERT with parameters (no string interpolation)
  if (rows.length > 0) {
    const insert = d.prepare(
      "INSERT OR IGNORE INTO leaderboard (api_key_id, scope, score, updated_at) VALUES (?, ?, ?, ?)"
    );
    for (const row of rows) {
      insert.run(row.api_key_id, archiveSuffix, row.score, row.updated_at);
    }
  }

  d.prepare("DELETE FROM leaderboard WHERE scope = ?").run(scope);
}
