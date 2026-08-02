import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-9199-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-9199-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const modelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");
const healthRoute = await import("../../src/app/api/health/ping/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  modelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test(
  "#9199 authenticated cold model catalog yields to an unrelated health request before publication",
  { timeout: 30_000 },
  async () => {
    await settingsDb.updateSettings({
      requireLogin: true,
      requireAuthForModels: true,
      password: "",
    });
    const apiKey = await apiKeysDb.createApiKey("catalog responsiveness", "machine-9199");

    let catalogSettled = false;
    const catalogPromise = modelsRoute
      .GET(
        new Request("http://localhost/v1/models?prefix=alias", {
          headers: { Authorization: `Bearer ${apiKey.key}` },
        })
      )
      .then((response) => {
        catalogSettled = true;
        return response;
      });

    const heartbeat = await new Promise<Response>((resolve, reject) => {
      setImmediate(() => {
        healthRoute.GET().then(resolve, reject);
      });
    });

    assert.equal(heartbeat.status, 200);
    assert.equal(
      catalogSettled,
      false,
      "the catalog monopolized the event loop until publication; unrelated requests could not run"
    );

    const catalog = await catalogPromise;
    assert.equal(catalog.status, 200);
    const body = (await catalog.json()) as { data?: Array<{ id?: string }> };
    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.some((model) => model.id === "auto/best-coding"));
    assert.equal(modelsCatalog.__getCatalogBuilderRunsForTest(), 1);
  }
);
