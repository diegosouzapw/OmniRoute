// Auto-derived ingest byte budget (#503-fanout): the byte budget that replaces
// the legacy request-count admission cap must scale itself from the host's
// real memory ceiling instead of a fixed number, on both bare-metal (V8 heap
// limit only) and containerized (cgroup-constrained) hosts.
import test from "node:test";
import assert from "node:assert/strict";
import {
  computeIngestByteBudget,
  MIN_INGEST_BUDGET_BYTES,
  MAX_INGEST_BUDGET_BYTES,
  INGEST_HEAP_FRACTION,
  INGEST_AMPLIFICATION,
} from "../../src/shared/middleware/admissionBudget.ts";

const GiB = 1024 * 1024 * 1024;
const MiB = 1024 * 1024;

test("desktop host (no cgroup limit): budget derives from the V8 heap ceiling", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 4 * GiB,
    constrainedMemoryBytes: null,
  });
  assert.equal(budget.source, "v8_heap");
  assert.equal(budget.effectiveCeilingBytes, 4 * GiB);
  const expected = Math.floor((4 * GiB * INGEST_HEAP_FRACTION) / INGEST_AMPLIFICATION);
  assert.equal(budget.bytes, expected);
  assert.ok(budget.bytes > 32 * MiB, "a 4 GiB heap must yield a generous budget, not the floor");
});

test("container host: a tighter cgroup limit wins over a larger V8 heap ceiling", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 4 * GiB, // Node's default heap sizing can exceed the container's real limit
    constrainedMemoryBytes: 512 * MiB,
  });
  assert.equal(budget.source, "cgroup");
  assert.equal(budget.effectiveCeilingBytes, 512 * MiB);
  assert.equal(budget.bytes, Math.floor((512 * MiB * INGEST_HEAP_FRACTION) / INGEST_AMPLIFICATION));
});

test("a looser cgroup limit than the V8 heap ceiling does not widen the budget", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 1 * GiB,
    constrainedMemoryBytes: 16 * GiB,
  });
  assert.equal(budget.source, "v8_heap");
  assert.equal(budget.effectiveCeilingBytes, 1 * GiB);
});

test("tiny container: the budget clamps to the floor instead of rejecting at idle", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 256 * MiB,
    constrainedMemoryBytes: 256 * MiB,
  });
  assert.equal(budget.bytes, MIN_INGEST_BUDGET_BYTES);
});

test("an enormous ceiling clamps to the max, never grows unbounded", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 1024 * GiB,
    constrainedMemoryBytes: null,
  });
  assert.equal(budget.bytes, MAX_INGEST_BUDGET_BYTES);
});

test("a positive override always wins over both heap and cgroup signals", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 4 * GiB,
    constrainedMemoryBytes: 512 * MiB,
    override: 64 * MiB,
  });
  assert.equal(budget.source, "override");
  assert.equal(budget.bytes, 64 * MiB);
  assert.equal(budget.effectiveCeilingBytes, 64 * MiB);
});

test("a string override (env var shape) parses the same as a number", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 4 * GiB,
    override: "134217728", // 128 MiB
  });
  assert.equal(budget.source, "override");
  assert.equal(budget.bytes, 128 * MiB);
});

test("an override below the safe range clamps to the minimum", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 4 * GiB,
    override: 1024,
  });
  assert.equal(budget.source, "override");
  assert.equal(budget.bytes, MIN_INGEST_BUDGET_BYTES);
  assert.equal(budget.effectiveCeilingBytes, MIN_INGEST_BUDGET_BYTES);
});

test("an override above the safe range clamps to the maximum", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: 4 * GiB,
    override: 4 * GiB,
  });
  assert.equal(budget.source, "override");
  assert.equal(budget.bytes, MAX_INGEST_BUDGET_BYTES);
  assert.equal(budget.effectiveCeilingBytes, MAX_INGEST_BUDGET_BYTES);
});

test("invalid overrides (NaN, zero, negative, empty) fall through to auto-derivation", () => {
  for (const bad of ["not-a-number", "0", "-5", "", null, undefined, NaN, 0, -1]) {
    const budget = computeIngestByteBudget({
      heapSizeLimitBytes: 4 * GiB,
      constrainedMemoryBytes: null,
      override: bad as never,
    });
    assert.equal(budget.source, "v8_heap", `override ${JSON.stringify(bad)} must not be honored`);
  }
});

test("a non-finite heap limit input falls back to the floor input rather than throwing", () => {
  const budget = computeIngestByteBudget({
    heapSizeLimitBytes: NaN,
    constrainedMemoryBytes: null,
  });
  assert.ok(Number.isFinite(budget.bytes));
  assert.equal(budget.bytes, MIN_INGEST_BUDGET_BYTES);
});
