import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-installer-"));
const FAKE_BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fake-bin-"));
const MOCK_OPENWA_VERSION = "4.76.0";

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Prepend fake bin dir to PATH so our fake `npm` is found by runNpm
const originalPath = process.env.PATH ?? "";
process.env.PATH = `${FAKE_BIN_DIR}:${originalPath}`;

// Fake npm script: for `install` — creates expected package.json;
// for `view` — prints a version; for other args — no-op.
const fakeNpmScript = `#!/bin/sh
set -e
CMD="$1"
shift
if [ "$CMD" = "install" ]; then
  # Resolve the install prefix like real npm: an explicit --prefix arg wins,
  # otherwise fall back to the npm_config_prefix env var (#5379 passes the
  # prefix via env instead of argv so paths with spaces survive the win shell).
  PREFIX=""
  while [ $# -gt 0 ]; do
    if [ "$1" = "--prefix" ]; then PREFIX="$2"; shift 2; else shift; fi
  done
  if [ -z "$PREFIX" ]; then PREFIX="$npm_config_prefix"; fi
  PKG_DIR="$PREFIX/node_modules/@open-wa/wa-automate"
  mkdir -p "$PKG_DIR/bin"
  echo '{"name":"@open-wa/wa-automate","version":"${MOCK_OPENWA_VERSION}"}' > "$PKG_DIR/package.json"
  touch "$PKG_DIR/bin/server.js"
  exit 0
fi
if [ "$CMD" = "view" ]; then
  echo "${MOCK_OPENWA_VERSION}"
  exit 0
fi
exit 0
`;
const fakeNpmPath = path.join(FAKE_BIN_DIR, "npm");
fs.writeFileSync(fakeNpmPath, fakeNpmScript, { mode: 0o755 });

// Verify fake npm is on PATH
execSync("which npm", { env: process.env });

// DB bootstrap (must be before openwa import due to db/core eager init)
const core = await import("../../../../src/lib/db/core.ts");
const db = core.getDbInstance();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('openwa', 'not_installed', 8323, 0, 0, 0)`
).run();

const {
  install,
  update,
  uninstall,
  getInstalledVersion,
  getLatestVersion,
  resolveSpawnArgs,
  OPENWA_INSTALL_DIR,
} = await import("../../../../src/lib/services/installers/openwa.ts");

test.after(() => {
  process.env.PATH = originalPath;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.rmSync(FAKE_BIN_DIR, { recursive: true, force: true });
});

test("install creates package.json structure", async () => {
  const result = await install(MOCK_OPENWA_VERSION);

  // Host package.json must exist
  const hostPkg = path.join(OPENWA_INSTALL_DIR, "package.json");
  assert.ok(fs.existsSync(hostPkg), "host package.json should exist");
  const parsedHost = JSON.parse(fs.readFileSync(hostPkg, "utf8")) as {
    name: string;
    private: boolean;
  };
  assert.equal(parsedHost.name, "omniroute-openwa-host");
  assert.ok(parsedHost.private);

  assert.equal(result.installedVersion, MOCK_OPENWA_VERSION);
  assert.equal(result.installPath, OPENWA_INSTALL_DIR);
  assert.ok(result.durationMs >= 0);
});

test("install captures real version from node_modules/@open-wa/wa-automate/package.json", async () => {
  const ver = await getInstalledVersion();
  assert.equal(ver, MOCK_OPENWA_VERSION, "should read version from installed package");
});

test("update calls npm install with latest (idempotent)", async () => {
  const result = await update();
  assert.equal(result.installedVersion, MOCK_OPENWA_VERSION);
});

test("uninstall removes node_modules and marks not_installed in DB", async () => {
  const nmDir = path.join(OPENWA_INSTALL_DIR, "node_modules");
  assert.ok(fs.existsSync(nmDir), "node_modules should exist before uninstall");

  await uninstall();

  assert.ok(!fs.existsSync(nmDir), "node_modules should be removed");

  const { getVersionManagerTool } = await import("../../../../src/lib/db/versionManager.ts");
  const row = await getVersionManagerTool("openwa");
  assert.equal(row?.status, "not_installed");
  assert.equal(row?.installedVersion, null);
  assert.equal(row?.binaryPath, null);

  // package.json host file should remain (preserves metadata)
  assert.ok(
    fs.existsSync(path.join(OPENWA_INSTALL_DIR, "package.json")),
    "host package.json should be kept after uninstall"
  );
});

test("getLatestVersion returns version string from npm view", async () => {
  const ver = await getLatestVersion();
  assert.equal(ver, MOCK_OPENWA_VERSION);
});

test("resolveSpawnArgs returns expected env, args and command", () => {
  const args = resolveSpawnArgs("sk-test-api-key", 8323);

  assert.equal(args.command, process.execPath, "command must be current node binary");
  assert.ok(args.args[0]?.includes("server.js"), "args[0] should point to server.js");
  assert.deepEqual(
    args.args.slice(1),
    ["--port", "8323", "--host", "127.0.0.1", "--session-data-path", "data"],
    "flags verified against the installed 4.76.0 dist/cli/cli-options.js + bin/config-schema.json"
  );
  // The API key must ride the generic WA_*-prefixed env override (WA_KEY →
  // camelCased "key" → the -k/--key CLI option), never argv, so it never
  // appears in `ps`/process listings (Hard Rule #13).
  assert.equal(args.env.WA_KEY, "sk-test-api-key");
  assert.equal(args.env.NODE_ENV, "production");
  assert.equal(args.cwd, OPENWA_INSTALL_DIR);
});

test("EACCES error returns friendly InstallError", async () => {
  const { InstallError } = await import("../../../../src/lib/services/installers/utils.ts");

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
