// tests/integration/combo-matrix/context-relay-handoff.test.ts
//
// Deterministic in-process tests for context-relay UNIVERSAL HANDOFF behavior:
//   the session-context transfer that fires when a model switch is detected,
//   regardless of provider (provider-agnostic). This is the distinguishing
//   behavior of context-relay that was deferred as TODO(phase-2) in the
//   original combo-matrix coverage.
//
// What is tested here:
//   1. Universal handoff fires (extra summary dispatch + DB record) when:
//      - universalHandoffConfig.enabled = true (default)
//      - request carries x-omniroute-session-id header
//      - session_model_history records a DIFFERENT prior model than the combo target
//   2. Control (no model switch): prevModel === currModel — handoff must NOT fire.
//   3. Control (no session ID): no header passed — handoff must NOT fire.
//
// Codex-specific block (lines 2143-2183 in combo.ts):
//   Requires strategy === "context-relay" AND provider === "codex" AND a live
//   codex session connection + quota fetcher. The seams (getSessionConnection /
//   fetchCodexQuota) are NOT exported from contextHandoff.ts as testable hooks;
//   there is no in-process mechanism equivalent to registerQuotaFetcher for the
//   codex path. This block requires a real codex provider connection (VPS) and
//   is NOT covered here. The universal-handoff path above is the user-visible,
//   provider-agnostic behavior and is now fully covered.

import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness, providerFromUrl } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-relay-handoff");
const {
  BaseExecutor,
  combosDb,
  handleChat,
  buildRequest,
  seedConnection,
  resetStorage,
  buildOpenAIResponse,
  waitFor,
  toPlainHeaders,
} = h;

// Import DB helpers AFTER harness so they share the same DB instance (DATA_DIR
// is set by the harness before any import triggers DB init).
const { recordSessionModelUsage, getHandoff } = await import(
  "../../../src/lib/db/contextHandoffs.ts"
);

// A minimal but valid handoff-JSON blob that parseHandoffJSON will accept.
// Must have at minimum a non-empty "summary" field.
const SCRIPTED_SUMMARY_JSON = JSON.stringify({
  summary: "User initiated a context-relay handoff test and requested a model switch.",
  keyDecisions: ["switched from gemini to openai"],
  taskProgress: "in-progress",
  activeEntities: ["context-relay-test"],
});

const COMBO_NAME = "m-relay-handoff";
// The session ID must use the external-session format: extractExternalSessionId in chat.ts
// reads "x-session-id" (not "x-omniroute-session-id") and prefixes the result with "ext:".
// We must seed session_model_history with this exact "ext:"-prefixed ID so that
// getLastSessionModel(relayOptions.sessionId, comboName) returns the prior model.
const SESSION_HEADER_VALUE = "relay-handoff-session-001";
const SESSION_ID = `ext:${SESSION_HEADER_VALUE}`; // matches what extractExternalSessionId produces
const PREV_MODEL = "gemini/gemini-2.5-flash"; // the "old" model — must differ from combo target
const CURR_MODEL = "openai/gpt-4o-mini"; // the combo target model (provider/model format)

// Build a Request with the session-id header.
function relayRequest(withSessionId = true) {
  const headers: Record<string, string> = withSessionId
    ? { "x-session-id": SESSION_HEADER_VALUE } // x-session-id → relayOptions.sessionId = "ext:..."
    : {};
  return buildRequest({
    headers,
    body: {
      model: COMBO_NAME,
      stream: false,
      messages: [
        { role: "user", content: "Prior turn — building something important in the test session." },
      ],
    },
  });
}

// Install a recording fetch that:
//   • returns a valid handoff JSON (wrapped in an OpenAI completion) for the
//     internal summary request (identified by _omnirouteInternalRequest flag in body)
//   • returns a normal OpenAI response for every other call
function installHandoffAwareFetch() {
  h.calls.length = 0;

  globalThis.fetch = async (url: any, init: any = {}) => {
    const u = String(url);
    const provider = providerFromUrl(u);
    const headers = toPlainHeaders(init?.headers);

    // Parse request body to detect the internal summary request
    let bodyObj: Record<string, unknown> = {};
    try {
      bodyObj =
        typeof init?.body === "string"
          ? (JSON.parse(init.body) as Record<string, unknown>)
          : ((init?.body ?? {}) as Record<string, unknown>);
    } catch {
      bodyObj = {};
    }

    const call = {
      index: h.calls.length,
      provider,
      url: u,
      authorization: headers.authorization,
      model: typeof bodyObj.model === "string" ? bodyObj.model : undefined,
    };
    h.calls.push(call);

    // Return valid handoff JSON for the internal summary generation request
    if (bodyObj._omnirouteInternalRequest === "universal-handoff") {
      return buildOpenAIResponse(SCRIPTED_SUMMARY_JSON);
    }

    // Normal success response for the real request
    return buildOpenAIResponse("assistant reply ok");
  };
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});
test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await resetStorage();
});
test.after(async () => {
  await h.cleanup();
});

// ── Test 1: universal handoff fires on model switch ────────────────────────────
//
// Seed session history so getLastSessionModel returns PREV_MODEL (gemini).
// Combo target is CURR_MODEL (openai). The switch is detected and
// maybeGenerateUniversalHandoff fires via setImmediate → calls handleSingleModel
// (extra upstream dispatch) → parses response → upsertHandoff writes to DB.
//
// Observable 1: h.calls has ≥2 entries (main request + summary dispatch).
// Observable 2: getHandoff(sessionId, comboName) returns a record with a
//               non-empty .summary (proves the FULL path executed, not just the
//               dispatch). The assertion FAILS if the handoff did not fire.
test("context-relay universal handoff: fires and writes handoff record on model switch", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-handoff" });
  await seedConnection("gemini", { apiKey: "sk-gemini-handoff" });

  await combosDb.createCombo({
    name: COMBO_NAME,
    strategy: "context-relay",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // Single target — openai/gpt-4o-mini — so modelStr = CURR_MODEL
      { id: "rh-openai", kind: "model", providerId: "openai", model: "gpt-4o-mini" },
    ],
  });

  // Seed the prior model usage so getLastSessionModel returns PREV_MODEL.
  // universalHandoffConfig.enabled = true by DEFAULT_UNIVERSAL_HANDOFF_CONFIG.
  recordSessionModelUsage(SESSION_ID, COMBO_NAME, PREV_MODEL, "gemini", undefined);

  installHandoffAwareFetch();

  const r = await handleChat(relayRequest(/* withSessionId */ true));
  assert.equal(r.status, 200, "main request must succeed");

  // Wait for the setImmediate + generateUniversalHandoffAsync to complete and
  // write the DB record. Poll for up to 2 s — typically resolves in <100 ms.
  const handoff = await waitFor(
    () => getHandoff(SESSION_ID, COMBO_NAME),
    2000
  );

  assert.ok(
    handoff !== null,
    "universal handoff record must be written to DB when a model switch is detected"
  );
  assert.ok(
    typeof handoff!.summary === "string" && handoff!.summary.length > 0,
    `handoff.summary must be non-empty; got: ${JSON.stringify(handoff!.summary)}`
  );
  assert.equal(
    handoff!.comboName,
    COMBO_NAME,
    "handoff must be keyed to the correct combo"
  );
  assert.equal(
    handoff!.sessionId,
    SESSION_ID,
    "handoff must be keyed to the correct session"
  );

  // Extra dispatch observable: main (index 0) + summary (index ≥ 1).
  assert.ok(
    h.calls.length >= 2,
    `expected ≥2 upstream dispatches (main + summary); got ${h.calls.length}: ${JSON.stringify(h.calls.map((c) => ({ i: c.index, p: c.provider, m: c.model })))}`
  );
});

// ── Test 2: control — no model switch, handoff must NOT fire ──────────────────
//
// DO NOT seed a prior model. getLastSessionModel returns null → prevModel is
// null → the `if (prevModel && prevModel !== modelStr)` branch is skipped →
// no handoff. The assertion FAILS if the code incorrectly fires a handoff.
test("context-relay universal handoff: does NOT fire when no prior model is recorded (no switch)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-noswitch" });

  await combosDb.createCombo({
    name: COMBO_NAME,
    strategy: "context-relay",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [{ id: "ns-openai", kind: "model", providerId: "openai", model: "gpt-4o-mini" }],
  });

  // No recordSessionModelUsage call → getLastSessionModel returns null → no switch.
  installHandoffAwareFetch();

  const r = await handleChat(relayRequest(true));
  assert.equal(r.status, 200);

  // Give setImmediate time to fire if the bug were present.
  await new Promise((res) => setTimeout(res, 250));

  const handoff = getHandoff(SESSION_ID, COMBO_NAME);
  assert.equal(
    handoff,
    null,
    "handoff must NOT be written when no prior model exists (prevModel is null)"
  );

  // Only the main request — no extra summary dispatch.
  assert.equal(
    h.calls.length,
    1,
    `expected exactly 1 upstream dispatch (main only); got ${h.calls.length}`
  );
});

// ── Test 3: control — no session ID, handoff must NOT fire ────────────────────
//
// Session ID gate: `relayOptions?.sessionId` must be truthy.
// Without the x-omniroute-session-id header, sessionId = null → block is skipped.
test("context-relay universal handoff: does NOT fire when x-omniroute-session-id header is absent", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-nosid" });

  await combosDb.createCombo({
    name: COMBO_NAME,
    strategy: "context-relay",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [{ id: "sid-openai", kind: "model", providerId: "openai", model: "gpt-4o-mini" }],
  });

  // Seed prior model — but without the header the session block won't fire.
  recordSessionModelUsage(SESSION_ID, COMBO_NAME, PREV_MODEL, "gemini", undefined);

  installHandoffAwareFetch();

  // Send WITHOUT the session header.
  const r = await handleChat(relayRequest(/* withSessionId */ false));
  assert.equal(r.status, 200);

  await new Promise((res) => setTimeout(res, 250));

  const handoff = getHandoff(SESSION_ID, COMBO_NAME);
  assert.equal(
    handoff,
    null,
    "handoff must NOT be written when x-omniroute-session-id header is absent (sessionId gate)"
  );

  assert.equal(
    h.calls.length,
    1,
    `expected exactly 1 upstream dispatch (main only, no summary); got ${h.calls.length}`
  );
});
