/**
 * Characterization + API-surface test: usageHistory.ts god-file decomposition.
 *
 * The pure, DB-free helpers (coercers + percentile/stdDev stats + the
 * depth-limited preview truncator) were extracted verbatim from
 * src/lib/usage/usageHistory.ts into src/lib/usage/usageHistory/helpers.ts.
 * The in-memory pending-request state machine + DB CRUD stay in the host.
 *
 * Verifies that:
 *   1. The pure helpers behave correctly (stats formulas pinned).
 *   2. The host usageHistory.ts still exposes the FULL public API.
 *   3. The helpers leaf exports its pieces directly.
 *
 * Pure value assertions — no DB handle is opened.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  asRecord,
  toNumber,
  toStringOrNull,
  normalizeServiceTier,
  percentile,
  stdDev,
  truncatePendingPreview,
} from "../../src/lib/usage/usageHistory/helpers.ts";

describe("usageHistory/helpers — coercers", () => {
  it("asRecord keeps plain objects, rejects arrays/primitives", () => {
    const o = { a: 1 };
    assert.equal(asRecord(o), o);
    assert.deepEqual(asRecord([1]), {});
    assert.deepEqual(asRecord(null), {});
  });
  it("toNumber / toStringOrNull coerce by type", () => {
    assert.equal(toNumber("12"), 12);
    assert.equal(toNumber("x"), 0);
    assert.equal(toStringOrNull("hi"), "hi");
    assert.equal(toStringOrNull("  "), null);
  });
});

describe("usageHistory/helpers — normalizeServiceTier", () => {
  it("maps priority/fast → priority, flex → flex, else → standard", () => {
    assert.equal(normalizeServiceTier("priority"), "priority");
    assert.equal(normalizeServiceTier("Fast"), "priority");
    assert.equal(normalizeServiceTier("flex"), "flex");
    assert.equal(normalizeServiceTier("default"), "standard");
    assert.equal(normalizeServiceTier(undefined), "standard");
  });
});

describe("usageHistory/helpers — percentile (round-index on sorted input)", () => {
  const data = [10, 20, 30, 40, 50];
  it("returns 0 for empty, the sole value for length 1", () => {
    assert.equal(percentile([], 0.5), 0);
    assert.equal(percentile([42], 0.9), 42);
  });
  it("picks round((n-1)*p) clamped to [0,1]", () => {
    assert.equal(percentile(data, 0), 10);
    assert.equal(percentile(data, 0.25), 20);
    assert.equal(percentile(data, 0.5), 30);
    assert.equal(percentile(data, 1), 50);
    assert.equal(percentile(data, 5), 50); // p clamped to 1
  });
});

describe("usageHistory/helpers — stdDev (population)", () => {
  it("returns 0 for <=1 value or all-equal", () => {
    assert.equal(stdDev([], 0), 0);
    assert.equal(stdDev([7], 7), 0);
    assert.equal(stdDev([3, 3, 3], 3), 0);
  });
  it("computes sqrt of the population variance", () => {
    assert.equal(stdDev([0, 2], 1), 1); // variance (1+1)/2 = 1
    assert.equal(stdDev([2, 4, 4, 4, 5, 5, 7, 9], 5), 2); // variance 32/8 = 4
  });
});

describe("usageHistory/helpers — truncatePendingPreview", () => {
  it("passes small primitives through", () => {
    assert.equal(truncatePendingPreview(5), 5);
    assert.equal(truncatePendingPreview("ok"), "ok");
  });
  it("shortens an over-long string", () => {
    const out = truncatePendingPreview("x".repeat(5000));
    assert.equal(typeof out, "string");
    assert.ok((out as string).length < 5000, "a 5000-char string must be truncated");
  });
});

// ── host public API surface ──────────────────────────────────────────────────

const host = await import("../../src/lib/usage/usageHistory.ts");

describe("usageHistory.ts public API surface", () => {
  const expected = [
    "appendRequestLog",
    "clearPendingRequests",
    "finalizeMostRecentPendingRequest",
    "finalizePendingRequest",
    "finalizePendingRequestById",
    "getMaxPendingRequestAgeMs",
    "getModelLatencyStats",
    "getPendingById",
    "getPendingRequests",
    "getRecentLogs",
    "getUsageDb",
    "getUsageHistory",
    "saveRequestUsage",
    "sweepStalePendingRequests",
    "trackPendingRequest",
    "updatePendingRequest",
    "updatePendingRequestById",
    "updatePendingRequestStreamChunks",
    "getCompletedDetails", // pre-existing re-export, must survive
  ];
  for (const name of expected) {
    it(`exposes ${name} as a function`, () => {
      assert.equal(typeof host[name], "function", `${name} must be a function on the host`);
    });
  }
  it("loses no public function in the split", () => {
    const missing = expected.filter((n) => typeof host[n] !== "function");
    assert.deepEqual(missing, [], `missing: ${missing.join(", ")}`);
  });
});

describe("helpers.ts exports its pieces directly", () => {
  it("the moved helpers are functions on the leaf", async () => {
    const h = await import("../../src/lib/usage/usageHistory/helpers.ts");
    for (const fn of [
      "asRecord",
      "percentile",
      "stdDev",
      "normalizeServiceTier",
      "truncatePendingPreview",
    ]) {
      assert.equal(typeof h[fn], "function", fn);
    }
  });
});
