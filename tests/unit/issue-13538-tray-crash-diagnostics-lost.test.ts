import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, rmSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

// #13538: "Windows native tray gateway exits silently under concurrent OpenCode
// requests" — reporter says the tray worker + gateway both disappear with "no
// graceful shutdown entry" and no diagnostic anywhere.
//
// Root cause (bin/cli/runtime/processSupervisor.mjs handleExit(), give-up
// branch): once the supervised server child crashes >= maxRestarts times
// within RESTART_RESET_MS, the supervisor dumps its crash log with
// console.error() only and calls process.exit(). In `--tray`/`--tray-worker`
// mode this IS the process that owns the tray icon (bin/cli/commands/serve.mjs
// runWithSupervisor()), and on Windows/Linux that whole process is launched
// detached with `stdio: "ignore"` (bin/cli/tray/detachedTray.mjs
// buildTrayLaunch(), already asserted by
// tests/unit/cli/tray-detached.test.ts:44-61). So every console.error the
// give-up path writes is discarded by the OS, and nothing ever persists a
// record of *why* the tray + gateway died — matching the reporter's "no
// graceful shutdown entry and no corresponding Windows Application crash
// event".
//
// This test proves the underlying, platform-independent defect: the give-up
// path never persists its crash log anywhere outside the dying process's own
// (possibly-ignored) stdio. It asserts the desired behavior — a durable
// per-service crash record next to the existing PID file convention
// (bin/cli/utils/pid.mjs getServicePidPath: `<DATA_DIR>/<service>/...`) — and
// fails today because no such write exists.

process.env.PORT = "0"; // waitUntilPortFree no-ops on port 0 (matches cli-process-supervisor.test.ts)

const HERE = dirname(fileURLToPath(import.meta.url));
const CRASHING_SERVER = join(HERE, "fixtures", "issue-13538-crashing-server.mjs");

test("#13538: supervisor give-up path persists a discoverable crash record (currently lost)", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "omniroute-13538-"));
  const origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;

  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const exits: Array<number | undefined> = [];
  const origExit = process.exit.bind(process);
  // @ts-ignore — stub so the real give-up exit doesn't kill the test runner,
  // exactly like tests/unit/cli-process-supervisor.test.ts does.
  process.exit = (code?: number) => {
    exits.push(code);
  };

  const supervisor = new ServerSupervisor({
    serverPath: CRASHING_SERVER,
    env: { ...process.env },
    maxRestarts: 1,
    memoryLimit: 64,
  });

  try {
    supervisor.start();

    // Real child process crashes twice: 1st crash restarts (backoff ~1s), 2nd
    // crash exhausts maxRestarts=1 and hits the give-up branch.
    const deadline = Date.now() + 15_000;
    while (exits.length === 0 && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 100));
    }

    assert.equal(exits.length, 1, "supervisor must give up exactly once");
    assert.equal(exits[0], 1, "give-up exit code must be non-zero (matches production behavior)");

    // Desired behavior: the give-up path leaves a durable, discoverable record
    // of the crash (so a tray worker killed via this path — spawned detached
    // with stdio:"ignore" per bin/cli/tray/detachedTray.mjs buildTrayLaunch()
    // — is still diagnosable afterward, e.g. by `omniroute doctor`).
    const expectedCrashRecord = join(dataDir, "server", "crash.log");
    assert.equal(
      existsSync(expectedCrashRecord),
      true,
      `expected a persisted crash record at ${expectedCrashRecord} after the supervisor gave up, ` +
        `but none was written — the only trace (console.error) is discarded when the process is ` +
        `spawned with stdio:"ignore" (the exact config used for the detached tray worker on ` +
        "Windows/Linux), leaving zero diagnostic trace of why the gateway/tray disappeared (#13538)"
    );

    // The record itself must be useful, not just present: it should carry the
    // buffered crash log lines the give-up branch already prints to console.
    const contents = readFileSync(expectedCrashRecord, "utf8");
    assert.match(
      contents,
      /crashed 1 times/,
      "crash record must include the give-up summary line, not just an empty file"
    );
  } finally {
    // @ts-ignore
    process.exit = origExit;
    if (origDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = origDataDir;
    rmSync(dataDir, { recursive: true, force: true });
  }
});
