import test from "node:test";
import assert from "node:assert/strict";
import {
  runCheckpointNow,
  logCheckpointOutcome,
  getWalPassiveIntervalMs,
  getWalGuardMaxBytes,
} from "../../src/lib/db/walMaintenance.ts";

function fakeDb(result: unknown, throws?: string) {
  return {
    pragma: (_s: string) => {
      if (throws) throw new Error(throws);
      return result;
    },
  };
}

test("busy row reports busy, not ok", () => {
  const out = runCheckpointNow(fakeDb([{ busy: 1, log: 5, checkpointed: 5 }]) as never);
  assert.equal(out.ok, false);
  assert.equal(out.busy, true);
});

test("clean row reports ok", () => {
  const out = runCheckpointNow(fakeDb([{ busy: 0, log: 0, checkpointed: 12 }]) as never);
  assert.equal(out.ok, true);
  assert.equal(out.busy, false);
  assert.equal(out.logFrames, 0);
  assert.equal(out.checkpointedFrames, 12);
});

test("sentinel -1 row is success, not busy", () => {
  const out = runCheckpointNow(fakeDb([{ busy: 0, log: -1, checkpointed: -1 }]) as never);
  assert.equal(out.ok, true);
  assert.equal(out.busy, false);
});

test("bare object tolerated", () => {
  const out = runCheckpointNow(fakeDb({ busy: 0, log: 0, checkpointed: 3 }) as never);
  assert.equal(out.ok, true);
});

test("undefined, null, [] fail open", () => {
  for (const shape of [undefined, null, []]) {
    const out = runCheckpointNow(fakeDb(shape) as never);
    assert.equal(out.ok, true);
    assert.equal(out.busy, false);
  }
});

test("bun:sqlite checkpoint shape parses (array of one row)", async (t) => {
  if (!process.versions.bun) {
    t.skip("bun:sqlite is only available under Bun");
    return;
  }
  const { Database } = await import("bun:sqlite");
  const { createBunSqliteAdapter } = await import("../../src/lib/db/adapters/bunSqliteAdapter.ts");
  const adapter = createBunSqliteAdapter(new Database(":memory:"), ":memory:");
  t.after(() => adapter.close());
  const out = runCheckpointNow(adapter, "TRUNCATE");
  assert.equal(out.ok, true);
  assert.equal(out.busy, false);
});

test("pragma throw never propagates", () => {
  const out = runCheckpointNow(fakeDb(undefined, "database is locked") as never);
  assert.equal(out.ok, false);
  assert.match(out.error ?? "", /database is locked/);
});

test("error outcome (ok:false, busy:false) is logged as a failure, not swallowed", () => {
  const warnings: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    logCheckpointOutcome(
      {
        ok: false,
        busy: false,
        skipped: false,
        logFrames: null,
        checkpointedFrames: null,
        error: "boom",
      },
      "TRUNCATE",
      0
    );
    assert.ok(
      warnings.some((line) => line.includes("WAL checkpoint failed")),
      `expected a "WAL checkpoint failed" warn, got: ${JSON.stringify(warnings)}`
    );
  } finally {
    console.warn = origWarn;
  }
});

test("guarded ctx skips without calling pragma", () => {
  let called = 0;
  const db = {
    pragma: (_s: string) => {
      called++;
      return [{ busy: 0, log: 0, checkpointed: 0 }];
    },
  };
  const out = runCheckpointNow(db as never, "TRUNCATE", { sqliteFile: null });
  assert.equal(out.skipped, true);
  assert.equal(called, 0);
});

test("__resetForTests zeroes state", async () => {
  const mod = await import("../../src/lib/db/walMaintenance.ts");
  mod.__resetForTests();
  assert.deepEqual(mod.getWalMaintenanceState(), {
    ticks: 0,
    busyStreak: 0,
    busyTotal: 0,
    lastBusyAt: null,
    lastOkAt: null,
  });
});

test("start is silent and stateless under the test-process gate", async () => {
  const mod = await import("../../src/lib/db/walMaintenance.ts");
  mod.__resetForTests();
  const db = { open: true, pragma: (_s: string) => [{ busy: 0, log: 0, checkpointed: 0 }] };
  mod.startWalMaintenance(db as never, "/tmp/fake.sqlite");
  assert.deepEqual(mod.getWalMaintenanceState(), {
    ticks: 0,
    busyStreak: 0,
    busyTotal: 0,
    lastBusyAt: null,
    lastOkAt: null,
  });
  mod.__resetForTests();
  mod.__resetForTests();
  assert.deepEqual(mod.getWalMaintenanceState(), {
    ticks: 0,
    busyStreak: 0,
    busyTotal: 0,
    lastBusyAt: null,
    lastOkAt: null,
  });
});

test.beforeEach(async () => {
  (await import("../../src/lib/db/walMaintenance.ts")).__resetForTests();
});

test("mergeBusyTotal keeps the max, floors at 0", async () => {
  const { mergeBusyTotal } = await import("../../src/lib/db/walMaintenance.ts");
  assert.equal(mergeBusyTotal(5, 3), 5);
  assert.equal(mergeBusyTotal(3, 5), 5);
  assert.equal(mergeBusyTotal(0, 0), 0);
  assert.equal(mergeBusyTotal(-2, -7), 0);
  assert.equal(mergeBusyTotal(2.9, 1), 2);
});

test("loadPersistedBusyTotal reads the key, falls back to 0", async () => {
  const { loadPersistedBusyTotal } = await import("../../src/lib/db/walMaintenance.ts");
  const store = new Map<string, string>([["walMaintenance/busyTotal", "41"]]);
  const db = {
    pragma: () => [{ busy: 0, log: 0, checkpointed: 0 }],
    prepare: (_sql: string) => ({
      get: () => {
        const v = store.get("walMaintenance/busyTotal");
        return v === undefined ? undefined : { value: v };
      },
      run: () => {},
    }),
  };
  assert.equal(loadPersistedBusyTotal(db as never), 41);
  store.set("walMaintenance/busyTotal", "abc");
  assert.equal(loadPersistedBusyTotal(db as never), 0);
  store.delete("walMaintenance/busyTotal");
  assert.equal(loadPersistedBusyTotal(db as never), 0);
});

test("flushBusyTotal is a no-op with nothing pending or no open handle", async () => {
  const { flushBusyTotal } = await import("../../src/lib/db/walMaintenance.ts");
  let prepared = 0;
  const db = {
    open: true,
    prepare: () => {
      prepared++;
      return { run: () => {} };
    },
  };
  assert.equal(flushBusyTotal(db as never), false);
  assert.equal(flushBusyTotal(null), false);
  assert.equal(prepared, 0);
});

/**
 * The scheduler is gated off inside test runners (isAutomatedTestProcess), so the real boot
 * wiring runs in a child Node process that is not a test process. It drives the actual
 * startWalMaintenance()/stopWalMaintenance() against a real SQLite file; only the checkpoint
 * pragma result is scripted (busy vs clean) so contention can be produced on demand. Module
 * paths travel through env vars so no argv token makes the child look like a test runner.
 */
const CHILD_SCRIPT = `
const { startWalMaintenance, stopWalMaintenance, getWalMaintenanceState } = await import(process.env.WAL_MODULE_URL);
const { tryOpenSync } = await import(process.env.DRIVER_MODULE_URL);
const file = process.env.WAL_DB_FILE;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const real = tryOpenSync(file);
if (!real) { console.log("WALCHILD " + JSON.stringify({ skipped: true })); process.exit(0); }
let mode = "busy";
const writes = [];
const db = {
  get open() { return real.open; },
  pragma: (s, o) => s.startsWith("wal_checkpoint")
    ? [mode === "busy" ? { busy: 1, log: 5, checkpointed: 0 } : { busy: 0, log: 0, checkpointed: 0 }]
    : real.pragma(s, o),
  prepare: (sql) => { if (/INSERT/i.test(sql)) writes.push(mode); return real.prepare(sql); },
  exec: (sql) => real.exec(sql),
  close: () => real.close(),
};
const persisted = () => Number(real.prepare("SELECT value FROM key_value WHERE namespace='walMaintenance' AND key='busyTotal'").get()?.value ?? 0);
const env = { OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: "60" };
const out = {};
startWalMaintenance(db, file, env);
out.restoredAtBoot = getWalMaintenanceState().busyTotal;
await sleep(400);
out.afterBusy = { total: getWalMaintenanceState().busyTotal, persisted: persisted(), writes: writes.length };
mode = "ok";
await sleep(300);
out.afterOkTick = { total: getWalMaintenanceState().busyTotal, persisted: persisted(), busyWrites: writes.filter((m) => m === "busy").length };
mode = "busy";
await sleep(300);
out.beforeStop = { total: getWalMaintenanceState().busyTotal, persisted: persisted() };
mode = "stopping";
stopWalMaintenance();
out.afterStop = { persisted: persisted(), busyWrites: writes.filter((m) => m === "busy").length, stopWrites: writes.filter((m) => m === "stopping").length };
startWalMaintenance(db, file, env);
out.restoredAfterRestart = getWalMaintenanceState().busyTotal;
stopWalMaintenance();
real.close();
console.log("WALCHILD " + JSON.stringify(out));
process.exit(0);
`;

test("boot wiring: restores the persisted total, never writes on a busy tick, flushes on a clean tick and at stop", async (t) => {
  const { spawnSync } = await import("node:child_process");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");
  const { pathToFileURL } = await import("node:url");
  const { tryOpenSync } = await import("../../src/lib/db/adapters/driverFactory.ts");

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-wal-boot-"));
  const file = path.join(dir, "storage.sqlite");
  const seed = tryOpenSync(file);
  if (!seed) {
    fs.rmSync(dir, { recursive: true, force: true });
    t.skip("no sync SQLite driver available");
    return;
  }
  try {
    seed.exec(
      "CREATE TABLE IF NOT EXISTS key_value (namespace TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY (namespace, key))"
    );
    seed
      .prepare(
        "INSERT INTO key_value (namespace, key, value) VALUES ('walMaintenance', 'busyTotal', '41')"
      )
      .run();
    seed.close();

    const repoRoot = path.resolve(import.meta.dirname, "../..");
    const env: NodeJS.ProcessEnv = {
      ...process.env,
      WAL_MODULE_URL: pathToFileURL(path.join(repoRoot, "src/lib/db/walMaintenance.ts")).href,
      DRIVER_MODULE_URL: pathToFileURL(path.join(repoRoot, "src/lib/db/adapters/driverFactory.ts"))
        .href,
      WAL_DB_FILE: file,
      NODE_ENV: "production",
    };
    delete env.VITEST;
    delete env.NODE_TEST_CONTEXT;
    const child = spawnSync(
      process.execPath,
      ["--import", "tsx/esm", "--input-type=module", "-e", CHILD_SCRIPT],
      { cwd: repoRoot, env, encoding: "utf8", timeout: 120_000 }
    );
    const line = (child.stdout || "").split("\n").find((l) => l.startsWith("WALCHILD "));
    assert.ok(line, `child produced no result (status ${child.status}): ${child.stderr}`);
    const out = JSON.parse(line.slice("WALCHILD ".length));
    if (out.skipped) {
      t.skip("child could not open a sync SQLite driver");
      return;
    }

    assert.equal(out.restoredAtBoot, 41, "boot restores the persisted counter");
    assert.ok(out.afterBusy.total > 41, "busy ticks are counted in memory");
    assert.equal(out.afterBusy.writes, 0, "no database write on the busy path");
    assert.equal(out.afterBusy.persisted, 41, "persisted value untouched while contended");

    assert.equal(out.afterOkTick.busyWrites, 0);
    assert.equal(
      out.afterOkTick.persisted,
      out.afterOkTick.total,
      "a clean tick flushes the delta"
    );

    assert.ok(out.beforeStop.total > out.afterOkTick.total, "more busy ticks after the flush");
    assert.equal(out.beforeStop.persisted, out.afterOkTick.total, "still no write while busy");
    assert.equal(out.afterStop.busyWrites, 0);
    assert.equal(out.afterStop.stopWrites, 1, "exactly one flush at stop");
    assert.equal(out.afterStop.persisted, out.beforeStop.total, "stop flushes the remaining delta");
    assert.equal(out.restoredAfterRestart, out.beforeStop.total, "restart restores the full total");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
test("getWalPassiveIntervalMs parses env: garbage falls back to the 5m default", () => {
  const DEF = 5 * 60 * 1000;
  assert.equal(getWalPassiveIntervalMs({}), DEF, "unset -> default");
  assert.equal(
    getWalPassiveIntervalMs({ OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: "" }),
    DEF,
    "empty -> default"
  );
  assert.equal(
    getWalPassiveIntervalMs({ OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: "  " }),
    DEF,
    "whitespace -> default"
  );
  assert.equal(
    getWalPassiveIntervalMs({ OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: "abc" }),
    DEF,
    "non-numeric -> default"
  );
  assert.equal(
    getWalPassiveIntervalMs({ OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: "-50" }),
    DEF,
    "negative -> default"
  );
  assert.equal(
    getWalPassiveIntervalMs({ OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: "Infinity" }),
    DEF,
    "non-finite -> default"
  );
});

test("getWalPassiveIntervalMs: '0' disables the scheduler, valid values pass through", () => {
  assert.equal(getWalPassiveIntervalMs({ OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: "0" }), 0);
  assert.equal(getWalPassiveIntervalMs({ OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: "60000" }), 60000);
  assert.equal(getWalPassiveIntervalMs({ OMNIROUTE_WAL_PASSIVE_INTERVAL_MS: " 60000 " }), 60000);
});

test("getWalGuardMaxBytes parses env: garbage falls back to the 256MB default", () => {
  const DEF = 256 * 1024 * 1024;
  assert.equal(getWalGuardMaxBytes({}), DEF, "unset -> default");
  assert.equal(
    getWalGuardMaxBytes({ OMNIROUTE_WAL_GUARD_MAX_MB: "abc" }),
    DEF,
    "non-numeric -> default"
  );
  assert.equal(
    getWalGuardMaxBytes({ OMNIROUTE_WAL_GUARD_MAX_MB: "0" }),
    DEF,
    "below 1MB -> default"
  );
  assert.equal(
    getWalGuardMaxBytes({ OMNIROUTE_WAL_GUARD_MAX_MB: "0.5" }),
    DEF,
    "fractional below 1 -> default"
  );
  assert.equal(
    getWalGuardMaxBytes({ OMNIROUTE_WAL_GUARD_MAX_MB: "512" }),
    512 * 1024 * 1024,
    "valid MB value -> bytes"
  );
});
