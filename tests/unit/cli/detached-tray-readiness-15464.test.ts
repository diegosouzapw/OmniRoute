import test, { mock } from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

// #15464: --tray launcher waits a fixed 60s for the worker, but the worker may
// still be running a lazy `npm install systray2` (timeout 120s, trayRuntime.ts)
// plus a 60-90s server boot. The parent then taskkills a healthy child.
async function runLauncher(tickMs: number, env?: string) {
  const { startDetachedTray } = await import("../../../bin/cli/tray/detachedTray.mjs");
  const prev = process.env.OMNIROUTE_TRAY_READY_TIMEOUT_MS;
  if (env === undefined) delete process.env.OMNIROUTE_TRAY_READY_TIMEOUT_MS;
  else process.env.OMNIROUTE_TRAY_READY_TIMEOUT_MS = env;
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const child = Object.assign(new EventEmitter(), { pid: 2147483000, unref() {} });
    let settled: "pending" | "resolved" | "rejected" = "pending";
    let reason = "";
    const p = startDetachedTray(
      { cliPath: "/nonexistent/omniroute.mjs", port: 20128, maxRestarts: 2 },
      { platform: "win32", spawnProcess: () => child as never }
    ).then(
      () => (settled = "resolved"),
      (e) => {
        settled = "rejected";
        reason = String(e?.message);
      }
    );
    await new Promise((r) => setImmediate(r));
    await new Promise((r) => setImmediate(r));
    mock.timers.tick(tickMs);
    await new Promise((r) => setImmediate(r));
    const snapshot = { settled, reason };
    mock.timers.tick(600_000);
    await p;
    return snapshot;
  } finally {
    mock.timers.reset();
    if (prev === undefined) delete process.env.OMNIROUTE_TRAY_READY_TIMEOUT_MS;
    else process.env.OMNIROUTE_TRAY_READY_TIMEOUT_MS = prev;
  }
}

test("startDetachedTray does not give up on a still-booting worker at 61s (win32)", async () => {
  const { settled, reason } = await runLauncher(61_000);
  assert.equal(
    settled,
    "pending",
    `launcher gave up at 61s (${reason}); worker install alone may take up to 120s`
  );
});

test("startDetachedTray still rejects once the (longer) default deadline passes", async () => {
  const { settled } = await runLauncher(241_000);
  assert.equal(settled, "rejected");
});

test("OMNIROUTE_TRAY_READY_TIMEOUT_MS overrides the readiness deadline", async () => {
  const early = await runLauncher(11_000, "10000");
  assert.equal(early.settled, "rejected");
  const late = await runLauncher(61_000, "not-a-number");
  assert.equal(late.settled, "pending");
});
