/**
 * extraDirs.ts — additional migration directories with a namespaced version space.
 *
 * The runner's own directory (`MIGRATIONS_DIR`) owns the bare numeric version
 * space: `NNN_name.sql` is recorded in `_omniroute_migrations` as `NNN`. That
 * single namespace is fine while one party appends to it, and breaks as soon as a
 * distribution ships its own migrations next to the upstream set — both sides draw
 * from the same numbers, and when they pick the same one the runner records a
 * single name for it and treats the other as already applied. The migration then
 * never runs, silently, on every already-provisioned database.
 *
 * This module lets an operator register extra directories, each under its own
 * namespace:
 *
 *   OMNIROUTE_EXTRA_MIGRATIONS_DIRS="ee=/opt/app/enterprise/db/migrations"
 *
 * Entries are separated by `path.delimiter` (`:` on POSIX, `;` on Windows) and a
 * file `NNN_name.sql` found there is recorded as `<namespace>-NNN`, so it can
 * never collide with an upstream slot. Unset — the default, and always the case
 * for a plain install — nothing changes.
 *
 * Misconfiguration throws instead of being skipped: a typo'd namespace or a moved
 * directory would otherwise reproduce the exact silent-missing-schema failure this
 * mechanism exists to prevent. A directory listed here is a declaration that its
 * schema is required.
 */

import fs from "fs";
import path from "path";

/** Env var holding `namespace=dir` entries separated by `path.delimiter`. */
export const EXTRA_MIGRATIONS_DIRS_ENV = "OMNIROUTE_EXTRA_MIGRATIONS_DIRS";

/**
 * Namespaces become a version prefix (`ee-134`), so they stay lowercase,
 * alphanumeric and hyphen-free — the hyphen is the separator, and a numeric first
 * character would make `1-001` ambiguous against a bare numeric version.
 */
const NAMESPACE_PATTERN = /^[a-z][a-z0-9]*$/;
const MAX_NAMESPACE_LENGTH = 16;

/** Same shape the runner's own directory listing produces. */
const MIGRATION_FILE_PATTERN = /^(\d+)_(.+)\.sql$/;

export interface ExtraMigrationDir {
  namespace: string;
  dir: string;
}

export interface NamespacedMigrationFile {
  /** `<namespace>-<number>`, e.g. `ee-134`. */
  version: string;
  name: string;
  path: string;
}

/**
 * Parse the env value into validated `{namespace, dir}` entries. Throws on any
 * malformed entry, invalid namespace, duplicate namespace, or missing directory.
 */
export function parseExtraMigrationDirs(raw?: string | null): ExtraMigrationDir[] {
  if (typeof raw !== "string" || raw.trim().length === 0) return [];

  const seen = new Set<string>();
  const out: ExtraMigrationDir[] = [];

  for (const entry of raw.split(path.delimiter)) {
    const spec = entry.trim();
    if (spec.length === 0) continue;

    const separator = spec.indexOf("=");
    if (separator <= 0) {
      throw new Error(
        `[Migration] Invalid ${EXTRA_MIGRATIONS_DIRS_ENV} entry "${spec}": ` +
          `expected "namespace=directory" (entries separated by "${path.delimiter}").`
      );
    }

    const namespace = spec.slice(0, separator).trim();
    const rawDir = spec.slice(separator + 1).trim();

    if (!NAMESPACE_PATTERN.test(namespace) || namespace.length > MAX_NAMESPACE_LENGTH) {
      throw new Error(
        `[Migration] Invalid namespace "${namespace}" in ${EXTRA_MIGRATIONS_DIRS_ENV}: ` +
          `must match ${NAMESPACE_PATTERN} and be at most ${MAX_NAMESPACE_LENGTH} characters ` +
          `(it becomes the recorded version prefix, e.g. "${namespace || "ee"}-134").`
      );
    }
    if (seen.has(namespace)) {
      throw new Error(
        `[Migration] Duplicate namespace "${namespace}" in ${EXTRA_MIGRATIONS_DIRS_ENV}: ` +
          `each namespace maps to exactly one directory.`
      );
    }
    if (rawDir.length === 0) {
      throw new Error(
        `[Migration] Empty directory for namespace "${namespace}" in ${EXTRA_MIGRATIONS_DIRS_ENV}.`
      );
    }

    const dir = path.resolve(rawDir);
    if (!fs.existsSync(dir)) {
      throw new Error(
        `[Migration] Directory for namespace "${namespace}" does not exist: ${dir}. ` +
          `A directory listed in ${EXTRA_MIGRATIONS_DIRS_ENV} is required schema — ` +
          `remove the entry if it is no longer shipped.`
      );
    }
    if (!fs.statSync(dir).isDirectory()) {
      throw new Error(
        `[Migration] Path for namespace "${namespace}" is not a directory: ${dir}.`
      );
    }

    seen.add(namespace);
    out.push({ namespace, dir });
  }

  return out;
}

/**
 * List the migrations of one namespaced directory, ordered by their numeric
 * prefix. Files that do not match `NNN_name.sql` are ignored, exactly as in the
 * runner's own directory.
 *
 * Two files sharing a numeric prefix inside the SAME namespace still collide —
 * the namespace only separates this directory from upstream, not a directory from
 * itself — so that throws, mirroring the runner's own collision guard.
 */
export function readNamespacedMigrationFiles(
  entry: ExtraMigrationDir
): NamespacedMigrationFile[] {
  const parsed = fs
    .readdirSync(entry.dir)
    .filter((f) => f.endsWith(".sql"))
    .map((filename) => {
      const match = filename.match(MIGRATION_FILE_PATTERN);
      if (!match) return null;
      return { number: match[1], name: match[2], filename };
    })
    .filter(Boolean) as Array<{ number: string; name: string; filename: string }>;

  const byNumber = new Map<string, string[]>();
  for (const f of parsed) {
    if (!byNumber.has(f.number)) byNumber.set(f.number, []);
    byNumber.get(f.number)!.push(f.name);
  }
  const collisions = [...byNumber.entries()].filter(([, names]) => names.length > 1);
  if (collisions.length > 0) {
    const summary = collisions
      .map(([number, names]) => `${entry.namespace}-${number} → [${names.join(", ")}]`)
      .join("; ");
    throw new Error(
      `[Migration] Migration version collision detected in ${entry.dir}: ${summary}. ` +
        `Each migration file must have a unique numeric prefix within its namespace.`
    );
  }

  return parsed
    .sort((a, b) => Number.parseInt(a.number, 10) - Number.parseInt(b.number, 10))
    .map((f) => ({
      version: `${entry.namespace}-${f.number}`,
      name: f.name,
      path: path.join(entry.dir, f.filename),
    }));
}

/**
 * All migrations from every configured extra directory, namespace by namespace in
 * the order they were declared. Empty (and free of any filesystem access) when the
 * env var is unset.
 *
 * Read at call time, not at module load, so a process that configures the env
 * before opening the database — and the tests — see the current value.
 */
export function getExtraMigrationFiles(): NamespacedMigrationFile[] {
  const entries = parseExtraMigrationDirs(process.env[EXTRA_MIGRATIONS_DIRS_ENV]);
  if (entries.length === 0) return [];
  return entries.flatMap((entry) => readNamespacedMigrationFiles(entry));
}
