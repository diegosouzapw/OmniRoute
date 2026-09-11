import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-last-error-"));
const testDataDir = path.join(testRoot, "data");
const testPluginsDir = path.join(testRoot, "plugins");
const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  OMNIROUTE_PLUGINS_DIR: process.env.OMNIROUTE_PLUGINS_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};
fs.mkdirSync(testDataDir, { recursive: true });
fs.mkdirSync(testPluginsDir, { recursive: true });
process.env.DATA_DIR = testDataDir;
process.env.OMNIROUTE_PLUGINS_DIR = testPluginsDir;
process.env.API_KEY_SECRET = "provider-last-error-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const loggerResource = await import("../../../src/shared/utils/loggerResource.ts");
const { runAsProbe } = await import("../../../src/shared/utils/probeOrigin.ts");
const { writeTerminalStatus } = await import("../../../src/shared/utils/terminalStatus.ts");
const { markAccountUnavailable } = await import("../../../src/sse/services/auth.ts");

function restoreEnv(name: keyof typeof originalEnv): void {
  const original = originalEnv[name];
  if (original === undefined) delete process.env[name];
  else process.env[name] = original;
}

function readLastError(connectionId: string): string | null {
  const row = core
    .getDbInstance()
    .prepare("SELECT last_error FROM provider_connections WHERE id = ?")
    .get(connectionId) as { last_error: string | null } | undefined;
  return row?.last_error ?? null;
}

test.after(async () => {
  core.resetDbInstance();
  await loggerResource.closeSharedLoggerResource();
  restoreEnv("DATA_DIR");
  restoreEnv("OMNIROUTE_PLUGINS_DIR");
  restoreEnv("API_KEY_SECRET");
  restoreEnv("DISABLE_SQLITE_AUTO_BACKUP");
  fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("normal and probe failures sanitize provider_connections.lastError at the write seam", async () => {
  const hostile =
    "provider failed access_token=provider-last-error-secret at /srv/private/provider.ts\n" +
    "    at dispatch (/srv/private/provider.ts:12:4)";
  const normal = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "normal last-error boundary",
    apiKey: "normal-last-error-test-key", // pragma: allowlist secret
    isActive: true,
    testStatus: "active",
  });
  const probe = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "probe last-error boundary",
    apiKey: "probe-last-error-test-key", // pragma: allowlist secret
    isActive: true,
    testStatus: "active",
  });
  const terminal = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "terminal last-error boundary",
    apiKey: "terminal-last-error-test-key", // pragma: allowlist secret
    isActive: true,
    testStatus: "active",
  });

  await markAccountUnavailable(normal.id, 500, hostile, "openai");
  await runAsProbe(() => markAccountUnavailable(probe.id, 500, hostile, "openai"));
  await writeTerminalStatus(
    terminal.id,
    {
      testStatus: "banned",
      isActive: false,
      lastError: hostile,
      lastErrorType: "forbidden",
      errorCode: "403",
    },
    "production"
  );

  const persisted = {
    normal: readLastError(normal.id),
    probe: readLastError(probe.id),
    terminal: readLastError(terminal.id),
  };
  assert.match(String(persisted.normal), /provider failed/i);
  assert.match(String(persisted.probe), /provider failed/i);
  assert.match(String(persisted.terminal), /provider failed/i);
  assert.doesNotMatch(
    JSON.stringify(persisted),
    /provider-last-error-secret|srv\/private|provider\.ts|\bat dispatch\b/i
  );
});
