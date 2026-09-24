/**
 * #12849: NVIDIA (and every other authoritative-live-catalog provider) treated a
 * connection's *synced* model catalog as authoritative forever once populated —
 * no staleness check, no default periodic refresh. A model that is live upstream
 * and present in the current static registry was rejected as "not available in
 * the active live catalog" indefinitely once any historical sync existed.
 *
 * getActiveSyncedCatalog now fails open once a connection's synced catalog
 * exceeds a staleness threshold (default 30 days; overridable via
 * OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS), instead of gating on a frozen
 * point-in-time snapshot forever.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-nvidia-stale-12849-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "nvidia-stale-12849-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { nvidiaProvider } = await import(
  "../../open-sse/config/providers/registry/nvidia/index.ts"
);

const PROVIDER = "nvidia";
const CONNECTION_ID = "nvidia-stale-catalog-12849";
// Live upstream + present in the current static registry (asserted below), but
// deliberately absent from the small "historical sync" catalog seeded here.
const LIVE_MODEL = "moonshotai/kimi-k3";
const STALE_SYNC_ONLY_MODEL = "some-retired-model-that-no-longer-exists";

function connectionRow(): { syncedModelsAt: string | null } {
  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT synced_models_at AS syncedModelsAt FROM provider_connections WHERE id = ?")
    .get(CONNECTION_ID) as { syncedModelsAt: string | null } | undefined;
  if (!row) throw new Error(`connection ${CONNECTION_ID} not found`);
  return row;
}

function ageConnectionSync(daysAgo: number): void {
  const db = core.getDbInstance();
  const agedTimestamp = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
  db.prepare("UPDATE provider_connections SET synced_models_at = ? WHERE id = ?").run(
    agedTimestamp,
    CONNECTION_ID
  );
}

async function seedHistoricalSync(): Promise<void> {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, 1, ?, ?)`
  ).run(CONNECTION_ID, PROVIDER, now, now);

  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION_ID, [
    { id: STALE_SYNC_ONLY_MODEL, name: STALE_SYNC_ONLY_MODEL, source: "imported" },
  ]);
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

  assert.ok(
    nvidiaProvider.models.some((model) => model.id === LIVE_MODEL),
    `precondition: ${LIVE_MODEL} must exist in the current NVIDIA static registry`
  );

  await seedHistoricalSync();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#12849: a fresh synced catalog still gates — a model missing from it is rejected", async () => {
  // Sanity: touchConnectionSyncedModelsAt stamped this sync as fresh already.
  const { syncedModelsAt } = connectionRow();
  assert.ok(syncedModelsAt, "replaceSyncedAvailableModelsForConnection must stamp synced_models_at");

  const resolved = await getModelInfo(`${PROVIDER}/${LIVE_MODEL}`);

  assert.equal(resolved.provider, null);
  assert.equal(resolved.errorType, "model_not_found");
  assert.match(resolved.errorMessage, /active live catalog/i);
});

test("#12849: a stale synced catalog fails open — a live+registry model is no longer rejected", async () => {
  ageConnectionSync(45); // past the 30-day default staleness threshold

  const resolved = await getModelInfo(`${PROVIDER}/${LIVE_MODEL}`);

  assert.equal(
    resolved.provider,
    PROVIDER,
    `expected the stale catalog to fail open, got errorMessage=${resolved.errorMessage}`
  );
  assert.equal(resolved.model, LIVE_MODEL);
});

test("#12849: a stale synced catalog is treated as non-authoritative in getActiveSyncedCatalog", async () => {
  const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");

  ageConnectionSync(45);

  const catalog = await getActiveSyncedCatalog(PROVIDER);

  assert.equal(catalog.authoritative, false);
});

test("#12849: a connection never synced (no timestamp) is non-authoritative, not gated forever", async () => {
  const db = core.getDbInstance();
  db.prepare("UPDATE provider_connections SET synced_models_at = NULL WHERE id = ?").run(
    CONNECTION_ID
  );

  const resolved = await getModelInfo(`${PROVIDER}/${LIVE_MODEL}`);

  assert.equal(resolved.provider, PROVIDER);
  assert.equal(resolved.model, LIVE_MODEL);
});

test("#12849: OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS overrides the default threshold", async () => {
  const previous = process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
  process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS = String(60 * 60 * 1000); // 1 hour
  try {
    ageConnectionSync(1); // 1 day old — stale under the 1-hour override, fresh under the 30-day default

    const resolved = await getModelInfo(`${PROVIDER}/${LIVE_MODEL}`);

    assert.equal(resolved.provider, PROVIDER);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
    else process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS = previous;
  }
});
