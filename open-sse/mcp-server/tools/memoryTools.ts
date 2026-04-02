import { z } from "zod";
import { retrieveMemories } from "@/lib/memory/retrieval";
import { createMemory, deleteMemory, listMemories } from "@/lib/memory/store";
import { MemoryType } from "@/lib/memory/types";

export const MemorySearchSchema = z.object({
  apiKeyId: z.string(),
  query: z.string().optional(),
  type: z.enum(["factual", "episodic", "procedural", "semantic"]).optional(),
  maxTokens: z.number().int().positive().max(8000).optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export const MemoryAddSchema = z.object({
  apiKeyId: z.string(),
  sessionId: z.string().optional(),
  type: z.enum(["factual", "episodic", "procedural", "semantic"]),
  key: z.string().min(1),
  content: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const MemoryClearSchema = z.object({
  apiKeyId: z.string(),
  type: z.enum(["factual", "episodic", "procedural", "semantic"]).optional(),
  olderThan: z.string().optional(),
});

export const memoryTools = {
  omniroute_memory_search: {
    name: "omniroute_memory_search",
    description: "Search memories by query, type, or API key with token budget enforcement",
    inputSchema: MemorySearchSchema,
    handler: async (args: z.infer<typeof MemorySearchSchema>) => {
      const config = {
        enabled: true,
        maxTokens: args.maxTokens || 2000,
        retrievalStrategy: "exact" as const,
        autoSummarize: false,
        persistAcrossModels: false,
        retentionDays: 30,
        scope: "apiKey" as const,
      };

      const memories = await retrieveMemories(args.apiKeyId, config);

      const filtered = args.type ? memories.filter((m) => m.type === args.type) : memories;

      const limited = args.limit ? filtered.slice(0, args.limit) : filtered;

      return {
        success: true,
        data: {
          memories: limited,
          count: limited.length,
          totalTokens: limited.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0),
        },
      };
    },
  },

  omniroute_memory_add: {
    name: "omniroute_memory_add",
    description: "Add a new memory entry",
    inputSchema: MemoryAddSchema,
    handler: async (args: z.infer<typeof MemoryAddSchema>) => {
      const memory = await createMemory({
        apiKeyId: args.apiKeyId,
        sessionId: args.sessionId || "",
        type: args.type as MemoryType,
        key: args.key,
        content: args.content,
        metadata: args.metadata || {},
        expiresAt: null,
      });

      return {
        success: true,
        data: {
          memory,
          message: "Memory created successfully",
        },
      };
    },
  },

  omniroute_memory_clear: {
    name: "omniroute_memory_clear",
    description: "Clear memories for an API key, optionally filtered by type or age",
    inputSchema: MemoryClearSchema,
    handler: async (args: z.infer<typeof MemoryClearSchema>) => {
      const memories = await listMemories({
        apiKeyId: args.apiKeyId,
        type: args.type as MemoryType | undefined,
      });

      let toDelete = memories;
      if (args.olderThan) {
        const cutoff = new Date(args.olderThan);
        toDelete = memories.filter((m) => new Date(m.createdAt) < cutoff);
      }

      let deletedCount = 0;
      for (const memory of toDelete) {
        await deleteMemory(memory.id);
        deletedCount++;
      }

      return {
        success: true,
        data: {
          deletedCount,
          message: `Cleared ${deletedCount} memories`,
        },
      };
    },
  },
};
