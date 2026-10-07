/**
 * Task C2 (Orchestration Canvas Fase 2, PR-B2): `A2ATaskManager` writes every task lifecycle
 * transition to the `a2a_tasks` / `a2a_task_events` history tables through the `A2APersistence`
 * DI seam (best-effort — a throwing persistence layer must never break the in-memory task write
 * path), and purges history rows older than the retention window at most once per 24h.
 *
 * Uses a FAKE persistence object throughout — no SQLite involved, no DATA_DIR setup needed.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  A2ATaskManager,
  historyRetentionDays,
  type A2APersistence,
} from "../../src/lib/a2a/taskManager.ts";

interface UpsertCall {
  id: string;
  state: string;
  skillId: string | null;
  inputJson: string | null;
  outputJson: string | null;
  apiKeyId: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

interface AppendEventCall {
  taskId: string;
  eventType: string;
  dataJson?: string;
}

function makeFakePersistence(overrides: Partial<A2APersistence> = {}) {
  const upsertCalls: UpsertCall[] = [];
  const appendEventCalls: AppendEventCall[] = [];
  const purgeCalls: number[] = [];

  const persistence: A2APersistence = {
    upsert: ((row: UpsertCall) => {
      upsertCalls.push(row);
    }) as A2APersistence["upsert"],
    appendEvent: ((taskId: string, eventType: string, dataJson?: string) => {
      appendEventCalls.push({ taskId, eventType, dataJson });
    }) as A2APersistence["appendEvent"],
    purge: ((retentionDays: number) => {
      purgeCalls.push(retentionDays);
      return 0;
    }) as A2APersistence["purge"],
    ...overrides,
  };

  return { persistence, upsertCalls, appendEventCalls, purgeCalls };
}

const managers: A2ATaskManager[] = [];
function createManager(ttlMinutes: number, persistence: A2APersistence) {
  const manager = new A2ATaskManager(ttlMinutes, persistence);
  managers.push(manager);
  return manager;
}

test.afterEach(() => {
  while (managers.length > 0) {
    managers.pop()?.destroy();
  }
});

// ── createTask ────────────────────────────────────────────────────────────────────────────

test("createTask persists an upsert + appendEvent with state:submitted", () => {
  const { persistence, upsertCalls, appendEventCalls } = makeFakePersistence();
  const tm = createManager(5, persistence);

  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hello" }],
  });

  assert.equal(upsertCalls.length, 1);
  const row = upsertCalls[0];
  assert.equal(row.id, task.id);
  assert.equal(row.state, "submitted");
  assert.equal(row.skillId, "smart-routing");
  assert.equal(row.inputJson, JSON.stringify(task.input));
  assert.equal(row.outputJson, null);
  assert.equal(row.apiKeyId, null);
  assert.equal(row.createdAt, task.createdAt);
  assert.equal(row.updatedAt, task.updatedAt);
  assert.equal(row.completedAt, null);

  assert.equal(appendEventCalls.length, 1);
  assert.equal(appendEventCalls[0].taskId, task.id);
  assert.equal(appendEventCalls[0].eventType, "state:submitted");
  assert.equal(appendEventCalls[0].dataJson, undefined);
});

test("createTask maps owner to apiKeyId", () => {
  const { persistence, upsertCalls } = makeFakePersistence();
  const tm = createManager(5, persistence);

  tm.createTask(
    { skill: "smart-routing", messages: [{ role: "user", content: "hi" }] },
    "owner-123"
  );

  assert.equal(upsertCalls[0].apiKeyId, "owner-123");
});

// ── updateTask ────────────────────────────────────────────────────────────────────────────

test("updateTask persists state:<state> with message JSON on appendEvent", () => {
  const { persistence, upsertCalls, appendEventCalls } = makeFakePersistence();
  const tm = createManager(5, persistence);
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hi" }],
  });

  tm.updateTask(task.id, "working", undefined, "starting work");

  assert.equal(upsertCalls.length, 2);
  assert.equal(upsertCalls[1].state, "working");
  assert.equal(upsertCalls[1].completedAt, null);

  assert.equal(appendEventCalls.length, 2);
  assert.equal(appendEventCalls[1].eventType, "state:working");
  assert.equal(appendEventCalls[1].dataJson, JSON.stringify({ message: "starting work" }));
});

test("updateTask to a terminal state fills completedAt with updatedAt", () => {
  const { persistence, upsertCalls } = makeFakePersistence();
  const tm = createManager(5, persistence);
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hi" }],
  });
  tm.updateTask(task.id, "working");
  const updated = tm.updateTask(task.id, "completed");

  const row = upsertCalls[upsertCalls.length - 1];
  assert.equal(row.state, "completed");
  assert.equal(row.completedAt, updated.updatedAt);
});

test("updateTask with artifacts persists outputJson as JSON of the accumulated artifacts", () => {
  const { persistence, upsertCalls } = makeFakePersistence();
  const tm = createManager(5, persistence);
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hi" }],
  });
  tm.updateTask(task.id, "working");
  const updated = tm.updateTask(task.id, "completed", [{ type: "text", content: "done" }]);

  const row = upsertCalls[upsertCalls.length - 1];
  assert.equal(row.outputJson, JSON.stringify(updated.artifacts));
});

test("cancelTask (via updateTask) persists state:cancelled as terminal", () => {
  const { persistence, upsertCalls, appendEventCalls } = makeFakePersistence();
  const tm = createManager(5, persistence);
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hi" }],
  });

  const cancelled = tm.cancelTask(task.id);

  const row = upsertCalls[upsertCalls.length - 1];
  assert.equal(row.state, "cancelled");
  assert.equal(row.completedAt, cancelled.updatedAt);
  assert.equal(appendEventCalls[appendEventCalls.length - 1].eventType, "state:cancelled");
});

// ── cleanupExpired TTL branch ────────────────────────────────────────────────────────────

test("cleanupExpired persists state:failed with 'TTL expired' message on TTL expiry", () => {
  const { persistence, upsertCalls, appendEventCalls } = makeFakePersistence();
  const tm = createManager(5, persistence);
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hi" }],
  });
  task.expiresAt = new Date(Date.now() - 1_000).toISOString();

  (tm as unknown as { cleanupExpired(): void }).cleanupExpired();

  const row = upsertCalls[upsertCalls.length - 1];
  assert.equal(row.state, "failed");
  assert.equal(row.completedAt, row.updatedAt);

  const event = appendEventCalls[appendEventCalls.length - 1];
  assert.equal(event.eventType, "state:failed");
  assert.equal(event.dataJson, JSON.stringify({ message: "TTL expired" }));
});

// ── best-effort: a throwing persistence layer never breaks the write path ───────────────

test("a throwing persistence.upsert does not break createTask", () => {
  const { persistence } = makeFakePersistence({
    upsert: (() => {
      throw new Error("db boom");
    }) as A2APersistence["upsert"],
  });
  const tm = createManager(5, persistence);

  let task: ReturnType<A2ATaskManager["createTask"]> | undefined;
  assert.doesNotThrow(() => {
    task = tm.createTask({ skill: "smart-routing", messages: [{ role: "user", content: "hi" }] });
  });
  assert.ok(task);
  assert.equal(tm.getTask(task!.id)?.id, task!.id);
});

test("a throwing persistence.appendEvent does not break updateTask", () => {
  const { persistence } = makeFakePersistence({
    appendEvent: (() => {
      throw new Error("db boom");
    }) as A2APersistence["appendEvent"],
  });
  const tm = createManager(5, persistence);
  const task = tm.createTask({ skill: "smart-routing", messages: [{ role: "user", content: "hi" }] });

  let updated: ReturnType<A2ATaskManager["updateTask"]> | undefined;
  assert.doesNotThrow(() => {
    updated = tm.updateTask(task.id, "working");
  });
  assert.equal(updated?.state, "working");
});

// ── historyRetentionDays() ───────────────────────────────────────────────────────────────

test("historyRetentionDays()", async (t) => {
  const original = process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS;
  t.after(() => {
    if (original === undefined) delete process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS;
    else process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS = original;
  });

  await t.test("defaults to 30 when unset", () => {
    delete process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS;
    assert.equal(historyRetentionDays(), 30);
  });

  await t.test("uses a valid positive int from env", () => {
    process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS = "7";
    assert.equal(historyRetentionDays(), 7);
  });

  await t.test("falls back to 30 for '0'", () => {
    process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS = "0";
    assert.equal(historyRetentionDays(), 30);
  });

  await t.test("falls back to 30 for a non-numeric value", () => {
    process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS = "x";
    assert.equal(historyRetentionDays(), 30);
  });
});

// ── purge throttled to at most once per 24h, driven via maybePurge() ────────────────────

test("maybePurge() runs when lastPurgeAt is older than 24h, then throttles further calls", () => {
  const { persistence, purgeCalls } = makeFakePersistence();
  const tm = createManager(5, persistence);
  const withPurge = tm as unknown as { maybePurge(): void; lastPurgeAt: number };

  // Fresh manager: lastPurgeAt starts at 0 → immediately eligible.
  withPurge.maybePurge();
  assert.equal(purgeCalls.length, 1);

  // Immediately calling again must NOT purge again (throttled).
  withPurge.maybePurge();
  assert.equal(purgeCalls.length, 1);

  // Simulate 25h having elapsed since the last purge.
  withPurge.lastPurgeAt = Date.now() - 25 * 60 * 60 * 1000;
  withPurge.maybePurge();
  assert.equal(purgeCalls.length, 2);
});

test("maybePurge() passes historyRetentionDays() to persistence.purge", () => {
  const original = process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS;
  process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS = "14";
  try {
    const { persistence, purgeCalls } = makeFakePersistence();
    const tm = createManager(5, persistence);
    (tm as unknown as { maybePurge(): void }).maybePurge();
    assert.deepEqual(purgeCalls, [14]);
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS;
    else process.env.OMNIROUTE_A2A_HISTORY_RETENTION_DAYS = original;
  }
});

test("a throwing persistence.purge does not break maybePurge/cleanupExpired", () => {
  const { persistence } = makeFakePersistence({
    purge: (() => {
      throw new Error("purge boom");
    }) as A2APersistence["purge"],
  });
  const tm = createManager(5, persistence);
  assert.doesNotThrow(() => {
    (tm as unknown as { maybePurge(): void }).maybePurge();
  });
});
