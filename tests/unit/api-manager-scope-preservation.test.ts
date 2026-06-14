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

test("create scopes enable own usage by default without shared account quota", () => {
  assert.deepEqual(buildApiKeyCreateScopes({ manageEnabled: false }), [SELF_USAGE_SCOPE]);
  assert.deepEqual(buildApiKeyCreateScopes({ manageEnabled: true }), ["manage", SELF_USAGE_SCOPE]);
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
  });

  assert.deepEqual(scopes, [
    "custom:scope",
    SELF_USAGE_SCOPE,
    "manage",
    SELF_ACCOUNT_QUOTA_SCOPE,
  ]);
});

test("permission scope merge removes shared quota visibility when own usage is disabled", () => {
  const scopes = mergeApiKeyPermissionScopes(
    ["custom:scope", SELF_USAGE_SCOPE, SELF_ACCOUNT_QUOTA_SCOPE],
    {
      manageEnabled: false,
      selfUsageEnabled: false,
      selfAccountQuotaEnabled: true,
    }
  );

  assert.deepEqual(scopes, ["custom:scope"]);
});
