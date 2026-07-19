/**
 * tests/unit/combo-speed-telemetry-6875.test.ts
 *
 * Missing coverage for #6875 (TTFT/E2E-latency/tokens-per-second surfaced onto
 * auto-combo candidates):
 *
 *  1. deriveSpeedTelemetry() (open-sse/services/combo/autoStrategy.ts) — the pure
 *     projection from a HistoricalLatencyStatsEntry onto the
 *     avgTtftMs/avgE2ELatencyMs/avgTokensPerSecond candidate fields, including the
 *     `positive()` guard that rejects 0/NaN/negative/undefined so a bad sample never
 *     overrides the speed-ranking factor's own pool-median fallback.
 *  2. buildAutoCandidates() (open-sse/services/combo.ts) — proves the
 *     `...speedTelemetry` spread at combo.ts:571 is real: seeds real
 *     usage_history rows through saveRequestUsage() (the same path
 *     getModelLatencyStats() reads), then asserts the candidate returned by
 *     buildAutoCandidates() actually carries the derived fields end-to-end.
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";

// Hermetic DB: buildAutoCandidates() dynamically imports src/lib/usageDb and
// src/lib/localDb, both of which open the shared SQLite singleton. Point
// DATA_DIR at a throwaway dir before any import that could open the handle
// (CLAUDE.md "Database Handles in Tests").
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-speed-telemetry-6875-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-speed-telemetry-6875-test-secret";

const { deriveSpeedTelemetry } = await import("../../open-sse/services/combo/autoStrategy.ts");
const { buildAutoCandidates } = await import("../../open-sse/services/combo.ts");
const { saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
const core = await import("../../src/lib/db/core.ts");

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// 1. deriveSpeedTelemetry() — pure unit coverage
// ---------------------------------------------------------------------------

test("deriveSpeedTelemetry: positive finite values pass through to the correct keys", () => {
  const result = deriveSpeedTelemetry({
    totalRequests: 42,
    avgTtftMs: 123.4,
    avgE2ELatencyMs: 987.6,
    avgTokensPerSecond: 55.5,
  });
  assert.deepEqual(result, {
    avgTtftMs: 123.4,
    avgE2ELatencyMs: 987.6,
    avgTokensPerSecond: 55.5,
  });
});

test("deriveSpeedTelemetry: null metric returns an all-undefined object (no keys set)", () => {
  const result = deriveSpeedTelemetry(null);
  assert.strictEqual(result.avgTtftMs, undefined);
  assert.strictEqual(result.avgE2ELatencyMs, undefined);
  assert.strictEqual(result.avgTokensPerSecond, undefined);
});

test("deriveSpeedTelemetry: empty-object metric returns an all-undefined object", () => {
  const result = deriveSpeedTelemetry({});
  assert.strictEqual(result.avgTtftMs, undefined);
  assert.strictEqual(result.avgE2ELatencyMs, undefined);
  assert.strictEqual(result.avgTokensPerSecond, undefined);
});

test("deriveSpeedTelemetry: 0 is omitted per-field (not spread as a bad-data 0)", () => {
  const result = deriveSpeedTelemetry({
    avgTtftMs: 0,
    avgE2ELatencyMs: 500,
    avgTokensPerSecond: 0,
  });
  assert.strictEqual(result.avgTtftMs, undefined);
  assert.strictEqual(result.avgE2ELatencyMs, 500);
  assert.strictEqual(result.avgTokensPerSecond, undefined);
});

test("deriveSpeedTelemetry: NaN is omitted per-field", () => {
  const result = deriveSpeedTelemetry({
    avgTtftMs: NaN,
    avgE2ELatencyMs: 200,
    avgTokensPerSecond: NaN,
  });
  assert.strictEqual(result.avgTtftMs, undefined);
  assert.strictEqual(result.avgE2ELatencyMs, 200);
  assert.strictEqual(result.avgTokensPerSecond, undefined);
});

test("deriveSpeedTelemetry: negative values are omitted per-field", () => {
  const result = deriveSpeedTelemetry({
    avgTtftMs: -10,
    avgE2ELatencyMs: 300,
    avgTokensPerSecond: -1,
  });
  assert.strictEqual(result.avgTtftMs, undefined);
  assert.strictEqual(result.avgE2ELatencyMs, 300);
  assert.strictEqual(result.avgTokensPerSecond, undefined);
});

test("deriveSpeedTelemetry: undefined fields are omitted (not coerced to 0/NaN)", () => {
  const result = deriveSpeedTelemetry({
    avgTtftMs: undefined,
    avgE2ELatencyMs: 400,
    avgTokensPerSecond: undefined,
  });
  assert.strictEqual(result.avgTtftMs, undefined);
  assert.strictEqual(result.avgE2ELatencyMs, 400);
  assert.strictEqual(result.avgTokensPerSecond, undefined);
});

test("deriveSpeedTelemetry: non-numeric (string) values are omitted, not coerced", () => {
  const result = deriveSpeedTelemetry({
    // @ts-expect-error deliberately wrong shape to prove the type guard holds at runtime
    avgTtftMs: "150",
    avgE2ELatencyMs: 600,
    avgTokensPerSecond: 20,
  });
  assert.strictEqual(result.avgTtftMs, undefined);
  assert.strictEqual(result.avgE2ELatencyMs, 600);
  assert.strictEqual(result.avgTokensPerSecond, 20);
});

// ---------------------------------------------------------------------------
// 2. buildAutoCandidates() — proves the `...speedTelemetry` spread at
//    combo.ts:571 actually wires deriveSpeedTelemetry()'s output onto the
//    candidate returned to the auto-combo scorer. Real DB rows, real
//    getModelLatencyStats() aggregation, real buildAutoCandidates() call —
//    no mocking of the function under test.
// ---------------------------------------------------------------------------

const PROVIDER = "speedtelemetry-provider-6875";
const MODEL = "speedtelemetry-model-6875";
const MODEL_STR = `${PROVIDER}/${MODEL}`;

function target() {
  return {
    kind: "model" as const,
    stepId: "s1",
    executionKey: `${PROVIDER}>${MODEL_STR}`,
    modelStr: MODEL_STR,
    provider: PROVIDER,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

before(async () => {
  // MIN_HISTORY_SAMPLES (combo.ts) requires >= 10 requests within the 24h window
  // buildAutoCandidates queries before hasHistoricalSignal flips true and
  // deriveSpeedTelemetry() is invoked at all (combo.ts:487-489). Seed 10
  // successful rows with uniform, clean-round-number latency/ttft/tokens so the
  // aggregated avgTtftMs/avgE2ELatencyMs/avgTokensPerSecond are deterministic,
  // positive, finite numbers that must survive the positive() guard.
  const now = Date.now();
  for (let i = 0; i < 10; i++) {
    await saveRequestUsage({
      provider: PROVIDER,
      model: MODEL,
      success: true,
      latencyMs: 2000,
      timeToFirstTokenMs: 150,
      tokens: { output: 100 },
      timestamp: new Date(now - i * 1000).toISOString(),
    });
  }
});

test("buildAutoCandidates: candidate carries avgTtftMs/avgE2ELatencyMs/avgTokensPerSecond from real historical stats (speedTelemetry spread)", async () => {
  const candidates = await buildAutoCandidates(
    [target()],
    "speed-telemetry-test-combo",
    null,
    undefined,
    { quotaPreflight: { enabled: false } } as never
  );

  const candidate = candidates.find((c) => c.modelStr === MODEL_STR);
  assert.ok(candidate, "expected a candidate for the seeded provider/model");

  // Cross-check against the real aggregation this candidate must have been
  // derived from, rather than hardcoding the exact mean (keeps the test tied
  // to getModelLatencyStats()'s actual math instead of duplicating it).
  const { getModelLatencyStats } = await import("../../src/lib/usageDb.ts");
  const stats = await getModelLatencyStats({ windowHours: 24, minSamples: 3, maxRows: 10000 });
  const historicalEntry = stats[MODEL_STR];
  assert.ok(historicalEntry, "expected seeded usage_history rows to aggregate into stats");
  assert.ok(
    (historicalEntry.totalRequests ?? 0) >= 10,
    "expected >= MIN_HISTORY_SAMPLES (10) requests so hasHistoricalSignal is true"
  );

  assert.equal(
    candidate!.avgTtftMs,
    historicalEntry.avgTtftMs,
    "candidate.avgTtftMs must equal deriveSpeedTelemetry(historicalEntry).avgTtftMs"
  );
  assert.equal(
    candidate!.avgE2ELatencyMs,
    historicalEntry.avgE2ELatencyMs,
    "candidate.avgE2ELatencyMs must equal deriveSpeedTelemetry(historicalEntry).avgE2ELatencyMs"
  );
  assert.equal(
    candidate!.avgTokensPerSecond,
    historicalEntry.avgTokensPerSecond,
    "candidate.avgTokensPerSecond must equal deriveSpeedTelemetry(historicalEntry).avgTokensPerSecond"
  );

  // Sanity: the values are genuinely positive numbers (not a stale 0/NaN that
  // slipped past the positive() guard).
  assert.ok(typeof candidate!.avgTtftMs === "number" && candidate!.avgTtftMs > 0);
  assert.ok(typeof candidate!.avgE2ELatencyMs === "number" && candidate!.avgE2ELatencyMs > 0);
  assert.ok(
    typeof candidate!.avgTokensPerSecond === "number" && candidate!.avgTokensPerSecond > 0
  );
});

test("buildAutoCandidates: a provider/model with no historical signal omits the speed-telemetry fields", async () => {
  const freshProvider = "speedtelemetry-provider-6875-nohist";
  const freshModel = "speedtelemetry-model-6875-nohist";
  const freshModelStr = `${freshProvider}/${freshModel}`;

  const candidates = await buildAutoCandidates(
    [
      {
        kind: "model" as const,
        stepId: "s1",
        executionKey: `${freshProvider}>${freshModelStr}`,
        modelStr: freshModelStr,
        provider: freshProvider,
        providerId: null,
        connectionId: null,
        weight: 1,
        label: null,
      },
    ],
    "speed-telemetry-test-combo-nohist",
    null,
    undefined,
    { quotaPreflight: { enabled: false } } as never
  );

  const candidate = candidates.find((c) => c.modelStr === freshModelStr);
  assert.ok(candidate, "expected a candidate for the unseeded provider/model");
  assert.strictEqual(candidate!.avgTtftMs, undefined);
  assert.strictEqual(candidate!.avgE2ELatencyMs, undefined);
  assert.strictEqual(candidate!.avgTokensPerSecond, undefined);
});
