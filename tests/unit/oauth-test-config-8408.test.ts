// #8408: Guard against missing OAUTH_TEST_CONFIG entries for OAuth providers
import test from "node:test";
import assert from "node:assert/strict";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers/oauth.ts";
import { OAUTH_TEST_CONFIG } from "../../src/app/api/providers/[id]/test/oauthTestConfig.ts";

// NOT a design decision — this is a grandfathered backlog. These six ids are simply the
// providers that still lack an OAUTH_TEST_CONFIG entry today, captured so this guard can be
// enforced from now on without a big-bang change. Each one is a candidate for the same
// treatment devin-cli and agy get here; removing an id from this list is the fix, not a
// regression. Do not add new ids to it — a provider added without a test config should fail
// this test at the time it is added, which is the entire point.
const GRANDFATHERED_WITHOUT_TEST_CONFIG = new Set([
  "qoder",
  "zed",
  "zed-hosted",
  "trae",
  "windsurf",
  "xai-oauth",
]);

test("#8408: devin-cli and agy are present in OAUTH_TEST_CONFIG", () => {
  assert.ok(
    (OAUTH_TEST_CONFIG as Record<string, unknown>)["devin-cli"],
    "devin-cli must have an entry in OAUTH_TEST_CONFIG"
  );
  assert.ok(
    (OAUTH_TEST_CONFIG as Record<string, unknown>)["agy"],
    "agy must have an entry in OAUTH_TEST_CONFIG"
  );
});

test("#8408: every OAuth provider ID has an OAUTH_TEST_CONFIG entry (or is grandfathered)", () => {
  const providerIds = Object.keys(OAUTH_PROVIDERS);
  const testConfigKeys = new Set(Object.keys(OAUTH_TEST_CONFIG));

  for (const providerId of providerIds) {
    const isCovered =
      testConfigKeys.has(providerId) || GRANDFATHERED_WITHOUT_TEST_CONFIG.has(providerId);
    assert.ok(
      isCovered,
      `OAuth provider '${providerId}' must have an entry in OAUTH_TEST_CONFIG. ` +
        'Without one, Test Connection persists testStatus="error" on a healthy account (#8408).'
    );
  }
});
