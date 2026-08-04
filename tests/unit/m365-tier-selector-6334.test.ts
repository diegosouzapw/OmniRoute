import test from "node:test";
import assert from "node:assert/strict";

import {
  applyM365Tier,
  isM365TierCapableProvider,
  normalizeM365TierValue,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/m365Tier.ts";

// #6334 — the connection Advanced-Settings tier dropdown must map its value to
// providerSpecificData.tier the same way the copilot-m365-web executor reads it,
// and selecting Individual must clear a previously-saved tier.

test("isM365TierCapableProvider only matches copilot-m365-web", () => {
  assert.equal(isM365TierCapableProvider("copilot-m365-web"), true);
  assert.equal(isM365TierCapableProvider("copilot-web"), false);
  assert.equal(isM365TierCapableProvider("openai"), false);
  assert.equal(isM365TierCapableProvider(""), false);
  assert.equal(isM365TierCapableProvider(undefined), false);
  assert.equal(isM365TierCapableProvider(null), false);
});

test("normalizeM365TierValue maps stored tier (and aliases) to the dropdown value", () => {
  // Individual / unset
  assert.equal(normalizeM365TierValue(undefined), "");
  assert.equal(normalizeM365TierValue(null), "");
  assert.equal(normalizeM365TierValue(""), "");
  assert.equal(normalizeM365TierValue("individual"), "");
  assert.equal(normalizeM365TierValue("unknown-tier"), "");
  // Education (+ "included" alias, case-insensitive)
  assert.equal(normalizeM365TierValue("edu"), "edu");
  assert.equal(normalizeM365TierValue("EDU"), "edu");
  assert.equal(normalizeM365TierValue("included"), "edu");
  // Enterprise (+ "work" alias)
  assert.equal(normalizeM365TierValue("enterprise"), "enterprise");
  assert.equal(normalizeM365TierValue("work"), "enterprise");
  assert.equal(normalizeM365TierValue(" Work "), "enterprise");
});

test("applyM365Tier writes the canonical tier for edu/enterprise", () => {
  const eduTarget: Record<string, unknown> = {};
  applyM365Tier(eduTarget, "edu");
  assert.equal(eduTarget.tier, "edu");

  const entTarget: Record<string, unknown> = {};
  applyM365Tier(entTarget, "enterprise");
  assert.equal(entTarget.tier, "enterprise");
});

test("applyM365Tier clears a previously-saved tier when Individual is selected", () => {
  // Simulates the edit flow: target starts as a copy of existing providerSpecificData
  // that already carries tier="enterprise". Individual must OVERRIDE it (null), not
  // merely omit the key — the PUT route merges { ...existing, ...incoming }, so an
  // omitted/undefined key would keep the stale value.
  const target: Record<string, unknown> = { tier: "enterprise", customUserAgent: "x" };
  applyM365Tier(target, "");
  assert.equal(target.tier, null);
  assert.equal(target.customUserAgent, "x");
  // And it round-trips back to Individual on reload.
  assert.equal(normalizeM365TierValue(target.tier), "");
});
