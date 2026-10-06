import { runAllLogExports } from "@/lib/logExport/runner";
import type { JobRegistry } from "../jobRegistry/registry";

export const LOG_EXPORT_JOB_ID = "log_export";

/** Top of every hour. Overridable for operators who want a different cadence. */
const DEFAULT_CRON = "0 * * * *";

function getCron(): string {
  const raw = process.env.OMNIROUTE_LOG_EXPORT_CRON?.trim();
  return raw && raw.length > 0 ? raw : DEFAULT_CRON;
}

/**
 * Hourly handler — drains every enabled log-export destination.
 *
 * Returns success even when individual destinations fail: each failure is already
 * recorded on its own destination row (last_status / last_error) and surfaced in the
 * dashboard, and marking the whole job failed would hide which destination broke.
 * The error field carries a summary so the job run history stays diagnosable.
 */
export async function run(): Promise<{
  success: boolean;
  recordsAffected: number;
  error?: string;
}> {
  const summary = await runAllLogExports();
  if (summary.exported > 0 || summary.failures > 0) {
    console.log(
      `[LogExport] destinations=${summary.destinations.length} exported=${summary.exported} failures=${summary.failures}`
    );
  }
  const failed = summary.destinations.filter((destination) => !destination.success);
  return {
    success: failed.length === 0,
    recordsAffected: summary.exported,
    error:
      failed.length > 0
        ? failed.map((d) => `${d.destinationName}: ${d.error ?? "unknown error"}`).join("; ")
        : undefined,
  };
}

/** Wire the log_export job into a JobRegistry (idempotent — call at boot). */
export function registerLogExportJob(registry: JobRegistry): void {
  registry.register({
    id: LOG_EXPORT_JOB_ID,
    type: "cron",
    cron: getCron(),
    intervalMs: null,
    enabled: true,
    envFlag: null,
    config: { timezone: "UTC" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    handler: run,
    cronGetter: getCron,
  });
}
