// Adaptive context-budget "dial" (#7005) DB normalizer, extracted out of compression.ts to keep
// that file under the file-size cap. The compute engine (computeTarget.ts / ladder.ts /
// resolveAdaptivePlan.ts) shipped in PR #4716 but this normalizer never existed, so the
// `contextBudget` setting could never be persisted. Mirrors normalizeUltraConfig/
// normalizeAggressiveConfig in compression.ts.
import {
  DEFAULT_CONTEXT_BUDGET,
  type ContextBudgetConfig,
  type ContextBudgetMode,
  type ContextBudgetPolicy,
  type LadderStage,
} from "@omniroute/open-sse/services/compression/adaptiveCompression/types.ts";

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function boundedInt(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function boundedNumber(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

const CONTEXT_BUDGET_MODES = new Set<ContextBudgetMode>(["floor", "replace-autotrigger", "off"]);
const CONTEXT_BUDGET_POLICIES = new Set<ContextBudgetPolicy>([
  "reserve-output",
  "percentage",
  "absolute",
]);

function normalizeLadderOverride(value: unknown): LadderStage[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const out: LadderStage[] = [];
  for (const raw of value) {
    const record = toRecord(raw);
    if (typeof record.engine !== "string" || !record.engine.trim()) continue;
    out.push({
      engine: record.engine,
      ...(typeof record.intensity === "string" ? { intensity: record.intensity } : {}),
    });
  }
  return out.length > 0 ? out : undefined;
}

export function normalizeContextBudgetConfig(value: unknown): ContextBudgetConfig {
  const record = toRecord(value);
  const ladderOverride = normalizeLadderOverride(record.ladderOverride);
  return {
    ...DEFAULT_CONTEXT_BUDGET,
    mode:
      typeof record.mode === "string" && CONTEXT_BUDGET_MODES.has(record.mode as ContextBudgetMode)
        ? (record.mode as ContextBudgetMode)
        : DEFAULT_CONTEXT_BUDGET.mode,
    policy:
      typeof record.policy === "string" &&
      CONTEXT_BUDGET_POLICIES.has(record.policy as ContextBudgetPolicy)
        ? (record.policy as ContextBudgetPolicy)
        : DEFAULT_CONTEXT_BUDGET.policy,
    outputReserve: boundedInt(
      record.outputReserve,
      DEFAULT_CONTEXT_BUDGET.outputReserve,
      0,
      Number.MAX_SAFE_INTEGER
    ),
    safetyMargin: boundedInt(
      record.safetyMargin,
      DEFAULT_CONTEXT_BUDGET.safetyMargin,
      0,
      Number.MAX_SAFE_INTEGER
    ),
    pct: boundedNumber(record.pct, DEFAULT_CONTEXT_BUDGET.pct, 0, 1),
    absoluteBudget: boundedInt(
      record.absoluteBudget,
      DEFAULT_CONTEXT_BUDGET.absoluteBudget,
      0,
      Number.MAX_SAFE_INTEGER
    ),
    ...(ladderOverride ? { ladderOverride } : {}),
  };
}
