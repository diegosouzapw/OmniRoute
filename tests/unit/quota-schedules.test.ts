// Time-aware quota windows — src/lib/quota/schedules.ts + src/lib/db/quotaSchedules.ts.
//
// Every assertion pins a fixed epoch and a fixed IANA zone ("UTC"), so the suite is
// independent of the machine's local clock and of whether the runner sits on a DST
// boundary. Weekdays used below: 2026-09-21 is a Monday (getDay() === 1),
// 2026-09-26 a Saturday (6), 2026-09-27 a Sunday (0).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-schedules-"));
process.env.DATA_DIR = testDataDir;

const {
  isScheduleActive,
  resolveActiveSchedule,
  secondsUntilNextWindow,
  failingReserve,
  reservedWindows,
  scheduleBucketPoolId,
  localDayAndMinute,
} = await import("../../src/lib/quota/schedules.ts");

const coreDb = await import("../../src/lib/db/core.ts");
const { listSchedules, replaceSchedules, deleteSchedulesForPool, parseDays, parseReserves } =
  await import("../../src/lib/db/quotaSchedules.ts");

type Schedule = Parameters<typeof isScheduleActive>[0];
type ScheduleInput = Omit<Schedule, "poolId">;

/** A weekday 09:00–18:00 UTC allow window, with the overridable bits exposed. */
function schedule(over: Partial<Schedule> = {}): Schedule {
  return {
    id: "s1",
    poolId: "pool-1",
    days: [1, 2, 3, 4, 5],
    startMinute: 9 * 60,
    endMinute: 18 * 60,
    timezone: "UTC",
    mode: "allow",
    reserves: [],
    budgetWindow: "daily",
    priority: 0,
    enabled: true,
    ...over,
  };
}

/** The same fixture shaped for replaceSchedules, which assigns poolId itself. */
function input(over: Partial<Schedule> = {}): ScheduleInput {
  const { poolId: _poolId, ...rest } = schedule(over);
  return rest;
}

const MON_1030 = Date.UTC(2026, 8, 21, 10, 30); // inside the window
const MON_0700 = Date.UTC(2026, 8, 21, 7, 0); // before it opens
const SAT_2330 = Date.UTC(2026, 8, 26, 23, 30); // Saturday night
const SUN_0130 = Date.UTC(2026, 8, 27, 1, 30); // the small hours after it

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  try {
    fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

// ---------------------------------------------------------------------------
// Window matching
// ---------------------------------------------------------------------------

test("a weekday window is open inside its hours and closed outside them", () => {
  assert.equal(isScheduleActive(schedule(), MON_1030), true);
  assert.equal(isScheduleActive(schedule(), MON_0700), false);
});

test("a weekday window is closed on a day it does not list", () => {
  assert.equal(isScheduleActive(schedule(), Date.UTC(2026, 8, 26, 10, 30)), false);
});

test("endMinute is exclusive and startMinute inclusive", () => {
  assert.equal(isScheduleActive(schedule(), Date.UTC(2026, 8, 21, 9, 0)), true);
  assert.equal(isScheduleActive(schedule(), Date.UTC(2026, 8, 21, 18, 0)), false);
});

test("a window wrapping past midnight stays open into the next day", () => {
  // Saturday 22:00 → 02:00. `days` names the day the window STARTS on.
  const overnight = schedule({ days: [6], startMinute: 22 * 60, endMinute: 2 * 60 });
  assert.equal(isScheduleActive(overnight, SAT_2330), true, "Saturday 23:30 is inside");
  assert.equal(isScheduleActive(overnight, SUN_0130), true, "Sunday 01:30 is still inside");
  assert.equal(
    isScheduleActive(overnight, Date.UTC(2026, 8, 27, 3, 0)),
    false,
    "Sunday 03:00 is past the end"
  );
});

test("a disabled window is never open", () => {
  assert.equal(isScheduleActive(schedule({ enabled: false }), MON_1030), false);
});

test("an empty day list is never open", () => {
  assert.equal(isScheduleActive(schedule({ days: [] }), MON_1030), false);
});

test("the schedule's own zone decides, not the server's", () => {
  // 10:30 UTC is 12:30 in Rome and 03:30 in Los Angeles: the same instant falls
  // inside a 09:00-18:00 window in one zone and outside it in the other.
  assert.equal(isScheduleActive(schedule({ timezone: "Europe/Rome" }), MON_1030), true);
  assert.equal(isScheduleActive(schedule({ timezone: "America/Los_Angeles" }), MON_1030), false);
});

test("an unknown zone falls back to server local time instead of throwing", () => {
  const local = localDayAndMinute(MON_1030, "Not/AZone");
  const serverLocal = localDayAndMinute(MON_1030, null);
  assert.deepEqual(local, serverLocal);
});

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

test("a pool with no schedules is unscheduled", () => {
  assert.deepEqual(resolveActiveSchedule([], MON_1030), { kind: "unscheduled" });
});

test("a pool whose every schedule is disabled is unscheduled", () => {
  const verdict = resolveActiveSchedule([schedule({ enabled: false })], MON_1030);
  assert.equal(verdict.kind, "unscheduled");
});

test("an open allow window is active", () => {
  const verdict = resolveActiveSchedule([schedule()], MON_1030);
  assert.equal(verdict.kind, "active");
});

test("a blackout wins over an allow window it overlaps", () => {
  const blackout = schedule({
    id: "s2",
    mode: "block",
    startMinute: 10 * 60,
    endMinute: 11 * 60,
  });
  const verdict = resolveActiveSchedule([schedule(), blackout], MON_1030);
  assert.equal(verdict.kind, "closed");
  assert.equal(verdict.kind === "closed" && verdict.reason, "blackout");
  assert.equal(verdict.kind === "closed" && verdict.schedule?.id, "s2");
});

test("allow windows act as a whitelist: outside them the pool is closed", () => {
  const verdict = resolveActiveSchedule([schedule()], MON_0700);
  assert.equal(verdict.kind, "closed");
  assert.equal(verdict.kind === "closed" && verdict.reason, "outside-window");
  // Opens at 09:00, i.e. two hours later.
  assert.equal(verdict.kind === "closed" && verdict.retryAfterSeconds, 2 * 60 * 60);
});

test("block-only schedules act as a blacklist: outside them the pool is open", () => {
  const blackout = schedule({ mode: "block", startMinute: 0, endMinute: 6 * 60 });
  assert.equal(resolveActiveSchedule([blackout], MON_1030).kind, "unscheduled");
});

test("priority breaks a tie between two open allow windows", () => {
  const low = schedule({ id: "a", priority: 1, reserves: [{ window: "any", percent: 10 }] });
  const high = schedule({ id: "b", priority: 5, reserves: [{ window: "any", percent: 40 }] });
  const verdict = resolveActiveSchedule([low, high], MON_1030);
  assert.equal(verdict.kind === "active" && verdict.schedule.id, "b");
});

test("next-window hint reaches across days when today has no window left", () => {
  // Friday 19:00 — the weekday window has closed; the next one is Monday 09:00,
  // i.e. 3 days minus 10 hours away.
  const friday1900 = Date.UTC(2026, 8, 25, 19, 0);
  const seconds = secondsUntilNextWindow([schedule()], friday1900);
  assert.equal(seconds, (3 * 24 * 60 - 10 * 60) * 60);
});

test("next-window hint is undefined when only blackouts are configured", () => {
  assert.equal(secondsUntilNextWindow([schedule({ mode: "block" })], MON_1030), undefined);
});

// ---------------------------------------------------------------------------
// Reserve floor — measured on whole-account consumption
// ---------------------------------------------------------------------------

test("no reserve configured means the floor never blocks", () => {
  assert.equal(failingReserve(schedule(), { weekly: 0.99 }), null);
});

test('an "any" floor counts consumption by anyone, on the most-consumed window', () => {
  const s = schedule({ reserves: [{ window: "any", percent: 30 }] });
  // 60 % of the account burnt (by OmniRoute or by anyone else) → 40 % left ≥ 30 %.
  assert.equal(failingReserve(s, { weekly: 0.6 }), null);
  // 75 % burnt → only 25 % left, under the floor this window protects.
  assert.deepEqual(failingReserve(s, { weekly: 0.75 }), { window: "any", percent: 30 });
  // Exactly at the floor still passes.
  assert.equal(failingReserve(s, { weekly: 0.7 }), null);
  // The most-consumed window decides, even when another still looks roomy.
  assert.deepEqual(failingReserve(s, { weekly: 0.1, "5h": 0.9 }), { window: "any", percent: 30 });
});

test("a floor only guards the window it names", () => {
  const s = schedule({ reserves: [{ window: "weekly", percent: 30 }] });
  // The 5h window is nearly drained, but this floor is not watching it.
  assert.equal(failingReserve(s, { weekly: 0.1, "5h": 0.99 }), null);
  assert.deepEqual(failingReserve(s, { weekly: 0.8, "5h": 0.1 }), {
    window: "weekly",
    percent: 30,
  });
});

test("per-window floors let a weekly reserve coexist with a permissive burst window", () => {
  // The point of the granularity: protect the week without throttling each burst.
  const s = schedule({
    reserves: [
      { window: "weekly", percent: 30 },
      { window: "5h", percent: 5 },
    ],
  });
  // Weekly barely touched, 5h burnt to 90 % → still 10 % left, above its own floor.
  assert.equal(failingReserve(s, { weekly: 0.2, "5h": 0.9 }), null);
  // Same burst, but now the week itself is short → the weekly floor stops it.
  assert.deepEqual(failingReserve(s, { weekly: 0.8, "5h": 0.9 }), {
    window: "weekly",
    percent: 30,
  });
  // The week is fine, the burst window is exhausted → the 5h floor stops it.
  assert.deepEqual(failingReserve(s, { weekly: 0.2, "5h": 0.98 }), { window: "5h", percent: 5 });
});

test("fractional floors are honoured, not rounded away", () => {
  const s = schedule({ reserves: [{ window: "weekly", percent: 0.5 }] });
  assert.equal(failingReserve(s, { weekly: 0.994 }), null, "0.6 % left clears a 0.5 % floor");
  assert.deepEqual(failingReserve(s, { weekly: 0.996 }), { window: "weekly", percent: 0.5 });
});

test("a window with no usable signal fails open instead of reading as drained", () => {
  const s = schedule({ reserves: [{ window: "weekly", percent: 90 }] });
  assert.equal(failingReserve(s, {}), null, "no signal at all");
  assert.equal(failingReserve(s, { weekly: Number.NaN }), null, "unusable signal");
  assert.equal(failingReserve(s, { "5h": 0.99 }), null, "signal for another window only");
});

test("reservedWindows reports only what actually needs a signal", () => {
  assert.deepEqual(reservedWindows(schedule()), []);
  assert.deepEqual(
    reservedWindows(
      schedule({
        reserves: [
          { window: "weekly", percent: 10 },
          { window: "5h", percent: 5 },
          { window: "weekly", percent: 20 },
        ],
      })
    ),
    ["weekly", "5h"]
  );
});

// ---------------------------------------------------------------------------
// Budget bucket namespace
// ---------------------------------------------------------------------------

test("the budget counter lives in its own namespace", () => {
  const key = scheduleBucketPoolId("pool-1", "s1");
  assert.equal(key, "pool-1:sched:s1");
  assert.notEqual(key, "pool-1");
  assert.ok(!key.includes(":model:"), "must not collide with the per-model cap namespace");
});

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------

test("parseDays keeps only valid weekday numbers, sorted and deduplicated", () => {
  assert.deepEqual(parseDays("5,1,1,9,-2,3"), [1, 3, 5]);
  assert.deepEqual(parseDays(""), []);
});

test("schedules round-trip through the database in resolution order", () => {
  replaceSchedules("pool-rt", [
    input({ id: "low", priority: 1 }),
    input({ id: "high", priority: 9 }),
  ]);

  const rows = listSchedules("pool-rt");
  assert.equal(rows.length, 2);
  assert.deepEqual(
    rows.map((r) => r.id),
    ["high", "low"],
    "priority DESC — same order resolveActiveSchedule applies"
  );
  assert.deepEqual(rows[0].days, [1, 2, 3, 4, 5]);
  assert.equal(rows[0].startMinute, 540);
  assert.equal(rows[0].timezone, "UTC");
  assert.equal(rows[0].enabled, true);
  assert.equal(rows[0].poolId, "pool-rt");
});

test("parseReserves drops malformed rules instead of inventing a floor", () => {
  assert.deepEqual(parseReserves(null), []);
  assert.deepEqual(parseReserves("not json"), []);
  assert.deepEqual(parseReserves('{"window":"weekly","percent":10}'), [], "not an array");
  assert.deepEqual(
    parseReserves(
      '[{"window":"weekly","percent":30},{"window":"nope","percent":5},' +
        '{"window":"5h","percent":150},{"window":"5h"},{"window":"any","percent":0.5}]'
    ),
    [
      { window: "weekly", percent: 30 },
      { window: "any", percent: 0.5 },
    ]
  );
});

test("reserves round-trip through the database, fractions intact", () => {
  replaceSchedules("pool-reserves", [
    input({
      id: "r1",
      reserves: [
        { window: "weekly", percent: 30 },
        { window: "5h", percent: 2.5 },
      ],
    }),
    input({ id: "r2" }),
  ]);

  const byId = Object.fromEntries(listSchedules("pool-reserves").map((s) => [s.id, s]));
  assert.deepEqual(byId.r1.reserves, [
    { window: "weekly", percent: 30 },
    { window: "5h", percent: 2.5 },
  ]);
  assert.deepEqual(byId.r2.reserves, [], "an empty list stays empty, never null");
});

test("a budget survives the round-trip only as a complete (value, unit) pair", () => {
  replaceSchedules("pool-budget", [
    input({ id: "full", budgetValue: 500_000, budgetUnit: "tokens" }),
    // Orphan half — the unit is missing, so there is no counter to attribute it to.
    input({ id: "half", budgetValue: 123 }),
  ]);

  const byId = Object.fromEntries(listSchedules("pool-budget").map((s) => [s.id, s]));
  assert.equal(byId.full.budgetValue, 500_000);
  assert.equal(byId.full.budgetUnit, "tokens");
  assert.equal(byId.half.budgetValue, undefined);
  assert.equal(byId.half.budgetUnit, undefined);
});

test("replaceSchedules replaces the whole set rather than appending", () => {
  replaceSchedules("pool-replace", [input({ id: "first" })]);
  replaceSchedules("pool-replace", [input({ id: "second" })]);

  assert.deepEqual(
    listSchedules("pool-replace").map((s) => s.id),
    ["second"]
  );
});

test("deleting a pool's schedules leaves nothing behind", () => {
  replaceSchedules("pool-del", [input({ id: "gone" })]);
  assert.equal(deleteSchedulesForPool("pool-del"), 1);
  assert.deepEqual(listSchedules("pool-del"), []);
});

test("schedules of one pool never leak into another", () => {
  replaceSchedules("pool-a", [input({ id: "a1" })]);
  replaceSchedules("pool-b", [input({ id: "b1" })]);
  assert.deepEqual(
    listSchedules("pool-a").map((s) => s.id),
    ["a1"]
  );
});
