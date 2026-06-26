/**
 * src/app/api/v1/slo/[sloId]/route.ts
 *
 * Public endpoint: `GET /api/v1/slo/{sloId}`
 *
 * Returns a single SLO definition together with its current budget state.
 * Read-only, NOT gated by API-key scope.
 *
 * Path params:
 *   sloId  — stable SLO id (e.g. `SLO-001`). 404 if unknown.
 *
 * Response shape (200):
 *   {
 *     slo: SloListEntry,
 *     budget: ErrorBudgetResult,
 *     alerts: BurnRateAlertResult[],
 *     enabled: boolean,
 *     evaluated_at: number,
 *   }
 *
 * Response shape (404):
 *   { error: { code: "slo_not_found", message, requestId, details } }
 */

import {
  ErrorBudget,
  evaluateBurnAlerts,
  type BurnRateAlertResult,
  type ErrorBudgetResult,
  type SloMinimum,
} from "@/lib/sre/errorBudget";
import { SLO_CATALOG, findSlo, type SloCatalogEntry } from "@/lib/sre/sloDefinitions";
import {
  isSloTrackerEnabled,
  recordBudgetMetric,
} from "@/lib/observability/budgetMetrics";
import {
  createErrorResponseStatus,
  createErrorResponseFromUnknown,
} from "@/lib/api/errorResponse";

/** Single-SLO response envelope. */
export interface SloDetailResponse {
  readonly slo: SloDetailEntry;
  readonly budget: ErrorBudgetResult;
  readonly alerts: ReadonlyArray<BurnRateAlertResult>;
  readonly enabled: boolean;
  readonly evaluated_at: number;
}

/** Per-SLO entry shape — identical to the list endpoint. */
export interface SloDetailEntry {
  readonly slo_id: string;
  readonly objective: string;
  readonly target: number;
  readonly window: SloCatalogEntry["window"];
  readonly description: string;
  readonly sli_query: string;
  readonly owner: string;
  readonly tags: ReadonlyArray<string>;
}

/** Path-param handler context for Next.js App Router. */
export interface SloDetailRouteContext {
  readonly params: Promise<{ sloId: string }>;
}

export async function GET(
  _request: Request,
  context: SloDetailRouteContext
): Promise<Response> {
  try {
    const { sloId } = await context.params;
    if (typeof sloId !== "string" || sloId.length === 0) {
      return createErrorResponseStatus(400, "Missing sloId path parameter", {
        code: "invalid_request",
        details: { parameter: "sloId" },
      });
    }

    const entry = findSlo(sloId);
    if (!entry) {
      return createErrorResponseStatus(404, `Unknown SLO: ${sloId}`, {
        code: "slo_not_found",
        details: { sloId, known_slo_ids: SLO_CATALOG.map((s) => s.slo_id) },
      });
    }

    const enabled = isSloTrackerEnabled();
    const sloMinimum: SloMinimum = {
      slo_id: entry.slo_id,
      objective: entry.objective,
      target: entry.target,
      window: entry.window,
    };
    const budget = ErrorBudget({
      slo: sloMinimum,
      totalRequests: 0,
      errorCount: 0,
      slidingSamples: [],
      now: () => Date.now(),
    });
    const alerts = enabled ? evaluateBurnAlerts(budget) : [];

    if (enabled) {
      recordBudgetMetric({
        slo_id: entry.slo_id,
        target_ratio: entry.target,
        remaining_by_window: budget.burn_rates_by_window,
        burn_rate_by_window: budget.burn_rates_by_window,
      });
      for (const alert of alerts) {
        recordBudgetMetric({
          slo_id: entry.slo_id,
          increment_alert: true,
          alert_severity: alert.severity,
        });
      }
    }

    const body: SloDetailResponse = {
      slo: {
        slo_id: entry.slo_id,
        objective: entry.objective,
        target: entry.target,
        window: entry.window,
        description: entry.description,
        sli_query: entry.sli_query,
        owner: entry.owner,
        tags: entry.tags,
      },
      budget,
      alerts,
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
    return createErrorResponseFromUnknown(error, "Failed to load SLO");
  }
}

function knownIdsList(): ReadonlyArray<string> {
  return SLO_CATALOG.map((s) => s.slo_id);
}

// Test-only export.
export const __TEST_SloDetailResponse = null as unknown as SloDetailResponse;
