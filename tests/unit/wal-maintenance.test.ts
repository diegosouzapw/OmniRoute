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

test("recordBusy increments memory first, persists +1 atomically", async () => {
  const { recordBusy, getWalMaintenanceState, __resetForTests } = await import(
    "../../src/lib/db/walMaintenance.ts"
  );
  __resetForTests();
  let stored = "10";
  const db = {
    pragma: () => [{ busy: 0, log: 0, checkpointed: 0 }],
    prepare: (sql: string) => ({
      get: () => ({ value: stored }),
      run: () => {
        assert.match(sql, /ON CONFLICT/i);
        stored = String(Number(stored) + 1);
      },
    }),
  };
  recordBusy(db as never);
  assert.equal(getWalMaintenanceState().busyTotal, 1);
  assert.equal(stored, "11");
  __resetForTests();
});

test("sequential increments from two handles sum up (real adapters)", async (t) => {
  const { recordBusy, loadPersistedBusyTotal, __resetForTests } = await import(
    "../../src/lib/db/walMaintenance.ts"
  );
  const { tryOpenSync } = await import("../../src/lib/db/adapters/driverFactory.ts");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-wal-busy-")), "t.db");
  const a = tryOpenSync(file);
  const b = tryOpenSync(file);
  if (!a || !b) {
    if (a) a.close();
    t.skip("no sync SQLite driver available for shared-file test");
    fs.rmSync(path.dirname(file), { recursive: true, force: true });
    return;
  }
  try {
    __resetForTests();
    a.exec("CREATE TABLE IF NOT EXISTS key_value (namespace TEXT, key TEXT, value TEXT, PRIMARY KEY (namespace, key))");
    for (let i = 0; i < 5; i++) recordBusy(a);
    for (let i = 0; i < 7; i++) recordBusy(b);
    assert.equal(loadPersistedBusyTotal(a), 12);
  } finally {
    a.close();
    b.close();
    __resetForTests();
    fs.rmSync(path.dirname(file), { recursive: true, force: true });
  }
});

test("recordBusy with throwing prepare keeps memory coherent", async () => {
  const { recordBusy, getWalMaintenanceState, __resetForTests } = await import(
    "../../src/lib/db/walMaintenance.ts"
  );
  __resetForTests();
  const db = {
    pragma: () => [{ busy: 0, log: 0, checkpointed: 0 }],
    prepare: (_sql: string) => ({
      get: () => undefined,
      run: () => {
        throw new Error("database is locked");
      },
    }),
  };
  recordBusy(db as never);
  assert.equal(getWalMaintenanceState().busyTotal, 1);
  __resetForTests();
});

test("restart sequence composes: prior captured, stop zeroes, merge restores", async () => {
  const { recordBusy, getWalMaintenanceState, loadPersistedBusyTotal, mergeBusyTotal, __resetForTests } = await import(
    "../../src/lib/db/walMaintenance.ts"
  );
  __resetForTests();
  const store = new Map<string, string>();
  const db = {
    pragma: () => [{ busy: 0, log: 0, checkpointed: 0 }],
    prepare: (sql: string) => ({
      get: () => {
        const v = store.get("walMaintenance/busyTotal");
        return v === undefined ? undefined : { value: v };
      },
      run: () => {
        if (/ON CONFLICT/i.test(sql)) {
          store.set("walMaintenance/busyTotal", String(Number(store.get("walMaintenance/busyTotal") ?? "0") + 1));
        }
      },
    }),
  };
  recordBusy(db as never);
  recordBusy(db as never);
  recordBusy(db as never);
  const prior = getWalMaintenanceState().busyTotal;
  assert.equal(prior, 3);
  __resetForTests(); // simulates stopWalMaintenance() at restart: zeroes session state
  assert.equal(getWalMaintenanceState().busyTotal, 0);
  const restored = mergeBusyTotal(prior, loadPersistedBusyTotal(db as never));
  assert.equal(restored, 3);
  assert.equal(getWalMaintenanceState().busyStreak, 0);
  __resetForTests();
});
