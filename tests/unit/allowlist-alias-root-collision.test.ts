/**
 * #15409: a restricted allow-list entry must stay inside the provider it names.
 *
 * Cline's catalog id `cline/deepseek/deepseek-v4-flash` expands through the
 * provider alias `cl`, and its model root is `deepseek/deepseek-v4-flash`.
 * That root is also how OpenRouter (and the native DeepSeek provider) address
 * the same upstream model. Matching the root, or any candidate whose provider
 * was not itself allowed, leaks those other providers' models.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-allowlist-root-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-allowlist-root-collision";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");

async function resetStorage() {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("allowing one provider's model does not allow another provider's model with the same root", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Cline DeepSeek only", "allowlist-root");
  await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels: ["cline/deepseek/deepseek-v4-flash"],
  });
  apiKeys.resetApiKeyState();

  assert.equal(
    await apiKeys.isModelAllowedForKey(created.key, "cline/deepseek/deepseek-v4-flash"),
    true,
    "the named provider's model stays allowed"
  );
  assert.equal(
    await apiKeys.isModelAllowedForKey(created.key, "cl/deepseek/deepseek-v4-flash"),
    true,
    "the same provider's public alias stays allowed"
  );

  for (const leaked of [
    "cline/openrouter/deepseek/deepseek-v4-flash",
    "cl/openrouter/deepseek/deepseek-v4-flash",
    "openrouter/deepseek/deepseek-v4-flash",
    "deepseek/deepseek-v4-flash",
    "ds/deepseek-v4-flash",
  ]) {
    assert.equal(
      await apiKeys.isModelAllowedForKey(created.key, leaked),
      false,
      `${leaked} shares the model root but was not allowed`
    );
  }
});

test("a provider wildcard does not allow a nested provider that reuses the model root", async () => {
  await resetStorage();
  const created = await apiKeys.createApiKey("Cline wildcard", "allowlist-wildcard");
  await apiKeys.updateApiKeyPermissions(created.id, {
    modelAccessMode: "restricted",
    allowedModels: ["cline/*"],
  });
  apiKeys.resetApiKeyState();

  assert.equal(
    await apiKeys.isModelAllowedForKey(created.key, "cline/deepseek/deepseek-v4-flash"),
    true
  );
  assert.equal(await apiKeys.isModelAllowedForKey(created.key, "cl/z-ai/glm-5.2"), true);

  for (const leaked of [
    "cline/openrouter/deepseek/deepseek-v4-flash",
    "cl/openrouter/deepseek/deepseek-v4-flash",
    "openrouter/deepseek/deepseek-v4-flash",
  ]) {
    assert.equal(
      await apiKeys.isModelAllowedForKey(created.key, leaked),
      false,
      `${leaked} is served by a provider the wildcard did not name`
    );
  }
});
