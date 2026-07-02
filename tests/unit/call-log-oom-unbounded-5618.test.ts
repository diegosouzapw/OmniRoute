import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #5618 — `cleanupExpiredLogs` → `rotateCallLogs` ran at daemon startup and used
// unbounded `SELECT … FROM call_logs … .all()` calls. node:sqlite's
// StatementSync.all() materializes the whole result set, so on a large
// storage.sqlite (~170 MB+) the JS heap blew up and the process crashed before
// binding. The two startup queries must page with LIMIT instead of loading the
// whole table at once.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-oom-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const bounded = await import("../../src/lib/usage/callLogsBoundedQueries.ts");

function insertCallLog(id: string, timestamp: string, artifact: string | null = null) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, detail_state, artifact_relpath)
     VALUES (@id, @timestamp, 'POST', '/v1/chat/completions', 200, 'openai/gpt-4.1', 'openai', 'none', @artifact)`
  ).run({ id, timestamp, artifact });
}

function seed(total: number, withArtifact: boolean) {
  const db = core.getDbInstance();
  const base = Date.parse("2026-01-01T00:00:00.000Z");
  db.transaction(() => {
    for (let i = 0; i < total; i++) {
      insertCallLog(
        `r-${String(i).padStart(6, "0")}`,
        new Date(base + i * 1000).toISOString(),
        withArtifact ? `2026-01/${i}.json` : null
      );
    }
  })();
}

function captureSql(run: () => void): string[] {
  const db = core.getDbInstance();
  const orig = db.prepare.bind(db);
  const sqls: string[] = [];
  (db as unknown as { prepare: unknown }).prepare = (sql: string) => {
    sqls.push(sql);
    return orig(sql);
  };
  try {
    run();
  } finally {
    (db as unknown as { prepare: unknown }).prepare = orig;
  }
  return sqls;
}

const unboundedSelectsOnCallLogs = (sqls: string[]) =>
  sqls.filter(
    (s) => /SELECT/i.test(s) && /\bFROM\s+call_logs\b/i.test(s) && !/LIMIT/i.test(s)
  );

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#5618 collectReferencedArtifacts pages with LIMIT and collects across pages — no unbounded .all()", () => {
  const total = 6000; // > one 5000-row page → exercises the pagination loop
  seed(total, true);

  let referenced: Set<string> | undefined;
  const sqls = captureSql(() => {
    referenced = bounded.collectReferencedArtifacts();
  });

  assert.equal(referenced!.size, total, "every artifact path is collected across all pages");
  assert.deepEqual(
    unboundedSelectsOnCallLogs(sqls),
    [],
    `unbounded SELECT on call_logs (OOM risk): ${unboundedSelectsOnCallLogs(sqls).join("; ")}`
  );
});

test("#5618 deleteCallLogsBefore selects ids with LIMIT (bounded) instead of all at once", () => {
  const total = 1200;
  seed(total, false);

  let result: { deletedRows: number } | undefined;
  const sqls = captureSql(() => {
    result = callLogs.deleteCallLogsBefore("2030-01-01T00:00:00.000Z");
  });

  assert.equal(result!.deletedRows, total, "all rows before the cutoff are deleted (across pages)");
  const unboundedIdSelects = sqls.filter(
    (s) => /SELECT\s+id\s+FROM\s+call_logs/i.test(s) && !/LIMIT/i.test(s)
  );
  assert.deepEqual(
    unboundedIdSelects,
    [],
    `unbounded id SELECT on call_logs (OOM risk): ${unboundedIdSelects.join("; ")}`
  );
});
