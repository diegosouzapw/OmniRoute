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


export const pricingFieldsSchema = z
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

export const pricingSyncSourceSchema = z.enum(["litellm"]);

export const pricingSyncRequestSchema = z
  .object({
    sources: z.array(pricingSyncSourceSchema).min(1).optional(),
    dryRun: z.boolean().optional(),
  })
  .strict();