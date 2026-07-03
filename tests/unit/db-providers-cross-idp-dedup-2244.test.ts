// Cross-IdP OAuth account dedup — createProviderConnection matched OAuth
// connections by email only, so two different IdPs that happen to share an
// email address (e.g. a Google account and a HuggingFace account) would
// silently overwrite each other on the second login. Disambiguate on
// providerSpecificData.username when BOTH the incoming and an existing
// connection carry one; fall back to the legacy email-only match when
// neither side has a username (backward compat for rows created before
// this fix). This test fails before the fix (case b overwrites instead of
// inserting a new row).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cross-idp-dedup-"));
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

test("#2244 cross-IdP dedup: same email + same username updates the existing connection", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "oauth",
    email: "shared@example.com",
    providerSpecificData: { username: "alice-google" },
    isActive: true,
  });
  const second = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "oauth",
    email: "shared@example.com",
    providerSpecificData: { username: "alice-google" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "glm" });
  assert.equal(conns.length, 1, "same email + same username must dedupe to a single connection");
  assert.equal((first as { id: string }).id, (second as { id: string }).id);
});

test("#2244 cross-IdP dedup: same email + DIFFERENT username creates a separate connection", async () => {
  await providersDb.createProviderConnection({
    provider: "glm",
    authType: "oauth",
    email: "shared@example.com",
    providerSpecificData: { username: "alice-google" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "glm",
    authType: "oauth",
    email: "shared@example.com",
    providerSpecificData: { username: "alice-huggingface" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "glm" });
  assert.equal(
    conns.length,
    2,
    "two different IdP identities sharing an email must NOT be collapsed into one connection"
  );
  const usernames = conns
    .map((c) => (c as { providerSpecificData?: { username?: string } }).providerSpecificData?.username)
    .sort();
  assert.deepEqual(usernames, ["alice-google", "alice-huggingface"]);
});

test("#2244 cross-IdP dedup: legacy rows without username still dedupe against incoming without username", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "oauth",
    email: "legacy@example.com",
    providerSpecificData: {},
    isActive: true,
  });
  const second = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "oauth",
    email: "legacy@example.com",
    providerSpecificData: {},
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "glm" });
  assert.equal(
    conns.length,
    1,
    "legacy email-only rows without a username must keep deduping on email alone"
  );
  assert.equal((first as { id: string }).id, (second as { id: string }).id);
});

test("#2244 cross-IdP dedup: Codex workspaceId matching path is unaffected", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "team@example.com",
    providerSpecificData: { workspaceId: "ws-1", username: "team-user" },
    isActive: true,
  });
  const second = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "team@example.com",
    providerSpecificData: { workspaceId: "ws-1", username: "team-user-renamed" },
    isActive: true,
  });
  const third = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "team@example.com",
    providerSpecificData: { workspaceId: "ws-2", username: "team-user" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "codex" });
  assert.equal(
    conns.length,
    2,
    "Codex must keep matching on workspaceId + email regardless of username, and a different workspace must stay a separate connection"
  );
  assert.equal((first as { id: string }).id, (second as { id: string }).id);
  assert.notEqual((first as { id: string }).id, (third as { id: string }).id);
});
