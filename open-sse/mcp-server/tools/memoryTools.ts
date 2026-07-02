import { z } from "zod";
import { retrieveMemories } from "@/lib/memory/retrieval";
import { createMemory, deleteMemory, listMemories } from "@/lib/memory/store";
import { MemoryType } from "@/lib/memory/types";
import {
  getMemorySettings,
  toMemoryRetrievalConfig,
  DEFAULT_MEMORY_SETTINGS,
} from "@/lib/memory/settings";

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
    scopes: ["read:memory"],
    inputSchema: MemorySearchSchema,
    handler: async (args: z.infer<typeof MemorySearchSchema>) => {
      // Plan 21 D16/Bug#7 fix: even on the error path the fallback must
      // respect DEFAULT_MEMORY_SETTINGS.strategy instead of hardcoding "exact".
      const memorySettings =
        (await getMemorySettings().catch(() => null)) ?? DEFAULT_MEMORY_SETTINGS;
      const baseConfig = toMemoryRetrievalConfig(memorySettings, {
        query: args.query,
      });

      const config = {
        ...baseConfig,
        enabled: true,
        maxTokens:
          args.maxTokens ??
          (memorySettings.enabled ? memorySettings.maxTokens : DEFAULT_MEMORY_SETTINGS.maxTokens),
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
    scopes: ["write:memory"],
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
    scopes: ["write:memory"],
    inputSchema: MemoryClearSchema,
    handler: async (args: z.infer<typeof MemoryClearSchema>) => {
      const result = await listMemories({
        apiKeyId: args.apiKeyId,
        type: args.type as MemoryType | undefined,
      });
      const existingMemories = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : [];

      let toDelete = existingMemories;
      if (args.olderThan) {
        const cutoff = new Date(args.olderThan);
        toDelete = existingMemories.filter((m) => new Date(m.createdAt) < cutoff);
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
