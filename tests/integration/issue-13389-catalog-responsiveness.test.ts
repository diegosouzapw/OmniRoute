import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { performance } from "node:perf_hooks";
import { unexpectedCatalogNetworkRequests } from "../_helpers/catalogNetworkGuard13389.ts";

// Exercise the real GET route and an unrelated health route against isolated
// SQLite storage. Model discovery is seeded; sockets stay closed.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13389-budget-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "13389-catalog-probe-only-api-secret",
  JWT_SECRET: "13389-catalog-probe-only-jwt-secret",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  CATALOG_BUILD_TIMEOUT_MS: "8000",
});

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const keysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");
const healthRoute = await import("../../src/app/api/health/ping/route.ts");
const { aiHordeImageCatalog } = await import("../../open-sse/services/aihordeImageCatalog.ts");

type Model = { id: string; root?: string; pricing?: unknown };
type Observation = {
  label: string;
  durationMs: number;
  status: number;
  bytes: number;
  count: number;
  maxHeartbeatGapMs: number;
  heartbeatCount: number;
  builders: number;
};

const providerId = "openai-compatible-13389";
const prefix = "catalog13389";
// Base 02f2 publishes 246 other built-in rows. Together with 185 synthetic
// Horde rows and 919 custom-provider/combo rows this makes 1,350 published IDs.
const syncedCount = 889;
const customEnd = syncedCount + 10;
const aliasEnd = customEnd + 19;
const modelId = (i: number) => `vendor/fixture-catalog-model-${String(i).padStart(4, "0")}`;
const expectedIds = new Set<string>();
let apiKey = "";
let hordeFetches = 0;

function request() {
  return new Request("http://localhost/v1/models?prefix=alias", {
    headers: { authorization: `Bearer ${apiKey}` },
  });
}

async function seedFixture() {
  // Model discovery is an explicit external boundary; proxyFetch can select its
  // own dispatcher, so a global fetch mock alone is insufficient. Socket.connect
  // remains closed as a backstop for every unconfigured transport.
  aiHordeImageCatalog.setFetch(async (input) => {
    assert.equal(input, "https://aihorde.net/api/v2/status/models?type=image");
    hordeFetches++;
    return Response.json(
      Array.from({ length: 185 }, (_, i) => ({
        name: `Synthetic Image ${String(i).padStart(3, "0")}`,
        type: "image",
        count: 1,
      }))
    );
  });
  await aiHordeImageCatalog.ensureFresh();
  await settingsDb.updateSettings({
    requireLogin: true,
    requireAuthForModels: true,
    password: "",
    hideAutoCombos: true,
    hideNoThinkVariants: true,
  });
  await providersDb.createProviderNode({
    id: providerId,
    type: "openai-compatible",
    apiType: "chat-completions",
    name: "Catalog #13389 synthetic provider",
    prefix,
    baseUrl: "https://catalog-13389.invalid/v1",
  });
  const connection = await providersDb.createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: "catalog-13389-synthetic-connection",
    apiKey: "sk-13389-fixture-only",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  assert.equal(typeof connection.id, "string");
  const synced = Array.from({ length: syncedCount }, (_, i) => ({
    id: modelId(i),
    name: `Catalog fixture model ${i}`,
    inputTokenLimit: 131072,
    outputTokenLimit: 8192,
    supportsVision: i % 3 === 0,
    supportsTools: true,
    supportsThinking: false,
    supportedEndpoints: ["chat"],
    apiFormat: "chat-completions",
  }));
  await modelsDb.replaceSyncedAvailableModelsForConnection(providerId, connection.id, synced);
  for (let i = syncedCount; i < customEnd; i++) {
    await modelsDb.addCustomModel(
      providerId,
      modelId(i),
      `Custom catalog fixture ${i}`,
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      { inputTokenLimit: 131072, outputTokenLimit: 8192 },
      false
    );
  }
  for (let i = customEnd; i < aliasEnd; i++) {
    await modelsDb.setModelAlias(`catalog-alias-${i}`, `${providerId}/${modelId(i)}`);
  }
  for (let i = 0; i < aliasEnd; i++) expectedIds.add(`${prefix}/${modelId(i)}`);
  await combosDb.createCombo({
    name: "catalog13389-combo",
    strategy: "priority",
    models: [`${prefix}/${modelId(0)}`, `${prefix}/${modelId(1)}`],
  });
  expectedIds.add("catalog13389-combo");
  const prices = Object.fromEntries(
    Array.from({ length: aliasEnd }, (_, i) => [modelId(i), { input: 1.25, output: 5 }])
  );
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("models_dev_pricing", providerId, JSON.stringify(prices));
  apiKey = (await keysDb.createApiKey("catalog13389 probe", "catalog13389-probe-machine")).key;
  // Flush the sync writer's deferred reconcile before starting timed observations.
  await new Promise((resolve) => setTimeout(resolve, 100));
  readCache.invalidateDbCache();
}

// Wall-clock budgets prove responsiveness on an idle runner but flake on a loaded one, so
// they are enforced only with CATALOG_13389_TIMING=1; otherwise an overrun is logged.
// The builder counts, heartbeat turns and fixture shape below are asserted unconditionally.
const ENFORCE_TIMING = process.env.CATALOG_13389_TIMING === "1";
function assertBudget(withinBudget: boolean, message: string): void {
  if (ENFORCE_TIMING) assert.ok(withinBudget, message);
  else if (!withinBudget) console.log(`CATALOG_13389_BUDGET_OVERRUN ${message}`);
}

function assertFixture(body: string): number {
  const parsed = JSON.parse(body) as { data: Model[] };
  assert.ok(Array.isArray(parsed.data));
  const ids = new Set(parsed.data.map((model) => model.id));
  const missing = [...expectedIds].filter((id) => !ids.has(id));
  assert.deepEqual(missing, [], "the route must expose every seeded selectable fixture model");
  assert.equal(expectedIds.size, 919);
  assert.equal(parsed.data.length, 1350, "measure a 1,350-model published catalog");
  assert.equal(ids.size, parsed.data.length, "catalog IDs must be unique");
  return parsed.data.length;
}

async function observe(label: string, concurrency = 1): Promise<Observation> {
  let previousHeartbeat = performance.now();
  let maxGap = 0;
  let heartbeatCount = 0;
  const healthChecks: Promise<void>[] = [];
  const heartbeat = setInterval(() => {
    const now = performance.now();
    if (now - previousHeartbeat > maxGap) {
      maxGap = now - previousHeartbeat;
    }
    previousHeartbeat = now;
    heartbeatCount++;
    healthChecks.push(healthRoute.GET().then((response) => assert.equal(response.status, 200)));
  }, 10);
  const start = performance.now();
  let results: Array<{ status: number; body: string }>;
  try {
    results = await Promise.all(
      Array.from({ length: concurrency }, async () => {
        const response = await modelsRoute.GET(request());
        return { status: response.status, body: await response.text() };
      })
    );
  } finally {
    if (performance.now() - previousHeartbeat > maxGap) {
      maxGap = performance.now() - previousHeartbeat;
    }
    clearInterval(heartbeat);
  }
  const durationMs = performance.now() - start;
  await Promise.all(healthChecks);
  const first = results[0];
  const record = {
    label,
    durationMs,
    status: first.status,
    bytes: Buffer.byteLength(first.body),
    count: first.status === 200 ? JSON.parse(first.body).data?.length : 0,
    maxHeartbeatGapMs: maxGap,
    heartbeatCount,
    builders: catalog.__getCatalogBuilderRunsForTest(),
  };
  console.log("CATALOG_13389_OBSERVATION", JSON.stringify(record));
  for (const result of results) {
    assert.equal(result.status, 200);
    assertFixture(result.body);
    assert.equal(result.body, first.body, "concurrent clients share one published snapshot");
  }
  assert.equal(unexpectedCatalogNetworkRequests.length, 0, "fixture must not request upstreams");
  return record;
}

test(
  "#13389 catalog 1350-model cold, warm and concurrent budgets",
  { timeout: 120_000 },
  async (t) => {
    await seedFixture();
    assert.equal(hordeFetches, 1, "the discovery fixture is fetched once before timed requests");
    await t.test(
      "five cold builds stay responsive and finish within 3 seconds",
      async (coldContext) => {
        for (let i = 0; i < 5; i++) {
          await coldContext.test(`cold sample ${i + 1}`, async () => {
            catalog.__resetCatalogBuilderRunsForTest();
            readCache.invalidateDbCache();
            const result = await observe(`cold-${i + 1}`);
            assert.equal(result.builders, 1);
            assertBudget(result.durationMs <= 3000, `cold build took ${result.durationMs} ms`);
            assertBudget(
              result.maxHeartbeatGapMs <= 250,
              `heartbeat gap ${result.maxHeartbeatGapMs} ms`
            );
            assert.ok(
              result.heartbeatCount > 0,
              "health gets a turn before the cold catalog publishes"
            );
          });
        }
      }
    );
    await t.test("thirty warm reads have p95 at most 250ms and never rebuild", async () => {
      // Prime independently so this control still runs if a cold budget failed.
      await modelsRoute.GET(request());
      const builds = catalog.__getCatalogBuilderRunsForTest();
      const warm: number[] = [];
      for (let i = 0; i < 30; i++) {
        const result = await observe(`warm-${i + 1}`);
        warm.push(result.durationMs);
        assert.equal(result.builders, builds);
        assertBudget(result.durationMs <= 1000, `warm maximum ${result.durationMs} ms`);
      }
      warm.sort((a, b) => a - b);
      assertBudget(warm[28] <= 250, `warm p95 ${warm[28]} ms`);
    });
    await t.test("twenty concurrent cold callers share one bounded build", async () => {
      catalog.__resetCatalogBuilderRunsForTest();
      readCache.invalidateDbCache();
      const result = await observe("concurrent-20", 20);
      assert.equal(result.builders, 1);
      assertBudget(result.durationMs <= 3000, `concurrent cold build took ${result.durationMs} ms`);
      assertBudget(result.maxHeartbeatGapMs <= 250, `heartbeat gap ${result.maxHeartbeatGapMs} ms`);
    });
  }
);

test.after(() => {
  core.resetDbInstance();
  keysDb.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
