import { syncAllBudgetSchedules } from "@/domain/costRules";
import type { JobRegistry } from "../jobRegistry/registry";

const DEFAULT_INTERVAL_MS = 10 * 60 * 1000;

function getIntervalMs() {
  const raw = process.env.OMNIROUTE_BUDGET_RESET_JOB_INTERVAL_MS;
  const parsed = raw ? Number(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 10_000 ? parsed : DEFAULT_INTERVAL_MS;
}

/**
 * Budget-reset handler - resets all budget schedules once per interval.
 *
 * Migrated to the JobRegistry: the old start/stop timer logic is
 * gone; the registry owns scheduling + run recording. This module exports just the
 * `run` handler and a `registerBudgetResetJob` wiring helper. Errors are no longer
 * caught here - safeRun records them as a failure run.
 */
export async function run(): Promise<{ success: boolean; recordsAffected: number }> {
  const result = syncAllBudgetSchedules(Date.now());
  if (result.resetCount > 0) {
    console.log(`[BudgetReset] processed=${result.processed} reset=${result.resetCount}`);
  }
  return { success: true, recordsAffected: result.resetCount };
}

/** Wire the budget_reset job into a JobRegistry (idempotent - call at boot). */
export function registerBudgetResetJob(registry: JobRegistry): void {
  registry.register({
    id: "budget_reset",
    type: "interval",
    cron: null,
    intervalMs: getIntervalMs(),
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    handler: run,
  });
}
