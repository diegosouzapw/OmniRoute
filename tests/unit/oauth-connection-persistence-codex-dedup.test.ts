import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7737-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { persistOAuthConnection } = await import("../../src/lib/oauth/connectionPersistence.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("persistOAuthConnection must not merge two distinct Codex accounts that share an email but have different chatgptUserId and no workspaceId", async () => {
  const accountA = await persistOAuthConnection("codex", {
    email: "shared@example.com",
    accessToken: "token-account-a",
    refreshToken: "refresh-account-a",
    expiresIn: 3600,
    providerSpecificData: { chatgptUserId: "user-a" },
  });

  const accountB = await persistOAuthConnection("codex", {
    email: "shared@example.com",
    accessToken: "token-account-b",
    refreshToken: "refresh-account-b",
    expiresIn: 3600,
    providerSpecificData: { chatgptUserId: "user-b" },
  });

  const rows = await providersDb.getProviderConnections({ provider: "codex" });

  assert.notEqual(
    accountB.id,
    accountA.id,
    "second Codex login must create a distinct connection, not reuse the first account's row"
  );
  assert.equal(rows.length, 2, "both Codex accounts must persist as separate connections");

  const rowA = rows.find((row: { id: string }) => row.id === accountA.id);
  assert.equal(
    rowA?.accessToken,
    "token-account-a",
    "account A's access token must survive account B's login unmodified"
  );
});

test("persistOAuthConnection still merges a re-login for the SAME Codex chatgptUserId with no workspaceId", async () => {
  const first = await persistOAuthConnection("codex", {
    email: "solo@example.com",
    accessToken: "token-first",
    refreshToken: "refresh-first",
    expiresIn: 3600,
    providerSpecificData: { chatgptUserId: "user-solo" },
  });

  const second = await persistOAuthConnection("codex", {
    email: "solo@example.com",
    accessToken: "token-second",
    refreshToken: "refresh-second",
    expiresIn: 3600,
    providerSpecificData: { chatgptUserId: "user-solo" },
  });

  assert.equal(second.id, first.id, "re-authenticating the same Codex user must update the same row");

  const rows = await providersDb.getProviderConnections({ provider: "codex" });
  assert.equal(rows.length, 1, "no duplicate connection should be created for the same chatgptUserId");
  assert.equal(rows[0]?.accessToken, "token-second", "the row must reflect the latest tokens");
});
