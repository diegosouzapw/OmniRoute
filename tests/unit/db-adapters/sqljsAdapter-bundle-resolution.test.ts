import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const SQLJS_ADAPTER_SOURCE = fs.readFileSync(
  new URL("../../../src/lib/db/adapters/sqljsAdapter.ts", import.meta.url),
  "utf8"
);

test("sqljsAdapter resolves WASM through the public sql.js entrypoint", () => {
  // sql.js does not export ./package.json. Turbopack resolves literal require.resolve()
  // calls at build time even inside try/catch, so that private subpath becomes a repeated
  // module-not-found diagnostic for every route importing the DB adapter.
  assert.match(SQLJS_ADAPTER_SOURCE, /_require\.resolve\(["']sql\.js["']\)/);
  assert.doesNotMatch(SQLJS_ADAPTER_SOURCE, /sql\.js\/package\.json/);
});
