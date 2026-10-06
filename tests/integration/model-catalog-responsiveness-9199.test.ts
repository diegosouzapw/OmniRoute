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
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const modelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");
const healthRoute = await import("../../src/app/api/health/ping/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  modelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test(
  "#9199 cold catalog snapshots models.dev pricing once and yields before enrichment",
  { timeout: 30_000 },
  async () => {
    await settingsDb.updateSettings({
      requireLogin: true,
      requireAuthForModels: true,
      password: "",
    });
    await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "openai-catalog-9199",
      apiKey: "sk-openai-catalog-9199",
      isActive: true,
      testStatus: "active",
      rateLimitedUntil: null,
      providerSpecificData: {},
    });
    const apiKey = await apiKeysDb.createApiKey("catalog pricing", "machine-pricing-9199");
    const db = core.getDbInstance();
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      "models_dev_pricing",
      "openai",
      JSON.stringify({ "gpt-4o": { input: 1.25, output: 5 } })
    );

    const originalPrepare = db.prepare;
    const callPrepare = originalPrepare.bind(db);
    let pricingReads = 0;
    let catalogSettled = false;
    let heartbeatScheduled = false;
    let resolveHeartbeat!: (response: Response) => void;
    let rejectHeartbeat!: (error: unknown) => void;
    const heartbeatPromise = new Promise<Response>((resolve, reject) => {
      resolveHeartbeat = resolve;
      rejectHeartbeat = reject;
    });

    (db as unknown as { prepare: typeof db.prepare }).prepare = ((sql: string) => {
      const normalized = String(sql).replace(/\s+/g, " ").trim();
      if (
        normalized === "SELECT key, value FROM key_value WHERE namespace = 'models_dev_pricing'"
      ) {
        pricingReads++;
        if (!heartbeatScheduled) {
          heartbeatScheduled = true;
          setImmediate(() => {
            healthRoute.GET().then(resolveHeartbeat, rejectHeartbeat);
          });
        }
      }
      return callPrepare(sql);
    }) as typeof db.prepare;

    let catalog!: Response;
    let heartbeat!: Response;
    let catalogSettledBeforeHeartbeat = true;
    try {
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
      heartbeat = await heartbeatPromise;
      catalogSettledBeforeHeartbeat = catalogSettled;
      catalog = await catalogPromise;
    } finally {
      (db as unknown as { prepare: typeof db.prepare }).prepare = originalPrepare;
    }

    assert.equal(catalog.status, 200);
    assert.equal(heartbeat.status, 200);
    assert.equal(pricingReads, 1, "one catalog build must parse one build-local pricing snapshot");
    assert.equal(
      catalogSettledBeforeHeartbeat,
      false,
      "a heartbeat queued by the pricing read must run before catalog enrichment publishes"
    );

    const body = (await catalog.json()) as {
      data?: Array<{
        root?: string;
        owned_by?: string;
        pricing?: { input?: number; output?: number };
      }>;
    };
    assert.ok(Array.isArray(body.data));
    const priced = body.data.find(
      (model) => model.root === "gpt-4o" && model.owned_by === "openai"
    );
    assert.deepEqual(priced?.pricing, { input: 1.25, output: 5 });
  }
);
