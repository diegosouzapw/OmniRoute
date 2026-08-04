/**
 * #6328 (export/backup boundary) — when `hidePaidModels` is on, the settings
 * JSON export must strip paid combo model steps so a round-trip (export →
 * import) does not silently re-materialise the paid targets the operator asked
 * to REMOVE. `filterPaidComboSteps` is the pure filter wired into the export
 * route; `combo-ref` steps and pricing-less combos are left untouched.
 * Rule #18 regression guard.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { filterPaidComboSteps } from "../../src/app/api/settings/export-json/route.ts";

test("#6328 export filter drops paid model steps but keeps combo-ref steps", () => {
  // `openai` has no curated free roster, so `openai/gpt-4o` is paid-tier.
  const combos = [
    {
      id: "c1",
      models: [
        { kind: "combo-ref", ref: "other-combo" },
        { model: "openai/gpt-4o" },
      ],
    },
  ];
  const [out] = filterPaidComboSteps(combos);
  const kinds = out.models.map((m) => (m as { kind?: string; model?: string }).kind ?? (m as { model?: string }).model);
  assert.deepEqual(kinds, ["combo-ref"], "paid model dropped, combo-ref kept");
});

test("#6328 export filter leaves a combo without a models array untouched", () => {
  const combos = [{ id: "c2", name: "no-models" }];
  const out = filterPaidComboSteps(combos);
  assert.deepEqual(out, combos);
});
