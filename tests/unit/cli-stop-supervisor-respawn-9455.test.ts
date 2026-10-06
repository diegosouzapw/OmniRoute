import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Repro for #9455: omniroute stop reports success but supervisor respawns child.
//
// Defect 1: runStopCommand() kills the child ("server") PID but never stops the
//   supervisor, which immediately respawns the child. The fix must have stop.mjs
//   read the "supervisor" PID file and SIGTERM the supervisor FIRST (its handler
//   sets isShuttingDown=true, kills the child, exits cleanly — no respawn).
//   Plus serve.mjs must persist the supervisor PID via writePidFile("supervisor", ...).
//
// Defect 2: killByPort() was a no-op on win32 (`if (process.platform === "win32") return;`)
//   yet runStopCommand still printed "Server stopped." and returned 0. The fix must
//   implement a win32 path using netstat -ano + process.kill.

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_PLATFORM = process.platform;

type KillByPortDeps = {
  platform?: string;
  execFileAsync?: (cmd: string, args: string[]) => Promise<{ stdout: string; stderr: string }>;
  processKill?: (pid: number, signal: string | number) => boolean;
  isPidRunning?: (pid: number) => boolean;
  sleep?: (ms: number) => Promise<void>;
};
type KillByPortFn = (port: number, deps?: KillByPortDeps) => Promise<boolean>;

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stop-sup-"));
}

function setupDataDir(dataDir: string) {
  fs.mkdirSync(path.join(dataDir, "server"), { recursive: true });
  fs.mkdirSync(path.join(dataDir, "supervisor"), { recursive: true });
}

function setServerPid(dataDir: string, p: number) {
  fs.writeFileSync(path.join(dataDir, "server", ".pid"), String(p), "utf8");
}
function setSupervisorPid(dataDir: string, p: number) {
  fs.writeFileSync(path.join(dataDir, "supervisor", ".pid"), String(p), "utf8");
}

async function withEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  globalThis.fetch = (async () => {
    throw new Error("server offline");
  }) as typeof fetch;

  const origLog = console.log;
  const origErr = console.error;
  console.log = () => {};
  console.error = () => {};

  try {
    await fn(dataDir);
  } finally {
    console.log = origLog;
    console.error = origErr;
    globalThis.fetch = ORIGINAL_FETCH;
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

// Track process.kill calls so the test can assert which PIDs were signalled
// without touching real processes. PIDs >= 1000000 are treated as alive.
function trackKills() {
  const kills: Array<{ pid: number; signal: string | number }> = [];
  const origKill = process.kill.bind(process);
  type KillFn = (pid: number, signal?: NodeJS.Signals | number) => boolean;
  const stub: KillFn = (pid, signal = 0) => {
    if (signal === 0) {
      return pid >= 1000000 ? true : (origKill(pid, 0), true);
    }
    if (pid >= 1000000) {
      kills.push({ pid, signal: signal as string | number });
      return true;
    }
    try {
      origKill(pid, signal as NodeJS.Signals);
      kills.push({ pid, signal: signal as string | number });
      return true;
    } catch {
      return false;
    }
  };
  (process as unknown as { kill: KillFn }).kill = stub;
  return {
    kills,
    restore() {
      (process as unknown as { kill: KillFn }).kill = origKill as KillFn;
    },
  };
}

test("Defect 1: stop must SIGTERM the supervisor BEFORE the child so it does not respawn (#9455)", async () => {
  await withEnv(async (dataDir) => {
    setupDataDir(dataDir);
    const SUPERVISOR_PID = 1000123;
    const CHILD_PID = 1000456;
    setSupervisorPid(dataDir, SUPERVISOR_PID);
    setServerPid(dataDir, CHILD_PID);

    const tracker = trackKills();
    try {
      const { runStopCommand } = await import("../../bin/cli/commands/stop.mjs");
      await runStopCommand({});
      const signalled = tracker.kills.map((k) => k.pid);
      assert.ok(
        signalled.includes(SUPERVISOR_PID),
        `supervisor PID ${SUPERVISOR_PID} must be signalled; got ${JSON.stringify(signalled)}`
      );
      // Supervisor must be signalled before the child (cascade order).
      const supIdx = signalled.indexOf(SUPERVISOR_PID);
      const childIdx = signalled.indexOf(CHILD_PID);
      if (childIdx !== -1) {
        assert.ok(
          supIdx < childIdx,
          `supervisor must be killed before child (supIdx=${supIdx} childIdx=${childIdx})`
        );
      }
    } finally {
      tracker.restore();
    }
  });
});

test("Defect 1b: pid.mjs SERVICES array must include supervisor so killAllSubprocesses reaches it (#9455)", async () => {
  const tmpDir = os.tmpdir() + "/omniroute-sup-pid-" + Date.now();
  process.env.DATA_DIR = tmpDir;
  try {
    const { writePidFile, readPidFile } = await import("../../bin/cli/utils/pid.mjs");
    const ok = writePidFile("supervisor", 555555);
    assert.equal(ok, true, "writePidFile('supervisor', ...) must succeed");
    assert.equal(readPidFile("supervisor"), 555555);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  const pidSrc = fs.readFileSync(path.join(process.cwd(), "bin/cli/utils/pid.mjs"), "utf8");
  assert.ok(
    /SERVICES\s*=\s*\[[^\]]*"supervisor"[^\]]*\]/.test(pidSrc),
    'pid.mjs SERVICES array must include "supervisor"'
  );
});

test("Defect 2: killByPort on win32 must actually kill the port listener via netstat -ano (#9455)", async () => {
  const FAKE_WIN_PID = 1000789;
  const kills: Array<{ pid: number; signal: string | number }> = [];
  const deps = {
    platform: "win32",
    execFileAsync: async (cmd: string, args: string[]) => {
      if (cmd.endsWith("netstat")) {
        return {
          stdout: `  TCP    0.0.0.0:20128    0.0.0.0:0    LISTENING    ${FAKE_WIN_PID}\r\n`,
          stderr: "",
        };
      }
      return { stdout: "", stderr: "" };
    },
    processKill: (p: number, sig: string | number) => {
      kills.push({ pid: p, signal: sig });
      return true;
    },
    isPidRunning: (_p: number) => false, // pretend SIGTERM already killed it
    sleep: async (_ms: number) => {},
  };

  const { killByPort } = await import("../../bin/cli/commands/stop.mjs");
  const freed = await (killByPort as unknown as KillByPortFn)(20128, deps);
  assert.equal(freed, true, "port must be reported free after killing the listener");
  assert.ok(
    kills.some((k) => k.pid === FAKE_WIN_PID),
    `win32 killByPort must signal the netstat PID ${FAKE_WIN_PID}; got ${JSON.stringify(kills)}`
  );
});

test("Defect 2b: killByPort on win32 with no listener returns true and signals nothing (#9455)", async () => {
  const kills: Array<{ pid: number; signal: string | number }> = [];
  const deps = {
    platform: "win32",
    execFileAsync: async (_cmd: string, _args: string[]) => ({ stdout: "", stderr: "" }),
    processKill: (p: number, sig: string | number) => {
      kills.push({ pid: p, signal: sig });
      return true;
    },
    isPidRunning: (_p: number) => false,
    sleep: async (_ms: number) => {},
  };

  const { killByPort } = await import("../../bin/cli/commands/stop.mjs");
  const freed = await (killByPort as unknown as KillByPortFn)(20128, deps);
  assert.equal(freed, true);
  assert.equal(kills.length, 0, "no PIDs should be signalled when none are listening");
});

test("netstat parsing: only LISTENING lines matching the exact port are selected (#9455)", async () => {
  const stdout = [
    "  TCP    0.0.0.0:20128    0.0.0.0:0    LISTENING    111",
    "  TCP    127.0.0.1:20128    0.0.0.0:0    LISTENING    222",
    "  TCP    0.0.0.0:120128    0.0.0.0:0    LISTENING    333", // different port (prefix)
    "  TCP    0.0.0.0:20128    0.0.0.0:0    TIME_WAIT    444", // not listening
  ].join("\r\n");
  const kills: Array<{ pid: number; signal: string | number }> = [];
  const deps = {
    platform: "win32",
    execFileAsync: async (_cmd: string, _args: string[]) => ({ stdout, stderr: "" }),
    processKill: (p: number, sig: string | number) => {
      kills.push({ pid: p, signal: sig });
      return true;
    },
    isPidRunning: (_p: number) => false,
    sleep: async (_ms: number) => {},
  };

  const { killByPort } = await import("../../bin/cli/commands/stop.mjs");
  await (killByPort as unknown as KillByPortFn)(20128, deps);
  const signalled = kills.map((k) => k.pid).sort();
  assert.deepEqual(signalled, [111, 222], "only exact-port LISTENING PIDs must be killed");
  void ORIGINAL_PLATFORM;
});
