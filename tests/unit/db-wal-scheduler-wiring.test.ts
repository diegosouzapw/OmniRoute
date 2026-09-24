/**
 * A live process must never run wal_checkpoint(TRUNCATE): truncating the WAL rewrites
 * the shared wal-index (storage.sqlite-shm) while other handles and in-flight
 * statements hold it mapped, which can SIGBUS the event loop (issue #13973). WAL
 * hygiene is split between the PASSIVE scheduler (runtime) and the shutdown checkpoint
 * (closeDbInstance defaults to TRUNCATE).
 *
 * The scheduler cannot be exercised directly in a unit test: it gates itself off under
 * `isAutomatedTestProcess()`, same as the pre-existing DB health-check scheduler it is
 * modeled on (see tests/unit/lib/jobRegistry/boot-wiring.test.ts for the same
 * constraint). The wiring is read from source; the deprecation warning is exercised
 * behaviorally because it runs before the test-process gate.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

const CORE_PATH = "src/lib/db/core.ts";
const MAINTENANCE_PATH = "src/lib/db/walMaintenance.ts";

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

test("the WAL maintenance scheduler is started when the DB instance boots", () => {
  const source = readSource(CORE_PATH);
  assert.match(
    source,
    /startWalMaintenance\(db/,
    "getDbInstance() must start the WAL maintenance scheduler alongside the DB health-check scheduler"
  );
});

test("no live TRUNCATE scheduler exists anywhere in walMaintenance.ts", () => {
  const source = readSource(MAINTENANCE_PATH);
  assert.equal(
    source.includes('runCheckpointNow(db, "TRUNCATE"'),
    false,
    "no scheduler path may checkpoint TRUNCATE on a live process (issue #13973); " +
      "TRUNCATE belongs to the shutdown path only"
  );
  const boot = fnBody(source, "startWalMaintenance");
  assert.equal(
    /setInterval/.test(boot),
    false,
    "startWalMaintenance must not install its own interval; the PASSIVE scheduler is the only timer"
  );
  assert.match(boot, /startWalPassiveScheduler\(/);
});

test("the shutdown checkpoint still truncates the WAL (reclaim is preserved)", () => {
  const source = readSource(CORE_PATH);
  const body = fnBody(source, "closeDbInstance");
  assert.match(
    body,
    /checkpointMode \?\? "TRUNCATE"/,
    "closeDbInstance must keep defaulting to a TRUNCATE checkpoint so the WAL file is reclaimed on shutdown"
  );
});

test("the maintenance scheduler is cleared on close, like the health-check scheduler", () => {
  const source = readSource(CORE_PATH);
  const body = fnBody(source, "closeDbInstance");
  assert.match(body, /clearDbHealthCheckScheduler\(\)/);
  assert.match(
    body,
    /stopWalMaintenance\(\)/,
    "closeDbInstance() must stop the WAL maintenance timers so they do not outlive the DB handle"
  );
});

test("a positive OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS logs a one-time deprecation warning", async () => {
  const mod = await import("../../src/lib/db/walMaintenance.ts");
  mod.__resetForTests();
  const warnings: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    // The stub never needs prepare/exec: the test-process gate in startWalMaintenance
    // returns before any DB access. If that ordering ever changes, fail loudly here
    // instead of with a bare TypeError deeper in the scheduler.
    const db = {
      open: true,
      pragma: () => [{ busy: 0, log: 0, checkpointed: 0 }],
      prepare: () => {
        throw new Error("gated test must never reach prepare()");
      },
      exec: () => {
        throw new Error("gated test must never reach exec()");
      },
    };
    const env = { OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS: "60000" } as NodeJS.ProcessEnv;
    mod.startWalMaintenance(db as never, "/tmp/fake.sqlite", env);
    mod.startWalMaintenance(db as never, "/tmp/fake.sqlite", env);
    assert.equal(warnings.length, 1, `warn exactly once, got: ${JSON.stringify(warnings)}`);
    assert.match(warnings[0], /OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS/);
    assert.match(warnings[0], /no longer used and has no effect/);
    assert.match(warnings[0], /#13973/);

    // The once-only flag must be re-armed by __resetForTests: without that, the "0 stays
    // silent" checks below would pass vacuously even if the flag was stuck set.
    mod.__resetForTests();
    mod.startWalMaintenance(db as never, "/tmp/fake.sqlite", env);
    assert.equal(warnings.length, 2, "the warning must re-arm after __resetForTests");

    mod.__resetForTests();
    warnings.length = 0;
    mod.startWalMaintenance(db as never, "/tmp/fake.sqlite", {
      OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS: "0",
    } as NodeJS.ProcessEnv);
    assert.equal(warnings.length, 0, "0 was the documented off switch, so it must stay silent");
    mod.startWalMaintenance(db as never, "/tmp/fake.sqlite", {} as NodeJS.ProcessEnv);
    assert.equal(warnings.length, 0, "unset must stay silent");
  } finally {
    console.warn = origWarn;
    mod.__resetForTests();
  }
});

test("the scheduler self-gates the same way the DB health-check scheduler does", () => {
  const source = readSource(MAINTENANCE_PATH);
  assert.match(source, /isCloud/);
  assert.match(source, /isNextBuildPhase\(\)/);
  assert.match(source, /isAutomatedTestProcess\(\)/);
});

test("the removed env var is documented as removed", () => {
  const docs = readSource("docs/reference/ENVIRONMENT.md");
  const row = docs
    .split("\n")
    .find((line) => line.includes("OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS") && line.startsWith("|"));
  assert.ok(row, "docs/reference/ENVIRONMENT.md must keep a row for the removed variable");
  assert.match(row ?? "", /removed/i);
  const envExample = readSource(".env.example");
  const block = envExample
    .split("\n\n")
    .find((paragraph) => paragraph.includes("OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS"));
  assert.ok(block, ".env.example must keep a commented entry for the removed variable");
  assert.match(block ?? "", /[Rr]emoved/);
});

test("close carries the busy streak into the checkpoint log", () => {
  const source = readSource(CORE_PATH);
  const body = fnBody(source, "closeDbInstance");
  assert.match(body, /getWalMaintenanceState\(\)\.busyStreak/);
  assert.match(body, /runCheckpointNow\(db, checkpointMode, \{/);
  assert.match(body, /logCheckpointOutcome\(outcome, checkpointMode, streakBefore\)/);
});

test("the PASSIVE tick and the busy retry both log every outcome shape", () => {
  const source = readSource(MAINTENANCE_PATH);
  const passiveLogs = (source.match(/logCheckpointOutcome\(stats, "PASSIVE", busyStreak\)/g) ?? [])
    .length;
  const retryLogs = (source.match(/logCheckpointOutcome\(outcome, "PASSIVE", busyStreak\)/g) ?? [])
    .length;
  assert.ok(
    passiveLogs >= 2,
    `the PASSIVE tick must log busy AND error outcomes (found ${passiveLogs} log calls)`
  );
  assert.ok(
    retryLogs >= 2,
    `the busy retry must log busy AND error outcomes (found ${retryLogs} log calls)`
  );
});

test("close reads the busy streak BEFORE stopping maintenance (streak otherwise always 0)", () => {
  const source = readSource(CORE_PATH);
  const body = fnBody(source, "closeDbInstance");
  const streakIdx = body.indexOf("getWalMaintenanceState().busyStreak");
  const stopIdx = body.indexOf("stopWalMaintenance()");
  assert.notEqual(streakIdx, -1, "closeDbInstance must read busyStreak");
  assert.notEqual(stopIdx, -1, "closeDbInstance must stop maintenance");
  assert.ok(
    streakIdx < stopIdx,
    "streakBefore must be captured before stopWalMaintenance() resets busyStreak to 0"
  );
});
