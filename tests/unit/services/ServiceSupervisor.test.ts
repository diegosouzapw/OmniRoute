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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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

    // Wait for crash (process exits at 1.5s, health checker detects within 3 intervals)
    await new Promise((r) => setTimeout(r, 2_500));

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
