/**
 * Database cleanup functions for removing old data based on retention policies.
 *
 * @module lib/db/cleanup
 */

import { rollupUsageHistoryBeforeDate } from "@/lib/usage/aggregateHistory";
import { purgeCallLogArtifactDirectory } from "@/lib/usage/callLogArtifacts";

import type { SqliteAdapter } from "./adapters/types";
import { getDbInstance } from "./core";
import { getUserDatabaseSettings } from "./databaseSettings";
import { requestFullVacuum } from "./vacuumScheduler";
import {
  collectCallLogArtifactsBefore,
  deleteAllFromTable,
  deleteCallLogArtifacts,
  deleteFromTableBefore,
  tableExists,
  type DeleteByPeriodTarget,
} from "./cleanup/usagePurge";

interface CleanupResult {
  deleted: number;
  deletedArtifacts?: number;
  errors: number;
}

function getRetentionSettings() {
  return getUserDatabaseSettings().retention;
}

/**
 * Clean up old quota_snapshots based on retention settings.
 */
export async function cleanupQuotaSnapshots(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.quotaSnapshots;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM quota_snapshots WHERE created_at < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} quota_snapshots older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning quota_snapshots:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old call_logs based on retention settings.
 */
export async function cleanupCallLogs(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.callLogs;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM call_logs WHERE timestamp < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(`[Cleanup] Deleted ${result.deleted} call_logs older than ${retentionDays} days`);
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning call_logs:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old usage_history based on retention settings.
 */
export async function cleanupUsageHistory(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.usageHistory;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();
  const cutoffDateStr = cutoffISO.split("T")[0];

  const result: CleanupResult = { deleted: 0, errors: 0 };

  // Roll up rows that are about to be deleted into daily_usage_summary so that the
  // analytics route can still surface historical data via the UNION query. The rollup
  // uses the exact same day boundary as the DELETE below, so every deleted row
  // is guaranteed to have been aggregated first.
  //
  // rollupUsageHistoryBeforeDate catches its own errors and reports them via the
  // returned result, so we inspect that rather than relying on a thrown exception.
  // If the rollup failed, abort the DELETE to avoid permanently losing raw usage data
  // that was never aggregated.
  const rollupResult = await rollupUsageHistoryBeforeDate(cutoffDateStr);
  if (rollupResult.errors > 0) {
    console.error(
      "[Cleanup] Aborting usage_history deletion because the pre-delete rollup failed."
    );
    result.errors += rollupResult.errors;
    return result;
  }

  try {
    const stmt = db.prepare("DELETE FROM usage_history WHERE timestamp < ?");
    const runResult = stmt.run(cutoffDateStr);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} usage_history older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning usage_history:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old compression_analytics based on retention settings.
 */
export async function cleanupCompressionAnalytics(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.compressionAnalytics;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM compression_analytics WHERE timestamp < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} compression_analytics older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning compression_analytics:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old mcp_tool_audit based on retention settings.
 */
export async function cleanupMcpAudit(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.mcpAudit;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM mcp_tool_audit WHERE created_at < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} mcp_tool_audit older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning mcp_tool_audit:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old config_audit_log based on retention settings.
 */
export async function cleanupConfigAudit(
  retentionDays = getRetentionSettings().configAudit
): Promise<CleanupResult> {
  const db = getDbInstance();
  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare(
      "DELETE FROM config_audit_log WHERE datetime(timestamp) < datetime('now', '-' || ? || ' days')"
    );
    const runResult = stmt.run(String(retentionDays));
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} config_audit_log older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning config_audit_log:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old a2a_task_events based on retention settings.
 */
export async function cleanupA2aEvents(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.a2aEvents;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM a2a_task_events WHERE created_at < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} a2a_task_events older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning a2a_task_events:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old memory_entries based on retention settings.
 */
export async function cleanupMemoryEntries(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.memoryEntries;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM memories WHERE created_at < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} memory_entries older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning memory_entries:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old domain_cost_history based on retention settings. (#6848)
 * The `timestamp` column stores epoch milliseconds (saveCostEntry default
 * is Date.now()), so the cutoff must be in milliseconds to match. (#9625)
 */
export async function cleanupDomainCostHistory(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.domainCostHistory;
  const cutoffEpoch = Date.now() - retentionDays * 86_400_000;

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM domain_cost_history WHERE timestamp < ?");
    const runResult = stmt.run(cutoffEpoch);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} domain_cost_history older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning domain_cost_history:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old compression_cache_stats based on retention settings. (#6848)
 * Uses `created_at` column (DATETIME string).
 */
export async function cleanupCompressionCacheStats(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.compressionCacheStats;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM compression_cache_stats WHERE created_at < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} compression_cache_stats older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning compression_cache_stats:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old xp_audit_log based on retention settings.
 */
export async function cleanupXpAuditLog(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.xpAuditLog;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM xp_audit_log WHERE created_at < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} xp_audit_log older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning xp_audit_log:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old compression_run_telemetry based on retention settings. (#6848)
 * The `timestamp` column stores epoch milliseconds (recordCompressionRun stamps
 * Date.now()), so the cutoff must be in milliseconds to match. Same unit bug as
 * domain_cost_history (#9625), which this function was missed by.
 */
export async function cleanupCompressionRunTelemetry(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.compressionRunTelemetry;
  const cutoffEpoch = Date.now() - retentionDays * 86_400_000;

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    if (!tableExists("compression_run_telemetry")) return result;

    const stmt = db.prepare("DELETE FROM compression_run_telemetry WHERE timestamp < ?");
    const runResult = stmt.run(cutoffEpoch);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} compression_run_telemetry older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning compression_run_telemetry:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up expired CCR blocks (#9061).
 *
 * Unlike the tables above, these rows carry their own expiry: the engine writes
 * `expires_at` from the block's TTL, so this needs no retention-days setting of its own.
 * It is the same sweep the engine does opportunistically, run on the operator's schedule
 * so the table cannot sit on rows nobody will read again.
 */
export async function cleanupCcrBlocks(): Promise<CleanupResult> {
  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const { pruneExpiredCcrBlocks } = await import("./ccrBlocks");
    result.deleted = pruneExpiredCcrBlocks(Date.now());
    console.log(`[Cleanup] Deleted ${result.deleted} expired ccr_blocks`);
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning ccr_blocks:", err);
    result.errors++;
  }

  return result;
}

/**
 * Run all cleanup functions if auto-cleanup is enabled.
 */
export async function runAutoCleanup(): Promise<{
  totalDeleted: number;
  totalErrors: number;
  results: Record<string, CleanupResult>;
}> {
  const retention = getRetentionSettings();
  const autoCleanupEnabled = retention.autoCleanupEnabled;

  if (!autoCleanupEnabled) {
    console.log("[Cleanup] Auto-cleanup is disabled");
    return { totalDeleted: 0, totalErrors: 0, results: {} };
  }

  console.log("[Cleanup] Starting auto-cleanup...");

  const results: Record<string, CleanupResult> = {
    quotaSnapshots: await cleanupQuotaSnapshots(),
    callLogs: await cleanupCallLogs(),
    usageHistory: await cleanupUsageHistory(),
    compressionAnalytics: await cleanupCompressionAnalytics(),
    mcpAudit: await cleanupMcpAudit(),
    configAudit: await cleanupConfigAudit(),
    a2aEvents: await cleanupA2aEvents(),
    memoryEntries: await cleanupMemoryEntries(),
    domainCostHistory: await cleanupDomainCostHistory(),
    compressionCacheStats: await cleanupCompressionCacheStats(),
    xpAuditLog: await cleanupXpAuditLog(),
    compressionRunTelemetry: await cleanupCompressionRunTelemetry(),
    proxyLogs: await cleanupProxyLogs(),
    ccrBlocks: await cleanupCcrBlocks(),
  };

  const totalDeleted = Object.values(results).reduce((sum, r) => sum + r.deleted, 0);
  const totalErrors = Object.values(results).reduce((sum, r) => sum + r.errors, 0);

  console.log(`[Cleanup] Auto-cleanup complete: ${totalDeleted} deleted, ${totalErrors} errors`);

  return { totalDeleted, totalErrors, results };
}

/**
 * Purge ALL quota_snapshots immediately (no retention check).
 */
export async function purgeQuotaSnapshots(): Promise<CleanupResult> {
  const db = getDbInstance();
  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM quota_snapshots");
    const runResult = stmt.run();
    result.deleted = runResult.changes;

    console.log(`[Cleanup] Purged ${result.deleted} quota_snapshots`);
  } catch (err: unknown) {
    console.error("[Cleanup] Error purging quota_snapshots:", err);
    result.errors++;
  }

  return result;
}

/**
 * Purge ALL call_logs immediately (no retention check).
 */
export async function purgeCallLogs(): Promise<CleanupResult> {
  const db = getDbInstance();
  const result: CleanupResult = { deleted: 0, deletedArtifacts: 0, errors: 0 };

  try {
    const runResult = db.prepare("DELETE FROM call_logs").run();
    result.deleted = runResult.changes;

    console.log(`[Cleanup] Purged ${result.deleted} call_logs`);
  } catch (err: unknown) {
    console.error("[Cleanup] Error purging call_logs:", err);
    result.errors++;
  }

  const artifactResult = purgeCallLogArtifactDirectory();
  result.deletedArtifacts = artifactResult.deletedArtifacts;
  result.errors += artifactResult.errors;

  if (artifactResult.errors === 0) {
    console.log(`[Cleanup] Purged ${result.deletedArtifacts} call log artifact(s)`);
  }

  return result;
}

/**
 * Purge ALL request_detail_logs immediately (no retention check).
 */
export async function purgeDetailedLogs(): Promise<CleanupResult> {
  const db = getDbInstance();
  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM request_detail_logs");
    const runResult = stmt.run();
    result.deleted = runResult.changes;

    console.log(`[Cleanup] Purged ${result.deleted} request_detail_logs`);
  } catch (err: unknown) {
    console.error("[Cleanup] Error purging request_detail_logs:", err);
    result.errors++;
  }

  return result;
}

/**
 * Whitelist of periods accepted by {@link resetUsageHistory}. `"all"` wipes
 * every row; any other value deletes rows strictly older than `now - period`.
 */
export const RESET_USAGE_HISTORY_PERIODS = [
  "5m",
  "1h",
  "3h",
  "6h",
  "12h",
  "1d",
  "7d",
  "30d",
  "all",
] as const;

export type ResetUsageHistoryPeriod = (typeof RESET_USAGE_HISTORY_PERIODS)[number];

type TimedResetUsageHistoryPeriod = Exclude<ResetUsageHistoryPeriod, "all">;

const RESET_USAGE_HISTORY_PERIOD_MS: Record<TimedResetUsageHistoryPeriod, number> = {
  "5m": 5 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "3h": 3 * 60 * 60 * 1000,
  "6h": 6 * 60 * 60 * 1000,
  "12h": 12 * 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

export interface ResetUsageHistoryResult extends CleanupResult {
  deletedUsageHistory: number;
  deletedDailySummary: number;
  deletedHourlySummary: number;
  deletedCallLogs: number;
  deletedCallLogArtifacts: number;
  deletedRequestDetailLogs: number;
  deletedProxyLogs: number;
  deletedRelayLogs: number;
  deletedCompressionAnalytics: number;
  deletedCompressionRunTelemetry: number;
  deletedRoutingDecisions: number;
  deletedQuotaConsumption: number;
  deletedTokenLedger: number;
}

function isResetUsageHistoryPeriod(period: string): period is ResetUsageHistoryPeriod {
  return (RESET_USAGE_HISTORY_PERIODS as readonly string[]).includes(period);
}

/**
 * On-demand, period-scoped reset of usage analytics data (`usage_history`,
 * `daily_usage_summary`, `hourly_usage_summary`).
 *
 * Unlike {@link cleanupUsageHistory} (retention-based background cleanup,
 * which rolls up rows into `daily_usage_summary` before deleting them), this
 * is a destructive user-triggered reset — it intentionally does NOT roll up
 * first, since the whole point is to wipe the data the user selected.
 *
 * @param period - One of {@link RESET_USAGE_HISTORY_PERIODS}. `"all"` wipes
 *   every row in all three tables; any other value deletes rows strictly
 *   older than `now - period`. Throws on an invalid period.
 */
const RESET_TARGETS: Array<DeleteByPeriodTarget & { resultKey: keyof ResetUsageHistoryResult }> = [
  { table: "usage_history", column: "timestamp", cutoff: "iso", resultKey: "deletedUsageHistory" },
  {
    table: "daily_usage_summary",
    column: "date",
    cutoff: "date",
    resultKey: "deletedDailySummary",
  },
  {
    table: "hourly_usage_summary",
    column: "date_hour",
    cutoff: "dateHour",
    resultKey: "deletedHourlySummary",
  },
  { table: "call_logs", column: "timestamp", cutoff: "iso", resultKey: "deletedCallLogs" },
  {
    table: "request_detail_logs",
    column: "timestamp",
    cutoff: "iso",
    resultKey: "deletedRequestDetailLogs",
  },
  { table: "proxy_logs", column: "timestamp", cutoff: "iso", resultKey: "deletedProxyLogs" },
  {
    table: "relay_logs",
    column: "created_at",
    cutoff: "epochSeconds",
    resultKey: "deletedRelayLogs",
  },
  {
    table: "compression_analytics",
    column: "timestamp",
    cutoff: "iso",
    resultKey: "deletedCompressionAnalytics",
  },
  {
    table: "compression_run_telemetry",
    column: "timestamp",
    cutoff: "epochMs",
    resultKey: "deletedCompressionRunTelemetry",
  },
  {
    table: "routing_decisions",
    column: "created_at",
    cutoff: "iso",
    resultKey: "deletedRoutingDecisions",
  },
  {
    table: "quota_consumption",
    column: "updated_at",
    cutoff: "epochMs",
    resultKey: "deletedQuotaConsumption",
  },
  { table: "token_ledger", column: "created_at", cutoff: "iso", resultKey: "deletedTokenLedger" },
];

export async function resetUsageHistory(period: string): Promise<ResetUsageHistoryResult> {
  if (!isResetUsageHistoryPeriod(period)) {
    throw new Error(`Invalid reset period: ${period}`);
  }

  const db = getDbInstance();
  const result: ResetUsageHistoryResult = {
    deleted: 0,
    deletedUsageHistory: 0,
    deletedDailySummary: 0,
    deletedHourlySummary: 0,
    deletedCallLogs: 0,
    deletedCallLogArtifacts: 0,
    deletedRequestDetailLogs: 0,
    deletedProxyLogs: 0,
    deletedRelayLogs: 0,
    deletedCompressionAnalytics: 0,
    deletedCompressionRunTelemetry: 0,
    deletedRoutingDecisions: 0,
    deletedQuotaConsumption: 0,
    deletedTokenLedger: 0,
    deletedArtifacts: 0,
    errors: 0,
  };

  try {
    let artifactsToDelete: string[] = [];

    const runReset = db.transaction(() => {
      if (period === "all") {
        for (const target of RESET_TARGETS) {
          (result[target.resultKey] as number) = deleteAllFromTable(target.table);
        }
        return;
      }

      const cutoffIso = new Date(Date.now() - RESET_USAGE_HISTORY_PERIOD_MS[period]).toISOString();
      artifactsToDelete = collectCallLogArtifactsBefore(cutoffIso);
      for (const target of RESET_TARGETS) {
        (result[target.resultKey] as number) = deleteFromTableBefore(target, cutoffIso);
      }
    });

    runReset();

    let artifactResult: { deletedArtifacts: number; errors: number };
    if (period === "all") {
      artifactResult = purgeCallLogArtifactDirectory();
    } else {
      artifactResult = deleteCallLogArtifacts(artifactsToDelete);
    }
    result.deletedCallLogArtifacts = artifactResult.deletedArtifacts;
    result.deletedArtifacts = artifactResult.deletedArtifacts;
    result.errors += artifactResult.errors;

    result.deleted = RESET_TARGETS.reduce((sum, t) => sum + (result[t.resultKey] as number), 0);

    console.log(
      `[Cleanup] Reset usage/log data (period=${period}): ${result.deleted} row(s), ` +
        `${result.deletedCallLogArtifacts} call log artifact(s)`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error resetting usage history:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old proxy_logs based on retention settings.
 * Uses the same retention period as call_logs (30 days default).
 */
export async function cleanupProxyLogs(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.callLogs;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  const cutoffISO = cutoffDate.toISOString();

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
    const stmt = db.prepare("DELETE FROM proxy_logs WHERE timestamp < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(`[Cleanup] Deleted ${result.deleted} proxy_logs older than ${retentionDays} days`);
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning proxy_logs:", err);
    result.errors++;
  }

  return result;
}

// ──────────────── Post-cleanup space reclamation ────────────────
//
// Never run a full `VACUUM` from this module (#12821). `node:sqlite` is
// synchronous, so a full rebuild of a multi-hundred-MB file holds the event
// loop for minutes — no route answers, `/healthz` included, and in-flight
// streams stall. Full rebuilds belong to `vacuumScheduler`, which runs them in
// the window the operator configured on the Storage page
// (`scheduledVacuum` / `vacuumHour`).
//
// What we do instead depends on the database's `auto_vacuum` mode:
//
// - INCREMENTAL: freed pages sit on SQLite's freelist and
//   `PRAGMA incremental_vacuum(N)` hands back at most N of them per call. We
//   drain the list in ~1 MiB batches and pause between batches for about as
//   long as the last batch took, so the event loop stays at least half free
//   for requests. Whatever is left after the per-pass caps is picked up by the
//   next pass.
// - FULL: SQLite already returns freed pages on commit; nothing to do.
// - NONE: `incremental_vacuum` is a no-op, so only a full rebuild can shrink
//   the file. We record the request with `vacuumScheduler` and let it run in
//   its configured window (or never, if the operator said so).
//
// In WAL mode the truncation only reaches the main file at a checkpoint, so a
// pass folds the WAL back periodically and ends with `wal_checkpoint(TRUNCATE)`;
// otherwise the `.sqlite` would keep its size and the `-wal` would sit at its
// high-water mark until the next 6-hourly checkpoint.

/** Target bytes moved per `incremental_vacuum` call; converted to pages via `page_size`. */
const INCREMENTAL_VACUUM_BATCH_BYTES = 1024 * 1024;
/** Hard cap per cleanup pass (≈2 GiB at the target batch size); the rest waits for the next pass. */
const INCREMENTAL_VACUUM_MAX_BATCHES = 2048;
/** Wall-clock budget per cleanup pass, so a slow disk cannot turn a pass into a long tail. */
const INCREMENTAL_VACUUM_TIME_BUDGET_MS = 30_000;
/** Longest pause between batches; a batch pauses for as long as it took, capped here. */
const INCREMENTAL_VACUUM_MAX_PAUSE_MS = 250;
/** PASSIVE checkpoint cadence within a pass so the WAL is folded back as we go. */
const INCREMENTAL_VACUUM_CHECKPOINT_EVERY_BATCHES = 64;

// `PRAGMA auto_vacuum` values (https://sqlite.org/pragma.html#pragma_auto_vacuum): 0 = NONE.
const AUTO_VACUUM_FULL = 1;
const AUTO_VACUUM_INCREMENTAL = 2;

export type ReclaimStopReason =
  /** The freelist reached zero. */
  | "drained"
  /** The per-pass batch cap was hit; the remainder waits for the next pass. */
  | "max-batches"
  /** The per-pass wall-clock budget was hit; the remainder waits for the next pass. */
  | "time-budget"
  /** Another connection held the write lock (SQLITE_BUSY/LOCKED); retry next pass. */
  | "busy"
  /** The DB handle was closed under us (backup restore / import); retry next pass. */
  | "closed"
  /** A batch threw something other than BUSY; see `error`. Earlier batches are committed. */
  | "error";

export interface ReclaimFreedPagesResult {
  /**
   * - `incremental`: freed pages were reclaimed via bounded `incremental_vacuum` batches.
   * - `auto`: `auto_vacuum = FULL` — SQLite reclaims on commit, nothing to do here.
   * - `deferred`: `auto_vacuum = NONE` — a full VACUUM was requested from `vacuumScheduler`.
   * - `skipped`: the freelist was already empty.
   */
  mode: "incremental" | "auto" | "deferred" | "skipped";
  autoVacuum: number;
  pageSize: number;
  freelistBefore: number;
  freelistAfter: number;
  batches: number;
  durationMs: number;
  /** Only set for `incremental`. */
  stopReason?: ReclaimStopReason;
  /** Only set when `stopReason === "error"`. */
  error?: string;
}

export interface ReclaimFreedPagesOptions {
  /** @internal test seam — overrides the `page_size`-derived batch. */
  batchPages?: number;
  /** @internal test seam */
  maxBatches?: number;
  /** @internal test seam */
  timeBudgetMs?: number;
  /** @internal test seam — pause between batches; receives the last batch's duration in ms. */
  pause?: (lastBatchMs: number) => Promise<void>;
  /** @internal test seam */
  now?: () => number;
}

function readPragmaNumber(db: SqliteAdapter, pragma: string): number {
  const value = db.pragma(pragma, { simple: true });
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function pauseBetweenBatches(lastBatchMs: number): Promise<void> {
  const delay = Math.min(INCREMENTAL_VACUUM_MAX_PAUSE_MS, Math.max(0, lastBatchMs));
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function isBusyError(err: unknown): boolean {
  const details = err as { code?: unknown; errcode?: unknown; message?: unknown } | null;
  const code = details?.code ?? details?.errcode;
  // better-sqlite3 / bun:sqlite expose the symbolic code; node:sqlite exposes the numeric one.
  if (typeof code === "string" && /^SQLITE_(BUSY|LOCKED)/.test(code)) return true;
  if (code === 5 || code === 6) return true; // SQLITE_BUSY / SQLITE_LOCKED
  const message = err instanceof Error ? err.message : String(details?.message ?? err);
  return /database is locked|SQLITE_BUSY|SQLITE_LOCKED/i.test(message);
}

function checkpointQuietly(db: SqliteAdapter, mode: "PASSIVE" | "TRUNCATE"): void {
  if (!db.open) return;
  try {
    db.checkpoint(mode);
  } catch {
    // Best effort: the 6-hourly TRUNCATE checkpoint in core.ts will catch up.
  }
}

/**
 * Reclaim pages freed by cleanup without blocking the event loop.
 *
 * Safe to call after every cleanup pass regardless of how many rows were
 * deleted: when the freelist is empty this is a handful of cheap PRAGMA reads.
 * Never throws for per-batch failures — the result carries `stopReason` (and
 * `error`) so callers can log partial progress. Exported for tests and for
 * callers that free space outside the scheduler.
 */
export async function reclaimFreedPages(
  options: ReclaimFreedPagesOptions = {}
): Promise<ReclaimFreedPagesResult> {
  const maxBatches = Math.max(1, Math.floor(options.maxBatches ?? INCREMENTAL_VACUUM_MAX_BATCHES));
  const timeBudgetMs = options.timeBudgetMs ?? INCREMENTAL_VACUUM_TIME_BUDGET_MS;
  const pause = options.pause ?? pauseBetweenBatches;
  const now = options.now ?? Date.now;

  const db = getDbInstance();
  const startedAt = now();
  const autoVacuum = readPragmaNumber(db, "auto_vacuum");
  const pageSize = readPragmaNumber(db, "page_size") || 4096;
  const freelistBefore = readPragmaNumber(db, "freelist_count");
  const batchPages = Math.max(
    1,
    Math.floor(options.batchPages ?? INCREMENTAL_VACUUM_BATCH_BYTES / pageSize)
  );

  const finish = (
    mode: ReclaimFreedPagesResult["mode"],
    freelistAfter: number,
    batches: number,
    stopReason?: ReclaimStopReason,
    error?: string
  ): ReclaimFreedPagesResult => ({
    mode,
    autoVacuum,
    pageSize,
    freelistBefore,
    freelistAfter,
    batches,
    durationMs: now() - startedAt,
    ...(stopReason ? { stopReason } : {}),
    ...(error ? { error } : {}),
  });

  if (freelistBefore <= 0) return finish("skipped", freelistBefore, 0);

  if (autoVacuum === AUTO_VACUUM_FULL) return finish("auto", freelistBefore, 0);

  if (autoVacuum !== AUTO_VACUUM_INCREMENTAL) {
    // NONE (or an unknown value): incremental reclamation is impossible.
    // Hand the decision to the scheduler; never rebuild here.
    requestFullVacuum(
      `cleanup left ${freelistBefore} free page(s) that auto_vacuum=${autoVacuum} cannot reclaim incrementally`
    );
    return finish("deferred", freelistBefore, 0);
  }

  let freelist = freelistBefore;
  let batches = 0;
  let lastBatchMs = 0;
  let stopReason: ReclaimStopReason = "drained";
  let error: string | undefined;

  while (freelist > 0) {
    if (batches >= maxBatches) {
      stopReason = "max-batches";
      break;
    }
    if (batches > 0) await pause(lastBatchMs);
    // The handle can be closed while we were paused (backup restore, DB import).
    if (!db.open) {
      stopReason = "closed";
      break;
    }

    const batchStartedAt = now();
    try {
      // `exec`, not `pragma()`: incremental_vacuum is a stepping pragma that frees one
      // page per step, and bun:sqlite's `all()` stops after the first zero-column row.
      db.exec(`PRAGMA incremental_vacuum(${batchPages})`);
    } catch (err) {
      if (isBusyError(err)) {
        stopReason = "busy";
      } else {
        stopReason = "error";
        error = err instanceof Error ? err.message : String(err);
      }
      break;
    }
    lastBatchMs = now() - batchStartedAt;
    batches += 1;
    freelist = readPragmaNumber(db, "freelist_count");

    if (batches % INCREMENTAL_VACUUM_CHECKPOINT_EVERY_BATCHES === 0) {
      checkpointQuietly(db, "PASSIVE");
    }
    if (freelist > 0 && now() - startedAt >= timeBudgetMs) {
      stopReason = "time-budget";
      break;
    }
  }

  // In WAL mode the file only shrinks when the truncating commit is checkpointed.
  if (batches > 0) checkpointQuietly(db, "TRUNCATE");

  return finish("incremental", freelist, batches, stopReason, error);
}

function describeReclaim(result: ReclaimFreedPagesResult): string {
  switch (result.mode) {
    case "skipped":
      return "freelist already empty";
    case "auto":
      return `auto_vacuum=FULL reclaims on commit (${result.freelistBefore} page(s) pending)`;
    case "deferred":
      return `auto_vacuum=NONE — ${result.freelistBefore} free page(s) left for the scheduled VACUUM`;
    case "incremental": {
      const reclaimed = result.freelistBefore - result.freelistAfter;
      const mib = ((reclaimed * result.pageSize) / (1024 * 1024)).toFixed(1);
      const tail =
        result.freelistAfter > 0
          ? `, ${result.freelistAfter} left for the next pass (${result.stopReason})`
          : "";
      return (
        `reclaimed ${reclaimed} page(s) (~${mib} MiB) in ${result.batches} batch(es) ` +
        `over ${result.durationMs}ms${tail}`
      );
    }
  }
}

// ──────────────── Background Cleanup Scheduler ────────────────

const CLEANUP_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours
let _cleanupSchedulerTimer: ReturnType<typeof setInterval> | null = null;

/**
 * One scheduled pass: retention cleanup (`runAutoCleanup` already covers
 * proxy_logs), then incremental space reclamation. Exported so tests can drive
 * the exact code path the timers run.
 */
export async function runScheduledCleanupPass(phase: "startup" | "periodic"): Promise<void> {
  const label = phase === "startup" ? "Startup" : "Periodic";
  const result = await runAutoCleanup();
  if (result.totalDeleted > 0) {
    console.log(`[Cleanup] ${label} cleanup freed ${result.totalDeleted} rows.`);
  }

  // Always run: it also drains pages left over from a previous capped pass or
  // from deletes made outside this scheduler. Costs a few PRAGMA reads when idle.
  try {
    const reclaim = await reclaimFreedPages();
    if (reclaim.stopReason === "error") {
      console.error(
        `[Cleanup] Space reclamation after ${phase} cleanup stopped early ` +
          `(${describeReclaim(reclaim)}): ${reclaim.error}`
      );
    } else if (reclaim.mode !== "skipped") {
      console.log(
        `[Cleanup] Space reclamation after ${phase} cleanup: ${describeReclaim(reclaim)}.`
      );
    }
  } catch (reclaimErr) {
    console.error(`[Cleanup] Space reclamation after ${phase} cleanup failed:`, reclaimErr);
  }
}

/**
 * Start the background cleanup scheduler. Runs cleanup on startup and then
 * every 6 hours, then reclaims freed pages incrementally (never a blocking
 * full VACUUM — see the reclamation section above and #12821).
 *
 * Without this, tables grow unboundedly (compression_analytics 600K+ rows,
 * usage_history 250K+ rows) causing 1.4GB+ SQLite files and 3-8GB RSS
 * from better-sqlite3 memory mapping.
 */
export function startCleanupScheduler(): void {
  if (_cleanupSchedulerTimer) return;

  // Run cleanup 30s after startup (let the server initialize first).
  setTimeout(async () => {
    try {
      await runScheduledCleanupPass("startup");
    } catch (err) {
      console.error("[Cleanup] Startup cleanup failed:", err);
    }
  }, 30_000);

  // Schedule periodic cleanup every 6 hours.
  _cleanupSchedulerTimer = setInterval(async () => {
    try {
      await runScheduledCleanupPass("periodic");
    } catch (err) {
      console.error("[Cleanup] Periodic cleanup failed:", err);
    }
  }, CLEANUP_INTERVAL_MS);

  // Don't keep the process alive solely for cleanup.
  if (_cleanupSchedulerTimer && typeof _cleanupSchedulerTimer.unref === "function") {
    _cleanupSchedulerTimer.unref();
  }

  console.log("[Cleanup] Background cleanup scheduler started (every 6 hours).");
}

/**
 * Stop the background cleanup scheduler (for tests).
 */
export function stopCleanupScheduler(): void {
  if (_cleanupSchedulerTimer) {
    clearInterval(_cleanupSchedulerTimer);
    _cleanupSchedulerTimer = null;
  }
}
