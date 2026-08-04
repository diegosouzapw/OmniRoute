// #6147 — routing/settings UX clarity. Pure-function guards for two of the three
// sub-fixes:
//   1. Weighted effective-share % (weight ÷ Σweights), incl. total===0 and sum≠100.
//   3. Opt-in base-URL override eligibility predicate for built-in providers.
// (Item 2 is a display-only label rename with no pure seam — manual verification.)
import { test } from "node:test";
import assert from "node:assert/strict";
import { effectiveSharePercent } from "../../src/app/(dashboard)/dashboard/combos/WeightTotalBar.tsx";
import {
  isBaseUrlOverrideEligibleProvider,
  isBaseUrlConfigurableProvider,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

test("effectiveSharePercent — sum === 100 keeps raw weight", () => {
  assert.equal(effectiveSharePercent(30, 100), 30);
  assert.equal(effectiveSharePercent(70, 100), 70);
});

test("effectiveSharePercent — sum !== 100 rescales to the effective share", () => {
  // Two equal weights of 30 (total 60) are each an effective 50%.
  assert.equal(effectiveSharePercent(30, 60), 50);
  // Over-100 total: 150 total, weight 75 → 50%.
  assert.equal(effectiveSharePercent(75, 150), 50);
});

test("effectiveSharePercent — guards total === 0 and non-positive weight (no NaN)", () => {
  assert.equal(effectiveSharePercent(0, 0), 0);
  assert.equal(effectiveSharePercent(50, 0), 0);
  assert.equal(effectiveSharePercent(0, 100), 0);
  assert.equal(effectiveSharePercent(-10, 100), 0);
  assert.ok(!Number.isNaN(effectiveSharePercent(10, 0)));
});

test("isBaseUrlOverrideEligibleProvider — built-in providers are opt-in eligible", () => {
  // A plain built-in that has no dedicated base-URL field today.
  assert.equal(isBaseUrlOverrideEligibleProvider("openai"), true);
  assert.equal(isBaseUrlOverrideEligibleProvider("groq"), true);
});

test("isBaseUrlOverrideEligibleProvider — providers with an always-on field are NOT re-offered", () => {
  // Everything already covered by the configurable set stays false here so the
  // override does not double up on the existing dedicated field.
  for (const id of ["azure-openai", "databricks", "siliconflow"]) {
    assert.equal(isBaseUrlConfigurableProvider(id), true);
    assert.equal(isBaseUrlOverrideEligibleProvider(id), false);
  }
});

test("isBaseUrlOverrideEligibleProvider — empty/nullish ids are not eligible", () => {
  assert.equal(isBaseUrlOverrideEligibleProvider(""), false);
  assert.equal(isBaseUrlOverrideEligibleProvider(null), false);
  assert.equal(isBaseUrlOverrideEligibleProvider(undefined), false);
});
