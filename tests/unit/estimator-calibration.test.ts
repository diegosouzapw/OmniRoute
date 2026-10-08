// #14931 — estimator calibration unit tests. The chars/4 estimate is scaled by
// a learned actual/estimated EMA per (provider, model) × tools bucket, fed by
// provider-reported usage.prompt_tokens. Cold start must be exactly factor
// 1.0 (byte-identical legacy behavior), the factor is clamped, wild ratios are
// rejected, and tool-loop aggregates are skipped.
import test from "node:test";
import assert from "node:assert/strict";

const {
  applyEstimatorCalibration,
  getEstimatorCalibrationFactor,
  getEstimatorCalibrationBucketForTests,
  recordEstimatorCalibrationFromUsage,
  resetEstimatorCalibrationForTests,
} = await import("../../open-sse/services/estimatorCalibration.ts");

const PROVIDER = "cal-test-prov";
const MODEL = "cal-test-model";
const ORIGINAL_ENV = process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;

function record(estimated: number, actual: number, toolsPresent = true, extra = {}) {
  recordEstimatorCalibrationFromUsage({
    provider: PROVIDER,
    model: MODEL,
    estimatedTokens: estimated,
    usage: { prompt_tokens: actual, completion_tokens: 1 },
    toolsPresent,
    ...extra,
  });
}

test.before(() => {
  delete process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
});

test.after(() => {
  if (ORIGINAL_ENV === undefined) {
    delete process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
  } else {
    process.env.OMNIROUTE_ESTIMATOR_CALIBRATION = ORIGINAL_ENV;
  }
});

test("cold start: factor is 1.0 and apply is identity before MIN_SAMPLES", () => {
  resetEstimatorCalibrationForTests();
  assert.equal(getEstimatorCalibrationFactor(PROVIDER, MODEL, true), 1);
  record(100_000, 20_000); // one observation, ratio 0.2
  assert.equal(getEstimatorCalibrationFactor(PROVIDER, MODEL, true), 1, "1 sample must not apply");
  assert.equal(applyEstimatorCalibration(PROVIDER, MODEL, 250_000, true), 250_000);
  record(100_000, 20_000); // second
  assert.equal(getEstimatorCalibrationFactor(PROVIDER, MODEL, true), 1, "2 samples must not apply");
});

test("three trusted observations activate the learned factor", () => {
  resetEstimatorCalibrationForTests();
  for (let i = 0; i < 3; i++) record(100_000, 20_000);
  const factor = getEstimatorCalibrationFactor(PROVIDER, MODEL, true);
  assert.ok(Math.abs(factor - 0.2) < 0.02, `factor should converge to ~0.2, got ${factor}`);
  const scaled = applyEstimatorCalibration(PROVIDER, MODEL, 250_000, true);
  assert.ok(Math.abs(scaled - 50_000) < 5_000, `250k should scale to ~50k, got ${scaled}`);
});

test("tools-present and tools-absent buckets are independent", () => {
  resetEstimatorCalibrationForTests();
  for (let i = 0; i < 3; i++) record(100_000, 20_000, true);
  assert.equal(
    getEstimatorCalibrationFactor(PROVIDER, MODEL, false),
    1,
    "chat-shaped bucket must stay untouched by tools-shaped observations"
  );
  // A different model on the same provider is also independent.
  assert.equal(getEstimatorCalibrationFactor(PROVIDER, "other-model", true), 1);
});

test("factor is clamped to [0.15, 2.0]", () => {
  resetEstimatorCalibrationForTests();
  for (let i = 0; i < 5; i++) record(100_000, 1_000); // ratio 0.01 → clamped input
  let factor = getEstimatorCalibrationFactor(PROVIDER, MODEL, true);
  assert.ok(factor >= 0.15, `floor not respected: ${factor}`);

  resetEstimatorCalibrationForTests();
  for (let i = 0; i < 5; i++) record(10_000, 500_000); // ratio 50 → clamped input
  factor = getEstimatorCalibrationFactor(PROVIDER, MODEL, true);
  assert.ok(factor <= 2.0, `ceiling not respected: ${factor}`);
});

test("wild ratios and tiny estimates are rejected as observations", () => {
  resetEstimatorCalibrationForTests();
  record(100_000, 100); // ratio 0.001 < 0.05 → rejected
  record(100_000, 5_000_000); // ratio 50 > 20 → rejected
  record(500, 250); // estimate below MIN_ESTIMATE_FOR_OBSERVATION → rejected
  recordEstimatorCalibrationFromUsage({
    provider: PROVIDER,
    model: MODEL,
    estimatedTokens: 100_000,
    usage: {}, // no token count → rejected
    toolsPresent: true,
  });
  assert.equal(getEstimatorCalibrationBucketForTests(PROVIDER, MODEL, true), undefined);
});

test("EMA absorbs an outlier without jumping", () => {
  resetEstimatorCalibrationForTests();
  for (let i = 0; i < 3; i++) record(100_000, 20_000); // factor ≈ 0.2
  record(100_000, 150_000); // sudden ratio 1.5 (shape change)
  const factor = getEstimatorCalibrationFactor(PROVIDER, MODEL, true);
  assert.ok(factor > 0.2 && factor < 0.6, `EMA should move partially toward 1.5, got ${factor}`);
});

test("aggregated tool-loop usage is skipped", () => {
  resetEstimatorCalibrationForTests();
  for (let i = 0; i < 3; i++) {
    record(100_000, 40_000, true, { aggregatedUsage: true });
  }
  assert.equal(getEstimatorCalibrationBucketForTests(PROVIDER, MODEL, true), undefined);
});

test("Claude-native input_tokens is accepted as the actual count", () => {
  resetEstimatorCalibrationForTests();
  for (let i = 0; i < 3; i++) {
    recordEstimatorCalibrationFromUsage({
      provider: PROVIDER,
      model: MODEL,
      estimatedTokens: 100_000,
      usage: { input_tokens: 20_000, output_tokens: 1 },
      toolsPresent: false,
    });
  }
  const factor = getEstimatorCalibrationFactor(PROVIDER, MODEL, false);
  assert.ok(Math.abs(factor - 0.2) < 0.02, `input_tokens not honored, got ${factor}`);
});

test("OMNIROUTE_ESTIMATOR_CALIBRATION=off disables recording and application", () => {
  resetEstimatorCalibrationForTests();
  process.env.OMNIROUTE_ESTIMATOR_CALIBRATION = "off";
  try {
    for (let i = 0; i < 5; i++) record(100_000, 20_000);
    assert.equal(getEstimatorCalibrationBucketForTests(PROVIDER, MODEL, true), undefined);
    assert.equal(applyEstimatorCalibration(PROVIDER, MODEL, 250_000, true), 250_000);
  } finally {
    delete process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
  }
});

test("non-positive / non-finite estimates pass through apply untouched", () => {
  resetEstimatorCalibrationForTests();
  assert.equal(applyEstimatorCalibration(PROVIDER, MODEL, 0, true), 0);
  assert.ok(Number.isNaN(applyEstimatorCalibration(PROVIDER, MODEL, Number.NaN, true)));
});
