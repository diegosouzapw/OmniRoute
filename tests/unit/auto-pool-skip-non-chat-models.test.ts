import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Credentialed providers whose synced/custom catalog mixes chat and media models
// (x.ai /v1/models lists grok-imagine-* next to grok-4.x; local nodes sync TTS/ASR/video)
// must not put the media models into auto/* chat pools: they can only ever fail there.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-non-chat-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const { XAI_MODELS_CONFIG } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => resetStorage());

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("isDeclaredNonChatModel only flags models that declare no chat-capable surface", () => {
  const { isDeclaredNonChatModel } = virtualFactory;
  assert.equal(isDeclaredNonChatModel({}), false);
  assert.equal(isDeclaredNonChatModel({ supportedEndpoints: ["chat"] }), false);
  assert.equal(isDeclaredNonChatModel({ supportedEndpoints: ["responses"] }), false);
  assert.equal(isDeclaredNonChatModel({ supportedEndpoints: ["chat", "images"] }), false);
  assert.equal(isDeclaredNonChatModel({ modelType: "chat" }), false);
  assert.equal(isDeclaredNonChatModel({ supportedEndpoints: ["images"] }), true);
  assert.equal(isDeclaredNonChatModel({ supportedEndpoints: ["videos"] }), true);
  assert.equal(isDeclaredNonChatModel({ modelType: "embedding" }), true);
});

test("auto pool drops synced/custom models that declare only non-chat surfaces", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "OpenRouter",
    apiKey: "sk-test-openrouter",
  });
  const connectionId = (conn as { id?: string }).id;
  assert.ok(connectionId);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", connectionId, [
    { id: "chat-model", name: "Chat", source: "imported" as const },
    {
      id: "responses-model",
      name: "Responses",
      source: "imported" as const,
      supportedEndpoints: ["responses"],
    },
    {
      id: "image-model",
      name: "Image",
      source: "imported" as const,
      supportedEndpoints: ["images"],
    },
    { id: "embed-model", name: "Embed", source: "imported" as const, modelType: "embedding" },
  ]);
  await modelsDb.addCustomModel("openrouter", "video-custom", "Video", "manual", "video", [
    "videos",
  ]);

  const prepared = await virtualFactory.prepareVirtualAutoComboInputs();
  const ids = prepared.regularCandidates
    .filter((c) => c.provider === "openrouter")
    .map((c) => c.model)
    .sort();
  assert.deepEqual(ids, ["chat-model", "responses-model"]);
});

test("an image-only sync does not fall back to the static catalog", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "OpenRouter",
    apiKey: "sk-test-openrouter",
  });
  const connectionId = (conn as { id?: string }).id;
  assert.ok(connectionId);
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", connectionId, [
    {
      id: "image-model",
      name: "Image",
      source: "imported" as const,
      supportedEndpoints: ["images"],
    },
  ]);

  const prepared = await virtualFactory.prepareVirtualAutoComboInputs();
  assert.equal(prepared.regularCandidates.filter((c) => c.provider === "openrouter").length, 0);
});

test("xAI discovery tags grok-imagine media models and leaves chat models untouched", () => {
  const parsed = XAI_MODELS_CONFIG.parseResponse({
    data: [
      { id: "grok-4.7" },
      { id: "grok-imagine-image" },
      { id: "grok-imagine-image-quality" },
      { id: "grok-imagine-video-1.5" },
    ],
  }) as Array<Record<string, unknown>>;
  assert.deepEqual(parsed[0], { id: "grok-4.7" });
  assert.deepEqual(parsed[1].supportedEndpoints, ["images"]);
  assert.deepEqual(parsed[2].supportedEndpoints, ["images"]);
  assert.deepEqual(parsed[3].supportedEndpoints, ["videos"]);
  assert.deepEqual(XAI_MODELS_CONFIG.parseResponse({}), []);
});
