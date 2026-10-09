import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "poixe-free-12765-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "poixe-free-12765-test-secret";

const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createApiKey, updateApiKeyPermissions, isModelAllowedForKey, resetApiKeyState } =
  await import("../../src/lib/db/apiKeys.ts");

test.before(async () => {
  for (const provider of ["poixe-ai", "helyxai"]) {
    const connection = await createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: "test-only",
      name: "Partial catalog fixture",
      isActive: true,
    });
    await replaceSyncedAvailableModelsForConnection(provider, connection.id, [
      { id: "qwen3-32b", name: "Qwen3 32B", source: "imported" },
      { id: "deepseek-chat", name: "DeepSeek Chat", source: "imported" },
    ]);
  }
});

test.after(() => {
  resetApiKeyState();
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("#12765 Poixe billing aliases remain routable after bare-only live sync", async () => {
  for (const model of ["qwen3-32b:free", "deepseek-chat:free"]) {
    const resolved = await getModelInfo(`poixe-ai/${model}`);
    assert.equal(resolved.errorType, undefined, resolved.errorMessage);
    assert.equal(resolved.provider, "poixe-ai");
    assert.equal(resolved.model, model, "the billing suffix must reach upstream unchanged");
  }
  assert.equal((await getModelInfo("poixe-ai/qwen3-32b")).model, "qwen3-32b");
});

test("#12765 authoritative discovery remains enforced for other providers", async () => {
  assert.equal((await getModelInfo("helyxai/qwen3-32b")).provider, "helyxai");
  assert.equal((await getModelInfo("helyxai/qwen3-32b:free")).errorType, "model_not_found");
});

test("#12765 partial discovery never grants access beyond API-key model permissions", async () => {
  const key = await createApiKey("Poixe restricted test", "poixe-test-machine");
  const freeModel = "poixe-ai/qwen3-32b:free";
  await updateApiKeyPermissions(key.id, { allowedModels: ["poixe-ai/*"] });
  assert.equal(await isModelAllowedForKey(key.key, freeModel), true);
  await updateApiKeyPermissions(key.id, { blockedModels: [freeModel] });
  assert.equal(await isModelAllowedForKey(key.key, freeModel), false);
  await updateApiKeyPermissions(key.id, {
    blockedModels: [],
    allowedModels: ["helyxai/*"],
  });
  assert.equal(await isModelAllowedForKey(key.key, freeModel), false);
});
