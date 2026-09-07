import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-llmlingua-installer-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// DB bootstrap
const core = await import("../../../../src/lib/db/core.ts");
const db = core.getDbInstance();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('llmlingua', 'not_installed', 20135, 0, 0, 0)`
).run();

const llmlingua = await import("../../../../src/lib/services/installers/llmlingua.ts");

test("llmlingua installer: getInstalledVersion returns null when not installed", async () => {
  const version = await llmlingua.getInstalledVersion();
  assert.equal(version, null);
});

test("llmlingua installer: install creates server script and updates version_manager DB", async () => {
  const result = await llmlingua.install("2.0.5");
  assert.equal(result.installedVersion, "2.0.5");
  assert.ok(fs.existsSync(llmlingua.getServerScriptPath()));

  const row = db.prepare("SELECT * FROM version_manager WHERE tool = 'llmlingua'").get() as { status?: string; port?: number } | undefined;
  assert.ok(row);
  assert.equal(row?.status, "stopped");
  assert.equal(row?.port, 20135);
});

test("llmlingua installer: resolveSpawnArgs builds node server spawn arguments", () => {
  const spawnArgs = llmlingua.resolveSpawnArgs(20135);
  assert.equal(spawnArgs.command, process.execPath);
  assert.deepEqual(spawnArgs.args, [llmlingua.getServerScriptPath()]);
  assert.equal(spawnArgs.env.PORT, "20135");
});
