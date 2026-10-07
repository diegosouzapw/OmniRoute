// #3368 PR6 — web-session (cookie) bulk import must dedupe credentials.
// Re-importing the same cookie/token (even under a different name) must UPDATE
// the existing connection, not insert a duplicate row — mirroring the apikey
// dedup behavior (#3023). This test fails before the cookie-dedup branch exists.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cookie-dedup-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#3368 cookie dedup: re-importing the same cookie under a different name updates, not duplicates", async () => {
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Import A",
    apiKey: null,
    providerSpecificData: { cookie: "session=SAME_COOKIE_VALUE" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Import B (same cookie)",
    apiKey: null,
    providerSpecificData: { cookie: "session=SAME_COOKIE_VALUE" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  assert.equal(conns.length, 1, "same cookie value must dedupe to a single connection");
});

test("#3368 cookie dedup: a different cookie creates a separate connection", async () => {
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Account 1",
    apiKey: null,
    providerSpecificData: { cookie: "session=COOKIE_ONE" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Account 2",
    apiKey: null,
    providerSpecificData: { cookie: "session=COOKIE_TWO" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  assert.equal(conns.length, 2, "distinct cookies must remain distinct connections");
});

test("#3368 cookie dedup: token-kind credential (no `cookie` key) also dedupes by value", async () => {
  await providersDb.createProviderConnection({
    provider: "kilo-code",
    authType: "cookie",
    name: "Token A",
    apiKey: null,
    providerSpecificData: { token: "TOK_123", userToken: "TOK_123" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "kilo-code",
    authType: "cookie",
    name: "Token A re-import",
    apiKey: null,
    providerSpecificData: { token: "TOK_123", userToken: "TOK_123" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "kilo-code" });
  assert.equal(conns.length, 1, "same token value must dedupe even without a cookie key");
});

test("#3368 cookie dedup: a name-based upsert still applies when NEITHER side has a credential", async () => {
  // INVERTED by #15159 / B-01 — read the note below before "restoring" this.
  //
  // This case used to be: same provider+name with cookie=FIRST then
  // cookie=ROTATED, asserting one row ("name-based upsert must not duplicate").
  // That assertion encoded a data-loss bug. `name` is a user-editable display
  // label, so matching on it returned the wrong account's row, and the caller's
  // `merged = { ...decryptedExisting, ...data }` then overwrote that account's
  // stored cookie. Two accounts sharing a name is not an edge case; it is normal.
  //
  // The name lookup now survives only for rows with no derivable credential key,
  // which is the case this test covers. A rotated *cookie* under a stable name
  // deliberately gets its own row now — a caller can delete a stale row, but
  // cannot recover a session that was already overwritten.
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Stable Name",
    apiKey: null,
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Stable Name",
    apiKey: null,
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  assert.equal(conns.length, 1, "with no credential on either side, the name is all there is");
});

test("#15159 B-01: same name + a rotated cookie is a NEW row, not an overwrite", async () => {
  // The inverse of the case above, and the actual defect. Asserted explicitly so
  // the trade-off is visible in the suite rather than only in the PR body: a
  // rotated cookie under a stable name now leaves the original row intact.
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Stable Name",
    apiKey: null,
    providerSpecificData: { cookie: "session=FIRST" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Stable Name",
    apiKey: null,
    providerSpecificData: { cookie: "session=ROTATED" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  assert.equal(
    conns.length,
    2,
    "a different cookie is a different account; overwriting the first is unrecoverable"
  );
});
