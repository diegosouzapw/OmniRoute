import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "antigravity-resync-16237-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection, getSyncedAvailableModelsForConnection } =
  await import("../../src/lib/db/models.ts");
const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { __resetReactiveModelSyncForTests } =
  await import("../../src/lib/providerModels/reactiveModelSync.ts");
const { seedAntigravityIdeVersionCache } =
  await import("../../open-sse/services/antigravityVersion.ts");
const literal = "gemini-3.7-flash-high";
const tiered = "gemini-3.7-flash-tiered";
const connectionId = "selected-resync-account";
const originalFetch = globalThis.fetch;

type Wire = { model: string; project: string; requestId: string; request: unknown };

function seed(provider: string) {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections
    (id, provider, is_active, synced_models_at, created_at, updated_at)
    VALUES (?, ?, 1, ?, ?, ?)`
  ).run(connectionId, provider, now, now, now);
  db.prepare("INSERT OR REPLACE INTO key_value (namespace,key,value) VALUES (?, ?, ?)").run(
    "syncedAvailableModels",
    `${provider}:${connectionId}`,
    JSON.stringify([{ id: tiered }])
  );
}

async function executeResync(provider: string, abortAfterSync = false) {
  seed(provider);
  const wires: Wire[] = [];
  const urls: string[] = [];
  const signals: AbortSignal[] = [];
  const telemetry: string[] = [];
  let syncCount = 0;
  const controller = new AbortController();
  const reason = new DOMException("synthetic cancellation", "AbortError");
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    assert.equal(init?.method, "POST");
    if (url.pathname === `/api/providers/${connectionId}/sync-models`) {
      assert.equal(url.hostname, "127.0.0.1");
      assert.equal(init.redirect, "error");
      assert.ok(new Headers(init.headers).has("x-model-sync-internal-auth"));
      syncCount++;
      // Intercept only HTTP transport. The real reactive-sync/scheduler calls this
      // boundary; the real DB writer persists the synthetic discovery result.
      await replaceSyncedAvailableModelsForConnection(provider, connectionId, [{ id: literal }]);
      if (abortAfterSync) controller.abort(reason);
      return Response.json({ syncedModels: 1 });
    }
    assert.equal(url.pathname, "/v1internal:streamGenerateContent");
    assert.equal(url.search, "?alt=sse");
    assert.equal(typeof init.body, "string");
    assert.ok(init.signal instanceof AbortSignal);
    assert.equal(new Headers(init.headers).get("Authorization"), "Bearer synthetic-token");
    urls.push(url.href);
    signals.push(init.signal);
    wires.push(JSON.parse(String(init.body)));
    if (init.signal.aborted) throw init.signal.reason;
    if (wires.length === 1)
      return Response.json({ error: { message: "model not found" } }, { status: 404 });
    return new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"resynced"}]},"finishReason":"STOP"}]}}\n\n',
      {
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  };
  const body = { request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] } };
  const before = structuredClone(body);
  try {
    const pending = new AntigravityExecutor().execute({
      model: literal,
      body,
      stream: true,
      signal: controller.signal,
      credentials: { connectionId, accessToken: "synthetic-token", projectId: "synthetic-project" },
      log: {
        debug(_scope, message) {
          telemetry.push(message);
        },
        warn() {},
        info() {},
      },
    });
    if (abortAfterSync) await assert.rejects(pending, (error) => error === reason);
    else {
      const result = await pending;
      assert.equal(result.response.status, 200);
      assert.match(await result.response.text(), /resynced/);
    }
    assert.deepEqual(body, before, "caller request remains unchanged");
    assert.equal(syncCount, 1);
    assert.equal(wires.length, 2);
    assert.equal(wires[0].model, tiered);
    assert.equal(wires[1].model, literal);
    assert.equal(urls[0], urls[1]);
    assert.notEqual(wires[0].requestId, wires[1].requestId);
    assert.deepEqual(wires[0].request, wires[1].request);
    assert.equal(wires[0].project, wires[1].project);
    assert.equal(telemetry.filter((line) => line.includes("[Antigravity] PhysicalSend")).length, 2);
    const stored = await getSyncedAvailableModelsForConnection(provider, connectionId);
    assert.deepEqual(
      stored.map((entry) => entry.id),
      [literal]
    );
    if (abortAfterSync) assert.equal(signals[1].reason, reason);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.beforeEach(() => {
  __resetReactiveModelSyncForTests();
  seedAntigravityIdeVersionCache("2.1.1");
  const db = getDbInstance();
  db.prepare("DELETE FROM provider_connections").run();
  db.prepare(
    "DELETE FROM key_value WHERE namespace IN ('syncedAvailableModels', 'mitmAlias')"
  ).run();
  db.prepare(
    "INSERT INTO key_value (namespace,key,value) VALUES ('mitmAlias','antigravity',?)"
  ).run(JSON.stringify({ [literal]: `antigravity/${tiered}` }));
});
test.after(() => {
  globalThis.fetch = originalFetch;
  __resetReactiveModelSyncForTests();
  // The real catalog writer schedules reconciliation asynchronously. Let the
  // event loop drain naturally before closing/removing its database.
  process.once("beforeExit", () => {
    resetDbInstance();
    rmSync(dataDir, { recursive: true, force: true });
  });
});

for (const provider of ["antigravity", "agy"]) {
  test(`404 resync re-reads the same ${provider} account before its bounded retry`, async () => {
    await executeResync(provider);
  });
}
test("cancellation after successful resync propagates to the rebuilt retry", async () => {
  await executeResync("antigravity", true);
});
