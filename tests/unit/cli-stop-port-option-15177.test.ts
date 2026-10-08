import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Command } from "commander";

// #15177: `omniroute stop` must be able to find a server that is NOT on 20128 and must not
// claim success when it could not look for one.

test("stop accepts --port (runStopCommand reads opts.port, so the option must exist)", async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stop-15177-"));
  const prev = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;
  try {
    const { registerStop } = await import("../../bin/cli/commands/stop.mjs");
    const program = new Command();
    program.exitOverride();
    program.configureOutput({ writeErr: () => {}, writeOut: () => {} });
    registerStop(program);
    const stopCmd = program.commands.find((c) => c.name() === "stop");
    assert.ok(stopCmd, "stop command registered");
    const flags = stopCmd.options.map((o) => o.long);
    assert.ok(
      flags.includes("--port"),
      `stop must expose --port (opts.port is read by runStopCommand); got ${JSON.stringify(flags)}`
    );
  } finally {
    if (prev === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prev;
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("stop does not print 'stopped' when the port-discovery tool (lsof) is missing", async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stop-15177-"));
  const prev = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;
  const logs: string[] = [];
  const origLog = console.log;
  console.log = (...a: unknown[]) => logs.push(a.join(" "));
  try {
    const { runStopCommand } = await import("../../bin/cli/commands/stop.mjs");
    const enoent = Object.assign(new Error("spawn lsof ENOENT"), { code: "ENOENT" });
    await runStopCommand(
      {},
      {
        execFileAsync: async () => {
          throw enoent;
        },
        processKill: () => true,
        isPidRunning: () => false,
        sleep: async () => {},
      }
    );
    const { t } = await import("../../bin/cli/i18n.mjs");
    assert.ok(
      !logs.includes(t("stop.stopped")),
      `must not claim the server stopped when it could not look for it; logs=${JSON.stringify(logs)}`
    );
  } finally {
    console.log = origLog;
    if (prev === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prev;
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("stale PID file still falls back to the port and kills the listener (no real kill)", async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stop-15177-"));
  const prev = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;
  const origLog = console.log;
  console.log = () => {};
  try {
    const { runStopCommand } = await import("../../bin/cli/commands/stop.mjs");
    fs.mkdirSync(path.join(dataDir, "server"), { recursive: true });
    fs.writeFileSync(path.join(dataDir, "server", ".pid"), "999999");
    const killed: Array<[number, string]> = [];
    let alive = true;
    const code = await runStopCommand(
      { port: "20999" },
      {
        platform: "linux",
        execFileAsync: async (_c: string, args: string[]) => {
          assert.ok(args.includes("-iTCP:20999"));
          return { stdout: "424242\n" };
        },
        processKill: (p: number, s: string) => {
          killed.push([p, s]);
          alive = false;
          return true;
        },
        isPidRunning: (p: number) => (p === 424242 ? alive : false),
        sleep: async () => {},
      }
    );
    assert.equal(code, 0);
    assert.deepEqual(killed, [[424242, "SIGTERM"]]);
  } finally {
    console.log = origLog;
    if (prev === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prev;
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});
