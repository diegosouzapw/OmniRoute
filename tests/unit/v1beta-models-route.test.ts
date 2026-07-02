import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1beta-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "v1beta-models-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1betaModelsRoute = await import("../../src/app/api/v1beta/models/route.ts");

async function addActiveConnection(provider: string) {
  await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `test-key-${provider}`,
    testStatus: "active",
  });
}

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
});

test("v1beta models route deduplicates custom models against built-in and synced entries", async () => {
  // #2483: the route now lists only models whose provider has an active connection.
  await addActiveConnection("openai");
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-main", [
    {
      id: "gpt-4o",
      name: "GPT-4o From Sync",
      source: "imported",
    },
    {
      id: "review-sync-only",
      name: "Review Sync Only",
      source: "imported",
    },
  ]);
  await modelsDb.addCustomModel("openai", "gpt-4o", "GPT-4o Manual Duplicate");
  await modelsDb.addCustomModel("openai", "review-sync-only", "Review Manual Duplicate");
  await modelsDb.addCustomModel("openai", "review-manual-only", "Review Manual Only");

  const response = await v1betaModelsRoute.GET();
  const body = (await response.json()) as { models: Array<{ name: string }> };
  const names = body.models.map((model) => model.name);

  assert.equal(response.status, 200);
  assert.equal(names.filter((name) => name === "models/openai/gpt-4o").length, 1);
  assert.equal(names.filter((name) => name === "models/openai/review-sync-only").length, 1);
  assert.equal(names.filter((name) => name === "models/openai/review-manual-only").length, 1);
});

test("v1beta models route excludes providers without an active connection (#2483)", async () => {
  // No connections configured at all → no built-in catalog models should leak.
  const emptyResp = await v1betaModelsRoute.GET();
  const emptyBody = (await emptyResp.json()) as { models: Array<{ name: string }> };
  assert.equal(emptyResp.status, 200);
  assert.equal(emptyBody.models.length, 0, "no active connections → empty model list");

  // Configure ONLY an anthropic connection; custom models for an unconfigured provider
  // (kie) must NOT appear, while anthropic catalog models do.
  await addActiveConnection("anthropic");
  await modelsDb.addCustomModel("kie", "claude-opus-4-7", "Kie Claude Opus");
  const resp = await v1betaModelsRoute.GET();
  const body = (await resp.json()) as { models: Array<{ name: string }> };
  const names = body.models.map((m) => m.name);
  assert.ok(!names.some((n) => n.startsWith("models/kie/")), "unconfigured kie must be excluded");
  assert.ok(
    names.some((n) => n.startsWith("models/anthropic/")),
    "configured anthropic must be present"
  );
});

test("v1beta models route does not invent token limits for unknown custom models", async () => {
  await addActiveConnection("openai-compatible-review");
  await modelsDb.addCustomModel(
    "openai-compatible-review",
    "mystery-model",
    "Mystery Model",
    "manual"
  );

  const response = await v1betaModelsRoute.GET();
  const body = (await response.json()) as { models: Array<Record<string, unknown>> };
  const model = body.models.find(
    (entry) => entry.name === "models/openai-compatible-review/mystery-model"
  );

  assert.equal(response.status, 200);
  assert.ok(model, "custom model should be listed");
  assert.equal("inputTokenLimit" in model, false);
  assert.equal("outputTokenLimit" in model, false);
});

test("v1beta models route lists cc fallback models for active CC-compatible providers", async () => {
  await addActiveConnection("anthropic-compatible-cc-review");

  const response = await v1betaModelsRoute.GET();
  const body = (await response.json()) as { models: Array<Record<string, unknown>> };
  const names = body.models.map((entry) => entry.name);

  assert.equal(response.status, 200);
  assert.ok(
    names.includes("models/anthropic-compatible-cc-review/claude-fable-5"),
    "CC-compatible provider should share the cc fallback model list"
  );
});

test("v1beta models route reads synced Gemini provider-first capabilities", async () => {
  await addActiveConnection("gemini");
  await modelsDb.replaceSyncedAvailableModelsForConnection("gemini", "conn-main", [
    {
      id: "gemini-custom-preview",
      name: "Gemini Custom Preview",
      source: "imported",
      capabilities: {
        contextWindow: 123456,
        maxOutputTokens: 6543,
        supportsReasoning: true,
      },
    },
  ]);

  const response = await v1betaModelsRoute.GET();
  const body = (await response.json()) as { models: Array<Record<string, unknown>> };
  const model = body.models.find((entry) => entry.name === "models/gemini/gemini-custom-preview");

  assert.equal(response.status, 200);
  assert.ok(model, "synced Gemini model should be listed");
  assert.equal(model.inputTokenLimit, 123456);
  assert.equal(model.outputTokenLimit, 6543);
  assert.equal(model.thinking, true);
});
