import test from "node:test";
import assert from "node:assert/strict";
import {
  QUANTUM_PATTERNS,
  TAIL_DELIM,
  placeholderFor,
} from "../../../open-sse/services/compression/quantumLock/quantumPatterns.ts";

test("placeholderFor is positional and value-independent", () => {
  assert.equal(placeholderFor(0), "⟦Q0⟧");
  assert.equal(placeholderFor(7), "⟦Q7⟧");
});

test("TAIL_DELIM is the documented sentinel", () => {
  assert.equal(TAIL_DELIM, "⟦QUANTUMLOCK⟧");
});

test("every pattern is global and the order is fixed (jwt before long_hex)", () => {
  const order = QUANTUM_PATTERNS.map((p) => p.category);
  assert.ok(order.indexOf("jwt") < order.indexOf("long_hex"));
  assert.ok(order.indexOf("api_key_shape") < order.indexOf("uuid"));
  assert.ok(order.lastIndexOf("unix_ts") === order.length - 1, "unix_ts runs last");
  for (const { pattern } of QUANTUM_PATTERNS) assert.ok(pattern.flags.includes("g"));
});

test("patterns are ReDoS-bounded: adversarial input returns promptly", () => {
  const evil = "a".repeat(50_000) + "!".repeat(50_000);
  const start = Date.now();
  for (const { pattern } of QUANTUM_PATTERNS) {
    pattern.lastIndex = 0;
    pattern.test(evil);
  }
  assert.ok(Date.now() - start < 500, "all patterns finish quickly on adversarial input");
});
