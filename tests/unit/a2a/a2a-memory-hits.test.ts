/**
 * Task D2 (Orchestration Canvas Fase 2, PR-C): `collectMemoryHits` records WHICH memories were
 * consulted for an A2A task, as pure observability — the hits are never injected into the
 * skill's prompt or behavior, only mirrored into `task.metadata.memoryHits` and a
 * `memory_hits` history event.
 *
 * Uses FAKE `MemoryHitsDeps` throughout (no real memory backend, no SQLite) — the DI seam
 * exists precisely so this suite needs neither.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  collectMemoryHits,
  executeA2ATaskWithState,
  type MemoryHit,
  type MemoryHitsDeps,
} from "../../../src/lib/a2a/taskExecution.ts";
import {
  A2ATaskManager,
  type A2APersistence,
  type A2ATask,
} from "../../../src/lib/a2a/taskManager.ts";

function makeTask(overrides: Partial<A2ATask> = {}): A2ATask {
  return {
    id: "task-1",
    skill: "smart-routing",
    state: "working",
    input: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "what is the cheapest gpt-4 provider?" }],
    },
    artifacts: [],
    events: [],
    metadata: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    ...overrides,
  };
}

const ENV_KEY = "OMNIROUTE_A2A_MEMORY_HITS";

function withEnv(value: string | undefined, fn: () => Promise<void>) {
  const original = process.env[ENV_KEY];
  if (value === undefined) delete process.env[ENV_KEY];
  else process.env[ENV_KEY] = value;
  return fn().finally(() => {
    if (original === undefined) delete process.env[ENV_KEY];
    else process.env[ENV_KEY] = original;
  });
}

test("collectMemoryHits maps search results and truncates snippet to 200 chars", async () => {
  const longContent = "x".repeat(250);
  const searchCalls: Array<{ query: string; apiKeyId: string; limit?: number }> = [];
  const deps: MemoryHitsDeps = {
    search: async (cfg) => {
      searchCalls.push(cfg);
      return [
        { id: "m1", key: "k1", type: "factual", content: longContent },
        { id: "m2", key: "k2", type: "episodic", content: "short" },
      ];
    },
  };

  const task = makeTask();
  const hits = await collectMemoryHits(task, deps);

  assert.equal(searchCalls.length, 1);
  assert.equal(searchCalls[0].query, "what is the cheapest gpt-4 provider?");
  assert.equal(searchCalls[0].apiKeyId, "mcp");

  assert.deepEqual(hits, [
    { id: "m1", key: "k1", type: "factual", snippet: longContent.slice(0, 200) },
    { id: "m2", key: "k2", type: "episodic", snippet: "short" },
  ] satisfies MemoryHit[]);
  assert.equal(hits[0].snippet.length, 200);
});

test("collectMemoryHits uses task.owner as apiKeyId when present", async () => {
  let seenApiKeyId: string | undefined;
  const deps: MemoryHitsDeps = {
    search: async (cfg) => {
      seenApiKeyId = cfg.apiKeyId;
      return [];
    },
  };

  const task = makeTask({ owner: "owner-123" });
  await collectMemoryHits(task, deps);

  assert.equal(seenApiKeyId, "owner-123");
});

test("collectMemoryHits uses the LAST user message as the query", async () => {
  let seenQuery: string | undefined;
  const deps: MemoryHitsDeps = {
    search: async (cfg) => {
      seenQuery = cfg.query;
      return [];
    },
  };

  const task = makeTask({
    input: {
      skill: "smart-routing",
      messages: [
        { role: "user", content: "first question" },
        { role: "assistant", content: "an answer" },
        { role: "user", content: "second question" },
      ],
    },
  });
  await collectMemoryHits(task, deps);

  assert.equal(seenQuery, "second question");
});

test("collectMemoryHits returns [] and never calls search when there is no user message", async () => {
  let called = false;
  const deps: MemoryHitsDeps = {
    search: async () => {
      called = true;
      return [];
    },
  };

  const task = makeTask({
    input: { skill: "smart-routing", messages: [{ role: "assistant", content: "hi" }] },
  });
  const hits = await collectMemoryHits(task, deps);

  assert.deepEqual(hits, []);
  assert.equal(called, false);
});

test("collectMemoryHits returns [] when search throws — never fails the caller", async () => {
  const deps: MemoryHitsDeps = {
    search: async () => {
      throw new Error("boom");
    },
  };

  const task = makeTask();
  const hits = await collectMemoryHits(task, deps);

  assert.deepEqual(hits, []);
});

test("collectMemoryHits kill-switch (OMNIROUTE_A2A_MEMORY_HITS=0) returns [] without calling search", async () => {
  await withEnv("0", async () => {
    let called = false;
    const deps: MemoryHitsDeps = {
      search: async () => {
        called = true;
        return [];
      },
    };

    const task = makeTask();
    const hits = await collectMemoryHits(task, deps);

    assert.deepEqual(hits, []);
    assert.equal(called, false);
  });
});

test("executeA2ATaskWithState sets task.metadata.memoryHits and appends a memory_hits event when there are hits", async () => {
  const appendEventCalls: Array<{ taskId: string; eventType: string; dataJson?: string }> = [];
  const deps: MemoryHitsDeps = {
    search: async () => [{ id: "m1", key: "k1", type: "factual", content: "hello" }],
    appendEvent: (taskId, eventType, dataJson) => {
      appendEventCalls.push({ taskId, eventType, dataJson });
    },
  };

  const updateTaskCalls: unknown[] = [];
  const tm = {
    updateTask: (...args: unknown[]) => {
      updateTaskCalls.push(args);
    },
  };

  const task = makeTask();
  const result = await executeA2ATaskWithState(
    tm,
    task,
    async () => ({ artifacts: [], metadata: {} }),
    deps
  );

  assert.deepEqual(result.artifacts, []);
  assert.deepEqual(task.metadata.memoryHits, [
    { id: "m1", key: "k1", type: "factual", snippet: "hello" },
  ]);
  assert.equal(appendEventCalls.length, 1);
  assert.equal(appendEventCalls[0].taskId, "task-1");
  assert.equal(appendEventCalls[0].eventType, "memory_hits");
  assert.deepEqual(JSON.parse(appendEventCalls[0].dataJson ?? "[]"), [
    { id: "m1", key: "k1", type: "factual", snippet: "hello" },
  ]);
  assert.equal(updateTaskCalls.length, 1);
});

test("executeA2ATaskWithState does not set metadata.memoryHits or append an event when there are no hits", async () => {
  const appendEventCalls: unknown[] = [];
  const deps: MemoryHitsDeps = {
    search: async () => [],
    appendEvent: (...args: unknown[]) => {
      appendEventCalls.push(args);
    },
  };

  const tm = { updateTask: () => {} };
  const task = makeTask();
  await executeA2ATaskWithState(tm, task, async () => ({ artifacts: [], metadata: {} }), deps);

  assert.equal("memoryHits" in task.metadata, false);
  assert.equal(appendEventCalls.length, 0);
});

test("executeA2ATaskWithState completes the task normally even when memory recall throws", async () => {
  const deps: MemoryHitsDeps = {
    search: async () => {
      throw new Error("recall backend down");
    },
  };

  let completedState: string | undefined;
  const tm = {
    updateTask: (_taskId: string, state: string) => {
      completedState = state;
    },
  };

  const task = makeTask();
  const result = await executeA2ATaskWithState(
    tm,
    task,
    async () => ({ artifacts: [{ type: "text", content: "ok" }], metadata: {} }),
    deps
  );

  assert.equal(completedState, "completed");
  assert.deepEqual(result.artifacts, [{ type: "text", content: "ok" }]);
  assert.equal("memoryHits" in task.metadata, false);
});

test("executeA2ATaskWithState swallows a throwing appendEvent (best-effort) and still completes", async () => {
  const deps: MemoryHitsDeps = {
    search: async () => [{ id: "m1", key: "k1", type: "factual", content: "hello" }],
    appendEvent: () => {
      throw new Error("db unavailable");
    },
  };

  let completedState: string | undefined;
  const tm = {
    updateTask: (_taskId: string, state: string) => {
      completedState = state;
    },
  };

  const task = makeTask();
  await executeA2ATaskWithState(tm, task, async () => ({ artifacts: [], metadata: {} }), deps);

  assert.equal(completedState, "completed");
  assert.deepEqual(task.metadata.memoryHits, [
    { id: "m1", key: "k1", type: "factual", snippet: "hello" },
  ]);
});

/**
 * Regression (whole-branch review, Important 1): `createTask` used to store the CALLER's
 * `input.metadata` object as the task's own `metadata`, so the `memoryHits` written above
 * landed inside `task.input.metadata` too — from where it was serialized into
 * `a2a_tasks.input_json` and echoed back by the drawer's "Repeat" body, making the repeated
 * task be born carrying the previous run's memory snippets (visible even with the
 * `OMNIROUTE_A2A_MEMORY_HITS=0` kill-switch on). `metadata` must be a COPY.
 */
test("executeA2ATaskWithState never leaks memoryHits into task.input.metadata or the persisted input", async () => {
  const upsertCalls: Array<{ inputJson: string | null }> = [];
  const persistence: A2APersistence = {
    upsert: ((row: { inputJson: string | null }) => {
      upsertCalls.push(row);
    }) as A2APersistence["upsert"],
    appendEvent: (() => {}) as A2APersistence["appendEvent"],
    purge: ((): number => 0) as A2APersistence["purge"],
  };
  const tm = new A2ATaskManager(5, persistence);
  try {
    const callerMetadata = { role: "general" };
    const task = tm.createTask({
      skill: "smart-routing",
      messages: [{ role: "user", content: "route this please" }],
      metadata: callerMetadata,
    });

    await executeA2ATaskWithState(
      { updateTask: () => {} },
      task,
      async () => ({ artifacts: [], metadata: {} }),
      {
        search: async () => [{ id: "m1", key: "k1", type: "factual", content: "hello" }],
        appendEvent: () => {},
      }
    );

    // The hits ARE recorded on the task's runtime metadata …
    assert.deepEqual(task.metadata.memoryHits, [
      { id: "m1", key: "k1", type: "factual", snippet: "hello" },
    ]);
    // … but never on the immutable record of what the caller sent.
    assert.equal("memoryHits" in (task.input.metadata ?? {}), false);
    assert.deepEqual(task.input.metadata, { role: "general" });
    // … nor on the caller's own object (no aliasing in either direction).
    assert.deepEqual(callerMetadata, { role: "general" });

    // A persist AFTER the hits were recorded must still write a clean input_json.
    tm.updateTask(task.id, "working");
    assert.ok(upsertCalls.length >= 2);
    for (const row of upsertCalls) {
      assert.ok(!String(row.inputJson).includes("memoryHits"), "input_json carries no memoryHits");
    }
  } finally {
    tm.destroy();
  }
});
