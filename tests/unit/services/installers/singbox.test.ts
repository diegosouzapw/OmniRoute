import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-singbox-installer-"));
const FAKE_BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-singbox-fake-bin-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const originalPath = process.env.PATH ?? "";
process.env.PATH = `${FAKE_BIN_DIR}:${originalPath}`;

const fakeNpmScript = `#!/bin/sh
set -e
CMD="$1"
shift
if [ "$CMD" = "view" ]; then
  echo "1.10.0"
  exit 0
fi
exit 0
`;
const fakeNpmPath = path.join(FAKE_BIN_DIR, "npm");
fs.writeFileSync(fakeNpmPath, fakeNpmScript, { mode: 0o755 });

execSync("which npm", { env: process.env });

// DB bootstrap
const core = await import("../../../../src/lib/db/core.ts");
const db = core.getDbInstance();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('singbox', 'not_installed', 20140, 0, 0, 0)`
).run();

const singbox = await import("../../../../src/lib/services/installers/singbox.ts");

test("singbox installer: getInstalledVersion returns null when not installed", async () => {
  const version = await singbox.getInstalledVersion();
  assert.equal(version, null);
});

test("singbox installer: install creates default config and updates version_manager DB", async () => {
  const result = await singbox.install("1.10.0");
  assert.equal(result.installedVersion, "1.10.0");
  assert.ok(fs.existsSync(singbox.getConfigPath()));
  assert.ok(fs.existsSync(singbox.getBinPath()));

  const row = db.prepare("SELECT * FROM version_manager WHERE tool = 'singbox'").get() as { status?: string; port?: number } | undefined;
  assert.ok(row);
  assert.equal(row?.status, "stopped");
  assert.equal(row?.port, 20140);
});

test("singbox installer: resolveSpawnArgs builds executable command", () => {
  const spawnArgs = singbox.resolveSpawnArgs(20140);
  assert.equal(spawnArgs.command, singbox.getBinPath());
  assert.deepEqual(spawnArgs.args, ["run", "-c", singbox.getConfigPath()]);
  assert.equal(spawnArgs.env.SINGBOX_PORT, "20140");
});
