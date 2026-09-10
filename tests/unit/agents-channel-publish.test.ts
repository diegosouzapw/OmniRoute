/**
 * Task B2 (Orchestration Canvas Fase 2): the cloud-agent and A2A task writers must publish
 * `agent.task.updated` on every write, best-effort (a throwing listener must never break the
 * write path). Covers:
 *   (a) A2ATaskManager.createTask / updateTask / cleanupExpired (TTL branch)
 *   (b) cloud-agent insertCloudAgentTask / updateCloudAgentTask
 *   (c) a throwing listener does not break the write path
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { on } from "../../src/lib/events/eventBus.ts";
import type { AgentTaskUpdatedPayload } from "../../src/lib/events/types.ts";
import { A2ATaskManager } from "../../src/lib/a2a/taskManager.ts";

// ── DB test hygiene (AGENTS.md "PII & Stream Sanitization Learnings" §3): temp DATA_DIR set
// BEFORE importing src/lib/db/core.ts (SQLITE_FILE is resolved from DATA_DIR at import time),
// resetDbInstance()+rm the temp dir in test.after so the node:test runner does not hang.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agents-channel-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const cloudAgentDb = await import("../../src/lib/cloudAgent/db.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── (a) A2ATaskManager ───────────────────────────────────────────────────────────────────

const managers: A2ATaskManager[] = [];
function createManager(ttlMinutes = 5) {
  const manager = new A2ATaskManager(ttlMinutes);
  managers.push(manager);
  return manager;
}

test.afterEach(() => {
  while (managers.length > 0) {
    managers.pop()?.destroy();
  }
});

test("A2ATaskManager.createTask emits agent.task.updated {source: a2a, state: submitted}", () => {
  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    const tm = createManager();
    const task = tm.createTask({
      skill: "smart-routing",
      messages: [{ role: "user", content: "hello" }],
    });

    assert.equal(events.length, 1);
    assert.equal(events[0].source, "a2a");
    assert.equal(events[0].taskId, task.id);
    assert.equal(events[0].state, "submitted");
    assert.equal(typeof events[0].timestamp, "number");
  } finally {
    unsubscribe();
  }
});

test("A2ATaskManager.updateTask emits agent.task.updated with the new state", () => {
  const tm = createManager();
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hello" }],
  });

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    tm.updateTask(task.id, "working");

    assert.equal(events.length, 1);
    assert.equal(events[0].source, "a2a");
    assert.equal(events[0].taskId, task.id);
    assert.equal(events[0].state, "working");
  } finally {
    unsubscribe();
  }
});

test("A2ATaskManager.cleanupExpired emits agent.task.updated {state: failed} on TTL expiry", () => {
  const tm = createManager();
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hello" }],
  });
  task.expiresAt = new Date(Date.now() - 1_000).toISOString();

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    // private in TS only; callable at runtime for regression test (matches
    // tests/unit/t09-a2a-lifecycle.test.ts precedent).
    (tm as unknown as { cleanupExpired(): void }).cleanupExpired();

    assert.equal(events.length, 1);
    assert.equal(events[0].source, "a2a");
    assert.equal(events[0].taskId, task.id);
    assert.equal(events[0].state, "failed");
  } finally {
    unsubscribe();
  }
});

test("a throwing agent.task.updated listener does not break A2ATaskManager.createTask", () => {
  const unsubscribe = on("agent.task.updated", () => {
    throw new Error("listener boom");
  });
  try {
    const tm = createManager();
    let task: ReturnType<A2ATaskManager["createTask"]> | undefined;
    assert.doesNotThrow(() => {
      task = tm.createTask({
        skill: "smart-routing",
        messages: [{ role: "user", content: "hello" }],
      });
    });
    assert.ok(task);
    assert.equal(tm.getTask(task!.id)?.id, task!.id);
  } finally {
    unsubscribe();
  }
});

// ── (b) cloud-agent DB writers ──────────────────────────────────────────────────────────

function makeTaskRow(overrides: Partial<Parameters<typeof cloudAgentDb.insertCloudAgentTask>[0]> = {}) {
  const now = new Date().toISOString();
  return {
    id: `task-${Math.random().toString(36).slice(2)}`,
    provider_id: "codex-cloud",
    external_id: null,
    status: "queued",
    prompt: "do something",
    source: "dashboard",
    options: "{}",
    result: null,
    activities: "[]",
    error: null,
    created_at: now,
    updated_at: now,
    completed_at: null,
    ...overrides,
  };
}

test.beforeEach(() => {
  core.resetDbInstance();
  cloudAgentDb.createCloudAgentTaskTable();
});

test("insertCloudAgentTask emits agent.task.updated {source: cloud-agent, state: queued}", () => {
  const row = makeTaskRow({ status: "queued" });

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    cloudAgentDb.insertCloudAgentTask(row);

    assert.equal(events.length, 1);
    assert.equal(events[0].source, "cloud-agent");
    assert.equal(events[0].taskId, row.id);
    assert.equal(events[0].state, "queued");
  } finally {
    unsubscribe();
  }
});

test("updateCloudAgentTask emits agent.task.updated with the new status", () => {
  const row = makeTaskRow({ status: "queued" });
  cloudAgentDb.insertCloudAgentTask(row);

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    cloudAgentDb.updateCloudAgentTask(row.id, { status: "running" });

    assert.equal(events.length, 1);
    assert.equal(events[0].source, "cloud-agent");
    assert.equal(events[0].taskId, row.id);
    assert.equal(events[0].state, "running");
  } finally {
    unsubscribe();
  }
});

test("updateCloudAgentTask without a status field emits state 'updated'", () => {
  const row = makeTaskRow({ status: "queued" });
  cloudAgentDb.insertCloudAgentTask(row);

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    cloudAgentDb.updateCloudAgentTask(row.id, { result: "partial output" });

    assert.equal(events.length, 1);
    assert.equal(events[0].source, "cloud-agent");
    assert.equal(events[0].taskId, row.id);
    assert.equal(events[0].state, "updated");
  } finally {
    unsubscribe();
  }
});

test("updateCloudAgentTask with no valid fields does not emit (no-op write)", () => {
  const row = makeTaskRow({ status: "queued" });
  cloudAgentDb.insertCloudAgentTask(row);

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    cloudAgentDb.updateCloudAgentTask(row.id, {});

    assert.equal(events.length, 0);
  } finally {
    unsubscribe();
  }
});

test("a throwing agent.task.updated listener does not break insertCloudAgentTask", () => {
  const row = makeTaskRow({ status: "queued" });
  const unsubscribe = on("agent.task.updated", () => {
    throw new Error("listener boom");
  });
  try {
    assert.doesNotThrow(() => cloudAgentDb.insertCloudAgentTask(row));
    assert.equal(cloudAgentDb.getCloudAgentTaskById(row.id)?.id, row.id);
  } finally {
    unsubscribe();
  }
});
