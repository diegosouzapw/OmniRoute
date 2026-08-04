import test from "node:test";
import assert from "node:assert/strict";

// Pure-function coverage for buildCallLogListRows (src/app/api/usage/call-logs/route.ts):
// - merges active/completed in-memory entries with persisted DB rows
// - sorts by priority (active > completed > persisted) then newest-first
// - carries correlationId through so the GET handler can filter on it
import { buildCallLogListRows } from "../../src/app/api/usage/call-logs/route.ts";

test("buildCallLogListRows: active requests sort before completed and persisted rows", () => {
  const now = 1_000_000;
  const rows = buildCallLogListRows({
    logs: [
      {
        id: "persisted-1",
        timestamp: new Date(now - 5_000).toISOString(),
        correlationId: "corr-a",
      },
    ],
    connections: [],
    pendingDetails: [
      {
        id: "active-1",
        startedAt: now - 1_000,
        provider: "openai",
        model: "gpt-4o",
        connectionId: "conn-1",
        correlationId: "corr-a",
      },
    ],
    completedDetails: [
      {
        id: "completed-1",
        startedAt: now - 3_000,
        completedAt: now - 2_000,
        provider: "anthropic",
        model: "claude",
        connectionId: "conn-2",
        correlationId: "corr-b",
      },
    ],
    now,
  });

  assert.equal(rows.length, 3);
  // active (priority 0) first, then completed (priority 1), then persisted (priority 2)
  assert.equal(rows[0].id, "active-1");
  assert.equal(rows[0].active, true);
  assert.equal(rows[1].id, "completed-1");
  assert.equal(rows[1].completed, true);
  assert.equal(rows[2].id, "persisted-1");
});

test("buildCallLogListRows: within the same priority, newest timestamp sorts first", () => {
  const now = 2_000_000;
  const rows = buildCallLogListRows({
    logs: [
      { id: "old", timestamp: new Date(now - 10_000).toISOString() },
      { id: "new", timestamp: new Date(now - 1_000).toISOString() },
    ],
    connections: [],
    pendingDetails: [],
    completedDetails: [],
    now,
  });

  assert.deepEqual(
    rows.map((r: any) => r.id),
    ["new", "old"]
  );
});

test("buildCallLogListRows: in-memory entries carry correlationId for downstream filtering", () => {
  const now = 3_000_000;
  const rows = buildCallLogListRows({
    logs: [],
    connections: [],
    pendingDetails: [
      {
        id: "active-cid",
        startedAt: now - 500,
        provider: "openai",
        model: "gpt-4o",
        connectionId: "conn-1",
        correlationId: "corr-xyz",
      },
    ],
    completedDetails: [
      {
        id: "completed-no-cid",
        startedAt: now - 4_000,
        completedAt: now - 3_000,
        provider: "anthropic",
        model: "claude",
        connectionId: "conn-2",
      },
    ],
    now,
  });

  const active = rows.find((r: any) => r.id === "active-cid");
  const completed = rows.find((r: any) => r.id === "completed-no-cid");
  assert.equal(active?.correlationId, "corr-xyz");
  assert.equal(completed?.correlationId, null);
});

test("buildCallLogListRows: dedupes completed in-memory entries already persisted to the DB", () => {
  const now = 4_000_000;
  const rows = buildCallLogListRows({
    logs: [{ id: "dup-1", timestamp: new Date(now - 1_000).toISOString() }],
    connections: [],
    pendingDetails: [],
    completedDetails: [
      {
        id: "dup-1",
        startedAt: now - 3_000,
        completedAt: now - 2_000,
        provider: "openai",
        model: "gpt-4o",
        connectionId: "conn-1",
      },
    ],
    now,
  });

  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "dup-1");
  // persisted row wins (no `completed` flag)
  assert.equal(rows[0].completed, undefined);
});
