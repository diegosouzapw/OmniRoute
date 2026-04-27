import { z } from "zod";
import { SUPPORTED_BATCH_ENDPOINTS } from "@/shared/constants/batchEndpoints";
import { COMBO_CONFIG_MODES } from "@/shared/constants/comboConfigMode";
import { isLocalProvider } from "@/shared/constants/providers";
import { HIDEABLE_SIDEBAR_ITEM_IDS } from "@/shared/constants/sidebarVisibility";
import { isForbiddenUpstreamHeaderName } from "@/shared/constants/upstreamHeaders";

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const CODEX_REASONING_EFFORT_VALUES = new Set(["none", "low", "medium", "high", "xhigh"]);
const REQUEST_DEFAULT_SERVICE_TIER_VALUES = new Set(["priority", "fast"]);

function validateProviderSpecificData(
  data: Record<string, unknown> | undefined,
  ctx: z.RefinementCtx
): void {
  if (!data) return;

  const baseUrl = data.baseUrl;
  if (baseUrl !== undefined && (typeof baseUrl !== "string" || !isHttpUrl(baseUrl))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.baseUrl must be a valid http(s) URL",
      path: ["baseUrl"],
    });
  }

  const customUserAgent = data.customUserAgent;
  if (
    customUserAgent !== undefined &&
    customUserAgent !== null &&
    (typeof customUserAgent !== "string" || customUserAgent.length > 500)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.customUserAgent must be a string up to 500 chars",
      path: ["customUserAgent"],
    });
  }

  const cx = data.cx;
  if (cx !== undefined && cx !== null && (typeof cx !== "string" || cx.length > 500)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.cx must be a string up to 500 chars",
      path: ["cx"],
    });
  }

  const openaiStoreEnabled = data.openaiStoreEnabled;
  if (openaiStoreEnabled !== undefined && typeof openaiStoreEnabled !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.openaiStoreEnabled must be a boolean",
      path: ["openaiStoreEnabled"],
    });
  }

  const blockExtraUsage = data.blockExtraUsage;
  if (blockExtraUsage !== undefined && typeof blockExtraUsage !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.blockExtraUsage must be a boolean",
      path: ["blockExtraUsage"],
    });
  }

  const autoFetchModels = data.autoFetchModels;
  if (autoFetchModels !== undefined && typeof autoFetchModels !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.autoFetchModels must be a boolean",
      path: ["autoFetchModels"],
    });
  }

  const requestDefaults = data.requestDefaults;
  if (requestDefaults !== undefined) {
    if (!requestDefaults || typeof requestDefaults !== "object" || Array.isArray(requestDefaults)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.requestDefaults must be an object",
        path: ["requestDefaults"],
      });
    } else {
      const requestDefaultsRecord = requestDefaults as Record<string, unknown>;
      const reasoningEffort = requestDefaultsRecord.reasoningEffort;
      if (
        reasoningEffort !== undefined &&
        reasoningEffort !== null &&
        (typeof reasoningEffort !== "string" ||
          !CODEX_REASONING_EFFORT_VALUES.has(reasoningEffort.trim().toLowerCase()))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "providerSpecificData.requestDefaults.reasoningEffort must be one of none, low, medium, high, xhigh",
          path: ["requestDefaults", "reasoningEffort"],
        });
      }

      const serviceTier = requestDefaultsRecord.serviceTier;
      if (
        serviceTier !== undefined &&
        serviceTier !== null &&
        (typeof serviceTier !== "string" ||
          !REQUEST_DEFAULT_SERVICE_TIER_VALUES.has(serviceTier.trim().toLowerCase()))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "providerSpecificData.requestDefaults.serviceTier must be priority when provided",
          path: ["requestDefaults", "serviceTier"],
        });
      }

      const context1m = requestDefaultsRecord.context1m;
      if (context1m !== undefined && context1m !== null && typeof context1m !== "boolean") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "providerSpecificData.requestDefaults.context1m must be a boolean",
          path: ["requestDefaults", "context1m"],
        });
      }
    }
  }

  // [Oracle CONDITIONAL] consoleApiKey는 bailian-coding-plan 전용 필드.
  // 다른 프로바이더 공통 규약으로 재사용하지 않는다.
  const consoleApiKey = data.consoleApiKey;
  if (consoleApiKey !== undefined && consoleApiKey !== null && typeof consoleApiKey !== "string") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.consoleApiKey must be a string",
      path: ["consoleApiKey"],
    });
  }
  if (typeof consoleApiKey === "string" && consoleApiKey.length > 10000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.consoleApiKey must be at most 10000 characters",
      path: ["consoleApiKey"],
    });
  }

  const groupTag = data.tag;
  if (
    groupTag !== undefined &&
    groupTag !== null &&
    (typeof groupTag !== "string" || groupTag.length > 100)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.tag must be a string up to 100 chars",
      path: ["tag"],
    });
  }

  const routingTags = data.tags;
  if (routingTags !== undefined && routingTags !== null) {
    if (!Array.isArray(routingTags) || routingTags.length > 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.tags must be an array with at most 50 items",
        path: ["tags"],
      });
    } else if (
      routingTags.some(
        (tag) => typeof tag !== "string" || tag.trim().length === 0 || tag.trim().length > 64
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "providerSpecificData.tags must contain non-empty strings up to 64 characters each",
        path: ["tags"],
      });
    }
  }

  const excludedModels = data.excludedModels ?? data.excluded_models;
  if (excludedModels !== undefined && excludedModels !== null) {
    if (typeof excludedModels === "string") {
      if (excludedModels.length > 5000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "providerSpecificData.excludedModels string must be up to 5000 chars",
          path: ["excludedModels"],
        });
      }
    } else if (!Array.isArray(excludedModels) || excludedModels.length > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.excludedModels must be an array with at most 100 items",
        path: ["excludedModels"],
      });
    } else if (
      excludedModels.some(
        (pattern) =>
          typeof pattern !== "string" ||
          pattern.trim().length === 0 ||
          pattern.trim().length > 200 ||
          pattern.trim() === "**"
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "providerSpecificData.excludedModels must contain non-empty patterns up to 200 characters",
        path: ["excludedModels"],
      });
    }
  }
}

// Re-export validation helpers from dedicated module to avoid webpack barrel-file
// optimization bug that truncates exports from large files.
export { validateBody, isValidationFailure } from "./helpers";
export type { ValidationResult } from "./helpers";

// ──── Provider Schemas ────

export const createProviderSchema = z
  .object({
    provider: z.string().min(1).max(100),
    apiKey: z.string().max(10000).optional(),
    name: z.string().min(1).max(200),
    priority: z.number().int().min(1).max(100).optional(),
    globalPriority: z.number().int().min(1).max(100).nullable().optional(),
    defaultModel: z.string().max(200).nullable().optional(),
    testStatus: z.string().max(50).optional(),
    providerSpecificData: z
      .record(z.string(), z.unknown())
      .optional()
      .superRefine((data, ctx) => {
        validateProviderSpecificData(data, ctx);
      }),
  })
  .superRefine((data, ctx) => {
    const apiKey = typeof data.apiKey === "string" ? data.apiKey.trim() : "";
    const apiKeyOptional =
      data.provider === "searxng-search" ||
      data.provider === "petals" ||
      isLocalProvider(data.provider);
    if (!apiKeyOptional && apiKey.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "API key is required",
        path: ["apiKey"],
      });
    }

    const cx =
      data.providerSpecificData && typeof data.providerSpecificData === "object"
        ? (data.providerSpecificData as Record<string, unknown>).cx
        : undefined;
    if (
      data.provider === "google-pse-search" &&
      (typeof cx !== "string" || cx.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Programmable Search Engine ID (cx) is required",
        path: ["providerSpecificData", "cx"],
      });
    }
  });

// ──── API Key Schemas ────

export const createKeySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  noLog: z.boolean().optional(),
});

export const createSyncTokenSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
});

// ──── Combo Schemas ────

const comboStepMetaSchema = {
  id: z.string().trim().min(1).max(200).optional(),
  weight: z.number().min(0).max(100).optional().default(0),
  label: z.string().trim().min(1).max(200).optional(),
};

const comboModelStepInputSchema = z.object({
  kind: z.literal("model").optional(),
  provider: z.string().trim().min(1).max(120).optional(),
  providerId: z.string().trim().min(1).max(120).optional(),
  model: z.string().trim().min(1).max(300),
  connectionId: z.string().trim().min(1).max(200).nullable().optional(),
  tags: z.array(z.string().trim().min(1).max(100)).max(20).optional(),
  ...comboStepMetaSchema,
});

const comboRefStepInputSchema = z.object({
  kind: z.literal("combo-ref"),
  comboName: z.string().trim().min(1).max(100),
  ...comboStepMetaSchema,
});

// A combo entry can be a plain string (legacy), a legacy object, or a structured ComboStep.
const comboModelEntry = z.union([
  z.string().trim().min(1).max(300),
  comboModelStepInputSchema,
  comboRefStepInputSchema,
]);

export const comboStrategySchema = z.enum([
  "priority",
  "weighted",
  "round-robin",
  "context-relay",
  "random",
  "least-used",
  "cost-optimized",
  "strict-random",
  "auto",
  "fill-first",
  // #729 schema fixes for combo edit/save
  "p2c",
  "lkgp",
  "context-optimized",
]);

const scoringWeightsSchema = z
  .object({
    quota: z.number().min(0).max(1),
    health: z.number().min(0).max(1),
    costInv: z.number().min(0).max(1),
    latencyInv: z.number().min(0).max(1),
    taskFit: z.number().min(0).max(1),
    stability: z.number().min(0).max(1),
    tierPriority: z.number().min(0).max(1).optional().default(0.05),
  })
  .optional();

const compositeTierEntrySchema = z
  .object({
    stepId: z.string().trim().min(1).max(200),
    fallbackTier: z.string().trim().min(1).max(100).optional(),
    label: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().min(1).max(500).optional(),
  })
  .strict();

const compositeTiersSchema = z
  .object({
    defaultTier: z.string().trim().min(1).max(100),
    tiers: z.record(z.string().trim().min(1).max(100), compositeTierEntrySchema),
  })
  .strict();

const comboRuntimeConfigSchema = z
  .object({
    strategy: comboStrategySchema.optional(),
    maxRetries: z.coerce.number().int().min(0).max(10).optional(),
    retryDelayMs: z.coerce.number().int().min(0).max(60000).optional(),
    timeoutMs: z.coerce.number().int().min(1000).optional(),
    concurrencyPerModel: z.coerce.number().int().min(1).max(20).optional(),
    queueTimeoutMs: z.coerce.number().int().min(1000).max(120000).optional(),
    healthCheckEnabled: z.boolean().optional(),
    healthCheckTimeoutMs: z.coerce.number().int().min(100).max(30000).optional(),
    handoffThreshold: z.coerce.number().min(0.5).max(0.94).optional(),
    handoffModel: z.string().trim().max(200).optional(),
    handoffProviders: z.array(z.string().trim().min(1).max(100)).max(10).optional(),
    maxMessagesForSummary: z.coerce.number().int().min(5).max(100).optional(),
    maxComboDepth: z.coerce.number().int().min(1).max(10).optional(),
    trackMetrics: z.boolean().optional(),
    // Auto-Combo / LKGP Extensions
    candidatePool: z.array(z.string().min(1)).optional(),
    weights: scoringWeightsSchema.optional(),
    modePack: z.string().max(100).optional(),
    budgetCap: z.number().positive().optional(),
    explorationRate: z.number().min(0).max(1).optional(),
    routerStrategy: z.string().optional(),
    compositeTiers: compositeTiersSchema.optional(),
  })
  .strict();

export const createComboSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .regex(/^[a-zA-Z0-9_/.-]+$/, "Name can only contain letters, numbers, -, _, / and ."),
  models: z.array(comboModelEntry).optional().default([]),
  strategy: comboStrategySchema.optional().default("priority"),
  config: comboRuntimeConfigSchema.optional(),
  allowedProviders: z.array(z.string().max(200)).optional(),
  system_message: z.string().max(50000).optional(),
  tool_filter_regex: z.string().max(1000).optional(),
  context_cache_protection: z.boolean().optional(),
  context_length: z.number().int().min(1000).max(2000000).optional(),
});

// ──── Settings Schemas ────
// FASE-01: Removed .passthrough() — only explicitly listed fields are accepted

const settingsFallbackStrategySchema = z.enum([
  "priority",
  "weighted",
  "round-robin",
  "context-relay",
  "fill-first",
  "p2c",
  "random",
  "least-used",
  "cost-optimized",
  "strict-random",
  "auto",
  "context-optimized",
  "lkgp",
]);

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
  bruteForceProtection: z.boolean().optional(),
  hiddenSidebarItems: z.array(z.enum(HIDEABLE_SIDEBAR_ITEM_IDS)).optional(),
  comboConfigMode: z.enum(COMBO_CONFIG_MODES).optional(),
  // Routing settings (#134)
  fallbackStrategy: settingsFallbackStrategySchema.optional(),
  wildcardAliases: z.array(z.object({ pattern: z.string(), target: z.string() })).optional(),
  stickyRoundRobinLimit: z.number().int().min(0).max(1000).optional(),
  requestRetry: z.number().int().min(0).max(10).optional(),
  maxRetryIntervalSec: z.number().int().min(0).max(300).optional(),
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
});

// ──── Auth Schemas ────

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required").max(200),
});

export const dbBackupCleanupSchema = z.object({
  keepLatest: z.number().int().min(1).max(200).optional(),
  retentionDays: z.number().int().min(0).max(3650).optional(),
});

// ──── API Route Payload Schemas (T06) ────

const modelIdSchema = z.string().trim().min(1, "Model is required").max(200);
const nonEmptyStringSchema = z.string().trim().min(1, "Field is required");
const embeddingTokenArraySchema = z
  .array(z.number().int().min(0))
  .min(1, "input token array must contain at least one item");
const embeddingInputSchema = z.union([
  nonEmptyStringSchema,
  z.array(nonEmptyStringSchema).min(1, "input must contain at least one item"),
  embeddingTokenArraySchema,
  z.array(embeddingTokenArraySchema).min(1, "input must contain at least one item"),
]);
const chatMessageSchema = z
  .object({
    role: z.string().trim().min(1, "messages[].role is required"),
    content: z.union([nonEmptyStringSchema, z.array(z.unknown()).min(1), z.null()]).optional(),
  })
  .catchall(z.unknown());
const countTokensMessageSchema = z
  .object({
    content: z.union([
      nonEmptyStringSchema,
      z
        .array(
          z
            .object({
              type: z.string().optional(),
              text: z.string().optional(),
            })
            .catchall(z.unknown())
        )
        .min(1, "messages[].content must contain at least one item"),
    ]),
  })
  .catchall(z.unknown());

export const v1EmbeddingsSchema = z
  .object({
    model: modelIdSchema,
    input: embeddingInputSchema,
    dimensions: z.coerce.number().int().positive().optional(),
    encoding_format: z.enum(["float", "base64"]).optional(),
  })
  .catchall(z.unknown());

export const v1ImageGenerationSchema = z
  .object({
    model: modelIdSchema,
    prompt: nonEmptyStringSchema.optional(),
  })
  .catchall(z.unknown());

export const v1AudioSpeechSchema = z
  .object({
    model: modelIdSchema,
    input: nonEmptyStringSchema,
  })
  .catchall(z.unknown());

export const v1ModerationSchema = z
  .object({
    model: modelIdSchema.optional(),
    input: z.unknown().refine((value) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    }, "Input is required"),
  })
  .catchall(z.unknown());

export const v1RerankSchema = z
  .object({
    model: modelIdSchema,
    query: nonEmptyStringSchema,
    documents: z.array(z.unknown()).min(1, "documents must contain at least one item"),
  })
  .catchall(z.unknown());

export const providerChatCompletionSchema = z
  .object({
    model: modelIdSchema,
    messages: z.array(chatMessageSchema).min(1).optional(),
    input: z.union([nonEmptyStringSchema, z.array(z.unknown()).min(1)]).optional(),
    prompt: nonEmptyStringSchema.optional(),
  })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    if (value.messages === undefined && value.input === undefined && value.prompt === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "messages, input or prompt is required",
        path: [],
      });
    }
  });

export const v1CountTokensSchema = z
  .object({
    messages: z.array(countTokensMessageSchema).min(1, "messages must contain at least one item"),
  })
  .catchall(z.unknown());

export const setBudgetSchema = z
  .object({
    apiKeyId: z.string().trim().min(1, "apiKeyId is required"),
    dailyLimitUsd: z.coerce.number().positive("dailyLimitUsd must be greater than zero").optional(),
    weeklyLimitUsd: z.coerce
      .number()
      .positive("weeklyLimitUsd must be greater than zero")
      .optional(),
    monthlyLimitUsd: z.coerce
      .number()
      .positive("monthlyLimitUsd must be greater than zero")
      .optional(),
    warningThreshold: z.coerce.number().min(0).max(1).optional(),
    resetInterval: z.enum(["daily", "weekly", "monthly"]).optional(),
    resetTime: z
      .string()
      .trim()
      .regex(/^\d{2}:\d{2}$/, "resetTime must be in HH:MM format")
      .optional(),
  })
  .superRefine((value, ctx) => {
    const hasAnyLimit = [value.dailyLimitUsd, value.weeklyLimitUsd, value.monthlyLimitUsd].some(
      (entry) => typeof entry === "number" && Number.isFinite(entry) && entry > 0
    );
    if (!hasAnyLimit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one budget limit must be provided",
        path: ["dailyLimitUsd"],
      });
    }
  });

export const policyActionSchema = z
  .object({
    action: z.enum(["unlock"]),
    identifier: z.string().trim().min(1).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.action === "unlock" && !value.identifier) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "identifier is required for unlock action",
        path: ["identifier"],
      });
    }
  });

const fallbackChainEntrySchema = z
  .object({
    provider: z.string().trim().min(1, "provider is required"),
    priority: z.number().int().min(1).max(100).optional(),
    enabled: z.boolean().optional(),
  })
  .catchall(z.unknown());

export const registerFallbackSchema = z.object({
  model: modelIdSchema,
  chain: z.array(fallbackChainEntrySchema).min(1, "chain must contain at least one provider"),
});

export const removeFallbackSchema = z.object({
  model: modelIdSchema,
});

export const updateModelAliasSchema = z.object({
  model: modelIdSchema,
  alias: z.string().trim().min(1, "Alias is required").max(200),
});

/** Align with `sanitizeUpstreamHeadersMap` — allow non-ASCII names; reject Host / hop-by-hop / whitespace / ":". */
const upstreamHeaderNameSchema = z
  .string()
  .trim()
  .min(1)
  .max(128)
  .refine((s) => !/[\r\n\0]/.test(s), { message: "header name cannot contain control characters" })
  .refine((s) => !/\s/.test(s), { message: "header name cannot contain whitespace" })
  .refine((s) => !s.includes(":"), { message: "header name cannot contain ':'" })
  .refine((s) => !isForbiddenUpstreamHeaderName(s), { message: "header name is not allowed" });

const upstreamHeaderValueSchema = z
  .string()
  .max(4096)
  .refine((s) => !/[\r\n]/.test(s), { message: "header value cannot contain line breaks" });

const upstreamHeadersRecordSchema = z
  .record(upstreamHeaderNameSchema, upstreamHeaderValueSchema)
  .refine((rec) => Object.keys(rec).length <= 16, { message: "at most 16 custom headers" })
  .refine((rec) => !Object.keys(rec).some((k) => isForbiddenUpstreamHeaderName(k)), {
    message: "forbidden header name in record",
  });

const modelCompatPerProtocolSchema = z
  .object({
    normalizeToolCallId: z.boolean().optional(),
    preserveOpenAIDeveloperRole: z.boolean().optional(),
    upstreamHeaders: upstreamHeadersRecordSchema.optional(),
  })
  .strict();

export const providerModelMutationSchema = z.object({
  provider: z.string().trim().min(1, "provider is required").max(120),
  modelId: z.string().trim().min(1, "modelId is required").max(240),
  modelName: z.string().trim().max(240).optional(),
  source: z.string().trim().max(80).optional(),
  apiFormat: z
    .enum([
      "chat-completions",
      "responses",
      "embeddings",
      "audio-transcriptions",
      "audio-speech",
      "images-generations",
    ])
    .default("chat-completions"),
  supportedEndpoints: z
    .array(
      z.enum([
        "chat",
        "embeddings",
        "images",
        "audio",
        "audio-transcriptions",
        "audio-speech",
        "images-generations",
      ])
    )
    .default(["chat"]),
  normalizeToolCallId: z.boolean().optional(),
  preserveOpenAIDeveloperRole: z.boolean().nullable().optional(),
  upstreamHeaders: upstreamHeadersRecordSchema.nullable().optional(),
  /** Zod 4: `z.record(z.enum([...]), …)` requires every enum key; use `partialRecord` for sparse patches. */
  compatByProtocol: z
    .partialRecord(z.enum(["openai", "openai-responses", "claude"]), modelCompatPerProtocolSchema)
    .optional(),
});

const pricingFieldsSchema = z
  .object({
    input: z.number().min(0).optional(),
    output: z.number().min(0).optional(),
    cached: z.number().min(0).optional(),
    reasoning: z.number().min(0).optional(),
    cache_creation: z.number().min(0).optional(),
  })
  .strict();

export const updatePricingSchema = z.record(
  z.string().trim().min(1),
  z.record(z.string().trim().min(1), pricingFieldsSchema)
);

export const toggleRateLimitSchema = z.object({
  connectionId: z.string().trim().min(1, "connectionId is required"),
  enabled: z.boolean(),
});

const legacyResilienceProfileSchema = z.object({
  transientCooldown: z.number().min(0),
  rateLimitCooldown: z.number().min(0),
  maxBackoffLevel: z.number().int().min(0),
  circuitBreakerThreshold: z.number().int().min(0),
  circuitBreakerReset: z.number().min(0),
});

const legacyResilienceDefaultsSchema = z
  .object({
    requestsPerMinute: z.number().int().min(1).optional(),
    minTimeBetweenRequests: z.number().int().min(0).optional(),
    concurrentRequests: z.number().int().min(1).optional(),
  })
  .strict();

const requestQueueSettingsSchema = z
  .object({
    autoEnableApiKeyProviders: z.boolean().optional(),
    requestsPerMinute: z.number().int().min(1).optional(),
    minTimeBetweenRequestsMs: z.number().int().min(0).optional(),
    concurrentRequests: z.number().int().min(1).optional(),
    maxWaitMs: z.number().int().min(1).optional(),
  })
  .strict();

const connectionCooldownProfileSchema = z
  .object({
    baseCooldownMs: z.number().int().min(0).optional(),
    useUpstreamRetryHints: z.boolean().optional(),
    maxBackoffSteps: z.number().int().min(0).optional(),
  })
  .strict();

const providerBreakerProfileSchema = z
  .object({
    failureThreshold: z.number().int().min(1).optional(),
    resetTimeoutMs: z.number().int().min(1000).optional(),
  })
  .strict();

const waitForCooldownSettingsSchema = z
  .object({
    enabled: z.boolean().optional(),
    maxRetries: z.number().int().min(0).max(10).optional(),
    maxRetryWaitSec: z.number().int().min(0).max(300).optional(),
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

export const jsonObjectSchema = z.record(z.string(), z.unknown());

export const resetStatsActionSchema = z.object({
  action: z.literal("reset-stats"),
});

const pricingSyncSourceSchema = z.enum(["litellm"]);

export const pricingSyncRequestSchema = z
  .object({
    sources: z.array(pricingSyncSourceSchema).min(1).optional(),
    dryRun: z.boolean().optional(),
  })
  .strict();

const taskRoutingModelMapSchema = z
  .object({
    coding: z.string().max(200).optional(),
    creative: z.string().max(200).optional(),
    analysis: z.string().max(200).optional(),
    vision: z.string().max(200).optional(),
    summarization: z.string().max(200).optional(),
    background: z.string().max(200).optional(),
    chat: z.string().max(200).optional(),
  })
  .strict();

export const updateTaskRoutingSchema = z
  .object({
    enabled: z.boolean().optional(),
    taskModelMap: taskRoutingModelMapSchema.optional(),
    detectionEnabled: z.boolean().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.enabled === undefined &&
      value.taskModelMap === undefined &&
      value.detectionEnabled === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const taskRoutingActionSchema = z.discriminatedUnion("action", [
  resetStatsActionSchema,
  z
    .object({
      action: z.literal("detect"),
      body: jsonObjectSchema.optional(),
    })
    .strict(),
]);

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
    prompt: z.string().max(50000).optional(),
    enabled: z.boolean().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.prompt === undefined && value.enabled === undefined) {
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
    effortLevel: z.enum(["none", "low", "medium", "high"]).optional(),
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

const payloadRuleModelSpecSchema = z
  .object({
    name: z.string().trim().min(1),
    protocol: z.string().trim().min(1).optional(),
  })
  .strict();

const payloadMutationRuleSchema = z
  .object({
    models: z.array(payloadRuleModelSpecSchema).min(1),
    params: z
      .record(z.string().trim().min(1), z.unknown())
      .refine((value) => Object.keys(value).length > 0, "params must contain at least one path"),
  })
  .strict();

const payloadFilterRuleSchema = z
  .object({
    models: z.array(payloadRuleModelSpecSchema).min(1),
    params: z.array(z.string().trim().min(1)).min(1),
  })
  .strict();

export const updatePayloadRulesSchema = z
  .object({
    default: z.array(payloadMutationRuleSchema).optional(),
    override: z.array(payloadMutationRuleSchema).optional(),
    filter: z.array(payloadFilterRuleSchema).optional(),
    defaultRaw: z.array(payloadMutationRuleSchema).optional(),
    "default-raw": z.array(payloadMutationRuleSchema).optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.default === undefined &&
      value.override === undefined &&
      value.filter === undefined &&
      value.defaultRaw === undefined &&
      value["default-raw"] === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

const ipFilterModeSchema = z.enum(["blacklist", "whitelist"]);
const tempBanSchema = z.object({
  ip: z.string().trim().min(1),
  durationMs: z.coerce.number().int().min(1).optional(),
  reason: z.string().max(200).optional(),
});

export const updateIpFilterSchema = z
  .object({
    enabled: z.boolean().optional(),
    mode: ipFilterModeSchema.optional(),
    blacklist: z.array(z.string()).optional(),
    whitelist: z.array(z.string()).optional(),
    addBlacklist: z.string().optional(),
    removeBlacklist: z.string().optional(),
    addWhitelist: z.string().optional(),
    removeWhitelist: z.string().optional(),
    tempBan: tempBanSchema.optional(),
    removeBan: z.string().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (Object.keys(value).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const updateModelAliasesSchema = z.object({
  aliases: z.record(z.string().trim().min(1), z.string().trim().min(1)),
});

export const addModelAliasSchema = z.object({
  from: z.string().trim().min(1),
  to: z.string().trim().min(1),
});

export const removeModelAliasSchema = z.object({
  from: z.string().trim().min(1),
});

export const proxyConfigSchema = z
  .object({
    type: z
      .preprocess(
        (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
        z.enum(["http", "https", "socks5"])
      )
      .optional(),
    host: z.string().trim().min(1).optional(),
    port: z.coerce.number().int().min(1).max(65535).optional(),
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .strict();

export const updateProxyConfigSchema = z
  .object({
    proxy: proxyConfigSchema.nullable().optional(),
    global: proxyConfigSchema.nullable().optional(),
    providers: z.record(z.string().trim().min(1), proxyConfigSchema.nullable()).optional(),
    combos: z.record(z.string().trim().min(1), proxyConfigSchema.nullable()).optional(),
    keys: z.record(z.string().trim().min(1), proxyConfigSchema.nullable()).optional(),
    level: z.enum(["global", "provider", "combo", "key"]).optional(),
    id: z.string().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    const hasPayload =
      value.proxy !== undefined ||
      value.global !== undefined ||
      value.providers !== undefined ||
      value.combos !== undefined ||
      value.keys !== undefined ||
      value.level !== undefined;

    if (!hasPayload) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }

    if (value.level !== undefined && value.proxy === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "proxy is required when level is provided",
        path: ["proxy"],
      });
    }

    if (value.level && value.level !== "global" && !value.id?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "id is required for provider/combo/key level updates",
        path: ["id"],
      });
    }
  });

export const testProxySchema = z.object({
  proxy: z.object({
    type: z.string().optional(),
    host: z.string().trim().min(1, "proxy.host is required"),
    port: z.union([z.string(), z.number()]),
    username: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const createProxyRegistrySchema = z
  .object({
    name: z.string().trim().min(1, "name is required").max(120),
    type: z
      .preprocess(
        (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
        z.enum(["http", "https", "socks5"])
      )
      .optional()
      .default("http"),
    host: z.string().trim().min(1, "host is required").max(255),
    port: z.coerce.number().int().min(1).max(65535),
    username: z.string().optional(),
    password: z.string().optional(),
    region: z.string().trim().max(64).nullable().optional(),
    notes: z.string().trim().max(1000).nullable().optional(),
    status: z.enum(["active", "inactive"]).optional().default("active"),
  })
  .strict();

export const updateProxyRegistrySchema = createProxyRegistrySchema.partial().extend({
  id: z.string().trim().min(1, "id is required"),
});

export const proxyAssignmentSchema = z
  .object({
    scope: z.enum(["global", "provider", "account", "combo", "key"]),
    scopeId: z.string().trim().nullable().optional(),
    proxyId: z.string().trim().nullable().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.scope !== "global" && !value.scopeId?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "scopeId is required for provider/account/combo/key scope",
        path: ["scopeId"],
      });
    }
  });

export const bulkProxyAssignmentSchema = z
  .object({
    scope: z.enum(["global", "provider", "account", "combo", "key"]),
    scopeIds: z.array(z.string().trim().min(1)).optional().default([]),
    proxyId: z.string().trim().nullable().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.scope !== "global" &&
      (!Array.isArray(value.scopeIds) || value.scopeIds.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "scopeIds is required for provider/account/combo/key scope",
        path: ["scopeIds"],
      });
    }
  });

const jsonRecordSchema = z.record(z.string(), z.unknown());
const nonEmptyJsonRecordSchema = jsonRecordSchema.refine(
  (value) => Object.keys(value).length > 0,
  "Body must be a non-empty object"
);

const translatorLogFileSchema = z.enum([
  "1_req_client.json",
  "3_req_openai.json",
  "4_req_target.json",
  "5_res_provider.txt",
]);

export const translatorDetectSchema = z.object({
  body: nonEmptyJsonRecordSchema,
});

export const translatorSaveSchema = z.object({
  file: translatorLogFileSchema,
  content: z.string().min(1, "Content is required").max(1_000_000, "Content is too large"),
});

export const translatorSendSchema = z.object({
  provider: z.string().trim().min(1, "Provider is required"),
  body: nonEmptyJsonRecordSchema,
});

export const translatorTranslateSchema = z
  .object({
    step: z.union([z.number().int().min(1).max(4), z.literal("direct")]),
    provider: z.string().trim().min(1).optional(),
    body: nonEmptyJsonRecordSchema,
    sourceFormat: z.string().optional(),
    targetFormat: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.step !== "direct" && !value.provider) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Step and provider are required",
        path: ["provider"],
      });
    }
  });

export const oauthExchangeSchema = z.object({
  code: z.string().trim().min(1),
  redirectUri: z.string().trim().min(1),
  codeVerifier: z.string().trim().min(1).optional(),
  state: z.string().nullable().optional(),
});

export const oauthPollSchema = z.object({
  deviceCode: z.string().trim().min(1),
  codeVerifier: z.string().optional(),
  extraData: z.unknown().optional(),
});

export const cursorImportSchema = z.object({
  accessToken: z.string().trim().min(1, "Access token is required"),
  machineId: z.string().trim().optional(),
});

export const kiroImportSchema = z.object({
  refreshToken: z.string().trim().min(1, "Refresh token is required"),
});

export const kiroSocialExchangeSchema = z.object({
  code: z.string().trim().min(1, "Code is required"),
  codeVerifier: z.string().trim().min(1, "Code verifier is required"),
  provider: z.enum(["google", "github"]),
});

export const cloudCredentialUpdateSchema = z.object({
  provider: z.string().trim().min(1, "Provider is required"),
  credentials: z
    .object({
      accessToken: z.string().optional(),
      refreshToken: z.string().optional(),
      expiresIn: z.coerce.number().positive().optional(),
    })
    .strict()
    .superRefine((value, ctx) => {
      if (
        value.accessToken === undefined &&
        value.refreshToken === undefined &&
        value.expiresIn === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one credential field must be provided",
          path: [],
        });
      }
    }),
});

export const cloudResolveAliasSchema = z.object({
  alias: z.string().trim().min(1, "Missing alias"),
});

export const cloudModelAliasUpdateSchema = z.object({
  model: z.string().trim().min(1, "Model and alias required"),
  alias: z.string().trim().min(1, "Model and alias required"),
});

export const cloudSyncActionSchema = z.object({
  action: z.enum(["enable", "sync", "disable"]),
});

export const updateComboSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100)
      .regex(/^[a-zA-Z0-9_/.-]+$/, "Name can only contain letters, numbers, -, _, / and .")
      .optional(),
    models: z.array(comboModelEntry).optional(),
    strategy: comboStrategySchema.optional(),
    config: comboRuntimeConfigSchema.optional(),
    isActive: z.boolean().optional(),
    allowedProviders: z.array(z.string().max(200)).optional(),
    system_message: z.string().max(50000).optional(),
    tool_filter_regex: z.string().max(1000).optional(),
    context_cache_protection: z.boolean().optional(),
    context_length: z.number().int().min(1000).max(2000000).optional(),
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
      value.context_length === undefined
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

export const dbBackupRestoreSchema = z.object({
  backupId: z.string().trim().min(1, "backupId is required"),
});

const evalTargetSchema = z
  .object({
    type: z.enum(["suite-default", "model", "combo"]),
    id: z.string().trim().min(1).optional().nullable(),
  })
  .superRefine((value, ctx) => {
    if (value.type === "suite-default") {
      return;
    }

    if (typeof value.id !== "string" || value.id.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "target.id is required for model and combo targets",
        path: ["id"],
      });
    }
  });

const evalMessageSchema = z.object({
  role: z.string().trim().min(1, "message.role is required").max(50),
  content: z.string().trim().min(1, "message.content is required").max(20000),
});

const evalCaseBuilderSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1, "case.name is required").max(200),
  model: z.string().trim().min(1).max(300).optional().nullable(),
  input: z.object({
    messages: z.array(evalMessageSchema).min(1, "At least one message is required").max(32),
    max_tokens: z.number().int().min(1).max(8192).optional(),
  }),
  expected: z.object({
    strategy: z.enum(["contains", "exact", "regex"]),
    value: z.string().trim().min(1, "expected.value is required").max(20000),
  }),
  tags: z.array(z.string().trim().min(1).max(64)).max(20).optional(),
});

export const evalRunSuiteSchema = z
  .object({
    suiteId: z.string().trim().min(1, "suiteId is required"),
    outputs: z.record(z.string(), z.string()).optional(),
    target: evalTargetSchema.optional(),
    compareTarget: evalTargetSchema.optional(),
    apiKeyId: z.string().trim().min(1, "apiKeyId must not be empty").optional(),
  })
  .superRefine((value, ctx) => {
    if (value.compareTarget) {
      const primaryType = value.target?.type || "suite-default";
      const primaryId = value.target?.id?.trim() || "";
      const compareId = value.compareTarget.id?.trim() || "";

      if (primaryType === value.compareTarget.type && primaryId === compareId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "compareTarget must differ from target",
          path: ["compareTarget"],
        });
      }
    }
  });

export const evalSuiteSaveSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1, "name is required").max(200),
  description: z.string().trim().max(2000).optional(),
  cases: z.array(evalCaseBuilderSchema).min(1, "At least one case is required").max(200),
});

const accessScheduleSchema = z.object({
  enabled: z.boolean(),
  from: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  until: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  days: z.array(z.number().int().min(0).max(6)).min(1, "At least one day is required").max(7),
  tz: z.string().min(1).max(100),
});

export const updateKeyPermissionsSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    allowedModels: z.array(z.string().trim().min(1)).max(1000).optional(),
    allowedConnections: z.array(z.string().uuid()).max(100).optional(),
    noLog: z.boolean().optional(),
    autoResolve: z.boolean().optional(),
    isActive: z.boolean().optional(),
    maxSessions: z.number().int().min(0).max(10000).optional(),
    accessSchedule: z.union([accessScheduleSchema, z.null()]).optional(),
  })
  .superRefine((value, ctx) => {
    if (
      value.name === undefined &&
      value.allowedModels === undefined &&
      value.allowedConnections === undefined &&
      value.noLog === undefined &&
      value.autoResolve === undefined &&
      value.isActive === undefined &&
      value.maxSessions === undefined &&
      value.accessSchedule === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const createProviderNodeSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    prefix: z.string().trim().min(1, "Prefix is required"),
    apiType: z
      .enum([
        "chat",
        "responses",
        "embeddings",
        "audio-transcriptions",
        "audio-speech",
        "images-generations",
      ])
      .optional(),
    baseUrl: z.string().trim().min(1).optional(),
    type: z.enum(["openai-compatible", "anthropic-compatible"]).optional(),
    compatMode: z.enum(["cc"]).optional(),
    chatPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
    modelsPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
  })
  .superRefine((value, ctx) => {
    const nodeType = value.type || "openai-compatible";
    if (nodeType === "openai-compatible" && !value.apiType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid OpenAI compatible API type",
        path: ["apiType"],
      });
    }
  });

export const updateProviderNodeSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  prefix: z.string().trim().min(1, "Prefix is required"),
  apiType: z
    .enum([
      "chat",
      "responses",
      "embeddings",
      "audio-transcriptions",
      "audio-speech",
      "images-generations",
    ])
    .optional(),
  baseUrl: z.string().trim().min(1, "Base URL is required"),
  chatPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
  modelsPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
});

export const providerNodeValidateSchema = z.object({
  baseUrl: z.string().trim().min(1, "Base URL and API key required"),
  apiKey: z.string().trim().optional(),
  type: z.enum(["openai-compatible", "anthropic-compatible"]).optional(),
  compatMode: z.enum(["cc"]).optional(),
  chatPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
  modelsPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
});

export const updateProviderConnectionSchema = z
  .object({
    name: z.string().max(200).optional(),
    priority: z.coerce.number().int().min(1).max(100).optional(),
    globalPriority: z.union([z.coerce.number().int().min(1).max(100), z.null()]).optional(),
    defaultModel: z.union([z.string().max(200), z.null()]).optional(),
    isActive: z.boolean().optional(),
    apiKey: z.string().max(10000).optional(),
    testStatus: z.string().max(50).optional(),
    lastError: z.union([z.string(), z.null()]).optional(),
    lastErrorAt: z.union([z.string(), z.null()]).optional(),
    lastErrorType: z.union([z.string(), z.null()]).optional(),
    lastErrorSource: z.union([z.string(), z.null()]).optional(),
    errorCode: z.union([z.string(), z.null()]).optional(),
    rateLimitedUntil: z.union([z.string(), z.null()]).optional(),
    lastTested: z.union([z.string(), z.null()]).optional(),
    healthCheckInterval: z.coerce.number().int().min(0).optional(),
    group: z.union([z.string().max(100), z.null()]).optional(),
    maxConcurrent: z.union([z.null(), z.coerce.number().int().min(0)]).optional(),
    // Partial patch of per-connection provider-specific settings (e.g. quota toggles)
    providerSpecificData: z
      .record(z.string(), z.unknown())
      .optional()
      .superRefine((data, ctx) => {
        validateProviderSpecificData(data, ctx);
      }),
  })
  .superRefine((value, ctx) => {
    if (Object.keys(value).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const providersBatchTestSchema = z
  .object({
    mode: z.enum([
      "provider",
      "oauth",
      "free",
      "apikey",
      "compatible",
      "all",
      "web-cookie",
      "search",
      "audio",
    ]),
    // Frontend may send null when mode != 'provider' — accept and treat as missing
    providerId: z.string().trim().min(1).nullable().optional(),
  })
  .superRefine((value, ctx) => {
    // Treat null same as undefined
    const pid = value.providerId ?? null;
    if (value.mode === "provider" && !pid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerId is required when mode=provider",
        path: ["providerId"],
      });
    }
  });

export const validateProviderApiKeySchema = z
  .object({
    provider: z.string().trim().min(1, "Provider and API key required"),
    apiKey: z.string().trim().optional(),
    validationModelId: z.string().trim().optional(),
    customUserAgent: z.string().trim().max(500).optional(),
    baseUrl: z.string().trim().url().optional(),
    cx: z.string().trim().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.provider === "google-pse-search" && !data.cx) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Programmable Search Engine ID (cx) is required",
        path: ["cx"],
      });
    }
  });

const geminiPartSchema = z
  .object({
    text: z.string().optional(),
  })
  .catchall(z.unknown());

const geminiContentSchema = z
  .object({
    role: z.string().optional(),
    parts: z.array(geminiPartSchema).optional(),
  })
  .catchall(z.unknown());

export const v1betaGeminiGenerateSchema = z
  .object({
    contents: z.array(geminiContentSchema).optional(),
    systemInstruction: z
      .object({
        parts: z.array(geminiPartSchema).optional(),
      })
      .catchall(z.unknown())
      .optional(),
    generationConfig: z
      .object({
        stream: z.boolean().optional(),
        maxOutputTokens: z.coerce.number().int().min(1).optional(),
        temperature: z.coerce.number().optional(),
        topP: z.coerce.number().optional(),
      })
      .catchall(z.unknown())
      .optional(),
  })
  .catchall(z.unknown())
  .superRefine((value, ctx) => {
    if (!value.contents && !value.systemInstruction) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "contents or systemInstruction is required",
        path: [],
      });
    }
  });

export const cliMitmStartSchema = z.object({
  apiKey: z.string().trim().min(1, "Missing apiKey"),
  sudoPassword: z.string().optional(),
});

export const cliMitmStopSchema = z.object({
  sudoPassword: z.string().optional(),
});

export const cliMitmAliasUpdateSchema = z.object({
  tool: z.string().trim().min(1, "tool and mappings required"),
  mappings: z.record(z.string(), z.string().optional()),
});

export const cliBackupMutationSchema = z
  .object({
    tool: z.string().trim().min(1).optional(),
    toolId: z.string().trim().min(1).optional(),
    backupId: z.string().trim().min(1, "tool and backupId are required"),
  })
  .superRefine((value, ctx) => {
    if (!value.tool && !value.toolId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "tool and backupId are required",
        path: ["tool"],
      });
    }
  });

const envKeySchema = z
  .string()
  .trim()
  .min(1, "Environment key is required")
  .max(120)
  .regex(/^[A-Z_][A-Z0-9_]*$/, "Invalid environment key format");
const envValueSchema = z
  .union([z.string(), z.number(), z.boolean()])
  .transform((value) => String(value))
  .refine((value) => value.length > 0, "Environment value is required")
  .refine((value) => value.length <= 10_000, "Environment value is too long");

export const cliSettingsEnvSchema = z.object({
  env: z
    .record(envKeySchema, envValueSchema)
    .refine((value) => Object.keys(value).length > 0, "env must contain at least one key"),
});

export const cliModelConfigSchema = z.object({
  baseUrl: z.string().trim().min(1, "baseUrl and model are required"),
  apiKey: z.string().nullable().optional(),
  model: z.string().trim().min(1, "baseUrl and model are required"),
  reasoningEffort: z.enum(["none", "low", "medium", "high", "xhigh"]).optional(),
  wireApi: z.enum(["chat", "responses"]).optional(),
  modelMappings: z.record(z.string().trim().min(1), z.string().trim().min(1)).optional(),
});

export const codexProfileNameSchema = z.object({
  name: z.string().trim().min(1, "Profile name is required"),
});

export const codexProfileIdSchema = z.object({
  profileId: z.string().trim().min(1, "profileId is required"),
});

export const guideSettingsSaveSchema = z
  .object({
    baseUrl: z.string().trim().min(1).optional(),
    apiKey: z.string().optional(),
    model: z.string().trim().min(1, "Model is required").optional(),
    models: z.array(z.string().trim().min(1, "Models must be non-empty")).min(1).optional(),
    modelLabels: z.record(z.string(), z.string().trim().min(1)).optional(),
  })
  .refine((data) => !!data.model || !!data.models?.length, {
    message: "Model is required",
    path: ["model"],
  });

// ── Search Schemas ─────────────────────────────────────────────────────
// Unified search request/response schemas. Final contract — all fields optional
// with defaults. New features add implementations, not new fields.
// Multi-query deferred to POST /v1/search/batch (separate PRD).

export const v1SearchSchema = z
  .object({
    // Core
    query: z
      .string()
      .trim()
      .min(1, "Query is required")
      .max(500, "Query must be 500 characters or fewer"),
    provider: z
      .enum([
        "serper-search",
        "brave-search",
        "perplexity-search",
        "exa-search",
        "tavily-search",
        "google-pse-search",
        "linkup-search",
        "searchapi-search",
        "youcom-search",
        "searxng-search",
      ])
      .optional(),
    max_results: z.coerce.number().int().min(1).max(100).default(5),
    search_type: z.enum(["web", "news"]).default("web"),
    offset: z.coerce.number().int().min(0).default(0),

    // Locale
    country: z.string().max(2).toUpperCase().optional(),
    language: z.string().min(2).max(5).optional(),
    time_range: z.enum(["any", "day", "week", "month", "year"]).optional(),

    // Content control
    content: z
      .object({
        snippet: z.boolean().default(true),
        full_page: z.boolean().default(false),
        format: z.enum(["text", "markdown"]).default("text"),
        max_characters: z.coerce.number().int().min(100).max(100000).optional(),
      })
      .optional(),

    // Filters
    filters: z
      .object({
        include_domains: z.array(z.string().max(253)).max(20).optional(),
        exclude_domains: z.array(z.string().max(253)).max(20).optional(),
        safe_search: z.enum(["off", "moderate", "strict"]).optional(),
      })
      .optional(),

    // Answer synthesis (Phase 2 — returns null until implemented)
    synthesis: z
      .object({
        strategy: z.enum(["none", "auto", "provider", "internal"]).default("none"),
        model: z.string().optional(),
        max_tokens: z.coerce.number().int().min(1).max(4000).optional(),
      })
      .optional(),

    // Provider-specific passthrough
    provider_options: z.record(z.string(), z.unknown()).optional(),

    // Strict mode — reject if provider doesn't support a requested filter
    strict_filters: z.boolean().default(false),
  })
  .catchall(z.unknown());

export const searchResultSchema = z.object({
  title: z.string(),
  url: z.string(),
  display_url: z.string().optional(),
  snippet: z.string(),
  position: z.number().int().positive(),
  score: z.number().min(0).max(1).nullable().optional(),
  published_at: z.string().nullable().optional(),
  favicon_url: z.string().nullable().optional(),
  content: z
    .object({
      format: z.enum(["text", "markdown"]).optional(),
      text: z.string().optional(),
      length: z.number().int().optional(),
    })
    .nullable()
    .optional(),
  metadata: z
    .object({
      author: z.string().nullable().optional(),
      language: z.string().nullable().optional(),
      source_type: z
        .enum(["article", "blog", "forum", "video", "academic", "news", "other"])
        .nullable()
        .optional(),
      image_url: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  citation: z.object({
    provider: z.string(),
    retrieved_at: z.string(),
    rank: z.number().int().positive(),
  }),
  provider_raw: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const v1SearchResponseSchema = z.object({
  id: z.string(),
  provider: z.string(),
  query: z.string(),
  results: z.array(searchResultSchema),
  cached: z.boolean(),
  answer: z
    .object({
      source: z.enum(["none", "provider", "internal"]).optional(),
      text: z.string().nullable().optional(),
      model: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  usage: z.object({
    queries_used: z.number().int().min(0),
    search_cost_usd: z.number().min(0),
    llm_tokens: z.number().int().min(0).optional(),
  }),
  metrics: z.object({
    response_time_ms: z.number().int().min(0),
    upstream_latency_ms: z.number().int().min(0).optional(),
    gateway_latency_ms: z.number().int().min(0).optional(),
    total_results_available: z.number().int().nullable(),
  }),
  errors: z
    .array(
      z.object({
        provider: z.string(),
        code: z.string(),
        message: z.string(),
      })
    )
    .optional(),
});

// ─── Auto-disable banned/error accounts ───────────────────────────────────
export const updateAutoDisableAccountsSchema = z
  .object({
    enabled: z.boolean(),
    threshold: z.number().int().min(1).max(10).optional(),
  })
  .strict();

export const versionManagerToolSchema = z.object({
  tool: z.string().trim().min(1),
});

export const versionManagerInstallSchema = versionManagerToolSchema.extend({
  version: z.string().trim().optional(),
});

export const v1BatchCreateSchema = z.object({
  input_file_id: z.string().min(1),
  endpoint: z.enum(SUPPORTED_BATCH_ENDPOINTS),
  completion_window: z.enum(["24h"]),
  metadata: z
    .record(z.string().max(64), z.string().max(512))
    .refine((m) => Object.keys(m).length <= 16, { message: "metadata may have at most 16 keys" })
    .optional(),
  output_expires_after: z
    .object({
      anchor: z.enum(["created_at"]),
      seconds: z.number().int().min(3600).max(2592000),
    })
    .optional(),
});
