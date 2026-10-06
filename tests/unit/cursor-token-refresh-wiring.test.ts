import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";
import { cursor } from "../../src/lib/oauth/providers/cursor.ts";

describe("cursor token refresh wiring", () => {
  it("lists cursor in supportsTokenRefresh", () => {
    assert.equal(supportsTokenRefresh("cursor"), true);
  });

  it("mapTokens preserves refreshToken when provided", () => {
    const mapped = cursor.mapTokens({
      accessToken: "access",
      refreshToken: "refresh",
      machineId: "m1",
    });
    assert.equal(mapped.refreshToken, "refresh");
    assert.equal(mapped.providerSpecificData.authMethod, "deep_control");
  });

  it("mapTokens keeps null refresh when omitted", () => {
    const mapped = cursor.mapTokens({ accessToken: "access" });
    assert.equal(mapped.refreshToken, null);
    assert.equal(mapped.providerSpecificData.authMethod, "imported");
  });
});
