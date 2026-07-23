import test from "node:test";
import assert from "node:assert/strict";

import {
  keychainImportOnlyGuard,
  KEYCHAIN_IMPORT_ONLY_PROVIDERS,
  OAUTH_FLOW_ACTIONS,
} from "../../src/app/api/oauth/[provider]/[action]/keychainImportOnly.ts";

// Unit coverage for the leaf extracted from the OAuth route (#6155 file-size
// base-red follow-up). The route-level behavior is guarded by
// oauth-keychain-import-only-6041.test.ts; this pins the guard in isolation.

test("keychainImportOnlyGuard returns a 400 for a keychain-import-only provider on an OAuth-flow action", async () => {
  const res = keychainImportOnlyGuard("zed", "authorize");
  assert.ok(res, "expected a response, not null");
  assert.equal(res!.status, 400);
  const body = await res!.json();
  assert.match(body.error, /no browser OAuth flow/i);
  assert.match(body.error, /Import/);
});

test("keychainImportOnlyGuard returns null for a normal OAuth provider", () => {
  assert.equal(keychainImportOnlyGuard("openai", "authorize"), null);
  assert.equal(keychainImportOnlyGuard("anthropic", "exchange"), null);
});

test("keychainImportOnlyGuard returns null for a keychain provider on a non-flow action", () => {
  // e.g. a callback/status action that is not in OAUTH_FLOW_ACTIONS
  assert.equal(keychainImportOnlyGuard("zed", "status"), null);
});

test("the sets stay in sync with the guard's expectations", () => {
  assert.ok(KEYCHAIN_IMPORT_ONLY_PROVIDERS.has("zed"));
  assert.ok(OAUTH_FLOW_ACTIONS.has("authorize"));
  assert.ok(OAUTH_FLOW_ACTIONS.has("exchange"));
  assert.ok(!OAUTH_FLOW_ACTIONS.has("status"));
});
