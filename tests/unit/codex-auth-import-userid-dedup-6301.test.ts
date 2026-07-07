import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6301: importing a DISTINCT Codex/ChatGPT OAuth auth.json is falsely detected as
// "already exists" when it shares the same account/workspace id but has a different
// user identity. Dedup must key on workspace AND chatgpt_user_id.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-userid-dedup-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { parseAndValidateCodexAuth, createConnectionFromAuthFile } = await import(
  "../../src/lib/oauth/utils/codexAuthImport.ts"
);

type JsonRecord = Record<string, unknown>;

function buildJwt(payload: JsonRecord): string {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.fake-signature`;
}

// Build a Codex CLI auth.json sharing accountId but with a caller-chosen chatgpt_user_id.
function buildAuthFile(accountId: string, userId: string, email: string): JsonRecord {
  const idToken = buildJwt({
    email,
    exp: 9999999999,
    "https://api.openai.com/auth": {
      chatgpt_account_id: accountId,
      chatgpt_user_id: userId,
    },
  });
  return {
    auth_mode: "chatgpt",
    OPENAI_API_KEY: null,
    tokens: {
      id_token: idToken,
      access_token: `at-${userId}`,
      refresh_token: `rt-${userId}`,
      // Intentionally omit account_id so it is derived from the JWT claim (shared).
    },
    last_refresh: new Date().toISOString(),
  };
}

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
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

test("parseAndValidateCodexAuth extracts userId from chatgpt_user_id claim", () => {
  const parsed = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-alice", "alice@example.com")
  );
  assert.equal(parsed.accountId, "acct-shared");
  assert.equal(parsed.userId, "user-alice");
});

test("#6301: same workspace, DIFFERENT user → both imports create a new connection", async () => {
  const alice = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-alice", "alice@example.com")
  );
  const bob = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-bob", "bob@example.com")
  );

  // Sanity: same account id, distinct user id.
  assert.equal(alice.accountId, bob.accountId);
  assert.notEqual(alice.userId, bob.userId);

  const first = await createConnectionFromAuthFile(alice, {});
  assert.equal(first.created, true);

  // The bug: this used to throw 409 duplicate_account. It must now create a new one.
  const second = await createConnectionFromAuthFile(bob, {});
  assert.equal(second.created, true);
  assert.notEqual((second.connection as JsonRecord).id, (first.connection as JsonRecord).id);
});

test("same workspace AND same user → still deduped (update, not create)", async () => {
  const alice1 = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-alice", "alice@example.com")
  );
  const first = await createConnectionFromAuthFile(alice1, {});
  assert.equal(first.created, true);

  // Re-import the same identity with overwrite → dedup to the existing connection.
  const alice2 = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-alice", "alice@example.com")
  );
  const second = await createConnectionFromAuthFile(alice2, { overwriteExisting: true });
  assert.equal(second.created, false);
  assert.equal((second.connection as JsonRecord).id, (first.connection as JsonRecord).id);
});

test("backward-compat: legacy connection without stored userId still dedups by accountId", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");

  // Simulate a connection imported before the chatgptUserId field existed.
  const legacy = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Legacy Codex",
    accessToken: "at-legacy",
    refreshToken: "rt-legacy",
    idToken: "id-legacy",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      workspaceId: "acct-shared",
      importedAt: new Date().toISOString(),
      // no chatgptUserId
    },
  });

  const incoming = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-alice", "alice@example.com")
  );
  const result = await createConnectionFromAuthFile(incoming, { overwriteExisting: true });
  assert.equal(result.created, false);
  assert.equal((result.connection as JsonRecord).id, legacy.id);
});
