import test from "node:test";
import assert from "node:assert/strict";
import { restartRunningServer } from "@/lib/system/processManagerRestart";

// #11885: the dashboard's npm-mode Update flow (src/app/api/system/version/route.ts)
// hardcoded `pm2 restart omniroute` as the ONLY restart mechanism, at two
// near-identical branches. When pm2 isn't the process manager (OmniRoute's own
// `omniroute serve --daemon` supervisor, or plain `npm run start`) it silently
// degraded to a "skipped" status while the install step still reported "done" —
// reading like a completed live update when the running server never restarted.

test("restartRunningServer: uses OmniRoute's own supervisor when both the supervisor and server pids are alive", async () => {
  const killed = [];
  const pm2Calls = [];
  const outcome = await restartRunningServer({
    readPidFile: (service) => (service === "supervisor" ? 111 : service === "server" ? 222 : null),
    isPidRunning: (pid) => pid === 111 || pid === 222,
    killProcess: (pid) => killed.push(pid),
    execPm2: async (args) => {
      pm2Calls.push(args);
    },
  });

  assert.equal(outcome.method, "own-supervisor");
  assert.equal(outcome.status, "done");
  // Must SIGTERM the supervised SERVER child, never the supervisor itself — killing
  // the supervisor sets its isShuttingDown flag and intentionally skips the respawn
  // (see bin/cli/commands/stop.mjs), which would NOT produce a restart.
  assert.deepEqual(killed, [222]);
  assert.equal(pm2Calls.length, 0, "must not fall back to pm2 when the own supervisor path succeeds");
});

test("restartRunningServer: falls back to pm2 when no OmniRoute supervisor is detected", async () => {
  const pm2Calls = [];
  const outcome = await restartRunningServer({
    readPidFile: () => null,
    isPidRunning: () => false,
    killProcess: () => {
      throw new Error("must not be called");
    },
    execPm2: async (args) => {
      pm2Calls.push(args);
    },
  });

  assert.equal(outcome.method, "pm2");
  assert.equal(outcome.status, "done");
  assert.equal(pm2Calls.length, 1);
  assert.deepEqual(pm2Calls[0], ["restart", "omniroute", "--update-env"]);
});

test("restartRunningServer: falls back to pm2 when the supervisor pid is stale", async () => {
  const pm2Calls = [];
  const outcome = await restartRunningServer({
    readPidFile: (service) => (service === "supervisor" ? 999 : null),
    isPidRunning: () => false,
    killProcess: () => {
      throw new Error("must not be called");
    },
    execPm2: async (args) => {
      pm2Calls.push(args);
    },
  });

  assert.equal(outcome.method, "pm2");
});

test("restartRunningServer: returns an honest restart-required outcome when neither is available (no silent 'skipped')", async () => {
  const outcome = await restartRunningServer({
    readPidFile: () => null,
    isPidRunning: () => false,
    execPm2: async () => {
      throw new Error("pm2: command not found");
    },
  });

  assert.equal(outcome.method, "none");
  assert.equal(outcome.status, "restart-required");
  assert.match(outcome.message, /restart/i);
});
