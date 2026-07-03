import { z } from "zod";
import { MAX_TIMER_TIMEOUT_MS } from "@/shared/utils/runtimeTimeouts";

const fusionTuningSchema = z
  .object({
    minPanel: z.coerce.number().int().min(1).max(50).optional(),
    stragglerGraceMs: z.coerce.number().int().min(0).max(300000).optional(),
    panelHardTimeoutMs: z.coerce.number().int().min(1000).max(MAX_TIMER_TIMEOUT_MS).optional(),
  })
  .strict();

export const comboRuntimeExtensionShape = {
  queueDepth: z.coerce.number().int().min(0).max(100).optional(),
  stickyRoundRobinLimit: z.coerce.number().int().min(0).max(1000).optional(),
  stickyWeightedLimit: z.coerce.number().int().min(0).max(1000).optional(),
  nestedComboMode: z.enum(["flatten", "execute"]).optional(),
  judgeModel: z.string().trim().min(1).max(200).optional(),
  fusionTuning: fusionTuningSchema.optional(),
  resetAwareEnabled: z.boolean().optional(),
};

export function promoteZeroLatencyConfig<T extends {
  zeroLatencyOptimizationsEnabled?: boolean;
  hedging?: boolean;
  fallbackCompressionMode?: string;
  predictiveTtftMs?: number;
}>(config: T): T {
  const hasEnabledSubfeature =
    config.hedging === true ||
    (config.fallbackCompressionMode !== undefined && config.fallbackCompressionMode !== "off") ||
    (typeof config.predictiveTtftMs === "number" && config.predictiveTtftMs > 0);

  return config.zeroLatencyOptimizationsEnabled !== true && hasEnabledSubfeature
    ? { ...config, zeroLatencyOptimizationsEnabled: true }
    : config;
}
