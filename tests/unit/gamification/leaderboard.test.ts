import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import {
  updateScore,
  getRank,
  getTopN,
  getNeighbors,
} from "../../../src/lib/gamification/leaderboard";
import { getDbInstance } from "../../../src/lib/db/core";

describe("Leaderboard Engine", () => {
  const testKey = `test-lb-${Date.now()}`;

  after(() => {
    // Cleanup
    try {
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

    it("returns different results with offset", async () => {
      // Seed multiple entries with distinct scores
      const keys: string[] = [];
      for (let i = 0; i < 10; i++) {
        const key = `test-offset-${Date.now()}-${i}`;
        keys.push(key);
        await updateScore(key, "global", (10 - i) * 100);
      }

      const page1 = await getTopN("global", 5, 0);
      const page2 = await getTopN("global", 5, 5);

      // Pages should not be identical
      const page1Ids = page1.map((e: any) => e.apiKeyId || e.api_key_id);
      const page2Ids = page2.map((e: any) => e.apiKeyId || e.api_key_id);
      const overlap = page1Ids.filter((id: string) => page2Ids.includes(id));
      assert.equal(overlap.length, 0, "Pages should not overlap");

      // Cleanup
      const db = getDbInstance();
      for (const key of keys) {
        db.prepare("DELETE FROM leaderboard WHERE api_key_id = ?").run(key);
      }
    });

    it("offset 0 returns same as no offset", async () => {
      const withOffset = await getTopN("global", 5, 0);
      const withoutOffset = await getTopN("global", 5);
      assert.equal(withOffset.length, withoutOffset.length);
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
