import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";

import {
  buildTrayLaunch,
  buildTrayWorkerArgs,
  createTrayReadinessServer,
  notifyTrayReady,
  startDetachedTray,
  validateTrayOptions,
} from "../../../bin/cli/tray/detachedTray.mjs";

test("buildTrayWorkerArgs creates a non-recursive hidden tray worker command", () => {
  const args = buildTrayWorkerArgs({
    port: 20128,
    maxRestarts: 3,
    readyPort: 43123,
    readyToken: "secret-token",
    tlsCert: "/tmp/cert.pem",
    tlsKey: "/tmp/key.pem",
  });

  assert.deepEqual(args, [
    "serve",
    "--tray",
    "--tray-worker",
    "--no-open",
    "--port",
    "20128",
    "--max-restarts",
    "3",
    "--tray-ready-port",
    "43123",
    "--tray-ready-token",
    "secret-token",
    "--tls-cert",
    "/tmp/cert.pem",
    "--tls-key",
    "/tmp/key.pem",
  ]);
});

test("buildTrayLaunch detaches Windows and Linux workers from the terminal", () => {
  for (const platform of ["linux", "win32"]) {
    const launch = buildTrayLaunch({
      platform,
      execPath: "/usr/bin/node",
      cliPath: "/opt/omniroute/bin/omniroute.mjs",
      workerArgs: ["serve", "--tray-worker"],
      label: "com.omniroute.tray.123",
    });

    assert.equal(launch.command, "/usr/bin/node");
    assert.deepEqual(launch.args, ["/opt/omniroute/bin/omniroute.mjs", "serve", "--tray-worker"]);
    assert.deepEqual(launch.options, {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    });
  }
});

test("buildTrayLaunch submits a macOS launchd job", () => {
  const launch = buildTrayLaunch({
    platform: "darwin",
    execPath: "/usr/bin/node",
    cliPath: "/opt/omniroute/bin/omniroute.mjs",
    workerArgs: ["serve", "--tray-worker"],
    label: "com.omniroute.tray.123",
  });

  assert.equal(launch.command, "launchctl");
  assert.deepEqual(launch.args, [
    "submit",
    "-l",
    "com.omniroute.tray.123",
    "--",
    "/usr/bin/node",
    "/opt/omniroute/bin/omniroute.mjs",
    "serve",
    "--tray-worker",
  ]);
  assert.deepEqual(launch.options, { stdio: "ignore" });
});

test("validateTrayOptions rejects modes that cannot detach safely", () => {
  assert.equal(validateTrayOptions({ tray: true, daemon: true }), "--tray cannot use --daemon");
  assert.equal(validateTrayOptions({ tray: true, log: true }), "--tray cannot use --log");
  assert.equal(
    validateTrayOptions({ tray: true, noRecovery: true }),
    "--tray cannot use --no-recovery"
  );
  assert.equal(
    validateTrayOptions({ tray: true, recovery: false }),
    "--tray cannot use --no-recovery"
  );
  assert.equal(validateTrayOptions({ tray: true }), null);
  assert.equal(
    validateTrayOptions({ tray: true, trayWorker: true }),
    "tray worker requires readiness credentials"
  );
  assert.equal(
    validateTrayOptions({
      tray: true,
      trayWorker: true,
      trayReadyPort: "43123",
      trayReadyToken: "token",
    }),
    null
  );
});

test("tray worker readiness requires the parent token", async () => {
  const readiness = await createTrayReadinessServer("expected-token");
  try {
    await assert.rejects(notifyTrayReady(readiness.port, "wrong-token"));
    const ready = readiness.wait(1000);
    await notifyTrayReady(readiness.port, "expected-token");
    await ready;
  } finally {
    readiness.close();
  }
});

test("startDetachedTray waits for worker readiness and detaches it", async () => {
  let workerArgs: string[] = [];
  let unrefCalled = false;
  const result = await startDetachedTray(
    {
      cliPath: "/tmp/omniroute.mjs",
      port: 20128,
      maxRestarts: 2,
      timeoutMs: 1000,
    },
    {
      platform: "linux",
      spawnProcess: (_command, args, options) => {
        const child = new EventEmitter() as EventEmitter & {
          pid: number;
          unref: () => void;
        };
        child.pid = 45678;
        child.unref = () => {
          unrefCalled = true;
        };
        workerArgs = args;
        const port = Number(args[args.indexOf("--tray-ready-port") + 1]);
        const token = args[args.indexOf("--tray-ready-token") + 1];
        void notifyTrayReady(port, token);
        assert.deepEqual(options, { detached: true, stdio: "ignore", windowsHide: true });
        return child;
      },
    }
  );

  assert.equal(result.platform, "linux");
  assert.equal(result.pid, 45678);
  assert.equal(workerArgs.includes("--tray-worker"), true);
  assert.equal(workerArgs.includes("--no-open"), true);
  assert.equal(unrefCalled, true);
});

test("startDetachedTray stops a worker that never becomes ready", async () => {
  const originalKill = process.kill;
  const signals: Array<{ pid: number; signal: NodeJS.Signals | number }> = [];
  const child = new EventEmitter() as EventEmitter & { pid: number; unref: () => void };
  child.pid = 56789;
  child.unref = () => {};
  process.kill = ((pid: number, signal?: NodeJS.Signals | number) => {
    signals.push({ pid, signal: signal ?? 0 });
    return true;
  }) as typeof process.kill;
  try {
    await assert.rejects(
      startDetachedTray(
        {
          cliPath: "/tmp/omniroute.mjs",
          port: 20128,
          maxRestarts: 2,
          timeoutMs: 20,
        },
        {
          platform: "linux",
          spawnProcess: () => child,
        }
      ),
      /did not become ready/
    );
  } finally {
    process.kill = originalKill;
  }
  assert.deepEqual(signals, [{ pid: 56789, signal: "SIGTERM" }]);
});
