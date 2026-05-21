/**
 * Leaderboard engine — score management, ranking, and scope rotation.
 *
 * @module lib/gamification/leaderboard
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type LeaderboardScope = "global" | "weekly" | "monthly" | "tokens_shared" | "contributions";

export interface LeaderboardEntry {
  apiKeyId: string;
  score: number;
}

// ─── Score Management ────────────────────────────────────────────────────────

/**
 * Update score for an API key in a scope. Atomic increment.
 */
export async function updateScore(
  apiKeyId: string,
  scope: LeaderboardScope,
  points: number
): Promise<void> {
  const { updateScore: dbUpdateScore } = await import("../db/gamification");
  dbUpdateScore(apiKeyId, scope, points);
}

/**
 * Get rank for an API key in a scope.
 */
export async function getRank(apiKeyId: string, scope: LeaderboardScope): Promise<number> {
  const { getRank: dbGetRank } = await import("../db/gamification");
  return dbGetRank(apiKeyId, scope);
}

/**
 * Get top N entries for a scope.
 */
export async function getTopN(scope: LeaderboardScope, limit: number = 50, offset: number = 0) {
  const { getTopN: dbGetTopN } = await import("../db/gamification");
  return dbGetTopN(scope, limit, offset);
}

/**
 * Get neighbors around a user (entries above and below).
 */
export async function getNeighbors(
  apiKeyId: string,
  scope: LeaderboardScope,
  radius: number = 5
): Promise<{ above: LeaderboardEntry[]; below: LeaderboardEntry[] }> {
  const { getLeaderboardNeighbors } = await import("../db/gamification");
  return getLeaderboardNeighbors(apiKeyId, scope, radius);
}

/**
 * Rotate weekly/monthly scopes. Archive old data, reset current.
 */
export async function rotateScope(scope: "weekly" | "monthly"): Promise<void> {
  const { rotateLeaderboardScope } = await import("../db/gamification");
  rotateLeaderboardScope(scope);
}
