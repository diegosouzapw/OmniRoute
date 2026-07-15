import { z } from "zod";

import type { McpToolDefinition } from "./toolDefinition.ts";

const ccrHash = z
  .string()
  .regex(/^[a-f0-9]{24}$/i)
  .describe("24-hex content hash from a CCR marker or ccr:// URI");

export const ccrEntryMetadataOutput = z.object({
  hash: ccrHash,
  bytes: z.number().int().nonnegative(),
  chars: z.number().int().nonnegative(),
  lines: z.number().int().nonnegative(),
  contentType: z.string(),
  source: z.enum(["compression", "mcp", "ionizer", "session-dedup"]),
  createdAt: z.number().int().nonnegative(),
  lastAccessedAt: z.number().int().nonnegative(),
  expiresAt: z.number().int().nonnegative(),
  retrievalCount: z.number().int().nonnegative(),
});

export const ccrReferenceOutput = z.object({
  hash: ccrHash,
  uri: z.string().startsWith("ccr://"),
  marker: z.string(),
});

export const ccrStoreInput = z.object({
  content: z
    .string()
    .min(1)
    .refine((content) => Buffer.byteLength(content, "utf8") <= 2 * 1024 * 1024, {
      message: "Content exceeds the 2 MiB UTF-8 CCR block limit",
    })
    .describe("Verbatim content to keep in the in-memory CCR store (maximum 2 MiB UTF-8)"),
  contentType: z.string().trim().min(1).max(128).optional(),
  ttlSeconds: z
    .number()
    .int()
    .min(60)
    .max(7 * 24 * 60 * 60)
    .optional(),
});

export const ccrStoreOutput = z.union([
  z.object({
    stored: z.literal(true),
    reference: ccrReferenceOutput,
    metadata: ccrEntryMetadataOutput,
  }),
  z.object({
    stored: z.literal(false),
    reason: z.enum(["block_too_large", "principal_budget_exceeded", "global_budget_exceeded"]),
  }),
]);

export const ccrStoreTool: McpToolDefinition<typeof ccrStoreInput, typeof ccrStoreOutput> = {
  name: "omniroute_ccr_store",
  description:
    "Store verbatim content in the caller-isolated in-memory CCR store and return a ccr:// reference plus the compatible CCR marker. Entries expire automatically and are not persisted across restarts.",
  inputSchema: ccrStoreInput,
  outputSchema: ccrStoreOutput,
  scopes: ["write:compression"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: [],
};

export const ccrRetrieveInput = z.object({
  hash: ccrHash,
  mode: z.enum(["full", "head", "tail", "lines", "grep", "stats"]).optional(),
  n: z.number().int().positive().max(10_000).optional(),
  start: z.number().int().positive().optional(),
  end: z.number().int().positive().optional(),
  pattern: z.string().max(512).optional(),
  unique: z.boolean().optional(),
});

export const ccrRetrieveOutput = z.union([
  z.object({
    found: z.literal(false),
    error: z.string(),
  }),
  z.object({
    found: z.literal(true),
    metadata: ccrEntryMetadataOutput,
    content: z.string().optional(),
    tooLargeForFull: z.boolean().optional(),
    suggestedModes: z.array(z.enum(["head", "tail", "lines", "grep", "stats"])).optional(),
    error: z.string().optional(),
  }),
]);

export const ccrRetrieveTool: McpToolDefinition<typeof ccrRetrieveInput, typeof ccrRetrieveOutput> =
  {
    name: "omniroute_ccr_retrieve",
    description:
      "Retrieve caller-owned CCR content by hash. Full MCP responses are capped at 256 KiB; use head, tail, lines, grep, or stats for larger blocks.",
    inputSchema: ccrRetrieveInput,
    outputSchema: ccrRetrieveOutput,
    scopes: ["read:compression"],
    auditLevel: "basic",
    phase: 2,
    sourceEndpoints: ["/api/compression/retrieve"],
  };

export const ccrInspectInput = z.object({ hash: ccrHash });
export const ccrInspectOutput = z.union([
  z.object({ found: z.literal(false) }),
  z.object({
    found: z.literal(true),
    reference: ccrReferenceOutput,
    metadata: ccrEntryMetadataOutput,
  }),
]);
export const ccrInspectTool: McpToolDefinition<typeof ccrInspectInput, typeof ccrInspectOutput> = {
  name: "omniroute_ccr_inspect",
  description: "Inspect metadata for a caller-owned CCR block without returning its content.",
  inputSchema: ccrInspectInput,
  outputSchema: ccrInspectOutput,
  scopes: ["read:compression"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: [],
};

export const ccrListInput = z.object({
  offset: z.number().int().nonnegative().optional(),
  limit: z.number().int().min(1).max(100).optional(),
});
export const ccrListOutput = z.object({
  entries: z.array(z.object({ reference: ccrReferenceOutput, metadata: ccrEntryMetadataOutput })),
  total: z.number().int().nonnegative(),
  offset: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  hasMore: z.boolean(),
});
export const ccrListTool: McpToolDefinition<typeof ccrListInput, typeof ccrListOutput> = {
  name: "omniroute_ccr_list",
  description: "List paginated metadata for CCR blocks owned by the current caller.",
  inputSchema: ccrListInput,
  outputSchema: ccrListOutput,
  scopes: ["read:compression"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: [],
};

export const ccrDeleteInput = z.object({ hash: ccrHash });
export const ccrDeleteOutput = z.object({ deleted: z.boolean() });
export const ccrDeleteTool: McpToolDefinition<typeof ccrDeleteInput, typeof ccrDeleteOutput> = {
  name: "omniroute_ccr_delete",
  description: "Delete a caller-owned block from the in-memory CCR store.",
  inputSchema: ccrDeleteInput,
  outputSchema: ccrDeleteOutput,
  scopes: ["write:compression"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: [],
};

export const ccrStatsInput = z.object({});
export const ccrStatsOutput = z.object({
  storage: z.literal("memory"),
  entries: z.number().int().nonnegative(),
  bytes: z.number().int().nonnegative(),
  limits: z.object({
    maxEntries: z.number().int().positive(),
    maxBlockBytes: z.number().int().positive(),
    maxPrincipalBytes: z.number().int().positive(),
    maxGlobalBytes: z.number().int().positive(),
    defaultTtlSeconds: z.number().int().positive(),
    maxTtlSeconds: z.number().int().positive(),
    maxMcpFullBytes: z.number().int().positive(),
  }),
  lifecycle: z.object({
    expiredEvictions: z.number().int().nonnegative(),
    capacityEvictions: z.number().int().nonnegative(),
    rejectedStores: z.number().int().nonnegative(),
  }),
});
export const ccrStatsTool: McpToolDefinition<typeof ccrStatsInput, typeof ccrStatsOutput> = {
  name: "omniroute_ccr_stats",
  description:
    "Return caller-scoped CCR entry and byte usage, lifecycle counters, and in-memory store limits.",
  inputSchema: ccrStatsInput,
  outputSchema: ccrStatsOutput,
  scopes: ["read:compression"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: [],
};

export const CCR_MCP_TOOLS = [
  ccrStoreTool,
  ccrRetrieveTool,
  ccrInspectTool,
  ccrListTool,
  ccrDeleteTool,
  ccrStatsTool,
] as const;
