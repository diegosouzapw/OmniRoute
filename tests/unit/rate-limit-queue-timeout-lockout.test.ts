import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-rl-queue-timeout-lockout-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-rl-lockout-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getModelLockoutInfo, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");

function createLog() {
  return {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
}

async function seedConnection(provider: string, overrides: any = {}): Promise<any> {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey || `sk-test-${Math.random().toString(16).slice(2, 8)}`,
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: null,
    backoffLevel: overrides.backoffLevel || 0,
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

function errorResponseWithoutConnectionId(status: number) {
  return new Response(JSON.stringify({ error: { message: "Local queue timeout" } }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function errorResponseWithConnectionId(status: number, connectionId: string) {
  return new Response(JSON.stringify({ error: { message: "Local queue timeout" } }), {
    status,
    headers: {
      "content-type": "application/json",
      "X-OmniRoute-Selected-Connection-Id": connectionId,
    },
  });
}

test.afterEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("RATE_LIMIT_QUEUE_TIMEOUT lockout behaves correctly depending on connection ID header", async () => {
  const provider = "openai";
  const model = "gpt-4";

  // Seed the connection first!
  const connection = await seedConnection(provider);
  const connectionId = connection.id;

  const customSettings = {
    modelLockout: {
      enabled: true,
      errorCodes: [502, 520],
      baseCooldownMs: 3000,
      maxCooldownMs: 5000,
      maxBackoffSteps: 10,
      useExponentialBackoff: true,
    },
  };

  const logs = createLog();

  // Scenario 1: Response lacks connection ID header (Current buggy behavior)
  await handleComboChat({
    body: {},
    combo: {
      name: "test-combo",
      strategy: "priority",
      models: [`${provider}/${model}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => {
      return errorResponseWithoutConnectionId(502);
    },
    isModelAvailable: async () => true,
    log: logs as any,
    settings: customSettings,
    allCombos: null,
  });

  // Verify that the model is NOT locked for the actual connection connectionId
  const lockedForConnBuggy = isModelLocked(provider, connectionId, model);
  assert.equal(
    lockedForConnBuggy,
    false,
    "Model should not be locked for actual connection when header is missing"
  );

  // Verify that it got locked under the empty string connectionId ""
  const lockedForEmptyBuggy = isModelLocked(provider, "", model);
  assert.equal(
    lockedForEmptyBuggy,
    true,
    "Model is incorrectly locked under empty string connectionId when header is missing"
  );

  const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
  clearAllModelLockouts();

  await handleComboChat({
    body: {},
    combo: {
      name: "test-combo",
      strategy: "priority",
      models: [`${provider}/${model}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => {
      return errorResponseWithConnectionId(502, connectionId);
    },
    isModelAvailable: async () => true,
    log: logs as any,
    settings: customSettings,
    allCombos: null,
  });

  // Verify that the model IS locked for the actual connection
  const lockedForConnFixed = isModelLocked(provider, connectionId, model);
  assert.equal(lockedForConnFixed, true, "Model should be locked for the correct connection ID");
});
