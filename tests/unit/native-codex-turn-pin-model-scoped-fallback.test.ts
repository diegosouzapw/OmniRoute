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
const { getNativeCodexTurnPin, clearNativeCodexTurnPinsForTests } =
  await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
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

  test("3-Phase Production Scenario: Phase 1 Opus pins -> Phase 2 pinned model unusable -> pin released, Gemini takes over -> Phase 3 new turn routes Gemini", async () => {
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

    // Phase 2: SAME native turn (turn-prod-456) -> Opus becomes locked on all Antigravity
    // accounts. The pinned model is model-scoped unusable, so the turn pin is released and the
    // combo falls back to the next healthy model (Gemini) — matching Claude Code's natural
    // multi-model fallback for long-running sessions.
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
        if (modelStr === geminiModel) {
          return new Response(
            JSON.stringify({ choices: [{ message: { content: "gemini continued" } }] }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
                "x-omniroute-selected-connection-id": conn2Id,
              },
            }
          );
        }
        return new Response(JSON.stringify({ error: "unexpected model dispatch" }), {
          status: 500,
        });
      },
      isModelAvailable: async () => true,
      log: createLog(phase2LogEntries),
      settings: testSettings,
      allCombos: null,
    });

    // Phase 2 assertions: pin released and the turn continues on Gemini
    assert.equal(
      phase2Result.ok,
      true,
      "Phase 2 must succeed after falling back off the locked model"
    );
    assert.equal(phase2Result.status, 200);
    assert.deepEqual(
      attemptedModels,
      [geminiModel],
      "Gemini (first healthy model) tried and succeeded; Opus skipped, Codex not called"
    );
    assert.equal(
      isProviderInCooldown("antigravity", undefined, settings),
      false,
      "Antigravity provider must NOT be marked globally exhausted"
    );

    // Turn pin is released, then re-pinned to Gemini for the remainder of the turn
    const pinAfterPhase2 = getNativeCodexTurnPin(nativeTurnBody, comboName);
    assert.ok(pinAfterPhase2, "New turn pin created after mid-turn fallback");
    assert.equal(pinAfterPhase2.modelStr, geminiModel, "Turn pin now locked to Gemini");
    assert.equal(pinAfterPhase2.provider, "antigravity");

    const releaseLog = phase2LogEntries.find(
      (e) =>
        e.tag === "COMBO" &&
        e.msg.includes("Native Codex turn pin released") &&
        e.msg.includes("model-scoped unavailable")
    );
    assert.ok(releaseLog, "Should log structured warning about pin release and fallback");

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
    assert.equal(pinPhase2Check?.modelStr, geminiModel, "Phase 2 turn pin remains on Gemini");
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

  test("Retrying failed Phase 2 turn after pinned model becomes unusable succeeds against healthy sibling, re-pinned without flapping", async () => {
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
          return new Response(
            JSON.stringify({ choices: [{ message: { content: "gemini retry" } }] }),
            { status: 200, headers: { "x-omniroute-selected-connection-id": conn1.id } }
          );
        },
        isModelAvailable: async () => true,
        log: createLog(),
        settings: testSettings,
        allCombos: null,
      });
      assert.equal(result.ok, true, `Retry ${retry} must succeed after pin release`);
      assert.equal(result.status, 200);
      assert.deepEqual(
        attempted,
        [geminiModel],
        `Retry ${retry} must hit Gemini only (Opus skipped, no flapping)`
      );
      const pin = getNativeCodexTurnPin(nativeTurnBody, comboName);
      assert.equal(pin?.modelStr, geminiModel, `Retry ${retry} re-pins the turn to Gemini`);
    }
  });

  test("Pinned model becomes model-scoped unusable mid-turn -> pin released and combo falls back to healthy models", async () => {
    // This test reproduces the user's production failure:
    // - Turn 1: Opus succeeds, pin created
    // - Turn 2 (same turn_id): Opus locked on all accounts, but combo has Gemini and Codex as healthy fallbacks
    // - Expected: pin released, Gemini tried and succeeds, new pin created for Gemini
    // - This matches Claude Code's behavior where no turn pin allows natural fallback

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

    // Phase 2: SAME native turn (turn-prod-456) -> Opus becomes locked on ALL Antigravity accounts
    // BUT combo has healthy fallbacks (Gemini, Codex) that should be tried
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
        if (modelStr === geminiModel) {
          return new Response(
            JSON.stringify({ choices: [{ message: { content: "gemini output" } }] }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
                "x-omniroute-selected-connection-id": conn2Id,
              },
            }
          );
        }
        if (modelStr === codexModel) {
          return new Response(
            JSON.stringify({ choices: [{ message: { content: "codex output" } }] }),
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
      log: createLog(phase2LogEntries),
      settings: testSettings,
      allCombos: null,
    });

    // Phase 2 assertions: should succeed by falling back to Gemini
    assert.equal(phase2Result.ok, true, "Phase 2 must succeed by falling back to healthy model");
    assert.equal(phase2Result.status, 200);
    assert.deepEqual(
      attemptedModels,
      [geminiModel],
      "Should try Gemini (first healthy fallback) and succeed; Opus skipped, Codex not called"
    );

    // Pin should be released and re-created for Gemini
    const pinAfterPhase2 = getNativeCodexTurnPin(nativeTurnBody, comboName);
    assert.ok(pinAfterPhase2, "New turn pin must be created for Gemini");
    assert.equal(pinAfterPhase2.modelStr, geminiModel, "Turn pin updated to Gemini");
    assert.equal(pinAfterPhase2.provider, "antigravity");

    // Should log warning about pin release
    const releaseLog = phase2LogEntries.find(
      (e) =>
        e.tag === "COMBO" &&
        e.msg.includes("Native Codex turn pin released") &&
        e.msg.includes("model-scoped unavailable")
    );
    assert.ok(releaseLog, "Should log structured warning about pin release and fallback");

    // Phase 3: Same turn continues with Gemini pinned -> should use Gemini
    attemptedModels.length = 0;
    const phase3Result = await handleComboChat({
      body: nativeTurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attemptedModels.push(modelStr);
        return new Response(
          JSON.stringify({ choices: [{ message: { content: "gemini continued" } }] }),
          {
            status: 200,
            headers: { "x-omniroute-selected-connection-id": conn2Id },
          }
        );
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(phase3Result.ok, true, "Phase 3 must continue with pinned Gemini");
    assert.deepEqual(attemptedModels, [geminiModel], "Should use pinned Gemini");

    // Phase 4: NEW turn (turn-prod-457) -> normal combo routing, Opus still locked, Gemini selected
    const phase4TurnBody = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread-prod-123",
          turn_id: "turn-prod-457",
        }),
      },
    };

    attemptedModels.length = 0;
    const phase4Result = await handleComboChat({
      body: phase4TurnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attemptedModels.push(modelStr);
        return new Response(
          JSON.stringify({ choices: [{ message: { content: "gemini new turn" } }] }),
          {
            status: 200,
            headers: { "x-omniroute-selected-connection-id": conn2Id },
          }
        );
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(phase4Result.ok, true);
    assert.deepEqual(attemptedModels, [geminiModel]);
    const pinPhase4 = getNativeCodexTurnPin(phase4TurnBody, comboName);
    assert.equal(pinPhase4.modelStr, geminiModel, "New turn pinned to Gemini");
  });
});
