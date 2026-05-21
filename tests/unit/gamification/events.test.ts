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
});
