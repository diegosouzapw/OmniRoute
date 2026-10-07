import { after, describe, it } from "node:test";
import assert from "node:assert/strict";
import { getDbInstance, resetDbInstance } from "../../../src/lib/db/core";
import { getAggregateStreak, getStreak, updateStreak } from "../../../src/lib/gamification/streaks";

const STREAK_NAMESPACE = "gamification:streaks";

function seedStreakRow(apiKeyId: string, value: string): void {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(STREAK_NAMESPACE, apiKeyId, value);
}

after(() => {
  try {
    getDbInstance().close();
  } catch {
    /* ignore */
  }
  resetDbInstance();
});

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

  describe("getAggregateStreak", () => {
    it("returns zero streak when no key has ever been active", async () => {
      // The updateStreak cases above already wrote rows for this process' DB.
      getDbInstance().prepare("DELETE FROM key_value WHERE namespace = ?").run(STREAK_NAMESPACE);

      const agg = await getAggregateStreak();
      assert.equal(agg.currentStreak, 0);
      assert.equal(agg.longestStreak, 0);
    });

    it("takes the max current and max longest streak across every key", async () => {
      await updateStreak("agg-key-a"); // current 1 / longest 1, written by the tracker itself
      seedStreakRow(
        "agg-key-b",
        JSON.stringify({
          currentStreak: 3,
          longestStreak: 3,
          lastActiveDate: "2026-08-31",
          streakStartDate: "2026-08-29",
        })
      );
      seedStreakRow(
        "agg-key-c",
        JSON.stringify({
          currentStreak: 0,
          longestStreak: 9,
          lastActiveDate: "2026-07-01",
          streakStartDate: "2026-06-23",
        })
      );

      const agg = await getAggregateStreak();
      assert.equal(agg.currentStreak, 3); // max(1, 3, 0), not the sum
      assert.equal(agg.longestStreak, 9); // max(1, 3, 9) — may come from a different key
    });

    it("ignores malformed rows in the namespace instead of throwing", async () => {
      seedStreakRow("agg-key-broken", "not json");
      seedStreakRow(
        "agg-key-strings",
        JSON.stringify({ currentStreak: "12", longestStreak: null })
      );

      const agg = await getAggregateStreak();
      assert.equal(agg.currentStreak, 3);
      assert.equal(agg.longestStreak, 9);
    });
  });
});
