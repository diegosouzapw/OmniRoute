import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import {
  updateScore,
  getRank,
  getTopN,
  getNeighbors,
  rotateScope,
} from "../../../src/lib/gamification/leaderboard";

describe("Leaderboard Engine", () => {
  const testKey = `test-lb-${Date.now()}`;

  after(() => {
    // Cleanup
    try {
      const { getDbInstance } = require("../../../src/lib/db/core");
      const db = getDbInstance();
      db.prepare("DELETE FROM leaderboard WHERE api_key_id LIKE ?").run("test-lb-%");
    } catch {}
  });

  describe("updateScore", () => {
    it("creates score entry", async () => {
      await updateScore(testKey, "global", 100);
      const rank = await getRank(testKey, "global");
      assert.ok(rank >= 1);
    });

    it("increments score", async () => {
      await updateScore(testKey, "global", 50);
      const top = await getTopN("global", 100);
      const entry = top.find((e: any) => (e.apiKeyId || e.api_key_id) === testKey);
      assert.ok(entry);
      assert.ok((entry.score || 0) >= 150);
    });
  });

  describe("getRank", () => {
    it("returns rank for existing user", async () => {
      const rank = await getRank(testKey, "global");
      assert.ok(rank >= 1);
    });

    it("returns 0 for non-existent user", async () => {
      const rank = await getRank("nonexistent", "global");
      assert.equal(rank, 0);
    });
  });

  describe("getTopN", () => {
    it("returns entries", async () => {
      const entries = await getTopN("global", 10);
      assert.ok(Array.isArray(entries));
    });

    it("respects limit", async () => {
      const entries = await getTopN("global", 5);
      assert.ok(entries.length <= 5);
    });
  });

  describe("getNeighbors", () => {
    it("returns above and below", async () => {
      const result = await getNeighbors(testKey, "global");
      assert.ok("above" in result);
      assert.ok("below" in result);
      assert.ok(Array.isArray(result.above));
      assert.ok(Array.isArray(result.below));
    });
  });
});
