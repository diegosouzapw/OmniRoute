/**
 * Regression test for #9034 — /v1/models alias-backed emission block (catalog.ts ~:1298)
 * leaked the raw provider-node UUID as the published model `id` for alias-backed models
 * (synced via `syncManagedAvailableModelAliases`), instead of the operator-configured
 * prefix. The #8327 fix only covered `owned_by`; the routable model `id` was missed.
 *
 * Root cause: the alias-backed block builds `alias` as
 * `providerIdToAlias[canonicalProviderId] || providerKey` and never consults
 * `providerIdToPrefix`. For a compatible provider node, the storage prefix is the raw
 * node UUID (managedAvailableModels.getProviderStoragePrefix()), so `providerKey` is the
 * node UUID and the catalog re-publishes it as the public model `id` (e.g.
 * `openai-compatible-chat-550e8400-.../kimi-k2`) instead of the configured prefix.
 *
 * Fix: resolve `const prefix = providerIdToPrefix[providerKey] ?? providerIdToPrefix[canonicalProviderId]`
 * and `const alias = prefix || providerIdToAlias[canonicalProviderId] || providerKey`,
 * plus add `!prefix` to the includeCanonical guard (mirroring synced :896 / custom :1245).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9034-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Type-only imports for the module shape
type CoreModule = typeof import("../../src/lib/db/core.ts");
type ProvidersDbModule = typeof import("../../src/lib/db/providers.ts");
type ModelsDbModule = typeof import("../../src/lib/db/models.ts");
type CatalogModule = typeof import("../../src/app/api/v1/models/catalog.ts");
type ManagedAvailableModelsModule =
  typeof import("../../src/lib/providerModels/managedAvailableModels.ts");

let core: CoreModule;
let providersDb: ProvidersDbModule;
let modelsDb: ModelsDbModule;
let v1ModelsCatalog: CatalogModule;
let managedAvailableModels: ManagedAvailableModelsModule;

// A realistic provider-node id shape, matching `openai-compatible-chat-<uuid>`
const NODE_ID = "openai-compatible-chat-550e8400-e29b-41d4-a716-446655440000";
const UUID_SHAPE_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
const CONFIGURED_PREFIX = "myprefix";
const MODEL_NAME = "kimi-k2";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.before(async () => {
  core = await import("../../src/lib/db/core.ts");
  providersDb = await import("../../src/lib/db/providers.ts");
  modelsDb = await import("../../src/lib/db/models.ts");
  v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
  managedAvailableModels = await import("../../src/lib/providerModels/managedAvailableModels.ts");
  await resetStorage();
});

test.after(async () => {
  if (core) core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#9034: alias-backed model id must use the configured prefix, not the raw provider-node UUID", async () => {
  // Create an openai-compatible provider node with a configured prefix
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "test node (probe)",
    prefix: CONFIGURED_PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "test-conn",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });

  // The real producer path: syncManagedAvailableModelAliases stores aliases as
  // `<UUID>/<modelId>` (getProviderStoragePrefix returns raw node id for compatible providers).
  // This creates a key_value alias entry that the alias-backed block in catalog.ts reads.
  await managedAvailableModels.syncManagedAvailableModelAliases(NODE_ID, [MODEL_NAME]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const ids = body.data.map((m) => m.id as string);

  assert.equal(response.status, 200);

  // (a) The configured prefix must be used in the model id
  const expectedId = `${CONFIGURED_PREFIX}/${MODEL_NAME}`;
  assert.ok(
    ids.includes(expectedId),
    `expected model id "${expectedId}" to exist in /v1/models — got: ${JSON.stringify(ids)}`
  );

  // (b) No entry id should start with the raw node UUID when a prefix is configured
  for (const id of ids) {
    assert.equal(
      id.startsWith(NODE_ID),
      false,
      `entry id "${id}" must not start with the raw provider-node UUID "${NODE_ID}" when a prefix ("${CONFIGURED_PREFIX}") is configured`
    );
  }
});
