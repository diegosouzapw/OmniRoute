import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import {
  getCacheStats,
  clearCache,
  invalidateByModel,
  invalidateBySignature,
  invalidateStale,
} from "@/lib/semanticCache";
import { getIdempotencyStats } from "@/lib/idempotencyLayer";
import { getCacheMetrics, getCacheTrend } from "@/lib/db/settings";
import { getCachedSettings } from "@/lib/db/readCache";
import { isTrustedLoopbackInternalServiceRequest } from "@/lib/api/internalServiceAuth";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

function errorMessage(error: unknown): string {
  return sanitizeErrorMessage(error);
}

export async function GET(req: NextRequest) {
  if (!isTrustedLoopbackInternalServiceRequest(req) && !(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const rawHours = parseInt(searchParams.get("trendHours") || "24", 10);
    const trendHours = Math.min(720, Math.max(1, Number.isNaN(rawHours) ? 24 : rawHours));

    const cacheStats = getCacheStats();
    // Promise.all allows concurrent execution; if one rejects, others still resolve,
    // which is safe for this read-only stats endpoint.
    const [idempotencyStats, promptCacheMetrics, trend, settings] = await Promise.all([
      getIdempotencyStats(),
      getCacheMetrics(),
      getCacheTrend(trendHours),
      getCachedSettings().catch(() => ({})),
    ]);

    return NextResponse.json({
      semanticCache: cacheStats,
      promptCache: promptCacheMetrics,
      trend,
      idempotency: idempotencyStats,
      config: {
        semanticCacheEnabled: settings.semanticCacheEnabled !== false,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isTrustedLoopbackInternalServiceRequest(req) && !(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");
    const signature = searchParams.get("signature");
    const staleMsParam = searchParams.get("staleMs");

    // Enforce mutual exclusivity — only one invalidation mode per request
    const paramCount = [model, signature, staleMsParam].filter(Boolean).length;
    if (paramCount > 1) {
      return NextResponse.json(
        {
          error:
            "Only one invalidation parameter (model, signature, or staleMs) may be provided per request.",
        },
        { status: 400 }
      );
    }

    if (model) {
      const removed = invalidateByModel(model);
      return NextResponse.json({ ok: true, invalidated: removed, scope: "model", model });
    }

    if (signature) {
      const removed = invalidateBySignature(signature);
      return NextResponse.json({ ok: true, invalidated: removed ? 1 : 0, scope: "signature" });
    }

    if (staleMsParam) {
      const maxAgeMs = parseInt(staleMsParam, 10);
      if (Number.isNaN(maxAgeMs) || maxAgeMs <= 0) {
        return NextResponse.json(
          { error: "staleMs must be a positive integer (milliseconds)." },
          { status: 400 }
        );
      }
      const removed = invalidateStale(maxAgeMs);
      return NextResponse.json({ ok: true, invalidated: removed, scope: "stale", maxAgeMs });
    }

    // Full clear
    const cleared = clearCache();
    return NextResponse.json({ ok: true, cleared, scope: "all" });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
