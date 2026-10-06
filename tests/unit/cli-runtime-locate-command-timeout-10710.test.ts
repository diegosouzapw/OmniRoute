/**
 * Regression test for #10710.
 *
 * locateCommand() (src/shared/services/cliRuntime.ts) used to collapse a
 * genuine probe timeout (runProcess's internal 3s timer SIGKILLing the
 * child) into the exact same reason:"not_found" as a truly-absent binary.
 * That made an installed CLI whose where.exe/`command -v` probe was starved
 * (e.g. under the all-statuses route's wide, undeduped ~30-tool fan-out)
 * indistinguishable from one that was never installed at all.
 */

import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { pathToFileURL } from "node:url";
import { EventEmitter } from "node:events";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const modulePath = path.join(process.cwd(), "src/shared/services/cliRuntime.ts");

const originalSpawn = childProcess.spawn;

async function importFresh(label: string) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`);
}

type FakeChildProcess = EventEmitter & {
  stdout: EventEmitter;
  stderr: EventEmitter;
  kill: (signal?: string) => boolean;
};

function installTimeoutSpawn() {
  childProcess.spawn = () => {
    const child = new EventEmitter() as FakeChildProcess;
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    // Model a real SIGKILL: the OS delivers 'close' shortly after the kill,
    // not synchronously -- but not before the internal 3s timeout fires.
    child.kill = () => {
      setImmediate(() => child.emit("close", null));
      return true;
    };
    return child;
  };
  syncBuiltinESMExports();
}

test.afterEach(() => {
  childProcess.spawn = originalSpawn;
  syncBuiltinESMExports();
});

test("#10710: locateCommand surfaces a distinct 'timeout' reason, not 'not_found'", async () => {
  installTimeoutSpawn();

  const cliRuntime = await importFresh("locate-timeout");
  const start = Date.now();
  const result = await cliRuntime.locateCommand("codex", { PATH: process.env.PATH });
  const elapsedMs = Date.now() - start;

  assert.ok(elapsedMs >= 2900, `expected the internal 3s timeout to fire, took ${elapsedMs}ms`);
  assert.equal(result.installed, false);
  assert.equal(
    result.reason,
    "timeout",
    "a probe timeout must not be relabeled as not_found -- indistinguishable from a genuinely absent binary"
  );
});

test("#10710: a timed-out first candidate does not hide a second candidate that resolves", async () => {
  let call = 0;
  childProcess.spawn = (_command: string) => {
    call += 1;
    const child = new EventEmitter() as FakeChildProcess;
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    if (call === 1) {
      // First candidate (e.g. "codex-preview") times out.
      child.kill = () => {
        setImmediate(() => child.emit("close", null));
        return true;
      };
    } else {
      // Second candidate (e.g. "codex") resolves quickly and successfully.
      child.kill = () => true;
      setImmediate(() => {
        child.stdout.emit("data", Buffer.from("/usr/local/bin/codex\n"));
        child.emit("close", 0);
      });
    }
    return child;
  };
  syncBuiltinESMExports();

  const cliRuntime = await importFresh("locate-candidate-fallthrough");
  const result = await cliRuntime.locateCommandCandidate(
    ["codex-preview", "codex"],
    { PATH: process.env.PATH },
    undefined
  );

  assert.equal(result.installed, true, "the second, quickly-resolving candidate must still be found");
  assert.equal(result.command, "codex");
});

test("#10710: when every candidate times out, the caller sees 'timeout' rather than 'not_found'", async () => {
  installTimeoutSpawn();

  const cliRuntime = await importFresh("locate-candidate-all-timeout");
  const result = await cliRuntime.locateCommandCandidate(
    ["codex-preview", "codex"],
    { PATH: process.env.PATH },
    undefined
  );

  assert.equal(result.installed, false);
  assert.equal(result.reason, "timeout");
});
