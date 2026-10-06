import { z } from "zod";

import type { McpToolDefinition } from "./toolDefinition.ts";

export const radarCatalogInput = z.object({
  provider: z.string().trim().min(1).max(100).optional().describe("Filter by provider id"),
  familyId: z.string().trim().min(1).max(120).optional().describe("Filter by curated family id"),
  enabledOnly: z.boolean().default(true).describe("Exclude models disabled by the Radar feed"),
});

const radarLimitOutput = z.object({
  rpm: z.number().nullable(),
  rpd: z.number().nullable(),
  tpm: z.number().nullable(),
  tpd: z.number().nullable(),
});

export const radarCatalogOutput = z.object({
  meta: z
    .object({
      version: z.string(),
      tier: z.string(),
      fetchedAt: z.string(),
    })
    .nullable(),
  models: z.array(
    z.object({
      provider: z.string(),
      modelId: z.string(),
      displayName: z.string(),
      familyId: z.string().nullable(),
      quota: z.object({
        monthlyTokens: z.number(),
        creditTokens: z.number(),
        freeType: z.string(),
        limits: radarLimitOutput.nullable(),
      }),
      capabilities: z
        .object({
          tools: z.boolean(),
          vision: z.boolean(),
          thinking: z.boolean(),
        })
        .nullable(),
      enabled: z.boolean(),
      origin: z.enum(["baseline", "radar", "local"]),
      disabledBy: z.literal("radar").nullable(),
    })
  ),
});

export const radarCatalogTool: McpToolDefinition<
  typeof radarCatalogInput,
  typeof radarCatalogOutput
> = {
  name: "omniroute_radar_catalog",
  description:
    "Reads the local signed Radar catalog with optional provider and curated-family filters. Never syncs or writes data.",
  inputSchema: radarCatalogInput,
  outputSchema: radarCatalogOutput,
  scopes: ["read:radar"],
  auditLevel: "none",
  phase: 1,
  sourceEndpoints: ["/api/radar/catalog"],
};
