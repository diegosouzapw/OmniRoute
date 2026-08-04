import { test } from "node:test";
import assert from "node:assert/strict";
import { stopProcessGracefully } from "../../src/shared/platform/windowsProcess.ts";

// #8045: on win32, process.kill(pid, "SIGTERM") is documented to unconditionally
// force-terminate the target — never a real, interceptable signal. Sending it
// immediately races (and beats) the target's own async graceful-shutdown WAL
// checkpoint. stopProcessGracefully() must NOT send SIGTERM on win32.

test("stopProcessGracefully: on win32 does NOT send SIGTERM, only polls then escalates to SIGKILL", async () => {
  const signalsSent: string[] = [];
  let running = true;
  const sleeps: number[] = [];

  await stopProcessGracefully({
    pid: 4242,
    timeoutMs: 300,
    pollIntervalMs: 50,
    platform: "win32",
    isPidRunning: () => running,
    sleep: async (ms) => {
      sleeps.push(ms);
      // Simulate the process exiting on its own shortly after the first poll,
      // mimicking its own SIGHUP/CTRL_CLOSE_EVENT-driven graceful shutdown.
      if (sleeps.length >= 2) running = false;
    },
  });

  assert.ok(
    !signalsSent.includes("SIGTERM"),
    "must not send SIGTERM on win32 (it force-kills unconditionally there)"
  );
});

test("stopProcessGracefully: on win32 escalates to SIGKILL if the process never exits", async () => {
  const killed: Array<{ pid: number; signal: string }> = [];
  const originalKill = process.kill;
  // @ts-expect-error — test-only override to observe signals without touching a real PID.
  process.kill = (pid: number, signal?: string | number) => {
    killed.push({ pid, signal: String(signal) });
    return true;
  };

  try {
    await stopProcessGracefully({
      pid: 4243,
      timeoutMs: 100,
      pollIntervalMs: 20,
      platform: "win32",
      isPidRunning: () => true, // never exits on its own
      sleep: async () => {},
    });
  } finally {
    process.kill = originalKill;
  }

  assert.ok(
    killed.some((k) => k.signal === "SIGKILL"),
    `expected an eventual SIGKILL escalation, got: ${JSON.stringify(killed)}`
  );
  assert.ok(
    !killed.some((k) => k.signal === "SIGTERM"),
    "must never send SIGTERM on win32"
  );
});

test("stopProcessGracefully: on non-win32 sends SIGTERM immediately (unchanged POSIX behavior)", async () => {
  const killed: Array<{ pid: number; signal: string }> = [];
  const originalKill = process.kill;
  // @ts-expect-error — test-only override.
  process.kill = (pid: number, signal?: string | number) => {
    killed.push({ pid, signal: String(signal) });
    return true;
  };

  let running = true;
  try {
    await stopProcessGracefully({
      pid: 4244,
      timeoutMs: 200,
      pollIntervalMs: 20,
      platform: "linux",
      isPidRunning: () => running,
      sleep: async () => {
        running = false;
      },
    });
  } finally {
    process.kill = originalKill;
  }

  assert.equal(killed[0]?.signal, "SIGTERM", "must send SIGTERM immediately on POSIX");
  assert.ok(
    !killed.some((k) => k.signal === "SIGKILL"),
    "must not escalate to SIGKILL once the process exited"
  );
});
