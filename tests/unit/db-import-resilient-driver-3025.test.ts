/**
 * #3025 — DB import route must not hard-depend on a static `better-sqlite3` import.
 *
 * In the packaged Electron app, `better-sqlite3` is stripped from the Next standalone
 * server's `node_modules` (it is rebuilt for the Electron ABI elsewhere). Every other DB
 * code path survives because it loads the driver through the resilient driver factory
 * (`tryOpenSync` → better-sqlite3 → node:sqlite → sql.js). The db-backups *import* route
 * was the lone exception: it did `import Database from "better-sqlite3"` at module scope,
 * so loading the route crashed with `Cannot find module 'better-sqlite3'` (reported on
 * Windows installer v3.8.10), even though node:sqlite was available.
 *
 * Guard: no API route under src/app/api may statically import/require better-sqlite3 —
 * routes run inside the standalone server where the native module is not guaranteed.
 * Behaviour: the resilient opener validates a real sqlite file via PRAGMA integrity_check
 * and surfaces the same `[{ integrity_check: "ok" }]` shape the route relies on.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { openDatabaseAsync } from "../../src/lib/db/adapters/driverFactory.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_DIR = path.join(__dirname, "..", "..", "src", "app", "api");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx|js|mjs)$/.test(entry)) out.push(full);
  }
  return out;
}

const DIRECT_IMPORT = /(?:from\s+|require\(\s*)["']better-sqlite3["']/;

test("no API route statically imports better-sqlite3 (must use the resilient driver factory)", () => {
  const offenders = walk(API_DIR).filter((file) => DIRECT_IMPORT.test(readFileSync(file, "utf8")));
  assert.deepEqual(
    offenders.map((f) => path.relative(API_DIR, f)),
    [],
    "API routes run in the standalone server where better-sqlite3 may be absent; open " +
      "databases via src/lib/db (openDatabaseAsync / getDbInstance), never a direct import."
  );
});

test("openDatabaseAsync validates a real sqlite file with the integrity_check shape the route expects", async () => {
  const tmp = path.join(os.tmpdir(), `omniroute-3025-${process.pid}-${process.hrtime.bigint()}.sqlite`);
  // Seed a valid sqlite file through the same resilient adapter the route will now use.
  const seed = await openDatabaseAsync(tmp);
  seed.exec("CREATE TABLE api_keys (id INTEGER PRIMARY KEY)");
  seed.close();

  const db = await openDatabaseAsync(tmp, { readonly: true });
  try {
    const result = db.pragma("integrity_check") as Array<{ integrity_check?: string }>;
    assert.equal(result[0]?.integrity_check, "ok");
    const tables = (db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as Array<{
      name: string;
    }>).map((r) => r.name);
    assert.ok(tables.includes("api_keys"));
  } finally {
    db.close();
    for (const f of [tmp, `${tmp}-wal`, `${tmp}-shm`, `${tmp}-journal`]) {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    }
  }
});
