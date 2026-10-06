/**
 * Modality Bridge stats + response transparency header (PR-1 Task 9).
 *
 * In-memory, process-global counters for vision, audio, and video bridge
 * activity plus the builder for the
 * `x-omniroute-modality-bridge` response header, which tells clients that
 * their request payload was transparently transformed into text.
 * Reroutes do NOT get a header — the payload was untouched, only the model
 * changed, and that is already visible in the response body's `model` field.
 *
 * Counters reset on process restart by design (telemetry, not accounting).
 */

export interface BridgeModalityStats {
  attempts: number;
  averageLatencyMs: number;
  bridged: number;
  cacheHits: number;
  resultCacheBytes: number;
  resultCacheHits: number;
  resultCacheLatencyMs: number;
  /** Requests that joined an in-flight complete result instead of hitting the persistent cache. */
  resultSingleflightCoalesced: number;
  failures: number;
  /** Audio/video fusion runs (video bridge only; 0 for other modalities). */
  fusionRuns: number;
  /** Fusion runs that completed with one branch failed (partial result). */
  fusionPartials: number;
  lastUsedAt: string | null;
  latencySamples: number;
  successes: number;
  totalLatencyMs: number;
}

export type BridgeModality = "vision" | "audio" | "video";

const stats: Record<BridgeModality, BridgeModalityStats> = {
  vision: emptyStats(),
  audio: emptyStats(),
  video: emptyStats(),
};

function emptyStats(): BridgeModalityStats {
  return {
    attempts: 0,
    averageLatencyMs: 0,
    bridged: 0,
    cacheHits: 0,
    resultCacheBytes: 0,
    resultCacheHits: 0,
    resultCacheLatencyMs: 0,
    resultSingleflightCoalesced: 0,
    failures: 0,
    fusionRuns: 0,
    fusionPartials: 0,
    lastUsedAt: null,
    latencySamples: 0,
    successes: 0,
    totalLatencyMs: 0,
  };
}

export function recordBridgeUse(
  kind: BridgeModality,
  opts: {
    cacheHit?: boolean;
    cacheHits?: number;
    failure?: boolean;
    fusionRun?: boolean;
    fusionPartial?: boolean;
    latencyMs?: number;
    resultCacheBytes?: number;
    resultCacheHit?: boolean;
    resultCacheLatencyMs?: number;
    /** True only when this request joined existing in-flight result work. */
    resultSingleflightCoalesced?: boolean;
  } = {}
): void {
  const s = stats[kind];
  s.attempts += 1;
  if (opts.failure) {
    s.failures += 1;
  } else {
    s.bridged += 1;
    s.successes += 1;
  }
  const cacheHits =
    typeof opts.cacheHits === "number" && Number.isFinite(opts.cacheHits)
      ? Math.max(0, Math.floor(opts.cacheHits))
      : opts.cacheHit
        ? 1
        : 0;
  s.cacheHits += cacheHits;
  if (opts.fusionRun) s.fusionRuns += 1;
  if (opts.fusionPartial) s.fusionPartials += 1;
  if (opts.resultCacheHit) {
    s.resultCacheHits += 1;
    if (
      typeof opts.resultCacheBytes === "number" &&
      Number.isFinite(opts.resultCacheBytes) &&
      opts.resultCacheBytes > 0
    ) {
      s.resultCacheBytes += Math.max(0, Math.round(opts.resultCacheBytes));
    }
    if (
      typeof opts.resultCacheLatencyMs === "number" &&
      Number.isFinite(opts.resultCacheLatencyMs)
    ) {
      s.resultCacheLatencyMs += Math.max(0, opts.resultCacheLatencyMs);
    }
  }
  if (opts.resultSingleflightCoalesced) s.resultSingleflightCoalesced += 1;
  if (typeof opts.latencyMs === "number" && Number.isFinite(opts.latencyMs)) {
    s.totalLatencyMs += Math.max(0, opts.latencyMs);
    s.latencySamples += 1;
  }
  s.averageLatencyMs = s.latencySamples > 0 ? s.totalLatencyMs / s.latencySamples : 0;
  s.lastUsedAt = new Date().toISOString();
}

export function getBridgeStats(): Record<BridgeModality, BridgeModalityStats> {
  return structuredClone(stats);
}

/**
 * Structural subset of GuardrailExecutionResult (src/lib/guardrails/base.ts) —
 * only the fields the header builder reads, so callers can pass the registry's
 * `results` array directly without a type dependency on the guardrail core.
 */
interface GuardrailMetaEntry {
  guardrail: string;
  meta?: Record<string, unknown> | null;
}

function headerModelToken(value: unknown): string {
  return String(value ?? "unknown")
    .slice(0, 200)
    .replace(/[^A-Za-z0-9._~/-]/g, "_");
}

/** Response header value for a describe-bridged request; null when untouched. */
export function buildModalityBridgeHeader(results: GuardrailMetaEntry[]): string | null {
  const segments: string[] = [];
  for (const r of results) {
    const meta = r.meta ?? {};
    if (
      r.guardrail === "vision-bridge" &&
      typeof meta.imagesProcessed === "number" &&
      meta.imagesProcessed > 0 &&
      !meta.rerouted
    ) {
      segments.push(
        `image->text;model=${headerModelToken(meta.visionModel)};parts=${meta.imagesProcessed}`
      );
    }
    if (
      r.guardrail === "audio-bridge" &&
      typeof meta.clipsProcessed === "number" &&
      meta.clipsProcessed > 0 &&
      !meta.rerouted
    ) {
      segments.push(
        `audio->text;model=${headerModelToken(meta.sttModel)};parts=${meta.clipsProcessed}`
      );
    }
    if (
      r.guardrail === "video-bridge" &&
      typeof meta.videosProcessed === "number" &&
      meta.videosProcessed > 0 &&
      !meta.rerouted
    ) {
      const sampling =
        meta.samplingPolicyRequested === "scene_aware" ||
        meta.samplingPolicyRequested === "segment_aware"
          ? `;sampling=${headerModelToken(meta.samplingPolicyEffective ?? "uniform")};candidates=${typeof meta.samplingCandidateCount === "number" ? Math.max(0, Math.floor(meta.samplingCandidateCount)) : 0}`
          : "";
      segments.push(
        `video->text;model=${headerModelToken(meta.videoModel)};parts=${meta.videosProcessed}${sampling}`
      );
    }
  }
  return segments.length ? segments.join(", ") : null;
}
