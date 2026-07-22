import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const adapterPath = join(__dirname, "../../src/lib/db/adapters/sqljsAdapter.ts");
const source = readFileSync(adapterPath, "utf8");

test("#8135: sqljsAdapter must not statically resolve sql.js at build time", () => {
  const lines = source.split("\n");

  // Find lines containing `await import(` — the actual dynamic import call.
  // (Exclude `typeof import(...)` type annotations.)
  const dynamicImportLines = lines.filter(
    (l) => l.includes("await import(") && !l.includes("typeof import(")
  );

  assert.ok(
    dynamicImportLines.length > 0,
    "sqljsAdapter should have at least one dynamic import call"
  );

  // None of the runtime dynamic import calls should use a literal "sql.js" specifier
  for (const line of dynamicImportLines) {
    assert.ok(
      !line.includes('import("sql.js")'),
      "sqljsAdapter should not use a literal import('sql.js') at runtime — use a computed specifier"
    );
  }

  // The webpackIgnore magic comment must be present
  assert.ok(
    source.includes("/* webpackIgnore: true */"),
    "sqljsAdapter dynamic import should include /* webpackIgnore: true */ magic comment"
  );
});
