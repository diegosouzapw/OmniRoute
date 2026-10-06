import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-10815-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("createProviderConnection keeps two Kiro oauth connections with the same email but different profileArn separate (#10815)", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "kiro",
    authType: "oauth",
    email: "user@example.com",
    accessToken: "token-account-1",
    refreshToken: "refresh-account-1",
    providerSpecificData: {
      authMethod: "imported",
      provider: "Google",
      profileArn: "arn:aws:codewhisperer:us-east-1:111111111111:profile/AAAA",
    },
  });

  const second = await providersDb.createProviderConnection({
    provider: "kiro",
    authType: "oauth",
    email: "user@example.com",
    accessToken: "token-account-2",
    refreshToken: "refresh-account-2",
    providerSpecificData: {
      authMethod: "imported",
      provider: "Google",
      profileArn: "arn:aws:codewhisperer:us-east-1:222222222222:profile/BBBB",
    },
  });

  const kiroConnections = await providersDb.getProviderConnections({ provider: "kiro" });

  assert.notEqual(
    second.id,
    first.id,
    "second Kiro connection should be a new row, not an update of the first"
  );
  assert.equal(
    kiroConnections.length,
    2,
    `expected 2 Kiro connections after adding a second account, got ${kiroConnections.length}`
  );
});

test("createProviderConnection re-auth of the SAME Kiro profileArn still updates in place (#10815)", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "kiro",
    authType: "oauth",
    email: "same-profile@example.com",
    accessToken: "token-a",
    refreshToken: "refresh-a",
    providerSpecificData: {
      authMethod: "imported",
      provider: "Google",
      profileArn: "arn:aws:codewhisperer:us-east-1:333333333333:profile/CCCC",
    },
  });

  const reauth = await providersDb.createProviderConnection({
    provider: "kiro",
    authType: "oauth",
    email: "same-profile@example.com",
    accessToken: "token-a-refreshed",
    refreshToken: "refresh-a-refreshed",
    providerSpecificData: {
      authMethod: "imported",
      provider: "Google",
      profileArn: "arn:aws:codewhisperer:us-east-1:333333333333:profile/CCCC",
    },
  });

  assert.equal(
    reauth.id,
    first.id,
    "re-auth of the same profileArn should update the existing row"
  );
});

test("createProviderConnection keeps legacy email-only OAuth dedup for rows without profileArn/username (#10815)", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "google",
    authType: "oauth",
    email: "legacy@example.com",
    accessToken: "legacy-token-1",
    refreshToken: "legacy-refresh-1",
  });

  const second = await providersDb.createProviderConnection({
    provider: "google",
    authType: "oauth",
    email: "legacy@example.com",
    accessToken: "legacy-token-2",
    refreshToken: "legacy-refresh-2",
  });

  assert.equal(
    second.id,
    first.id,
    "legacy rows without profileArn/username should still dedup by bare email match"
  );
});
