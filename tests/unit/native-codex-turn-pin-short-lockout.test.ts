import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Prod 2026-09-30: another client's request hit an upstream "Internal error during
// token generation" on grok-cli/grok-4.6, which set a 5s `server_error` model-only
// lockout. A native Codex turn pinned to that model arrived 1.4s later and was
// terminated with 400 NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE, although the combo
// cooldown-wait could have waited the 5s out on the pinned model itself.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pin-short-lock-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { lockExactModel, clearAllModelLockouts, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");
const { clearNativeCodexTurnPinsForTests, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE } =
  await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
const { clearCooldownState } = await import("../../open-sse/services/providerCooldownTracker.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

function settingsWithCooldownWait(enabled: boolean) {
  return {
    resilienceSettings: {
      providerCooldown: { enabled: true, minRetryCooldownMs: 5000, maxRetryCooldownMs: 300000 },
      comboCooldownWait: { enabled, maxWaitMs: 3000, maxAttempts: 2, budgetMs: 6000 },
    },
  };
}

function createLog(entries: Array<{ level: string; tag: string; msg: string }> = []) {
  return {
    info: (tag: string, msg: string) => entries.push({ level: "info", tag, msg }),
    warn: (tag: string, msg: string) => entries.push({ level: "warn", tag, msg }),
    error: (tag: string, msg: string) => entries.push({ level: "error", tag, msg }),
    debug: (tag: string, msg: string) => entries.push({ level: "debug", tag, msg }),
    entries,
  };
}

test.after(async () => {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
  process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

beforeEach(() => {
  clearAllModelLockouts();
  clearCooldownState();
  resetAllCircuitBreakers();
  clearNativeCodexTurnPinsForTests();
});

describe("Native Codex turn pin — short transient model lockout", () => {
  const grokModel = "grok-cli/grok-4.6";
  const cursorModel = "cursor/cursor-grok-4.6-medium";
  const combo = {
    name: "sc-model-coding",
    strategy: "priority" as const,
    models: [grokModel, cursorModel],
    config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
  };
  const turnMetadata = JSON.stringify({ thread_id: "thread-short-lock", turn_id: "turn-1" });

  // Mid-turn follow-up that carries provider continuation state, so auto-resume
  // onto another model is (correctly) rejected as unsafe_provider_state.
  const midTurnBody = {
    stream: false,
    previous_response_id: "resp_grok_pinned_upstream",
    client_metadata: { "x-codex-turn-metadata": turnMetadata },
    input: [
      { type: "message", role: "user", content: "fix the bug" },
      { type: "function_call", call_id: "c1", name: "shell", arguments: "{}" },
      { type: "function_call_output", call_id: "c1", output: "ok" },
    ],
  };

  async function pinTurnToGrok(connectionId: string, settings: object) {
    const res = await handleComboChat({
      body: {
        stream: false,
        client_metadata: { "x-codex-turn-metadata": turnMetadata },
        input: [{ type: "message", role: "user", content: "fix the bug" }],
      },
      combo,
      clientManagedResponsesContext: true,
      handleSingleModel: async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: "grok" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": connectionId },
        }),
      isModelAvailable: async () => true,
      log: createLog(),
      settings,
      allCombos: null,
    });
    assert.equal(res.status, 200);
  }

  // Lock only the pinned connection, like the real lockout path does.
  function lockGrok(connectionId: string, reason: string, ms: number) {
    lockExactModel("grok-cli", connectionId, "grok-4.6", reason, ms);
  }

  test("short server_error lockout keeps the turn on the pinned model instead of 400", async () => {
    const settings = settingsWithCooldownWait(true);
    const conn = await providersDb.createProviderConnection({
      provider: "grok-cli",
      authType: "oauth",
      name: "Grok A",
    });
    await pinTurnToGrok(conn.id, settings);
    lockGrok(conn.id, "server_error", 1_000);

    const attempted: string[] = [];
    const logs: Array<{ level: string; tag: string; msg: string }> = [];
    const res = await handleComboChat({
      body: midTurnBody,
      combo,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, modelStr) => {
        attempted.push(modelStr);
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": conn.id },
        });
      },
      // Like prod: unavailable while every account is cooling for the model.
      isModelAvailable: async () => !isModelLocked("grok-cli", conn.id, "grok-4.6"),
      log: createLog(logs),
      settings,
      allCombos: null,
    });

    assert.equal(res.status, 200, "turn must not be terminated for a waitable 1s lockout");
    assert.deepEqual(attempted, [grokModel], "only the pinned model may serve the turn");
    assert.ok(!logs.some((e) => e.msg.includes("Native Codex turn cannot continue")));
  });

  test("pinned model failing again after the wait surfaces a retryable 5xx, not the terminal 400", async () => {
    const settings = settingsWithCooldownWait(true);
    const conn = await providersDb.createProviderConnection({
      provider: "grok-cli",
      authType: "oauth",
      name: "Grok B",
    });
    await pinTurnToGrok(conn.id, settings);
    lockGrok(conn.id, "server_error", 300);

    const attempted: string[] = [];
    const res = await handleComboChat({
      body: midTurnBody,
      combo,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, modelStr) => {
        attempted.push(modelStr);
        if (attempted.length === 1) {
          // Upstream fails again: the real handler re-locks the model and answers
          // with the cooldown hint.
          lockGrok(conn.id, "server_error", 300);
          return new Response(
            JSON.stringify({
              error: {
                message: "Internal error during token generation",
                retryAfter: new Date(Date.now() + 300).toISOString(),
              },
            }),
            { status: 502, headers: { "Content-Type": "application/json" } }
          );
        }
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": conn.id },
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings,
      allCombos: null,
    });

    // The client (Codex CLI) retries 5xx; the terminal 400 is what it cannot recover from.
    assert.equal(res.status, 502);
    assert.equal(attempted[0], grokModel);
    assert.ok(
      attempted.every((m) => m === grokModel),
      "a pinned turn never falls through to another model"
    );
  });

  test("quota_exhausted lockout still terminates the unsafe turn with 400", async () => {
    const settings = settingsWithCooldownWait(true);
    const conn = await providersDb.createProviderConnection({
      provider: "grok-cli",
      authType: "oauth",
      name: "Grok C",
    });
    await pinTurnToGrok(conn.id, settings);
    lockGrok(conn.id, "quota_exhausted", 1_000);

    const attempted: string[] = [];
    const logs: Array<{ level: string; tag: string; msg: string }> = [];
    const res = await handleComboChat({
      body: midTurnBody,
      combo,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, modelStr) => {
        attempted.push(modelStr);
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      },
      isModelAvailable: async () => true,
      log: createLog(logs),
      settings,
      allCombos: null,
    });

    assert.equal(res.status, 400);
    assert.equal((await res.json()).error.code, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE);
    assert.equal(attempted.length, 0);
    const terminated = logs.find((e) => e.msg.includes("Native Codex turn cannot continue"));
    assert.ok(terminated, "termination is logged");
    assert.match(terminated.msg, /model lock: [^;]*quota_exhausted \d+s failureCount=/);
  });

  test("server_error lockout longer than maxWaitMs still terminates the unsafe turn", async () => {
    const settings = settingsWithCooldownWait(true);
    const conn = await providersDb.createProviderConnection({
      provider: "grok-cli",
      authType: "oauth",
      name: "Grok D",
    });
    await pinTurnToGrok(conn.id, settings);
    lockGrok(conn.id, "server_error", 60_000);

    const res = await handleComboChat({
      body: midTurnBody,
      combo,
      clientManagedResponsesContext: true,
      handleSingleModel: async () => new Response(JSON.stringify({ ok: true }), { status: 200 }),
      isModelAvailable: async () => true,
      log: createLog(),
      settings,
      allCombos: null,
    });

    assert.equal(res.status, 400);
  });

  test("with cooldown-wait disabled a short lockout keeps the previous behavior", async () => {
    const settings = settingsWithCooldownWait(false);
    const conn = await providersDb.createProviderConnection({
      provider: "grok-cli",
      authType: "oauth",
      name: "Grok E",
    });
    await pinTurnToGrok(conn.id, settings);
    lockGrok(conn.id, "server_error", 1_000);

    const res = await handleComboChat({
      body: midTurnBody,
      combo,
      clientManagedResponsesContext: true,
      handleSingleModel: async () => new Response(JSON.stringify({ ok: true }), { status: 200 }),
      isModelAvailable: async () => true,
      log: createLog(),
      settings,
      allCombos: null,
    });

    assert.equal(res.status, 400);
  });
  test("client abort during the lock wait returns 499 without dispatching", async () => {
    const settings = settingsWithCooldownWait(true);
    const conn = await providersDb.createProviderConnection({
      provider: "grok-cli",
      authType: "oauth",
      name: "Grok F",
    });
    await pinTurnToGrok(conn.id, settings);
    lockGrok(conn.id, "server_error", 2_000);

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 100);
    const attempted: string[] = [];
    const res = await handleComboChat({
      body: midTurnBody,
      combo,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, modelStr) => {
        attempted.push(modelStr);
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings,
      allCombos: null,
      signal: controller.signal,
    });

    assert.equal(res.status, 499);
    assert.equal(attempted.length, 0);
  });

  test("auto-resume skips an alternate that only has a short lockout", async () => {
    const settings = settingsWithCooldownWait(true);
    const grok = await providersDb.createProviderConnection({
      provider: "grok-cli",
      authType: "oauth",
      name: "Grok G",
    });
    const codex = await providersDb.createProviderConnection({
      provider: "codex",
      authType: "apikey",
      name: "Codex G",
      apiKey: "sk-codex-test",
    });
    const antigravity = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity G",
    });
    const codexModel = "codex/gpt-5.5-high";
    const geminiModel = "antigravity/gemini-3.7-flash-high";
    const resumeCombo = { ...combo, models: [grokModel, codexModel, geminiModel] };
    const turn = JSON.stringify({ thread_id: "thread-resume", turn_id: "turn-resume" });
    const firstBody = {
      stream: false,
      client_metadata: { "x-codex-turn-metadata": turn },
      input: [{ type: "message", role: "user", content: "hello" }],
    };
    await handleComboChat({
      body: firstBody,
      combo: resumeCombo,
      clientManagedResponsesContext: true,
      handleSingleModel: async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: "grok" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": grok.id },
        }),
      isModelAvailable: async () => true,
      log: createLog(),
      settings,
      allCombos: null,
    });

    // Pinned model gone for good; first alternate only briefly locked.
    lockGrok(grok.id, "quota_exhausted", 60_000);
    lockExactModel("codex", codex.id, "gpt-5.5-high", "server_error", 1_000);
    lockExactModel("codex", "", "gpt-5.5-high", "server_error", 1_000);

    const attempted: string[] = [];
    const res = await handleComboChat({
      body: firstBody,
      combo: resumeCombo,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, modelStr) => {
        attempted.push(modelStr);
        return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
          headers: { "x-omniroute-selected-connection-id": antigravity.id },
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings,
      allCombos: null,
    });

    assert.equal(res.status, 200);
    assert.deepEqual(attempted, [geminiModel], "resume goes to the healthy alternate");
  });
});
