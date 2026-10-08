import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-stop-"));
}

// With no PID file, stop falls back to the port. Without stubs that path runs the real
// `lsof` and the real process.kill against port 20128, killing whatever holds that port on
// the developer's machine (a running OmniRoute, a dashboard browser tab, a Docker/VM port
// forward). The stubs report no listener and record every signal attempt; terminatePids
// swallows errors from kill(), so tests assert on `kills` instead of relying on a throw.
function isolatedPortDeps() {
  const execCalls: Array<{ cmd: string; args: string[] }> = [];
  const kills: Array<{ pid: number; signal: string | number }> = [];
  return {
    execCalls,
    kills,
    deps: {
      execFileAsync: async (cmd: string, args: string[]) => {
        execCalls.push({ cmd, args });
        return { stdout: "", stderr: "" };
      },
      processKill: (pid: number, signal: string | number) => {
        kills.push({ pid, signal });
        return true;
      },
      isPidRunning: (_pid: number) => false,
      sleep: async (_ms: number) => {},
    },
  };
}

async function withEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  globalThis.fetch = (async () => {
    throw new Error("server offline");
  }) as typeof fetch;

  const originalLog = console.log;
  console.log = () => {};

  try {
    await fn(dataDir);
  } finally {
    console.log = originalLog;
    globalThis.fetch = ORIGINAL_FETCH;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

test("stop returns 0 when no server is running (no PID file)", async () => {
  await withEnv(async () => {
    const { runStopCommand } = await import("../../bin/cli/commands/stop.mjs");
    const { deps, execCalls, kills } = isolatedPortDeps();
    const result = await runStopCommand({}, deps);
    assert.equal(result, 0);
    assert.ok(execCalls.length > 0, "port fallback must go through the injected exec");
    assert.deepEqual(kills, [], "no process may be signalled when no listener is found");
  });
});

test("stop returns 0 when PID file exists but process is gone", async (t) => {
  await withEnv(async (dataDir) => {
    const pidPath = path.join(dataDir, "server.pid");
    fs.writeFileSync(pidPath, "999999999", "utf8");

    const { runStopCommand } = await import("../../bin/cli/commands/stop.mjs");
    const { deps, kills } = isolatedPortDeps();
    const result = await runStopCommand({}, deps);
    assert.equal(result, 0);
    assert.deepEqual(kills, [], "no process may be signalled");
  });
});

test("stop's POSIX port lookup selects listeners only, never connected clients", async () => {
  const { killByPort } = await import("../../bin/cli/commands/stop.mjs");
  const { deps, execCalls } = isolatedPortDeps();
  await killByPort(20128, { ...deps, platform: "darwin" });

  const lsof = execCalls.find((c) => c.cmd === "lsof");
  assert.ok(lsof, "POSIX path must query lsof");
  assert.ok(lsof.args.includes("-sTCP:LISTEN"), `lsof must filter to LISTEN: ${lsof.args}`);
  assert.ok(lsof.args.includes("-iTCP:20128"), `lsof must target the TCP port: ${lsof.args}`);
});
