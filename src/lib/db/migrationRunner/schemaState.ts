import type { SqliteAdapter } from "../adapters/types";
import {
  INITIAL_SCHEMA_SENTINELS,
  LEGACY_VERSION_SLOT_MIGRATIONS,
  PHYSICAL_SCHEMA_SENTINELS,
  RENAMED_MIGRATION_COMPATIBILITY,
} from "./constants";
import { migrationConsole as console } from "./logger";

type MigrationFile = { version: string; name: string; path: string };

export function hasTable(db: SqliteAdapter, tableName: string): boolean {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type IN ('table', 'view') AND name = ?")
    .get(tableName) as { name?: string } | undefined;
  return Boolean(row?.name);
}

export function hasPhysicalTable(db: SqliteAdapter, tableName: string): boolean {
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(tableName) as { name?: string } | undefined;
  return Boolean(row?.name);
}

export function hasColumn(db: SqliteAdapter, tableName: string, columnName: string): boolean {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name?: string }>;
  return columns.some((column) => column.name === columnName);
}

export function inferPhysicalSchemaBaseline(db: SqliteAdapter): {
  version: string;
  description: string;
} | null {
  for (const sentinel of PHYSICAL_SCHEMA_SENTINELS) {
    if (hasTable(db, sentinel.tableName)) {
      return {
        version: sentinel.version,
        description: sentinel.description,
      };
    }
  }

  const hasInitialSchema = INITIAL_SCHEMA_SENTINELS.every((tableName) => hasTable(db, tableName));
  if (hasInitialSchema) {
    return {
      version: "001",
      description: "initial schema tables",
    };
  }

  return null;
}

export function getPlausiblePendingCount(files: MigrationFile[], baselineVersion: string): number {
  const baseline = Number.parseInt(baselineVersion, 10);
  return files.filter((file) => Number.parseInt(file.version, 10) > baseline).length;
}

/**
 * Detect migration name mismatches — when a migration version number
 * has been reused/renumbered with a different name. This is a strong signal
 * that the migration tracking is corrupted or migrations were renumbered.
 */
export function detectNameMismatches(
  appliedRecords: Array<{ version: string; name: string }>,
  files: MigrationFile[]
): Array<{ version: string; appliedName: string; diskName: string }> {
  const appliedByName = new Map(appliedRecords.map((record) => [record.version, record.name]));
  const mismatches: Array<{ version: string; appliedName: string; diskName: string }> = [];

  for (const file of files) {
    const appliedName = appliedByName.get(file.version);
    if (appliedName && appliedName !== file.name) {
      mismatches.push({
        version: file.version,
        appliedName,
        diskName: file.name,
      });
    }
  }

  return mismatches;
}

export function reconcileRenumberedMigrations(db: SqliteAdapter, files: MigrationFile[]): boolean {
  let repaired = false;

  for (const compatibility of RENAMED_MIGRATION_COMPATIBILITY) {
    const hasTargetFile = files.some(
      (file) => file.version === compatibility.toVersion && file.name === compatibility.toName
    );
    const hasSourceFile = files.some(
      (file) => file.version === compatibility.fromVersion && file.name !== compatibility.fromName
    );

    if (!hasTargetFile || !hasSourceFile) {
      continue;
    }

    const legacyRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(compatibility.fromVersion, compatibility.fromName) as
      { version: string; name: string } | undefined;
    if (!legacyRow) {
      continue;
    }

    const targetRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
      .get(compatibility.toVersion) as { version: string; name: string } | undefined;

    const isSameSlotReplacement = compatibility.fromVersion === compatibility.toVersion;
    if (targetRow && !isSameSlotReplacement && targetRow.name !== compatibility.toName) {
      throw new Error(
        `[Migration] Cannot reconcile ${compatibility.fromVersion}_${compatibility.fromName}: ` +
          `target version ${compatibility.toVersion} is occupied by unknown migration ` +
          `"${targetRow.name}" (expected "${compatibility.toName}").`
      );
    }

    const applyRepair = db.transaction(() => {
      if (targetRow) {
        db.prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?").run(
          compatibility.fromVersion,
          compatibility.fromName
        );
      } else {
        db.prepare(
          "UPDATE _omniroute_migrations SET version = ?, name = ? WHERE version = ? AND name = ?"
        ).run(
          compatibility.toVersion,
          compatibility.toName,
          compatibility.fromVersion,
          compatibility.fromName
        );
      }
    });

    applyRepair();
    repaired = true;
    console.warn(
      `[Migration] Reconciled renamed migration ${compatibility.fromVersion}_${compatibility.fromName} ` +
        `to ${compatibility.toVersion}_${compatibility.toName} to preserve pending migrations.`
    );

    // After the compat rewrite, verify the old version slot is now free.
    // A residual row (from a failed prior run, manual intervention, or edge-case
    // UPDATE conflict) at the old version would shadow a NEW migration file
    // placed at that version number — e.g. 028_create_files_and_batches.sql
    // would be skipped because getAppliedVersions() still sees version "028".
    const residualRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
      .get(compatibility.fromVersion) as { version: string; name: string } | undefined;
    if (residualRow) {
      console.warn(
        `[Migration] ⚠️  Residual row at version ${compatibility.fromVersion} ` +
          `(name: "${residualRow.name}") still present after compat rewrite — ` +
          `removing to unblock new migration at this version slot.`
      );
      db.prepare("DELETE FROM _omniroute_migrations WHERE version = ?").run(
        compatibility.fromVersion
      );
    }
  }

  return repaired;
}

export function rehomeLegacyVersionSlotMigrations(
  db: SqliteAdapter,
  files: MigrationFile[]
): boolean {
  let repaired = false;
  const diskNamesByVersion = new Map(files.map((file) => [file.version, file.name]));

  for (const legacy of LEGACY_VERSION_SLOT_MIGRATIONS) {
    const diskName = diskNamesByVersion.get(legacy.version);
    if (!diskName || diskName === legacy.name) {
      continue;
    }

    const legacyRow = db
      .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(legacy.version, legacy.name) as { version: string; name: string } | undefined;
    if (!legacyRow) {
      continue;
    }

    const legacyVersion = `legacy-${legacy.version}-${legacy.name}`;
    const applyRepair = db.transaction(() => {
      const existingLegacyRow = db
        .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
        .get(legacyVersion) as { version: string } | undefined;

      if (existingLegacyRow) {
        db.prepare("DELETE FROM _omniroute_migrations WHERE version = ? AND name = ?").run(
          legacy.version,
          legacy.name
        );
        return;
      }

      db.prepare("UPDATE _omniroute_migrations SET version = ? WHERE version = ? AND name = ?").run(
        legacyVersion,
        legacy.version,
        legacy.name
      );
    });

    applyRepair();
    repaired = true;
    console.warn(
      `[Migration] Rehomed legacy migration ${legacy.version}_${legacy.name} ` +
        `to ${legacyVersion} so current ${legacy.version}_${diskName} can apply.`
    );
  }

  return repaired;
}

export function hasLedgerRepairCandidates(db: SqliteAdapter, files: MigrationFile[]): boolean {
  const diskNamesByVersion = new Map(files.map((file) => [file.version, file.name]));
  for (const legacy of LEGACY_VERSION_SLOT_MIGRATIONS) {
    const diskName = diskNamesByVersion.get(legacy.version);
    if (!diskName || diskName === legacy.name) continue;
    const row = db
      .prepare("SELECT 1 FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(legacy.version, legacy.name);
    if (row) return true;
  }

  for (const compatibility of RENAMED_MIGRATION_COMPATIBILITY) {
    const hasTargetFile = files.some(
      (file) => file.version === compatibility.toVersion && file.name === compatibility.toName
    );
    const hasSourceFile = files.some(
      (file) => file.version === compatibility.fromVersion && file.name !== compatibility.fromName
    );
    if (!hasTargetFile || !hasSourceFile) continue;
    const row = db
      .prepare("SELECT 1 FROM _omniroute_migrations WHERE version = ? AND name = ?")
      .get(compatibility.fromVersion, compatibility.fromName);
    if (row) return true;
  }

  return false;
}
