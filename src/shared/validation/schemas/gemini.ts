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


export const geminiPartSchema = z
  .object({
    text: z.string().optional(),
  })
  .catchall(z.unknown());

export const geminiContentSchema = z
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