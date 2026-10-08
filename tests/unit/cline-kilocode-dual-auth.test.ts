import { test } from "node:test";
import * as assert from "node:assert";
import {
  FREE_APIKEY_PROVIDER_IDS,
  supportsApiKeyOnFreeProvider,
  supportsDualAuthProvider,
  supportsBulkApiKey,
} from "../../src/shared/constants/providers.ts";
import { isManagedProviderConnectionId } from "../../src/lib/providers/catalog.ts";
import { connectionMatchesProviderCard } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";

// ── Dual-auth API-key admission (POST /api/providers gate) ───────────────────
// cline and kilocode are OAuth-primary (isOAuth=true → "Connect" opens the OAuth flow) but
// ALSO accept a pasted BYOK API key. The API-key path must pass the managed-
// connection gate (isManagedProviderConnectionId) WITHOUT flipping isOAuth off.
// That means admitting it through the dedicated DUAL_AUTH set, NOT through
// FREE_APIKEY_PROVIDER_IDS (which would set providerSupportsPat=true → isOAuth=false
// and break the primary Connect→OAuth routing). Regression guard for the layout.

test("cline and kilocode: supportsDualAuth=true, NOT in FREE_APIKEY, isManagedConnectionId=true", () => {
  for (const provider of ["cline", "kilocode"]) {
    assert.ok(
      isManagedProviderConnectionId(provider),
      `POST /api/providers must accept a ${provider} apikey connection (dual-auth BYOK path)`
    );
    assert.ok(
      !supportsApiKeyOnFreeProvider(provider),
      `${provider} must NOT be in FREE_APIKEY_PROVIDER_IDS — that would flip isOAuth false`
    );
    assert.ok(
      !FREE_APIKEY_PROVIDER_IDS.has(provider),
      `${provider} must NOT be in FREE_APIKEY_PROVIDER_IDS`
    );
    assert.equal(supportsDualAuthProvider(provider), true, `${provider} must support dual auth`);
  }
});

test("cline and kilocode apikey connections match the provider's OAuth card", () => {
  for (const provider of ["cline", "kilocode"]) {
    for (const authType of ["apikey", "api_key", "oauth"]) {
      assert.equal(
        connectionMatchesProviderCard({ provider, authType }, provider, "oauth"),
        true,
        `${provider} with authType ${authType} should match the OAuth card`
      );
    }
  }
});

test("cline and kilocode registry authType remains 'oauth' (OAuth stays primary)", () => {
  assert.equal(REGISTRY.cline.authType, "oauth");
  assert.equal(REGISTRY.kilocode.authType, "oauth");
});

test("cline and kilocode bulk-key admission: supportsBulkApiKey returns true", () => {
  assert.equal(supportsBulkApiKey("cline"), true);
  assert.equal(supportsBulkApiKey("kilocode"), true);
});
