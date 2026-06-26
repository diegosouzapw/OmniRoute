/**
 * src/lib/sre/sloDefinitions.ts
 *
 * The hardcoded SLO catalog for PR-012.
 *
 * Five SLOs cover OmniRoute's production-critical user journeys. Each SLO
 * has a stable id (used as a Prometheus label and primary key), an
 * objective label, a target, a sliding window, and an SLI query that
 * describes how to derive the SLI from raw telemetry.
 *
 * Adding a new SLO
 * ----------------
 * 1. Pick the next id (`SLO-006`, `SLO-007`, ...).
 * 2. Add an entry below. **Never** mutate an existing entry — the
 *    id/target/window combination is treated as a historical record
 *    once alerts have been paged against it.
 * 3. Run `tests/unit/sre/sloDefinitions.test.ts` to make sure the
 *    catalog is internally consistent (every window matches the day
 *    count, every target is in `(0, 1]`).
 * 4. Add a corresponding row to the Prometheus recording rules YAML so
 *    the metric `omniroute_slo_target_ratio{slo_id="SLO-006"}` resolves.
 *
 * This catalog is the source of truth for the `/api/v1/slo` endpoints
 * (see `src/app/api/v1/slo/route.ts`). It is intentionally a frozen
 * `ReadonlyArray` so accidental mutation at runtime throws in dev mode.
 *
 * Run from the repo root:
 *   node --import tsx --test tests/unit/sre/sloDefinitions.test.ts
 */

import type { SlidingWindow, SloMinimum } from "./errorBudget.ts";

// ---------------------------------------------------------------------------
// Re-export the upstream type so callers don't need to import from
// errorBudget directly. Keeps the public SLO-module surface small.
// ---------------------------------------------------------------------------

export type { SlidingWindow, SloMinimum } from "./errorBudget.ts";

// ---------------------------------------------------------------------------
// Catalog entry shape
// ---------------------------------------------------------------------------

/** A catalog entry extends the minimal SLO shape with display metadata
 *  and the SLI query used to derive the SLI from telemetry. */
export interface SloCatalogEntry extends SloMinimum {
  /** Human-readable description, surfaced in admin UIs. */
  readonly description: string;
  /** The SLI query used to derive the SLI value from telemetry. Documented
   *  forms:
   *    - `success_ratio{service="..."}`       — fraction of successful events
   *    - `latency_p99_under{ms=500}`          — fraction under a latency SLO
   *    - `error_ratio{service="..."}`         — fraction of error events
   *  The string is informational; consumers parse it themselves. */
  readonly sli_query: string;
  /** The team responsible for this SLO. Used for alert routing. */
  readonly owner: string;
  /** Tags for grouping in dashboards. */
  readonly tags: ReadonlyArray<string>;
}

// ---------------------------------------------------------------------------
// The five production SLOs
// ---------------------------------------------------------------------------

/**
 * SLO-001 — API availability.
 *   Target: 99.9% of requests succeed over a rolling 30-day window.
 *   This is the headline customer-facing SLO — covers all `/api/v1/*`
 *   endpoints. Burning 1% of requests in 1h = fast-burn page.
 */
const SLO_001_API_AVAILABILITY: SloCatalogEntry = Object.freeze({
  slo_id: "SLO-001",
  objective: "API availability",
  target: 0.999,
  window: "30d",
  description:
    "Fraction of /api/v1/* requests that complete without a 5xx or timeout, " +
    "measured over a rolling 30-day window. Excludes 4xx (client errors) " +
    "since those do not represent an availability incident.",
  sli_query: "1 - error_ratio{service=\"api-gateway\",code=~\"5..\"}",
  owner: "platform",
  tags: ["availability", "customer-facing", "tier-1"],
});

/**
 * SLO-002 — p95 latency budget.
 *   Target: 99% of requests complete in < 500ms (p95) over a rolling 7-day
 *   window. Measured at the gateway after auth/parsing.
 */
const SLO_002_LATENCY_P95: SloCatalogEntry = Object.freeze({
  slo_id: "SLO-002",
  objective: "API p95 latency under 500ms",
  target: 0.99,
  window: "7d",
  description:
    "Fraction of /api/v1/* requests whose end-to-end (gateway to client) " +
    "latency is below 500ms, measured at the 95th percentile over a rolling " +
    "7-day window. Streaming responses measure time-to-first-byte.",
  sli_query: "latency_p95_under{service=\"api-gateway\", ms=500}",
  owner: "platform",
  tags: ["latency", "performance", "tier-1"],
});

/**
 * SLO-003 — Bifrost relay success.
 *   Target: 99.5% of upstream relay requests succeed over a rolling 24h
 *   window. Bifrost is the internal multiplexing layer that fronts every
 *   upstream provider.
 */
const SLO_003_BIFROST_RELAY: SloCatalogEntry = Object.freeze({
  slo_id: "SLO-003",
  objective: "Bifrost relay success",
  target: 0.995,
  window: "24h",
  description:
    "Fraction of upstream relay requests (Bifrost internal RPC) that complete " +
    "with a 2xx response over a rolling 24-hour window. Excludes retries; the " +
    "first attempt is what counts.",
  sli_query: "success_ratio{service=\"bifrost-relay\"}",
  owner: "inference",
  tags: ["availability", "upstream", "tier-2"],
});

/**
 * SLO-004 — Combo execution success.
 *   Target: 99% of combo (chained-model) executions complete without a
 *   step failure over a rolling 24h window.
 */
const SLO_004_COMBO_EXECUTION: SloCatalogEntry = Object.freeze({
  slo_id: "SLO-004",
  objective: "Combo execution success",
  target: 0.99,
  window: "24h",
  description:
    "Fraction of combo executions where every step returns success and the " +
    "final response is delivered to the caller. A combo that retries and " +
    "ultimately succeeds counts as success; one that surfaces a step error " +
    "to the caller counts as failure.",
  sli_query: "success_ratio{service=\"combo-runner\",final=\"true\"}",
  owner: "inference",
  tags: ["availability", "combo", "tier-2"],
});

/**
 * SLO-005 — Provider failover latency.
 *   Target: 99% of provider failovers complete in < 2s over a rolling 1h
 *   window. Captures how fast we recover when a primary provider goes
 *   down.
 */
const SLO_005_FAILOVER_LATENCY: SloCatalogEntry = Object.freeze({
  slo_id: "SLO-005",
  objective: "Provider failover under 2s",
  target: 0.99,
  window: "1h",
  description:
    "Fraction of provider failover events where the first successful " +
    "request on the secondary provider completes within 2s of the primary " +
    "being marked unhealthy. Measured at the provider-router layer.",
  sli_query: "failover_p99_under{service=\"provider-router\", ms=2000}",
  owner: "platform",
  tags: ["latency", "failover", "tier-1"],
});

// ---------------------------------------------------------------------------
// The catalog
// ---------------------------------------------------------------------------

/**
 * The hardcoded SLO catalog. Frozen so accidental mutation throws in
 * development. The order is stable (most-critical first) so the
 * `/api/v1/slo` endpoint can return it without sorting.
 */
export const SLO_CATALOG: ReadonlyArray<SloCatalogEntry> = Object.freeze([
  SLO_001_API_AVAILABILITY,
  SLO_002_LATENCY_P95,
  SLO_003_BIFROST_RELAY,
  SLO_004_COMBO_EXECUTION,
  SLO_005_FAILOVER_LATENCY,
]);

/** Map of SLO id → catalog entry. Built once at module load. */
export const SLO_BY_ID: ReadonlyMap<string, SloCatalogEntry> = new Map(
  SLO_CATALOG.map((s) => [s.slo_id, s] as const)
);

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

/** Look up a catalog entry by id. Returns `null` if not found. */
export function findSlo(sloId: string): SloCatalogEntry | null {
  return SLO_BY_ID.get(sloId) ?? null;
}

/** Return all SLOs that match a tag. Used by `/api/v1/slo?tag=availability`. */
export function findSlosByTag(tag: string): ReadonlyArray<SloCatalogEntry> {
  return SLO_CATALOG.filter((s) => s.tags.includes(tag));
}

/** Return all SLOs owned by a team. Used by team-scoped dashboards. */
export function findSlosByOwner(owner: string): ReadonlyArray<SloCatalogEntry> {
  return SLO_CATALOG.filter((s) => s.owner === owner);
}

// ---------------------------------------------------------------------------
// Defaults and constants
// ---------------------------------------------------------------------------

/** Total number of SLOs in the catalog. Exposed for tests and dashboards. */
export const SLO_CATALOG_SIZE: number = SLO_CATALOG.length;

/** Total cardinality of `{slo_id, window}` label combos at full expansion.
 *  Used by `budgetMetrics.ts` to enforce a Prometheus cardinality cap. */
export const SLO_LABEL_CARDINALITY: number = SLO_CATALOG.length * 5;

// ---------------------------------------------------------------------------
// Day count per window — kept in one place so catalog entries can be
// checked at load time.
// ---------------------------------------------------------------------------

export function windowDays(window: SlidingWindow): number {
  switch (window) {
    case "1h":
      return 1 / 24;
    case "6h":
      return 6 / 24;
    case "24h":
      return 1;
    case "7d":
      return 7;
    case "30d":
      return 30;
    default: {
      const exhaustive: never = window;
      throw new Error(`Unknown sliding window: ${String(exhaustive)}`);
    }
  }
}
