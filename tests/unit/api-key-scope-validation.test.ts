import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  DEFAULT_SELF_SERVICE_SCOPES,
  SELF_ACCOUNT_QUOTA_SCOPE,
  SELF_USAGE_SCOPE,
  hasSelfAccountQuotaScope,
  hasSelfUsageScope,
  normalizeSelfServiceScopesForCreate,
} from "../../src/shared/constants/selfServiceScopes.ts";
import {
  createKeySchema,
  updateKeyPermissionsSchema,
} from "../../src/shared/validation/schemas.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("self-service scope constants are distinct and usage defaults on create", () => {
  assert.equal(SELF_USAGE_SCOPE, "self:usage");
  assert.equal(SELF_ACCOUNT_QUOTA_SCOPE, "self:account-quota");
  assert.deepEqual(DEFAULT_SELF_SERVICE_SCOPES, [SELF_USAGE_SCOPE]);

  assert.deepEqual(normalizeSelfServiceScopesForCreate(undefined), [SELF_USAGE_SCOPE]);
  assert.deepEqual(normalizeSelfServiceScopesForCreate([]), [SELF_USAGE_SCOPE]);
  assert.deepEqual(normalizeSelfServiceScopesForCreate(["manage"]), ["manage", SELF_USAGE_SCOPE]);
  assert.deepEqual(normalizeSelfServiceScopesForCreate([SELF_ACCOUNT_QUOTA_SCOPE]), [
    SELF_ACCOUNT_QUOTA_SCOPE,
    SELF_USAGE_SCOPE,
  ]);
});

test("self-service scope helpers do not treat account quota as own-usage visibility", () => {
  assert.equal(hasSelfUsageScope([SELF_USAGE_SCOPE]), true);
  assert.equal(hasSelfUsageScope([SELF_ACCOUNT_QUOTA_SCOPE]), false);
  assert.equal(hasSelfAccountQuotaScope([SELF_ACCOUNT_QUOTA_SCOPE]), true);
  assert.equal(hasSelfAccountQuotaScope([SELF_USAGE_SCOPE]), false);
});

test("api key validation accepts more than sixteen scopes", () => {
  const scopes = Array.from({ length: 18 }, (_, index) => `custom:${index}`);

  assert.equal(createKeySchema.safeParse({ name: "heavy-scope-key", scopes }).success, true);
  assert.equal(updateKeyPermissionsSchema.safeParse({ scopes }).success, true);
});

test("lease scope requires an explicit non-empty connection allowlist", () => {
  const connection = "00000000-0000-4000-8000-000000000001";
  assert.equal(
    createKeySchema.safeParse({ name: "invalid managed key", scopes: ["lease:exclusive"] }).success,
    false
  );
  // Partial PATCH validity depends on the authoritative stored-row + mutation check.
  assert.equal(updateKeyPermissionsSchema.safeParse({ scopes: ["lease:exclusive"] }).success, true);
  assert.equal(
    updateKeyPermissionsSchema.safeParse({
      scopes: ["lease:exclusive"],
      allowedConnections: [],
    }).success,
    false
  );
  assert.equal(
    updateKeyPermissionsSchema.safeParse({
      scopes: ["lease:exclusive"],
      allowedConnections: [connection],
    }).success,
    true
  );
});

test("updateKeyPermissionsSchema validates connectionAccessMode and allowedConnections parity", () => {
  const connection = "00000000-0000-4000-8000-000000000001";
  assert.equal(
    updateKeyPermissionsSchema.safeParse({
      connectionAccessMode: "restricted",
      allowedConnections: [],
    }).success,
    false
  );
  assert.equal(
    updateKeyPermissionsSchema.safeParse({
      connectionAccessMode: "restricted",
    }).success,
    false
  );
  assert.equal(
    updateKeyPermissionsSchema.safeParse({
      connectionAccessMode: "restricted",
      allowedConnections: [connection],
    }).success,
    true
  );
  assert.equal(
    updateKeyPermissionsSchema.safeParse({
      connectionAccessMode: "all",
      allowedConnections: [],
    }).success,
    true
  );
  assert.equal(
    updateKeyPermissionsSchema.safeParse({
      connectionAccessMode: "all",
      allowedConnections: [connection],
    }).success,
    false
  );
});

test("api key create route normalizes omitted scopes to self-service usage", () => {
  const source = fs.readFileSync(path.join(repoRoot, "src/app/api/keys/route.ts"), "utf8");

  assert.match(source, /normalizeSelfServiceScopesForCreate/);
  assert.ok(
    source.indexOf("normalizeSelfServiceScopesForCreate(scopes)") <
      source.indexOf("createApiKey(name, machineId"),
    "create route must add default self-service scope before persistence"
  );
});
