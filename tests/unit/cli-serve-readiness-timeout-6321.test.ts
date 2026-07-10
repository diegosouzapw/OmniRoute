import test from "node:test";
import assert from "node:assert/strict";

// #6321: `omniroute serve` printed the banner + "⏳ Starting server..." then hung
// forever with ZERO further output whenever waitForServer() timed out (resolved
// `false`) — `runWithSupervisor`'s `.then((up) => { if (up) {...} })` had no `else`
// branch, so a boot that never became ready was indistinguishable from a genuine
// infinite hang, even at APP_LOG_LEVEL=debug (stdout was also being discarded —
// see the companion assertion on ServerSupervisor.getRecentLog()).

test("reportReadinessTimeout prints a diagnostic instead of staying silent (#6321)", async () => {
  const logs: string[] = [];
  const origErr = console.error.bind(console);
  console.error = (...args: unknown[]) => logs.push(args.join(" "));

  try {
    const { reportReadinessTimeout } = await import("../../bin/cli/commands/serve.mjs");
    assert.equal(
      typeof reportReadinessTimeout,
      "function",
      "serve.mjs must export a readiness-timeout diagnostic handler"
    );

    const fakeSupervisor = {
      getRecentLog: () => ["[server] booting...", "[server] waiting on migrations"],
    };
    reportReadinessTimeout(20128, fakeSupervisor);

    const combined = logs.join("\n");
    assert.notEqual(combined.trim(), "", "must not silently produce zero output on a timeout");
    assert.ok(
      combined.includes("did not respond") || combined.toLowerCase().includes("60s"),
      `expected a clear readiness-timeout message, got:\n${combined}`
    );
    assert.ok(
      combined.includes("booting") && combined.includes("migrations"),
      "must surface the buffered server output instead of discarding it"
    );
  } finally {
    console.error = origErr;
  }
});

test("ServerSupervisor.getRecentLog() exposes buffered output for readiness diagnostics (#6321)", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");

  const supervisor = new ServerSupervisor({
    serverPath: "/fake/server.js",
    env: {},
    maxRestarts: 0,
  });

  assert.equal(
    typeof supervisor.getRecentLog,
    "function",
    "ServerSupervisor must expose getRecentLog() so callers can surface buffered output"
  );

  // Simulate lines that arrived on the child's stdout/stderr before a readiness
  // timeout — previously stdout was piped to "ignore" and never reached crashLog.
  supervisor.crashLog = ["stdout: server starting", "stderr: waiting for db"];
  const recent = supervisor.getRecentLog();
  assert.deepEqual(recent, ["stdout: server starting", "stderr: waiting for db"]);
});
