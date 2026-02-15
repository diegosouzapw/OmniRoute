// @ts-check
/**
 * Zod Validation Schemas — Shared request schemas for API routes
 *
 * Provides runtime input validation for provider, combo, and settings APIs.
 *
 * @module shared/schemas/validation
 */

import { z } from "zod";

// ─── Provider Connection ──────────────────────────────────────────

export const providerConnectionSchema = z.object({
  provider: z.string().min(1, "Provider name is required"),
  authType: z.enum(["oauth", "apikey", "free"]).optional(),
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  apiKey: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  isActive: z.boolean().default(true),
  priority: z.number().int().min(0).default(0),
  defaultModel: z.string().optional(),
  globalPriority: z.number().int().min(0).optional().nullable(),
  rateLimitProtection: z.boolean().default(false),
  displayName: z.string().optional(),
});

// ─── Combo / Routing Rule ─────────────────────────────────────────

export const comboNodeSchema = z.object({
  connectionId: z.string().uuid("Invalid connection ID"),
  weight: z.number().int().min(0).max(100).default(1),
  priority: z.number().int().min(0).default(0),
});

export const comboSchema = z.object({
  name: z.string().min(1, "Combo name is required").max(100),
  model: z.string().min(1, "Model pattern is required"),
  strategy: z.enum(["priority", "weighted", "round-robin", "cost-optimized"]).default("priority"),
  nodes: z.array(comboNodeSchema).min(1, "At least one node is required"),
  isActive: z.boolean().default(true),
  maxRetries: z.number().int().min(0).max(10).default(2),
  retryDelay: z.number().int().min(0).max(30000).default(1000),
});

// ─── API Key ──────────────────────────────────────────────────────

export const apiKeyCreateSchema = z.object({
  label: z.string().min(1, "Label is required").max(64),
});

// ─── Settings ─────────────────────────────────────────────────────

export const settingsSchema = z
  .object({
    requireLogin: z.boolean().optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    defaultModel: z.string().optional(),
    enableRequestLogs: z.boolean().optional(),
    maxLogRetention: z.number().int().min(1).max(365).optional(),
    rateLimitEnabled: z.boolean().optional(),
    rateLimitPerMinute: z.number().int().min(0).optional(),
  })
  .partial();

// ─── Proxy Settings ───────────────────────────────────────────────

export const proxySettingsSchema = z.object({
  enabled: z.boolean(),
  url: z.string().url("Invalid proxy URL").optional().or(z.literal("")),
  username: z.string().optional(),
  password: z.string().optional(),
  bypassList: z.array(z.string()).optional(),
});

// ─── Resilience Profile ───────────────────────────────────────────

export const resilienceProfileSchema = z.object({
  provider: z.string().min(1),
  circuitBreaker: z
    .object({
      failureThreshold: z.number().int().min(1).max(100).default(5),
      resetTimeoutMs: z.number().int().min(1000).max(600000).default(30000),
      halfOpenMax: z.number().int().min(1).max(10).default(1),
    })
    .optional(),
  backoff: z
    .object({
      initialDelayMs: z.number().int().min(100).max(60000).default(1000),
      maxDelayMs: z.number().int().min(1000).max(600000).default(60000),
      multiplier: z.number().min(1).max(10).default(2),
    })
    .optional(),
  rateLimit: z
    .object({
      requestsPerMinute: z.number().int().min(0).optional(),
      tokensPerMinute: z.number().int().min(0).optional(),
    })
    .optional(),
});

// ─── Chat Completion Request (basic validation) ───────────────────

export const chatCompletionSchema = z.object({
  model: z.string().min(1, "Model is required"),
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant", "tool"]),
        content: z.union([z.string(), z.array(z.any())]),
      })
    )
    .min(1, "At least one message is required"),
  stream: z.boolean().optional(),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().int().min(1).optional(),
  top_p: z.number().min(0).max(1).optional(),
});

// ─── Helper ───────────────────────────────────────────────────────

/**
 * Validate data against a schema and format errors for API responses.
 *
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @param {unknown} data
 * @returns {{ success: true, data: T } | { success: false, errors: Array<{ path: string, message: string }> }}
 */
export function validateSchema(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
}
