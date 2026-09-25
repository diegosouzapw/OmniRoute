import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-llmlingua-installer-"));
const FAKE_BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-llmlingua-fake-bin-"));
const MOCK_LLMLINGUA_VERSION = "3.0.0";

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Prepend fake bin dir to PATH so our fake `npm` is found by runNpm — the
// real @atjsh/llmlingua-2 + @huggingface/transformers + js-tiktoken install
// is network-dependent and downloads a multi-MB ONNX model on first use, so
// it is proven by the opt-in integration test instead (RUN_SERVICES_INT=1 —
// tests/integration/services/llmlingua-sidecar-real-compression.int.test.ts),
// not here. This suite only proves the installer WIRING (spawn args, DB row,
// version resolution) is correct.
const originalPath = process.env.PATH ?? "";
process.env.PATH = `${FAKE_BIN_DIR}:${originalPath}`;

const INSTALL_DIR = path.join(TEST_DATA_DIR, "services", "llmlingua");
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
  PKG_DIR="$PREFIX/node_modules/@atjsh/llmlingua-2"
  mkdir -p "$PKG_DIR"
  echo '{"name":"@atjsh/llmlingua-2","version":"${MOCK_LLMLINGUA_VERSION}"}' > "$PKG_DIR/package.json"
  exit 0
fi
if [ "$CMD" = "view" ]; then
  echo "${MOCK_LLMLINGUA_VERSION}"
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
   VALUES ('llmlingua', 'not_installed', 20135, 0, 0, 0)`
).run();

const {
  install,
  update,
  uninstall,
  getInstalledVersion,
  getLatestVersion,
  resolveSpawnArgs,
  getServerScriptPath,
  LLMLINGUA_DEFAULT_PORT,
  LLMLINGUA_DEFAULT_MODEL,
} = await import("../../../../src/lib/services/installers/llmlingua.ts");

test.after(() => {
  process.env.PATH = originalPath;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(FAKE_BIN_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("llmlingua installer: getInstalledVersion returns null when not installed", async () => {
  const version = await getInstalledVersion();
  assert.equal(version, null);
});

test("llmlingua installer: install npm-installs the real package and updates version_manager DB", async () => {
  const result = await install(MOCK_LLMLINGUA_VERSION);
  assert.equal(result.installedVersion, MOCK_LLMLINGUA_VERSION);
  assert.ok(fs.existsSync(getServerScriptPath()));

  // The generated server script must import the real package, not echo a stub.
  const serverSource = fs.readFileSync(getServerScriptPath(), "utf8");
  assert.match(serverSource, /@atjsh\/llmlingua-2/);
  assert.doesNotMatch(serverSource, /ratio:\s*0\.5/, "must not hardcode a fake ratio");

  const row = db.prepare("SELECT * FROM version_manager WHERE tool = 'llmlingua'").get() as
    { status?: string; port?: number } | undefined;
  assert.ok(row);
  assert.equal(row?.status, "stopped");
  assert.equal(row?.port, 20135);
});

test("llmlingua installer: getInstalledVersion reads from node_modules/@atjsh/llmlingua-2/package.json", async () => {
  const ver = await getInstalledVersion();
  assert.equal(ver, MOCK_LLMLINGUA_VERSION);
});

test("llmlingua installer: update calls npm install with latest (idempotent)", async () => {
  const result = await update();
  assert.equal(result.installedVersion, MOCK_LLMLINGUA_VERSION);
});

test("llmlingua installer: getLatestVersion returns version string from npm view", async () => {
  const ver = await getLatestVersion();
  assert.equal(ver, MOCK_LLMLINGUA_VERSION);
});

test("llmlingua installer: uninstall removes node_modules and resets DB row", async () => {
  await uninstall();
  assert.equal(fs.existsSync(path.join(INSTALL_DIR, "node_modules")), false);
  const row = db.prepare("SELECT * FROM version_manager WHERE tool = 'llmlingua'").get() as
    { status?: string } | undefined;
  assert.equal(row?.status, "not_installed");

  // Restore for the remaining tests in this file.
  await install(MOCK_LLMLINGUA_VERSION);
});

test("llmlingua installer: resolveSpawnArgs builds node server spawn arguments", () => {
  const spawnArgs = resolveSpawnArgs(LLMLINGUA_DEFAULT_PORT);
  assert.equal(spawnArgs.command, process.execPath);
  assert.deepEqual(spawnArgs.args, [getServerScriptPath()]);
  assert.equal(spawnArgs.env.PORT, String(LLMLINGUA_DEFAULT_PORT));
  assert.equal(spawnArgs.env.LLMLINGUA_MODEL, LLMLINGUA_DEFAULT_MODEL);
  assert.equal(spawnArgs.cwd, INSTALL_DIR);
});

test("llmlingua installer: resolveSpawnArgs honors LLMLINGUA_MODEL override", () => {
  process.env.LLMLINGUA_MODEL = "atjsh/llmlingua-2-js-xlm-roberta-large-meetingbank";
  try {
    const spawnArgs = resolveSpawnArgs(LLMLINGUA_DEFAULT_PORT);
    assert.equal(
      spawnArgs.env.LLMLINGUA_MODEL,
      "atjsh/llmlingua-2-js-xlm-roberta-large-meetingbank"
    );
  } finally {
    delete process.env.LLMLINGUA_MODEL;
  }
});
