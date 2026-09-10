/**
 * #12267 — API-key allowedCombos must not silently drop entries the Allowed
 * Combos picker cannot render.
 *
 * `matchesComboAccessRule()` (src/shared/utils/apiKeyPolicy.ts) accepts
 * routing-rule names such as `rt-*` as valid `allowedCombos` entries through its
 * `rule === requestedModel` branch, but the API Manager picker only renders
 * `GET /api/combos` entities (`cb-*`). The helper under test is what the picker
 * uses to keep those entries alive across the "All" toggle and to surface them
 * read-only, so the header count and the list agree.
 *
 * Rules:
 *   R1 Entries that name no loaded Combo entity are reported, in stored order.
 *   R2 Entries that name a loaded Combo entity are not reported (the list renders them).
 *   R3 The `combo/*` wildcard is never reported — it is the "All" mode marker, not a rule.
 *   R4 A key restricted only to rule-layer names keeps every entry.
 *   R5 Nothing is reported when the selection is empty or every entry is renderable.
 *   R6 The management PATCH schema keeps rule-layer names verbatim (no server-side drop).
 */

import test from "node:test";
import assert from "node:assert/strict";

const pageUtils =
  await import("../../src/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");
const { ALL_COMBOS_ACCESS_RULE } = await import("../../src/shared/constants/comboAccess.ts");

const LOADED_COMBOS = [
  { id: "1", name: "cb-gpt-5.6-sol" },
  { id: "2", name: "cb-claude-opus-5" },
];

test("R1/R2: rule-layer entries are reported in stored order, Combo entities are not", () => {
  const stored = ["rt-gpt-5.6-sol", "cb-gpt-5.6-sol", "rt-claude-opus-5"];
  assert.deepEqual(pageUtils.listUnrenderableComboAccessRules(stored, LOADED_COMBOS), [
    "rt-gpt-5.6-sol",
    "rt-claude-opus-5",
  ]);
});

test("R3: the combo/* wildcard is never reported as an unrenderable rule", () => {
  assert.deepEqual(
    pageUtils.listUnrenderableComboAccessRules(
      [ALL_COMBOS_ACCESS_RULE, "rt-gpt-5.6-sol"],
      LOADED_COMBOS
    ),
    ["rt-gpt-5.6-sol"]
  );
});

test("R4: a key restricted only to rule-layer names keeps every entry", () => {
  const stored = ["rt-gpt-5.6-sol", "rt-claude-opus-5"];
  assert.deepEqual(pageUtils.listUnrenderableComboAccessRules(stored, LOADED_COMBOS), stored);
  // No combos loaded at all: still nothing is lost.
  assert.deepEqual(pageUtils.listUnrenderableComboAccessRules(stored, []), stored);
});

test("R5: nothing is reported for an empty or fully renderable selection", () => {
  assert.deepEqual(pageUtils.listUnrenderableComboAccessRules([], LOADED_COMBOS), []);
  assert.deepEqual(
    pageUtils.listUnrenderableComboAccessRules(
      ["cb-gpt-5.6-sol", "cb-claude-opus-5"],
      LOADED_COMBOS
    ),
    []
  );
});

test("R6: PATCH schema keeps rule-layer names verbatim", () => {
  const parsed = schemas.updateKeyPermissionsSchema.safeParse({
    modelAccessMode: "restricted",
    allowedCombos: ["rt-gpt-5.6-sol", "rt-claude-opus-5"],
  });
  assert.equal(parsed.success, true);
  if (!parsed.success) return;
  assert.deepEqual(parsed.data.allowedCombos, ["rt-gpt-5.6-sol", "rt-claude-opus-5"]);
});
