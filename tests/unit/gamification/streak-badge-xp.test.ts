import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emitGamificationEvent } from "../../../src/lib/gamification/events";
import { advanceStreak, getStreak } from "../../../src/lib/gamification/streaks";
import { XP_REWARDS } from "../../../src/lib/gamification/xp";
import { addXp, getXp, unlockBadge } from "../../../src/lib/db/gamification";
import { getDbInstance } from "../../../src/lib/db/core";

// `XP_REWARDS` documents `streak_bonus` ("per consecutive streak day, multiplied by streak
// length") and `badge_unlock`, but the award pipeline never paid either: events.ts kept a
// private reward table without them, updateStreak() did not report whether the streak had
// just extended, and checkAndUnlockBadge() unlocked badges without XP. These tests pin the
// documented rewards and their idempotency guards (once per UTC day, once per badge).

const MS_PER_DAY = 86_400_000;
const STREAK_NS = "gamification:streaks";

function utcDate(offsetDays: number): string {
  return new Date(Date.now() - offsetDays * MS_PER_DAY).toISOString().split("T")[0];
}

function seedStreak(apiKeyId: string, currentStreak: number, lastActiveDaysAgo: number): void {
  const lastActiveDate = utcDate(lastActiveDaysAgo);
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      STREAK_NS,
      apiKeyId,
      JSON.stringify({
        currentStreak,
        longestStreak: currentStreak,
        lastActiveDate,
        streakStartDate: utcDate(lastActiveDaysAgo + currentStreak - 1),
      })
    );
}

function auditRows(
  apiKeyId: string,
  action: string
): Array<{ xp_earned: number; metadata: string | null }> {
  return getDbInstance()
    .prepare("SELECT xp_earned, metadata FROM xp_audit_log WHERE api_key_id = ? AND action = ?")
    .all(apiKeyId, action) as Array<{ xp_earned: number; metadata: string | null }>;
}

function auditTotal(apiKeyId: string): number {
  const row = getDbInstance()
    .prepare("SELECT COALESCE(SUM(xp_earned), 0) AS total FROM xp_audit_log WHERE api_key_id = ?")
    .get(apiKeyId) as { total: number };
  return row.total;
}

function leaderboardScore(apiKeyId: string, scope: string): number {
  const row = getDbInstance()
    .prepare("SELECT score FROM leaderboard WHERE api_key_id = ? AND scope = ?")
    .get(apiKeyId, scope) as { score: number } | undefined;
  return row?.score ?? 0;
}

function cleanup(apiKeyId: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM xp_audit_log WHERE api_key_id = ?").run(apiKeyId);
  db.prepare("DELETE FROM user_levels WHERE api_key_id = ?").run(apiKeyId);
  db.prepare("DELETE FROM user_badges WHERE api_key_id = ?").run(apiKeyId);
  db.prepare("DELETE FROM leaderboard WHERE api_key_id = ?").run(apiKeyId);
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(STREAK_NS, apiKeyId);
}

describe("streak bonus XP", () => {
  it("advanceStreak reports whether the streak extended today", async () => {
    const key = `sb-advance-${Date.now()}`;
    try {
      seedStreak(key, 1, 1);
      const first = await advanceStreak(key);
      assert.deepEqual(first, { currentStreak: 2, extended: true });
      const second = await advanceStreak(key);
      assert.deepEqual(second, { currentStreak: 2, extended: false }, "same day is a no-op");
    } finally {
      cleanup(key);
    }
  });

  it("pays streak_bonus x streak length on the day the streak extends", async () => {
    const key = `sb-pay-${Date.now()}`;
    try {
      seedStreak(key, 1, 1); // active yesterday → today's request extends to 2
      await emitGamificationEvent({ apiKeyId: key, action: "request" });

      const rows = auditRows(key, "streak_bonus");
      assert.equal(rows.length, 1, "exactly one streak_bonus audit row");
      assert.equal(rows[0].xp_earned, XP_REWARDS.streak_bonus * 2);
      assert.deepEqual(JSON.parse(rows[0].metadata ?? "{}"), { streak: 2 });
      assert.equal((await getStreak(key)).currentStreak, 2);

      const total = auditTotal(key);
      assert.equal(getXp(key)?.totalXp, total, "user_levels.total_xp matches the audit log");
      assert.equal(leaderboardScore(key, "global"), total, "global leaderboard credits the bonus");
      assert.equal(leaderboardScore(key, "weekly"), total);
      assert.equal(leaderboardScore(key, "monthly"), total);
    } finally {
      cleanup(key);
    }
  });

  it("pays the bonus once per UTC day even when requests repeat", async () => {
    const key = `sb-once-${Date.now()}`;
    try {
      seedStreak(key, 4, 1);
      await emitGamificationEvent({ apiKeyId: key, action: "request" });
      await emitGamificationEvent({ apiKeyId: key, action: "request" });
      await emitGamificationEvent({ apiKeyId: key, action: "request" });

      const rows = auditRows(key, "streak_bonus");
      assert.equal(rows.length, 1);
      assert.equal(rows[0].xp_earned, XP_REWARDS.streak_bonus * 5);
    } finally {
      cleanup(key);
    }
  });

  it("does not pay on the first day of a streak or after a broken streak", async () => {
    const fresh = `sb-fresh-${Date.now()}`;
    const broken = `sb-broken-${Date.now()}`;
    try {
      await emitGamificationEvent({ apiKeyId: fresh, action: "request" });
      assert.equal(auditRows(fresh, "streak_bonus").length, 0, "day 1 is not a consecutive day");

      seedStreak(broken, 6, 3); // last active three days ago → streak resets to 1
      await emitGamificationEvent({ apiKeyId: broken, action: "request" });
      assert.equal((await getStreak(broken)).currentStreak, 1);
      assert.equal(auditRows(broken, "streak_bonus").length, 0);
    } finally {
      cleanup(fresh);
      cleanup(broken);
    }
  });
});

describe("badge unlock XP", () => {
  it("unlockBadge reports whether a new row was inserted", () => {
    const key = `bu-insert-${Date.now()}`;
    try {
      assert.equal(unlockBadge(key, "first-token"), true);
      assert.equal(unlockBadge(key, "first-token"), false, "INSERT OR IGNORE → no new row");
    } finally {
      cleanup(key);
    }
  });

  it("pays badge_unlock once per badge when the pipeline unlocks it", async () => {
    const key = `bu-pay-${Date.now()}`;
    try {
      await emitGamificationEvent({ apiKeyId: key, action: "request" }); // → first-token
      await emitGamificationEvent({ apiKeyId: key, action: "request" }); // already earned

      const rows = auditRows(key, "badge_unlock");
      assert.equal(rows.length, 1, "exactly one badge_unlock audit row");
      assert.equal(rows[0].xp_earned, XP_REWARDS.badge_unlock);
      assert.deepEqual(JSON.parse(rows[0].metadata ?? "{}"), { badgeId: "first-token" });

      const total = auditTotal(key);
      assert.equal(total, 2 * XP_REWARDS.request + XP_REWARDS.badge_unlock);
      assert.equal(getXp(key)?.totalXp, total);
      assert.equal(leaderboardScore(key, "global"), total);
    } finally {
      cleanup(key);
    }
  });

  it("pays the streak badge and the streak bonus from the same request", async () => {
    const key = `bu-streak-${Date.now()}`;
    try {
      seedStreak(key, 2, 1); // → 3 today: daily-user badge + bonus
      await emitGamificationEvent({ apiKeyId: key, action: "request" });

      const badgeRows = auditRows(key, "badge_unlock");
      const unlocked = badgeRows.map((r) => JSON.parse(r.metadata ?? "{}").badgeId).sort();
      assert.deepEqual(unlocked, ["daily-user", "first-token"]);
      assert.equal(auditRows(key, "streak_bonus")[0]?.xp_earned, XP_REWARDS.streak_bonus * 3);
    } finally {
      cleanup(key);
    }
  });

  it("recomputes the level after bonus XP, not only after the action XP", async () => {
    const key = `bu-level-${Date.now()}`;
    try {
      // Level 2 needs 282 XP. 280 + 1 (request) = 281 stays level 1; the first-token
      // badge_unlock XP crosses the threshold, so the level must be synced after it.
      addXp(key, "request", 280);
      assert.equal(getXp(key)?.currentLevel, 1);
      await emitGamificationEvent({ apiKeyId: key, action: "request" });
      assert.equal(getXp(key)?.totalXp, 280 + XP_REWARDS.request + XP_REWARDS.badge_unlock);
      assert.equal(getXp(key)?.currentLevel, 2);
    } finally {
      cleanup(key);
    }
  });

  it("keeps the radar_supporter recognition path free of XP", async () => {
    const identity = `bu-radar-${Date.now()}`;
    try {
      await emitGamificationEvent({ apiKeyId: identity, action: "radar_supporter" });
      assert.equal(auditRows(identity, "badge_unlock").length, 0);
      assert.equal(getXp(identity), null);
      assert.equal(leaderboardScore(identity, "global"), 0);
    } finally {
      cleanup(identity);
    }
  });
});
