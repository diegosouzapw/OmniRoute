import test from "node:test";
import assert from "node:assert/strict";
import { groupByDay, relativeTime } from "../../src/lib/audit/timeline.ts";
import type { AuditLogEntry } from "../../src/lib/compliance/index.ts";

// Helper to build a minimal AuditLogEntry
function makeEntry(id: number, timestampIso: string, action = "provider.added"): AuditLogEntry {
  return {
    id,
    action,
    actor: "admin",
    target: "test-target",
    status: null,
    timestamp: timestampIso,
    createdAt: timestampIso,
    details: null,
    metadata: null,
    ip_address: null,
    ip: null,
    resource_type: null,
    resourceType: null,
    request_id: null,
    requestId: null,
  };
}

// Reference: 2026-05-27T15:00:00.000Z (UTC)
const REF = new Date("2026-05-27T15:00:00.000Z").getTime();
// Today: 2026-05-27
const TODAY_ISO = "2026-05-27T10:00:00.000Z";
const TODAY_ISO_2 = "2026-05-27T08:00:00.000Z";
// Yesterday: 2026-05-26
const YESTERDAY_ISO = "2026-05-26T12:00:00.000Z";
// 3 days ago: 2026-05-24
const WEEK_AGO_ISO = "2026-05-24T09:00:00.000Z";

// ── groupByDay ─────────────────────────────────────────────────────────────

test("groupByDay returns empty array when entries is empty", () => {
  const result = groupByDay([], REF);
  assert.deepEqual(result, []);
});

test("groupByDay with today + yesterday + older entries → 3 groups, labels correct", () => {
  const entries = [
    makeEntry(1, TODAY_ISO),
    makeEntry(2, TODAY_ISO_2),
    makeEntry(3, YESTERDAY_ISO),
    makeEntry(4, WEEK_AGO_ISO),
  ];

  const groups = groupByDay(entries, REF);

  assert.equal(groups.length, 3, "Expected 3 day groups");

  const [todayGroup, yesterdayGroup, olderGroup] = groups;
  assert.equal(todayGroup.label, "today");
  assert.equal(todayGroup.entries.length, 2);

  assert.equal(yesterdayGroup.label, "yesterday");
  assert.equal(yesterdayGroup.entries.length, 1);

  // older group gets ISO date string label
  assert.match(olderGroup.label, /^\d{4}-\d{2}-\d{2}$/, "older label should be YYYY-MM-DD");
  assert.equal(olderGroup.entries.length, 1);
});

test("groupByDay sorts entries within each group descending by timestamp", () => {
  const entries = [makeEntry(1, TODAY_ISO_2), makeEntry(2, TODAY_ISO)];
  const groups = groupByDay(entries, REF);
  assert.equal(groups.length, 1);
  // entry 2 (later timestamp) should come first
  assert.equal(groups[0].entries[0].id, 2);
  assert.equal(groups[0].entries[1].id, 1);
});

test("groupByDay with only one entry today → 1 group", () => {
  const entries = [makeEntry(1, TODAY_ISO)];
  const groups = groupByDay(entries, REF);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].label, "today");
  assert.equal(groups[0].entries.length, 1);
});

test("groupByDay dayKey format is YYYY-MM-DD", () => {
  const entries = [makeEntry(1, TODAY_ISO)];
  const groups = groupByDay(entries, REF);
  assert.match(groups[0].dayKey, /^\d{4}-\d{2}-\d{2}$/);
});

// ── relativeTime ───────────────────────────────────────────────────────────

test("relativeTime(now) → 'agora há pouco' (pt-BR)", () => {
  const result = relativeTime(new Date(REF).toISOString(), "pt-BR", REF);
  assert.equal(result, "agora há pouco");
});

test("relativeTime(now) → 'just now' (en)", () => {
  const result = relativeTime(new Date(REF).toISOString(), "en", REF);
  assert.equal(result, "just now");
});

test("relativeTime(5 min ago) → 'há 5 min' (pt-BR)", () => {
  const fiveMinAgo = REF - 5 * 60 * 1000;
  const result = relativeTime(new Date(fiveMinAgo).toISOString(), "pt-BR", REF);
  assert.equal(result, "há 5 min");
});

test("relativeTime(5 min ago) → '5 min ago' (en)", () => {
  const fiveMinAgo = REF - 5 * 60 * 1000;
  const result = relativeTime(new Date(fiveMinAgo).toISOString(), "en", REF);
  assert.equal(result, "5 min ago");
});

test("relativeTime(2 hours ago) → 'há 2 h' (pt-BR)", () => {
  const twoHoursAgo = REF - 2 * 60 * 60 * 1000;
  const result = relativeTime(new Date(twoHoursAgo).toISOString(), "pt-BR", REF);
  assert.equal(result, "há 2 h");
});

test("relativeTime(2 hours ago) → '2 h ago' (en)", () => {
  const twoHoursAgo = REF - 2 * 60 * 60 * 1000;
  const result = relativeTime(new Date(twoHoursAgo).toISOString(), "en", REF);
  assert.equal(result, "2 h ago");
});

test("relativeTime(yesterday) → 'ontem' (pt-BR)", () => {
  const yesterday = REF - 25 * 60 * 60 * 1000; // 25h ago = yesterday
  const result = relativeTime(new Date(yesterday).toISOString(), "pt-BR", REF);
  assert.equal(result, "ontem");
});

test("relativeTime(yesterday) → 'yesterday' (en)", () => {
  const yesterday = REF - 25 * 60 * 60 * 1000;
  const result = relativeTime(new Date(yesterday).toISOString(), "en", REF);
  assert.equal(result, "yesterday");
});

test("relativeTime(3 days ago) → 'há 3 dias' (pt-BR)", () => {
  const threeDaysAgo = REF - 3 * 24 * 60 * 60 * 1000;
  const result = relativeTime(new Date(threeDaysAgo).toISOString(), "pt-BR", REF);
  assert.equal(result, "há 3 dias");
});

test("relativeTime(3 days ago) → '3 days ago' (en)", () => {
  const threeDaysAgo = REF - 3 * 24 * 60 * 60 * 1000;
  const result = relativeTime(new Date(threeDaysAgo).toISOString(), "en", REF);
  assert.equal(result, "3 days ago");
});

test("relativeTime with invalid date → falls back to 'just now' / 'agora há pouco'", () => {
  const resultEn = relativeTime("not-a-date", "en", REF);
  assert.equal(resultEn, "just now");

  const resultPtBr = relativeTime("not-a-date", "pt-BR", REF);
  assert.equal(resultPtBr, "agora há pouco");
});
