// Pool rotation strategy options shared by ProxyRegistryManager's pool strategy
// selector. Extracted so the union type has a single source of truth and the
// <option> list can be rendered from data instead of literal JSX (#6798).
export type PoolStrategy = "round-robin" | "random" | "sticky" | "latency";

export const POOL_STRATEGY_VALUES: PoolStrategy[] = ["round-robin", "random", "sticky", "latency"];

export const POOL_STRATEGY_OPTIONS: Array<{ value: PoolStrategy; labelKey: string }> = [
  { value: "round-robin", labelKey: "strategyRoundRobin" },
  { value: "random", labelKey: "strategyRandom" },
  { value: "sticky", labelKey: "strategySticky" },
  { value: "latency", labelKey: "strategyLatency" },
];

export function isPoolStrategy(value: unknown): value is PoolStrategy {
  return POOL_STRATEGY_VALUES.includes(value as PoolStrategy);
}
