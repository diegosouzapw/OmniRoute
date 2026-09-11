import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-turn-pin-repro-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { lockExactModel, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const {
  getNativeCodexTurnPin,
  clearNativeCodexTurnPinsForTests,
  NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE,
  NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_MESSAGE,
} = await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
const { recordProviderCooldown, isProviderInCooldown, clearCooldownState } =
  await import("../../open-sse/services/providerCooldownTracker.ts");
const { PROVIDER_PROFILES } = await import("../../open-sse/config/constants.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

const testSettings = {
  resilienceSettings: {
    providerCooldown: { enabled: true, minRetryCooldownMs: 5000, maxRetryCooldownMs: 300000 },
    comboCooldownWait: { enabled: false },
  },
};

const settings = resolveResilienceSettings(testSettings);

function createLog(entries: Array<{ level: string; tag: string; msg: string }> = []) {
  return {
    info: (tag: string, msg: string) => {
      entries.push({ level: "info", tag, msg });
    },
    warn: (tag: string, msg: string) => {
      entries.push({ level: "warn", tag, msg });
    },
    error: (tag: string, msg: string) => {
      entries.push({ level: "error", tag, msg });
    },
    debug: (tag: string, msg: string) => {
      entries.push({ level: "debug", tag, msg });
    },
    entries,
  };
}

async function cleanupTestDataDir() {
  let lastError: unknown;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      return;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  if (lastError) throw lastError;
}

test.after(async () => {
  await cleanupTestDataDir();
  process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

beforeEach(async () => {
  clearAllModelLockouts();
  clearCooldownState();
  resetAllCircuitBreakers();
  clearNativeCodexTurnPinsForTests();
});

describe("Native Codex Turn Pin model-scoped fallback", () => {
  const comboName = "Codex";
  const opusModel = "antigravity/claude-opus-4-6-thinking";
  const geminiModel = "antigravity/gemini-3.7-flash-high";
  const codexModel = "codex/gpt-5.5-high";

  const comboConfig = {
    name: comboName,
    strategy: "fill-first" as const,
    models: [opusModel, geminiModel, codexModel],
    config: {
      maxRetries: 0,
      concurrencyPerModel: 1,
      queueTimeoutMs: 1000,
    },
  };

  const nativeTurnBody = {
    stream: false,
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({
        thread_id: "thread-prod-123",
        turn_id: "turn-prod-456",
      }),
    },
  };

  test("3-Phase Production Scenario: Phase 1 Opus pins -> Phase 2 terminal 400 preserving pin -> Phase 3 new turn routes Gemini", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });
    const conn2 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 2",
    });
    await providersDb.createProviderConnection({
      provider: "codex",
      authType: "apikey",
      name: "Codex Key",
      apiKey: "sk-codex-test",
    });

    const conn1Id = conn1.id;
    const conn2Id = conn2.id;

    const attemptedModels: string[] = [];

    // Phase 1: Native turn-prod-456 on thread-prod-123 -> Opus succeeds, pin created
    const phase1Result = await handleComboChat({
      body: nativeTurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attemptedModels.push(modelStr);
        return new Response(
          JSON.stringify({ choices: [{ message: { content: "opus output" } }] }),
          {
            status: 200,
            headers: {
              "content-type": "application/json",
              "x-omniroute-selected-connection-id": conn1Id,
            },
          }
        );
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(phase1Result.ok, true);
    assert.deepEqual(attemptedModels, [opusModel]);

    const pin = getNativeCodexTurnPin(nativeTurnBody, comboName);
    assert.ok(pin, "Turn pin created after phase 1");
    assert.equal(pin.modelStr, opusModel);
    assert.equal(pin.provider, "antigravity");
    assert.equal(pin.connectionId, conn1Id);

    // Phase 2: SAME native turn (turn-prod-456) -> Opus becomes locked on all Antigravity accounts
    lockExactModel("antigravity", conn1Id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", conn2Id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    attemptedModels.length = 0;
    const phase2LogEntries: Array<{ level: string; tag: string; msg: string }> = [];

    const phase2Result = await handleComboChat({
      body: nativeTurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attemptedModels.push(modelStr);
        return new Response(JSON.stringify({ error: "unexpected model dispatch" }), {
          status: 500,
        });
      },
      isModelAvailable: async () => true,
      log: createLog(phase2LogEntries),
      settings: testSettings,
      allCombos: null,
    });

    // Phase 2 assertions: non-retryable 400 Bad Request terminates turn without reconnect storms
    assert.equal(phase2Result.status, 400, "Phase 2 must return non-retryable 400 Bad Request");
    assert.equal(phase2Result.ok, false);
    const phase2Body = await phase2Result.json();
    assert.equal(phase2Body.error.code, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE);
    assert.equal(phase2Body.error.message, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_MESSAGE);
    assert.equal(phase2Body.error.type, "invalid_request_error");
    assert.deepEqual(
      attemptedModels,
      [],
      "Zero models dispatched during phase 2 (no mid-turn switch to Gemini or Codex)"
    );
    assert.equal(
      isProviderInCooldown("antigravity", undefined, settings),
      false,
      "Antigravity provider must NOT be marked globally exhausted"
    );

    // Pinned turn is NOT released mid-turn
    const pinAfterPhase2 = getNativeCodexTurnPin(nativeTurnBody, comboName);
    assert.ok(pinAfterPhase2, "Turn pin must remain active for turn-prod-456");
    assert.equal(pinAfterPhase2.modelStr, opusModel, "Turn pin remains locked to Opus");

    const terminalLog = phase2LogEntries.find(
      (e) =>
        e.tag === "COMBO" &&
        e.msg.includes("Native Codex turn cannot continue") &&
        e.msg.includes("model-scoped")
    );
    assert.ok(terminalLog, "Should log structured warning about model-scoped turn termination");

    // Phase 3: NEW native turn (turn-prod-457) in same thread -> Opus still locked, normal Combo routing selects Gemini
    const phase3TurnBody = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread-prod-123",
          turn_id: "turn-prod-457",
        }),
      },
    };

    attemptedModels.length = 0;
    const phase3Result = await handleComboChat({
      body: phase3TurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attemptedModels.push(modelStr);
        if (modelStr === geminiModel) {
          return new Response(
            JSON.stringify({ choices: [{ message: { content: "gemini output" } }] }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
                "x-omniroute-selected-connection-id": conn1Id,
              },
            }
          );
        }
        return new Response(JSON.stringify({ error: "unexpected model" }), { status: 500 });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(phase3Result.ok, true, "Phase 3 must succeed with next healthy combo model");
    assert.deepEqual(
      attemptedModels,
      [geminiModel],
      "Gemini attempted and succeeded; Codex GPT not called"
    );

    const pinPhase3 = getNativeCodexTurnPin(phase3TurnBody, comboName);
    assert.ok(pinPhase3, "New turn pin created for phase 3");
    assert.equal(pinPhase3.modelStr, geminiModel, "Phase 3 pinned to Gemini");

    const pinPhase2Check = getNativeCodexTurnPin(nativeTurnBody, comboName);
    assert.equal(pinPhase2Check?.modelStr, opusModel, "Phase 2 turn pin still intact on Opus");
  });

  test("Pinned connection fails over to sibling connection for same provider+model when sibling healthy", async () => {
    const conn1Id = "conn-1";
    const conn2Id = "conn-2";

    const explicitComboConfig = {
      name: comboName,
      strategy: "fill-first" as const,
      models: [
        { id: "s1", kind: "model" as const, model: opusModel, connectionId: conn1Id, weight: 1 },
        { id: "s2", kind: "model" as const, model: opusModel, connectionId: conn2Id, weight: 1 },
        { id: "s3", kind: "model" as const, model: geminiModel, connectionId: conn1Id, weight: 1 },
      ],
      config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
    };

    // Phase 1: Opus succeeds on conn1
    await handleComboChat({
      body: nativeTurnBody,
      combo: explicitComboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: "opus conn1" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": conn1Id },
        }),
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    // Phase 2: Lock ONLY conn1 Opus, conn2 remains healthy
    lockExactModel("antigravity", conn1Id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    const attempted: Array<{ modelStr: string; connectionId?: string }> = [];
    const phase2Result = await handleComboChat({
      body: nativeTurnBody,
      combo: explicitComboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr, target) => {
        attempted.push({ modelStr, connectionId: target?.connectionId ?? undefined });
        return new Response(JSON.stringify({ choices: [{ message: { content: "opus conn2" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": conn2Id },
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(phase2Result.ok, true);
    assert.equal(attempted.length, 1);
    assert.equal(attempted[0].modelStr, opusModel, "Opus must remain pinned");
    assert.equal(attempted[0].connectionId, conn2Id, "Connection must fail over to conn2");
  });

  test("Turn pin NOT released when provider circuit breaker is OPEN", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    await handleComboChat({
      body: nativeTurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: "opus" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": conn1.id },
        }),
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    // Trip provider circuit breaker
    const cb = getCircuitBreaker("antigravity", { failureThreshold: 1, resetTimeout: 60000 });
    try {
      await cb.execute(async () => {
        throw new Error("simulated 503");
      });
    } catch {
      // expected
    }
    assert.equal(cb.getStatus().state, "OPEN");

    const attempted: string[] = [];
    const result = await handleComboChat({
      body: nativeTurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attempted.push(modelStr);
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(result.ok, false, "Should fail due to provider circuit breaker OPEN");
    assert.equal(attempted.length, 0, "No targets should be attempted");
  });

  test("Turn pin NOT released when provider in global cooldown", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    await handleComboChat({
      body: nativeTurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: "opus" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": conn1.id },
        }),
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    // #12247: the window gate needs providerFailureThreshold failures before
    // the whole provider counts as cooling.
    for (let i = 0; i < PROVIDER_PROFILES.oauth.providerFailureThreshold; i++) {
      recordProviderCooldown("antigravity", undefined, settings);
    }
    assert.equal(isProviderInCooldown("antigravity", undefined, settings), true);

    const attempted: string[] = [];
    const result = await handleComboChat({
      body: nativeTurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attempted.push(modelStr);
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(result.ok, false);
    assert.equal(attempted.length, 0);
  });

  test("Request without active turn pin retains full Combo fallback when first model is locked", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });
    const codexConn = await providersDb.createProviderConnection({
      provider: "codex",
      authType: "apikey",
      name: "Codex Key",
      apiKey: "sk-codex-test",
    });

    const unpinnedBody = { stream: false };

    // Lock Opus
    lockExactModel("antigravity", conn1.id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    const attempted: string[] = [];

    // Gemini fails transiently (500), falls back to Codex GPT-5.5 in normal combo chain
    const result = await handleComboChat({
      body: unpinnedBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attempted.push(modelStr);
        if (modelStr === geminiModel) {
          return new Response(JSON.stringify({ error: { message: "gemini server error" } }), {
            status: 500,
          });
        }
        if (modelStr === codexModel) {
          return new Response(
            JSON.stringify({ choices: [{ message: { content: "codex output" } }] }),
            {
              status: 200,
              headers: { "x-omniroute-selected-connection-id": codexConn.id },
            }
          );
        }
        return new Response(JSON.stringify({ error: "unexpected model" }), { status: 500 });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(result.ok, true);
    assert.deepEqual(
      attempted,
      [geminiModel, codexModel],
      "Should try Gemini, then Codex in combo order"
    );
  });

  test("Retrying failed Phase 2 turn repeatedly yields terminal 400 without mid-turn cross-model leak", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    // Phase 1: Opus succeeds
    await handleComboChat({
      body: nativeTurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: "opus" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": conn1.id },
        }),
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    lockExactModel("antigravity", conn1.id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    for (let retry = 0; retry < 3; retry += 1) {
      const attempted: string[] = [];
      const result = await handleComboChat({
        body: nativeTurnBody,
        combo: comboConfig,
        clientManagedResponsesContext: true,
        handleSingleModel: async (_b, m) => {
          attempted.push(m);
          return new Response(JSON.stringify({ ok: true }), { status: 200 });
        },
        isModelAvailable: async () => true,
        log: createLog(),
        settings: testSettings,
        allCombos: null,
      });
      assert.equal(result.status, 400);
      assert.equal(attempted.length, 0);
    }
  });
});
