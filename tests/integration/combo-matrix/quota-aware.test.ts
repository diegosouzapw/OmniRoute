// tests/integration/combo-matrix/quota-aware.test.ts
//
// E2E matrix tests for the four quota-aware routing strategies:
//   reset-aware, reset-window, headroom, lkgp
//
// Each test engineers a specific non-default provider ordering so that a pass
// proves the selector actually reordered targets, not merely preserved definition
// order. The preferred target is always the SECOND one in the combo definition.
//
// Strategy → state source → seeded via:
//   reset-aware   → registerQuotaFetcher + scoreResetAwareQuota
//   reset-window  → registerQuotaFetcher + getResetWindowTimestampMs
//   headroom      → __setHeadroomSaturationFetcherForTests
//   lkgp          → setLKGP (key_value table, namespace='lkgp')

import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-quota-aware");
const { BaseExecutor, combosDb, handleChat, buildRequest, seedConnection, resetStorage } = h;

// Import quota / headroom seam hooks — must occur after the harness initialises
// the DB so the module-level singletons inside quotaStrategies.ts are already live.
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { __setHeadroomSaturationFetcherForTests } = await import(
  "../../../open-sse/services/combo/quotaStrategies.ts"
);

function body(model: string) {
  return { model, stream: false, messages: [{ role: "user", content: "quota-aware route" }] };
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});
test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  // Always restore the headroom fetcher override so it doesn't bleed into other tests.
  __setHeadroomSaturationFetcherForTests(null);
  await resetStorage();
});
test.after(async () => {
  __setHeadroomSaturationFetcherForTests(null);
  await h.cleanup();
});

// ── Strategy 1: reset-aware ────────────────────────────────────────────────────
//
// Selector: orderTargetsByResetAwareQuota (open-sse/services/combo/quotaStrategies.ts)
// State source: registerQuotaFetcher → scoreResetAwareQuota (quotaScoring.ts)
//
// Scoring: limitReached:true → score -Infinity.  No fetcher → score 0.5 (neutral).
//
// Engineered state:
//   openai  (1st in definition)  → fetcher returns { limitReached: true } → score -Infinity
//   claude  (2nd in definition)  → no fetcher registered  → score 0.5
//
// Expected: claude dispatched first (score 0.5 > -Infinity despite being second in combo).
test("reset-aware: exhausted connection (limitReached) demoted — second target dispatched first", async () => {
  const openaiConn = await seedConnection("openai", { apiKey: "sk-openai-raware-exhausted" });
  const claudeConn = await seedConnection("claude", { apiKey: "sk-claude-raware-fresh" });

  // Register AFTER seedConnection so connection objects are available.
  // The fetcher is keyed on provider name; connectionId is passed but we return
  // the same bad quota regardless so any openai connection is deprioritised.
  registerQuotaFetcher("openai", async (_connId) => ({ limitReached: true }));

  await combosDb.createCombo({
    name: "m-reset-aware",
    strategy: "reset-aware",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // openai FIRST in definition — must be demoted by reset-aware (limitReached → -Infinity)
      {
        id: "ra-openai",
        kind: "model",
        providerId: "openai",
        model: "gpt-4o-mini",
        connectionId: openaiConn.id,
      },
      // claude SECOND — must win (no fetcher → neutral score 0.5 > -Infinity)
      {
        id: "ra-claude",
        kind: "model",
        providerId: "claude",
        model: "claude-3-5-sonnet-20241022",
        connectionId: claudeConn.id,
      },
    ],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-reset-aware") }));
  assert.equal(r.status, 200, "request must succeed via fallback to fresh claude target");

  const first = h.providersSeen()[0];
  assert.equal(
    first,
    "claude",
    `reset-aware: openai has limitReached quota (score -Infinity), so claude (score 0.5) ` +
      `must be dispatched first even though it is second in the combo definition. Got: ${first}`
  );
});

// ── Strategy 2: reset-window ───────────────────────────────────────────────────
//
// Selector: orderTargetsByResetWindow (quotaStrategies.ts)
// State source: registerQuotaFetcher → getResetWindowTimestampMs (quotaScoring.ts)
//
// Sorting: ascending resetMs.  No fetcher → resetMs Infinity → sorted last.
//
// Engineered state:
//   openai  (1st in definition)  → no fetcher          → resetMs Infinity  (sorted last)
//   gemini  (2nd in definition)  → fetcher returns a reset ~1 hour away
//                                  → resetMs ≈ now + 3600s (sorted first)
//
// The openai "limitReached" fetcher from test 1 persists in the registry but
// limitReached → getResetWindowTimestampMs returns Infinity (same as no fetcher).
//
// Expected: gemini dispatched first (smallest resetMs).
test("reset-window: target with nearest quota-reset dispatched first despite being second in definition", async () => {
  const openaiConn = await seedConnection("openai", { apiKey: "sk-openai-rwindow" });
  const geminiConn = await seedConnection("gemini", { apiKey: "sk-gemini-rwindow-soon" });

  // Quota that resets in 1 hour → much sooner than openai (Infinity / limitReached).
  const soonResetAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  registerQuotaFetcher("gemini", async (_connId) => ({
    percentUsed: 0.5,
    window7d: { percentUsed: 0.5, resetAt: soonResetAt },
  }));

  await combosDb.createCombo({
    name: "m-reset-window",
    strategy: "reset-window",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // openai FIRST — must be demoted (no finite reset date → resetMs Infinity)
      {
        id: "rw-openai",
        kind: "model",
        providerId: "openai",
        model: "gpt-4o-mini",
        connectionId: openaiConn.id,
      },
      // gemini SECOND — must win (earliest reset → smallest resetMs)
      {
        id: "rw-gemini",
        kind: "model",
        providerId: "gemini",
        model: "gemini-2.5-flash",
        connectionId: geminiConn.id,
      },
    ],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-reset-window") }));
  assert.equal(r.status, 200, "request must succeed via gemini (nearest-reset) target");

  const first = h.providersSeen()[0];
  assert.equal(
    first,
    "gemini",
    `reset-window: gemini quota resets in ~1h (resetMs finite), openai has no reset date ` +
      `(resetMs Infinity), so gemini must be dispatched first despite being second in combo. Got: ${first}`
  );
});

// ── Strategy 3: headroom ───────────────────────────────────────────────────────
//
// Selector: orderTargetsByHeadroom (quotaStrategies.ts)
// State source: getSaturation — injectable via __setHeadroomSaturationFetcherForTests
//
// Ranking: headroom = 1 − max(util_5h, util_7d).  Higher headroom → dispatched first.
//
// Engineered state:
//   openai  (1st in definition)  → saturation 0.9 → headroom 0.1 (near capacity)
//   claude  (2nd in definition)  → saturation 0.1 → headroom 0.9 (mostly free)
//
// The connectionId is embedded in each model target so getQuotaAwareConnectionsForTarget
// correctly expands to the specific connection even when connections=[] (no quota fetcher
// needed for headroom — only the saturation signal matters).
//
// Expected: claude dispatched first (headroom 0.9 > headroom 0.1).
test("headroom: target with most free capacity dispatched first despite being second in definition", async () => {
  const openaiConn = await seedConnection("openai", { apiKey: "sk-openai-headroom-saturated" });
  const claudeConn = await seedConnection("claude", { apiKey: "sk-claude-headroom-free" });

  __setHeadroomSaturationFetcherForTests(async (connectionId, _provider, _dim) => {
    if (connectionId === openaiConn.id) return 0.9; // saturated → headroom 0.1
    if (connectionId === claudeConn.id) return 0.1; // mostly free → headroom 0.9
    return 0; // unknown → treat as full headroom (fail-open)
  });

  await combosDb.createCombo({
    name: "m-headroom",
    strategy: "headroom",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // openai FIRST in definition — must be demoted (saturation 0.9 → headroom 0.1)
      {
        id: "hr-openai",
        kind: "model",
        providerId: "openai",
        model: "gpt-4o-mini",
        connectionId: openaiConn.id,
      },
      // claude SECOND — must win (saturation 0.1 → headroom 0.9, the most free capacity)
      {
        id: "hr-claude",
        kind: "model",
        providerId: "claude",
        model: "claude-3-5-sonnet-20241022",
        connectionId: claudeConn.id,
      },
    ],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-headroom") }));
  assert.equal(r.status, 200, "request must succeed via claude (most headroom) target");

  const first = h.providersSeen()[0];
  assert.equal(
    first,
    "claude",
    `headroom: openai saturation=0.9 → headroom=0.1, claude saturation=0.1 → headroom=0.9, ` +
      `so claude must be dispatched first despite being second in combo definition. Got: ${first}`
  );
});

// ── Strategy 4: lkgp ──────────────────────────────────────────────────────────
//
// Selector: getLKGP(combo.name, combo.id || combo.name) (src/lib/db/settings.ts)
//   → reads key_value WHERE namespace='lkgp' AND key='<comboName>:<comboId>'
//   → moves the matched provider to front of orderedTargets
//
// Engineered state:
//   Pre-seed: setLKGP(comboId, comboId, "claude") → LKGP record says claude was best
//   Combo definition order: openai (1st), claude (2nd)
//
// Expected: claude moved to front despite being second in combo definition.
test("lkgp: last-known-good provider is prioritised above definition order", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-lkgp-test" });
  await seedConnection("claude", { apiKey: "sk-claude-lkgp-test" });

  // Explicit combo id keeps the LKGP key (`comboName:comboId`) predictable.
  const COMBO_ID = "m-lkgp-qa-001";

  // Import and write the LKGP record into the fresh DB (after resetStorage in beforeEach).
  const { setLKGP } = await import("../../../src/lib/db/settings.ts");
  // Key written: "m-lkgp-qa-001:m-lkgp-qa-001"  (comboName:comboId)
  // combo.ts reads: getLKGP(combo.name, combo.id || combo.name)
  await setLKGP(COMBO_ID, COMBO_ID, "claude");

  await combosDb.createCombo({
    id: COMBO_ID,
    name: COMBO_ID,
    strategy: "lkgp",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // openai FIRST in definition — must be deprioritised (LKGP record points to claude)
      "openai/gpt-4o-mini",
      // claude SECOND — must be moved to front by the LKGP record
      "claude/claude-3-5-sonnet-20241022",
    ],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body(COMBO_ID) }));
  assert.equal(r.status, 200, "request must succeed via claude (LKGP-preferred) target");

  const first = h.providersSeen()[0];
  assert.equal(
    first,
    "claude",
    `lkgp: LKGP record names "claude" as last-known-good, so claude must be dispatched ` +
      `first despite being second in the combo definition. Got: ${first}`
  );
});
