// Capability-based filtering for routing candidates.
// Ensures only models with required capabilities (tools, vision) are selected.

import type { ResolvedComboTarget } from "./types.ts";
import { REGISTRY } from "../../config/providerRegistry.ts";

interface RequestCapabilities {
  tools?: boolean;
  vision?: boolean;
}

/**
 * Filters targets by required capabilities.
 * @param targets - Candidate targets.
 * @param capabilities - Required capabilities (tools, vision).
 * @returns Filtered targets with compatible models.
 */
export function filterTargetsByCapabilities(
  targets: ResolvedComboTarget[],
  capabilities: RequestCapabilities
): ResolvedComboTarget[] {
  return targets.filter((target) => {
    const provider = REGISTRY[target.provider];
    if (!provider) return false;

    const model = provider.models.find((m) => m.id === target.model);
    if (!model) return false;

    // Check toolCalling capability
    if (capabilities.tools && !model.toolCalling) {
      return false;
    }

    // Check vision capability
    if (capabilities.vision && !model.vision) {
      return false;
    }

    return true;
  });
}
