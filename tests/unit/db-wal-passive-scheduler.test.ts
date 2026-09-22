/**
 * WAL passive-checkpoint scheduler + size guard, and busy telemetry.
 * After #12853 the scheduler lives in walMaintenance.ts; this reads the wiring.
 * Since #13973 no live TRUNCATE exists. A WAL above the size guard runs
 * wal_checkpoint(RESTART), which restarts the WAL without rewriting the
 * mapped wal-index, so it cannot SIGBUS.
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

function fnBody(source: string, name: string): string {
  const start = source.indexOf(`function ${name}`);
  assert.notEqual(start, -1, `${name} must exist`);
  // Slice to the function's closing brace: the first `}` at column 0. A looser
  // "any column-0 line" boundary cuts a multi-line signature in half when the
  // closing `)` of the parameter list sits at column 0. Inner blocks are always
  // indented in this tree, so a column-0 `}` only occurs at the function end.
  const rest = source.slice(start + 1);
  const boundary = /\n\}/.exec(rest);
  return source.slice(start, boundary ? start + 1 + boundary.index + 2 : source.length);
}

test("a frequent PASSIVE checkpoint scheduler boots with the DB instance", () => {
  const source = readSource(WAL_PATH);
  const boot = fnBody(source, "startWalMaintenance");
  assert.match(
    boot,
    /startWalPassiveScheduler\(/,
    "startWalMaintenance() must start the PASSIVE scheduler"
  );
  const core = readSource(CORE_PATH);
  assert.match(core, /startWalMaintenance\(db, SQLITE_FILE\)/);
});

test("the passive scheduler runs wal_checkpoint(PASSIVE), never a live TRUNCATE", () => {
  const source = readSource(WAL_PATH);
  const body = fnBody(source, "startWalPassiveScheduler");
  assert.match(body, /runCheckpointNow\(db, "PASSIVE"/);
  assert.equal(
    body.includes('runCheckpointNow(db, "TRUNCATE"'),
    false,
    "the size guard must not TRUNCATE a live process (issue #13973); it warns instead"
  );
});

test("a busy PASSIVE tick records the busy event and arms the 60s retry", () => {
  const source = readSource(WAL_PATH);
  const body = fnBody(source, "startWalPassiveScheduler");
  const busyIdx = body.indexOf("stats.busy");
  assert.notEqual(busyIdx, -1, "the PASSIVE tick must branch on stats.busy");
  // Slice from the busy branch to the end of the body: both patterns are unique to
  // this branch, and a fixed-width window silently loses them if the branch grows.
  const busyBranch = body.slice(busyIdx);
  assert.match(
    busyBranch,
    /recordBusy\(\)/,
    "busy contention must feed the persisted busy telemetry (previously TRUNCATE-only)"
  );
  assert.match(
    busyBranch,
    /schedulePassiveRetry\(db\)/,
    "a busy tick must arm the short retry instead of waiting for the next 5m tick"
  );
});

test("the passive scheduler self-gates like the other DB schedulers", () => {
  const body = fnBody(readSource(WAL_PATH), "startWalPassiveScheduler");
  assert.match(body, /isCloud \|\| isNextBuildPhase\(\) \|\| isAutomatedTestProcess\(\)/);
});

test("both WAL timers are cleared on close", () => {
  const stop = fnBody(readSource(WAL_PATH), "stopWalMaintenance");
  assert.match(stop, /walPassiveTimer/);
  assert.match(stop, /retryTimer/);
  const close = fnBody(readSource(CORE_PATH), "closeDbInstance");
  assert.match(close, /stopWalMaintenance\(\)/);
});

test("checkpoint results keep busy/frames counters so a starved checkpoint is visible", () => {
  const body = fnBody(readSource(WAL_PATH), "runCheckpointNow");
  assert.match(body, /busy:/, "busy=1 (checkpoint blocked by readers) must not be swallowed");
  assert.match(body, /checkpointedFrames:/);
});

test("a busy checkpoint log line keeps the partial checkpointed frame count", () => {
  const body = fnBody(readSource(WAL_PATH), "logCheckpointOutcome");
  const boundary = body.indexOf("if (!outcome.ok)");
  assert.notEqual(boundary, -1, "logCheckpointOutcome must have an error branch to slice against");
  const busyBranch = body.slice(0, boundary);
  assert.match(busyBranch, /outcome\.busy/);
  assert.match(
    busyBranch,
    /checkpointedFrames/,
    "a busy-but-partial checkpoint must still log how many frames made it out"
  );
});

test("the PASSIVE tick measures the WAL size so the log and the guard reflect reality", () => {
  const body = fnBody(readSource(WAL_PATH), "startWalPassiveScheduler");
  assert.match(body, /walBeforeBytes/);
  assert.match(body, /formatWalMb\(walBeforeBytes\)/);
});

test("the size guard restarts the WAL instead of truncating or only warning", () => {
  const body = fnBody(readSource(WAL_PATH), "startWalPassiveScheduler");
  assert.match(body, /walBeforeBytes > guardMaxBytes/);
  assert.match(
    body,
    /runCheckpointNow\(db, "RESTART"/,
    "guard breach must RESTART the WAL (issue #13973); TRUNCATE rewrites the mapped wal-index"
  );
  assert.equal(
    body.includes('runCheckpointNow(db, "TRUNCATE"'),
    false,
    "the size guard must not TRUNCATE a live process"
  );
  assert.ok(
    body.indexOf("walBeforeBytes > guardMaxBytes") < body.indexOf("if (stats.busy)"),
    "the guard must be evaluated on busy ticks too (the busy branch must not hide it)"
  );
});

test("the WAL size guard rejects sub-1MB values that would floor to a 0-byte guard", () => {
  const body = fnBody(readSource(WAL_PATH), "getWalGuardMaxBytes");
  assert.match(
    body,
    /parsed >= 1/,
    "OMNIROUTE_WAL_GUARD_MAX_MB=0.5 would Math.floor to 0 bytes and warn on every tick"
  );
});

test("the new env vars are documented", () => {
  const docs = readSource("docs/reference/ENVIRONMENT.md");
  assert.match(docs, /OMNIROUTE_WAL_PASSIVE_INTERVAL_MS/);
  assert.match(docs, /OMNIROUTE_WAL_GUARD_MAX_MB/);
  assert.match(docs, /OMNIROUTE_PRESSURE_SELF_RESTART/);
});
