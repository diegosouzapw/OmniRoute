import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const modulePath = path.join(process.cwd(), "src/shared/services/cliRuntime.ts");

const originalSpawn = childProcess.spawn;
const originalExecFileSync = childProcess.execFileSync;
const originalEnv = { ...process.env };

const tempDirs = new Set();

async function importFresh(label) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`);
}

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
}

function createTempDir(prefix) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.add(dir);
  return dir;
}

function writeScript(dir, name, content, executable = true) {
  const filePath = path.join(dir, name);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  if (process.platform !== "win32") {
    fs.chmodSync(filePath, executable ? 0o755 : 0o644);
  }
  return filePath;
}

test.afterEach(() => {
  childProcess.spawn = originalSpawn;
  childProcess.execFileSync = originalExecFileSync;
  syncBuiltinESMExports();
  restoreEnv();

  for (const dir of tempDirs) {
    fs.rmSync(dir as any, { recursive: true, force: true });
  }
  tempDirs.clear();
});

test("CLI config helpers enforce safe config homes and expose per-tool config paths", async () => {
  const cliRuntime = await importFresh("config-helpers");
  const homeDir = os.homedir();
  const safeOverride = path.join(homeDir, "tmp-cli-config-home");

  process.env.CLI_ALLOW_CONFIG_WRITES = "off";
  assert.equal(cliRuntime.isCliConfigWriteAllowed(), false);
  assert.match(cliRuntime.ensureCliConfigWriteAllowed(), /CLI_ALLOW_CONFIG_WRITES=false/);

  process.env.CLI_CONFIG_HOME = safeOverride;
  assert.equal(cliRuntime.getCliConfigHome(), safeOverride);

  process.env.CLI_CONFIG_HOME = "relative/path";
  assert.equal(cliRuntime.getCliConfigHome(), homeDir);

  process.env.CLI_CONFIG_HOME = "/tmp/outside-home";
  assert.equal(cliRuntime.getCliConfigHome(), homeDir);

  process.env.CLI_CONFIG_HOME = safeOverride;
  assert.deepEqual(cliRuntime.getCliConfigPaths("codex"), {
    config: path.join(safeOverride, ".codex", "config.toml"),
    auth: path.join(safeOverride, ".codex", "auth.json"),
  });
  assert.equal(
    cliRuntime.getCliPrimaryConfigPath("codex"),
    path.join(safeOverride, ".codex", "config.toml")
  );
  assert.equal(cliRuntime.getCliConfigPaths("unknown"), null);

  process.env.XDG_CONFIG_HOME = path.join(homeDir, ".config-test");
  const expectedOpencodeRoot =
    process.platform === "win32"
      ? process.env.APPDATA || path.join(homeDir, "AppData", "Roaming")
      : process.env.XDG_CONFIG_HOME;
  assert.deepEqual(cliRuntime.getCliConfigPaths("opencode"), {
    config: path.join(expectedOpencodeRoot, "opencode", "opencode.json"),
  });
});

test("getCliRuntimeStatus rejects unsafe env overrides and reports validated runtime mode", async () => {
  process.env.CLI_MODE = "container";
  process.env.CLI_CLAUDE_BIN = "relative/claude";

  const cliRuntime = await importFresh("unsafe-env-command");
  const status = await cliRuntime.getCliRuntimeStatus("claude");

  assert.equal(status.installed, false);
  assert.equal(status.runnable, false);
  assert.equal(status.reason, "unsafe_path");
  assert.equal(status.runtimeMode, "container");
  assert.equal(status.requiresBinary, true);
});

test("getCliRuntimeStatus reports not_executable for absolute env override files without execute permission", async () => {
  const tempDir = createTempDir("omniroute-cli-notexec-");
  const scriptName = process.platform === "win32" ? "codex.cmd" : "codex";
  const scriptPath = writeScript(
    tempDir,
    scriptName,
    process.platform === "win32"
      ? "@echo off\r\necho codex 1.0.0\r\nREM padding padding padding\r\n"
      : "#!/bin/sh\necho codex 1.0.0\n# padding padding padding\n",
    false
  );

  process.env.CLI_CODEX_BIN = scriptPath;
  const cliRuntime = await importFresh("not-executable");
  const status = await cliRuntime.getCliRuntimeStatus("codex");

  assert.equal(status.installed, true);
  if (process.platform === "win32") {
    assert.equal(status.runnable, true);
    assert.equal(status.reason, null);
  } else {
    assert.equal(status.runnable, false);
    assert.equal(status.reason, "not_executable");
  }
  assert.equal(status.commandPath, scriptPath);
});

test("getCliRuntimeStatus reports healthcheck_failed when a binary exists but does not answer version probes", async () => {
  const tempDir = createTempDir("omniroute-cli-healthcheck-");
  const scriptName = process.platform === "win32" ? "qodercli.cmd" : "qodercli";
  const scriptPath = writeScript(
    tempDir,
    scriptName,
    process.platform === "win32"
      ? "@echo off\r\nexit /b 1\r\nREM padding padding padding\r\n"
      : "#!/bin/sh\nexit 1\n# padding padding padding\n"
  );

  process.env.CLI_QODER_BIN = scriptPath;
  process.env.CLI_MODE = "invalid-mode";
  const cliRuntime = await importFresh("healthcheck-failed");
  const status = await cliRuntime.getCliRuntimeStatus("qoder");

  assert.equal(status.installed, true);
  assert.equal(status.runnable, false);
  assert.equal(status.reason, "healthcheck_failed");
  assert.equal(status.runtimeMode, "auto");
});

test("getCliRuntimeStatus discovers binaries from CLI_EXTRA_PATHS during PATH lookup", async () => {
  const tempDir = createTempDir("omniroute-cli-extra-path-");
  const scriptName = process.platform === "win32" ? "qodercli.cmd" : "qodercli";
  writeScript(
    tempDir,
    scriptName,
    process.platform === "win32"
      ? "@echo off\r\necho qodercli 1.2.3\r\nREM padding padding padding\r\n"
      : "#!/bin/sh\necho qodercli 1.2.3\n# padding padding padding\n"
  );

  process.env.CLI_EXTRA_PATHS = tempDir;
  process.env.PATH = process.platform === "win32" ? process.env.PATH || "" : "/bin:/usr/bin";

  const cliRuntime = await importFresh("extra-paths");
  const status = await cliRuntime.getCliRuntimeStatus("qoder");

  assert.equal(status.installed, true);
  assert.equal(status.runnable, true);
  assert.equal(status.reason, null);
  assert.equal(
    path.basename(String(status.commandPath)).toLowerCase(),
    process.platform === "win32" ? "qodercli.cmd" : "qodercli"
  );
});

test("getCliRuntimeStatus resolves known binaries from npm global prefix discovered via npm config", async () => {
  const prefixDir = createTempDir("omniroute-cli-prefix-");
  const scriptName = process.platform === "win32" ? "qodercli.cmd" : "qodercli";
  const scriptPath = writeScript(
    path.join(prefixDir, process.platform === "win32" ? "" : "bin"),
    scriptName,
    process.platform === "win32"
      ? "@echo off\r\necho qodercli 1.2.3\r\nREM padding padding padding\r\n"
      : "#!/bin/sh\necho qodercli 1.2.3\n# padding padding padding\n"
  );

  delete process.env.npm_config_prefix;
  process.env.PATH = process.platform === "win32" ? process.env.PATH || "" : "/bin:/usr/bin";
  childProcess.execFileSync = (command, args) => {
    assert.equal(command, "npm");
    assert.deepEqual(args, ["config", "get", "prefix"]);
    return `${prefixDir}\n`;
  };
  syncBuiltinESMExports();

  const cliRuntime = await importFresh("npm-prefix-known-path");
  const status = await cliRuntime.getCliRuntimeStatus("qoder");

  assert.equal(status.installed, true);
  assert.equal(status.runnable, true);
  assert.equal(status.reason, null);
  assert.equal(status.commandPath, scriptPath);
});

test("getCliRuntimeStatus ignores suspicious known-path binaries and symlink escapes", async () => {
  const prefixDir = createTempDir("omniroute-cli-suspicious-");
  const binDir = path.join(prefixDir, process.platform === "win32" ? "" : "bin");
  const scriptName = process.platform === "win32" ? "qodercli.exe" : "qodercli";
  fs.mkdirSync(binDir, { recursive: true });
  fs.writeFileSync(path.join(binDir, scriptName), "");

  process.env.npm_config_prefix = prefixDir;
  process.env.PATH = process.platform === "win32" ? process.env.PATH || "" : "/bin:/usr/bin";

  const cliRuntime = await importFresh("suspicious-size");
  const suspiciousStatus = await cliRuntime.getCliRuntimeStatus("qoder");

  assert.equal(suspiciousStatus.installed, false);
  assert.equal(suspiciousStatus.reason, "suspicious_size");

  if (process.platform !== "win32") {
    const escapePrefix = createTempDir("omniroute-cli-escape-");
    const escapeBinDir = path.join(escapePrefix, "bin");
    const outsideDir = createTempDir("omniroute-cli-outside-");
    const outsideTarget = writeScript(
      outsideDir,
      "qodercli",
      "#!/bin/sh\necho qodercli 9.9.9\n# padding padding padding\n"
    );

    fs.mkdirSync(escapeBinDir, { recursive: true });
    fs.symlinkSync(outsideTarget, path.join(escapeBinDir, "qodercli"));
    process.env.npm_config_prefix = escapePrefix;

    const escapedRuntime = await importFresh("symlink-escape");
    const escapedStatus = await escapedRuntime.getCliRuntimeStatus("qoder");

    assert.equal(escapedStatus.installed, false);
    assert.equal(escapedStatus.reason, "symlink_escape");
  }
});

test("getCliRuntimeStatus tolerates spawn errors during healthcheck and marks the tool as not runnable", async () => {
  const tempDir = createTempDir("omniroute-cli-spawn-error-");
  const scriptName = process.platform === "win32" ? "cline.cmd" : "cline";
  const scriptPath = writeScript(
    tempDir,
    scriptName,
    process.platform === "win32"
      ? "@echo off\r\necho cline\r\nREM padding padding padding\r\n"
      : "#!/bin/sh\necho cline\n# padding padding padding\n"
  );

  process.env.CLI_CLINE_BIN = scriptPath;
  childProcess.spawn = () => {
    const child = new (require("node:events").EventEmitter)();
    child.stdout = new (require("node:events").EventEmitter)();
    child.stderr = new (require("node:events").EventEmitter)();
    child.kill = () => true;
    setImmediate(() => child.emit("error", new Error("spawn blocked")));
    return child;
  };
  syncBuiltinESMExports();

  const cliRuntime = await importFresh("spawn-error");
  const status = await cliRuntime.getCliRuntimeStatus("cline");

  assert.equal(status.installed, true);
  assert.equal(status.runnable, false);
  assert.equal(status.reason, "healthcheck_failed");
});
