/**
 * "New models" inbox — the model-sync route feeds seen_models: the first sync of a
 * provider seeds its baseline, a later sync that lists an extra model leaves that
 * model unread in the inbox.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any `@/lib/db/*`
 * module loads, so this file never touches ~/.omniroute.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-seen-models-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "test-seen-models-sync-secret-" + Date.now();
}

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const seen = await import("../../src/lib/db/seenModels.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function syncWith(connectionId: string, modelIds: string[]) {
  globalThis.fetch = async (url) => {
    if (String(url).includes("__readiness_probe__")) return new Response(null, { status: 404 });
    return Response.json({ models: modelIds.map((id) => ({ id, name: id })) });
  };
  try {
    const response = await modelSyncRoute.POST(
      new Request(`http://localhost/api/providers/${connectionId}/sync-models`, {
        method: "POST",
        headers: scheduler.buildModelSyncInternalHeaders(),
      }),
      { params: Promise.resolve({ id: connectionId }) }
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("model sync seeds the inbox on first sync and flags models added later", async () => {
  modelSyncRoute.__resetLoopbackReadinessForTests();
  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "MAIN",
    displayName: "OpenRouter Main",
    apiKey: "test-key",
  });

  await syncWith(connection.id, ["vendor/model-a", "vendor/model-b"]);
  assert.equal(seen.countUnseenModels(), 0, "first sync must only seed the baseline");

  await syncWith(connection.id, ["vendor/model-a", "vendor/model-b", "vendor/model-c"]);
  const unseen = seen.listUnseenModels();
  assert.deepEqual(
    unseen.map((m) => [m.provider, m.modelId]),
    [["openrouter", "vendor/model-c"]]
  );
});
