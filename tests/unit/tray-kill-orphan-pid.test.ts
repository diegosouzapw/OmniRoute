import test from "node:test";
import assert from "node:assert/strict";

import {
  getSystrayChildPid,
  killSystrayUnix,
} from "../../bin/cli/tray/traySystray.mjs";

// Regression guard for the macOS orphan-NSStatusItem bug: systray2.kill(false)
// only closes the IPC channel and leaves the Go tray binary subprocess running.
// killSystrayUnix() must SIGKILL the child PID FIRST so a freshly spawned tray
// (respawn / hide-to-tray) can register a new NSStatusItem.

test("getSystrayChildPid reads pid from the _process field", () => {
  const tray = { _process: { pid: 4242 } };
  assert.equal(getSystrayChildPid(tray), 4242);
});

test("getSystrayChildPid falls back to the process() accessor", () => {
  const tray = { process: () => ({ pid: 777 }) };
  assert.equal(getSystrayChildPid(tray), 777);
});

test("getSystrayChildPid returns null when no child process is exposed", () => {
  assert.equal(getSystrayChildPid({}), null);
  assert.equal(getSystrayChildPid(null), null);
  assert.equal(getSystrayChildPid({ _process: {} }), null);
});

test("killSystrayUnix SIGKILLs the child PID BEFORE closing IPC", () => {
  const calls: string[] = [];
  const origKill = process.kill;
  let killedPid: number | undefined;
  let killedSignal: string | number | undefined;

  // @ts-expect-error - patching process.kill for the test
  process.kill = (pid: number, signal?: string | number) => {
    killedPid = pid;
    killedSignal = signal;
    calls.push("process.kill");
    return true;
  };

  try {
    const tray = {
      _process: { pid: 9001 },
      kill(closeOnly: boolean) {
        calls.push(`tray.kill(${closeOnly})`);
      },
    };

    killSystrayUnix(tray);

    // The child PID is SIGKILLed first, then the IPC channel is closed.
    assert.deepEqual(calls, ["process.kill", "tray.kill(false)"]);
    assert.equal(killedPid, 9001);
    assert.equal(killedSignal, "SIGKILL");
  } finally {
    process.kill = origKill;
  }
});

test("killSystrayUnix still closes IPC when no child PID is available", () => {
  const calls: string[] = [];
  const origKill = process.kill;

  // @ts-expect-error - patching process.kill for the test
  process.kill = () => {
    calls.push("process.kill");
    return true;
  };

  try {
    const tray = {
      kill(closeOnly: boolean) {
        calls.push(`tray.kill(${closeOnly})`);
      },
    };

    killSystrayUnix(tray);

    // No PID known -> never calls process.kill, but still closes IPC.
    assert.deepEqual(calls, ["tray.kill(false)"]);
  } finally {
    process.kill = origKill;
  }
});

test("killSystrayUnix swallows errors from a broken tray instance", () => {
  const tray = {
    kill() {
      throw new Error("boom");
    },
  };
  // Must not throw.
  assert.doesNotThrow(() => killSystrayUnix(tray));
});
