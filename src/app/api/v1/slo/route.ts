/**
 * src/app/api/v1/slo/route.ts
 *
 * Public endpoint: `GET /api/v1/slo`
 *
 * Returns every SLO in the catalog together with its current budget state.
 * Read-only, NOT gated by API-key scope — SLOs are a public-facing
 * reliability signal that customers and partners are entitled to.
 *
 * Default-off behaviour
 * ---------------------
 * When `SLO_TRACKER_ENABLED !== "true"` the endpoint returns a `200`
 * with the catalog but every `current` field is `null` and an
 * `enabled: false` flag is set. This lets clients render the static
 * catalog (objective/target/window) without depending on the runtime
 * being opt'd in.
 *
 * Response shape (200):
 *   {
 *     slos: [
 *       {
 *         slo_id, objective, target, window,
 *         description, sli_query, owner, tags,
 *         current: ErrorBudgetResult | null,
 *       }
 *     ],
 *     catalog_size: number,
 *     enabled: boolean,
 *     evaluated_at: number,
 *   }
 *
 * Response shape (4xx/5xx): standard `{ error: { ... } }` envelope
 * produced by `createErrorResponse*` helpers.
 */

import {
  ErrorBudget,
  type ErrorBudgetResult,
  type SloMinimum,
} from "@/lib/sre/errorBudget";
import {
  SLO_CATALOG,
  SLO_CATALOG_SIZE,
  type SloCatalogEntry,
} from "@/lib/sre/sloDefinitions";
import {
  isSloTrackerEnabled,
  recordBudgetMetric,
} from "@/lib/observability/budgetMetrics";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";

/** Response envelope for `GET /api/v1/slo`. */
export interface SloListResponse {
  readonly slos: ReadonlyArray<SloListEntry>;
  readonly catalog_size: number;
  readonly enabled: boolean;
  readonly evaluated_at: number;
}

/** Per-SLO entry shape. */
export interface SloListEntry {
  readonly slo_id: string;
  readonly objective: string;
  readonly target: number;
  readonly window: SloCatalogEntry["window"];
  readonly description: string;
  readonly sli_query: string;
  readonly owner: string;
  readonly tags: ReadonlyArray<string>;
  /** `null` when SLO_TRACKER_ENABLED is off or no samples have arrived. */
  readonly current: ErrorBudgetResult | null;
}

/**
 * In production this would query the telemetry pipeline (counts of
 * requests + errors over the window). For PR-012 we surface zeros —
 * the catalog is the user-facing deliverable. The `current` field will
 * be populated by the runtime scraper once telemetry wiring lands in
 * the next sprint.
 */
function buildCurrentBudget(entry: SloCatalogEntry): ErrorBudgetResult {
  const sloMinimum: SloMinimum = {
    slo_id: entry.slo_id,
    objective: entry.objective,
    target: entry.target,
    window: entry.window,
  };
  return ErrorBudget({
    slo: sloMinimum,
    totalRequests: 0,
    errorCount: 0,
    slidingSamples: [],
    now: () => Date.now(),
  });
}

export async function GET(): Promise<Response> {
  try {
    const enabled = isSloTrackerEnabled();
    const slos: SloListEntry[] = SLO_CATALOG.map((entry) => {
      const current = enabled ? buildCurrentBudget(entry) : null;
      // When enabled, push the gauge values into Prometheus so a /metrics
      // scrape will surface the target ratios even before traffic flows.
      if (enabled && current) {
        recordBudgetMetric({
          slo_id: entry.slo_id,
          target_ratio: entry.target,
          remaining_by_window: current.burn_rates_by_window,
          burn_rate_by_window: current.burn_rates_by_window,
        });
      }
      return {
        slo_id: entry.slo_id,
        objective: entry.objective,
        target: entry.target,
        window: entry.window,
        description: entry.description,
        sli_query: entry.sli_query,
        owner: entry.owner,
        tags: entry.tags,
        current,
      };
    });

    const body: SloListResponse = {
      slos,
      catalog_size: SLO_CATALOG_SIZE,
      enabled,
      evaluated_at: Date.now(),
    };

    return Response.json(body, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to list SLOs");
  }
}

// Test-only export.
export const __TEST_SloListResponse = null as unknown as SloListResponse;
