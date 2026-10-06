/**
 * Regression test for #8958 — /v1/models listed alias-backed models for a
 * compatible provider node (openai-compatible / anthropic-compatible, whose id is a
 * UUID) TWICE: once with the correct `prefix/model` id and once with the raw
 * `<node-uuid>/model` id. The duplicate UUID-prefixed entry appeared even under
 * MODELS_CATALOG_PREFIX_MODE=alias, which should only ever emit alias ids.
 *
 * Root cause: the alias-backed loop in `catalog.ts` built its display prefix as
 * `providerIdToAlias[canonicalProviderId] || providerKey` and never consulted
 * `providerIdToPrefix` (unlike the synced-models / custom-models loops). For a
 * compatible node the alias fell through to the raw UUID `providerKey`, and the
 * dedupe (which only checks `alias/model` and `providerKey/model`, both
 * UUID-prefixed) never matched the correct `prefix/model` row already emitted.
 *
 * Fix: `const alias = providerIdToPrefix[providerKey] || providerIdToAlias[...] ||
 * providerKey;` — the id then collapses to `prefix/model` and the existing dedupe
 * skips the duplicate.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8958-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const aliasesDb = await import("../../src/lib/db/models/aliases.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const NODE_ID = "openai-compatible-chat-550e8400-e29b-41d4-a716-446655440000";
const UUID_SHAPE_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
const CONFIGURED_PREFIX = "fta";
const MODEL_ID = "opc/big-pickle";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedCompatibleNodeWithAlias() {
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "fta (probe)",
    prefix: CONFIGURED_PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "fta-conn",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });

  // Synced entry — produces the correct `fta/opc/big-pickle` row.
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    NODE_ID,
    (connection as { id: string }).id,
    [{ id: MODEL_ID, name: "Big Pickle", source: "imported", supportedEndpoints: ["chat"] }]
  );

  // Alias row pointing at the node UUID — as combos/imports register unprefixed
  // shortcuts. This is what triggered the duplicate `<uuid>/model` entry.
  await aliasesDb.setModelAlias("big-pickle", `${NODE_ID}/${MODEL_ID}`);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#8958: alias-backed model on a compatible node is not duplicated under the raw UUID prefix (alias mode)", async () => {
  await seedCompatibleNodeWithAlias();

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models?prefix=alias")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  assert.equal(response.status, 200);

  const ids = body.data.map((m) => m.id) as string[];

  // The correct prefixed id is present exactly once.
  assert.equal(
    ids.filter((id) => id === `${CONFIGURED_PREFIX}/${MODEL_ID}`).length,
    1,
    `expected exactly one "${CONFIGURED_PREFIX}/${MODEL_ID}" in ${JSON.stringify(ids)}`
  );

  // No id leaks the raw provider-node UUID.
  for (const id of ids) {
    assert.equal(
      id.startsWith(`${NODE_ID}/`),
      false,
      `id "${id}" must not be prefixed with the raw provider-node UUID`
    );
    assert.equal(
      UUID_SHAPE_RE.test(id.split("/")[0]),
      false,
      `id "${id}" must not carry a UUID-shaped provider prefix`
    );
  }
});

test("#8958: alias-backed duplicate is absent in default and dual modes too", async () => {
  await seedCompatibleNodeWithAlias();

  for (const query of ["", "?prefix=dual"]) {
    const response = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request(`http://localhost/api/v1/models${query}`)
    );
    const body = (await response.json()) as { data: Array<Record<string, unknown>> };
    const ids = body.data.map((m) => m.id) as string[];

    assert.ok(
      ids.includes(`${CONFIGURED_PREFIX}/${MODEL_ID}`),
      `mode "${query || "default"}": expected "${CONFIGURED_PREFIX}/${MODEL_ID}"`
    );
    assert.equal(
      ids.some((id) => id.startsWith(`${NODE_ID}/`)),
      false,
      `mode "${query || "default"}": no id may carry the raw provider-node UUID prefix`
    );
  }
});
