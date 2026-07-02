/* eslint-disable @typescript-eslint/no-explicit-any */
import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-sel-conn-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const {
  recordModelLockoutFailure,
  getModelLockoutInfo,
  clearAllModelLockouts,
  decayModelFailureCount,
} = await import("../../open-sse/services/accountFallback.ts");
const { recordProviderCooldown, isProviderInCooldown, recordProviderSuccess, clearCooldownState } =
  await import("../../open-sse/services/providerCooldownTracker.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

const settings = resolveResilienceSettings({
  resilienceSettings: {
    providerCooldown: {
      enabled: true,
      minRetryCooldownMs: 5000,
      maxRetryCooldownMs: 300000,
    },
  },
});

function createLog() {
  return {
    info: (tag: any, msg: any) => console.log(`[INFO][${tag}] ${msg}`),
    warn: (tag: any, msg: any) => console.log(`[WARN][${tag}] ${msg}`),
    error: (tag: any, msg: any) => console.log(`[ERROR][${tag}] ${msg}`),
    debug: (tag: any, msg: any) => console.log(`[DEBUG][${tag}] ${msg}`),
  };
}

async function cleanupTestDataDir() {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      return;
    } catch (error: any) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) {
    throw lastError;
  }
}

test.after(async () => {
  await cleanupTestDataDir();
  process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

beforeEach(async () => {
  clearAllModelLockouts();
  clearCooldownState();
  settingsDb.clearAllLKGP();
});

describe("combo selected connection success handling", () => {
  test("priority strategy correctly extracts dynamic connection ID from success response headers and decays lockout, resets provider cooldown, and updates LKGP", async () => {
    const comboName = "test-combo-priority";
    const modelStr = "openai/gpt-4";
    const provider = "openai";
    const dynamicConnId = "conn-dynamic-123";

    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: "OpenAI Test",
      apiKey: "sk-test",
    });

    // 1. Populate lockout failure count = 4
    recordModelLockoutFailure(
      provider,
      dynamicConnId,
      "gpt-4",
      "rate_limit_exceeded",
      429,
      120_000,
      null,
      { exactCooldownMs: 60_000 }
    );
    for (let i = 0; i < 3; i++) {
      recordModelLockoutFailure(
        provider,
        dynamicConnId,
        "gpt-4",
        "rate_limit_exceeded",
        429,
        120_000,
        null,
        { exactCooldownMs: 60_000 }
      );
    }

    // Verify initial failureCount is 4
    const initialLockout = getModelLockoutInfo(provider, dynamicConnId, "gpt-4");
    assert.equal(initialLockout?.failureCount, 4);

    // 2. Record provider cooldown
    recordProviderCooldown(provider, dynamicConnId, settings);
    assert.ok(isProviderInCooldown(provider, dynamicConnId, settings));

    // 3. Invoke handleComboChat
    const result = await handleComboChat({
      body: { stream: false },
      combo: {
        name: comboName,
        strategy: "priority",
        models: [modelStr],
        config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
      },
      handleSingleModel: async () => {
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "X-OmniRoute-Selected-Connection-Id": dynamicConnId,
          },
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(result.ok, true);

    // 4. Assertions
    // A. Dynamic connection-level failure count decay (halved to 2)
    const decayCheck = decayModelFailureCount(provider, dynamicConnId, "gpt-4");
    assert.equal(
      decayCheck.newFailureCount,
      1,
      "failure count should decay from 4 to 2, and now to 1"
    );

    // B. Dynamic connection-level provider success tracking (not in cooldown anymore)
    assert.equal(
      isProviderInCooldown(provider, dynamicConnId, settings),
      false,
      "provider cooldown should be cleared on success"
    );

    // C. Correct LKGP record updated with the dynamic connection ID (setLKGP is called)
    let persisted: any = null;
    for (let i = 0; i < 20; i++) {
      persisted = await settingsDb.getLKGP(comboName, comboName);
      if (persisted?.connectionId === dynamicConnId) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.equal(persisted?.provider, provider);
    assert.equal(
      persisted?.connectionId,
      dynamicConnId,
      "LKGP connectionId must be the dynamic connection ID"
    );
  });

  test("priority strategy with lowercase selected connection ID header correctly decays lockout, resets provider cooldown, and updates LKGP", async () => {
    const comboName = "test-combo-priority-lc";
    const modelStr = "openai/gpt-4";
    const provider = "openai";
    const dynamicConnId = "conn-dynamic-123-lc";

    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: "OpenAI Test LC",
      apiKey: "sk-test",
    });

    // 1. Populate lockout failure count = 4
    recordModelLockoutFailure(
      provider,
      dynamicConnId,
      "gpt-4",
      "rate_limit_exceeded",
      429,
      120_000,
      null,
      { exactCooldownMs: 60_000 }
    );
    for (let i = 0; i < 3; i++) {
      recordModelLockoutFailure(
        provider,
        dynamicConnId,
        "gpt-4",
        "rate_limit_exceeded",
        429,
        120_000,
        null,
        { exactCooldownMs: 60_000 }
      );
    }

    // Verify initial failureCount is 4
    const initialLockout = getModelLockoutInfo(provider, dynamicConnId, "gpt-4");
    assert.equal(initialLockout?.failureCount, 4);

    // 2. Record provider cooldown
    recordProviderCooldown(provider, dynamicConnId, settings);
    assert.ok(isProviderInCooldown(provider, dynamicConnId, settings));

    // 3. Invoke handleComboChat
    const result = await handleComboChat({
      body: { stream: false },
      combo: {
        name: comboName,
        strategy: "priority",
        models: [modelStr],
        config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
      },
      handleSingleModel: async () => {
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "x-omniroute-selected-connection-id": dynamicConnId,
          },
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(result.ok, true);

    // 4. Assertions
    const decayCheck = decayModelFailureCount(provider, dynamicConnId, "gpt-4");
    assert.equal(
      decayCheck.newFailureCount,
      1,
      "failure count should decay from 4 to 2, and now to 1"
    );

    assert.equal(
      isProviderInCooldown(provider, dynamicConnId, settings),
      false,
      "provider cooldown should be cleared on success"
    );

    let persisted: any = null;
    for (let i = 0; i < 20; i++) {
      persisted = await settingsDb.getLKGP(comboName, comboName);
      if (persisted?.connectionId === dynamicConnId) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.equal(persisted?.provider, provider);
    assert.equal(
      persisted?.connectionId,
      dynamicConnId,
      "LKGP connectionId must be the dynamic connection ID"
    );
  });

  test("round-robin strategy correctly extracts dynamic connection ID from success response headers and decays lockout, resets provider cooldown, and updates LKGP", async () => {
    const comboName = "test-combo-rr";
    const modelStr = "openai/gpt-4";
    const provider = "openai";
    const dynamicConnId = "conn-dynamic-123-rr";

    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: "OpenAI Test RR",
      apiKey: "sk-test",
    });

    // 1. Populate lockout failure count = 4
    recordModelLockoutFailure(
      provider,
      dynamicConnId,
      "gpt-4",
      "rate_limit_exceeded",
      429,
      120_000,
      null,
      { exactCooldownMs: 60_000 }
    );
    for (let i = 0; i < 3; i++) {
      recordModelLockoutFailure(
        provider,
        dynamicConnId,
        "gpt-4",
        "rate_limit_exceeded",
        429,
        120_000,
        null,
        { exactCooldownMs: 60_000 }
      );
    }

    // Verify initial failureCount is 4
    const initialLockout = getModelLockoutInfo(provider, dynamicConnId, "gpt-4");
    assert.equal(initialLockout?.failureCount, 4);

    // 2. Record provider cooldown
    recordProviderCooldown(provider, dynamicConnId, settings);
    assert.ok(isProviderInCooldown(provider, dynamicConnId, settings));

    // 3. Invoke handleComboChat with round-robin strategy
    const result = await handleComboChat({
      body: { stream: false },
      combo: {
        name: comboName,
        strategy: "round-robin",
        models: [modelStr],
        config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
      },
      handleSingleModel: async () => {
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "X-OmniRoute-Selected-Connection-Id": dynamicConnId,
          },
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: null,
      allCombos: null,
    });

    assert.equal(result.ok, true);

    // 4. Assertions
    const decayCheck = decayModelFailureCount(provider, dynamicConnId, "gpt-4");
    assert.equal(
      decayCheck.newFailureCount,
      1,
      "failure count should decay from 4 to 2, and now to 1"
    );

    assert.equal(
      isProviderInCooldown(provider, dynamicConnId, settings),
      false,
      "provider cooldown should be cleared on success"
    );

    let persisted: any = null;
    for (let i = 0; i < 20; i++) {
      persisted = await settingsDb.getLKGP(comboName, comboName);
      if (persisted?.connectionId === dynamicConnId) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.equal(persisted?.provider, provider);
    assert.equal(
      persisted?.connectionId,
      dynamicConnId,
      "LKGP connectionId must be the dynamic connection ID"
    );
  });
});
