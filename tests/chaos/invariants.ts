/**
 * Invariants — global assertions checked AFTER scenario cleanup.
 *
 * Why check AFTER cleanup: the constraint document says invariant checks
 * must not be masked by recovery. If a scenario leaves the process in a
 * broken state (e.g. fetch still monkey-patched, sqlite handle still
 * closed, timers still pending), the next scenario will fail in a way
 * that points at this scenario's leak. Putting invariant checks at the
 * end makes those leaks loud.
 *
 * Each invariant returns a `Violation` describing exactly what failed,
 * including a `traceId` if relevant. The runner aggregates them into the
 * `ChaosReport`.
 *
 * @module tests/chaos/invariants
 */
import type { ChaosEvent } from "./injectors.ts";

export interface ChaosState {
  /** all events emitted by all injectors in this scenario */
  events: ChaosEvent[];
  /** active ws sockets at the moment of check */
  openWsHandles: number;
  /** the global fetch is still the platform default (no leftovers) */
  fetchIsPatched: boolean;
  /** fs.writeFileSync is still the platform default (no leftovers) */
  fsIsPatched: boolean;
  /** sqlite handles still open in this process */
  openSqliteHandles: number;
  /** outstanding timers (setTimeout / setInterval) tracked by the runner */
  pendingTimers: number;
  /** error trace ids captured during the scenario */
  errorTraceIds: string[];
  /** cache hit/miss counters for scenario 03 */
  cacheHits: number;
  cacheMisses: number;
  /** per-tenant quota served counters for scenario 08 */
  perTenantServed: Record<string, number>;
  /** any extra context the scenario wants invariant checks to see */
  meta: Record<string, unknown>;
}

export type InvariantResult =
  | { ok: true; name: string }
  | { ok: false; name: string; reason: string; traceId?: string; meta?: Record<string, unknown> };

export type Invariant = {
  name: string;
  description: string;
  check(state: ChaosState): InvariantResult;
};

/* ────────────────────────────────────────────────────────────────────────────
 * Built-in invariants
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Invariant: no leftover fetch monkey-patches between scenarios.
 *
 * Without this, a scenario that crashed before restoring globalThis.fetch
 * would silently corrupt every later scenario.
 */
export const noFetchLeftover: Invariant = {
  name: "no-fetch-leftover",
  description: "globalThis.fetch must be restored to platform default after the scenario",
  check(state) {
    if (state.fetchIsPatched) {
      return {
        ok: false,
        name: this.name,
        reason: "globalThis.fetch is still a chaos injector; restore() never ran or threw",
      };
    }
    return { ok: true, name: this.name };
  },
};

/**
 * Invariant: no leftover fs.writeFileSync monkey-patches.
 */
export const noFsLeftover: Invariant = {
  name: "no-fs-leftover",
  description: "fs.writeFileSync/appendFileSync must be restored after the scenario",
  check(state) {
    if (state.fsIsPatched) {
      return {
        ok: false,
        name: this.name,
        reason: "fs.writeFileSync is still a chaos injector; restore() never ran or threw",
      };
    }
    return { ok: true, name: this.name };
  },
};

/**
 * Invariant: no zombie WebSocket connections.
 *
 * Each scenario that opens ws connections must close them. After cleanup
 * the open-handle count must be zero (relative to the baseline the
 * runner captured).
 */
export const noZombieWs: Invariant = {
  name: "no-zombie-ws",
  description: "open ws handles after cleanup must be <= baseline",
  check(state) {
    if (state.openWsHandles > 0) {
      return {
        ok: false,
        name: this.name,
        reason: `${state.openWsHandles} ws handle(s) still open after cleanup`,
        meta: { openWsHandles: state.openWsHandles },
      };
    }
    return { ok: true, name: this.name };
  },
};

/**
 * Invariant: every captured error has a trace_id.
 *
 * The constraint says "Each scenario MUST capture the trace_id of every
 * error for cross-referencing". We assert that for every error that
 * bubbled out of a scenario, a trace_id was captured.
 */
export const allErrorsHaveTraceId: Invariant = {
  name: "all-errors-have-trace-id",
  description: "every error captured during the scenario must carry a non-empty trace_id",
  check(state) {
    if (state.errorTraceIds.length === 0) {
      // No errors were captured — not a violation, just nothing to check.
      return { ok: true, name: this.name };
    }
    const blanks = state.errorTraceIds.filter((id) => !id || !id.trim());
    if (blanks.length > 0) {
      return {
        ok: false,
        name: this.name,
        reason: `${blanks.length} of ${state.errorTraceIds.length} captured errors have an empty trace_id`,
        meta: { total: state.errorTraceIds.length, blank: blanks.length },
      };
    }
    return { ok: true, name: this.name };
  },
};

/**
 * Invariant: cache miss rate stays below 0.8 during thundering herd.
 *
 * The scenario driver records cache hits/misses as requests stream in.
 * If >80% miss the cache, the rate limiter isn't doing its job (every
 * request is bouncing against upstream).
 */
export const cacheMissRateBelow: Invariant = {
  name: "cache-miss-rate-below-0.8",
  description: "during a thundering-herd scenario, cache miss rate must stay < 0.8",
  check(state) {
    const total = state.cacheHits + state.cacheMisses;
    if (total === 0) return { ok: true, name: this.name };
    const missRate = state.cacheMisses / total;
    if (missRate >= 0.8) {
      return {
        ok: false,
        name: this.name,
        reason: `cache miss rate ${(missRate * 100).toFixed(1)}% >= 80% (hits=${state.cacheHits}, misses=${state.cacheMisses})`,
        meta: { cacheMissRate: missRate, total },
      };
    }
    return { ok: true, name: this.name };
  },
};

/**
 * Invariant: fair-share — no single tenant gets starved.
 *
 * Used by scenario 08. Defines "starvation" as a tenant receiving less
 * than half the average per-tenant share.
 */
export const fairShareNoStarvation: Invariant = {
  name: "fair-share-no-starvation",
  description: "no tenant should be starved (receive < 50% of avg per-tenant share)",
  check(state) {
    const tenants = Object.entries(state.perTenantServed);
    if (tenants.length < 2) return { ok: true, name: this.name };
    const total = tenants.reduce((s, [, n]) => s + n, 0);
    const avg = total / tenants.length;
    const starved = tenants.filter(([, n]) => n < avg * 0.5);
    if (starved.length > 0) {
      return {
        ok: false,
        name: this.name,
        reason: `${starved.length} starved tenant(s): ${starved.map(([t]) => t).join(", ")}`,
        meta: { perTenantServed: state.perTenantServed, avg },
      };
    }
    return { ok: true, name: this.name };
  },
};

/**
 * Invariant: process must not have crashed — runner captured no
 * unhandled rejection trace from the scenario.
 */
export const noUnhandledRejection: Invariant = {
  name: "no-unhandled-rejection",
  description: "the scenario must not leave unhandled promise rejections behind",
  check(state) {
    const trace = (state.meta.unhandledRejections as number | undefined) ?? 0;
    if (trace > 0) {
      return {
        ok: false,
        name: this.name,
        reason: `${trace} unhandled rejection(s) observed during the scenario`,
        meta: { unhandledRejections: trace },
      };
    }
    return { ok: true, name: this.name };
  },
};

/* ────────────────────────────────────────────────────────────────────────────
 * Invariant bundle — used by every scenario
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * The default invariant set every scenario is checked against. Specific
 * scenarios append their own (cacheMissRateBelow for scenario 03,
 * fairShareNoStarvation for scenario 08, etc.).
 */
export const defaultInvariants: Invariant[] = [
  noFetchLeftover,
  noFsLeftover,
  noZombieWs,
  allErrorsHaveTraceId,
  noUnhandledRejection,
];

/**
 * Run a set of invariants against a captured state. Returns a list of
 * failures (empty list = clean).
 */
export function checkInvariants(state: ChaosState, invariants: Invariant[]): InvariantResult[] {
  const results: InvariantResult[] = [];
  for (const inv of invariants) {
    try {
      results.push(inv.check(state));
    } catch (e) {
      results.push({
        ok: false,
        name: inv.name,
        reason: `invariant threw: ${(e as Error).message}`,
      });
    }
  }
  return results;
}