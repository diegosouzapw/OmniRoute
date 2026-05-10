import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const ROOT_DIR = path.resolve(".");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PORT = process.env.PORT;
const ORIGINAL_API_PORT = process.env.API_PORT;
const ORIGINAL_DASHBOARD_PORT = process.env.DASHBOARD_PORT;
const ORIGINAL_STORAGE_ENCRYPTION_KEY = process.env.STORAGE_ENCRYPTION_KEY;

interface DoctorCheck {
  name: string;
  status: string;
}

interface DoctorResult {
  checks: DoctorCheck[];
}

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-doctor-"));
}

async function withDoctorEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  delete process.env.PORT;
  delete process.env.API_PORT;
  delete process.env.DASHBOARD_PORT;
  delete process.env.STORAGE_ENCRYPTION_KEY;

  try {
    await fn(dataDir);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

    if (ORIGINAL_PORT === undefined) delete process.env.PORT;
    else process.env.PORT = ORIGINAL_PORT;

    if (ORIGINAL_API_PORT === undefined) delete process.env.API_PORT;
    else process.env.API_PORT = ORIGINAL_API_PORT;

    if (ORIGINAL_DASHBOARD_PORT === undefined) delete process.env.DASHBOARD_PORT;
    else process.env.DASHBOARD_PORT = ORIGINAL_DASHBOARD_PORT;

    if (ORIGINAL_STORAGE_ENCRYPTION_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
    else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_ENCRYPTION_KEY;
  }
}

function getCheck(result: DoctorResult, name: string) {
  return result.checks.find((check) => check.name === name);
}

test("doctor reports warnings but no failures when database is not initialized", async () => {
  await withDoctorEnv(async () => {
    const { collectDoctorChecks } = await import("../../bin/cli/commands/doctor.mjs");

    const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });

    assert.equal(result.summary.fail, 0);
    assert.equal(getCheck(result, "Database")?.status, "warn");
  });
});

test("doctor fails invalid configured ports", async () => {
  await withDoctorEnv(async () => {
    process.env.PORT = "99999";
    const { collectDoctorChecks } = await import("../../bin/cli/commands/doctor.mjs");

    const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });

    assert.equal(getCheck(result, "Config")?.status, "fail");
    assert.ok(result.summary.fail >= 1);
  });
});

test("doctor fails when encrypted credentials exist without storage key", async () => {
  await withDoctorEnv(async (dataDir) => {
    const dbPath = path.join(dataDir, "storage.sqlite");
    const db = new Database(dbPath);
    db.prepare(
      `CREATE TABLE provider_connections (
        id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        api_key TEXT,
        access_token TEXT,
        refresh_token TEXT,
        id_token TEXT
      )`
    ).run();
    db.prepare("INSERT INTO provider_connections (id, provider, api_key) VALUES (?, ?, ?)").run(
      "conn-1",
      "openai",
      "enc:v1:00112233445566778899aabbccddeeff:00:00112233445566778899aabbccddeeff"
    );
    db.close();

    const { collectDoctorChecks } = await import("../../bin/cli/commands/doctor.mjs");
    const result = await collectDoctorChecks({ rootDir: ROOT_DIR }, { skipLiveness: true });

    assert.equal(getCheck(result, "Storage/encryption")?.status, "fail");
  });
});
