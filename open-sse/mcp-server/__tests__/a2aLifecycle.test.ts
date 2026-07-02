import { afterEach, describe, expect, it } from "vitest";
import { A2ATaskManager } from "../../../src/lib/a2a/taskManager.ts";
import { executeA2ATaskWithState } from "../../../src/lib/a2a/taskExecution.ts";

const managers: A2ATaskManager[] = [];

function createManager(ttlMinutes = 5) {
  const manager = new A2ATaskManager(ttlMinutes);
  managers.push(manager);
  return manager;
}

afterEach(() => {
  while (managers.length > 0) {
    managers.pop()?.destroy();
  }
});

describe("A2A task lifecycle regressions", () => {
  it("does not force completed tasks to failed after expiration", () => {
    const tm = createManager();
    const task = tm.createTask({
      skill: "smart-routing",
      messages: [{ role: "user", content: "hello" }],
    });

    tm.updateTask(task.id, "working");
    tm.updateTask(task.id, "completed", [{ type: "text", content: "done" }]);

    // Simulate an already completed task queried after TTL.
    task.expiresAt = new Date(Date.now() - 1_000).toISOString();

    expect(() => tm.getTask(task.id)).not.toThrow();
    const loaded = tm.getTask(task.id);
    expect(loaded?.state).toBe("completed");
  });

  it("marks stream task as failed when skill handler throws", async () => {
    const tm = createManager();
    const task = tm.createTask({
      skill: "smart-routing",
      messages: [{ role: "user", content: "trigger error" }],
    });
    tm.updateTask(task.id, "working");

    await expect(
      executeA2ATaskWithState(tm, task, async () => {
        throw new Error("upstream failure");
      })
    ).rejects.toThrow("upstream failure");

    const loaded = tm.getTask(task.id);
    expect(loaded?.state).toBe("failed");
    expect(loaded?.artifacts.at(-1)).toEqual({ type: "error", content: "upstream failure" });
  });

  it("transitions expired submitted tasks to failed without throwing", () => {
    const tm = createManager();
    const task = tm.createTask({
      skill: "smart-routing",
      messages: [{ role: "user", content: "hello" }],
    });
    task.expiresAt = new Date(Date.now() - 1_000).toISOString();

    expect(() => tm.getTask(task.id)).not.toThrow();
    const loaded = tm.getTask(task.id);
    expect(loaded?.state).toBe("failed");
  });

  it("does not rewrite cancelled tasks to failed during cleanup", () => {
    const tm = createManager();
    const task = tm.createTask({
      skill: "smart-routing",
      messages: [{ role: "user", content: "cancel me" }],
    });
    tm.updateTask(task.id, "cancelled");
    task.expiresAt = new Date(Date.now() - 1_000).toISOString();

    // private in TS only; callable at runtime for regression test
    (tm as any).cleanupExpired();

    const loaded = tm.getTask(task.id);
    expect(loaded?.state).toBe("cancelled");
  });
});
