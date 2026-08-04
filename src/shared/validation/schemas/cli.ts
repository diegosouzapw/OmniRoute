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

export const cliMitmStartSchema = z.object({
  apiKey: z.string().trim().min(1).nullable().optional(),
  keyId: z.string().trim().min(1).nullable().optional(),
  sudoPassword: z.string().optional(),
});

export const cliMitmStopSchema = z.object({
  sudoPassword: z.string().optional(),
});

// A mapping value is either the legacy plain model string, or a structured entry that
// lets a reasoning-effort override be configured independently of (or without) a model
// remap. `mitmAliasEntrySchema` is intentionally permissive on `reasoningEffort` (any
// string) — the canonical-vocabulary check runs at the route boundary via
// `hasInvalidReasoningEffort` (`@/mitm/aliasConfig`), matching upstream decolua/9router#2584
// ("validate reasoning values at the API boundary").
const mitmAliasEntrySchema = z.object({
  model: z.string().optional(),
  reasoningEffort: z.string().optional(),
});

export const cliMitmAliasUpdateSchema = z.object({
  tool: z.string().trim().min(1, "tool and mappings required"),
  mappings: z.record(z.string(), z.union([z.string(), mitmAliasEntrySchema]).optional()),
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

export const envKeySchema = z
  .string()
  .trim()
  .min(1, "Environment key is required")
  .max(120)
  .regex(/^[A-Z_][A-Z0-9_]*$/, "Invalid environment key format");

export const envValueSchema = z
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
  apiKey: z.string().nullable().optional(),
  model: z.string().trim().min(1, "baseUrl and model are required"),
  reasoningEffort: z.enum(["none", "low", "medium", "high", "xhigh", "max", "ultra"]).optional(),
  wireApi: z.enum(["chat", "responses"]).optional(),
  modelMappings: z.record(z.string().trim().min(1), z.string().trim().min(1)).optional(),
});

/**
 * Multi-model variant of `cliModelConfigSchema`. Adds optional `models`
 * (array of strings, takes precedence over `model`) and `activeModel`
 * (string id to promote to first position). Ported from upstream PR
 * decolua/9router#618 for the Factory Droid CLI tool.
 */
export const cliMultiModelConfigSchema = cliModelConfigSchema.extend({
  models: z.array(z.string().trim().min(1)).optional(),
  activeModel: z.string().optional(),
});

export const cliAuthOnlyConfigSchema = z.object({
  baseUrl: z.string().trim().min(1, "baseUrl is required"),
  apiKey: z.string().nullable().optional(),
  overwrite: z.boolean().optional(),
});
