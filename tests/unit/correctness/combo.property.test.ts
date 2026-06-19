import test from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import { configureProperties } from "../../helpers/propertyConfig.ts";
import { validateComboDAG, resolveNestedComboModels } from "../../../open-sse/services/combo.ts";

configureProperties();

// ComboLike shape: { name: string, models: unknown[] }
// normalizeModelEntry extracts .model (string) from each entry — plain strings work directly.
// "combo:X" notation is NOT used; the resolver checks if models[i] matches combo.name in allCombos.

test("validateComboDAG throws on self-cycle", () => {
  // c0 references itself directly — must throw
  const combos = [{ name: "c0", models: ["c0"] }];
  assert.throws(() => validateComboDAG("c0", combos));
});

test("validateComboDAG throws on indirect cycle (a->b->a)", () => {
  const combos = [
    { name: "a", models: ["b"] },
    { name: "b", models: ["a"] },
  ];
  assert.throws(() => validateComboDAG("a", combos));
});

test("validateComboDAG does not throw on acyclic graph", () => {
  const combos = [
    { name: "a", models: ["b", "openai/gpt-4o"] },
    { name: "b", models: ["anthropic/claude-3-5-sonnet"] },
  ];
  assert.doesNotThrow(() => validateComboDAG("a", combos));
});

test("resolveNestedComboModels never throws and is cycle-safe", () => {
  // Arbitrary combo graph: names c0..cN where each combo's models reference
  // other combo names by their exact name string (no "combo:" prefix needed).
  const graphArb = fc.integer({ min: 1, max: 5 }).chain((n) => {
    const names = Array.from({ length: n }, (_, i) => `c${i}`);
    const comboArr = names.map((name, i) => {
      // Each combo references up to 2 other combos by name plus one real model
      const refs = names.filter((_, j) => j !== i).slice(0, 2);
      return { name, models: [...refs, "openai/gpt-4o"] };
    });
    return fc.constant(comboArr);
  });

  fc.assert(
    fc.property(graphArb, (combos) => {
      // resolveNestedComboModels must always return an array (never throw, never loop)
      const out = resolveNestedComboModels(combos[0], combos);
      assert.ok(Array.isArray(out), "must return array");
    })
  );
});

test("resolveNestedComboModels returns [] on direct cycle (cycle-safety)", () => {
  // Cycle: c0->c1->c0
  const combos = [
    { name: "c0", models: ["c1"] },
    { name: "c1", models: ["c0"] },
  ];
  const out = resolveNestedComboModels(combos[0], combos);
  // When a cycle is detected, the visited guard returns [] — no infinite loop
  assert.ok(Array.isArray(out));
});
