/**
 * Database cleanup functions for removing old data based on retention policies.
 *
 * @module lib/db/cleanup
 */

import { getDbInstance } from "./core";
import { getUserDatabaseSettings } from "./databaseSettings";
import { rollupUsageHistoryBeforeDate } from "@/lib/usage/aggregateHistory";
import { purgeCallLogArtifactDirectory } from "@/lib/usage/callLogArtifacts";
import {
  collectCallLogArtifactsBefore,
  deleteAllFromTable,
  deleteCallLogArtifacts,
  deleteFromTableBefore,
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
 * Clean up old mcp_audit_log based on retention settings.
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
    const stmt = db.prepare("DELETE FROM mcp_tool_audit WHERE timestamp < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(
      `[Cleanup] Deleted ${result.deleted} mcp_audit_log older than ${retentionDays} days`
    );
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning mcp_audit_log:", err);
    result.errors++;
  }

  return result;
}

/**
 * Clean up old a2a_events based on retention settings.
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
    const stmt = db.prepare("DELETE FROM a2a_task_events WHERE timestamp < ?");
    const runResult = stmt.run(cutoffISO);
    result.deleted = runResult.changes;

    console.log(`[Cleanup] Deleted ${result.deleted} a2a_events older than ${retentionDays} days`);
  } catch (err: unknown) {
    console.error("[Cleanup] Error cleaning a2a_events:", err);
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
 * Uses unix-epoch `timestamp` column (INTEGER).
 */
export async function cleanupDomainCostHistory(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.domainCostHistory;
  const cutoffEpoch = Math.floor(Date.now() / 1000) - retentionDays * 86_400;

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
 * Uses unix-epoch `timestamp` column (INTEGER).
 */
export async function cleanupCompressionRunTelemetry(): Promise<CleanupResult> {
  const db = getDbInstance();
  const retention = getRetentionSettings();

  const retentionDays = retention.compressionRunTelemetry;
  const cutoffEpoch = Math.floor(Date.now() / 1000) - retentionDays * 86_400;

  const result: CleanupResult = { deleted: 0, errors: 0 };

  try {
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
    a2aEvents: await cleanupA2aEvents(),
    memoryEntries: await cleanupMemoryEntries(),
    domainCostHistory: await cleanupDomainCostHistory(),
    compressionCacheStats: await cleanupCompressionCacheStats(),
    xpAuditLog: await cleanupXpAuditLog(),
    compressionRunTelemetry: await cleanupCompressionRunTelemetry(),
    proxyLogs: await cleanupProxyLogs(),
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
  { table: "daily_usage_summary", column: "date", cutoff: "date", resultKey: "deletedDailySummary" },
  { table: "hourly_usage_summary", column: "date_hour", cutoff: "dateHour", resultKey: "deletedHourlySummary" },
  { table: "call_logs", column: "timestamp", cutoff: "iso", resultKey: "deletedCallLogs" },
  { table: "request_detail_logs", column: "timestamp", cutoff: "iso", resultKey: "deletedRequestDetailLogs" },
  { table: "proxy_logs", column: "timestamp", cutoff: "iso", resultKey: "deletedProxyLogs" },
  { table: "relay_logs", column: "created_at", cutoff: "epochSeconds", resultKey: "deletedRelayLogs" },
  { table: "compression_analytics", column: "timestamp", cutoff: "iso", resultKey: "deletedCompressionAnalytics" },
  { table: "compression_run_telemetry", column: "timestamp", cutoff: "epochMs", resultKey: "deletedCompressionRunTelemetry" },
  { table: "routing_decisions", column: "created_at", cutoff: "iso", resultKey: "deletedRoutingDecisions" },
  { table: "quota_consumption", column: "updated_at", cutoff: "epochMs", resultKey: "deletedQuotaConsumption" },
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

// ──────────────── Background Cleanup Scheduler ────────────────

const CLEANUP_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours
let _cleanupSchedulerTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Start the background cleanup scheduler. Runs cleanup on startup
 * and then every 6 hours. Runs VACUUM after deletes to reclaim disk space.
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
      const result = await runAutoCleanup();
      const proxyResult = await cleanupProxyLogs();
      const totalDeleted = result.totalDeleted + proxyResult.deleted;
      if (totalDeleted > 0) {
        console.log(`[Cleanup] Startup cleanup freed ${totalDeleted} rows. Running VACUUM...`);
        try {
          const db = getDbInstance();
          db.exec("VACUUM");
          console.log("[Cleanup] VACUUM completed after startup cleanup.");
        } catch (vacErr) {
          console.error("[Cleanup] VACUUM after cleanup failed:", vacErr);
        }
      }
    } catch (err) {
      console.error("[Cleanup] Startup cleanup failed:", err);
    }
  }, 30_000);

  // Schedule periodic cleanup every 6 hours.
  _cleanupSchedulerTimer = setInterval(async () => {
    try {
      const result = await runAutoCleanup();
      const proxyResult = await cleanupProxyLogs();
      const totalDeleted = result.totalDeleted + proxyResult.deleted;
      if (totalDeleted > 0) {
        console.log(`[Cleanup] Periodic cleanup freed ${totalDeleted} rows. Running VACUUM...`);
        try {
          const db = getDbInstance();
          db.exec("VACUUM");
          console.log("[Cleanup] VACUUM completed after periodic cleanup.");
        } catch (vacErr) {
          console.error("[Cleanup] VACUUM after cleanup failed:", vacErr);
        }
      }
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
