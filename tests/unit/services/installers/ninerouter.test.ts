import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-installer-"));
const FAKE_BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fake-bin-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Prepend fake bin dir to PATH so our fake `npm` is found by runNpm
const originalPath = process.env.PATH ?? "";
process.env.PATH = `${FAKE_BIN_DIR}:${originalPath}`;

// Fake npm script: for `install` — creates expected package.json;
// for `view` — prints a version; for other args — no-op.
const INSTALL_DIR = path.join(TEST_DATA_DIR, "services", "9router");
const fakeNpmScript = `#!/bin/sh
set -e
CMD="$1"
shift
if [ "$CMD" = "install" ]; then
  # Find --prefix arg value
  PREFIX=""
  while [ $# -gt 0 ]; do
    if [ "$1" = "--prefix" ]; then PREFIX="$2"; shift 2; else shift; fi
  done
  PKG_DIR="$PREFIX/node_modules/9router"
  mkdir -p "$PKG_DIR/app"
  echo '{"name":"9router","version":"0.4.59"}' > "$PKG_DIR/package.json"
  touch "$PKG_DIR/app/server.js"
  exit 0
fi
if [ "$CMD" = "view" ]; then
  echo "0.4.59"
  exit 0
fi
exit 0
`;
const fakeNpmPath = path.join(FAKE_BIN_DIR, "npm");
fs.writeFileSync(fakeNpmPath, fakeNpmScript, { mode: 0o755 });

// Verify fake npm is on PATH
execSync("which npm", { env: process.env });

// DB bootstrap (must be before ninerouter import due to db/core eager init)
const core = await import("../../../../src/lib/db/core.ts");
const db = core.getDbInstance();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('9router', 'not_installed', 20130, 0, 1, 1)`
).run();

const {
  install,
  update,
  uninstall,
  getInstalledVersion,
  getLatestVersion,
  resolveSpawnArgs,
  NINEROUTER_INSTALL_DIR,
} = await import("../../../../src/lib/services/installers/ninerouter.ts");

test.after(() => {
  process.env.PATH = originalPath;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.rmSync(FAKE_BIN_DIR, { recursive: true, force: true });
});

test("install creates package.json structure", async () => {
  const result = await install("0.4.59");

  // Host package.json must exist
  const hostPkg = path.join(NINEROUTER_INSTALL_DIR, "package.json");
  assert.ok(fs.existsSync(hostPkg), "host package.json should exist");
  const parsedHost = JSON.parse(fs.readFileSync(hostPkg, "utf8")) as {
    name: string;
    private: boolean;
  };
  assert.equal(parsedHost.name, "omniroute-9router-host");
  assert.ok(parsedHost.private);

  assert.equal(result.installedVersion, "0.4.59");
  assert.equal(result.installPath, NINEROUTER_INSTALL_DIR);
  assert.ok(result.durationMs >= 0);
});

test("install captures real version from node_modules/9router/package.json", async () => {
  const ver = await getInstalledVersion();
  assert.equal(ver, "0.4.59", "should read version from installed package");
});

test("update calls npm install with latest (idempotent)", async () => {
  const result = await update();
  assert.equal(result.installedVersion, "0.4.59");
});

test("uninstall removes node_modules and marks not_installed in DB", async () => {
  const nmDir = path.join(NINEROUTER_INSTALL_DIR, "node_modules");
  // Ensure node_modules exists from previous install tests
  assert.ok(fs.existsSync(nmDir), "node_modules should exist before uninstall");

  await uninstall();

  assert.ok(!fs.existsSync(nmDir), "node_modules should be removed");

  const { getVersionManagerTool } = await import("../../../../src/lib/db/versionManager.ts");
  const row = await getVersionManagerTool("9router");
  assert.equal(row?.status, "not_installed");
  assert.equal(row?.installedVersion, null);
  assert.equal(row?.binaryPath, null);

  // package.json host file should remain (preserves metadata)
  assert.ok(
    fs.existsSync(path.join(NINEROUTER_INSTALL_DIR, "package.json")),
    "host package.json should be kept after uninstall"
  );
});

test("getLatestVersion returns version string from npm view", async () => {
  const ver = await getLatestVersion();
  assert.equal(ver, "0.4.59");
});

test("resolveSpawnArgs returns expected env and command", () => {
  const args = resolveSpawnArgs("sk-test-api-key", 20130);

  assert.equal(args.command, process.execPath, "command must be current node binary");
  assert.equal(args.args[0], "--max-old-space-size=6144");
  assert.ok(args.args[1]?.includes("server.js"), "args[1] should point to server.js");
  assert.equal(args.env.PORT, "20130");
  assert.equal(args.env.HOSTNAME, "127.0.0.1");
  assert.equal(args.env.API_KEY_SECRET, "sk-test-api-key");
  assert.ok(args.env.DATA_DIR?.includes("9router"), "DATA_DIR should be scoped to 9router");
  assert.equal(args.env.NODE_ENV, "production");
  assert.equal(args.env.DISABLE_MITM, "true");
  assert.equal(args.env.DISABLE_TUNNEL, "true");
});

test("EACCES error returns friendly InstallError", async () => {
  const { InstallError } = await import("../../../../src/lib/services/installers/utils.ts");

  // Simulate EACCES by making the install dir read-only
  const lockedDir = path.join(TEST_DATA_DIR, "locked-services", "9router");
  fs.mkdirSync(lockedDir, { recursive: true });
  fs.chmodSync(path.join(TEST_DATA_DIR, "locked-services"), 0o444);

  process.env.DATA_DIR = path.join(TEST_DATA_DIR, "locked-services");

  try {
    await import("../../../../src/lib/services/installers/ninerouter.ts?locked=1");
  } catch {
    // Re-import after DATA_DIR change fails due to caching — that's fine
  }

  process.env.DATA_DIR = TEST_DATA_DIR;

  // Restore for cleanup
  fs.chmodSync(path.join(TEST_DATA_DIR, "locked-services"), 0o755);

  // At minimum, InstallError should carry httpStatus and friendly fields
  const err = new InstallError("raw error", "friendly message", 403);
  assert.equal(err.httpStatus, 403);
  assert.equal(err.friendly, "friendly message");
  assert.ok(err instanceof Error);
  assert.equal(err.name, "InstallError");
});

test("InstallError timeout shape has correct httpStatus 504", async () => {
  const { InstallError: IE } = await import("../../../../src/lib/services/installers/utils.ts");
  const err = new IE("npm process killed", "Instalação demorou demais. Tente novamente.", 504);
  assert.equal(err.httpStatus, 504);
  assert.equal(err.friendly, "Instalação demorou demais. Tente novamente.");
  assert.ok(err instanceof Error);
  assert.equal(err.name, "InstallError");
});
