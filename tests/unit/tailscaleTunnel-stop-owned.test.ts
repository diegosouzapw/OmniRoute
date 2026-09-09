import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { PassThrough } from "node:stream";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const modulePath = path.join(process.cwd(), "src/lib/tailscaleTunnel.ts");
const originalExecFile = childProcess.execFile;
const originalExecFileSync = childProcess.execFileSync;
const originalSpawn = childProcess.spawn;
const originalProcessKill = process.kill;
const originalDataDir = process.env.DATA_DIR;
const originalNoSudo = process.env.OMNIROUTE_NO_SUDO;

let testDataDir = "";
let externalCalls: Array<{ kind: string; command: string; args: string[] }> = [];
let spawnImplementation: ((command: string, args: string[]) => unknown) | null = null;

function installFailClosedProcessMocks() {
  childProcess.execFile = (command, args, options, callback) => {
    const normalizedArgs = Array.from(args ?? [], String);
    externalCalls.push({ kind: "execFile", command: String(command), args: normalizedArgs });
    const cb = typeof options === "function" ? options : callback;
    cb?.(null, "", "");
  };
  childProcess.execFile[promisify.custom] = async (command, args) => {
    const normalizedArgs = Array.from(args ?? [], String);
    externalCalls.push({ kind: "execFile", command: String(command), args: normalizedArgs });
    return { stdout: "", stderr: "" };
  };
  childProcess.execFileSync = (command, args) => {
    const normalizedArgs = Array.from(args ?? [], String);
    externalCalls.push({ kind: "execFileSync", command: String(command), args: normalizedArgs });
    if (String(command) === "sh" && normalizedArgs.join(" ") === "-c command -v sudo") {
      return Buffer.from("/usr/bin/sudo\n");
    }
    throw new Error("synchronous external process blocked by Tailscale shutdown safety test");
  };
  childProcess.spawn = (command, args) => {
    const normalizedArgs = Array.from(args ?? [], String);
    externalCalls.push({ kind: "spawn", command: String(command), args: normalizedArgs });
    if (spawnImplementation) return spawnImplementation(String(command), normalizedArgs);
    throw new Error("external process launch blocked by Tailscale shutdown safety test");
  };
  syncBuiltinESMExports();
}

async function importFresh(label: string) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`);
}

async function writeDaemonOwnership(pidFilePid: number, statePid: number) {
  const tailscaleDir = path.join(testDataDir, "tailscale");
  await fs.mkdir(tailscaleDir, { recursive: true });
  await fs.writeFile(path.join(tailscaleDir, ".tailscaled.pid"), `${pidFilePid}\n`, "utf8");
  await fs.writeFile(
    path.join(tailscaleDir, "state.json"),
    `${JSON.stringify({ daemonPid: statePid }, null, 2)}\n`,
    "utf8"
  );
}

function managedProcessIdentity(
  overrides: { executable?: string; socket?: string; stateDir?: string } = {}
) {
  const tailscaleDir = path.join(testDataDir, "tailscale");
  return {
    executable: overrides.executable ?? "/usr/sbin/tailscaled",
    args: [
      "/usr/sbin/tailscaled",
      `--socket=${overrides.socket ?? path.join(tailscaleDir, "tailscaled.sock")}`,
      `--statedir=${overrides.stateDir ?? tailscaleDir}`,
    ],
  };
}

function createSuccessfulChild() {
  const child = new EventEmitter() as EventEmitter & {
    stdin: PassThrough;
    stdout: PassThrough;
    stderr: PassThrough;
  };
  child.stdin = new PassThrough();
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  queueMicrotask(() => child.emit("close", 0));
  return child;
}

async function assertIdentityMismatch(
  label: string,
  overrides: { executable?: string; socket?: string; stateDir?: string }
) {
  const managedPid = 41006;
  await writeDaemonOwnership(managedPid, managedPid);
  const tunnel = await importFresh(label);
  const restoreIdentityReader = tunnel.__setTailscaleProcessIdentityReaderForTests(async () =>
    managedProcessIdentity(overrides)
  );
  const terminatingSignals: Array<NodeJS.Signals | number | undefined> = [];
  process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
    assert.equal(pid, managedPid);
    if (signal === 0) return true;
    terminatingSignals.push(signal);
    return true;
  }) as typeof process.kill;

  try {
    await assert.rejects(
      () => tunnel.stopTailscaleDaemon({ sudoPassword: "test-only" }),
      /Refusing to stop unverified tailscaled process/
    );
  } finally {
    restoreIdentityReader();
  }

  assert.deepEqual(terminatingSignals, []);
  assert.deepEqual(externalCalls, []);
  const state = JSON.parse(
    await fs.readFile(path.join(testDataDir, "tailscale", "state.json"), "utf8")
  );
  assert.equal(state.daemonPid, managedPid);
}

test.beforeEach(async () => {
  testDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-tailscale-stop-"));
  process.env.DATA_DIR = testDataDir;
  delete process.env.OMNIROUTE_NO_SUDO;
  externalCalls = [];
  spawnImplementation = null;
  installFailClosedProcessMocks();
});

test.afterEach(async () => {
  process.kill = originalProcessKill;
  childProcess.execFile = originalExecFile;
  childProcess.execFileSync = originalExecFileSync;
  childProcess.spawn = originalSpawn;
  syncBuiltinESMExports();
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalNoSudo === undefined) delete process.env.OMNIROUTE_NO_SUDO;
  else process.env.OMNIROUTE_NO_SUDO = originalNoSudo;
  await fs.rm(testDataDir, { recursive: true, force: true });
});

test("shutdown contains no broad process or service termination", async () => {
  const source = await fs.readFile(modulePath, "utf8");
  const stopStart = source.indexOf("async function isManagedTailscaleDaemonProcess");
  const stopEnd = source.indexOf("export async function enableTailscaleTunnel");

  assert.notEqual(stopStart, -1);
  assert.notEqual(stopEnd, -1);
  const stopSource = source.slice(stopStart, stopEnd);
  assert.doesNotMatch(stopSource, /\bpkill\b|\bkillall\b|\bsystemctl\b|\blaunchctl\b|Stop-Service/);
  assert.doesNotMatch(stopSource, /execFileAsync\(\s*["'](?:net|sc)["']\s*,\s*\[\s*["']stop["']/);
  assert.doesNotMatch(stopSource, /runSudoShell/);
  assert.doesNotMatch(stopSource, /\b(?:exec|execSync|execFileSync|spawnSync)\s*\(/);

  const disableStart = source.indexOf("export async function disableTailscaleTunnel");
  const installStart = source.indexOf("function createStreamLogger");
  assert.notEqual(disableStart, -1);
  assert.notEqual(installStart, -1);
  assert.doesNotMatch(source.slice(disableStart, installStart), /stopTailscaleDaemon/);
});

test("no ownership record performs no process action", async () => {
  const tunnel = await importFresh("no-ownership");
  const killCalls: Array<{ pid: number; signal?: NodeJS.Signals | number }> = [];
  process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
    killCalls.push({ pid, signal });
    throw Object.assign(new Error("unexpected process signal"), { code: "ESRCH" });
  }) as typeof process.kill;

  await tunnel.stopTailscaleDaemon({ sudoPassword: "test-only" });

  assert.deepEqual(killCalls, []);
  assert.deepEqual(externalCalls, []);
});

test("matching private ownership signals only the exact recorded PID", async () => {
  const managedPid = 41003;
  await writeDaemonOwnership(managedPid, managedPid);
  const tunnel = await importFresh("matching-ownership");
  const restoreIdentityReader = tunnel.__setTailscaleProcessIdentityReaderForTests(async () =>
    managedProcessIdentity()
  );
  let alive = true;
  const killCalls: Array<{ pid: number; signal?: NodeJS.Signals | number }> = [];
  process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
    assert.equal(pid, managedPid);
    if (signal === 0) {
      if (alive) return true;
      throw Object.assign(new Error("missing"), { code: "ESRCH" });
    }
    killCalls.push({ pid, signal });
    alive = false;
    return true;
  }) as typeof process.kill;

  try {
    await tunnel.stopTailscaleDaemon();
  } finally {
    restoreIdentityReader();
  }

  assert.deepEqual(killCalls, [{ pid: managedPid, signal: "SIGTERM" }]);
  assert.deepEqual(externalCalls, []);
  const state = JSON.parse(
    await fs.readFile(path.join(testDataDir, "tailscale", "state.json"), "utf8")
  );
  assert.equal(state.daemonPid, null);
});

test("mismatched private ownership cannot signal either PID", async () => {
  const statePid = 41004;
  const pidFilePid = 41005;
  await writeDaemonOwnership(pidFilePid, statePid);
  const tunnel = await importFresh("mismatched-ownership");
  const killCalls: Array<{ pid: number; signal?: NodeJS.Signals | number }> = [];
  process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
    killCalls.push({ pid, signal });
    return true;
  }) as typeof process.kill;

  await tunnel.stopTailscaleDaemon({ sudoPassword: "test-only" });

  assert.deepEqual(killCalls, []);
  assert.deepEqual(externalCalls, []);
});

test("reused PID with the wrong private socket is never signalled", async () => {
  const tailscaleDir = path.join(testDataDir, "tailscale");
  await assertIdentityMismatch("wrong-socket", {
    socket: `${path.join(tailscaleDir, "tailscaled.sock")}.other`,
  });
});

test("reused PID with the wrong private state directory is never signalled", async () => {
  const tailscaleDir = path.join(testDataDir, "tailscale");
  await assertIdentityMismatch("wrong-state-dir", {
    stateDir: `${tailscaleDir}-backup`,
  });
});

test(
  "cleanup failure preserves PID and state ownership evidence",
  { skip: process.platform === "win32" || process.getuid?.() === 0 },
  async () => {
    const managedPid = 41009;
    await writeDaemonOwnership(managedPid, managedPid);
    const tailscaleDir = path.join(testDataDir, "tailscale");
    const socketPath = path.join(tailscaleDir, "tailscaled.sock");
    await fs.writeFile(socketPath, "socket sentinel", "utf8");
    const tunnel = await importFresh("cleanup-failure");
    const restoreIdentityReader = tunnel.__setTailscaleProcessIdentityReaderForTests(async () =>
      managedProcessIdentity()
    );
    let alive = true;
    process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
      assert.equal(pid, managedPid);
      if (signal === 0) {
        if (alive) return true;
        throw Object.assign(new Error("missing"), { code: "ESRCH" });
      }
      alive = false;
      return true;
    }) as typeof process.kill;

    await fs.chmod(tailscaleDir, 0o500);
    try {
      await assert.rejects(() => tunnel.stopTailscaleDaemon(), /EACCES|permission denied/i);
    } finally {
      restoreIdentityReader();
      await fs.chmod(tailscaleDir, 0o700);
    }

    assert.equal(await fs.readFile(path.join(tailscaleDir, ".tailscaled.pid"), "utf8"), "41009\n");
    assert.equal(
      JSON.parse(await fs.readFile(path.join(tailscaleDir, "state.json"), "utf8")).daemonPid,
      managedPid
    );
    assert.equal(await fs.readFile(socketPath, "utf8"), "socket sentinel");
    assert.deepEqual(externalCalls, []);
  }
);

test("password-backed shutdown uses exact sudo TERM argv", async () => {
  const managedPid = 41007;
  await writeDaemonOwnership(managedPid, managedPid);
  const tunnel = await importFresh("sudo-term");
  let alive = true;
  let identityReads = 0;
  const restoreIdentityReader = tunnel.__setTailscaleProcessIdentityReaderForTests(async () => {
    identityReads += 1;
    return managedProcessIdentity();
  });
  process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
    assert.equal(pid, managedPid);
    if (!alive) throw Object.assign(new Error("missing"), { code: "ESRCH" });
    if (signal === 0 || signal === "SIGTERM") {
      throw Object.assign(new Error("permission denied"), { code: "EPERM" });
    }
    throw new Error(`unexpected signal ${String(signal)}`);
  }) as typeof process.kill;
  spawnImplementation = () => {
    alive = false;
    return createSuccessfulChild();
  };

  try {
    await tunnel.stopTailscaleDaemon({ sudoPassword: "test-only" });
  } finally {
    restoreIdentityReader();
  }

  assert.equal(identityReads, 2);
  assert.deepEqual(externalCalls, [
    { kind: "execFileSync", command: "sh", args: ["-c", "command -v sudo"] },
    {
      kind: "spawn",
      command: "sudo",
      args: ["-S", "kill", "-TERM", "--", String(managedPid)],
    },
  ]);
  const state = JSON.parse(
    await fs.readFile(path.join(testDataDir, "tailscale", "state.json"), "utf8")
  );
  assert.equal(state.daemonPid, null);
});

test("password-backed shutdown revalidates identity before SIGKILL", async () => {
  const managedPid = 41008;
  await writeDaemonOwnership(managedPid, managedPid);
  const tunnel = await importFresh("sudo-kill-revalidation");
  let identityReads = 0;
  const restoreIdentityReader = tunnel.__setTailscaleProcessIdentityReaderForTests(async () => {
    identityReads += 1;
    if (identityReads < 3) return managedProcessIdentity();
    return managedProcessIdentity({ stateDir: `${path.join(testDataDir, "tailscale")}-reused` });
  });
  process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
    assert.equal(pid, managedPid);
    if (signal === 0 || signal === "SIGTERM") {
      throw Object.assign(new Error("permission denied"), { code: "EPERM" });
    }
    throw new Error(`unexpected signal ${String(signal)}`);
  }) as typeof process.kill;
  spawnImplementation = () => createSuccessfulChild();

  try {
    await assert.rejects(
      () => tunnel.stopTailscaleDaemon({ sudoPassword: "test-only" }),
      /Refusing to stop unverified tailscaled process/
    );
  } finally {
    restoreIdentityReader();
  }

  assert.equal(identityReads, 3);
  assert.deepEqual(
    externalCalls.filter((call) => call.kind === "spawn"),
    [
      {
        kind: "spawn",
        command: "sudo",
        args: ["-S", "kill", "-TERM", "--", String(managedPid)],
      },
    ]
  );
  const state = JSON.parse(
    await fs.readFile(path.join(testDataDir, "tailscale", "state.json"), "utf8")
  );
  assert.equal(state.daemonPid, managedPid);
});

test("exact owned PID fails closed when elevation is required", async () => {
  const managedPid = 41006;
  await writeDaemonOwnership(managedPid, managedPid);
  const tunnel = await importFresh("elevation-required");
  const restoreIdentityReader = tunnel.__setTailscaleProcessIdentityReaderForTests(async () =>
    managedProcessIdentity()
  );
  process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
    assert.equal(pid, managedPid);
    if (signal === 0 || signal === "SIGTERM") {
      throw Object.assign(new Error("permission denied"), { code: "EPERM" });
    }
    throw new Error(`unexpected signal ${String(signal)}`);
  }) as typeof process.kill;

  try {
    await assert.rejects(
      () => tunnel.stopTailscaleDaemon(),
      /requires elevated permission to stop/
    );
  } finally {
    restoreIdentityReader();
  }

  assert.deepEqual(externalCalls, []);
  const state = JSON.parse(
    await fs.readFile(path.join(testDataDir, "tailscale", "state.json"), "utf8")
  );
  assert.equal(state.daemonPid, managedPid);
});
