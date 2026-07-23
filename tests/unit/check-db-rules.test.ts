import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectDbModules,
  extractReexportedModules,
  findMissingReexports,
  hasLogic,
  extractStringLiterals,
  findRawSql,
  collectSqlScanFiles,
  INTENTIONALLY_INTERNAL,
  KNOWN_UNEXPORTED,
} from "../../scripts/check/check-db-rules.mjs";
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), "../../..");
const LOCAL_DB = path.join(REPO_ROOT, "src/lib/localDb.ts");

// ---------- (a) re-export completeness ----------

test("findMissingReexports: flags a NEW db module that is not re-exported", () => {
  const dbModules = ["providers", "brandNewModule"];
  const reexported = new Set(["providers"]) as Set<string>;
  const allowlist = new Set<string>();
  const missing = findMissingReexports(dbModules, reexported, allowlist) as string[];
  assert.deepEqual(missing, ["brandNewModule"]);
});

test("findMissingReexports: a re-exported module passes", () => {
  const dbModules = ["providers"];
  const reexported = new Set(["providers"]) as Set<string>;
  const missing = findMissingReexports(dbModules, reexported, new Set<string>()) as string[];
  assert.deepEqual(missing, []);
});

test("findMissingReexports: an allowlisted (frozen) module passes even if not re-exported", () => {
  const dbModules = ["notion"];
  const reexported = new Set<string>();
  const allowlist = new Set(["notion"]) as Set<string>;
  const missing = findMissingReexports(dbModules, reexported, allowlist) as string[];
  assert.deepEqual(missing, []);
});

test("extractReexportedModules: parses ./db/X from export forms", () => {
  const src = [
    'export { getCombos } from "./db/combos";',
    'export * from "./db/featureFlags";',
    'export type { Webhook } from "./db/webhooks";',
    'export { sumUsageTokensThisMonth } from "./db/usageSummary";',
    // not a db module — must be ignored
    'export { initPricingSync } from "./pricingSync";',
  ].join("\n");
  const mods = extractReexportedModules(src) as Set<string>;
  assert.equal(mods.has("combos"), true);
  assert.equal(mods.has("featureFlags"), true);
  assert.equal(mods.has("webhooks"), true);
  assert.equal(mods.has("usageSummary"), true);
  assert.equal(mods.has("pricingSync"), false);
});

test("collectDbModules: returns real modules and excludes core/localDb/index", () => {
  const mods = collectDbModules() as string[];
  assert.ok(mods.includes("providers"), "expected providers module");
  assert.ok(mods.includes("combos"), "expected combos module");
  assert.equal(mods.includes("core"), false, "core must be excluded");
  assert.equal(mods.includes("localDb"), false, "localDb must be excluded");
  assert.equal(mods.includes("index"), false, "index must be excluded");
});

// FREEZE GUARD: the live repo state must be green under the shipped allowlist.
test("live repo: no NEW unexported db modules beyond the frozen allowlist", async () => {
  // Re-import the gate's frozen allowlist indirectly by running its default behavior:
  // findMissingReexports with the gate default allowlist must be empty for the repo.
  const dbModules = collectDbModules() as string[];
  const reexported = extractReexportedModules(fs.readFileSync(LOCAL_DB, "utf8")) as Set<string>;
  // Default allowlist (KNOWN_UNEXPORTED) is applied inside findMissingReexports.
  const missing = findMissingReexports(dbModules, reexported) as string[];
  assert.deepEqual(
    missing,
    [],
    `Unexported db module(s) not in KNOWN_UNEXPORTED: ${missing.join(", ")}`
  );
});

// ---------- (b) localDb has no logic ----------

test("hasLogic: false for a pure re-export layer", () => {
  const src = [
    "// re-export layer",
    'export { a, b } from "./db/foo";',
    'export * from "./db/bar";',
    'export type { T } from "./db/baz";',
  ].join("\n");
  assert.equal(hasLogic(src) as boolean, false);
});

test("hasLogic: true for a function declaration", () => {
  const src = 'export { a } from "./db/foo";\nfunction doThing() { return 1; }';
  assert.equal(hasLogic(src) as boolean, true);
});

test("hasLogic: true for an arrow-function const", () => {
  const src = 'export { a } from "./db/foo";\nconst helper = (x) => x + 1;';
  assert.equal(hasLogic(src) as boolean, true);
});

test("hasLogic: true for a class declaration", () => {
  const src = 'export { a } from "./db/foo";\nclass Thing {}';
  assert.equal(hasLogic(src) as boolean, true);
});

test("hasLogic: SQL/logic-looking text inside comments or strings does not trip", () => {
  const src = [
    "/* function notReal() {} */",
    "// const fake = () => 1;",
    'export const SOURCE = "./db/foo";', // string only, no function on rhs
    'export { a } from "./db/foo";',
  ].join("\n");
  // export const X = "string" is a value (not logic): the rhs is a string literal,
  // so the arrow/call pattern must NOT match.
  assert.equal(hasLogic(src) as boolean, false);
});

test("live repo: src/lib/localDb.ts contains no logic", () => {
  const src = fs.readFileSync(LOCAL_DB, "utf8");
  assert.equal(hasLogic(src) as boolean, false);
});

// ---------- (c) no raw SQL outside db/ ----------

test("extractStringLiterals: returns only string bodies, ignoring code", () => {
  const code = 'import { x } from "y";\nconst q = `SELECT * FROM t`;\nobj.set(1);';
  const literals = extractStringLiterals(code) as string;
  assert.ok(literals.includes("SELECT * FROM t"), "captures the template body");
  assert.ok(literals.includes("y"), "captures the import path string");
  assert.equal(literals.includes("set"), false, "JS .set() call is not a string body");
});

test("findRawSql: flags a NEW route with raw SQL in a string literal", () => {
  const tmp = path.join(REPO_ROOT, ".tmp-check-db-rules-raw-sql.route.ts");
  fs.writeFileSync(
    tmp,
    'const rows = db.prepare(`SELECT id FROM users WHERE x = ?`).all();\n',
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
  fs.writeFileSync(tmp, "// SELECT id FROM users -- documentation only\nexport const x = 1;\n", "utf8");
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

test("live repo: no NEW raw-SQL offenders beyond the frozen allowlist", () => {
  // findRawSql uses the gate default allowlist (KNOWN_RAW_SQL) when none is passed.
  const files = collectSqlScanFiles() as string[];
  const offenders = findRawSql(files) as string[];
  assert.deepEqual(offenders, [], `New raw-SQL offender(s): ${offenders.join(", ")}`);
});

// --- stale-allowlist enforcement (6A.3) ---

test("stale-enforcement: INTENTIONALLY_INTERNAL entry no longer unexported is reported as stale", () => {
  // Simulate a module that has now been re-exported (no longer unexported).
  const liveUnexported: string[] = []; // module was re-exported
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    new Set(["oldModule"]),
    liveUnexported,
    "check-db-rules:unexported"
  );
  assert.deepEqual(stale, ["oldModule"]);
});

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

test("stale-enforcement: live repo INTENTIONALLY_INTERNAL entries are all still unexported", () => {
  // Every entry in INTENTIONALLY_INTERNAL must still be an unexported module.
  // If it was re-exported (moved to localDb.ts), it must be removed from the allowlist.
  const dbModules = collectDbModules() as string[];
  const reexported = extractReexportedModules(
    fs.readFileSync(path.resolve(fileURLToPath(import.meta.url), "../../../src/lib/localDb.ts"), "utf8")
  ) as Set<string>;
  const liveUnexported = dbModules.filter((mod) => !reexported.has(mod));
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    INTENTIONALLY_INTERNAL as Set<string>,
    liveUnexported,
    "check-db-rules:unexported"
  );
  assert.deepEqual(stale, [], `INTENTIONALLY_INTERNAL has stale entries: ${stale.join(", ")}`);
});

test("KNOWN_UNEXPORTED is an alias for INTENTIONALLY_INTERNAL (retrocompat)", () => {
  assert.equal(INTENTIONALLY_INTERNAL, KNOWN_UNEXPORTED);
});
