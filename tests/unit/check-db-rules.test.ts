import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  extractStringLiterals,
  findRawSql,
  collectSqlScanFiles,
  EXTERNAL_DB_ALLOWED,
  KNOWN_RAW_SQL,
} from "../../scripts/check/check-db-rules.mjs";
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), "../../..");

// ---------- (c) no raw SQL outside db/ ----------

test("extractStringLiterals: returns only string bodies, ignoring code", () => {
  const code = 'import { x } from "y";\nconst q = `SELECT * FROM t`; obj.set(1);';
  const literals = extractStringLiterals(code) as string;
  assert.ok(literals.includes("SELECT * FROM t"), "captures the template body");
  assert.ok(literals.includes("y"), "captures the import path string");
  assert.equal(literals.includes("set"), false, "JS .set() call is not a string body");
});

test("findRawSql: flags a NEW route with raw SQL in a string literal", () => {
  const tmp = path.join(REPO_ROOT, ".tmp-check-db-rules-raw-sql.route.ts");
  fs.writeFileSync(
    tmp,
    "const rows = db.prepare(`SELECT id FROM users WHERE x = ?`).all();\n",
    "utf8"
  );
  try {
    const offenders = findRawSql([tmp], new Set<string>()) as string[];
    assert.equal(offenders.length, 1, "raw SELECT...FROM should be flagged");
  } finally {
    fs.rmSync(tmp, { force: true });
  }
});

test("findRawSql: does NOT flag SQL that only appears in a comment", () => {
  const tmp = path.join(REPO_ROOT, ".tmp-check-db-rules-comment.route.ts");
  fs.writeFileSync(
    tmp,
    "// SELECT id FROM users -- documentation only\nexport const x = 1;\n",
    "utf8"
  );
  try {
    const offenders = findRawSql([tmp], new Set<string>()) as string[];
    assert.deepEqual(offenders, []);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
});

test("findRawSql: does NOT flag JS .set()/import-from/new Set() false positives", () => {
  const tmp = path.join(REPO_ROOT, ".tmp-check-db-rules-falsepos.route.ts");
  fs.writeFileSync(
    tmp,
    [
      'import { NextResponse } from "next/server";',
      "const seen = new Set();",
      "headers.set(key, value);",
      "delete obj.field;",
    ].join("\n"),
    "utf8"
  );
  try {
    const offenders = findRawSql([tmp], new Set<string>()) as string[];
    assert.deepEqual(offenders, []);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
});

test("findRawSql: an allowlisted (frozen) offender passes", () => {
  const rel = "src/app/api/skills/[id]/route.ts";
  const abs = path.join(REPO_ROOT, rel);
  const allowlist = new Set([rel]) as Set<string>;
  const offenders = findRawSql([abs], allowlist) as string[];
  assert.deepEqual(offenders, []);
});

test("KNOWN_RAW_SQL is an alias for EXTERNAL_DB_ALLOWED (retrocompat)", () => {
  assert.equal(EXTERNAL_DB_ALLOWED, KNOWN_RAW_SQL);
});

test("live repo: no NEW raw-SQL offenders beyond the frozen allowlist", () => {
  // findRawSql uses the gate default allowlist (KNOWN_RAW_SQL) when none is passed.
  const files = collectSqlScanFiles() as string[];
  const offenders = findRawSql(files) as string[];
  assert.deepEqual(offenders, [], `New raw-SQL offender(s): ${offenders.join(", ")}`);
});

// --- stale-allowlist enforcement (6A.3) ---

test("stale-enforcement: EXTERNAL_DB_ALLOWED entry no longer has raw SQL is reported as stale", () => {
  // Simulate a file that no longer contains raw SQL (route was refactored).
  const liveRawSql: string[] = [];
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    new Set(["src/app/api/oauth/cursor/auto-import/route.ts"]),
    liveRawSql,
    "check-db-rules:raw-sql"
  );
  assert.deepEqual(stale, ["src/app/api/oauth/cursor/auto-import/route.ts"]);
});
