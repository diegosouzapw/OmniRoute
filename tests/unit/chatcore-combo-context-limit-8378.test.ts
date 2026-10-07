// Regression for #8378: handleChatCore resolves a combo-specific context limit
// (resolveComboContextLimit(), which can differ from the plain
// getTokenLimit(provider, model) lookup when the target's own limit isn't
// "specific" and a sibling combo target has a smaller known window) but that
// value was declared *inside* the proactive-compression `if` block and never
// survived to the final enforceOutputTokenBudget() call further down in
// handleChatCore — so the combo override was silently discarded and the
// naive per-target lookup won instead. output-token-budget.test.ts only
// exercises enforceOutputTokenBudget() directly and can never catch this
// class of bug because it never calls handleChatCore().
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-ctxlimit-8378-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

// Sibling target's provider name is unusual enough it can never collide with a
// real provider registered in open-sse/config/providerRegistry.ts, and the env
// override key is derived from it: CONTEXT_LENGTH_<PROVIDER-UPPERCASED>.
const MAIN_PROVIDER = "combo8378-mainprov";
const MAIN_MODEL = "combo8378-mainmodel";
const SIBLING_PROVIDER = "combo8378-sibprov";
const SIBLING_MODEL = "combo8378-sibmodel";
const SIBLING_LIMIT_ENV = "CONTEXT_LENGTH_COMBO8378_SIBPROV";
const SIBLING_LIMIT = 5000;
const COMBO_NAME = "combo8378-test-combo";

const originalFetch = globalThis.fetch;
const originalSiblingEnv = process.env[SIBLING_LIMIT_ENV];

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.before(async () => {
  await resetStorage();
  // Forces getTokenLimit(SIBLING_PROVIDER, ...) to a small, distinctive value
  // via the env-override branch (highest priority in resolveTokenLimit()), so
  // resolveComboContextLimit()'s combo-min fallback has a real, known-smaller
  // value to fall back to for the (unregistered) MAIN_PROVIDER target.
  process.env[SIBLING_LIMIT_ENV] = String(SIBLING_LIMIT);

  await combosDb.createCombo({
    name: COMBO_NAME,
    models: [`${MAIN_PROVIDER}/${MAIN_MODEL}`, `${SIBLING_PROVIDER}/${SIBLING_MODEL}`],
  });

  // Defensive: nothing in the expected (fixed) code path should ever reach
  // the network for this test — the request is rejected locally for
  // exceeding the combo-resolved context window — but stub fetch anyway so a
  // regression that silently lets the request through can't make a real
  // outbound call.
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [{ message: { content: "unexpected" } }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalSiblingEnv === undefined) {
    delete process.env[SIBLING_LIMIT_ENV];
  } else {
    process.env[SIBLING_LIMIT_ENV] = originalSiblingEnv;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#8378: enforceOutputTokenBudget honors the combo-resolved context limit, not the plain per-target lookup", async () => {
  // ~5,600 estimated tokens (estimateTokens ~= chars/4): comfortably above the
  // combo-resolved limit (5,000, source="combo-min") but far below the naive
  // getTokenLimit(MAIN_PROVIDER, MAIN_MODEL) fallback (128,000, the generic
  // DEFAULT_LIMITS.default an unregistered provider/model resolves to). Only
  // the combo-resolved limit rejects this request.
  const longContent = "x".repeat(22_500);

  const result = await handleChatCore({
    body: {
      model: MAIN_MODEL,
      messages: [{ role: "user", content: longContent }],
      stream: false,
    },
    modelInfo: {
      provider: MAIN_PROVIDER,
      model: MAIN_MODEL,
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://combo8378.example.test",
      },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: {
        model: MAIN_MODEL,
        messages: [{ role: "user", content: longContent }],
        stream: false,
      },
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: true,
    comboName: COMBO_NAME,
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.equal(
    result.success,
    false,
    "expected the request to be rejected against the combo-resolved 5,000-token limit"
  );
  const failure = result as { success: false; error: string; rawMessage?: string };
  const message = failure.rawMessage ?? failure.error;
  assert.match(
    message,
    /limit 5000\b/,
    `expected the rejection to cite the combo-resolved limit (5000); got: ${message}`
  );
  assert.doesNotMatch(
    message,
    /limit 128000\b/,
    "the naive per-target getTokenLimit() fallback (128000) must not win over the combo override"
  );
});
