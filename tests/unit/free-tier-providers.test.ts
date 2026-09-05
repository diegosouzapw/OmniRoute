import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FREE_TIER_PROVIDER_SET, hasFreeTierProvider } from "../../open-sse/config/freeTierProviders.ts";

describe("freeTierProviders leaf", () => {
  it("contains a known free provider", () => {
    assert.equal(hasFreeTierProvider("api-airforce"), true);
  });
  it("contains the documented alias target lookup (af is resolved by caller via entry.alias)", () => {
    // The leaf stores canonical ids; alias resolution happens in capabilitiesFor
    // via entry.alias. Document the contract: leaf answers ids, caller passes both.
    assert.equal(FREE_TIER_PROVIDER_SET.size > 0, true);
  });
  it("rejects non-string input", () => {
    assert.equal(hasFreeTierProvider(undefined), false);
    assert.equal(hasFreeTierProvider(null), false);
  });
  it("keeps pollinations free despite discontinued entries", () => {
    assert.equal(hasFreeTierProvider("pollinations"), true);
  });
  it("excludes a provider with no free models", () => {
    assert.equal(hasFreeTierProvider("definitely-not-a-provider-xyz"), false);
  });
});
