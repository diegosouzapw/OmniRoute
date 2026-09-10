/**
 * Provider/Model Quality Signal — feedback-driven adaptive routing (v2).
 *
 * v2 separates two distinct concepts that v1 conflated:
 *
 *  - **Operational quality** — derived from the routing hot path (HTTP status,
 *    connection failures, 429s, malformed responses, stream interruptions,
 *    finish_reason anomalies, zero-output successes, latency/TTFT). A request
 *    returning HTTP 200 is NOT necessarily high quality; operational quality
 *    only says "the wire behaved."
 *  - **Semantic quality** — the actual value of the generated output
 *    (evaluator score, task success, tool-use correctness, factual accuracy).
 *    This is ONLY ever produced by an external evaluator via
 *    `setSemanticQuality()`. It is never manufactured from HTTP success. It is
 *    `null` until an evaluator provides a value.
 *
 * Confidence / sample awareness (v2):
 *  - `confidence = clamp01(samples / CONFIDENCE_FULL_SAMPLES)`.
 *  - The score returned to the scorer is blended toward the neutral midpoint
 *    (0.5): `score = NEUTRAL + confidence * (operational - NEUTRAL)`.
 *  - Consequences: a cold provider (0 samples) scores neutral 0.5 — it is not
 *    unfairly penalized, but it also cannot dominate a provider with thousands
 *    of solid observations. A provider with 7 lucky successes is pulled toward
 *    0.5, so it never dominates purely from optimistic initialization.
 *
 * This complements the existing resilience stack (circuit breaker, connection
 * cooldown, model lockout, health matrix): those handle *availability* (hard
 * exclusion); this signal handles *soft adaptive preference*.
 *
 * Statistics are plain arithmetic (EWMA + small counters), O(1) per event, safe
 * under the Node event loop's single thread — no lock-free/atomic trickery.
 */
import { boundedMap } from "../../../src/lib/quota/boundedMap.ts";

/** EWMA smoothing factor (alpha). Lower = slower adaptation. */
const OPERATIONAL_ALPHA = 0.2;
/** Latency EWMA alpha — slower so transient spikes don't tank quality instantly. */
const LATENCY_ALPHA = 0.1;
/** Samples at which confidence reaches 1.0 (full confidence). */
const CONFIDENCE_FULL_SAMPLES = 50;
/** Neutral score used for cold/unknown providers (midpoint, neither boosted nor penalized). */
const NEUTRAL_SCORE = 0.5;

interface QualityState {
  /** EWMA of the success indicator (1 = good, 0 = bad). */
  successEwma: number;
  /** EWMA of latency in ms. */
  latencyEwma: number;
  /** EWMA of TTFT in ms (streaming only). */
  ttftEwma: number | null;
  /** Total events observed for this (provider, model). */
  samples: number;
  /** Count of operational-anomaly events (malformed / empty / length / interrupted). */
  anomalies: number;
  /** Rate-limit (429) count — tracked separately for observability. */
  rateLimited: number;
  /** Semantic quality [0,1] from an external evaluator, if one has provided it. */
  semantic: number | null;
  /** Confidence [0,1] of the semantic score as reported by the evaluator. */
  semanticConfidence: number | null;
  lastTs: number;
}

const states = boundedMap<QualityState>("routing-quality", 2000, "lru", 0, {
  shouldEvict: (s) => s.semantic === null,
});

function keyOf(provider: string, model: string): string {
  return `${provider}/${model}`;
}

function getOrCreate(key: string): QualityState {
  let state = states.get(key);
  if (!state) {
    state = {
      successEwma: 1,
      latencyEwma: 0,
      ttftEwma: null,
      samples: 0,
      anomalies: 0,
      rateLimited: 0,
      semantic: null,
      semanticConfidence: null,
      lastTs: 0,
    };
    states.set(key, state);
  }
  return state;
}

function isOperationalAnomaly(event: {
  outcome: string;
  finishReason: string | null;
  outputTokens: number | null | undefined;
}): boolean {
  if (event.outcome === "malformed" || event.outcome === "stream_interrupted") return true;
  // finish_reason=length → the model ran out of output budget (truncated answer).
  if (event.outcome === "success" && event.finishReason === "length") return true;
  // A "successful" 200 that produced zero output tokens is an empty/invalid output.
  // NOTE: we deliberately do NOT treat a missing finish_reason as an anomaly —
  // streaming passthrough frequently has no reconstructed finish_reason, so that
  // signal would penalize every legitimately streamed request (pure noise).
  if (event.outcome === "success" && event.outputTokens === 0) return true;
  return false;
}

function successIndicator(event: { outcome: string; status: number | null }): number {
  if (event.outcome === "success") return 1;
  // 429 is a transient signal, not a quality failure — treat as neutral-positive.
  if (event.outcome === "rate_limited" || event.status === 429) return 0.5;
  return 0;
}

/** Record one operational routing event into the quality estimate. O(1). */
export function recordQualityEvent(event: {
  provider: string;
  model: string;
  outcome: string;
  status: number | null;
  latencyMs: number;
  ttftMs?: number | null;
  finishReason?: string | null;
  outputTokens?: number | null;
  ts?: number;
}): void {
  const key = keyOf(event.provider || "unknown", event.model || "unknown");
  const state = getOrCreate(key);

  state.samples += 1;
  if (
    isOperationalAnomaly({
      outcome: event.outcome,
      finishReason: event.finishReason ?? null,
      outputTokens: event.outputTokens ?? undefined,
    })
  ) {
    state.anomalies += 1;
  }
  if (event.outcome === "rate_limited" || event.status === 429) state.rateLimited += 1;

  const indicator = successIndicator({ outcome: event.outcome, status: event.status });
  // First sample seeds the EWMA directly (no lag toward a default).
  state.successEwma =
    state.samples === 1
      ? indicator
      : state.successEwma + OPERATIONAL_ALPHA * (indicator - state.successEwma);

  const latency = Number.isFinite(event.latencyMs) && event.latencyMs >= 0 ? event.latencyMs : 0;
  state.latencyEwma =
    state.samples === 1
      ? latency
      : state.latencyEwma + LATENCY_ALPHA * (latency - state.latencyEwma);

  const ttft = event.ttftMs;
  if (typeof ttft === "number" && Number.isFinite(ttft) && ttft >= 0) {
    state.ttftEwma =
      state.ttftEwma == null ? ttft : state.ttftEwma + LATENCY_ALPHA * (ttft - state.ttftEwma);
  }

  state.lastTs = event.ts ?? Date.now();
}

/**
 * Evaluator seam: record a semantic quality score for a (provider, model).
 * Semantic quality is ONLY ever produced by an evaluator (deterministic scorer,
 * local LLM judge, HTTP/Future-AGI adapter, WASM). It is never manufactured from
 * operational/HTP success. `confidence` should reflect the evaluator's certainty
 * (e.g. number of eval cases backing the score).
 */
export function setSemanticQuality(
  provider: string,
  model: string,
  score: number,
  confidence: number
): void {
  const state = getOrCreate(keyOf(provider || "unknown", model || "unknown"));
  state.semantic = Math.max(0, Math.min(1, Number.isFinite(score) ? score : 0.5));
  state.semanticConfidence = Math.max(0, Math.min(1, Number.isFinite(confidence) ? confidence : 0));
}

export interface ProviderQuality {
  provider: string;
  model: string;
  /** Operational score [0,1] (wire behavior) — confidence-adjusted, neutral 0.5 cold. */
  operational: number;
  /** Semantic score [0,1] from an evaluator, or null when none has been provided. */
  semantic: number | null;
  /** Confidence [0,1] of the operational score (sample-count based). */
  confidence: number;
  /** Confidence [0,1] of the semantic score, when an evaluator reported one. */
  semanticConfidence: number | null;
  samples: number;
  anomalies: number;
  rateLimited: number;
  successEwma: number;
  latencyEwmaMs: number;
  ttftEwmaMs: number | null;
  /** Milliseconds since the last observed event; null when never observed. */
  recencyMs: number | null;
  lastTs: number;
}

/** Raw operational score before the confidence blend (pure EWMA + penalties). */
function rawOperationalScore(state: QualityState): number {
  let score = state.successEwma;

  // Latency degradation: soft penalty capped at 0.2 so slow models are discounted, not zeroed.
  const latencyPenalty = Math.min(0.2, state.latencyEwma / 60_000);
  score -= latencyPenalty;

  // Anomaly penalty: capped so a few bad apples don't nuke a provider entirely.
  const anomalyRate = state.anomalies / Math.max(1, state.samples);
  score -= Math.min(0.25, anomalyRate * 0.5);

  return Math.max(0, Math.min(1, score));
}

function confidenceOf(samples: number): number {
  return Math.max(0, Math.min(1, samples / CONFIDENCE_FULL_SAMPLES));
}

/**
 * Operational quality for a (provider, model), confidence-adjusted and blended
 * toward the neutral midpoint. See module docs for the cold-start guarantee.
 */
export function getProviderQuality(provider: string, model: string): ProviderQuality {
  const state = states.get(keyOf(provider, model));
  const now = Date.now();
  if (!state || state.samples === 0) {
    return {
      provider,
      model,
      operational: NEUTRAL_SCORE,
      semantic: null,
      confidence: 0,
      semanticConfidence: null,
      samples: 0,
      anomalies: 0,
      rateLimited: 0,
      successEwma: 1,
      latencyEwmaMs: 0,
      ttftEwmaMs: null,
      recencyMs: null,
      lastTs: 0,
    };
  }
  const confidence = confidenceOf(state.samples);
  const raw = rawOperationalScore(state);
  const operational = NEUTRAL_SCORE + confidence * (raw - NEUTRAL_SCORE);
  return {
    provider,
    model,
    operational,
    semantic: state.semantic,
    confidence,
    semanticConfidence: state.semanticConfidence,
    samples: state.samples,
    anomalies: state.anomalies,
    rateLimited: state.rateLimited,
    successEwma: state.successEwma,
    latencyEwmaMs: state.latencyEwma,
    ttftEwmaMs: state.ttftEwma,
    recencyMs: state.samples > 0 ? Math.max(0, now - state.lastTs) : null,
    lastTs: state.lastTs,
  };
}

/**
 * Backward-compatible scalar used by the auto-combo scorer's `quality` factor.
 * Returns the confidence-adjusted operational score (neutral 0.5 when cold).
 */
export function getQualityScore(provider: string, model: string): number {
  return getProviderQuality(provider, model).operational;
}

/** Full snapshot of the tracker for explainability / dashboard. */
export function getQualitySnapshot(limit = 200): ProviderQuality[] {
  const views: ProviderQuality[] = [];
  // Snapshot copy: LRU get refreshes recency (reinsertion), so iterating live + get()
  // would loop forever. Snapshot behavior unchanged.
  for (const [key] of [...states]) {
    const slash = key.indexOf("/");
    const provider = slash >= 0 ? key.slice(0, slash) : key;
    const model = slash >= 0 ? key.slice(slash + 1) : key;
    views.push(getProviderQuality(provider, model));
  }
  views.sort((a, b) => b.lastTs - a.lastTs);
  return views.slice(0, limit);
}

/**
 * Classify a provider/model quality state for explainability / dashboard.
 * This reflects the SOFT adaptive signal — it says nothing about hard exclusion
 * (circuit open / quota / auth), which is owned by the resilience stack.
 *
 *  - "healthy":  high confidence + operational quality well above neutral
 *  - "degraded": operational quality at or below neutral (soft penalty active)
 *  - "warming":  low confidence (few samples) — treated neutrally
 *  - "cold":     never observed — neutral, cannot dominate
 */
export type QualityClassification = "healthy" | "degraded" | "warming" | "cold";

export function classifyQuality(q: ProviderQuality): QualityClassification {
  if (q.samples === 0) return "cold";
  if (q.confidence < 0.5) return "warming";
  if (q.operational < 0.5) return "degraded";
  return "healthy";
}

/** Test/ops hook: reset all quality state. */
export function resetQualityTracker(): void {
  states.clear();
}

export const QUALITY_WELL_KNOWN = {
  CONFIDENCE_FULL_SAMPLES,
  NEUTRAL_SCORE,
} as const;
