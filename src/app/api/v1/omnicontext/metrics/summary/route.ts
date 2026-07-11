import { NextRequest, NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { requireOmniContextApiKeyId } from "../../_auth";
import { getOmniContextMetricsSummary } from "@/lib/omnicontext/metrics";
import { getRetrieveCacheStats } from "@/lib/omnicontext/cache";

/** Client-facing content-free metrics summary. */
export async function GET(request: NextRequest) {
  const auth = await requireOmniContextApiKeyId(request);
  if (auth instanceof Response) return auth;
  try {
    return NextResponse.json({
      metrics: getOmniContextMetricsSummary(),
      cache: getRetrieveCacheStats(),
    });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
