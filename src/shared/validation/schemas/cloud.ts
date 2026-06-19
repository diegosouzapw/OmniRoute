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