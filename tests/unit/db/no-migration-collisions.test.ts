/**
 * PM-02 — CI guard against migration version-number collisions.
 *
 * The migration runner tracks applied migrations by version (PRIMARY KEY in
 * _omniroute_migrations). When two files share the same numeric prefix
 * (e.g. 068_a.sql + 068_b.sql), only the first is applied; the rest are
 * silently skipped. This caused a production regression in v3.8.4 (three
 * PRs each shipped a 068_*.sql; see _tasks/features-v3.8.4/9route/POST-MERGE-AUDIT.md).
 *
 * SUPERSEDED_DUPLICATE_MIGRATIONS in migrationRunner.ts intentionally allows
 * known historical pairs (e.g. 041_session_account_affinity superseded by 050).
 * This test honors that allow-list — only "real" (unmanaged) collisions fail.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const MIGRATIONS_DIR = path.join(process.cwd(), "src/lib/db/migrations");

// Mirror of SUPERSEDED_DUPLICATE_MIGRATIONS in migrationRunner.ts (line ~156).
// Keep in sync if the runner adds new managed pairs.
const SUPERSEDED = new Set<string>([
  "041:session_account_affinity",
  // Add new "version:name" entries here if you intentionally renumber a migration.
]);

test("no two migration files share the same numeric prefix", () => {
  const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));

  const byVersion = new Map<string, string[]>();
  for (const file of files) {
    const m = file.match(/^(\d+)_(.+)\.sql$/);
    if (!m) continue;
    const [, version, name] = m;
    if (!byVersion.has(version)) byVersion.set(version, []);
    byVersion.get(version)!.push(name);
  }

  const realCollisions = Array.from(byVersion.entries())
    .filter(([, names]) => names.length > 1)
    .map(([version, names]) => ({
      version,
      liveNames: names.filter((n) => !SUPERSEDED.has(`${version}:${n}`)),
    }))
    .filter((c) => c.liveNames.length > 1);

  assert.deepEqual(
    realCollisions,
    [],
    `Migration version collisions detected:\n${realCollisions
      .map((c) => `  ${c.version}: [${c.liveNames.join(", ")}]`)
      .join(
        "\n"
      )}\n\nFix by renaming one of the files to a unique number AND adding a retroactive guard in migrationRunner.ts isSchemaAlreadyApplied().`
  );
});

test("every migration file matches the NNN_name.sql convention", () => {
  const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
  const bad = files.filter((f) => !/^\d+_[^.]+\.sql$/.test(f));
  assert.deepEqual(bad, [], `Files violating NNN_name.sql convention: ${bad.join(", ")}`);
});
