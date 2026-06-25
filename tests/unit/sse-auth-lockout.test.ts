import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sse-lockout-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "sse-auth-lockout-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fallback.clearAllModelLockouts();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, overrides: any = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey || `sk-test-${Math.random().toString(16).slice(2, 10)}`,
    accessToken: overrides.accessToken,
    refreshToken: overrides.refreshToken,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    rateLimitedUntil: overrides.rateLimitedUntil,
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fallback.clearAllModelLockouts();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("markAccountUnavailable uses a connection-wide cooldown for non-local 404 errors", async () => {
  const connection = await seedConnection("openai", {
    name: "remote-404",
    providerSpecificData: { baseUrl: "https://api.openai.com/v1" },
  });

  const result = await auth.markAccountUnavailable(
    connection.id,
    404,
    "model not found",
    "openai",
    "gpt-missing"
  );
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.equal(updated.testStatus, "unavailable");
  assert.ok(updated.rateLimitedUntil);
});

test("markAccountUnavailable auto-disables permanently banned accounts when enabled", async () => {
  await settingsDb.updateSettings({ autoDisableBannedAccounts: true });
  const connection = await seedConnection("openai", { name: "permanent-ban" });

  const result = await auth.markAccountUnavailable(
    connection.id,
    401,
    "Verify your account to continue",
    "openai",
    "gpt-4o"
  );
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(result.shouldFallback, true);
  assert.equal(updated.isActive, false);
  assert.equal(updated.testStatus, "banned");
});

test("markAccountUnavailable leaves banned accounts active when auto-disable is disabled", async () => {
  await settingsDb.updateSettings({ autoDisableBannedAccounts: false });
  const connection = await seedConnection("openai", { name: "permanent-ban-disabled" });

  const result = await auth.markAccountUnavailable(
    connection.id,
    401,
    "Verify your account to continue",
    "openai",
    "gpt-4o"
  );
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(result.shouldFallback, true);
  assert.equal(updated.isActive, true);
  assert.equal(updated.testStatus, "banned");
});

test("markAccountUnavailable swallows auto-disable persistence errors", async () => {
  await settingsDb.updateSettings({ autoDisableBannedAccounts: true });
  const connection = await seedConnection("openai", { name: "permanent-ban-update-fails" });
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  db.prepare = (sql) => {
    const statement = originalPrepare(sql);
    if (!String(sql).includes("UPDATE provider_connections SET")) return statement;
    return new Proxy(statement, {
      get(target, prop, receiver) {
        if (prop !== "run") return Reflect.get(target, prop, receiver);
        return (params) => {
          if (params && typeof params === "object" && params.isActive === 0) {
            throw new Error("persist disable failed");
          }
          return target.run(params);
        };
      },
    });
  };

  try {
    const result = await auth.markAccountUnavailable(
      connection.id,
      401,
      "Verify your account to continue",
      "openai",
      "gpt-4o"
    );
    const updated = await providersDb.getProviderConnectionById(connection.id);

    assert.equal(result.shouldFallback, true);
    assert.equal(updated.isActive, true);
    assert.equal(updated.testStatus, "banned");
  } finally {
    db.prepare = originalPrepare;
  }
});

test("markAccountUnavailable persists in-memory model lockout for combo transient 429", async () => {
  const connection = await seedConnection("openai", { name: "combo-transient-test" });
  const model = "gpt-4o";
  const connId = connection.id as string;

  assert.equal(fallback.isModelLocked("openai", connId, model), false);

  await auth.markAccountUnavailable(connId, 429, "Rate limit exceeded", "openai", model, null, {
    persistUnavailableState: false,
  });

  assert.equal(fallback.isModelLocked("openai", connId, model), true);
  assert.equal(fallback.isModelLocked("openai", connId, "gpt-4o-mini"), false);

  const otherConn = await seedConnection("openai", { name: "other-conn" });
  assert.equal(fallback.isModelLocked("openai", otherConn.id as string, model), false);

  const updated = await providersDb.getProviderConnectionById(connId);
  assert.equal(updated.rateLimitedUntil == null, true);
  assert.notEqual(updated.testStatus, "unavailable");
});
