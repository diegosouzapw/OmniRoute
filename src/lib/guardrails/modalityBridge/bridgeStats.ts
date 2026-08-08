/**
 * Modality Bridge stats + response transparency header (PR-1 Task 9).
 *
 * In-memory, process-global counters for bridge activity ("vision" today,
 * "audio" reserved for PR-3) plus the builder for the
 * `x-omniroute-modality-bridge` response header, which tells clients that
 * their request payload was transparently transformed (image→text describe).
 * Reroutes do NOT get a header — the payload was untouched, only the model
 * changed, and that is already visible in the response body's `model` field.
 *
 * Counters reset on process restart by design (telemetry, not accounting).
 */

export interface BridgeModalityStats {
  bridged: number;
  cacheHits: number;
  failures: number;
  lastUsedAt: string | null;
}

const stats: Record<"vision" | "audio", BridgeModalityStats> = {
  vision: { bridged: 0, cacheHits: 0, failures: 0, lastUsedAt: null },
  audio: { bridged: 0, cacheHits: 0, failures: 0, lastUsedAt: null },
};

export function recordBridgeUse(
  kind: "vision" | "audio",
  opts: { cacheHit?: boolean; failure?: boolean } = {}
): void {
  const s = stats[kind];
  s.bridged += 1;
  if (opts.cacheHit) s.cacheHits += 1;
  if (opts.failure) s.failures += 1;
  s.lastUsedAt = new Date().toISOString();
}

export function getBridgeStats(): Record<"vision" | "audio", BridgeModalityStats> {
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

/** Response header value for a describe-bridged request; null when untouched. */
export function buildModalityBridgeHeader(results: GuardrailMetaEntry[]): string | null {
  const segments: string[] = [];
  for (const r of results) {
    const meta = r.meta ?? {};
    if (
      r.guardrail === "vision-bridge" &&
      typeof meta.imagesProcessed === "number" &&
      !meta.rerouted
    ) {
      segments.push(
        `image->text;model=${String(meta.visionModel ?? "unknown")};parts=${meta.imagesProcessed}`
      );
    }
    if (r.guardrail === "audio-bridge" && typeof meta.clipsProcessed === "number") {
      segments.push(
        `audio->text;model=${String(meta.sttModel ?? "unknown")};parts=${meta.clipsProcessed}`
      );
    }
  }
  return segments.length ? segments.join(", ") : null;
}
