import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bifrost-installer-"));
const FAKE_BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bifrost-fake-bin-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const originalPath = process.env.PATH ?? "";
process.env.PATH = `${FAKE_BIN_DIR}:${originalPath}`;

const INSTALL_DIR = path.join(TEST_DATA_DIR, "services", "bifrost");
const fakeNpmScript = `#!/bin/sh
set -e
CMD="$1"
shift
if [ "$CMD" = "install" ]; then
  PREFIX=""
  while [ $# -gt 0 ]; do
    if [ "$1" = "--prefix" ]; then PREFIX="$2"; shift 2; else shift; fi
  done
  if [ -z "$PREFIX" ]; then PREFIX="$npm_config_prefix"; fi
  PKG_DIR="$PREFIX/node_modules/@maximhq/bifrost"
  mkdir -p "$PKG_DIR"
  echo '{"name":"@maximhq/bifrost","version":"1.6.3"}' > "$PKG_DIR/package.json"
  touch "$PKG_DIR/bin.js"
  exit 0
fi
if [ "$CMD" = "view" ]; then
  echo "1.6.3"
  exit 0
fi
exit 0
`;
const fakeNpmPath = path.join(FAKE_BIN_DIR, "npm");
fs.writeFileSync(fakeNpmPath, fakeNpmScript, { mode: 0o755 });

execSync("which npm", { env: process.env });

// DB bootstrap (must be before bifrost import due to db/core eager init)
const core = await import("../../../../src/lib/db/core.ts");
const db = core.getDbInstance();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('bifrost', 'not_installed', 8080, 0, 1, 1)`
).run();

const {
  install,
  update,
  getInstalledVersion,
  getLatestVersion,
  resolveSpawnArgs,
  BIFROST_DEFAULT_PORT,
  BIFROST_INSTALL_DIR,
} = await import("../../../../src/lib/services/installers/bifrost.ts");

test.after(() => {
  process.env.PATH = originalPath;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.rmSync(FAKE_BIN_DIR, { recursive: true, force: true });
});

test("BIFROST_DEFAULT_PORT is 8080", () => {
  assert.equal(BIFROST_DEFAULT_PORT, 8080);
});

test("install creates host package.json structure", async () => {
  const result = await install("1.6.3");

  const hostPkg = path.join(BIFROST_INSTALL_DIR, "package.json");
  assert.ok(fs.existsSync(hostPkg), "host package.json should exist");
  const parsedHost = JSON.parse(fs.readFileSync(hostPkg, "utf8")) as {
    name: string;
    private: boolean;
  };
  assert.equal(parsedHost.name, "omniroute-bifrost-host");
  assert.ok(parsedHost.private);

  assert.equal(result.installedVersion, "1.6.3");
  assert.equal(result.installPath, BIFROST_INSTALL_DIR);
  assert.ok(result.durationMs >= 0);
});

test("getInstalledVersion reads from node_modules/@maximhq/bifrost/package.json", async () => {
  const ver = await getInstalledVersion();
  assert.equal(ver, "1.6.3", "should read version from installed package");
});

test("update calls npm install with latest (idempotent)", async () => {
  const result = await update();
  assert.equal(result.installedVersion, "1.6.3");
});

test("getLatestVersion returns version string from npm view", async () => {
  const ver = await getLatestVersion();
  assert.equal(ver, "1.6.3");
});

test("resolveSpawnArgs shape: command is node, bin.js path, Go single-dash flags", () => {
  const args = resolveSpawnArgs(8080);

  assert.equal(args.command, process.execPath, "command must be current node binary");
  assert.ok(args.args[0]?.includes("bin.js"), "args[0] should point to bin.js");

  // Go-style single-dash flags
  const portIdx = args.args.indexOf("-port");
  assert.ok(portIdx !== -1, "must have -port flag");
  assert.equal(args.args[portIdx + 1], "8080");

  const hostIdx = args.args.indexOf("-host");
  assert.ok(hostIdx !== -1, "must have -host flag");
  assert.equal(args.args[hostIdx + 1], "127.0.0.1");

  const appDirIdx = args.args.indexOf("-app-dir");
  assert.ok(appDirIdx !== -1, "must have -app-dir flag");
  assert.ok(args.args[appDirIdx + 1]?.includes("bifrost"), "-app-dir must point into bifrost dir");

  const logLevelIdx = args.args.indexOf("-log-level");
  assert.ok(logLevelIdx !== -1, "must have -log-level flag");
  assert.equal(args.args[logLevelIdx + 1], "warn");

  // BIFROST_TRANSPORT_VERSION must be set in env
  assert.ok(
    typeof args.env.BIFROST_TRANSPORT_VERSION === "string" &&
      args.env.BIFROST_TRANSPORT_VERSION.length > 0,
    "BIFROST_TRANSPORT_VERSION must be set in env"
  );
});

test("resolveSpawnArgs with different port passes correct -port value", () => {
  const args = resolveSpawnArgs(9090);
  const portIdx = args.args.indexOf("-port");
  assert.ok(portIdx !== -1);
  assert.equal(args.args[portIdx + 1], "9090");
});

test("INSTALL_DIR constant points into DATA_DIR/services/bifrost", () => {
  assert.ok(BIFROST_INSTALL_DIR.includes("bifrost"), "install dir must include 'bifrost'");
  assert.ok(
    BIFROST_INSTALL_DIR.startsWith(TEST_DATA_DIR),
    "install dir must be under TEST_DATA_DIR"
  );
  assert.equal(INSTALL_DIR, BIFROST_INSTALL_DIR);
});
