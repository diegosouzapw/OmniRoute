import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-14060-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiAuth = await import("../../src/shared/utils/apiAuth.ts");
const { loadHomeSettings } = await import("../../src/app/(dashboard)/home/loadHomeSettings.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Overwrite only the key_value table's root page so the boot probe tables stay readable. */
function corruptKeyValueTable() {
  const db = core.getDbInstance();
  const dbPath = (db as { name?: string }).name;
  assert.ok(typeof dbPath === "string" && dbPath.length > 0, "expected a file-backed db path");

  const pageSize = (db.pragma("page_size") as Array<{ page_size: number }>)[0].page_size;
  const rootPageRow = db
    .prepare("SELECT rootpage FROM sqlite_master WHERE type = 'table' AND name = 'key_value'")
    .get() as { rootpage: number } | undefined;
  assert.ok(rootPageRow?.rootpage, "expected to find key_value's rootpage in sqlite_master");

  core.resetDbInstance();

  const buf = fs.readFileSync(dbPath as string);
  const pageStart = (rootPageRow!.rootpage - 1) * pageSize;
  for (let i = pageStart; i < Math.min(buf.length, pageStart + pageSize); i++) {
    buf[i] = 0xff;
  }
  fs.writeFileSync(dbPath as string, buf);

  const reopened = core.getDbInstance();
  const bootHealthy = !!reopened
    .prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'provider_connections'"
    )
    .get();
  assert.equal(bootHealthy, true, "expected the boot probe's own tables to remain readable");
  core.resetDbInstance();
}

test("#14060: corrupted key_value keeps auth fail-closed and Home degrades without crashing", async () => {
  corruptKeyValueTable();

  // (a) Auth gate stays fail-closed: a loopback request on a protected path, with no
  // password configured, must still require auth when settings cannot be read.
  // Swallowing the error inside getSettings() returned password-less defaults and
  // made this `false` (auth disabled for loopback).
  const loopbackRequest = new Request("http://localhost:20128/api/providers");
  assert.equal(
    await apiAuth.isAuthRequired(loopbackRequest, { loopback: true }),
    true,
    "isAuthRequired() must fail closed when settings are unreadable"
  );
  // The first-password bootstrap write must not open up either.
  const bootstrapWrite = new Request("http://localhost:20128/api/settings/require-login", {
    method: "POST",
  });
  assert.equal(await apiAuth.isAuthRequired(bootstrapWrite, { loopback: true }), true);

  // getSettings() must keep surfacing the read error — its auth callers depend on it.
  await assert.rejects(() => settingsDb.getSettings());

  // (b) Home degrades to defaults instead of rejecting (the original 500).
  const homeSettings = await loadHomeSettings();
  assert.deepEqual(homeSettings, { setupComplete: false });
});

test("loadHomeSettings passes healthy settings through untouched", async () => {
  const result = await loadHomeSettings(async () => ({ setupComplete: true }));
  assert.deepEqual(result, { setupComplete: true });
});
