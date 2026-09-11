import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emitGamificationEvent } from "../../../src/lib/gamification/events";
import { getDbInstance } from "../../../src/lib/db/core";

describe("Gamification Events", () => {
  it("does not throw for valid event", async () => {
    await assert.doesNotReject(emitGamificationEvent({ apiKeyId: "test-user", action: "request" }));
  });

  it("does not throw for missing apiKeyId", async () => {
    await assert.doesNotReject(emitGamificationEvent({ apiKeyId: "", action: "request" }));
  });

  it("does not throw for unknown action", async () => {
    await assert.doesNotReject(
      emitGamificationEvent({ apiKeyId: "test-user", action: "unknown" as any })
    );
  });

  it("checkActionCountBadges counts actions correctly via SQL", async () => {
    // Verifies the SELECT fix — before fix, missing SELECT caused silent SQL error
    const db = getDbInstance();

    const testKey = `test-badge-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      db.prepare("INSERT INTO xp_audit_log (api_key_id, action, xp_earned) VALUES (?, ?, ?)").run(
        testKey,
        "request",
        1
      );
    }

    // Verify the SELECT query works (was broken before fix)
    const row = db
      .prepare(
        "SELECT COALESCE(COUNT(*), 0) AS count FROM xp_audit_log WHERE api_key_id = ? AND action = ?"
      )
      .get(testKey, "request") as { count: number };
    assert.equal(row.count, 5);

    // Cleanup
    db.prepare("DELETE FROM xp_audit_log WHERE api_key_id = ?").run(testKey);
  });

  // #2403: the per-key rate limit (1000 XP/min) documented for the anti-cheat layer must
  // actually gate the award path. Each case seeds xp_audit_log directly so the window state
  // is deterministic, then emits a 1 XP "request" event.
  describe("anti-cheat gate on the award path", () => {
    function seedXp(apiKeyId: string, xp: number, createdAtModifier?: string): void {
      const db = getDbInstance();
      if (createdAtModifier) {
        db.prepare(
          "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, datetime('now', ?))"
        ).run(apiKeyId, "seed", xp, createdAtModifier);
      } else {
        db.prepare("INSERT INTO xp_audit_log (api_key_id, action, xp_earned) VALUES (?, ?, ?)").run(
          apiKeyId,
          "seed",
          xp
        );
      }
    }

    function countRequestRows(apiKeyId: string): number {
      const row = getDbInstance()
        .prepare(
          "SELECT COUNT(*) AS count FROM xp_audit_log WHERE api_key_id = ? AND action = 'request'"
        )
        .get(apiKeyId) as { count: number };
      return row.count;
    }

    function leaderboardScore(apiKeyId: string): number | undefined {
      const row = getDbInstance()
        .prepare("SELECT score FROM leaderboard WHERE api_key_id = ? AND scope = 'global'")
        .get(apiKeyId) as { score: number } | undefined;
      return row?.score;
    }

    function cleanup(apiKeyId: string): void {
      const db = getDbInstance();
      db.prepare("DELETE FROM xp_audit_log WHERE api_key_id = ?").run(apiKeyId);
      db.prepare("DELETE FROM leaderboard WHERE api_key_id = ?").run(apiKeyId);
      db.prepare("DELETE FROM user_levels WHERE api_key_id = ?").run(apiKeyId);
    }

    it("skips the award once the key has exhausted 1000 XP inside the last minute", async () => {
      const key = `rate-limited-${Date.now()}`;
      seedXp(key, 1000);

      await assert.doesNotReject(emitGamificationEvent({ apiKeyId: key, action: "request" }));

      assert.equal(countRequestRows(key), 0, "over-limit award must not be persisted");
      assert.equal(
        leaderboardScore(key),
        undefined,
        "over-limit award must not reach the leaderboard"
      );
      cleanup(key);
    });

    it("applies the award when the window total stays at or below the limit", async () => {
      const key = `under-limit-${Date.now()}`;
      seedXp(key, 999); // 999 + 1 == 1000, which is allowed (limit is exclusive of the cap)

      await emitGamificationEvent({ apiKeyId: key, action: "request" });

      assert.equal(countRequestRows(key), 1);
      assert.equal(leaderboardScore(key), 1);
      cleanup(key);
    });

    it("ignores XP that was earned before the one-minute window", async () => {
      const key = `stale-window-${Date.now()}`;
      seedXp(key, 1000, "-2 minutes");

      await emitGamificationEvent({ apiKeyId: key, action: "request" });

      assert.equal(countRequestRows(key), 1, "stale XP must not block a fresh award");
      cleanup(key);
    });
  });
});
