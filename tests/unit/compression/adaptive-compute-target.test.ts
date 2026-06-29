import { test } from "node:test";
import assert from "node:assert/strict";
import { computeTarget } from "@omniroute/open-sse/services/compression/adaptiveCompression/computeTarget.ts";
import { DEFAULT_CONTEXT_BUDGET } from "@omniroute/open-sse/services/compression/adaptiveCompression/types.ts";

const base = { ...DEFAULT_CONTEXT_BUDGET, outputReserve: 4096, safetyMargin: 1024 };

test("reserve-output: request.max_tokens wins over outputReserve default", () => {
  // 200000 − 8000 (request max_tokens) − 1024 (safetyMargin) = 190976
  const t = computeTarget("reserve-output", 200000, 8000, base);
  assert.equal(t, 190976);
});

test("reserve-output: falls back to outputReserve when no max_tokens", () => {
  // 200000 − 4096 (outputReserve) − 1024 (safetyMargin) = 194880
  assert.equal(computeTarget("reserve-output", 200000, null, base), 194880);
  assert.equal(computeTarget("reserve-output", 200000, 0, base), 194880); // 0 is not a positive reserve
});

test("percentage policy: limit × pct, floored", () => {
  assert.equal(computeTarget("percentage", 200000, null, { ...base, pct: 0.7 }), 140000);
  // invalid pct (out of (0,1]) → treated as 1.0 (no shrink)
  assert.equal(computeTarget("percentage", 200000, null, { ...base, pct: 0 }), 200000);
  assert.equal(computeTarget("percentage", 200000, null, { ...base, pct: 1.5 }), 200000);
});

test("absolute policy: model-independent budget", () => {
  assert.equal(computeTarget("absolute", 200000, 8000, { ...base, absoluteBudget: 50000 }), 50000);
  assert.equal(computeTarget("absolute", 8000, null, { ...base, absoluteBudget: 50000 }), 50000);
});
