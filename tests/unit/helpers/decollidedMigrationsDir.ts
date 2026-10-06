/**
 * Test-only workaround for the inherited base-red "Migration version collision
 * detected" on release/v3.8.50 (originally the `134_ccr_blocks.sql` +
 * `134_proxy_logs_egress_ip.sql` pair, fixed by #9688; the surviving pair is
 * `135_connection_runtime_state.sql` + `135_migrate_model_capability_max_token.sql`,
 * fix #9676 in flight). Any test that exercises a code path opening
 * the DB (e.g. `VisionBridgeGuardrail.preCall` → `getResolvedModelCapabilities`
 * → `getDbInstance`) dies at migration-file scan time, BEFORE the code under
 * test runs — making TDD on those paths impossible until the base is fixed.
 *
 * Base-red tracking: issue #9679; remaining fix PR in flight: #9676 (#9688
 * already landed). Once the base has no duplicate prefixes the copy and
 * this degrades to a plain pass-through copy — at that point this helper (and
 * its callsites) can be removed. Grep trigger: 9679 / 9676 / 9688.
 *
 * This helper copies the real migrations into a temp dir, renumbering any file
 * whose numeric prefix duplicates an earlier one to a fresh (max+1) version,
 * and points `OMNIROUTE_MIGRATIONS_DIR` (supported operator env var — see
 * `src/lib/db/migrationRunner.ts::resolveMigrationsDir`) at the copy. On the
 * FRESH per-process test DATA_DIR (tests/_setup/isolateDataDir.ts) the schema
 * CONTENT applied is byte-identical, but note the renumbering does shift the
 * displaced duplicate to the END of the migration ORDER (it runs after every
 * lower-numbered file instead of at its original slot). Harmless for the
 * current colliding pair — and strictly better than the crash — but not
 * literally "the same run" as production.
 *
 * MUST be called before the first `getDbInstance()` in the process (i.e. at
 * test-file top level, before any `preCall`). An explicitly configured
 * `OMNIROUTE_MIGRATIONS_DIR` always wins.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export function useDecollidedMigrationsDir(): void {
  if (process.env.OMNIROUTE_MIGRATIONS_DIR) return;

  const realDir = path.resolve("src/lib/db/migrations");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-migrations-"));

  const files = fs
    .readdirSync(realDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();

  let maxVersion = 0;
  for (const file of files) {
    const match = file.match(/^(\d+)_/);
    if (match) maxVersion = Math.max(maxVersion, Number.parseInt(match[1], 10));
  }

  const seenVersions = new Set<number>();
  for (const file of files) {
    const match = file.match(/^(\d+)_(.*)$/);
    let target = file;
    if (match) {
      const version = Number.parseInt(match[1], 10);
      if (seenVersions.has(version)) {
        // Collision: move the later duplicate to a fresh version slot.
        maxVersion += 1;
        target = `${maxVersion}_${match[2]}`;
      } else {
        seenVersions.add(version);
      }
    }
    fs.copyFileSync(path.join(realDir, file), path.join(tmp, target));
  }

  process.env.OMNIROUTE_MIGRATIONS_DIR = tmp;

  process.on("exit", () => {
    try {
      fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // Best-effort cleanup — the OS reaps its temp dir eventually.
    }
  });
}
