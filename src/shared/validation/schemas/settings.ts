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
import { HIDEABLE_SIDEBAR_GROUP_IDS } from "@/shared/constants/sidebarGroupVisibility";
import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "@/shared/constants/upstreamHeaders";
import { MAX_TIMER_TIMEOUT_MS } from "@/shared/utils/runtimeTimeouts";


// ──── Settings Schemas ────
// FASE-01: Removed .passthrough() — only explicitly listed fields are accepted

export const settingsFallbackStrategySchema = z.enum(ACCOUNT_FALLBACK_STRATEGY_VALUES);

export const updateSettingsSchema = z.object({
  newPassword: z.string().min(1).max(200).optional(),
  currentPassword: z.string().max(200).optional(),
  theme: z.string().max(50).optional(),
  language: z.string().max(10).optional(),
  requireLogin: z.boolean().optional(),
  enableSocks5Proxy: z.boolean().optional(),
  instanceName: z.string().max(100).optional(),
  corsOrigins: z.string().max(500).optional(),
  cloudUrl: z.string().max(500).optional(),
  baseUrl: z.string().max(500).optional(),
  setupComplete: z.boolean().optional(),
  blockedProviders: z.array(z.string().max(100)).optional(),
  hideHealthCheckLogs: z.boolean().optional(),
  hideEndpointCloudflaredTunnel: z.boolean().optional(),
  hideEndpointTailscaleFunnel: z.boolean().optional(),
  hideEndpointNgrokTunnel: z.boolean().optional(),
  pinProviderQuotaToHome: z.boolean().optional(),
  showQuickStartOnHome: z.boolean().optional(),
  showProviderTopologyOnHome: z.boolean().optional(),
  showTokenSaverOnEndpoint: z.boolean().optional(),
  bruteForceProtection: z.boolean().optional(),
  hiddenSidebarItems: z.array(z.enum(HIDEABLE_SIDEBAR_ITEM_IDS)).optional(),
  hiddenSidebarGroupLabels: z.array(z.enum(HIDEABLE_SIDEBAR_GROUP_IDS)).optional(),
  comboConfigMode: z.enum(COMBO_CONFIG_MODES).optional(),
  codexServiceTier: z
    .object({
      enabled: z.boolean().optional(),
      tier: z.enum(["default", "priority", "flex"]).optional(),
      supportedModels: z.array(z.string().max(200)).max(200).optional(),
    })
    .optional(),
  codexSessionAffinityTtlMs: z.number().int().min(0).max(86_400_000).optional(),
  // Routing settings (#134)
  fallbackStrategy: settingsFallbackStrategySchema.optional(),
  wildcardAliases: z.array(z.object({ pattern: z.string(), target: z.string() })).optional(),
  stickyRoundRobinLimit: z.number().int().min(0).max(1000).optional(),
  requestRetry: z.number().int().min(0).max(10).optional(),
  maxRetryIntervalSec: z.number().int().min(0).max(300).optional(),
  maxBodySizeMb: z
    .number()
    .int()
    .min(MIN_REQUEST_BODY_LIMIT_MB)
    .max(MAX_REQUEST_BODY_LIMIT_MB)
    .optional(),
  // Auto intent classifier settings (multilingual routing)
  intentDetectionEnabled: z.boolean().optional(),
  intentSimpleMaxWords: z.number().int().min(1).max(500).optional(),
  intentExtraCodeKeywords: z.array(z.string().max(100)).optional(),
  intentExtraReasoningKeywords: z.array(z.string().max(100)).optional(),
  intentExtraSimpleKeywords: z.array(z.string().max(100)).optional(),
  // Protocol toggles (default: disabled)
  mcpEnabled: z.boolean().optional(),
  a2aEnabled: z.boolean().optional(),
  wsAuth: z.boolean().optional(),

  // Qdrant integration
  qdrantEnabled: z.boolean().optional(),
  qdrantHost: z.string().max(500).optional(),
  qdrantPort: z.number().int().min(1).max(65535).optional(),
  qdrantApiKey: z.string().max(500).optional(),
  qdrantCollection: z.string().max(200).optional(),
  qdrantEmbeddingModel: z.string().max(200).optional(),
});

export const legacyResilienceProfileSchema = z.object({
  transientCooldown: z.number().min(0),
  rateLimitCooldown: z.number().min(0),
  maxBackoffLevel: z.number().int().min(0),
  circuitBreakerThreshold: z.number().int().min(0),
  circuitBreakerReset: z.number().min(0),
});

export const legacyResilienceDefaultsSchema = z
  .object({
    requestsPerMinute: z.number().int().min(1).optional(),
    minTimeBetweenRequests: z.number().int().min(0).optional(),
    concurrentRequests: z.number().int().min(1).optional(),
  })
  .strict();

export const requestQueueSettingsSchema = z
  .object({
    autoEnableApiKeyProviders: z.boolean().optional(),
    requestsPerMinute: z.number().int().min(1).optional(),
    minTimeBetweenRequestsMs: z.number().int().min(0).optional(),
    concurrentRequests: z.number().int().min(1).optional(),
    maxWaitMs: z.number().int().min(1).optional(),
  })
  .strict();

export const connectionCooldownProfileSchema = z
  .object({
    baseCooldownMs: z.number().int().min(0).optional(),
    useUpstreamRetryHints: z.boolean().optional(),
    // Issue #2100 follow-up: per-profile toggle for upstream 429 hint trust.
    // `null` is an explicit unset sentinel — PATCH handler deletes the key
    // from stored settings so the per-provider default resolves at runtime.
    // `undefined` (key omitted) means "leave existing value unchanged".
    useUpstream429BreakerHints: z.boolean().nullable().optional(),
    maxBackoffSteps: z.number().int().min(0).optional(),
  })
  .strict();

export const providerBreakerProfileSchema = z
  .object({
    failureThreshold: z.number().int().min(1).max(1000).optional(),
    degradationThreshold: z.number().int().min(1).max(1000).optional(),
    resetTimeoutMs: z.number().int().min(1000).optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      typeof value.failureThreshold === "number" &&
      value.failureThreshold > 1 &&
      typeof value.degradationThreshold === "number" &&
      value.degradationThreshold >= value.failureThreshold
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "degradationThreshold must be lower than failureThreshold",
        path: ["degradationThreshold"],
      });
    }
  });

export const waitForCooldownSettingsSchema = z
  .object({
    enabled: z.boolean().optional(),
    maxRetries: z.number().int().min(0).max(10).optional(),
    maxRetryWaitSec: z.number().int().min(0).max(300).optional(),
  })
  .strict();

export const providerCooldownSettingsSchema = z
  .object({
    enabled: z.boolean().optional(),
    minRetryCooldownMs: z.number().int().min(0).max(300000).optional(),
    maxRetryCooldownMs: z.number().int().min(0).max(3600000).optional(),
  })
  .strict();

export const updateResilienceSchema = z
  .object({
    requestQueue: requestQueueSettingsSchema.optional(),
    connectionCooldown: z
      .object({
        oauth: connectionCooldownProfileSchema.optional(),
        apikey: connectionCooldownProfileSchema.optional(),
      })
      .strict()
      .optional(),
    providerBreaker: z
      .object({
        oauth: providerBreakerProfileSchema.optional(),
        apikey: providerBreakerProfileSchema.optional(),
      })
      .strict()
      .optional(),
    waitForCooldown: waitForCooldownSettingsSchema.optional(),
    providerCooldown: providerCooldownSettingsSchema.optional(),
    profiles: z
      .object({
        oauth: legacyResilienceProfileSchema.optional(),
        apikey: legacyResilienceProfileSchema.optional(),
      })
      .strict()
      .optional(),
    defaults: legacyResilienceDefaultsSchema.optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      !value.requestQueue &&
      !value.connectionCooldown &&
      !value.providerBreaker &&
      !value.waitForCooldown &&
      !value.providerCooldown &&
      !value.profiles &&
      !value.defaults
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must provide resilience settings to update",
        path: [],
      });
    }
  });

export const updateRequireLoginSchema = z
  .object({
    requireLogin: z.boolean().optional(),
    password: z.string().min(4, "Password must be at least 4 characters").optional(),
  })
  .superRefine((value, ctx) => {
    if (value.requireLogin === undefined && !value.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const updateSystemPromptSchema = z
  .object({
    prompt: z.string().max(50000).optional(), // legacy compat
    prefixPrompt: z.string().max(50000).optional(),
    suffixPrompt: z.string().max(50000).optional(),
    enabled: z.boolean().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.prompt === undefined &&
      value.prefixPrompt === undefined &&
      value.suffixPrompt === undefined &&
      value.enabled === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const updateThinkingBudgetSchema = z
  .object({
    mode: z.enum(["passthrough", "auto", "custom", "adaptive"]).optional(),
    customBudget: z.coerce.number().int().min(0).max(131072).optional(),
    effortLevel: z.enum(["none", "low", "medium", "high", "xhigh", "max"]).optional(),
    baseBudget: z.coerce.number().int().min(0).max(131072).optional(),
    complexityMultiplier: z.coerce.number().min(0).optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.mode === undefined &&
      value.customBudget === undefined &&
      value.effortLevel === undefined &&
      value.baseBudget === undefined &&
      value.complexityMultiplier === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const guideSettingsSaveSchema = z
  .object({
    baseUrl: z.string().trim().min(1).optional(),
    // #3552: the CLI tool cards post `apiKey: null` in cloud mode (the real key is resolved
    // server-side from keyId), and `z.string().optional()` rejected null → 400. Normalize
    // null → undefined so validation passes and the keyId/default path is used.
    apiKey: z.preprocess((v) => (v === null ? undefined : v), z.string().optional()),
    model: z.string().trim().min(1, "Model is required").optional(),
    models: z.array(z.string().trim().min(1, "Models must be non-empty")).min(1).optional(),
    modelLabels: z.record(z.string(), z.string().trim().min(1)).optional(),
  })
  .refine((data) => !!data.model || !!data.models?.length, {
    message: "Model is required",
    path: ["model"],
  });

// ─── Auto-disable banned/error accounts ───────────────────────────────────
export const updateAutoDisableAccountsSchema = z
  .object({
    enabled: z.boolean(),
    threshold: z.number().int().min(1).max(10).optional(),
  })
  .strict();