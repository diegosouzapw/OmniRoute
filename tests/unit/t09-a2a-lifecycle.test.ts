import test from "node:test";
import assert from "node:assert/strict";

import { A2ATaskManager } from "../../src/lib/a2a/taskManager.ts";
import { executeA2ATaskWithState } from "../../src/lib/a2a/taskExecution.ts";

const managers = [];

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

test("completed task remains completed when queried after expiration", () => {
  const tm = createManager();
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hello" }],
  });

  tm.updateTask(task.id, "working");
  tm.updateTask(task.id, "completed", [{ type: "text", content: "done" }]);
  task.expiresAt = new Date(Date.now() - 1_000).toISOString();

  assert.doesNotThrow(() => tm.getTask(task.id));
  const loaded = tm.getTask(task.id);
  assert.equal(loaded?.state, "completed");
});

test("stream execution marks task as failed when handler throws", async () => {
  const tm = createManager();
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "trigger error" }],
  });

  tm.updateTask(task.id, "working");

  await assert.rejects(
    () =>
      executeA2ATaskWithState(tm, task, async () => {
        throw new Error("upstream failure");
      }),
    /upstream failure/
  );

  const loaded = tm.getTask(task.id);
  assert.equal(loaded?.state, "failed");
  assert.deepEqual(loaded?.artifacts.at(-1), { type: "error", content: "upstream failure" });
});

test("expired submitted task transitions to failed without throwing", () => {
  const tm = createManager();
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "hello" }],
  });
  task.expiresAt = new Date(Date.now() - 1_000).toISOString();

  assert.doesNotThrow(() => tm.getTask(task.id));
  const loaded = tm.getTask(task.id);
  assert.equal(loaded?.state, "failed");
});

test("cleanup keeps cancelled tasks as cancelled", () => {
  const tm = createManager();
  const task = tm.createTask({
    skill: "smart-routing",
    messages: [{ role: "user", content: "cancel me" }],
  });
  tm.updateTask(task.id, "cancelled");
  task.expiresAt = new Date(Date.now() - 1_000).toISOString();

  // private in TS only; callable at runtime for regression test
  tm.cleanupExpired();

  const loaded = tm.getTask(task.id);
  assert.equal(loaded?.state, "cancelled");
});
