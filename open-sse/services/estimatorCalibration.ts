/**
 * Feedback calibration for the context-guard token estimator (#14931).
 *
 * `estimateTokens` prices every part of a request at a flat chars/4. That is
 * accurate for prose (~4.2 chars/token in OpenAI-family tokenizers) but badly
 * wrong for tool-schema JSON, whose true density is tokenizer-dependent:
 * o200k packs it at ~4.7 chars/token while Qwen-family tokenizers reach
 * ~25 chars/token — a 5x divergence no single static ratio can cover
 * (cross-checked with js-tiktoken in the #14931 thread).
 *
 * So instead of guessing a density, learn it: every completed request reports
 * `usage.prompt_tokens` from the provider. The ratio actual/estimated is
 * tracked as an exponential moving average per (provider, model), split into
 * a tools-present and a tools-absent bucket — agent traffic (Codex et al.) is
 * ~90% tool schema while chat traffic is ~0%, and their densities differ by
 * construction. The next estimate for the same shape is multiplied by that
 * factor.
 *
 * Safety properties:
 * - Cold start is byte-identical to the old behavior: no bucket or fewer than
 *   MIN_SAMPLES observations → factor 1.0.
 * - The factor is clamped to [0.15, 2.0]: a false-negative guard decision is
 *   recoverable (upstream 400 → combo failover), a false-positive local 400 is
 *   not, but a toothless guard is also unacceptable — 2x is the ceiling.
 * - Observations with a wild ratio (<0.05 or >20) or a tiny estimate are
 *   rejected: they come from shape discontinuities or aggregated multi-leg
 *   usage, not from tokenizer density.
 * - State is in-memory only: a restart returns to factor 1.0 and re-learns.
 *   Worst case is the current behavior, never worse.
 * - `OMNIROUTE_ESTIMATOR_CALIBRATION=off|0|false` disables recording and
 *   application entirely.
 */

const EMA_ALPHA = 0.25;
const MIN_SAMPLES = 3;
export const ESTIMATOR_CALIBRATION_FACTOR_MIN = 0.15;
export const ESTIMATOR_CALIBRATION_FACTOR_MAX = 2.0;
const MIN_ESTIMATE_FOR_OBSERVATION = 1000;
const RATIO_ACCEPT_MIN = 0.05;
const RATIO_ACCEPT_MAX = 20;

type CalibrationBucket = {
  /** Current EMA of actual/estimated. */
  factor: number;
  /** Observations absorbed so far (buckets apply only at >= MIN_SAMPLES). */
  samples: number;
};

const buckets = new Map<string, CalibrationBucket>();

function calibrationDisabled(): boolean {
  const value = process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
  return value === "off" || value === "0" || value === "false";
}

export function calibrationBucketKey(
  provider: string | null | undefined,
  model: string | null | undefined,
  toolsPresent: boolean
): string {
  return `${provider ?? "unknown"}/${model ?? "unknown"}|tools=${toolsPresent ? 1 : 0}`;
}

function clampFactor(value: number): number {
  return Math.min(
    ESTIMATOR_CALIBRATION_FACTOR_MAX,
    Math.max(ESTIMATOR_CALIBRATION_FACTOR_MIN, value)
  );
}

/**
 * Current calibration factor for a request shape. 1.0 unless enough trusted
 * observations exist for this (provider, model, tools) bucket.
 */
export function getEstimatorCalibrationFactor(
  provider: string | null | undefined,
  model: string | null | undefined,
  toolsPresent: boolean
): number {
  if (calibrationDisabled()) return 1;
  const bucket = buckets.get(calibrationBucketKey(provider, model, toolsPresent));
  if (!bucket || bucket.samples < MIN_SAMPLES) return 1;
  return bucket.factor;
}

/**
 * Scale an estimate by the learned factor. Returns the input unchanged on cold
 * start, when disabled, or for non-positive estimates.
 */
export function applyEstimatorCalibration(
  provider: string | null | undefined,
  model: string | null | undefined,
  estimatedTokens: number,
  toolsPresent: boolean
): number {
  if (!Number.isFinite(estimatedTokens) || estimatedTokens <= 0) return estimatedTokens;
  const factor = getEstimatorCalibrationFactor(provider, model, toolsPresent);
  if (factor === 1) return estimatedTokens;
  return Math.max(1, Math.round(estimatedTokens * factor));
}

function readPromptTokens(usage: unknown): number | null {
  if (!usage || typeof usage !== "object") return null;
  const record = usage as Record<string, unknown>;
  // OpenAI-compat `prompt_tokens` and Claude-native `input_tokens` are the two
  // shapes the normalized usage objects carry in chatCore.
  for (const field of ["prompt_tokens", "input_tokens"]) {
    const value = record[field];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  }
  return null;
}

/**
 * Absorb one (estimated, provider-reported prompt tokens) pair. No-op when
 * disabled, when the estimate is too small to carry a stable ratio, when the
 * usage object carries no token count, or when `aggregatedUsage` marks a
 * multi-leg tool-loop sum (its prompt_tokens double-counts re-sent history and
 * would inflate the learned factor).
 */
export function recordEstimatorCalibrationFromUsage(input: {
  provider?: string | null;
  model?: string | null;
  estimatedTokens: number;
  usage: unknown;
  toolsPresent: boolean;
  aggregatedUsage?: boolean;
}): void {
  if (calibrationDisabled()) return;
  if (input.aggregatedUsage) return;
  if (
    !Number.isFinite(input.estimatedTokens) ||
    input.estimatedTokens < MIN_ESTIMATE_FOR_OBSERVATION
  ) {
    return;
  }
  const actualTokens = readPromptTokens(input.usage);
  if (actualTokens == null) return;
  const ratio = actualTokens / input.estimatedTokens;
  if (ratio < RATIO_ACCEPT_MIN || ratio > RATIO_ACCEPT_MAX) return;

  const key = calibrationBucketKey(input.provider, input.model, input.toolsPresent);
  const bucket = buckets.get(key);
  if (!bucket) {
    buckets.set(key, { factor: clampFactor(ratio), samples: 1 });
    return;
  }
  bucket.factor = clampFactor(bucket.factor + EMA_ALPHA * (clampFactor(ratio) - bucket.factor));
  bucket.samples += 1;
}

/** Test-only: forget everything learned so far. */
export function resetEstimatorCalibrationForTests(): void {
  buckets.clear();
}

/** Test-only: introspect a bucket without going through the factor gate. */
export function getEstimatorCalibrationBucketForTests(
  provider: string | null | undefined,
  model: string | null | undefined,
  toolsPresent: boolean
): { factor: number; samples: number } | undefined {
  return buckets.get(calibrationBucketKey(provider, model, toolsPresent));
}
