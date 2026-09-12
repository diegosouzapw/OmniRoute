/**
 * WAL passive-checkpoint scheduler + size guard, and TRUNCATE telemetry.
 * After #12853 the scheduler lives in walMaintenance.ts; this reads the wiring.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

const WAL_PATH = "src/lib/db/walMaintenance.ts";
const CORE_PATH = "src/lib/db/core.ts";

function fnBody(source: string, name: string, span = 2200): string {
  const start = source.indexOf(`function ${name}`);
  assert.notEqual(start, -1, `${name} must exist`);
  return source.slice(start, start + span);
}

test("a frequent PASSIVE checkpoint scheduler boots alongside the truncate scheduler", () => {
  const source = readSource(WAL_PATH);
  const bootIdx = source.indexOf("function startWalMaintenance");
  assert.notEqual(bootIdx, -1);
  const window = source.slice(bootIdx, bootIdx + 2200);
  assert.match(
    window,
    /startWalPassiveScheduler\(/,
    "startWalMaintenance() must start the PASSIVE scheduler next to the TRUNCATE scheduler"
  );
  const core = readSource(CORE_PATH);
  assert.match(core, /startWalMaintenance\(db, SQLITE_FILE\)/);
});

test("the passive scheduler runs wal_checkpoint(PASSIVE) and escalates to TRUNCATE over the size guard", () => {
  const source = readSource(WAL_PATH);
  const body = fnBody(source, "startWalPassiveScheduler", 2600);
  assert.match(body, /runCheckpointNow\(db, "PASSIVE"/);
  assert.match(
    body,
    /runCheckpointNow\(db, "TRUNCATE"/,
    "when the WAL file exceeds the guard, escalate to TRUNCATE immediately instead of waiting for the 6h tick"
  );
});

test("the passive scheduler self-gates like the other DB schedulers", () => {
  const body = fnBody(readSource(WAL_PATH), "startWalPassiveScheduler", 400);
  assert.match(body, /isCloud \|\| isNextBuildPhase\(\) \|\| isAutomatedTestProcess\(\)/);
});

test("both WAL schedulers are cleared on close", () => {
  const stop = fnBody(readSource(WAL_PATH), "stopWalMaintenance", 500);
  assert.match(stop, /walTimer/);
  assert.match(stop, /walPassiveTimer/);
  const close = fnBody(readSource(CORE_PATH), "closeDbInstance", 400);
  assert.match(close, /stopWalMaintenance\(\)/);
});

test("checkpoint results keep busy/frames counters so a starved checkpoint is visible", () => {
  const body = fnBody(readSource(WAL_PATH), "runCheckpointNow", 900);
  assert.match(body, /busy:/, "busy=1 (checkpoint blocked by readers) must not be swallowed");
  assert.match(body, /checkpointedFrames:/);
});

test("the TRUNCATE tick logs duration and WAL sizes for post-mortem diagnosis", () => {
  const body = fnBody(readSource(WAL_PATH), "startWalMaintenance", 2200);
  assert.match(body, /walMbBefore=/);
  assert.match(body, /busy=/);
});

test("the WAL size guard rejects sub-1MB values that would floor to a 0-byte guard", () => {
  const body = fnBody(readSource(WAL_PATH), "getWalGuardMaxBytes", 500);
  assert.match(
    body,
    /parsed >= 1/,
    "OMNIROUTE_WAL_GUARD_MAX_MB=0.5 would Math.floor to 0 bytes and escalate to TRUNCATE on every tick"
  );
});

test("the new env vars are documented", () => {
  const docs = readSource("docs/reference/ENVIRONMENT.md");
  assert.match(docs, /OMNIROUTE_WAL_PASSIVE_INTERVAL_MS/);
  assert.match(docs, /OMNIROUTE_WAL_GUARD_MAX_MB/);
  assert.match(docs, /OMNIROUTE_VACUUM_MIN_DELETED_ROWS/);
  assert.match(docs, /OMNIROUTE_PRESSURE_SELF_RESTART/);
});
