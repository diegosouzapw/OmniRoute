// Black-box regression for the Feature-5004 combo context-override rescue at the
// handleChatCore final input gate.
//
// The combo compatibility filter (open-sse/services/combo/contextOverrideGate.ts)
// deliberately lets a raw, exact `model_context_overrides` entry supersede a smaller
// catalog/client input hint so a capable fallback target is not wrongly dropped for a
// large prompt. But handleChatCore then enforced the canonical `maxInputTokens` again
// at the final hard boundary — so a target the filter just rescued was rejected before
// the upstream fetch (#5004 combo rescue defeated at the gate).
//
// Fix: the final gate resolves the input cap through `resolveInputTokenCapForGate`,
// which mirrors the filter's semantics — an exact context override supersedes the
// smaller catalog input hint for combo requests, while an explicit `max_input_tokens`
// capability override is ALWAYS enforced (combo and direct alike). No inheritance is
// generalized.
//
// GitHub's Claude alias canonicalizes before capability lookup, so a prompt sized
// between the catalog input hint and an exact raw-alias context override exercises
// the rescue the filter performs. These tests drive the public handleChatCore with a
// temp DB and an upstream fetch stub and assert on the
// dispatch signal (did the upstream fetch fire, and was the rejection the 400
// input-cap error) — the precise contract of the gate.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-ctx-rescue-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const capabilityOverrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const PROVIDER = "github";
const MODEL = "claude-opus-4.5";
const CONTEXT_OVERRIDE = 1_000_000;
// ~3.7M chars ≈ 925k estimated tokens — above the catalog input hint, below the override.
const BIG_PROMPT = "x".repeat(3_700_000);

const originalFetch = globalThis.fetch;
let fetchCalls = 0;
const silentLog = { debug() {}, info() {}, warn() {}, error() {} };

function buildRequest(isCombo: boolean, content: string) {
  const body = {
    model: MODEL,
    messages: [{ role: "user", content }],
    max_tokens: 10,
    stream: false,
  };
  return {
    body,
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://combo-ctx-rescue.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo,
    log: silentLog,
  };
}

test.before(() => {
  core.resetDbInstance();
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-combo-ctx",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  fetchCalls = 0;
  // Isolate each scenario: clear any overrides a prior test wrote so ordering does
  // not couple the assertions.
  contextOverrides.removeModelContextOverride(PROVIDER, MODEL);
  capabilityOverrides.removeModelCapabilityOverride(`${PROVIDER}/${MODEL}`, "max_input_tokens");
});

test("raw-alias combo request rescued by an exact context override dispatches", async () => {
  assert.equal(contextOverrides.setModelContextOverride(PROVIDER, MODEL, CONTEXT_OVERRIDE), true);
  // The prompt exceeds the catalog input hint but fits the context override. A combo
  // request must NOT be rejected at the gate — the upstream fetch must fire.
  const result = await handleChatCore(buildRequest(true, BIG_PROMPT));
  assert.ok(fetchCalls > 0, "rescued combo target must reach the upstream fetch");
  assert.notEqual(
    result.status,
    400,
    "rescued combo target must not be rejected with the input-cap 400"
  );
});

test("an exact raw-alias max_input_tokens override is enforced even in a combo", async () => {
  // An explicit max_input_tokens capability override must NEVER be bypassed by a
  // context override — combo included.
  assert.equal(contextOverrides.setModelContextOverride(PROVIDER, MODEL, CONTEXT_OVERRIDE), true);
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(
      `${PROVIDER}/${MODEL}`,
      "max_input_tokens",
      1000
    ),
    true
  );
  const result = await handleChatCore(buildRequest(true, BIG_PROMPT));
  assert.equal(result.status, 400);
  assert.equal(
    fetchCalls,
    0,
    "explicit max_input override must reject with zero fetch even in combo"
  );
  assert.match(JSON.stringify(result), /maximum input tokens/i);
});
