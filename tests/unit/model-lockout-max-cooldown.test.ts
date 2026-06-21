import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-lockout-max-cooldown-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-lockout-max-cooldown-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { recordModelLockoutFailure, getModelLockoutInfo, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

function createLog() {
  return {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
}

function errorResponse(status: number, message: string = `Error ${status}`) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "content-type": "application/json" },
  });
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

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  clearAllModelLockouts();
  await resetStorage();
});

test.after(async () => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

test("recordModelLockoutFailure honors maxCooldownMs option parameter", () => {
  const provider = "openai";
  const connectionId = "conn-s1";
  const model = "gpt-4";

  const first = recordModelLockoutFailure(
    provider,
    connectionId,
    model,
    "rate_limited",
    429,
    500,
    null,
    {
      maxCooldownMs: 1500,
    }
  );
  assert.equal(first.cooldownMs, 500);

  const originalNow = Date.now;
  try {
    let fakeNow = Date.now();
    Date.now = () => fakeNow;

    fakeNow += 600;
    const second = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "rate_limited",
      429,
      500,
      null,
      {
        maxCooldownMs: 1500,
      }
    );
    assert.equal(second.cooldownMs, 1000);

    fakeNow += 1100;
    const third = recordModelLockoutFailure(
      provider,
      connectionId,
      model,
      "rate_limited",
      429,
      500,
      null,
      {
        maxCooldownMs: 1500,
      }
    );
    assert.equal(third.cooldownMs, 1500);
  } finally {
    Date.now = originalNow;
  }
});

test("handleComboChat quality failure model lockout honors maxCooldownMs settings", async () => {
  const provider = "openai";
  const model = "gpt-4";

  const customSettings = {
    modelLockout: {
      enabled: true,
      errorCodes: [502],
      baseCooldownMs: 3000,
      maxCooldownMs: 5000,
      maxBackoffSteps: 10,
      useExponentialBackoff: true,
    },
  };

  const logs = createLog();
  const executeComboWithFailure = async () => {
    return handleComboChat({
      body: {},
      combo: {
        name: "test-combo",
        strategy: "priority",
        models: [`${provider}/${model}`],
        config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
      },
      handleSingleModel: async () => {
        return errorResponse(502);
      },
      isModelAvailable: async () => true,
      log: logs as any,
      settings: customSettings,
      allCombos: null,
    });
  };

  const originalNow = Date.now;
  try {
    let fakeNow = Date.now();
    Date.now = () => fakeNow;

    await executeComboWithFailure();
    let info = getModelLockoutInfo(provider, "", model);
    assert.ok(info && info.remainingMs <= 3000);

    fakeNow += 3100;
    await executeComboWithFailure();
    info = getModelLockoutInfo(provider, "", model);
    assert.ok(info);
    assert.ok(
      info!.remainingMs <= 5000,
      `Expected remainingMs to be capped at 5000, but got ${info!.remainingMs}`
    );
  } finally {
    Date.now = originalNow;
  }
});

test("markAccountUnavailable local 404 lockout honors maxCooldownMs settings", async () => {
  const provider = "openai";
  const model = "local-gpt-4";
  const connection = (await seedConnection(provider, {
    providerSpecificData: { baseUrl: "http://127.0.0.1:8080/v1" },
  })) as any;

  await settingsDb.updateSettings({
    modelLockout: {
      enabled: true,
      errorCodes: [404],
      baseCooldownMs: 3000,
      maxCooldownMs: 5000,
      maxBackoffSteps: 10,
      useExponentialBackoff: true,
    },
  });

  const originalNow = Date.now;
  try {
    let fakeNow = Date.now();
    Date.now = () => fakeNow;

    await auth.markAccountUnavailable(connection.id as string, 404, "not found", provider, model);
    let info = getModelLockoutInfo(provider, connection.id as string, model);
    assert.ok(info && info.remainingMs <= 3000);

    fakeNow += 3100;
    await providersDb.updateProviderConnection(connection.id as string, { rateLimitedUntil: null });
    await auth.markAccountUnavailable(connection.id as string, 404, "not found", provider, model);
    info = getModelLockoutInfo(provider, connection.id as string, model);
    assert.ok(info);
    assert.ok(
      info!.remainingMs <= 5000,
      `Expected remainingMs to be capped at 5000, but got ${info!.remainingMs}`
    );
  } finally {
    Date.now = originalNow;
  }
});
