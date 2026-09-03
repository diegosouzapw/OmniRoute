import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

import {
  buildNotifyMessage,
  createSystemdNotifier,
  isSystemdNotifyEnabled,
  SD_NOTIFY_WATCHDOG_INTERVAL_MS,
} from "../../../scripts/dev/systemd-notify.mjs";

function fakeSpawn(recorder) {
  return (binary, args, options) => {
    const child = new EventEmitter();
    recorder.push({ binary, args, options, child });
    return child;
  };
}

function systemdNotifyAvailable() {
  try {
    return spawnSync("systemd-notify", ["--version"], { stdio: "ignore" }).status === 0;
  } catch {
    return false;
  }
}

function python3Available() {
  try {
    return spawnSync("python3", ["--version"], { stdio: "ignore" }).status === 0;
  } catch {
    return false;
  }
}

// Waits for the listener to emit every `expected` line, then resolves with
// everything it saw. The notifier spawns one process per signal, so AF_UNIX
// datagram arrival order is not guaranteed across those processes.
// Fails loudly on timeout or premature exit.
// BARRIER=1 datagrams (sd_notify synchronization emitted by the systemd-notify
// CLI after every message) are noise for this contract and are skipped.
function waitForLines(child, expected, timeoutMs) {
  return new Promise((resolve, reject) => {
    let buf = "";
    const seen = [];
    const timer = setTimeout(
      () => reject(new Error(`listener timed out after ${timeoutMs}ms; got: ${seen.join(", ")}`)),
      timeoutMs
    );
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      buf += chunk;
      let idx;
      while ((idx = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, idx).trim();
        buf = buf.slice(idx + 1);
        if (!line || line === "BARRIER=1") continue;
        seen.push(line);
        if (expected.every((expectedLine) => seen.includes(expectedLine))) {
          clearTimeout(timer);
          resolve([...seen]);
        }
      }
    });
    child.on("exit", () => {
      if (expected.some((expectedLine) => !seen.includes(expectedLine))) {
        clearTimeout(timer);
        reject(new Error(`listener exited early; got: ${seen.join(", ")}`));
      }
    });
  });
}

test("isSystemdNotifyEnabled: false without NOTIFY_SOCKET", () => {
  assert.equal(isSystemdNotifyEnabled({}), false);
  assert.equal(isSystemdNotifyEnabled({ OMNIROUTE_DISABLE_SD_NOTIFY: "0" }), false);
});

test("isSystemdNotifyEnabled: true when NOTIFY_SOCKET is set", () => {
  assert.equal(isSystemdNotifyEnabled({ NOTIFY_SOCKET: "/run/systemd/notify" }), true);
});

test("isSystemdNotifyEnabled: opt-out OMNIROUTE_DISABLE_SD_NOTIFY=1 wins", () => {
  assert.equal(
    isSystemdNotifyEnabled({
      NOTIFY_SOCKET: "/run/systemd/notify",
      OMNIROUTE_DISABLE_SD_NOTIFY: "1",
    }),
    false
  );
});

test("notifier honors the opt-out (no spawn, no timer)", async () => {
  const calls = [];
  const notifier = createSystemdNotifier({
    env: { NOTIFY_SOCKET: "/run/systemd/notify", OMNIROUTE_DISABLE_SD_NOTIFY: "1" },
    spawnFn: fakeSpawn(calls),
  });
  assert.equal(notifier.enabled, false);
  notifier.ready();
  notifier.startWatchdog();
  await new Promise((resolve) => setTimeout(resolve, 15));
  assert.deepEqual(calls, []);
  notifier.dispose();
});

// Contract with the generated systemd unit (bin/cli/tray/autostart.mjs):
// systemd requires keep-alive pings at most every WatchdogSec/2, and the
// generated unit pins WatchdogSec=180. If either side drifts, this fails
// loudly instead of silently breaking the watchdog.
test("watchdog cadence satisfies the generated unit's WatchdogSec", () => {
  const generatedWatchdogSec = 180;
  assert.ok(
    2 * SD_NOTIFY_WATCHDOG_INTERVAL_MS <= generatedWatchdogSec * 1000,
    `ping interval ${SD_NOTIFY_WATCHDOG_INTERVAL_MS}ms must be <= WatchdogSec/2 (${generatedWatchdogSec / 2}s)`
  );
});

test("buildNotifyMessage: known kinds", () => {
  assert.equal(buildNotifyMessage("ready"), "READY=1");
  assert.equal(buildNotifyMessage("watchdog"), "WATCHDOG=1");
  assert.equal(buildNotifyMessage("stopping"), "STOPPING=1");
});

test("buildNotifyMessage: unknown kind throws", () => {
  assert.throws(() => buildNotifyMessage("bogus"), /unknown message kind/);
});

test("disabled notifier is a complete no-op (no spawn, no timer)", async () => {
  const calls = [];
  const notifier = createSystemdNotifier({ env: {}, spawnFn: fakeSpawn(calls) });
  assert.equal(notifier.enabled, false);
  notifier.ready();
  notifier.watchdog();
  notifier.stopping();
  notifier.startWatchdog();
  await new Promise((resolve) => setTimeout(resolve, 15));
  assert.deepEqual(calls, []);
  notifier.dispose();
});

test("enabled notifier sends the right message per kind", () => {
  const calls = [];
  const env = { NOTIFY_SOCKET: "/run/systemd/notify" };
  const notifier = createSystemdNotifier({ env, spawnFn: fakeSpawn(calls) });
  assert.equal(notifier.enabled, true);
  notifier.ready();
  notifier.watchdog();
  notifier.stopping();
  assert.deepEqual(
    calls.map((c) => c.args),
    [["READY=1"], ["WATCHDOG=1"], ["STOPPING=1"]]
  );
  calls.forEach((c) => {
    assert.equal(c.binary, "systemd-notify");
    assert.equal(c.options.env, env);
    assert.deepEqual(c.options.stdio, "ignore");
  });
});

test("spawn failure disables the notifier once and stops the watchdog", async () => {
  const calls = [];
  const warnings = [];
  const env = { NOTIFY_SOCKET: "/run/systemd/notify" };
  const notifier = createSystemdNotifier({
    env,
    spawnFn: fakeSpawn(calls),
    onWarn: (m) => warnings.push(m),
  });
  notifier.ready();
  calls[0].child.emit("error", { code: "ENOENT" });
  assert.equal(notifier.enabled, true); // env guard unchanged
  notifier.watchdog();
  notifier.stopping();
  notifier.startWatchdog();
  assert.equal(calls.length, 1, "no further spawn after disable");
  assert.equal(warnings.length, 1, "warning emitted exactly once");
  assert.match(warnings[0], /ENOENT/);
  notifier.dispose();
});

test("watchdog interval pings repeatedly and dispose() stops it", async () => {
  const calls = [];
  const env = { NOTIFY_SOCKET: "/run/systemd/notify" };
  // Interval is intentionally tiny (5ms) with a generous wait window (150ms — 30x the
  // interval) so this stays deterministic under CI/CPU-contended runs: only 2 pings are
  // required, well within reach even at >10x scheduler jitter.
  const notifier = createSystemdNotifier({
    env,
    watchdogIntervalMs: 5,
    spawnFn: fakeSpawn(calls),
  });
  notifier.ready();
  notifier.startWatchdog();
  await new Promise((resolve) => setTimeout(resolve, 150));
  notifier.dispose();
  const watchdogCalls = calls.filter((c) => c.args[0] === "WATCHDOG=1").length;
  assert.ok(watchdogCalls >= 2, `expected >= 2 watchdog pings, got ${watchdogCalls}`);
  const before = calls.length;
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(calls.length, before, "no ping after dispose");
});

// End-to-end handshake against the real `systemd-notify` binary: a fake
// NOTIFY_SOCKET (AF_UNIX datagram listener on a temp path, hosted by a tiny
// python3 helper — node:dgram only supports udp4/udp6) receives the exact
// datagrams a real systemd would see. Skipped where the binary or python3 is
// absent (Windows runners, minimal containers) — the spawn-level contract
// above still applies there.
const PY_DGRAM_LISTENER = `
import socket, sys, os
s = socket.socket(socket.AF_UNIX, socket.SOCK_DGRAM)
p = sys.argv[1]
try:
    os.unlink(p)
except OSError:
    pass
s.bind(p)
print("LISTENING", flush=True)
while True:
    try:
        print(s.recv(4096).decode(), flush=True)
    except OSError:
        break
`;

test(
  "real handshake: systemd-notify delivers READY=1/WATCHDOG=1/STOPPING=1 over a fake NOTIFY_SOCKET",
  {
    skip:
      (!systemdNotifyAvailable() || !python3Available()) &&
      "systemd-notify and/or python3 unavailable",
  },
  async () => {
    const sockPath = path.join(os.tmpdir(), `omniroute-sdnotify-${process.pid}.sock`);
    const listener = spawn("python3", ["-c", PY_DGRAM_LISTENER, sockPath], {
      stdio: ["ignore", "pipe", "ignore"],
    });
    try {
      await waitForLines(listener, ["LISTENING"], 5000);
      const notifier = createSystemdNotifier({
        env: { NOTIFY_SOCKET: sockPath, PATH: process.env.PATH },
      });
      assert.equal(notifier.enabled, true);
      notifier.ready();
      notifier.watchdog();
      notifier.stopping();
      const received = await waitForLines(listener, ["READY=1", "WATCHDOG=1", "STOPPING=1"], 10000);
      assert.deepEqual(received.toSorted(), ["READY=1", "STOPPING=1", "WATCHDOG=1"]);
      notifier.dispose();
    } finally {
      listener.kill();
      fs.rmSync(sockPath, { force: true });
    }
  }
);
