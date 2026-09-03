import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// #9156: macOS launchd autostart fails because the supervisor spawns the child
// with bare "node", but launchd's PATH cannot resolve it. process.execPath is
// always the absolute path to the running Node.js binary and is always resolvable.
//
// We verify the fix via:
//   1. Static source analysis — the spawn() call must use process.execPath
//      unconditionally (no fallback to bare "node"). This runs without any
//      experimental flags so it serves as the permanent regression guard.
//   2. Runtime test via mock.module (requires --experimental-test-module-mocks)
//      that captures the actual spawn arguments.

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const SUPERVISOR_PATH = path.resolve(
  __dirname,
  "../../../bin/cli/runtime/processSupervisor.mjs"
);
const supervisorSrc = fs.readFileSync(SUPERVISOR_PATH, "utf8");

// ---------------------------------------------------------------------------
// 1. Source-level verification (no experimental flag required)
// ---------------------------------------------------------------------------

test("spawn() uses process.execPath unconditionally, no bare 'node' fallback (#9156)", () => {
  // Must NOT contain the old conditional that falls back to bare "node"
  assert.ok(
    !supervisorSrc.includes('process.versions.bun ? process.execPath : "node"'),
    "must NOT have a conditional fallback to bare 'node'"
  );

  // Must use process.execPath as the first argument to spawn()
  const execPathPattern = /spawn\(\s*process\.execPath\s*,/;
  assert.ok(
    execPathPattern.test(supervisorSrc),
    "spawn() must receive process.execPath as first argument"
  );
});

test("process.execPath is an absolute path to the running Node.js binary", () => {
  assert.ok(
    path.isAbsolute(process.execPath),
    `process.execPath must be absolute, got: ${process.execPath}`
  );
  assert.ok(
    fs.existsSync(process.execPath),
    `process.execPath must exist: ${process.execPath}`
  );
});

// ---------------------------------------------------------------------------
// 2. Runtime test via mock.module (requires --experimental-test-module-mocks)
// ---------------------------------------------------------------------------
//
// Run manually: node --experimental-test-module-mocks --import tsx/esm --test tests/unit/repro-9156.test.ts

import { mock } from "node:test";

if (typeof mock.module === "function") {
  test("(runtime) ServerSupervisor.start() spawns with process.execPath (#9156)", async () => {
    let spawnExecutable: string | undefined;
    const { EventEmitter } = await import("node:events");

    const mockChild = Object.assign(new EventEmitter(), {
      pid: 12345,
      stdout: null,
      stderr: null,
      kill: () => {},
    });

    mock.module("node:child_process", {
      exports: {
        spawn: (...args: unknown[]) => {
          spawnExecutable = args[0] as string;
          return mockChild;
        },
      },
    });

    process.env.PORT = "0";

    const { ServerSupervisor } = await import(
      "../../../bin/cli/runtime/processSupervisor.mjs"
    );

    const supervisor = new ServerSupervisor({
      serverPath: "/fake/server.js",
      env: {},
      maxRestarts: 0,
    });

    spawnExecutable = undefined;
    supervisor.start();

    assert.ok(spawnExecutable, "spawn() must have been called");
    assert.equal(
      spawnExecutable,
      process.execPath,
      `expected process.execPath, got: ${spawnExecutable}`
    );
    assert.notEqual(spawnExecutable, "node", "must not be bare 'node'");

    mockChild.removeAllListeners();
    delete process.env.PORT;
  });
}