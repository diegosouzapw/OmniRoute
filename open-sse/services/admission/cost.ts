import {
  MAX_ADMISSION_COST_OR_LIMIT,
  type AdmissionCostConfig,
  type AdmissionCostFeatures,
} from "./types.ts";

export { MAX_ADMISSION_COST_OR_LIMIT };

export const DEFAULT_ADMISSION_COST_CONFIG: AdmissionCostConfig = Object.freeze({
  baseCost: 1,
  bodyBytesPerUnit: 16_384,
  tokensPerUnit: 1_024,
  messagesPerUnit: 32,
  toolsPerUnit: 8,
  fanoutPerUnit: 1,
  streamingClassCost: 1,
  nonStreamingClassCost: 2,
  maxRequestCost: 1_000,
});

function finiteNonNegative(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, Number.MAX_SAFE_INTEGER);
}

function requirePositiveSafeInteger(
  name: string,
  value: unknown,
  max: number = MAX_ADMISSION_COST_OR_LIMIT
): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
  if (value > max) {
    throw new RangeError(`${name} must be <= ${max}`);
  }
  return value;
}

const COST_CONFIG_KEYS = [
  "baseCost",
  "bodyBytesPerUnit",
  "tokensPerUnit",
  "messagesPerUnit",
  "toolsPerUnit",
  "fanoutPerUnit",
  "streamingClassCost",
  "nonStreamingClassCost",
  "maxRequestCost",
] as const satisfies ReadonlyArray<keyof AdmissionCostConfig>;

/** Merge cost quanta after strictly validating every supplied value. */
export function resolveCostConfig(partial?: Partial<AdmissionCostConfig>): AdmissionCostConfig {
  const d = DEFAULT_ADMISSION_COST_CONFIG;
  const resolved = {} as AdmissionCostConfig;
  for (const key of COST_CONFIG_KEYS) {
    resolved[key] = requirePositiveSafeInteger(key, partial?.[key] ?? d[key]);
  }
  return resolved;
}

function unitsFrom(amount: number, quantum: number): number {
  return amount <= 0 ? 0 : Math.ceil(amount / quantum);
}

function addBounded(total: number, contribution: number, maximum: number): number {
  if (contribution >= maximum - total) return maximum;
  return total + contribution;
}

/** Pure bounded cost estimator from transparent positive safe-integer quanta. */
export function estimateAdmissionCost(
  features: AdmissionCostFeatures,
  config?: Partial<AdmissionCostConfig>
): number {
  const cfg = resolveCostConfig(config);
  const body = finiteNonNegative(features?.bodyBytes);
  const tokens = finiteNonNegative(features?.estimatedInputTokens);
  const messages = finiteNonNegative(features?.messageCount);
  const tools = finiteNonNegative(features?.toolCount);
  const fanout = Math.max(1, finiteNonNegative(features?.requestedFanout));
  const contributions = [
    unitsFrom(body, cfg.bodyBytesPerUnit),
    unitsFrom(tokens, cfg.tokensPerUnit),
    unitsFrom(messages, cfg.messagesPerUnit),
    unitsFrom(tools, cfg.toolsPerUnit),
    unitsFrom(fanout, cfg.fanoutPerUnit),
    features?.streaming !== false ? cfg.streamingClassCost : cfg.nonStreamingClassCost,
  ];

  let total = Math.min(cfg.baseCost, cfg.maxRequestCost);
  for (const contribution of contributions) {
    total = addBounded(total, contribution, cfg.maxRequestCost);
    if (total === cfg.maxRequestCost) break;
  }
  return total;
}

/** Validate and bound a caller-supplied request cost. */
export function normalizeRequestCost(
  cost: unknown,
  maxRequestCost: number = DEFAULT_ADMISSION_COST_CONFIG.maxRequestCost
): number {
  const max = requirePositiveSafeInteger("maxRequestCost", maxRequestCost);
  const value = requirePositiveSafeInteger("request cost", cost);
  return Math.min(value, max);
}
