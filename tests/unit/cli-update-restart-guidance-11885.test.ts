import test from "node:test";
import assert from "node:assert/strict";

const update = await import("../../bin/cli/commands/update.mjs");

// #11885: a user's dashboard reported an old version, running `omniroute update`
// said "already up to date" (the on-disk package.json HAD been updated by an
// earlier `--apply` run), but the long-lived server process kept serving the old
// version because `--apply` never restarts anything — it only re-reads the
// package.json on disk and prints "Run `omniroute --version` to verify", which
// implies the running install is now current when it is not.

test("isServerProcessRunning: true when the CLI-managed server pid is alive (#11885)", async () => {
  const running = await update.isServerProcessRunning({
    readPidFile: (service: string) => (service === "server" ? 12345 : null),
    isPidRunning: (pid: number) => pid === 12345,
  });
  assert.equal(running, true);
});

test("isServerProcessRunning: false when there is no pid file (#11885)", async () => {
  const running = await update.isServerProcessRunning({
    readPidFile: () => null,
    isPidRunning: () => true,
  });
  assert.equal(running, false);
});

test("isServerProcessRunning: false when the pid file is stale (#11885)", async () => {
  const running = await update.isServerProcessRunning({
    readPidFile: () => 999,
    isPidRunning: () => false,
  });
  assert.equal(running, false);
});

function captureLogs(fn: () => Promise<void>) {
  const logs: string[] = [];
  const origLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.map(String).join(" "));
  };
  return fn()
    .then(() => logs)
    .finally(() => {
      console.log = origLog;
    });
}

test("printPostApplyGuidance tells the user to run `omniroute restart` when a server is running, and stops implying the update is already live (#11885)", async () => {
  const logs = await captureLogs(() =>
    update.printPostApplyGuidance("3.9.0", {
      readPidFile: () => 42,
      isPidRunning: () => true,
    })
  );
  const joined = logs.join("\n");
  assert.match(joined, /omniroute restart/);
  assert.doesNotMatch(
    joined,
    /^.*Updated to version 3\.9\.0.*$/m,
    "must not claim the running process is already updated"
  );
});

test("printPostApplyGuidance tells the user to start the server when none is detected (#11885)", async () => {
  const logs = await captureLogs(() =>
    update.printPostApplyGuidance("3.9.0", {
      readPidFile: () => null,
      isPidRunning: () => false,
    })
  );
  const joined = logs.join("\n");
  assert.match(joined, /omniroute serve/);
});
