import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";

// #6263 — On Windows, Qoder PAT auth failed with `spawn qodercli ENOENT` even
// though `qodercli.cmd` was installed under `%APPDATA%\npm` and worked from a
// shell. Root cause: `spawnQoderCli` spawned the bare `"qodercli"` name with
// `shell:false` and an unenriched env, so the npm `.cmd` wrapper on the user PATH
// was never resolved. The fix routes command resolution through the already
// Windows-aware `src/shared/services/cliRuntime.ts` (which enumerates
// `qodercli.cmd`/`.exe` under npm-global + `%APPDATA%\npm`, resolves an absolute
// `commandPath`, and flags `.cmd`/`.bat` as needing a shell).
//
// This suite exercises the *pure* resolution logic with mocks; the end-to-end
// spawn of a real `qodercli.cmd` can only be validated on a real Windows host
// (fs realpath/stat security checks + the frozen expected-parent list).

const qoderResolve = await import("../../open-sse/services/qoderCliResolve.ts");
const cliRuntime = await import("../../src/shared/services/cliRuntime.ts");

const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");
const originalAppData = process.env.APPDATA;
const originalQoderBin = process.env.CLI_QODER_BIN;

function setPlatform(value: string) {
  Object.defineProperty(process, "platform", { configurable: true, value });
}

test.afterEach(() => {
  if (originalPlatformDescriptor) {
    Object.defineProperty(process, "platform", originalPlatformDescriptor);
  }
  if (originalAppData === undefined) delete process.env.APPDATA;
  else process.env.APPDATA = originalAppData;
  if (originalQoderBin === undefined) delete process.env.CLI_QODER_BIN;
  else process.env.CLI_QODER_BIN = originalQoderBin;
  qoderResolve.__clearQoderCliInvocationCache();
});

test("cliRuntime enumerates qodercli.cmd under %APPDATA%\\npm on Windows", () => {
  setPlatform("win32");
  // APPDATA must live inside the home dir to pass cliRuntime's env-path validation.
  const appData = path.join(os.homedir(), "AppData", "Roaming");
  process.env.APPDATA = appData;

  const candidates = cliRuntime.getKnownToolPaths("qoder");
  const expected = path.join(appData, "npm", "qodercli.cmd");

  assert.ok(
    candidates.includes(expected),
    `expected getKnownToolPaths("qoder") to include ${expected}, got: ${candidates.join(", ")}`
  );
});

test("shouldUseShellForCommand: true for a .cmd wrapper, false for the bare name (Windows)", () => {
  setPlatform("win32");
  const cmdPath = path.join(os.homedir(), "AppData", "Roaming", "npm", "qodercli.cmd");
  assert.equal(cliRuntime.shouldUseShellForCommand(cmdPath), true);
  assert.equal(cliRuntime.shouldUseShellForCommand("qodercli"), false);
});

test("resolveQoderCliInvocation picks the absolute .cmd path + shell when cliRuntime finds it", async () => {
  setPlatform("win32");
  const cmdPath = path.join(os.homedir(), "AppData", "Roaming", "npm", "qodercli.cmd");

  const invocation = await qoderResolve.resolveQoderCliInvocation(null, {
    getStatus: async () => ({
      installed: true,
      runnable: true,
      command: "qodercli",
      commandPath: cmdPath,
      reason: null,
      runtimeMode: "auto",
      requiresBinary: true,
    }),
  });

  // The bug was spawning the bare "qodercli"; the fix must select the resolved
  // absolute .cmd path and mark it as needing a shell (cmd.exe).
  assert.equal(invocation.command, cmdPath);
  assert.equal(invocation.useShell, true);
  assert.notEqual(invocation.command, "qodercli");
});

test("resolveQoderCliInvocation falls back to the bare command when cliRuntime finds nothing", async () => {
  setPlatform("win32");
  delete process.env.CLI_QODER_BIN;

  const invocation = await qoderResolve.resolveQoderCliInvocation(null, {
    getStatus: async () => ({
      installed: false,
      runnable: false,
      command: "qodercli",
      commandPath: null,
      reason: "not_found",
      runtimeMode: "auto",
      requiresBinary: true,
    }),
  });

  assert.equal(invocation.command, "qodercli");
  // A bare name is not a .cmd/.bat, so no shell is requested.
  assert.equal(invocation.useShell, false);
});

test("resolveQoderCliInvocation is inert on non-Windows (no shell, resolved path honored)", async () => {
  setPlatform("linux");
  const posixPath = "/usr/local/bin/qodercli";

  const invocation = await qoderResolve.resolveQoderCliInvocation(null, {
    getStatus: async () => ({
      installed: true,
      runnable: true,
      command: "qodercli",
      commandPath: posixPath,
      reason: null,
      runtimeMode: "auto",
      requiresBinary: true,
    }),
  });

  assert.equal(invocation.command, posixPath);
  assert.equal(invocation.useShell, false);
});
