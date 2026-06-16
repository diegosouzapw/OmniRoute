/**
 * Agent Dispatch A2A Skill Tests
 */

import test from "node:test";
import assert from "node:assert/strict";

const { A2A_SKILL_HANDLERS, executeA2ATaskWithState } = await import(
  "../../src/lib/a2a/taskExecution.ts"
);
const { getTaskManager } = await import("../../src/lib/a2a/taskManager.ts");
const { executeAgentDispatch } = await import(
  "../../src/lib/a2a/skills/agentDispatch.ts"
);

test("A2A Skill Handlers - agent-dispatch is registered", async () => {
  assert.ok(
    A2A_SKILL_HANDLERS["agent-dispatch"],
    "agent-dispatch skill handler must be registered"
  );
  assert.strictEqual(
    typeof A2A_SKILL_HANDLERS["agent-dispatch"],
    "function",
    "handler must be a function"
  );
});

test("Agent Dispatch - basic task invocation", async () => {
  const task = {
    id: "test-1",
    skill: "agent-dispatch",
    messages: [{ role: "user", content: "Write a simple hello world function" }],
    state: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const handler = A2A_SKILL_HANDLERS["agent-dispatch"];
  assert.ok(handler, "handler must exist");

  const result = await executeAgentDispatch(task);

  assert.ok(result, "result must be returned");
  assert.ok(result.artifacts, "artifacts must be present");
  assert.ok(Array.isArray(result.artifacts), "artifacts must be an array");
  assert.ok(result.artifacts.length > 0, "artifacts must contain at least one item");
});

test("Agent Dispatch - validates metadata with Zod", async () => {
  const task = {
    id: "test-2",
    skill: "agent-dispatch",
    messages: [{ role: "user", content: "Generate code" }],
    metadata: {
      engine: "invalid-engine",
    },
    state: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const result = await executeAgentDispatch(task);

  assert.ok(result, "result must be returned even with invalid params");
  assert.ok(result.metadata, "metadata must be present");
  assert.strictEqual(result.metadata.success, false, "operation must fail with invalid params");
  assert.ok(result.artifacts[0].type === "error", "artifact must indicate error");
});

test("Agent Dispatch - requires non-empty user message", async () => {
  const task = {
    id: "test-3",
    skill: "agent-dispatch",
    messages: [{ role: "assistant", content: "I cannot help with that" }],
    state: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const result = await executeAgentDispatch(task);

  assert.ok(result, "result must be returned");
  assert.strictEqual(result.metadata.success, false, "operation must fail when no user message");
  assert.ok(result.artifacts[0].type === "error", "artifact must indicate error");
});

test("Agent Dispatch - sanitizes error messages (no stack trace leak)", async () => {
  const task = {
    id: "test-4",
    skill: "agent-dispatch",
    messages: [],
    state: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const result = await executeAgentDispatch(task);

  assert.ok(result.metadata, "metadata must be present");
  if (result.metadata.error) {
    const error = result.metadata.error as string;
    assert.strictEqual(error.includes("at /"), false, "error message must not leak stack traces");
    assert.strictEqual(error.includes(".ts:"), false, "error message must not leak file paths");
  }
});

test("Agent Dispatch - accepts optional parameters with defaults", async () => {
  const task = {
    id: "test-5",
    skill: "agent-dispatch",
    messages: [{ role: "user", content: "Write code" }],
    metadata: {}, // Empty metadata should use defaults
    state: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const result = await executeAgentDispatch(task);

  // Should use defaults: engine='forge', cwd=process.cwd(), timeout=300000
  assert.ok(result, "result must be returned with default params");
  if (result.metadata) {
    assert.ok(
      result.metadata.engine === "forge" || result.metadata.success === false,
      "engine should default to forge if execution succeeds"
    );
  }
});

test("Agent Dispatch - formats JSON response when available", async () => {
  const task = {
    id: "test-6",
    skill: "agent-dispatch",
    messages: [{ role: "user", content: "Generate JSON config" }],
    metadata: {
      engine: "forge",
    },
    state: "pending",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const result = await executeAgentDispatch(task);

  assert.ok(result, "result must be returned");
  assert.ok(result.artifacts, "artifacts must be present");
  if (result.metadata.success === true && result.artifacts.length > 0) {
    // If successful, artifact content should be present
    assert.ok(result.artifacts[0].content, "artifact content must be present when successful");
  }
});

test("Task Manager - tracks agent-dispatch tasks", async () => {
  const tm = getTaskManager();

  const task = tm.createTask({
    skill: "agent-dispatch",
    messages: [{ role: "user", content: "test" }],
    metadata: { engine: "forge" },
  });

  assert.ok(task.id, "task must have an ID");
  assert.strictEqual(task.state, "pending", "initial state must be pending");
  assert.strictEqual(task.skill, "agent-dispatch", "skill must be agent-dispatch");

  const retrieved = tm.getTask(task.id);
  assert.ok(retrieved, "task must be retrievable");
  assert.deepStrictEqual(retrieved, task, "retrieved task must match created task");
});

test("Task Manager - updates task state", async () => {
  const tm = getTaskManager();

  const task = tm.createTask({
    skill: "agent-dispatch",
    messages: [{ role: "user", content: "test" }],
  });

  const artifacts = [{ type: "text", content: "result" }];
  tm.updateTask(task.id, "completed", artifacts);

  const updated = tm.getTask(task.id);
  assert.ok(updated, "updated task must exist");
  assert.strictEqual(updated!.state, "completed", "state must be updated");
  assert.deepStrictEqual(updated!.artifacts, artifacts, "artifacts must be set");
});

test("Task Manager - cancels tasks", async () => {
  const tm = getTaskManager();

  const task = tm.createTask({
    skill: "agent-dispatch",
    messages: [{ role: "user", content: "test" }],
  });

  const cancelled = tm.cancelTask(task.id);
  assert.strictEqual(cancelled.state, "cancelled", "state must be cancelled");

  const retrieved = tm.getTask(task.id);
  assert.strictEqual(retrieved!.state, "cancelled", "task state must remain cancelled");
});
