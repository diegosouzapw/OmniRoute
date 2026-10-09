// #15059 (point 3): providers whose curated catalog verdict is `tos: "avoid"` (e.g. the
// Antigravity `agy` family) must NOT receive `auto` traffic on a fresh install. The guard
// `excludeTosAvoid` therefore ships ON by default; operators can opt back out explicitly.
import assert from "node:assert/strict";
import { test } from "node:test";
import { filterTosAvoidCandidates } from "../../open-sse/services/autoCombo/strictZeroCostFilter.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";
import { getSettings } from "../../src/lib/db/settings.ts";

const avoidEntry = FREE_MODEL_BUDGETS.find((m) => m.provider === "agy" && m.tos === "avoid");

function poolFor() {
  assert.ok(avoidEntry, "expected at least one agy catalog entry tagged tos: 'avoid'");
  return [
    {
      provider: avoidEntry!.provider,
      model: avoidEntry!.modelId,
      connectionId: "conn-freshly-connected",
    },
  ];
}

test("issue #15059: shipped default for excludeTosAvoid is true", async () => {
  const settings = await getSettings();
  assert.equal(settings.excludeTosAvoid, true);
});

test("issue #15059: tos:avoid candidate is excluded from auto with default settings", async () => {
  const settings = await getSettings();
  const filtered = filterTosAvoidCandidates(poolFor(), settings.excludeTosAvoid === true);
  assert.equal(
    filtered.length,
    0,
    "tos:'avoid' candidate must not stay in the auto pool by default"
  );
});

test("issue #15059: explicit opt-out (excludeTosAvoid=false) keeps the candidate", () => {
  assert.equal(filterTosAvoidCandidates(poolFor(), false).length, 1);
});
