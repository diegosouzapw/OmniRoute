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

    it("stores date metadata when starting a streak", async () => {
      await updateStreak("test-user-3");

      const streak = await getStreak("test-user-3");
      assert.equal(streak.currentStreak, 1);
      assert.equal(streak.longestStreak, 1);
      assert.match(streak.lastActiveDate, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(streak.streakStartDate, streak.lastActiveDate);
    });
  });
});
