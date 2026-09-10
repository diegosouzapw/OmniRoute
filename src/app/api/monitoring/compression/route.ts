import { NextResponse } from "next/server";
import pino from "pino";

const logger = pino({ name: "monitoring-compression-api" });

/**
 * GET /api/monitoring/compression — Compression result-memo observability snapshot
 *
 * Exposes the in-process compression result-memo stats (size, capacity, hits,
 * misses, hitRate) so the cache-hit efficiency of the memoized compression
 * path can be tracked over HTTP. This is the observability companion to the
 * #7847 OOM mitigations: a low memo hit rate on deterministic (lite/standard/
 * rtk) modes signals repeated full-pipeline re-runs that the cache was meant
 * to eliminate.
 *
 * Lightweight (no DB, no provider reads) and intentionally distinct from the
 * heavier /api/monitoring/health snapshot so it can be polled more frequently.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { getMemoStats } = await import("@omniroute/open-sse/services/compression/index.ts");
    return NextResponse.json(
      {
        compression: {
          memo: getMemoStats(),
        },
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    logger.error({ err: error }, "GET /api/monitoring/compression failed");
    return NextResponse.json(
      { status: "error", error: "compression_stats_unavailable" },
      { status: 503 }
    );
  }
}
