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
        command: "node",
        args: ["--dns-result-order=ipv4first", "--max-old-space-size=2048", "/app/server.js"],
      },
    ]);
  } finally {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    rmSync(dataDir, { recursive: true, force: true });
  }
});
