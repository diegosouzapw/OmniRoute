import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-ag-retry-v2-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");

type CreatedConnection = { id: string };

function connectionId(connection: unknown): string {
  assert.ok(connection && typeof connection === "object" && "id" in connection);
  const id = (connection as CreatedConnection).id;
  assert.equal(typeof id, "string");
  return id;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("round-robin same-model retry treats multi-exclude as fallback and skips all excluded accounts", async () => {
  await resetStorage();

  const first = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "first@example.test",
    accessToken: "tok-first",
    isActive: true,
    testStatus: "active",
    priority: 1,
  });
  const second = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "second@example.test",
    accessToken: "tok-second",
    isActive: true,
    testStatus: "active",
    priority: 2,
  });
  const third = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "third@example.test",
    accessToken: "tok-third",
    isActive: true,
    testStatus: "active",
    priority: 3,
  });

  const firstId = connectionId(first);
  const secondId = connectionId(second);
  const thirdId = connectionId(third);

  await providersDb.updateProviderConnection(firstId, {
    lastUsedAt: new Date(Date.now() - 1_000).toISOString(),
    consecutiveUseCount: 1,
  });
  await providersDb.updateProviderConnection(secondId, {
    lastUsedAt: new Date(Date.now() - 60_000).toISOString(),
    consecutiveUseCount: 1,
  });
  await providersDb.updateProviderConnection(thirdId, {
    lastUsedAt: new Date(Date.now() - 30_000).toISOString(),
    consecutiveUseCount: 1,
  });

  await settingsDb.updateSettings({ fallbackStrategy: "round-robin", stickyRoundRobinLimit: 3 });

  const selected = await auth.getProviderCredentials("antigravity", null, null, "gemini-3-pro", {
    excludeConnectionIds: [firstId, secondId],
  });

  assert.ok(selected, "expected an eligible non-excluded Antigravity account");
  assert.equal(selected.connectionId, thirdId);
});

test("Antigravity inferred Gemini family cooldown starts around 30s when no upstream hint exists", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "quota@example.test",
    accessToken: "tok-quota",
    isActive: true,
    testStatus: "active",
  });

  const before = Date.now();
  const result = await auth.markAccountUnavailable(
    connectionId(conn),
    429,
    "RESOURCE_EXHAUSTED: Resource has been exhausted (queries per minute limit was reached)",
    "antigravity",
    "gemini-3-pro"
  );
  const elapsedAllowanceMs = Date.now() - before;

  assert.equal(result.shouldFallback, true);
  assert.ok(
    result.cooldownMs >= 30_000 - elapsedAllowanceMs - 500,
    `expected inferred cooldown near 30s+, got ${result.cooldownMs}`
  );
  assert.ok(
    result.cooldownMs <= 65_000,
    `expected bounded initial cooldown, got ${result.cooldownMs}`
  );

  const otherGemini = await auth.getProviderCredentials(
    "antigravity",
    null,
    null,
    "gemini-2.5-pro"
  );
  assert.ok(otherGemini && "allRateLimited" in otherGemini && otherGemini.allRateLimited);
  assert.equal(otherGemini.cooldownScope, "model");
  assert.equal(otherGemini.lastErrorCode, 429);
});
