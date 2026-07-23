import test from "node:test";
import assert from "node:assert/strict";

// ── estimateSizeFast (truncateForLog dependency) ───────────────────────

test("estimateSizeFast estimates small objects correctly", async () => {
  const { estimateSizeFast } = await import("../../open-sse/utils/estimateSize.ts");
  const small = { model: "gpt-4", messages: [{ role: "user", content: "hello" }] };
  const size = estimateSizeFast(small);
  assert.ok(size > 0, "Size should be positive");
  assert.ok(size < 1024, `Small object should be < 1KB, got ${size}`);
});

test("estimateSizeFast estimates large objects correctly", async () => {
  const { estimateSizeFast } = await import("../../open-sse/utils/estimateSize.ts");
  const largeContent = "x".repeat(100 * 1024);
  const large = { model: "gpt-4", messages: [{ role: "user", content: largeContent }] };
  const size = estimateSizeFast(large);
  assert.ok(size > 100 * 1024, `Large object should be > 100KB, got ${size}`);
});

test("estimateSizeFast handles null and primitives", async () => {
  const { estimateSizeFast } = await import("../../open-sse/utils/estimateSize.ts");
  assert.equal(estimateSizeFast(null), 0);
  assert.equal(estimateSizeFast(undefined), 0);
  assert.equal(estimateSizeFast("hello"), 5);
  assert.equal(estimateSizeFast(42), 8);
  assert.equal(estimateSizeFast(true), 4);
});

test("estimateSizeFast handles circular references", async () => {
  const { estimateSizeFast } = await import("../../open-sse/utils/estimateSize.ts");
  const obj: Record<string, unknown> = { a: 1 };
  obj.self = obj;
  const size = estimateSizeFast(obj);
  assert.ok(size > 0, "Should handle circular refs");
  assert.ok(size < 1000, `Simple circular ref should be small, got ${size}`);
});

// ── HEAP_PRESSURE_THRESHOLD_MB auto-calibration ────────────────────────
// Regression: the old fixed 200MB default sat below the app's ~260MB working set,
// so the chatCore heap guard 503'd every request ("resource pressure" outage).
// The live constant must now auto-calibrate from the real V8 heap ceiling.

test("HEAP_PRESSURE_THRESHOLD_MB auto-calibrates from the live V8 heap ceiling (no fixed 200)", async () => {
  const { getHeapStatistics } = await import("node:v8");
  const { HEAP_PRESSURE_THRESHOLD_MB, computeHeapPressureThresholdMb } = await import(
    "../../open-sse/utils/heapPressure.ts"
  );
  const limitMb = getHeapStatistics().heap_size_limit / (1024 * 1024);
  // The live constant must equal the pure helper applied to this process's
  // actual ceiling — no drift between the resolved value and the formula.
  assert.equal(
    HEAP_PRESSURE_THRESHOLD_MB,
    computeHeapPressureThresholdMb(limitMb, process.env.HEAP_PRESSURE_THRESHOLD_MB)
  );
  // With no operator override it must clear the ~260MB baseline, otherwise the
  // guard would reject every request at idle (the bug we are fixing).
  if (!process.env.HEAP_PRESSURE_THRESHOLD_MB) {
    assert.ok(
      HEAP_PRESSURE_THRESHOLD_MB >= 400,
      `live threshold ${HEAP_PRESSURE_THRESHOLD_MB}MB must clear the ~260MB app baseline`
    );
  }
});

// ── estimateSizeFast vs MAX_LOG_BODY_CHARS threshold ───────────────────
// This validates the logic that truncateForLog uses: if estimateSizeFast
// returns <= 8KB, the object is kept as-is; otherwise it's summarized.

test("estimateSizeFast distinguishes small vs large for 8KB threshold", async () => {
  const { estimateSizeFast } = await import("../../open-sse/utils/estimateSize.ts");
  const MAX_LOG_BODY_CHARS = 8 * 1024;

  // Small: 50 messages with short content
  const small = {
    model: "gpt-4",
    messages: Array.from({ length: 50 }, (_, i) => ({
      role: "user",
      content: `message ${i}`,
    })),
  };
  assert.ok(
    estimateSizeFast(small) <= MAX_LOG_BODY_CHARS,
    `Small payload (${estimateSizeFast(small)}B) should be <= ${MAX_LOG_BODY_CHARS}`
  );

  // Large: 500 messages with long content
  const large = {
    model: "gpt-4",
    messages: Array.from({ length: 500 }, (_, i) => ({
      role: "user",
      content: `x`.repeat(500),
    })),
  };
  assert.ok(
    estimateSizeFast(large) > MAX_LOG_BODY_CHARS,
    `Large payload (${estimateSizeFast(large)}B) should be > ${MAX_LOG_BODY_CHARS}`
  );
});
