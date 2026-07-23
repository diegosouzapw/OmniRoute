import { NextResponse } from "next/server";
import pino from "pino";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

import { getProviderMetrics } from "@/lib/db/callLogStats";
import { toNumber } from "@/shared/utils/numeric";

const logger = pino({ name: "provider-metrics-api" });

/**
 * GET /api/provider-metrics — Aggregate per-provider stats from call_logs
 * Returns aggregate metrics plus topology recency/error hints for dashboard visualization.
 */
export async function GET() {
  try {
    const rows = getProviderMetrics();

    const metrics: Record<
      string,
      {
        totalRequests: number;
        totalSuccesses: number;
        successRate: number;
        avgLatencyMs: number;
        lastRequestAt: string | null;
        lastErrorAt: string | null;
        lastStatus: number | null;
        lastErrorStatus: number | null;
      }
    > = {};
    let lastProvider = "";
    let lastProviderTs = 0;
    let errorProvider = "";
    let errorProviderTs = 0;

    for (const row of rows) {
      const provider =
        typeof row.provider === "string" && row.provider.trim().length > 0
          ? row.provider
          : "unknown";
      const totalRequests = toNumber(row.totalRequests);
      const totalSuccesses = toNumber(row.totalSuccesses);
      const avgLatencyMs = toNumber(row.avgLatencyMs);
      const lastRequestAt = typeof row.lastRequestAt === "string" ? row.lastRequestAt : null;
      const lastErrorAt = typeof row.lastErrorAt === "string" ? row.lastErrorAt : null;
      const lastStatus = row.lastStatus == null ? null : toNumber(row.lastStatus);
      const lastErrorStatus = row.lastErrorStatus == null ? null : toNumber(row.lastErrorStatus);
      metrics[provider] = {
        totalRequests,
        totalSuccesses,
        successRate: totalRequests > 0 ? Math.round((totalSuccesses / totalRequests) * 100) : 0,
        avgLatencyMs,
        lastRequestAt,
        lastErrorAt,
        lastStatus,
        lastErrorStatus,
      };

      const requestTs = lastRequestAt ? Date.parse(lastRequestAt) : 0;
      if (Number.isFinite(requestTs) && requestTs > lastProviderTs) {
        lastProvider = provider;
        lastProviderTs = requestTs;
      }

      // Only flag as errorProvider if the provider's MOST RECENT request was itself
      // a failure. A provider with a historical lastErrorAt but a recent success
      // (lastStatus 2xx/3xx) must not be shown as currently errored (#3619).
      const isCurrentlyInError =
        lastStatus !== null && (lastStatus < 200 || lastStatus >= 400);
      const errorTs = isCurrentlyInError && lastErrorAt ? Date.parse(lastErrorAt) : 0;
      if (Number.isFinite(errorTs) && errorTs > errorProviderTs) {
        errorProvider = provider;
        errorProviderTs = errorTs;
      }
    }

    return NextResponse.json({
      metrics,
      topology: {
        providers: Object.keys(metrics),
        lastProvider,
        errorProvider,
      },
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to load provider metrics");
    return NextResponse.json(buildErrorBody(500, "Failed to load provider metrics"), {
      status: 500,
    });
  }
}
