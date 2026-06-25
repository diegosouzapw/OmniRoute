/**
 * POST /api/internal/tenant-cost
 *
 * Internal management endpoint that records a tenant-attributed cost
 * event. The actual cost calculation lives in `costCalculator.ts`; this
 * route accepts the token counts and asks the calculator to convert.
 *
 * Why a management endpoint and not a relay hook? Because:
 *   1. The relay path is hot — calling `metricsRegistry.reserveLabelSet`
 *      from the relay adds a hash + set lookup per request;
 *   2. Cost attribution is most accurate AFTER the upstream response
 *      (we know the actual token counts); the relay emits an event, and
 *      a separate handler records the metric.
 *
 * Auth: requires the management session OR an `OMNIROUTE_INTERNAL_TOKEN`
 * shared-secret bearer header. Management JWT/CLI/API-key paths all flow
 * through `requireManagementAuth`. The shared-secret path is added for
 * out-of-process callers (the bifrost Go sidecar) that can't carry a
 * dashboard cookie.
 */

import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { calculateCostUsd, CostCalculationError } from "@/lib/observability/costCalculator";
import { recordTenantCost } from "@/lib/observability/tenantMetrics";
import { currentTraceId } from "@/lib/observability/otel";

const INTERNAL_TOKEN_HEADER = "x-omniroute-internal-token";

function isInternalTokenValid(request: Request): boolean {
  const expected = process.env.OMNIROUTE_INTERNAL_TOKEN;
  if (!expected) return false;
  const provided = request.headers.get(INTERNAL_TOKEN_HEADER);
  if (!provided) return false;
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(request: Request) {
  // Management auth OR shared internal token. Management auth covers the
  // usual API-key / dashboard session paths; the shared token covers
  // server-to-server callers that can't carry a cookie.
  const authError = await requireManagementAuth(request);
  if (authError && !isInternalTokenValid(request)) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  const tenantId = b.tenantId;
  const provider = typeof b.provider === "string" ? b.provider : null;
  const model = typeof b.model === "string" ? b.model : null;
  const inputTokens = typeof b.inputTokens === "number" ? b.inputTokens : NaN;
  const outputTokens = typeof b.outputTokens === "number" ? b.outputTokens : NaN;
  const currency = typeof b.currency === "string" ? b.currency : "USD";

  if (provider === null || model === null) {
    return NextResponse.json({ error: "missing_provider_or_model" }, { status: 400 });
  }
  if (!Number.isFinite(inputTokens) || !Number.isFinite(outputTokens)) {
    return NextResponse.json({ error: "missing_or_invalid_tokens" }, { status: 400 });
  }

  let costUsd: number;
  try {
    costUsd = calculateCostUsd({ provider, model, inputTokens, outputTokens });
  } catch (err) {
    if (err instanceof CostCalculationError) {
      return NextResponse.json({ error: "calculation_failed", reason: err.message }, { status: 400 });
    }
    throw err;
  }

  recordTenantCost({ tenantId, provider, model, costUsd, currency });

  return NextResponse.json({
    recorded: true,
    costUsd,
    currency,
    traceId: currentTraceId() ?? null,
  });
}