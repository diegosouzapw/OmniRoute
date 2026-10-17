import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #13505: after a successful sync, combo steps pinned to models that the
// provider's live catalog no longer lists are flagged (never pruned).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13505-stale-refs-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "stale-refs-13505-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const builderOptionsRoute = await import("../../src/app/api/combos/builder/options/route.ts");
const { findStaleComboModelRefs, findAllStaleComboModelRefs } =
  await import("../../src/lib/combos/staleModelRefs.ts");

const PROVIDER = "openrouter";
const AUDIT_ACTION = "combo.stale_model_refs.flagged";
const originalFetch = globalThis.fetch;

type SyncBody = { staleComboRefs?: Array<{ model: string }> };

async function seedConnection(models: Array<{ id: string; supportedThinkingEfforts?: string[] }>) {
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
    models.map((model) => ({ name: model.id, source: "imported" as const, ...model }))
  );
  return connectionId;
}

async function comboModels(name: string) {
  const combo = (await combosDb.getCombos()).find((entry) => entry.name === name);
  return JSON.stringify(combo?.models);
}

function postSync(connectionId: string) {
  return modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );
}

function mockModelsFetch(response: () => Response) {
  globalThis.fetch = async (url) => {
    if (String(url).includes("__readiness_probe__")) return new Response(null, { status: 404 });
    return response();
  };
}

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  modelSyncRoute.__resetLoopbackReadinessForTests?.();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13505 flags only steps pinned to models missing from the synced catalog", async () => {
  await seedConnection([
    { id: "live-model" },
    { id: "thinker", supportedThinkingEfforts: ["low", "high"] },
  ]);
  await modelsDb.addCustomModel(PROVIDER, "my-custom-model", "Custom");
  await combosDb.createCombo({
    name: "mixed-13505",
    strategy: "priority",
    models: [
      `${PROVIDER}/live-model`,
      `${PROVIDER}/retired-model`,
      `${PROVIDER}/my-custom-model`,
      `${PROVIDER}/thinker-high`,
      "openai/not-synced-here",
    ],
  });
  const before = await comboModels("mixed-13505");

  const stale = await findStaleComboModelRefs(PROVIDER);

  assert.deepEqual(
    stale.map((ref) => [ref.comboName, ref.model]),
    [["mixed-13505", `${PROVIDER}/retired-model`]]
  );
  assert.equal(await comboModels("mixed-13505"), before, "detection must not modify combos");
});

test("#13505 flags nothing without an authoritative catalog", async () => {
  await combosDb.createCombo({
    name: "no-catalog-13505",
    strategy: "priority",
    models: [`${PROVIDER}/anything`],
  });

  assert.deepEqual(await findStaleComboModelRefs(PROVIDER), []);
});

test("#13505 successful sync returns staleComboRefs and writes one audit entry", async () => {
  const connectionId = await seedConnection([{ id: "kept-model" }, { id: "dropped-model" }]);
  await combosDb.createCombo({
    name: "sync-13505",
    strategy: "priority",
    models: [`${PROVIDER}/kept-model`, `${PROVIDER}/dropped-model`],
  });
  const before = await comboModels("sync-13505");
  mockModelsFetch(() => Response.json({ models: [{ id: "kept-model", name: "kept-model" }] }));

  const response = await postSync(connectionId);
  assert.equal(response.status, 200);
  const body = (await response.json()) as SyncBody;
  assert.deepEqual(
    body.staleComboRefs?.map((ref) => ref.model),
    [`${PROVIDER}/dropped-model`]
  );
  assert.equal(await comboModels("sync-13505"), before, "sync must not prune combo steps");

  const audit = compliance.getAuditLog({ action: AUDIT_ACTION });
  assert.equal(audit.length, 1);
  assert.equal(audit[0].target, PROVIDER);

  // An unchanged follow-up sync still reports the ref but does not repeat the audit entry.
  const again = (await (await postSync(connectionId)).json()) as SyncBody;
  assert.equal(again.staleComboRefs?.length, 1);
  assert.equal(compliance.getAuditLog({ action: AUDIT_ACTION }).length, 1);
});

test("#13505 builder options expose stale refs across providers for the editor badge", async () => {
  await seedConnection([{ id: "live-model" }]);
  await combosDb.createCombo({
    name: "editor-13505",
    strategy: "priority",
    models: [
      `${PROVIDER}/live-model`,
      `${PROVIDER}/gone-model`,
      { kind: "provider-wildcard", providerId: PROVIDER },
      "openai/no-catalog-here",
    ],
  });

  const all = await findAllStaleComboModelRefs();
  assert.deepEqual(
    all.map((ref) => [ref.comboName, ref.model]),
    [["editor-13505", `${PROVIDER}/gone-model`]]
  );

  const response = await builderOptionsRoute.GET(
    new Request("http://localhost/api/combos/builder/options")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as SyncBody;
  assert.deepEqual(
    body.staleComboRefs?.map((ref) => ref.model),
    [`${PROVIDER}/gone-model`]
  );
});

const SKIPPED_SYNCS: Array<[string, () => Response]> = [
  ["failed", () => Response.json({ error: "upstream down" }, { status: 503 })],
  ["degraded", () => Response.json({ models: [], source: "local_catalog" })],
];

for (const [label, upstream] of SKIPPED_SYNCS) {
  test(`#13505 ${label} sync skips the check and leaves combos untouched`, async () => {
    const connectionId = await seedConnection([{ id: "kept-model" }]);
    await combosDb.createCombo({
      name: `${label}-13505`,
      strategy: "priority",
      models: [`${PROVIDER}/gone-model`],
    });
    const before = await comboModels(`${label}-13505`);
    mockModelsFetch(upstream);

    const response = await postSync(connectionId);
    assert.notEqual(response.status, 200);
    const body = (await response.json()) as SyncBody;
    assert.equal("staleComboRefs" in body, false);
    assert.equal(await comboModels(`${label}-13505`), before);
    assert.equal(compliance.getAuditLog({ action: AUDIT_ACTION }).length, 0);
  });
}
