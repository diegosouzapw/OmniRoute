import { z } from "zod";
import {
  ACCOUNT_FALLBACK_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { SUPPORTED_BATCH_ENDPOINTS } from "@/shared/constants/batchEndpoints";
import { MAX_REQUEST_BODY_LIMIT_MB, MIN_REQUEST_BODY_LIMIT_MB } from "@/shared/constants/bodySize";
import { COMBO_CONFIG_MODES } from "@/shared/constants/comboConfigMode";
import { providerAllowsOptionalApiKey } from "@/shared/constants/providers";
import { HIDEABLE_SIDEBAR_ITEM_IDS } from "@/shared/constants/sidebarVisibility";
import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "@/shared/constants/upstreamHeaders";
import { MAX_TIMER_TIMEOUT_MS } from "@/shared/utils/runtimeTimeouts";


// ──── Combo Schemas ────

export const comboStepMetaSchema = {
  id: z.string().trim().min(1).max(200).optional(),
  weight: z.number().min(0).max(100).optional().default(0),
  label: z.string().trim().min(1).max(200).optional(),
};

export const comboModelStepInputSchema = z.object({
  kind: z.literal("model").optional(),
  provider: z.string().trim().min(1).max(120).optional(),
  providerId: z.string().trim().min(1).max(120).optional(),
  model: z.string().trim().min(1).max(300),
  connectionId: z.string().trim().min(1).max(200).nullable().optional(),
  tags: z.array(z.string().trim().min(1).max(100)).max(20).optional(),
  ...comboStepMetaSchema,
});

export const comboRefStepInputSchema = z.object({
  kind: z.literal("combo-ref"),
  comboName: z.string().trim().min(1).max(100),
  ...comboStepMetaSchema,
});

// A combo entry can be a plain string (legacy), a legacy object, or a structured ComboStep.
export const comboModelEntry = z.union([
  z.string().trim().min(1).max(300),
  comboModelStepInputSchema,
  comboRefStepInputSchema,
]);

export const shadowRoutingSchema = z
  .object({
    enabled: z.boolean().optional(),
    targets: z.array(comboModelEntry).max(20).optional(),
    sampleRate: z.coerce.number().min(0).max(1).optional(),
    maxTargets: z.coerce.number().int().min(1).max(10).optional(),
    timeoutMs: z.coerce.number().int().min(1000).max(120000).optional(),
  })
  .strict();

export const evalRoutingSchema = z
  .object({
    enabled: z.boolean().optional(),
    suiteIds: z.array(z.string().trim().min(1).max(200)).max(50).optional(),
    maxAgeHours: z.coerce.number().min(1).max(8760).optional(),
    minCases: z.coerce.number().int().min(1).max(100000).optional(),
    qualityWeight: z.coerce.number().min(0).max(1).optional(),
    latencyWeight: z.coerce.number().min(0).max(1).optional(),
    cacheTtlMs: z.coerce.number().int().min(1000).max(300000).optional(),
  })
  .strict();

export const comboStrategySchema = z.enum(ROUTING_STRATEGY_VALUES);

export const scoringWeightsSchema = z
  .object({
    quota: z.number().min(0).max(1),
    health: z.number().min(0).max(1),
    costInv: z.number().min(0).max(1),
    latencyInv: z.number().min(0).max(1),
    taskFit: z.number().min(0).max(1),
    stability: z.number().min(0).max(1),
    tierPriority: z.number().min(0).max(1).optional().default(0.05),
    tierAffinity: z.number().min(0).max(1).optional().default(0.05),
    specificityMatch: z.number().min(0).max(1).optional().default(0.05),
    contextAffinity: z.number().min(0).max(1).optional().default(0.08),
    resetWindowAffinity: z.number().min(0).max(1).optional().default(0),
  })
  .optional();

export const compositeTierEntrySchema = z
  .object({
    stepId: z.string().trim().min(1).max(200),
    fallbackTier: z.string().trim().min(1).max(100).optional(),
    label: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().min(1).max(500).optional(),
  })
  .strict();

export const compositeTiersSchema = z
  .object({
    defaultTier: z.string().trim().min(1).max(100),
    tiers: z.record(z.string().trim().min(1).max(100), compositeTierEntrySchema),
  })
  .strict();

export const compressionModeSchema = z.enum([
  "off",
  "lite",
  "standard",
  "aggressive",
  "ultra",
  "rtk",
  "stacked",
]);

export const comboCompressionOverrideSchema = z.union([z.literal(""), compressionModeSchema]);

export const slaRoutingPolicySchema = z
  .object({
    targetP95Ms: z.coerce.number().int().positive().max(300000).optional(),
    maxErrorRate: z.coerce.number().min(0).max(1).optional(),
    maxCostPer1MTokens: z.coerce.number().positive().max(1000000).optional(),
    hardConstraints: z.boolean().optional(),
  })
  .strict();

export const comboRuntimeConfigSchema = z
  .object({
    strategy: comboStrategySchema.optional(),
    maxRetries: z.coerce.number().int().min(0).max(10).optional(),
    retryDelayMs: z.coerce.number().int().min(0).max(60000).optional(),
    fallbackDelayMs: z.coerce.number().int().min(0).max(60000).optional(),
    timeoutMs: z.coerce.number().int().min(1000).optional(),
    targetTimeoutMs: z.coerce.number().int().min(0).max(MAX_TIMER_TIMEOUT_MS).optional(),
    concurrencyPerModel: z.coerce.number().int().min(1).max(20).optional(),
    queueTimeoutMs: z.coerce.number().int().min(1000).max(120000).optional(),
    // #3872: pre-cascade semaphore queue depth (round-robin). 0 = fail over immediately.
    queueDepth: z.coerce.number().int().min(0).max(100).optional(),
    healthCheckEnabled: z.boolean().optional(),
    healthCheckTimeoutMs: z.coerce.number().int().min(100).max(30000).optional(),
    handoffThreshold: z.coerce.number().min(0.5).max(0.94).optional(),
    handoffModel: z.string().trim().max(200).optional(),
    handoffProviders: z.array(z.string().trim().min(1).max(100)).max(10).optional(),
    maxMessagesForSummary: z.coerce.number().int().min(5).max(100).optional(),
    maxComboDepth: z.coerce.number().int().min(1).max(10).optional(),
    trackMetrics: z.boolean().optional(),
    reasoningTokenBufferEnabled: z.boolean().optional(),
    compressionMode: compressionModeSchema.optional(),
    failoverBeforeRetry: z.boolean().optional(),
    maxSetRetries: z.coerce.number().int().min(0).max(10).optional(),
    setRetryDelayMs: z.coerce.number().int().min(0).max(60000).optional(),
    zeroLatencyOptimizationsEnabled: z.boolean().optional(),
    hedging: z.boolean().optional(),
    hedgeDelayMs: z.coerce.number().int().min(0).max(60000).optional(),
    fallbackCompressionMode: compressionModeSchema.optional(),
    fallbackCompressionThreshold: z.coerce.number().int().min(0).max(2_000_000).optional(),
    predictiveTtftMs: z.coerce.number().int().min(0).max(300000).optional(),
    // Auto-Combo / LKGP Extensions
    candidatePool: z.array(z.string().min(1)).optional(),
    weights: scoringWeightsSchema.optional(),
    modePack: z.string().max(100).optional(),
    budgetCap: z.number().positive().optional(),
    explorationRate: z.number().min(0).max(1).optional(),
    routerStrategy: z.string().optional(),
    slaTargetP95Ms: z.coerce.number().int().positive().max(300000).optional(),
    slaMaxErrorRate: z.coerce.number().min(0).max(1).optional(),
    slaMaxCostPer1MTokens: z.coerce.number().positive().max(1000000).optional(),
    slaHardConstraints: z.boolean().optional(),
    sla: slaRoutingPolicySchema.optional(),
    compositeTiers: compositeTiersSchema.optional(),
    resetAwareSessionWeight: z.coerce.number().min(0).max(100).optional(),
    resetAwareWeeklyWeight: z.coerce.number().min(0).max(100).optional(),
    resetAwareTieBandPercent: z.coerce.number().min(0).max(100).optional(),
    resetAwareExhaustionGuardPercent: z.coerce.number().min(0).max(100).optional(),
    resetAwareQuotaCacheTtlMs: z.coerce.number().int().min(0).max(300_000).optional(),
    resetAwareQuotaCacheMaxStaleMs: z.coerce.number().int().min(0).max(3_600_000).optional(),
    resetWindowWindows: z.array(z.enum(["weekly", "session", "monthly"])).optional(),
    resetWindowIncludeSession: z.boolean().optional(),
    resetWindowTieBandMs: z.coerce.number().int().min(0).max(86_400_000).optional(),
    resetWindowQuotaCacheTtlMs: z.coerce.number().int().min(0).max(300_000).optional(),
    resetWindowQuotaCacheMaxStaleMs: z.coerce.number().int().min(0).max(3_600_000).optional(),
    shadowRouting: shadowRoutingSchema.optional(),
    evalRouting: evalRoutingSchema.optional(),
  })
  .strict()
  .superRefine((config, ctx) => {
    if (config.zeroLatencyOptimizationsEnabled === true) return;

    const addZeroLatencyIssue = (path: string[]) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "zeroLatencyOptimizationsEnabled must be true to enable zero-latency combo features",
        path,
      });
    };

    if (config.hedging === true) {
      addZeroLatencyIssue(["hedging"]);
    }
    if (typeof config.predictiveTtftMs === "number" && config.predictiveTtftMs > 0) {
      addZeroLatencyIssue(["predictiveTtftMs"]);
    }
    if (config.fallbackCompressionMode && config.fallbackCompressionMode !== "off") {
      addZeroLatencyIssue(["fallbackCompressionMode"]);
    }
  });

export const comboNameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(100)
  .regex(
    /^[a-zA-Z0-9_/.\-\[\] ]+$/,
    "Name can only contain letters, numbers, spaces, -, _, /, ., [ and ]."
  );

export const createComboSchema = z.object({
  name: comboNameSchema,
  models: z.array(comboModelEntry).optional().default([]),
  strategy: comboStrategySchema.optional().default("priority"),
  config: comboRuntimeConfigSchema.optional(),
  allowedProviders: z.array(z.string().max(200)).optional(),
  system_message: z.string().max(50000).optional(),
  tool_filter_regex: z.string().max(1000).optional(),
  context_cache_protection: z.boolean().optional(),
  context_length: z.number().int().min(1000).max(2000000).optional(),
});

export const updateComboDefaultsSchema = z
  .object({
    comboDefaults: comboRuntimeConfigSchema.optional(),
    providerOverrides: z.record(z.string().trim().min(1), comboRuntimeConfigSchema).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.comboDefaults && !value.providerOverrides) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nothing to update",
        path: [],
      });
    }

    if (value.comboDefaults?.compositeTiers) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "compositeTiers is only supported on concrete combos",
        path: ["comboDefaults", "compositeTiers"],
      });
    }

    for (const [providerId, config] of Object.entries(value.providerOverrides || {})) {
      if (config?.compositeTiers) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "compositeTiers is only supported on concrete combos",
          path: ["providerOverrides", providerId, "compositeTiers"],
        });
      }
    }
  });

export const updateComboSchema = z
  .object({
    name: comboNameSchema.optional(),
    models: z.array(comboModelEntry).optional(),
    strategy: comboStrategySchema.optional(),
    config: comboRuntimeConfigSchema.optional(),
    isActive: z.boolean().optional(),
    allowedProviders: z.array(z.string().max(200)).optional(),
    system_message: z.string().max(50000).optional(),
    tool_filter_regex: z.string().max(1000).optional(),
    context_cache_protection: z.boolean().optional(),
    context_length: z.number().int().min(1000).max(2000000).optional().nullable(),
    compressionOverride: comboCompressionOverrideSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (
      value.name === undefined &&
      value.models === undefined &&
      value.strategy === undefined &&
      value.config === undefined &&
      value.isActive === undefined &&
      value.allowedProviders === undefined &&
      value.system_message === undefined &&
      value.tool_filter_regex === undefined &&
      value.context_cache_protection === undefined &&
      value.context_length === undefined &&
      value.compressionOverride === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const reorderCombosSchema = z
  .object({
    comboIds: z.array(z.string().trim().min(1).max(200)).min(1).max(1000),
  })
  .superRefine((value, ctx) => {
    if (new Set(value.comboIds).size !== value.comboIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "comboIds must be unique",
        path: ["comboIds"],
      });
    }
  });

export const testComboSchema = z.object({
  comboName: z.string().trim().min(1, "comboName is required"),
});