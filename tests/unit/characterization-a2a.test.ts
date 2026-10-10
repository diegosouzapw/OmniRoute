// Characterization tests — src/lib/a2a (rail 3.8.55, Task 12 "caracterização B").
//
// Pins the public surface of the A2A modules consumed outside src/lib/a2a, the Agent Card
// served at /.well-known/agent.json (v0.3) and /.well-known/agent-card.json (v1.0), one
// skill handler dispatched through A2A_SKILL_HANDLERS, the task state machine and the
// execute-with-state wrapper, plus the owner/auth helpers — as they behave TODAY, before
// the v4 extraction. Current behavior that looks wrong is pinned under
// `characterization: … currently …`.
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import "../_setup/isolateDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP ||= "true";
// Hermetic env: the devbox shell may export these and they change auth/card behavior.
for (const name of [
  "OMNIROUTE_API_KEY",
  "REQUIRE_API_KEY",
  "CONDUCTOR_HUB_URL",
  "OMNIROUTE_A2A_MEMORY_HITS",
]) {
  delete process.env[name];
}
process.env.OMNIROUTE_BASE_URL = "http://a2a-char.test";

const core = await import("../../src/lib/db/core.ts");
const taskManagerModule = await import("../../src/lib/a2a/taskManager.ts");
const taskExecutionModule = await import("../../src/lib/a2a/taskExecution.ts");
const authenticateModule = await import("../../src/lib/a2a/authenticate.ts");
const streamingModule = await import("../../src/lib/a2a/streaming.ts");
const routingLoggerModule = await import("../../src/lib/a2a/routingLogger.ts");
const agentCardV03 = await import("../../src/app/.well-known/agent.json/route.ts");
const agentCardV10 = await import("../../src/app/.well-known/agent-card.json/route.ts");
const { APP_CONFIG } = await import("../../src/shared/constants/appConfig.ts");
const memory = await import("../../src/lib/memory/index.ts");

const { A2ATaskManager, getTaskManager } = taskManagerModule;
const { A2A_SKILL_HANDLERS, executeA2ATaskWithState, collectMemoryHits } = taskExecutionModule;

type Persisted = { upserts: unknown[]; events: Array<[string, string, string | undefined]> };

function inMemoryPersistence(): Persisted & {
  upsert: (row: unknown) => void;
  appendEvent: (id: string, type: string, data?: string) => void;
  purge: () => void;
} {
  const store: Persisted = { upserts: [], events: [] };
  return {
    ...store,
    upsert: (row) => store.upserts.push(row),
    appendEvent: (id, type, data) => store.events.push([id, type, data]),
    purge: () => {},
  };
}

const managers: Array<InstanceType<typeof A2ATaskManager>> = [];
function newManager() {
  const persistence = inMemoryPersistence();
  const tm = new A2ATaskManager(5, persistence as never);
  managers.push(tm);
  return { tm, persistence };
}

test.after(() => {
  for (const tm of managers) tm.destroy();
  getTaskManager().destroy();
  core.resetDbInstance();
});

// ─── (a) Public surface snapshot ─────────────────────────────────────────────

test("a2a modules consumed outside src/lib/a2a export exactly this surface", () => {
  assert.deepEqual(
    {
      authenticate: Object.keys(authenticateModule).sort(),
      routingLogger: Object.keys(routingLoggerModule).sort(),
      streaming: Object.keys(streamingModule).sort(),
      taskExecution: Object.keys(taskExecutionModule).sort(),
      taskManager: Object.keys(taskManagerModule).sort(),
    },
    {
      authenticate: ["authenticateA2ARequest", "resolveA2AOwner"],
      routingLogger: ["logRoutingDecision"],
      streaming: [
        "SSE_HEADERS",
        "createA2AStream",
        "createChunkEvent",
        "createCompletionEvent",
        "createFailureEvent",
        "createHeartbeat",
        "formatSSE",
      ],
      taskExecution: [
        "A2A_SKILL_HANDLERS",
        "MEMORY_RECALL_TIMEOUT_MS",
        "collectMemoryHits",
        "executeA2ATaskWithState",
      ],
      taskManager: ["A2ATaskManager", "getTaskManager", "historyRetentionDays"],
    }
  );
});

test("A2A_SKILL_HANDLERS registers exactly the six built-in skills", () => {
  assert.deepEqual(Object.keys(A2A_SKILL_HANDLERS).sort(), [
    "cost-analysis",
    "health-report",
    "list-capabilities",
    "provider-discovery",
    "quota-management",
    "smart-routing",
  ]);
  assert.equal(taskExecutionModule.MEMORY_RECALL_TIMEOUT_MS, 1500);
  assert.equal(taskManagerModule.historyRetentionDays(), 30);
});

// ─── (b) Agent Card ──────────────────────────────────────────────────────────

test("Agent Card v0.3 (/.well-known/agent.json): shape, version, skills match the handler table", async () => {
  const res = await agentCardV03.GET();
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("cache-control"), "public, max-age=3600");
  const card = await res.json();

  assert.equal(card.url, "http://a2a-char.test/a2a");
  assert.equal(card.version, APP_CONFIG.version);
  assert.deepEqual(card.capabilities, { streaming: true, pushNotifications: false });
  assert.deepEqual(card.authentication, { schemes: ["api-key"], apiKeyHeader: "Authorization" });
  assert.deepEqual(
    card.skills.map((s: { id: string }) => s.id).sort(),
    Object.keys(A2A_SKILL_HANDLERS).sort(),
    "with no Conductor hub the card lists exactly the built-in handlers"
  );
  for (const skill of card.skills) {
    assert.ok(Array.isArray(skill.tags) && skill.tags.length > 0, `${skill.id} has tags`);
    assert.ok(
      Array.isArray(skill.examples) && skill.examples.length > 0,
      `${skill.id} has examples`
    );
  }
});

test("Agent Card v1.0 (/.well-known/agent-card.json): same skill ids, both protocol bindings", async () => {
  const card = await (await agentCardV10.GET()).json();
  assert.equal(card.name, "OmniRoute AI Gateway");
  assert.equal(card.version, APP_CONFIG.version);
  assert.deepEqual(
    card.supportedInterfaces.map((i: { protocolVersion: string }) => i.protocolVersion),
    ["1.0", "0.3"]
  );
  assert.deepEqual(
    card.skills.map((s: { id: string }) => s.id).sort(),
    Object.keys(A2A_SKILL_HANDLERS).sort()
  );
});

test("the v0.3 Agent Card serves the same English metadata as the v1.0 card", async () => {
  const v03 = await (await agentCardV03.GET()).json();
  const v10 = await (await agentCardV10.GET()).json();
  assert.equal(v03.name, "OmniRoute AI Gateway");
  assert.equal(v03.name, v10.name);
  assert.equal(v03.description, v10.description);
  assert.deepEqual(v03.skills, v10.skills);
});

// ─── (b) Skill handler via A2A_SKILL_HANDLERS ────────────────────────────────

test("list-capabilities handler returns a markdown catalog artifact and coverage metadata", async () => {
  const { tm } = newManager();
  const task = tm.createTask({
    skill: "list-capabilities",
    messages: [{ role: "user", content: "what can you do?" }],
  });

  const result = await A2A_SKILL_HANDLERS["list-capabilities"](task);
  assert.equal(result.artifacts.length, 1);
  assert.equal(result.artifacts[0].type, "text");
  assert.match(result.artifacts[0].content, /^# OmniRoute Agent Skills Catalog/);
  assert.match(result.artifacts[0].content, /\| ID \| Name \| Category \| Area \|/);

  const metadata = result.metadata as {
    source: string;
    totalSkills: number;
    coverage: Record<string, { have: number; total: number }>;
  };
  assert.equal(metadata.source, "agent-skills-catalog");
  assert.equal(metadata.coverage.api.total, 23);
  assert.equal(metadata.coverage.cli.total, 21);
  assert.equal(metadata.coverage.config.total, 1);
  assert.ok(metadata.totalSkills > 0);
});

test("executeA2ATaskWithState: working → completed with the handler artifacts; memory hits recorded", async () => {
  const { tm } = newManager();
  const task = tm.createTask(
    { skill: "char", messages: [{ role: "user", content: "remember the deploy" }] },
    "owner-1"
  );
  tm.updateTask(task.id, "working");

  const events: Array<[string, string, string | undefined]> = [];
  const result = await executeA2ATaskWithState(
    tm,
    task,
    async () => ({ artifacts: [{ type: "text", content: "done" }], metadata: {} }),
    {
      search: async (cfg) => {
        assert.deepEqual(cfg, { query: "remember the deploy", apiKeyId: "owner-1", limit: 5 });
        return [{ id: "m1", key: "deploy", type: "factual", content: "x".repeat(300) }];
      },
      appendEvent: (id, type, data) => events.push([id, type, data]),
    }
  );

  assert.deepEqual(result.artifacts, [{ type: "text", content: "done" }]);
  const stored = tm.getTask(task.id, "owner-1");
  assert.equal(stored?.state, "completed");
  assert.deepEqual(stored?.artifacts, [{ type: "text", content: "done" }]);
  const hits = stored?.metadata.memoryHits as Array<{ snippet: string }>;
  assert.equal(hits.length, 1);
  assert.equal(hits[0].snippet.length, 200, "snippet is truncated to 200 chars");
  assert.equal(events[0][1], "memory_hits");
});

test("executeA2ATaskWithState: a throwing handler marks the task failed with an error artifact and rethrows", async () => {
  const { tm } = newManager();
  const task = tm.createTask({ skill: "char", messages: [] });
  tm.updateTask(task.id, "working");

  await assert.rejects(
    executeA2ATaskWithState(tm, task, async () => {
      throw new Error("skill blew up");
    }),
    /skill blew up/
  );
  const stored = tm.getTask(task.id);
  assert.equal(stored?.state, "failed");
  assert.deepEqual(stored?.artifacts, [{ type: "error", content: "skill blew up" }]);
  assert.equal(stored?.events.at(-1)?.message, "skill blew up");
});

test("task manager: lifecycle events, owner scoping, stats and persistence calls", () => {
  const { tm, persistence } = newManager();
  const mine = tm.createTask({ skill: "a", messages: [] }, "owner-a");
  const open = tm.createTask({ skill: "b", messages: [] });

  assert.equal(mine.state, "submitted");
  assert.equal(tm.getTask(mine.id, "owner-b"), undefined, "owned tasks are hidden from others");
  assert.equal(tm.getTask(open.id, "owner-b")?.id, open.id, "ownerless tasks are visible to all");
  assert.deepEqual(
    tm.listTasks(undefined, "owner-b").map((t) => t.id),
    [open.id]
  );

  tm.updateTask(mine.id, "working");
  tm.updateTask(mine.id, "completed", [{ type: "json", content: "{}" }]);
  assert.deepEqual(
    tm.getTask(mine.id, "owner-a")?.events.map((e) => e.state),
    ["submitted", "working", "completed"]
  );
  assert.deepEqual(tm.getStats().counts, {
    submitted: 1,
    working: 0,
    completed: 1,
    failed: 0,
    cancelled: 0,
  });
  assert.deepEqual(
    persistence.events.map(([, type]) => type),
    ["state:submitted", "state:submitted", "state:working", "state:completed"]
  );

  const cancelled = tm.cancelTask(open.id);
  assert.equal(cancelled.state, "cancelled");
  assert.equal(cancelled.events.at(-1)?.message, "Cancelled by client");
});

test("auth helpers: owner id is a 32-hex sha256 prefix of the key; keyless posture allows the call", async () => {
  const keyed = new Request("http://a2a-char.test/a2a", {
    headers: { authorization: "Bearer sk-char-test-key" },
  });
  assert.equal(
    await authenticateModule.resolveA2AOwner(keyed),
    createHash("sha256").update("sk-char-test-key").digest("hex").slice(0, 32)
  );

  const keyless = new Request("http://a2a-char.test/a2a");
  assert.equal(await authenticateModule.resolveA2AOwner(keyless), undefined);
  assert.equal(await authenticateModule.authenticateA2ARequest(keyless), true);
});

test("auth helpers: an explicit OMNIROUTE_API_KEY requires a matching key", async () => {
  process.env.OMNIROUTE_API_KEY = "char-configured-key";
  try {
    const good = new Request("http://a2a-char.test/a2a", {
      headers: { authorization: "Bearer char-configured-key" },
    });
    const bad = new Request("http://a2a-char.test/a2a", {
      headers: { authorization: "Bearer wrong-key" },
    });
    assert.equal(await authenticateModule.authenticateA2ARequest(good), true);
    assert.equal(await authenticateModule.authenticateA2ARequest(bad), false);
  } finally {
    delete process.env.OMNIROUTE_API_KEY;
  }
});

// ─── (c) Invalid input — current behavior ────────────────────────────────────

test("task manager rejects unknown tasks and invalid transitions", () => {
  const { tm } = newManager();
  assert.throws(() => tm.updateTask("missing-id", "working"), /Task missing-id not found/);
  assert.throws(() => tm.cancelTask("missing-id"), /Task missing-id not found/);

  const task = tm.createTask({ skill: "x", messages: [] }, "owner-z");
  assert.throws(() => tm.cancelTask(task.id, "someone-else"), /not found/);
  // submitted → completed is not a legal transition (callers must move to working first).
  assert.throws(
    () => tm.updateTask(task.id, "completed"),
    /Invalid transition: submitted → completed/
  );
  tm.updateTask(task.id, "failed");
  assert.throws(() => tm.updateTask(task.id, "working"), /Invalid transition: failed → working/);
});

test("unknown skill ids have no handler (route-level 'skill not found' is the caller's job)", () => {
  assert.equal(A2A_SKILL_HANDLERS["not-a-skill"], undefined);
});

test("collectMemoryHits returns [] for empty input, the kill-switch, and backend failures", async () => {
  const { tm } = newManager();
  const empty = tm.createTask({ skill: "x", messages: [{ role: "assistant", content: "hi" }] });
  assert.deepEqual(await collectMemoryHits(empty, { search: async () => [] }), []);

  const task = tm.createTask({ skill: "x", messages: [{ role: "user", content: "query" }] });
  assert.deepEqual(
    await collectMemoryHits(task, {
      search: async () => {
        throw new Error("backend down");
      },
    }),
    []
  );

  process.env.OMNIROUTE_A2A_MEMORY_HITS = "0";
  try {
    let called = false;
    await collectMemoryHits(task, {
      search: async () => {
        called = true;
        return [];
      },
    });
    assert.equal(called, false);
  } finally {
    delete process.env.OMNIROUTE_A2A_MEMORY_HITS;
  }
});

test("characterization: collectMemoryHits with the default sqlite backend currently always returns []", async () => {
  // A keyless task (owner undefined → "mcp") whose query matches a stored "mcp" memory.
  await memory.createMemory({
    apiKeyId: "mcp",
    sessionId: "",
    type: memory.MemoryType.FACTUAL,
    key: "char:a2a-hit",
    content: "The staging cluster is called aurora",
    metadata: {},
    expiresAt: null,
  });
  // Direct recall proves the memory is retrievable…
  const direct = await memory.retrieveMemories("mcp", { query: "aurora staging" });
  assert.equal(direct.length, 1);

  // …but collectMemoryHits calls sqliteBackend.search({ query, apiKeyId, limit }) without
  // maxTokens, which throws a ZodError that collectMemoryHits swallows into [].
  const { tm } = newManager();
  const task = tm.createTask({
    skill: "x",
    messages: [{ role: "user", content: "aurora staging" }],
  });
  assert.deepEqual(await collectMemoryHits(task), []);
  await new Promise((resolve) => setImmediate(resolve));
});
