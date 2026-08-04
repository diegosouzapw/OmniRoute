import test from "node:test";
import assert from "node:assert/strict";
import { matchesCron } from "@/lib/jobs/cronMatch";

test("matchesCron — exact fixed fields match only their own minute", () => {
  const due = new Date(2026, 6, 25, 3, 0, 0); // 2026-07-25 03:00 local
  const notDue = new Date(2026, 6, 25, 3, 1, 0); // one minute later
  assert.equal(matchesCron("0 3 * * *", due), true);
  assert.equal(matchesCron("0 3 * * *", notDue), false);
});

test("matchesCron — wildcards match everything in that field", () => {
  const anyMinuteAt3am = new Date(2026, 6, 25, 3, 42, 0);
  assert.equal(matchesCron("* 3 * * *", anyMinuteAt3am), true);
  const notAt3am = new Date(2026, 6, 25, 4, 42, 0);
  assert.equal(matchesCron("* 3 * * *", notAt3am), false);
});

test("matchesCron — comma lists", () => {
  const at3 = new Date(2026, 6, 25, 3, 0, 0);
  const at15 = new Date(2026, 6, 25, 15, 0, 0);
  const at9 = new Date(2026, 6, 25, 9, 0, 0);
  assert.equal(matchesCron("0 3,15 * * *", at3), true);
  assert.equal(matchesCron("0 3,15 * * *", at15), true);
  assert.equal(matchesCron("0 3,15 * * *", at9), false);
});

test("matchesCron — ranges", () => {
  const at4 = new Date(2026, 6, 25, 4, 0, 0);
  const at8 = new Date(2026, 6, 25, 8, 0, 0);
  assert.equal(matchesCron("0 2-6 * * *", at4), true);
  assert.equal(matchesCron("0 2-6 * * *", at8), false);
});

test("matchesCron — step values", () => {
  const at0 = new Date(2026, 6, 25, 0, 0, 0);
  const at15 = new Date(2026, 6, 25, 0, 15, 0);
  const at10 = new Date(2026, 6, 25, 0, 10, 0);
  assert.equal(matchesCron("*/15 * * * *", at0), true);
  assert.equal(matchesCron("*/15 * * * *", at15), true);
  assert.equal(matchesCron("*/15 * * * *", at10), false);
});

test("matchesCron — day-of-month OR day-of-week when both restricted (standard cron semantics)", () => {
  // 2026-07-25 is a Saturday (day-of-week 6).
  const jul25 = new Date(2026, 6, 25, 0, 0, 0);
  const jul26 = new Date(2026, 6, 26, 0, 0, 0); // Sunday, day-of-week 0
  const jul1 = new Date(2026, 6, 1, 0, 0, 0); // matches day-of-month=1
  // "0 0 1 * 0": day-of-month=1 OR day-of-week=0(Sunday) — either condition suffices.
  assert.equal(matchesCron("0 0 1 * 0", jul25), false, "neither day-of-month=1 nor Sunday");
  assert.equal(matchesCron("0 0 1 * 0", jul26), true, "Sunday matches even though day!=1");
  assert.equal(matchesCron("0 0 1 * 0", jul1), true, "day=1 matches even though not Sunday");
});

test("matchesCron — invalid expression never matches (fail closed, no throw)", () => {
  const now = new Date(2026, 6, 25, 3, 0, 0);
  assert.equal(matchesCron("not a cron expr", now), false);
  assert.equal(matchesCron("0 3 * *", now), false, "4 fields, missing one");
  assert.equal(matchesCron("", now), false);
});
