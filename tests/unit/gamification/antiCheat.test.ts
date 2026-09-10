import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateScoreChange, getAnomalies } from "../../../src/lib/gamification/antiCheat";
import { getDbInstance } from "../../../src/lib/db/core";

describe("Anti-Cheat", () => {
  describe("validateScoreChange", () => {
    it("allows normal score changes", async () => {
      const result = await validateScoreChange("test-user", "request", 1);
      assert.equal(result.allowed, true);
    });

    it("rejects excessive XP", async () => {
      const result = await validateScoreChange("test-user", "request", 999999);
      assert.equal(result.allowed, false);
      assert.ok(result.reason);
    });

    // #2403: rows written through the table default (datetime('now'), "YYYY-MM-DD HH:MM:SS")
    // must count toward the sliding window. Compares are lexical on TEXT, so the window
    // boundary has to use the same format as the stored timestamps.
    it("counts XP persisted inside the window toward the per-minute limit", async () => {
      const db = getDbInstance();
      const key = `window-hit-${Date.now()}`;
      db.prepare("INSERT INTO xp_audit_log (api_key_id, action, xp_earned) VALUES (?, ?, ?)").run(
        key,
        "request",
        1000
      );

      const result = await validateScoreChange(key, "request", 1);
      assert.equal(result.allowed, false);
      assert.match(result.reason ?? "", /Rate limit exceeded: 1001 > 1000 XP\/min/);

      db.prepare("DELETE FROM xp_audit_log WHERE api_key_id = ?").run(key);
    });

    it("ignores XP persisted before the window", async () => {
      const db = getDbInstance();
      const key = `window-miss-${Date.now()}`;
      db.prepare(
        "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, datetime('now', '-2 minutes'))"
      ).run(key, "request", 1000);

      const result = await validateScoreChange(key, "request", 1);
      assert.equal(result.allowed, true);

      db.prepare("DELETE FROM xp_audit_log WHERE api_key_id = ?").run(key);
    });
  });

  describe("getAnomalies", () => {
    it("returns array", async () => {
      const anomalies = await getAnomalies();
      assert.ok(Array.isArray(anomalies));
    });

    it("returns entries with numeric zScore (not hardcoded 0)", async () => {
      const anomalies = await getAnomalies();
      for (const a of anomalies) {
        assert.equal(typeof a.zScore, "number");
        assert.ok(!Number.isNaN(a.zScore));
      }
    });
  });
});
