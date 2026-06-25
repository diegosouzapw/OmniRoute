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

import { modelIdSchema, nonEmptyStringSchema } from "./misc.ts";

export const embeddingTokenArraySchema = z
  .array(z.number().int().min(0))
  .min(1, "input token array must contain at least one item");

export const embeddingInputSchema = z.union([
  nonEmptyStringSchema,
  z.array(nonEmptyStringSchema).min(1, "input must contain at least one item"),
  embeddingTokenArraySchema,
  z.array(embeddingTokenArraySchema).min(1, "input must contain at least one item"),
]);

export const chatMessageSchema = z
  .object({
    role: z.string().trim().min(1, "messages[].role is required"),
    content: z.union([nonEmptyStringSchema, z.array(z.unknown()).min(1), z.null()]).optional(),
  })
  .catchall(z.unknown());

export const countTokensMessageSchema = z
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
        "ollama-search",
        "searchapi-search",
        "youcom-search",
        "searxng-search",
        "zai-search",
        "duckduckgo-free",
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

// ── Web Fetch ─────────────────────────────────────────────────────────────────

export const v1WebFetchSchema = z.object({
  url: z.string().url("url must be a valid URL (http/https)"),
  provider: z.enum(["firecrawl", "jina-reader", "tavily-search"]).optional(),
  format: z.enum(["markdown", "html", "links", "screenshot"]).default("markdown"),
  depth: z.union([z.literal(0), z.literal(1), z.literal(2)]).default(0),
  wait_for_selector: z.string().max(256).optional(),
  include_metadata: z.boolean().default(false),
});
