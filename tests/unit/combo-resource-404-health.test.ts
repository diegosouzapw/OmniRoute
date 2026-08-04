import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-combo-resource-404-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-combo-resource-404";

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearAllModelLockouts, getModelLockoutInfo } =
  await import("../../open-sse/services/accountFallback.ts");
const { clearCooldownState, isProviderInCooldown } =
  await import("../../open-sse/services/providerCooldownTracker.ts");

const settings = {
  modelLockout: {
    enabled: true,
    errorCodes: [404],
    baseCooldownMs: 120_000,
    maxCooldownMs: 1_800_000,
    maxBackoffSteps: 10,
    useExponentialBackoff: true,
  },
  providerCooldown: {
    enabled: true,
    minRetryCooldownMs: 1_000,
    maxRetryCooldownMs: 60_000,
  },
};

const log = {
  info: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
};

test.beforeEach(() => {
  clearAllModelLockouts();
  clearCooldownState();
});

test.after(() => {
  clearAllModelLockouts();
  clearCooldownState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("combo resource 404 never records model lockout or provider cooldown", async () => {
  const provider = "openai";
  const models = ["gpt-5", "gpt-4o"];

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "read the attached file" }] },
    combo: {
      name: "resource-404-health",
      strategy: "priority",
      models: models.map((model) => `${provider}/${model}`),
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () =>
      new Response(
        JSON.stringify({
          error: {
            message: "[404]: Files [file-be30851bd1614656872e725e] were not found",
            type: "invalid_request_error",
            code: "model_not_found",
          },
        }),
        { status: 404, headers: { "content-type": "application/json" } }
      ),
    isModelAvailable: async () => true,
    log,
    settings,
    allCombos: null,
  });

  assert.equal(result.status, 404);
  for (const model of models) {
    assert.equal(
      getModelLockoutInfo(provider, "", model),
      null,
      `${model} must remain available after a request-resource 404`
    );
  }
  assert.equal(isProviderInCooldown(provider, undefined, settings), false);
});
