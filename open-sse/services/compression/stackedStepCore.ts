/**
 * Core telemetry + step-decision machinery for the stacked compression pipeline, extracted
 * from `strategySelector.ts` so that god-file stays bounded. This module is a leaf: it depends
 * only on the shared compression types, so it never participates in a cycle.
 *
 * It holds the per-run accumulator (`StackAccumulator` + `createStackAccumulator`), the TV1
 * bail-out config + advance decision (`BailoutConfig` + `decideStep`), and the per-step
 * telemetry fold (`mergeStackStep`). The sync/async stacked loops in `strategySelector.ts`
 * consume these.
 */

import type { CompressionResult, CompressionStats } from "./types.ts";

/**
 * TV1 — Opt-in bail-out configuration for the stacked pipeline.
 * When enabled: a step that throws is silently skipped (verbatim kept); a step whose gain is
 * below `minGainPercent` is also skipped. DEFAULT = disabled (byte-identical to pre-TV1).
 */
export interface BailoutConfig {
  enabled: boolean;
  /** Minimum savings percent required to advance currentBody. Default: 10. */
  minGainPercent?: number;
}

/** Accumulates per-step telemetry across a stacked run (shared sync/async). */
export interface StackAccumulator {
  techniques: Set<string>;
  rules: Set<string>;
  breakdown: NonNullable<CompressionStats["engineBreakdown"]>;
  rtkRawOutputPointers: NonNullable<CompressionStats["rtkRawOutputPointers"]>;
  validationWarnings: Set<string>;
  validationErrors: Set<string>;
  fallbackApplied: boolean;
}

export function createStackAccumulator(): StackAccumulator {
  return {
    techniques: new Set<string>(),
    rules: new Set<string>(),
    breakdown: [],
    rtkRawOutputPointers: [],
    validationWarnings: new Set<string>(),
    validationErrors: new Set<string>(),
    fallbackApplied: false,
  };
}

/**
 * TV1 — Pure helper that decides whether a completed step should advance `currentBody`. Called
 * only when bail-out is ENABLED; the loops bypass it on the default-off path (zero cost). Returns
 * `{ advance: true }` to accept the step, or `{ advance: false }` to skip it (verbatim kept).
 */
export function decideStep(
  result: CompressionResult,
  bailout: BailoutConfig
): { advance: boolean } {
  if (!result.compressed) return { advance: false };
  // Clamp: a negative minGainPercent would mean "always advance" (invalid state).
  const minGain = Math.max(0, bailout.minGainPercent ?? 10);
  const gain = result.stats?.savingsPercent ?? 0;
  if (gain < minGain) return { advance: false };
  return { advance: true };
}

/**
 * A dispatched step whose engine found nothing eligible (e.g. session-dedup with no repeated
 * blocks, ccr below its min-chars threshold) returns `stats: null` instead of throwing or
 * advancing. Left unrecorded, that step vanishes from the pipeline's telemetry with zero trace —
 * no `engineBreakdown` entry, no warning, no error (#6479, #6491). Surface it as a validation
 * warning so operators can tell "engine ran but had nothing to do" apart from "engine never ran".
 */
function recordNullStatsStep(acc: StackAccumulator, engineId: string): void {
  acc.validationWarnings.add(`${engineId}: skipped (no eligible content)`);
}

/** Folds one engine result into the accumulator (telemetry + breakdown entry). */
export function mergeStackStep(
  acc: StackAccumulator,
  engineId: string,
  result: CompressionResult
): void {
  if (!result.stats) {
    // No-op engine (e.g. ccr / session-dedup found no candidate): stats is null so there is no
    // telemetry to fold, but the engine still RAN — record a zero-savings breakdown entry so its
    // identity survives. Without this the breakdown stays empty and ensureEngineBreakdown
    // synthesizes a generic "stacked" 0% node, hiding which engine an operator actually asked for.
    // Also surface a validation warning so operators can tell "engine ran but had nothing to do"
    // apart from "engine never ran" (#6479, #6491).
    recordNullStatsStep(acc, engineId);
    acc.breakdown.push({
      engine: engineId,
      originalTokens: 0,
      compressedTokens: 0,
      savingsPercent: 0,
      techniquesUsed: [],
    });
    return;
  }
  result.stats.techniquesUsed.forEach((technique) => acc.techniques.add(technique));
  result.stats.rulesApplied?.forEach((rule) => acc.rules.add(rule));
  result.stats.rtkRawOutputPointers?.forEach((pointer) => acc.rtkRawOutputPointers.push(pointer));
  result.stats.validationWarnings?.forEach((warning) => acc.validationWarnings.add(warning));
  result.stats.validationErrors?.forEach((error) => acc.validationErrors.add(error));
  acc.fallbackApplied = acc.fallbackApplied || result.stats.fallbackApplied === true;
  acc.breakdown.push({
    engine: engineId,
    originalTokens: result.stats.originalTokens,
    compressedTokens: result.stats.compressedTokens,
    savingsPercent: result.stats.savingsPercent,
    techniquesUsed: result.stats.techniquesUsed,
    ...(result.stats.rulesApplied ? { rulesApplied: result.stats.rulesApplied } : {}),
    ...(result.stats.durationMs !== undefined ? { durationMs: result.stats.durationMs } : {}),
  });
}
