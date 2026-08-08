import { test } from "node:test";
import assert from "node:assert/strict";

import { createNodeSqliteAdapterFromDatabase } from "../../../src/lib/db/adapters/nodeSqliteShared.ts";

type Row = Record<string, unknown>;

class FakeStatement {
  finalized = false;

  constructor(
    private readonly sql: string,
    private readonly rows: Row[] = []
  ) {}

  run(..._params: unknown[]) {
    return { changes: 1n, lastInsertRowid: 7n };
  }

  get(..._params: unknown[]) {
    if (this.sql.startsWith("PRAGMA")) {
      return { journal_mode: "wal" };
    }
    return this.rows[0];
  }

  all(..._params: unknown[]) {
    if (this.sql.startsWith("PRAGMA")) {
      return [{ journal_mode: "wal" }];
    }
    return this.rows;
  }

  finalize() {
    this.finalized = true;
  }
}

class FakeDb {
  closed = false;
  execCalls: string[] = [];
  statements: FakeStatement[] = [];

  prepare(sql: string) {
    const statement = new FakeStatement(sql, [{ value: "ok" }]);
    this.statements.push(statement);
    return statement;
  }

  exec(sql: string) {
    this.execCalls.push(sql);
  }

  close() {
    this.closed = true;
  }
}

test("createNodeSqliteAdapterFromDatabase wraps node:sqlite statements", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  const insert = adapter.prepare("INSERT INTO t VALUES (?)").run("ok");
  assert.deepEqual(insert, { changes: 1, lastInsertRowid: 7 });

  const row = adapter.prepare("SELECT value FROM t").get() as Row;
  assert.equal(row.value, "ok");

  assert.equal(adapter.pragma("journal_mode", { simple: true }), "wal");
  assert.deepEqual(adapter.pragma("journal_mode"), [{ journal_mode: "wal" }]);
});

test("createNodeSqliteAdapterFromDatabase uses savepoints for transactions", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  const run = adapter.transaction((value: string) => value.toUpperCase());
  assert.equal(run("ok"), "OK");
  assert.equal(db.execCalls[0].startsWith("SAVEPOINT "), true);
  assert.equal(db.execCalls[1].startsWith("RELEASE "), true);
});

test("createNodeSqliteAdapterFromDatabase uses BEGIN IMMEDIATE outside transactions", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  adapter.immediate(() => {});

  assert.deepEqual(db.execCalls, ["BEGIN IMMEDIATE", "COMMIT"]);
});

test("createNodeSqliteAdapterFromDatabase rolls back failed immediate transactions", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  assert.throws(() =>
    adapter.immediate(() => {
      throw new Error("fail");
    })
  );

  assert.deepEqual(db.execCalls, ["BEGIN IMMEDIATE", "ROLLBACK"]);
});

test("createNodeSqliteAdapterFromDatabase nests transactions in immediate savepoints", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  adapter.immediate(() => {
    const nested = adapter.transaction(() => {
      throw new Error("inner failure");
    });
    assert.throws(() => nested());
  });

  assert.equal(db.execCalls[0], "BEGIN IMMEDIATE");
  assert.match(db.execCalls[1], /^SAVEPOINT /);
  assert.match(db.execCalls[2], /^ROLLBACK TO /);
  assert.match(db.execCalls[3], /^RELEASE /);
  assert.equal(db.execCalls[4], "COMMIT");
});

test("createNodeSqliteAdapterFromDatabase finalizes cached statements on close", () => {
  const db = new FakeDb();
  let closedHookCalls = 0;
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:", () => {
    closedHookCalls++;
  });

  adapter.prepare("SELECT 1").get();
  adapter.close();

  assert.equal(closedHookCalls, 1);
  assert.equal(db.closed, true);
  assert.equal(adapter.open, false);
  assert.equal(
    db.statements.every((statement) => statement.finalized),
    true
  );
});
