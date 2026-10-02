import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";
import type { ComboLike } from "@omniroute/open-sse/services/combo/types.ts";
import { resolveComboConfig } from "@omniroute/open-sse/services/comboConfig.ts";

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
  const resolvedTargets = resolveComboTargets(combo, allCombos);
  const pipeline =
    strategy === "pipeline" ||
    (strategy === "auto" && (config.pipeline_enabled === true || combo.name === "auto/smart"));
  const nestedUnsafe = (combo.models as Array<{ kind?: string; comboName?: string }>).some(
    (step) => {
      if (step?.kind !== "combo-ref" || !step.comboName) return false;
      const nested = allCombos.find((candidate) => candidate.name === step.comboName);
      return Boolean(nested && isManagedComboUnsupported(nested, settings, allCombos, visited));
    }
  );
  return (
    strategy === "fusion" ||
    strategy === "context-relay" ||
    (config.chaos as { enabled?: boolean } | undefined)?.enabled === true ||
    (config.shadowRouting as { enabled?: boolean } | undefined)?.enabled === true ||
    (config.zeroLatencyOptimizationsEnabled === true && config.hedging === true) ||
    (resolvedTargets.length > 1 &&
      (pipeline || resolvedTargets.some((target) => Boolean(target.connectionId?.trim())))) ||
    nestedUnsafe
  );
}
