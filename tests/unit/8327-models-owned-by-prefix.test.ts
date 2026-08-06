/**
 * Regression test for #8327 — /v1/models leaked the internal provider-node UUID as
 * `owned_by` for synced/custom models on openai-compatible / anthropic-compatible
 * provider nodes, instead of honoring the operator-configured `prefix`.
 *
 * Root cause: `catalog.ts` builds two different identifiers per model entry —
 * `alias` (which DOES receive `providerIdToPrefix` and correctly becomes the
 * configured prefix for the published `id` field) and `canonicalProviderId` (via
 * `resolveCanonicalProviderId()`, catalogProviderMaps.ts), which is used for
 * `owned_by` and never consulted `providerIdToPrefix` at all — for a compatible
 * provider node (UUID id, not present in the static AI_PROVIDERS/PROVIDER_MODELS
 * alias maps) it fell through every lookup and returned the raw UUID verbatim.
 *
 * Fix: resolve `owned_by` through a dedicated `resolvePublicOwnerId()` helper that
 * checks `providerIdToPrefix` first, applied at every emit site (synced-models,
 * custom-models, model-alias, managed-fallback blocks) — WITHOUT changing what
 * `canonicalProviderId` resolves to internally, since that value is still required,
 * unmodified, by connection/hidden-model/registry lookups keyed on the raw node id.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8327-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

// A realistic provider-node id shape, matching `openai-compatible-chat-<uuid>` per
// src/app/api/provider-nodes/route.ts / createProviderNode()'s `id: data.id || uuidv4()`.
const NODE_ID = "openai-compatible-chat-550e8400-e29b-41d4-a716-446655440000";
const UUID_SHAPE_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
const CONFIGURED_PREFIX = "pix4k-talk";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#8327: synced models on a compatible provider node expose the configured prefix as owned_by, not the raw UUID", async () => {
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "pix4k talk (probe)",
    prefix: CONFIGURED_PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "pix4k-talk-conn",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    NODE_ID,
    (connection as { id: string }).id,
    [
      {
        id: "glm-5.2",
        name: "GLM 5.2",
        source: "imported",
        supportedEndpoints: ["chat"],
      },
    ]
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };

  assert.equal(response.status, 200);

  const entry = body.data.find((m) => m.id === `${CONFIGURED_PREFIX}/glm-5.2`);
  assert.ok(
    entry,
    `expected an entry with id "${CONFIGURED_PREFIX}/glm-5.2" in ${JSON.stringify(body.data.map((m) => m.id))}`
  );
  assert.equal(
    entry!.owned_by,
    CONFIGURED_PREFIX,
    `owned_by must be the configured prefix "${CONFIGURED_PREFIX}", not the raw provider-node id — got "${entry!.owned_by}"`
  );

  // The raw UUID-shaped provider-node id must never appear as owned_by anywhere.
  for (const model of body.data) {
    assert.equal(
      typeof model.owned_by === "string" && UUID_SHAPE_RE.test(model.owned_by),
      false,
      `owned_by "${model.owned_by}" (id "${model.id}") must not be a raw provider-node UUID`
    );
    assert.notEqual(
      model.owned_by,
      NODE_ID,
      `owned_by must never equal the raw provider-node id "${NODE_ID}"`
    );
  }
});

test("#8327: custom models on a compatible provider node expose the configured prefix as owned_by", async () => {
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "anthropic-compatible",
    name: "pix4k talk custom (probe)",
    prefix: CONFIGURED_PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/messages",
    modelsPath: "/v1/models",
  });
  await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "pix4k-talk-custom-conn",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/messages",
      modelsPath: "/v1/models",
    },
  });
  await modelsDb.addCustomModel(NODE_ID, "custom-glm", "Custom GLM");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };

  const entry = body.data.find((m) => m.id === `${CONFIGURED_PREFIX}/custom-glm`);
  assert.ok(
    entry,
    `expected an entry with id "${CONFIGURED_PREFIX}/custom-glm" in ${JSON.stringify(body.data.map((m) => m.id))}`
  );
  assert.equal(
    entry!.owned_by,
    CONFIGURED_PREFIX,
    `owned_by must be the configured prefix "${CONFIGURED_PREFIX}", not the raw provider-node id — got "${entry!.owned_by}"`
  );
  assert.notEqual(entry!.owned_by, NODE_ID);
});

test("#8327: built-in providers keep their existing owned_by contract (unaffected by the fix)", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };

  const openaiModel = body.data.find(
    (m) => typeof m.id === "string" && (m.id as string).startsWith("openai/")
  );
  assert.ok(openaiModel, "expected at least one openai/* built-in model in the catalog");
  assert.equal(openaiModel!.owned_by, "openai");
});

test("#9416: compatible provider with empty prefix falls back to slugified name, not UUID", async () => {
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "PIX4K Talk (production-probe)",
    prefix: "", // empty prefix — should fall back to slugified name
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "pix4k-talk-conn",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    NODE_ID,
    (connection as { id: string }).id,
    [
      {
        id: "glm-5.2",
        name: "GLM 5.2",
        source: "imported",
        supportedEndpoints: ["chat"],
      },
    ]
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };

  // "PIX4K Talk (production-probe)" → slugified "pix4k-talk-production-probe"
  const expectedPrefix = "pix4k-talk-production-probe";
  const entry = body.data.find((m) => m.id === `${expectedPrefix}/glm-5.2`);
  assert.ok(
    entry,
    `expected an entry with id "${expectedPrefix}/glm-5.2" since prefix was empty, name should slugify — got ids: ${JSON.stringify(body.data.map((m) => m.id))}`
  );
  assert.equal(
    entry!.owned_by,
    expectedPrefix,
    `owned_by must be the slugified name "${expectedPrefix}", not the raw provider-node UUID — got "${entry!.owned_by}"`
  );

  // The raw UUID-shaped provider-node id must never appear as owned_by anywhere.
  for (const model of body.data) {
    assert.equal(
      typeof model.owned_by === "string" && UUID_SHAPE_RE.test(model.owned_by),
      false,
      `owned_by "${model.owned_by}" (id "${model.id}") must not be a raw provider-node UUID`
    );
    assert.notEqual(
      model.owned_by,
      NODE_ID,
      `owned_by must never equal the raw provider-node id "${NODE_ID}"`
    );
  }
});

test("#9416: compatible provider with null/undefined prefix also falls back to slugified name", async () => {
  const nodeIdWithoutPrefix = "openai-compatible-chat-660e8400-e29b-41d4-a716-446655440001";
  await providersDb.createProviderNode({
    id: nodeIdWithoutPrefix,
    type: "openai-compatible",
    name: "My Custom Proxy",
    // prefix omitted entirely → should fall back to slugified name
    baseUrl: "https://myproxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection2 = await providersDb.createProviderConnection({
    provider: nodeIdWithoutPrefix,
    authType: "apikey",
    name: "myproxy-conn",
    apiKey: "sk-test-2",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://myproxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    nodeIdWithoutPrefix,
    (connection2 as { id: string }).id,
    [
      {
        id: "my-model-v1",
        name: "My Model V1",
        source: "imported",
        supportedEndpoints: ["chat"],
      },
    ]
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };

  // "My Custom Proxy" → slugified "my-custom-proxy"
  const expectedSlug = "my-custom-proxy";
  const entry = body.data.find((m) => m.id === `${expectedSlug}/my-model-v1`);
  assert.ok(
    entry,
    `expected an entry with id "${expectedSlug}/my-model-v1" — got ids: ${JSON.stringify(body.data.map((m) => m.id))}`
  );
  assert.equal(
    entry!.owned_by,
    expectedSlug,
    `owned_by must be the slugified name "${expectedSlug}", not the raw provider-node id`
  );
  assert.notEqual(entry!.owned_by, nodeIdWithoutPrefix);
});

test("#9416: provider with configured prefix still uses the configured prefix (regression guard)", async () => {
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "pix4k talk (probe)",
    prefix: CONFIGURED_PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "pix4k-talk-conn",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    NODE_ID,
    (connection as { id: string }).id,
    [
      {
        id: "glm-5.2",
        name: "GLM 5.2",
        source: "imported",
        supportedEndpoints: ["chat"],
      },
    ]
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };

  // Must still use the configured prefix, NOT slugified name
  const entry = body.data.find((m) => m.id === `${CONFIGURED_PREFIX}/glm-5.2`);
  assert.ok(
    entry,
    `expected entry with configured prefix "${CONFIGURED_PREFIX}/glm-5.2"`
  );
  assert.equal(entry!.owned_by, CONFIGURED_PREFIX);
  assert.notEqual(entry!.owned_by, "pix4k-talk-probe"); // not slugified
});
