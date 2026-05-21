import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateLevel,
  xpForLevel,
  cumulativeXpForLevel,
  xpToNextLevel,
  getLevelTitle,
  getLevelTier,
  XP_REWARDS,
} from "../../../src/lib/gamification/xp";

describe("XP/Level Engine", () => {
  describe("calculateLevel", () => {
    it("returns level 1 for 0 XP", () => {
      assert.equal(calculateLevel(0), 1);
    });

    it("returns level 1 for negative XP", () => {
      assert.equal(calculateLevel(-100), 1);
    });

    it("returns level 1 for small XP", () => {
      assert.equal(calculateLevel(50), 1);
    });

    it("returns level ~5 for 3162 XP (xpForLevel(10))", () => {
      const level = calculateLevel(3162);
      assert.ok(level >= 4 && level <= 7, `Expected ~5, got ${level}`);
    });

    it("returns level ~10 for cumulative level-10 XP", () => {
      const xp = cumulativeXpForLevel(10);
      const level = calculateLevel(xp);
      assert.ok(level >= 9 && level <= 11, `Expected ~10, got ${level}`);
    });

    it("returns level ~25 for cumulative level-25 XP", () => {
      const xp = cumulativeXpForLevel(25);
      const level = calculateLevel(xp);
      assert.ok(level >= 24 && level <= 26, `Expected ~25, got ${level}`);
    });

    it("returns level ~50 for cumulative level-50 XP", () => {
      const xp = cumulativeXpForLevel(50);
      const level = calculateLevel(xp);
      assert.ok(level >= 49 && level <= 51, `Expected ~50, got ${level}`);
    });

    it("monotonically increases", () => {
      let prev = 0;
      for (let xp = 0; xp <= 100000; xp += 1000) {
        const level = calculateLevel(xp);
        assert.ok(level >= prev, `Level decreased at xp=${xp}: ${level} < ${prev}`);
        prev = level;
      }
    });
  });

  describe("xpForLevel", () => {
    it("returns 0 for level 1", () => {
      assert.equal(xpForLevel(1), 0);
    });

    it("returns positive XP for level > 1", () => {
      assert.ok(xpForLevel(2) > 0);
    });

    it("increases with level", () => {
      assert.ok(xpForLevel(10) > xpForLevel(5));
      assert.ok(xpForLevel(50) > xpForLevel(10));
    });
  });

  describe("cumulativeXpForLevel", () => {
    it("returns 0 for level 1", () => {
      assert.equal(cumulativeXpForLevel(1), 0);
    });

    it("increases with level", () => {
      assert.ok(cumulativeXpForLevel(10) > cumulativeXpForLevel(5));
    });
  });

  describe("xpToNextLevel", () => {
    it("returns positive number", () => {
      assert.ok(xpToNextLevel(0) > 0);
    });

    it("decreases as XP increases within same level", () => {
      const at100 = xpToNextLevel(100);
      const at200 = xpToNextLevel(200);
      // Both should be level 1, but at200 is closer to level 2
      if (calculateLevel(100) === calculateLevel(200)) {
        assert.ok(at200 < at100);
      }
    });
  });

  describe("getLevelTitle", () => {
    it("returns Beginner for level 1", () => {
      assert.equal(getLevelTitle(1), "Beginner");
    });

    it("returns Explorer for level 11", () => {
      assert.equal(getLevelTitle(11), "Explorer");
    });

    it("returns Expert for level 26", () => {
      assert.equal(getLevelTitle(26), "Expert");
    });

    it("returns Master for level 51", () => {
      assert.equal(getLevelTitle(51), "Master");
    });

    it("returns Legend for level 76", () => {
      assert.equal(getLevelTitle(76), "Legend");
    });
  });

  describe("getLevelTier", () => {
    it("returns bronze for level 1", () => {
      assert.equal(getLevelTier(1), "bronze");
    });

    it("returns silver for level 11", () => {
      assert.equal(getLevelTier(11), "silver");
    });

    it("returns gold for level 26", () => {
      assert.equal(getLevelTier(26), "gold");
    });

    it("returns platinum for level 51", () => {
      assert.equal(getLevelTier(51), "platinum");
    });

    it("returns diamond for level 76", () => {
      assert.equal(getLevelTier(76), "diamond");
    });
  });

  describe("XP_REWARDS", () => {
    it("has all expected actions", () => {
      assert.ok("request" in XP_REWARDS);
      assert.ok("provider_switch" in XP_REWARDS);
      assert.ok("combo_create" in XP_REWARDS);
      assert.ok("token_share" in XP_REWARDS);
      assert.ok("daily_login" in XP_REWARDS);
    });

    it("all rewards are positive", () => {
      for (const [key, value] of Object.entries(XP_REWARDS)) {
        assert.ok(value > 0, `${key} should be positive, got ${value}`);
      }
    });
  });
});
