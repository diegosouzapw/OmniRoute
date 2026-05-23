/**
 * Regression tests for `isUsableCombo` (release/v3.8.2 code review, finding C1).
 *
 * The combo member refs returned by `/api/combos` do NOT carry a separate
 * `providerId` field — OmniRoute's `normalizeComboRecord` folds the provider
 * id INTO the full model string (e.g. "cc/claude-opus-4-7"). The previous
 * implementation read `step.providerId` (always `undefined`), so the
 * `usableOnly` combo filter silently never dropped anything. These tests pin
 * the corrected behavior: the verdict is derived from the `step.model` prefix,
 * mirroring `isUsableRawModelId`'s subtract-filter semantics.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { isUsableCombo, type OmniRouteRawCombo } from "../src/index.js";

/** Build a `usable` set bundle for the tests. */
function buildUsable(opts: { aliases?: string[]; canonicals?: string[]; known?: string[] }): {
  aliases: Set<string>;
  canonicals: Set<string>;
  knownAliases: Set<string>;
} {
  return {
    aliases: new Set(opts.aliases ?? []),
    canonicals: new Set(opts.canonicals ?? []),
    // knownAliases is the union of every prefix the universe is aware of —
    // usable or not. Default to including the usable aliases too.
    knownAliases: new Set([...(opts.known ?? []), ...(opts.aliases ?? [])]),
  };
}

function combo(models: OmniRouteRawCombo["models"]): OmniRouteRawCombo {
  return { id: "c1", name: "Test Combo", models };
}

test("isUsableCombo: member with a usable alias prefix → keep", () => {
  const usable = buildUsable({ aliases: ["cc"], known: ["cc", "dead"] });
  const c = combo([{ kind: "model", model: "cc/claude-opus-4-7" }]);
  assert.equal(isUsableCombo(c, usable), true);
});

test("isUsableCombo: all members known-but-NOT-usable → drop (the C1 regression)", () => {
  // Before the fix this returned true unconditionally because step.providerId
  // was always undefined. Now the known-but-unusable "dead" prefix is dropped.
  const usable = buildUsable({ aliases: ["cc"], known: ["cc", "dead"] });
  const c = combo([
    { kind: "model", model: "dead/legacy-model" },
    { kind: "model", model: "dead/another" },
  ]);
  assert.equal(isUsableCombo(c, usable), false);
});

test("isUsableCombo: unknown prefix → keep (cannot prove unroutable)", () => {
  const usable = buildUsable({ aliases: ["cc"], known: ["cc", "dead"] });
  const c = combo([{ kind: "model", model: "agentrouter/mystery" }]);
  assert.equal(isUsableCombo(c, usable), true);
});

test("isUsableCombo: mixed non-usable + usable member → keep", () => {
  const usable = buildUsable({ aliases: ["cc"], known: ["cc", "dead"] });
  const c = combo([
    { kind: "model", model: "dead/legacy" },
    { kind: "model", model: "cc/claude-opus-4-7" },
  ]);
  assert.equal(isUsableCombo(c, usable), true);
});

test("isUsableCombo: zero members → keep", () => {
  const usable = buildUsable({ aliases: ["cc"], known: ["cc"] });
  assert.equal(isUsableCombo(combo([]), usable), true);
  assert.equal(isUsableCombo(combo(undefined), usable), true);
});

test("isUsableCombo: only combo-ref steps (no resolvable model) → keep", () => {
  const usable = buildUsable({ aliases: ["cc"], known: ["cc", "dead"] });
  const c = combo([{ kind: "combo-ref", comboName: "nested" }]);
  assert.equal(isUsableCombo(c, usable), true);
});

test("isUsableCombo: usable canonical prefix → keep", () => {
  const usable = buildUsable({ canonicals: ["anthropic"], known: ["anthropic", "dead"] });
  const c = combo([{ kind: "model", model: "anthropic/claude-opus-4-7" }]);
  assert.equal(isUsableCombo(c, usable), true);
});
