import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-web-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("kimi-web uses the curated registry catalog without remote discovery", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "kimi-web",
    authType: "apikey",
    name: "kimi-web-curated",
    apiKey: "opaque-current-kimi-token",
  });
  const modelsDb = await import("../../src/lib/db/models.ts");
  await modelsDb.replaceSyncedAvailableModelsForConnection("kimi-web", connection.id, [
    { id: "unexpected-live-model", name: "Unexpected live model", source: "imported" },
  ]);

  let fetchCalls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    throw new Error("kimi-web curated catalog must not perform remote discovery");
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.source, "local_catalog");
    assert.deepEqual(
      body.models.map((model: { id: string }) => model.id),
      ["k3", "k2d6"]
    );
    assert.equal(fetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
