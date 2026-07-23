/**
 * Shared prompt-injection severity scoring / block threshold helpers.
 * Kept separate from promptInjection.ts so inputSanitizer can reuse them
 * without a circular import (promptInjection → sanitizeRequest).
 *
 * @module shared/utils/injectionSeverity
 */

export type InjectionSeverity = "low" | "medium" | "high";

export const SEVERITY_SCORES: Record<InjectionSeverity, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export type DetectionLike = {
  severity?: string;
};

/**
 * Whether detections meet the configured block threshold.
 * Default threshold is "high" — medium patterns are observe-only unless
 * INPUT_SANITIZER_BLOCK_THRESHOLD is lowered.
 */
export function shouldBlockDetections(
  detections: DetectionLike[],
  threshold: InjectionSeverity = "high"
): boolean {
  const minimumSeverity = SEVERITY_SCORES[threshold] || SEVERITY_SCORES.high;
  return detections.some((detection) => {
    const score =
      SEVERITY_SCORES[(detection.severity as InjectionSeverity) || "high"] || 0;
    return score >= minimumSeverity;
  });
}

/**
 * Resolve block threshold from options / env.
 * Env: INPUT_SANITIZER_BLOCK_THRESHOLD or INJECTION_GUARD_BLOCK_THRESHOLD
 * Allowed: low | medium | high (default high)
 */
export function resolveBlockThreshold(
  explicit?: InjectionSeverity | string | null
): InjectionSeverity {
  const raw =
    (explicit && String(explicit)) ||
    process.env.INPUT_SANITIZER_BLOCK_THRESHOLD ||
    process.env.INJECTION_GUARD_BLOCK_THRESHOLD ||
    "high";
  const normalized = String(raw).trim().toLowerCase();
  if (normalized === "low" || normalized === "medium" || normalized === "high") {
    return normalized;
  }
  return "high";
}
