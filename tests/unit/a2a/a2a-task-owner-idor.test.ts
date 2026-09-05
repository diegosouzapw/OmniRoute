/**
 * GHSA-jcm5-6wpp-wjj8 — A2A task IDOR + unauthenticated REST task routes.
 *
 * Two gaps closed here:
 *  1. The REST routes /api/a2a/tasks/[id] and /api/a2a/tasks/[id]/cancel had
 *     NO auth call at all — open regardless of configuration. They now share
 *     the JSON-RPC surface's authentication (REQUIRE_API_KEY posture).
 *  2. Tasks lived in an owner-less Map: any caller could read/cancel any
 *     task by id. Tasks now bind to an owner (hashed API key) at creation and
 *     reads/cancels/lists are owner-scoped. Ownerless tasks (keyless
 *     local-first posture) stay visible to everyone — by design.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/a2a-task-owner-idor.test.ts
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-a2a-idor-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a2a-idor-test-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const { A2ATaskManager, getTaskManager } = await import("../../../src/lib/a2a/taskManager.ts");
const { resolveA2AOwner } = await import("../../../src/lib/a2a/authenticate.ts");
const restGet = await import("../../../src/app/api/a2a/tasks/[id]/route.ts");

const ORIGINAL_REQUIRE = process.env.REQUIRE_API_KEY;

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_REQUIRE === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE;
});

function makeManager() {
  const tm = new A2ATaskManager(5);
  // Prevent the per-instance cleanup interval from keeping the process alive.
  clearInterval((tm as unknown as { cleanupInterval: NodeJS.Timeout }).cleanupInterval);
  return tm;
}

describe("A2ATaskManager — owner scoping (GHSA-jcm5)", () => {
  it("another principal cannot READ an owned task (same undefined as missing)", () => {
    const tm = makeManager();
    const task = tm.createTask({ skill: "smart-routing", messages: [] }, "owner-a");
    assert.equal(tm.getTask(task.id, "owner-a")?.id, task.id, "the owner still reads it");
    assert.equal(tm.getTask(task.id, "owner-b"), undefined, "another owner gets undefined");
  });

  it("another principal cannot CANCEL an owned task (not-found error, no existence oracle)", () => {
    const tm = makeManager();
    const task = tm.createTask({ skill: "smart-routing", messages: [] }, "owner-a");
    assert.throws(() => tm.cancelTask(task.id, "owner-b"), /not found/);
    assert.equal(tm.getTask(task.id, "owner-a")?.state, "submitted", "task untouched");
    assert.equal(tm.cancelTask(task.id, "owner-a").state, "cancelled", "the owner can cancel");
  });

  it("owner-scoped listTasks hides other principals' owned tasks", () => {
    const tm = makeManager();
    tm.createTask({ skill: "s1", messages: [] }, "owner-a");
    const mine = tm.createTask({ skill: "s1", messages: [] }, "owner-b");
    const listed = tm.listTasks(undefined, "owner-b");
    assert.deepEqual(
      listed.map((t) => t.id),
      [mine.id]
    );
    // No owner scope (management/dashboard path) still sees everything.
    assert.equal(tm.listTasks(undefined).length, 2);
  });

  it("ownerless tasks stay visible to everyone (keyless local-first posture)", () => {
    const tm = makeManager();
    const task = tm.createTask({ skill: "smart-routing", messages: [] });
    assert.equal(tm.getTask(task.id, "anyone")?.id, task.id);
    assert.equal(tm.getTask(task.id)?.id, task.id);
    assert.equal(tm.cancelTask(task.id, "anyone").state, "cancelled");
  });
});

describe("REST /api/a2a/tasks/[id] — authentication (GHSA-jcm5)", () => {
  it("rejects an unkeyed call when REQUIRE_API_KEY=true (was: no auth at all)", async () => {
    process.env.REQUIRE_API_KEY = "true";
    delete process.env.OMNIROUTE_API_KEY;
    const res = await restGet.GET(new Request("http://localhost/api/a2a/tasks/abc") as never, {
      params: Promise.resolve({ id: "abc" }),
    });
    assert.equal(res.status, 401);
  });

  it("serves a keyed call under REQUIRE_API_KEY=true", async () => {
    process.env.REQUIRE_API_KEY = "true";
    const key = await apiKeysDb.createApiKey("a2a-rest-client", "machine-rest", []);
    const res = await restGet.GET(
      new Request("http://localhost/api/a2a/tasks/definitely-missing", {
        headers: { authorization: `Bearer ${key.key}` },
      }) as never,
      { params: Promise.resolve({ id: "definitely-missing" }) }
    );
    // Authenticated — the 404 now comes from the task lookup, not the auth gate.
    assert.equal(res.status, 404);
  });

  it("keyed caller gets 404 for another principal's task (route-level IDOR, GHSA-jcm5)", async () => {
    process.env.REQUIRE_API_KEY = "true";
    const tm = getTaskManager();
    // A task owned by a DIFFERENT principal than the caller's key hash.
    const foreign = tm.createTask({ skill: "smart-routing", messages: [] }, "some-other-owner");
    const key = await apiKeysDb.createApiKey("a2a-rest-idor", "machine-idor", []);
    const req = new Request(`http://localhost/api/a2a/tasks/${foreign.id}`, {
      headers: { authorization: `Bearer ${key.key}` },
    });
    const res = await restGet.GET(req as never, { params: Promise.resolve({ id: foreign.id }) });
    assert.equal(res.status, 404, "another principal's task is invisible");

    // And the same task IS visible to its owner (owner hash derived from the key).
    const owned = tm.createTask(
      { skill: "smart-routing", messages: [] },
      resolveA2AOwner(req as never)
    );
    const res2 = await restGet.GET(
      new Request(`http://localhost/api/a2a/tasks/${owned.id}`, {
        headers: { authorization: `Bearer ${key.key}` },
      }) as never,
      { params: Promise.resolve({ id: owned.id }) }
    );
    assert.equal(res2.status, 200, "the owner reads its own task");
  });
});
