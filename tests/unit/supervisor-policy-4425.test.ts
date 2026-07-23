import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

// #4425: the supervisor treated a clean exit (code 0) as intentional and exited instead
// of restarting — but a systemd MemoryMax cgroup kill reports code 0, so the OOM'd gateway
// stayed dead. And it restarted immediately after a crash, hitting EADDRINUSE before the
// OS released the port. supervisorPolicy centralizes the restart decision + a port-wait.

const {
  RESTART_RESET_MS,
  DEFAULT_MAX_RESTARTS,
  shouldExitInsteadOfRestart,
  computeRestartDelayMs,
  isPortFree,
  waitUntilPortFree,
} = await import("../../bin/cli/runtime/supervisorPolicy.mjs");

test("#4425 spontaneous code-0 exit restarts (only shutdown exits)", () => {
  assert.equal(shouldExitInsteadOfRestart(false), false); // OOM cgroup code-0 → restart
  assert.equal(shouldExitInsteadOfRestart(true), true); // operator stop() → exit
});

test("#4425 tuned recovery constants", () => {
  assert.equal(RESTART_RESET_MS, 60_000);
  assert.equal(DEFAULT_MAX_RESTARTS, 3);
});

test("#4425 restart backoff is 1s,2s,4s… capped at 10s", () => {
  assert.equal(computeRestartDelayMs(1), 1000);
  assert.equal(computeRestartDelayMs(2), 2000);
  assert.equal(computeRestartDelayMs(3), 4000);
  assert.equal(computeRestartDelayMs(10), 10_000);
});

test("#4425 isPortFree detects a bound port and waitUntilPortFree resolves once released", async () => {
  const server = net.createServer();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const port = (server.address() as net.AddressInfo).port;

  assert.equal(await isPortFree(port), false, "bound port is not free");

  // waitUntilPortFree should time out (return false) while the port stays bound.
  assert.equal(await waitUntilPortFree(port, 300, 50), false);

  await new Promise<void>((resolve) => server.close(() => resolve()));
  assert.equal(await isPortFree(port), true, "released port is free");
  assert.equal(await waitUntilPortFree(port, 1000, 50), true);
});

test("#4425 waitUntilPortFree no-ops on an invalid port", async () => {
  assert.equal(await waitUntilPortFree(undefined), true);
  assert.equal(await waitUntilPortFree(0), true);
});
