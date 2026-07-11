import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getOmniContextMetricsSummary, resetOmniContextMetrics } from "@/lib/omnicontext/metrics";
import { getRetrieveCacheStats } from "@/lib/omnicontext/cache";
import { getOmniContextRetrieveBreaker } from "@/lib/omnicontext/retrieveCached";
import { emitOmniContextMetricsWebhook } from "@/lib/omnicontext/metricsWebhook";

/** Content-free OmniContext metrics summary (management). */
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const metrics = getOmniContextMetricsSummary();
    const cache = getRetrieveCacheStats();
    const breaker = getOmniContextRetrieveBreaker().getStatus();
    if (request.nextUrl.searchParams.get("notify") === "1") {
      emitOmniContextMetricsWebhook();
    }
    return NextResponse.json({ metrics, cache, breaker });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  resetOmniContextMetrics();
  return NextResponse.json({ ok: true });
}
