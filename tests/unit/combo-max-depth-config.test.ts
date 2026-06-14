/**
 * tests/unit/combo-max-depth-config.test.ts
 *
 * Regression: `config.maxComboDepth` (DEFAULT_COMBO_CONFIG) had ZERO readers —
 * nesting depth was always the hardcoded `MAX_COMBO_DEPTH = 3`, so the operator
 * knob did nothing. This wires a clamped, per-resolution `maxDepth` through the
 * combo depth functions (default preserved, hard-capped for safety).
 */
import test from "node:test";
import assert from "node:assert/strict";

// 5-combo chain L0→L1→L2→L3→L4→model — L4 sits at recursion depth 4.
function buildDeepChain() {
  return [
    { name: "L0", models: ["L1"] },
    { name: "L1", models: ["L2"] },
    { name: "L2", models: ["L3"] },
    { name: "L3", models: ["L4"] },
    { name: "L4", models: ["openai/gpt-4"] },
  ];
}

test("clampComboDepth — clamps to [1, hard cap]; invalid → default 3", async () => {
  const { clampComboDepth } = await import("../../open-sse/services/combo.ts");
  assert.equal(clampComboDepth(1), 1);
  assert.equal(clampComboDepth(2), 2);
  assert.equal(clampComboDepth(5), 5);
  assert.equal(clampComboDepth(100), 10, "hard cap at 10");
  assert.equal(clampComboDepth(0), 3, "0 invalid → default 3");
  assert.equal(clampComboDepth(-4), 3, "negative → default 3");
  assert.equal(clampComboDepth(undefined), 3, "undefined → default 3");
  assert.equal(clampComboDepth("abc"), 3, "non-numeric → default 3");
  assert.equal(clampComboDepth(2.9), 2, "floors to 2");
});

test("validateComboDAG — default depth (3) still throws on a 4-deep chain", async () => {
  const { validateComboDAG } = await import("../../open-sse/services/combo.ts");
  assert.throws(() => validateComboDAG("L0", buildDeepChain()), /nesting depth/);
});

test("validateComboDAG — honors a HIGHER configured maxDepth (was hardcoded 3)", async () => {
  const { validateComboDAG } = await import("../../open-sse/services/combo.ts");
  // maxDepth 5 → the 4-deep chain validates without throwing.
  assert.doesNotThrow(() => validateComboDAG("L0", buildDeepChain(), new Set(), 0, 5));
});

test("validateComboDAG — honors a LOWER configured maxDepth", async () => {
  const { validateComboDAG } = await import("../../open-sse/services/combo.ts");
  const shallow = [
    { name: "A", models: ["B"] },
    { name: "B", models: ["C"] },
    { name: "C", models: ["openai/gpt-4"] },
  ];
  // A→B→C (C at depth 2): default (3) allows it…
  assert.doesNotThrow(() => validateComboDAG("A", shallow));
  // …but maxDepth 1 rejects it.
  assert.throws(() => validateComboDAG("A", shallow, new Set(), 0, 1), /nesting depth/);
});
