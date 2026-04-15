import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { EventEmitter } from "node:events";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const modulePath = path.join(process.cwd(), "scripts/runtime-env.mjs");

const originalSpawn = childProcess.spawn;
const originalProcessOn = process.on;
const originalProcessExit = process.exit;
const originalProcessKill = process.kill;

async function loadRuntimeEnv(label) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

test.afterEach(() => {
  childProcess.spawn = originalSpawn;
  process.on = originalProcessOn;
  process.exit = originalProcessExit;
  process.kill = originalProcessKill;
  syncBuiltinESMExports();
});

test("runtime env helpers normalize runtime ports and conflicting color flags", async () => {
  const runtimeEnv = await loadRuntimeEnv("helpers");

  assert.deepEqual(
    runtimeEnv.withRuntimePortEnv(
      { NODE_ENV: "test" },
      { basePort: 20128, apiPort: 21128, dashboardPort: 22128 }
    ),
    {
      NODE_ENV: "test",
      OMNIROUTE_PORT: "20128",
      PORT: "22128",
      DASHBOARD_PORT: "22128",
      API_PORT: "21128",
    }
  );

  assert.deepEqual(
    runtimeEnv.sanitizeColorEnv({ FORCE_COLOR: "1", NO_COLOR: "1", TERM: "xterm-256color" }),
    { NO_COLOR: "1", TERM: "xterm-256color" }
  );
  assert.deepEqual(runtimeEnv.sanitizeColorEnv({ FORCE_COLOR: "1" }), { FORCE_COLOR: "1" });
});

test("spawnWithForwardedSignals forwards process signals and exit status", async () => {
  const signalHandlers = new Map();
  const childKillSignals = [];
  const processKills = [];
  const processExits = [];
  const spawnCalls = [];
  let child;

  childProcess.spawn = (command, args, options) => {
    spawnCalls.push({ command, args, options });
    child = new EventEmitter();
    child.kill = (signal) => childKillSignals.push(signal);
    return child;
  };
  process.on = (signal, handler) => {
    signalHandlers.set(signal, handler);
    return process;
  };
  process.exit = (code) => {
    processExits.push(code);
  };
  process.kill = (pid, signal) => {
    processKills.push({ pid, signal });
    return true;
  };
  syncBuiltinESMExports();

  const runtimeEnv = await loadRuntimeEnv("spawn");
  const returnedChild = runtimeEnv.spawnWithForwardedSignals("node", ["server.js"], {
    stdio: "inherit",
  });

  assert.equal(returnedChild, child);
  assert.deepEqual(spawnCalls, [
    {
      command: "node",
      args: ["server.js"],
      options: { stdio: "inherit" },
    },
  ]);

  signalHandlers.get("SIGINT")();
  signalHandlers.get("SIGTERM")();
  assert.deepEqual(childKillSignals, ["SIGINT", "SIGTERM"]);

  child.emit("exit", 3, null);
  child.emit("exit", null, "SIGTERM");

  assert.deepEqual(processExits, [3]);
  assert.deepEqual(processKills, [{ pid: process.pid, signal: "SIGTERM" }]);
});
