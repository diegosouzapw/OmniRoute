import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { unlockBadge, getBadges, hasBadge } from "../../../src/lib/db/gamification";
import { getDbInstance } from "../../../src/lib/db/core";

// Regression for #3472: badge_definitions is empty in production (seedBuiltinBadges is never
// wired at startup). The old "already unlocked?" guard in checkAndUnlockBadge used getBadges(),
// which INNER-JOINs badge_definitions — so it returned [] even after a badge was awarded, and
// the unlock event (events.badge_unlocked) was re-emitted on EVERY request. The guard must read
// user_badges directly so dedup works regardless of whether badge_definitions is populated.

describe("#3472 badge unlock dedup is independent of badge_definitions", () => {
  it("hasBadge() sees an awarded badge even when badge_definitions has no matching row", () => {
    const key = `t3472-${Date.now()}`;
    const badgeId = `first-token-3472-${Date.now()}`;
    const db = getDbInstance();
    try {
      unlockBadge(key, badgeId);
      // getBadges INNER-JOINs badge_definitions → blind to this award (the bug surface).
      assert.equal(getBadges(key).length, 0, "getBadges is blind without a definition row");
      // The fixed guard reads user_badges directly.
      assert.equal(hasBadge(key, badgeId), true, "hasBadge must see the awarded badge");
    } finally {
      db.prepare("DELETE FROM user_badges WHERE api_key_id = ?").run(key);
    }
  });

  it("hasBadge() is false before award and a repeated unlock stays a single row", () => {
    const key = `t3472b-${Date.now()}`;
    const badgeId = `token-consumer-3472-${Date.now()}`;
    const db = getDbInstance();
    try {
      assert.equal(hasBadge(key, badgeId), false, "no badge before award");
      unlockBadge(key, badgeId);
      unlockBadge(key, badgeId); // INSERT OR IGNORE → still one row
      assert.equal(hasBadge(key, badgeId), true);
      const count = db
        .prepare("SELECT COUNT(*) AS n FROM user_badges WHERE api_key_id = ? AND badge_id = ?")
        .get(key, badgeId) as { n: number };
      assert.equal(count.n, 1, "exactly one badge row after repeated unlock");
    } finally {
      db.prepare("DELETE FROM user_badges WHERE api_key_id = ?").run(key);
    }
  });
});
