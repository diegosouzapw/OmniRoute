import type { TosVerdict } from "./freeTierCatalog.ts";
export { FREE_MODEL_BUDGETS } from "./freeModelCatalog.data.ts";
import { FREE_MODEL_BUDGETS } from "./freeModelCatalog.data.ts";

export type FreeModelFreeType =
  | "recurring-daily"
  | "recurring-monthly"
  | "recurring-credit"
  | "one-time-initial"
  | "keyless"
  | "discontinued";

export interface FreeModelBudget {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType: FreeModelFreeType;
  poolKey: string | null;
  tos: TosVerdict;
}

export interface FreeModelTotals {
  steadyRecurringTokens: number;
  steadyWithRecurringCreditsTokens: number;
  firstMonthRealisticTokens: number;
  modelCount: number;
  poolCount: number;
  perModel: FreeModelBudget[];
  headline: string;
}

const RECURRING = new Set<FreeModelFreeType>(["recurring-daily", "recurring-monthly", "keyless"]);

function fmt(n: number): string {
  return n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.round(n / 1e6) + "M";
}

// Sum a per-model numeric field, counting each shared pool once (max within the pool);
// poolKey null => the model is independent and counts on its own.
function dedupedSum(
  models: FreeModelBudget[],
  pick: (m: FreeModelBudget) => number,
  include: (m: FreeModelBudget) => boolean,
): number {
  const poolMax = new Map<string, number>();
  let loose = 0;
  for (const m of models) {
    if (!include(m)) continue;
    const key = m.poolKey;
    if (key) poolMax.set(key, Math.max(poolMax.get(key) ?? 0, pick(m)));
    else loose += pick(m);
  }
  for (const v of poolMax.values()) loose += v;
  return loose;
}

export function computeFreeModelTotals(opts: { excludeTosAvoid?: boolean } = {}): FreeModelTotals {
  const models = FREE_MODEL_BUDGETS.filter((m) => !(opts.excludeTosAvoid && m.tos === "avoid"));

  const steadyRecurringTokens = dedupedSum(
    models,
    (m) => m.monthlyTokens,
    (m) => RECURRING.has(m.freeType),
  );
  const recurringCredits = dedupedSum(
    models,
    (m) => m.creditTokens,
    (m) => m.freeType === "recurring-credit",
  );
  const oneTimeCredits = dedupedSum(
    models,
    (m) => m.creditTokens,
    (m) => m.freeType === "one-time-initial",
  );

  const steadyWithRecurringCreditsTokens = steadyRecurringTokens + recurringCredits;
  const firstMonthRealisticTokens = steadyWithRecurringCreditsTokens + oneTimeCredits;

  const poolCount = new Set(
    models.filter((m) => RECURRING.has(m.freeType) && m.poolKey).map((m) => m.poolKey),
  ).size;

  return {
    steadyRecurringTokens,
    steadyWithRecurringCreditsTokens,
    firstMonthRealisticTokens,
    modelCount: models.length,
    poolCount,
    perModel: models.slice().sort((a, b) => b.monthlyTokens - a.monthlyTokens),
    headline: `~${fmt(steadyRecurringTokens)} documented free tokens/month (steady), up to ~${fmt(firstMonthRealisticTokens)} in your first month with signup credits`,
  };
}
