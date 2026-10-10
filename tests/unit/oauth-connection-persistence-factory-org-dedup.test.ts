import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-factory-org-"));
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

function factoryTokens(orgId: string, userId: string, suffix: string) {
  return {
    email: "shared@example.com",
    name: `Factory (${orgId})`,
    displayName: `Factory (${orgId})`,
    accessToken: `access-${suffix}`,
    refreshToken: `refresh-${suffix}`,
    expiresIn: 3600,
    providerSpecificData: {
      orgId,
      workosOrgId: orgId,
      userId,
      region: "US",
      isLocalCli: false,
    },
  };
}

test.beforeEach(async () => {
  await resetStorage();
});
test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("persistOAuthConnection must not merge Factory orgs that share an email", async () => {
  const first = await persistOAuthConnection("factory", factoryTokens("org-a", "user-1", "a"));
  const second = await persistOAuthConnection("factory", factoryTokens("org-b", "user-1", "b"));
  const rows = await providersDb.getProviderConnections({ provider: "factory" });

  assert.notEqual(second.id, first.id);
  assert.equal(rows.length, 2);
  assert.equal(rows.find((row: { id: string }) => row.id === first.id)?.accessToken, "access-a");
});

test("persistOAuthConnection merges a Factory re-login for the same org and user", async () => {
  const first = await persistOAuthConnection("factory", factoryTokens("org-a", "user-1", "a"));
  const again = await persistOAuthConnection("factory", factoryTokens("org-a", "user-1", "a2"));
  const rows = await providersDb.getProviderConnections({ provider: "factory" });

  assert.equal(again.id, first.id);
  assert.equal(rows.length, 1);
  assert.equal(again.accessToken, "access-a2");
  assert.equal(again.refreshToken, "refresh-a2");
  assert.equal(again.name, first.name);
});

test("persistOAuthConnection merges Factory metadata without dropping existing keys", async () => {
  const first = await persistOAuthConnection("factory", {
    ...factoryTokens("org-a", "user-1", "a"),
    providerSpecificData: {
      ...factoryTokens("org-a", "user-1", "a").providerSpecificData,
      keepMe: "yes",
    },
  });
  await persistOAuthConnection("factory", factoryTokens("org-a", "user-1", "a2"));
  const rows = await providersDb.getProviderConnections({ provider: "factory" });
  const row = rows.find((candidate: { id: string }) => candidate.id === first.id);

  assert.equal(row?.providerSpecificData?.keepMe, "yes");
  assert.equal(row?.providerSpecificData?.orgId, "org-a");
  assert.equal(row?.accessToken, "access-a2");
});

test("persistOAuthConnection rejects Factory payloads without both tokens", async () => {
  await assert.rejects(
    () =>
      persistOAuthConnection("factory", {
        email: "shared@example.com",
        accessToken: "access-only",
        providerSpecificData: { orgId: "org-a" },
      }),
    /nonempty accessToken and refreshToken/
  );
});
