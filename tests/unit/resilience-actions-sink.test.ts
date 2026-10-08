import test from "node:test";
import assert from "node:assert/strict";

// resilience sink: parseResilienceActions fail-soft allowlist (pure, no DB).

const { parseResilienceActions } = await import("../../src/lib/usage/callLogs.ts");

test("1. valid compact JSON survives with closed keys", () => {
  assert.deepEqual(
    parseResilienceActions(
      JSON.stringify({ rotations: 2, park_ms: 40000, parked: true, stored_429: true })
    ),
    { rotations: 2, park_ms: 40000, parked: true, stored_429: true }
  );
});

test("2. corrupt JSON returns null, never throws", () => {
  assert.equal(parseResilienceActions("{nope"), null);
  assert.equal(parseResilienceActions(""), null);
  assert.equal(parseResilienceActions(null), null);
  assert.equal(parseResilienceActions(undefined), null);
  assert.equal(parseResilienceActions(42), null);
});

test("3. unknown keys are dropped; empty-after-clean returns null", () => {
  assert.equal(parseResilienceActions(JSON.stringify({ frobnicate: 1 })), null);
  assert.deepEqual(parseResilienceActions(JSON.stringify({ rotations: 1, frobnicate: 1 })), {
    rotations: 1,
  });
});

test("4. wrong types rejected: buffered closed enum, negatives dropped", () => {
  assert.equal(parseResilienceActions(JSON.stringify({ buffered: "bogus" })), null);
  assert.deepEqual(parseResilienceActions(JSON.stringify({ buffered: "retry" })), {
    buffered: "retry",
  });
  assert.equal(parseResilienceActions(JSON.stringify({ rotations: -1 })), null);
  assert.deepEqual(parseResilienceActions(JSON.stringify({ rotations: 1.9, continued: 0 })), {
    rotations: 1,
  });
});

test("5. stored_429 survives regardless of status (flag alone decides)", () => {
  // The sink stores the flag verbatim; status semantics never change here.
  assert.deepEqual(parseResilienceActions(JSON.stringify({ stored_429: true })), {
    stored_429: true,
  });
});
