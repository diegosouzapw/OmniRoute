import test from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import path from "node:path";

const MIGRATIONS_DIR = path.resolve(import.meta.dirname, "../../src/lib/db/migrations");

const SUPERSEDED_DUPLICATE_VERSIONS = new Set([
  // From migrationRunner.ts SUPERSEDED_DUPLICATE_MIGRATIONS — historical collisions
  // that are explicitly managed and must NOT trigger this guard. Adding to this set
  // requires a corresponding entry in the runner.
  "028", // evals_tables superseded by another 028
  "029", // webhooks_templates superseded
  "033", // provider_connections_block_extra_usage / add_batch_id_to_call_logs
  "046",
  "051",
]);

test("each migration filename has a unique numeric prefix (excluding historical superseded)", async () => {
  const entries = await readdir(MIGRATIONS_DIR);
  const sqlFiles = entries.filter((f) => f.endsWith(".sql"));

  const seen = new Map<string, string[]>();
  for (const file of sqlFiles) {
    const match = file.match(/^(\d+)_(.+)\.sql$/);
    if (!match) continue;
    const version = match[1];
    if (!seen.has(version)) seen.set(version, []);
    seen.get(version)!.push(file);
  }

  const duplicates: string[] = [];
  for (const [version, files] of seen.entries()) {
    if (files.length > 1 && !SUPERSEDED_DUPLICATE_VERSIONS.has(version)) {
      duplicates.push(`version=${version}: ${files.join(", ")}`);
    }
  }

  assert.equal(
    duplicates.length,
    0,
    `Migration prefix collision detected. The runner's pending filter (migrationRunner.ts:928) ` +
      `uses version ONLY, so all but one of these migrations would be SILENTLY SKIPPED on any ` +
      `deployment that has one already applied. Renumber the colliding files to unique prefixes.\n` +
      `Duplicates:\n  - ${duplicates.join("\n  - ")}`
  );
});

test("migration filenames follow NNN_description.sql convention", async () => {
  const entries = await readdir(MIGRATIONS_DIR);
  const sqlFiles = entries.filter((f) => f.endsWith(".sql"));

  const malformed: string[] = [];
  for (const file of sqlFiles) {
    if (!/^\d{3}_[\w-]+\.sql$/.test(file)) {
      malformed.push(file);
    }
  }

  assert.equal(
    malformed.length,
    0,
    `Migration filenames must match /^\\d{3}_[\\w-]+\\.sql$/. Malformed:\n  - ${malformed.join("\n  - ")}`
  );
});
