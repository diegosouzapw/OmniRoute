import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const fs = require("node:fs");

const modulePath = path.join(process.cwd(), "src/shared/utils/machineId.ts");

const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");
const originalSystemRoot = process.env.SystemRoot;
const originalWindir = process.env.windir;
const originalExecSync = childProcess.execSync;
const originalExecFileSync = childProcess.execFileSync;
const originalExistsSync = fs.existsSync;
const originalReadFileSync = fs.readFileSync;

function setPlatform(value) {
  Object.defineProperty(process, "platform", {
    configurable: true,
    value,
  });
}

async function loadMachineIdModule(label) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

test.afterEach(() => {
  childProcess.execSync = originalExecSync;
  childProcess.execFileSync = originalExecFileSync;
  fs.existsSync = originalExistsSync;
  fs.readFileSync = originalReadFileSync;

  if (originalPlatformDescriptor) {
    Object.defineProperty(process, "platform", originalPlatformDescriptor);
  }

  if (originalSystemRoot === undefined) {
    delete process.env.SystemRoot;
  } else {
    process.env.SystemRoot = originalSystemRoot;
  }

  if (originalWindir === undefined) {
    delete process.env.windir;
  } else {
    process.env.windir = originalWindir;
  }

  delete globalThis.window;
  syncBuiltinESMExports();
});

test("machineId: reads the Windows MachineGuid via REG.exe when available", async () => {
  setPlatform("win32");
  process.env.SystemRoot = "C:\\Windows";

  fs.existsSync = (filePath) => filePath === "C:\\Windows\\System32\\REG.exe";
  childProcess.execFileSync = (command, args, options) => {
    assert.equal(command, "C:\\Windows\\System32\\REG.exe");
    assert.deepEqual(args, [
      "QUERY",
      "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography",
      "/v",
      "MachineGuid",
    ]);
    assert.equal(options.encoding, "utf8");
    return "MachineGuid    REG_SZ    ABCDEF12-3456-7890";
  };
  childProcess.execSync = () => {
    throw new Error("hostname fallback should not run");
  };
  syncBuiltinESMExports();

  const machineId = await loadMachineIdModule("windows-guid");
  assert.equal(await machineId.getRawMachineId(), "abcdef12-3456-7890");
});

test("machineId: falls back to Linux machine-id files before hostname", async () => {
  setPlatform("linux");

  fs.existsSync = () => false;
  fs.readFileSync = (filePath, encoding) => {
    assert.equal(filePath, "/etc/machine-id");
    assert.equal(encoding, "utf8");
    return "LINUX-MACHINE-ID\n";
  };
  childProcess.execSync = () => {
    throw new Error("hostname fallback should not run");
  };
  syncBuiltinESMExports();

  const machineId = await loadMachineIdModule("linux-file");
  assert.equal(await machineId.getRawMachineId(), "linux-machine-id");
});

test("machineId: reads the macOS IOPlatformUUID when ioreg is available", async () => {
  setPlatform("darwin");

  fs.existsSync = () => false;
  childProcess.execSync = (command, options) => {
    assert.equal(command, "ioreg -rd1 -c IOPlatformExpertDevice");
    assert.equal(options.encoding, "utf8");
    return '"IOPlatformUUID" = "ABCDEF12-3456-7890-ABCD-EF1234567890"\n';
  };
  syncBuiltinESMExports();

  const machineId = await loadMachineIdModule("macos-ioreg");
  assert.equal(await machineId.getRawMachineId(), "abcdef12-3456-7890-abcd-ef1234567890");
});

test("machineId: hashes consistently by salt and reports browser/server mode", async () => {
  setPlatform("linux");

  fs.existsSync = () => false;
  childProcess.execSync = (command, options) => {
    assert.equal(command, "hostname");
    assert.equal(options.encoding, "utf8");
    return "worker-host\n";
  };
  syncBuiltinESMExports();

  const machineId = await loadMachineIdModule("hostname-fallback");
  const first = await machineId.getConsistentMachineId("salt-a");
  const second = await machineId.getConsistentMachineId("salt-a");
  const third = await machineId.getConsistentMachineId("salt-b");

  assert.equal(first.length, 16);
  assert.equal(first, second);
  assert.notEqual(first, third);
  assert.equal(machineId.isBrowser(), false);

  globalThis.window = {};
  assert.equal(machineId.isBrowser(), true);
});

test("machineId: falls back to the last available identifier when shell strategies fail", async () => {
  setPlatform("freebsd");

  fs.existsSync = () => false;
  childProcess.execFileSync = () => {
    throw new Error("REG.exe unavailable");
  };
  childProcess.execSync = () => {
    throw new Error("hostname unavailable");
  };
  syncBuiltinESMExports();

  const machineId = await loadMachineIdModule("unknown-fallback");
  const rawMachineId = await machineId.getRawMachineId();

  assert.equal(typeof rawMachineId, "string");
  assert.ok(rawMachineId.length > 0);
});
