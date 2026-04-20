type JsonRecord = Record<string, unknown>;

export const INTELLIGENT_STRATEGIES = ["auto", "lkgp"] as const;
export const INTELLIGENT_ROUTING_FILTERS = ["all", "intelligent", "deterministic"] as const;

export type IntelligentRoutingFilter = (typeof INTELLIGENT_ROUTING_FILTERS)[number];

export type IntelligentRoutingWeights = {
  quota: number;
  health: number;
  costInv: number;
  latencyInv: number;
  taskFit: number;
  stability: number;
  tierPriority: number;
};

export type IntelligentRoutingConfig = {
  candidatePool: string[];
  explorationRate: number;
  modePack: string;
  budgetCap?: number;
  weights: IntelligentRoutingWeights;
  routerStrategy: string;
};

export type IntelligentProviderScore = {
  provider: string;
  model: string;
  score: number;
  factors: IntelligentRoutingWeights;
};

export const DEFAULT_INTELLIGENT_WEIGHTS: IntelligentRoutingWeights = {
  quota: 0.2,
  health: 0.25,
  costInv: 0.2,
  latencyInv: 0.15,
  taskFit: 0.1,
  stability: 0.05,
  tierPriority: 0.05,
};

export const MODE_PACK_OPTIONS = [
  { id: "ship-fast", label: "Ship Fast", emoji: "rocket_launch" },
  { id: "cost-saver", label: "Cost Saver", emoji: "savings" },
  { id: "quality-first", label: "Quality First", emoji: "target" },
  { id: "offline-friendly", label: "Offline Friendly", emoji: "cloud_off" },
] as const;

export const ROUTER_STRATEGY_OPTIONS = [
  { id: "rules", label: "Rules (6-Factor Scoring)" },
  { id: "cost", label: "Cost Optimized" },
  { id: "latency", label: "Latency Optimized" },
  { id: "lkgp", label: "Last Known Good Provider" },
] as const;

export const FACTOR_LABELS: Record<keyof IntelligentRoutingWeights, string> = {
  quota: "Quota",
  health: "Health",
  costInv: "Cost",
  latencyInv: "Latency",
  taskFit: "Task Fit",
  stability: "Stability",
  tierPriority: "Tier",
};

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toFiniteNumber(value: unknown): number | null {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function toPositiveNumber(value: unknown): number | undefined {
  const numericValue = toFiniteNumber(value);
  return numericValue !== null && numericValue > 0 ? numericValue : undefined;
}

export function isIntelligentStrategy(strategy: unknown): boolean {
  return typeof strategy === "string" && INTELLIGENT_STRATEGIES.includes(strategy as never);
}

export function getStrategyCategory(strategy: unknown): "intelligent" | "deterministic" {
  return isIntelligentStrategy(strategy) ? "intelligent" : "deterministic";
}

export function normalizeIntelligentRoutingFilter(value: unknown): IntelligentRoutingFilter {
  if (typeof value === "string" && INTELLIGENT_ROUTING_FILTERS.includes(value as never)) {
    return value as IntelligentRoutingFilter;
  }
  return "all";
}

export function filterCombosByStrategyCategory<T extends { strategy?: unknown }>(
  combos: T[],
  filter: IntelligentRoutingFilter
): T[] {
  if (filter === "all") return combos;
  return combos.filter((combo) => getStrategyCategory(combo?.strategy) === filter);
}

export function normalizeIntelligentRoutingConfig(config: unknown): IntelligentRoutingConfig {
  const configRecord = isRecord(config) ? config : {};
  const rawWeights = isRecord(configRecord.weights) ? configRecord.weights : {};

  return {
    candidatePool: Array.isArray(configRecord.candidatePool)
      ? configRecord.candidatePool.filter((value): value is string => typeof value === "string")
      : [],
    explorationRate: Math.min(1, Math.max(0, toFiniteNumber(configRecord.explorationRate) ?? 0.05)),
    modePack:
      typeof configRecord.modePack === "string" && configRecord.modePack.trim().length > 0
        ? configRecord.modePack
        : "ship-fast",
    budgetCap: toPositiveNumber(configRecord.budgetCap),
    weights: {
      quota: toFiniteNumber(rawWeights.quota) ?? DEFAULT_INTELLIGENT_WEIGHTS.quota,
      health: toFiniteNumber(rawWeights.health) ?? DEFAULT_INTELLIGENT_WEIGHTS.health,
      costInv: toFiniteNumber(rawWeights.costInv) ?? DEFAULT_INTELLIGENT_WEIGHTS.costInv,
      latencyInv: toFiniteNumber(rawWeights.latencyInv) ?? DEFAULT_INTELLIGENT_WEIGHTS.latencyInv,
      taskFit: toFiniteNumber(rawWeights.taskFit) ?? DEFAULT_INTELLIGENT_WEIGHTS.taskFit,
      stability: toFiniteNumber(rawWeights.stability) ?? DEFAULT_INTELLIGENT_WEIGHTS.stability,
      tierPriority:
        toFiniteNumber(rawWeights.tierPriority) ?? DEFAULT_INTELLIGENT_WEIGHTS.tierPriority,
    },
    routerStrategy:
      typeof configRecord.routerStrategy === "string" &&
      configRecord.routerStrategy.trim().length > 0
        ? configRecord.routerStrategy
        : "rules",
  };
}

export function buildIntelligentProviderScores(combo: {
  config?: unknown;
  weights?: unknown;
}): IntelligentProviderScore[] {
  const configRecord = normalizeIntelligentRoutingConfig(combo?.config);
  const comboWeights = isRecord(combo?.weights) ? combo.weights : combo?.config;
  const weights = normalizeIntelligentRoutingConfig({
    ...(isRecord(comboWeights) ? comboWeights : {}),
    weights: isRecord(combo?.weights) ? combo.weights : configRecord.weights,
  }).weights;
  const pool = configRecord.candidatePool;
  const baseScore = pool.length > 0 ? 1 / pool.length : 0;

  return pool.map((provider) => ({
    provider,
    model: "auto",
    score: baseScore,
    factors: weights,
  }));
}
