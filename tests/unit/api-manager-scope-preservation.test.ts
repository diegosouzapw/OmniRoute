import test from "node:test";
import assert from "node:assert/strict";

import {
  buildApiKeyCreateScopes,
  mergeApiKeyPermissionScopes,
} from "../../src/app/(dashboard)/dashboard/api-manager/apiManagerScopes.ts";
import {
  SELF_ACCOUNT_QUOTA_SCOPE,
  SELF_USAGE_SCOPE,
} from "../../src/shared/constants/selfServiceScopes.ts";
import { API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE } from "../../src/shared/constants/apiKeyPolicyScopes.ts";

test("create scopes enable own usage by default without shared account quota", () => {
  assert.deepEqual(buildApiKeyCreateScopes({ manageEnabled: false }), [SELF_USAGE_SCOPE]);
  assert.deepEqual(buildApiKeyCreateScopes({ manageEnabled: true }), ["manage", SELF_USAGE_SCOPE]);
  assert.deepEqual(
    buildApiKeyCreateScopes({
      manageEnabled: false,
      bypassProviderQuotaPolicyEnabled: true,
    }),
    [SELF_USAGE_SCOPE, API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE]
  );
  assert.deepEqual(
    buildApiKeyCreateScopes({
      manageEnabled: false,
      selfUsageEnabled: false,
      selfAccountQuotaEnabled: true,
    }),
    []
  );
});

test("permission scope merge preserves unrelated scopes while toggling managed scopes", () => {
  const scopes = mergeApiKeyPermissionScopes(["custom:scope", SELF_USAGE_SCOPE], {
    manageEnabled: true,
    selfUsageEnabled: true,
    selfAccountQuotaEnabled: true,
    bypassProviderQuotaPolicyEnabled: true,
  });

  assert.deepEqual(scopes, [
    "custom:scope",
    SELF_USAGE_SCOPE,
    "manage",
    SELF_ACCOUNT_QUOTA_SCOPE,
    API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE,
  ]);
});

test("permission scope merge removes shared quota visibility when own usage is disabled", () => {
  const scopes = mergeApiKeyPermissionScopes(
    ["custom:scope", SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    {
      manageEnabled: false,
      selfUsageEnabled: false,
      selfAccountQuotaEnabled: true,
      bypassProviderQuotaPolicyEnabled: false,
    }
  );

  assert.deepEqual(scopes, ["custom:scope"]);
});

test("permission scope merge toggles provider quota policy bypass without dropping custom scopes", () => {
  const enabled = mergeApiKeyPermissionScopes(["custom:scope"], {
    manageEnabled: false,
    selfUsageEnabled: false,
    selfAccountQuotaEnabled: false,
    bypassProviderQuotaPolicyEnabled: true,
  });

  assert.deepEqual(enabled, ["custom:scope", API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE]);

  const disabled = mergeApiKeyPermissionScopes(enabled, {
    manageEnabled: false,
    selfUsageEnabled: false,
    selfAccountQuotaEnabled: false,
    bypassProviderQuotaPolicyEnabled: false,
  });

  assert.deepEqual(disabled, ["custom:scope"]);
});
