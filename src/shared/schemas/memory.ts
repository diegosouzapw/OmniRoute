import { z } from "zod";

/** Schema estendido para PUT /api/settings/memory (D9). */
export const MemorySettingsExtendedSchema = z
  .object({
    // Campos legados (já existem)
    enabled: z.boolean().optional(),
    maxTokens: z.number().int().min(0).max(16000).optional(),
    retentionDays: z.number().int().min(1).max(365).optional(),
    strategy: z.enum(["recent", "semantic", "hybrid"]).optional(),
    skillsEnabled: z.boolean().optional(),
    // Campos novos (D9)
    embeddingSource: z.enum(["remote", "static", "transformers", "auto"]).optional(),
    embeddingProviderModel: z.string().nullable().optional(), // formato `provider/model`
    transformersEnabled: z.boolean().optional(),
    staticEnabled: z.boolean().optional(),
    rerankEnabled: z.boolean().optional(),
    rerankProviderModel: z.string().nullable().optional(),
    vectorStore: z.enum(["sqlite-vec", "qdrant", "auto"]).optional(),
  })
  .strict();

/** PUT /api/memory/[id] body (D6 plano §5.3). */
export const MemoryUpdatePutSchema = z
  .object({
    type: z.enum(["factual", "episodic", "procedural", "semantic"]).optional(),
    key: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

/** POST /api/memory/retrieve-preview body (D6 plano §4.2). */
export const RetrievePreviewSchema = z
  .object({
    query: z.string().min(1),
    strategy: z.enum(["exact", "semantic", "hybrid"]).default("hybrid"),
    maxTokens: z.number().int().positive().max(16000).default(2000),
    apiKeyId: z.string().optional(), // opcional: testa global se ausente
    limit: z.number().int().positive().max(100).default(20),
  })
  .strict();

/** POST /api/memory/reindex body (D21). */
export const MemoryReindexSchema = z
  .object({
    force: z.boolean().default(false), // true = regenera TODOS os vetores
  })
  .strict();

/** POST /api/memory/summarize body (D19). */
export const MemorySummarizeSchema = z
  .object({
    olderThanDays: z.number().int().positive().max(365).default(30),
    apiKeyId: z.string().optional(),
    dryRun: z.boolean().default(false),
  })
  .strict();

/** Response shape do GET /api/memory/embedding-providers (D9 + plano §5.3). */
export const EmbeddingProviderListingSchema = z.object({
  providers: z.array(
    z.object({
      provider: z.string(),
      hasKey: z.boolean(),
      models: z.array(
        z.object({
          id: z.string(), // `provider/model`
          name: z.string(),
          dimensions: z.number().nullable(),
        }),
      ),
    }),
  ),
});

/** Response shape do GET /api/memory/engine-status (UI Engine tab — D11). */
export const MemoryEngineStatusSchema = z.object({
  keyword: z.object({
    available: z.literal(true),
    backend: z.literal("FTS5"),
  }),
  embedding: z.object({
    source: z.enum(["remote", "static", "transformers"]).nullable(),
    model: z.string().nullable(),
    dimensions: z.number().nullable(),
    available: z.boolean(),
    reason: z.string(),
    cacheStats: z.object({ hits: z.number(), misses: z.number(), size: z.number() }),
  }),
  vectorStore: z.object({
    backend: z.enum(["sqlite-vec", "qdrant", "none"]),
    available: z.boolean(),
    rowCount: z.number(),
    needsReindex: z.number(),
    reason: z.string(),
  }),
  qdrant: z.object({
    enabled: z.boolean(),
    healthy: z.boolean().nullable(),
    latencyMs: z.number().nullable(),
    error: z.string().nullable(),
  }),
  rerank: z.object({
    enabled: z.boolean(),
    provider: z.string().nullable(),
    model: z.string().nullable(),
    available: z.boolean(),
    reason: z.string(),
  }),
});

/** Item de resultado do Playground (POST /api/memory/retrieve-preview response). */
export const RetrievePreviewResultSchema = z.object({
  memories: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["factual", "episodic", "procedural", "semantic"]),
      key: z.string(),
      content: z.string(),
      score: z.number(),
      tokens: z.number(),
      tier: z.enum(["fts5", "vector", "hybrid-rrf", "qdrant"]),
      vecScore: z.number().nullable(),
      ftsScore: z.number().nullable(),
    }),
  ),
  resolution: z.object({
    embeddingSource: z.enum(["remote", "static", "transformers"]).nullable(),
    embeddingModel: z.string().nullable(),
    vectorStore: z.enum(["sqlite-vec", "qdrant", "none"]),
    strategyUsed: z.enum(["exact", "semantic", "hybrid"]),
    rerankApplied: z.boolean(),
    fallbackReason: z.string().nullable(),
  }),
  totalTokensUsed: z.number(),
  budgetMaxTokens: z.number(),
});

export type MemorySettingsExtended = z.infer<typeof MemorySettingsExtendedSchema>;
export type MemoryEngineStatus = z.infer<typeof MemoryEngineStatusSchema>;
export type RetrievePreviewResult = z.infer<typeof RetrievePreviewResultSchema>;
