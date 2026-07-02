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


export const evalTargetSchema = z
  .object({
    type: z.enum(["suite-default", "model", "combo"]),
    id: z.string().trim().min(1).optional().nullable(),
  })
  .superRefine((value, ctx) => {
    if (value.type === "suite-default") {
      return;
    }

    if (typeof value.id !== "string" || value.id.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "target.id is required for model and combo targets",
        path: ["id"],
      });
    }
  });

export const evalMessageSchema = z.object({
  role: z.string().trim().min(1, "message.role is required").max(50),
  content: z.string().trim().min(1, "message.content is required").max(20000),
});

export const evalCaseBuilderSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1, "case.name is required").max(200),
  model: z.string().trim().min(1).max(300).optional().nullable(),
  input: z.object({
    messages: z.array(evalMessageSchema).min(1, "At least one message is required").max(32),
    max_tokens: z.number().int().min(1).max(8192).optional(),
  }),
  expected: z.object({
    strategy: z.enum(["contains", "exact", "regex"]),
    value: z.string().trim().min(1, "expected.value is required").max(20000),
  }),
  tags: z.array(z.string().trim().min(1).max(64)).max(20).optional(),
});

export const evalRunSuiteSchema = z
  .object({
    suiteId: z.string().trim().min(1, "suiteId is required"),
    outputs: z.record(z.string(), z.string()).optional(),
    target: evalTargetSchema.optional(),
    compareTarget: evalTargetSchema.optional(),
    apiKeyId: z.string().trim().min(1, "apiKeyId must not be empty").optional(),
  })
  .superRefine((value, ctx) => {
    if (value.compareTarget) {
      const primaryType = value.target?.type || "suite-default";
      const primaryId = value.target?.id?.trim() || "";
      const compareId = value.compareTarget.id?.trim() || "";

      if (primaryType === value.compareTarget.type && primaryId === compareId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "compareTarget must differ from target",
          path: ["compareTarget"],
        });
      }
    }
  });

export const evalSuiteSaveSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1, "name is required").max(200),
  description: z.string().trim().max(2000).optional(),
  cases: z.array(evalCaseBuilderSchema).min(1, "At least one case is required").max(200),
});