/**
 * Task C1 (Orchestration Canvas Fase 2, PR-B2): DB module `a2aTasks` over the two tables
 * already created by migration `002_mcp_a2a_tables.sql` (`a2a_tasks`, `a2a_task_events`).
 * Covers: upsert insert+update, event append/list ordering, history filtering + pagination +
 * total count, owner visibility parity with `A2ATaskManager.isVisibleTo`, and retention purge
 * with cascade cleanup of events.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB test hygiene (AGENTS.md "PII & Stream Sanitization Learnings" §3): temp DATA_DIR set
// BEFORE importing src/lib/db/core.ts (DATA_DIR/SQLITE_FILE are resolved once, as module-level
// consts, at import time — changing process.env.DATA_DIR afterwards has no effect, so tests
// cannot get a fresh file per case by re-pointing the env var). resetDbInstance()+rm the temp
// dir in test.after so the node:test runner does not hang.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-a2a-tasks-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const a2aTasks = await import("../../src/lib/db/a2aTasks.ts");

// Isolate test cases against the single shared sqlite file above by clearing both tables
// before each test (a2a_task_events has no FK-independent cleanup guarantee across drivers,
// so it is cleared explicitly rather than relying on cascade here).
test.beforeEach(() => {
  const db = core.getDbInstance();
  db.exec("DELETE FROM a2a_task_events");
  db.exec("DELETE FROM a2a_tasks");
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function baseRow(overrides: Partial<Parameters<typeof a2aTasks.upsertA2ATask>[0]> = {}) {
  return {
    id: "task-1",
    state: "submitted",
    skillId: "smart-routing",
    inputJson: '{"foo":1}',
    outputJson: null,
    apiKeyId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    completedAt: null,
    ...overrides,
  };
}

test("upsertA2ATask inserts a new row", () => {
  a2aTasks.upsertA2ATask(baseRow());

  const { rows, total } = a2aTasks.listA2ATaskHistory({ limit: 10, offset: 0 });
  assert.equal(total, 1);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "task-1");
  assert.equal(rows[0].state, "submitted");
  assert.equal(rows[0].skill_id, "smart-routing");
});

test("upsertA2ATask re-upsert updates state/output_json/completed_at without duplicating", () => {
  a2aTasks.upsertA2ATask(baseRow());
  a2aTasks.upsertA2ATask(
    baseRow({
      state: "completed",
      outputJson: '{"ok":true}',
      updatedAt: "2026-01-01T00:05:00.000Z",
      completedAt: "2026-01-01T00:05:00.000Z",
    })
  );

  const { rows, total } = a2aTasks.listA2ATaskHistory({ limit: 10, offset: 0 });
  assert.equal(total, 1);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].state, "completed");
  assert.equal(rows[0].output_json, '{"ok":true}');
  assert.equal(rows[0].completed_at, "2026-01-01T00:05:00.000Z");
});

test("appendA2ATaskEvent + listA2ATaskEvents returns events in insertion order", () => {
  a2aTasks.upsertA2ATask(baseRow());
  a2aTasks.appendA2ATaskEvent("task-1", "state_changed", '{"to":"working"}');
  a2aTasks.appendA2ATaskEvent("task-1", "state_changed", '{"to":"completed"}');
  a2aTasks.appendA2ATaskEvent("task-1", "artifact_added");

  const events = a2aTasks.listA2ATaskEvents("task-1");
  assert.equal(events.length, 3);
  assert.equal(events[0].event_type, "state_changed");
  assert.equal(events[0].data_json, '{"to":"working"}');
  assert.equal(events[1].data_json, '{"to":"completed"}');
  assert.equal(events[2].event_type, "artifact_added");
  assert.equal(events[2].data_json, null);
});

test("listA2ATaskHistory filters by from/to/skill/state and paginates with correct total", () => {
  a2aTasks.upsertA2ATask(
    baseRow({ id: "t1", skillId: "smart-routing", state: "completed", createdAt: "2026-01-01T00:00:00.000Z" })
  );
  a2aTasks.upsertA2ATask(
    baseRow({ id: "t2", skillId: "smart-routing", state: "failed", createdAt: "2026-01-02T00:00:00.000Z" })
  );
  a2aTasks.upsertA2ATask(
    baseRow({ id: "t3", skillId: "cost-analysis", state: "completed", createdAt: "2026-01-03T00:00:00.000Z" })
  );
  a2aTasks.upsertA2ATask(
    baseRow({ id: "t4", skillId: "smart-routing", state: "completed", createdAt: "2026-01-10T00:00:00.000Z" })
  );

  // from/to window
  const windowed = a2aTasks.listA2ATaskHistory({
    from: "2026-01-01T00:00:00.000Z",
    to: "2026-01-03T00:00:00.000Z",
    limit: 10,
    offset: 0,
  });
  assert.equal(windowed.total, 3);
  assert.deepEqual(
    windowed.rows.map((r) => r.id),
    ["t3", "t2", "t1"]
  );

  // skill filter
  const bySkill = a2aTasks.listA2ATaskHistory({ skill: "smart-routing", limit: 10, offset: 0 });
  assert.equal(bySkill.total, 3);
  assert.deepEqual(
    bySkill.rows.map((r) => r.id),
    ["t4", "t2", "t1"]
  );

  // state filter
  const byState = a2aTasks.listA2ATaskHistory({ state: "completed", limit: 10, offset: 0 });
  assert.equal(byState.total, 3);
  assert.deepEqual(
    byState.rows.map((r) => r.id),
    ["t4", "t3", "t1"]
  );

  // pagination: total reflects full filtered set, rows respect limit/offset
  const page1 = a2aTasks.listA2ATaskHistory({ limit: 2, offset: 0 });
  const page2 = a2aTasks.listA2ATaskHistory({ limit: 2, offset: 2 });
  assert.equal(page1.total, 4);
  assert.equal(page2.total, 4);
  assert.equal(page1.rows.length, 2);
  assert.equal(page2.rows.length, 2);
  assert.deepEqual(
    [...page1.rows, ...page2.rows].map((r) => r.id),
    ["t4", "t3", "t2", "t1"]
  );
});

test("listA2ATaskHistory owner semantics: private rows hidden from other owners, visible to their own owner, NULL rows visible to all", () => {
  a2aTasks.upsertA2ATask(baseRow({ id: "pub", apiKeyId: null, createdAt: "2026-01-01T00:00:00.000Z" }));
  a2aTasks.upsertA2ATask(baseRow({ id: "priv-a", apiKeyId: "A", createdAt: "2026-01-02T00:00:00.000Z" }));
  a2aTasks.upsertA2ATask(baseRow({ id: "priv-b", apiKeyId: "B", createdAt: "2026-01-03T00:00:00.000Z" }));

  const noOwner = a2aTasks.listA2ATaskHistory({ limit: 10, offset: 0 });
  assert.equal(noOwner.total, 3);

  const asA = a2aTasks.listA2ATaskHistory({ owner: "A", limit: 10, offset: 0 });
  assert.equal(asA.total, 2);
  assert.deepEqual(
    asA.rows.map((r) => r.id).sort(),
    ["priv-a", "pub"]
  );

  const asB = a2aTasks.listA2ATaskHistory({ owner: "B", limit: 10, offset: 0 });
  assert.equal(asB.total, 2);
  assert.deepEqual(
    asB.rows.map((r) => r.id).sort(),
    ["priv-b", "pub"]
  );
});

test("getA2ATaskHistoryById: found, hidden from other owner, missing", () => {
  a2aTasks.upsertA2ATask(baseRow({ id: "pub", apiKeyId: null }));
  a2aTasks.upsertA2ATask(baseRow({ id: "priv-a", apiKeyId: "A" }));

  const found = a2aTasks.getA2ATaskHistoryById("pub");
  assert.ok(found);
  assert.equal(found?.id, "pub");

  const ownFound = a2aTasks.getA2ATaskHistoryById("priv-a", "A");
  assert.ok(ownFound);
  assert.equal(ownFound?.id, "priv-a");

  const hidden = a2aTasks.getA2ATaskHistoryById("priv-a", "B");
  assert.equal(hidden, null);

  const missing = a2aTasks.getA2ATaskHistoryById("does-not-exist");
  assert.equal(missing, null);
});

test("purgeA2AHistory removes rows older than retentionDays, returns deleted count, cascades events", () => {
  a2aTasks.upsertA2ATask(baseRow({ id: "old-1" }));
  a2aTasks.upsertA2ATask(baseRow({ id: "old-2" }));
  a2aTasks.upsertA2ATask(
    baseRow({ id: "recent", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
  );
  a2aTasks.appendA2ATaskEvent("old-1", "state_changed");
  a2aTasks.appendA2ATaskEvent("old-2", "state_changed");
  a2aTasks.appendA2ATaskEvent("recent", "state_changed");

  // Forge created_at directly via UPDATE so "old-1"/"old-2" fall outside the retention window,
  // while "recent" stays inside it.
  const db = core.getDbInstance();
  db.prepare("UPDATE a2a_tasks SET created_at = @created_at WHERE id = @id").run({
    id: "old-1",
    created_at: "2020-01-01T00:00:00.000Z",
  });
  db.prepare("UPDATE a2a_tasks SET created_at = @created_at WHERE id = @id").run({
    id: "old-2",
    created_at: "2020-01-02T00:00:00.000Z",
  });

  const deleted = a2aTasks.purgeA2AHistory(30);
  assert.equal(deleted, 2);

  const { rows, total } = a2aTasks.listA2ATaskHistory({ limit: 10, offset: 0 });
  assert.equal(total, 1);
  assert.equal(rows[0].id, "recent");

  const oldEvents = a2aTasks.listA2ATaskEvents("old-1");
  assert.equal(oldEvents.length, 0);
  const old2Events = a2aTasks.listA2ATaskEvents("old-2");
  assert.equal(old2Events.length, 0);
  const remainingEvents = a2aTasks.listA2ATaskEvents("recent");
  assert.equal(remainingEvents.length, 1);

  // The purge does not rely on `ON DELETE CASCADE` (better-sqlite3-only; the other adapters
  // under src/lib/db/adapters/ never enable `PRAGMA foreign_keys`) — it deletes
  // `a2a_task_events` explicitly before `a2a_tasks`, both inside one transaction. Confirm no
  // orphans slipped through by counting the whole events table directly, independent of
  // `listA2ATaskEvents`'s own `task_id` filter.
  const totalEvents = db.prepare("SELECT COUNT(*) AS count FROM a2a_task_events").get() as {
    count: number;
  };
  assert.equal(totalEvents.count, 1);
});
