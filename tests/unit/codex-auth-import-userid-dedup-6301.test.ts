import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

// #6301: importing a DISTINCT Codex/ChatGPT OAuth auth.json is falsely detected as
// "already exists" when it shares the same account/workspace id but has a different
// user identity. Dedup must key on workspace AND chatgpt_user_id.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-userid-dedup-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "codex-import-userid-dedup-test-key";

const core = await import("../../src/lib/db/core.ts");
const { parseAndValidateCodexAuth, createConnectionFromAuthFile } =
  await import("../../src/lib/oauth/utils/codexAuthImport.ts");

type JsonRecord = Record<string, unknown>;

function buildJwt(payload: JsonRecord): string {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.fake-signature`;
}

// Build a Codex CLI auth.json sharing accountId but with a caller-chosen chatgpt_user_id.
function encryptWithStorageKey(key: string, values: string[]): string[] {
  const script = `
    import { encrypt } from "./src/lib/db/encryption.ts";
    console.log(JSON.stringify(${JSON.stringify(values)}.map((value) => encrypt(value))));
  `;
  return JSON.parse(
    execFileSync(
      process.execPath,
      ["--import", "tsx/esm", "--input-type=module", "--eval", script],
      {
        cwd: process.cwd(),
        env: { ...process.env, STORAGE_ENCRYPTION_KEY: key },
        encoding: "utf8",
      }
    )
  ) as string[];
}

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

test("Codex auth import ignores matching non-OAuth connections", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const parsed = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-alice", "alice@example.com")
  );
  const nonOauth = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "access_token",
    accessToken: "website-access-token",
    email: parsed.email,
    providerSpecificData: {
      workspaceId: parsed.accountId,
      chatgptUserId: parsed.userId,
    },
  });

  const imported = await createConnectionFromAuthFile(parsed, {});

  assert.equal(imported.created, true);
  assert.notEqual(imported.connection.id, nonOauth.id);
  const untouched = await providersDb.getProviderConnectionById(nonOauth.id as string);
  assert.equal(untouched?.authType, "access_token");
  assert.equal(untouched?.accessToken, "website-access-token");

  const rawOauth = core
    .getDbInstance()
    .prepare(
      `SELECT access_token, refresh_token, id_token
       FROM provider_connections WHERE id = ?`
    )
    .get(imported.connection.id) as Record<string, string>;
  assert.match(rawOauth.access_token, /^enc:v1:/);
  assert.match(rawOauth.refresh_token, /^enc:v1:/);
  assert.match(rawOauth.id_token, /^enc:v1:/);
});

test("#6301: same workspace, DIFFERENT user → both imports create a new connection", async () => {
  const alice = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-alice", "alice@example.com")
  );
  const bob = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-bob", "bob@example.com")
  );

  const first = await createConnectionFromAuthFile(alice, {});
  assert.equal(first.created, true);

  // The bug: this used to throw 409 duplicate_account. It must now create a new one.
  const second = await createConnectionFromAuthFile(bob, {});
  assert.equal(second.created, true);
  assert.notEqual((second.connection as JsonRecord).id, (first.connection as JsonRecord).id);
});

test("same workspace AND same user stays one connection when the email changes", async () => {
  const first = await createConnectionFromAuthFile(
    parseAndValidateCodexAuth(buildAuthFile("acct-shared", "user-alice", "old@example.com")),
    {}
  );
  const second = await createConnectionFromAuthFile(
    parseAndValidateCodexAuth(buildAuthFile("acct-shared", "user-alice", "new@example.com")),
    { overwriteExisting: true }
  );

  assert.equal(second.created, false);
  assert.equal((second.connection as JsonRecord).id, (first.connection as JsonRecord).id);
  assert.equal((second.connection as JsonRecord).email, "new@example.com");
});

test("an email-less legacy workspace can promote when a user ID appears", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const legacy = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    providerSpecificData: { workspaceId: "acct-shared" },
  });
  const promoted = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    providerSpecificData: { workspaceId: "acct-shared", chatgptUserId: "user-alice" },
  });

  assert.equal(promoted.id, legacy.id);
});

test("same workspace and email but different users remain separate", async () => {
  const first = await createConnectionFromAuthFile(
    parseAndValidateCodexAuth(buildAuthFile("acct-shared", "user-alice", "shared@example.com")),
    {}
  );
  const second = await createConnectionFromAuthFile(
    parseAndValidateCodexAuth(buildAuthFile("acct-shared", "user-bob", "shared@example.com")),
    {}
  );

  assert.equal(second.created, true);
  assert.notEqual((second.connection as JsonRecord).id, (first.connection as JsonRecord).id);
});

test("Codex auth import promotes the compatible email legacy row and leaves its peer untouched", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
  const alice = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "alice@example.com",
    displayName: "Alice history",
    providerSpecificData: { workspaceId: "acct-shared" },
  });
  const bob = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "bob@example.com",
    displayName: "Bob history",
    providerSpecificData: { workspaceId: "acct-shared" },
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: alice.id as string,
    tokens: { input: 10, output: 5 },
    timestamp: "2026-01-01T00:00:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: bob.id as string,
    tokens: { input: 20, output: 10 },
    timestamp: "2026-01-02T00:00:00.000Z",
  });

  const imported = await createConnectionFromAuthFile(
    parseAndValidateCodexAuth(buildAuthFile("acct-shared", "user-bob", "bob@example.com")),
    { overwriteExisting: true }
  );
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: imported.connection.id as string,
    tokens: { input: 30, output: 15 },
    timestamp: "2026-01-03T00:00:00.000Z",
  });

  const rows = core
    .getDbInstance()
    .prepare(
      `SELECT account_label label, COUNT(*) requests, SUM(tokens_input + tokens_output) tokens
       FROM usage_history GROUP BY account_key ORDER BY label`
    )
    .all();
  assert.equal(imported.connection.id, bob.id);
  assert.deepEqual(rows, [
    { label: "Alice history", requests: 1, tokens: 15 },
    { label: "Bob history", requests: 2, tokens: 75 },
  ]);
});

test("an established Codex user prevents an email-less legacy row from absorbing another user", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
  const alice = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "alice@example.com",
    displayName: "Alice history",
    providerSpecificData: { workspaceId: "acct-shared", chatgptUserId: "user-alice" },
  });
  const legacy = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    displayName: "Legacy history",
    providerSpecificData: { workspaceId: "acct-shared" },
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: alice.id as string,
    tokens: { input: 10, output: 5 },
    timestamp: "2026-01-01T00:00:00.000Z",
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: legacy.id as string,
    tokens: { input: 20, output: 10 },
    timestamp: "2026-01-02T00:00:00.000Z",
  });

  const parsed = parseAndValidateCodexAuth(
    buildAuthFile("acct-shared", "user-bob", "bob@example.com")
  );
  const imported = await createConnectionFromAuthFile(parsed, { overwriteExisting: true });

  assert.equal(imported.created, true);
  assert.notEqual(imported.connection.id, alice.id);
  assert.notEqual(imported.connection.id, legacy.id);
  assert.equal(imported.connection.accessToken, parsed.accessToken);
  assert.equal(
    (await providersDb.getProviderConnectionById(imported.connection.id as string))?.accessToken,
    parsed.accessToken
  );

  const stored = core
    .getDbInstance()
    .prepare(
      `SELECT access_token, refresh_token, id_token
       FROM provider_connections WHERE id = ?`
    )
    .get(imported.connection.id) as Record<string, string>;
  assert.notEqual(stored.access_token, parsed.accessToken);
  assert.notEqual(stored.refresh_token, parsed.refreshToken);
  assert.notEqual(stored.id_token, parsed.idToken);

  const histories = core
    .getDbInstance()
    .prepare(
      `SELECT connection_id, account_label, COUNT(*) requests,
              SUM(tokens_input + tokens_output) tokens
       FROM usage_history GROUP BY connection_id, account_label ORDER BY account_label`
    )
    .all();
  assert.deepEqual(histories, [
    { connection_id: alice.id, account_label: "Alice history", requests: 1, tokens: 15 },
    { connection_id: legacy.id, account_label: "Legacy history", requests: 1, tokens: 30 },
  ]);
});

test("legacy workspace/email identity promotes to a user identity without losing its history", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

  const legacy = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "alice@example.com",
    displayName: "Historic label",
    apiKey: "preserved-legacy-api-key",
    providerSpecificData: { workspaceId: "acct-shared" },
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: legacy.id as string,
    tokens: { input: 10, output: 5 },
    timestamp: "2026-01-01T00:00:00.000Z",
  });

  const result = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "alice@example.com",
    accessToken: "safe-promotion-access-token",
    refreshToken: "safe-promotion-refresh-token",
    idToken: "safe-promotion-id-token",
    providerSpecificData: { workspaceId: "acct-shared", chatgptUserId: "user-alice" },
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: result.id as string,
    tokens: { input: 20, output: 10 },
    timestamp: "2026-01-02T00:00:00.000Z",
  });

  const groups = core
    .getDbInstance()
    .prepare(
      `SELECT account_key, COUNT(*) requests, SUM(tokens_input + tokens_output) tokens,
              MAX(account_label) FILTER (WHERE account_label_priority = 4) historic_label
       FROM usage_history GROUP BY account_key`
    )
    .all() as Array<Record<string, unknown>>;
  assert.equal(result.id, legacy.id);
  assert.equal(result.accessToken, "safe-promotion-access-token");
  assert.equal(result.apiKey, "preserved-legacy-api-key");
  const decrypted = await providersDb.getProviderConnectionById(result.id as string);
  assert.equal(decrypted?.accessToken, "safe-promotion-access-token");
  assert.equal(decrypted?.apiKey, "preserved-legacy-api-key");
  const stored = core
    .getDbInstance()
    .prepare(
      `SELECT access_token, refresh_token, id_token
       FROM provider_connections WHERE id = ?`
    )
    .get(result.id) as Record<string, string>;
  assert.notEqual(stored.access_token, "safe-promotion-access-token");
  assert.notEqual(stored.refresh_token, "safe-promotion-refresh-token");
  assert.notEqual(stored.id_token, "safe-promotion-id-token");
  assert.deepEqual(
    groups.map(({ requests, tokens, historic_label }) => ({ requests, tokens, historic_label })),
    [{ requests: 2, tokens: 45, historic_label: "Historic label" }]
  );
});

test("partial legacy identity promotion preserves credentials encrypted under another key", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const legacy = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "alice@example.com",
    providerSpecificData: { workspaceId: "acct-shared" },
  });
  const [accessToken, refreshToken, idToken] = encryptWithStorageKey("codex-import-key-a", [
    "legacy-access",
    "legacy-refresh",
    "legacy-id",
  ]);
  core
    .getDbInstance()
    .prepare(
      `UPDATE provider_connections
       SET access_token = ?, refresh_token = ?, id_token = ?
       WHERE id = ?`
    )
    .run(accessToken, refreshToken, idToken, legacy.id);
  const beforeCiphertext = {
    access_token: accessToken,
    refresh_token: refreshToken,
    id_token: idToken,
  };

  const promoted = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "alice@example.com",
    displayName: "Promoted identity",
    providerSpecificData: {
      workspaceId: "acct-shared",
      chatgptUserId: "user-alice",
    },
  });

  assert.equal(promoted?.accessToken, undefined);
  assert.equal(promoted?.refreshToken, undefined);
  assert.equal(promoted?.idToken, undefined);

  const after = core
    .getDbInstance()
    .prepare(
      `SELECT access_token, refresh_token, id_token
       FROM provider_connections WHERE id = ?`
    )
    .get(legacy.id) as Record<string, string>;
  assert.deepEqual({ ...after }, beforeCiphertext);
});

test("failed legacy promotion rolls back both provider and usage identity", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
  const legacy = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "alice@example.com",
    displayName: "Historic label",
    providerSpecificData: { workspaceId: "acct-shared" },
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: legacy.id as string,
    tokens: { input: 10, output: 5 },
    timestamp: "2026-01-01T00:00:00.000Z",
  });

  const db = core.getDbInstance();
  const semanticState = () => ({
    provider: db
      .prepare("SELECT email, provider_specific_data FROM provider_connections WHERE id = ?")
      .get(legacy.id),
    usage: db
      .prepare(
        `SELECT COUNT(DISTINCT account_key) accounts, COUNT(*) requests,
                SUM(tokens_input + tokens_output) tokens, MAX(account_label) label
         FROM usage_history WHERE connection_id = ?`
      )
      .get(legacy.id),
  });
  const before = semanticState();
  db.exec(`CREATE TRIGGER reject_codex_promotion BEFORE UPDATE ON provider_connections
           BEGIN SELECT RAISE(ABORT, 'forced provider update failure'); END`);

  await assert.rejects(
    providersDb.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      email: "alice@example.com",
      providerSpecificData: { workspaceId: "acct-shared", chatgptUserId: "user-alice" },
    }),
    /forced provider update failure/
  );

  assert.deepEqual(semanticState(), before);
});
