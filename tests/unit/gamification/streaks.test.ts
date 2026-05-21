import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getStreak, updateStreak } from "../../../src/lib/gamification/streaks";

describe("Streak Tracker", () => {
  describe("getStreak", () => {
    it("returns zero streak for unknown user", async () => {
      const streak = await getStreak("nonexistent-user");
      assert.equal(streak.currentStreak, 0);
      assert.equal(streak.longestStreak, 0);
    });
  });

  describe("updateStreak", () => {
    it("returns positive streak count", async () => {
      const streak = await updateStreak("test-user-1");
      assert.ok(streak >= 1);
    });

    it("returns same count if called twice same day", async () => {
      const first = await updateStreak("test-user-2");
      const second = await updateStreak("test-user-2");
      assert.equal(first, second);
    });
  });
});
