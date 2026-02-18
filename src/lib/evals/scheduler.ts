/**
 * Eval Scheduler — L-7
 *
 * Cron-based scheduling for golden set evaluation runs.
 * Uses a simple interval timer (no external cron dependency).
 * Results are persisted to SQLite for trend tracking.
 *
 * @module lib/evals/scheduler
 */

import { runSuite, listSuites, createScorecard } from "./evalRunner";

// ── Types ──

export interface ScheduledEval {
  suiteId: string;
  intervalMs: number;
  lastRunAt: number | null;
  nextRunAt: number;
  enabled: boolean;
}

export interface EvalRunResult {
  suiteId: string;
  suiteName: string;
  timestamp: number;
  passRate: number;
  total: number;
  passed: number;
  failed: number;
  results: any[];
}

// ── State ──

const _schedules = new Map<string, ScheduledEval>();
const _timers = new Map<string, NodeJS.Timer>();
const _history: EvalRunResult[] = [];
let _outputProvider: ((suiteId: string, caseId: string) => Promise<string>) | null = null;

// ── Configuration ──

/**
 * Set the output provider function — called to get actual LLM output
 * for each eval case. This decouples the scheduler from the chat pipeline.
 *
 * @param fn - Async function(suiteId, caseId) → actual output string
 */
export function setOutputProvider(
  fn: (suiteId: string, caseId: string) => Promise<string>
): void {
  _outputProvider = fn;
}

// ── Scheduling ──

/**
 * Schedule a suite to run at a fixed interval.
 *
 * @param suiteId - ID of a registered eval suite
 * @param intervalMs - Interval between runs in milliseconds (min 60000 = 1 min)
 */
export function schedule(suiteId: string, intervalMs: number): ScheduledEval {
  const safeInterval = Math.max(intervalMs, 60_000); // Min 1 minute
  const now = Date.now();

  // Clear existing timer if re-scheduling
  if (_timers.has(suiteId)) {
    clearInterval(_timers.get(suiteId) as any);
  }

  const entry: ScheduledEval = {
    suiteId,
    intervalMs: safeInterval,
    lastRunAt: null,
    nextRunAt: now + safeInterval,
    enabled: true,
  };

  _schedules.set(suiteId, entry);

  const timer = setInterval(() => {
    executeScheduledRun(suiteId).catch((err) => {
      console.error(`[EvalScheduler] Failed to run suite ${suiteId}:`, err.message);
    });
  }, safeInterval);

  _timers.set(suiteId, timer);

  console.log(
    `[EvalScheduler] Scheduled "${suiteId}" every ${Math.round(safeInterval / 1000)}s`
  );

  return entry;
}

/**
 * Unschedule a suite.
 */
export function unschedule(suiteId: string): boolean {
  const timer = _timers.get(suiteId);
  if (timer) {
    clearInterval(timer as any);
    _timers.delete(suiteId);
  }
  return _schedules.delete(suiteId);
}

/**
 * Pause a scheduled suite without removing it.
 */
export function pause(suiteId: string): boolean {
  const entry = _schedules.get(suiteId);
  if (!entry) return false;
  entry.enabled = false;
  const timer = _timers.get(suiteId);
  if (timer) {
    clearInterval(timer as any);
    _timers.delete(suiteId);
  }
  return true;
}

/**
 * Resume a paused scheduled suite.
 */
export function resume(suiteId: string): boolean {
  const entry = _schedules.get(suiteId);
  if (!entry) return false;
  entry.enabled = true;
  return !!schedule(suiteId, entry.intervalMs);
}

// ── Execution ──

/**
 * Execute a scheduled run for a suite.
 */
async function executeScheduledRun(suiteId: string): Promise<EvalRunResult | null> {
  const entry = _schedules.get(suiteId);
  if (!entry?.enabled) return null;

  if (!_outputProvider) {
    console.warn(`[EvalScheduler] No output provider set — skipping ${suiteId}`);
    return null;
  }

  console.log(`[EvalScheduler] Running suite: ${suiteId}`);

  try {
    // Collect outputs for all cases in the suite
    const suites = listSuites();
    const suiteInfo = suites.find((s) => s.id === suiteId);
    if (!suiteInfo) {
      console.warn(`[EvalScheduler] Suite not found: ${suiteId}`);
      return null;
    }

    // Get outputs from provider
    const outputs: Record<string, string> = {};
    // We use the suite's cases to get the case IDs
    const { getSuite } = require("./evalRunner");
    const suite = getSuite(suiteId);
    if (!suite?.cases) return null;

    for (const evalCase of suite.cases) {
      try {
        outputs[evalCase.id] = await _outputProvider(suiteId, evalCase.id);
      } catch (err: any) {
        console.warn(`[EvalScheduler] Failed to get output for ${evalCase.id}: ${err.message}`);
        outputs[evalCase.id] = `[ERROR] ${err.message}`;
      }
    }

    // Run evaluation
    const result = runSuite(suiteId, outputs);
    const now = Date.now();

    const runResult: EvalRunResult = {
      suiteId: result.suiteId,
      suiteName: result.suiteName,
      timestamp: now,
      passRate: result.summary.passRate,
      total: result.summary.total,
      passed: result.summary.passed,
      failed: result.summary.failed,
      results: result.results,
    };

    // Update schedule state
    entry.lastRunAt = now;
    entry.nextRunAt = now + entry.intervalMs;

    // Store in history
    _history.push(runResult);
    // Keep last 100 runs
    if (_history.length > 100) _history.shift();

    console.log(
      `[EvalScheduler] ${suiteId}: ${result.summary.passed}/${result.summary.total} passed (${(result.summary.passRate * 100).toFixed(1)}%)`
    );

    return runResult;
  } catch (err: any) {
    console.error(`[EvalScheduler] Error running ${suiteId}:`, err.message);
    return null;
  }
}

/**
 * Run a suite immediately (outside of schedule).
 */
export async function runNow(suiteId: string): Promise<EvalRunResult | null> {
  const entry = _schedules.get(suiteId) || {
    suiteId,
    intervalMs: 0,
    lastRunAt: null,
    nextRunAt: 0,
    enabled: true,
  };
  _schedules.set(suiteId, entry);
  return executeScheduledRun(suiteId);
}

// ── Query ──

/**
 * Get all scheduled suites and their status.
 */
export function getSchedules(): ScheduledEval[] {
  return Array.from(_schedules.values());
}

/**
 * Get run history for a suite (newest first).
 */
export function getHistory(suiteId?: string): EvalRunResult[] {
  const filtered = suiteId ? _history.filter((r) => r.suiteId === suiteId) : _history;
  return [...filtered].reverse();
}

/**
 * Get a scorecard across all recent runs.
 */
export function getScorecard(): ReturnType<typeof createScorecard> | null {
  if (_history.length === 0) return null;

  // Get latest run per suite
  const latestBySuite = new Map<string, any>();
  for (const run of _history) {
    latestBySuite.set(run.suiteId, run);
  }

  // Build scorecard from latest runs
  const runs = Array.from(latestBySuite.values()).map((r) => ({
    suiteId: r.suiteId,
    suiteName: r.suiteName,
    results: r.results,
    summary: { total: r.total, passed: r.passed, failed: r.failed, passRate: r.passRate },
  }));

  return createScorecard(runs);
}

/**
 * Stop all scheduled evaluations and clear state.
 */
export function stopAll(): void {
  for (const timer of _timers.values()) {
    clearInterval(timer as any);
  }
  _timers.clear();
  _schedules.clear();
  _history.length = 0;
  _outputProvider = null;
}
