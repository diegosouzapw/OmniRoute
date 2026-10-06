/**
 * #13671 — a configured daily reset hour that does not exist on a DST
 * spring-forward day must resolve to the first wall-clock time that exists,
 * never an hour early (and never on the previous calendar day).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { nextDailyResetAtMs } = await import("../../open-sse/services/dailyQuotaReset.ts");

const HOUR_MS = 60 * 60 * 1000;

function wallClock(timeZone: string, ms: number): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

test("New York 02:00 on spring-forward resolves to 03:00 EDT, not 01:00 EST", () => {
  // 2026-03-08: 02:00 -> 03:00 in America/New_York; 02:00 does not exist.
  const nowMs = Date.parse("2026-03-08T00:30:00-05:00");
  const next = nextDailyResetAtMs("America/New_York", 2, nowMs);
  assert.equal(new Date(next).toISOString(), "2026-03-08T07:00:00.000Z");
  assert.equal(wallClock("America/New_York", next), "2026-03-08, 03:00");
});

test("Havana midnight on spring-forward resolves to 01:00 the same day, not 23:00 the day before", () => {
  // 2026-03-08: 00:00 -> 01:00 in America/Havana; midnight does not exist.
  const nowMs = Date.parse("2026-03-07T20:00:00-05:00");
  const next = nextDailyResetAtMs("America/Havana", 0, nowMs);
  assert.equal(wallClock("America/Havana", next), "2026-03-08, 01:00");
  assert.equal(next - nowMs, 4 * HOUR_MS);
});

test("Santiago midnight on spring-forward resolves to 01:00 the same day, not 23:00 the day before", () => {
  // 2026-09-06: 00:00 -> 01:00 in America/Santiago; midnight does not exist.
  const nowMs = Date.parse("2026-09-05T20:00:00-04:00");
  const next = nextDailyResetAtMs("America/Santiago", 0, nowMs);
  assert.equal(wallClock("America/Santiago", next), "2026-09-06, 01:00");
  assert.equal(next - nowMs, 4 * HOUR_MS);
});

test("between the old (wrong) 23:00 and the real 01:00 the reset is still ahead", () => {
  const nowMs = Date.parse("2026-03-07T23:30:00-05:00"); // Havana 23:30, before the gap
  const next = nextDailyResetAtMs("America/Havana", 0, nowMs);
  assert.equal(wallClock("America/Havana", next), "2026-03-08, 01:00");
  assert.equal(next - nowMs, 30 * 60 * 1000);
});

test("fold hour keeps the first occurrence (characterization)", () => {
  // 2026-11-01: fall back, 01:00 occurs twice; the first (EDT) occurrence wins.
  const nowMs = Date.parse("2026-11-01T00:30:00-04:00");
  const next = nextDailyResetAtMs("America/New_York", 1, nowMs);
  assert.equal(new Date(next).toISOString(), "2026-11-01T05:00:00.000Z");
});

test("a 25h fall-back day keeps its real 24.5h magnitude (characterization, no clamp)", () => {
  const nowMs = Date.parse("2026-11-01T00:30:00-04:00");
  const next = nextDailyResetAtMs("America/New_York", 0, nowMs);
  assert.equal(next - nowMs, 24.5 * HOUR_MS);
});

test("ordinary days are unchanged", () => {
  const nowMs = Date.parse("2026-01-15T10:00:00Z");
  assert.equal(
    new Date(nextDailyResetAtMs("Europe/Paris", 0, nowMs)).toISOString(),
    "2026-01-15T23:00:00.000Z"
  );
  assert.equal(
    new Date(nextDailyResetAtMs("Asia/Kolkata", 0, nowMs)).toISOString(),
    "2026-01-15T18:30:00.000Z"
  );
});
