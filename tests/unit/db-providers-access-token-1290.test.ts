// #1290 — bare-access-token Codex import. createProviderConnection must
// never dedup authType "access_token" rows (each import is intentionally a
// new connection — a raw access token has no stable long-lived identity to
// safely match against), and must derive a connection name from email when
// no explicit name is supplied, mirroring the existing "oauth" behavior.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-access-token-1290-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | null)?.code;
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

test("createProviderConnection: authType access_token never dedups — same email creates a new row each time", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "access_token",
    accessToken: "eyJfirst.token.sig",
    email: "user@example.com",
    testStatus: "active",
  });
  const second = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "access_token",
    accessToken: "eyJsecond.token.sig",
    email: "user@example.com",
    testStatus: "active",
  });

  assert.notEqual(first.id, second.id);

  const rows = await providersDb.getProviderConnections({ provider: "codex" });
  assert.equal(rows.length, 2);
  assert.deepEqual(
    rows.map((r) => r.accessToken).sort(),
    ["eyJfirst.token.sig", "eyJsecond.token.sig"].sort()
  );
});

test("createProviderConnection: authType access_token falls back to email for the connection name", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "access_token",
    accessToken: "eyJtoken.sig",
    email: "labeled@example.com",
  });

  assert.equal(conn.name, "labeled@example.com");
});

test("createProviderConnection: authType access_token prefers an explicit name over email", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "access_token",
    accessToken: "eyJtoken.sig",
    email: "labeled@example.com",
    name: "My Bare Token",
  });

  assert.equal(conn.name, "My Bare Token");
});

test("createProviderConnection: authType access_token does not collide with an existing oauth row for the same email", async () => {
  const oauthConn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "oauth-access",
    refreshToken: "oauth-refresh",
    email: "shared@example.com",
  });
  const tokenConn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "access_token",
    accessToken: "eyJbare.token.sig",
    email: "shared@example.com",
  });

  assert.notEqual(oauthConn.id, tokenConn.id);

  // The oauth row must be untouched (not silently overwritten by the
  // access_token import).
  const refreshed = await providersDb.getProviderConnections({ provider: "codex" });
  const oauthRow = refreshed.find((r) => r.id === oauthConn.id);
  assert.equal(oauthRow?.authType, "oauth");
  assert.equal(oauthRow?.refreshToken, "oauth-refresh");
});
