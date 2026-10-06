/**
 * ServiceSupervisor unit tests.
 *
 * Uses a real Node.js child process (`node -e "..."`) to test lifecycle
 * without mocking child_process — this gives realistic signal/exit behavior.
 *
 * A tiny HTTP health server is spawned inline for health-check tests.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-supervisor-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// Adoption is intentionally opt-in after GHSA-wg9p-6m2g-4v27. These tests
// exercise the explicit adoption path, so enable it for this isolated process.
process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE = "1";

// Import DB core first to trigger migration (creates version_manager with new columns)
const core = await import("../../../src/lib/db/core.ts");

// Seed the tool rows needed by tests
const db = core.getDbInstance();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('test-svc', 'stopped', 29999, 0, 0, 0)`
).run();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('test-crash', 'stopped', 29998, 0, 0, 0)`
).run();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('test-lock', 'stopped', 29997, 0, 0, 0)`
).run();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('test-adopt', 'stopped', 29996, 0, 0, 0)`
).run();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('test-adopt-deny', 'stopped', 29994, 0, 0, 0)`
).run();

const { ServiceSupervisor } = await import("../../../src/lib/services/ServiceSupervisor.ts");

/** Starts a tiny HTTP health server on the given port that always returns 200. */
function startHealthServer(port: number): http.Server {
  const server = http.createServer((_, res) => res.writeHead(200).end("ok"));
  server.listen(port);
  return server;
}

/** Config for a service that logs "tick" every second and stays alive. */
function tickConfig(tool: string, port: number) {
  return {
    tool,
    port,
    spawnArgs: () => ({
      command: process.execPath,
      args: ["-e", "setInterval(() => console.log('tick'), 500)"],
      env: { ...process.env },
      cwd: process.cwd(),
    }),
    healthUrl: () => `http://127.0.0.1:${port}/health`,
    healthIntervalMs: 500,
    stopTimeoutMs: 3_000,
    logsBufferBytes: 1_048_576,
  };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("start spawns process and captures logs in ring buffer", async () => {
  const healthServer = startHealthServer(29999);
  const sup = new ServiceSupervisor(tickConfig("test-svc", 29999));

  try {
    const status = await sup.start();
    assert.equal(status.state, "running");
    assert.ok(status.pid !== null, "pid should be set");

    // Wait briefly to let ticks accumulate
    await new Promise((r) => setTimeout(r, 600));

    const snap = sup.getRingBuffer().snapshot();
    assert.ok(snap.length > 0, "ring buffer should have log entries");
    assert.ok(
      snap.some((e) => e.line.includes("tick")),
      "should capture stdout lines"
    );
  } finally {
    await sup.stop();
    healthServer.close();
  }
});

test("stop sends SIGTERM and waits, then SIGKILL if needed", async () => {
  const healthServer = startHealthServer(29999);
  const sup = new ServiceSupervisor({
    ...tickConfig("test-svc", 29999),
    stopTimeoutMs: 500,
  });

  try {
    await sup.start();
    const status = await sup.stop();
    assert.equal(status.state, "stopped");
    assert.equal(status.pid, null);
  } finally {
    healthServer.close();
  }
});

test("crash sets state=error and lastError (no auto-restart)", async () => {
  const healthServer = startHealthServer(29998);
  const crashConfig = {
    ...tickConfig("test-crash", 29998),
    spawnArgs: () => ({
      command: process.execPath,
      // Exit after 1.5s — health server is up, so start() can return "running" first
      args: ["-e", "setTimeout(() => process.exit(1), 1500)"],
      env: { ...process.env },
      cwd: process.cwd(),
    }),
    healthIntervalMs: 300,
  };
  const sup = new ServiceSupervisor(crashConfig);
  const stateChanges: string[] = [];
  sup.on("stateChange", (s) => stateChanges.push(s.state));

  try {
    await sup.start();
    assert.equal(sup.getStatus().state, "running");

    // Poll for the crash to be detected (process exits at 1.5s, health checker detects it
    // within ~3 intervals). A fixed sleep flakes under CPU contention because the child's
    // exit timer and the health-check intervals all slip; poll with a generous deadline.
    const deadline = Date.now() + 10_000;
    while (sup.getStatus().state !== "error" && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 100));
    }

    const status = sup.getStatus();
    assert.equal(status.state, "error", "state should be error after crash");
    assert.ok(status.lastError !== null, "lastError should be set");
    assert.ok(
      !stateChanges.filter((s) => s === "starting").length ||
        stateChanges[stateChanges.length - 1] !== "starting",
      "supervisor must not restart after crash"
    );
  } finally {
    healthServer.close();
  }
});

test("restart is atomic (concurrent calls serialize)", async () => {
  const healthServer = startHealthServer(29999);
  const sup = new ServiceSupervisor(tickConfig("test-svc", 29999));

  try {
    await sup.start();

    // Fire 3 concurrent restarts — all should resolve without throwing
    const [s1, s2, s3] = await Promise.all([sup.restart(), sup.restart(), sup.restart()]);

    assert.equal(s1.state, "running");
    assert.equal(s2.state, "running");
    assert.equal(s3.state, "running");

    const final = sup.getStatus();
    assert.equal(final.state, "running");
  } finally {
    await sup.stop();
    healthServer.close();
  }
});

test("does NOT auto-restart on crash", async () => {
  const healthServer = startHealthServer(29998);
  const crashConfig = {
    ...tickConfig("test-crash", 29998),
    spawnArgs: () => ({
      command: process.execPath,
      // Exit after 1.5s — same as crash test above
      args: ["-e", "setTimeout(() => process.exit(2), 1500)"],
      env: { ...process.env },
      cwd: process.cwd(),
    }),
    healthIntervalMs: 300,
  };
  const sup = new ServiceSupervisor(crashConfig);

  try {
    await sup.start();
    // Wait for crash + one more health interval
    await new Promise((r) => setTimeout(r, 2_200));

    const status = sup.getStatus();
    // After crash: state must be "error" or "stopped", never "starting" again
    assert.ok(
      status.state === "error" || status.state === "stopped",
      `supervisor should not auto-restart: state was "${status.state}"`
    );
  } finally {
    healthServer.close();
  }
});

// #6205: when probeBeforeSpawn is enabled and a healthy instance already serves
// the port, the supervisor ADOPTS it (marks running, no child spawned) instead
// of spawning a duplicate that would die with EADDRINUSE.
test("#6205: probeBeforeSpawn adopts a healthy existing instance (no spawn)", async () => {
  // GHSA-wg9p-6m2g-4v27: adoption of an already-healthy listener is opt-in
  // (a squatter can answer 2xx), so this adoption-path test opts in explicitly.
  const prevAdopt = process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE;
  process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE = "1";
  const healthServer = startHealthServer(29996);
  const cfg = { ...tickConfig("test-adopt", 29996), probeBeforeSpawn: true };
  const sup = new ServiceSupervisor(cfg);

  try {
    const status = await sup.start();
    assert.equal(status.state, "running", "adopted instance is marked running");
    // No child process handle exists on adoption (nothing was spawned), but a
    // real pid is still resolved from the OS — see the dedicated pid-tracking
    // test below. Historically this asserted pid === null, which just
    // reflected the missing resolution rather than a deliberate "no pid for
    // adopted services" design choice.
    assert.ok(status.pid !== null, "adopted instance still gets a tracked pid");
    // No child means no captured stdout ticks.
    await new Promise((r) => setTimeout(r, 300));
    assert.equal(sup.getRingBuffer().snapshot().length, 0, "no logs — nothing was spawned");
  } finally {
    await sup.stop();
    healthServer.close();
    if (prevAdopt === undefined) delete process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE;
    else process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE = prevAdopt;
  }
});

// Regression test: the adopt branch used to call setToolStatus(tool, "running")
// with no pid argument at all, leaving `pid` permanently null for any service
// adopted on a supervisor restart (common in production — e.g. after
// `systemctl --user restart omniroute.service`, sidecar child processes can
// outlive the restart and get adopted rather than spawned fresh). Downstream
// consumers that key liveness tracking off pid would then treat a genuinely
// healthy, running service as untrustworthy/stale. This asserts the resolved
// pid on adoption matches the real process actually holding the port.
test("adopted service resolves and records the real pid of the process holding the port", async () => {
  // Use a distinct port from the other probeBeforeSpawn adoption test above.
  // Both originally shared 29996, and Node's undici fetch() keep-alive pool
  // (used by isHealthy() in portProbe.ts) caches a socket keyed only by
  // host:port, so the second test's fetch could be replayed over a stale
  // connection from the first test's health server instance, failing the
  // probe and flipping the adoption into a spurious "error" state. A separate
  // port keeps each probe isolated from the other test's pooled connection
  // (#10523).
  const healthServer = startHealthServer(29995);
  const cfg = { ...tickConfig("test-adopt", 29995), probeBeforeSpawn: true };
  // Same opt-in as the adoption test above (GHSA-wg9p-6m2g-4v27).
  const prevAdopt = process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE;
  process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE = "1";
  const sup = new ServiceSupervisor(cfg);

  try {
    const status = await sup.start();
    assert.equal(status.state, "running");
    // The health server above runs inline in this test process (no child
    // process spawned for it), so the pid actually bound to port 29996 is
    // this test process's own pid — that's exactly what resolvePortPid()
    // should find and what the supervisor should record.
    assert.equal(status.pid, process.pid, "resolved pid matches the process holding the port");
    assert.equal(sup.getStatus().pid, process.pid, "in-memory supervisor state also has the pid");
  } finally {
    await sup.stop();
    healthServer.close();
    if (prevAdopt === undefined) delete process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE;
    else process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE = prevAdopt;
  }
});

// GHSA-wg9p-6m2g-4v27: a healthy 2xx on the probed port no longer proves the
// listener is this service — a local squatter can answer 200 and get adopted,
// receiving the injected service API key. Without the operator opt-in the
// supervisor must surface the actionable error instead of adopting.
test("probeBeforeSpawn does NOT adopt a healthy listener without the opt-in", async () => {
  const healthServer = startHealthServer(29994);
  const cfg = { ...tickConfig("test-adopt-deny", 29994), probeBeforeSpawn: true };
  const prevAdopt = process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE;
  delete process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE;
  const sup = new ServiceSupervisor(cfg);

  try {
    const status = await sup.start();
    assert.equal(status.state, "error", "a healthy listener is not adopted by default");
    assert.match(
      status.lastError ?? "",
      /OMNIROUTE_ADOPT_EXISTING_SERVICE/,
      "the error names the opt-in escape hatch"
    );
  } finally {
    await sup.stop();
    healthServer.close();
    if (prevAdopt !== undefined) process.env.OMNIROUTE_ADOPT_EXISTING_SERVICE = prevAdopt;
  }
});
