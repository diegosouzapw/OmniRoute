import test from "node:test";
import assert from "node:assert/strict";
import {
  rotationIndex,
  shiftFor,
  shiftsInRange,
  formatInTimezone,
  utcForTimezone,
} from "../../scripts/sre/oncall-rotation.mjs";

// ─── Helpers ────────────────────────────────────────────────────────────────

const PST = "America/Los_Angeles";
const HOUR = 3600_000;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const ROTATION = {
  timezone: PST,
  shiftHours: 168, // one week
  startsAt: "2026-06-01T09:00:00-07:00", // Monday 09:00 PDT
  members: ["alice", "bob", "carol", "dave"],
};

// ─── 1. formatInTimezone ────────────────────────────────────────────────────

test("formatInTimezone: formats a UTC instant in PST", () => {
  // 2026-06-25T16:00:00Z = 2026-06-25T09:00:00-07:00 (PDT in June)
  const out = formatInTimezone(new Date("2026-06-25T16:00:00Z"), PST);
  assert.equal(out, "2026-06-25T09:00:00-07:00");
});

test("formatInTimezone: PDT in June, PST in January", () => {
  // June → UTC-7 (PDT)
  const june = formatInTimezone(new Date("2026-06-15T12:00:00Z"), PST);
  assert.match(june, /-07:00$/);
  // January → UTC-8 (PST)
  const jan = formatInTimezone(new Date("2026-01-15T12:00:00Z"), PST);
  assert.match(jan, /-08:00$/);
});

// ─── 2. utcForTimezone ──────────────────────────────────────────────────────

test("utcForTimezone: PDT noon is 19:00Z", () => {
  const out = utcForTimezone(new Date("2026-06-15T12:00:00-07:00"), PST);
  assert.equal(new Date(out).toISOString(), "2026-06-15T19:00:00.000Z");
});

test("utcForTimezone: PST noon is 20:00Z", () => {
  const out = utcForTimezone(new Date("2026-01-15T12:00:00-08:00"), PST);
  assert.equal(new Date(out).toISOString(), "2026-01-15T20:00:00.000Z");
});

// ─── 3. rotationIndex ───────────────────────────────────────────────────────

test("rotationIndex: starts at 0 for the rotation start instant", () => {
  const startMs = Date.parse("2026-06-01T16:00:00Z"); // 09:00 PDT
  assert.equal(rotationIndex(startMs, ROTATION), 0);
});

test("rotationIndex: advances to 1 exactly one shift later", () => {
  const t = Date.parse("2026-06-08T16:00:00Z"); // one week later, 09:00 PDT
  assert.equal(rotationIndex(t, ROTATION), 1);
});

test("rotationIndex: mid-week is still shift 0", () => {
  const t = Date.parse("2026-06-03T16:00:00Z"); // Wednesday
  assert.equal(rotationIndex(t, ROTATION), 0);
});

test("rotationIndex: wraps around after `members.length` shifts", () => {
  // 4 members × 1 week each = 4 weeks later = back to alice (index 0).
  const t = Date.parse("2026-06-01T16:00:00Z") + 4 * WEEK;
  assert.equal(rotationIndex(t, ROTATION), 0);
});

test("rotationIndex: second cycle hits bob at week 5", () => {
  const t = Date.parse("2026-06-01T16:00:00Z") + 5 * WEEK;
  assert.equal(rotationIndex(t, ROTATION), 1);
});

// ─── 4. shiftFor ────────────────────────────────────────────────────────────

test("shiftFor: at the very start of the rotation", () => {
  const startMs = Date.parse("2026-06-01T16:00:00Z");
  const shift = shiftFor(startMs, ROTATION);
  assert.equal(shift.member, "alice");
  assert.equal(shift.shiftNumber, 0);
  assert.equal(shift.startsAt, "2026-06-01T16:00:00.000Z");
});

test("shiftFor: at the start of week 2 (boundary)", () => {
  const t = Date.parse("2026-06-08T16:00:00Z");
  const shift = shiftFor(t, ROTATION);
  assert.equal(shift.member, "bob");
  assert.equal(shift.shiftNumber, 1);
  assert.equal(shift.startsAt, "2026-06-08T16:00:00.000Z");
});

test("shiftFor: 1ms before the boundary still belongs to current shift", () => {
  const t = Date.parse("2026-06-08T15:59:59.999Z");
  const shift = shiftFor(t, ROTATION);
  assert.equal(shift.member, "alice");
});

test("shiftFor: DST transition stays in the same shift", () => {
  // DST in US jumped forward on 2026-03-08. Check that an instant
  // straddling the spring-forward boundary still resolves to a single
  // shift (no off-by-one).
  const dstRotation = {
    timezone: PST,
    shiftHours: 168,
    startsAt: "2026-03-01T09:00:00-08:00", // PST
    members: ["alice", "bob"],
  };
  // 2026-03-08T02:30 PST does not exist (skipped by DST). The instant
  // 2026-03-08T10:30:00Z = 03:30 PDT (which exists).
  const afterDst = Date.parse("2026-03-08T10:30:00Z");
  const beforeDst = Date.parse("2026-03-08T08:30:00Z"); // 00:30 PST
  assert.equal(shiftFor(afterDst, dstRotation).member, shiftFor(beforeDst, dstRotation).member);
});

// ─── 5. shiftsInRange ───────────────────────────────────────────────────────

test("shiftsInRange: single shift fully inside the range", () => {
  const shifts = shiftsInRange("2026-06-02T00:00:00Z", "2026-06-03T00:00:00Z", ROTATION);
  assert.equal(shifts.length, 1);
  assert.equal(shifts[0].member, "alice");
});

test("shiftsInRange: range spanning two shifts returns both", () => {
  const shifts = shiftsInRange("2026-06-02T00:00:00Z", "2026-06-15T00:00:00Z", ROTATION);
  assert.equal(shifts.length, 2);
  assert.equal(shifts[0].member, "alice");
  assert.equal(shifts[1].member, "bob");
});

test("shiftsInRange: range spanning one full cycle returns all 4 members", () => {
  const shifts = shiftsInRange("2026-06-01T00:00:00Z", "2026-07-01T00:00:00Z", ROTATION);
  assert.equal(shifts.length, 4);
  assert.deepEqual(
    shifts.map((s) => s.member),
    ["alice", "bob", "carol", "dave"],
  );
});

test("shiftsInRange: empty range returns empty array", () => {
  // Range entirely before the rotation starts.
  const shifts = shiftsInRange("2026-05-01T00:00:00Z", "2026-05-02T00:00:00Z", ROTATION);
  assert.equal(shifts.length, 0);
});

test("shiftsInRange: reversed range throws", () => {
  assert.throws(
    () => shiftsInRange("2026-06-15T00:00:00Z", "2026-06-01T00:00:00Z", ROTATION),
    /empty or reversed/,
  );
});

test("shiftsInRange: invalid datetime throws", () => {
  assert.throws(
    () => shiftsInRange("not-a-date", "2026-06-15T00:00:00Z", ROTATION),
    /invalid date/,
  );
});

// ─── 6. Cross-week + cross-DST handoff ─────────────────────────────────────

test("cross-week: handoff happens at the same wall-clock time each Monday", () => {
  // Check that week 1 ends and week 2 begins at 09:00 PDT for both shifts.
  const shifts = shiftsInRange("2026-06-07T00:00:00Z", "2026-06-15T00:00:00Z", ROTATION);
  assert.equal(shifts.length, 2);
  // Alice's shift ends at 2026-06-08T16:00:00Z.
  assert.equal(shifts[0].endsAt, "2026-06-08T16:00:00.000Z");
  // Bob's shift starts at 2026-06-08T16:00:00Z.
  assert.equal(shifts[1].startsAt, "2026-06-08T16:00:00.000Z");
});

test("cross-DST: week spans the spring-forward boundary cleanly", () => {
  // 2026-03-01 starts PST (UTC-8); 2026-03-08 jumps to PDT (UTC-7).
  const dstRotation = {
    timezone: PST,
    shiftHours: 168,
    startsAt: "2026-03-01T09:00:00-08:00",
    members: ["alice", "bob"],
  };
  const shifts = shiftsInRange("2026-03-01T00:00:00Z", "2026-03-15T00:00:00Z", dstRotation);
  assert.equal(shifts.length, 2);
  // Both shifts should be 168 hours in duration, but their UTC start/end
  // times shift by 1 hour because of DST.
  assert.equal(shifts[0].member, "alice");
  assert.equal(shifts[1].member, "bob");
  // The UTC duration of each shift is still 168 hours (the UTC offset
  // shifted, but the duration in real time is invariant).
  const dur0 = Date.parse(shifts[0].endsAt) - Date.parse(shifts[0].startsAt);
  assert.equal(dur0, 168 * HOUR);
});

// ─── 7. Negative / pre-rotation instants ───────────────────────────────────

test("rotationIndex: pre-rotation instant uses correct wrap-around", () => {
  // A shift before `startsAt` should land on the member who WOULD have
  // been on call at that earlier time. We walk backwards from startsAt.
  const oneWeekBefore = Date.parse("2026-06-01T16:00:00Z") - WEEK;
  // One shift earlier = last member (dave).
  assert.equal(rotationIndex(oneWeekBefore, ROTATION), 3);
});

test("shiftFor: pre-rotation instant gives the expected member", () => {
  const oneWeekBefore = Date.parse("2026-06-01T16:00:00Z") - WEEK;
  const shift = shiftFor(oneWeekBefore, ROTATION);
  assert.equal(shift.member, "dave");
  assert.equal(shift.shiftNumber, -1);
});

// ─── 8. Different shift lengths ─────────────────────────────────────────────

test("rotationIndex: 24h shifts cycle faster than weekly shifts", () => {
  const dailyRotation = { ...ROTATION, shiftHours: 24 };
  const t = Date.parse("2026-06-03T16:00:00Z"); // 2 days after start
  assert.equal(rotationIndex(t, dailyRotation), 2);
});

test("rotationIndex: 12h shifts cycle every half-day", () => {
  const halfDayRotation = { ...ROTATION, shiftHours: 12 };
  const t = Date.parse("2026-06-01T22:00:00Z"); // 6 hours after start
  assert.equal(rotationIndex(t, halfDayRotation), 0);
  const t2 = Date.parse("2026-06-02T04:00:00Z"); // 12 hours after start
  assert.equal(rotationIndex(t2, halfDayRotation), 1);
});