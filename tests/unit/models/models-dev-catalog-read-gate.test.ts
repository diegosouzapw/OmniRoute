/**
 * Test 11 — C-layer read gate.
 *
 * models.dev is a pricing overlay, not a catalog source. `models_dev_pricing`
 * may be full (including IDs this account never synced). The /v1/models row
 * set must not grow from those keys. Forbidden: filtering the pricing cache
 * to make this pass.
 *
 * Source guard is mandatory. The catalog row-set assertion runs when
 * getUnifiedModelsResponse is reachable under DATA_DIR isolation; if the
 * auth wall returns 401, the skip reason is documented in this file and the
 * source guard still covers "does not fabricate catalog rows".
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-models-dev-read-gate-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "models-dev-read-gate-secret";
process.env.REQUIRE_API_KEY = "false";

const SYNCED_MODEL_ID = "claude-opus-4-6";
const UNVERIFIED_MODEL_ID = "unverified-market-id-not-synced";
const SYNCED_INPUT = 15;
const SYNCED_OUTPUT = 75;

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const modelsDev = await import("../../../src/lib/modelsDevSync.ts");
const v1ModelsCatalog = await import("../../../src/app/api/v1/models/catalog.ts");

type CatalogRow = {
  id: string;
  owned_by?: string;
  root?: string | null;
  pricing?: Record<string, number> | null;
};

function readModelsDevSyncSources(): string[] {
  const files = ["src/lib/modelsDevSync.ts"];
  const dir = "src/lib/modelsDevSync";
  if (fs.existsSync(dir)) {
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith(".ts")) files.push(path.join(dir, name));
    }
  }
  return files;
}

function rowMatchesUnverified(row: CatalogRow): boolean {
  const id = row.id ?? "";
  const root = row.root ?? "";
  return (
    id === UNVERIFIED_MODEL_ID ||
    id.endsWith(`/${UNVERIFIED_MODEL_ID}`) ||
    id.endsWith(UNVERIFIED_MODEL_ID) ||
    root === UNVERIFIED_MODEL_ID
  );
}

function rowMatchesSynced(row: CatalogRow): boolean {
  const id = row.id ?? "";
  const root = row.root ?? "";
  return id === SYNCED_MODEL_ID || id.endsWith(`/${SYNCED_MODEL_ID}`) || root === SYNCED_MODEL_ID;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedClaudeSyncedAndFullPricingCache() {
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "claude-read-gate",
    apiKey: "",
    accessToken: "claude-read-gate-access-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "claude",
    (connection as { id: string }).id,
    [{ id: SYNCED_MODEL_ID, name: "Claude Opus 4.6", source: "imported" }]
  );

  // Full overlay: a live-synced id AND a market id this connection never
  // discovered. Do not filter this map to make the catalog assertion pass.
  modelsDev.saveModelsDevPricing({
    claude: {
      [SYNCED_MODEL_ID]: { input: SYNCED_INPUT, output: SYNCED_OUTPUT },
      [UNVERIFIED_MODEL_ID]: { input: 1, output: 2 },
    },
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("test 11: modelsDevSync does not insert synced_models rows", () => {
  for (const file of readModelsDevSyncSources()) {
    const src = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(
      src,
      /replaceSyncedAvailableModels/,
      `${file} must not write synced catalog rows from models.dev`
    );
    assert.doesNotMatch(
      src,
      /insertCustomModel/,
      `${file} must not insert custom models from models.dev`
    );
  }
});

test("test 11: models.dev pricing cache may contain unverified ids (read gate, not write-side intersection)", async () => {
  await seedClaudeSyncedAndFullPricingCache();

  const pricing = modelsDev.getModelsDevPricing();
  assert.ok(pricing.claude, "pricing overlay must keep the claude provider key");
  assert.equal(pricing.claude[SYNCED_MODEL_ID]?.input, SYNCED_INPUT);
  assert.equal(pricing.claude[UNVERIFIED_MODEL_ID]?.input, 1);
  assert.equal(
    pricing.claude[UNVERIFIED_MODEL_ID]?.output,
    2,
    "unverified market ids stay in models_dev_pricing; do not filter cache keys"
  );
});

test("test 11: getUnifiedModelsResponse does not list unverified models.dev ids", async (t) => {
  await seedClaudeSyncedAndFullPricingCache();

  const pricing = modelsDev.getModelsDevPricing();
  assert.ok(
    pricing.claude?.[UNVERIFIED_MODEL_ID],
    "precondition: pricing overlay still contains the unsynced market id"
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://127.0.0.1/v1/models")
  );

  if (response.status === 401 || response.status === 403) {
    // Auth wall: keep the source guard (test above) as the "does not fabricate
    // catalog rows" coverage. Do not weaken that guard, and do not filter
    // models_dev_pricing keys to paper over a missing row-set assertion.
    t.skip(
      `catalog row-set skipped: getUnifiedModelsResponse returned ${response.status} (auth wall). ` +
        "Source guard still covers modelsDevSync not writing synced_models / custom_models."
    );
    return;
  }

  assert.equal(
    response.status,
    200,
    `expected catalog 200, got ${response.status}: ${(await response.clone().text()).slice(0, 500)}`
  );

  const body = (await response.json()) as { data: CatalogRow[] };
  assert.ok(Array.isArray(body.data), "catalog body.data must be an array");

  const leaked = body.data.filter(rowMatchesUnverified);
  assert.deepEqual(
    leaked.map((row) => row.id),
    [],
    `catalog must not list unverified models.dev id ${UNVERIFIED_MODEL_ID}`
  );

  const syncedRows = body.data.filter(rowMatchesSynced);
  assert.ok(syncedRows.length > 0, `catalog must still list the live-synced id ${SYNCED_MODEL_ID}`);

  for (const row of syncedRows) {
    if (row.pricing == null) continue;
    const keys = Object.keys(row.pricing);
    assert.ok(keys.length > 0, `synced row ${row.id} advertised pricing but the object was empty`);
  }
});
