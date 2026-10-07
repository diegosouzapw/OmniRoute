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
import { parseAndValidatePublicUrl } from "@/shared/network/outboundUrlGuard";
import {
  effortRequestSchema,
  thinkingRequestSchema,
} from "@/shared/reasoning/effortStandardization";

import { modelIdSchema, nonEmptyStringSchema } from "./misc.ts";
import { isCanonicalEmbeddingItem, JINA_NATIVE_MEDIA_KEYS } from "../jinaNativeEmbeddingInput.ts";
import { isGeminiNativeEmbeddingItem } from "../geminiNativeEmbeddingInput.ts";

export const embeddingTokenArraySchema = z
  .array(z.number().int().min(0))
  .min(1, "input token array must contain at least one item");

export const MAX_EMBEDDING_INPUT_ITEMS = 32;
export const MAX_EMBEDDING_INLINE_ITEM_BYTES = 8 * 1024 * 1024;
export const MAX_EMBEDDING_INLINE_TOTAL_BYTES = 16 * 1024 * 1024;
const MAX_EMBEDDING_TEXT_LENGTH = 1_000_000;
const MAX_EMBEDDING_URL_LENGTH = 2048;
const MAX_MEDIA_TYPE_LENGTH = 255;
// Four base64 characters encode at most three bytes. Reject by encoded length first
// so multi-megabyte oversize payloads never reach format validation.
const MAX_EMBEDDING_INLINE_ITEM_BASE64_LENGTH = Math.ceil(MAX_EMBEDDING_INLINE_ITEM_BYTES / 3) * 4;
const BASE64_CHUNK_RE = /^[A-Za-z0-9+/]{4}$/;
const BASE64_LAST_CHUNK_RE = /^(?:[A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;

function decodedBase64Bytes(data: string): number {
  const padding = data.endsWith("==") ? 2 : data.endsWith("=") ? 1 : 0;
  return (data.length * 3) / 4 - padding;
}

/** Validate base64 without one giant RegExp over multi-megabyte strings. */
function isValidBase64(data: string): boolean {
  if (data.length === 0 || data.length % 4 !== 0) return false;
  for (let i = 0; i < data.length - 4; i += 4) {
    if (!BASE64_CHUNK_RE.test(data.slice(i, i + 4))) return false;
  }
  return BASE64_LAST_CHUNK_RE.test(data.slice(data.length - 4));
}

const embeddingUrlSourceSchema = z.object({
  type: z.literal("url"),
  url: z
    .string()
    .trim()
    .min(1)
    .max(MAX_EMBEDDING_URL_LENGTH)
    .superRefine((value, context) => {
      try {
        const url = parseAndValidatePublicUrl(value);
        if (url.protocol !== "https:") {
          context.addIssue({ code: "custom", message: "media URLs must use HTTPS" });
        }
      } catch {
        context.addIssue({ code: "custom", message: "media URL must be a safe public HTTPS URL" });
      }
    }),
});

const embeddingBase64SourceSchema = z.object({
  type: z.literal("base64"),
  data: z
    .string()
    .min(1)
    .superRefine((data, context) => {
      // Cheap encoded-length guard first. Same encoded length can still decode to
      // 8 MiB + 1, so the decoded-byte check also runs before format validation.
      if (
        data.length > MAX_EMBEDDING_INLINE_ITEM_BASE64_LENGTH ||
        decodedBase64Bytes(data) > MAX_EMBEDDING_INLINE_ITEM_BYTES
      ) {
        context.addIssue({
          code: "custom",
          message: "decoded inline media must not exceed 8 MiB",
        });
        return;
      }
      if (!isValidBase64(data)) {
        context.addIssue({ code: "custom", message: "data must be valid base64" });
      }
    }),
  media_type: z.string().trim().min(1).max(MAX_MEDIA_TYPE_LENGTH),
});

const embeddingMediaSourceSchema = z.discriminatedUnion("type", [
  embeddingUrlSourceSchema,
  embeddingBase64SourceSchema,
]);

export const embeddingMultimodalItemSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string().min(1).max(MAX_EMBEDDING_TEXT_LENGTH),
  }),
  ...(["image", "audio", "video", "document"] as const).map((type) =>
    z.object({ type: z.literal(type), source: embeddingMediaSourceSchema })
  ),
]);

function decodedInlineBytesFromEmbeddingItem(item: unknown): number {
  if (!item || typeof item !== "object") return 0;
  const record = item as Record<string, unknown>;
  if (
    "type" in record &&
    record.type !== "text" &&
    record.source &&
    typeof record.source === "object"
  ) {
    const source = record.source as { type?: string; data?: string };
    if (source.type === "base64" && typeof source.data === "string") {
      return decodedBase64Bytes(source.data);
    }
  }
  for (const key of JINA_NATIVE_MEDIA_KEYS) {
    if (key === "text" || typeof record[key] !== "string") continue;
    const value = String(record[key]);
    const dataUri = /^data:([^;,]+);base64,(.+)$/i.exec(value);
    if (dataUri) return decodedBase64Bytes(dataUri[2]);
    if (/^https:\/\//i.test(value)) return 0;
    return decodedBase64Bytes(value);
  }
  if (Array.isArray(record.content)) {
    return record.content.reduce(
      (total, chunk) => total + decodedInlineBytesFromEmbeddingItem(chunk),
      0
    );
  }
  if (record.content && typeof record.content === "object" && !Array.isArray(record.content)) {
    return decodedInlineBytesFromEmbeddingItem(record.content);
  }
  if (Array.isArray(record.parts)) {
    return record.parts.reduce(
      (total, chunk) => total + decodedInlineBytesFromEmbeddingItem(chunk),
      0
    );
  }
  const inline = record.inline_data ?? record.inlineData;
  if (inline && typeof inline === "object") {
    const data = (inline as { data?: unknown }).data;
    if (typeof data === "string") return decodedBase64Bytes(data);
  }
  return 0;
}

const embeddingMultimodalInputSchema = z
  .array(embeddingMultimodalItemSchema)
  .min(1, "input must contain at least one item")
  .max(MAX_EMBEDDING_INPUT_ITEMS, `input must contain at most ${MAX_EMBEDDING_INPUT_ITEMS} items`)
  .superRefine((items, context) => {
    const totalBytes = items.reduce(
      (total, item) => total + decodedInlineBytesFromEmbeddingItem(item),
      0
    );
    if (totalBytes > MAX_EMBEDDING_INLINE_TOTAL_BYTES) {
      context.addIssue({
        code: "custom",
        message: "decoded inline media must not exceed 16 MiB per request",
      });
    }
  });

function refineJinaMediaString(value: string, context: z.RefinementCtx) {
  const trimmed = value.trim();
  if (/^https:\/\//i.test(trimmed)) {
    if (trimmed.length > MAX_EMBEDDING_URL_LENGTH) {
      context.addIssue({ code: "custom", message: "media URL is too long" });
      return;
    }
    try {
      const url = parseAndValidatePublicUrl(trimmed);
      if (url.protocol !== "https:") {
        context.addIssue({ code: "custom", message: "media URLs must use HTTPS" });
      }
    } catch {
      context.addIssue({ code: "custom", message: "media URL must be a safe public HTTPS URL" });
    }
    return;
  }
  if (/^(https?:|file:|data:text\/html)/i.test(trimmed) && !trimmed.startsWith("data:")) {
    context.addIssue({ code: "custom", message: "media URL must be a safe public HTTPS URL" });
    return;
  }
  const dataUri = /^data:([^;,]+);base64,(.+)$/i.exec(trimmed);
  const payload = dataUri ? dataUri[2] : trimmed;
  if (
    payload.length > MAX_EMBEDDING_INLINE_ITEM_BASE64_LENGTH ||
    decodedBase64Bytes(payload) > MAX_EMBEDDING_INLINE_ITEM_BYTES
  ) {
    context.addIssue({
      code: "custom",
      message: "decoded inline media must not exceed 8 MiB",
    });
  }
}

const jinaNativeMediaStringSchema = z.string().trim().min(1).superRefine(refineJinaMediaString);

function exactlyOneJinaMediaKey(value: Record<string, unknown>, key: string): boolean {
  if (isCanonicalEmbeddingItem(value)) return false;
  return (
    JINA_NATIVE_MEDIA_KEYS.filter((mediaKey) => mediaKey in value).length === 1 && key in value
  );
}

const jinaTextDocSchema = z
  .object({ text: z.string().trim().min(1).max(MAX_EMBEDDING_TEXT_LENGTH) })
  .passthrough()
  .refine((value) => exactlyOneJinaMediaKey(value, "text"), {
    message: "Jina TextDoc must be { text }",
  });

const jinaImageDocSchema = z
  .object({ image: jinaNativeMediaStringSchema })
  .passthrough()
  .refine((value) => exactlyOneJinaMediaKey(value, "image"), {
    message: "Jina ImageDoc must be { image }",
  });

const jinaAudioDocSchema = z
  .object({ audio: jinaNativeMediaStringSchema })
  .passthrough()
  .refine((value) => exactlyOneJinaMediaKey(value, "audio"), {
    message: "Jina AudioDoc must be { audio }",
  });

const jinaVideoDocSchema = z
  .object({ video: jinaNativeMediaStringSchema })
  .passthrough()
  .refine((value) => exactlyOneJinaMediaKey(value, "video"), {
    message: "Jina VideoDoc must be { video }",
  });

const jinaPdfDocSchema = z
  .object({ pdf: jinaNativeMediaStringSchema })
  .passthrough()
  .refine((value) => exactlyOneJinaMediaKey(value, "pdf"), {
    message: "Jina PDFDoc must be { pdf }",
  });

export const jinaNativeDocSchema = z.union([
  jinaTextDocSchema,
  jinaImageDocSchema,
  jinaAudioDocSchema,
  jinaVideoDocSchema,
  jinaPdfDocSchema,
]);

export const jinaMergedContentGroupSchema = z
  .object({
    content: z
      .array(
        z.union([jinaTextDocSchema, jinaImageDocSchema, jinaAudioDocSchema, jinaVideoDocSchema])
      )
      .min(1, "content must contain at least one chunk"),
  })
  .passthrough();

const geminiInlineBlobSchema = z
  .object({
    mime_type: z.string().trim().min(1).max(MAX_MEDIA_TYPE_LENGTH).optional(),
    mimeType: z.string().trim().min(1).max(MAX_MEDIA_TYPE_LENGTH).optional(),
    data: z.string().min(1),
  })
  .passthrough()
  .superRefine((value, context) => {
    if (!value.mime_type && !value.mimeType) {
      context.addIssue({ code: "custom", message: "Gemini inline_data requires mime_type" });
    }
    const data = value.data;
    if (
      data.length > MAX_EMBEDDING_INLINE_ITEM_BASE64_LENGTH ||
      decodedBase64Bytes(data) > MAX_EMBEDDING_INLINE_ITEM_BYTES
    ) {
      context.addIssue({
        code: "custom",
        message: "decoded inline media must not exceed 8 MiB",
      });
    }
  });

const geminiFileUriSchema = z
  .string()
  .trim()
  .min(1)
  .max(MAX_EMBEDDING_URL_LENGTH)
  .superRefine((value, context) => {
    if (value.startsWith("files/")) return;
    try {
      const url = parseAndValidatePublicUrl(value);
      if (url.protocol !== "https:") {
        context.addIssue({ code: "custom", message: "media URLs must use HTTPS" });
      }
    } catch {
      context.addIssue({ code: "custom", message: "media URL must be a safe public HTTPS URL" });
    }
  });

const geminiFileDataSchema = z
  .object({
    mime_type: z.string().trim().min(1).max(MAX_MEDIA_TYPE_LENGTH).optional(),
    mimeType: z.string().trim().min(1).max(MAX_MEDIA_TYPE_LENGTH).optional(),
    file_uri: geminiFileUriSchema.optional(),
    fileUri: geminiFileUriSchema.optional(),
  })
  .passthrough()
  .refine((value) => Boolean(value.file_uri || value.fileUri), {
    message: "Gemini file_data requires file_uri",
  });

export const geminiNativePartSchema = z
  .object({
    text: z.string().trim().min(1).max(MAX_EMBEDDING_TEXT_LENGTH).optional(),
    inline_data: geminiInlineBlobSchema.optional(),
    inlineData: geminiInlineBlobSchema.optional(),
    file_data: geminiFileDataSchema.optional(),
    fileData: geminiFileDataSchema.optional(),
  })
  .passthrough()
  .refine(
    (value) => isGeminiNativeEmbeddingItem(value) && !("parts" in value) && !("content" in value),
    {
      message: "Gemini part must be { text }, { inline_data }, or { file_data }",
    }
  );

export const geminiNativeContentSchema = z
  .object({
    parts: z.array(geminiNativePartSchema).min(1, "parts must contain at least one part"),
  })
  .passthrough();

export const geminiNativeEmbedRequestSchema = z
  .object({
    content: geminiNativeContentSchema,
  })
  .passthrough();

export const geminiNativeItemSchema = z.union([
  geminiNativePartSchema,
  geminiNativeContentSchema,
  geminiNativeEmbedRequestSchema,
]);

const jinaNativeOrCanonicalArraySchema = z
  .array(
    z.union([
      nonEmptyStringSchema,
      embeddingMultimodalItemSchema,
      jinaNativeDocSchema,
      jinaMergedContentGroupSchema,
      geminiNativeItemSchema,
    ])
  )
  .min(1, "input must contain at least one item")
  .max(MAX_EMBEDDING_INPUT_ITEMS, `input must contain at most ${MAX_EMBEDDING_INPUT_ITEMS} items`)
  .superRefine((items, context) => {
    const totalBytes = items.reduce(
      (total, item) => total + decodedInlineBytesFromEmbeddingItem(item),
      0
    );
    if (totalBytes > MAX_EMBEDDING_INLINE_TOTAL_BYTES) {
      context.addIssue({
        code: "custom",
        message: "decoded inline media must not exceed 16 MiB per request",
      });
    }
  });

export const embeddingInputSchema = z.union([
  nonEmptyStringSchema,
  z.array(nonEmptyStringSchema).min(1, "input must contain at least one item"),
  embeddingTokenArraySchema,
  z.array(embeddingTokenArraySchema).min(1, "input must contain at least one item"),
  embeddingMultimodalInputSchema,
  jinaNativeDocSchema,
  jinaMergedContentGroupSchema,
  geminiNativeItemSchema,
  jinaNativeOrCanonicalArraySchema,
]);

export type EmbeddingMultimodalItem = z.infer<typeof embeddingMultimodalItemSchema>;

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

// POST /v1/images/upscale — image→image super-resolution. `prompt` is optional here
// (only Stability conservative/creative need one, enforced by the route/handler), but a
// resolvable source image is mandatory and validated by the route after extraction.
export const v1ImageUpscaleSchema = z
  .object({
    model: modelIdSchema,
    prompt: nonEmptyStringSchema.optional(),
    factor: z.union([z.number(), z.string()]).optional(),
    creativity: z.union([z.number(), z.string()]).optional(),
    response_format: z.enum(["url", "b64_json"]).optional(),
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

// Mistral OCR: `document` is a { type, document_url | image_url } object.
// Keep the schema permissive-but-typed — validate model + that a non-empty
// `document` object (or a document_url/image_url string shorthand) is present.
export const v1OcrDocumentSchema = z.union([
  z
    .object({
      type: z.string().trim().min(1).optional(),
      document_url: z.string().trim().min(1).optional(),
      image_url: z.union([z.string().trim().min(1), z.record(z.string(), z.unknown())]).optional(),
    })
    .catchall(z.unknown())
    .refine(
      (value) => value.document_url !== undefined || value.image_url !== undefined,
      "document must include document_url or image_url"
    ),
  nonEmptyStringSchema,
]);

export const v1OcrSchema = z
  .object({
    model: modelIdSchema.optional(),
    document: v1OcrDocumentSchema,
  })
  .catchall(z.unknown());

export const v1RerankSchema = z
  .object({
    model: modelIdSchema,
    query: nonEmptyStringSchema,
    documents: z.array(z.unknown()).min(1, "documents must contain at least one item"),
  })
  .catchall(z.unknown());

// POST /v1/classify — Jina zero/few-shot classification (api.jina.ai).
export const v1ClassifySchema = z
  .object({
    model: modelIdSchema.optional(),
    classifier_id: z.string().trim().min(1).optional(),
    input: z.union([
      nonEmptyStringSchema,
      z.array(z.unknown()).min(1, "input must contain at least one item"),
    ]),
    labels: z.array(z.string().trim().min(1)).min(1).optional(),
  })
  .catchall(z.unknown());

// POST /v1/segment — Jina segmenter (segment.jina.ai).
export const v1SegmentSchema = z
  .object({
    content: nonEmptyStringSchema,
    tokenizer: z.string().trim().min(1).optional(),
    return_tokens: z.boolean().optional(),
    return_chunks: z.boolean().optional(),
    max_chunk_length: z.coerce.number().positive().optional(),
  })
  .catchall(z.unknown());

export const providerChatCompletionSchema = z
  .object({
    model: modelIdSchema,
    messages: z.array(chatMessageSchema).min(1).optional(),
    input: z.union([nonEmptyStringSchema, z.array(z.unknown()).min(1)]).optional(),
    prompt: nonEmptyStringSchema.optional(),
    // Canonical, provider-agnostic reasoning controls (#6241). `effort` reuses the shared
    // none/low/medium/high/xhigh vocabulary (UI tiers extra/max collapse onto xhigh);
    // `thinking` is a simple boolean toggle. Both are optional and normalized onto the
    // per-provider reasoning fields (reasoning_effort / reasoning.effort / thinking) by
    // normalizeReasoningRequest before translation — an explicit client reasoning_effort /
    // reasoning / object-shaped thinking always wins. See
    // @/shared/reasoning/effortStandardization.
    effort: effortRequestSchema.optional(),
    thinking: thinkingRequestSchema.optional(),
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

/**
 * POST /v1/responses/input_tokens (#13167) — local Responses token count. The
 * counter tolerates every Responses item shape (it only tokenizes what it can
 * read), so the schema pins the wire types the route relies on and lets the
 * rest through: `input` is a string or an item array, `instructions` a string,
 * `tools` an array. Anything else is a 400 instead of a silently ignored key
 * (Hard Rule #7 / t06 gate).
 */
export const v1ResponsesInputTokensSchema = z
  .object({
    model: z.string().optional(),
    instructions: z.string().optional(),
    input: z.union([z.string(), z.array(z.unknown())]).optional(),
    tools: z.array(z.unknown()).optional(),
    tool_choice: z.unknown().optional(),
    text: z.unknown().optional(),
    reasoning: z.unknown().optional(),
  })
  .catchall(z.unknown());

// ── Search Schemas ─────────────────────────────────────────────────────
// Unified search request/response schemas. Final contract — all fields optional
// with defaults. New features add implementations, not new fields.
// Multi-query deferred to POST /v1/search/batch (separate PRD).

export const v1SearchSchema = z.preprocess(
  (raw) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
    const o = { ...(raw as Record<string, unknown>) };
    if (o.provider === "x_search") o.provider = "x-search";
    if (o.provider === "xquik" || o.provider === "xquik_search") o.provider = "xquik-search";
    if (o.provider === "anysearch" || o.provider === "anysearch_search")
      o.provider = "anysearch-search";
    if (o.provider === "x-search" || o.provider === "xquik-search") o.search_type = "x";
    return o;
  },
  z
    .object({
      // Core
      query: z
        .string()
        .trim()
        .min(1, "Query is required")
        .max(500, "Query must be 500 characters or fewer"),
      // Not a z.enum: the runtime catalog (SEARCH_PROVIDERS + SEARCH_PROVIDER_ALIASES in
      // open-sse/config/searchRegistry.ts) is the source of truth via resolveSearchProvider(),
      // which already returns a named "Unknown search provider: <id>" error for bad ids (see
      // src/app/api/v1/search/route.ts). A hard-coded enum here would 400 before that check
      // ever runs, hiding the informative message behind a generic Zod failure (#10849).
      // Known catalog ids as of this writing: serper-search, brave-search, perplexity-search,
      // exa-search, tavily-search, firecrawl, google-pse-search, linkup-search, ollama-search,
      // searchapi-search, youcom-search, searxng-search, zai-search, jina-search, jina-ai,
      // jina, duckduckgo-free, x-search, x_search, xquik-search, xquik, anysearch-search,
      // anysearch (plus short aliases resolved by
      // SEARCH_PROVIDER_ALIASES).
      provider: z.string().min(1).optional(),
      max_results: z.coerce.number().int().min(1).max(100).default(5),
      search_type: z.enum(["web", "news", "x"]).default("web"),
      offset: z.coerce.number().int().min(0).default(0),

      // Locale
      country: z.string().max(2).toUpperCase().optional(),
      language: z.string().min(2).max(5).optional(),
      time_range: z.enum(["any", "hour", "day", "week", "month", "year"]).optional(),

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
    .catchall(z.unknown())
);

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
        .enum(["article", "blog", "forum", "video", "academic", "news", "x", "other"])
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
  provider: z
    .enum([
      "firecrawl",
      "jina-reader",
      "tavily-search",
      "tinyfish",
      "context7",
      "nimble-search",
      "anysearch-search",
    ])
    .optional(),
  format: z.enum(["markdown", "html", "links", "screenshot"]).default("markdown"),
  depth: z.union([z.literal(0), z.literal(1), z.literal(2)]).default(0),
  wait_for_selector: z.string().max(256).optional(),
  include_metadata: z.boolean().default(false),
});
