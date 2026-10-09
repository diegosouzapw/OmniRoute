import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  instrumentSqliteAdapter,
  readSlowSqliteThreshold,
} from "../../../src/lib/db/adapters/slowDiagnostics.ts";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";

function fixture() {
  let clock = 0;
  const events: string[] = [];
  const expectedError = new Error("PRIVATE_ERROR");
  const db: SqliteAdapter = {
    driver: "better-sqlite3",
    open: true,
    name: "PRIVATE_PATH",
    raw: { secret: "PRIVATE_RAW" },
    prepare() {
      return {
        run(...args) {
          clock += 600;
          assert.deepEqual(args, ["PRIVATE_BINDING"]);
          return { changes: 1, lastInsertRowid: 2 };
        },
        get() {
          clock += 600;
          throw expectedError;
        },
        all() {
          clock += 600;
          return [{ value: "PRIVATE_ROW" }];
        },
      };
    },
    exec() {
      clock += 600;
    },
    pragma() {
      clock += 600;
      return 1;
    },
    transaction(fn) {
      return Object.assign(fn, { marker: "preserved" });
    },
    immediate(fn) {
      fn();
    },
    async backup() {},
    checkpoint() {
      clock += 600;
    },
    close() {},
  };
  const wrapped = instrumentSqliteAdapter(db, {
    thresholdMs: 200,
    now: () => clock,
    log: (event) => events.push(event),
  });
  return {
    db,
    wrapped,
    events,
    expectedError,
    advance() {
      clock += 10000;
    },
  };
}

test("disabled or invalid threshold leaves adapter identity and behavior untouched", () => {
  for (const raw of [undefined, "", "0", "-1", "Infinity", "no"])
    assert.equal(readSlowSqliteThreshold(raw), null);
  assert.equal(readSlowSqliteThreshold("250"), 250);
  const { db } = fixture();
  assert.equal(instrumentSqliteAdapter(db, { thresholdMs: null }), db);
});

test("slow operation warnings contain no SQL, parameters, rows, path or error text", () => {
  const { wrapped, events, advance, expectedError } = fixture();
  const stmt = wrapped.prepare("SELECT 'PRIVATE_SQL'");
  assert.deepEqual(stmt.run("PRIVATE_BINDING"), { changes: 1, lastInsertRowid: 2 });
  advance();
  assert.throws(
    () => stmt.get(),
    (error) => error === expectedError
  );
  advance();
  assert.deepEqual(stmt.all(), [{ value: "PRIVATE_ROW" }]);
  assert.equal(events.length, 3);
  assert.match(events[0], /operation=run elapsedMs=600/);
  assert.match(events[1], /operation=get elapsedMs=600/);
  assert.match(events[2], /operation=all elapsedMs=600/);
  assert.doesNotMatch(events.join(""), /PRIVATE/);
});

test("warnings are rate limited and transaction results/properties are preserved", () => {
  const { wrapped, events, db } = fixture();
  wrapped.exec("PRIVATE_SQL");
  wrapped.pragma("PRIVATE_PRAGMA");
  assert.equal(events.length, 1);
  const tx = wrapped.transaction((value) => value);
  assert.equal(tx("result"), "result");
  assert.equal(Reflect.get(tx, "marker"), "preserved");
  assert.equal(wrapped.raw, db.raw);
  assert.equal(wrapped.name, db.name);
});

test("a failed diagnostic sink must not change a successful database operation", () => {
  const { db } = fixture();
  let clock = 0;
  const wrapped = instrumentSqliteAdapter(db, {
    thresholdMs: 1,
    now: () => (clock += 1000),
    log: () => {
      throw new Error("sink failure");
    },
  });
  assert.deepEqual(wrapped.prepare("PRIVATE_SQL").all(), [{ value: "PRIVATE_ROW" }]);
});

test("better-sqlite3 adapter enables diagnostics only through the opt-in wrapper", () => {
  const source = readFileSync(
    new URL("../../../src/lib/db/adapters/betterSqliteAdapter.ts", import.meta.url),
    "utf8"
  );
  assert.match(source, /return instrumentSqliteAdapter\(adapter\)/);
});

test("enabled native adapter retains transaction rollback, getters and bound parameters", async () => {
  const { tryOpenSync } = await import("../../../src/lib/db/adapters/driverFactory.ts");
  const db = tryOpenSync(":memory:");
  assert.ok(db, "native adapter is required for this integration test");
  const wrapped = instrumentSqliteAdapter(db, { thresholdMs: 200 });
  try {
    wrapped.exec("CREATE TABLE test (value TEXT)");
    const insert = wrapped.prepare("INSERT INTO test VALUES (?)");
    const tx = wrapped.transaction(() => {
      assert.equal(wrapped.inTransaction, true);
      insert.run("synthetic");
      throw new Error("rollback");
    });
    assert.throws(() => tx(), /rollback/);
    assert.equal(wrapped.inTransaction, false);
    assert.deepEqual(wrapped.prepare("SELECT * FROM test").all(), []);
    insert.run("committed");
    assert.deepEqual(wrapped.prepare("SELECT * FROM test").get(), { value: "committed" });
  } finally {
    wrapped.close();
  }
  assert.equal(wrapped.open, false);
});
