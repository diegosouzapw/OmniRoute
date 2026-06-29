/**
 * latencyBudget.ts — Per-request latency budget enforcement (#3932).
 *
 * Problem:
 *   At ~500-1000 req/min with 100-200 concurrent agent sessions, OmniRoute
 *   was paying for non-essential observation work (Bifrost shadow calls,
 *   agreement scoring, call-log payload capture, response body logging) on
 *   every request. Under load these non-essential work blocks added 5-45s
 *   to API responses. The fix is to give each request a wall-clock budget
 *   and SKIP non-essential work as the budget elapses.
 *
 * Design:
 *   - A `LatencyBudget` is created at request entry and tracks elapsed time
 *     against a per-tier budget (fast / standard / long) chosen by the
 *     client via the `X-Latency-Tier` header, or defaulted to `standard`.
 *   - Work that wants to short-circuit on budget exhaustion calls
 *     `budget.tryRun({ name, work, onSkip })` and bails when remaining <= 0.
 *   - The budget can be attached to a Response via `formatBudgetHeader`
 *     which returns a value for the `X-Latency-Budget` response header,
 *     exposing (used_ms / total_ms) and per-work skip counts for the
 *     operator dashboard.
 *   - Tiers are overridable via env vars (`OMNIROUTE_LATENCY_BUDGET_FAST_MS`,
 *     etc.) so an operator can tighten or loosen the policy without a
 *     rebuild.
 *
 * Why three tiers (not one global budget):
 *   - A 30s tier is fine for "give me a streaming chat response" but
 *     catastrophic for "summarize 20 PDFs" (background agent) where the
 *     client opted in to a long response time. Tiers let the client
 *     declare its expectation; the operator can monitor tier usage
 *     via the response header.
 *
 * Reference: docs/adr/0032-latency-budget.md (forthcoming).
 */

export type LatencyTier = "fast" | "standard" | "long";

const DEFAULT_TIER_BUDGETS_MS: Record<LatencyTier, number> = {
  // Streaming chat / quick completions. 8s is generous; Claude Code's
  // own per-request deadline is around this. Anything longer is operator-
  // visible as latency and almost always means upstream slowness, not
  // our own work.
  fast: 8_000,
  // Default tier for non-streaming chat. 30s covers all current providers
  // for first-token + body. Anything beyond this is up to 5x slower than
  // our worst-case target.
  standard: 30_000,
  // Background-agent tier (long summarization, batch jobs). 120s lets the
  // upstream take its time without us shedding legitimate work.
  long: 120_000,
};

/**
 * Resolve a tier from a request's headers, with an env-var override on the
 * default tier. Unknown / malformed values fall back to "standard".
 */
export function resolveLatencyTier(
  headers: Record<string, string | string[] | undefined>
): LatencyTier {
  const raw = headers["x-latency-tier"] ?? headers["X-Latency-Tier"];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string") return "standard";
  const normalized = value.toLowerCase().trim();
  if (normalized === "fast" || normalized === "standard" || normalized === "long") {
    return normalized;
  }
  return "standard";
}

/**
 * Resolve a tier's total budget in ms, reading from env overrides.
 *   OMNIROUTE_LATENCY_BUDGET_FAST_MS
 *   OMNIROUTE_LATENCY_BUDGET_STANDARD_MS
 *   OMNIROUTE_LATENCY_BUDGET_LONG_MS
 * Override must be a positive finite number, otherwise the default applies.
 */
export function resolveTierBudgetMs(
  tier: LatencyTier,
  env: NodeJS.ProcessEnv = process.env
): number {
  const key = `OMNIROUTE_LATENCY_BUDGET_${tier.toUpperCase()}_MS`;
  const raw = env[key];
  if (typeof raw === "string" && raw.length > 0) {
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return DEFAULT_TIER_BUDGETS_MS[tier];
}

export interface LatencyBudget {
  /** The tier this budget is enforcing. */
  readonly tier: LatencyTier;
  /** Total budget in ms (snapshotted at construction). */
  readonly totalMs: number;
  /** Wall-clock ms elapsed since the budget was created. */
  readonly elapsedMs: number;
  /** Remaining budget in ms (never goes below 0). */
  readonly remainingMs: number;
  /** True if the budget is exhausted (remaining <= 0). */
  readonly exhausted: boolean;
  /**
   * Run `work` if the budget is not exhausted; otherwise invoke `onSkip`
   * with the work's name and skip. The work function receives the budget
   * snapshot so it can make finer-grained decisions (e.g. only do the
   * "expensive half" if remaining > half the budget).
   */
  tryRun<T>(opts: {
    name: string;
    work: (budget: LatencyBudget) => Promise<T> | T;
    onSkip?: (name: string, budget: LatencyBudget) => void;
  }): Promise<T | undefined>;
  /**
   * Read a fresh snapshot of the budget. Cheap; safe to call from headers.
   */
  snapshot(): LatencyBudget;
  /**
   * Diagnostic accessor for skip counts (insertion order). Returned array
   * is a defensive copy — mutating it does not affect the budget.
   */
  getSkipCounts(): Array<[string, number]>;
}

interface LatencyBudgetState {
  startedAt: number;
  skips: Map<string, number>;
}

/**
 * Create a new latency budget. Time source is injectable for tests.
 *   - tier: the latency tier the request is operating under
 *   - now:  the time source (default: Date.now)
 *   - env:  env var source for budget overrides (default: process.env)
 */
export function createLatencyBudget(opts: {
  tier: LatencyTier;
  now?: () => number;
  env?: NodeJS.ProcessEnv;
}): LatencyBudget {
  const now = opts.now ?? Date.now;
  const env = opts.env ?? process.env;
  const totalMs = resolveTierBudgetMs(opts.tier, env);
  const state: LatencyBudgetState = {
    startedAt: now(),
    skips: new Map<string, number>(),
  };

  const recordSkip = (name: string): void => {
    state.skips.set(name, (state.skips.get(name) ?? 0) + 1);
  };

  const compute = (): { elapsed: number; remaining: number } => {
    const elapsed = Math.max(0, now() - state.startedAt);
    const remaining = Math.max(0, totalMs - elapsed);
    return { elapsed, remaining };
  };

  // The budget object exposes a stable interface to callers; tryRun needs
  // to call snapshot() recursively so we build it as a single closure that
  // captures `self` after construction.
  const budget: LatencyBudget = {} as LatencyBudget;

  Object.defineProperty(budget, "tier", { value: opts.tier, enumerable: true });
  Object.defineProperty(budget, "totalMs", { value: totalMs, enumerable: true });
  Object.defineProperty(budget, "elapsedMs", {
    get: () => compute().elapsed,
    enumerable: true,
  });
  Object.defineProperty(budget, "remainingMs", {
    get: () => compute().remaining,
    enumerable: true,
  });
  Object.defineProperty(budget, "exhausted", {
    get: () => compute().remaining <= 0,
    enumerable: true,
  });
  budget.tryRun = async <T>(args: {
    name: string;
    work: (budget: LatencyBudget) => Promise<T> | T;
    onSkip?: (name: string, budget: LatencyBudget) => void;
  }): Promise<T | undefined> => {
    if (budget.exhausted) {
      recordSkip(args.name);
      try {
        args.onSkip?.(args.name, budget.snapshot());
      } catch {
        // observer errors must never bubble out of the budget helper
      }
      return undefined;
    }
    return await args.work(budget.snapshot());
  };
  budget.snapshot = (): LatencyBudget => {
    const { elapsed, remaining } = compute();
    return {
      tier: opts.tier,
      totalMs,
      elapsedMs: elapsed,
      remainingMs: remaining,
      exhausted: remaining <= 0,
      tryRun: budget.tryRun,
      snapshot: budget.snapshot,
      getSkipCounts: budget.getSkipCounts,
    };
  };
  budget.getSkipCounts = (): Array<[string, number]> =>
    Array.from(state.skips.entries());

  return budget;
}

/**
 * Build the value for the `X-Latency-Budget` response header. Format:
 *   `<tier> used=<used_ms>/<total_ms> skips=<a=1,b=2,...>`
 * Skipped names are omitted when the count is zero. Always safe to call
 * even when no skips have been recorded.
 */
export function formatBudgetHeader(budget: LatencyBudget): string {
  const parts: string[] = [
    budget.tier,
    `used=${Math.round(budget.elapsedMs)}/${budget.totalMs}`,
  ];
  const skips = budget.getSkipCounts();
  if (skips.length > 0) {
    parts.push(`skips=${skips.map(([n, c]) => `${n}=${c}`).join(",")}`);
  }
  return parts.join(" ");
}
