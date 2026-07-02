// tests/integration/combo-matrix/context-relay-codex.test.ts
//
// Deterministic in-process test for context-relay CODEX-SPECIFIC HANDOFF
// (combo.ts ~2143-2183): the quota-aware handoff that fires after a successful
// codex response when the quota exceeds the threshold.
//
// Code path:
//   if (strategy === "context-relay" && relayOptions?.sessionId && relayConfig &&
//       relayConfig.handoffProviders.includes(provider) && provider === "codex") {
//     const connectionId = getSessionConnection(relayOptions.sessionId);
//     if (connectionId) {
//       const quotaInfo = await fetchCodexQuota(connectionId).catch(() => null);
//       if (quotaInfo) { ... maybeGenerateHandoff({ ..., expiresAt: resetCandidates[0] }); }
//     }
//   }
//
// PRIMARY observable: getHandoff(sessionId, comboName).expiresAt === session-window
//   reset time from the codex quota response. This is the CODEX-SPECIFIC proof:
//   the universal handoff path does NOT set expiresAt from a codex quota fetch.
//
// SECONDARY observables:
//   - The codex usage URL was fetched (proves the quota path ran).
//   - The handoff record has a non-empty .summary.
//
// CONTROL: combo targeting openai (not codex) → codex block NEVER runs →
//   codex usage URL is never fetched → expiresAt from quota doesn't appear.
//
// Seams used:
//   - registerCodexConnection / unregisterCodexConnection (codexQuotaFetcher.ts)
//   - clearSessions (sessionManager.ts) — cleanup between tests
//   - buildCodexResponsesSse helper (mirrors codex-stream-false.test.ts)
//   - Custom fetch mock distinguishes quota URL / summary dispatch / main dispatch

import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";
import {
  registerCodexConnection,
  unregisterCodexConnection,
} from "../../../open-sse/services/codexQuotaFetcher.ts";
import { clearSessions } from "../../../open-sse/services/sessionManager.ts";

// ── Harness setup ─────────────────────────────────────────────────────────────
// Each harness owns an isolated DATA_DIR so DB handles don't clash.
const h = await createComboRoutingHarness("combo-relay-codex");
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

// Import DB helpers AFTER harness creation so they share the same DB instance
// (DATA_DIR is set by the harness before any import triggers DB init).
const { getHandoff } = await import("../../../src/lib/db/contextHandoffs.ts");

// ── Constants ─────────────────────────────────────────────────────────────────

const CODEX_COMBO_NAME = "m-relay-codex-quota";
const SESSION_HEADER_VALUE = "relay-codex-quota-001";
const SESSION_ID = `ext:${SESSION_HEADER_VALUE}`;

// Codex endpoint URLs (must match codexQuotaFetcher.ts and the executor config).
const CODEX_USAGE_URL = "https://chatgpt.com/backend-api/wham/usage";
const CODEX_RESPONSES_HOST = "chatgpt.com/backend-api/codex/responses";

// Summary JSON that parseHandoffJSON will successfully parse.
const CODEX_SUMMARY_JSON = JSON.stringify({
  summary:
    "User is implementing a TypeScript context-relay codex quota-handoff test using TDD.",
  keyDecisions: ["codex provider selected", "quota threshold at 90%"],
  taskProgress: "writing deterministic integration test for codex handoff",
  activeEntities: ["combo.ts", "codexQuotaFetcher.ts", "contextHandoff.ts"],
});

// ── SSE builder (mirrors codex-stream-false.test.ts) ─────────────────────────

function buildCodexResponsesSse(text = "codex assistant reply") {
  return new Response(
    [
      "event: response.created",
      'data: {"type":"response.created","response":{"id":"resp_codex_1","model":"gpt-5.3-codex","status":"in_progress","output":[]}}',
      "",
      "event: response.output_text.delta",
      `data: ${JSON.stringify({
        type: "response.output_text.delta",
        output_index: 0,
        delta: text,
      })}`,
      "",
      "event: response.completed",
      `data: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: "resp_codex_1",
          object: "response",
          model: "gpt-5.3-codex",
          status: "completed",
          output: [
            {
              type: "message",
              role: "assistant",
              content: [{ type: "output_text", text }],
            },
          ],
          usage: { input_tokens: 6, output_tokens: 4 },
        },
      })}`,
      "",
      "data: [DONE]",
      "",
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

// ── Quota response builder ────────────────────────────────────────────────────
// Produces a codex usage API response that parseCodexUsageResponse accepts.
// primary_window  → session  → percentUsed = 0.90 (90%) — triggers handoff (threshold 0.85)
// secondary_window → weekly  → percentUsed = 0.85 (85%) — below threshold for weekly
// Both are below HANDOFF_EXHAUSTION_THRESHOLD (0.95) so maybeGenerateHandoff proceeds.

function buildCodexUsageBody(
  sessionResetAtUnix: number,
  weeklyResetAtUnix: number
): Record<string, unknown> {
  return {
    rate_limit: {
      primary_window: { used_percent: 90, reset_at: sessionResetAtUnix },
      secondary_window: { used_percent: 85, reset_at: weeklyResetAtUnix },
    },
  };
}

// ── Request builder ───────────────────────────────────────────────────────────

function codexRequest(withSessionId = true) {
  return buildRequest({
    headers: withSessionId ? { "x-session-id": SESSION_HEADER_VALUE } : {},
    body: {
      model: CODEX_COMBO_NAME,
      stream: false,
      messages: [{ role: "user", content: "Write a TypeScript hello world." }],
    },
  });
}

// ── Fetch mock ────────────────────────────────────────────────────────────────
// Handles three URL classes:
//   1. CODEX_USAGE_URL              → codex quota JSON
//   2. CODEX_RESPONSES_HOST (call 1) → main request Responses API SSE
//   3. CODEX_RESPONSES_HOST (call 2) → summary request Responses API SSE (with CODEX_SUMMARY_JSON)
//
// The second codex-responses call is the handoff summary generation, identified by
// call count (the first is always the main request).

function installCodexHandoffFetch(
  sessionResetAtUnix: number,
  weeklyResetAtUnix: number,
  seenUrls: string[]
) {
  let codexResponsesCallCount = 0;

  globalThis.fetch = async (url: unknown, init: unknown = {}) => {
    const u = String(url);
    seenUrls.push(u);

    const headers =
      init != null && typeof init === "object"
        ? toPlainHeaders((init as Record<string, unknown>).headers)
        : {};
    void headers; // recorded for debugging; not needed in assertions here

    if (u === CODEX_USAGE_URL) {
      // Codex quota endpoint — return structured usage JSON.
      return new Response(
        JSON.stringify(buildCodexUsageBody(sessionResetAtUnix, weeklyResetAtUnix)),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (u.includes(CODEX_RESPONSES_HOST)) {
      codexResponsesCallCount++;
      if (codexResponsesCallCount === 1) {
        // Main codex request — return a successful Responses API SSE.
        return buildCodexResponsesSse("codex assistant reply ok");
      }
      // Subsequent call(s) are from the handoff summary generation.
      // Return Responses API SSE whose output_text is CODEX_SUMMARY_JSON so that
      // generateHandoffAsync → parseHandoffJSON succeeds.
      return buildCodexResponsesSse(CODEX_SUMMARY_JSON);
    }

    // Fallback — should not be reached in these tests.
    return new Response(JSON.stringify({ error: { message: "unexpected URL in test" } }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  };
}

// ── Lifecycle hooks ───────────────────────────────────────────────────────────

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  // Clear in-memory session state so test 2 doesn't see stale connections from test 1.
  clearSessions();
  await resetStorage();
});

test.after(async () => {
  await h.cleanup();
});

// ── Test 1 (PRIMARY): codex quota handoff fires ───────────────────────────────
//
// Flow:
//   1. Seed a codex DB connection + register with accessToken.
//   2. Create context-relay combo → codex.
//   3. Send request with x-session-id header.
//   4. During request processing, chat.ts calls touchSession(sessionId, codexConnId).
//   5. After the successful codex response, combo.ts enters the codex block:
//      - getSessionConnection → codexConnId (set in step 4).
//      - fetchCodexQuota(codexConnId) → hits our mock → returns 90% usage.
//      - resetCandidates[0] = session-window resetAt ISO string.
//      - maybeGenerateHandoff({ ..., expiresAt: sessionResetISO }) fires via setImmediate.
//   6. generateHandoffAsync dispatches a second codex fetch for the summary.
//   7. upsertHandoff writes to DB with expiresAt = sessionResetISO.
//
// Assertion: handoff.expiresAt === sessionResetISO (codex-specific, not TTL-derived).

test("context-relay codex quota handoff: fires and expiresAt matches session-window reset from quota", async () => {
  // 1. Seed codex connection.
  const conn = await seedConnection("codex", { apiKey: "sk-codex-handoff-test-1" });
  const codexConnId = conn.id;

  // 2. Register connection meta so fetchCodexQuota can find credentials.
  //    chat.ts also calls registerCodexConnection during request processing for OAuth
  //    tokens; for API-key connections the accessToken may not be set there, so we
  //    pre-register with the API key as the token. This is the documented test seam.
  registerCodexConnection(codexConnId, { accessToken: "sk-codex-handoff-test-1" });

  // 3. Create a context-relay combo targeting codex.
  //    Default handoffProviders: ["codex"] and handoffThreshold: 0.85 apply.
  await combosDb.createCombo({
    name: CODEX_COMBO_NAME,
    strategy: "context-relay",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      { id: "rc-codex-1", kind: "model", providerId: "codex", model: "gpt-5.3-codex" },
    ],
  });

  // 4. Compute quota reset times (future timestamps).
  const sessionResetAtUnix = Math.floor((Date.now() + 5 * 60 * 60 * 1000) / 1000); // +5h
  const weeklyResetAtUnix = Math.floor((Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000); // +7d

  // Expected expiresAt: parseWindowReset converts reset_at (unix seconds) → ISO string.
  // resetCandidates[0] = earliest ISO string = session window reset (5h < 7d).
  const expectedExpiresAt = new Date(sessionResetAtUnix * 1000).toISOString();

  // 5. Install fetch mock and send request.
  const seenUrls: string[] = [];
  installCodexHandoffFetch(sessionResetAtUnix, weeklyResetAtUnix, seenUrls);

  const r = await handleChat(codexRequest(true));
  assert.equal(r.status, 200, "main codex request must return 200");

  // 6. Wait for setImmediate → generateHandoffAsync → upsertHandoff (up to 3s).
  const handoff = await waitFor(() => getHandoff(SESSION_ID, CODEX_COMBO_NAME), 3000);

  // ── Primary assertion: handoff record exists ──────────────────────────────
  assert.ok(
    handoff !== null,
    "codex quota handoff record must be written to DB when quota ≥ threshold"
  );

  // ── CODEX-SPECIFIC proof: expiresAt == session-window reset from quota ────
  // The universal handoff path never calls fetchCodexQuota, so it cannot produce
  // this specific expiresAt value. The value below can only come from the codex block.
  assert.equal(
    handoff!.expiresAt,
    expectedExpiresAt,
    `handoff.expiresAt must equal the session-window reset from codex quota (${expectedExpiresAt}); ` +
      `got ${handoff!.expiresAt}`
  );

  // ── Secondary assertion: codex usage URL was fetched ─────────────────────
  assert.ok(
    seenUrls.includes(CODEX_USAGE_URL),
    `codex usage URL must have been fetched to produce the expiresAt; seen URLs: ${JSON.stringify(seenUrls)}`
  );

  // ── Secondary assertion: summary was generated (non-empty) ───────────────
  assert.ok(
    typeof handoff!.summary === "string" && handoff!.summary.length > 0,
    `handoff.summary must be non-empty; got ${JSON.stringify(handoff!.summary)}`
  );

  // ── Cleanup ───────────────────────────────────────────────────────────────
  unregisterCodexConnection(codexConnId);
});

// ── Test 2 (CONTROL): non-codex provider never triggers the codex block ───────
//
// The codex block gates on `provider === "codex"`. A combo targeting openai
// will never enter it, so the codex usage URL is never fetched and there is no
// quota-derived expiresAt in the DB.
//
// This proves the primary test is not trivially green (i.e., the block is
// actually gated on `provider === "codex"`).

test("context-relay codex quota handoff: does NOT fire when provider is openai (control)", async () => {
  // Seed openai (not codex).
  await seedConnection("openai", { apiKey: "sk-openai-control-no-codex-block" });

  await combosDb.createCombo({
    name: CODEX_COMBO_NAME,
    strategy: "context-relay",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      { id: "rc-openai-ctrl", kind: "model", providerId: "openai", model: "gpt-4o-mini" },
    ],
  });

  const seenUrls: string[] = [];
  globalThis.fetch = async (url: unknown, _init: unknown = {}) => {
    seenUrls.push(String(url));
    return buildOpenAIResponse("assistant reply ok");
  };

  const r = await handleChat(codexRequest(true));
  assert.equal(r.status, 200, "openai request must return 200");

  // Give setImmediate time to fire if the block were incorrectly entered.
  await new Promise((res) => setTimeout(res, 400));

  // The codex block requires provider === "codex", so it never runs for openai.
  // The codex usage URL must NOT have been fetched.
  assert.ok(
    !seenUrls.includes(CODEX_USAGE_URL),
    `codex usage URL must NOT be fetched for openai provider; seen: ${JSON.stringify(seenUrls)}`
  );

  // No codex quota handoff record in DB.
  // (The universal handoff also does not fire because no prior model is seeded,
  // so getLastSessionModel returns null → no model switch detected.)
  const handoff = getHandoff(SESSION_ID, CODEX_COMBO_NAME);
  assert.equal(
    handoff,
    null,
    "no handoff record must exist when provider is openai (codex block never entered)"
  );
});
