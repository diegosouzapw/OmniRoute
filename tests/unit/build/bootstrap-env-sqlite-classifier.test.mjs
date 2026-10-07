import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// The two copies of isNativeSqliteLoadError are deliberately NOT identical.
//
// src/lib/db/sqliteLoadError.ts runs where a match means "this driver is
// unusable, cascade to the next one", so a non-callable better-sqlite3 export
// ("X is not a constructor") must match.
//
// scripts/build/bootstrap-env.mjs runs where the only consumer,
// hasEncryptedCredentials(), turns a match into `return false` — read by the
// caller as "no encrypted credentials exist" and used to mint a fresh
// STORAGE_ENCRYPTION_KEY. Matching a generic TypeError there would overwrite
// the key of a database that still holds enc:v1: rows, so that path stays loud.
//
// Sharing one widened classifier across both is what this test exists to catch.

const GENERIC_TYPE_ERROR_PATTERNS = ['"is not a function"', '"is not a constructor"'];

function readSource(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

function classifierBody(source) {
  const start = source.indexOf("isNativeSqliteLoadError");
  assert.notEqual(start, -1, "isNativeSqliteLoadError not found");
  const end = source.indexOf("\n}", start);
  assert.notEqual(end, -1, "could not delimit isNativeSqliteLoadError");
  return source.slice(start, end);
}

test("the bootstrap classifier stays narrow so key generation cannot silently proceed", () => {
  const body = classifierBody(readSource("../../../scripts/build/bootstrap-env.mjs"));

  for (const pattern of GENERIC_TYPE_ERROR_PATTERNS) {
    assert.ok(
      !body.includes(pattern),
      `scripts/build/bootstrap-env.mjs must not classify ${pattern} as a native SQLite load failure: ` +
        "hasEncryptedCredentials() would then report no encrypted credentials and bootstrapEnv " +
        "would generate a new STORAGE_ENCRYPTION_KEY over encrypted rows."
    );
  }

  // The narrow patterns it does need must still be there.
  assert.ok(body.includes('"ERR_DLOPEN_FAILED"'));
  assert.ok(body.includes("\"Cannot find module 'better-sqlite3'\""));
});

test("the runtime classifier keeps matching a non-callable better-sqlite3 export", () => {
  const body = classifierBody(readSource("../../../src/lib/db/sqliteLoadError.ts"));

  for (const pattern of GENERIC_TYPE_ERROR_PATTERNS) {
    assert.ok(
      body.includes(pattern),
      `src/lib/db/sqliteLoadError.ts must classify ${pattern} so a non-callable export ` +
        "cascades to the node:sqlite/sql.js fallback instead of disabling the driver."
    );
  }
});

// Failing loudly is the point, but an operator staring at "Database is not a
// constructor" has no way to know a native rebuild is the remedy. The bootstrap
// wrapper appends that hint without widening what counts as a load failure.
test("a non-callable export still fails loudly, now with a rebuild hint", () => {
  const source = readSource("../../../scripts/build/bootstrap-env.mjs");

  assert.match(
    source,
    /function isLikelyBrokenNativeBinding\(error\)/,
    "the hint predicate must exist and stay separate from isNativeSqliteLoadError"
  );
  assert.match(source, /npm rebuild better-sqlite3/, "the remediation hint text must be present");

  // The hint decorates the throw; it must never turn into a `return false`.
  const hintIndex = source.indexOf("npm rebuild better-sqlite3");
  const tail = source.slice(hintIndex, hintIndex + 400);
  assert.match(
    tail,
    /throw new Error\(`Unable to inspect existing database at \$\{dbPath\}: \$\{message\}\$\{hint\}`\)/,
    "the broken-binding path must still throw, never report 'no encrypted credentials'"
  );
});
