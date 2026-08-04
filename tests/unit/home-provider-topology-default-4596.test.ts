// Regression guard for #4596: the home provider-topology card (ReactFlow connection
// map) vanished for installs that never persisted `showProviderTopologyOnHome`.
// HomePageClient initialized the flag to `false` and only flipped it on an explicit
// boolean from /api/settings, so an absent (undefined) setting kept the card hidden
// forever — while AppearanceTab still showed the toggle as ON (`!== false`).
// The card defaults ON; only an explicit `false` hides it.
import { test } from "node:test";
import assert from "node:assert/strict";

import { shouldShowProviderTopologyOnHome } from "../../src/app/(dashboard)/dashboard/homeAppearance.ts";

test("absent setting (undefined) shows the topology card — the #4596 regression", () => {
  assert.equal(shouldShowProviderTopologyOnHome(undefined), true);
});

test("explicit false hides the topology card (respects opt-out)", () => {
  assert.equal(shouldShowProviderTopologyOnHome(false), false);
});

test("explicit true shows the topology card", () => {
  assert.equal(shouldShowProviderTopologyOnHome(true), true);
});

test("non-boolean truthy/absent values keep the default-on behavior", () => {
  // null (e.g. JSON null) and missing keys must not hide the card — only `false` does.
  assert.equal(shouldShowProviderTopologyOnHome(null), true);
});
