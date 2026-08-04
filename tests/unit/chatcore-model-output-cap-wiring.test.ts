// Wiring guard for the model-output-cap clamp: output-token-budget-model-cap.test.ts
// exercises enforceOutputTokenBudget() directly and therefore cannot catch a
// callsite regression — drop the cap argument in handleChatCore and every one of
// those unit tests still passes. This test drives handleChatCore() end to end
// (stubbed fetch, temp DB) and asserts the body actually dispatched upstream.
//
// The cap is supplied through an operator `max_token` capability override
// (src/lib/db/modelCapabilityOverrides.ts, issue #6524) rather than a catalog
// model, which pins two things at once and keeps the test independent of
// provider-catalog drift:
//   1. the clamp runs on the single-model (non-combo) path;
//   2. the cap lookup is keyed by { provider, model } — the bare-string form
//      resolves to provider: null, and the override table is keyed by provider,
//      so a string-keyed lookup silently misses it and no clamp happens.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-output-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const overridesDb = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

// Distinctive enough that it can never collide with a provider registered in
// open-sse/config/providerRegistry.ts, so nothing but the override supplies a cap.
const PROVIDER = "capwire-testprov";
const MODEL = "capwire-testmodel";
const OUTPUT_CAP = 1000;
const REQUESTED_MAX_TOKENS = 50_000;

const originalFetch = globalThis.fetch;
let dispatchedBody: Record<string, unknown> | null = null;

const silentLog = { debug() {}, info() {}, warn() {}, error() {} };

function buildRequest(maxTokens: number) {
  const body = {
    model: MODEL,
    messages: [{ role: "user", content: "hello" }],
    max_tokens: maxTokens,
    stream: false,
  };
  return {
    body,
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://capwire.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    log: silentLog,
  };
}

test.before(() => {
  core.resetDbInstance();
  assert.equal(
    overridesDb.setModelCapabilityOverride(`${PROVIDER}/${MODEL}`, "max_token", OUTPUT_CAP),
    true,
    "the operator override must be persisted for this test to mean anything"
  );

  globalThis.fetch = async (_input: RequestInfo | URL, init?: RequestInit) => {
    dispatchedBody = init?.body ? JSON.parse(String(init.body)) : null;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-capwire",
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("handleChatCore clamps an over-cap max_tokens to the model's output cap before dispatch", async () => {
  dispatchedBody = null;
  await handleChatCore(buildRequest(REQUESTED_MAX_TOKENS));

  assert.ok(dispatchedBody, "expected the request to reach the upstream fetch");
  assert.equal(
    dispatchedBody?.max_tokens,
    OUTPUT_CAP,
    `expected max_tokens clamped to the ${OUTPUT_CAP}-token operator cap, got ${dispatchedBody?.max_tokens}`
  );
});

test("handleChatCore leaves a max_tokens below the cap untouched", async () => {
  dispatchedBody = null;
  const underCap = OUTPUT_CAP - 1;
  await handleChatCore(buildRequest(underCap));

  assert.ok(dispatchedBody, "expected the request to reach the upstream fetch");
  assert.equal(
    dispatchedBody?.max_tokens,
    underCap,
    "a request below the cap must never be raised to it"
  );
});
