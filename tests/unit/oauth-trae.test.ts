import test from "node:test";
import assert from "node:assert/strict";

import { PROVIDERS } from "../../src/lib/oauth/providers/index.ts";
import { trae } from "../../src/lib/oauth/providers/trae.ts";
import { TRAE_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";

// #2658: Trae was missing from the PROVIDERS map, so any OAuth/token flow
// for the trae provider id 500'd. These tests pin the registration and the
// expected token-import shape.

test("trae provider is registered in PROVIDERS map (#2658)", () => {
  assert.ok(PROVIDERS.trae, "PROVIDERS.trae should exist");
  assert.strictEqual(PROVIDERS.trae, trae, "PROVIDERS.trae should reference the trae module");
});

test("trae uses import_token flow (Trae has no public OAuth flow yet) (#2658)", () => {
  assert.equal(trae.flowType, "import_token");
});

test("trae mapTokens preserves accessToken and machineId (#2658)", () => {
  const result = trae.mapTokens({
    accessToken: "tk_test",
    expiresIn: 3600,
    machineId: "machine-xyz",
  });
  assert.equal(result.accessToken, "tk_test");
  assert.equal(result.refreshToken, null);
  assert.equal(result.expiresIn, 3600);
  assert.equal(result.providerSpecificData.machineId, "machine-xyz");
  assert.equal(result.providerSpecificData.authMethod, "imported");
});

test("trae mapTokens defaults expiresIn to 86400s when omitted (#2658)", () => {
  const result = trae.mapTokens({ accessToken: "tk_test" });
  assert.equal(result.expiresIn, 86400);
});

test("TRAE_CONFIG exposes token storage paths for all platforms (#2658)", () => {
  assert.ok(TRAE_CONFIG.tokenStoragePaths.linux);
  assert.ok(TRAE_CONFIG.tokenStoragePaths.macos);
  assert.ok(TRAE_CONFIG.tokenStoragePaths.windows);
});
