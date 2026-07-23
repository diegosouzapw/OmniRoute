/**
 * Regression test for #3347 — Electron "Exit" leaves a process in memory that locks
 * omniroute.exe on Windows.
 *
 * The embedded server is spawned via process.execPath (= omniroute.exe) with
 * ELECTRON_RUN_AS_NODE=1. On Windows, ChildProcess.kill()/SIGTERM/SIGKILL terminate ONLY
 * the direct child — NOT its descendants — so server-spawned grandchildren (embedded
 * services, MITM proxy, tunnels, several also omniroute.exe-as-node) survive and keep the
 * .exe locked, blocking updates. killProcessTree() must use `taskkill /PID <pid> /T /F`
 * (the /T flag walks the tree) on win32, and signal-based kill on POSIX (where signals
 * propagate). This test pins that platform branch, plus a static guard that main.js routes
 * the server shutdown through killProcessTree (not a raw nextServer.kill).
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { killProcessTree } = require("../../electron/processTree.js");

describe("killProcessTree (#3347)", () => {
  it("win32: kills the whole tree via `taskkill /PID <pid> /T /F` (not proc.kill)", () => {
    const spawnCalls: Array<{ cmd: string; args: string[] }> = [];
    let procKillCalled = false;
    const proc = {
      pid: 1234,
      kill: () => {
        procKillCalled = true;
      },
    };
    const spawnFn = (cmd: string, args: string[]) => {
      spawnCalls.push({ cmd, args });
      return { on: () => {} };
    };

    killProcessTree(proc, { platform: "win32", signal: "SIGTERM", spawnFn });

    assert.equal(spawnCalls.length, 1, "expected exactly one taskkill spawn");
    assert.equal(spawnCalls[0].cmd, "taskkill");
    assert.deepEqual(spawnCalls[0].args, ["/PID", "1234", "/T", "/F"]);
    assert.equal(procKillCalled, false, "must NOT fall back to proc.kill when taskkill spawns");
  });

  it("posix: uses signal-based proc.kill (signals propagate), never taskkill", () => {
    let killedWith: string | null = null;
    let spawned = false;
    const proc = {
      pid: 4321,
      kill: (sig: string) => {
        killedWith = sig;
      },
    };
    const spawnFn = () => {
      spawned = true;
      return { on: () => {} };
    };

    killProcessTree(proc, { platform: "linux", signal: "SIGTERM", spawnFn });

    assert.equal(killedWith, "SIGTERM");
    assert.equal(spawned, false, "must not spawn taskkill on POSIX");
  });

  it("win32 fallback: taskkill spawn throwing falls back to proc.kill", () => {
    let killedWith: string | null = null;
    const proc = {
      pid: 99,
      kill: (sig: string) => {
        killedWith = sig;
      },
    };
    const spawnFn = () => {
      throw new Error("taskkill not found");
    };

    killProcessTree(proc, { platform: "win32", signal: "SIGKILL", spawnFn });

    assert.equal(killedWith, "SIGKILL", "fallback to proc.kill when taskkill is unavailable");
  });

  it("no-op on null/pid-less process (does not throw)", () => {
    assert.doesNotThrow(() => killProcessTree(null, { platform: "win32" }));
    assert.doesNotThrow(() => killProcessTree({ pid: undefined }, { platform: "win32" }));
  });
});

describe("Electron main.js server shutdown routes through killProcessTree (#3347)", () => {
  const main = readFileSync(join(import.meta.dirname, "../../electron/main.js"), "utf8");

  it("requires the processTree helper", () => {
    assert.match(main, /require\(["']\.\/processTree["']\)/);
  });

  it("does not kill the server child with a raw signal kill (must use the tree-kill)", () => {
    // The two shutdown call sites (stopNextServer + waitForServerExit) must not use a bare
    // `nextServer.kill(` / `proc.kill("SIGKILL")` on the server proc anymore.
    assert.doesNotMatch(main, /nextServer\.kill\(/);
    assert.ok(
      /killProcessTree\s*\(/.test(main),
      "main.js must call killProcessTree() for server shutdown"
    );
  });
});
