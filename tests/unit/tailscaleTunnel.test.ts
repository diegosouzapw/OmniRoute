import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { promisify } from "node:util";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const originalExecFile = childProcess.execFile;
const originalExecFileAsync = promisify(originalExecFile);
const originalSpawn = childProcess.spawn;
const originalProcessKill = process.kill;
const blockedProcessActions: Array<{ kind: string; command: string; args: string[] }> = [];

function isAllowedTestBinary(command: string) {
  return command === path.join(TEST_DATA_DIR, "fake-tailscale.sh");
}

const guardedExecFile = (command, args, options, callback) => {
  const normalizedCommand = String(command);
  const normalizedArgs = Array.from(args ?? [], String);
  if (!isAllowedTestBinary(normalizedCommand)) {
    blockedProcessActions.push({
      kind: "execFile",
      command: normalizedCommand,
      args: normalizedArgs,
    });
    const cb = typeof options === "function" ? options : callback;
    cb?.(Object.assign(new Error("external command blocked by test"), { code: "EPERM" }));
    return;
  }
  return originalExecFile(command, args, options, callback);
};
guardedExecFile[promisify.custom] = async (command, args, options) => {
  const normalizedCommand = String(command);
  const normalizedArgs = Array.from(args ?? [], String);
  if (!isAllowedTestBinary(normalizedCommand)) {
    blockedProcessActions.push({
      kind: "execFile",
      command: normalizedCommand,
      args: normalizedArgs,
    });
    throw Object.assign(new Error("external command blocked by test"), { code: "EPERM" });
  }
  return originalExecFileAsync(command, args, options);
};
childProcess.execFile = guardedExecFile;
childProcess.spawn = (command, args, options) => {
  const normalizedCommand = String(command);
  const normalizedArgs = Array.from(args ?? [], String);
  if (!isAllowedTestBinary(normalizedCommand)) {
    blockedProcessActions.push({ kind: "spawn", command: normalizedCommand, args: normalizedArgs });
    throw Object.assign(new Error("external process blocked by test"), { code: "EPERM" });
  }
  return originalSpawn(command, args, options);
};
process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
  blockedProcessActions.push({
    kind: "process.kill",
    command: String(pid),
    args: signal === undefined ? [] : [String(signal)],
  });
  throw Object.assign(new Error("process signal blocked by test"), { code: "EPERM" });
}) as typeof process.kill;
syncBuiltinESMExports();

const TEST_DATA_DIR = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-tailscale-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const tailscaleTunnel = await import("../../src/lib/tailscaleTunnel.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const dbCore = await import("../../src/lib/db/core.ts");
const mitmManager = await import("../../src/mitm/manager.ts");

const originalEnv = {
  tailscaleBin: process.env.TAILSCALE_BIN,
  tailscaledBin: process.env.TAILSCALED_BIN,
  statusJson: process.env.TAILSCALE_TEST_STATUS_JSON,
  funnelStatusJson: process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON,
  funnelOutput: process.env.TAILSCALE_TEST_FUNNEL_OUTPUT,
  funnelExitCode: process.env.TAILSCALE_TEST_FUNNEL_EXIT_CODE,
  funnelResetExitCode: process.env.TAILSCALE_TEST_FUNNEL_RESET_EXIT_CODE,
  loginOutput: process.env.TAILSCALE_TEST_LOGIN_OUTPUT,
  loginExitCode: process.env.TAILSCALE_TEST_LOGIN_EXIT_CODE,
};

async function createFakeTailscaleBinary() {
  const fakePath = path.join(TEST_DATA_DIR, "fake-tailscale.sh");
  await fs.writeFile(
    fakePath,
    `#!/usr/bin/env bash
args="$*"
if [[ "$args" == *"funnel status --json"* ]]; then
  if [[ -n "$TAILSCALE_TEST_FUNNEL_STATUS_JSON" ]]; then
    printf '%s' "$TAILSCALE_TEST_FUNNEL_STATUS_JSON"
    exit 0
  fi
  exit 1
fi
if [[ "$args" == *"status --json"* ]]; then
  if [[ -n "$TAILSCALE_TEST_STATUS_JSON" ]]; then
    printf '%s' "$TAILSCALE_TEST_STATUS_JSON"
    exit 0
  fi
  exit 1
fi
if [[ "$args" == *"funnel --bg reset"* ]]; then
  exit "\${TAILSCALE_TEST_FUNNEL_RESET_EXIT_CODE:-0}"
fi
if [[ "$args" == *"funnel --bg "* ]]; then
  if [[ -n "$TAILSCALE_TEST_FUNNEL_OUTPUT" ]]; then
    printf '%s' "$TAILSCALE_TEST_FUNNEL_OUTPUT"
  fi
  exit "\${TAILSCALE_TEST_FUNNEL_EXIT_CODE:-0}"
fi
if [[ "$args" == *"up --accept-routes"* ]]; then
  if [[ -n "$TAILSCALE_TEST_LOGIN_OUTPUT" ]]; then
    printf '%s' "$TAILSCALE_TEST_LOGIN_OUTPUT"
  fi
  exit "\${TAILSCALE_TEST_LOGIN_EXIT_CODE:-0}"
fi
exit 1
`,
    "utf8"
  );
  await fs.chmod(fakePath, 0o755);
  return fakePath;
}

function resetTailscaleTestEnv(fakeBinaryPath: string) {
  process.env.TAILSCALE_BIN = fakeBinaryPath;
  process.env.TAILSCALED_BIN = fakeBinaryPath;
  delete process.env.TAILSCALE_TEST_STATUS_JSON;
  delete process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON;
  delete process.env.TAILSCALE_TEST_FUNNEL_OUTPUT;
  delete process.env.TAILSCALE_TEST_FUNNEL_EXIT_CODE;
  delete process.env.TAILSCALE_TEST_FUNNEL_RESET_EXIT_CODE;
  delete process.env.TAILSCALE_TEST_LOGIN_OUTPUT;
  delete process.env.TAILSCALE_TEST_LOGIN_EXIT_CODE;
}

test.beforeEach(async () => {
  blockedProcessActions.length = 0;
  const fakeBinaryPath = await createFakeTailscaleBinary();
  resetTailscaleTestEnv(fakeBinaryPath);
  mitmManager.clearCachedPassword();
  dbCore.resetDbInstance();
  await fs.rm(TEST_DATA_DIR, { recursive: true, force: true });
  await fs.mkdir(TEST_DATA_DIR, { recursive: true });
  const recreatedBinaryPath = await createFakeTailscaleBinary();
  resetTailscaleTestEnv(recreatedBinaryPath);
});

test.after(async () => {
  process.kill = originalProcessKill;
  childProcess.execFile = originalExecFile;
  childProcess.spawn = originalSpawn;
  syncBuiltinESMExports();
  dbCore.resetDbInstance();
  mitmManager.clearCachedPassword();
  if (originalEnv.tailscaleBin === undefined) delete process.env.TAILSCALE_BIN;
  else process.env.TAILSCALE_BIN = originalEnv.tailscaleBin;
  if (originalEnv.tailscaledBin === undefined) delete process.env.TAILSCALED_BIN;
  else process.env.TAILSCALED_BIN = originalEnv.tailscaledBin;
  if (originalEnv.statusJson === undefined) delete process.env.TAILSCALE_TEST_STATUS_JSON;
  else process.env.TAILSCALE_TEST_STATUS_JSON = originalEnv.statusJson;
  if (originalEnv.funnelStatusJson === undefined)
    delete process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON;
  else process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON = originalEnv.funnelStatusJson;
  if (originalEnv.funnelOutput === undefined) delete process.env.TAILSCALE_TEST_FUNNEL_OUTPUT;
  else process.env.TAILSCALE_TEST_FUNNEL_OUTPUT = originalEnv.funnelOutput;
  if (originalEnv.funnelExitCode === undefined) delete process.env.TAILSCALE_TEST_FUNNEL_EXIT_CODE;
  else process.env.TAILSCALE_TEST_FUNNEL_EXIT_CODE = originalEnv.funnelExitCode;
  if (originalEnv.funnelResetExitCode === undefined)
    delete process.env.TAILSCALE_TEST_FUNNEL_RESET_EXIT_CODE;
  else process.env.TAILSCALE_TEST_FUNNEL_RESET_EXIT_CODE = originalEnv.funnelResetExitCode;
  if (originalEnv.loginOutput === undefined) delete process.env.TAILSCALE_TEST_LOGIN_OUTPUT;
  else process.env.TAILSCALE_TEST_LOGIN_OUTPUT = originalEnv.loginOutput;
  if (originalEnv.loginExitCode === undefined) delete process.env.TAILSCALE_TEST_LOGIN_EXIT_CODE;
  else process.env.TAILSCALE_TEST_LOGIN_EXIT_CODE = originalEnv.loginExitCode;
  await fs.rm(TEST_DATA_DIR, { recursive: true, force: true });
});

test("extractTailscaleAuthUrl and extractTailscaleEnableUrl parse login URLs", () => {
  assert.equal(
    tailscaleTunnel.extractTailscaleAuthUrl(
      "To authenticate, visit https://login.tailscale.com/a/demo-token in your browser."
    ),
    "https://login.tailscale.com/a/demo-token"
  );
  assert.equal(
    tailscaleTunnel.extractTailscaleEnableUrl(
      "Funnel is not enabled yet. Open https://login.tailscale.com/f/funnel-demo to continue."
    ),
    "https://login.tailscale.com/f/funnel-demo"
  );
});

test("getTailscaleUrlFromStatusPayload normalizes DNS names into HTTPS URLs", () => {
  assert.equal(
    tailscaleTunnel.getTailscaleUrlFromStatusPayload({
      Self: { DNSName: "omniroute-demo.tail123.ts.net." },
    }),
    "https://omniroute-demo.tail123.ts.net"
  );
});

test("getTailscaleTunnelStatus reflects a logged-in running funnel", async () => {
  process.env.TAILSCALE_TEST_STATUS_JSON = JSON.stringify({
    BackendState: "Running",
    Self: { DNSName: "omniroute-demo.tail123.ts.net." },
  });
  process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON = JSON.stringify({
    AllowFunnel: {
      "443": true,
    },
  });

  const status = await tailscaleTunnel.getTailscaleTunnelStatus();

  assert.equal(status.installed, true);
  assert.equal(status.loggedIn, true);
  assert.equal(status.running, true);
  assert.equal(status.phase, "running");
  assert.equal(status.tunnelUrl, "https://omniroute-demo.tail123.ts.net");
  assert.equal(status.apiUrl, "https://omniroute-demo.tail123.ts.net/v1");
});

test("enableTailscaleTunnel returns an auth URL when login is still required", async () => {
  process.env.TAILSCALE_TEST_STATUS_JSON = JSON.stringify({
    BackendState: "NeedsLogin",
    Self: { DNSName: "omniroute-demo.tail123.ts.net." },
  });
  process.env.TAILSCALE_TEST_LOGIN_OUTPUT =
    "Authenticate at https://login.tailscale.com/a/login-token";

  const result = await tailscaleTunnel.enableTailscaleTunnel();

  assert.equal(result.success, false);
  assert.equal("needsLogin" in result, true);
  if ("needsLogin" in result) {
    assert.equal(result.authUrl, "https://login.tailscale.com/a/login-token");
  }
});

test("enableTailscaleTunnel returns the funnel enable URL when the tailnet has Funnel disabled", async () => {
  process.env.TAILSCALE_TEST_STATUS_JSON = JSON.stringify({
    BackendState: "Running",
    Self: { DNSName: "omniroute-demo.tail123.ts.net." },
  });
  process.env.TAILSCALE_TEST_FUNNEL_OUTPUT =
    "Funnel is not enabled. Continue at https://login.tailscale.com/f/funnel-token";

  const result = await tailscaleTunnel.enableTailscaleTunnel();

  assert.equal(result.success, false);
  assert.equal("funnelNotEnabled" in result, true);
  if ("funnelNotEnabled" in result) {
    assert.equal(result.enableUrl, "https://login.tailscale.com/f/funnel-token");
  }
});

test("enableTailscaleTunnel stores the funnel URL and disableTailscaleTunnel clears it", async () => {
  process.env.TAILSCALE_TEST_STATUS_JSON = JSON.stringify({
    BackendState: "Running",
    Self: { DNSName: "omniroute-demo.tail123.ts.net." },
  });
  process.env.TAILSCALE_TEST_FUNNEL_STATUS_JSON = JSON.stringify({
    AllowFunnel: {
      "443": true,
    },
  });
  process.env.TAILSCALE_TEST_FUNNEL_OUTPUT = "Available at https://omniroute-demo.tail123.ts.net";

  const enabled = await tailscaleTunnel.enableTailscaleTunnel();
  const settingsAfterEnable = await settingsDb.getSettings();

  assert.equal(enabled.success, true);
  if (enabled.success) {
    assert.equal(enabled.tunnelUrl, "https://omniroute-demo.tail123.ts.net");
  }
  assert.equal(settingsAfterEnable.tailscaleEnabled, true);
  assert.equal(settingsAfterEnable.tailscaleUrl, "https://omniroute-demo.tail123.ts.net");

  const tailscaleDir = path.join(TEST_DATA_DIR, "tailscale");
  const statePath = path.join(tailscaleDir, "state.json");
  const pidPath = path.join(tailscaleDir, ".tailscaled.pid");
  const socketPath = path.join(tailscaleDir, "tailscaled.sock");
  const stateBeforeDisable = JSON.parse(await fs.readFile(statePath, "utf8"));
  stateBeforeDisable.daemonPid = 41009;
  await fs.writeFile(statePath, `${JSON.stringify(stateBeforeDisable, null, 2)}\n`, "utf8");
  await fs.writeFile(pidPath, "41009\n", "utf8");
  await fs.writeFile(socketPath, "private socket sentinel", "utf8");

  const disabled = await tailscaleTunnel.disableTailscaleTunnel();
  const settingsAfterDisable = await settingsDb.getSettings();

  assert.equal(disabled.success, true);
  assert.equal(settingsAfterDisable.tailscaleEnabled, false);
  assert.equal(settingsAfterDisable.tailscaleUrl, "");
  assert.equal(JSON.parse(await fs.readFile(statePath, "utf8")).daemonPid, 41009);
  assert.equal(await fs.readFile(pidPath, "utf8"), "41009\n");
  assert.equal(await fs.readFile(socketPath, "utf8"), "private socket sentinel");
  assert.deepEqual(blockedProcessActions, []);
});

test("disableTailscaleTunnel preserves enabled settings when Funnel reset fails", async () => {
  await settingsDb.updateSettings({
    tailscaleEnabled: true,
    tailscaleUrl: "https://omniroute-demo.tail123.ts.net",
  });
  process.env.TAILSCALE_TEST_FUNNEL_RESET_EXIT_CODE = "1";

  await assert.rejects(() => tailscaleTunnel.disableTailscaleTunnel());

  const settingsAfterFailure = await settingsDb.getSettings();
  assert.equal(settingsAfterFailure.tailscaleEnabled, true);
  assert.equal(settingsAfterFailure.tailscaleUrl, "https://omniroute-demo.tail123.ts.net");
  assert.deepEqual(blockedProcessActions, []);
});

test("disableTailscaleTunnel stops Funnel without overwriting malformed ownership state", async () => {
  await settingsDb.updateSettings({
    tailscaleEnabled: true,
    tailscaleUrl: "https://omniroute-demo.tail123.ts.net",
  });
  const tailscaleDir = path.join(TEST_DATA_DIR, "tailscale");
  const statePath = path.join(tailscaleDir, "state.json");
  await fs.mkdir(tailscaleDir, { recursive: true });
  await fs.writeFile(statePath, "{malformed", "utf8");

  await assert.rejects(() => tailscaleTunnel.disableTailscaleTunnel(), SyntaxError);

  const settingsAfterFailure = await settingsDb.getSettings();
  assert.equal(settingsAfterFailure.tailscaleEnabled, false);
  assert.equal(settingsAfterFailure.tailscaleUrl, "");
  assert.equal(await fs.readFile(statePath, "utf8"), "{malformed");
  assert.deepEqual(blockedProcessActions, []);
});
