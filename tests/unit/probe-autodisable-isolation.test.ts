import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-probe-autodisable-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { maybeAutoDisableBannedAccount } =
  await import("../../src/sse/services/autoDisableBannedAccount.ts");
const { runAsProbe } = await import("../../src/shared/utils/probeOrigin.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function readIsActive(connId: string): unknown {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { get: (id: string) => { is_active: unknown } | undefined };
  };
  return db.prepare("SELECT is_active FROM provider_connections WHERE id = ?").get(connId)
    ?.is_active;
}

async function setupConnection(): Promise<string> {
  await settingsDb.updateSettings({ autoDisableBannedAccounts: true });
  const conn = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "probe-autodisable",
    apiKey: "sk-probe-autodisable", // pragma: allowlist secret
    isActive: true,
    testStatus: "active",
  });
  return String((conn as { id: string }).id);
}

const PROBE_INPUT = {
  provider: "openai",
  authType: "apikey",
  connectionProvider: "openai",
  permanent: true,
};

test("probe-origin permanent failure never disables the connection", async () => {
  const connId = await setupConnection();
  await runAsProbe(() => maybeAutoDisableBannedAccount({ connectionId: connId, ...PROBE_INPUT }));
  assert.equal(readIsActive(connId), 1);
});

test("real-path permanent failure still disables (setting ON)", async () => {
  const connId = await setupConnection();
  await maybeAutoDisableBannedAccount({ connectionId: connId, ...PROBE_INPUT });
  assert.equal(readIsActive(connId), 0);
});
