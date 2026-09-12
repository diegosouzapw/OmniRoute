import test from "node:test";
import assert from "node:assert/strict";

process.env.TZ = "UTC";

const fallback = await import("../../open-sse/services/accountFallback.ts");
const { checkFallbackError, recordModelLockoutFailure, getMsUntilTomorrow, clearAllModelLockouts } = fallback;
const { nextDailyResetAtMs } = await import("../../open-sse/services/dailyQuotaReset.ts");
const { dailyResetForProvider, resolveComboDailyResetClock } = await import(
  "../../open-sse/services/combo/comboDailyResetClock.ts"
);

// Frozen by Task 1 Step 1 probe — (status, text) reaching dailyQuotaExhausted: true.
// Probe at tip 152d95108c: 403, 429, and 402 all reach daily:true for this text;
// 403 retained as the representative daily-quota status.
const DAILY_STATUS = 403;
const DAILY_TEXT = "daily quota exceeded, try again tomorrow";

function dailyCooldownMs(timezone: unknown, hour: unknown, nowMs: number): number {
  return checkFallbackError(DAILY_STATUS, DAILY_TEXT, 0, null, "tz-thread-prov", null, null, null, null, {
    timezone,
    hour,
    nowMs,
  }).cooldownMs;
}

test("Paris pre-spring-forward resolves to provider midnight, not host midnight", () => {
  const nowMs = Date.parse("2026-03-28T21:00:00Z");
  assert.equal(dailyCooldownMs("Europe/Paris", 0, nowMs), 7_200_000);
  assert.equal(nextDailyResetAtMs("Europe/Paris", 0, nowMs) - nowMs, 7_200_000);
});

test("Paris pre-fall-back resolves to provider midnight, not host midnight", () => {
  const nowMs = Date.parse("2026-10-24T10:00:00Z");
  assert.equal(dailyCooldownMs("Europe/Paris", 0, nowMs), 43_200_000);
});

test("New York resolves to provider midnight, not host midnight", () => {
  const nowMs = Date.parse("2026-01-16T04:00:00Z");
  assert.equal(dailyCooldownMs("America/New_York", 0, nowMs), 3_600_000);
});

test("unconfigured clock keeps legacy host-midnight value", () => {
  const realNow = Date.now;
  Date.now = () => Date.parse("2026-01-15T12:00:00Z");
  try {
    assert.equal(dailyCooldownMs(undefined, undefined, Date.now()), getMsUntilTomorrow());
  } finally {
    Date.now = realNow;
  }
});

test("invalid timezone falls back to legacy without throwing", () => {
  const realNow = Date.now;
  Date.now = () => Date.parse("2026-01-15T12:00:00Z");
  try {
    assert.equal(dailyCooldownMs("Mars/Olympus", 0, Date.now()), getMsUntilTomorrow());
  } finally {
    Date.now = realNow;
  }
});

test("model lockout honors provider midnight for quota_exhausted without explicit cooldown", () => {
  clearAllModelLockouts();
  const r = recordModelLockoutFailure(
    "tz-thread-lock-prov",
    "tz-thread-conn-1",
    "tz-thread-model-1",
    "quota_exhausted",
    403,
    60_000,
    null,
    { dailyReset: { timezone: "Pacific/Auckland", hour: 0, nowMs: Date.parse("2026-01-15T10:00:00Z") } }
  );
  assert.equal(r.cooldownMs, 3_600_000);
});

test("dailyResetForProvider maps id and prefix, null-safe on missing clock", () => {
  assert.deepEqual(
    dailyResetForProvider({ prov: { timezone: "Europe/Paris", hour: 0 } }, "prov"),
    { timezone: "Europe/Paris", hour: 0 }
  );
  assert.equal(dailyResetForProvider({}, "unknown-prov"), null);
  assert.equal(dailyResetForProvider(null, "prov"), null);
  assert.equal(dailyResetForProvider({}, "unknown"), null);
});

test("resolveComboDailyResetClock never throws without a DB", async () => {
  const clock = await resolveComboDailyResetClock();
  assert.equal(typeof clock, "object");
});
