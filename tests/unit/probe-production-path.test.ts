import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-probe-prodpath-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function readConnectionRow(connId: string) {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => {
      get: (id: string) =>
        | {
            is_active: unknown;
            test_status: unknown;
            rate_limited_until: unknown;
          }
        | undefined;
    };
  };
  return db
    .prepare(
      "SELECT is_active, test_status, rate_limited_until FROM provider_connections WHERE id = ?"
    )
    .get(connId);
}

test("real-path permanent failure keeps the full production behavior", async () => {
  await settingsDb.updateSettings({ autoDisableBannedAccounts: true });
  const conn = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "probe-prodpath",
    apiKey: "sk-probe-prodpath", // pragma: allowlist secret
    isActive: true,
    testStatus: "active",
  });
  const connId = String((conn as { id: string }).id);

  const res = await markAccountUnavailable(connId, 403, "this account is deactivated", "openai");
  assert.equal(res.shouldFallback, true);

  const row = readConnectionRow(connId);
  assert.equal(row?.is_active, 0, "is_active flipped off (auto-disable, setting ON)");
  assert.equal(row?.test_status, "banned", "terminal status written");
  assert.equal(row?.rate_limited_until, null, "no persisted cooldown on the terminal path");
});
