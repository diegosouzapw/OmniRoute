import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldShowLoadingPlaceholder } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";

// The loading placeholder replaces the entire quota section with a spinner.
// Swapping rows for a spinner mid-refresh collapses the card height, which
// rebalances the outer CSS multi-column layout (provider groups visibly jump
// between columns). During a refresh the existing rows must stay rendered —
// the refresh button icon already spins — so only the initial load (nothing
// to display yet) may show the placeholder.

test("initial load with no quota data shows the placeholder", () => {
  assert.equal(shouldShowLoadingPlaceholder(true, 0), true);
});

test("refresh with existing quota rows keeps them rendered", () => {
  assert.equal(shouldShowLoadingPlaceholder(true, 3), false);
  assert.equal(shouldShowLoadingPlaceholder(true, 1), false);
});

test("refresh with only a provider message keeps it rendered", () => {
  assert.equal(shouldShowLoadingPlaceholder(true, 0, "re-authenticate this account."), false);
});

test("not loading never shows the placeholder", () => {
  assert.equal(shouldShowLoadingPlaceholder(false, 0), false);
  assert.equal(shouldShowLoadingPlaceholder(false, 3), false);
});
