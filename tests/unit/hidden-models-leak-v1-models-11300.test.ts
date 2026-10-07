/**
 * #11300 — Models toggled to "Hidden" on Provider pages are still listed in
 * `GET /v1/models`.
 *
 * `PATCH /api/provider-models?provider=<key>&modelId=<id>` persists the hidden
 * override under whatever key the dashboard's `[id]` route param happened to be
 * (an alias like `cc`/`gh`/`cx`, a canonical provider id, a compatible-provider
 * node UUID, or its configured prefix). `catalog.ts`'s `isModelHiddenBulk()` did
 * a single-key lookup, so a model stayed listed in `/v1/models` whenever the key
 * used to READ diverged from the key used to WRITE:
 *
 *  - Static `PROVIDER_MODELS` loop checked only `canonicalProviderId` — a model
 *    hidden under the alias (e.g. `cc` for Claude Code) never matched.
 *  - The Codex-native-unprefixed loop checked only `"codex"` — a model hidden
 *    via the `openai` provider page (codex often shares the openai-compatible
 *    connection) never matched.
 *  - The synced-discovery loop checked only the raw connection `providerId` —
 *    a model hidden via the compatible-provider node's configured *prefix*
 *    (the identifier the operator actually sees/uses on that node's page)
 *    never matched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-11300-hidden-leak-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { mergeModelCompatOverride } = await import("@/lib/db/models");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function fetchCatalogIds(): Promise<string[]> {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string }> };
  assert.ok(Array.isArray(body.data), "response has data array");
  return body.data.map((m) => m.id);
}

test("#11300 A: hiding a static model under its ALIAS (cc) excludes it under both cc/ and claude/ ids", async () => {
  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "claude-main",
    apiKey: "sk-test-11300a",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  // Sanity: before hiding, the model is advertised.
  let ids = await fetchCatalogIds();
  assert.ok(
    ids.includes("cc/claude-opus-5"),
    `expected cc/claude-opus-5 to be listed before hiding — got ${JSON.stringify(ids.filter((i) => i.includes("claude-opus-5")))}`
  );

  // Operator hides the model on the provider page, whose route param is the
  // alias "cc" (not the canonical "claude").
  mergeModelCompatOverride("cc", "claude-opus-5", { isHidden: true });

  ids = await fetchCatalogIds();
  assert.ok(
    !ids.includes("cc/claude-opus-5"),
    `#11300 RED: cc/claude-opus-5 hidden under alias "cc" must not appear — got ${JSON.stringify(ids.filter((i) => i.includes("claude-opus-5")))}`
  );
  assert.ok(
    !ids.includes("claude/claude-opus-5"),
    `#11300 RED: claude/claude-opus-5 hidden under alias "cc" must not appear either`
  );
});

test('#11300 B: hiding a codex-native unprefixed model under "openai" excludes the bare model id', async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-main",
    apiKey: "sk-test-11300b",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const nativeModelId = "gpt-5.6-sol";

  let ids = await fetchCatalogIds();
  assert.ok(
    ids.includes(nativeModelId),
    `expected bare "${nativeModelId}" to be listed before hiding — got ${JSON.stringify(ids.filter((i) => i.includes("gpt-5.6-sol")))}`
  );

  // Hidden via the "openai" provider page (codex native models are commonly
  // reached through the shared openai-compatible connection).
  mergeModelCompatOverride("openai", nativeModelId, { isHidden: true });

  ids = await fetchCatalogIds();
  assert.ok(
    !ids.includes(nativeModelId),
    `#11300 RED: bare "${nativeModelId}" hidden under "openai" must not appear — got ${JSON.stringify(ids.filter((i) => i.includes("gpt-5.6-sol")))}`
  );
});

test("#11300 C: hiding a compatible-node synced model under its configured PREFIX excludes prefix/<model>", async () => {
  const NODE_ID = "openai-compatible-chat-11300-c0ffee00-0000-4000-8000-000000000000";
  const PREFIX = "deepseek-node-11300";

  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "Deepseek Node (11300 probe)",
    prefix: PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "deepseek-node-conn",
    apiKey: "sk-test-11300c",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });

  const modelId = "deepseek-v4-flash-0731";
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    NODE_ID,
    (connection as { id: string }).id,
    [{ id: modelId, name: "DeepSeek V4 Flash", source: "imported", supportedEndpoints: ["chat"] }]
  );

  let ids = await fetchCatalogIds();
  assert.ok(
    ids.includes(`${PREFIX}/${modelId}`),
    `expected ${PREFIX}/${modelId} to be listed before hiding — got ${JSON.stringify(ids.filter((i) => i.includes(modelId)))}`
  );

  // Operator hides the model via the node's page, which is keyed by the
  // configured prefix rather than the internal node UUID.
  mergeModelCompatOverride(PREFIX, modelId, { isHidden: true });

  ids = await fetchCatalogIds();
  assert.ok(
    !ids.includes(`${PREFIX}/${modelId}`),
    `#11300 RED: ${PREFIX}/${modelId} hidden under prefix "${PREFIX}" must not appear — got ${JSON.stringify(ids.filter((i) => i.includes(modelId)))}`
  );
  assert.ok(
    !ids.includes(`${NODE_ID}/${modelId}`),
    `#11300 RED: ${NODE_ID}/${modelId} hidden under prefix "${PREFIX}" must not appear either`
  );
});
