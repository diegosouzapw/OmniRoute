export const ROUTING_STRATEGY_VALUES = [
  "priority",
  "weighted",
  "round-robin",
  "context-relay",
  "fill-first",
  "p2c",
  "random",
  "least-used",
  "cost-optimized",
  "reset-aware",
  "reset-window",
  "headroom",
  "strict-random",
  "auto",
  "lkgp",
  "context-optimized",
  "fusion",
] as const;

export type RoutingStrategyValue = (typeof ROUTING_STRATEGY_VALUES)[number];

/**
 * Internal-only routing strategy values. These are used by system-generated
 * combos (e.g. the auto-minted quota-share `qtSd/` combos) and are NEVER exposed
 * in the UI or user-facing API — deliberately kept OUT of ROUTING_STRATEGY_VALUES
 * and ROUTING_STRATEGIES so they never appear as a selectable option.
 */
export const INTERNAL_ROUTING_STRATEGY_VALUES = ["quota-share"] as const;

export type InternalRoutingStrategyValue = (typeof INTERNAL_ROUTING_STRATEGY_VALUES)[number];

/** Any routing strategy value, including internal ones. Used for combo dispatch. */
export type AnyRoutingStrategyValue = RoutingStrategyValue | InternalRoutingStrategyValue;

export const AUTO_ROUTING_STRATEGY_VALUES = [
  "rules",
  "cost",
  "eco",
  "latency",
  "fast",
  "sla-aware",
  "sla",
  "lkgp",
] as const;

export type AutoRoutingStrategyValue = (typeof AUTO_ROUTING_STRATEGY_VALUES)[number];

export const ACCOUNT_FALLBACK_STRATEGY_VALUES = [
  "priority",
  "weighted",
  "fill-first",
  "round-robin",
  "p2c",
  "random",
  "least-used",
  "cost-optimized",
  "strict-random",
] as const;

export type AccountFallbackStrategyValue = (typeof ACCOUNT_FALLBACK_STRATEGY_VALUES)[number];

export function normalizeRoutingStrategy(value: unknown): AnyRoutingStrategyValue {
  if (typeof value !== "string") return "priority";
  const normalized = value.trim().toLowerCase();
  if (normalized === "usage") return "least-used";
  if (normalized === "context") return "context-optimized";
  if (normalized === "weekly-reset" || normalized === "reset-window-order") return "reset-window";
  // Internal strategies (e.g. quota-share) are preserved verbatim, never stripped
  // to "priority", so system-minted combos resolve to their dedicated dispatch.
  if ((INTERNAL_ROUTING_STRATEGY_VALUES as readonly string[]).includes(normalized))
    return normalized as InternalRoutingStrategyValue;
  return (ROUTING_STRATEGY_VALUES as readonly string[]).includes(normalized)
    ? (normalized as RoutingStrategyValue)
    : "priority";
}

type RoutingStrategyOption = {
  value: RoutingStrategyValue;
  labelKey: string;
  combosDescKey: string;
  settingsDescKey: string;
  icon: string;
};

export const ROUTING_STRATEGIES: RoutingStrategyOption[] = [
  {
    value: "priority",
    labelKey: "priority",
    combosDescKey: "priorityDesc",
    settingsDescKey: "priorityDesc",
    icon: "sort",
  },
  {
    value: "weighted",
    labelKey: "weighted",
    combosDescKey: "weightedDesc",
    settingsDescKey: "weightedDesc",
    icon: "percent",
  },
  {
    value: "round-robin",
    labelKey: "roundRobin",
    combosDescKey: "roundRobinDesc",
    settingsDescKey: "roundRobinDesc",
    icon: "autorenew",
  },
  {
    value: "context-relay",
    labelKey: "contextRelay",
    combosDescKey: "contextRelayDesc",
    settingsDescKey: "contextRelayDesc",
    icon: "sync_alt",
  },
  {
    value: "fill-first",
    labelKey: "fillFirst",
    combosDescKey: "fillFirstDesc",
    settingsDescKey: "fillFirstDesc",
    icon: "vertical_align_top",
  },
  {
    value: "p2c",
    labelKey: "p2c",
    combosDescKey: "p2cDesc",
    settingsDescKey: "p2cDesc",
    icon: "balance",
  },
  {
    value: "random",
    labelKey: "random",
    combosDescKey: "randomDesc",
    settingsDescKey: "randomDesc",
    icon: "shuffle",
  },
  {
    value: "least-used",
    labelKey: "leastUsed",
    combosDescKey: "leastUsedDesc",
    settingsDescKey: "leastUsedDesc",
    icon: "low_priority",
  },
  {
    value: "cost-optimized",
    labelKey: "costOpt",
    combosDescKey: "costOptimizedDesc",
    settingsDescKey: "costOptDesc",
    icon: "savings",
  },
  {
    value: "reset-aware",
    labelKey: "resetAware",
    combosDescKey: "resetAwareDesc",
    settingsDescKey: "resetAwareDesc",
    icon: "event_repeat",
  },
  {
    value: "reset-window",
    labelKey: "resetWindow",
    combosDescKey: "resetWindowDesc",
    settingsDescKey: "resetWindowDesc",
    icon: "schedule",
  },
  {
    value: "headroom",
    labelKey: "headroom",
    combosDescKey: "headroomDesc",
    settingsDescKey: "headroomDesc",
    icon: "battery_charging_full",
  },
  {
    value: "strict-random",
    labelKey: "strictRandom",
    combosDescKey: "strictRandomDesc",
    settingsDescKey: "strictRandomDesc",
    icon: "casino",
  },
  {
    value: "auto",
    labelKey: "auto",
    combosDescKey: "autoDesc",
    settingsDescKey: "autoDesc",
    icon: "auto_awesome",
  },
  {
    value: "lkgp",
    labelKey: "lkgp",
    combosDescKey: "lkgpDesc",
    settingsDescKey: "lkgpDesc",
    icon: "verified",
  },
  {
    value: "context-optimized",
    labelKey: "contextOpt",
    combosDescKey: "contextOptimizedDesc",
    settingsDescKey: "contextOptDesc",
    icon: "text_snippet",
  },
  {
    value: "fusion",
    labelKey: "fusion",
    combosDescKey: "fusionDesc",
    settingsDescKey: "fusionDesc",
    icon: "hub",
  },
];

export const SETTINGS_FALLBACK_STRATEGY_VALUES = ACCOUNT_FALLBACK_STRATEGY_VALUES;
