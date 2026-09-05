// tests/unit/combo-auto-tier.test.ts — runner node:test
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateTierScore } from "../../open-sse/services/autoCombo/scoring.ts";

describe("combo auto tier projection", () => {
  it("ultra > pro > standard > free discriminant (order only, no absolutes)", () => {
    const ultra = calculateTierScore("ultra", 86400);
    const pro = calculateTierScore("pro", 86400);
    const std = calculateTierScore("standard", 86400);
    const free = calculateTierScore("free", 86400);
    // Formula is base*0.8 + resetBonus*0.2 — assert order, never absolute values
    assert.ok(ultra > pro && pro > std && std > free);
  });
  it("unknown tier falls back to standard base (order preserved)", () => {
    const undef = calculateTierScore(undefined, 86400);
    const std = calculateTierScore("standard", 86400);
    assert.equal(undef, std);
  });
  it("resetBonus short interval higher than long (same tier)", () => {
    const sShort = calculateTierScore("standard", 3600);
    const sLong = calculateTierScore("standard", 86400);
    assert.ok(sShort > sLong);
  });
  it("projected tier discriminates vs neutral (shared helper, no file read)", async () => {
    // Imports the SAME pure helper combo.ts uses — no local
    // mirror, so prod/test divergence fails here instead of shipping green.
    const { projectAccountTier } = await import("../../open-sse/services/autoCombo/scoring.ts");
    const sUltra = calculateTierScore(projectAccountTier({ accountTier: "ultra" }), 86400);
    const sNeutral = calculateTierScore(projectAccountTier({}), 86400);
    const sPsd = calculateTierScore(projectAccountTier({ providerSpecificData: { accountTier: "pro" } }), 86400);
    assert.ok(sUltra > sNeutral, `ultra ${sUltra} should exceed neutral ${sNeutral}`);
    assert.ok(sPsd > sNeutral, `psd-pro ${sPsd} should exceed neutral ${sNeutral}`);
  });
});
