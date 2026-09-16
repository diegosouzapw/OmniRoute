import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-autoresume-test-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { lockExactModel, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const {
  pinNativeCodexTurn,
  advanceNativeCodexTurnGeneration,
  getNativeCodexTurnPin,
  getNativeCodexTurnActiveGeneration,
  clearNativeCodexTurnPinsForTests,
  hasUnresolvedToolCalls,
  hasProviderSpecificUnsafeContinuationState,
  revokeNativeCodexTurnPinsForConnection,
  MAX_AUTORESUMES_PER_TURN,
  NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE,
} = await import("../../open-sse/services/combo/nativeCodexTurnPin.ts");
const { recordProviderCooldown, isProviderInCooldown, clearCooldownState } =
  await import("../../open-sse/services/providerCooldownTracker.ts");
const { PROVIDER_PROFILES } =
  await import("../../open-sse/config/constants.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

const testSettings = {
  resilienceSettings: {
    providerCooldown: {
      enabled: true,
      minRetryCooldownMs: 5000,
      maxRetryCooldownMs: 300000,
    },
    comboCooldownWait: { enabled: false },
  },
};
const settings = resolveResilienceSettings(testSettings);

function createLog(entries: Array<{ level: string; tag: string; msg: string }> = []) {
  return {
    info: (tag: string, msg: string) => entries.push({ level: "info", tag, msg }),
    warn: (tag: string, msg: string) => entries.push({ level: "warn", tag, msg }),
    error: (tag: string, msg: string) => entries.push({ level: "error", tag, msg }),
    debug: (tag: string, msg: string) => entries.push({ level: "debug", tag, msg }),
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

describe("Native Codex Safe Auto-Resume", () => {
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

  test("MAX_AUTORESUMES_PER_TURN constant is 1", () => {
    assert.equal(MAX_AUTORESUMES_PER_TURN, 1);
  });

  test("hasUnresolvedToolCalls correctly validates 1:1 call-output pairs and rejects duplicates/orphans/nested", () => {
    // Empty input: no tool calls
    assert.equal(hasUnresolvedToolCalls({}), false);
    assert.equal(hasUnresolvedToolCalls({ input: [] }), false);

    // Nested output array with unresolved tool_use is unsafe (true)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          {
            type: "function_call_output",
            call_id: "c1",
            output: [{ type: "tool_use", id: "tu-nested", name: "bash" }],
          },
        ],
      }),
      true
    );

    // Two calls with same call_id and two outputs with same call_id (count=2 != 1) is unsafe (true)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          { type: "function_call", call_id: "c-dup2", name: "cat", arguments: "{}" },
          { type: "function_call", call_id: "c-dup2", name: "cat", arguments: "{}" },
          { type: "function_call_output", call_id: "c-dup2", output: "out1" },
          { type: "function_call_output", call_id: "c-dup2", output: "out2" },
        ],
      }),
      true
    );

    // Two distinct calls with two distinct matching outputs is safe (false)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          { type: "function_call", call_id: "c-1", name: "cat", arguments: "{}" },
          { type: "function_call", call_id: "c-2", name: "ls", arguments: "{}" },
          { type: "function_call_output", call_id: "c-1", output: "out1" },
          { type: "function_call_output", call_id: "c-2", output: "out2" },
        ],
      }),
      false
    );

    // Resolved function call (1 call, 1 matching output)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          { type: "message", role: "user", content: "read file" },
          { type: "function_call", call_id: "call-1", name: "cat", arguments: "{}" },
          { type: "function_call_output", call_id: "call-1", output: "hello world" },
        ],
      }),
      false
    );

    // Unresolved function call (call with no output)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          { type: "message", role: "user", content: "read file" },
          { type: "function_call", call_id: "call-1", name: "cat", arguments: "{}" },
        ],
      }),
      true
    );

    // Resolved custom tool call
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          { type: "message", role: "user", content: "patch file" },
          { type: "custom_tool_call", call_id: "call-2", name: "apply_patch", input: "diff" },
          { type: "custom_tool_call_output", call_id: "call-2", output: "ok" },
        ],
      }),
      false
    );

    // Unresolved custom tool call
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          { type: "message", role: "user", content: "patch file" },
          { type: "custom_tool_call", call_id: "call-2", name: "apply_patch", input: "diff" },
        ],
      }),
      true
    );

    // Anthropic tool_use and tool_result in content array (resolved)
    assert.equal(
      hasUnresolvedToolCalls({
        messages: [
          {
            role: "assistant",
            content: [{ type: "tool_use", id: "tu-1", name: "bash", input: {} }],
          },
          {
            role: "user",
            content: [{ type: "tool_result", tool_use_id: "tu-1", content: "done" }],
          },
        ],
      }),
      false
    );

    // Anthropic tool_use in content array (unresolved)
    assert.equal(
      hasUnresolvedToolCalls({
        messages: [
          {
            role: "assistant",
            content: [{ type: "tool_use", id: "tu-1", name: "bash", input: {} }],
          },
        ],
      }),
      true
    );

    // Assistant message tool_calls format (resolved)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          {
            type: "message",
            role: "assistant",
            tool_calls: [{ id: "call-3", type: "function", function: { name: "shell" } }],
          },
          { type: "message", role: "tool", tool_call_id: "call-3", content: "done" },
        ],
      }),
      false
    );

    // Assistant message tool_calls format (unresolved)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          {
            type: "message",
            role: "assistant",
            tool_calls: [{ id: "call-3", type: "function", function: { name: "shell" } }],
          },
        ],
      }),
      true
    );

    // Duplicate tool call ID: two calls with same ID, one output -> unsafe (true)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          { type: "function_call", call_id: "call-dup", name: "cat", arguments: "{}" },
          { type: "function_call", call_id: "call-dup", name: "cat", arguments: "{}" },
          { type: "function_call_output", call_id: "call-dup", output: "res" },
        ],
      }),
      true
    );

    // Duplicate tool output ID: one call, two outputs with same ID -> unsafe (true)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [
          { type: "function_call", call_id: "call-dup-out", name: "cat", arguments: "{}" },
          { type: "function_call_output", call_id: "call-dup-out", output: "res1" },
          { type: "function_call_output", call_id: "call-dup-out", output: "res2" },
        ],
      }),
      true
    );

    // Orphaned tool output: output without matching call -> unsafe (true)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [{ type: "function_call_output", call_id: "orphan-call", output: "res" }],
      }),
      true
    );

    // Malformed tool call with empty call_id -> unsafe (true)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [{ type: "function_call", call_id: "", name: "cat", arguments: "{}" }],
      }),
      true
    );

    // Legacy unidentifiable function_call -> unsafe (true)
    assert.equal(
      hasUnresolvedToolCalls({
        input: [{ role: "assistant", function_call: { name: "test", arguments: "{}" } }],
      }),
      true
    );
  });

  test("hasProviderSpecificUnsafeContinuationState detects opaque provider state at all levels", () => {
    // Clean input: safe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      false
    );

    // conversation_id at root: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        conversation_id: "conv_12345",
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      true
    );

    // conversation object at root: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        conversation: { id: "conv_67890" },
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      true
    );

    // Item with item-level previous_response_id: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [
          {
            type: "message",
            role: "assistant",
            previous_response_id: "resp_nested_prev",
            content: "hello",
          },
        ],
      }),
      true
    );

    // Item with item-level continuation_token: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [
          {
            type: "message",
            role: "assistant",
            continuation_token: "tok_nested_cont",
            content: "hello",
          },
        ],
      }),
      true
    );

    // previous_response_id: unsafe (binds to upstream response store)
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        previous_response_id: "resp_12345_upstream",
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      true
    );

    // continuation_token: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        continuation_token: "tok_opaque_blob",
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      true
    );

    // response_id: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        response_id: "resp_999",
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      true
    );

    // provider_metadata at root: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        provider_metadata: { openai: { message_id: "m1" } },
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      true
    );

    // item_reference: unsafe (server-side item ID)
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [{ type: "item_reference", id: "item_abc123" }],
      }),
      true
    );

    // reasoning item with encrypted_content: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [
          { type: "reasoning", encrypted_content: "enc_blob_xyz" },
          { type: "message", role: "user", content: "hello" },
        ],
      }),
      true
    );

    // thinking item with thought_signature: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [
          { type: "thinking", thought_signature: "sig_gemini_blob" },
          { type: "message", role: "user", content: "hello" },
        ],
      }),
      true
    );

    // redacted_thinking item: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [{ type: "redacted_thinking", data: "redacted" }],
      }),
      true
    );

    // Nested thinking part inside content array with signature: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        messages: [
          {
            role: "assistant",
            content: [
              { type: "thinking", thinking: "deep thought", signature: "sig-xyz" },
              { type: "text", text: "hello" },
            ],
          },
        ],
      }),
      true
    );

    // encrypted_content item: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [{ type: "encrypted_content", encrypted_content: "enc_123" }],
      }),
      true
    );

    // Root body thoughtSignature (camelCase): unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        thoughtSignature: "sig_camel_case",
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      true
    );

    // Root body provider_data: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        provider_data: { gemini: { candidate_token_count: 50 } },
        input: [{ type: "message", role: "user", content: "hello" }],
      }),
      true
    );

    // Nested output array with encrypted_content: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [
          {
            type: "function_call_output",
            call_id: "c1",
            output: [{ type: "encrypted_content", encrypted_content: "enc_blob" }],
          },
        ],
      }),
      true
    );

    // Nested summary array with thought_signature: unsafe
    assert.equal(
      hasProviderSpecificUnsafeContinuationState({
        input: [
          {
            type: "reasoning",
            summary: [{ type: "summary_text", text: "...", thought_signature: "sig" }],
          },
        ],
      }),
      true
    );
  });

  test("5-Phase Production Scenario: Opus 429 Model Lockout -> Safe Auto-Resume to Gemini -> Subsequent Pinned to Gemini", async () => {
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

    const baseTurnMetadata = {
      thread_id: "thread-autoresume-123",
      turn_id: "turn-autoresume-456",
    };

    // PHASE 1: Opus succeeds for turn-autoresume-456, pin created for generation 0
    const phase1Body = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata),
      },
      input: [{ type: "message", role: "user", content: "list files then edit" }],
    };

    const phase1Result = await handleComboChat({
      body: phase1Body,
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

    const pinGen0 = getNativeCodexTurnPin(phase1Body, comboName, 0);
    assert.ok(pinGen0, "Generation 0 pin created after Phase 1");
    assert.equal(pinGen0.modelStr, opusModel);
    assert.equal(pinGen0.provider, "antigravity");
    assert.equal(pinGen0.connectionId, conn1Id);
    assert.equal(getNativeCodexTurnActiveGeneration(phase1Body, comboName), 0);

    // PHASE 2 & 3: Tool output sent for SAME turn. Opus receives 429 lockout across all connections.
    // Safe automatic resume triggers to Gemini.
    lockExactModel("antigravity", conn1Id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", conn2Id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    attemptedModels.length = 0;
    const phase2LogEntries: Array<{ level: string; tag: string; msg: string }> = [];
    const phase2Body = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata),
      },
      input: [
        { type: "message", role: "user", content: "list files then edit" },
        { type: "function_call", call_id: "call-1", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "call-1", output: "main.ts\npackage.json" },
      ],
    };

    const phase2Result = await handleComboChat({
      body: phase2Body,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attemptedModels.push(modelStr);
        if (modelStr === geminiModel) {
          return new Response(
            JSON.stringify({ choices: [{ message: { content: "gemini resumed output" } }] }),
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

    assert.equal(phase2Result.ok, true, "Phase 2 must succeed automatically on Gemini");
    assert.deepEqual(
      attemptedModels,
      [geminiModel],
      "Only Gemini dispatched (Opus skipped due to lockout)"
    );

    // Verify telemetry logs for auto-resume
    const eligibleLog = phase2LogEntries.find((e) =>
      e.msg.includes("Native Codex auto-resume eligible")
    );
    const startedLog = phase2LogEntries.find((e) =>
      e.msg.includes("Native Codex auto-resume started")
    );
    const routedLog = phase2LogEntries.find((e) =>
      e.msg.includes("Native Codex auto-resume routed")
    );
    assert.ok(eligibleLog, "Should log auto-resume eligible");
    assert.ok(startedLog, "Should log auto-resume started");
    assert.ok(routedLog, "Should log auto-resume routed to Gemini");

    // PHASE 4: Verify generation isolation: Opus gen 0 pin NOT mutated, Gemini is gen 1 pin
    const activeGen = getNativeCodexTurnActiveGeneration(phase2Body, comboName);
    assert.equal(activeGen, 1, "Active generation is now 1");

    const gen0PinCheck = getNativeCodexTurnPin(phase2Body, comboName, 0);
    assert.ok(gen0PinCheck);
    assert.equal(gen0PinCheck.modelStr, opusModel, "Generation 0 pin remains Opus (not mutated)");

    const gen1PinCheck = getNativeCodexTurnPin(phase2Body, comboName, 1);
    assert.ok(gen1PinCheck);
    assert.equal(gen1PinCheck.modelStr, geminiModel, "Generation 1 pin is Gemini");

    // Active pin query without generation returns current active (Gemini)
    const currentActivePin = getNativeCodexTurnPin(phase2Body, comboName);
    assert.equal(currentActivePin?.modelStr, geminiModel);

    // PHASE 5: Subsequent tool output for SAME turn stays pinned to Gemini
    attemptedModels.length = 0;
    const phase3Body = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata),
      },
      input: [
        { type: "message", role: "user", content: "list files then edit" },
        { type: "function_call", call_id: "call-1", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "call-1", output: "main.ts\npackage.json" },
        { type: "function_call", call_id: "call-2", name: "cat", arguments: '{"file":"main.ts"}' },
        { type: "function_call_output", call_id: "call-2", output: "console.log('hi')" },
      ],
    };

    const phase3Result = await handleComboChat({
      body: phase3Body,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr) => {
        attemptedModels.push(modelStr);
        return new Response(
          JSON.stringify({ choices: [{ message: { content: "gemini step 2 output" } }] }),
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

    assert.equal(phase3Result.ok, true);
    assert.deepEqual(attemptedModels, [geminiModel], "Subsequent request stayed pinned to Gemini");
  });

  test("Opaque continuation state (previous_response_id) rejects auto-resume and returns HTTP 400", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    const baseTurnMetadata = {
      thread_id: "thread-unsafe-state",
      turn_id: "turn-unsafe-state",
    };

    // Phase 1: Opus succeeds
    const phase1Body = {
      stream: false,
      client_metadata: { "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata) },
      input: [{ type: "message", role: "user", content: "hello" }],
    };

    await handleComboChat({
      body: phase1Body,
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

    // Lock Opus
    lockExactModel("antigravity", conn1.id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    // Request with previous_response_id
    const unsafeBody = {
      stream: false,
      previous_response_id: "resp_opus_pinned_upstream",
      client_metadata: { "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata) },
      input: [
        { type: "message", role: "user", content: "hello" },
        { type: "function_call", call_id: "c1", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "c1", output: "ok" },
      ],
    };

    const attempted: string[] = [];
    const logs: Array<{ level: string; tag: string; msg: string }> = [];
    const result = await handleComboChat({
      body: unsafeBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, m) => {
        attempted.push(m);
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      },
      isModelAvailable: async () => true,
      log: createLog(logs),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(result.status, 400);
    const data = await result.json();
    assert.equal(data.error.code, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE);
    assert.equal(attempted.length, 0, "No model dispatched");

    const rejectLog = logs.find(
      (e) => e.msg.includes("auto-resume rejected") && e.msg.includes("unsafe_provider_state")
    );
    assert.ok(rejectLog, "Should log rejection reason unsafe_provider_state");
  });

  test("Pending tool call prevents auto-resume and returns HTTP 400", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    const baseTurnMetadata = {
      thread_id: "thread-pending-123",
      turn_id: "turn-pending-456",
    };

    // Phase 1: Opus succeeds
    const phase1Body = {
      stream: false,
      client_metadata: { "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata) },
      input: [{ type: "message", role: "user", content: "hello" }],
    };

    await handleComboChat({
      body: phase1Body,
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

    // Lock Opus
    lockExactModel("antigravity", conn1.id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    // Request with UNRESOLVED tool call (missing tool output)
    const pendingToolBody = {
      stream: false,
      client_metadata: { "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata) },
      input: [
        { type: "message", role: "user", content: "hello" },
        { type: "function_call", call_id: "call-unresolved", name: "shell", arguments: "{}" },
      ],
    };

    const attempted: string[] = [];
    const logs: Array<{ level: string; tag: string; msg: string }> = [];
    const result = await handleComboChat({
      body: pendingToolBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, m) => {
        attempted.push(m);
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      },
      isModelAvailable: async () => true,
      log: createLog(logs),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(result.status, 400, "Must return HTTP 400 when tool call unresolved");
    const data = await result.json();
    assert.equal(data.error.code, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE);
    assert.equal(attempted.length, 0, "No model dispatched");

    const rejectLog = logs.find(
      (e) => e.msg.includes("auto-resume rejected") && e.msg.includes("pending_tool_call")
    );
    assert.ok(rejectLog, "Should log rejection reason pending_tool_call");
  });

  test("Partial stream safety: Opus emits partial SSE stream chunks then fails -> Gemini is NOT dispatched mid-stream", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    const baseTurnMetadata = {
      thread_id: "thread-partial-stream-safety",
      turn_id: "turn-partial-stream-safety",
    };

    // Phase 1: Opus succeeds
    const phase1Body = {
      stream: true,
      client_metadata: { "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata) },
      input: [{ type: "message", role: "user", content: "hello" }],
    };

    await handleComboChat({
      body: phase1Body,
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

    // Phase 2: Request is sent. Opus is NOT locked before dispatch.
    // Opus returns a stream that emits partial bytes and then aborts/fails.
    // Invariant: Gemini MUST NOT be dispatched during this request.
    const phase2Body = {
      stream: true,
      client_metadata: { "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata) },
      input: [
        { type: "message", role: "user", content: "hello" },
        { type: "function_call", call_id: "c1", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "c1", output: "ok" },
      ],
    };

    const attempted: string[] = [];
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode('data: {"choices":[{"delta":{"content":"partial output"}}]}\n\n')
        );
        controller.error(new Error("Mid-stream connection reset"));
      },
    });

    const _result = await handleComboChat({
      body: phase2Body,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, m) => {
        attempted.push(m);
        return new Response(stream, {
          status: 200,
          headers: { "content-type": "text/event-stream" },
        });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    // Pinned turn with maxRetries=0 dispatches strictly Opus; Gemini must NOT be called
    assert.deepEqual(attempted, [opusModel], "Only pinned Opus dispatched; Gemini never called");
    assert.equal(
      getNativeCodexTurnActiveGeneration(phase2Body, comboName),
      0,
      "Generation remains 0 on runtime failure"
    );
  });

  test("Sibling connection is preferred over auto-resume", async () => {
    const conn1Id = "conn-sib-1";
    const conn2Id = "conn-sib-2";

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

    const turnBody = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread-sib",
          turn_id: "turn-sib",
        }),
      },
      input: [{ type: "message", role: "user", content: "test" }],
    };

    // Phase 1: Opus succeeds on conn1
    await handleComboChat({
      body: turnBody,
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

    // Lock ONLY conn1 Opus; conn2 remains healthy
    lockExactModel("antigravity", conn1Id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    const attempted: Array<{ modelStr: string; connectionId?: string }> = [];
    const result = await handleComboChat({
      body: turnBody,
      combo: explicitComboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_body, modelStr, target) => {
        attempted.push({ modelStr, connectionId: target?.connectionId || undefined });
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

    assert.equal(result.ok, true);
    assert.equal(attempted.length, 1);
    assert.equal(attempted[0].modelStr, opusModel, "Opus remains pinned to sibling connection");
    assert.equal(attempted[0].connectionId, conn2Id, "Connection failed over to conn2");
    assert.equal(
      getNativeCodexTurnActiveGeneration(turnBody, comboName),
      0,
      "No generation advance on sibling failover"
    );
  });

  test("No healthy alternate model in combo returns HTTP 400 NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE and does NOT advance generation", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    const singleModelComboConfig = {
      name: "OpusOnly",
      strategy: "fill-first" as const,
      models: [opusModel],
      config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
    };

    const turnBody = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread-single",
          turn_id: "turn-single",
        }),
      },
      input: [{ type: "message", role: "user", content: "test" }],
    };

    // Phase 1: Opus succeeds
    await handleComboChat({
      body: turnBody,
      combo: singleModelComboConfig,
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

    // Lock Opus
    lockExactModel("antigravity", conn1.id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    const attempted: string[] = [];
    const result = await handleComboChat({
      body: turnBody,
      combo: singleModelComboConfig,
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
    const data = await result.json();
    assert.equal(data.error.code, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE);
    assert.equal(attempted.length, 0);
    assert.equal(
      getNativeCodexTurnActiveGeneration(turnBody, "OpusOnly"),
      0,
      "Generation must not advance when no alternate target exists"
    );
  });

  test("Provider circuit breaker OPEN does NOT trigger auto-resume", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    const turnBody = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread-cb",
          turn_id: "turn-cb",
        }),
      },
      input: [
        { type: "message", role: "user", content: "cmd" },
        { type: "function_call", call_id: "c1", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "c1", output: "ok" },
      ],
    };

    // Phase 1: Opus succeeds
    await handleComboChat({
      body: turnBody,
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

    // Trip provider circuit breaker (provider-wide failure)
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
      body: turnBody,
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

    assert.equal(result.ok, false, "Should fail due to provider circuit breaker OPEN");
    assert.equal(attempted.length, 0, "No targets attempted");
    assert.equal(
      getNativeCodexTurnActiveGeneration(turnBody, comboName),
      0,
      "Circuit breaker does not advance generation"
    );
  });

  test("Provider global cooldown does NOT trigger auto-resume", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });

    const turnBody = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread-cd",
          turn_id: "turn-cd",
        }),
      },
      input: [
        { type: "message", role: "user", content: "cmd" },
        { type: "function_call", call_id: "c1", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "c1", output: "ok" },
      ],
    };

    // Phase 1: Opus succeeds
    await handleComboChat({
      body: turnBody,
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

    // Trigger provider global cooldown.
    // Current upstream requires providerFailureThreshold failures before
    // the whole provider is considered cooling.
    for (let i = 0; i < PROVIDER_PROFILES.oauth.providerFailureThreshold; i += 1) {
      recordProviderCooldown("antigravity", undefined, settings);
    }
    assert.equal(isProviderInCooldown("antigravity", undefined, settings), true);

    const attempted: string[] = [];
    const result = await handleComboChat({
      body: turnBody,
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

    assert.equal(result.ok, false);
    assert.equal(attempted.length, 0);
    assert.equal(getNativeCodexTurnActiveGeneration(turnBody, comboName), 0);
  });

  test("MAX_AUTORESUMES_PER_TURN = 1 stops cascading: Opus -> Gemini succeeds, but second failure in same turn returns terminal 400", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });
    await providersDb.createProviderConnection({
      provider: "codex",
      authType: "apikey",
      name: "Codex Key",
      apiKey: "sk-codex-test",
    });

    const baseTurnMetadata = {
      thread_id: "thread-max-cascade-1",
      turn_id: "turn-max-cascade-1",
    };

    const turnBody = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata),
      },
      input: [
        { type: "message", role: "user", content: "cascade test" },
        { type: "function_call", call_id: "c1", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "c1", output: "ok" },
      ],
    };

    // Gen 0: Opus succeeds
    await handleComboChat({
      body: turnBody,
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
    assert.equal(getNativeCodexTurnActiveGeneration(turnBody, comboName), 0);

    // Lock Opus -> 1st auto-resume to Gemini (Gen 1) SUCCEEDS
    lockExactModel("antigravity", conn1.id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    const resGen1 = await handleComboChat({
      body: turnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, m) => {
        if (m === geminiModel) {
          return new Response(JSON.stringify({ choices: [{ message: { content: "gemini" } }] }), {
            status: 200,
            headers: { "x-omniroute-selected-connection-id": conn1.id },
          });
        }
        return new Response(JSON.stringify({ error: "fail" }), { status: 500 });
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(resGen1.ok, true);
    assert.equal(getNativeCodexTurnActiveGeneration(turnBody, comboName), 1);

    // Now lock Gemini as well in the SAME turn: 2nd auto-resume MUST BE REJECTED (policy = 1)
    lockExactModel("antigravity", conn1.id, "gemini-3.7-flash-high", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "gemini-3.7-flash-high", "quota_exhausted", 60_000);

    const attemptedGen2: string[] = [];
    const logsGen2: Array<{ level: string; tag: string; msg: string }> = [];
    const resGen2 = await handleComboChat({
      body: turnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, m) => {
        attemptedGen2.push(m);
        return new Response(JSON.stringify({ choices: [{ message: { content: "codex" } }] }), {
          status: 200,
        });
      },
      isModelAvailable: async () => true,
      log: createLog(logsGen2),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(resGen2.status, 400, "Must return HTTP 400: max resumes exceeded");
    const dataGen2 = await resGen2.json();
    assert.equal(dataGen2.error.code, NATIVE_CODEX_PINNED_MODEL_UNAVAILABLE_CODE);
    assert.equal(attemptedGen2.length, 0, "Codex must NOT be dispatched on 2nd cascade");
    assert.equal(
      getNativeCodexTurnActiveGeneration(turnBody, comboName),
      1,
      "Generation remains 1"
    );

    const maxLog = logsGen2.find(
      (e) => e.msg.includes("auto-resume rejected") && e.msg.includes("max_resumes_exceeded")
    );
    assert.ok(maxLog, "Should log max_resumes_exceeded rejection");
  });

  test("Pin immutability, multi-generation revocation, and TTL expiry cleanup", () => {
    const mockBody = {
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread-immutability",
          turn_id: "turn-immutability",
        }),
      },
    };

    // Pin Generation 0 on conn-A
    pinNativeCodexTurn({
      body: mockBody,
      comboName,
      target: {
        kind: "model",
        stepId: "s1",
        executionKey: "ek1",
        modelStr: opusModel,
        provider: "antigravity",
        providerId: null,
        connectionId: "conn-A",
        weight: 1,
        label: null,
      },
      connectionId: "conn-A",
    });

    const gen0Pin = getNativeCodexTurnPin(mockBody, comboName, 0);
    assert.equal(gen0Pin?.modelStr, opusModel);
    assert.equal(gen0Pin?.connectionId, "conn-A");

    // Advance to Gen 1 and pin on conn-B
    advanceNativeCodexTurnGeneration(mockBody, comboName);
    pinNativeCodexTurn({
      body: mockBody,
      comboName,
      target: {
        kind: "model",
        stepId: "s2",
        executionKey: "ek2",
        modelStr: geminiModel,
        provider: "antigravity",
        providerId: null,
        connectionId: "conn-B",
        weight: 1,
        label: null,
      },
      connectionId: "conn-B",
    });

    // Verify Gen 0 is still Opus on conn-A (immutability check)
    const gen0Check = getNativeCodexTurnPin(mockBody, comboName, 0);
    assert.equal(gen0Check?.modelStr, opusModel);
    assert.equal(gen0Check?.connectionId, "conn-A");

    // Verify Gen 1 is Gemini on conn-B
    const gen1Check = getNativeCodexTurnPin(mockBody, comboName, 1);
    assert.equal(gen1Check?.modelStr, geminiModel);
    assert.equal(gen1Check?.connectionId, "conn-B");

    // Revoke pins for conn-A only: Gen 0 is deleted, Gen 1 is intact
    const revokedConnA = revokeNativeCodexTurnPinsForConnection("conn-A");
    assert.equal(revokedConnA, 1);
    assert.equal(getNativeCodexTurnPin(mockBody, comboName, 0), null);
    assert.equal(getNativeCodexTurnPin(mockBody, comboName, 1)?.modelStr, geminiModel);

    // Revoke pins for conn-B: Gen 1 is deleted, turn record is fully removed
    const revokedConnB = revokeNativeCodexTurnPinsForConnection("conn-B");
    assert.equal(revokedConnB, 1);
    assert.equal(getNativeCodexTurnPin(mockBody, comboName, 1), null);
    assert.equal(getNativeCodexTurnActiveGeneration(mockBody, comboName), 0);
  });

  test("Auto-resume dispatch failure does not advance generation or cascade to 3rd model", async () => {
    const conn1 = await providersDb.createProviderConnection({
      provider: "antigravity",
      authType: "oauth",
      name: "Antigravity Account 1",
    });
    await providersDb.createProviderConnection({
      provider: "codex",
      authType: "apikey",
      name: "Codex Key",
      apiKey: "sk-codex-test",
    });

    const baseTurnMetadata = {
      thread_id: "thread-fail-no-cascade",
      turn_id: "turn-fail-no-cascade",
    };

    const turnBody = {
      stream: false,
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify(baseTurnMetadata),
      },
      input: [
        { type: "message", role: "user", content: "cmd" },
        { type: "function_call", call_id: "c1", name: "ls", arguments: "{}" },
        { type: "function_call_output", call_id: "c1", output: "ok" },
      ],
    };

    // Phase 1: Opus succeeds (Gen 0)
    await handleComboChat({
      body: turnBody,
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
    assert.equal(getNativeCodexTurnActiveGeneration(turnBody, comboName), 0);

    // Lock Opus
    lockExactModel("antigravity", conn1.id, "claude-opus-4-6-thinking", "quota_exhausted", 60_000);
    lockExactModel("antigravity", "", "claude-opus-4-6-thinking", "quota_exhausted", 60_000);

    // Phase 2: Auto-resume routes to Gemini, but Gemini upstream fails (500)
    // Invariant: Codex (3rd model) MUST NOT be dispatched in this same request!
    const attempted: string[] = [];
    const res = await handleComboChat({
      body: turnBody,
      combo: comboConfig,
      clientManagedResponsesContext: true,
      handleSingleModel: async (_b, m) => {
        attempted.push(m);
        if (m === geminiModel) {
          return new Response(JSON.stringify({ error: "gemini temporary 500" }), { status: 500 });
        }
        return new Response(
          JSON.stringify({ choices: [{ message: { content: "codex leaked" } }] }),
          {
            status: 200,
          }
        );
      },
      isModelAvailable: async () => true,
      log: createLog(),
      settings: testSettings,
      allCombos: null,
    });

    assert.equal(res.ok, false);
    assert.deepEqual(attempted, [geminiModel], "Only Gemini attempted; no cascade to Codex");
    // Because Gemini failed, active generation was NOT committed to 1
    assert.equal(
      getNativeCodexTurnActiveGeneration(turnBody, comboName),
      0,
      "Generation remains 0 on dispatch failure"
    );
    assert.equal(
      getNativeCodexTurnPin(turnBody, comboName, 0)?.modelStr,
      opusModel,
      "Gen 0 pin remains Opus"
    );
  });

  test("TTL expiry cleans up turn record and prevents memory leak", () => {
    const mockBody = {
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread-ttl-test",
          turn_id: "turn-ttl-test",
        }),
      },
    };

    pinNativeCodexTurn({
      body: mockBody,
      comboName,
      target: {
        kind: "model",
        stepId: "s1",
        executionKey: "ek1",
        modelStr: opusModel,
        provider: "antigravity",
        providerId: null,
        connectionId: "conn-ttl",
        weight: 1,
        label: null,
      },
      connectionId: "conn-ttl",
    });

    assert.ok(getNativeCodexTurnPin(mockBody, comboName));

    // Advance Date.now past TTL_MS (45 minutes = 2_700_000 ms)
    const origDateNow = Date.now;
    try {
      Date.now = () => origDateNow() + 46 * 60 * 1000;
      // Prune is triggered on read
      assert.equal(getNativeCodexTurnPin(mockBody, comboName), null, "Expired pin pruned");
      assert.equal(
        getNativeCodexTurnActiveGeneration(mockBody, comboName),
        0,
        "Expired turn record pruned"
      );
    } finally {
      Date.now = origDateNow;
    }
  });
});
