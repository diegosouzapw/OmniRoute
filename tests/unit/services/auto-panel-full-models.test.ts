/**
 * resolveAutoPanel — full-model expansion.
 *
 * Phase-2 upgrade: instead of 1 model per connection (virtualFactory default),
 * the panel expands to ALL synced chat-capable models for each valid provider,
 * subject to a per-provider diversity cap (maxPerProvider) and the global
 * maxPanel cap.
 *
 * These tests seed synced models via replaceSyncedAvailableModelsForConnection
 * and assert the expanded panel is returned.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-panel-full-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auto-panel-full-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const { resolveAutoPanel } = await import("../../../open-sse/services/autoPanel.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("resolveAutoPanel: expands to ALL synced models for a connected provider (not just 1)", async () => {
  const provider = "openai-compatible-chat-11111111-1111-1111-1111-111111111111";
  const connectionId = "conn-a";
  await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "Provider A",
    apiKey: "sk-a",
    defaultModel: "model-a1",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, connectionId, [
    { id: "model-a1", name: "Model A1" },
    { id: "model-a2", name: "Model A2" },
    { id: "model-a3", name: "Model A3" },
    { id: "model-a4", name: "Model A4" },
  ]);

  // maxPerProvider = 10 to get all 4; no global cap issue
  const panel = await resolveAutoPanel({ log, maxPerProvider: 10 });

  const providerModels = panel.filter((m) => m.startsWith(`${provider}/`));
  assert.ok(
    providerModels.length >= 4,
    `Expected at least 4 models from provider, got ${providerModels.length}: ${providerModels.join(", ")}`
  );
  assert.ok(providerModels.includes(`${provider}/model-a1`), "model-a1 must be in panel");
  assert.ok(providerModels.includes(`${provider}/model-a2`), "model-a2 must be in panel");
  assert.ok(providerModels.includes(`${provider}/model-a3`), "model-a3 must be in panel");
  assert.ok(providerModels.includes(`${provider}/model-a4`), "model-a4 must be in panel");
});

test("resolveAutoPanel: maxPerProvider caps models per provider (diversity)", async () => {
  const p1 = "openai-compatible-chat-aaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
  const p2 = "openai-compatible-chat-bbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb";
  await providersDb.createProviderConnection({
    provider: p1, authType: "apikey", name: "P1", apiKey: "sk-p1", defaultModel: "p1-m1",
  });
  await providersDb.createProviderConnection({
    provider: p2, authType: "apikey", name: "P2", apiKey: "sk-p2", defaultModel: "p2-m1",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(p1, "conn-p1", [
    { id: "p1-m1", name: "P1 Model 1" },
    { id: "p1-m2", name: "P1 Model 2" },
    { id: "p1-m3", name: "P1 Model 3" },
    { id: "p1-m4", name: "P1 Model 4" },
    { id: "p1-m5", name: "P1 Model 5" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(p2, "conn-p2", [
    { id: "p2-m1", name: "P2 Model 1" },
    { id: "p2-m2", name: "P2 Model 2" },
    { id: "p2-m3", name: "P2 Model 3" },
  ]);

  const panel = await resolveAutoPanel({ log, maxPerProvider: 2 });

  const p1Models = panel.filter((m) => m.startsWith(`${p1}/`));
  const p2Models = panel.filter((m) => m.startsWith(`${p2}/`));

  assert.ok(p1Models.length <= 2, `p1 should have at most 2 models, got ${p1Models.length}`);
  assert.ok(p2Models.length <= 2, `p2 should have at most 2 models, got ${p2Models.length}`);
  assert.ok(p1Models.length >= 1, "p1 must have at least 1 model");
  assert.ok(p2Models.length >= 1, "p2 must have at least 1 model");
});

test("resolveAutoPanel: skips non-chat models (e.g. image-only endpoints)", async () => {
  const provider = "openai-compatible-chat-cccc-cccc-cccc-cccc-cccccccccccc";
  await providersDb.createProviderConnection({
    provider, authType: "apikey", name: "P-Mixed", apiKey: "sk-c", defaultModel: "chat-model",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, "conn-c", [
    { id: "chat-model", name: "Chat Model", supportedEndpoints: ["chat"] },
    { id: "image-model", name: "Image Model", supportedEndpoints: ["image"] },
    { id: "responses-model", name: "Responses Model", supportedEndpoints: ["responses"] },
    { id: "default-model", name: "Default Model" }, // no endpoints = chat by default
  ]);

  const panel = await resolveAutoPanel({ log, maxPerProvider: 10 });
  const providerModels = panel.filter((m) => m.startsWith(`${provider}/`));

  assert.ok(
    providerModels.includes(`${provider}/chat-model`),
    "chat endpoint model must be included"
  );
  assert.ok(
    providerModels.includes(`${provider}/responses-model`),
    "responses endpoint model must be included"
  );
  assert.ok(
    providerModels.includes(`${provider}/default-model`),
    "model with no endpoint spec must default to chat"
  );
  assert.ok(
    !providerModels.includes(`${provider}/image-model`),
    "image-only model must be excluded from council panel"
  );
});

test("resolveAutoPanel: global maxPanel caps total (across all providers)", async () => {
  // 3 providers × 5 models each = 15 possible, cap at 6 global
  for (let i = 1; i <= 3; i++) {
    const p = `openai-compatible-chat-${String(i).padStart(4, "0")}-0000-0000-0000-000000000000`;
    await providersDb.createProviderConnection({
      provider: p, authType: "apikey", name: `P${i}`, apiKey: `sk-p${i}`, defaultModel: `p${i}-m1`,
    });
    await modelsDb.replaceSyncedAvailableModelsForConnection(p, `conn-p${i}`, [
      { id: `p${i}-m1`, name: `P${i} M1` },
      { id: `p${i}-m2`, name: `P${i} M2` },
      { id: `p${i}-m3`, name: `P${i} M3` },
      { id: `p${i}-m4`, name: `P${i} M4` },
      { id: `p${i}-m5`, name: `P${i} M5` },
    ]);
  }

  const panel = await resolveAutoPanel({ log, maxPanel: 6, maxPerProvider: 10 });
  // custom connections + no-auth free providers → only care that total ≤ maxPanel
  const customModels = panel.filter((m) =>
    m.startsWith("openai-compatible-chat-0001") ||
    m.startsWith("openai-compatible-chat-0002") ||
    m.startsWith("openai-compatible-chat-0003")
  );

  assert.ok(customModels.length > 3, `Should include models from multiple custom providers, got ${customModels.length}`);
  assert.ok(panel.length <= 6, `Panel must not exceed maxPanel=6, got ${panel.length}`);
});

test("resolveAutoPanel: provider with no synced models falls back to defaultModel", async () => {
  const provider = "openai-compatible-chat-dddd-dddd-dddd-dddd-dddddddddddd";
  await providersDb.createProviderConnection({
    provider, authType: "apikey", name: "No-Sync", apiKey: "sk-d", defaultModel: "fallback-model",
  });
  // deliberately do NOT seed any synced models for this provider

  const panel = await resolveAutoPanel({ log, maxPerProvider: 10 });
  // Should still include the fallback model from virtualFactory
  const hasProvider = panel.some((m) => m.includes("fallback-model") || m.startsWith(`${provider}/`));
  assert.ok(
    hasProvider,
    `Provider with no synced models should fall back to defaultModel — panel: ${panel.join(", ")}`
  );
});
