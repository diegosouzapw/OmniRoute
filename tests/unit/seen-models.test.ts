/**
 * "New models" inbox — seen_models persistence (src/lib/db/seenModels.ts), the
 * sync-path recorder (src/lib/newModelsInbox.ts) and the two management routes
 * (GET /api/models/new, POST /api/models/new/acknowledge).
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any `@/lib/db/*`
 * module loads, so this file never touches ~/.omniroute.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-seen-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const singleton = await import("../../src/lib/db/singleton.ts");
const seen = await import("../../src/lib/db/seenModels.ts");
const inbox = await import("../../src/lib/newModelsInbox.ts");
const newRoute = await import("../../src/app/api/models/new/route.ts");
const ackRoute = await import("../../src/app/api/models/new/acknowledge/route.ts");

type SqliteAdapter = import("../../src/lib/db/adapters/types.ts").SqliteAdapter;

function clearTable() {
  core.getDbInstance().prepare("DELETE FROM seen_models").run();
}

test.beforeEach(() => {
  clearTable();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("first reconcile of a provider seeds its listing as already seen", () => {
  const result = seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }]);
  assert.equal(result.seeded, true);
  assert.deepEqual(result.added, []);
  assert.equal(seen.countUnseenModels(), 0);
  assert.deepEqual(seen.listUnseenModels(), []);
});

test("a model that appears in a later reconcile is flagged as new", () => {
  seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }]);
  const result = seen.reconcileSeenModels("openai", [
    { modelId: "a" },
    { modelId: "b" },
    { modelId: "c", isFree: true },
  ]);
  assert.equal(result.seeded, false);
  assert.equal(result.added.length, 1);
  assert.equal(result.added[0].modelId, "c");
  assert.equal(result.added[0].isFree, true);
  assert.equal(seen.countUnseenModels(), 1);

  const unseen = seen.listUnseenModels();
  assert.equal(unseen.length, 1);
  assert.equal(unseen[0].provider, "openai");
  assert.equal(unseen[0].modelId, "c");
  assert.equal(unseen[0].isFree, true);
  assert.ok(!Number.isNaN(Date.parse(unseen[0].firstSeenAt)));
});

test("acknowledging clears the inbox and a re-reconcile does not re-flag", () => {
  seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }]);
  seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }, { modelId: "c" }]);
  assert.equal(seen.acknowledgeSeenModels([{ provider: "openai", modelId: "c" }]), 1);
  assert.equal(seen.countUnseenModels(), 0);

  const again = seen.reconcileSeenModels("openai", [
    { modelId: "a" },
    { modelId: "b" },
    { modelId: "c" },
  ]);
  assert.deepEqual(again.added, []);
  assert.equal(seen.countUnseenModels(), 0);
});

test("a model that disappears and reappears is not re-flagged", () => {
  seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }]);
  seen.reconcileSeenModels("openai", [{ modelId: "a" }]);
  const back = seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }]);
  assert.deepEqual(back.added, []);
  assert.equal(seen.countUnseenModels(), 0);
});

test("seeding is per provider: connecting a new provider does not flood the inbox", () => {
  seen.reconcileSeenModels("openai", [{ modelId: "a" }]);
  const second = seen.reconcileSeenModels("anthropic", [{ modelId: "x" }, { modelId: "y" }]);
  assert.equal(second.seeded, true);
  assert.equal(seen.countUnseenModels(), 0);

  seen.reconcileSeenModels("anthropic", [{ modelId: "x" }, { modelId: "y" }, { modelId: "z" }]);
  seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }]);
  assert.equal(seen.countUnseenModels(), 2);
});

test("empty / duplicate / blank model ids are ignored", () => {
  const empty = seen.reconcileSeenModels("openai", []);
  assert.equal(empty.seeded, false);
  seen.reconcileSeenModels("openai", [{ modelId: "a" }]);
  const result = seen.reconcileSeenModels("openai", [
    { modelId: "b" },
    { modelId: "b" },
    { modelId: "  " },
  ]);
  assert.equal(result.added.length, 1);
  assert.equal(seen.countUnseenModels(), 1);
});

test("acknowledgeSeenModels() without items acknowledges everything", () => {
  seen.reconcileSeenModels("openai", [{ modelId: "a" }]);
  seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }, { modelId: "c" }]);
  assert.equal(seen.acknowledgeSeenModels(), 2);
  assert.equal(seen.countUnseenModels(), 0);
});

test("recordSyncedModelsForInbox reads ids from raw sync payloads", () => {
  inbox.recordSyncedModelsForInbox("openai", [{ id: "gpt-a" }, "gpt-b", { name: "no-id" }, null]);
  assert.equal(seen.countUnseenModels(), 0);
  inbox.recordSyncedModelsForInbox("openai", [{ id: "gpt-a" }, { id: "gpt-b" }, { id: "gpt-c" }]);
  assert.deepEqual(
    seen.listUnseenModels().map((m) => m.modelId),
    ["gpt-c"]
  );
});

test("recordSyncedModelsForInbox never throws when the DB write fails", () => {
  const real = core.getDbInstance() as SqliteAdapter;
  singleton.setDbInstance({
    ...real,
    prepare() {
      throw new Error("SQLITE_IOERR: disk I/O error");
    },
  } as SqliteAdapter);
  try {
    assert.doesNotThrow(() => inbox.recordSyncedModelsForInbox("openai", [{ id: "a" }]));
  } finally {
    singleton.setDbInstance(real);
  }
});

test("GET /api/models/new groups unread models by provider", async () => {
  seen.reconcileSeenModels("openai", [{ modelId: "a" }]);
  seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }]);
  seen.reconcileSeenModels("anthropic", [{ modelId: "x" }]);
  seen.reconcileSeenModels("anthropic", [{ modelId: "x" }, { modelId: "y" }]);

  const res = await newRoute.GET(new Request("http://localhost/api/models/new"));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.totalUnseen, 2);
  assert.equal(body.groups.length, 2);
  const openai = body.groups.find((g: { provider: string }) => g.provider === "openai");
  assert.ok(openai);
  assert.equal(typeof openai.providerName, "string");
  assert.deepEqual(
    openai.models.map((m: { modelId: string }) => m.modelId),
    ["b"]
  );
});

test("POST /api/models/new/acknowledge acknowledges selected items or everything", async () => {
  seen.reconcileSeenModels("openai", [{ modelId: "a" }]);
  seen.reconcileSeenModels("openai", [{ modelId: "a" }, { modelId: "b" }, { modelId: "c" }]);

  const one = await ackRoute.POST(
    new Request("http://localhost/api/models/new/acknowledge", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ models: [{ provider: "openai", modelId: "b" }] }),
    })
  );
  assert.equal(one.status, 200);
  assert.deepEqual(await one.json(), { ok: true, acknowledged: 1 });
  assert.equal(seen.countUnseenModels(), 1);

  const all = await ackRoute.POST(
    new Request("http://localhost/api/models/new/acknowledge", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ all: true }),
    })
  );
  assert.equal(all.status, 200);
  assert.deepEqual(await all.json(), { ok: true, acknowledged: 1 });
  assert.equal(seen.countUnseenModels(), 0);
});

test("POST /api/models/new/acknowledge rejects an invalid body with 400", async () => {
  const res = await ackRoute.POST(
    new Request("http://localhost/api/models/new/acknowledge", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ models: [{ provider: 1 }] }),
    })
  );
  assert.equal(res.status, 400);
});

test("GET /api/models/new error path does not leak the DB error or stack", async () => {
  const real = core.getDbInstance() as SqliteAdapter;
  const leaky = `SQLITE_CANTOPEN: unable to open database file ${path.join(TEST_DATA_DIR, "storage.sqlite")}`;
  singleton.setDbInstance({
    ...real,
    prepare(sql: string) {
      // Only the inbox query fails; the auth/settings reads keep working.
      if (!/\bseen_models\b/.test(sql)) return real.prepare(sql);
      const err = new Error(leaky);
      err.stack = `Error: ${leaky}\n    at listUnseenModels (/srv/app/seenModels.ts:42:11)`;
      throw err;
    },
  } as SqliteAdapter);
  try {
    const res = await newRoute.GET(new Request("http://localhost/api/models/new"));
    assert.equal(res.status, 500);
    const text = await res.text();
    assert.ok(!text.includes("at /"), "stack frame leaked");
    assert.ok(!text.includes(TEST_DATA_DIR), "DB path leaked");
  } finally {
    singleton.setDbInstance(real);
  }
});
