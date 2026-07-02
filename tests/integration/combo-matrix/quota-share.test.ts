// tests/integration/combo-matrix/quota-share.test.ts
//
// E2E matrix test for the INTERNAL quota-share routing strategy (DRR / deficit
// round-robin over auto-minted qtSd/ pool combos).
//
// Drive path: handleChat → chatCore → handleComboChat (strategy "quota-share")
//   → selectQuotaShareTarget (DRR + P2C + bucket-gating) → executor dispatch.
//
// Two tests:
//   1. DRR fairness — 2 equal-weight connections, 6 requests; both must be
//      selected and balanced, proving DRR ran end-to-end (not a single-winner
//      or definition-order dispatch).
//   2. Saturation deprioritization — one connection marked saturated via
//      recordUsage (5h window); a single request must dispatch to the clean
//      connection first, proving the bucket-gating gate runs through the real
//      wire.
//
// Drive path chosen: Option A — direct `combosDb.createCombo({ strategy:
// "quota-share", ... })`. The `handleComboChat` dispatch at combo.ts:1573
// branches on `strategy === "quota-share"` verbatim; no qtSd/ pool plumbing is
// required to reach `selectQuotaShareTarget`.
//
// The preferred target is always the SECOND one in the combo definition so that
// a pass proves the selector actually reordered targets (same discipline as the
// 17-strategy quota-aware.test.ts matrix).

import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "../_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("combo-quota-share");
const { BaseExecutor, combosDb, handleChat, buildRequest, seedConnection, resetStorage } = h;

// DRR + bucket state seams — import AFTER harness initialises the DB so the
// module-level in-process singletons are already live.
const { _clearDrrStateForTest } = await import(
  "../../../open-sse/services/combo/quotaShareStrategy.ts"
);
const { recordUsage, _clearBucketsForTest } = await import(
  "../../../src/lib/quota/accountBuckets.ts"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function body(model: string, suffix = "") {
  return {
    model,
    stream: false,
    messages: [{ role: "user", content: `quota-share route${suffix}` }],
  };
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  _clearDrrStateForTest();
  _clearBucketsForTest();
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  _clearDrrStateForTest();
  _clearBucketsForTest();
  await resetStorage();
});

test.after(async () => {
  _clearDrrStateForTest();
  _clearBucketsForTest();
  await h.cleanup();
});

// ── Strategy: quota-share — DRR fairness ─────────────────────────────────────
//
// Mechanism: DRR (deficit round robin, quantum = weight / totalWeight).
//
// Engineered state:
//   openai (1st in definition)  — equal weight 100
//   gemini (2nd in definition)  — equal weight 100
//
// With 2 equal-weight targets DRR alternates: openai, gemini, openai, gemini, …
// Over 6 requests both must be selected at least 2 times (proven to be exactly
// 3 each by the deterministic math, but asserting >= 2 avoids brittleness if
// P2C ever nudges a tie differently). The assertion fails if the pipeline
// pin-picks the first candidate on every call — i.e. if DRR is bypassed.
test("DRR fairness: 2 equal-weight connections alternate across 6 requests through real pipeline", async () => {
  const openaiConn = await seedConnection("openai", { apiKey: "sk-openai-qs-drr-1" });
  const geminiConn = await seedConnection("gemini", { apiKey: "sk-gemini-qs-drr-1" });

  await combosDb.createCombo({
    name: "m-qs-drr",
    strategy: "quota-share",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // openai FIRST in definition
      {
        id: "qs-drr-openai",
        kind: "model",
        providerId: "openai",
        model: "gpt-4o-mini",
        connectionId: openaiConn.id,
      },
      // gemini SECOND in definition — DRR must pick it on alternate rounds
      {
        id: "qs-drr-gemini",
        kind: "model",
        providerId: "gemini",
        model: "gemini-2.5-flash",
        connectionId: geminiConn.id,
      },
    ],
  });
  h.installRecordingFetch();

  // Use a unique message suffix per request so session stickiness (message-hash
  // based) does not pin every call to the first-round winner.  In real traffic
  // each conversation has distinct content; the DRR distributes across them.
  for (let i = 0; i < 6; i++) {
    const r = await handleChat(buildRequest({ body: body("m-qs-drr", ` #${i}`) }));
    assert.equal(r.status, 200, `request ${i + 1} must succeed`);
  }

  const seen = h.providersSeen();
  assert.equal(seen.length, 6, "all 6 requests must reach an upstream provider");

  const openaiCount = seen.filter((p) => p === "openai").length;
  const geminiCount = seen.filter((p) => p === "gemini").length;

  assert.ok(
    openaiCount >= 2,
    `DRR fairness: openai must be selected at least 2 times out of 6; got ${openaiCount}. ` +
      `Full sequence: [${seen.join(", ")}]. If openai was never selected, DRR was bypassed.`
  );
  assert.ok(
    geminiCount >= 2,
    `DRR fairness: gemini must be selected at least 2 times out of 6; got ${geminiCount}. ` +
      `Full sequence: [${seen.join(", ")}]. If gemini was never selected, DRR was bypassed.`
  );
});

// ── Strategy: quota-share — saturation deprioritization ──────────────────────
//
// Mechanism: filterEligibleBySaturation (isBucketSaturated, 5h window).
//
// Engineered state:
//   openai (1st in definition)  — 5h bucket seeded at 100 % usage via
//                                  recordUsage → isBucketSaturated returns true
//                                  → filterEligibleBySaturation demotes it
//   gemini (2nd in definition)  — no bucket recorded → eligible (clean)
//
// Expected: gemini dispatched first despite being second in the combo
// definition. Proves the bucket-gating runs through the real pipeline wire
// (not merely unit-tested in isolation).
test("saturation deprioritization: saturated connection demoted — clean second target dispatched first", async () => {
  const openaiConn = await seedConnection("openai", { apiKey: "sk-openai-qs-sat-1" });
  const geminiConn = await seedConnection("gemini", { apiKey: "sk-gemini-qs-sat-1" });

  // Seed openai connection as saturated (5h window, 100 % usage, reset in 1 h).
  // recordUsage writes the in-process _buckets store; isBucketSaturated reads it.
  // The resetAt must be in the FUTURE so the lazy-reset guard keeps the entry live.
  const futureResetAt = new Date(Date.now() + 3_600_000).toISOString();
  recordUsage(openaiConn.id, "5h", 100, futureResetAt);

  await combosDb.createCombo({
    name: "m-qs-sat",
    strategy: "quota-share",
    config: { maxRetries: 0, retryDelayMs: 0, stickyRoundRobinLimit: 1 },
    models: [
      // openai FIRST in definition — must be demoted (5h bucket saturated)
      {
        id: "qs-sat-openai",
        kind: "model",
        providerId: "openai",
        model: "gpt-4o-mini",
        connectionId: openaiConn.id,
      },
      // gemini SECOND — must win (no saturation recorded → eligible)
      {
        id: "qs-sat-gemini",
        kind: "model",
        providerId: "gemini",
        model: "gemini-2.5-flash",
        connectionId: geminiConn.id,
      },
    ],
  });
  h.installRecordingFetch();

  const r = await handleChat(buildRequest({ body: body("m-qs-sat") }));
  assert.equal(r.status, 200, "request must succeed via clean gemini target");

  const first = h.providersSeen()[0];
  assert.equal(
    first,
    "gemini",
    `saturation deprioritization: openai 5h bucket is at 100 % (saturated), so ` +
      `filterEligibleBySaturation must demote it and dispatch gemini first despite it ` +
      `being second in the combo definition. Got: ${first}`
  );
});
