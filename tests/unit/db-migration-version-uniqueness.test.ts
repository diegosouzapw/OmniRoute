/**
 * Regression guard for the migration version collision that blocked
 * release/v3.8.8: `077_api_key_stream_default_mode.sql` and `077_quota_pools.sql`
 * both claimed prefix 077. getMigrationFiles() throws on such a collision, which
 * made getDbInstance() fail at startup and turned every DB-touching test red.
 *
 * quota_pools was renumbered 077 → 085 (it is dependency-free and idempotent;
 * api_key_stream_default_mode is a non-idempotent ALTER and stays at 077).
 *
 * This test asserts — purely from the filesystem, without booting the DB — that
 * no two live migration files share a numeric prefix (mirroring the runner's
 * own collision check, minus any SUPERSEDED_DUPLICATE_MIGRATIONS allowlisted
 * renamed pairs). It prevents the collision from being reintroduced.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MIGRATIONS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "src",
  "lib",
  "db",
  "migrations"
);

function migrationFiles(): Array<{ version: string; name: string }> {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .map((filename) => {
      const m = filename.match(/^(\d+)_(.+)\.sql$/);
      return m ? { version: m[1], name: m[2] } : null;
    })
    .filter((x): x is { version: string; name: string } => x !== null);
}

test("no two migration files share the same numeric prefix", () => {
  const byVersion = new Map<string, string[]>();
  for (const f of migrationFiles()) {
    if (!byVersion.has(f.version)) byVersion.set(f.version, []);
    byVersion.get(f.version)!.push(f.name);
  }
  const collisions = [...byVersion.entries()]
    .filter(([, names]) => names.length > 1)
    .map(([version, names]) => `${version} → [${names.join(", ")}]`);
  assert.deepEqual(
    collisions,
    [],
    `Migration version collision(s) detected: ${collisions.join("; ")}. ` +
      `Each migration must have a unique numeric prefix (rename to the next free number).`
  );
});

test("quota_pools lives at 085 (renumbered from the 077 collision)", () => {
  const files = migrationFiles();
  const quotaPools = files.find((f) => f.name === "quota_pools");
  assert.ok(quotaPools, "quota_pools migration must exist");
  assert.equal(quotaPools.version, "085", "quota_pools must be renumbered to 085");
  // The standalone, non-idempotent column add stays at 077.
  const streamDefault = files.find((f) => f.name === "api_key_stream_default_mode");
  assert.ok(streamDefault, "api_key_stream_default_mode migration must exist");
  assert.equal(streamDefault.version, "077", "api_key_stream_default_mode stays at 077");
});
