import { z } from "zod";

import type { McpToolDefinition } from "./toolDefinition.ts";

export const listModelsCatalogInput = z.object({
  provider: z.string().optional().describe("Filter by provider name"),
  capability: z
    .enum(["chat", "embedding", "image", "audio", "video", "rerank", "moderation"])
    .optional()
    .describe("Filter by model capability"),
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
    "Lists all available AI models across all providers with their capabilities, current status, and pricing information.",
  inputSchema: listModelsCatalogInput,
  outputSchema: listModelsCatalogOutput,
  scopes: ["read:models"],
  auditLevel: "none",
  phase: 1,
  sourceEndpoints: ["/api/models/catalog", "/v1/models"],
};
