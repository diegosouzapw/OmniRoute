import { z } from "zod";
import type { McpToolDefinition } from "./toolDefinition.ts";

export const toolSearchInput = z
  .object({
    query: z
      .string()
      .min(1)
      .describe("Natural-language or keyword query over tool names/descriptions"),
    limit: z.number().int().min(1).max(25).optional().describe("Max results (default 8)"),
  })
  .describe("Search available MCP tools by keyword");

export const toolSearchOutput = z.object({
  query: z.string(),
  count: z.number(),
  tools: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      scopes: z.array(z.string()),
      signature: z.string(),
    })
  ),
});

export const toolSearchTool: McpToolDefinition<typeof toolSearchInput, typeof toolSearchOutput> = {
  name: "omniroute_tool_search",
  description:
    "Search the available MCP tools by keyword and return the most relevant ones as compact one-line TypeScript signatures (token-efficient discovery instead of loading every tool schema).",
  inputSchema: toolSearchInput,
  outputSchema: toolSearchOutput,
  scopes: ["read:tools"],
  auditLevel: "basic",
  phase: 1,
  sourceEndpoints: [],
};
