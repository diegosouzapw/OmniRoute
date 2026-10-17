import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-16801-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const combos = await import("../../src/lib/db/combos.ts");
const core = await import("../../src/lib/db/core.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { getExactCustomModelVisionOverride } = await import("../../src/lib/db/models/customVisionOverride.ts");
const { getComboVisionBridgeDecision, VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");

test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("#16801: public prefix with internal compatible node preserves native vision images", async () => {
  const nodeId = "openai-compatible-chat-16801-vision";
  await providers.createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    prefix: "v16801",
    name: "Vision fixture",
    apiType: "chat",
    baseUrl: "http://127.0.0.1:9/v1",
  });
  await models.addCustomModel(
    nodeId, "test-vision", "Test vision", "manual", "chat-completions", ["chat"],
    undefined, {}, true
  );
  await combos.createCombo({
    name: "vision-16801",
    strategy: "priority",
    models: [{ kind: "model", providerId: nodeId, model: "v16801/test-vision", weight: 1 }],
  });

  assert.equal(getResolvedModelCapabilities("v16801/test-vision").supportsVision, true);
  assert.equal(await getComboVisionBridgeDecision("vision-16801"), "skip");
});

test("#16801: unknown compatible-node models do not acquire vision by default", async () => {
  await combos.createCombo({
    name: "unknown-16801",
    strategy: "priority",
    models: [{
      kind: "model",
      providerId: "openai-compatible-chat-missing-16801",
      model: "missing16801/not-a-vision-model",
      weight: 1,
    }],
  });
  assert.equal(await getComboVisionBridgeDecision("unknown-16801"), "no-vision");
});

test("#16801: a public vision model from another node must not bless an internal target", async () => {
  const sourceNode = "openai-compatible-chat-16801-source";
  const otherNode = "openai-compatible-chat-16801-other";
  await providers.createProviderNode({
    id: sourceNode, type: "openai-compatible", prefix: "source16801",
    name: "Non-vision source", apiType: "chat", baseUrl: "http://127.0.0.1:9/v1",
  });
  await providers.createProviderNode({
    id: otherNode, type: "openai-compatible", prefix: "other16801",
    name: "Vision provider", apiType: "chat", baseUrl: "http://127.0.0.1:9/v1",
  });
  await models.addCustomModel(
    otherNode, "vision-only", "Vision only", "manual", "chat-completions",
    ["chat"], undefined, {}, true
  );
  assert.equal(getResolvedModelCapabilities("other16801/vision-only").supportsVision, true);
  assert.equal(
    getExactCustomModelVisionOverride(sourceNode, "other16801/vision-only"),
    null,
    "foreign node custom metadata is not evidence about the source provider"
  );
  assert.equal(getExactCustomModelVisionOverride(otherNode, "vision-only"), true);
  await combos.createCombo({
    name: "cross-node-vision-16801", strategy: "priority",
    models: [{
      kind: "model", providerId: sourceNode, model: "other16801/vision-only", weight: 1,
    }],
  });
  assert.equal(
    await getComboVisionBridgeDecision("cross-node-vision-16801"),
    "no-vision",
    "foreign public model metadata must not disable the Vision Bridge"
  );
});

test("#16801: raw provider-relative model IDs containing slashes retain their exact local vision verdict", async () => {
  const nodeId = "openai-compatible-chat-16801-raw-path";
  await providers.createProviderNode({
    id: nodeId, type: "openai-compatible", prefix: "own16801",
    name: "Own raw-path fixture", apiType: "chat", baseUrl: "http://127.0.0.1:9/v1",
  });
  await models.addCustomModel(
    nodeId, "vendor/sight-16801", "Native path vision", "manual",
    "chat-completions", ["chat"], undefined, {}, true
  );
  await models.addCustomModel(
    nodeId, "vendor/blind-16801", "Text-only path model", "manual",
    "chat-completions", ["chat"], undefined, {}, false
  );
  assert.equal(
    getResolvedModelCapabilities({ provider: nodeId, model: "vendor/sight-16801" }).supportsVision,
    true,
    "the owned raw slash ID is known vision-capable without a public prefix"
  );
  await combos.createCombo({
    name: "raw-path-vision-16801", strategy: "priority",
    models: [{ kind: "model", providerId: nodeId, model: "vendor/sight-16801", weight: 1 }],
  });
  await combos.createCombo({
    name: "raw-path-text-16801", strategy: "priority",
    models: [{ kind: "model", providerId: nodeId, model: "vendor/blind-16801", weight: 1 }],
  });
  await combos.createCombo({
    name: "mixed-raw-path-16801", strategy: "priority",
    models: [
      { kind: "model", providerId: nodeId, model: "vendor/sight-16801", weight: 1 },
      { kind: "model", providerId: nodeId, model: "vendor/blind-16801", weight: 1 },
    ],
  });
  await combos.createCombo({
    name: "nested-raw-path-16801", strategy: "priority",
    models: [{ kind: "combo-ref", comboName: "raw-path-vision-16801" }],
  });
  assert.equal(await getComboVisionBridgeDecision("raw-path-vision-16801"), "skip");
  assert.equal(await getComboVisionBridgeDecision("raw-path-text-16801"), "no-vision");
  assert.equal(await getComboVisionBridgeDecision("mixed-raw-path-16801"), "process");
  assert.equal(await getComboVisionBridgeDecision("nested-raw-path-16801"), "skip");
  assert.equal(getExactCustomModelVisionOverride(nodeId, "vendor/sight-16801"), true);
  assert.equal(getExactCustomModelVisionOverride(nodeId, "vendor/blind-16801"), false);
  assert.equal(
    getExactCustomModelVisionOverride("openai-compatible-chat-absent-16801", "vendor/sight-16801"),
    null,
    "a matching model ID from a different provider must not leak to this node"
  );

  // A proven all-vision combo must preserve the exact input_image/image_url bytes:
  // no describe call, no text stub, and no image representation rewrite.
  const image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const payload = {
    model: "raw-path-vision-16801",
    messages: [{ role: "user", content: [
      { type: "text", text: "What is in this picture?" },
      { type: "image_url", image_url: { url: image } },
    ] }],
  };
  let describes = 0;
  const guardrail = new VisionBridgeGuardrail({ deps: {
    getSettings: async () => ({ visionBridgeEnabled: true, visionBridgeModel: "openai/gpt-4o" }),
    callVisionModel: async () => { describes++; throw new Error("must not describe an all-vision combo"); },
  } });
  const originalPayload = JSON.stringify(payload);
  const result = await guardrail.preCall(payload, {});
  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined);
  assert.equal(describes, 0);
  assert.equal(JSON.stringify(payload), originalPayload, "raw image payload must remain unchanged");
});

test("#16801: only an owned synced vision verdict permits a raw namespaced ID", async () => {
  const nodeId = "openai-compatible-chat-16801-synced-path";
  const foreignNodeId = "openai-compatible-chat-16801-foreign-synced";
  await providers.createProviderNode({
    id: nodeId, type: "openai-compatible", prefix: "synced16801",
    name: "Synced path fixture", apiType: "chat", baseUrl: "http://127.0.0.1:9/v1",
  });
  await providers.createProviderNode({
    id: foreignNodeId, type: "openai-compatible", prefix: "foreign16801",
    name: "Foreign fixture", apiType: "chat", baseUrl: "http://127.0.0.1:9/v1",
  });
  const connection = await providers.createProviderConnection({
    provider: nodeId, authType: "apikey",
    name: "Synced path fixture connection", apiKey: "test-fixture-key",
    isActive: true, testStatus: "active",
  });
  await models.replaceSyncedAvailableModelsForConnection(nodeId, connection.id, [{
    id: "vendor/synced-vision-16801", name: "Synced vision",
    supportsVision: true, supportedEndpoints: ["chat"],
  }]);
  await combos.createCombo({
    name: "synced-raw-path-16801", strategy: "priority",
    models: [{ kind: "model", providerId: nodeId, model: "vendor/synced-vision-16801", weight: 1 }],
  });
  await combos.createCombo({
    name: "foreign-synced-raw-path-16801", strategy: "priority",
    models: [{
      kind: "model", providerId: foreignNodeId,
      model: "vendor/synced-vision-16801", weight: 1,
    }],
  });
  assert.equal(await getComboVisionBridgeDecision("synced-raw-path-16801"), "skip");
  assert.equal(
    await getComboVisionBridgeDecision("foreign-synced-raw-path-16801"), "no-vision",
    "a different node with the same raw vendor ID cannot inherit another node's synced verdict"
  );
});

test("#16801: Anthropic-compatible/CC nodes keep owned and rejected vision evidence separate", async () => {
  const owner = "anthropic-compatible-cc-16801-owner";
  const other = "anthropic-compatible-cc-16801-other";
  await providers.createProviderNode({
    id: owner, type: "anthropic-compatible", prefix: "ccown16801",
    name: "Anthropic vision node", apiType: "messages", baseUrl: "http://127.0.0.1:9/v1",
  });
  await providers.createProviderNode({
    id: other, type: "anthropic-compatible", prefix: "ccother16801",
    name: "Anthropic foreign node", apiType: "messages", baseUrl: "http://127.0.0.1:9/v1",
  });
  await models.addCustomModel(
    owner, "studio/path-vision-16801", "Owned nested vision model",
    "manual", "chat-completions", ["chat"], undefined, {}, true
  );
  await models.addCustomModel(
    owner, "studio/path-text-16801", "Explicitly non-vision",
    "manual", "chat-completions", ["chat"], undefined, {}, false
  );
  await combos.createCombo({
    name: "cc-owned-vision-16801", strategy: "priority",
    models: [{ kind: "model", providerId: owner, model: "studio/path-vision-16801", weight: 1 }],
  });
  await combos.createCombo({
    name: "cc-owned-blind-16801", strategy: "priority",
    models: [{ kind: "model", providerId: owner, model: "studio/path-text-16801", weight: 1 }],
  });
  await combos.createCombo({
    name: "cc-other-vision-16801", strategy: "priority",
    models: [{ kind: "model", providerId: other, model: "ccown16801/studio/path-vision-16801", weight: 1 }],
  });

  assert.equal(await getComboVisionBridgeDecision("cc-owned-vision-16801"), "skip");
  assert.equal(await getComboVisionBridgeDecision("cc-owned-blind-16801"), "no-vision");
  assert.equal(
    await getComboVisionBridgeDecision("cc-other-vision-16801"), "no-vision",
    "even a true public vision verdict from another compatible node must not bless this node"
  );
});

test("#16801: same public model leaf from a foreign node must not authorize image passthrough", async () => {
  const owner = "openai-compatible-chat-16801-own-ghost";
  const foreign = "openai-compatible-chat-16801-foreign-ghost";
  await providers.createProviderNode({
    id: owner, type: "openai-compatible", prefix: "my16801",
    name: "Unconfigured local model", apiType: "chat", baseUrl: "http://127.0.0.1:9/v1",
  });
  await providers.createProviderNode({
    id: foreign, type: "openai-compatible", prefix: "foreign16801x",
    name: "Other owner's model", apiType: "chat", baseUrl: "http://127.0.0.1:9/v1",
  });
  await models.addCustomModel(
    foreign, "ghost-vision-16801", "Other node's vision-capable model",
    "manual", "chat-completions", ["chat"], undefined, {}, true
  );
  await combos.createCombo({
    name: "ghost-owner-16801", strategy: "priority",
    models: [{ kind: "model", providerId: owner, model: "my16801/ghost-vision-16801", weight: 1 }],
  });
  assert.equal(
    getExactCustomModelVisionOverride(owner, "ghost-vision-16801"),
    null,
    "the source node has no explicit vision evidence for this model"
  );
  assert.equal(await getComboVisionBridgeDecision("ghost-owner-16801"), "no-vision");
});

test("#16801: builtin providers keep their original capability verdict", async () => {
  assert.equal(getResolvedModelCapabilities("openai/gpt-4o").supportsVision, true);
  await combos.createCombo({
    name: "builtin-vision-control-16801", strategy: "priority",
    models: [{ kind: "model", providerId: "openai", model: "openai/gpt-4o", weight: 1 }],
  });
  assert.equal(
    await getComboVisionBridgeDecision("builtin-vision-control-16801"),
    "skip",
    "internal-node ownership checks must not alter built-in provider behavior"
  );
});
