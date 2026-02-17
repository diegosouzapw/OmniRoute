import { z } from "zod";

// ──── Provider Schemas ────

export const createProviderSchema = z.object({
  provider: z.string().min(1).max(100),
  apiKey: z.string().min(1).max(10000),
  name: z.string().min(1).max(200),
  priority: z.number().int().min(1).max(100).optional(),
  globalPriority: z.number().int().min(1).max(100).nullable().optional(),
  defaultModel: z.string().max(200).nullable().optional(),
  testStatus: z.string().max(50).optional(),
});

// ──── API Key Schemas ────

export const createKeySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
});

// ──── Combo Schemas ────

// A model entry can be a plain string (legacy) or an object with weight
const comboModelEntry = z.union([
  z.string(),
  z.object({
    model: z.string().min(1),
    weight: z.number().min(0).max(100).default(0),
  }),
]);

// Per-combo config overrides
const comboConfigSchema = z
  .object({
    maxRetries: z.number().int().min(0).max(10).optional(),
    retryDelayMs: z.number().int().min(0).max(60000).optional(),
    timeoutMs: z.number().int().min(1000).max(600000).optional(),
    healthCheckEnabled: z.boolean().optional(),
  })
  .optional();

export const createComboSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .regex(/^[a-zA-Z0-9_/.-]+$/, "Name can only contain letters, numbers, -, _, / and ."),
  models: z.array(comboModelEntry).optional().default([]),
  strategy: z
    .enum(["priority", "weighted", "round-robin", "random", "least-used", "cost-optimized"])
    .optional()
    .default("priority"),
  config: comboConfigSchema,
});

// ──── Settings Schemas ────
// FASE-01: Removed .passthrough() — only explicitly listed fields are accepted

export const updateSettingsSchema = z.object({
  newPassword: z.string().min(1).max(200).optional(),
  currentPassword: z.string().max(200).optional(),
  theme: z.string().max(50).optional(),
  language: z.string().max(10).optional(),
  requireLogin: z.boolean().optional(),
  enableRequestLogs: z.boolean().optional(),
  enableSocks5Proxy: z.boolean().optional(),
  instanceName: z.string().max(100).optional(),
  corsOrigins: z.string().max(500).optional(),
  logRetentionDays: z.number().int().min(1).max(365).optional(),
  cloudUrl: z.string().max(500).optional(),
  baseUrl: z.string().max(500).optional(),
});

// ──── Auth Schemas ────

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required").max(200),
});

// ──── Helper ────

/**
 * Parse and validate request body with a Zod schema.
 * Returns { success: true, data } or { success: false, error }.
 */
export function validateBody(schema, body) {
  const result = schema.safeParse(body);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const issues = Array.isArray(result.error?.issues) ? result.error.issues : [];
  return {
    success: false,
    error: {
      message: "Invalid request",
      details: issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    },
  };
}
