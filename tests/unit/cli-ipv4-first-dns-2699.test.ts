import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { mkdtempSync, rmSync } from "node:fs";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { buildNodeRuntimeArgs } from "../../scripts/build/runtime-env.mjs";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const originalSpawn = childProcess.spawn;

test.afterEach(() => {
  childProcess.spawn = originalSpawn;
  syncBuiltinESMExports();
});

test("Node server runtime prefers IPv4 DNS before the server entrypoint", () => {
  assert.deepEqual(buildNodeRuntimeArgs({}, 2048, "/app/server.js"), [
    "--dns-result-order=ipv4first",
    "--max-old-space-size=2048",
    "/app/server.js",
  ]);
});

test("Node server runtime preserves an explicit heap setting while preferring IPv4", () => {
  assert.deepEqual(
    buildNodeRuntimeArgs(
      { NODE_OPTIONS: "--enable-source-maps --max-old-space-size=8192" },
      512,
      "/app/server.js"
    ),
    ["--dns-result-order=ipv4first", "/app/server.js"]
  );
});

test("ServerSupervisor starts Node with IPv4-first DNS", async () => {
  const spawnCalls: Array<{ command: string; args: string[] }> = [];
  const child = Object.assign(new EventEmitter(), {
    pid: 2699,
    stdout: new EventEmitter(),
    stderr: new EventEmitter(),
  });
  childProcess.spawn = (command: string, args: string[]) => {
    spawnCalls.push({ command, args });
    return child;
  };
  syncBuiltinESMExports();

  const dataDir = mkdtempSync(join(tmpdir(), "omniroute-ipv4-first-"));
  const previousDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;
  // The supervisor reads process.env (not its own `env`) to decide whether an
  // explicit --max-old-space-size is already pinned via NODE_OPTIONS, in which
  // case it suppresses its own heap flag (envHasExplicitHeapFlag). CI runs with
  // no heap flag in NODE_OPTIONS, but this suite can be launched with an ambient
  // NODE_OPTIONS=--max-old-space-size=... (e.g. the sandbox exports one), which
  // would make the supervisor legitimately drop the flag and fail the assertion
  // below. Neutralize it for the duration of this test so the expectation
  // matches the CI environment.
  const previousNodeOptions = process.env.NODE_OPTIONS;
  delete process.env.NODE_OPTIONS;

  try {
    const moduleUrl = pathToFileURL(
      join(process.cwd(), "bin/cli/runtime/processSupervisor.mjs")
    ).href;
    const { ServerSupervisor } = await import(`${moduleUrl}?ipv4-first=${Date.now()}`);
    const supervisor = new ServerSupervisor({
      serverPath: "/app/server.js",
      env: {},
      memoryLimit: 2048,
    });

    supervisor.start();

    assert.deepEqual(spawnCalls, [
      {
        command: process.execPath,
        args: ["--dns-result-order=ipv4first", "--max-old-space-size=2048", "/app/server.js"],
      },
    ]);
  } finally {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    if (previousNodeOptions === undefined) delete process.env.NODE_OPTIONS;
    else process.env.NODE_OPTIONS = previousNodeOptions;
    rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
