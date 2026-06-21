export const STRATEGIES = [
  {
    name: "contains",
    labelKey: "evalsStrategyContainsLabel",
    icon: "search",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    descriptionKey: "evalsStrategyContainsDescription",
  },
  {
    name: "exact",
    labelKey: "evalsStrategyExactLabel",
    icon: "check_circle",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    descriptionKey: "evalsStrategyExactDescription",
  },
  {
    name: "regex",
    labelKey: "evalsStrategyRegexLabel",
    icon: "code",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    descriptionKey: "evalsStrategyRegexDescription",
  },
  {
    name: "custom",
    labelKey: "evalsStrategyCustomLabel",
    icon: "tune",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    descriptionKey: "evalsStrategyCustomDescription",
  },
];

export const HISTORY_COLUMNS = [
  { key: "suiteName", labelKey: "historyColumnSuiteName" },
  { key: "target", labelKey: "historyColumnTarget" },
  { key: "passRate", labelKey: "historyColumnPassRate" },
  { key: "avgLatencyMs", labelKey: "historyColumnAvgLatencyMs" },
  { key: "createdAt", labelKey: "historyColumnCreatedAt" },
];

export const NO_COMPARE_TARGET = "__none__";
export const AUTO_API_KEY = "__auto__";
