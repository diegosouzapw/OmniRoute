import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateScoreChange, getAnomalies } from "../../../src/lib/gamification/antiCheat";

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
  });

  describe("getAnomalies", () => {
    it("returns array", async () => {
      const anomalies = await getAnomalies();
      assert.ok(Array.isArray(anomalies));
    });
  });
});
