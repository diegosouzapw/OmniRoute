import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Permanent regression guard for #8200: a single recoverable 401 on a
// cookie-auth provider (perplexity-web) must NOT terminal-expire the only
// connection. Before the fix, resolveTerminalConnectionStatus() mapped ANY
// non-OAuth 401 to the TERMINAL testStatus "expired" (cooldownMs 0, no
// self-heal), which then made getProviderCredentials() filter the
// connection out on the very next request -> "No active credentials".

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8200-perplexity-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("BUG #8200: single perplexity-web 401 (cookie expiry) does not terminal-expire the only connection", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "perplexity-web",
    authType: "apikey",
    apiKey: "__Secure-next-auth.session-token=stale-cookie",
    isActive: true,
    testStatus: "active",
  });
  const connId = String(conn.id);

  await auth.markAccountUnavailable(
    connId,
    401,
    "Perplexity auth failed — session cookie may be expired. Re-paste your __Secure-next-auth.session-token.",
    "perplexity-web",
    "pplx-auto"
  );

  const after = await providersDb.getProviderConnectionById(connId);
  assert.equal(after.isActive, true, "connection row should stay active");
  assert.notEqual(
    after.testStatus,
    "expired",
    "a recoverable perplexity-web 401 must not be classified terminal 'expired'"
  );

  const credentials = await auth.getProviderCredentials("perplexity-web");
  assert.notEqual(
    credentials,
    null,
    "getProviderCredentials must still return the connection after exactly one 401"
  );
});

test("markAccountUnavailable keeps the existing 401->expired terminal mapping for plain apikey providers", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-expired",
    isActive: true,
    testStatus: "active",
  });
  const connId = String(conn.id);

  await auth.markAccountUnavailable(connId, 401, "unauthorized", "openai", "gpt-4.1");

  const after = await providersDb.getProviderConnectionById(connId);
  assert.equal(after.testStatus, "expired");
});
