import { test } from "node:test";
import assert from "node:assert/strict";
import { NOAUTH_PROVIDERS, providerAllowsOptionalApiKey } from "@/shared/constants/providers";

test("uncloseai should be treated as a no-auth provider", () => {
  const isNoAuthRegistered = Object.prototype.hasOwnProperty.call(NOAUTH_PROVIDERS, "uncloseai");
  const allowsOptionalKey = providerAllowsOptionalApiKey("uncloseai");

  assert.equal(
    isNoAuthRegistered || allowsOptionalKey,
    true,
    "uncloseai must be registered in NOAUTH_PROVIDERS or allow an optional API key " +
      "so the dashboard doesn't force users to enter a key for a no-auth provider"
  );
  assert.equal(
    isNoAuthRegistered,
    true,
    "uncloseai must be registered in NOAUTH_PROVIDERS (not just allow an optional key) " +
      "so the dashboard renders the NoAuthProviderControls flow"
  );
});
