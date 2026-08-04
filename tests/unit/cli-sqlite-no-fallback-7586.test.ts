import { test } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

// #7586: `omniroute doctor`'s "Database" and "Storage/encryption" checks call
// readDatabaseHealth()/readEncryptedCredentialSamples() from bin/cli/sqlite.mjs,
// which — unlike the real server's driver cascade
// (src/lib/db/adapters/driverFactory.ts::tryOpenSync, which tries
// bun:sqlite -> better-sqlite3 -> node:sqlite) — used to have NO fallback beyond
// better-sqlite3. On any machine where better-sqlite3's native binary is
// unavailable (Windows without a prebuilt addon, per @jmaxdev's report), doctor
// would ALWAYS report "FAIL Database" / "FAIL Storage/encryption" even when the
// real server was perfectly healthy via its own resilient driver selection.
//
// This test simulates that exact machine by intercepting the ESM specifier
// "better-sqlite3" (the one `bin/cli/sqlite.mjs::loadSqlite()` imports) so it
// throws the same "Could not locate the bindings file" error jmax hit, then
// proves readDatabaseHealth() still succeeds by falling back to node:sqlite.
register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, nextResolve) {
        if (specifier === "better-sqlite3") {
          return {
            url:
              "data:text/javascript," +
              encodeURIComponent(
                "throw new Error(" +
                  JSON.stringify(
                    "Could not locate the bindings file. Tried:\\n \\u2192 /fake/path/better_sqlite3.node"
                  ) +
                  ");"
              ),
            shortCircuit: true,
          };
        }
        return nextResolve(specifier, context);
      }
    `),
  import.meta.url
);

const { readDatabaseHealth } = await import("../../bin/cli/sqlite.mjs");

test("#7586: readDatabaseHealth() falls back to node:sqlite when better-sqlite3 is unavailable", async (t) => {
  const dbPath = path.join(os.tmpdir(), `cli-sqlite-no-fallback-7586-${Date.now()}.sqlite`);
  t.after(() => {
    try {
      fs.unlinkSync(dbPath);
    } catch {}
  });

  // Seed a normal, healthy DB using node:sqlite directly — simulating what the
  // ACTUAL server (which DOES have a node:sqlite fallback) would have created
  // on a machine without a better-sqlite3 native binary.
  const seed = new DatabaseSync(dbPath);
  seed.exec(
    "CREATE TABLE _omniroute_migrations (version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT);" +
      "INSERT INTO _omniroute_migrations (version, name, applied_at) VALUES ('001', 'initial_schema', datetime('now'));"
  );
  seed.close();

  // Exercise the CLI helper's own health check — the exact function
  // `omniroute doctor` calls (bin/cli/commands/doctor.mjs:checkDatabase ->
  // readDatabaseHealth). Before the fix this threw "better-sqlite3 is not
  // installed..." even though the DB is perfectly healthy.
  const result = await readDatabaseHealth(dbPath);

  assert.equal(
    result.quickCheckValue,
    "ok",
    "readDatabaseHealth() should report a healthy DB via the node:sqlite fallback, " +
      "not throw, when better-sqlite3 is unavailable (#7586)"
  );
  assert.equal(result.hasMigrationTable, true);
  assert.deepEqual(result.appliedMigrationVersions, ["001"]);
});
