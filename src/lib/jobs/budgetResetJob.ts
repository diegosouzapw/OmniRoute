import { syncAllBudgetSchedules } from "@/domain/costRules";

const DEFAULT_INTERVAL_MS = 10 * 60 * 1000;

let timer: NodeJS.Timeout | null = null;

function getIntervalMs() {
  const raw = process.env.OMNIROUTE_BUDGET_RESET_JOB_INTERVAL_MS;
  const parsed = raw ? Number(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 10_000 ? parsed : DEFAULT_INTERVAL_MS;
}

export function startBudgetResetJob() {
  if (timer) {
    return timer;
  }

  const run = () => {
    try {
      const result = syncAllBudgetSchedules(Date.now());
      if (result.resetCount > 0) {
        console.log(`[BudgetReset] processed=${result.processed} reset=${result.resetCount}`);
      }
    } catch (error) {
      console.error("[BudgetReset] Job failed:", error);
    }
  };

  run();
  timer = setInterval(run, getIntervalMs());
  timer.unref?.();
  return timer;
}

export function stopBudgetResetJob() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
