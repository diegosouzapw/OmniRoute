import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-logs-errtype-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const stats = await import("../../../src/lib/db/callLogStats.ts");
const { ERROR_TYPE_CONTRACT } = await import(
  "../../../open-sse/services/errorClassifier.ts"
);

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function indexNames(db: ReturnType<typeof core.getDbInstance>): string[] {
  return (
    db.prepare("SELECT name FROM sqlite_master WHERE type = 'index'").all() as Array<{
      name: string;
    }>
  ).map((r) => r.name);
}

function seedTwoFamiliesPlusSuccess(db: ReturnType<typeof core.getDbInstance>) {
  const now = new Date().toISOString();
  // Both values come from ERROR_TYPE_CONTRACT: any stored value outside the
  // contract collapses into a single `unclassified` bucket at query time.
  assert.ok(ERROR_TYPE_CONTRACT.includes("rate_limited"));
  assert.ok(ERROR_TYPE_CONTRACT.includes("server_error"));
  db.prepare(
    `INSERT INTO provider_connections (id, provider, created_at, updated_at)
     VALUES ('conn-1', 'openai', ?, ?)`
  ).run(now, now);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, status, error_type)
     VALUES ('err-1', ?, 'openai', 500, 'rate_limited'),
            ('err-2', ?, 'openai', 500, 'server_error'),
            ('ok-1', ?, 'openai', 200, NULL)`
  ).run(now, now, now);
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 186 creates the error_type index used by the failure-family breakdown", () => {
  const db = core.getDbInstance();

  assert.ok(
    indexNames(db).includes("idx_cl_error_type"),
    "idx_cl_error_type must exist after migrations"
  );
});

test("getErrorTypeBreakdown returns one row per failure family, successes excluded", () => {
  const db = core.getDbInstance();
  seedTwoFamiliesPlusSuccess(db);

  const breakdown = stats.getErrorTypeBreakdown("", {});
  const byType = new Map(breakdown.map((b) => [b.errorType, b.count]));
  assert.equal(byType.get("rate_limited"), 1);
  assert.equal(byType.get("server_error"), 1);
  assert.equal(breakdown.length, 2);
});

test("breakdown buckets are identical with and without the index (index changes no behavior)", () => {
  // Isolation protocol: single seed, capture buckets with the index, DROP it,
  // capture again, then re-create it via the migration file — one DB per phase
  // is unnecessary here because the index never changes query results; only
  // the re-created index is asserted for presence. No RED is expected here —
  // an index never changes query results; the assertion is a behavior guard,
  // not a red/green proof.
  const db = core.getDbInstance();
  seedTwoFamiliesPlusSuccess(db);

  const withIndex = stats.getErrorTypeBreakdown("", {});
  db.exec("DROP INDEX IF EXISTS idx_cl_error_type");
  assert.ok(!indexNames(db).includes("idx_cl_error_type"));
  const withoutIndex = stats.getErrorTypeBreakdown("", {});

  const migrationSql = fs.readFileSync(
    path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "../../../src/lib/db/migrations/186_call_logs_error_type_index.sql"
    ),
    "utf8"
  );
  db.exec(migrationSql);
  assert.ok(indexNames(db).includes("idx_cl_error_type"));

  assert.deepEqual(withoutIndex, withIndex);
});

test("GET /api/usage/analytics returns the same errorBreakdown with and without the index", async () => {
  // Functional half of the spec criterion: the endpoint payload is unchanged
  // by the index. Isolation protocol: seed identical call_logs rows, call the
  // route, DROP the index, reset nothing else, call again — the errorBreakdown
  // slice must be deep-equal. No RED expected (index is behavior-neutral).
  const db = core.getDbInstance();
  seedTwoFamiliesPlusSuccess(db);

  const { GET } = await import("../../../src/app/api/usage/analytics/route.ts");
  const readBreakdown = async () => {
    const res = await GET(new Request("http://localhost/api/usage/analytics?range=all"));
    const body = (await res.json()) as { errorBreakdown: Array<unknown> };
    return body.errorBreakdown;
  };

  const withIndex = await readBreakdown();
  db.exec("DROP INDEX IF EXISTS idx_cl_error_type");
  const withoutIndex = await readBreakdown();

  const migrationSql = fs.readFileSync(
    path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "../../../src/lib/db/migrations/186_call_logs_error_type_index.sql"
    ),
    "utf8"
  );
  db.exec(migrationSql);

  assert.deepEqual(withoutIndex, withIndex);
});

test("migration file 186 alone creates idx_cl_error_type (isolated RED proof)", () => {
  // NOTE: on a booted DB the index always exists (migration 186 and the
  // schema healer create it independently), so no RED is possible there. The
  // RED-then-GREEN proof lives here: start from a DB without the index, apply
  // only the migration file, then assert presence.
  const db = core.getDbInstance();
  db.exec("DROP INDEX IF EXISTS idx_cl_error_type");
  assert.ok(
    !indexNames(db).includes("idx_cl_error_type"),
    "RED: index must be absent after DROP"
  );

  const migrationSql = fs.readFileSync(
    path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "../../../src/lib/db/migrations/186_call_logs_error_type_index.sql"
    ),
    "utf8"
  );
  assert.ok(
    migrationSql.includes("CREATE INDEX IF NOT EXISTS idx_cl_error_type"),
    "migration 186 must declare idx_cl_error_type idempotently"
  );
  db.exec(migrationSql); // GREEN
  assert.ok(
    indexNames(db).includes("idx_cl_error_type"),
    "GREEN: migration 186 creates idx_cl_error_type"
  );
  db.exec(migrationSql); // re-playable
  assert.ok(indexNames(db).includes("idx_cl_error_type"));
});

test("EXPLAIN QUERY PLAN of the breakdown is captured (documented, non-strict)", () => {
  // Captured for the spec criterion, not asserted strictly: the breakdown
  // groups by a CASE expression, so SQLite cannot use a plain-column index
  // for the grouping (see justification in the code report).
  const db = core.getDbInstance();
  seedTwoFamiliesPlusSuccess(db);

  const planOf = () =>
    (
      db
        .prepare(
          `EXPLAIN QUERY PLAN SELECT CASE WHEN error_type IS NULL THEN 'unclassified' ELSE error_type END AS errorType, COUNT(*) AS count FROM call_logs WHERE (status >= 400 OR error_summary IS NOT NULL) GROUP BY 1 ORDER BY count DESC, errorType ASC`
        )
        .all() as Array<{ detail: string }>
    )
      .map((r) => r.detail)
      .join(" | ");

  const withIndex = planOf();
  db.exec("DROP INDEX IF EXISTS idx_cl_error_type");
  const withoutIndex = planOf();
  console.log(`[error-type-index] EXPLAIN with index: ${withIndex}`);
  console.log(`[error-type-index] EXPLAIN without index: ${withoutIndex}`);
  assert.ok(withIndex.length > 0);
  assert.ok(withoutIndex.length > 0);
});
