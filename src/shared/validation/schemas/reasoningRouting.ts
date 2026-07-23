import { z } from "zod";

export const reasoningRuleScopeSchema = z.enum([
  "global",
  "apiKey",
  "combo",
  "model",
  "connection",
]);
export const reasoningEffortSchema = z.enum([
  "none",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "ultra",
]);
export const reasoningSourceEffortSchema = z.union([
  z.enum(["any", "missing"]),
  reasoningEffortSchema,
]);

const reasoningRoutingRuleObjectSchema = z.object({
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(1000).optional().default(""),
  scope: reasoningRuleScopeSchema,
  apiKeyId: z.string().trim().min(1).nullable().optional(),
  comboId: z.string().trim().min(1).nullable().optional(),
  connectionId: z.string().trim().min(1).nullable().optional(),
  modelPattern: z.string().trim().min(1).max(500).nullable().optional(),
  sourceEffort: reasoningSourceEffortSchema.optional().default("any"),
  requestTags: z.array(z.string().trim().min(1).max(100)).max(20).optional().default([]),
  tagMatchMode: z.enum(["any", "all"]).optional().default("any"),
  effortMode: z.enum(["inherit", "default", "force"]).optional().default("inherit"),
  targetEffort: reasoningEffortSchema.nullable().optional(),
  targetKind: z.enum(["keep", "model", "combo"]).optional().default("keep"),
  targetModel: z.string().trim().min(1).max(500).nullable().optional(),
  targetComboId: z.string().trim().min(1).nullable().optional(),
  budgetAction: z.enum(["preserve", "remove", "set"]).optional().default("preserve"),
  budgetTokens: z.coerce.number().int().positive().max(10_000_000).nullable().optional(),
  priority: z.coerce.number().int().min(-1_000_000).max(1_000_000).optional().default(0),
  enabled: z.boolean().optional().default(true),
});

function validateReasoningRule(
  value: z.infer<typeof reasoningRoutingRuleObjectSchema>,
  ctx: z.RefinementCtx
) {
  const requireField = (condition: boolean, field: keyof typeof value, message: string) => {
    if (!condition) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [field], message });
  };
  if (value.scope === "apiKey") requireField(!!value.apiKeyId, "apiKeyId", "apiKeyId is required");
  if (value.scope === "combo") requireField(!!value.comboId, "comboId", "comboId is required");
  if (value.scope === "model")
    requireField(!!value.modelPattern, "modelPattern", "modelPattern is required");
  if (value.scope === "connection") {
    requireField(!!value.connectionId, "connectionId", "connectionId is required");
    requireField(
      value.targetKind === "keep",
      "targetKind",
      "Connection rules cannot reroute models"
    );
  }
  if (value.effortMode !== "inherit")
    requireField(!!value.targetEffort, "targetEffort", "targetEffort is required");
  if (value.targetKind === "model")
    requireField(!!value.targetModel, "targetModel", "targetModel is required");
  if (value.targetKind === "combo")
    requireField(!!value.targetComboId, "targetComboId", "targetComboId is required");
  if (value.budgetAction === "set")
    requireField(!!value.budgetTokens, "budgetTokens", "budgetTokens is required");
  if (value.targetEffort === "none" && value.budgetAction === "set") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["budgetAction"],
      message: "A none effort cannot set a thinking budget",
    });
  }
}

export const createReasoningRoutingRuleSchema =
  reasoningRoutingRuleObjectSchema.superRefine(validateReasoningRule);
export const updateReasoningRoutingRuleSchema = reasoningRoutingRuleObjectSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, "No fields to update");

export const simulateReasoningRoutingSchema = z.object({
  model: z.string().trim().min(1).max(500),
  effort: z
    .union([reasoningSourceEffortSchema, z.literal("signal")])
    .optional()
    .default("missing"),
  thinkingBudgetTokens: z.coerce.number().int().positive().max(10_000_000).nullable().optional(),
  apiKeyId: z.string().trim().min(1).nullable().optional(),
  requestTags: z.array(z.string().trim().min(1).max(100)).max(20).optional().default([]),
  transport: z.enum(["http", "codex-ws"]).optional().default("http"),
});
