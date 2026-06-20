import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Verify the processSupervisor source includes the critical fixes.
// We do NOT spawn a real child process — that's for integration tests.
// These are source-level invariants that must not regress.

const SUPERVISOR_PATH = path.resolve(
  import.meta.dirname,
  "../../bin/cli/runtime/processSupervisor.mjs"
);
const source = fs.readFileSync(SUPERVISOR_PATH, "utf-8");

test("processSupervisor: imports isPortFree for port-wait before restart", () => {
  assert.ok(
    source.includes('from "../utils/portCheck.mjs"'),
    "must import isPortFree to check port availability before restart"
  );
test("processSupervisor: RESTART_RESET_MS is at least 60s (prevents premature counter reset)", () => {
  const match = source.match(/RESTART_RESET_MS\s*=\s*([\d_]+)/);
  assert.ok(match, "RESTART_RESET_MS constant must exist");
  const value = parseInt(match[1].replace(/_/g, ""), 10);
  assert.ok(value >= 60_000, `RESTART_RESET_MS=${value}ms should be >= 60000`);
});
});

test("processSupervisor: default maxRestarts is 3 (was 2 — gives more recovery headroom)", () => {
  assert.match(source, /maxRestarts\s*=\s*3/);
});

test("processSupervisor: does NOT call process.exit(0) immediately on exit code 0", () => {
  // The old code had: if (exitCode === 0) { process.exit(0); return; }
  // The new code must NOT exit the parent on clean child exit unless shutting down.
  // We check that the early-exit pattern is gone.
  const earlyExitPattern = /if\s*\(\s*this\.isShuttingDown\s*\|\|\s*exitCode\s*===\s*0\s*\)\s*\{[^}]*process\.exit/;
  assert.ok(
    !earlyExitPattern.test(source),
    "must not have the old 'isShuttingDown || exitCode === 0 → process.exit(0)' pattern"
  );
});

test("processSupervisor: handleExit accepts signal parameter", () => {
  assert.match(source, /handleExit\s*\(\s*code\s*,\s*signal\s*\)/);
});

test("processSupervisor: has _waitAndRestart method for port-aware restarts", () => {
  assert.ok(
    source.includes("_waitAndRestart"),
    "must have _waitAndRestart method for port-release-aware restart"
  );
});

test("processSupervisor: _waitAndRestart uses waitUntilPortFree", () => {
  assert.ok(
    source.includes("waitUntilPortFree"),
    "_waitAndRestart must wait for port release before spawning new child"
  );
});

test("processSupervisor: has RSS memory monitoring", () => {
  assert.ok(source.includes("RSS_WARN_BYTES"), "must have RSS warn threshold");
  assert.ok(source.includes("RSS_RESTART_BYTES"), "must have RSS restart threshold");
  assert.ok(source.includes("_startMemoryMonitor"), "must have memory monitor method");
  assert.ok(source.includes("process.memoryUsage()"), "must read RSS from process.memoryUsage()");
});

test("processSupervisor: stop() clears memory monitor", () => {
  assert.ok(
    source.includes("_stopMemoryMonitor"),
    "stop() must clean up the memory monitor interval"
  );
});

test("processSupervisor: stores port from constructor", () => {
  assert.match(source, /this\.port\s*=\s*port/);
});
