/**
 * Low-level table/artifact purge primitives backing {@link resetUsageHistory}
 * (see `../cleanup.ts`). Split out of `cleanup.ts` to keep that file under the
 * repo's file-size cap — these helpers have no state of their own beyond the
 * shared DB singleton, so they are safe to call from any reset routine that
 * needs generic "wipe" / "wipe before cutoff" semantics.
 *
 * @module lib/db/cleanup/usagePurge
 */
import { getDbInstance } from "../core";
import { cleanupEmptyCallLogDirs, deleteCallArtifact } from "@/lib/usage/callLogArtifacts";

export type DeleteByPeriodTarget = {
  table: string;
  column: string;
  cutoff: "iso" | "date" | "dateHour" | "epochMs" | "epochSeconds";
};

export function tableExists(table: string): boolean {
  const row = getDbInstance()
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(table) as { name?: string } | undefined;
  return Boolean(row?.name);
}

export function deleteAllFromTable(table: string): number {
  if (!tableExists(table)) return 0;
  return getDbInstance().prepare(`DELETE FROM ${table}`).run().changes;
}

export function deleteFromTableBefore(target: DeleteByPeriodTarget, cutoffIso: string): number {
  if (!tableExists(target.table)) return 0;

  const cutoff = (() => {
    switch (target.cutoff) {
      case "date":
        return cutoffIso.slice(0, 10);
      case "dateHour":
        return `${cutoffIso.slice(0, 10)} ${cutoffIso.slice(11, 13)}:00:00`;
      case "epochMs":
        return new Date(cutoffIso).getTime();
      case "epochSeconds":
        return Math.floor(new Date(cutoffIso).getTime() / 1000);
      case "iso":
      default:
        return cutoffIso;
    }
  })();

  return getDbInstance()
    .prepare(`DELETE FROM ${target.table} WHERE ${target.column} < ?`)
    .run(cutoff).changes;
}

export function collectCallLogArtifactsBefore(cutoffIso: string): string[] {
  if (!tableExists("call_logs")) return [];

  const rows = getDbInstance()
    .prepare(
      "SELECT artifact_relpath FROM call_logs WHERE timestamp < ? AND artifact_relpath IS NOT NULL"
    )
    .all(cutoffIso) as Array<{ artifact_relpath?: string | null }>;

  return rows
    .map((row) => row.artifact_relpath)
    .filter((relPath): relPath is string => typeof relPath === "string" && relPath.length > 0);
}

export function deleteCallLogArtifacts(relativePaths: string[]): {
  deletedArtifacts: number;
  errors: number;
} {
  const result = { deletedArtifacts: 0, errors: 0 };

  for (const relPath of new Set(relativePaths)) {
    if (deleteCallArtifact(relPath)) {
      result.deletedArtifacts++;
    }
  }

  cleanupEmptyCallLogDirs();
  return result;
}
