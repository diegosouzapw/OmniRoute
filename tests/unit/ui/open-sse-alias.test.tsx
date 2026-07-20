import { describe, expect, it } from "vitest";

import { getCredentialRequirement } from "@/shared/utils/providerCredentialRequirement";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

/**
 * Guards the `@omniroute/open-sse` alias in vitest.config.ts.
 *
 * Without it, imports from open-sse resolve to undefined instead of throwing,
 * so a UI test keeps passing while every lookup silently returns a default.
 * That is exactly how the free-tier card tests classified every provider as
 * credentialed and still went green.
 */
describe("open-sse alias resolution", () => {
  it("REGISTRY is a populated object, not undefined", () => {
    expect(REGISTRY).toBeTruthy();
    expect(Object.keys(REGISTRY).length).toBeGreaterThan(100);
  });

  it("code depending on REGISTRY sees the real entries", () => {
    // Both are only reachable through REGISTRY: aihorde via anonymousApiKey,
    // pollinations via authType: "optional". A broken alias yields "required".
    expect(getCredentialRequirement("aihorde")).toBe("optional");
    expect(getCredentialRequirement("pollinations")).toBe("optional");
    expect(getCredentialRequirement("groq")).toBe("required");
  });
});
