import { z } from "zod";
import {
  ACCOUNT_FALLBACK_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "@/shared/constants/upstreamHeaders";

export const cliMitmStartSchema = z.object({
  apiKey: z.string().trim().min(1).nullable().optional(),
  keyId: z.string().trim().min(1).nullable().optional(),
  sudoPassword: z.string().optional(),
});

export const cliMitmStopSchema = z.object({
  sudoPassword: z.string().optional(),
});

export const cliMitmAliasUpdateSchema = z.object({
  tool: z.string().trim().min(1, "tool and mappings required"),
  mappings: z.record(z.string(), z.string().optional()),
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
  reasoningEffort: z.enum(["none", "low", "medium", "high", "xhigh"]).optional(),
  wireApi: z.enum(["chat", "responses"]).optional(),
  modelMappings: z.record(z.string().trim().min(1), z.string().trim().min(1)).optional(),
});