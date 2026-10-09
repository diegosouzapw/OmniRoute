import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";
import type { ComboLike } from "@omniroute/open-sse/services/combo/types.ts";
import { resolveComboConfig } from "@omniroute/open-sse/services/comboConfig.ts";

type ComboStep = { kind?: string; comboName?: string };

function hasUnsupportedConfig(strategy: string, config: Record<string, unknown>): boolean {
  return (
    strategy === "fusion" ||
    strategy === "context-relay" ||
    (config.chaos as { enabled?: boolean } | undefined)?.enabled === true ||
    (config.shadowRouting as { enabled?: boolean } | undefined)?.enabled === true ||
    (config.zeroLatencyOptimizationsEnabled === true && config.hedging === true)
  );
}

function hasUnsupportedTargets(
  combo: ComboLike,
  strategy: string,
  config: Record<string, unknown>,
  allCombos: ComboLike[]
): boolean {
  const resolvedTargets = resolveComboTargets(combo, allCombos);
  if (resolvedTargets.length <= 1) return false;
  const pipeline =
    strategy === "pipeline" ||
    (strategy === "auto" && (config.pipeline_enabled === true || combo.name === "auto/smart"));
  return pipeline || resolvedTargets.some((target) => Boolean(target.connectionId?.trim()));
}

/** Whether a combo (or any nested combo-ref) uses a route managed leases cannot honour. */
export function isManagedComboUnsupported(
  combo: ComboLike,
  settings: Record<string, unknown>,
  allCombos: ComboLike[],
  visited = new Set<string>()
): boolean {
  if (visited.has(combo.name)) return false;
  visited.add(combo.name);
  const strategy = combo.strategy ?? "priority";
  const config = resolveComboConfig(combo, settings) as Record<string, unknown>;
  const nestedUnsafe = (combo.models as ComboStep[]).some((step) => {
    if (step?.kind !== "combo-ref" || !step.comboName) return false;
    const nested = allCombos.find((candidate) => candidate.name === step.comboName);
    return Boolean(nested && isManagedComboUnsupported(nested, settings, allCombos, visited));
  });
  return (
    hasUnsupportedConfig(strategy, config) ||
    hasUnsupportedTargets(combo, strategy, config, allCombos) ||
    nestedUnsafe
  );
}
