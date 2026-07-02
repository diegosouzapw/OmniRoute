import { deriveDefaultPlan, type DerivedPlan } from "./deriveDefaultPlan.ts";

export interface ResolveCtx {
  comboId?: string | null;
  combos?: Record<string, Array<{ engine: string; intensity?: string }>>; // named combo pipelines by id
}

export function resolveCompressionPlan(config: any, ctx: ResolveCtx): DerivedPlan {
  if (config?.enabled === false) return { mode: "off", stackedPipeline: [] };

  // routing-combo override
  const ov = ctx.comboId ? config?.comboOverrides?.[ctx.comboId] : undefined;
  if (ov) return modeToPlan(ov, config);

  // active named combo
  if (config?.activeComboId && ctx.combos?.[config.activeComboId]) {
    return { mode: "stacked", stackedPipeline: ctx.combos[config.activeComboId] };
  }

  // derived default
  return deriveDefaultPlan(config?.engines ?? {}, config?.enabled !== false);
}

function modeToPlan(mode: string, config: any): DerivedPlan {
  return mode === "stacked"
    ? { mode: "stacked", stackedPipeline: config?.stackedPipeline ?? [] }
    : { mode, stackedPipeline: [] };
}
