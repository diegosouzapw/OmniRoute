import { notifyWebhookEvent } from "@/lib/webhookDispatcher";
import { getOmniContextMetricsSummary } from "./metrics";
import { getRetrieveCacheStats } from "./cache";

/**
 * Phase 3 — emit content-free OmniContext metrics via webhook dispatcher.
 * Never includes artifact bodies/titles.
 */
export function emitOmniContextMetricsWebhook(): void {
  const metrics = getOmniContextMetricsSummary();
  const cache = getRetrieveCacheStats();
  notifyWebhookEvent("omnicontext.metrics", {
    retrieveTotal: metrics.retrieveTotal,
    retrieveLatencyAvgMs: metrics.retrieveLatencyAvgMs,
    retrieveCacheHits: metrics.retrieveCacheHits,
    retrieveCacheMisses: metrics.retrieveCacheMisses,
    injectOkTotal: metrics.injectOkTotal,
    injectSkipped: metrics.injectSkipped,
    scopeUnresolvedTotal: metrics.scopeUnresolvedTotal,
    publishTotal: metrics.publishTotal,
    feedback: metrics.feedback,
    promoteStableTotal: metrics.promoteStableTotal,
    cacheSize: cache.size,
  });
}
