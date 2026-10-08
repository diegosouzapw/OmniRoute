// tests/unit/db-provider-cookie-name-collision-15159.test.ts
// TDD regression coverage for B-01 (#15159): a cookie connection was matched by
// NAME before its credential, so re-importing under an existing name silently
// overwrote a *different* account's stored session.
//
// findExistingCookieConnection() (src/lib/db/providers.ts:445-472) tried the name
// first:
//
//   // 1) Name-based upsert for parity with the apikey path.
//   if (name) { ...by name...; if (byName) return byName; }
//   // 2) Credential-value dedup against existing cookie rows.
//   const newCredKey = webSessionCredentialKey(...);
//
// The caller then does `merged = { ...decryptedExisting, ...data }`, so returning
// the wrong row destroys the first account's cookie on disk. `name` is a
// user-editable label, not an identity — two accounts legitimately share one.
//
// This is the same hazard the OAuth branch of this very function already fixed
// (providers.ts:532-540): "two different IdPs ... can share the same email
// address; matching on email alone would silently overwrite the other account's
// connection on the second login." The cookie branch was never given the same
// treatment.
//
// The credential IS the identity. A rotated cookie now yields a second row rather
// than destroying an unrelated account — the caller can delete the stale row;
// they cannot recover a session that was overwritten.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-b01-cookie-name-"));
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

// ---------------------------------------------------------------------------
// The defect
// ---------------------------------------------------------------------------

test("B-01: same name + a DIFFERENT cookie keeps both accounts", async () => {
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Claude", // a display label, not an identity
    apiKey: null,
    providerSpecificData: { cookie: "session=ACCOUNT_ONE_SESSION" },
    isActive: true,
  });

  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Claude", // different account, same label
    apiKey: null,
    providerSpecificData: { cookie: "session=ACCOUNT_TWO_SESSION" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "qwen-ai" });

  assert.equal(
    conns.length,
    2,
    "two distinct cookies must remain two connections even when they share a name — " +
      "the first account's session must not be overwritten"
  );
});

test("B-01: the first account's cookie survives a same-named second import", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Shared Label",
    apiKey: null,
    providerSpecificData: { cookie: "session=KEEP_ME" },
    isActive: true,
  });

  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Shared Label",
    apiKey: null,
    providerSpecificData: { cookie: "session=OTHER" },
    isActive: true,
  });

  const byId = await providersDb.getProviderConnectionById(String(first.id));
  assert.ok(byId, "the first connection must still exist");

  const rows = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  const survivor = rows.find((c) => String(c.id) === String(first.id));
  assert.ok(survivor, "the first connection must still be listed");

  const raw = (survivor as Record<string, unknown>).providerSpecificData;
  const cookie =
    typeof raw === "string"
      ? (JSON.parse(raw) as Record<string, unknown>).cookie
      : (raw as Record<string, unknown>)?.cookie;

  assert.equal(
    cookie,
    "session=KEEP_ME",
    "the original account's stored credential must be intact — overwriting it is unrecoverable"
  );
});

test("B-01: the collision is not specific to cookies named like another provider", async () => {
  // A generic, very plausible display label — not an exotic one.
  await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "cookie",
    name: "Account",
    apiKey: null,
    providerSpecificData: { cookie: "session=ONE" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "cookie",
    name: "Account",
    apiKey: null,
    providerSpecificData: { cookie: "session=TWO" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "cursor" });
  assert.equal(conns.length, 2);
});

test("B-01: a credential with no `cookie` key also stops colliding by name", async () => {
  await providersDb.createProviderConnection({
    provider: "kilo-code",
    authType: "cookie",
    name: "Token Slot",
    apiKey: null,
    providerSpecificData: { token: "TOK_A", userToken: "TOK_A" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "kilo-code",
    authType: "cookie",
    name: "Token Slot",
    apiKey: null,
    providerSpecificData: { token: "TOK_B", userToken: "TOK_B" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "kilo-code" });
  assert.equal(conns.length, 2, "distinct token values are distinct credentials");
});

// ---------------------------------------------------------------------------
// Dedupe that MUST keep working — the #3368 intent
// ---------------------------------------------------------------------------

test("B-01: the same cookie still dedupes even under a different name", async () => {
  // This is what #3368 actually wanted. It is already handled by the
  // credential-value loop, so the fix does not regress it.
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Import A",
    apiKey: null,
    providerSpecificData: { cookie: "session=SAME" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Import B (same cookie)",
    apiKey: null,
    providerSpecificData: { cookie: "session=SAME" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  assert.equal(conns.length, 1, "identical credentials must still dedupe to one connection");
});

test("B-01: the same cookie + the same name still dedupes", async () => {
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Stable",
    apiKey: null,
    providerSpecificData: { cookie: "session=IDENTICAL" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Stable",
    apiKey: null,
    providerSpecificData: { cookie: "session=IDENTICAL" },
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  assert.equal(conns.length, 1, "an unchanged re-import is a no-op, not a duplicate");
});

test("B-01: identical credentials dedupe across a provider boundary only within one provider", async () => {
  // Guards against an over-broad fix that dedupes across providers.
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "Same Name",
    apiKey: null,
    providerSpecificData: { cookie: "session=SHARED_VALUE" },
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "cookie",
    name: "Same Name",
    apiKey: null,
    providerSpecificData: { cookie: "session=SHARED_VALUE" },
    isActive: true,
  });

  const qwen = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  const cursor = await providersDb.getProviderConnections({ provider: "cursor" });
  assert.equal(qwen.length, 1);
  assert.equal(cursor.length, 1, "a different provider is a different connection space");
});

test("B-01: a name-only re-import with no credential at all still upserts", async () => {
  // The name-first branch was also serving rows whose credential key cannot be
  // derived. A re-import carrying no providerSpecificData has nothing to match on,
  // so it must still land on the same-named row rather than piling up blanks.
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "No Credential",
    apiKey: null,
    isActive: true,
  });
  await providersDb.createProviderConnection({
    provider: "qwen-ai",
    authType: "cookie",
    name: "No Credential",
    apiKey: null,
    isActive: true,
  });

  const conns = await providersDb.getProviderConnections({ provider: "qwen-ai" });
  assert.equal(conns.length, 1, "with no credential to compare, the name is all there is");
});
