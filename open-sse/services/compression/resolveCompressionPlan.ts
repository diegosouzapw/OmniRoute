import { deriveDefaultPlan, type DerivedPlan } from "./deriveDefaultPlan.ts";

export interface ResolveCtx {
  comboId?: string | null;
  header?: string | null; // x-omniroute-compression (Phase 3 parses+passes; Phase 1 callers pass undefined)
  combos?: Record<string, Array<{ engine: string; intensity?: string }>>; // named combo pipelines by id
}

export function resolveCompressionPlan(config: any, ctx: ResolveCtx): DerivedPlan {
  if (config?.enabled === false) return { mode: "off", stackedPipeline: [] };

  // 1. header (Phase 3 supplies parsed value; here it composes if present)
  if (ctx.header) {
    if (ctx.header === "off") return { mode: "off", stackedPipeline: [] };
    if (ctx.header !== "default") {
      const fromHeader = headerToPlan(ctx.header, config, ctx);
      if (fromHeader) return fromHeader; // unknown => fall through
    }
  }

  // 2. routing-combo override
  const ov = ctx.comboId ? config?.comboOverrides?.[ctx.comboId] : undefined;
  if (ov) return modeToPlan(ov, config);

  // 3. active named combo
  if (config?.activeComboId && ctx.combos?.[config.activeComboId]) {
    return { mode: "stacked", stackedPipeline: ctx.combos[config.activeComboId] };
  }

  // 4. derived default
  return deriveDefaultPlan(config?.engines ?? {}, config?.enabled !== false);
}

function modeToPlan(mode: string, config: any): DerivedPlan {
  return mode === "stacked"
    ? { mode: "stacked", stackedPipeline: config?.stackedPipeline ?? [] }
    : { mode, stackedPipeline: [] };
}

function headerToPlan(h: string, config: any, ctx: ResolveCtx): DerivedPlan | null {
  if (h.startsWith("engine:")) {
    const id = h.slice(7);
    return config?.engines?.[id]?.enabled ? deriveDefaultPlan({ [id]: config.engines[id] }, true) : null;
  }
  if (ctx.combos?.[h]) return { mode: "stacked", stackedPipeline: ctx.combos[h] };
  return null;
}
