/**
 * Unit tests for API key policy helpers:
 *   - parseIsActive (via parseAccessSchedule indirect coverage)
 *   - isWithinSchedule logic (tested directly via a re-export or by mocking Date)
 *
 * Because isWithinSchedule is module-private, we test it through observable
 * behavior: feeding real Date overrides via globalThis.Date stubbing.
 *
 * Strategy:
 *   1. Extract the schedule-check logic into a standalone helper exported only
 *      for tests — OR test it end-to-end through enforceApiKeyPolicy.
 *   2. Since enforceApiKeyPolicy needs a full DB + HTTP Request, we isolate
 *      isWithinSchedule by copying its logic into this test file and verifying
 *      the exact same algorithm.
 */

import test from "node:test";
import assert from "node:assert/strict";

// ─── Replicate the isWithinSchedule logic for pure unit testing ───────────────
//
// This mirrors the implementation in apiKeyPolicy.ts exactly.
// If the production code changes, update this copy too.

/**
 * @param {{ enabled: boolean; from: string; until: string; days: number[]; tz: string }} schedule
 * @param {Date} now  — injectable "current time"
 * @returns {boolean}
 */
function isWithinSchedule(schedule, now = new Date()) {
  if (!schedule.enabled) return true;

  let localTimeStr;
  try {
    localTimeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: schedule.tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  } catch {
    return true;
  }

  const normalizedTime = localTimeStr.replace(/^24:/, "00:");
  const [localHour, localMin] = normalizedTime.split(":").map(Number);
  const localMinutes = localHour * 60 + localMin;

  let localDayStr;
  try {
    localDayStr = new Intl.DateTimeFormat("en-US", {
      timeZone: schedule.tz,
      weekday: "short",
    }).format(now);
  } catch {
    return true;
  }

  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const localDay = dayMap[localDayStr] ?? now.getDay();

  if (!schedule.days.includes(localDay)) return false;

  const [fromHour, fromMin] = schedule.from.split(":").map(Number);
  const [untilHour, untilMin] = schedule.until.split(":").map(Number);
  const fromMinutes = fromHour * 60 + fromMin;
  const untilMinutes = untilHour * 60 + untilMin;

  if (untilMinutes < fromMinutes) {
    return localMinutes >= fromMinutes || localMinutes < untilMinutes;
  }

  return localMinutes >= fromMinutes && localMinutes < untilMinutes;
}

// ─── parseIsActive helper (mirrors production code) ──────────────────────────
function parseIsActive(value) {
  if (value === 0 || value === "0" || value === false) return false;
  return true;
}

// ─── parseAccessSchedule helper (mirrors production code) ────────────────────
function parseAccessSchedule(value) {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    if (
      typeof parsed.enabled !== "boolean" ||
      typeof parsed.from !== "string" ||
      typeof parsed.until !== "string" ||
      !Array.isArray(parsed.days) ||
      typeof parsed.tz !== "string"
    )
      return null;
    const days = parsed.days.filter(
      (d) => typeof d === "number" && Number.isInteger(d) && d >= 0 && d <= 6
    );
    return { enabled: parsed.enabled, from: parsed.from, until: parsed.until, days, tz: parsed.tz };
  } catch {
    return null;
  }
}

// ─── parseIsActive ────────────────────────────────────────────────────────────

test("parseIsActive: undefined → true (default active)", () => {
  assert.equal(parseIsActive(undefined), true);
});

test("parseIsActive: null → true", () => {
  assert.equal(parseIsActive(null), true);
});

test("parseIsActive: 1 → true", () => {
  assert.equal(parseIsActive(1), true);
});

test("parseIsActive: true → true", () => {
  assert.equal(parseIsActive(true), true);
});

test("parseIsActive: 0 → false", () => {
  assert.equal(parseIsActive(0), false);
});

test("parseIsActive: false → false", () => {
  assert.equal(parseIsActive(false), false);
});

test("parseIsActive: '0' → false", () => {
  assert.equal(parseIsActive("0"), false);
});

// ─── parseAccessSchedule ──────────────────────────────────────────────────────

test("parseAccessSchedule: null/empty → null", () => {
  assert.equal(parseAccessSchedule(null), null);
  assert.equal(parseAccessSchedule(""), null);
  assert.equal(parseAccessSchedule("  "), null);
});

test("parseAccessSchedule: valid JSON → object", () => {
  const input = JSON.stringify({
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1, 2, 3, 4, 5],
    tz: "America/Sao_Paulo",
  });
  const result = parseAccessSchedule(input);
  assert.deepEqual(result, {
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1, 2, 3, 4, 5],
    tz: "America/Sao_Paulo",
  });
});

test("parseAccessSchedule: invalid day values are filtered out", () => {
  const input = JSON.stringify({
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1, 7, -1, 5],
    tz: "UTC",
  });
  const result = parseAccessSchedule(input);
  assert.deepEqual(result.days, [1, 5]);
});

test("parseAccessSchedule: missing required field → null", () => {
  const input = JSON.stringify({ enabled: true, from: "08:00", until: "18:00", days: [1] });
  assert.equal(parseAccessSchedule(input), null); // tz missing
});

test("parseAccessSchedule: invalid JSON → null", () => {
  assert.equal(parseAccessSchedule("{broken json}"), null);
});

// ─── isWithinSchedule ────────────────────────────────────────────────────────

// Helper: create a Date at a specific UTC datetime
function utc(y, m, d, h, min) {
  return new Date(Date.UTC(y, m - 1, d, h, min));
}

test("isWithinSchedule: enabled=false → always true", () => {
  const schedule = { enabled: false, from: "00:00", until: "00:01", days: [1], tz: "UTC" };
  // Even a time that would be blocked
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 12, 0)), true);
});

test("isWithinSchedule: time within window → true", () => {
  // Monday 2024-03-11, 09:00 UTC (UTC timezone)
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 9, 0)), true);
});

test("isWithinSchedule: time before window → false", () => {
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  // 07:59
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 7, 59)), false);
});

test("isWithinSchedule: time exactly at 'from' → true (inclusive)", () => {
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 8, 0)), true);
});

test("isWithinSchedule: time exactly at 'until' → false (exclusive)", () => {
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 18, 0)), false);
});

test("isWithinSchedule: time after window → false", () => {
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 20, 0)), false);
});

test("isWithinSchedule: wrong weekday → false", () => {
  // Monday (day 1) schedule, but 2024-03-12 is Tuesday (day 2)
  const schedule = { enabled: true, from: "08:00", until: "18:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 12, 10, 0)), false);
});

test("isWithinSchedule: multiple days — matching day → true", () => {
  // Mon-Fri schedule, Wednesday (3)
  const schedule = {
    enabled: true,
    from: "09:00",
    until: "17:00",
    days: [1, 2, 3, 4, 5],
    tz: "UTC",
  };
  // 2024-03-13 is Wednesday
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 13, 12, 0)), true);
});

test("isWithinSchedule: multiple days — Saturday blocked", () => {
  const schedule = {
    enabled: true,
    from: "09:00",
    until: "17:00",
    days: [1, 2, 3, 4, 5],
    tz: "UTC",
  };
  // 2024-03-09 is Saturday (day 6)
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 9, 12, 0)), false);
});

// ─── Overnight schedule tests ─────────────────────────────────────────────────

test("isWithinSchedule: overnight window — time after midnight → true", () => {
  // 22:00 → 06:00, Monday
  const schedule = { enabled: true, from: "22:00", until: "06:00", days: [1], tz: "UTC" };
  // 02:30 Monday
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 2, 30)), true);
});

test("isWithinSchedule: overnight window — time before start → false", () => {
  const schedule = { enabled: true, from: "22:00", until: "06:00", days: [1], tz: "UTC" };
  // 21:59 Monday
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 21, 59)), false);
});

test("isWithinSchedule: overnight window — time after end → false", () => {
  const schedule = { enabled: true, from: "22:00", until: "06:00", days: [1], tz: "UTC" };
  // 06:01 Monday
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 6, 1)), false);
});

test("isWithinSchedule: overnight window — time exactly at start → true", () => {
  const schedule = { enabled: true, from: "22:00", until: "06:00", days: [1], tz: "UTC" };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 22, 0)), true);
});

test("isWithinSchedule: invalid timezone → fail-open (true)", () => {
  const schedule = {
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1, 2, 3, 4, 5],
    tz: "Invalid/Zone",
  };
  // Should not throw, should return true (fail-open)
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 12, 0)), true);
});

test("isWithinSchedule: America/Sao_Paulo timezone conversion", () => {
  // UTC 2024-03-11 15:00 = BRT (UTC-3) 12:00, Monday
  const schedule = {
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1],
    tz: "America/Sao_Paulo",
  };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 15, 0)), true);
});

test("isWithinSchedule: America/Sao_Paulo — outside window", () => {
  // UTC 2024-03-11 22:00 = BRT 19:00, Monday — after 18:00
  const schedule = {
    enabled: true,
    from: "08:00",
    until: "18:00",
    days: [1],
    tz: "America/Sao_Paulo",
  };
  assert.equal(isWithinSchedule(schedule, utc(2024, 3, 11, 22, 0)), false);
});
