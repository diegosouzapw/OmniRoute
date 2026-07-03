import { getModelContextLimit } from "../../../src/lib/modelCapabilities";
import { parseModel } from "../model.ts";

function sortModelsByContextSize(models: string[]): string[] {
  const withContext = models.map((modelStr) => {
    return { modelStr, context: getModelContextLimitForModelString(modelStr) ?? 0 };
  });
  withContext.sort((a, b) => b.context - a.context);
  return withContext.map((e) => e.modelStr);
}

export function getModelContextLimitForModelString(modelStr: string) {
  const parsed = parseModel(modelStr);
  const provider = parsed.provider || parsed.providerAlias || "unknown";
  const model = parsed.model || modelStr;
  return getModelContextLimit(provider, model);
}

export function sortTargetsByContextSize<T extends { modelStr: string }>(targets: T[]): T[] {
  const hasKnownContext = targets.some(
    (target) => getModelContextLimitForModelString(target.modelStr) != null
  );
  if (!hasKnownContext) return targets;

  const orderedModels = sortModelsByContextSize(targets.map((target) => target.modelStr));
  const byModel = new Map<string, T[]>();
  for (const target of targets) {
    const queue = byModel.get(target.modelStr) || [];
    queue.push(target);
    byModel.set(target.modelStr, queue);
  }
  return orderedModels
    .map((modelStr) => {
      const queue = byModel.get(modelStr);
      return queue?.shift() || null;
    })
    .filter((target): target is T => target !== null);
}
