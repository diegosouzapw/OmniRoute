/**
 * @file Unit tests for tokens_compressed tracking in call logs.
 *
 * Assumes migrations work. Tests functional behavior only.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");

async function freshImport(modulePath: string) {
  return import(`${modulePath}?q=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function setupTempDataDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-comp"));
  process.env.DATA_DIR = dir;
  process.env.OMNIROUTE_MIGRATIONS_DIR = path.join(root, "src/lib/db/migrations");
  process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  return dir;
}

test("tokensCompressed round-trips through saveCallLog → getCallLogs", async () => {
  const dir = setupTempDataDir();
  try {
    const core = await freshImport("../../src/lib/db/core.ts");
    core.resetDbInstance();

    const db = core.getDbInstance();
    const runner = await freshImport("../../src/lib/db/migrationRunner.ts");
    runner.runMigrations(db);

    const callLogs = await freshImport("../../src/lib/usage/callLogs.ts");

    // Log without compression
    await callLogs.saveCallLog({
      id: "log-null",
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "gpt-4",
      provider: "openai",
      duration: 1000,
      tokens: { input: 120, output: 45 },
      requestBody: null,
      responseBody: null,
    });

    // Log with compression
    await callLogs.saveCallLog({
      id: "log-350",
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "gpt-4",
      provider: "openai",
      duration: 2000,
      tokens: { input: 1000, output: 500 },
      tokensCompressed: 350,
      requestBody: null,
      responseBody: null,
    });

    const logs = await callLogs.getCallLogs({
      limit: 10,
    });

    const logNull = logs.find(
      (l: { id: string }) => l.id === "log-null"
    );
    const logComp = logs.find(
      (l: { id: string }) => l.id === "log-350"
    );

    // null when no compression
    assert.equal(
      logNull.tokens?.compressed,
      null,
      "uncompressed log should have null compressed"
    );

    // Positive value when compressed
    assert.equal(
      logComp.tokens?.compressed,
      350,
      "compressed log should store exact token delta"
    );

    // Input tokens unaffected
    assert.equal(logComp.tokens?.in, 1000);
    assert.equal(logComp.tokens?.out, 500);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
