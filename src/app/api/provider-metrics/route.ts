import { NextResponse } from "next/server";
import pino from "pino";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

import { getProviderMetrics } from "@/lib/db/callLogStats";
import { toNumber } from "@/shared/utils/numeric";

const logger = pino({ name: "provider-metrics-api" });

/**
 * How long a failure keeps a provider flagged as currently-in-error.
 *
 * Taken from 9Router, which expires its error highlight after exactly this long
 * (src/lib/db/repos/usageRepo.js:237 — `Date.now() - lastErrorProvider.ts < 10000`).
 *
 * Without a window, "currently in error" meant only "the most recent call failed", which
 * never becomes false on its own: a provider that fails and is then left alone has no newer
 * call to clear the flag, so it stays red indefinitely. A red edge nobody can clear stops
 * being a signal.
 *
 * The window is evaluated HERE, server-side, against the one clock that also produced
 * `lastErrorAt`. Deriving it in the browser would compare a server timestamp against the
 * client's clock, so a skewed machine would expire failures early or never.
 *
 * Note this is a real improvement over 9Router rather than a copy: 9Router keeps the failure
 * in process memory (`global._lastErrorProvider`), a single slot that holds ONE provider and
 * is lost on restart. Here the timestamps come from persisted call_logs, so the window
 * applies per provider and survives a restart.
 */
const TOPOLOGY_ERROR_TTL_MS = 10_000;

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
    // EVERY currently-failing provider. `errorProvider` below keeps only the most recent
    // one, which made a multi-failure state unrepresentable: a second provider failing
    // overwrote the first, so consumers saw the first one recover on its own, and that
    // second provider succeeding handed the flag back. Anything that needs to show all
    // failures (the home topology's red edges and its error count) must read this.
    const errorProviders: string[] = [];
    // One timestamp for the whole sweep, so every provider is aged against the same instant.
    // Calling Date.now() per row would let a slow iteration expire later providers against a
    // slightly later clock than earlier ones.
    const requestStartedAt = Date.now();

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
      const lastFailed = lastStatus !== null && (lastStatus < 200 || lastStatus >= 400);
      const lastErrorTs = lastErrorAt ? Date.parse(lastErrorAt) : NaN;
      // ...and only while that failure is still RECENT. "The last call failed" is a
      // condition that cannot clear itself: once a provider fails and stops being called,
      // there is no newer call to flip the flag, so it stayed flagged forever. Pairing it
      // with TOPOLOGY_ERROR_TTL_MS gives the state an exit — a failure ages out on its own,
      // exactly as it does in 9Router.
      const isCurrentlyInError =
        lastFailed &&
        Number.isFinite(lastErrorTs) &&
        requestStartedAt - lastErrorTs <= TOPOLOGY_ERROR_TTL_MS;
      if (isCurrentlyInError) {
        errorProviders.push(provider);
        // The legacy singular field tracks the most recent of the still-live failures only.
        // It is derived from the same TTL-gated condition so the two fields can never
        // disagree — a provider named here is always present in errorProviders too.
        if (lastErrorTs > errorProviderTs) {
          errorProvider = provider;
          errorProviderTs = lastErrorTs;
        }
      }
    }

    return NextResponse.json({
      metrics,
      topology: {
        providers: Object.keys(metrics),
        lastProvider,
        // Kept for existing consumers. It reports only the most recently failing provider,
        // so prefer `errorProviders` for anything that must reflect all failures.
        errorProvider,
        errorProviders,
      },
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to load provider metrics");
    return NextResponse.json(buildErrorBody(500, "Failed to load provider metrics"), {
      status: 500,
    });
  }
}
