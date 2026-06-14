import type { EvalReport } from "./runner.ts";

/**
 * Tokens-per-task gate (N4). The harness measures the average compressed token
 * cost per task group; this gate fails when that cost *rises* versus a frozen
 * baseline beyond a tolerance — i.e. a change made the pipeline compress worse.
 * Falling cost (better compression) always passes; the baseline is updated
 * deliberately, like the project's other ratchets.
 */

export interface BudgetBaseline {
  /** task -> baseline mean compressed tokens. */
  tasks: Record<string, number>;
}

export interface BudgetRegression {
  task: string;
  baseline: number;
  current: number;
  /** Percentage increase vs baseline (positive = worse). */
  deltaPercent: number;
}

export interface BudgetGateResult {
  passed: boolean;
  regressions: BudgetRegression[];
  tolerancePercent: number;
}

/** Mean compressed tokens per task group in a report. */
export function tokensPerTask(report: EvalReport): Record<string, number> {
  const byTask = new Map<string, { tokens: number; count: number }>();
  for (const r of report.results) {
    const entry = byTask.get(r.task) ?? { tokens: 0, count: 0 };
    entry.tokens += r.compressedTokens;
    entry.count += 1;
    byTask.set(r.task, entry);
  }
  const out: Record<string, number> = {};
  for (const [task, { tokens, count }] of byTask) {
    out[task] = Math.round(tokens / count);
  }
  return out;
}

export function checkTokensPerTaskGate(
  report: EvalReport,
  baseline: BudgetBaseline,
  tolerancePercent = 2
): BudgetGateResult {
  const current = tokensPerTask(report);
  const regressions: BudgetRegression[] = [];
  for (const [task, base] of Object.entries(baseline.tasks)) {
    const cur = current[task];
    if (cur === undefined || base <= 0) continue;
    const deltaPercent = Math.round(((cur - base) / base) * 1000) / 10;
    if (deltaPercent > tolerancePercent) {
      regressions.push({ task, baseline: base, current: cur, deltaPercent });
    }
  }
  return { passed: regressions.length === 0, regressions, tolerancePercent };
}
