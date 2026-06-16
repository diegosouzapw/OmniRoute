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

import { modelIdSchema, jsonObjectSchema, resetStatsActionSchema } from "./misc.ts";

export const fallbackChainEntrySchema = z
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

export const intelligenceSyncRequestSchema = z
  .object({
    dryRun: z.boolean().optional(),
  })
  .strict();

export const taskRoutingModelMapSchema = z
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