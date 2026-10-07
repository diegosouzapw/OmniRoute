/**
 * Tests for migration 163 — radar_feed_cache.generated_at.
 *
 * Verifies:
 *  - the column exists once after the migration runs (fresh database)
 *  - a row written the way the previous schema wrote it — no build date at all —
 *    reads back as null rather than borrowing the fetch time
 *  - the rest of that row survives the upgrade untouched
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-163-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const radarDb = await import("../../../src/lib/db/radar.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 163 — radar_feed_cache carries generated_at exactly once", () => {
  const db = core.getDbInstance();

  const columns = (
    db.prepare("PRAGMA table_info(radar_feed_cache)").all() as Array<{ name: string }>
  ).map((c) => c.name);

  assert.equal(
    columns.filter((c) => c === "generated_at").length,
    1,
    "generated_at must be added once, whatever the number of migration runs"
  );
});

test("migration 163 — a row from the previous schema keeps its data and reads no build date", () => {
  const db = core.getDbInstance();

  // Exactly the INSERT the previous schema could write: no generated_at column.
  db.prepare(
    `INSERT INTO radar_feed_cache (id, version, tier, payload, signature, fetched_at)
     VALUES (1, ?, ?, ?, ?, ?)`
  ).run(
    "2026.08.02.1",
    "community",
    '{"feed":"omniroute-radar"}',
    "sig",
    "2026-08-24T07:00:00.000Z"
  );

  const cache = radarDb.getRadarCache();

  assert.ok(cache);
  assert.equal(
    cache.generatedAt,
    null,
    "an upgraded row has no build date, and must not invent one"
  );
  assert.equal(cache.version, "2026.08.02.1", "the pre-migration data must survive untouched");
  assert.equal(cache.tier, "community");
  assert.equal(cache.fetchedAt, "2026-08-24T07:00:00.000Z");
});
