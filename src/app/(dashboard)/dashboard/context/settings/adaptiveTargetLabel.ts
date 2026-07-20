import { computeTarget } from "../../../../../../open-sse/services/compression/adaptiveCompression/computeTarget.ts";
import type { ContextBudgetConfig } from "../../../../../../open-sse/services/compression/adaptiveCompression/types.ts";

/**
 * Read-only label for the compression panel (design D-C1 transparency). Shows the active
 * policy and the computed token target for a representative model context window. PURE —
 * imports only the pure computeTarget leaf, no DB, no clock. The panel renders this string
 * as an informational/diagnostic line, mirroring the derived-pipeline preview.
 */
export function formatAdaptiveTarget(
  config: ContextBudgetConfig,
  representativeModelContextLimit: number
): string {
  if (config.mode === "off") return "Adaptive context budget: off (legacy auto-trigger)";
  const target = computeTarget(config.policy, representativeModelContextLimit, null, config);
  return `Adaptive (${config.mode}, policy: ${config.policy}) — target ≈ ${target.toLocaleString()} tokens (for a ${representativeModelContextLimit.toLocaleString()}-token window)`;
}
