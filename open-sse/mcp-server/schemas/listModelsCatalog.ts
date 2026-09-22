import { z } from "zod";

import type { McpToolDefinition } from "./toolDefinition.ts";

export const listModelsCatalogInput = z.object({
  provider: z.string().optional().describe("Filter by provider name"),
  capability: z
    .enum(["chat", "embedding", "image", "audio", "video", "rerank", "moderation"])
    .optional()
    .describe("Filter by model capability"),
  query: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .optional()
    .describe("Case-insensitive search across model IDs, providers, and capabilities"),
  mode: z
    .enum(["models", "summary"])
    .default("models")
    .describe("Return a bounded model page or aggregate counts only"),
  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .default(50)
    .describe("Models per page (default 50, maximum 100)"),
  cursor: z
    .string()
    .min(1)
    .max(2048)
    .regex(/^v1\.[A-Za-z0-9_-]+$/, "Invalid catalog cursor")
    .optional()
    .describe("Opaque cursor returned by the previous page"),
});

export const listModelsCatalogOutput = z.object({
  models: z.array(
    z.object({
      id: z.string(),
      provider: z.string(),
      capabilities: z.array(z.string()),
      status: z.enum(["available", "degraded", "unavailable"]),
      thinkingEffort: z.string().optional(),
      context_length: z.number().optional(),
      pricing: z
        .object({
          inputPerMillion: z.number().nullable(),
          outputPerMillion: z.number().nullable(),
        })
        .optional(),
    })
  ),
  mode: z.enum(["models", "summary"]),
  total: z.number().int().nonnegative(),
  returned: z.number().int().nonnegative(),
  limit: z.number().int().min(1).max(100),
  nextCursor: z.string().nullable(),
  summary: z
    .object({
      byProvider: z.array(
        z.object({ provider: z.string(), count: z.number().int().nonnegative() })
      ),
      byCapability: z.array(
        z.object({ capability: z.string(), count: z.number().int().nonnegative() })
      ),
      byStatus: z.array(
        z.object({
          status: z.enum(["available", "degraded", "unavailable"]),
          count: z.number().int().nonnegative(),
        })
      ),
    })
    .optional(),
  source: z.string().optional(),
  warning: z.string().optional(),
  providerFailures: z
    .array(
      z.object({
        provider: z.string(),
        connectionId: z.string().optional(),
        status: z.literal("unavailable"),
      })
    )
    .optional(),
});

export const listModelsCatalogTool: McpToolDefinition<
  typeof listModelsCatalogInput,
  typeof listModelsCatalogOutput
> = {
  name: "omniroute_list_models_catalog",
  description:
    "Lists a bounded, paginated AI model catalog with stable ordering, search, provider/capability filters, status, pricing, and an optional count-only summary mode. Follow nextCursor until null to traverse all matching models.",
  inputSchema: listModelsCatalogInput,
  outputSchema: listModelsCatalogOutput,
  scopes: ["read:models"],
  auditLevel: "none",
  phase: 1,
  sourceEndpoints: ["/api/models/catalog", "/v1/models"],
};
