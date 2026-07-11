/**
 * Content-free OmniContext metrics (in-process counters).
 */

export type InjectSkipReason =
  | "opt_out_header"
  | "disabled"
  | "no_api_key"
  | "low_scope"
  | "not_member"
  | "timeout"
  | "empty"
  | "error"
  | "circuit_open";

interface OmniContextMetricsState {
  retrieveTotal: number;
  retrieveLatencySumMs: number;
  retrieveLatencyCount: number;
  retrieveCacheHits: number;
  retrieveCacheMisses: number;
  injectTokensTotal: number;
  injectOkTotal: number;
  injectSkipped: Record<string, number>;
  scopeUnresolvedTotal: number;
  publishTotal: number;
  feedbackHelpful: number;
  feedbackHarmful: number;
  promoteStableTotal: number;
}

const state: OmniContextMetricsState = {
  retrieveTotal: 0,
  retrieveLatencySumMs: 0,
  retrieveLatencyCount: 0,
  retrieveCacheHits: 0,
  retrieveCacheMisses: 0,
  injectTokensTotal: 0,
  injectOkTotal: 0,
  injectSkipped: {},
  scopeUnresolvedTotal: 0,
  publishTotal: 0,
  feedbackHelpful: 0,
  feedbackHarmful: 0,
  promoteStableTotal: 0,
};

function bumpSkip(reason: string): void {
  state.injectSkipped[reason] = (state.injectSkipped[reason] ?? 0) + 1;
}

export function recordRetrieve(params: { latencyMs: number; cached: boolean }): void {
  state.retrieveTotal += 1;
  state.retrieveLatencySumMs += Math.max(0, params.latencyMs);
  state.retrieveLatencyCount += 1;
  if (params.cached) state.retrieveCacheHits += 1;
  else state.retrieveCacheMisses += 1;
}

export function recordInjectOk(tokensEstimate: number): void {
  state.injectOkTotal += 1;
  state.injectTokensTotal += Math.max(0, tokensEstimate);
}

export function recordInjectSkipped(reason: InjectSkipReason | string): void {
  bumpSkip(reason);
  if (reason === "low_scope") state.scopeUnresolvedTotal += 1;
}

export function recordPublish(): void {
  state.publishTotal += 1;
}

export function recordFeedback(verdict: "helpful" | "harmful"): void {
  if (verdict === "helpful") state.feedbackHelpful += 1;
  else state.feedbackHarmful += 1;
}

export function recordPromoteStable(): void {
  state.promoteStableTotal += 1;
}

export function getOmniContextMetricsSummary(): {
  retrieveTotal: number;
  retrieveLatencyAvgMs: number | null;
  retrieveCacheHits: number;
  retrieveCacheMisses: number;
  injectTokensTotal: number;
  injectOkTotal: number;
  injectSkipped: Record<string, number>;
  scopeUnresolvedTotal: number;
  publishTotal: number;
  feedback: { helpful: number; harmful: number };
  promoteStableTotal: number;
} {
  const avg =
    state.retrieveLatencyCount > 0 ? state.retrieveLatencySumMs / state.retrieveLatencyCount : null;
  return {
    retrieveTotal: state.retrieveTotal,
    retrieveLatencyAvgMs: avg === null ? null : Math.round(avg * 100) / 100,
    retrieveCacheHits: state.retrieveCacheHits,
    retrieveCacheMisses: state.retrieveCacheMisses,
    injectTokensTotal: state.injectTokensTotal,
    injectOkTotal: state.injectOkTotal,
    injectSkipped: { ...state.injectSkipped },
    scopeUnresolvedTotal: state.scopeUnresolvedTotal,
    publishTotal: state.publishTotal,
    feedback: { helpful: state.feedbackHelpful, harmful: state.feedbackHarmful },
    promoteStableTotal: state.promoteStableTotal,
  };
}

export function resetOmniContextMetrics(): void {
  state.retrieveTotal = 0;
  state.retrieveLatencySumMs = 0;
  state.retrieveLatencyCount = 0;
  state.retrieveCacheHits = 0;
  state.retrieveCacheMisses = 0;
  state.injectTokensTotal = 0;
  state.injectOkTotal = 0;
  state.injectSkipped = {};
  state.scopeUnresolvedTotal = 0;
  state.publishTotal = 0;
  state.feedbackHelpful = 0;
  state.feedbackHarmful = 0;
  state.promoteStableTotal = 0;
}
