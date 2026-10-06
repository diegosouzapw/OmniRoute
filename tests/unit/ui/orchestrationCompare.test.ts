/**
 * tests/unit/ui/orchestrationCompare.test.ts
 * Pure model tests for comparing two Orchestration Canvas history runs (Task A1, PR-A).
 * Run: node --import tsx/esm --test tests/unit/ui/orchestrationCompare.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildComparison,
  normalizeRunSide,
} from "../../../src/app/(dashboard)/dashboard/orchestration/model/compareRuns.ts";

const a2aItem = {
  id: "a2a:1",
  source: "a2a" as const,
  identity: "smart-routing",
  state: "succeeded" as const,
  label: "smart-routing",
  createdAt: "2026-09-01T10:00:00.000Z",
  completedAt: "2026-09-01T10:00:30.000Z",
  durationMs: 30000,
  cost: null,
  raw: {},
};
const caItem = {
  id: "cloud-agent:9",
  source: "cloud-agent" as const,
  identity: "jules",
  state: "succeeded" as const,
  label: "fix login",
  createdAt: "2026-09-01T10:00:00.000Z",
  completedAt: "2026-09-01T10:00:10.000Z",
  durationMs: 10000,
  cost: 0.5,
  raw: {},
};

test("normalizeRunSide reads a2a events from the historical task shape", () => {
  const side = normalizeRunSide(a2aItem, {
    events: [
      { timestamp: "2026-09-01T10:00:00.000Z", state: "submitted" },
      { timestamp: "2026-09-01T10:00:05.000Z", state: "working", message: "started" },
    ],
  });
  assert.deepEqual(side.events, [
    { label: "submitted", timestamp: "2026-09-01T10:00:00.000Z" },
    { label: "started", timestamp: "2026-09-01T10:00:05.000Z" },
  ]);
});

test("normalizeRunSide reads cloud-agent activities", () => {
  const side = normalizeRunSide(caItem, {
    activities: [
      { id: "a", type: "log", content: "cloning", timestamp: "2026-09-01T10:00:01.000Z" },
    ],
  });
  assert.deepEqual(side.events, [{ label: "cloning", timestamp: "2026-09-01T10:00:01.000Z" }]);
});

test("normalizeRunSide never throws on malformed detail", () => {
  for (const bad of [null, undefined, "boom", 42, { events: "nope" }, { events: [null, 7, {}] }]) {
    const side = normalizeRunSide(a2aItem, bad);
    assert.deepEqual(side.events, []);
    assert.deepEqual(side.memoryHits, []);
  }
});

test("normalizeRunSide keeps only well-formed memoryHits", () => {
  const side = normalizeRunSide(a2aItem, {
    events: [],
    metadata: {
      memoryHits: [
        { id: "m1", key: "k", type: "factual", snippet: "s" },
        { id: "m2", key: { a: 1 }, type: "factual", snippet: "s" },
        "nope",
      ],
    },
  });
  assert.equal(side.memoryHits.length, 1);
  assert.equal(side.memoryHits[0].id, "m1");
});

test("buildComparison computes signed deltas and sameIdentity", () => {
  const left = normalizeRunSide(a2aItem, { events: [{ timestamp: null, state: "submitted" }] });
  const right = normalizeRunSide({ ...a2aItem, id: "a2a:2", durationMs: 45000 }, { events: [] });
  const cmp = buildComparison(left, right);
  assert.equal(cmp.deltas.durationMs, 15000);
  assert.equal(cmp.deltas.eventCount, -1);
  assert.equal(cmp.deltas.sameIdentity, true);
});

test("buildComparison returns null delta when either side lacks the value", () => {
  const left = normalizeRunSide(a2aItem, {}); // cost null
  const right = normalizeRunSide(caItem, {}); // cost 0.5
  const cmp = buildComparison(left, right);
  assert.equal(cmp.deltas.cost, null);
  assert.equal(cmp.deltas.sameIdentity, false);
});
