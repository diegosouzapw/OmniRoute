import { z } from "zod";
import {
  ACCOUNT_FALLBACK_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "@/shared/constants/upstreamHeaders";

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