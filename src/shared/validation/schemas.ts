import { z } from "zod";
import { isForbiddenUpstreamHeaderName } from "@/shared/constants/upstreamHeaders";

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// Re-export validation helpers from dedicated module to avoid webpack barrel-file
// optimization bug that truncates exports from large files.
export { validateBody, isValidationFailure } from "./helpers";
export type { ValidationResult } from "./helpers";

// ──── Provider Schemas ────

export const createProviderSchema = z.object({
  provider: z.string().min(1).max(100),
  apiKey: z.string().min(1).max(10000),
  name: z.string().min(1).max(200),
  priority: z.number().int().min(1).max(100).optional(),
  globalPriority: z.number().int().min(1).max(100).nullable().optional(),
  defaultModel: z.string().max(200).nullable().optional(),
  testStatus: z.string().max(50).optional(),
  providerSpecificData: z
    .record(z.string(), z.unknown())
    .optional()
    .superRefine((data, ctx) => {
      if (!data) return;
      const baseUrl = data.baseUrl;
      if (baseUrl === undefined) return;
      if (typeof baseUrl !== "string" || !isHttpUrl(baseUrl)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "providerSpecificData.baseUrl must be a valid http(s) URL",
          path: ["baseUrl"],
        });
      }
    }),
});

// ──── API Key Schemas ────

export const createKeySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
});

// ──── Combo Schemas ────

// A model entry can be a plain string (legacy) or an object with weight
const comboModelEntry = z.union([
  z.string(),
  z.object({
    model: z.string().min(1),
    weight: z.number().min(0).max(100).default(0),
  }),
]);

// Per-combo config overrides
const comboConfigSchema = z
  .object({
    maxRetries: z.number().int().min(0).max(10).optional(),
    retryDelayMs: z.number().int().min(0).max(60000).optional(),
    timeoutMs: z.number().int().min(1000).max(600000).optional(),
    healthCheckEnabled: z.boolean().optional(),
  })
  .optional();

const comboStrategySchema = z.enum([
  "priority",
  "weighted",
  "round-robin",
  "random",
  "least-used",
  "cost-optimized",
  "strict-random",
  "auto",
]);

const comboRuntimeConfigSchema = z
  .object({
    strategy: comboStrategySchema.optional(),
    maxRetries: z.coerce.number().int().min(0).max(10).optional(),
    retryDelayMs: z.coerce.number().int().min(0).max(60000).optional(),
    timeoutMs: z.coerce.number().int().min(1000).max(600000).optional(),
    concurrencyPerModel: z.coerce.number().int().min(1).max(20).optional(),
    queueTimeoutMs: z.coerce.number().int().min(1000).max(120000).optional(),
    healthCheckEnabled: z.boolean().optional(),
    healthCheckTimeoutMs: z.coerce.number().int().min(100).max(30000).optional(),
    maxComboDepth: z.coerce.number().int().min(1).max(10).optional(),
    trackMetrics: z.boolean().optional(),
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
  config: comboConfigSchema,
  allowedProviders: z.array(z.string().max(200)).optional(),
  system_message: z.string().max(50000).optional(),
  tool_filter_regex: z.string().max(1000).optional(),
  context_cache_protection: z.boolean().optional(),
  context_length: z.number().int().min(1000).max(2000000).optional(),
});

// ──── Auto-Combo Schemas ────

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

export const createAutoComboSchema = z.object({
  id: z.string().trim().min(1, "id is required").max(100),
  name: z.string().trim().min(1, "name is required").max(200),
  candidatePool: z.array(z.string().min(1)).optional().default([]),
  weights: scoringWeightsSchema,
  modePack: z.string().max(100).optional(),
  budgetCap: z.number().positive().optional(),
  explorationRate: z.number().min(0).max(1).optional().default(0.05),
});

// ──── Settings Schemas ────
// FASE-01: Removed .passthrough() — only explicitly listed fields are accepted

export const updateSettingsSchema = z.object({
  newPassword: z.string().min(1).max(200).optional(),
  currentPassword: z.string().max(200).optional(),
  theme: z.string().max(50).optional(),
  language: z.string().max(10).optional(),
  requireLogin: z.boolean().optional(),
  enableRequestLogs: z.boolean().optional(),
  enableSocks5Proxy: z.boolean().optional(),
  instanceName: z.string().max(100).optional(),
  corsOrigins: z.string().max(500).optional(),
  logRetentionDays: z.number().int().min(1).max(365).optional(),
  maxCallLogs: z.number().int().min(1).max(1_000_000).optional(),
  cloudUrl: z.string().max(500).optional(),
  baseUrl: z.string().max(500).optional(),
  setupComplete: z.boolean().optional(),
  requireAuthForModels: z.boolean().optional(),
  blockedProviders: z.array(z.string().max(100)).optional(),
  hideHealthCheckLogs: z.boolean().optional(),
  // Routing settings (#134)
  fallbackStrategy: z
    .enum([
      "fill-first",
      "round-robin",
      "p2c",
      "random",
      "least-used",
      "cost-optimized",
      "strict-random",
    ])
    .optional(),
  wildcardAliases: z.array(z.object({ pattern: z.string(), target: z.string() })).optional(),
  stickyRoundRobinLimit: z.number().int().min(0).max(1000).optional(),
  // Auto intent classifier settings (multilingual routing)
  intentDetectionEnabled: z.boolean().optional(),
  intentSimpleMaxWords: z.number().int().min(1).max(500).optional(),
  intentExtraCodeKeywords: z.array(z.string().max(100)).optional(),
  intentExtraReasoningKeywords: z.array(z.string().max(100)).optional(),
  intentExtraSimpleKeywords: z.array(z.string().max(100)).optional(),
  // Protocol toggles (default: disabled)
  mcpEnabled: z.boolean().optional(),
  a2aEnabled: z.boolean().optional(),
});

// ──── Auth Schemas ────

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required").max(200),
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
    prompt: nonEmptyStringSchema,
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

export const setBudgetSchema = z.object({
  apiKeyId: z.string().trim().min(1, "apiKeyId is required"),
  dailyLimitUsd: z.coerce.number().positive("dailyLimitUsd must be greater than zero"),
  monthlyLimitUsd: z.coerce
    .number()
    .positive("monthlyLimitUsd must be greater than zero")
    .optional(),
  warningThreshold: z.coerce.number().min(0).max(1).optional(),
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

export const clearModelAvailabilitySchema = z.object({
  provider: z.string().trim().min(1, "provider is required").max(120),
  model: modelIdSchema,
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
  apiFormat: z.enum(["chat-completions", "responses"]).default("chat-completions"),
  supportedEndpoints: z.array(z.enum(["chat", "embeddings", "images", "audio"])).default(["chat"]),
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

const resilienceProfileSchema = z.object({
  transientCooldown: z.number().min(0),
  rateLimitCooldown: z.number().min(0),
  maxBackoffLevel: z.number().int().min(0),
  circuitBreakerThreshold: z.number().int().min(0),
  circuitBreakerReset: z.number().min(0),
});

const resilienceDefaultsSchema = z
  .object({
    requestsPerMinute: z.number().int().min(1).optional(),
    minTimeBetweenRequests: z.number().int().min(1).optional(),
    concurrentRequests: z.number().int().min(1).optional(),
  })
  .strict();

export const updateResilienceSchema = z
  .object({
    profiles: z
      .object({
        oauth: resilienceProfileSchema.optional(),
        apikey: resilienceProfileSchema.optional(),
      })
      .strict()
      .optional(),
    defaults: resilienceDefaultsSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.profiles && !value.defaults) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must provide profiles or defaults",
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

export const updateCodexServiceTierSchema = z
  .object({
    enabled: z.boolean(),
  })
  .strict();

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
  "2_req_source.json",
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
  codeVerifier: z.string().trim().min(1),
  state: z.string().optional(),
});

export const oauthPollSchema = z.object({
  deviceCode: z.string().trim().min(1),
  codeVerifier: z.string().optional(),
  extraData: z.unknown().optional(),
});

export const cursorImportSchema = z.object({
  accessToken: z.string().trim().min(1, "Access token is required"),
  machineId: z.string().trim().min(1, "Machine ID is required"),
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
      value.context_cache_protection === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const testComboSchema = z.object({
  comboName: z.string().trim().min(1, "comboName is required"),
});

export const dbBackupRestoreSchema = z.object({
  backupId: z.string().trim().min(1, "backupId is required"),
});

export const evalRunSuiteSchema = z.object({
  suiteId: z.string().trim().min(1, "suiteId is required"),
  outputs: z.record(z.string(), z.string()),
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
    apiType: z.enum(["chat", "responses"]).optional(),
    baseUrl: z.string().trim().min(1).optional(),
    type: z.enum(["openai-compatible", "anthropic-compatible"]).optional(),
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
  apiType: z.enum(["chat", "responses"]).optional(),
  baseUrl: z.string().trim().min(1, "Base URL is required"),
  chatPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
  modelsPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
});

export const providerNodeValidateSchema = z.object({
  baseUrl: z.string().trim().min(1, "Base URL and API key required"),
  apiKey: z.string().trim().min(1, "Base URL and API key required"),
  type: z.enum(["openai-compatible", "anthropic-compatible"]).optional(),
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
    // Partial patch of per-connection provider-specific settings (e.g. quota toggles)
    providerSpecificData: z
      .record(z.string(), z.unknown())
      .optional()
      .superRefine((data, ctx) => {
        if (!data) return;
        const baseUrl = data.baseUrl;
        if (baseUrl === undefined) return;
        if (typeof baseUrl !== "string" || !isHttpUrl(baseUrl)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "providerSpecificData.baseUrl must be a valid http(s) URL",
            path: ["baseUrl"],
          });
        }
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
    mode: z.enum(["provider", "oauth", "free", "apikey", "compatible", "all"]),
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

export const validateProviderApiKeySchema = z.object({
  provider: z.string().trim().min(1, "Provider and API key required"),
  apiKey: z.string().trim().min(1, "Provider and API key required"),
  validationModelId: z.string().trim().optional(),
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
  apiKey: z.string().optional(),
  model: z.string().trim().min(1, "baseUrl and model are required"),
});

export const codexProfileNameSchema = z.object({
  name: z.string().trim().min(1, "Profile name is required"),
});

export const codexProfileIdSchema = z.object({
  profileId: z.string().trim().min(1, "profileId is required"),
});

export const guideSettingsSaveSchema = z.object({
  baseUrl: z.string().trim().min(1).optional(),
  apiKey: z.string().optional(),
  model: z.string().trim().min(1, "Model is required"),
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
      .enum(["serper-search", "brave-search", "perplexity-search", "exa-search", "tavily-search"])
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
