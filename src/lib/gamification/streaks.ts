/**
 * Streak Tracker for OmniRoute Gamification
 *
 * Tracks consecutive daily active usage per API key.
 * Stores streak data in the existing `key_value` table with
 * namespace `gamification:streaks` to avoid schema changes.
 *
 * @module lib/gamification/streaks
 */

import { getDbInstance, isBuildPhase, isCloud } from "../db/core";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StreakData {
  /** Current consecutive active days */
  currentStreak: number;
  /** Longest ever consecutive streak */
  longestStreak: number;
  /** Last day the user was active (YYYY-MM-DD) */
  lastActiveDate: string;
  /** Date the current streak started (YYYY-MM-DD) */
  streakStartDate: string;
}

interface StatementLike<TRow = unknown> {
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
  all: (...params: unknown[]) => TRow[];
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

interface KeyValueRow {
  value: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const NAMESPACE = "gamification:streaks";

/** One day in milliseconds */
const MS_PER_DAY = 86_400_000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Get today's date as YYYY-MM-DD in UTC.
 */
function todayUtc(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Get yesterday's date as YYYY-MM-DD in UTC.
 */
function yesterdayUtc(): string {
  return new Date(Date.now() - MS_PER_DAY).toISOString().split("T")[0];
}

function emptyStreak(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: "",
    streakStartDate: "",
  };
}

function parseStreakJson(raw: string): StreakData {
  try {
    const parsed = JSON.parse(raw) as Partial<StreakData>;
    return {
      currentStreak: typeof parsed.currentStreak === "number" ? parsed.currentStreak : 0,
      longestStreak: typeof parsed.longestStreak === "number" ? parsed.longestStreak : 0,
      lastActiveDate: typeof parsed.lastActiveDate === "string" ? parsed.lastActiveDate : "",
      streakStartDate: typeof parsed.streakStartDate === "string" ? parsed.streakStartDate : "",
    };
  } catch {
    return emptyStreak();
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Get the current streak data for an API key.
 *
 * @param apiKeyId - The API key identifier
 * @returns StreakData with current/longest streak and date info
 *
 * @example
 * const streak = await getStreak("key_abc123");
 * console.log(streak.currentStreak); // 7
 */
export async function getStreak(apiKeyId: string): Promise<StreakData> {
  if (isBuildPhase || isCloud) return emptyStreak();

  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, apiKeyId) as KeyValueRow | undefined;

  if (!row?.value) return emptyStreak();
  return parseStreakJson(row.value);
}

/**
 * Update streak for today. Returns the new current streak count.
 *
 * Behavior:
 * - If already active today, returns current streak (no-op).
 * - If active yesterday, increments streak.
 * - Otherwise, resets streak to 1 (new streak).
 *
 * Also updates longestStreak if the new streak is a personal record.
 *
 * @param apiKeyId - The API key identifier
 * @returns New current streak count
 *
 * @example
 * const count = await updateStreak("key_abc123");
 * console.log(count); // 8
 */
export async function updateStreak(apiKeyId: string): Promise<number> {
  if (isBuildPhase || isCloud) return 0;

  const db = getDbInstance() as unknown as DbLike;
  const today = todayUtc();
  const streak = await getStreak(apiKeyId);

  // Already counted today
  if (streak.lastActiveDate === today) {
    return streak.currentStreak;
  }

  const yesterday = yesterdayUtc();
  let newStreak: number;

  if (streak.lastActiveDate === yesterday) {
    // Consecutive day — extend streak
    newStreak = streak.currentStreak + 1;
  } else {
    // Streak broken or first activity — start fresh
    newStreak = 1;
  }

  const newData: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, streak.longestStreak),
    lastActiveDate: today,
    streakStartDate: newStreak === 1 ? today : streak.streakStartDate,
  };

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    NAMESPACE,
    apiKeyId,
    JSON.stringify(newData)
  );

  return newStreak;
}
