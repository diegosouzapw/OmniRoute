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

import { accessScheduleSchema } from "./misc.ts";

// ──── API Key Schemas ────

export const createKeySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  noLog: z.boolean().optional(),
  allowUsageCommand: z.boolean().optional(),
  scopes: z.array(z.string().trim().min(1).max(64)).max(32).optional(),
});

export const createSyncTokenSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
});

export const setBudgetSchema = z.object({
  apiKeyId: z.string().trim().min(1, "apiKeyId is required"),
  // #3537: a limit of 0 means "no limit for this period" (checkBudget only enforces when
  // activeLimitUsd > 0). The dashboard sends 0 for unfilled fields, so 0 must be accepted —
  // `.positive()` (rejects 0) used to 400 any save that left a field blank. Negatives are
  // still rejected by `.min(0)`.
  dailyLimitUsd: z.coerce.number().min(0, "dailyLimitUsd must be zero or greater").optional(),
  weeklyLimitUsd: z.coerce.number().min(0, "weeklyLimitUsd must be zero or greater").optional(),
  monthlyLimitUsd: z.coerce.number().min(0, "monthlyLimitUsd must be zero or greater").optional(),
  warningThreshold: z.coerce.number().min(0).max(1).optional(),
  resetInterval: z.enum(["daily", "weekly", "monthly"]).optional(),
  resetTime: z
    .string()
    .trim()
    .regex(/^\d{2}:\d{2}$/, "resetTime must be in HH:MM format")
    .optional(),
});

export const setTokenLimitSchema = z
  .object({
    id: z.string().trim().min(1).optional(),
    apiKeyId: z.string().trim().min(1, "apiKeyId is required"),
    scopeType: z.enum(["model", "provider", "global"]),
    scopeValue: z.string().trim().default(""),
    tokenLimit: z.coerce
      .number()
      .int("tokenLimit must be an integer")
      .positive("tokenLimit must be greater than zero"),
    resetInterval: z.enum(["daily", "weekly", "monthly"]).default("monthly"),
    resetTime: z
      .string()
      .trim()
      .regex(/^\d{2}:\d{2}$/, "resetTime must be in HH:MM format")
      .optional(),
    enabled: z.boolean().default(true),
  })
  .superRefine((value, ctx) => {
    if (value.scopeType !== "global" && (!value.scopeValue || value.scopeValue.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "scopeValue is required unless scopeType is 'global'",
        path: ["scopeValue"],
      });
    }
  });

export const updateKeyPermissionsSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    allowedModels: z.array(z.string().trim().min(1)).max(1000).optional(),
    allowedCombos: z.array(z.string().trim().min(1).max(200)).max(500).optional(),
    allowedConnections: z.array(z.string().uuid()).max(100).optional(),
    noLog: z.boolean().optional(),
    autoResolve: z.boolean().optional(),
    isActive: z.boolean().optional(),
    throttleDelayMs: z.number().int().min(0).max(300000).optional(),
    isBanned: z.boolean().optional(),
    expiresAt: z.string().datetime().nullable().optional(),
    maxSessions: z.number().int().min(0).max(10000).optional(),
    accessSchedule: z.union([accessScheduleSchema, z.null()]).optional(),
    rateLimits: z
      .union([
        z
          .array(
            z.object({ limit: z.number().int().positive(), window: z.number().int().positive() })
          )
          .max(50),
        z.null(),
      ])
      .optional(),
    scopes: z.array(z.string().trim().min(1).max(64)).max(32).optional(),
    allowedEndpoints: z.array(z.string().trim().min(1).max(64)).max(20).optional(),
    streamDefaultMode: z.enum(["legacy", "json"]).optional(),
    disableNonPublicModels: z.boolean().optional(),
    allowUsageCommand: z.boolean().optional(),
  })
  .superRefine((value, ctx) => {
    if (
      value.name === undefined &&
      value.allowedModels === undefined &&
      value.allowedCombos === undefined &&
      value.allowedConnections === undefined &&
      value.noLog === undefined &&
      value.autoResolve === undefined &&
      value.isActive === undefined &&
      value.throttleDelayMs === undefined &&
      value.isBanned === undefined &&
      value.expiresAt === undefined &&
      value.maxSessions === undefined &&
      value.accessSchedule === undefined &&
      value.rateLimits === undefined &&
      value.scopes === undefined &&
      value.allowedEndpoints === undefined &&
      value.streamDefaultMode === undefined &&
      value.disableNonPublicModels === undefined &&
      value.allowUsageCommand === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });