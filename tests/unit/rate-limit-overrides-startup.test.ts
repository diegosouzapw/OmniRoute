import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rl-startup-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
const JSON_DB_FILE = path.join(TEST_DATA_DIR, "db.json");

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {
    // ignore — no instance open
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("startup migration stores rateLimitOverrides in rate_limit_overrides_json", () => {
  try {
    core.resetDbInstance();
  } catch {
    // ignore — no instance open
  }
  fs.writeFileSync(
    JSON_DB_FILE,
    JSON.stringify({
      providerConnections: [
        {
          id: "startup-store-1",
          provider: "openai",
          authType: "apikey",
          rateLimitOverrides: { rpm: 120 },
        },
      ],
    })
  );
  const backupDir = path.join(TEST_DATA_DIR, "db_backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const db = core.getDbInstance();
  try {
    const row = db
      .prepare("SELECT rate_limit_overrides_json FROM provider_connections WHERE id = ?")
      .get("startup-store-1") as { rate_limit_overrides_json: string | null } | undefined;
    assert.ok(row, "row must exist");
    assert.deepEqual(JSON.parse(row.rate_limit_overrides_json as string), { rpm: 120 });
  } finally {
    core.resetDbInstance();
  }
});

test("startup migration without overrides preserves existing rate_limit_overrides_json", () => {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO provider_connections (id, provider, rate_limit_overrides_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
  ).run(
    "startup-preserve-1",
    "openai",
    JSON.stringify({ rpm: 66 }),
    new Date().toISOString(),
    new Date().toISOString()
  );
  core.resetDbInstance();
  fs.writeFileSync(
    JSON_DB_FILE,
    JSON.stringify({
      providerConnections: [{ id: "startup-preserve-1", provider: "openai", authType: "apikey" }],
    })
  );
  const db2 = core.getDbInstance();
  try {
    const row = db2
      .prepare("SELECT rate_limit_overrides_json FROM provider_connections WHERE id = ?")
      .get("startup-preserve-1") as { rate_limit_overrides_json: string | null } | undefined;
    assert.ok(row, "row must exist");
    assert.deepEqual(JSON.parse(row.rate_limit_overrides_json as string), { rpm: 66 });
  } finally {
    core.resetDbInstance();
  }
});
