/**
 * Tests for jobRegistry timeUtils (convertToTimeZone).
 *
 * Verifies wall-clock conversion across IANA timezones, date-boundary crossing,
 * and DST handling (the conversion itself is DST-naive; cron-parser owns DST on the
 * scheduling side - we only require the wall clock to read correctly).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { convertToTimeZone } from "@/lib/jobRegistry/timeUtils.ts";

test("convertToTimeZone: UTC noon -> Pacific standard time (UTC-8)", () => {
  // 2026-01-15T12:00:00Z -> PST is UTC-8 -> 04:00 same day
  const utc = new Date("2026-01-15T12:00:00Z");
  const pt = convertToTimeZone(utc, "America/Los_Angeles");
  assert.equal(pt.getHours(), 4);
  assert.equal(pt.getDate(), 15);
});

test("convertToTimeZone: UTC noon -> Pacific daylight time (UTC-7)", () => {
  // 2026-07-15T12:00:00Z -> PDT is UTC-7 -> 05:00 same day
  const utc = new Date("2026-07-15T12:00:00Z");
  const pt = convertToTimeZone(utc, "America/Los_Angeles");
  assert.equal(pt.getHours(), 5);
});

test("convertToTimeZone: crosses date boundary backward (UTC -> Asia/Tokyo, UTC+9)", () => {
  // 2026-01-15T20:00:00Z -> JST +9 -> 05:00 NEXT day
  const utc = new Date("2026-01-15T20:00:00Z");
  const jst = convertToTimeZone(utc, "Asia/Tokyo");
  assert.equal(jst.getHours(), 5);
  assert.equal(jst.getDate(), 16);
});

test("convertToTimeZone: UTC identity zone returns same wall clock", () => {
  const utc = new Date("2026-03-01T13:45:00Z");
  const same = convertToTimeZone(utc, "UTC");
  assert.equal(same.getHours(), 13);
  assert.equal(same.getMinutes(), 45);
});

test("convertToTimeZone: Europe/London winter (UTC+0) vs summer (UTC+1 BST)", () => {
  const winter = convertToTimeZone(new Date("2026-01-15T12:00:00Z"), "Europe/London");
  assert.equal(winter.getHours(), 12);
  const summer = convertToTimeZone(new Date("2026-07-15T12:00:00Z"), "Europe/London");
  assert.equal(summer.getHours(), 13);
});
