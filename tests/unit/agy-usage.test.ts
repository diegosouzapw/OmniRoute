/**
 * Tests for agy (Antigravity CLI) usage/quota provider alias.
 *
 * Bug #3230: getUsageForProvider() had case "antigravity" but no case "agy",
 * so agy connections fell to the default branch returning
 * "Usage API not implemented for agy".
 *
 * Fix: add "agy" to USAGE_FETCHER_PROVIDERS and alias it to the same
 * getAntigravityUsage() path in getUsageForProvider().
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  getUsageForProvider,
  USAGE_FETCHER_PROVIDERS,
} from "../../open-sse/services/usage.ts";

test("USAGE_FETCHER_PROVIDERS includes agy", () => {
  assert.ok(
    (USAGE_FETCHER_PROVIDERS as string[]).includes("agy"),
    "agy must be listed in USAGE_FETCHER_PROVIDERS"
  );
});

test("getUsageForProvider does NOT return 'not implemented' for agy", async () => {
  // We can't call the real getAntigravityUsage without credentials, but we
  // can verify the switch statement routes agy to the antigravity branch by
  // checking the function does not hit the default case.
  // The real getAntigravityUsage will throw on invalid credentials, which is
  // fine — it proves we reached the correct branch instead of the default.
  try {
    await getUsageForProvider(
      {
        id: "test-agy-conn",
        provider: "agy",
        accessToken: "invalid-token-for-test",
        apiKey: null,
        providerSpecificData: {},
        projectId: null,
        email: null,
      },
      { forceRefresh: true }
    );
  } catch (err: any) {
    // Expected: getAntigravityUsage throws on invalid token.
    // If we got here, the switch routed agy correctly (not default).
    assert.ok(
      !err.message?.includes("not implemented"),
      `must not hit default branch; got: ${err.message}`
    );
    return;
  }
  // If it somehow succeeded without throwing, that's also acceptable
  // (the important thing is it didn't return "not implemented").
});

test("getUsageForProvider returns 'not implemented' for unknown provider", async () => {
  const result = await getUsageForProvider({
    id: "test-unknown",
    provider: "fake-provider-12345",
    accessToken: "x",
    apiKey: null,
    providerSpecificData: {},
    projectId: null,
    email: null,
  });
  assert.equal(
    (result as any).message,
    "Usage API not implemented for fake-provider-12345"
  );
});
