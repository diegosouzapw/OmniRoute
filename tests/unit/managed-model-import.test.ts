import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-managed-model-import-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getModelAliases, setModelAlias } = await import("@/lib/db/models");
const localDb = { getModelAliases, setModelAlias };
const { importManagedModels } = await import("../../src/lib/providerModels/managedModelImport.ts");
const { mergeProviderModelListing } =
  await import("../../src/lib/providers/mergeProviderModelListing.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("sync mode builds aliases from provider-level synced available models", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);

  await importManagedModels({
    providerId: "openrouter",
    connectionId: "conn-b",
    mode: "sync",
    fetchedModels: [{ id: "shared/model-b", name: "Model B" }],
  });

  const aliases = await localDb.getModelAliases();

  assert.equal(aliases["model-a"], "openrouter/shared/model-a");
  assert.equal(aliases["model-b"], "openrouter/shared/model-b");
});
test("Crof managed import persists boolean reasoning effort metadata", async () => {
  const result = await importManagedModels({
    providerId: "crof",
    connectionId: "conn-crof",
    mode: "sync",
    fetchedModels: [{ id: "crof-managed-model", reasoning_effort: true }],
  });

  const synced = await modelsDb.getSyncedAvailableModelsForConnection("crof", "conn-crof");
  assert.deepEqual(synced[0]?.supportedThinkingEfforts, ["none", "low", "medium", "high", "max"]);
  assert.equal(synced[0]?.supportsThinking, true);

  assert.deepEqual(result.importedModels[0]?.supportedThinkingEfforts, [
    "none",
    "low",
    "medium",
    "high",
    "max",
  ]);
  assert.equal(result.importedModels[0]?.supportsThinking, true);
});

test("merge mode builds aliases from discovered models without pruning missing provider aliases", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);
  await localDb.setModelAlias("existing", "openrouter/shared/existing");

  await importManagedModels({
    providerId: "openrouter",
    connectionId: "conn-b",
    mode: "merge",
    fetchedModels: [{ id: "shared/model-b", name: "Model B" }],
  });

  const aliases = await localDb.getModelAliases();

  assert.equal(aliases.existing, "openrouter/shared/existing");
  assert.equal(aliases["model-a"], undefined);
  assert.equal(aliases["model-b"], "openrouter/shared/model-b");
});

test("sync keeps a same-id manual model as the user-configurable metadata override", async () => {
  await modelsDb.addCustomModel(
    "openrouter",
    "shared-model",
    "Operator configuration",
    "manual",
    "responses",
    ["responses"],
    "claude",
    {},
    true
  );

  await importManagedModels({
    providerId: "openrouter",
    connectionId: "openrouter-connection",
    mode: "sync",
    fetchedModels: [
      {
        id: "shared-model",
        name: "Upstream name",
        apiFormat: "chat-completions",
        supportedEndpoints: ["chat"],
        description: "Upstream description",
      },
    ],
  });

  const customModels = (await modelsDb.getCustomModels("openrouter")) as Array<{
    id: string;
    apiFormat?: string;
    targetFormat?: string;
    supportedEndpoints?: string[];
    supportsVision?: boolean;
  }>;
  assert.deepEqual(customModels, [
    {
      id: "shared-model",
      name: "Operator configuration",
      source: "manual",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
      targetFormat: "claude",
      supportsVision: true,
    },
  ]);

  const syncedModels = await modelsDb.getSyncedAvailableModels("openrouter");
  const effectiveModel = mergeProviderModelListing({
    providerId: "openrouter",
    registryModels: [],
    syncedModels,
    customModels,
  }).find((model) => model.id === "shared-model");
  assert.equal(effectiveModel?.apiFormat, "responses");
  assert.deepEqual(effectiveModel?.supportedEndpoints, ["responses"]);
  assert.equal(effectiveModel?.targetFormat, "claude");
  assert.equal(effectiveModel?.supportsVision, true);
  assert.equal(effectiveModel?.description, "Upstream description");

  assert.equal(await modelsDb.removeCustomModel("openrouter", "shared-model"), true);
  const resetModel = mergeProviderModelListing({
    providerId: "openrouter",
    registryModels: [],
    syncedModels,
    customModels: await modelsDb.getCustomModels("openrouter"),
  }).find((model) => model.id === "shared-model");
  assert.equal(resetModel?.apiFormat, "chat-completions");
  assert.deepEqual(resetModel?.supportedEndpoints, ["chat"]);
  assert.equal(resetModel?.description, "Upstream description");
});

test("provider-level synced model deletion removes only that provider", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    { id: "shared/model-a", name: "Model A", source: "imported" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-b", [
    { id: "shared/model-b", name: "Model B", source: "imported" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-a", [
    { id: "shared/model-c", name: "Model C", source: "imported" },
  ]);

  const removed = await modelsDb.deleteSyncedAvailableModelsForProvider("openrouter");

  assert.equal(removed, 2);
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openrouter"), []);
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openai"), [
    { id: "shared/model-c", name: "Model C", source: "imported" },
  ]);
});

test("OpenAI import excludes deprecated and shutdown models from new selections", async () => {
  const result = await importManagedModels({
    providerId: "openai",
    connectionId: "openai-conn",
    mode: "sync",
    fetchedModels: [
      { id: "gpt-5.6-sol", name: "GPT-5.6 Sol" },
      { id: "gpt-5.2-codex", name: "GPT-5.2 Codex" },
      { id: "gpt-5.3-chat-latest", name: "GPT-5.3 Chat" },
    ],
  });

  assert.deepEqual(
    result.discoveredModels.map((model) => model.id),
    ["gpt-5.6-sol"]
  );
  assert.deepEqual(
    (await modelsDb.getSyncedAvailableModels("openai")).map((model) => model.id),
    ["gpt-5.6-sol"]
  );
});

test("OpenAI import excludes image and video generation models from chat selections", async () => {
  const result = await importManagedModels({
    providerId: "openai",
    connectionId: "openai-media-conn",
    mode: "sync",
    fetchedModels: [
      { id: "gpt-5.6-sol", name: "GPT-5.6 Sol" },
      { id: "gpt-image-2", name: "GPT Image 2" },
      { id: "sora-2-pro", name: "Sora 2 Pro" },
      {
        id: "vendor-image-model",
        name: "Vendor Image Model",
        supportedEndpoints: ["/v1/images/generations"],
      },
    ],
  });

  assert.deepEqual(
    result.discoveredModels.map((model) => model.id),
    ["gpt-5.6-sol"]
  );
  assert.deepEqual(
    (await modelsDb.getSyncedAvailableModels("openai")).map((model) => model.id),
    ["gpt-5.6-sol"]
  );
});

test("pruning stale connection available models during import", async () => {
  const db = core.getDbInstance();
  // Insert connections
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("conn-active", "openrouter", "apikey", "Active Connection", 1, "2026-05-29", "2026-05-29");

  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("conn-stale", "openrouter", "apikey", "Stale Connection", 0, "2026-05-29", "2026-05-29");

  // Create synced available models for both
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-active", [
    { id: "shared/model-active", name: "Model Active", source: "imported" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-stale", [
    { id: "shared/model-stale", name: "Model Stale", source: "imported" },
  ]);

  // Import on conn-new
  await importManagedModels({
    providerId: "openrouter",
    connectionId: "conn-new",
    mode: "sync",
    fetchedModels: [{ id: "shared/model-new", name: "Model New" }],
  });

  // Check models for "openrouter"
  const allSyncedModels = await modelsDb.getSyncedAvailableModels("openrouter");

  // Stale connection should be pruned. Active connection and the new syncing connection should be kept.
  const ids = allSyncedModels.map((m) => m.id);
  assert.ok(ids.includes("shared/model-active"));
  assert.ok(ids.includes("shared/model-new"));
  assert.ok(!ids.includes("shared/model-stale"));
});

test("antigravity sync dynamically builds and saves mitmAlias mappings", async () => {
  const db = core.getDbInstance();
  // Create an antigravity connection
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("antigravity-conn", "antigravity", "oauth", "Antigravity", 1, "2026-05-29", "2026-05-29");

  await importManagedModels({
    providerId: "antigravity",
    connectionId: "antigravity-conn",
    mode: "sync",
    fetchedModels: [
      { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash" },
      { id: "gemini-3.7-flash-high", name: "Gemini 3.7 Flash High" },
      { id: "custom-antigravity-model", name: "Custom Antigravity Model" },
    ],
  });

  const models = await modelsDb.getSyncedAvailableModels("antigravity");
  console.log("SYNCED MODELS IN TEST:", models);

  const mitmMappings = await modelsDb.getMitmAlias("antigravity");
  console.log("MITM MAPPINGS IN TEST:", mitmMappings);

  // Retired models reported by upstream must not be imported or mapped.
  assert.equal(mitmMappings["gemini-3.5-flash"], undefined);
  assert.equal(
    models.some((model) => model.id === "gemini-3.5-flash"),
    false
  );
  // #11824: gemini-3.7-flash-high is a known cross-account-unsafe display id (the
  // tier-suffixed upstream id is only callable on Google projects specifically
  // provisioned for it); it must always resolve through the static alias to the
  // safe shared "-tiered" endpoint id, never as an identity mapping to the literal
  // tier id — even when it appears directly in this connection's own discovery.
  assert.equal(mitmMappings["gemini-3.7-flash-high"], "antigravity/gemini-3.7-flash-tiered");
  assert.equal(mitmMappings["custom-antigravity-model"], "antigravity/custom-antigravity-model");

  // Removed Antigravity 2.0 preview/agent aliases must not be reintroduced.
  assert.equal(mitmMappings["gemini-3.5-flash-preview"], undefined);
  assert.equal(mitmMappings["gemini-3-flash-agent"], undefined);
});

test("#11824: syncing account A's model catalog must not route account B's gemini-3.7-flash-high to an id B's own discovery never advertised", async () => {
  const db = core.getDbInstance();
  const now = "2026-08-27";
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("acct-a", "antigravity", "oauth", "Antigravity A", 1, now, now);
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("acct-b", "antigravity", "oauth", "Antigravity B", 1, now, now);

  // Account A: Google has provisioned direct tier-suffixed callability for this
  // project -- its own :fetchAvailableModels lists "gemini-3.7-flash-high" verbatim.
  await importManagedModels({
    providerId: "antigravity",
    connectionId: "acct-a",
    mode: "sync",
    fetchedModels: [{ id: "gemini-3.7-flash-high", name: "Gemini 3.7 Flash High" }],
  });

  // Account B: Google has NOT provisioned the direct tier id for this project --
  // its own :fetchAvailableModels only ever lists the tiered endpoint id.
  await importManagedModels({
    providerId: "antigravity",
    connectionId: "acct-b",
    mode: "sync",
    fetchedModels: [{ id: "gemini-3.7-flash-tiered", name: "Gemini 3.7 Flash (Tiered)" }],
  });

  // Account B's OWN synced catalog never included the direct tier id.
  const acctBOwnCatalog = await modelsDb.getSyncedAvailableModelsForConnection(
    "antigravity",
    "acct-b"
  );
  const acctBOwnIds = acctBOwnCatalog.map((m) => m.id);
  assert.ok(
    !acctBOwnIds.includes("gemini-3.7-flash-high"),
    "precondition: account B's own discovery must not include the direct tier id"
  );

  // But the GLOBAL mitmAlias table used by cleanModelName() for EVERY connection
  // (including B's requests) was rebuilt from the union of A + B, so it must not
  // still route "gemini-3.7-flash-high" to the id only A supports.
  const mitmMappings = await modelsDb.getMitmAlias("antigravity");

  assert.notEqual(
    mitmMappings["gemini-3.7-flash-high"],
    "antigravity/gemini-3.7-flash-high",
    "BUG: the shared mitmAlias table routes gemini-3.7-flash-high to the literal " +
      "upstream id (only account A's project supports it) even for account B, " +
      "whose own discovery never advertised that id -- this is what produces the " +
      "per-account 404 reported in #11824/#11651."
  );
  assert.equal(mitmMappings["gemini-3.7-flash-high"], "antigravity/gemini-3.7-flash-tiered");
});
