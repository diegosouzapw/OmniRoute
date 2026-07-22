import test from "node:test";
import assert from "node:assert/strict";

import { A2ATaskManager } from "../../src/lib/a2a/taskManager.ts";
import { applyConductorEvent, conductorStateFor } from "../../src/lib/conductor/bridge.ts";

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

const ev = (id: number, type: string, payload: Record<string, unknown>) => ({
  id: String(id),
  type,
  payload,
});

function mirrored(tm: A2ATaskManager, index: Map<string, string>, conductorId: string) {
  const a2aId = index.get(conductorId);
  assert.ok(a2aId, `task ${conductorId} indexada`);
  const task = tm.getTask(a2aId!);
  assert.ok(task, `task A2A ${a2aId} existe`);
  return task!;
}

test("task.created mirrors as submitted with conductor metadata", () => {
  const tm = createManager();
  const index = new Map<string, string>();
  applyConductorEvent(tm, index, ev(1, "task.created", { task_id: "t_abc", mode: "solo", from: "orchestrator" }));
  const task = mirrored(tm, index, "t_abc");
  assert.equal(task.state, "submitted");
  assert.equal(task.skill, "conductor");
  const meta = task.metadata.conductor as Record<string, unknown>;
  assert.equal(meta.task_id, "t_abc");
  assert.equal(meta.mode, "solo");
});

test("created → scheduled → completed climbs the transition ladder without throwing", () => {
  const tm = createManager();
  const index = new Map<string, string>();
  applyConductorEvent(tm, index, ev(1, "task.created", { task_id: "t_ok", mode: "solo", from: "x" }));
  applyConductorEvent(tm, index, ev(2, "task.scheduled", { task_id: "t_ok", runner_id: "r_1" }));
  applyConductorEvent(tm, index, ev(3, "task.completed", { task_id: "t_ok", manifest: { summary: "feito", branch: "task/t_ok" } }));
  const task = mirrored(tm, index, "t_ok");
  assert.equal(task.state, "completed");
  const meta = task.metadata.conductor as Record<string, unknown>;
  assert.equal(meta.runner, "r_1");
  assert.equal(meta.summary, "feito");
  assert.equal(meta.branch, "task/t_ok");
});

test("task.canceled (Conductor, 1 L) maps to cancelled (A2A local, 2 L)", () => {
  const tm = createManager();
  const index = new Map<string, string>();
  assert.equal(conductorStateFor("task.canceled"), "cancelled");
  applyConductorEvent(tm, index, ev(1, "task.created", { task_id: "t_cx", mode: "solo", from: "x" }));
  applyConductorEvent(tm, index, ev(2, "task.canceled", { task_id: "t_cx", by: "operator" }));
  const task = mirrored(tm, index, "t_cx");
  assert.equal(task.state, "cancelled");
});

test("unknown event types are tolerated and mirror nothing (forward-compat)", () => {
  const tm = createManager();
  const index = new Map<string, string>();
  applyConductorEvent(tm, index, ev(1, "runner.registered", { runner_id: "r_1", capabilities: {} }));
  applyConductorEvent(tm, index, ev(2, "council.fanout", { task_id: "t_c", candidate_task_ids: [] }));
  applyConductorEvent(tm, index, ev(3, "some.future.event", {}));
  assert.equal(index.size, 0);
  assert.equal(tm.listTasks().length, 0);
});

test("late-join: terminal event for a never-seen task creates it and lands terminal", () => {
  const tm = createManager();
  const index = new Map<string, string>();
  applyConductorEvent(tm, index, ev(9, "task.completed", { task_id: "t_late", manifest: { summary: "s", branch: null } }));
  const task = mirrored(tm, index, "t_late");
  assert.equal(task.state, "completed");
});

test("events after a terminal state are ignored without throwing", () => {
  const tm = createManager();
  const index = new Map<string, string>();
  applyConductorEvent(tm, index, ev(1, "task.created", { task_id: "t_t", mode: "solo", from: "x" }));
  applyConductorEvent(tm, index, ev(2, "task.canceled", { task_id: "t_t" }));
  assert.doesNotThrow(() => applyConductorEvent(tm, index, ev(3, "task.completed", { task_id: "t_t", manifest: {} })));
  assert.equal(mirrored(tm, index, "t_t").state, "cancelled");
});

test("task.input_required stays working with input_required flag (A2A has no such state)", () => {
  const tm = createManager();
  const index = new Map<string, string>();
  applyConductorEvent(tm, index, ev(1, "task.created", { task_id: "t_i", mode: "solo", from: "x" }));
  applyConductorEvent(tm, index, ev(2, "task.input_required", { task_id: "t_i", question: "qual branch?" }));
  const task = mirrored(tm, index, "t_i");
  assert.equal(task.state, "working");
  assert.equal((task.metadata.conductor as Record<string, unknown>).input_required, true);
});
