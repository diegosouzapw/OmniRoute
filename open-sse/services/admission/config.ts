import { resolveCostConfig } from "./cost.ts";
import {
  MAX_ADMISSION_COST_OR_LIMIT,
  MAX_ADMISSION_WINDOW_MS,
  type AdaptiveAdmissionConfig,
  type AdmissionMode,
} from "./types.ts";
import type { AdaptationParams } from "./adaptation.ts";

export { MAX_ADMISSION_COST_OR_LIMIT, MAX_ADMISSION_WINDOW_MS };

export interface ValidatedConfig {
  mode: AdmissionMode;
  minLimit: number;
  maxLimit: number;
  initialLimit: number;
  maxQueueCount: number;
  maxQueueCost: number;
  defaultMaxWaitMs: number;
  windowMs: number;
  adaptation: AdaptationParams;
  maxRequestCost: number;
  costConfig: ReturnType<typeof resolveCostConfig>;
}

function requirePositiveInt(
  name: string,
  value: unknown,
  max: number = MAX_ADMISSION_COST_OR_LIMIT
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value <= 0 ||
    !Number.isSafeInteger(value)
  ) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
  if (value > max) {
    throw new RangeError(`${name} must be <= ${max}`);
  }
  return value;
}

function requireUnitInterval(name: string, value: unknown, fallback: number): number {
  if (value === undefined) return fallback;
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0 || value > 1) {
    throw new RangeError(`${name} must be in (0, 1]`);
  }
  return value;
}

function requireDecreaseFactor(name: string, value: unknown, fallback: number): number {
  if (value === undefined) return fallback;
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0 || value >= 1) {
    throw new RangeError(`${name} must be in (0, 1)`);
  }
  return value;
}

function resolveMode(mode: AdaptiveAdmissionConfig["mode"]): AdmissionMode {
  if (mode === undefined) return "shadow";
  if (mode !== "off" && mode !== "shadow" && mode !== "enforce") {
    throw new RangeError("mode must be off|shadow|enforce");
  }
  return mode;
}

function resolveAdaptationParams(
  input: AdaptiveAdmissionConfig,
  minLimit: number,
  maxLimit: number,
  windowMs: number
): AdaptationParams {
  const decreaseFactor = requireDecreaseFactor("decreaseFactor", input.decreaseFactor, 0.8);
  const criticalDecreaseFactor = requireDecreaseFactor(
    "criticalDecreaseFactor",
    input.criticalDecreaseFactor,
    0.5
  );
  const increaseStep =
    input.increaseStep === undefined ? 1 : requirePositiveInt("increaseStep", input.increaseStep);
  const maxIncreasePerWindow =
    input.maxIncreasePerWindow === undefined
      ? increaseStep
      : requirePositiveInt("maxIncreasePerWindow", input.maxIncreasePerWindow);

  const shortLatencyAlpha = requireUnitInterval("shortLatencyAlpha", input.shortLatencyAlpha, 0.5);
  const longLatencyAlpha = requireUnitInterval("longLatencyAlpha", input.longLatencyAlpha, 0.1);
  const highUtilizationThreshold = requireUnitInterval(
    "highUtilizationThreshold",
    input.highUtilizationThreshold,
    0.7
  );
  const lowUtilizationThreshold = requireUnitInterval(
    "lowUtilizationThreshold",
    input.lowUtilizationThreshold,
    0.3
  );
  if (criticalDecreaseFactor > decreaseFactor) {
    throw new RangeError("criticalDecreaseFactor must be <= decreaseFactor");
  }
  if (lowUtilizationThreshold >= highUtilizationThreshold) {
    throw new RangeError("lowUtilizationThreshold must be < highUtilizationThreshold");
  }
  if (shortLatencyAlpha <= longLatencyAlpha) {
    throw new RangeError("shortLatencyAlpha must be > longLatencyAlpha");
  }

  return {
    minLimit,
    maxLimit,
    windowMs,
    shortLatencyAlpha,
    longLatencyAlpha,
    increaseStep,
    decreaseFactor,
    criticalDecreaseFactor,
    highUtilizationThreshold,
    lowUtilizationThreshold,
    latencyGradientThreshold: requireUnitInterval(
      "latencyGradientThreshold",
      input.latencyGradientThreshold,
      0.25
    ),
    maxIncreasePerWindow,
  };
}

export function validateConfig(input: AdaptiveAdmissionConfig): ValidatedConfig {
  const minLimit = requirePositiveInt("minLimit", input.minLimit);
  const maxLimit = requirePositiveInt("maxLimit", input.maxLimit);
  if (minLimit > maxLimit) {
    throw new RangeError("minLimit must be <= maxLimit");
  }
  const initialLimit = requirePositiveInt("initialLimit", input.initialLimit);
  // Queue count is not multiplied into cost×time products; keep the full safe-integer range.
  const maxQueueCount = requirePositiveInt(
    "maxQueueCount",
    input.maxQueueCount,
    Number.MAX_SAFE_INTEGER
  );
  const maxQueueCost = requirePositiveInt("maxQueueCost", input.maxQueueCost);
  const windowMs =
    input.windowMs === undefined
      ? 1000
      : requirePositiveInt("windowMs", input.windowMs, MAX_ADMISSION_WINDOW_MS);
  const defaultMaxWaitMs =
    input.defaultMaxWaitMs === undefined
      ? 5_000
      : requirePositiveInt("defaultMaxWaitMs", input.defaultMaxWaitMs, MAX_ADMISSION_WINDOW_MS);
  const costConfig = resolveCostConfig(input.cost);

  return {
    mode: resolveMode(input.mode),
    minLimit,
    maxLimit,
    initialLimit,
    maxQueueCount,
    maxQueueCost,
    defaultMaxWaitMs,
    windowMs,
    maxRequestCost: costConfig.maxRequestCost,
    costConfig,
    adaptation: resolveAdaptationParams(input, minLimit, maxLimit, windowMs),
  };
}
