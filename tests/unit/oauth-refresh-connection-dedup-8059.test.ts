/**
 * #8059 — token refresh must not duplicate an email-less OAuth connection.
 *
 * persistOAuthConnection gated its whole dedup step behind `if (tokenData.email)`.
 * GitHub Copilot's device-code flow keeps identity under
 * providerSpecificData.githubEmail, so the top-level `tokenData.email` is
 * undefined — a refresh (which passes the existing connectionId) skipped the
 * match entirely and fell through to createProviderConnection, producing a
 * duplicate. The fix honors an explicit connectionId regardless of email, and
 * only applies email dedup when a non-empty email is present.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oauth-refresh-dedup-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "oauth-refresh-dedup-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { persistOAuthConnection, findExistingOAuthConnectionMatch } =
  await import("../../src/lib/oauth/connectionPersistence.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

type ProviderConnection = Awaited<ReturnType<typeof providersDb.getProviderConnections>>[number];

async function oauthConns(provider: string) {
  const all = await providersDb.getProviderConnections({});
  return all.filter((c: ProviderConnection) => c.provider === provider && c.authType === "oauth");
}

// GitHub Copilot: no top-level email, identity under providerSpecificData.
const copilotToken = (refresh: string) => ({
  refreshToken: refresh,
  providerSpecificData: {
    copilotToken: `cop_${refresh}`,
    githubLogin: "octocat",
    githubName: "The Octocat",
    githubEmail: "octocat@github.com",
  },
});

test("token refresh with matching connectionId updates the connection, no duplicate (#8059)", async () => {
  const created = await persistOAuthConnection("github", copilotToken("r1"));
  assert.equal((await oauthConns("github")).length, 1, "initial connect creates one connection");

  // Refresh: same connection, new token, still no top-level email.
  const refreshed = await persistOAuthConnection("github", copilotToken("r2"), created.id);

  const conns = await oauthConns("github");
  assert.equal(conns.length, 1, "refresh must not create a duplicate");
  assert.equal(refreshed.id, created.id, "refresh updates the existing connection");
  assert.equal(conns[0].refreshToken, "r2", "the token was actually updated");
});

test("findExistingOAuthConnectionMatch: connectionId wins even without an email", () => {
  const existing = [
    { id: "conn-1", provider: "github", authType: "oauth", email: null },
    { id: "conn-2", provider: "github", authType: "oauth", email: null },
  ];
  const match = findExistingOAuthConnectionMatch(existing, "github", copilotToken("x"), "conn-2");
  assert.equal(match?.id, "conn-2");
});

test("findExistingOAuthConnectionMatch: an email-less payload does not false-match an email-less connection", () => {
  const existing = [{ id: "conn-1", provider: "github", authType: "oauth", email: null }];
  // No connectionId, no top-level email -> must not match (would clobber a
  // different account whose email is likewise absent).
  const match = findExistingOAuthConnectionMatch(existing, "github", copilotToken("x"));
  assert.equal(match, undefined);
});

test("findExistingOAuthConnectionMatch: email dedup still works when an email is present", () => {
  const existing = [{ id: "conn-1", provider: "claude", authType: "oauth", email: "a@b.com" }];
  const match = findExistingOAuthConnectionMatch(existing, "claude", { email: "a@b.com" });
  assert.equal(match?.id, "conn-1");
});
