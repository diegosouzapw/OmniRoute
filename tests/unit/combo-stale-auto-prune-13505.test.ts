import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #13505 follow-up: opt-in auto-prune of the stale combo steps a sync flags.
// OFF (default) only flags; ON removes them after a successful sync; a failed
// or degraded sync never removes anything.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13505-auto-prune-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auto-prune-13505-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const { COMBO_AUTO_PRUNE_FLAG } = await import("../../src/lib/combos/staleModelPrune.ts");

const PROVIDER = "openrouter";
const PRUNED_ACTION = "combo.stale_model_ref.pruned";
const originalFetch = globalThis.fetch;

type Ref = { comboName: string; model: string };
type SyncBody = { staleComboRefs?: Ref[]; prunedComboRefs?: Ref[] };

async function seedConnection(modelIds: string[]) {
  const connection = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "MAIN",
    apiKey: "test-key",
  });
  const connectionId = String(connection?.id);
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    PROVIDER,
    connectionId,
    modelIds.map((id) => ({ id, name: id, source: "imported" as const }))
  );
  return connectionId;
}

async function comboModels(name: string) {
  const combo = (await combosDb.getCombos()).find((entry) => entry.name === name);
  return (combo?.models as Array<{ model?: string } | string>).map((step) =>
    typeof step === "string" ? step : step.model
  );
}

function syncWith(connectionId: string, upstream: () => Response) {
  globalThis.fetch = async (url) => {
    if (String(url).includes("__readiness_probe__")) return new Response(null, { status: 404 });
    return upstream();
  };
  return modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );
}

const keptOnly = () => Response.json({ models: [{ id: "kept-model", name: "kept-model" }] });

async function seedCombos() {
  const connectionId = await seedConnection(["kept-model", "dropped-model"]);
  await combosDb.createCombo({
    name: "mixed",
    strategy: "priority",
    models: [`${PROVIDER}/kept-model`, `${PROVIDER}/dropped-model`],
  });
  await combosDb.createCombo({
    name: "mixed-b",
    strategy: "priority",
    models: [`${PROVIDER}/dropped-model`, `${PROVIDER}/kept-model`],
  });
  await combosDb.createCombo({
    name: "only-stale",
    strategy: "priority",
    models: [`${PROVIDER}/dropped-model`],
  });
  return connectionId;
}

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env[COMBO_AUTO_PRUNE_FLAG];
  modelSyncRoute.__resetLoopbackReadinessForTests?.();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  delete process.env[COMBO_AUTO_PRUNE_FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("auto-prune OFF (default) only flags stale steps", async () => {
  const connectionId = await seedCombos();

  const response = await syncWith(connectionId, keptOnly);
  assert.equal(response.status, 200);
  const body = (await response.json()) as SyncBody;
  assert.equal(body.staleComboRefs?.length, 3);
  assert.deepEqual(body.prunedComboRefs, []);
  assert.deepEqual(await comboModels("mixed"), [
    `${PROVIDER}/kept-model`,
    `${PROVIDER}/dropped-model`,
  ]);
  assert.equal(compliance.getAuditLog({ action: PRUNED_ACTION }).length, 0);
});

test("auto-prune ON removes stale steps, keeps valid ones, audits each removal", async () => {
  process.env[COMBO_AUTO_PRUNE_FLAG] = "true";
  const connectionId = await seedCombos();

  const response = await syncWith(connectionId, keptOnly);
  assert.equal(response.status, 200);
  const body = (await response.json()) as SyncBody;
  assert.deepEqual(
    body.prunedComboRefs?.map((ref) => [ref.comboName, ref.model]),
    [
      ["mixed", `${PROVIDER}/dropped-model`],
      ["mixed-b", `${PROVIDER}/dropped-model`],
    ]
  );
  // Pruning never empties a combo: its sole stale step stays flagged instead.
  assert.deepEqual(
    body.staleComboRefs?.map((ref) => [ref.comboName, ref.model]),
    [["only-stale", `${PROVIDER}/dropped-model`]]
  );
  assert.deepEqual(await comboModels("mixed"), [`${PROVIDER}/kept-model`]);
  assert.deepEqual(await comboModels("mixed-b"), [`${PROVIDER}/kept-model`]);
  assert.deepEqual(await comboModels("only-stale"), [`${PROVIDER}/dropped-model`]);

  const audit = compliance.getAuditLog({ action: PRUNED_ACTION });
  assert.deepEqual(audit.map((entry) => entry.target).sort(), ["mixed", "mixed-b"]);
});

const SKIPPED_SYNCS: Array<[string, () => Response]> = [
  ["failed", () => Response.json({ error: "upstream down" }, { status: 503 })],
  ["degraded", () => Response.json({ models: [], source: "local_catalog" })],
];

for (const [label, upstream] of SKIPPED_SYNCS) {
  test(`auto-prune ON removes nothing on a ${label} sync`, async () => {
    process.env[COMBO_AUTO_PRUNE_FLAG] = "true";
    const connectionId = await seedConnection(["kept-model"]);
    await combosDb.createCombo({
      name: `${label}-sync`,
      strategy: "priority",
      models: [`${PROVIDER}/kept-model`, `${PROVIDER}/gone-model`],
    });
    const before = await comboModels(`${label}-sync`);

    const response = await syncWith(connectionId, upstream);
    assert.notEqual(response.status, 200);
    assert.deepEqual(await comboModels(`${label}-sync`), before);
    assert.equal(compliance.getAuditLog({ action: PRUNED_ACTION }).length, 0);
  });
}
