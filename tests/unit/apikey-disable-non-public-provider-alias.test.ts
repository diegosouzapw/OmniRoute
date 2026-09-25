// disableNonPublicModels must recognise a published model when the client
// addresses its provider by alias (`sx/tts-rt-v2` for `soniox`). Imported and
// synced models are stored under the canonical provider id, and /v1/models plus
// the dashboard advertise the alias form, so looking the alias up literally
// denied every alias request with 403 "not allowed for this API key".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dnp-provider-alias-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "dnp-provider-alias-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const apiKeyGroups = await import("../../src/lib/db/apiKeyGroups.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const { getProviderAlias } = await import("../../src/shared/constants/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createRestrictedKey() {
  const created = await apiKeysDb.createApiKey("Provider Alias Key", "machine-alias-01");
  await apiKeysDb.updateApiKeyPermissions(created.id, { disableNonPublicModels: true });
  apiKeysDb.clearApiKeyCaches();
  return created.key;
}

test.beforeEach(async () => {
  await resetStorage();
  await modelsDb.addCustomModel(
    "soniox",
    "tts-rt-v2",
    "Soniox TTS RT v2",
    "imported",
    "audio-speech",
    ["audio-speech"]
  );
  await modelsDb.addCustomModel(
    "soniox",
    "tts-rt-v1",
    "Soniox TTS RT v1",
    "imported",
    "audio-speech",
    ["audio-speech"]
  );
  modelsDb.mergeModelCompatOverride("soniox", "tts-rt-v1", { isHidden: true });
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the soniox provider is addressed by the sx alias", () => {
  assert.equal(getProviderAlias("soniox"), "sx");
});

test("disableNonPublicModels allows an imported model addressed by provider alias", async () => {
  const key = await createRestrictedKey();

  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "soniox/tts-rt-v2"), true);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "sx/tts-rt-v2"), true);
});

test("the alias form still honours hidden flags and unknown models", async () => {
  const key = await createRestrictedKey();

  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "sx/tts-rt-v1"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "sx/tts-rt-v9"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "nope/tts-rt-v2"), false);
});

test("the alias form still honours deny rules written against the canonical id", async () => {
  const created = await apiKeysDb.createApiKey("Alias Deny Key", "machine-alias-02");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    disableNonPublicModels: true,
    blockedModels: ["soniox/tts-rt-v2"],
  });
  apiKeysDb.clearApiKeyCaches();

  assert.equal(await apiKeysDb.isModelAllowedForKey(created.key, "sx/tts-rt-v2"), false);
});

test("a hidden flag set under the alias still hides the model", async () => {
  modelsDb.mergeModelCompatOverride("sx", "tts-rt-v2", { isHidden: true });
  const key = await createRestrictedKey();

  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "sx/tts-rt-v2"), false);
});

test("a provider node that claims the alias prefix is not judged by the built-in catalog", async () => {
  // Chat routing sends a non-reserved prefix claimed by a node to that node, so
  // the built-in soniox catalog must not vouch for it.
  await createProviderNode({
    type: "openai-compatible",
    name: "Node using sx",
    prefix: "sx",
    baseUrl: "https://node.example.com/v1",
  });
  const key = await createRestrictedKey();

  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "sx/tts-rt-v2"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "soniox/tts-rt-v2"), true);
});

test("a synced effort variant addressed by alias resolves to its base model", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("grok-cli", "conn-grok-1", [
    { id: "grok-4.6", name: "Grok 4.6", supportedThinkingEfforts: ["low"] },
  ]);
  const key = await createRestrictedKey();
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "gc/grok-4.6-low"), true);

  const created = await apiKeysDb.createApiKey("Alias Variant Deny Key", "machine-alias-03");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    disableNonPublicModels: true,
    blockedModels: ["grok-cli/grok-4.6"],
  });
  apiKeysDb.clearApiKeyCaches();
  assert.equal(await apiKeysDb.isModelAllowedForKey(created.key, "gc/grok-4.6-low"), false);
});

test("a group deny rule on the canonical provider also stops the alias form", async () => {
  const created = await apiKeysDb.createApiKey("Alias Group Key", "machine-alias-04");
  const group = apiKeyGroups.createKeyGroup("Soniox deny", "deny soniox");
  apiKeyGroups.addKeyToGroup(created.id, group.id);
  apiKeyGroups.addGroupPermission(group.id, "*", "deny", "soniox");
  apiKeyGroups.addGroupPermission(group.id, "*", "allow");
  apiKeysDb.clearApiKeyCaches();

  assert.equal(await apiKeysDb.isModelAllowedForKey(created.key, "soniox/tts-rt-v2"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(created.key, "sx/tts-rt-v2"), false);
});

test("a group allow rule written against the alias keeps working", async () => {
  const created = await apiKeysDb.createApiKey("Alias Allow Key", "machine-alias-05");
  const group = apiKeyGroups.createKeyGroup("Soniox alias allow", "allow sx");
  apiKeyGroups.addKeyToGroup(created.id, group.id);
  apiKeyGroups.addGroupPermission(group.id, "*", "allow", "sx");
  apiKeysDb.clearApiKeyCaches();

  assert.equal(await apiKeysDb.isModelAllowedForKey(created.key, "sx/tts-rt-v2"), true);
});
