import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateBadges, seedBuiltinBadges } from "../../../src/lib/gamification/badges";
import { getDbInstance } from "../../../src/lib/db/core";
import { getRank, updateScore } from "../../../src/lib/db/gamification";

// The "rank" badge criterion used to run its own copy of the leaderboard rank query, which
// returned Infinity for an unranked key while the canonical db/gamification getRank() returns 0.
// The criterion now uses the canonical getRank(), so it must treat 0 as "unranked" — otherwise
// `0 <= threshold` would hand community-leader to every key that never scored.

const RANK_BADGE = "community-leader";

function cleanup(key: string) {
  const db = getDbInstance();
  db.prepare("DELETE FROM user_badges WHERE api_key_id = ?").run(key);
  db.prepare("DELETE FROM leaderboard WHERE api_key_id = ?").run(key);
}

describe("rank badge criterion uses the canonical leaderboard rank", () => {
  it("does not unlock the rank badge for a key with no leaderboard entry", async () => {
    const key = `rank-unranked-${Date.now()}`;
    try {
      await seedBuiltinBadges();
      assert.equal(getRank(key, "global"), 0, "canonical getRank reports unranked as 0");
      const unlocked = await evaluateBadges(key, "request");
      assert.ok(!unlocked.includes(RANK_BADGE), "unranked key must not earn the rank badge");
    } finally {
      cleanup(key);
    }
  });

  it("unlocks the rank badge for a key ranked within the threshold", async () => {
    const key = `rank-top-${Date.now()}`;
    try {
      await seedBuiltinBadges();
      updateScore(key, "global", Number.MAX_SAFE_INTEGER);
      assert.equal(getRank(key, "global"), 1);
      const unlocked = await evaluateBadges(key, "request");
      assert.ok(unlocked.includes(RANK_BADGE), "rank-1 key must earn the rank badge");
    } finally {
      cleanup(key);
    }
  });
});
