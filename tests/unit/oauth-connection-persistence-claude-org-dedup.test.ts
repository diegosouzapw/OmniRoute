import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-org-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { persistOAuthConnection } = await import("../../src/lib/oauth/connectionPersistence.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});
test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("persistOAuthConnection must not merge a Claude personal workspace and a Team organization that share an email and accountUUID", async () => {
  const personal = await persistOAuthConnection("claude", {
    email: "shared@example.com",
    accessToken: "token-personal",
    refreshToken: "refresh-personal",
    expiresIn: 3600,
    providerSpecificData: {
      accountUUID: "account-shared",
      organizationUUID: "org-personal",
      organizationType: "claude_max",
    },
  });

  const team = await persistOAuthConnection("claude", {
    email: "shared@example.com",
    accessToken: "token-team",
    refreshToken: "refresh-team",
    expiresIn: 3600,
    providerSpecificData: {
      accountUUID: "account-shared",
      organizationUUID: "org-team",
      organizationType: "claude_team",
    },
  });

  const rows = await providersDb.getProviderConnections({ provider: "claude" });

  assert.notEqual(
    team.id,
    personal.id,
    "connecting the Team organization must create a distinct connection, not reuse the personal workspace row"
  );
  assert.equal(rows.length, 2, "both Claude organizations must persist as separate connections");

  const personalRow = rows.find((row: { id: string }) => row.id === personal.id);
  assert.equal(
    personalRow?.accessToken,
    "token-personal",
    "the personal workspace tokens must survive the Team login unmodified"
  );
});

test("persistOAuthConnection still merges a re-login for the SAME Claude organizationUUID", async () => {
  const first = await persistOAuthConnection("claude", {
    email: "solo@example.com",
    accessToken: "token-first",
    refreshToken: "refresh-first",
    expiresIn: 3600,
    providerSpecificData: { accountUUID: "account-solo", organizationUUID: "org-solo" },
  });

  const second = await persistOAuthConnection("claude", {
    email: "solo@example.com",
    accessToken: "token-second",
    refreshToken: "refresh-second",
    expiresIn: 3600,
    providerSpecificData: { accountUUID: "account-solo", organizationUUID: "org-solo" },
  });

  assert.equal(
    second.id,
    first.id,
    "re-authenticating the same Claude organization must update the same row"
  );

  const rows = await providersDb.getProviderConnections({ provider: "claude" });
  assert.equal(
    rows.length,
    1,
    "no duplicate connection should be created for the same organization"
  );
  assert.equal(rows[0]?.accessToken, "token-second", "the row must reflect the latest tokens");
});

test("persistOAuthConnection keeps updating a legacy Claude row stored without organizationUUID", async () => {
  const legacy = await persistOAuthConnection("claude", {
    email: "legacy@example.com",
    accessToken: "token-legacy",
    refreshToken: "refresh-legacy",
    expiresIn: 3600,
    providerSpecificData: { accountUUID: "account-legacy" },
  });

  const relogin = await persistOAuthConnection("claude", {
    email: "legacy@example.com",
    accessToken: "token-relogin",
    refreshToken: "refresh-relogin",
    expiresIn: 3600,
    providerSpecificData: { accountUUID: "account-legacy", organizationUUID: "org-discovered" },
  });

  assert.equal(
    relogin.id,
    legacy.id,
    "a row stored before organizationUUID existed must be updated in place, not forked"
  );

  const rows = await providersDb.getProviderConnections({ provider: "claude" });
  assert.equal(rows.length, 1, "the legacy row must not be duplicated by the next login");
});
