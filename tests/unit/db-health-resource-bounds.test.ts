import assert from "node:assert/strict";
import test from "node:test";
import Database from "better-sqlite3";

import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter.ts";
import { runDbHealthCheck } from "../../src/lib/db/healthCheck.ts";

const TIMESTAMP = "2026-09-01T00:00:00.000Z";

function fixture() {
  const raw = new Database(":memory:");
  raw.exec(`
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
    INSERT INTO provider_connections VALUES ('live');
    CREATE TABLE quota_snapshots (
      id INTEGER PRIMARY KEY, provider TEXT, connection_id TEXT, created_at TEXT
    );
    CREATE TABLE combos (
      id TEXT PRIMARY KEY, name TEXT, data TEXT, sort_order INTEGER,
      created_at TEXT, updated_at TEXT
    );
    CREATE TABLE api_keys (id TEXT PRIMARY KEY);
    CREATE TABLE domain_budgets (api_key_id TEXT);
    CREATE TABLE domain_cost_history (api_key_id TEXT);
    CREATE TABLE domain_fallback_chains (chain TEXT);
    CREATE TABLE domain_lockout_state (attempts TEXT);
    CREATE TABLE domain_circuit_breakers (options TEXT);
    CREATE TABLE db_meta (key TEXT PRIMARY KEY, value TEXT);
    INSERT INTO db_meta VALUES ('schema_version', '1');
  `);
  const db = createBetterSqliteAdapter(raw);
  const stats = {
    prepares: [] as string[],
    pages: [] as number[],
    scannedIds: [] as number[],
    mutations: [] as string[],
  };
  const prepare = db.prepare.bind(db);
  db.prepare = (sql) => {
    stats.prepares.push(sql);
    const statement = prepare(sql);
    return {
      get: (...params) => statement.get(...params),
      all: (...params) => {
        const rows = statement.all(...params);
        if (/FROM quota_snapshots/i.test(sql)) {
          stats.pages.push(rows.length);
          stats.scannedIds.push(...rows.map((row) => Number((row as { id: string }).id)));
        }
        return rows;
      },
      run: (...params) => {
        stats.mutations.push(sql);
        return statement.run(...params);
      },
    };
  };
  return { raw, db, stats };
}

function seedSnapshots(raw: Database.Database, count: number) {
  const insert = raw.prepare("INSERT INTO quota_snapshots VALUES (?, 'openai', ?, ?)");
  const invalidIds: number[] = [];
  raw.transaction(() => {
    for (let index = 0; index < count; index += 1) {
      const id = index - 2;
      // Include JS-only whitespace and a Date.parse-compatible non-ISO timestamp.
      const cases: Array<[string | null, string | null, boolean]> = [
        ["missing", TIMESTAMP, true],
        ["live", "not-a-date", true],
        ["missing", null, true],
        [" \tlive\n", TIMESTAMP, false],
        ["\u00a0\t\n", TIMESTAMP, false],
        [null, "September 1, 2026", false],
        ["live", " \t", true],
        ["live", TIMESTAMP, false],
      ];
      const [connection, timestamp, invalid] = cases[index % cases.length];
      insert.run(id, connection, timestamp);
      if (invalid) invalidIds.push(id);
    }
  })();
  return invalidIds;
}

function seedCombo(raw: Database.Database, kind: "invalid" | "pins") {
  const data =
    kind === "invalid"
      ? "{invalid"
      : JSON.stringify({
          models: Array.from({ length: 40 }, () => ({
            kind: "model",
            model: "openai/example",
            connectionId: "missing",
          })),
        });
  raw
    .prepare("INSERT INTO combos VALUES (?, ?, ?, 0, ?, ?)")
    .run(kind, kind, data, TIMESTAMP, TIMESTAMP);
}

function assertBounded(stats: ReturnType<typeof fixture>["stats"]) {
  assert.ok(stats.pages.length >= 3, "must visit more than two pages");
  assert.ok(Math.max(...stats.pages) <= 1000, "no snapshot read may exceed 1000 rows");
  const lookups = stats.prepares.filter((sql) =>
    /SELECT 1 AS ok FROM provider_connections/.test(sql)
  );
  assert.equal(lookups.length, 1, "snapshot connection lookup is prepared once");
  assert.ok(stats.prepares.length < 30, "prepare count must not scale with rows");
}

for (const autoRepair of [false, true]) {
  test(`snapshot scan is bounded and preserves validation semantics (repair=${autoRepair})`, () => {
    const { raw, db, stats } = fixture();
    try {
      const invalidIds = seedSnapshots(raw, 2507);
      const before = raw.serialize();
      let backups = 0;
      if (!autoRepair) raw.pragma("query_only = ON");
      const result = runDbHealthCheck(db, {
        autoRepair,
        createBackupBeforeRepair: () => {
          backups += 1;
          assert.equal(stats.mutations.length, 0);
          assert.deepEqual(raw.serialize(), before);
          return true;
        },
      });
      assert.equal(
        result.issues.find((issue) => issue.table === "quota_snapshots")?.count,
        invalidIds.length
      );
      assert.equal(result.repairedCount, autoRepair ? invalidIds.length : 0);
      assert.equal(backups, autoRepair ? 1 : 0);
      assert.equal(result.backupCreated, autoRepair);
      assert.deepEqual(
        stats.scannedIds,
        Array.from({ length: 2507 }, (_, index) => index - 2)
      );
      assertBounded(stats);
      if (!autoRepair) {
        assert.deepEqual(raw.serialize(), before);
        assert.equal(stats.mutations.length, 0);
      } else {
        const remaining = raw.prepare("SELECT id FROM quota_snapshots ORDER BY id").all() as {
          id: number;
        }[];
        const invalid = new Set(invalidIds);
        assert.deepEqual(
          remaining.map((row) => row.id),
          stats.scannedIds.filter((id) => !invalid.has(id))
        );
        assert.equal(
          stats.prepares.filter((sql) => /DELETE FROM quota_snapshots/.test(sql)).length,
          1
        );
        const again = runDbHealthCheck(db, {
          autoRepair: true,
          createBackupBeforeRepair: () => {
            assert.fail("a clean scan must not request a backup");
          },
        });
        assert.equal(again.repairedCount, 0);
        assert.equal(again.isHealthy, true);
      }
    } finally {
      raw.close();
    }
  });
}

test("snapshot prepare count is independent of history size", () => {
  const counts: number[] = [];
  for (const size of [25, 2507]) {
    const { raw, db, stats } = fixture();
    try {
      seedSnapshots(raw, size);
      runDbHealthCheck(db, { autoRepair: true });
      counts.push(stats.prepares.length);
    } finally {
      raw.close();
    }
  }
  assert.equal(counts[0], counts[1]);
});

test("snapshot scan stops at the initial upper ID even if rows are appended between pages", () => {
  const { raw, db, stats } = fixture();
  try {
    seedSnapshots(raw, 2507);
    const prepare = db.prepare.bind(db);
    let appends = 0;
    db.prepare = (sql) => {
      const statement = prepare(sql);
      if (!/FROM quota_snapshots/i.test(sql)) return statement;
      return {
        ...statement,
        all: (...params) => {
          const rows = statement.all(...params);
          if (rows.length > 0) {
            assert.ok(appends < 10, "scan failed to terminate at its captured upper bound");
            raw
              .prepare("INSERT INTO quota_snapshots VALUES (?, 'openai', 'missing', ?)")
              .run(10000 + appends, TIMESTAMP);
            appends += 1;
          }
          return rows;
        },
      };
    };
    runDbHealthCheck(db);
    assert.deepEqual(
      stats.scannedIds,
      Array.from({ length: 2507 }, (_, index) => index - 2)
    );
    assertBounded(stats);
  } finally {
    raw.close();
  }
});

for (const kind of ["invalid", "pins"] as const) {
  test(`backup runs before the first ${kind} combo update`, () => {
    const { raw, db, stats } = fixture();
    try {
      seedCombo(raw, kind);
      const before = raw.serialize();
      let backups = 0;
      const result = runDbHealthCheck(db, {
        autoRepair: true,
        createBackupBeforeRepair: () => {
          backups += 1;
          assert.equal(stats.mutations.length, 0);
          assert.deepEqual(raw.serialize(), before);
          return true;
        },
      });
      assert.equal(backups, 1);
      assert.equal(result.repairedCount, kind === "pins" ? 40 : 1);
      assert.equal(result.backupCreated, true);
      assert.equal(stats.mutations.length, 1);
      assert.equal(runDbHealthCheck(db).isHealthy, true);
      if (kind === "pins") {
        assert.equal(
          stats.prepares.filter((sql) => /SELECT 1 AS ok FROM provider_connections/.test(sql))
            .length,
          2
        );
      }
    } finally {
      raw.close();
    }
  });
}

for (const firstIssue of ["invalid", "pins", "quota", "domain", "schema"] as const) {
  for (const failure of ["false", "throw"] as const) {
    test(`backup ${failure} blocks every mutation when first issue is ${firstIssue}`, () => {
      const { raw, db, stats } = fixture();
      try {
        if (firstIssue === "invalid" || firstIssue === "pins") seedCombo(raw, firstIssue);
        if (firstIssue !== "schema" && firstIssue !== "domain") seedSnapshots(raw, 25);
        if (firstIssue !== "schema") {
          raw.exec(`
            INSERT INTO domain_budgets VALUES ('missing');
            INSERT INTO domain_cost_history VALUES ('missing');
            INSERT INTO domain_fallback_chains VALUES ('{invalid');
            INSERT INTO domain_lockout_state VALUES ('{invalid');
            INSERT INTO domain_circuit_breakers VALUES ('{invalid');
          `);
        }
        raw.exec("UPDATE db_meta SET value = '0'");
        const before = raw.serialize();
        let backups = 0;
        assert.throws(
          () =>
            runDbHealthCheck(db, {
              autoRepair: true,
              createBackupBeforeRepair: () => {
                backups += 1;
                if (failure === "throw") throw new Error("backup unavailable");
                return false;
              },
            }),
          /backup/i
        );
        assert.equal(backups, 1);
        assert.equal(stats.mutations.length, 0);
        assert.deepEqual(raw.serialize(), before);
      } finally {
        raw.close();
      }
    });
  }
}

test("standalone repair without a backup callback remains supported", () => {
  const { raw, db } = fixture();
  try {
    seedCombo(raw, "invalid");
    const result = runDbHealthCheck(db, { autoRepair: true });
    assert.equal(result.repairedCount, 1);
    assert.equal(result.backupCreated, false);
    assert.equal(runDbHealthCheck(db).isHealthy, true);
  } finally {
    raw.close();
  }
});

for (const start of [-9223372036854775808n, 9007199254740000n, 9223372036854773300n]) {
  test(`snapshot cursors preserve SQLite int64 IDs starting at ${start}`, () => {
    const { raw, db } = fixture();
    try {
      const expected: string[] = [];
      const insert = raw.prepare("INSERT INTO quota_snapshots VALUES (?, 'openai', ?, ?)");
      raw.transaction(() => {
        for (let i = 0; i < 2507; i++) {
          const id = start + BigInt(i);
          const valid = i % 2 === 0;
          insert.run(id, valid ? "live" : "missing", TIMESTAMP);
          if (valid) expected.push(String(id));
        }
      })();
      const before = raw.serialize();
      const diagnosis = runDbHealthCheck(db);
      assert.equal(diagnosis.isHealthy, false);
      assert.equal(diagnosis.issues.find((x) => x.table === "quota_snapshots")?.count, 1253);
      assert.deepEqual(raw.serialize(), before);
      const repaired = runDbHealthCheck(db, { autoRepair: true });
      assert.equal(repaired.repairedCount, 1253);
      const remaining = raw
        .prepare("SELECT CAST(id AS TEXT) AS id FROM quota_snapshots ORDER BY id + 0")
        .all() as { id: string }[];
      assert.deepEqual(
        remaining.map((x) => x.id),
        expected
      );
      assert.equal(runDbHealthCheck(db).isHealthy, true);
    } finally {
      raw.close();
    }
  });
}
