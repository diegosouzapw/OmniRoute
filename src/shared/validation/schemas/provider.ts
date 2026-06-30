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
import { validateProviderSpecificData } from "@/shared/validation/providerSpecificData";

import {
  upstreamHeadersRecordSchema,
  modelCompatPerProtocolSchema,
  customHeadersSchema,
} from "./misc.ts";

export { validateProviderSpecificData };

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
    const apiKeyOptional = providerAllowsOptionalApiKey(data.provider);
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

export const bulkCreateProviderSchema = z
  .object({
    provider: z.string().min(1).max(100),
    entries: z
      .array(
        z.object({
          name: z.string().min(1).max(200),
          apiKey: z.string().min(1).max(10000),
        })
      )
      .min(1, "entries must contain at least 1 item")
      .max(200, "entries must contain at most 200 items"),
    priority: z.number().int().min(1).max(100).optional(),
    globalPriority: z.number().int().min(1).max(100).nullable().optional(),
    providerSpecificData: z
      .record(z.string(), z.unknown())
      .optional()
      .superRefine((data, ctx) => {
        validateProviderSpecificData(data, ctx);
      }),
    validateKeys: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.provider === "google-pse-search") {
      const cx =
        data.providerSpecificData && typeof data.providerSpecificData === "object"
          ? (data.providerSpecificData as Record<string, unknown>).cx
          : undefined;
      if (typeof cx !== "string" || cx.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Programmable Search Engine ID (cx) is required",
          path: ["providerSpecificData", "cx"],
        });
      }
    }
  });

// ──── Bulk Web-Session Import Schema ────

export const bulkWebSessionImportSchema = z.object({
  provider: z.string().min(1).max(100),
  entries: z
    .array(
      z.object({
        name: z.string().min(1).max(200),
        credential: z
          .string()
          .min(1)
          .max(64 * 1024, "Credential must be under 64 KB"),
      })
    )
    .min(1, "entries must contain at least 1 item")
    .max(50, "entries must contain at most 50 items"),
  priority: z.number().int().min(1).max(100).optional(),
  globalPriority: z.number().int().min(1).max(100).nullable().optional(),
});

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
      "rerank",
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
        "rerank",
        "images",
        "audio",
        "audio-transcriptions",
        "audio-speech",
        "images-generations",
      ])
    )
    .default(["chat"]),
  // #2905: optional per-model wire format override for custom models (e.g. a
  // custom opencode-go model that must use the Anthropic Messages shape).
  targetFormat: z
    .enum(["openai", "openai-responses", "claude", "gemini", "antigravity"])
    .optional(),
  // #1294: optional token limits set in the "add custom model" form. The wire
  // shape uses max_input_tokens / max_output_tokens (mirrors the /v1/models
  // catalog); they persist as inputTokenLimit / outputTokenLimit.
  max_input_tokens: z.number().int().positive().optional(),
  max_output_tokens: z.number().int().positive().optional(),
  normalizeToolCallId: z.boolean().optional(),
  preserveOpenAIDeveloperRole: z.boolean().nullable().optional(),
  upstreamHeaders: upstreamHeadersRecordSchema.nullable().optional(),
  /** Zod 4: `z.record(z.enum([...]), …)` requires every enum key; use `partialRecord` for sparse patches. */
  compatByProtocol: z
    .partialRecord(z.enum(["openai", "openai-responses", "claude"]), modelCompatPerProtocolSchema)
    .optional(),
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
    customHeaders: customHeadersSchema,
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
  customHeaders: customHeadersSchema,
});

export const providerNodeValidateSchema = z.object({
  baseUrl: z.string().trim().min(1, "Base URL and API key required"),
  apiKey: z.string().trim().optional(),
  type: z.enum(["openai-compatible", "anthropic-compatible"]).optional(),
  compatMode: z.enum(["cc"]).optional(),
  chatPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
  modelsPath: z.string().trim().startsWith("/").max(500).optional().or(z.literal("")),
  modelId: z.string().trim().max(200).optional().or(z.literal("")),
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
    // Per-window quota cutoffs. Map keys are window names (e.g. "window5h",
    // "window7d"); values are 0-100 integers, or null to clear that window's
    // override (the API route merges this into the existing map and prunes
    // null entries before persisting). The whole field set to null clears
    // every override on the connection.
    quotaWindowThresholds: z
      .union([
        z.null(),
        z.record(
          // Window keys mirror the quota names from getUsageForProvider —
          // bound for defense-in-depth so a malicious payload can't ship
          // megabyte-long keys that would bloat the DB row.
          z.string().min(1).max(64),
          z.union([z.null(), z.coerce.number().int().min(0).max(100)])
        ),
      ])
      .optional(),
    projectId: z.union([z.string(), z.null()]).optional(),
    // Per-connection rate limit overrides — overrides the global RequestQueueSettings
    // for this connection. Set to null to clear all overrides.
    rateLimitOverrides: z
      .union([
        z.null(),
        z.object({
          rpm: z.coerce.number().int().min(0).max(1_000_000).optional(),
          tpm: z.coerce.number().int().min(0).max(100_000_000).optional(),
          tpd: z.coerce.number().int().min(0).max(10_000_000_000).optional(),
          minTime: z.coerce.number().int().min(0).max(60_000).optional(),
          maxConcurrent: z.coerce.number().int().min(0).max(10_000).optional(),
        }),
      ])
      .optional(),
    proxyEnabled: z.boolean().optional(),
    perKeyProxyEnabled: z.boolean().optional(),
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
      "no-auth",
      "apikey",
      "compatible",
      "all",
      "web-cookie",
      "search",
      "audio",
      "local",
      "upstream-proxy",
      "cloud-agent",
      "ide",
      "selected",
    ]),
    // Frontend may send null when mode != 'provider' — accept and treat as missing
    providerId: z.string().trim().min(1).nullable().optional(),
    // Explicit connection IDs to test — required when mode=selected
    connectionIds: z.array(z.string().trim().min(1)).max(100).nullable().optional(),
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
    const ids = value.connectionIds ?? null;
    if (value.mode === "selected" && (!ids || ids.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "connectionIds is required when mode=selected",
        path: ["connectionIds"],
      });
    }
  });

// PATCH /api/providers — bulk activate/deactivate selected connections
export const batchUpdateProviderConnectionsSchema = z.object({
  ids: z.array(z.string().trim().min(1)).min(1).max(100),
  isActive: z.boolean(),
});

export const validateProviderApiKeySchema = z
  .object({
    provider: z.string().trim().min(1, "Provider and API key required"),
    apiKey: z.string().trim().optional(),
    validationModelId: z.string().trim().optional(),
    customUserAgent: z.string().trim().max(500).optional(),
    baseUrl: z.string().trim().url().optional(),
    region: z.string().trim().max(64).optional(),
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
