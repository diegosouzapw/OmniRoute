/**
 * Task C3 (Orchestration Canvas Fase 2, PR-B2): `GET /api/a2a/tasks/history` (persisted task
 * history, distinct from the in-memory `GET /api/a2a/tasks`) plus the `GET /api/a2a/tasks/[id]`
 * fallback to that same history when a task has already dropped out of the in-memory TTL window.
 *
 * Auth follows the same `authorizeA2ATaskRoute` contract as the existing REST task routes
 * (see tests/unit/a2a-task-owner-idor.test.ts) — REQUIRE_API_KEY=true + a real api key created
 * via src/lib/db/apiKeys.ts, so this test exercises the exact owner-scoping path a real client
 * would hit instead of the open keyless posture (whose management-auth branch depends on
 * dashboard session/onboarding state this test does not want to model).
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/a2a-history-route.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-a2a-history-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a2a-history-route-test-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const ORIGINAL_REQUIRE_API_KEY = process.env.REQUIRE_API_KEY;
process.env.REQUIRE_API_KEY = "true";

const core = await import("../../src/lib/db/core.ts");
const a2aTasksDb = await import("../../src/lib/db/a2aTasks.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { resolveA2AOwner } = await import("../../src/lib/a2a/authenticate.ts");
const historyRoute = await import("../../src/app/api/a2a/tasks/history/route.ts");
const detailRoute = await import("../../src/app/api/a2a/tasks/[id]/route.ts");

// One shared, valid key for tests that only need "some authenticated caller" — reused across
// cases (the a2a_tasks/a2a_task_events tables are wiped between tests, api_keys is not).
const sharedKey = await apiKeysDb.createApiKey("a2a-history-route-test", "machine-history", []);
const AUTH_HEADERS = { authorization: `Bearer ${sharedKey.key}` };

test.beforeEach(() => {
  const db = core.getDbInstance();
  db.exec("DELETE FROM a2a_task_events");
  db.exec("DELETE FROM a2a_tasks");
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_REQUIRE_API_KEY === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE_API_KEY;
});

function seedRow(overrides: Partial<Parameters<typeof a2aTasksDb.upsertA2ATask>[0]> = {}) {
  a2aTasksDb.upsertA2ATask({
    id: "task-1",
    state: "completed",
    skillId: "smart-routing",
    inputJson: JSON.stringify({
      skill: "smart-routing",
      messages: [{ role: "user", content: "hi" }],
    }),
    outputJson: JSON.stringify([{ type: "text", content: "done" }]),
    apiKeyId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:05:00.000Z",
    completedAt: "2026-01-01T00:05:00.000Z",
    ...overrides,
  });
}

test("GET /api/a2a/tasks/history returns 200 with filters applied", async () => {
  seedRow();
  seedRow({
    id: "task-2",
    state: "failed",
    skillId: "other-skill",
    createdAt: "2026-01-02T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
    completedAt: "2026-01-02T00:00:00.000Z",
  });

  const req = new Request(
    "http://localhost/api/a2a/tasks/history?state=completed&skill=smart-routing&limit=10&offset=0",
    { headers: AUTH_HEADERS }
  );
  const res = await historyRoute.GET(req as never);
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    tasks: unknown[];
    total: number;
    limit: number;
    offset: number;
  };
  assert.equal(body.total, 1);
  assert.equal(body.limit, 10);
  assert.equal(body.offset, 0);
  assert.deepEqual(body.tasks, [
    {
      id: "task-1",
      state: "completed",
      skill: "smart-routing",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:05:00.000Z",
      completedAt: "2026-01-01T00:05:00.000Z",
    },
  ]);
});

test("GET history clamps a limit above 500 down to 500 instead of erroring", async () => {
  seedRow();
  const req = new Request("http://localhost/api/a2a/tasks/history?limit=10000", {
    headers: AUTH_HEADERS,
  });
  const res = await historyRoute.GET(req as never);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { limit: number };
  assert.equal(body.limit, 500);
});

test("GET history defaults limit=100 offset=0 when omitted", async () => {
  seedRow();
  const req = new Request("http://localhost/api/a2a/tasks/history", { headers: AUTH_HEADERS });
  const res = await historyRoute.GET(req as never);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { limit: number; offset: number };
  assert.equal(body.limit, 100);
  assert.equal(body.offset, 0);
});

test("GET history rejects an invalid `from` with 400 and no stack trace in the body", async () => {
  const req = new Request("http://localhost/api/a2a/tasks/history?from=not-a-date", {
    headers: AUTH_HEADERS,
  });
  const res = await historyRoute.GET(req as never);
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.ok(body.error?.message, "error body carries a message");
  assert.ok(
    !body.error?.message?.includes("at /"),
    "error body never leaks a stack trace (Hard Rule #12)"
  );
});

test("GET history rejects an invalid `state` with 400", async () => {
  const req = new Request("http://localhost/api/a2a/tasks/history?state=bogus-state", {
    headers: AUTH_HEADERS,
  });
  const res = await historyRoute.GET(req as never);
  assert.equal(res.status, 400);
});

test("GET history owner-scoping: an API-key caller sees only its own + ownerless rows", async () => {
  const ownerAReq = new Request("http://localhost/api/a2a/tasks/history", {
    headers: AUTH_HEADERS,
  });
  const ownerA = resolveA2AOwner(ownerAReq as never);
  assert.ok(ownerA, "the shared key resolves to a stable owner hash");

  seedRow({ id: "owned-by-a", apiKeyId: ownerA ?? null, createdAt: "2026-01-01T00:00:00.000Z" });
  seedRow({ id: "ownerless", apiKeyId: null, createdAt: "2026-01-01T00:01:00.000Z" });
  seedRow({
    id: "owned-by-someone-else",
    apiKeyId: "some-other-owner-hash",
    createdAt: "2026-01-01T00:02:00.000Z",
  });

  const res = await historyRoute.GET(
    new Request("http://localhost/api/a2a/tasks/history", { headers: AUTH_HEADERS }) as never
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { tasks: Array<{ id: string }> };
  const ids = body.tasks.map((t) => t.id).sort();
  assert.deepEqual(ids, ["owned-by-a", "ownerless"]);
});

test("GET history rejects an unkeyed call under REQUIRE_API_KEY=true", async () => {
  const req = new Request("http://localhost/api/a2a/tasks/history");
  const res = await historyRoute.GET(req as never);
  assert.equal(res.status, 401);
});

test("GET /api/a2a/tasks/[id] falls back to history when the task has left the in-memory map", async () => {
  seedRow({ id: "history-only" });
  a2aTasksDb.appendA2ATaskEvent("history-only", "state:submitted");
  a2aTasksDb.appendA2ATaskEvent(
    "history-only",
    "state:completed",
    JSON.stringify({ message: "all done" })
  );

  const req = new Request("http://localhost/api/a2a/tasks/history-only", {
    headers: AUTH_HEADERS,
  });
  const res = await detailRoute.GET(req as never, {
    params: Promise.resolve({ id: "history-only" }),
  });
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    task: {
      id: string;
      skill: string | null;
      state: string;
      input: unknown;
      artifacts: unknown;
      events: Array<{ timestamp: string; state: string; message?: string }>;
      metadata: Record<string, unknown>;
      createdAt: string;
      updatedAt: string;
      expiresAt: string;
    };
  };

  assert.equal(body.task.id, "history-only");
  assert.equal(body.task.skill, "smart-routing");
  assert.equal(body.task.state, "completed");
  assert.deepEqual(body.task.input, {
    skill: "smart-routing",
    messages: [{ role: "user", content: "hi" }],
  });
  assert.deepEqual(body.task.artifacts, [{ type: "text", content: "done" }]);
  assert.deepEqual(body.task.metadata, {});
  assert.equal(body.task.createdAt, "2026-01-01T00:00:00.000Z");
  assert.equal(body.task.updatedAt, "2026-01-01T00:05:00.000Z");
  assert.equal(body.task.expiresAt, "2026-01-01T00:05:00.000Z");

  assert.equal(body.task.events.length, 2);
  assert.equal(body.task.events[0].state, "submitted");
  assert.equal(body.task.events[0].message, undefined);
  assert.equal(body.task.events[1].state, "completed");
  assert.equal(body.task.events[1].message, "all done");
});

test("GET /api/a2a/tasks/[id] falls back gracefully when input_json/output_json are malformed", async () => {
  seedRow({
    id: "history-malformed",
    inputJson: "{not-json",
    outputJson: "{also-not-json",
  });

  const req = new Request("http://localhost/api/a2a/tasks/history-malformed", {
    headers: AUTH_HEADERS,
  });
  const res = await detailRoute.GET(req as never, {
    params: Promise.resolve({ id: "history-malformed" }),
  });
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    task: { input: { skill: string; messages: unknown[] }; artifacts: unknown[] };
  };
  assert.deepEqual(body.task.input, { skill: "smart-routing", messages: [] });
  assert.deepEqual(body.task.artifacts, []);
});

test("GET /api/a2a/tasks/[id] still 404s when the task is absent from both memory and history", async () => {
  const req = new Request("http://localhost/api/a2a/tasks/nowhere", { headers: AUTH_HEADERS });
  const res = await detailRoute.GET(req as never, {
    params: Promise.resolve({ id: "nowhere" }),
  });
  assert.equal(res.status, 404);
});
