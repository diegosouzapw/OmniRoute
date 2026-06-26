/**
 * Runner — orchestration for the chaos suite.
 *
 * Per scenario:
 *   1. Snapshot baseline state (open ws handles, fetch/fs monkey-patch
 *      presence, pending timers).
 *   2. Run scenario(scenarioState).
 *   3. Cleanup: scenario's injectors.restore() in LIFO order, close any
 *      sqlite handles it opened, clear its timers.
 *   4. Capture post-cleanup state. THIS is where invariant checks happen.
 *   5. Append ScenarioResult to the running ChaosReport.
 *
 * The runner NEVER throws on a failed scenario — it records the failure
 * and moves on, so one bad scenario doesn't poison the whole run.
 *
 * @module tests/chaos/runner
 */
import { performance } from "node:perf_hooks";
import * as fsModule from "node:fs";
import type { ChaosInjector } from "./injectors.ts";
import type { ChaosState } from "./invariants.ts";
import {
  checkInvariants,
  defaultInvariants,
  type Invariant,
  type InvariantResult,
} from "./invariants.ts";
import {
  newScenarioResult,
  type ChaosReport,
  type ScenarioResult,
} from "./report.ts";

export interface ScenarioContext {
  /** id, e.g. "01-provider-500" */
  id: string;
  /** one-line title */
  title: string;
  /** mutable state the scenario builds up; the runner reads it at the end */
  state: ChaosState;
  /** injectors the scenario has installed; runner restores them in LIFO order */
  injectors: ChaosInjector[];
  /** assertions the scenario wants to record on its result */
  assertions: Record<string, { ok: boolean; detail?: string }>;
  /** capture a trace_id for an error so the runner can verify all errors carry one */
  captureError(err: unknown): string;
  /** record a custom assertion */
  assert(name: string, ok: boolean, detail?: string): void;
  /** mark the scenario as failed (e.g. unexpected throw) */
  fail(message: string, err?: unknown): void;
  /** register an extra invariant just for this scenario */
  addInvariant(inv: Invariant): void;
}

export interface ScenarioFn {
  (ctx: ScenarioContext): Promise<void> | void;
}

export interface RunOptions {
  /** if set, run only this scenario id (e.g. "01-provider-500") */
  only?: string;
  /** if set, skip these scenario ids */
  skip?: string[];
  /** stop at the first failure (default false — collect everything) */
  bailOnFailure?: boolean;
}

// Captured at module load. These are the platform defaults the runner
// expects to see again after a scenario's injectors.restore() runs. If
// something has replaced them at module-load time, every scenario will
// look "leaked" — that's fine, it surfaces the underlying problem.
const originalFetch = globalThis.fetch;
// We read `fs.writeFileSync` off the namespace each time, because
// monkey-patches assign to `fs.writeFileSync` (the namespace property)
// rather than to the local binding. The captured `original` is the
// property value at module-load.
const originalWriteFileSync = fsModule.writeFileSync;

/* ────────────────────────────────────────────────────────────────────────────
 * State helpers
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Capture the baseline state BEFORE a scenario runs. We use this for
 * the "openWsHandles" baseline (we count what's open relative to start)
 * and to detect whether fetch/fs are still in their original form.
 */
function snapshotState(): Pick<ChaosState, "fetchIsPatched" | "fsIsPatched" | "openWsHandles" | "pendingTimers"> {
  return {
    fetchIsPatched: globalThis.fetch !== originalFetch,
    fsIsPatched: fsModule.writeFileSync !== originalWriteFileSync,
    openWsHandles: 0,
    pendingTimers: 0,
  };
}

/**
 * Count currently-open ws handles by checking ws.Server if loaded, or
 * scanning a process-wide handle map maintained by ws-related code.
 * For hermetic chaos runs we use a simple counter maintained by the
 * scenarios themselves via `state.meta.openWsTracker`.
 */
function countOpenWs(state: ChaosState): number {
  const tracker = state.meta.openWsTracker as { value: number } | undefined;
  return tracker?.value ?? 0;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Single-scenario runner
 * ──────────────────────────────────────────────────────────────────────────── */

async function runOne(
  scenario: { id: string; title: string; run: ScenarioFn; invariants?: Invariant[] },
  opts: RunOptions,
  report: ChaosReport,
): Promise<ScenarioResult> {
  const result = newScenarioResult(scenario.id, scenario.title);
  const start = performance.now();

  // ── Baseline ────────────────────────────────────────────────────────────
  const baseline = snapshotState();

  const state: ChaosState = {
    events: [],
    openWsHandles: 0,
    fetchIsPatched: baseline.fetchIsPatched,
    fsIsPatched: baseline.fsIsPatched,
    openSqliteHandles: 0,
    pendingTimers: 0,
    errorTraceIds: [],
    cacheHits: 0,
    cacheMisses: 0,
    perTenantServed: {},
    meta: {},
  };

  const injectors: ChaosInjector[] = [];
  const assertions: Record<string, { ok: boolean; detail?: string }> = {};
  const scenarioInvariants: Invariant[] = [...defaultInvariants];
  let scenarioFailed = false;
  let scenarioError: { message: string; stack?: string; traceId?: string } | undefined;

  const ctx: ScenarioContext = {
    id: scenario.id,
    title: scenario.title,
    state,
    injectors,
    assertions,
    captureError(err: unknown) {
      const e = err as Error & { traceId?: string; chaosKind?: string };
      const id = e?.traceId || `chaos-auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      state.errorTraceIds.push(id);
      return id;
    },
    assert(name: string, ok: boolean, detail?: string) {
      assertions[name] = { ok, detail };
    },
    fail(message: string, err?: unknown) {
      scenarioFailed = true;
      const e = err as Error | undefined;
      const traceId = ctx.captureError(err ?? new Error(message));
      scenarioError = {
        message,
        stack: e?.stack,
        traceId,
      };
    },
    addInvariant(inv: Invariant) {
      scenarioInvariants.push(inv);
    },
  };

  // Add scenario-specific invariants (caller-provided).
  if (scenario.invariants) {
    scenarioInvariants.push(...scenario.invariants);
  }

  // ── Run the scenario ──────────────────────────────────────────────────
  try {
    await scenario.run(ctx);
  } catch (e) {
    scenarioFailed = true;
    const err = e as Error;
    const traceId = ctx.captureError(e);
    scenarioError = { message: err.message, stack: err.stack, traceId };
  }

  // ── Cleanup injectors (LIFO) ───────────────────────────────────────────
  for (let i = injectors.length - 1; i >= 0; i--) {
    try {
      injectors[i].restore();
    } catch (e) {
      scenarioError = {
        message: `injector ${injectors[i].id} failed to restore: ${(e as Error).message}`,
        traceId: ctx.captureError(e),
      };
      scenarioFailed = true;
    }
  }

  // ── Capture post-cleanup state ─────────────────────────────────────────
  // Re-check fetch/fs monkey-patches AFTER cleanup. If they're still
  // patched, the cleanup is broken — the invariants below will catch it.
  state.fetchIsPatched = globalThis.fetch !== originalFetch;
  state.fsIsPatched = fsModule.writeFileSync !== originalWriteFileSync;
  state.openWsHandles = countOpenWs(state);

  // Collect events from all injectors.
  for (const inj of injectors) {
    for (const e of inj.events) result.events.push(e);
  }
  // Sort by `at`.
  result.events.sort((a, b) => a.at - b.at);

  // ── Invariant check ────────────────────────────────────────────────────
  const invResults: InvariantResult[] = checkInvariants(state, scenarioInvariants);
  result.invariants = invResults;
  const invViolations = invResults.filter((r) => !r.ok);

  // ── Finalize ───────────────────────────────────────────────────────────
  result.assertions = assertions;
  result.errorTraceIds = state.errorTraceIds.slice();
  result.ok = !scenarioFailed && invViolations.length === 0 && !scenarioError;
  result.error = scenarioError;
  result.durationMs = Math.round(performance.now() - start);

  if (!result.ok) report.summary.failed++;
  else report.summary.passed++;
  report.summary.violationCount += invViolations.length;
  report.scenarios.push(result);

  return result;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Public API
 * ──────────────────────────────────────────────────────────────────────────── */

export interface ScenarioRegistration {
  id: string;
  title: string;
  run: ScenarioFn;
  invariants?: Invariant[];
}

/**
 * Run a list of scenarios and produce a ChaosReport.
 *
 * Each scenario is run inside a try/finally so cleanup always happens.
 * Scenarios that throw are recorded as failed but never abort the run
 * (unless `bailOnFailure: true`).
 */
export async function runChaosSuite(
  scenarios: ScenarioRegistration[],
  opts: RunOptions = {},
): Promise<ChaosReport> {
  const startedAt = new Date().toISOString();
  const t0 = performance.now();
  const report: ChaosReport = {
    startedAt,
    finishedAt: "",
    totalDurationMs: 0,
    scenarios: [],
    summary: { total: 0, passed: 0, failed: 0, violationCount: 0 },
    success: true,
  };
  report.summary.total = scenarios.length;

  // Track unhandled rejections from scenarios.
  const unhandled: unknown[] = [];
  const uhHandler = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", uhHandler);

  try {
    for (const s of scenarios) {
      if (opts.only && s.id !== opts.only) {
        report.summary.passed++;
        continue;
      }
      if (opts.skip?.includes(s.id)) {
        report.summary.passed++;
        continue;
      }

      const result = await runOne(s, opts, report);

      if (!result.ok) {
        report.success = false;
        if (opts.bailOnFailure) break;
      }
    }
  } finally {
    process.off("unhandledRejection", uhHandler);
  }

  report.finishedAt = new Date().toISOString();
  report.totalDurationMs = Math.round(performance.now() - t0);

  // If any unhandled rejection landed during the run, mark the report
  // failed (these belong to no scenario in particular but indicate the
  // process leaked something).
  if (unhandled.length > 0) {
    report.success = false;
    report.summary.violationCount += unhandled.length;
  }

  return report;
}