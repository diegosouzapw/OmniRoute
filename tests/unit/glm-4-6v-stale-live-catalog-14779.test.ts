import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #14779: "Model 'glm-4.6v' is not available in the active live catalog for
// provider 'glm'. Status: 400" — intermittent, self-resolves after a while.
//
// glm-4.6v is a STATIC registry model (open-sse/config/providers/registry/glm
// -> GLM_SHARED_MODELS). GLM has no real live-discovery endpoint wired
// (no `modelsUrl` in its registry entry, no PROVIDER_MODELS_CONFIG entry for
// bare "glm") — the only way a connection's synced catalog is ever populated
// is a "local_catalog" snapshot (Import/Sync button, or the 6h autoSync cycle
// when enabled), which is just a frozen copy of the static registry at
// snapshot time. Once that snapshot exists and is "fresh" (< 30 days, see
// DEFAULT_SYNCED_CATALOG_STALE_AFTER_MS), getActiveSyncedCatalog marks the
// provider "authoritative" and src/sse/services/model.ts's availability
// check only trusts customMatch / syncedMatch / liveBackedEffortVariant —
// it never falls back to the static REGISTRY match even though the
// registry match (registryMatch) was already computed. Any model added to
// the registry AFTER a connection's last snapshot (e.g. glm-4.6v shipping in
// a newer OmniRoute version than the one running when the user last synced,
// or simply a snapshot taken before glm-4.6v existed) is then rejected with
// the exact error from the report until the snapshot is refreshed — which
// matches the reporter's "works after closing and resuming later" pattern.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14779-glm46v-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "glm-46v-14779-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

const PROVIDER = "glm";
const CONNECTION_ID = "glm-conn-14779";
const REGISTRY_MODEL_MISSING_FROM_SNAPSHOT = "glm-4.6v";
const SNAPSHOTTED_MODEL = "glm-5.3";

async function seedFreshAuthoritativeSnapshotMissingModel() {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections
       (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(CONNECTION_ID, PROVIDER, 1, now, now);
  await replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION_ID, [
    { id: SNAPSHOTTED_MODEL, name: SNAPSHOTTED_MODEL, source: "imported" as const },
  ]);
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14779 a fresh-but-incomplete synced snapshot must not reject a model that is still in the static GLM registry", async () => {
  await seedFreshAuthoritativeSnapshotMissingModel();

  const info = (await getModelInfo(`${PROVIDER}/${REGISTRY_MODEL_MISSING_FROM_SNAPSHOT}`)) as {
    provider: string | null;
    model: string;
    errorType?: string;
    errorMessage?: string;
  };

  assert.notEqual(
    info.errorType,
    "model_not_found",
    `BUG #14779: '${REGISTRY_MODEL_MISSING_FROM_SNAPSHOT}' is a known static-registry GLM model ` +
      `but was rejected because the synced snapshot omits it. Got: ${info.errorMessage}`
  );
  assert.equal(info.provider, PROVIDER);
});

test("#14779 a snapshot that does include a model still resolves it", async () => {
  await seedFreshAuthoritativeSnapshotMissingModel();
  const info = (await getModelInfo(`${PROVIDER}/${SNAPSHOTTED_MODEL}`)) as {
    provider: string | null;
    errorType?: string;
  };
  assert.notEqual(info.errorType, "model_not_found");
  assert.equal(info.provider, PROVIDER);
});
