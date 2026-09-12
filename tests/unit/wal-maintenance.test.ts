import test from "node:test";
import assert from "node:assert/strict";
import { runCheckpointNow, logCheckpointOutcome } from "../../src/lib/db/walMaintenance.ts";

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

test("interval defaults to 6h, rejects garbage, honors 0", async () => {
  const { getWalMaintenanceIntervalMs } = await import("../../src/lib/db/walMaintenance.ts");
  assert.equal(getWalMaintenanceIntervalMs({} as NodeJS.ProcessEnv), 6 * 60 * 60 * 1000);
  assert.equal(
    getWalMaintenanceIntervalMs({
      OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS: "nope",
    } as NodeJS.ProcessEnv),
    6 * 60 * 60 * 1000
  );
  assert.equal(
    getWalMaintenanceIntervalMs({
      OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS: "60000",
    } as NodeJS.ProcessEnv),
    60000
  );
  assert.equal(
    getWalMaintenanceIntervalMs({ OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS: "0" } as NodeJS.ProcessEnv),
    0
  );
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
