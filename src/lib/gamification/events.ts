/**
 * Gamification event emitter — called from chat pipeline.
 *
 * @module lib/gamification/events
 */

import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("GAMIFICATION");

/**
 * Emit a gamification event. All gamification updates happen here.
 * Called from chatCore.ts after successful requests.
 *
 * This function is fire-and-forget — never blocks the request pipeline.
 * All errors are caught and logged, never thrown.
 */
export async function emitGamificationEvent(params: {
  apiKeyId: string;
  action:
    | "request"
    | "provider_switch"
    | "model_switch"
    | "combo_create"
    | "combo_use"
    | "token_share"
    | "invite_redeem"
    | "daily_login";
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const { apiKeyId, action, metadata } = params;

  if (!apiKeyId) return; // Skip if no API key

  try {
    // 1. Award XP
    const xpAmount = getXpForAction(action);
    if (xpAmount > 0) {
      const { addXp } = await import("../db/gamification");
      addXp(apiKeyId, action, xpAmount, metadata ? JSON.stringify(metadata) : undefined);

      // Update level
      const { getXp, updateLevel } = await import("../db/gamification");
      const xp = getXp(apiKeyId);
      if (xp) {
        const { calculateLevel } = await import("./xp");
        const newLevel = calculateLevel(xp.totalXp);
        if (newLevel !== xp.currentLevel) {
          updateLevel(apiKeyId, newLevel);
          log.info("events.level_up", { apiKeyId, oldLevel: xp.currentLevel, newLevel });
        }
      }
    }

    // 2. Update streak
    if (action === "request") {
      const { updateStreak } = await import("./streaks");
      const streak = await updateStreak(apiKeyId);

      // Check streak badges
      if (streak >= 365) {
        await checkAndUnlockBadge(apiKeyId, "unstoppable");
      } else if (streak >= 30) {
        await checkAndUnlockBadge(apiKeyId, "monthly-master");
      } else if (streak >= 7) {
        await checkAndUnlockBadge(apiKeyId, "weekly-warrior");
      } else if (streak >= 3) {
        await checkAndUnlockBadge(apiKeyId, "daily-user");
      }
    }

    // 3. Update leaderboard
    const { updateScore } = await import("./leaderboard");
    await updateScore(apiKeyId, "global", xpAmount);

    // Update weekly/monthly
    await updateScore(apiKeyId, "weekly", xpAmount);
    await updateScore(apiKeyId, "monthly", xpAmount);

    // Update specific scopes
    if (action === "token_share") {
      await updateScore(apiKeyId, "tokens_shared", xpAmount);
    }

    // 4. Check action count badges
    await checkActionCountBadges(apiKeyId, action);
  } catch (err) {
    // Never throw — gamification must not break the request pipeline
    log.error("events.error", {
      apiKeyId,
      action,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

/**
 * Get XP amount for an action.
 */
function getXpForAction(action: string): number {
  const rewards: Record<string, number> = {
    request: 1,
    provider_switch: 5,
    model_switch: 3,
    combo_create: 10,
    combo_use: 2,
    token_share: 1,
    invite_redeem: 50,
    daily_login: 5,
  };
  return rewards[action] || 0;
}

/**
 * Check and unlock a specific badge.
 */
async function checkAndUnlockBadge(apiKeyId: string, badgeId: string): Promise<void> {
  const { unlockBadge, getBadges } = await import("../db/gamification");
  const earned = getBadges(apiKeyId);
  if (!earned.some((b) => b.badgeId === badgeId)) {
    unlockBadge(apiKeyId, badgeId);
    log.info("events.badge_unlocked", { apiKeyId, badgeId });

    // Look up badge details from badge_definitions
    const { getDbInstance } = await import("../db/core");
    const badgeRow = getDbInstance()
      .prepare("SELECT name, description, icon, rarity FROM badge_definitions WHERE id = ?")
      .get(badgeId) as
      | { name: string; description: string | null; icon: string | null; rarity: string }
      | undefined;

    // Record notification for SSE toast
    const { recordBadgeUnlock } = await import("./notifications");
    recordBadgeUnlock(apiKeyId, {
      badgeId,
      badgeName: badgeRow?.name ?? badgeId,
      badgeDescription: badgeRow?.description ?? "",
      badgeIcon: badgeRow?.icon ?? "award",
      badgeRarity: badgeRow?.rarity ?? "common",
      unlockedAt: new Date().toISOString(),
    });
  }
}

/**
 * Check action count badges after an action.
 */
async function checkActionCountBadges(apiKeyId: string, action: string): Promise<void> {
  const { getDbInstance } = await import("../db/core");
  const db = getDbInstance();

  // Count total actions of this type
  const row = db
    .prepare("COALESCE(COUNT(*), 0) AS count FROM xp_audit_log WHERE api_key_id = ? AND action = ?")
    .get(apiKeyId, action) as { count: number };

  const count = row.count;

  // Badge thresholds
  const thresholds: Record<string, Array<{ id: string; threshold: number }>> = {
    request: [
      { id: "first-token", threshold: 1 },
      { id: "token-consumer", threshold: 1000 },
      { id: "token-machine", threshold: 10000 },
      { id: "token-whale", threshold: 100000 },
    ],
    token_share: [
      { id: "generous", threshold: 1000 },
      { id: "philanthropist", threshold: 10000 },
      { id: "token-santa", threshold: 100000 },
      { id: "community-hero", threshold: 1000000 },
    ],
  };

  const badges = thresholds[action];
  if (!badges) return;

  for (const badge of badges) {
    if (count >= badge.threshold) {
      await checkAndUnlockBadge(apiKeyId, badge.id);
    }
  }
}
